import { Injectable } from '@nestjs/common';
import {
  CurrencyCode,
  Product,
  ProductsResponse,
  ProductVariant,
} from './interfaces/product.interface';
import {
  MagentoProduct,
  MagentoProductsResponseGet,
} from './interfaces/magento.product.interface';
import { MagentoService } from 'src/magento/magento.service';
import { CategoryId } from 'src/categories/interfaces/category.interface';
import { UtilsService } from 'src/utils/utils.service';
import { MagentoProductVariant } from './interfaces/magento.product-variant.interface';
import {
  MagentoProductAttribute,
  MagentoProductAttributeMapped,
  MagentoProductAttributesMapped,
} from './interfaces/magento.product-attribute.interface';

function getCurrentPage(offset: number, pageSize: number) {
  return Math.floor(offset / pageSize) + 1;
}

function getMappedProductAttribute(
  magentoAttribute: MagentoProductAttribute,
): MagentoProductAttributeMapped {
  return {
    code: magentoAttribute.attribute_code,
    label: magentoAttribute.default_frontend_label,
    options: magentoAttribute.options.reduce(
      (mappedAttribute, option) => {
        mappedAttribute[option.value] = {
          label: option.label,
          key: option.value,
        };

        return mappedAttribute;
      },
      {} as MagentoProductAttributeMapped['options'],
    ),
  };
}

async function transformMagentoProductToProduct(
  magentoProduct: MagentoProduct,
  magentoProductVariants: MagentoProductVariant[],
  magentoProductAttributesMapped: MagentoProductAttributesMapped,
): Promise<Product> {
  // Extract description from custom_attributes
  const descriptionAttribute = magentoProduct.custom_attributes.find(
    (attr) => attr.attribute_code === 'description',
  );
  const description = descriptionAttribute ? descriptionAttribute.value : '';

  const slugAttribute = magentoProduct.custom_attributes.find(
    (attr) => attr.attribute_code === 'url_key',
  );
  const slug = slugAttribute ? slugAttribute.value : '';

  const imageAttribute = magentoProduct.custom_attributes.find(
    (attr) => attr.attribute_code === 'image',
  );
  // FIXME: Should read from env variable
  const imageUrl = imageAttribute
    ? `https://magento.test/media/catalog/product/${imageAttribute.value.slice(1)}`
    : '';

  const variantPromises = magentoProductVariants.map<ProductVariant>(
    (magentoProductVariant) => {
      const variantSlugAttribute = magentoProduct.custom_attributes.find(
        (attr) => attr.attribute_code === 'url_key',
      );
      const variantSlug = variantSlugAttribute
        ? variantSlugAttribute.value
        : '';

      return {
        id: magentoProductVariant.id,
        sku: magentoProductVariant.sku,
        name: magentoProductVariant.name,
        prices: [
          {
            value: {
              centAmount: magentoProductVariant.price * 100,
              currencyCode: CurrencyCode.USD, // TODO: Validate how to get correct currency
            },
          },
        ],
        images: [
          {
            url: imageUrl,
          },
        ],
        attributes: magentoProductVariant.custom_attributes
          .map((customAttribute) => {
            const mappedAttribute =
              magentoProductAttributesMapped[customAttribute.attribute_code];
            if (!mappedAttribute) {
              return null;
            }

            return {
              name: mappedAttribute.code,
              value: mappedAttribute.options[customAttribute.value],
            };
          })
          .filter(Boolean),
        slug: variantSlug,
      };
    },
  );

  const variants = await Promise.all(variantPromises);

  // Create the Product object
  const product: Product = {
    id: magentoProduct.id,
    slug,
    name: magentoProduct.name,
    description,
    variants,
    masterVariant: variants[0], // TODO: Review if this is correct
  };

  return product;
}

// function to transform MagentoProduct into Product
@Injectable()
export class ProductsService {
  constructor(
    private readonly magentoService: MagentoService,
    private readonly utilsService: UtilsService,
  ) {}

  async getProductsByCategory(
    categoryId: CategoryId,
    offset: number,
    limit: number,
  ): Promise<ProductsResponse> {
    // TODO: Transform to queryparams ??
    const offsetParam = offset
      ? `&searchCriteria[currentPage]=${getCurrentPage(offset, limit)}`
      : '';
    const limitParam = limit ? `&searchCriteria[pageSize]=${limit}` : '';
    const url = `products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${categoryId}&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&searchCriteria[filter_groups][1][filters][0][field]=visibility&searchCriteria[filter_groups][1][filters][0][value]=1&searchCriteria[filter_groups][1][filters][0][condition_type]=neq${offsetParam}${limitParam}`;

    const magentoProductsPromise =
      await this.magentoService.get<MagentoProductsResponseGet>(url);
    const magentoAttributeSizePromise =
      this.magentoService.get<MagentoProductAttribute>(
        `products/attributes/size`,
      );
    const magentoAttributeColorPromise =
      this.magentoService.get<MagentoProductAttribute>(
        `products/attributes/color`,
      );

    const [
      { items: magentoProducts, total_count },
      magentoAttributeSize,
      magentoAttributeColor,
    ] = await Promise.all([
      magentoProductsPromise,
      magentoAttributeSizePromise,
      magentoAttributeColorPromise,
    ]);

    const magentoProductAttributesMapped = {
      size: getMappedProductAttribute(magentoAttributeSize),
      color: getMappedProductAttribute(magentoAttributeColor),
    };

    const magentoProductsWithVariantsPromises = magentoProducts.map<
      Promise<Product>
    >((magentoProduct) => {
      return this.magentoService
        .get<
          MagentoProductVariant[]
        >(`configurable-products/${magentoProduct.sku}/children`)
        .then((magentoProductVariants) => {
          return transformMagentoProductToProduct(
            magentoProduct,
            magentoProductVariants,
            magentoProductAttributesMapped,
          );
        });
    });

    return {
      results: await Promise.all(magentoProductsWithVariantsPromises),
      total: total_count,
      limit,
      offset,
    };
  }
}
