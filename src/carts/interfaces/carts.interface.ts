import {
  Product,
  ProductId,
  ProductSKU,
  ProductType,
} from 'src/products/interfaces/product.interface';

export type CartId = string;
export type CustomerId = string;

export interface Price {
  currencyCode: string;
  centAmount: number;
}

export interface CartLineItem {
  item_id: ProductId;
  sku: ProductSKU;
  qty: number;
  name: Product['name'];
  price: number;
  product_type: ProductType;
  quote_id: string;
}

export interface Cart {
  id: CartId;
  version: number;
  customerId: CustomerId;
  lineItems: CartLineItem[];
  totalPrice: Price;
  totalQuantity: number;
}
