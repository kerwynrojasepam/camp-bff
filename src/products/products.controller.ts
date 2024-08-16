import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResponse } from './interfaces/product.interface';
import { CategoryId } from 'src/categories/interfaces/category.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProductsByCategory(
    @Query('categoryId') categoryId: CategoryId,
    @Query('offset') offset: number = null,
    @Query('limit') limit: number = null,
  ): Promise<ProductsResponse> {
    return this.productsService.getProductsByCategory(
      categoryId,
      offset,
      limit,
    );
  }
}
