import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { StatRow } from "./CommonComponents";
import MobileText from "../../../../components/MobileText";
import { SkillsSection } from "./SkillsSection";
import { SpellsSection } from "./SpellsSection";
import { AdvancementsSection } from "./AdvancementsSection";
import { InjuriesSection } from "./InjuriesSection";
import { SurvivalRollSection } from "./SurvivalRollSection";
import { SupernaturalAbilitySection } from "./SupernaturalAbilitySection";
import { CollapsibleSection } from "./CollapsibleSection";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type {
  BaseFigure,
  NaturalAttack as BaseNaturalAttack,
} from "../../../../types/base-figure.entity";
import type { EquipmentToWarbandSoldier } from "../../../../types/equipment-to-warband-soldier.entity";
import type { InjuryToWarbandSoldier } from "../../../../types/injury-to-warband-soldier.entity";
import type { SuperNaturalAbilityToWarbandSoldier } from "../../../../types/super-natural-ability-to-warband-soldier.entity";
import type { SkillToWarbandSoldier } from "../../../../types/skill-to-warband-soldier.entity";
import type { ExtraSkillListToWarbandSoldier } from "../../../../types/extra-skill-list-to-warband-soldier.entity";
import type { ExtraSpellLoreToWarbandSoldier } from "../../../../types/extra-spell-lore-to-warband-soldier.entity";
import type { EquipmentToVault } from "../../../../types/equipment-to-vault.entity";
import type { AdvancementToWarbandSoldier } from "../../../../types/advancement-to-warband-soldier.entity";
import type { EquipmentSlot } from "../types";
import type { SkillAttributeModifiers } from "../../../../types/skill.entity";
import { EQUIPMENT_SLOT_LABELS, EQUIPPED_SLOT_SECTIONS } from "../types";
import EditIcon from "@mui/icons-material/Edit";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import {
  formatDate,
  normalizeString,
  hasSpecialRuleLabel,
  parseSpecialRules,
  getRoleType,
  formatCrownsValue,
} from "../utils/helpers";
import { extractEquipment } from "../utils/equipment-helpers";
import { useEquipmentManagement } from "../hooks/useEquipmentManagement";
import type { SpellToWarbandSoldier } from "../../../../types/spell-to-warband-soldier.entity";
import GameText from "../../../../components/GameText";
import racialLimitsData from "../../../campanha/data/racial-limits.data.json";
import { toast } from "react-toastify";
import {
  updateSoldier,
  type SoldierMiscModifierPayload,
} from "../../../../services/soldiers.service";
import type { FigureToAvaiableEquipment } from "../../../../types/figure-to-avaiable-equipment.entity";

type AttributeKey =
  | "movement"
  | "fight"
  | "shoot"
  | "armour"
  | "strength"
  | "will"
  | "health";

const ATTRIBUTE_CONFIG: Array<{
  key: AttributeKey;
  label: string;
  signed: boolean;
}> = [
  { key: "movement", label: "Movimento", signed: false },
  { key: "fight", label: "Ímpeto", signed: true },
  { key: "shoot", label: "Precisão", signed: true },
  { key: "armour", label: "Armadura", signed: false },
  { key: "strength", label: "Força", signed: true },
  { key: "will", label: "Vontade", signed: true },
  { key: "health", label: "Vida", signed: false },
];

const ATTRIBUTE_TO_MODIFIER_KEY: Record<
  AttributeKey,
  keyof SkillAttributeModifiers
> = {
  movement: "move",
  fight: "fight",
  shoot: "shoot",
  armour: "armour",
  strength: "strength",
  will: "will",
  health: "health",
};

const PAYLOAD_FIELD_MAP: Record<
  AttributeKey,
  keyof SoldierMiscModifierPayload
> = {
  movement: "move",
  fight: "fight",
  shoot: "shoot",
  armour: "armour",
  strength: "strength",
  will: "will",
  health: "health",
};

type AttributeTotals = Record<AttributeKey, number>;

const createEmptyTotals = (): AttributeTotals => ({
  movement: 0,
  fight: 0,
  shoot: 0,
  armour: 0,
  strength: 0,
  will: 0,
  health: 0,
});

const parseStatToNumber = (
  value: number | string | null | undefined
): number | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }
  const trimmed = String(value).trim();
  if (!trimmed) return null;
  const normalized = trimmed.replace(",", ".");
  let parsed = Number(normalized);
  if (Number.isNaN(parsed)) {
    parsed = parseInt(normalized, 10);
  }
  if (Number.isNaN(parsed)) {
    return null;
  }
  return parsed;
};

const normalizeModifierList = (
  modifiers:
    | SkillAttributeModifiers
    | (SkillAttributeModifiers | null | undefined)[]
    | null
    | undefined
): (SkillAttributeModifiers | null | undefined)[] => {
  if (Array.isArray(modifiers)) {
    return modifiers;
  }
  if (modifiers) {
    return [modifiers];
  }
  return [];
};

type RacialLimit = Partial<Record<AttributeKey, number>>;

const RACIAL_LIMITS_MAP: Record<string, RacialLimit> = (() => {
  const map: Record<string, RacialLimit> = {};
  (racialLimitsData as Array<Record<string, unknown>>).forEach(entry => {
    const race = entry["Raça"];
    if (typeof race !== "string") return;
    const normalizedRace = normalizeString(race);
    if (!normalizedRace) return;

    const getLimitValue = (key: string): number | undefined => {
      const limitValue = parseStatToNumber(
        entry[key] as number | string | null | undefined
      );
      return limitValue ?? undefined;
    };

    map[normalizedRace] = {
      movement: getLimitValue("Mov"),
      fight: getLimitValue("Imp"),
      strength: getLimitValue("For"),
      shoot: getLimitValue("Prec"),
      armour: getLimitValue("Arm"),
      will: getLimitValue("Vont"),
      health: getLimitValue("Vida"),
    };
  });
  return map;
})();

const getRacialLimits = (race?: string | null): RacialLimit | null => {
  if (!race) return null;
  const normalizedRace = normalizeString(race);
  if (!normalizedRace) return null;
  return RACIAL_LIMITS_MAP[normalizedRace] ?? null;
};

const formatNumber = (value: number): string =>
  Number.isInteger(value) ? value.toString() : value.toFixed(2);

const formatStatValue = (
  value: number | null | undefined,
  signed: boolean
): string => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  if (signed) {
    if (value > 0) return `+${formatNumber(value)}`;
    if (value === 0) return "0";
  }
  return formatNumber(value);
};

const EMPTY_MISC_MODIFIER: SoldierMiscModifierPayload = {
  move: 0,
  fight: 0,
  shoot: 0,
  armour: 0,
  will: 0,
  health: 0,
  strength: 0,
};

const convertToPayload = (
  modifier: SkillAttributeModifiers | null | undefined
): SoldierMiscModifierPayload => ({
  move: modifier?.move ?? 0,
  fight: modifier?.fight ?? 0,
  shoot: modifier?.shoot ?? 0,
  armour: modifier?.armour ?? 0,
  will: modifier?.will ?? 0,
  health: modifier?.health ?? 0,
  strength: modifier?.strength ?? 0,
});

const normalizePayloadValue = (value: number): number =>
  Number.isFinite(value) ? value : 0;

const normalizePayload = (
  payload: SoldierMiscModifierPayload
): SoldierMiscModifierPayload => ({
  move: normalizePayloadValue(payload.move),
  fight: normalizePayloadValue(payload.fight),
  shoot: normalizePayloadValue(payload.shoot),
  armour: normalizePayloadValue(payload.armour),
  will: normalizePayloadValue(payload.will),
  health: normalizePayloadValue(payload.health),
  strength: normalizePayloadValue(payload.strength),
});

export interface SoldierDetailSectionProps {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  factionSlug: string | null;
  relations: {
    equipment: EquipmentToWarbandSoldier[];
    skills: SkillToWarbandSoldier[];
    spells: unknown[];
    advancements: AdvancementToWarbandSoldier[];
    injuries: InjuryToWarbandSoldier[];
    supernatural: SuperNaturalAbilityToWarbandSoldier[];
    // gifts foi removido - não é mais usado
  };
  equipableVaultItems: EquipmentToVault[];
  soldierExtraSkillLists: ExtraSkillListToWarbandSoldier[];
  soldierExtraSpellLores: ExtraSpellLoreToWarbandSoldier[];
  warbandId: string | null;
  onReload: () => Promise<void>;
  heroSkillOptions: Array<{ slug: string; name: string }>;
  onPromoteHero: (
    soldierId: string,
    skillsListSlugs: string[]
  ) => Promise<void> | void;
  onPromoteLeader: (soldierId: string) => Promise<void> | void;
  promoteHeroLoading: boolean;
  promoteLeaderLoading: boolean;
  hasLeaderInWarband: boolean;
  promotionRequest: { soldierId: string; type: "hero" | "leader" } | null;
  onClearPromotionRequest: () => void;
}

type SoldierDetailContentProps = Omit<
  SoldierDetailSectionProps,
  "selectedSoldier"
> & {
  selectedSoldier: WarbandSoldier;
};

type DisplayNaturalAttack = BaseNaturalAttack & { source?: string };

