import { Injectable } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import { HttpService } from '@nestjs/axios';
import { UtilsService } from 'src/utils/utils.service';
import { MagentoCategory } from './interfaces/magento.category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly utilsService: UtilsService,
  ) {}

  async getCategories(): Promise<Category[]> {
    const magentoCategories = await this.utilsService.getPromisifiedResponse(
      this.httpService.get<MagentoCategory[]>(
        'http://magento.sandbox.epamdev.com/rest/default/V1/categories',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    return magentoCategories.map(({ id, name, parent_id }) => ({
      id,
      name,
      description: name,
      slug: `${id}`,
      parent: parent_id ? { id: parent_id } : null,
      ancestors: [],
    }));
  }
}
