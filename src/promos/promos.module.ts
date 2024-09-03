import { Module } from '@nestjs/common';
import { PromosController } from './promos.controller';
import { PromosService } from './promos.service';
import { ContentStackModule } from 'src/contentStack';
import { ContentStackProductService } from 'src/contentStack/contentStask.products.service';

@Module({
  imports: [ContentStackModule],
  controllers: [PromosController],
  providers: [PromosService, ContentStackProductService],
})
export class PromosModule {}
