import { apiClient } from "./apiClient";
import type { BaseFigure } from "../types/base-figure.entity";

export type SkillListQueryResponse = {
  slug: string;
  name: string;
  description?: string | null;
  skills?: Array<{
    id?: string;
    slug?: string;
    name?: string;
    description?: string | null;
  }>;
};

export const fetchSkillListBySlug = async (
  skillListSlug: string,
  signal?: AbortSignal
): Promise<SkillListQueryResponse> => {
  const response = await apiClient.get<SkillListQueryResponse>(
    `/queries/skill-lists/${skillListSlug}`,
    { signal }
  );
  return response.data;
};

export type SpellLoreQueryResponse = {
  slug: string;
  name: string;
  description?: string | null;
  spells?: Array<{
    id?: string;
    slug?: string;
    name?: string;
    description?: string | null;
    difficultyClass?: number | null;
    keywords?: string[] | null;
  }>;
};

export const fetchSpellLoreBySlug = async (
  spellLoreSlug: string,
  signal?: AbortSignal
): Promise<SpellLoreQueryResponse> => {
  const response = await apiClient.get<SpellLoreQueryResponse>(
    `/queries/spell-lores/${spellLoreSlug}`,
    { signal }
  );
  return response.data;
};

export type AdvancementQueryResponse = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  createdAt?: string;
};

export const fetchAdvancements = async (
  signal?: AbortSignal
): Promise<AdvancementQueryResponse[]> => {
  const response = await apiClient.get<AdvancementQueryResponse[]>(
    "/queries/advancements",
    { signal }
  );
  return response.data;
};

export type InjuryQueryResponse = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  createdAt?: string;
};

export const fetchInjuries = async (
  signal?: AbortSignal
): Promise<InjuryQueryResponse[]> => {
  const response = await apiClient.get<InjuryQueryResponse[]>(
    "/queries/injuries",
    { signal }
  );
  return response.data;
};

export type SupernaturalAbilityQueryResponse = {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  category?: string | null;
  cost?: string | number | null;
  createdAt?: string;
};

export const fetchSupernaturalAbilities = async (
  category: string,
  signal?: AbortSignal
): Promise<SupernaturalAbilityQueryResponse[]> => {
  const response = await apiClient.get<SupernaturalAbilityQueryResponse[]>(
    "/queries/supernatural-abilities",
    {
      params: { category },
      signal,
    }
  );
  return response.data;
};

export const fetchMercenaries = async (
  signal?: AbortSignal
): Promise<BaseFigure[]> => {
  const response = await apiClient.get<BaseFigure[]>(
    "/queries/base-figures",
    {
      params: {
        name: "",
        role: "MERCENARIO",
        factionSlug: "",
        race: "",
        quality: "",
      },
      signal,
    }
  );
  return response.data;
};

export const fetchLegends = async (
  signal?: AbortSignal
): Promise<BaseFigure[]> => {
  const response = await apiClient.get<BaseFigure[]>(
    "/queries/base-figures",
    {
      params: {
        name: "",
        role: "LENDA",
        factionSlug: "",
        race: "",
        quality: "",
      },
      signal,
    }
  );
  return response.data;
};

export type ModifierQueryResponse = {
  id: string;
  slug: string;
  name: string;
  category: string;
  effect: string;
  multiplier: number;
};

export const fetchModifiers = async (
  signal?: AbortSignal
): Promise<ModifierQueryResponse[]> => {
  const response = await apiClient.get<ModifierQueryResponse[]>(
    "/queries/modifiers",
    { signal }
  );
  return response.data;
};

export type EquipmentDetailQueryResponse = {
  slug?: string;
  name?: string;
  description?: string | string[] | null;
  effect?: string | null;
  cost?: string | number | null;
  category?: string | null;
  type?: string | null;
  armourBonus?: number | null;
  armorBonus?: number | null;
  damageBonus?: number | null;
  damage?: number | null;
  specialRules?: Array<
    | string
    | {
        label?: string;
        name?: string;
        title?: string;
        value?: string;
        description?: string;
      }
  > | null;
};

export const fetchEquipmentBySlug = async (
  equipmentSlug: string,
  signal?: AbortSignal
): Promise<EquipmentDetailQueryResponse> => {
  const response = await apiClient.get<EquipmentDetailQueryResponse>(
    `/queries/equipments/${equipmentSlug}`,
    { signal }
  );
  return response.data;
};

export type SkillQueryResponse = {
  slug?: string;
  name?: string;
  description?: string | null;
  effect?: string | null;
  keywords?: string[] | null;
};

export const fetchSkillBySlug = async (
  skillSlug: string,
  signal?: AbortSignal
): Promise<SkillQueryResponse> => {
  const response = await apiClient.get<SkillQueryResponse>(
    `/queries/skills/${skillSlug}`,
    { signal }
  );
  return response.data;
};

export type SpellQueryResponse = {
  slug?: string;
  name?: string;
  description?: string | null;
  difficultyClass?: number | null;
  difficulty?: number | null;
  keywords?: string[] | null;
  range?: string | null;
};

export const fetchSpellBySlug = async (
  spellSlug: string,
  signal?: AbortSignal
): Promise<SpellQueryResponse> => {
  const response = await apiClient.get<SpellQueryResponse>(
    `/queries/spells/${spellSlug}`,
    { signal }
  );
  return response.data;
};