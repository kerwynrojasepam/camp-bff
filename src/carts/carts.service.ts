import { Injectable } from '@nestjs/common';
import { Cart, CartId } from './interfaces/carts.interface';
import {
  AddLineItemDto,
  AddUpdateItemResponse,
  ChangeLineItemQuantityDto,
  RemoveLineItemDto,
  RemoveLineItemResponse,
  SetShippingAddressDto,
  SetShippingAddressResponse,
} from './interfaces/carts.dto.interface';
import { EcommerceCartsService } from 'src/ecommerce/interfaces/ecommerce.carts.types';
import { EcommerceCartsFactory } from 'src/ecommerce/ecommerce.carts.factory';

@Injectable()
export class CartsService {
  private ecommerceCartsService: EcommerceCartsService;

  constructor(private readonly ecommerceCartsFactory: EcommerceCartsFactory) {
    this.ecommerceCartsService = this.ecommerceCartsFactory.getCartsService();
  }

  async createCart(): Promise<Cart> {
    return this.ecommerceCartsService.createCart();
  }

  async getCart(cartId: CartId): Promise<Cart> {
    return this.ecommerceCartsService.getCart(cartId);
  }

  async addLineItem(
    cartId: CartId,
    addLineItemDto: AddLineItemDto,
  ): Promise<AddUpdateItemResponse> {
    return this.ecommerceCartsService.addLineItem(cartId, addLineItemDto);
  }

  async changeLineItemQuantity(
    cartId: CartId,
    changeLineItemQtyDto: ChangeLineItemQuantityDto,
  ): Promise<AddUpdateItemResponse> {
    return this.ecommerceCartsService.changeLineItemQuantity(
      cartId,
      changeLineItemQtyDto,
    );
  }

  async removeLineItem(
    cartId: CartId,
    removeLineItemDto: RemoveLineItemDto,
  ): Promise<RemoveLineItemResponse> {
    return this.ecommerceCartsService.removeLineItem(cartId, removeLineItemDto);
  }

  async setShippingAddress(
    cartId: CartId,
    setShippingAddressDto: SetShippingAddressDto,
  ): Promise<SetShippingAddressResponse> {
    return this.ecommerceCartsService.setShippingAddress(
      cartId,
      setShippingAddressDto,
    );
  }

  async createOrderFromCart(cartId: CartId): Promise<void> {
    return this.ecommerceCartsService.createOrderFromCart(cartId);
  }
}
