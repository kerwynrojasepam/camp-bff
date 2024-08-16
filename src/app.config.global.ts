export const globalConfig = () => ({
  port: process.env.PORT || 3003,
  magentoAPI:
    process.env.MAGENTO_API_URL || 'https://magento.test/rest/default/V1',
  magentoMedia: {
    catalog: {
      product: {
        image:
          process.env.MAGENTO_MEDIA_CATALOG_PRODUCT_IMAGE_URL ||
          'https://magento.test/media/catalog/product',
      },
    },
  },
});
