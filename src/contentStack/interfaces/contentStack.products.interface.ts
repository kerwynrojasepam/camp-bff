import { BaseEntry } from '@contentstack/delivery-sdk';
import { ProductSKU } from 'src/products/interfaces/product.interface';

export interface ProductEntry extends BaseEntry {
  uid: string;
  _version: number;
  locale: string;
  ACL: Record<string, unknown>;
  _in_progress: boolean;
  commercetools_id: ProductSKU;
  created_at: string;
  created_by: string;
  description: string;
  featured_image: {
    _version: number;
    is_dir: boolean;
    uid: string;
    ACL: Record<string, unknown>;
    content_type: string;
    created_at: string;
    created_by: string;
    file_size: string;
    filename: string;
    parent_uid: string;
    tags: string[];
    title: string;
    updated_at: string;
    updated_by: string;
    publish_details: Record<string, unknown>;
    url: string;
  }[];
  price: number;
  promo_section: {
    promo_text: {
      order: number;
      title: string;
      promo_description: string;
    };
  }[];
  seo: {
    meta_title: string;
    meta_description: string;
    keywords: string;
    enable_search_indexing: boolean;
  };
  tags: string[];
  title: string;
  updated_at: string;
  updated_by: string;
  url: string;
  publish_details: {
    time: string;
    user: string;
    environment: string;
    locale: string;
  };
}
