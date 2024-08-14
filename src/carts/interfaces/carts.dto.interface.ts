import {
  ProductId,
  ProductSKU,
} from 'src/products/interfaces/product.interface';
import { CartLineItem } from './carts.interface';

export enum UpdateCartAction {
  ADD_LINE_ITEM = 'AddLineItem',
  CHANGE_LINE_ITEM_QUANTITY = 'ChangeLineItemQuantity',
  REMOVE_LINE_ITEM = 'RemoveLineItem',
  SET_SHIPPING_ADDRESS = 'SetShippingAddress',
}

export interface AddLineItemDto {
  action: UpdateCartAction.ADD_LINE_ITEM;
  AddLineItem: {
    variantId: ProductSKU;
    quantity: number;
  };
}

export interface ChangeLineItemQuantityDto {
  action: UpdateCartAction.CHANGE_LINE_ITEM_QUANTITY;
  ChangeLineItemQuantity?: {
    lineItemId: ProductId;
    quantity: number;
  };
}

export interface RemoveLineItemDto {
  action: UpdateCartAction.REMOVE_LINE_ITEM;
  RemoveLineItem: {
    lineItemId: ProductId;
  };
}

export interface SetShippingAddressDto {
  action: UpdateCartAction.SET_SHIPPING_ADDRESS;
  SetShippingAddress: {
    country: string;
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    region: string;
    email: string;
  };
}

export type UpdateCartDto = { version: number } & (
  | AddLineItemDto
  | ChangeLineItemQuantityDto
  | RemoveLineItemDto
  | SetShippingAddressDto
);

export interface AddUpdateItemResponse extends CartLineItem {}

export type RemoveLineItemResponse = boolean;

export interface SetShippingAddressResponse {
  payment_methods: PaymentMethod[];
  totals: SetShippingAddressTotals;
}

interface PaymentMethod {
  code: string;
  title: string;
}

interface SetShippingAddressTotals {
  grand_total: number;
  base_grand_total: number;
  subtotal: number;
  base_subtotal: number;
  discount_amount: number;
  base_discount_amount: number;
  subtotal_with_discount: number;
  base_subtotal_with_discount: number;
  shipping_amount: number;
  base_shipping_amount: number;
  shipping_discount_amount: number;
  base_shipping_discount_amount: number;
  tax_amount: number;
  base_tax_amount: number;
  weee_tax_applied_amount: number;
  shipping_tax_amount: number;
  base_shipping_tax_amount: number;
  subtotal_incl_tax: number;
  shipping_incl_tax: number;
  base_shipping_incl_tax: number;
  base_currency_code: string;
  quote_currency_code: string;
  items_qty: number;
  items: CartItem[];
  total_segments: TotalSegment[];
}

interface CartItem {
  item_id: number;
  price: number;
  base_price: number;
  qty: number;
  row_total: number;
  base_row_total: number;
  row_total_with_discount: number;
  tax_amount: number;
  base_tax_amount: number;
  tax_percent: number;
  discount_amount: number;
  base_discount_amount: number;
  discount_percent: number;
  price_incl_tax: number;
  base_price_incl_tax: number;
  row_total_incl_tax: number;
  base_row_total_incl_tax: number;
  options: string;
  weee_tax_applied_amount: number;
  weee_tax_applied: string;
  name: string;
}

interface TotalSegment {
  code: string;
  title: string;
  value: number;
  extension_attributes?: {
    tax_grandtotal_details: any[];
  };
  area?: string;
}
