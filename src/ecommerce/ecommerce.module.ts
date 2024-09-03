import { Module } from '@nestjs/common';
import { EcommerceCategoriesFactory } from './ecommerce.categories.factory';
import { MagentoModule } from 'src/magento';
import { EcommerceProductsFactory } from './ecommerce.products.factory';
import { EcommerceCartsFactory } from './ecommerce.carts.factory';
import { CommerceToolsModule } from 'src/commerceTools';

@Module({
  imports: [MagentoModule, CommerceToolsModule],
  providers: [
    EcommerceCategoriesFactory,
    EcommerceProductsFactory,
    EcommerceCartsFactory,
  ],
  exports: [
    MagentoModule,
    CommerceToolsModule,
    EcommerceCategoriesFactory,
    EcommerceProductsFactory,
    EcommerceCartsFactory,
  ],
})
export class EcommerceModule {}
