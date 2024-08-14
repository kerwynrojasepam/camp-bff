import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { Cart, CartId } from './interfaces/carts.interface';
import {
  UpdateCartDto,
  UpdateCartAction,
  AddUpdateItemResponse,
  RemoveLineItemResponse,
  SetShippingAddressResponse,
} from './interfaces/carts.dto.interface';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createCart(): Promise<Cart> {
    return this.cartsService.createCart();
  }

  @Get(':cartId')
  getCart(@Param('cartId') cartId: CartId): Promise<Cart> {
    return this.cartsService.getCart(cartId);
  }

  @Put(':cartId')
  updateCart(
    @Param('cartId') cartId: CartId,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<
    AddUpdateItemResponse | RemoveLineItemResponse | SetShippingAddressResponse
  > {
    if (updateCartDto.action === UpdateCartAction.ADD_LINE_ITEM) {
      return this.cartsService.addLineItem(cartId, updateCartDto);
    } else if (
      updateCartDto.action === UpdateCartAction.CHANGE_LINE_ITEM_QUANTITY
    ) {
      return this.cartsService.changeLineItemQuantity(cartId, updateCartDto);
    } else if (updateCartDto.action === UpdateCartAction.REMOVE_LINE_ITEM) {
      return this.cartsService.removeLineItem(cartId, updateCartDto);
    } else if (updateCartDto.action === UpdateCartAction.SET_SHIPPING_ADDRESS) {
      return this.cartsService.setShippingAddress(cartId, updateCartDto);
    }
  }

  @Post('/carts/:cartId/order')
  createOrderFromCart(@Param('cartId') cartId: CartId): Promise<void> {
    return this.cartsService.createOrderFromCart(cartId);
  }
}
