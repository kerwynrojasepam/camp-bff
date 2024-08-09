export type CategoryId = number;

export interface Parent {
  id: CategoryId;
}

export interface Ancestor extends Parent {
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
