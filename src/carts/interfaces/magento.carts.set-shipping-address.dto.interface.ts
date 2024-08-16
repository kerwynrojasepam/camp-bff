import { Address, CustomAttribute } from 'src/magento/common.interfaces';

export interface MagentoSetShippingAddressDto {
  addressInformation: AddressInformation;
}

export interface MagentoSetShippingAddressResponse {
  payment_methods: MagentoPaymentMethod[];
  totals: MagentoCartTotals;
  extension_attributes: MagentoSetShippingAddressResponseExtensionAttributes;
}

interface MagentoSetShippingAddressResponseExtensionAttributes {}

export interface MagentoPaymentMethod {
  code: string;
  title: string;
}

export interface MagentoCartTotals {
  grand_total: number;
  base_grand_total: number;
  subtotal: number;
  base_subtotal: number;
  discount_amount: number;
  base_discount_amount: number;
  subtotal_with_discount: number;
  base_subtotal_with_discount: number;
  shipping_amount: number;
  base_shipping_amount: number;
  shipping_discount_amount: number;
  base_shipping_discount_amount: number;
  tax_amount: number;
  base_tax_amount: number;
  shipping_tax_amount: number;
  weee_tax_applied_amount: number;
  sh: number;
  x_amount: number;
  base_shipping_tax_amount: number;
  subtotal_incl_tax: number;
  base_subtotal_incl_tax: number;
  shipping_incl_tax: number;
  base_shipping_incl_tax: number;
  base_currency_code: string;
  quote_currency_code: string;
  coupon_code: string;
  items_qty: number;
  items: Item[];
  total_segments: TotalSegment[];
  extension_attributes: ExtensionAttributes;
}

interface Item {
  item_id: number;
  price: number;
  base_price: number;
  qty: number;
  row_total: number;
  base_row_total: number;
  row_total_with_discount: number;
  tax_amount: number;
  base_tax_amount: number;
  tax_percent: number;
  discount_amount: number;
  base_discount_amount: number;
  discount_percent: number;
  price_incl_tax: number;
  base_price_incl_tax: number;
  row_total_incl_tax: number;
  base_row_total_incl_tax: number;
  options: string;
  weee_tax_applied_amount: number;
  weee_tax_applied: string;
  extension_attributes: ExtensionAttributes;
  name: string;
}

interface TotalSegment {
  code: string;
  title: string;
  value: number;
  area: string;
  extension_attributes: TotalSegmentExtensionAttributes;
}

interface TotalSegmentExtensionAttributes {
  tax_grandtotal_details: TaxGrandtotalDetail[];
  gift_cards: string;
  gw_order_id: string;
  gw_item_ids: string[];
  gw_allow_gift_receipt: string;
  gw_add_card: string;
  gw_price: string;
  gw_base_price: string;
  gw_items_price: string;
  gw_items_base_price: string;
  gw_card_price: string;
  gw_card_base_price: string;
  gw_base_tax_amount: string;
  gw_tax_amount: string;
  gw_items_base_tax_amount: string;
  gw_items_tax_amount: string;
  gw_card_base_tax_amount: string;
  gw_card_tax_amount: string;
  gw_price_incl_tax: string;
  gw_base_price_incl_tax: string;
  gw_card_price_incl_tax: string;
  gw_card_base_price_incl_tax: string;
  gw_items_price_incl_tax: string;
  gw_items_base_price_incl_tax: string;
}

interface TaxGrandtotalDetail {
  amount: number;
  rates: null[];
  group_id: number;
}

interface ExtensionAttributes {
  coupon_label: string;
  negotiable_quote_totals: NegotiableQuoteTotals;
  base_customer_balance_amount: number;
  customer_balance_amount: number;
  coupon_codes: string[];
  coupons_labels: string[];
  reward_points_balance: number;
  reward_currency_amount: number;
  base_reward_currency_amount: number;
}

interface NegotiableQuoteTotals {
  items_count: number;
  quote_status: string;
  created_at: string;
  updated_at: string;
  customer_group: number;
  base_to_quote_rate: number;
  cost_total: number;
  base_cost_total: number;
  original_total: number;
  base_original_total: number;
  original_tax: number;
  base_original_tax: number;
  original_price_incl_tax: number;
  base_original_price_incl_tax: number;
  negotiated_price_type: number;
  negotiated_price_value: number;
}

interface AddressInformationExtensionAttributes {}

interface AddressInformation {
  shipping_address: ShippingAddress;
  billing_address: ShippingAddress;
  shipping_method_code: string;
  shipping_carrier_code: string;
  extension_attributes?: AddressInformationExtensionAttributes;
  custom_attributes?: CustomAttribute[];
}

interface ShippingAddress extends Partial<Omit<Address, 'region'>> {
  customer_address_id?: number;
  email: string;
  region: string;
  region_code: string;
  region_id: number;
}
