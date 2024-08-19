import {
  AddLineItemDto,
  AddUpdateItemResponse,
  ChangeLineItemQuantityDto,
  RemoveLineItemDto,
  RemoveLineItemResponse,
  SetShippingAddressDto,
  SetShippingAddressResponse,
} from 'src/carts/interfaces/carts.dto.interface';
import { Cart, CartId } from 'src/carts/interfaces/carts.interface';

export interface EcommerceCartsService {
  createCart(): Promise<Cart>;

  getCart(cartId: CartId): Promise<Cart>;

  addLineItem(
    cartId: CartId,
    addLineItemDto: AddLineItemDto,
  ): Promise<AddUpdateItemResponse>;

  changeLineItemQuantity(
    cartId: CartId,
    changeLineItemQtyDto: ChangeLineItemQuantityDto,
  ): Promise<AddUpdateItemResponse>;

  removeLineItem(
    cartId: CartId,
    removeLineItemDto: RemoveLineItemDto,
  ): Promise<RemoveLineItemResponse>;

  setShippingAddress(
    cartId: CartId,
    setShippingAddressDto: SetShippingAddressDto,
  ): Promise<SetShippingAddressResponse>;

  createOrderFromCart(cartId: CartId): Promise<void>;
}
