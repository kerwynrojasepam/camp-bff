import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MagentoModule } from 'src/magento';
import { UtilsModule } from 'src/utils';

@Module({
  imports: [UtilsModule, MagentoModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
