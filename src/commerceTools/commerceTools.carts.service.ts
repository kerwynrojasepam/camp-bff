import { Injectable } from '@nestjs/common';
import { CommerceToolsService } from './commerceTools.service';
import { ByProjectKeyCartsRequestBuilder } from '@commercetools/platform-sdk';
import { EcommerceCartsService } from 'src/ecommerce/interfaces/ecommerce.carts.types';
import {
  Cart,
  CartId,
  CartResponse,
} from 'src/carts/interfaces/carts.interface';
import { CurrencyCode } from 'src/products/interfaces/product.interface';
import { v4 as uuidv4 } from 'uuid';
import {
  AddLineItemDto,
  AddUpdateItemResponse,
  ChangeLineItemQuantityDto,
  RemoveLineItemDto,
  RemoveLineItemResponse,
  SetShippingAddressDto,
  SetShippingAddressResponse,
} from 'src/carts/interfaces/carts.dto.interface';
import { CommerceToolsOrdersService } from './commerceTools.orders.service';
import { transformCTProductVariant } from './utils';

@Injectable()
export class CommerceToolsCartsService implements EcommerceCartsService {
  private ctCartsRequestBuilder: ByProjectKeyCartsRequestBuilder;

  constructor(
    private readonly commerceToolsService: CommerceToolsService,
    private readonly commerceToolsOrdersService: CommerceToolsOrdersService,
  ) {
    this.ctCartsRequestBuilder = this.commerceToolsService
      .getCommerceToolsRequestBuilder()
      .carts();
  }

  async createCart(): Promise<Cart> {
    const { body: ctCart } = await this.ctCartsRequestBuilder
      .post({
        body: {
          currency: CurrencyCode.USD,
        },
      })
      .execute();

    return {
      id: ctCart.id,
      version: ctCart.version,
      customerId: ctCart.anonymousId || uuidv4(),
      lineItems: [],
      totalPrice: {
        currencyCode: CurrencyCode.USD,
        centAmount: 0,
      },
      totalQuantity: 0,
    };
  }

  async getCart(cartId: CartId): Promise<CartResponse> {
    const { body: ctCart } = await this.ctCartsRequestBuilder
      .withId({ ID: cartId })
      .get()
      .execute();

    return {
      id: ctCart.id,
      version: ctCart.version,
      customerId: ctCart.anonymousId || uuidv4(),
      lineItems: ctCart.lineItems.map((lineItem) => ({
        id: lineItem.id,
        variant: transformCTProductVariant(
          lineItem,
          lineItem.variant,
          this.commerceToolsService.langCode,
        ),
        item_id: lineItem.id,
        quantity: lineItem.quantity,
        totalPrice: lineItem.totalPrice.centAmount,
        currencyCode: ctCart.totalPrice.currencyCode,
        sku: lineItem.variant?.sku,
        qty: lineItem.quantity,
        name: lineItem.name[this.commerceToolsService.langCode],
        price: lineItem.totalPrice.centAmount,
        product_type: lineItem.productType.id,
        quote_id: ctCart.id,
      })),
      totalPrice: ctCart.totalPrice,
      totalQuantity: ctCart.totalLineItemQuantity,
    };
  }

  async addLineItem(
    cartId: CartId,
    addLineItemDto: AddLineItemDto,
  ): Promise<AddUpdateItemResponse> {
    const addItemSKU = addLineItemDto.AddLineItem.variantId;
    const cart = await this.getCart(cartId);

    const { body: ctCart } = await this.ctCartsRequestBuilder
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'addLineItem',
              sku: addItemSKU,
              quantity: addLineItemDto.AddLineItem.quantity,
            },
          ],
        },
      })
      .execute();

    const addedItem = ctCart.lineItems.find(
      (lineItem) => lineItem.variant.sku === addItemSKU,
    );

    return {
      item_id: addedItem.id,
      sku: addItemSKU,
      qty: addedItem.quantity,
      name: addedItem.name[this.commerceToolsService.langCode],
      price: addedItem.totalPrice.centAmount,
      product_type: addedItem.productType.id,
      quote_id: ctCart.id,
    };
  }

  async changeLineItemQuantity(
    cartId: CartId,
    changeLineItemQtyDto: ChangeLineItemQuantityDto,
  ): Promise<AddUpdateItemResponse> {
    const lineItemId = `${changeLineItemQtyDto.ChangeLineItemQuantity.lineItemId}`;
    const cart = await this.getCart(cartId);

    const { body: ctCart } = await this.ctCartsRequestBuilder
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity: changeLineItemQtyDto.ChangeLineItemQuantity.quantity,
            },
          ],
        },
      })
      .execute();

    const changedItem = ctCart.lineItems.find(
      (lineItem) => lineItem.id === lineItemId,
    );

    return {
      item_id: changedItem.id,
      sku: changedItem.variant.sku,
      qty: changedItem.quantity,
      name: changedItem.name[this.commerceToolsService.langCode],
      price: changedItem.totalPrice.centAmount,
      product_type: changedItem.productType.id,
      quote_id: ctCart.id,
    };
  }

  async removeLineItem(
    cartId: CartId,
    removeLineItemDto: RemoveLineItemDto,
  ): Promise<RemoveLineItemResponse> {
    const lineItemId = `${removeLineItemDto.RemoveLineItem.lineItemId}`;
    const cart = await this.getCart(cartId);

    const { body: ctCart } = await this.ctCartsRequestBuilder
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId,
            },
          ],
        },
      })
      .execute();

    const removedItem = ctCart.lineItems.find(
      (lineItem) => lineItem.id === lineItemId,
    );

    const isItemRemoved = !removedItem;

    return isItemRemoved;
  }

  async setShippingAddress(
    cartId: CartId,
    setShippingAddressDto: SetShippingAddressDto,
  ): Promise<SetShippingAddressResponse> {
    const shippingAddress = setShippingAddressDto.SetShippingAddress;
    const cart = await this.getCart(cartId);

    const { body: ctCart } = await this.ctCartsRequestBuilder
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'setShippingAddress',
              address: {
                firstName: shippingAddress.firstName,
                lastName: shippingAddress.lastName,
                streetName: shippingAddress.streetName,
                streetNumber: shippingAddress.streetNumber,
                postalCode: shippingAddress.postalCode,
                city: shippingAddress.city,
                region: shippingAddress.region,
                country: shippingAddress.country,
                email: shippingAddress.email,
              },
            },
          ],
        },
      })
      .execute();

    return {
      payment_methods: ctCart.paymentInfo?.payments.map((payment) => ({
        code: payment.obj.id,
        title: payment.obj.key,
      })),
      totals: {},
    };
  }

  async createOrderFromCart(cartId: CartId): Promise<void> {
    const cart = await this.getCart(cartId);

    return this.commerceToolsOrdersService.createOrderFromCart(
      cartId,
      cart.version,
    );
  }
}
