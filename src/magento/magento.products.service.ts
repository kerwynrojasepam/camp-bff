import { Injectable } from '@nestjs/common';
import { EcommerceProductsService } from 'src/ecommerce/interfaces/ecommerce.products.types';

import {
  CurrencyCode,
  Product,
  ProductSKU,
  ProductsResponse,
  ProductVariant,
} from 'src/products/interfaces/product.interface';
import {
  MagentoProduct,
  MagentoProductsResponseGet,
} from './interfaces/magento.product.interface';
import { MagentoService } from 'src/magento/magento.service';
import { CategoryId } from 'src/categories/interfaces/category.interface';
import {
  MagentoProductAttribute,
  MagentoProductAttributesMapped,
} from './interfaces/magento.product-attribute.interface';
import { getMappedProductAttribute, getProductsByCategoryUrl } from './utils';
import { ConfigService } from '@nestjs/config';
import { getCentAmount } from 'src/utils/getCentAmount';

@Injectable()
export class MagentoProductsService implements EcommerceProductsService {
  private _magentoProductAttributesMapped = null;

  constructor(
    private readonly magentoService: MagentoService,
    private readonly configService: ConfigService,
  ) {}

  async getSizeAndColorAttributesMapped(): Promise<MagentoProductAttributesMapped> {
    if (this._magentoProductAttributesMapped) {
      return this._magentoProductAttributesMapped;
    }

    const magentoAttributeSizePromise =
      this.magentoService.get<MagentoProductAttribute>(
        `products/attributes/size`,
      );
    const magentoAttributeColorPromise =
      this.magentoService.get<MagentoProductAttribute>(
        `products/attributes/color`,
      );

    const [magentoAttributeSize, magentoAttributeColor] = await Promise.all([
      magentoAttributeSizePromise,
      magentoAttributeColorPromise,
    ]);

    this._magentoProductAttributesMapped = {
      size: getMappedProductAttribute(magentoAttributeSize),
      color: getMappedProductAttribute(magentoAttributeColor),
    };

    return this._magentoProductAttributesMapped;
  }

  async getProductVariantsBySku(sku: string): Promise<ProductVariant[]> {
    const magentoProductVariants = await this.magentoService.get<
      MagentoProduct[]
    >(`configurable-products/${sku}/children`);
    const magentoProductAttributesMapped =
      await this.getSizeAndColorAttributesMapped();

    const variants = magentoProductVariants.map<ProductVariant>(
      this.transformMagentoProductVariantToProductVariant(
        magentoProductAttributesMapped,
      ),
    );

    return variants;
  }

  async getProductsByCategory(
    categoryId: CategoryId,
    offset: number,
    limit: number,
  ): Promise<ProductsResponse> {
    const url = getProductsByCategoryUrl(categoryId, offset, limit);

    const magentoProductsPromise =
      await this.magentoService.get<MagentoProductsResponseGet>(url);

    const [{ items: magentoProducts, total_count }] = await Promise.all([
      magentoProductsPromise,
    ]);

    const magentoProductsWithVariantsPromises = magentoProducts.map<
      Promise<Product>
    >((magentoProduct) =>
      this.transformMagentoConfigurableProductToProduct(magentoProduct),
    );

    return {
      results: await Promise.all(magentoProductsWithVariantsPromises),
      total: total_count,
      limit,
      offset,
    };
  }

  async getProductBySKU(sku: ProductSKU): Promise<Product> {
    // TODO: Find a better way to get the parent SKU
    const parentSKU = sku.split('-')[0];
    const magentoProduct = await this.magentoService.get<MagentoProduct>(
      `products/${parentSKU}`,
    );

    return this.transformMagentoConfigurableProductToProduct(
      magentoProduct,
      sku,
    );
  }

  async getProductVariantBySKU(sku: ProductSKU): Promise<ProductVariant> {
    const magentoProductAttributesMapped =
      await this.getSizeAndColorAttributesMapped();
    const magentoProduct = await this.magentoService.get<MagentoProduct>(
      `products/${sku}`,
    );

    return this.transformMagentoProductVariantToProductVariant(
      magentoProductAttributesMapped,
    )(magentoProduct, 0, [magentoProduct]);
  }

  private async transformMagentoProductToProduct(
    magentoProduct: MagentoProduct,
    productVariants: ProductVariant[],
    masterVariant: ProductVariant,
  ) {
    const descriptionAttribute = magentoProduct.custom_attributes.find(
      (attr) => attr.attribute_code === 'description',
    );
    const description = descriptionAttribute ? descriptionAttribute.value : '';

    const slugAttribute = magentoProduct.custom_attributes.find(
      (attr) => attr.attribute_code === 'url_key',
    );
    const slug = slugAttribute ? slugAttribute.value : '';

    // Create the Product object
    const product: Product = {
      id: `${magentoProduct.id}`,
      slug,
      name: magentoProduct.name,
      description,
      variants: productVariants,
      masterVariant, // TODO: Review if this is correct
    };

    return product;
  }

  private async transformMagentoConfigurableProductToProduct(
    magentoProduct: MagentoProduct,
    variantSKU: ProductSKU = null,
  ): Promise<Product> {
    const productVariants = await this.getProductVariantsBySku(
      magentoProduct.sku,
    );

    const masterVariant = variantSKU
      ? (productVariants.find((variant) => variant.sku === variantSKU) ??
        productVariants[0])
      : productVariants[0];

    return this.transformMagentoProductToProduct(
      magentoProduct,
      productVariants,
      masterVariant,
    );
  }

  private transformMagentoProductVariantToProductVariant(
    magentoProductAttributesMapped: MagentoProductAttributesMapped,
  ): (
    value: MagentoProduct,
    index: number,
    array: MagentoProduct[],
  ) => ProductVariant {
    const catalogProductMediaUrl = this.configService.get<string>(
      'magentoMedia.catalog.product.image',
    );

    return (magentoProductVariant) => {
      const imageAttribute = magentoProductVariant.custom_attributes.find(
        (attr) => attr.attribute_code === 'image',
      );

      const imageUrl = imageAttribute
        ? `${catalogProductMediaUrl}/${imageAttribute.value.slice(1)}`
        : '';
      const variantSlugAttribute = magentoProductVariant.custom_attributes.find(
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
              centAmount: getCentAmount(magentoProductVariant.price),
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
              name: mappedAttribute.label,
              value: mappedAttribute.options[customAttribute.value],
            };
          })
          .filter(Boolean),
        slug: variantSlug,
      };
    };
  }
}
