import { CustomerId, PriceValue } from 'src/magento/common.interfaces';
import {
  Product,
  ProductId,
  ProductSKU,
  ProductVariant,
} from 'src/products/interfaces/product.interface';

export type CartId = string;

export interface CartInnerLineItem extends CartLineItem {
  id: ProductId;
  variant: ProductVariant;
  quantity: number;
  totalPrice: number;
  currencyCode: string;
}

export interface CartLineItem {
  item_id: ProductId;
  sku: ProductSKU;
  qty: number;
  name: Product['name'];
  price: number;
  product_type: string;
  quote_id: string;
}

export interface Cart {
  id: CartId;
  version: number;
  customerId: CustomerId;
  lineItems: CartLineItem[];
  totalPrice: PriceValue;
  totalQuantity: number;
}

export interface CartResponse extends Cart {
  lineItems: CartInnerLineItem[];
}
