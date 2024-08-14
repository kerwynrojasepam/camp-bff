import { Injectable } from '@nestjs/common';
import { Cart, CartId, CartLineItem } from './interfaces/carts.interface';
import { MagentoService } from 'src/magento/magento.service';
import { v4 as uuidv4 } from 'uuid';
import { MagentoGuestCart } from './interfaces/magento.carts.interface';
import {
  CurrencyCode,
  ProductType,
} from 'src/products/interfaces/product.interface';
import { getCentAmount } from 'src/utils/getCentAmount';
import {
  AddLineItemDto,
  AddUpdateItemResponse,
  ChangeLineItemQuantityDto,
  RemoveLineItemDto,
  RemoveLineItemResponse,
  SetShippingAddressDto,
  SetShippingAddressResponse,
} from './interfaces/carts.dto.interface';
import {
  MagentoAddUpdateItemDto,
  MagentoAddUpdateItemResponse,
} from './interfaces/magento.carts.add-update-item.dto.interface';
import {
  MagentoSetShippingAddressDto,
  MagentoSetShippingAddressResponse,
} from './interfaces/magento.carts.set-shipping-address.dto.interface';

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

    const lineItems: CartLineItem[] = [];
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

  async addLineItem(
    cartId: CartId,
    addLineItemDto: AddLineItemDto,
  ): Promise<AddUpdateItemResponse> {
    const magentoAddUpdateItem = await this.magentoService.post<
      MagentoAddUpdateItemResponse,
      MagentoAddUpdateItemDto
    >(`guest-carts/${cartId}/items`, {
      cartItem: {
        quote_id: cartId,
        qty: addLineItemDto.AddLineItem.quantity,
        sku: addLineItemDto.AddLineItem.variantId,
      },
    });

    return {
      item_id: magentoAddUpdateItem.item_id,
      sku: magentoAddUpdateItem.sku,
      qty: magentoAddUpdateItem.qty,
      name: magentoAddUpdateItem.name,
      price: magentoAddUpdateItem.price,
      product_type: magentoAddUpdateItem.product_type as ProductType,
      quote_id: magentoAddUpdateItem.quote_id,
    };
  }

  async changeLineItemQuantity(
    cartId: CartId,
    changeLineItemQtyDto: ChangeLineItemQuantityDto,
  ): Promise<AddUpdateItemResponse> {
    const itemId = changeLineItemQtyDto.ChangeLineItemQuantity.lineItemId;
    const quantity = changeLineItemQtyDto.ChangeLineItemQuantity.quantity;
    const magentoAddUpdateItem = await this.magentoService.put<
      MagentoAddUpdateItemResponse,
      MagentoAddUpdateItemDto
    >(`guest-carts/${cartId}/items/${itemId}`, {
      cartItem: {
        item_id: itemId,
        quote_id: cartId,
        qty: quantity,
      },
    });

    return {
      item_id: magentoAddUpdateItem.item_id,
      sku: magentoAddUpdateItem.sku,
      qty: magentoAddUpdateItem.qty,
      name: magentoAddUpdateItem.name,
      price: magentoAddUpdateItem.price,
      product_type: magentoAddUpdateItem.product_type as ProductType,
      quote_id: magentoAddUpdateItem.quote_id,
    };
  }

  async removeLineItem(
    cartId: CartId,
    removeLineItemDto: RemoveLineItemDto,
  ): Promise<RemoveLineItemResponse> {
    const itemId = removeLineItemDto.RemoveLineItem.lineItemId;
    const magentoRemoveLineItem = await this.magentoService.delete<boolean>(
      `guest-carts/${cartId}/items/${itemId}`,
    );

    return magentoRemoveLineItem;
  }

  async setShippingAddress(
    cartId: CartId,
    setShippingAddressDto: SetShippingAddressDto,
  ): Promise<SetShippingAddressResponse> {
    const shippingAddressDto = setShippingAddressDto.SetShippingAddress;
    const magentoShippingAddressResponse = await this.magentoService.post<
      MagentoSetShippingAddressResponse,
      MagentoSetShippingAddressDto
    >(`guest-carts/${cartId}/shipping-information`, {
      adressInformation: {
        shipping_method_code: '', // TODO: Implement shipping_method_code
        shipping_carrier_code: '', // TODO: Implement shipping_carrier_code
        shipping_address: {
          country_id: shippingAddressDto.country,
          firstname: shippingAddressDto.firstName,
          lastname: shippingAddressDto.lastName,
          street: [
            shippingAddressDto.streetName,
            shippingAddressDto.streetNumber,
          ],
          postcode: shippingAddressDto.postalCode,
          city: shippingAddressDto.city,
          region_id: 0, // TODO: Implement region_id
          region: shippingAddressDto.region,
          region_code: '', // TODO: Implement region_code
          email: shippingAddressDto.email,
          telephone: '', // TODO: Implement telephone
        },
      },
    });

    return {
      payment_methods: magentoShippingAddressResponse.payment_methods,
      totals: magentoShippingAddressResponse.totals,
    };
  }

  createOrderFromCart(cartId: CartId): Promise<void> {
    return this.magentoService.post<void>(`guest-carts/${cartId}/order`);
  }
}
