import { Module } from '@nestjs/common';
import { ContentStackService } from './contentStack.service';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from 'src/utils';
import { ContentStackProductService } from './contentStask.products.service';

@Module({
  imports: [HttpModule, UtilsModule],
  exports: [ContentStackService, ContentStackProductService],
  providers: [ContentStackService, ContentStackProductService],
})
export class ContentStackModule {}
