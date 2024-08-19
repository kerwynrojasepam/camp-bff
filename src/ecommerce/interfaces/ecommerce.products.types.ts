import { CategoryId } from 'src/categories/interfaces/category.interface';
import {
  Product,
  ProductSKU,
  ProductsResponse,
} from 'src/products/interfaces/product.interface';

export interface EcommerceProductsService {
  getProductsByCategory(
    categoryId: CategoryId,
    offset?: number,
    limit?: number,
  ): Promise<ProductsResponse>;

  getProductBySKU(sku: ProductSKU): Promise<Product>;
}
