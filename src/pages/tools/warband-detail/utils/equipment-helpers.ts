import type { EquipmentCatalogItem } from "../../../../services/equipment.service";
import type { EquipmentSummary } from "../types";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { Faction } from "../../../../types/faction.entity";
import { normalizeText, normalizeString, getRoleType } from "./helpers";

export const extractEquipment = (
  figure: BaseFigure | NonNullable<Faction["figures"]>[number]
): EquipmentSummary[] => {
  const figureRecord = figure as Record<string, unknown>;
  
  // Tentar diferentes variações do nome do campo de equipamentos disponíveis
  let entries = 
    (figureRecord.avaiableEquipment as unknown) ??
    (figureRecord.availableEquipment as unknown) ??
    (figureRecord.equipment as unknown);
  
  // Se não encontrou equipamentos disponíveis, verificar se é mercenário ou lenda
  // e buscar nos equipamentos iniciais (que estão no baseFigure)
  if (!Array.isArray(entries) || entries.length === 0) {
    const role = figureRecord.role as string | null | undefined;
    const roleType = getRoleType(role);
    const normalizedRole = normalizeString(role ?? "");
    const isMercenary = normalizedRole.includes("mercen");
    const isLegend = roleType === "legend";
    
    if (isMercenary) {
      const mercEquipment = figureRecord.mercenaryStartingEquipment as unknown;
      if (Array.isArray(mercEquipment) && mercEquipment.length > 0) {
        entries = mercEquipment;
      }
    } else if (isLegend) {
      const legendEquipment = figureRecord.legendStartingEquipment as unknown;
      if (Array.isArray(legendEquipment) && legendEquipment.length > 0) {
        entries = legendEquipment;
      }
    }
  }
  
  if (!Array.isArray(entries) || entries.length === 0) {
    return [];
  }

  const results: EquipmentSummary[] = [];

  entries.forEach(entry => {
    // Lidar com strings (apenas slug)
    if (typeof entry === "string") {
      const slug = entry.trim();
      if (!slug) return;
      // Se for apenas um slug, criar um resumo básico
      results.push({
        name: slug,
        category: undefined,
        cost: null,
        description: undefined,
        specialRules: undefined,
        avaiability: undefined,
        exclusions: undefined,
        armourBonus: null,
        damageBonus: null,
      });
      return;
    }
    
    if (!entry || typeof entry !== "object") return;
    const record = entry as Record<string, unknown>;
    
    // Tentar diferentes formas de acessar o objeto do equipamento
    // Para equipamentos iniciais, o objeto pode estar em diferentes lugares
    const equipment =
      (record.avaiableEquipment as Record<string, unknown> | undefined) ??
      (record.equipment as Record<string, unknown> | undefined) ??
      (record.availableEquipment as Record<string, unknown> | undefined) ??
      (record.startingEquipment as Record<string, unknown> | undefined);

    // Se não encontrou o objeto do equipamento, usar o record diretamente
    const base = equipment ?? record;

    // Para equipamentos iniciais, pode ter apenas slug
    const equipmentSlug = 
      (record.equipmentSlug as string | undefined) ??
      (record.startingEquipmentSlug as string | undefined) ??
      (record.slug as string | undefined);

    const name =
      (base?.name as string | undefined) ??
      (record.equipmentName as string | undefined) ??
      (record.name as string | undefined) ??
      (record.label as string | undefined) ??
      equipmentSlug ??
      "Item desconhecido";
    const category = (base?.category as string | undefined) ?? (record.category as string | undefined) ?? undefined;
    const cost =
      (record?.customCost as string | number | undefined) ??
      (base?.cost as string | number | undefined) ??
      (record.cost as string | number | undefined) ??
      (base?.purchaseCost as string | number | undefined) ??
      (base?.sellCost as string | number | undefined) ??
      null;

    const description =
      (base?.description as string | string[] | undefined) ??
      (record.description as string | string[] | undefined) ??
      (base?.effect as string | string[] | undefined) ??
      (record.effect as string | string[] | undefined);

    const specialRules = Array.isArray(base?.specialRules)
      ? (base?.specialRules as Array<{ label?: string; value?: string }>)
      : Array.isArray(record.specialRules)
        ? (record.specialRules as Array<{ label?: string; value?: string }>)
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
    });
  });

  return results;
};

export const checkEquipmentAvailability = (
  equipment: EquipmentCatalogItem | EquipmentSummary | null | undefined,
  warband: { faction?: { name?: string | null; slug?: string | null } | null; factionSlug?: string | null; warbandSoldiers?: Array<{ skills?: Array<{ skillSlug?: string; skill?: { slug?: string; name?: string } }> | null }> } | null
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

  // Regras de negócio globais do bando
  // Se QUALQUER figura do bando tiver "Mestre do Arsenal", pode comprar QUALQUER arma corpo a corpo
  // Se QUALQUER figura do bando tiver "Mestre Atirador", pode comprar QUALQUER arma à distância e de fogo
  try {
    const hasSkillOnWarband = (matcher: (value: string) => boolean) => {
      const soldiers = warband?.warbandSoldiers ?? [];
      for (const soldier of soldiers) {
        const skillLinks = (soldier?.skills ?? []) as Array<{
          skillSlug?: string;
          skill?: { slug?: string; name?: string };
        }>;
        for (const link of skillLinks) {
          const slug = normalizeText(link?.skill?.slug ?? link?.skillSlug ?? "");
          const name = normalizeText(link?.skill?.name ?? "");
          if (matcher(slug) || matcher(name)) return true;
        }
      }
      return false;
    };

    const hasArsenalMaster = hasSkillOnWarband(value =>
      value.includes("mestre-do-arsenal")
    );
    const hasSharpshooter = hasSkillOnWarband(value =>
      value.includes("mestre-atirador")
    );

    if (hasArsenalMaster || hasSharpshooter) {
      const category = normalizeText((equipment as any)?.category ?? "");
      const name = normalizeText((equipment as any)?.name ?? "");

      const isMelee = category.includes("arma corpo a corpo");
      const isRanged =
        category.includes("arma a distancia") ||
        category.includes("arma à distância") ||
        category.includes("arma de disparo") ||
        category.includes("arma de arremesso") ||
        category.includes("arma à dist\u00e2ncia");
      const isFirearm = category.includes("arma de fogo") || name.includes("arma de fogo");

      if ((hasArsenalMaster && isMelee) || (hasSharpshooter && (isRanged || isFirearm))) {
        return { available: true, reason: "Disponível por habilidades do bando." };
      }
    }
  } catch {
    // Silenciar qualquer erro nessa verificação extra
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

