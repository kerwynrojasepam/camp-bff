import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { UtilsModule } from 'src/utils';
import { MagentoModule } from 'src/magento';

@Module({
  imports: [UtilsModule, MagentoModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
