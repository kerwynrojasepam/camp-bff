import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { MagentoModule } from 'src/magento';
import { ProductsModule } from 'src/products';

@Module({
  imports: [MagentoModule, ProductsModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
