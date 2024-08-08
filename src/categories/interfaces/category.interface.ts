export type CategoryId = number;

interface Parent {
  id: CategoryId;
}

interface Ancestor extends Parent {
  type: 'category';
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  slug: string;
  parent: Parent | null;
  ancestors: Ancestor[];
}
