import {
  Address,
  Currency,
  Customer,
  FileInfo,
  Shipping,
} from 'src/magento/common.interfaces';

export type MagentoGuestCartId = string;

interface CustomOptionExtensionAttributes {
  file_info: FileInfo;
}

interface CustomOption {
  option_id: string;
  option_value: string;
  extension_attributes: CustomOptionExtensionAttributes;
}

interface OptionExtensionAttributes {
  custom_options: CustomOption[];
  bundle_options: BundleOption[];
  downloadable_option: DownloadableOption | null;
  giftcard_item_option: GiftcardItemOption | null;
  configurable_item_options: ConfigurableItemOption[];
  grouped_options: GroupedOption[];
}

interface ProductOption {
  extension_attributes: OptionExtensionAttributes;
}

export interface CartItem {
  item_id?: number;
  sku?: string;
  qty: number;
  name?: string;
  price?: number;
  product_type?: string;
  quote_id: string;
  product_option?: ProductOption;
  extension_attributes?: ItemExtensionAttributes;
}

interface DiscountData {
  amount: number;
  base_amount: number;
  original_amount: number;
  base_original_amount: number;
}

interface Discount {
  discount_data: DiscountData;
  rule_label: string;
  rule_i_d: number;
}

interface NegotiableQuoteItemExtensionAttributes {
  negotiated_price_type: number;
  negotiated_price_value: number;
  last_item_notes: LastItemNote[] | null;
}

interface NegotiableQuoteItem {
  item_id: number;
  original_price: number;
  original_tax_amount: number;
  original_discount_amount: number;
  extension_attributes: NegotiableQuoteItemExtensionAttributes;
}

interface LastItemNoteExtensionAttributes {}

interface LastItemNote {
  note_id: null;
  negotiable_quote_item_id: null;
  creator_type: null;
  creator_id: null;
  note: null;
  created_at: null;
  extension_attributes: LastItemNoteExtensionAttributes;
}

interface ItemExtensionAttributes {
  discounts: Discount[];
  negotiable_quote_item: NegotiableQuoteItem;
}

interface GroupedOptionExtensionAttributes {}

interface GroupedOption {
  id: number;
  qty: number;
  extension_attributes: GroupedOptionExtensionAttributes;
}

interface ConfigurableItemOptionExtensionAttributes {}

interface ConfigurableItemOption {
  option_id: string;
  option_value: number;
  extension_attributes: ConfigurableItemOptionExtensionAttributes;
}

interface GiftcardItemExtensionAttributes {
  giftcard_created_codes: null[];
}

interface GiftcardItemOption {
  giftcard_amount: string;
  custom_giftcard_amount: number;
  giftcard_sender_name: string;
  giftcard_recipient_name: string;
  giftcard_sender_email: string;
  giftcard_recipient_email: string;
  giftcard_message: string;
  extension_attributes: GiftcardItemExtensionAttributes;
}

interface DownloadableOption {
  downloadable_links: number[];
}

interface BundleOption {
  option_id: number;
  option_qty: number;
  option_selections: null[];
  extension_attributes: NonNullable<unknown>;
}

export interface MagentoGuestCart {
  id: MagentoGuestCartId;
  created_at: string;
  updated_at: string;
  converted_at: string;
  is_active: boolean;
  is_virtual: boolean;
  items: CartItem[];
  items_count: number;
  items_qty: number;
  customer: Customer;
  billing_address: Address;
  reserved_order_id: string;
  orig_order_id: number;
  currency: Currency;
  customer_is_guest: boolean;
  customer_note: string;
  customer_note_notify: boolean;
  customer_tax_class_id: number;
  store_id: number;
  extension_attributes: CartExtensionAttributes;
}

interface CartExtensionAttributes {
  shipping_assignments: ShippingAssignment[];
  negotiable_quote: NegotiableQuote;
  coupon_codes: string[];
}

interface ShippingAssignment {
  shipping: Shipping;
  items: CartItem[];
  extension_attributes: NonNullable<unknown>;
}

interface NegotiableQuote {
  quote_id: number;
  is_regular_quote: boolean;
  status: string;
  negotiated_price_type: number;
  negotiated_price_value: number;
  shipping_price: number;
  quote_name: string;
  expiration_period: string;
  email_notification_status: number;
  has_unconfirmed_changes: boolean;
  is_shipping_tax_changed: boolean;
  is_customer_price_changed: boolean;
  notifications: number;
  applied_rule_ids: string;
  is_address_draft: boolean;
  deleted_sku: string;
  creator_id: number;
  creator_type: number;
  original_total_price: number;
  base_original_total_price: number;
  negotiated_total_price: number;
  base_negotiated_total_price: number;
  extension_attributes: NonNullable<unknown>;
}
