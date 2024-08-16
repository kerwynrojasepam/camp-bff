import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { MagentoModule } from 'src/magento';

@Module({
  imports: [MagentoModule],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
