import { apiClient } from "./apiClient";

export interface EquipmentCatalogItem {
  id: string;
  slug: string;
  name: string;
  category?: string;
  cost?: number | string | null;
  avaiability?: string[];
  exclusions?: string[];
  damageBonus?: number | null;
  armourBonus?: number | null;
  range?: number | string | null;
  rarity?: number | null;
  slots?: number | null;
  description?: string | string[] | null;
  specialRules?: Array<{ label?: string; value?: string }>;
}

export async function fetchEquipmentCatalog(signal?: AbortSignal) {
  const response = await apiClient.get<EquipmentCatalogItem[]>(
    "/queries/equipments",
    { signal }
  );
  return response.data;
}

