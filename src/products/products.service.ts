import { Injectable } from '@nestjs/common';
import {
  Product,
  ProductSKU,
  ProductsResponse,
} from './interfaces/product.interface';
import { CategoryId } from 'src/categories/interfaces/category.interface';
import { EcommerceProductsService } from 'src/ecommerce/interfaces/ecommerce.products.types';
import { EcommerceProductsFactory } from 'src/ecommerce/ecommerce.products.factory';

@Injectable()
export class ProductsService {
  private ecommerceProductsService: EcommerceProductsService;

  constructor(
    private readonly ecommerceProductsFactory: EcommerceProductsFactory,
  ) {
    this.ecommerceProductsService =
      this.ecommerceProductsFactory.getProductsService();
  }

  async getProductsByCategory(
    categoryId: CategoryId,
    offset: number,
    limit: number,
  ): Promise<ProductsResponse> {
    return this.ecommerceProductsService.getProductsByCategory(
      categoryId,
      offset,
      limit,
    );
  }

  async getProductBySKU(sku: ProductSKU): Promise<Product> {
    return this.ecommerceProductsService.getProductBySKU(sku);
  }
}
