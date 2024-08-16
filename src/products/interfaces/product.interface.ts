import { Image, Price } from 'src/magento/common.interfaces';

export type ProductId = number;
export type ProductVariantId = string;
export type ProductSKU = string;

export enum CurrencyCode {
  USD = 'USD',
}

export enum ProductType {
  Simple = 'simple',
  Bundle = 'bundle',
  Configurable = 'configurable',
}

export interface ProductVariant {
  id: ProductVariantId;
  sku: ProductSKU;
  name: string;
  prices: Price[];
  images: ProductImage[];
  attributes: ProductAttribute[];
  slug: string;
  availability?: ProductVariantAvailability;
}

export interface ProductVariantAvailability {
  isOnStock?: boolean;
  availableQty?: number;
}

export interface ProductImage extends Image {}

export interface ProductAttribute {
  name: string;
  value: {
    key: string;
    label: string;
  };
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
