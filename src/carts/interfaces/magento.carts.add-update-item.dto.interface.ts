import { CartItem } from './magento.carts.interface';

export interface MagentoAddUpdateItemDto {
  cartItem: CartItem;
}

export interface MagentoAddUpdateItemResponse extends CartItem {}
