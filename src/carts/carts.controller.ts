import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { Cart, CartId } from './interfaces/carts.interface';

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
}
