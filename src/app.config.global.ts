export const globalConfig = () => ({
  port: process.env.PORT || 3003,
  magentoAPI:
    process.env.MAGENTO_API_URL || 'https://magento.test/rest/default/V1',
});
