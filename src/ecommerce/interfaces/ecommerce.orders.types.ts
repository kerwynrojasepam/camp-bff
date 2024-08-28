import { CartId } from 'src/carts/interfaces/carts.interface';

export interface EcommerceOrdersService {
  createOrderFromCart(cartId: CartId, cartVersion: number): Promise<void>;
}
