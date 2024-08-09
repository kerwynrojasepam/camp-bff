import { MagentoCategory } from './interfaces/magento.category.interface';
import { Ancestor, Category, Parent } from './interfaces/category.interface';
import { getSlug } from 'src/utils/getSlug';

/**
 * AI-Generated
 * @param {MagentoCategory[]} rootCategories
 * @returns {Category[]}
 */
export const transformMagentoCategories = (
  rootCategories: MagentoCategory[],
): Category[] => {
  const result: Category[] = [];
  const stack: {
    category: MagentoCategory;
    parent: Parent | null;
    ancestors: Ancestor[];
  }[] = [];

  rootCategories.forEach((rootCategory) => {
    stack.push({ category: rootCategory, parent: null, ancestors: [] });
  });

  while (stack.length > 0) {
    const { category, parent, ancestors } = stack.pop()!;

    const currentAncestors: Ancestor[] = [
      ...ancestors,
      ...(parent ? [{ id: parent.id, type: 'category' as const }] : []),
    ];

    const transformedCategory: Category = {
      id: category.id,
      name: category.name,
      description: '', // Assuming no description is available in MagentoCategory
      slug: getSlug(category.id), // Creating a slug from the name
      parent: parent,
      ancestors: currentAncestors,
    };

    result.push(transformedCategory);

    category.children_data.forEach((childCategory) => {
      stack.push({
        category: childCategory,
        parent: { id: category.id },
        ancestors: currentAncestors,
      });
    });
  }

  return result;
};
