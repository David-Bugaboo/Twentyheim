import type { EquipmentCatalogItem } from "../../../../services/equipment.service";
import type { EquipmentSummary } from "../types";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { Faction } from "../../../../types/faction.entity";
import { normalizeText } from "./helpers";

export const extractEquipment = (
  figure: BaseFigure | NonNullable<Faction["figures"]>[number]
): EquipmentSummary[] => {
  const entries = (figure as Record<string, unknown>).avaiableEquipment;
  if (!Array.isArray(entries)) return [];

  const results: EquipmentSummary[] = [];

  entries.forEach(entry => {
    if (!entry || typeof entry !== "object") return;
    const record = entry as Record<string, unknown>;
    const equipment =
      (record.avaiableEquipment as Record<string, unknown> | undefined) ??
      (record.equipment as Record<string, unknown> | undefined);

    const base = equipment ?? record;

    const name =
      (base?.name as string | undefined) ??
      (record?.equipmentSlug as string | undefined) ??
      "Item desconhecido";
    const category = (base?.category as string | undefined) ?? undefined;
    const cost =
      (record?.customCost as string | number | undefined) ??
      (base?.cost as string | number | undefined) ??
      (base?.purchaseCost as string | number | undefined) ??
      (base?.sellCost as string | number | undefined) ??
      null;

    const description =
      (base?.description as string | string[] | undefined) ??
      (base?.effect as string | string[] | undefined);

    const specialRules = Array.isArray(base?.specialRules)
      ? (base?.specialRules as Array<{ label?: string; value?: string }>)
      : undefined;

    results.push({
      name,
      category,
      cost: cost ?? null,
      description: description ?? undefined,
      specialRules,
      avaiability: Array.isArray(base?.avaiability)
        ? (base?.avaiability as unknown[]).map(entry => String(entry))
        : undefined,
      exclusions: Array.isArray(base?.exclusions)
        ? (base?.exclusions as unknown[]).map(entry => String(entry))
        : undefined,
      armourBonus:
        (base?.armourBonus as number | undefined) ??
        (base?.armorBonus as number | undefined) ??
        null,
      damageBonus:
        (base?.damageBonus as number | undefined) ??
        (base?.damageModifier as number | undefined) ??
        null,
      slot:
        (base?.slot as number | undefined) ??
        (base?.slots as number | undefined) ??
        null,
    });
  });

  return results;
};

export const checkEquipmentAvailability = (
  equipment: EquipmentCatalogItem | EquipmentSummary | null | undefined,
  warband: { faction?: { name?: string | null; slug?: string | null } | null; factionSlug?: string | null } | null
) => {
  if (!equipment) {
    return { available: false, reason: "Item inválido." };
  }

  if (!warband) {
    return {
      available: false,
      reason: "Os dados do bando ainda não foram carregados.",
    };
  }
  const factionTokens = [
    normalizeText(warband.faction?.name),
    normalizeText(warband.faction?.slug),
    normalizeText(warband.factionSlug),
  ].filter(Boolean);

  const availabilityList = (equipment.avaiability ?? []).map(entry =>
    normalizeText(String(entry))
  );
  const exclusionList = (equipment.exclusions ?? []).map(entry =>
    normalizeText(String(entry))
  );

  if (
    exclusionList.length > 0 &&
    factionTokens.some(token => exclusionList.includes(token))
  ) {
    return {
      available: false,
      reason: "Este item não pode ser adquirido por esta facção.",
    };
  }

  if (availabilityList.length === 0) {
    return { available: true, reason: "" };
  }

  if (
    availabilityList.some(entry => entry === "todos" || entry === "all")
  ) {
    return { available: true, reason: "" };
  }

  if (
    factionTokens.some(token => token && availabilityList.includes(token))
  ) {
    return { available: true, reason: "" };
  }

  return {
    available: false,
    reason: "Item indisponível para esta facção.",
  };
};

