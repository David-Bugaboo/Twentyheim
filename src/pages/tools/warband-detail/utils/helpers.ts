import type { ExtraSkillListToWarbandSoldier } from "../../../../types/extra-skill-list-to-warband-soldier.entity";
import type { ExtraSpellLoreToWarbandSoldier } from "../../../../types/extra-spell-lore-to-warband-soldier.entity";

export type SpecialRuleEntry = {
  label: string;
  value: string;
};

export const normalizeString = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const parseSpecialRules = (specialRules: unknown): SpecialRuleEntry[] => {
  if (!specialRules) return [];

  const normalizeValue = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  };

  if (typeof specialRules === "string") {
    return [{ label: "Regra Especial", value: specialRules }];
  }

  if (Array.isArray(specialRules)) {
    return specialRules.flatMap(item => {
      if (!item) return [];
      if (typeof item === "string") {
        return [{ label: "Regra Especial", value: item }];
      }
      if (typeof item === "object") {
        const label =
          "label" in item && typeof item.label === "string"
            ? item.label
            : "Regra Especial";
        const value =
          "value" in item && item.value != null
            ? normalizeValue(item.value)
            : "description" in item && item.description != null
              ? normalizeValue(item.description)
              : normalizeValue(item);
        return [{ label, value }];
      }
      return [{ label: "Regra Especial", value: normalizeValue(item) }];
    });
  }

  if (typeof specialRules === "object") {
    return Object.entries(specialRules).map(([key, value]) => ({
      label: key,
      value: normalizeValue(value),
    }));
  }

  return [{ label: "Regra Especial", value: normalizeValue(specialRules) }];
};

export const extractSkillListSlugs = (figure: unknown): string[] => {
  if (!figure || typeof figure !== "object") {
    return [];
  }
  const record = figure as Record<string, unknown>;
  const raw = record.skillLists;
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw
    .map(entry => {
      if (!entry) return "";
      if (typeof entry === "string") return entry;
      if (typeof entry === "object" && "skillListSlug" in entry) {
        const slug = (entry as { skillListSlug?: unknown }).skillListSlug;
        return typeof slug === "string" ? slug : "";
      }
      return "";
    })
    .filter(slug => slug.length > 0);
};

export const extractSpellLoreSlugs = (figure: unknown): string[] => {
  if (!figure || typeof figure !== "object") {
    return [];
  }
  const record = figure as Record<string, unknown>;
  const raw = record.spellLores;
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw
    .map(entry => {
      if (!entry) return "";
      if (typeof entry === "string") return entry;
      if (typeof entry === "object" && "spellLoreSlug" in entry) {
        const slug = (entry as { spellLoreSlug?: unknown }).spellLoreSlug;
        return typeof slug === "string" ? slug : "";
      }
      return "";
    })
    .filter(slug => slug.length > 0);
};

export const extractExtraSkillListSlugs = (
  extras?: ExtraSkillListToWarbandSoldier[] | null
): string[] => {
  if (!extras || extras.length === 0) {
    return [];
  }
  return extras
    .map(entry => entry?.skillListSlug ?? "")
    .filter(slug => typeof slug === "string" && slug.length > 0);
};

export const extractExtraSpellLoreSlugs = (
  extras?: ExtraSpellLoreToWarbandSoldier[] | null
): string[] => {
  if (!extras || extras.length === 0) {
    return [];
  }
  return extras
    .map(entry => entry?.spellLoreSlug ?? "")
    .filter(slug => typeof slug === "string" && slug.length > 0);
};

const crownsNumberFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const formatCrownsValue = (value: unknown): string => {
  if (value === null || value === undefined) return "-";
  if (typeof value === "number" && Number.isFinite(value)) {
    return `${crownsNumberFormatter.format(value)} coroas`;
  }
  const str = String(value).trim();
  if (!str) return "-";
  const numeric = Number(str.replace(/[^\d.-]/g, ""));
  if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
    return `${crownsNumberFormatter.format(numeric)} coroas`;
  }
  if (/[a-zA-Z]/.test(str) && !/[0-9]/.test(str)) {
    return str;
  }
  if (/coroas?/i.test(str) || /\bc\b$/i.test(str)) {
    return str;
  }
  return `${str} coroas`;
};

