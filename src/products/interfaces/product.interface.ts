export type ProductId = number;
export type ProductVariantId = number;
export type ProductSKU = string;

export enum CurrencyCode {
  USD = 'USD',
}

export enum ProductType {
  Simple = 'simple',
  Bundle = 'bundle',
  Configurable = 'configurable',
}

export interface ProductPrice {
  value: {
    currencyCode: CurrencyCode;
    centAmount: number;
  };
}

export interface ProductImage {
  url: string;
}

export interface ProductAttribute {
  name: string;
  value: {
    key: string;
    label: string;
  };
}

export interface ProductVariant {
  id: ProductVariantId;
  sku: ProductSKU;
  name: string;
  prices: ProductPrice[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  slug: string;
}

export interface Product {
  id: ProductId;
  name: string;
  description: string;
  slug: string;
  variants: ProductVariant[];
  masterVariant: ProductVariant;
}

export interface ProductsResponse {
  results: Product[];
  total: number;
  limit: number;
  offset: number;
}
