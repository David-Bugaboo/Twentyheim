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
