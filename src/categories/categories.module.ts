import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from 'src/utils';

@Module({
  imports: [HttpModule, UtilsModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
