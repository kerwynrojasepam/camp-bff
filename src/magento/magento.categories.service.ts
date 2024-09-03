import { Injectable } from '@nestjs/common';
import { MagentoCategory } from './interfaces/magento.category.interface';
import { transformMagentoCategories } from './utils';
import { MagentoService } from 'src/magento/magento.service';
import { Category } from 'src/categories/interfaces/category.interface';
import { EcommerceCategoriesService } from 'src/ecommerce/interfaces/ecommerce.categories.types';

@Injectable()
export class MagentoCategoriesService implements EcommerceCategoriesService {
  constructor(private readonly magentoService: MagentoService) {}

  async getCategories(): Promise<Category[]> {
    const magentoCategory =
      await this.magentoService.get<MagentoCategory>('categories');

    return transformMagentoCategories([magentoCategory]);
  }
}
