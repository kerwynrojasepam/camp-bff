import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EcommercePlatform } from './interfaces/ecommerce.interface';
import { MagentoCartsService } from 'src/magento/magento.carts.service';
import { CommerceToolsCartsService } from 'src/commerceTools/commerceTools.carts.service';

@Injectable()
export class EcommerceCartsFactory {
  private readonly ecommercePlatform: EcommercePlatform;

  constructor(
    private readonly configService: ConfigService,
    private readonly magentoCartsService: MagentoCartsService,
    private readonly commercetoolsCartsService: CommerceToolsCartsService,
  ) {
    this.ecommercePlatform =
      this.configService.get<EcommercePlatform>('ecommercePlatform');
  }

  getCartsService() {
    if (this.ecommercePlatform === EcommercePlatform.MAGENTO) {
      return this.magentoCartsService;
    } else {
      return this.commercetoolsCartsService;
    }
  }
}
