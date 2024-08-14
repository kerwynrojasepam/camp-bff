import {
  ProductId,
  ProductSKU,
} from 'src/products/interfaces/product.interface';
import { CartLineItem } from './carts.interface';
import {
  MagentoCartTotals,
  MagentoPaymentMethod,
} from './magento.carts.set-shipping-address.dto.interface';

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
  totals: CartTotals;
}

export interface PaymentInformationResponse {
  payment_methods: PaymentMethod[];
  totals: CartTotals;
}

interface PaymentMethod extends MagentoPaymentMethod {}

interface CartTotals extends MagentoCartTotals {}
