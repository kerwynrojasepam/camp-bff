import { Injectable } from '@nestjs/common';
import { CommerceToolsService } from './commerceTools.service';
import { ByProjectKeyOrdersRequestBuilder } from '@commercetools/platform-sdk';
import { CartId } from 'src/carts/interfaces/carts.interface';
import { EcommerceOrdersService } from 'src/ecommerce/interfaces/ecommerce.orders.types';

@Injectable()
export class CommerceToolsOrdersService implements EcommerceOrdersService {
  private ctOrdersRequestBuilder: ByProjectKeyOrdersRequestBuilder;

  constructor(private readonly commerceToolsService: CommerceToolsService) {
    this.ctOrdersRequestBuilder = this.commerceToolsService
      .getCommerceToolsRequestBuilder()
      .orders();
  }

  async createOrderFromCart(
    cartId: CartId,
    cartVersion: number,
  ): Promise<void> {
    await this.ctOrdersRequestBuilder
      .post({
        body: {
          cart: {
            id: cartId,
            typeId: 'cart',
          },
          version: cartVersion,
        },
      })
      .execute();
  }
}
