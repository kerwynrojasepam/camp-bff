import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { ProductsModule } from 'src/products';
import { EcommerceModule } from 'src/ecommerce';
import { EcommerceCartsFactory } from 'src/ecommerce/ecommerce.carts.factory';

@Module({
  imports: [ProductsModule, EcommerceModule],
  controllers: [CartsController],
  providers: [CartsService, EcommerceCartsFactory],
})
export class CartsModule {}
