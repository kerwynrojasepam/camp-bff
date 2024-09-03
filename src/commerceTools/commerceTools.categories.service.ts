import { Injectable } from '@nestjs/common';
import { Category } from 'src/categories/interfaces/category.interface';
import { EcommerceCategoriesService } from 'src/ecommerce/interfaces/ecommerce.categories.types';
import { CommerceToolsService } from './commerceTools.service';
import { ByProjectKeyCategoriesRequestBuilder } from '@commercetools/platform-sdk';

@Injectable()
export class CommerceToolsCategoriesService
  implements EcommerceCategoriesService
{
  private ctCategoriesRequestBuilder: ByProjectKeyCategoriesRequestBuilder;

  constructor(private readonly commerceToolsService: CommerceToolsService) {
    this.ctCategoriesRequestBuilder = this.commerceToolsService
      .getCommerceToolsRequestBuilder()
      .categories();
  }

  async getCategories(): Promise<Category[]> {
    const {
      body: { results: ctCategories },
    } = await this.ctCategoriesRequestBuilder.get().execute();

    return ctCategories.map<Category>((ctCategory) => ({
      id: ctCategory.id,
      name: ctCategory.name[this.commerceToolsService.langCode],
      description: ctCategory.description?.[this.commerceToolsService.langCode],
      slug: ctCategory.slug[this.commerceToolsService.langCode],
      parent: {
        id: ctCategory.parent?.id,
      },
      ancestors: ctCategory.ancestors.map((ancestor) => ({
        id: ancestor.id,
        type: ancestor.typeId,
      })),
    }));
  }
}
