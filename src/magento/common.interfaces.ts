export type CustomerId = string;

export interface Address {
  id: number;
  customer_id: number;
  region: Region;
  region_id: number;
  country_id: string;
  street: string[];
  company: string;
  telephone: string;
  fax: string;
  postcode: string;
  city: string;
  firstname: string;
  lastname: string;
  middlename: string;
  prefix: string;
  suffix: string;
  vat_id: string;
  default_shipping: boolean;
  default_billing: boolean;
  extension_attributes: NonNullable<unknown>;
  custom_attributes: CustomAttribute[];
}

export interface Region {
  region_code: string;
  region: string;
  region_id: number;
  extension_attributes: NonNullable<unknown>;
}

export interface CustomAttribute {
  attribute_code: string;
  value: string;
}

export interface Customer {
  id: number;
  group_id: number;
  default_billing: string;
  default_shipping: string;
  confirmation: string;
  created_at: string;
  updated_at: string;
  created_in: string;
  dob: string;
  email: string;
  firstname: string;
  lastname: string;
  middlename: string;
  prefix: string;
  suffix: string;
  gender: number;
  store_id: number;
  taxvat: string;
  website_id: number;
  addresses: Address[];
  disable_auto_group_change: number;
  extension_attributes: CustomerExtensionAttributes;
  custom_attributes: CustomAttribute[];
}

export interface Currency {
  global_currency_code: string;
  base_currency_code: string;
  store_currency_code: string;
  quote_currency_code: string;
  store_to_base_rate: number;
  store_to_quote_rate: number;
  base_to_global_rate: number;
  base_to_quote_rate: number;
  extension_attributes: NonNullable<unknown>;
}

interface CustomerExtensionAttributes {
  company_attributes: CompanyAttributes;
  is_subscribed: boolean;
  assistance_allowed: number;
}

interface CompanyAttributes {
  customer_id: number;
  company_id: number;
  job_title: string;
  status: number;
  telephone: string;
  extension_attributes: NonNullable<unknown>;
}

export interface FileInfo {
  base64_encoded_data: string;
  type: string;
  name: string;
}

export interface Shipping {
  address: Address;
  method: string;
  extension_attributes: NonNullable<unknown>;
}

export interface PriceValue {
  currencyCode?: string;
  centAmount?: number;
}

export interface Price {
  id?: string;
  value?: PriceValue;
}

export interface Image {
  url?: string;
  label?: string;
}
