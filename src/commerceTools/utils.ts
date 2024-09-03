import {
  Product,
  ProductSKU,
  ProductVariant,
} from 'src/products/interfaces/product.interface';
import {
  ProductProjection as CTProductProjection,
  ProductVariant as CTProductVariant,
  LineItem,
} from '@commercetools/platform-sdk';

export const transformCTProductVariant = (
  ctProductProjection: CTProductProjection | LineItem,
  ctProductVariant: CTProductVariant,
  langCode: string,
): ProductVariant => ({
  id: ctProductVariant.id,
  sku: ctProductVariant.sku,
  name: [
    ctProductProjection.name[langCode],
    ctProductVariant.attributes.map((attribute) => attribute.value.label),
  ].join(', '),
  prices: ctProductVariant.prices,
  images: ctProductVariant.images,
  attributes: ctProductVariant.attributes,
  slug: ctProductVariant.sku,
  availability: {
    isOnStock: ctProductVariant.availability?.isOnStock,
    availableQty: ctProductVariant.availability?.availableQuantity,
  },
});

export const transformCTProduct = (
  variantSKU: ProductSKU,
  ctProductProjection: CTProductProjection,
  langCode: string,
): Product => {
  return {
    id: ctProductProjection.id,
    slug: ctProductProjection.slug[langCode],
    name: ctProductProjection.name[langCode],
    description: ctProductProjection.description[langCode],
    masterVariant: transformCTProductVariant(
      ctProductProjection,
      ctProductProjection.variants.find(
        (variant) => variant.sku === variantSKU,
      ) ?? ctProductProjection.masterVariant,
      langCode,
    ),
    variants: ctProductProjection.variants.map((ctVariant) =>
      transformCTProductVariant(ctProductProjection, ctVariant, langCode),
    ),
  };
};