const SoldierDetailContent: React.FC<SoldierDetailContentProps> = ({
  selectedSoldier,
  selectedBaseFigure,
  factionSlug,
  relations,
  equipableVaultItems,
  soldierExtraSkillLists,
  soldierExtraSpellLores,
  warbandId,
  onReload,
  heroSkillOptions,
  onPromoteHero,
  onPromoteLeader,
  promoteHeroLoading,
  promoteLeaderLoading,
  hasLeaderInWarband,
  promotionRequest,
  onClearPromotionRequest,
}) => {
  const {
    selectedVaultEquipmentId,
    setSelectedVaultEquipmentId,
    equipFromVaultLoading,
    returningEquipmentId,
    equipmentSlotAction,
    equippedExpanded,
    setEquippedExpanded,
    inventoryExpanded,
    setInventoryExpanded,
    equipmentState,
    unequippedEquipment,
    handleEquipFromVault,
    handleReturnEquipmentToVault,
    handleEquipEquipmentSlot,
    handleUnequipEquipmentSlot,
  } = useEquipmentManagement({
    selectedSoldier,
    relations,
    equipableVaultItems,
    warbandId,
    onReload,
  });

  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [attributeDialogOpen, setAttributeDialogOpen] = useState(false);
  const [nameFormValue, setNameFormValue] = useState("");
  const [notesFormValue, setNotesFormValue] = useState("");
  const [miscModifiersForm, setMiscModifiersForm] =
    useState<SoldierMiscModifierPayload>({ ...EMPTY_MISC_MODIFIER });
  const [savingName, setSavingName] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [savingMiscModifiers, setSavingMiscModifiers] = useState(false);
  const [specialRulesExpanded, setSpecialRulesExpanded] = useState(true);
  const [promoteHeroDialogOpen, setPromoteHeroDialogOpen] = useState(false);
  const [promoteLeaderDialogOpen, setPromoteLeaderDialogOpen] = useState(false);
  const [heroSkillSelection, setHeroSkillSelection] = useState<{
    first: string;
    second: string;
  }>({ first: "", second: "" });
  const [heroSelectionError, setHeroSelectionError] = useState<string | null>(
    null
  );

  const baseFigureAvailableEquipment = ((
    selectedBaseFigure as {
      avaiableEquipment?: FigureToAvaiableEquipment[];
    } | null
  )?.avaiableEquipment ?? []) as FigureToAvaiableEquipment[];
  const hasBaseFigureAvailableEquipment =
    baseFigureAvailableEquipment.length > 0;

  // Verificar quais slots devem aparecer baseado nos equipamentos disponíveis da figura base
  const availableEquipmentList = selectedBaseFigure
    ? extractEquipment(selectedBaseFigure)
    : [];

  // Também verificar os dados brutos da figura base como fallback
  const checkEquipmentInRawData = (searchTerms: string[]): boolean => {
    if (!selectedBaseFigure) return false;
    const rawEquipment = (
      selectedBaseFigure as unknown as Record<string, unknown>
    ).avaiableEquipment;
    if (!Array.isArray(rawEquipment)) return false;

    return rawEquipment.some(entry => {
      if (!entry || typeof entry !== "object") return false;
      const record = entry as Record<string, unknown>;
      const equipment = record.avaiableEquipment ?? record.equipment ?? record;
      const categoryRaw = (equipment as Record<string, unknown>)?.category;
      const category = normalizeString(
        typeof categoryRaw === "string" ? categoryRaw : ""
      );
      const name = normalizeString(
        ((equipment as Record<string, unknown>)?.name as string) ??
          (record.equipmentSlug as string) ??
          ""
      );

      return searchTerms.some(term => {
        // Verifica se a categoria é exatamente igual ao termo ou contém o termo
        return (
          category === term || category.includes(term) || name.includes(term)
        );
      });
    });
  };

  const hasWeaponsAvailable =
    availableEquipmentList.some(eq => {
      const category = normalizeString(eq.category ?? "");
      const name = normalizeString(eq.name ?? "");
      return (
        category.includes("arma") ||
        category.includes("weapon") ||
        name.includes("arma") ||
        name.includes("weapon")
      );
    }) || checkEquipmentInRawData(["arma", "weapon"]);

  const hasArmorAvailable =
    availableEquipmentList.some(eq => {
      const category = normalizeString(eq.category ?? "");
      const name = normalizeString(eq.name ?? "");
      return (
        category.includes("armadura") ||
        category.includes("armor") ||
        category.includes("armour") ||
        name.includes("armadura") ||
        name.includes("armor") ||
        name.includes("armour")
      );
    }) || checkEquipmentInRawData(["armadura", "armor", "armour"]);

  const hasHelmetAvailable =
    availableEquipmentList.some(eq => {
      const category = normalizeString(eq.category ?? "");
      const name = normalizeString(eq.name ?? "");
      // Verifica se a categoria é exatamente "elmo" ou contém "elmo"/"helmet"
      return (
        category === "elmo" ||
        category.includes("elmo") ||
        category.includes("helmet") ||
        name.includes("elmo") ||
        name.includes("helmet")
      );
    }) || checkEquipmentInRawData(["elmo", "helmet"]);

  const hasShieldAvailable =
    availableEquipmentList.some(eq => {
      const category = normalizeString(eq.category ?? "");
      const name = normalizeString(eq.name ?? "");
      return (
        category.includes("escudo") ||
        category.includes("shield") ||
        name.includes("escudo") ||
        name.includes("shield")
      );
    }) || checkEquipmentInRawData(["escudo", "shield"]);

  // Slots aparecem se houver equipamentos disponíveis que possam ser equipados neles
  const shouldShowMainHandSlot = hasWeaponsAvailable;
  const shouldShowOffHandSlot = hasWeaponsAvailable || hasShieldAvailable;
  const shouldShowArmorSlot = hasArmorAvailable;
  const shouldShowHelmetSlot = hasHelmetAvailable;

  const shouldShowEquipmentSections = hasBaseFigureAvailableEquipment;

  useEffect(() => {
    setNameFormValue(selectedSoldier?.campaignName ?? "");
  }, [selectedSoldier?.campaignName]);

  useEffect(() => {
    setNotesFormValue(selectedSoldier?.notes ?? "");
  }, [selectedSoldier?.notes]);

  useEffect(() => {
    const existingRaw = selectedSoldier?.miscModifiers;
    if (existingRaw) {
      setMiscModifiersForm(convertToPayload(existingRaw));
    } else {
      setMiscModifiersForm({ ...EMPTY_MISC_MODIFIER });
    }
  }, [selectedSoldier?.miscModifiers]);

  // Verificar se é mercenário ou lenda baseado no role (priorizando effectiveRole)
  const effectiveRole = selectedSoldier?.effectiveRole;
  const role = effectiveRole ?? selectedBaseFigure?.role ?? "";
  const roleUpper = String(role).toUpperCase();
  const isMercenary =
    roleUpper === "MERCENARIO" || roleUpper.includes("MERCENARIO");
  const isLegend =
    roleUpper === "LENDA" ||
    roleUpper === "LEGENDA" ||
    roleUpper.includes("LENDA");
  const isMercenaryOrLegend = isMercenary || isLegend;

  // Verificar se tem equipamentos iniciais para mercenários ou lendas
  const baseFigureRecord = selectedBaseFigure as unknown as Record<
    string,
    unknown
  >;
  const mercenaryStartingEquipment =
    baseFigureRecord.mercenaryStartingEquipment as unknown[] | undefined;
  const legendStartingEquipment = baseFigureRecord.legendStartingEquipment as
    | unknown[]
    | undefined;
  const hasMercenaryStartingEquipment =
    Array.isArray(mercenaryStartingEquipment) &&
    mercenaryStartingEquipment.length > 0;
  const hasLegendStartingEquipment =
    Array.isArray(legendStartingEquipment) &&
    legendStartingEquipment.length > 0;
  const hasStartingEquipment =
    (isMercenary && hasMercenaryStartingEquipment) ||
    (isLegend && hasLegendStartingEquipment);

  // Para mercenários e lendas, verificar equipamentos do warbandSoldier para determinar slots
  let finalShouldShowMainHandSlot = shouldShowMainHandSlot;
  let finalShouldShowOffHandSlot = shouldShowOffHandSlot;
  let finalShouldShowArmorSlot = shouldShowArmorSlot;
  let finalShouldShowHelmetSlot = shouldShowHelmetSlot;
  let finalShouldShowEquipmentSections = shouldShowEquipmentSections;

  if (isMercenaryOrLegend && hasStartingEquipment) {
    // Verificar equipamentos do warbandSoldier
    const soldierEquipment = relations.equipment ?? [];
    const hasAnyEquipment = soldierEquipment.length > 0;

    // Verificar se tem armadura nos equipamentos do warbandSoldier
    const hasArmorInInventory = soldierEquipment.some(item => {
      const category = item.equipment?.category ?? "";
      const normalizedCategory = normalizeString(category);
      const isHelmet =
        normalizedCategory === "elmo" || normalizedCategory.includes("elmo");
      // Elmos NÃO contam como armaduras para esta checagem
      if (isHelmet) return false;
      return (
        normalizedCategory === "armadura" ||
        normalizedCategory.includes("armadura") ||
        normalizedCategory === "armor" ||
        normalizedCategory.includes("armor") ||
        normalizedCategory === "armour" ||
        normalizedCategory.includes("armour")
      );
    });

    // Verificar se tem elmo nos equipamentos do warbandSoldier
    const hasHelmetInInventory = soldierEquipment.some(item => {
      const category = item.equipment?.category ?? "";
      const normalizedCategory = normalizeString(category);
      return (
        normalizedCategory === "elmo" || normalizedCategory.includes("elmo")
      );
    });

    // Mão principal e secundária sempre mostram se tiver equipamentos
    finalShouldShowMainHandSlot = hasAnyEquipment;
    finalShouldShowOffHandSlot = hasAnyEquipment;

    // Armadura só mostra se tiver equipamento com categoria Armadura
    finalShouldShowArmorSlot = hasArmorInInventory;

    // Elmo só mostra se tiver equipamento com categoria Elmo
    finalShouldShowHelmetSlot = hasHelmetInInventory;

    // Seções aparecem se tiver equipamentos iniciais
    finalShouldShowEquipmentSections = hasStartingEquipment;
  } else if (hasStartingEquipment) {
    // Para outros casos com equipamentos iniciais, manter a lógica anterior
    finalShouldShowMainHandSlot =
      hasStartingEquipment || shouldShowMainHandSlot;
    finalShouldShowOffHandSlot = hasStartingEquipment || shouldShowOffHandSlot;
    finalShouldShowArmorSlot = hasStartingEquipment || shouldShowArmorSlot;
    finalShouldShowHelmetSlot = hasStartingEquipment || shouldShowHelmetSlot;
    finalShouldShowEquipmentSections =
      hasStartingEquipment || shouldShowEquipmentSections;
  }
  const hasTwoWeaponFighting = Boolean(
    (selectedSoldier as { twoWeaponFighting?: boolean } | null)
      ?.twoWeaponFighting
  );
  const narrativeName = selectedSoldier.campaignName?.trim() ?? "";
  const selectedSoldierId = selectedSoldier.id;
  const baseFigureQuality =
    parseStatToNumber(
      (selectedBaseFigure as unknown as Record<string, unknown>)?.quality as
        | number
        | string
        | null
        | undefined
    ) ?? 0;
  const baseFigureUpkeepRaw =
    (selectedBaseFigure as unknown as Record<string, unknown>)?.upkeep ?? null;
  const baseFigureUpkeepValue =
    typeof baseFigureUpkeepRaw === "number"
      ? baseFigureUpkeepRaw
      : typeof baseFigureUpkeepRaw === "string"
        ? Number(baseFigureUpkeepRaw.replace(/[^\d.-]/g, ""))
        : 0;

  type AttributeContribution = {
    label: string;
    value: number;
  };

  type AttributeSummary = {
    baseRaw: number | string | null;
    baseNumeric: number;
    total: number;
    contributions: AttributeContribution[];
  };

  let attributeCard: React.ReactNode = null;
  let attributeSummaries: Record<AttributeKey, AttributeSummary> | null = null;

  if (selectedBaseFigure) {
    const baseStatNumeric = createEmptyTotals();
    const baseStatOriginal: Record<AttributeKey, number | null> = {
      movement: null,
      fight: null,
      shoot: null,
      armour: null,
      strength: null,
      will: null,
      health: null,
    };
    const baseStatRaw: Record<AttributeKey, number | string | null> = {
      movement: null,
      fight: null,
      shoot: null,
      armour: null,
      strength: null,
      will: null,
      health: null,
    };

    ATTRIBUTE_CONFIG.forEach(({ key }) => {
      const raw = (selectedBaseFigure as unknown as Record<string, unknown>)[
        key
      ] as number | string | null | undefined;
      baseStatRaw[key] = raw ?? null;
      const parsed = parseStatToNumber(raw);
      baseStatOriginal[key] = parsed;
      baseStatNumeric[key] = parsed ?? 0;
    });

    const racialLimits = getRacialLimits(selectedBaseFigure.race);
    const isAnao = normalizeString(selectedBaseFigure.race ?? "") === "anao";

    const advancementEntries = relations.advancements.map(entry => ({
      label: `Avanço: ${entry.advancement?.name ?? entry.advancementSlug}`,
      modifier: entry.advancement?.attributeModifiers ?? null,
    }));

    const baseMiscEntries = normalizeModifierList(
      selectedBaseFigure.miscModifiers
    ).map(modifier => ({
      label: "Modificador da Figura",
      modifier,
    }));

    const injuryEntries = relations.injuries.map(entry => ({
      label: `Ferimento: ${entry.injury?.name ?? entry.injurySlug}`,
      modifier: entry.injury?.attributeModifiers ?? null,
    }));

    const skillEntries = relations.skills.map(entry => ({
      label: `Habilidade: ${
        entry.skill?.name ?? entry.skillSlug ?? "Desconhecida"
      }`,
      modifier: entry.skill?.attributeModifiers ?? null,
    }));

    const supernaturalEntries = relations.supernatural.map(entry => ({
      label: `Habilidade Sobrenatural: ${
        entry.superNaturalAbility?.name ??
        entry.superNaturalAbilitySlug ??
        "Desconhecida"
      }`,
      modifier: entry.superNaturalAbility?.attributeModifiers ?? null,
    }));

    const equipmentEntries = relations.equipment
      .filter(
        item =>
          item.mainHandEquiped ||
          item.offHandEquiped ||
          item.armorEquiped ||
          item.helmetEquiped ||
          item.twoHandedEquiped
      )
      .map(item => {
        const equipmentName =
          item.equipment?.name ?? item.equipmentSlug ?? "Desconhecido";
        const equipmentRecord = item.equipment as
          | (Record<string, unknown> & {
              armourBonus?: number | null;
              armorBonus?: number | null;
              movementPenalty?: number | null;
            })
          | undefined;
        const armourBonusRaw = (() => {
          const direct = equipmentRecord
            ? equipmentRecord["armourBonus"]
            : null;
          if (typeof direct === "number") return direct;
          const alt = equipmentRecord ? equipmentRecord["armorBonus"] : null;
          return typeof alt === "number" ? alt : null;
        })();
        const movementPenaltyRaw =
          equipmentRecord &&
          typeof equipmentRecord["movementPenalty"] === "number"
            ? (equipmentRecord["movementPenalty"] as number)
            : null;
        const category = item.equipment?.category ?? "";
        const normalizedCategory = category ? normalizeString(category) : "";
        const normalizedName = equipmentName
          ? normalizeString(equipmentName)
          : "";
        const isShield =
          normalizedCategory.includes("escudo") ||
          normalizedCategory.includes("shield") ||
          normalizedName.includes("escudo") ||
          normalizedName.includes("shield");
        const isArmour =
          normalizedCategory.includes("armadura") ||
          normalizedCategory.includes("armour") ||
          normalizedCategory.includes("armor") ||
          item.armorEquiped === true;
        const armourBonusContribution =
          isArmour || isShield
            ? typeof armourBonusRaw === "number" &&
              !Number.isNaN(armourBonusRaw)
              ? armourBonusRaw
              : null
            : null;
        const movementPenaltyContribution =
          isArmour &&
          typeof movementPenaltyRaw === "number" &&
          !Number.isNaN(movementPenaltyRaw)
            ? -Math.abs(movementPenaltyRaw)
            : null;

        // Verifica se está apenas na mão secundária
        const isOnlyOffHand =
          item.offHandEquiped === true &&
          !item.mainHandEquiped &&
          !item.armorEquiped &&
          !item.helmetEquiped &&
          !item.twoHandedEquiped;

        // Obtém os attributeModifiers do equipamento base
        const equipmentAttributeModifiers =
          equipmentRecord?.attributeModifiers as
            | {
                movement?: number;
                fight?: number;
                shoot?: number;
                armour?: number;
                will?: number;
                health?: number;
                strength?: number;
              }
            | null
            | undefined;

        // Combina os modificadores do equipamento base com os do modificador aplicado
        // Se estiver apenas na offhand, ignora ambos
        let combinedModifier: SkillAttributeModifiers | null = null;
        if (!isOnlyOffHand) {
          const modifierAttrMods = item.modifier?.attributeModifiers ?? null;
          const baseAttrMods = equipmentAttributeModifiers ?? null;

          // Combina os dois, somando os valores se ambos existirem
          if (modifierAttrMods || baseAttrMods) {
            combinedModifier = {
              move:
                (modifierAttrMods?.move ?? 0) + (baseAttrMods?.movement ?? 0),
              fight:
                (modifierAttrMods?.fight ?? 0) + (baseAttrMods?.fight ?? 0),
              shoot:
                (modifierAttrMods?.shoot ?? 0) + (baseAttrMods?.shoot ?? 0),
              armour:
                (modifierAttrMods?.armour ?? 0) + (baseAttrMods?.armour ?? 0),
              will: (modifierAttrMods?.will ?? 0) + (baseAttrMods?.will ?? 0),
              health:
                (modifierAttrMods?.health ?? 0) + (baseAttrMods?.health ?? 0),
              strength:
                (modifierAttrMods?.strength ?? 0) +
                (baseAttrMods?.strength ?? 0),
            };
          }
        }

        return {
          label: `Equipamento: ${equipmentName}`,
          modifier: combinedModifier,
          armourBonusContribution,
          movementPenaltyContribution,
          isOnlyOffHand,
        };
      });

    const soldierMiscModifier = selectedSoldier.miscModifiers;
    const soldierMiscEntries = soldierMiscModifier
      ? [
          {
            label: "Modificador Personalizado",
            modifier: soldierMiscModifier,
          },
        ]
      : [];

    const attributeSummaryMap: Record<AttributeKey, AttributeSummary> = {
      movement: {
        baseRaw: baseStatRaw.movement,
        baseNumeric: baseStatNumeric.movement,
        total: baseStatNumeric.movement,
        contributions: [],
      },
      fight: {
        baseRaw: baseStatRaw.fight,
        baseNumeric: baseStatNumeric.fight,
        total: baseStatNumeric.fight,
        contributions: [],
      },
      shoot: {
        baseRaw: baseStatRaw.shoot,
        baseNumeric: baseStatNumeric.shoot,
        total: baseStatNumeric.shoot,
        contributions: [],
      },
      armour: {
        baseRaw: baseStatRaw.armour,
        baseNumeric: baseStatNumeric.armour,
        total: baseStatNumeric.armour,
        contributions: [],
      },
      strength: {
        baseRaw: baseStatRaw.strength,
        baseNumeric: baseStatNumeric.strength,
        total: baseStatNumeric.strength,
        contributions: [],
      },
      will: {
        baseRaw: baseStatRaw.will,
        baseNumeric: baseStatNumeric.will,
        total: baseStatNumeric.will,
        contributions: [],
      },
      health: {
        baseRaw: baseStatRaw.health,
        baseNumeric: baseStatNumeric.health,
        total: baseStatNumeric.health,
        contributions: [],
      },
    };

    const applyContribution = (
      attribute: AttributeKey,
      label: string,
      rawValue: number | null | undefined,
      respectLimit = false
    ) => {
      if (!rawValue || Number.isNaN(rawValue) || rawValue === 0) return;
      const summary = attributeSummaryMap[attribute];
      const before = summary.total;
      let after = before + rawValue;
      if (respectLimit) {
        const limitValue = racialLimits?.[attribute];
        if (typeof limitValue === "number" && !Number.isNaN(limitValue)) {
          after = Math.min(after, limitValue);
        }
      }
      const delta = after - before;
      if (delta !== 0) {
        summary.contributions.push({ label, value: delta });
        summary.total = after;
      }
    };

    ATTRIBUTE_CONFIG.forEach(({ key }) => {
      const modifierProperty = ATTRIBUTE_TO_MODIFIER_KEY[key];

      advancementEntries.forEach(entry => {
        const value = entry.modifier?.[modifierProperty] ?? 0;
        applyContribution(key, entry.label, value, true);
      });

      baseMiscEntries.forEach(entry => {
        const value = entry.modifier?.[modifierProperty] ?? 0;
        applyContribution(key, entry.label, value, false);
      });

      injuryEntries.forEach(entry => {
        const value = entry.modifier?.[modifierProperty] ?? 0;
        applyContribution(key, entry.label, value, false);
      });

      skillEntries.forEach(entry => {
        const value = entry.modifier?.[modifierProperty] ?? 0;
        applyContribution(key, entry.label, value, false);
      });

      supernaturalEntries.forEach(entry => {
        const value = entry.modifier?.[modifierProperty] ?? 0;
        applyContribution(key, entry.label, value, false);
      });

      equipmentEntries.forEach(entry => {
        // Anões ignoram modificadores de movimento de equipamentos (positivos e negativos)
        if (key === "movement" && isAnao) {
          return; // Ignora modificadores de movimento de equipamentos para anões
        }

        // Ignora modificadores de atributos de equipamentos apenas na mão secundária
        if (entry.isOnlyOffHand) {
          return; // Ignora modificadores de atributos de equipamentos apenas na mão secundária
        }

        // Aplica modificadores do equipamento (combina attributeModifiers do equipamento base + modificador)
        const value = entry.modifier?.[modifierProperty] ?? 0;
        applyContribution(key, entry.label, value, false);
      });

      if (key === "armour") {
        equipmentEntries.forEach(entry => {
          if (
            typeof entry.armourBonusContribution === "number" &&
            entry.armourBonusContribution !== 0
          ) {
            applyContribution(
              "armour",
              `${entry.label} (Bônus de Armadura)`,
              entry.armourBonusContribution,
              false
            );
          }
        });
      }

      if (key === "movement") {
        // Anões ignoram modificadores de movimento de equipamentos (positivos e negativos)
        if (!isAnao) {
          equipmentEntries.forEach(entry => {
            if (
              typeof entry.movementPenaltyContribution === "number" &&
              entry.movementPenaltyContribution !== 0
            ) {
              applyContribution(
                "movement",
                `${entry.label} (Penalidade de Movimento)`,
                entry.movementPenaltyContribution,
                false
              );
            }
          });
        }
      }

      if (key === "fight" && hasTwoWeaponFighting) {
        applyContribution(key, "Lutando com Duas Armas", 1, false);
      }

      soldierMiscEntries.forEach(entry => {
        const value = entry.modifier?.[modifierProperty] ?? 0;
        applyContribution(key, entry.label, value, false);
      });
    });

    attributeSummaries = attributeSummaryMap;

    const statRows: React.ReactNode[] = [];
    if ((selectedBaseFigure.quality ?? 0) > 0) {
      statRows.push(
        <StatRow
          key="quality"
          label="Qualidade"
          value={selectedBaseFigure.quality ?? "-"}
        />
      );
    }

    ATTRIBUTE_CONFIG.forEach(({ key, label, signed }) => {
      const summary = attributeSummaryMap[key];
      const baseValue = summary.baseNumeric;
      const totalValue = summary.total;
      const diff = totalValue - baseValue;
      let valueClassName: string | undefined;
      if (diff > 0) {
        valueClassName = "text-green-400";
      } else if (diff < 0) {
        valueClassName = "text-red-400";
      }

      let displayValue = formatStatValue(totalValue, signed);
      if (summary.contributions.length === 0 && summary.baseRaw != null) {
        const raw = summary.baseRaw;
        if (typeof raw === "string" && raw.trim().length > 0) {
          displayValue = raw;
        }
      }

      statRows.push(
        <StatRow
          key={key}
          label={label}
          value={displayValue}
          valueClassName={valueClassName}
        />
      );
    });

    attributeCard = (
      <div className="rounded border border-green-700/40 bg-[#101010] p-3">
        <div className="mb-2 flex items-center justify-between">
          <h5 className="font-semibold text-green-300">Atributos</h5>
          <button
            type="button"
            onClick={() => setAttributeDialogOpen(true)}
            className="rounded border border-green-500/60 bg-green-900/20 px-2 py-1 text-xs font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
          >
            ±
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">{statRows}</div>
      </div>
    );
  }

  const handleSaveCampaignName = useCallback(async () => {
    if (!selectedSoldierId) return;
    const trimmed = nameFormValue.trim();
    try {
      setSavingName(true);
      await updateSoldier(selectedSoldierId, {
        campaignName: trimmed.length > 0 ? trimmed : null,
      });
      toast.success("Nome narrativo atualizado.");
      await onReload();
      setNameDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível atualizar o nome narrativo.");
    } finally {
      setSavingName(false);
    }
  }, [nameFormValue, onReload, selectedSoldierId]);

  const handleSaveNotes = useCallback(async () => {
    if (!selectedSoldierId) return;
    const trimmed = notesFormValue.trim();
    try {
      setSavingNotes(true);
      await updateSoldier(selectedSoldierId, {
        notes: trimmed.length > 0 ? trimmed : null,
      });
      toast.success("Notas atualizadas.");
      await onReload();
      setNotesDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível atualizar as notas da figura.");
    } finally {
      setSavingNotes(false);
    }
  }, [notesFormValue, onReload, selectedSoldierId]);

  const handleMiscModifierChange = useCallback(
    (field: keyof SoldierMiscModifierPayload, value: string) => {
      setMiscModifiersForm(prev => {
        const numeric = Number(value);
        return {
          ...prev,
          [field]: Number.isNaN(numeric) ? 0 : numeric,
        };
      });
    },
    []
  );

  const handleSaveMiscModifiers = useCallback(async () => {
    if (!selectedSoldierId) return;
    try {
      setSavingMiscModifiers(true);
      const normalized = normalizePayload({
        ...EMPTY_MISC_MODIFIER,
        ...miscModifiersForm,
      });

      await updateSoldier(selectedSoldierId, {
        miscModifiers: normalized,
      });
      toast.success("Modificador personalizado atualizado.");
      await onReload();
      setAttributeDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível atualizar o modificador personalizado.");
    } finally {
      setSavingMiscModifiers(false);
    }
  }, [miscModifiersForm, onReload, selectedSoldierId]);

  const baseNaturalAttacks: DisplayNaturalAttack[] = Array.isArray(
    selectedBaseFigure?.naturalAttacks
  )
    ? (selectedBaseFigure?.naturalAttacks ?? []).map(attack => ({
        ...attack,
        range: attack.range ?? undefined,
        source: selectedBaseFigure?.name
          ? `Figura Base: ${selectedBaseFigure.name}`
          : undefined,
      }))
    : [];

  const abilityNaturalAttacks: DisplayNaturalAttack[] = relations.supernatural
    .map(entry => {
      const ability = entry.superNaturalAbility;
      if (!ability?.extraNaturalAttack) {
        return null;
      }
      const attack = ability.extraNaturalAttack;
      return {
        ...attack,
        range: attack.range ?? undefined,
        source: ability.name
          ? `Habilidade Sobrenatural: ${ability.name}`
          : `Habilidade Sobrenatural (${entry.superNaturalAbilitySlug})`,
      } as DisplayNaturalAttack;
    })
    .filter((attack): attack is DisplayNaturalAttack => attack !== null);

  const skillNaturalAttacks: DisplayNaturalAttack[] = relations.skills
    .map(entry => {
      const skill = entry.skill;
      if (!skill) return null;

      const naturalAttack = (skill as any).extraNaturalAttack ?? null;

      if (!naturalAttack) return null;

      return {
        ...naturalAttack,
        range: naturalAttack.range ?? undefined,
        source: skill.name
          ? `Habilidade: ${skill.name}`
          : `Habilidade (${entry.skillSlug ?? skill.slug})`,
      } as DisplayNaturalAttack;
    })
    .filter(
      (attack): attack is DisplayNaturalAttack =>
        attack !== null && attack !== undefined
    );

  const combinedNaturalAttacks: DisplayNaturalAttack[] = [
    ...baseNaturalAttacks,
    ...abilityNaturalAttacks,
    ...skillNaturalAttacks,
  ];

  const combinedSpecialRules = useMemo(() => {
    const rules: Array<{
      label: string;
      value: string;
      source?: string;
    }> = [];

    const baseFigureRules = parseSpecialRules(
      selectedBaseFigure?.specialRules ?? null
    );
    baseFigureRules.forEach(entry => {
      rules.push({
        label: entry.label,
        value: entry.value,
        source: selectedBaseFigure?.name
          ? `Figura Base: ${selectedBaseFigure.name}`
          : "Figura Base",
      });
    });

    const soldierExtraRules = parseSpecialRules(
      selectedSoldier?.extraSpecialRules ?? null
    );
    soldierExtraRules.forEach(entry => {
      rules.push({
        label: entry.label,
        value: entry.value,
        source: "Regra Extra",
      });
    });

    return rules;
  }, [
    selectedBaseFigure?.specialRules,
    selectedBaseFigure?.name,
    selectedSoldier?.extraSpecialRules,
  ]);

  const advancementSummary = useMemo(() => {
    let skillAdvancements = 0;
    let spellAdvancements = 0;
    let fortifyAdvancements = 0;
    relations.advancements.forEach(entry => {
      const rawSlug =
        entry.advancement?.slug ??
        (entry as unknown as { advancementSlug?: string }).advancementSlug ??
        "";
      if (!rawSlug) return;
      const normalized = rawSlug
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      if (normalized.includes("nova") && normalized.includes("habilidade")) {
        skillAdvancements += 1;
      } else if (normalized.includes("nova") && normalized.includes("magia")) {
        spellAdvancements += 1;
      } else if (
        normalized.includes("fortal") &&
        normalized.includes("magia")
      ) {
        fortifyAdvancements += 1;
      }
    });
    return { skillAdvancements, spellAdvancements, fortifyAdvancements };
  }, [relations.advancements]);

  const currentSkillCount = relations.skills.length;
  const currentSpellCount = relations.spells.length;
  const totalFortifyModifier = useMemo(() => {
    return relations.spells.reduce((sum: number, spellEntry) => {
      const modifierRaw = (
        spellEntry as unknown as {
          modifier?: number | string | null;
        }
      )?.modifier;
      let numeric = 0;
      if (typeof modifierRaw === "number" && Number.isFinite(modifierRaw)) {
        numeric = modifierRaw;
      } else if (
        typeof modifierRaw === "string" &&
        modifierRaw.trim().length > 0
      ) {
        const parsed = Number(
          modifierRaw
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(",", ".")
        );
        numeric = Number.isFinite(parsed) ? parsed : 0;
      }
      return sum + Math.max(0, numeric);
    }, 0);
  }, [relations.spells]);

  const currentRoleType = getRoleType(
    selectedSoldier?.effectiveRole ?? selectedBaseFigure?.role ?? null
  );
  const hasSelectedSoldier = Boolean(selectedSoldier);
  const soldierNoXp = Boolean(
    (selectedSoldier as unknown as { noXp?: boolean })?.noXp ??
      (selectedBaseFigure as unknown as { noXp?: boolean } | null)?.noXp ??
      false
  );
  const promotionsAllowed = hasSelectedSoldier && !soldierNoXp;
  const canPromoteToHero = promotionsAllowed && currentRoleType === "soldier";
  const canPromoteToLeader =
    promotionsAllowed && currentRoleType === "hero" && !hasLeaderInWarband;
  const hasHeroSkillChoices = heroSkillOptions.length >= 2;

  const heroDefaultSelection = useMemo(() => {
    const first = heroSkillOptions[0]?.slug ?? "";
    const secondCandidate =
      heroSkillOptions.find(option => option.slug !== first)?.slug ?? "";
    return { first, second: secondCandidate };
  }, [heroSkillOptions]);

  // Função removida - não está sendo usada
  // const _handleOpenPromoteHeroDialog = () => { ... }

  const handleConfirmPromoteHero = async () => {
    if (!selectedSoldier) return;
    if (!hasHeroSkillChoices) {
      setHeroSelectionError(
        "É necessário ter ao menos duas listas de habilidades disponíveis."
      );
      return;
    }
    const { first, second } = heroSkillSelection;
    if (!first || !second) {
      setHeroSelectionError("Selecione duas listas de habilidades.");
      return;
    }
    if (first === second) {
      setHeroSelectionError("Escolha duas listas diferentes.");
      return;
    }
    setHeroSelectionError(null);
    await onPromoteHero(selectedSoldier.id, [first, second]);
    setPromoteHeroDialogOpen(false);
  };

  const handleConfirmPromoteLeader = async () => {
    if (!selectedSoldier) return;
    await onPromoteLeader(selectedSoldier.id);
    setPromoteLeaderDialogOpen(false);
  };

  useEffect(() => {
    if (promoteHeroDialogOpen) {
      setHeroSkillSelection(heroDefaultSelection);
    }
  }, [heroDefaultSelection, promoteHeroDialogOpen]);

  useEffect(() => {
    if (
      !promotionRequest ||
      promotionRequest.soldierId !== selectedSoldier?.id
    ) {
      return;
    }
    // setPromotionsExpanded(true); // Removido - função não existe mais
    if (promotionRequest.type === "hero") {
      if (canPromoteToHero && hasHeroSkillChoices) {
        setHeroSelectionError(null);
        setHeroSkillSelection(heroDefaultSelection);
        setPromoteHeroDialogOpen(true);
      }
    } else if (promotionRequest.type === "leader") {
      if (canPromoteToLeader) {
        setPromoteLeaderDialogOpen(true);
      }
    }
    onClearPromotionRequest();
  }, [
    promotionRequest,
    selectedSoldier?.id,
    canPromoteToHero,
    canPromoteToLeader,
    hasHeroSkillChoices,
    heroDefaultSelection,
    onClearPromotionRequest,
  ]);

  return (
    <>
      <div className="space-y-4 text-sm text-gray-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="font-semibold text-green-200">
              {narrativeName
                ? `${narrativeName}, ${selectedBaseFigure?.name ?? ""}`.trim()
                : (selectedBaseFigure?.name ?? "Figura")}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300">
              {narrativeName ? (
                <>
                  <span>Nome Narrativo:</span>
                  <span className="font-semibold text-green-200">
                    {narrativeName}
                  </span>
                </>
              ) : (
                <span className="text-gray-400">
                  Nenhum nome narrativo definido.
                </span>
              )}
              {!isLegend ? (
                <IconButton
                  size="small"
                  onClick={() => setNameDialogOpen(true)}
                  sx={{
                    color: "rgba(134,239,172,1)",
                    border: "1px solid rgba(34,197,94,0.4)",
                    padding: "2px",
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              ) : null}
            </div>
            {baseFigureQuality > 0 ? (
              <div className="text-xs text-gray-300">
                <strong>Qualidade:</strong> {baseFigureQuality}
              </div>
            ) : null}
            {baseFigureUpkeepValue > 0 ? (
              <div className="text-xs text-amber-200">
                Manutenção: {formatCrownsValue(baseFigureUpkeepRaw)}
              </div>
            ) : null}
            <div className="text-xs text-gray-400">
              Adicionado em {formatDate(selectedSoldier.createdAt)}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <button
              type="button"
              onClick={() => setNotesDialogOpen(true)}
              className="inline-flex items-center gap-2 rounded border border-green-600/60 bg-green-900/20 px-3 py-1 text-xs font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
            >
              <StickyNote2Icon fontSize="small" />
              Notas
            </button>
          </div>
        </div>

        {attributeCard}

        {combinedNaturalAttacks.length > 0 ? (
          <div className="rounded border border-amber-800/30 bg-[#181207] p-3 text-xs text-amber-100">
            <h5 className="mb-2 font-semibold text-amber-300">
              Ataques Naturais
            </h5>
            <div className="space-y-3">
              {combinedNaturalAttacks.map((attack, index) => (
                <div
                  key={`natural-attack-${index}-${attack.name}`}
                  className="rounded border border-amber-700/30 bg-[#1f1406] px-3 py-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-amber-200">
                      {attack.name}
                    </span>
                    <span className="text-[11px] uppercase text-amber-300">
                      {attack.type}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-amber-200">
                    <span>
                      <strong>Dano:</strong>{" "}
                      {attack.damage !== undefined && attack.damage !== null
                        ? String(attack.damage)
                        : "-"}
                    </span>
                    {attack.range ? (
                      <span>
                        <strong>Alcance:</strong> {attack.range}
                      </span>
                    ) : null}
                  </div>
                  {attack.source ? (
                    <div className="mt-1 text-[11px] text-amber-300">
                      {attack.source}
                    </div>
                  ) : null}
                  {Array.isArray(attack.specialRules) &&
                  attack.specialRules.length > 0 ? (
                    <div className="mt-2 space-y-1">
                      {attack.specialRules.map((rule, ruleIndex) => (
                        <div
                          key={`natural-attack-${index}-rule-${ruleIndex}`}
                          className="text-[11px] text-amber-100"
                        >
                          <span className="font-semibold text-amber-200">
                            {rule.label || "Regra Especial"}:
                          </span>{" "}
                          {rule.value ? (
                            <GameText
                              component="span"
                              className="text-amber-100"
                            >
                              {rule.value}
                            </GameText>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {combinedSpecialRules.length > 0 ? (
          <CollapsibleSection
            title="Regras Especiais"
            expanded={specialRulesExpanded}
            onToggle={() => setSpecialRulesExpanded(prev => !prev)}
          >
            <div className="space-y-3 text-xs text-green-100">
              {combinedSpecialRules.map((rule, index) => (
                <div
                  key={`special-rule-${index}-${rule.label}`}
                  className="rounded border border-green-800/30 bg-[#101d12] px-3 py-2"
                >
                  {rule.source &&
                  !rule.source.toLowerCase().startsWith("figura base") ? (
                    <div className="text-[11px] uppercase text-green-400">
                      {rule.source}
                    </div>
                  ) : null}
                  <div className="text-sm font-semibold text-green-200">
                    {rule.label}
                  </div>
                  {rule.value ? (
                    <GameText
                      component="div"
                      className="mt-1 text-[11px] text-green-100 whitespace-pre-wrap"
                    >
                      {rule.value}
                    </GameText>
                  ) : null}
                </div>
              ))}
            </div>
          </CollapsibleSection>
        ) : null}

        {finalShouldShowEquipmentSections ? (
          <div className="space-y-3">
            <div className="space-y-4 text-xs">
              <CollapsibleSection
                title="Itens equipados"
                expanded={equippedExpanded}
                onToggle={() => setEquippedExpanded(prev => !prev)}
              >
                <div className="mt-3 space-y-2">
                  {(() => {
                    const twoHandedEquippedItem =
                      relations.equipment.find(item => item.twoHandedEquiped) ??
                      null;

                    return EQUIPPED_SLOT_SECTIONS.filter(section => {
                      if (
                        section.slot === "mainHandEquiped" &&
                        !finalShouldShowMainHandSlot
                      ) {
                        return false;
                      }
                      if (
                        section.slot === "offHandEquiped" &&
                        !finalShouldShowOffHandSlot
                      ) {
                        return false;
                      }
                      if (
                        section.slot === "armorEquiped" &&
                        !finalShouldShowArmorSlot
                      ) {
                        return false;
                      }
                      if (
                        section.slot === "helmetEquiped" &&
                        !finalShouldShowHelmetSlot
                      ) {
                        return false;
                      }
                      return true;
                    }).map(section => {
                      let slotItem =
                        relations.equipment.find(entry =>
                          Boolean(entry[section.slot])
                        ) ?? null;

                      if (
                        !slotItem &&
                        section.slot === "mainHandEquiped" &&
                        twoHandedEquippedItem
                      ) {
                        slotItem = twoHandedEquippedItem;
                      }

                      if (
                        !slotItem &&
                        section.slot === "offHandEquiped" &&
                        twoHandedEquippedItem
                      ) {
                        slotItem = twoHandedEquippedItem;
                      }

                      const isTwoHandProxy =
                        Boolean(slotItem?.twoHandedEquiped) &&
                        section.slot === "offHandEquiped";

                      const slotActionInProgress =
                        slotItem &&
                        equipmentSlotAction &&
                        equipmentSlotAction.equipmentId === slotItem.id
                          ? equipmentSlotAction
                          : null;
                      const unequipInProgress =
                        slotActionInProgress?.type === "unequip";
                      const otherOperationInProgress =
                        slotActionInProgress != null &&
                        slotActionInProgress.type !== "unequip";

                      if (!slotItem) {
                        return (
                          <div
                            key={section.slot}
                            className="rounded border border-green-900/30 bg-[#101010] p-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-green-200">
                                {section.label}
                              </span>
                              <Chip
                                size="small"
                                label="Vazio"
                                variant="outlined"
                                sx={{
                                  borderColor: "rgba(71,85,105,0.45)",
                                  color: "rgba(148,163,184,1)",
                                }}
                              />
                            </div>
                            <p className="mt-2 text-[11px] text-gray-500">
                              Nenhum item equipado neste slot.
                            </p>
                          </div>
                        );
                      }

                      const slotStatuses: Record<EquipmentSlot, boolean> = {
                        mainHandEquiped: Boolean(slotItem.mainHandEquiped),
                        offHandEquiped: Boolean(slotItem.offHandEquiped),
                        twoHandedEquiped: Boolean(slotItem.twoHandedEquiped),
                        armorEquiped: Boolean(slotItem.armorEquiped),
                        helmetEquiped: Boolean(slotItem.helmetEquiped),
                      };

                      const equippedSlots = (
                        Object.entries(slotStatuses) as Array<
                          [EquipmentSlot, boolean]
                        >
                      ).filter(([, value]) => value);

                      const rawEquipmentName =
                        slotItem.equipment?.name ?? slotItem.equipmentSlug;
                      const equipmentCategory =
                        slotItem.equipment?.category ?? "";
                      const normalizedCategory = equipmentCategory
                        ? normalizeString(equipmentCategory)
                        : "";
                      const normalizedName = rawEquipmentName
                        ? normalizeString(rawEquipmentName)
                        : "";
                      const equipmentRecord = slotItem.equipment as
                        | (Record<string, unknown> & {
                            damageModifier?: number | string | null;
                            range?: number | string | null;
                          })
                        | undefined;
                      const rawDamageBonus =
                        (slotItem.equipment?.damageBonus as
                          | number
                          | string
                          | null
                          | undefined) ??
                        (equipmentRecord?.damageModifier as
                          | number
                          | string
                          | null
                          | undefined);
                      const damageBonusValue =
                        parseStatToNumber(rawDamageBonus) ?? 0;
                      const rawRange =
                        (equipmentRecord?.range as
                          | number
                          | string
                          | null
                          | undefined) ?? slotItem.equipment?.range;
                      const hasRangeValue =
                        rawRange !== null &&
                        rawRange !== undefined &&
                        String(rawRange).trim().length > 0;
                      const rangeDisplay = hasRangeValue
                        ? typeof rawRange === "number"
                          ? formatNumber(rawRange)
                          : String(rawRange)
                        : "-";
                      const isRangedCategory =
                        normalizedCategory.includes("distancia") ||
                        normalizedCategory.includes("ranged") ||
                        normalizedCategory.includes("tiro") ||
                        normalizedCategory.includes("arma de fogo") ||
                        normalizedCategory.includes("firearm") ||
                        normalizedCategory.includes("projeteis") ||
                        normalizedCategory.includes("projetil") ||
                        normalizedCategory.includes("arco") ||
                        normalizedCategory.includes("arma a distancia") ||
                        normalizedCategory.includes("arma de projeteis");
                      const isMeleeCategory =
                        normalizedCategory.includes("corpo a corpo") ||
                        normalizedCategory.includes("melee") ||
                        normalizedCategory.includes("hand-to-hand") ||
                        normalizedCategory.includes("arma branca") ||
                        normalizedCategory.includes("duas maos") ||
                        normalizedName.includes("espada") ||
                        normalizedName.includes("machado") ||
                        normalizedName.includes("martelo") ||
                        normalizedName.includes("maça") ||
                        normalizedName.includes("maca") ||
                        normalizedName.includes("lança") ||
                        normalizedName.includes("lanca") ||
                        normalizedName.includes("arma de duas") ||
                        normalizedName.includes("arma duas");
                      const isRangedWeapon =
                        isRangedCategory ||
                        hasRangeValue ||
                        normalizedName.includes("arco") ||
                        normalizedName.includes("besta") ||
                        normalizedName.includes("pistola") ||
                        normalizedName.includes("arcabuz") ||
                        normalizedName.includes("mosquete") ||
                        normalizedName.includes("arma de fogo");
                      const isMeleeWeapon = isMeleeCategory && !isRangedWeapon;
                      const shouldShowDamageSection =
                        !isTwoHandProxy &&
                        section.slot === "mainHandEquiped" &&
                        (isMeleeWeapon || isRangedWeapon);
                      const strengthSummary =
                        attributeSummaries?.strength?.total;
                      const strengthValue =
                        typeof strengthSummary === "number" &&
                        !Number.isNaN(strengthSummary)
                          ? strengthSummary
                          : (parseStatToNumber(
                              (
                                selectedBaseFigure as unknown as Record<
                                  string,
                                  unknown
                                >
                              )?.strength as number | string | null | undefined
                            ) ?? 0);
                      const meleeTotalDamage = strengthValue + damageBonusValue;

                      let damageSection: React.ReactNode = null;

                      if (shouldShowDamageSection) {
                        if (isMeleeWeapon) {
                          damageSection = (
                            <div className="mt-3 rounded border border-green-900/30 bg-[#10160f] p-2">
                              <div className="text-[11px] font-semibold uppercase text-green-300">
                                Dano
                              </div>
                              <div className="text-sm font-semibold text-green-100">
                                {formatNumber(meleeTotalDamage)}
                              </div>
                              <div className="mt-1 text-[11px] text-green-200">
                                Força: {formatNumber(strengthValue)}
                                {damageBonusValue !== 0 ? (
                                  <>
                                    {" "}
                                    · Bônus da arma:{" "}
                                    {formatStatValue(damageBonusValue, true)}
                                  </>
                                ) : null}
                              </div>
                            </div>
                          );
                        } else if (isRangedWeapon) {
                          damageSection = (
                            <div className="mt-3 rounded border border-sky-900/30 bg-[#0c141a] p-2">
                              <div className="text-[11px] font-semibold uppercase text-sky-300">
                                Dano
                              </div>
                              <div className="text-sm font-semibold text-sky-100">
                                {formatStatValue(damageBonusValue, true)}
                              </div>
                              <div className="mt-1 text-[11px] text-sky-200">
                                Alcance: {rangeDisplay}
                              </div>
                            </div>
                          );
                        }
                      }

                      const cardClasses = isTwoHandProxy
                        ? "rounded border border-green-900/30 bg-[#101010]/60 opacity-70"
                        : "rounded border border-green-800/40 bg-[#101010]";

                      const showDualWieldTag =
                        hasTwoWeaponFighting &&
                        section.slot === "mainHandEquiped";

                      return (
                        <div
                          key={section.slot}
                          className={`${cardClasses} p-3`}
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <div
                                className={`text-sm font-semibold ${
                                  isTwoHandProxy
                                    ? "text-gray-300"
                                    : "text-green-200"
                                }`}
                              >
                                {slotItem.equipment?.name ??
                                  slotItem.equipmentSlug}
                              </div>
                              <div className="mt-1 text-[11px] text-gray-500">
                                Categoria:{" "}
                                {slotItem.equipment?.category ?? "Desconhecida"}
                              </div>
                              <div className="text-[11px] text-gray-500">
                                Compatível:{" "}
                                {slotItem.compatible ? "Sim" : "Não"}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {equippedSlots.map(([slot]) => (
                                <Chip
                                  key={`${slotItem.id}-${slot}`}
                                  size="small"
                                  label={`Equipado (${EQUIPMENT_SLOT_LABELS[slot]})`}
                                  sx={{
                                    backgroundColor: "rgba(34,197,94,0.15)",
                                    borderColor: "rgba(34,197,94,0.45)",
                                    color: "rgba(134,239,172,1)",
                                  }}
                                  variant="outlined"
                                />
                              ))}
                              {showDualWieldTag ? (
                                <Chip
                                  size="small"
                                  label="Lutando com Duas Armas"
                                  sx={{
                                    backgroundColor: "rgba(147,197,253,0.15)",
                                    borderColor: "rgba(147,197,253,0.45)",
                                    color: "rgba(191,219,254,1)",
                                  }}
                                  variant="outlined"
                                />
                              ) : null}
                            </div>
                          </div>

                          {slotItem.modifier?.name ? (
                            <div className="mt-2 text-[11px] text-green-300">
                              Modificador: +{slotItem.modifier.name}
                            </div>
                          ) : null}

                          {damageSection}

                          {isTwoHandProxy ? (
                            <p className="mt-2 text-[10px] italic text-gray-500">
                              Ocupado pela arma de duas mãos.
                            </p>
                          ) : !isLegend ? (
                            <div className="mt-3 flex flex-col gap-2 border-t border-yellow-900/40 pt-3">
                              <button
                                type="button"
                                onClick={() =>
                                  handleUnequipEquipmentSlot(slotItem.id)
                                }
                                disabled={
                                  otherOperationInProgress || unequipInProgress
                                }
                                className="inline-flex w-full items-center justify-center rounded border border-yellow-600/60 bg-yellow-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-yellow-200 transition hover:border-yellow-400 hover:bg-yellow-900/30 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {unequipInProgress
                                  ? "Desequipando..."
                                  : "Desequipar"}
                              </button>
                            </div>
                          ) : null}
                        </div>
                      );
                    });
                  })()}
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Inventário"
                expanded={inventoryExpanded}
                onToggle={() => setInventoryExpanded(prev => !prev)}
              >
                <div className="mt-3 space-y-3">
                  {!isMercenaryOrLegend ? (
                    <div className="flex flex-col gap-2 md:flex-row">
                      <select
                        value={selectedVaultEquipmentId}
                        onChange={event =>
                          setSelectedVaultEquipmentId(event.target.value)
                        }
                        className="w-full rounded border border-green-700 bg-[#0c0f0d] px-3 py-2 text-sm text-gray-200 outline-none transition focus:border-green-400 md:max-w-xs"
                      >
                        <option value="">-- Escolha um item do cofre --</option>
                        {equipableVaultItems.map(item => {
                          const baseName =
                            item.equipment?.name ?? item.equipmentSlug;
                          const modifierName = item.modifier?.name ?? null;
                          const displayName = modifierName
                            ? `${baseName} [${modifierName}]`
                            : baseName;
                          return (
                            <option key={item.id} value={item.id}>
                              {displayName}
                              {item.customPrice
                                ? ` — ${formatCrownsValue(item.customPrice)}`
                                : ""}
                            </option>
                          );
                        })}
                      </select>
                      <button
                        type="button"
                        onClick={handleEquipFromVault}
                        disabled={
                          !selectedVaultEquipmentId || equipFromVaultLoading
                        }
                        className="inline-flex items-center justify-center rounded border border-green-600/60 bg-green-900/20 px-3 py-2 text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {equipFromVaultLoading ? "Adicionando..." : "Adicionar"}
                      </button>
                    </div>
                  ) : null}

                  {unequippedEquipment.length === 0 ? (
                    <p className="text-[11px] text-gray-500">
                      Nenhum item disponível no inventário.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {(() => {
                        let daggerReturnHidden = false;
                        return unequippedEquipment.map(item => {
                          const equipmentName =
                            item.equipment?.name ?? item.equipmentSlug;
                          const category = item.equipment?.category ?? "";
                          const normalizedCategory = category
                            ? normalizeString(category)
                            : "";
                          const normalizedName = equipmentName
                            ? normalizeString(equipmentName)
                            : "";
                          const specialRules = item.equipment?.specialRules;
                          const isShield =
                            normalizedCategory.includes("escudo");
                          const isWeaponCategory =
                            normalizedCategory.includes("arma");
                          const isHelmet =
                            normalizedName.includes("elmo") ||
                            normalizedCategory.includes("elmo");
                          const isArmor =
                            normalizedCategory.includes("armadura") &&
                            !isHelmet;
                          const hasLightRule = hasSpecialRuleLabel(
                            specialRules,
                            "leve"
                          );
                          const hasPistolRule = hasSpecialRuleLabel(
                            specialRules,
                            "pistola"
                          );
                          const hasTwoHandRule = hasSpecialRuleLabel(
                            specialRules,
                            "duas maos"
                          );
                          const hasVersatileRule = hasSpecialRuleLabel(
                            specialRules,
                            "versatil"
                          );
                          const hasUnbalancedRule = hasSpecialRuleLabel(
                            specialRules,
                            "desbalanceada"
                          );
                          const hasParRule = hasSpecialRuleLabel(
                            specialRules,
                            "par"
                          );
                          const showWeaponButtons =
                            !isArmor &&
                            !isHelmet &&
                            (isWeaponCategory || isShield);
                          const showMainHandButton =
                            showWeaponButtons &&
                            !isShield &&
                            (!hasTwoHandRule || hasVersatileRule) &&
                            !hasParRule;
                          const showOffHandButton =
                            showWeaponButtons &&
                            (isShield || hasLightRule || hasPistolRule) &&
                            !hasParRule;
                          const showTwoHandButton =
                            showWeaponButtons &&
                            !isShield &&
                            (hasTwoHandRule || hasVersatileRule);
                          const showParButton =
                            showWeaponButtons && !isShield && hasParRule;
                          const twoHandEquippedElsewhere = Boolean(
                            equipmentState.twoHanded &&
                              equipmentState.twoHanded.id !== item.id
                          );
                          const slotButtons: Array<{
                            slot: EquipmentSlot;
                            label: string;
                          }> = [];
                          if (isArmor) {
                            slotButtons.push({
                              slot: "armorEquiped",
                              label: "Equipar armadura",
                            });
                          } else if (isHelmet) {
                            slotButtons.push({
                              slot: "helmetEquiped",
                              label: "Equipar elmo",
                            });
                          } else {
                            if (showParButton) {
                              slotButtons.push({
                                slot: "mainHandEquiped",
                                label: "Equipar par de armas",
                              });
                            } else {
                              if (showMainHandButton) {
                                slotButtons.push({
                                  slot: "mainHandEquiped",
                                  label: "Equipar mão principal",
                                });
                              }
                              if (showOffHandButton) {
                                slotButtons.push({
                                  slot: "offHandEquiped",
                                  label: "Equipar mão secundária",
                                });
                              }
                            }
                            if (showTwoHandButton) {
                              slotButtons.push({
                                slot: "twoHandedEquiped",
                                label: "Equipar com duas mãos",
                              });
                            }
                          }
                          const slotActionInProgress =
                            equipmentSlotAction &&
                            equipmentSlotAction.equipmentId === item.id
                              ? equipmentSlotAction
                              : null;
                          const returning = returningEquipmentId === item.id;
                          const otherOperationInProgress =
                            slotActionInProgress !== null &&
                            slotActionInProgress.type !== "equip";
                          const isDagger =
                            normalizedName.includes("adaga") ||
                            normalizedCategory.includes("adaga");
                          let hideReturnButton = false;

                          if (isDagger && !daggerReturnHidden) {
                            hideReturnButton = true;
                            daggerReturnHidden = true;
                          }

                          return (
                            <li
                              key={item.id}
                              className="rounded border border-green-800/40 bg-[#101010] p-3"
                            >
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                  <div className="text-sm font-semibold text-green-200">
                                    {equipmentName}
                                  </div>
                                  <div className="mt-1 text-[11px] text-gray-500">
                                    Categoria:{" "}
                                    {item.equipment?.category ?? "Desconhecida"}
                                  </div>
                                  <div className="text-[11px] text-gray-500">
                                    Compatível:{" "}
                                    {item.compatible ? "Sim" : "Não"}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  <Chip
                                    size="small"
                                    label="Desequipado"
                                    variant="outlined"
                                    sx={{
                                      borderColor: "rgba(34,197,94,0.35)",
                                      color: "rgba(134,239,172,1)",
                                    }}
                                  />
                                </div>
                              </div>

                              {item.modifier?.name ? (
                                <div className="mt-2 text-[11px] text-green-300">
                                  Modificador: +{item.modifier.name}
                                </div>
                              ) : null}

                              <div className="mt-3 flex flex-col gap-2 border-t border-green-900/40 pt-3">
                                {slotButtons.map(action => {
                                  const equipInProgressForSlot =
                                    slotActionInProgress?.type === "equip" &&
                                    slotActionInProgress?.slot === action.slot;
                                  const isMainHandAction =
                                    action.slot === "mainHandEquiped";
                                  const isOffHandAction =
                                    action.slot === "offHandEquiped";
                                  const isTwoHandAction =
                                    action.slot === "twoHandedEquiped";
                                  const mainHandOccupiedByOther =
                                    equipmentState.mainHand !== null &&
                                    equipmentState.mainHand.id !== item.id;
                                  const offHandOccupiedByOther =
                                    equipmentState.offHand !== null &&
                                    equipmentState.offHand.id !== item.id;
                                  const otherHandOccupiedForTwoHand =
                                    isTwoHandAction &&
                                    (mainHandOccupiedByOther ||
                                      offHandOccupiedByOther);
                                  const blockedByExistingMainHand =
                                    isMainHandAction && mainHandOccupiedByOther;
                                  const blockedByTwoHandEquipped =
                                    twoHandEquippedElsewhere &&
                                    (isMainHandAction ||
                                      isOffHandAction ||
                                      isTwoHandAction);
                                  const blockedByUnbalancedMain =
                                    isMainHandAction &&
                                    hasUnbalancedRule &&
                                    equipmentState.offHandHasNonShield;
                                  const blockedOffHandByUnbalanced =
                                    isOffHandAction &&
                                    !isShield &&
                                    (equipmentState.hasUnbalancedMainHand ||
                                      equipmentState.hasUnbalancedTwoHand);
                                  const active = Boolean(item[action.slot]);
                                  const disabled =
                                    returning ||
                                    otherOperationInProgress ||
                                    equipInProgressForSlot ||
                                    active ||
                                    blockedByTwoHandEquipped ||
                                    blockedByUnbalancedMain ||
                                    blockedOffHandByUnbalanced ||
                                    otherHandOccupiedForTwoHand ||
                                    blockedByExistingMainHand;

                                  const label = equipInProgressForSlot
                                    ? "Equipando..."
                                    : action.label;

                                  return (
                                    <button
                                      key={`${item.id}-${action.slot}`}
                                      type="button"
                                      onClick={() =>
                                        handleEquipEquipmentSlot(
                                          item.id,
                                          action.slot
                                        )
                                      }
                                      disabled={disabled}
                                      className="inline-flex w-full items-center justify-center rounded border border-green-600/60 bg-green-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                      {label}
                                    </button>
                                  );
                                })}

                                {!isMercenaryOrLegend &&
                                !hideReturnButton &&
                                !item.mainHandEquiped &&
                                !item.offHandEquiped &&
                                !item.twoHandedEquiped &&
                                !item.armorEquiped &&
                                !item.helmetEquiped ? (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleReturnEquipmentToVault(item.id)
                                    }
                                    disabled={
                                      returning ||
                                      (slotActionInProgress !== null &&
                                        slotActionInProgress.type !== "equip")
                                    }
                                    className="inline-flex w-full items-center justify-center rounded border border-red-600/60 bg-red-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-red-200 transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    {returning
                                      ? "Devolvendo..."
                                      : "Voltar ao cofre"}
                                  </button>
                                ) : null}
                              </div>
                            </li>
                          );
                        });
                      })()}
                    </ul>
                  )}
                </div>
              </CollapsibleSection>
            </div>
          </div>
        ) : null}

        <SkillsSection
          selectedSoldier={selectedSoldier}
          selectedBaseFigure={selectedBaseFigure}
          soldierExtraSkillLists={soldierExtraSkillLists}
          relations={relations as { skills: SkillToWarbandSoldier[] }}
          warbandId={warbandId}
          onReload={onReload}
          skillAdvancementLimit={advancementSummary.skillAdvancements}
          currentSkillCount={currentSkillCount}
          isLegend={isLegend}
        />

        <SpellsSection
          selectedSoldier={selectedSoldier}
          selectedBaseFigure={selectedBaseFigure}
          soldierExtraSpellLores={soldierExtraSpellLores}
          relations={relations as { spells: SpellToWarbandSoldier[] }}
          warbandId={warbandId}
          onReload={onReload}
          spellAdvancementLimit={advancementSummary.spellAdvancements}
          fortifyAdvancementLimit={advancementSummary.fortifyAdvancements}
          currentSpellCount={currentSpellCount}
          totalFortifyModifier={totalFortifyModifier as number}
          isLegend={isLegend}
        />

        {(() => {
          if (soldierNoXp) {
            return null;
          }
          return (
            <AdvancementsSection
              selectedSoldier={selectedSoldier}
              selectedBaseFigure={selectedBaseFigure}
              relations={
                relations as { advancements: AdvancementToWarbandSoldier[] }
              }
              warbandId={warbandId}
              onReload={onReload}
            />
          );
        })()}

        <InjuriesSection
          selectedSoldier={selectedSoldier}
          selectedBaseFigure={selectedBaseFigure}
          relations={relations as { injuries: InjuryToWarbandSoldier[] }}
          warbandId={warbandId}
          onReload={onReload}
        />

        {currentRoleType === "soldier" || isMercenary ? (
          <SurvivalRollSection
            selectedSoldier={selectedSoldier}
            selectedBaseFigure={selectedBaseFigure}
            factionSlug={factionSlug}
            warbandId={warbandId}
            onReload={onReload}
          />
        ) : null}

        <SupernaturalAbilitySection
          selectedSoldier={selectedSoldier}
          selectedBaseFigure={selectedBaseFigure}
          relations={{
            skills: relations.skills as SkillToWarbandSoldier[],
            supernatural: relations.supernatural,
          }}
          category="Mutação"
          canGetFlag="canGetMutations"
          warbandId={warbandId}
          onReload={onReload}
        />

        <SupernaturalAbilitySection
          selectedSoldier={selectedSoldier}
          selectedBaseFigure={selectedBaseFigure}
          relations={{
            skills: relations.skills as SkillToWarbandSoldier[],
            supernatural: relations.supernatural,
          }}
          category="Marca Sagrada"
          canGetFlag="canGetSacredMarks"
          warbandId={warbandId}
          onReload={onReload}
        />

        <SupernaturalAbilitySection
          selectedSoldier={selectedSoldier}
          selectedBaseFigure={selectedBaseFigure}
          relations={{
            skills: relations.skills as SkillToWarbandSoldier[],
            supernatural: relations.supernatural,
          }}
          category="Benção de Nurgle"
          canGetFlag="canGetBlessings"
          warbandId={warbandId}
          onReload={onReload}
        />
      </div>

      <Dialog
        open={nameDialogOpen}
        onClose={() => {
          if (!savingName) setNameDialogOpen(false);
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Nome Narrativo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="Nome Narrativo"
            value={nameFormValue}
            onChange={event => setNameFormValue(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setNameDialogOpen(false)}
            disabled={savingName}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveCampaignName}
            disabled={savingName}
            variant="contained"
          >
            {savingName ? "Salvando..." : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={notesDialogOpen}
        onClose={() => {
          if (!savingNotes) setNotesDialogOpen(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Notas da Figura</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            minRows={4}
            margin="dense"
            label="Anotações"
            value={notesFormValue}
            onChange={event => setNotesFormValue(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setNotesDialogOpen(false)}
            disabled={savingNotes}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveNotes}
            disabled={savingNotes}
            variant="contained"
          >
            {savingNotes ? "Salvando..." : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={promoteHeroDialogOpen}
        onClose={() => {
          if (!promoteHeroLoading) setPromoteHeroDialogOpen(false);
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Promover a Herói</DialogTitle>
        <DialogContent dividers>
          <div className="space-y-3">
            <p className="text-xs text-gray-300">
              Escolha duas listas de habilidades para o novo herói.
            </p>
            <div className="space-y-2">
              <div>
                <label className="text-[11px] uppercase text-green-300">
                  Primeira lista
                </label>
                <select
                  value={heroSkillSelection.first}
                  onChange={event =>
                    setHeroSkillSelection(prev => ({
                      ...prev,
                      first: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded border border-green-700 bg-[#0c0f0d] px-3 py-2 text-sm text-gray-200 outline-none transition focus:border-green-400"
                >
                  <option value="">-- Escolha uma lista --</option>
                  {heroSkillOptions.map(option => (
                    <option key={option.slug} value={option.slug}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] uppercase text-green-300">
                  Segunda lista
                </label>
                <select
                  value={heroSkillSelection.second}
                  onChange={event =>
                    setHeroSkillSelection(prev => ({
                      ...prev,
                      second: event.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded border border-green-700 bg-[#0c0f0d] px-3 py-2 text-sm text-gray-200 outline-none transition focus:border-green-400"
                >
                  <option value="">-- Escolha uma lista --</option>
                  {heroSkillOptions.map(option => (
                    <option key={option.slug} value={option.slug}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {heroSelectionError ? (
              <div className="text-[11px] text-red-300">
                {heroSelectionError}
              </div>
            ) : null}
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPromoteHeroDialogOpen(false)}
            disabled={promoteHeroLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmPromoteHero}
            disabled={promoteHeroLoading}
            variant="contained"
          >
            {promoteHeroLoading ? "Promovendo..." : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={promoteLeaderDialogOpen}
        onClose={() => {
          if (!promoteLeaderLoading) setPromoteLeaderDialogOpen(false);
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Promover a Líder</DialogTitle>
        <DialogContent>
          <p className="text-sm text-gray-300">
            Confirmar a promoção desta figura para Líder?
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPromoteLeaderDialogOpen(false)}
            disabled={promoteLeaderLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmPromoteLeader}
            disabled={promoteLeaderLoading}
            variant="contained"
            color="primary"
          >
            {promoteLeaderLoading ? "Promovendo..." : "Promover"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={attributeDialogOpen}
        onClose={() => {
          if (!savingMiscModifiers) setAttributeDialogOpen(false);
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Atributos e Modificadores</DialogTitle>
        <DialogContent dividers>
          <div className="space-y-4">
            {attributeSummaries ? (
              <div className="space-y-3">
                {ATTRIBUTE_CONFIG.map(({ key, label, signed }) => {
                  const summary = attributeSummaries![key];
                  const contributions = summary.contributions;
                  return (
                    <div
                      key={`attr-summary-${key}`}
                      className="rounded border border-green-800/40 bg-[#101010] p-3"
                    >
                      <div className="flex items-center justify-between text-sm font-semibold text-green-200">
                        <span>{label}</span>
                        <span>{formatStatValue(summary.total, signed)}</span>
                      </div>
                      <div className="mt-1 text-xs text-gray-400">
                        Base:{" "}
                        {summary.baseRaw !== null &&
                        summary.baseRaw !== undefined
                          ? summary.baseRaw
                          : formatStatValue(summary.baseNumeric, signed)}
                      </div>
                      <div className="mt-2 space-y-1 text-xs">
                        {contributions.length > 0 ? (
                          contributions.map((contribution, index) => (
                            <div
                              key={`attr-summary-${key}-contribution-${index}`}
                              className={
                                contribution.value > 0
                                  ? "text-green-300"
                                  : contribution.value < 0
                                    ? "text-red-300"
                                    : "text-gray-400"
                              }
                            >
                              {formatStatValue(contribution.value, true)}{" "}
                              {label} — {contribution.label}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500">
                            Nenhum modificador adicional.
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <MobileText className="text-gray-400">
                Não há dados de atributos disponíveis para esta figura.
              </MobileText>
            )}

            <div className="space-y-3">
              <h6 className="text-xs font-semibold uppercase tracking-wide text-green-200">
                Modificador Personalizado
              </h6>

              <div className="rounded border border-green-800/40 bg-[#101010] p-2 sm:p-3">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
                  {ATTRIBUTE_CONFIG.map(({ key, label }) => {
                    const payloadKey = PAYLOAD_FIELD_MAP[key];
                    return (
                      <TextField
                        key={`misc-modifier-${key}`}
                        label={label}
                        type="number"
                        size="small"
                        value={miscModifiersForm[payloadKey]}
                        onChange={event =>
                          handleMiscModifierChange(
                            payloadKey,
                            event.target.value
                          )
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setAttributeDialogOpen(false)}
            disabled={savingMiscModifiers}
          >
            Fechar
          </Button>
          <Button
            onClick={handleSaveMiscModifiers}
            disabled={savingMiscModifiers}
            variant="contained"
          >
            {savingMiscModifiers ? "Salvando..." : "Salvar modificadores"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const SoldierDetailSection: React.FC<
  SoldierDetailSectionProps
> = props => {
  const {
    selectedSoldier,
    selectedBaseFigure,
    factionSlug,
    relations,
    equipableVaultItems,
    soldierExtraSkillLists,
    soldierExtraSpellLores,
    warbandId,
    onReload,
    heroSkillOptions,
    onPromoteHero,
    onPromoteLeader,
    promoteHeroLoading,
    promoteLeaderLoading,
    hasLeaderInWarband,
    promotionRequest,
    onClearPromotionRequest,
  } = props;

  if (!selectedSoldier) {
    return (
      <div>
        <MobileText className="text-sm text-gray-400">
          Selecione uma figura para visualizar detalhes.
        </MobileText>
      </div>
    );
  }

  return (
    <SoldierDetailContent
      selectedSoldier={selectedSoldier}
      selectedBaseFigure={selectedBaseFigure}
      factionSlug={factionSlug}
      relations={relations}
      equipableVaultItems={equipableVaultItems}
      soldierExtraSkillLists={soldierExtraSkillLists}
      soldierExtraSpellLores={soldierExtraSpellLores}
      warbandId={warbandId}
      onReload={onReload}
      heroSkillOptions={heroSkillOptions}
      onPromoteHero={onPromoteHero}
      onPromoteLeader={onPromoteLeader}
      promoteHeroLoading={promoteHeroLoading}
      promoteLeaderLoading={promoteLeaderLoading}
      hasLeaderInWarband={hasLeaderInWarband}
      promotionRequest={promotionRequest}
      onClearPromotionRequest={onClearPromotionRequest}
    />
  );
};