export const hasSpecialRuleLabel = (specialRules: unknown, search: string) => {
  if (!specialRules) return false;
  const normalizedSearch = normalizeString(search);

  const checkLabel = (value: unknown): boolean => {
    if (!value) return false;

    if (typeof value === "string") {
      return normalizeString(value) === normalizedSearch;
    }

    if (typeof value === "object") {
      const record = value as Record<string, unknown>;

      if (record.label) {
        return normalizeString(String(record.label)) === normalizedSearch;
      }

      if ("name" in record && record.name) {
        return normalizeString(String(record.name)) === normalizedSearch;
      }
    }

    return false;
  };

  if (Array.isArray(specialRules)) {
    return specialRules.some(entry => checkLabel(entry));
  }

  if (typeof specialRules === "object") {
    const record = specialRules as Record<string, unknown>;
    if (record.label || record.name) {
      return checkLabel(record);
    }

    return Object.values(record).some(value => checkLabel(value));
  }

  return false;
};

export const getSkillListLabel = (entry: unknown) => {
  if (!entry || typeof entry !== "object") return "Lista desconhecida";
  const record = entry as Record<string, unknown>;
  return (
    (record.name as string | undefined) ??
    ((record.skillList as Record<string, unknown> | undefined)?.name as
      | string
      | undefined) ??
    (record.skillListSlug as string | undefined) ??
    (record.slug as string | undefined) ??
    "Lista desconhecida"
  );
};

export const getSpellLoreLabel = (entry: unknown) => {
  if (!entry || typeof entry !== "object") return "Tradição desconhecida";
  const record = entry as Record<string, unknown>;
  return (
    (record.name as string | undefined) ??
    ((record.spellLore as Record<string, unknown> | undefined)?.name as
      | string
      | undefined) ??
    (record.spellLoreSlug as string | undefined) ??
    (record.slug as string | undefined) ??
    "Tradição desconhecida"
  );
};

export const formatDate = (value?: string | Date) => {
  if (!value) return "-";
  try {
    const date = value instanceof Date ? value : new Date(value);
    return date.toLocaleDateString("pt-BR");
  } catch {
    return String(value);
  }
};

export const normalizeText = (value: string | null | undefined): string =>
  value ? normalizeString(value) : "";

export const formatEquipmentCost = (
  value: number | string | null | undefined
): string => {
  if (value === null || value === undefined || value === "") return "-";
  const formatted = formatCrownsValue(value);
  return formatted === "-" ? String(value) : formatted;
};

export const formatEquipmentStat = (
  value: number | string | null | undefined
): string => {
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
};

export const normalizeRole = (role: string | null | undefined): string =>
  normalizeText(role);

export const getRoleType = (role: string | null | undefined) => {
  const normalized = normalizeRole(role);
  if (normalized.includes("lider") || normalized.includes("leader")) {
    return "leader" as const;
  }
  if (normalized.includes("heroi") || normalized.includes("hero")) {
    return "hero" as const;
  }
  if (normalized.includes("lenda") || normalized.includes("legend")) {
    return "legend" as const;
  }
  return "soldier" as const;
};

/**
 * Verifica se uma figura (mercenário ou lenda) está disponível para um bando
 * Baseado na lógica do backend:
 * - Deve estar nas inclusions (availability) E não estar nas exclusions
 * - Se tem "Todos" na availability, não pode estar nas exclusions
 * - Se o bando está diretamente na availability, está disponível
 */
export const isFigureAvailableForWarband = (
  figure: { avaiability?: string[] | null; exclusions?: string[] | null },
  warbandFactionSlug: string | null
): boolean => {
  if (!warbandFactionSlug) return false;

  const availability = figure.avaiability ?? [];
  const exclusions = figure.exclusions ?? [];
  const factionSlug = normalizeString(warbandFactionSlug);

  // Verifica se tem "Todos" na disponibilidade (comparação exata, não includes)
  const hasTodos = availability.some(
    av => normalizeString(av) === "todos"
  );

  // Verifica se o bando está nas exclusions
  const isExcluded = exclusions.some(
    ex => normalizeString(ex) === factionSlug
  );

  // Verifica se o bando está diretamente na disponibilidade
  const isInAvailability = availability.some(
    av => normalizeString(av) === factionSlug
  );

  // Regra: (tem "Todos" E não está excluído) OU está diretamente na availability
  return (hasTodos && !isExcluded) || isInAvailability;
};

