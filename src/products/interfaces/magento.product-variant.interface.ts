export type MagentoProductVariantId = number;
export type MagentoProductVariantSKU = string;

export interface MagentoProductVariant {
  id: MagentoProductVariantId;
  sku: MagentoProductVariantSKU;
  name: string;
  attribute_set_id: number;
  price: number;
  status: number;
  visibility: number;
  type_id: string;
  created_at: string;
  updated_at: string;
  weight: number;
  extension_attributes: MagentoProductVariantExtensionAttributes;
  product_links: MagentoProductLink[];
  options: MagentoProductOption[];
  media_gallery_entries?: MagentoMediaGalleryEntry[];
  tier_prices: MagentoTierPrice[];
  custom_attributes: MagentoCustomAttribute[];
}

interface MagentoProductVariantExtensionAttributes {
  website_ids: number[];
  category_links: MagentoCategoryLink[];
  discounts: MagentoDiscount[];
  bundle_product_options: MagentoBundleProductOption[];
  stock_item: MagentoStockItem;
  downloadable_product_links: MagentoDownloadableProductLink[];
  downloadable_product_samples: MagentoDownloadableProductSample[];
  giftcard_amounts: MagentoGiftcardAmount[];
  configurable_product_options: MagentoConfigurableProductOption[];
  configurable_product_links: number[];
}

interface MagentoCategoryLink {
  position: number;
  category_id: string;
  extension_attributes: Record<string, never>;
}

interface MagentoDiscount {
  discount_data: {
    amount: number;
    base_amount: number;
    original_amount: number;
    base_original_amount: number;
  };
  rule_label: string;
  rule_i_d: number;
}

interface MagentoBundleProductOption {
  option_id: number;
  title: string;
  required: boolean;
  type: string;
  position: number;
  sku: string;
  product_links: MagentoProductLink[];
  extension_attributes: Record<string, never>;
}

interface MagentoStockItem {
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
  extension_attributes: Record<string, never>;
}

interface MagentoDownloadableProductLink {
  id: number;
  title: string;
  sort_order: number;
  is_shareable: number;
  price: number;
  number_of_downloads: number;
  link_type: string;
  link_file: string;
  link_file_content: MagentoFileContent;
  link_url: string;
  sample_type: string;
  sample_file: string;
  sample_file_content: MagentoFileContent;
  sample_url: string;
  extension_attributes: Record<string, never>;
}

interface MagentoFileContent {
  file_data: string;
  name: string;
  extension_attributes: Record<string, never>;
}

interface MagentoDownloadableProductSample {
  id: number;
  title: string;
  sort_order: number;
  sample_type: string;
  sample_file: string;
  sample_file_content: MagentoFileContent;
  sample_url: string;
  extension_attributes: Record<string, never>;
}

interface MagentoGiftcardAmount {
  attribute_id: number;
  website_id: number;
  value: number;
  website_value: number;
  extension_attributes: Record<string, never>;
}

interface MagentoConfigurableProductOption {
  id: number;
  attribute_id: string;
  label: string;
  position: number;
  is_use_default: boolean;
  values: MagentoConfigurableProductOptionValue[];
  extension_attributes: Record<string, never>;
  product_id: number;
}

interface MagentoConfigurableProductOptionValue {
  value_index: number;
  extension_attributes: Record<string, never>;
}

interface MagentoProductLink {
  sku: string;
  link_type: string;
  linked_product_sku: string;
  linked_product_type: string;
  position: number;
  extension_attributes: {
    qty: number;
  };
}

interface MagentoProductOption {
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
  values: MagentoProductOptionValue[];
  extension_attributes: Record<string, never>;
}

interface MagentoProductOptionValue {
  title: string;
  sort_order: number;
  price: number;
  price_type: string;
  sku: string;
  option_type_id: number;
}

interface MagentoMediaGalleryEntry {
  id: number;
  media_type: string;
  label: string;
  position: number;
  disabled: boolean;
  types: string[];
  file: string;
  content: MagentoMediaContent;
  extension_attributes: {
    video_content: MagentoVideoContent;
  };
}

interface MagentoMediaContent {
  base64_encoded_data: string;
  type: string;
  name: string;
}

interface MagentoVideoContent {
  media_type: string;
  video_provider: string;
  video_url: string;
  video_title: string;
  video_description: string;
  video_metadata: string;
}

interface MagentoTierPrice {
  customer_group_id: number;
  qty: number;
  value: number;
  extension_attributes: {
    percentage_value: number;
    website_id: number;
  };
}

interface MagentoCustomAttribute {
  attribute_code: string;
  value: string;
}
