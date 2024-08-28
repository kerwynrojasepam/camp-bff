import { Injectable } from '@nestjs/common';
import { CategoryId } from 'src/categories/interfaces/category.interface';
import { CommerceToolsService } from './commerceTools.service';
import { ByProjectKeyProductProjectionsRequestBuilder } from '@commercetools/platform-sdk';
import { EcommerceProductsService } from 'src/ecommerce/interfaces/ecommerce.products.types';
import {
  Product,
  ProductSKU,
  ProductsResponse,
} from 'src/products/interfaces/product.interface';
import { transformCTProduct, transformCTProductVariant } from './utils';

@Injectable()
export class CommerceToolsProductsService implements EcommerceProductsService {
  private ctProductProjectionsRequestBuilder: ByProjectKeyProductProjectionsRequestBuilder;

  constructor(private readonly commerceToolsService: CommerceToolsService) {
    this.ctProductProjectionsRequestBuilder = this.commerceToolsService
      .getCommerceToolsRequestBuilder()
      .productProjections();
  }

  async getProductsByCategory(
    categoryId: CategoryId,
    offset?: number,
    limit?: number,
  ): Promise<ProductsResponse> {
    const { body: ctResponse } = await this.ctProductProjectionsRequestBuilder
      .get({
        queryArgs: {
          filter: `categories.id:"${categoryId}"`,
          limit,
          offset,
        },
      })
      .execute();

    return {
      limit: ctResponse.limit,
      offset: ctResponse.offset,
      total: ctResponse.total,
      results: ctResponse.results.map((ctProduct) => ({
        id: ctProduct.id,
        slug: ctProduct.slug[this.commerceToolsService.langCode],
        name: ctProduct.name[this.commerceToolsService.langCode],
        description: ctProduct.description[this.commerceToolsService.langCode],
        masterVariant: transformCTProductVariant(
          ctProduct,
          ctProduct.masterVariant,
          this.commerceToolsService.langCode,
        ),
        variants: ctProduct.variants.map((ctVariant) =>
          transformCTProductVariant(
            ctProduct,
            ctVariant,
            this.commerceToolsService.langCode,
          ),
        ),
      })),
    };
  }

  async getProductBySKU(sku: ProductSKU): Promise<Product> {
    const { body: ctResponse } = await this.ctProductProjectionsRequestBuilder
      .get({
        queryArgs: {
          filter: `variants.sku:"${sku}"`,
          limit: 1,
        },
      })
      .execute();

    return transformCTProduct(
      sku,
      ctResponse.results[0],
      this.commerceToolsService.langCode,
    );
  }
}
