import React, { useCallback, useEffect, useState } from "react";
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
import { SectionCard, StatRow } from "./CommonComponents";
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  formatDate,
  normalizeString,
  hasSpecialRuleLabel,
} from "../utils/helpers";
import { useEquipmentManagement } from "../hooks/useEquipmentManagement";
import type { SpellToWarbandSoldier } from "../../../../types/spell-to-warband-soldier.entity";
import GameText from "../../../../components/GameText";
import racialLimitsData from "../../../campanha/data/racial-limits.data.json";
import { toast } from "react-toastify";
import {
  updateSoldier,
  type SoldierMiscModifierPayload,
} from "../../../../services/soldiers.service";

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
  { key: "fight", label: "Combate", signed: true },
  { key: "shoot", label: "Tiro", signed: true },
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
}

type DisplayNaturalAttack = BaseNaturalAttack & { source?: string };

export const SoldierDetailSection: React.FC<SoldierDetailSectionProps> = ({
  selectedSoldier,
  selectedBaseFigure,
  factionSlug,
  relations,
  equipableVaultItems,
  soldierExtraSkillLists,
  soldierExtraSpellLores,
  warbandId,
  onReload,
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
  const [miscModifiersForm, setMiscModifiersForm] = useState<
    SoldierMiscModifierPayload[]
  >([]);
  const [savingName, setSavingName] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [savingMiscModifiers, setSavingMiscModifiers] = useState(false);

  useEffect(() => {
    setNameFormValue(selectedSoldier?.campaignName ?? "");
  }, [selectedSoldier?.campaignName]);

  useEffect(() => {
    setNotesFormValue(selectedSoldier?.notes ?? "");
  }, [selectedSoldier?.notes]);

  useEffect(() => {
    const existingRaw = selectedSoldier?.miscModifiers;
    const normalizedExisting = normalizeModifierList(existingRaw);
    if (normalizedExisting.length > 0) {
      setMiscModifiersForm(normalizedExisting.map(convertToPayload));
    } else {
      setMiscModifiersForm([]);
    }
  }, [selectedSoldier?.miscModifiers]);

  if (!selectedSoldier) {
    return (
      <SectionCard title="Detalhes da Figura">
        <MobileText className="text-sm text-gray-400">
          Selecione uma figura para visualizar detalhes.
        </MobileText>
      </SectionCard>
    );
  }

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
  const hasTwoWeaponFighting = Boolean(
    (selectedSoldier as { twoWeaponFighting?: boolean } | null)
      ?.twoWeaponFighting
  );
  const narrativeName = selectedSoldier.campaignName?.trim() ?? "";
  const selectedSoldierId = selectedSoldier.id;

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
      .map(item => ({
        label: `Equipamento: ${
          item.equipment?.name ?? item.equipmentSlug ?? "Desconhecido"
        }`,
        modifier: item.modifier?.attributeModifiers ?? null,
      }));

    const soldierMiscEntries = normalizeModifierList(
      selectedSoldier.miscModifiers
    ).map((modifier, index) => ({
      label: `Modificador Personalizado #${index + 1}`,
      modifier,
    }));

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
        const value = entry.modifier?.[modifierProperty] ?? 0;
        applyContribution(key, entry.label, value, false);
      });

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
    (index: number, field: keyof SoldierMiscModifierPayload, value: string) => {
      setMiscModifiersForm(prev => {
        const next = [...prev];
        const numeric = Number(value);
        next[index] = {
          ...next[index],
          [field]: Number.isNaN(numeric) ? 0 : numeric,
        };
        return next;
      });
    },
    []
  );

  const handleAddMiscModifierRow = useCallback(() => {
    setMiscModifiersForm(prev => [...prev, { ...EMPTY_MISC_MODIFIER }]);
  }, []);

  const handleRemoveMiscModifierRow = useCallback((index: number) => {
    setMiscModifiersForm(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSaveMiscModifiers = useCallback(async () => {
    if (!selectedSoldierId) return;
    try {
      setSavingMiscModifiers(true);
      const normalizedEntries = (
        miscModifiersForm.length > 0 ? miscModifiersForm : []
      ).map(modifier =>
        normalizePayload({
          ...EMPTY_MISC_MODIFIER,
          ...modifier,
        })
      );

      const aggregated = normalizedEntries.reduce(
        (acc, entry) => ({
          move: acc.move + entry.move,
          fight: acc.fight + entry.fight,
          shoot: acc.shoot + entry.shoot,
          armour: acc.armour + entry.armour,
          will: acc.will + entry.will,
          health: acc.health + entry.health,
          strength: acc.strength + entry.strength,
        }),
        { ...EMPTY_MISC_MODIFIER }
      );

      await updateSoldier(selectedSoldierId, {
        miscModifiers: aggregated,
      });
      toast.success("Modificadores personalizados atualizados.");
      await onReload();
      setAttributeDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(
        "Não foi possível atualizar os modificadores personalizados."
      );
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

  const combinedNaturalAttacks: DisplayNaturalAttack[] = [
    ...baseNaturalAttacks,
    ...abilityNaturalAttacks,
  ];

  return (
    <SectionCard title="Detalhes da Figura">
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
            </div>
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

        {relations.equipment.length > 0 ? (
          <div className="space-y-3">
            <h5 className="font-semibold text-green-300">Equipamentos</h5>
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

                    return EQUIPPED_SLOT_SECTIONS.map(section => {
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

                          {isTwoHandProxy ? (
                            <p className="mt-2 text-[10px] italic text-gray-500">
                              Ocupado pela arma de duas mãos.
                            </p>
                          ) : (
                            <div className="mt-3 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleUnequipEquipmentSlot(slotItem.id)
                                }
                                disabled={
                                  otherOperationInProgress || unequipInProgress
                                }
                                className="inline-flex items-center justify-center rounded border border-yellow-600/60 bg-yellow-900/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-yellow-200 transition hover:border-yellow-400 hover:bg-yellow-900/30 disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {unequipInProgress
                                  ? "Desequipando..."
                                  : "Desequipar"}
                              </button>
                            </div>
                          )}
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
                        {equipableVaultItems.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.equipment?.name ?? item.equipmentSlug}
                            {item.customPrice ? ` — ${item.customPrice}g` : ""}
                          </option>
                        ))}
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
                          const showWeaponButtons =
                            !isArmor &&
                            !isHelmet &&
                            (isWeaponCategory || isShield);
                          const showMainHandButton =
                            showWeaponButtons &&
                            !isShield &&
                            (!hasTwoHandRule || hasVersatileRule);
                          const showOffHandButton =
                            showWeaponButtons &&
                            (isShield || hasLightRule || hasPistolRule);
                          const showTwoHandButton =
                            showWeaponButtons &&
                            !isShield &&
                            (hasTwoHandRule || hasVersatileRule);
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

                              <div className="mt-3 flex flex-wrap gap-2">
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
                                      className="inline-flex items-center justify-center rounded border border-green-600/60 bg-green-900/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
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
                                    className="inline-flex items-center justify-center rounded border border-red-600/60 bg-red-900/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-red-200 transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
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
        />

        <SpellsSection
          selectedSoldier={selectedSoldier}
          selectedBaseFigure={selectedBaseFigure}
          soldierExtraSpellLores={soldierExtraSpellLores}
          relations={relations as { spells: SpellToWarbandSoldier[] }}
          warbandId={warbandId}
          onReload={onReload}
        />

        {(() => {
          const hasNoXp = Boolean(
            (selectedBaseFigure as { noXp?: boolean } | null)?.noXp
          );
          if (hasNoXp) {
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

        <SurvivalRollSection
          selectedSoldier={selectedSoldier}
          selectedBaseFigure={selectedBaseFigure}
          factionSlug={factionSlug}
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
              <div className="flex items-center justify-between">
                <h6 className="text-xs font-semibold uppercase tracking-wide text-green-200">
                  Modificadores Personalizados
                </h6>
                <Button
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={handleAddMiscModifierRow}
                  disabled={savingMiscModifiers}
                  size="small"
                >
                  Adicionar Modificador
                </Button>
              </div>

              {miscModifiersForm.length === 0 ? (
                <p className="text-xs text-gray-400">
                  Nenhum modificador personalizado aplicado.
                </p>
              ) : (
                <div className="space-y-3">
                  {miscModifiersForm.map((modifier, index) => (
                    <div
                      key={`misc-modifier-${index}`}
                      className="rounded border border-green-800/40 bg-[#101010] p-3"
                    >
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-green-200">
                        <span>Modificador #{index + 1}</span>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveMiscModifierRow(index)}
                          disabled={savingMiscModifiers}
                          sx={{
                            color: "rgba(252,165,165,1)",
                            border: "1px solid rgba(248,113,113,0.4)",
                            padding: "2px",
                          }}
                        >
                          <RemoveCircleOutlineIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                        {ATTRIBUTE_CONFIG.map(({ key, label }) => {
                          const payloadKey = PAYLOAD_FIELD_MAP[key];
                          return (
                            <TextField
                              key={`${index}-${key}`}
                              label={label}
                              type="number"
                              size="small"
                              value={modifier[payloadKey]}
                              onChange={event =>
                                handleMiscModifierChange(
                                  index,
                                  payloadKey,
                                  event.target.value
                                )
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
    </SectionCard>
  );
};
