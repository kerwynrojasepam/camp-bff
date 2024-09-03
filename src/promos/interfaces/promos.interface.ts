import { ProductSKU } from 'src/products/interfaces/product.interface';

interface Promo {
  text: string;
  order: number;
}

export interface PromoLayout {
  sku: ProductSKU;
  promos: Promo[];
}
