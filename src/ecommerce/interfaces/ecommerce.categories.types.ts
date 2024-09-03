import { Category } from 'src/categories/interfaces/category.interface';

export interface EcommerceCategoriesService {
  getCategories(): Promise<Category[]>;
}
