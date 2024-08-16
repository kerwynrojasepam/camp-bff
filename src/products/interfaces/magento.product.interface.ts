export type MagentoProductId = number;
export type MagentoProductSKU = string;

export interface MagentoProductsResponseGet {
  items: MagentoProduct[];
  search_criteria: {
    page_size: number;
    current_page: number;
  };
  total_count: number;
}

export interface MagentoProduct {
  id: MagentoProductId;
  sku: MagentoProductSKU;
  name: string;
  attribute_set_id: number;
  price: number;
  status: number;
  visibility: number;
  type_id: string;
  created_at: string;
  updated_at: string;
  weight: number;
  extension_attributes: ExtensionAttributes;
  product_links: ProductLink[];
  options: Option[];
  media_gallery_entries: MediaGalleryEntry[];
  tier_prices: TierPrice[];
  custom_attributes: CustomAttribute[];
}

interface ExtensionAttributes {
  website_ids: number[];
  category_links: CategoryLink[];
  discounts: Discount[];
  bundle_product_options: BundleProductOption[];
  stock_item: StockItem;
  downloadable_product_links: DownloadableProductLink[];
  downloadable_product_samples: DownloadableProductSample[];
  giftcard_amounts: GiftcardAmount[];
  configurable_product_options: ConfigurableProductOption[];
  configurable_product_links: number[];
}

interface CategoryLink {
  position: number;
  category_id: string;
  extension_attributes: any; // Specify further if more details are known
}

interface Discount {
  discount_data: DiscountData;
  rule_label: string;
  rule_i_d: number;
}

interface DiscountData {
  amount: number;
  base_amount: number;
  original_amount: number;
  base_original_amount: number;
}

interface BundleProductOption {
  option_id: number;
  title: string;
  required: boolean;
  type: string;
  position: number;
  sku: string;
  product_links: BundleProductLink[];
  extension_attributes: any; // Specify further if more details are known
}

interface BundleProductLink {
  id: number | null;
  sku: string | null;
  option_id: number | null;
  qty: number | null;
  position: number | null;
  is_default: boolean | null;
  price: number | null;
  price_type: string | null;
  can_change_quantity: boolean | null;
  extension_attributes: any | null; // Specify further if more details are known
}

interface StockItem {
  item_id: number;
  product_id: number;
  stock_id: number;
  qty: number;
  is_in_stock: boolean;
  is_qty_decimal: boolean;
  show_default_notification_message: boolean;
  use_config_min_qty: boolean;
  min_qty: number;
  use_config_min_sale_qty: number;
  min_sale_qty: number;
  use_config_max_sale_qty: boolean;
  max_sale_qty: number;
  use_config_backorders: boolean;
  backorders: number;
  use_config_notify_stock_qty: boolean;
  notify_stock_qty: number;
  use_config_qty_increments: boolean;
  qty_increments: number;
  use_config_enable_qty_inc: boolean;
  enable_qty_increments: boolean;
  use_config_manage_stock: boolean;
  manage_stock: boolean;
  low_stock_date: string;
  is_decimal_divided: boolean;
  stock_status_changed_auto: number;
  extension_attributes: any; // Specify further if more details are known
}

interface DownloadableProductLink {
  id: number;
  title: string;
  sort_order: number;
  is_shareable: number;
  price: number;
  number_of_downloads: number;
  link_type: string;
  link_file: string;
  link_file_content: LinkFileContent;
  link_url: string;
  sample_type: string;
  sample_file: string;
  sample_file_content: LinkFileContent;
  sample_url: string;
  extension_attributes: any; // Specify further if more details are known
}

interface LinkFileContent {
  file_data: string;
  name: string;
  extension_attributes: any; // Specify further if more details are known
}

interface DownloadableProductSample {
  id: number;
  title: string;
  sort_order: number;
  sample_type: string;
  sample_file: string;
  sample_file_content: LinkFileContent;
  sample_url: string;
  extension_attributes: any; // Specify further if more details are known
}

interface GiftcardAmount {
  attribute_id: number;
  website_id: number;
  value: number;
  website_value: number;
  extension_attributes: any; // Specify further if more details are known
}

interface ConfigurableProductOption {
  id: number;
  attribute_id: string;
  label: string;
  position: number;
  is_use_default: boolean;
  values: ConfigurableProductOptionValue[];
  extension_attributes: any; // Specify further if more details are known
  product_id: number;
}

interface ConfigurableProductOptionValue {
  value_index: number | null;
  extension_attributes: any | null; // Specify further if more details are known
}

interface ProductLink {
  sku: string;
  link_type: string;
  linked_product_sku: string;
  linked_product_type: string;
  position: number;
  extension_attributes: {
    qty: number;
  };
}

interface Option {
  product_sku: string;
  option_id: number;
  title: string;
  type: string;
  sort_order: number;
  is_require: boolean;
  price: number;
  price_type: string;
  sku: string;
  file_extension: string;
  max_characters: number;
  image_size_x: number;
  image_size_y: number;
  values: OptionValue[];
  extension_attributes: any; // Specify further if more details are known
}

interface OptionValue {
  title: string;
  sort_order: number;
  price: number;
  price_type: string;
  sku: string;
  option_type_id: number;
}

interface MediaGalleryEntry {
  id: number;
  media_type: string;
  label: string;
  position: number;
  disabled: boolean;
  types: string[];
  file: string;
  content: MediaContent;
  extension_attributes: MediaGalleryExtensionAttributes;
}

interface MediaContent {
  base64_encoded_data: string;
  type: string;
  name: string;
}

interface MediaGalleryExtensionAttributes {
  video_content: VideoContent;
}

interface VideoContent {
  media_type: string;
  video_provider: string;
  video_url: string;
  video_title: string;
  video_description: string;
  video_metadata: string;
}

interface TierPrice {
  customer_group_id: number;
  qty: number;
  value: number;
  extension_attributes: TierPriceExtensionAttributes;
}

interface TierPriceExtensionAttributes {
  percentage_value: number;
  website_id: number;
}

interface CustomAttribute {
  attribute_code: string;
  value: string;
}
