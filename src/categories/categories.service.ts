import { Injectable } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import { EcommerceCategoriesFactory } from 'src/ecommerce/ecommerce.categories.factory';
import { EcommerceCategoriesService } from 'src/ecommerce/interfaces/ecommerce.categories.types';

@Injectable()
export class CategoriesService {
  private ecommerceCategoriesService: EcommerceCategoriesService;

  constructor(
    private readonly ecommerceCategoriesFactory: EcommerceCategoriesFactory,
  ) {
    this.ecommerceCategoriesService =
      this.ecommerceCategoriesFactory.getCategoriesService();
  }

  async getCategories(): Promise<Category[]> {
    return this.ecommerceCategoriesService.getCategories();
  }
}
