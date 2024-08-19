import { Module } from '@nestjs/common';
import { MagentoService } from './magento.service';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from 'src/utils';
import { MagentoCategoriesService } from './magento.categories.service';
import { MagentoProductsService } from './magento.products.service';
import { MagentoCartsService } from './magento.carts.service';

@Module({
  imports: [HttpModule, UtilsModule],
  providers: [
    MagentoService,
    MagentoCategoriesService,
    MagentoProductsService,
    MagentoCartsService,
  ],
  exports: [
    MagentoService,
    MagentoCategoriesService,
    MagentoProductsService,
    MagentoCartsService,
  ],
})
export class MagentoModule {}
