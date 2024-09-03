interface ExtensionAttributes {
  is_pagebuilder_enabled: boolean;
}

interface Options {
  label: string;
  value: string;
  sort_order: number;
  is_default: boolean;
  store_labels: {
    store_id: number;
    label: string;
  }[];
}

interface StoreFrontendLabels {
  store_id: number;
  label: string;
}

interface ValidationRule {
  key: string;
  value: string;
}

interface CustomAttribute {
  attribute_code: string;
  value: string;
}

export interface MagentoProductAttribute {
  extension_attributes: ExtensionAttributes;
  is_wysiwyg_enabled: boolean;
  is_html_allowed_on_front: boolean;
  used_for_sort_by: boolean;
  is_filterable: boolean;
  is_filterable_in_search: boolean;
  is_used_in_grid: boolean;
  is_visible_in_grid: boolean;
  is_filterable_in_grid: boolean;
  position: number;
  apply_to: string[];
  is_searchable: string;
  is_visible_in_advanced_search: string;
  is_comparable: string;
  is_used_for_promo_rules: string;
  is_visible_on_front: string;
  used_in_product_listing: string;
  is_visible: boolean;
  scope: string;
  attribute_id: number;
  attribute_code: string;
  frontend_input: string;
  entity_type_id: string;
  is_required: boolean;
  options: Options[];
  is_user_defined: boolean;
  default_frontend_label: string;
  frontend_labels: StoreFrontendLabels[];
  note: string;
  backend_type: string;
  backend_model: string;
  source_model: string;
  default_value: string;
  is_unique: string;
  frontend_class: string;
  validation_rules: ValidationRule[];
  custom_attributes: CustomAttribute[];
}

export interface MagentoProductAttributeMapped {
  code: string;
  label: string;
  options: {
    [key: string]: {
      label: string;
      key: string;
    };
  };
}

export interface MagentoProductAttributesMapped {
  [code: string]: MagentoProductAttributeMapped;
}
