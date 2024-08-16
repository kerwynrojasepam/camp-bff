import { getCurrentPage } from 'src/utils/getCurrentPage';
import {
  MagentoProductAttribute,
  MagentoProductAttributeMapped,
} from './interfaces/magento.product-attribute.interface';
import { CategoryId } from 'src/categories/interfaces/category.interface';

/**
 * Retrieves the mapped product attribute based on the provided Magento attribute.
 * @param {MagentoProductAttribute} magentoAttribute - The Magento product attribute.
 * @returns {MagentoProductAttributeMapped} The mapped product attribute.
 */
export const getMappedProductAttribute = (
  magentoAttribute: MagentoProductAttribute,
): MagentoProductAttributeMapped => {
  return {
    code: magentoAttribute.attribute_code,
    label: magentoAttribute.default_frontend_label,
    options: magentoAttribute.options.reduce(
      (mappedAttribute, option) => {
        mappedAttribute[option.value] = {
          label: option.label,
          key: option.value,
        };

        return mappedAttribute;
      },
      {} as MagentoProductAttributeMapped['options'],
    ),
  };
};

/**
 * Retrieves the URL to get products by category.
 * @param {CategoryId} categoryId
 * @param {number} offset
 * @param {number} limit
 * @returns {string} The URL to get products by category.
 * @example getProductsByCategoryUrl(1, 0, 10);
 */
export const getProductsByCategoryUrl = (
  categoryId: CategoryId,
  offset: number,
  limit: number,
) => {
  const VISIBILITY_HIDDEN = 1;
  const queryParams = new URLSearchParams();
  queryParams.set(
    'searchCriteria[filter_groups][0][filters][0][field]',
    'category_id',
  );
  queryParams.set(
    'searchCriteria[filter_groups][0][filters][0][value]',
    `${categoryId}`,
  );
  queryParams.set(
    'searchCriteria[filter_groups][0][filters][0][condition_type]',
    'eq',
  );
  queryParams.set(
    'searchCriteria[filter_groups][1][filters][0][field]',
    'visibility',
  );
  queryParams.set(
    'searchCriteria[filter_groups][1][filters][0][value]',
    `${VISIBILITY_HIDDEN}`,
  );
  queryParams.set(
    'searchCriteria[filter_groups][1][filters][0][condition_type]',
    'neq',
  );

  if (offset) {
    queryParams.set(
      'searchCriteria[currentPage]',
      getCurrentPage(offset, limit).toString(),
    );
  }
  if (limit) {
    queryParams.set('searchCriteria[pageSize]', limit.toString());
  }

  return `products?${queryParams.toString()}`;
};
