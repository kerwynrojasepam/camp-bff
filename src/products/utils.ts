import { MagentoCategory } from './interfaces/magento.product.interface';
import { Ancestor, Product, Parent } from './interfaces/product.interface';

/**
 * AI-Generated
 * @param {MagentoCategory[]} rootCategories
 * @returns {Product[]}
 */
export const transformMagentoCategories = (
  rootCategories: MagentoCategory[],
): Product[] => {
  const result: Product[] = [];
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

    const transformedCategory: Product = {
      id: category.id,
      name: category.name,
      description: '', // Assuming no description is available in MagentoCategory
      slug: category.name.toLowerCase().replace(/\s+/g, '-'), // Creating a slug from the name
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
