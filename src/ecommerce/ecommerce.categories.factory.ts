import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EcommercePlatform } from './interfaces/ecommerce.interface';
import { MagentoCategoriesService } from 'src/magento/magento.categories.service';

@Injectable()
export class EcommerceCategoriesFactory {
  private readonly ecommercePlatform: EcommercePlatform;

  constructor(
    private readonly configService: ConfigService,
    private readonly magentoCategoriesService: MagentoCategoriesService,
    // commercetoolsService; CommercetoolsService,
  ) {
    this.ecommercePlatform =
      this.configService.get<EcommercePlatform>('ecommercePlatform');
  }

  getCategoriesService() {
    if (this.ecommercePlatform === EcommercePlatform.MAGENTO) {
      return this.magentoCategoriesService;
    } else {
      // return this.commercetoolsService;
    }
  }
}
