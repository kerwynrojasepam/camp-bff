import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EcommercePlatform } from './interfaces/ecommerce.interface';
import { MagentoProductsService } from 'src/magento/magento.products.service';

@Injectable()
export class EcommerceProductsFactory {
  private readonly ecommercePlatform: EcommercePlatform;

  constructor(
    private readonly configService: ConfigService,
    private readonly magentoProductsService: MagentoProductsService,
    // commercetoolsService; CommercetoolsService,
  ) {
    this.ecommercePlatform =
      this.configService.get<EcommercePlatform>('ecommercePlatform');
  }

  getProductsService() {
    if (this.ecommercePlatform === EcommercePlatform.MAGENTO) {
      return this.magentoProductsService;
    } else {
      // return this.commercetoolsService;
    }
  }
}
