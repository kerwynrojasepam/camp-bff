import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { EcommerceModule } from 'src/ecommerce';
import { EcommerceProductsFactory } from 'src/ecommerce/ecommerce.products.factory';

@Module({
  imports: [EcommerceModule],
  controllers: [ProductsController],
  providers: [ProductsService, EcommerceProductsFactory],
  exports: [ProductsService],
})
export class ProductsModule {}
