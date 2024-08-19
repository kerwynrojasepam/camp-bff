import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { UtilsModule } from 'src/utils';
import { EcommerceModule } from 'src/ecommerce';
import { EcommerceCategoriesFactory } from 'src/ecommerce/ecommerce.categories.factory';

@Module({
  imports: [UtilsModule, EcommerceModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, EcommerceCategoriesFactory],
})
export class CategoriesModule {}
