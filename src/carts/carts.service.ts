import { Injectable } from '@nestjs/common';
import { Cart, CartId, LineItem } from './interfaces/carts.interface';
import { MagentoService } from 'src/magento/magento.service';
import { v4 as uuidv4 } from 'uuid';
import { MagentoGuestCart } from './interfaces/magento.carts.interface';
import {
  CurrencyCode,
  ProductType,
} from 'src/products/interfaces/product.interface';
import { getCentAmount } from 'src/utils/getCentAmount';

@Injectable()
export class CartsService {
  constructor(private readonly magentoService: MagentoService) {}

  async createCart(): Promise<Cart> {
    const magentoGuestCartId =
      await this.magentoService.post<string>('guest-carts');

    return {
      id: magentoGuestCartId,
      version: 0,
      customerId: uuidv4(),
      lineItems: [],
      totalPrice: {
        currencyCode: CurrencyCode.USD,
        centAmount: 0,
      },
      totalQuantity: 0,
    };
  }

  async getCart(cartId: CartId): Promise<Cart> {
    const magentoGuestCart = await this.magentoService.get<MagentoGuestCart>(
      `guest-carts/${cartId}`,
    );

    const lineItems: LineItem[] = [];
    let totalAmount = 0;
    magentoGuestCart.items.forEach((item) => {
      totalAmount += item.price * item.qty;

      lineItems.push({
        item_id: item.item_id,
        sku: item.sku,
        qty: item.qty,
        name: item.name,
        price: item.price,
        product_type: item.product_type as ProductType,
        quote_id: item.quote_id,
      });
    });

    const cart: Cart = {
      id: magentoGuestCart.id,
      version: 0, // TODO: Implement versioning
      customerId: magentoGuestCart.customer.id
        ? `${magentoGuestCart.customer.id}`
        : uuidv4(), // TODO: Implement customer
      lineItems,
      totalPrice: {
        currencyCode: magentoGuestCart.currency.global_currency_code, // TODO: Verify currency code
        centAmount: getCentAmount(totalAmount),
      },
      totalQuantity: magentoGuestCart.items_qty,
    };

    return cart;
  }
}
