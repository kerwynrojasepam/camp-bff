import { Controller, Get, Param } from '@nestjs/common';
import { PromosService } from './promos.service';
import { ProductSKU } from 'src/products/interfaces/product.interface';
import { PromoLayout } from './interfaces/promos.interface';

@Controller('promos')
export class PromosController {
  constructor(private readonly promosService: PromosService) {}

  @Get(':sku')
  getProductBySKU(@Param('sku') sku: ProductSKU): Promise<PromoLayout> {
    return this.promosService.getPromosBySKU(sku);
  }
}
