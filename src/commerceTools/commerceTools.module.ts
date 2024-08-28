import { Module } from '@nestjs/common';
import { CommerceToolsService } from './commerceTools.service';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from 'src/utils';
import { CommerceToolsCategoriesService } from './commerceTools.categories.service';
import { CommerceToolsProductsService } from './commerceTools.products.service';
import { CommerceToolsOrdersService } from './commerceTools.orders.service';
import { CommerceToolsCartsService } from './commerceTools.carts.service';

@Module({
  imports: [HttpModule, UtilsModule],
  exports: [
    CommerceToolsService,
    CommerceToolsCategoriesService,
    CommerceToolsProductsService,
    CommerceToolsCartsService,
    CommerceToolsOrdersService,
  ],
  providers: [
    CommerceToolsService,
    CommerceToolsOrdersService,
    CommerceToolsCartsService,
    CommerceToolsProductsService,
    CommerceToolsCategoriesService,
  ],
})
export class CommerceToolsModule {}
