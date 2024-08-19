import { Module } from '@nestjs/common';
import { EcommerceCategoriesFactory } from './ecommerce.categories.factory';
import { MagentoModule } from 'src/magento';
import { EcommerceProductsFactory } from './ecommerce.products.factory';
import { EcommerceCartsFactory } from './ecommerce.carts.factory';

@Module({
  imports: [MagentoModule],
  providers: [
    EcommerceCategoriesFactory,
    EcommerceProductsFactory,
    EcommerceCartsFactory,
  ],
  exports: [
    MagentoModule,
    EcommerceCategoriesFactory,
    EcommerceProductsFactory,
    EcommerceCartsFactory,
  ],
})
export class EcommerceModule {}
