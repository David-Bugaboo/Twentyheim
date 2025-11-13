import type { Faction } from "../../../../types/faction.entity";

export type EquipmentSummary = {
  name: string;
  category?: string;
  cost?: string | number | null;
  description?: string | string[] | undefined;
  specialRules?: Array<{ label?: string; value?: string }>;
  armourBonus?: number | null;
  damageBonus?: number | null;
  slot?: number | null;
  avaiability?: string[];
  exclusions?: string[];
};

export type FigureSummary = NonNullable<Faction["figures"]>[number];

export type FigureStatEntry = {
  label: string;
  key: string;
};

export type EquipmentCatalogFilter =
  | "all"
  | "melee"
  | "ranged"
  | "firearm"
  | "armor"
  | "other";

export type EquipmentSlot =
  | "mainHandEquiped"
  | "offHandEquiped"
  | "twoHandedEquiped"
  | "armorEquiped"
  | "helmetEquiped";

export type SkillListDialogEntry = {
  slug: string;
  name: string;
  description?: string | null;
  skills: Array<{
    slug?: string;
    name?: string;
    description?: string | null;
  }>;
};

export type SpellLoreDialogEntry = {
  slug: string;
  name: string;
  description?: string | null;
  spells: Array<{
    slug?: string;
    name?: string;
    description?: string | null;
    difficultyClass?: number | null;
    keywords?: string[] | null;
  }>;
};

export type SoldierSkillOption = {
  slug: string;
  name: string;
  description?: string | null;
  listSlug: string;
  listName: string;
};

export type SoldierSpellOption = {
  slug: string;
  name: string;
  description?: string | null;
  difficultyClass?: number | null;
  keywords?: string[] | null;
  loreSlug: string;
  loreName: string;
};

export const FIGURE_STATS: FigureStatEntry[] = [
  { label: "Qualidade", key: "quality" },
  { label: "Movimento", key: "movement" },
  { label: "Combate", key: "fight" },
  { label: "Tiro", key: "shoot" },
  { label: "Armadura", key: "armour" },
  { label: "Vontade", key: "will" },
  { label: "Vida", key: "health" },
];

export const EQUIPMENT_CATALOG_FILTERS: Array<{
  key: EquipmentCatalogFilter;
  label: string;
}> = [
  { key: "all", label: "Todos" },
  { key: "melee", label: "Armas corpo a corpo" },
  { key: "ranged", label: "Armas à distância" },
  { key: "firearm", label: "Armas de fogo" },
  { key: "armor", label: "Armaduras" },
  { key: "other", label: "Outros" },
];

export const EQUIPMENT_SLOT_LABELS: Record<EquipmentSlot, string> = {
  mainHandEquiped: "mão principal",
  offHandEquiped: "mão secundária",
  twoHandedEquiped: "duas mãos",
  armorEquiped: "armadura",
  helmetEquiped: "elmo",
};

export const EQUIPPED_SLOT_SECTIONS: Array<{ slot: EquipmentSlot; label: string }> = [
  { slot: "mainHandEquiped", label: "Mão principal" },
  { slot: "offHandEquiped", label: "Mão secundária" },
  { slot: "armorEquiped", label: "Armadura" },
  { slot: "helmetEquiped", label: "Elmo" },
];

