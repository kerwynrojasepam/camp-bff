export type MagentoCategoryId = number;

export interface MagentoCategory {
  id: MagentoCategoryId;
  parent_id: MagentoCategoryId;
  name: string;
  is_active: boolean;
  position: number;
  level: number;
  product_count: number;
  children_data: MagentoCategory[];
}
