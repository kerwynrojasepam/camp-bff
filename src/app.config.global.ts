export const globalConfig = () => ({
  port: process.env.PORT || 3003,
  ecommercePlatform: process.env.ECOMMERCE_PLATFORM,
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
  commerceTools: {
    projectKey: process.env.COMMERCETOOLS_PROJECT_KEY,
    clientId: process.env.COMMERCETOOLS_CLIENT_ID,
    clientSecret: process.env.COMMERCETOOLS_CLIENT_SECRET,
    authUrl: process.env.COMMERCETOOLS_AUTH_URL,
    apiUrl: process.env.COMMERCETOOLS_API_URL,
    scopes: process.env.COMMERCETOOLS_SCOPES,
  },
});
