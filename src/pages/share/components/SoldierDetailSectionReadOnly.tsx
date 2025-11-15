import React, { useMemo, useState } from "react";
import MobileText from "../../../components/MobileText";
import type { WarbandSoldier } from "../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../types/base-figure.entity";
import type { Warband } from "../../../types/warband.entity";
import type { Faction } from "../../../types/faction.entity";
import type { EquipmentToWarbandSoldier } from "../../../types/equipment-to-warband-soldier.entity";
import type { SkillToWarbandSoldier } from "../../../types/skill-to-warband-soldier.entity";
import type { SpellToWarbandSoldier } from "../../../types/spell-to-warband-soldier.entity";
import type { AdvancementToWarbandSoldier } from "../../../types/advancement-to-warband-soldier.entity";
import type { InjuryToWarbandSoldier } from "../../../types/injury-to-warband-soldier.entity";
import type { SuperNaturalAbilityToWarbandSoldier } from "../../../types/super-natural-ability-to-warband-soldier.entity";
import type { SkillAttributeModifiers } from "../../../types/skill.entity";
import { StatRow } from "../../tools/warband-detail/components/CommonComponents";
import { CollapsibleSection } from "../../tools/warband-detail/components/CollapsibleSection";
import {
  formatDate,
  formatCrownsValue,
  normalizeString,
  parseSpecialRules,
} from "../../tools/warband-detail/utils/helpers";
import GameText from "../../../components/GameText";

type SoldierDetailSectionReadOnlyProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  factionSlug?: string | null;
  warbandData?: Warband;
  factionData?: Faction | null;
  relations: {
    equipment: unknown[];
    skills: unknown[];
    spells: unknown[];
    advancements: unknown[];
    injuries: unknown[];
    supernatural: unknown[];
  } | null;
  soldierExtraSkillLists?: unknown[];
  soldierExtraSpellLores?: unknown[];
};

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

export const SoldierDetailSectionReadOnly: React.FC<
  SoldierDetailSectionReadOnlyProps
> = ({
  selectedSoldier,
  selectedBaseFigure,
  factionSlug: _factionSlug,
  warbandData: _warbandData,
  factionData: _factionData,
  relations: relationsProp,
  soldierExtraSkillLists: _soldierExtraSkillLists,
  soldierExtraSpellLores: _soldierExtraSpellLores,
}) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    naturalAttacks: true,
    specialRules: true,
    experience: true,
    equippedItems: true,
    inventory: true,
    skills: true,
    spells: true,
    injuries: true,
    mutations: true,
    blessings: true,
    sacredMarks: true,
    availableSkills: false,
    availableSpells: false,
    notes: true,
  });

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  if (!selectedSoldier) {
    return (
      <div>
        <MobileText className="text-sm text-gray-400">
          Selecione uma figura para visualizar detalhes.
        </MobileText>
      </div>
    );
  }

  const relations = useMemo(() => {
    if (relationsProp) {
      return {
        equipment: (relationsProp.equipment ??
          []) as EquipmentToWarbandSoldier[],
        skills: (relationsProp.skills ?? []) as SkillToWarbandSoldier[],
        spells: (relationsProp.spells ?? []) as SpellToWarbandSoldier[],
        advancements: (relationsProp.advancements ??
          []) as AdvancementToWarbandSoldier[],
        injuries: (relationsProp.injuries ?? []) as InjuryToWarbandSoldier[],
        supernatural: (relationsProp.supernatural ??
          []) as SuperNaturalAbilityToWarbandSoldier[],
      };
    }
    return {
      equipment: (selectedSoldier.equipment ??
        []) as EquipmentToWarbandSoldier[],
      skills: (selectedSoldier.skills ?? []) as SkillToWarbandSoldier[],
      spells: (selectedSoldier.spells ?? []) as SpellToWarbandSoldier[],
      advancements: (selectedSoldier.advancements ??
        []) as AdvancementToWarbandSoldier[],
      injuries: (selectedSoldier.injuries ?? []) as InjuryToWarbandSoldier[],
      supernatural: (selectedSoldier.supernaturalAbilities ??
        []) as SuperNaturalAbilityToWarbandSoldier[],
    };
  }, [selectedSoldier, relationsProp]);

  const narrativeName = selectedSoldier.campaignName;
  const baseFigureQuality = selectedBaseFigure?.quality ?? 0;
  const baseFigureUpkeepRaw = selectedBaseFigure?.upkeep;
  const baseFigureUpkeepValue =
    typeof baseFigureUpkeepRaw === "number"
      ? baseFigureUpkeepRaw
      : typeof baseFigureUpkeepRaw === "string"
        ? Number((baseFigureUpkeepRaw as string).replace(",", ".")) || 0
        : 0;

  const hasTwoWeaponFighting = Boolean(
    (selectedSoldier as { twoWeaponFighting?: boolean } | null)
      ?.twoWeaponFighting
  );

  // Calcular atributos
  let attributeCard: React.ReactNode = null;

  if (selectedBaseFigure) {
    const baseStatNumeric = createEmptyTotals();
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
      baseStatNumeric[key] = parsed ?? 0;
    });

    // Usar raceLimits diretamente da figura base
    const racialLimits = (
      selectedBaseFigure as unknown as { raceLimits?: RacialLimit }
    ).raceLimits as RacialLimit | null | undefined;

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
        return {
          label: `Equipamento: ${equipmentName}`,
          modifier: item.modifier?.attributeModifiers ?? null,
          armourBonusContribution,
          movementPenaltyContribution,
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

      if (key === "fight" && hasTwoWeaponFighting) {
        applyContribution(key, "Lutando com Duas Armas", 1, false);
      }

      soldierMiscEntries.forEach(entry => {
        const value = entry.modifier?.[modifierProperty] ?? 0;
        applyContribution(key, entry.label, value, false);
      });
    });

    // attributeSummaries = attributeSummaryMap; // Removido - variável não é mais usada

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
      const totalValue = summary.total;
      const diff = totalValue - summary.baseNumeric;
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
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">{statRows}</div>
      </div>
    );
  }

  // Experiência e Avanços
  const parseXpValue = (value: unknown): number | null => {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) return null;
      const normalized = trimmed.replace(",", ".");
      const parsed = Number(normalized);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
      const parsedInt = parseInt(normalized, 10);
      if (!Number.isNaN(parsedInt)) {
        return parsedInt;
      }
    }
    return null;
  };

  const experienceValue = parseXpValue(selectedSoldier?.experience) ?? 0;
  const startingExperienceValue = parseXpValue(
    selectedBaseFigure?.startingXp ?? null
  );
  const advancementCount = relations.advancements.length;

  const trackerConfig = useMemo(() => {
    const effectiveRole =
      selectedSoldier?.effectiveRole ?? selectedBaseFigure?.role ?? "";
    const normalizedRole = String(effectiveRole).toLowerCase();
    const baseCount = (() => {
      if (
        normalizedRole.includes("líder") ||
        normalizedRole.includes("lider")
      ) {
        return 90;
      }
      if (
        normalizedRole.includes("herói") ||
        normalizedRole.includes("heroi")
      ) {
        return 90;
      }
      if (
        normalizedRole.includes("mercenario") ||
        normalizedRole.includes("mercenário")
      ) {
        return 14;
      }
      if (normalizedRole.includes("soldado")) {
        return 14;
      }
      return 30;
    })();
    const isLargeTrack =
      normalizedRole.includes("líder") ||
      normalizedRole.includes("lider") ||
      normalizedRole.includes("herói") ||
      normalizedRole.includes("heroi");
    const columns = 30;
    const baseHighlightsLarge = new Set([
      2, 4, 6, 8, 11, 14, 17, 20, 24, 28, 32, 26, 41, 46, 51, 57, 63, 69, 76,
      83, 90,
    ]);
    const baseHighlightsSmall = new Set([2, 5, 9, 14]);
    const boxes = Array.from({ length: baseCount }, (_, index) => index + 1);
    const highlights = isLargeTrack ? baseHighlightsLarge : baseHighlightsSmall;
    return {
      base: baseCount,
      boxes,
      columns,
      mobileColumns: 15,
      highlights,
      maxValue: isLargeTrack ? 90 : baseCount,
    };
  }, [selectedSoldier?.effectiveRole, selectedBaseFigure?.role]);

  // Regras especiais
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

  // Ataques naturais
  type DisplayNaturalAttack = {
    name: string;
    type: string;
    damage?: number | string | null;
    range?: string | null;
    specialRules?: Array<{ label: string; value: string }>;
    source?: string;
  };

  const baseNaturalAttacks: DisplayNaturalAttack[] = Array.isArray(
    selectedBaseFigure?.naturalAttacks
  )
    ? (selectedBaseFigure?.naturalAttacks ?? []).map(attack => {
        const specialRules = attack.specialRules
          ? Array.isArray(attack.specialRules)
            ? attack.specialRules.map(rule => {
                if (typeof rule === "string") {
                  return { label: rule, value: rule };
                }
                return {
                  label: rule.label ?? rule.title ?? "Regra Especial",
                  value: rule.value ?? rule.description ?? "",
                };
              })
            : []
          : undefined;

        return {
          name: attack.name ?? "",
          type: attack.type ?? "",
          damage: attack.damage ?? undefined,
          range: attack.range ?? undefined,
          specialRules,
          source: selectedBaseFigure?.name
            ? `Figura Base: ${selectedBaseFigure.name}`
            : undefined,
        };
      })
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

  // Separar habilidades sobrenaturais por categoria
  const mutations = relations.supernatural.filter(
    entry => entry.superNaturalAbility?.category === "Mutação"
  );
  const blessings = relations.supernatural.filter(
    entry => entry.superNaturalAbility?.category === "Benção de Nurgle"
  );
  const sacredMarks = relations.supernatural.filter(
    entry => entry.superNaturalAbility?.category === "Marca Sagrada"
  );

  return (
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
      </div>

      {attributeCard}

      {combinedNaturalAttacks.length > 0 ? (
        <CollapsibleSection
          title="Ataques Naturais"
          expanded={expandedSections.naturalAttacks}
          onToggle={() => toggleSection("naturalAttacks")}
        >
          <div className="mt-3 space-y-3">
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
                          <GameText component="span" className="text-amber-100">
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
        </CollapsibleSection>
      ) : null}

      {combinedSpecialRules.length > 0 ? (
        <CollapsibleSection
          title="Regras Especiais"
          expanded={expandedSections.specialRules}
          onToggle={() => toggleSection("specialRules")}
        >
          <div className="mt-3 space-y-3 text-xs text-green-100">
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

      {/* Experiência e Avanços */}
      <CollapsibleSection
        title="Experiência & Avanços"
        expanded={expandedSections.experience}
        onToggle={() => toggleSection("experience")}
      >
        <div className="mt-3 space-y-4">
          <div className="rounded border border-green-800/40 bg-[#0d1610] p-3">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-green-300/80">
                  Experiência Atual
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="min-w-[3.5rem] text-center text-lg font-semibold text-green-100">
                    {experienceValue}
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-gray-400 flex-shrink-0">
                {startingExperienceValue != null ? (
                  <div>
                    XP Inicial:{" "}
                    <span className="font-semibold text-green-200">
                      {startingExperienceValue}
                    </span>
                  </div>
                ) : null}
                <div>
                  Avanços Registrados:{" "}
                  <span className="font-semibold text-green-200">
                    {advancementCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1 overflow-x-auto">
              <style>{`
                @media (min-width: 640px) {
                  .xp-grid-responsive {
                    grid-template-columns: repeat(${trackerConfig.columns}, minmax(0, 1fr)) !important;
                    min-width: ${trackerConfig.columns * 16}px !important;
                  }
                }
              `}</style>
              <div
                className="grid gap-0.5 sm:gap-1 xp-grid-responsive"
                style={{
                  gridTemplateColumns: `repeat(${trackerConfig.mobileColumns}, minmax(0, 1fr))`,
                  minWidth: `${trackerConfig.mobileColumns * 16}px`,
                }}
              >
                {trackerConfig.boxes.map(value => {
                  const filled = value <= experienceValue;
                  const highlight = trackerConfig.highlights.has(value);
                  const baseClasses =
                    "h-4 w-4 rounded-sm border transition duration-150 ease-out";
                  if (filled) {
                    return (
                      <div
                        key={`xp-box-${value}`}
                        className={`${baseClasses} ${
                          highlight
                            ? "border-emerald-500 bg-emerald-500/70 shadow-[0_0_0_1px_rgba(34,197,94,0.35)]"
                            : "border-slate-400 bg-slate-200"
                        }`}
                      />
                    );
                  }
                  return (
                    <div
                      key={`xp-box-${value}`}
                      className={`${baseClasses} border-slate-700/60 bg-white/10`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {relations.advancements.length === 0 ? (
            <p className="mt-3 text-[11px] text-gray-500">
              Nenhum avanço registrado.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {relations.advancements.map(advancement => {
                const advancementName =
                  advancement.advancement?.name ??
                  advancement.advancementSlug ??
                  "Avanço";
                const advancementDescription =
                  advancement.advancement?.description ?? null;

                return (
                  <li
                    key={advancement.id}
                    className="rounded border border-green-800/40 bg-[#101010] p-3"
                  >
                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="text-sm font-semibold text-green-200">
                          {advancementName}
                        </div>
                        {advancementDescription ? (
                          <div className="mt-1 text-[11px] text-gray-400">
                            {advancementDescription}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CollapsibleSection>

      {/* Equipamentos */}
      {relations.equipment.length > 0 && (
        <div className="space-y-3">
          {/* Itens equipados - Apenas slots equipados */}
          {(() => {
            const equippedItems = relations.equipment.filter(
              item =>
                item.mainHandEquiped ||
                item.offHandEquiped ||
                item.armorEquiped ||
                item.helmetEquiped ||
                item.twoHandedEquiped
            );

            if (equippedItems.length === 0) {
              return null;
            }

            const twoHandedEquippedItem =
              equippedItems.find(item => item.twoHandedEquiped) ?? null;

            const slotSections = [
              {
                slot: "mainHandEquiped" as const,
                label: "Mão Principal",
                item:
                  equippedItems.find(item => item.mainHandEquiped) ??
                  (twoHandedEquippedItem &&
                  twoHandedEquippedItem.twoHandedEquiped
                    ? twoHandedEquippedItem
                    : null),
              },
              {
                slot: "offHandEquiped" as const,
                label: "Mão Secundária",
                item:
                  equippedItems.find(item => item.offHandEquiped) ??
                  (twoHandedEquippedItem &&
                  twoHandedEquippedItem.twoHandedEquiped
                    ? twoHandedEquippedItem
                    : null),
              },
              {
                slot: "armorEquiped" as const,
                label: "Armadura",
                item: equippedItems.find(item => item.armorEquiped) ?? null,
              },
              {
                slot: "helmetEquiped" as const,
                label: "Elmo",
                item: equippedItems.find(item => item.helmetEquiped) ?? null,
              },
            ].filter(section => section.item !== null);

            if (slotSections.length === 0) {
              return null;
            }

            return (
              <CollapsibleSection
                title="Itens equipados"
                expanded={expandedSections.equippedItems}
                onToggle={() => toggleSection("equippedItems")}
              >
                <div className="mt-3 space-y-2">
                  {slotSections.map(section => {
                    const item = section.item!;
                    const isTwoHandProxy =
                      Boolean(item.twoHandedEquiped) &&
                      section.slot === "offHandEquiped";

                    const slotStatuses = {
                      mainHandEquiped: Boolean(item.mainHandEquiped),
                      offHandEquiped: Boolean(item.offHandEquiped),
                      twoHandedEquiped: Boolean(item.twoHandedEquiped),
                      armorEquiped: Boolean(item.armorEquiped),
                      helmetEquiped: Boolean(item.helmetEquiped),
                    };

                    const equippedSlots = (
                      Object.entries(slotStatuses) as Array<
                        [keyof typeof slotStatuses, boolean]
                      >
                    ).filter(([, value]) => value);

                    const cardClasses = isTwoHandProxy
                      ? "rounded border border-green-900/30 bg-[#101010]/60 opacity-70"
                      : "rounded border border-green-800/40 bg-[#101010]";

                    return (
                      <div key={section.slot} className={`${cardClasses} p-3`}>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div
                              className={`text-sm font-semibold ${
                                isTwoHandProxy
                                  ? "text-gray-300"
                                  : "text-green-200"
                              }`}
                            >
                              {item.equipment?.name ?? item.equipmentSlug}
                            </div>
                            <div className="mt-1 text-[11px] text-gray-500">
                              Categoria:{" "}
                              {item.equipment?.category ?? "Desconhecida"}
                            </div>
                            <div className="text-[11px] text-gray-500">
                              Slot: {section.label}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {equippedSlots.map(([slot]) => {
                              const slotLabels: Record<string, string> = {
                                mainHandEquiped: "Mão Principal",
                                offHandEquiped: "Mão Secundária",
                                twoHandedEquiped: "Duas Mãos",
                                armorEquiped: "Armadura",
                                helmetEquiped: "Elmo",
                              };
                              return (
                                <span
                                  key={`${item.id}-${slot}`}
                                  className="rounded border border-green-500/45 bg-green-900/15 px-2 py-0.5 text-[10px] font-semibold text-green-200"
                                >
                                  {slotLabels[slot] ?? slot}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {item.modifier?.name ? (
                          <div className="mt-2 text-[11px] text-green-300">
                            Modificador: +{item.modifier.name}
                          </div>
                        ) : null}

                        {isTwoHandProxy ? (
                          <p className="mt-2 text-[10px] italic text-gray-500">
                            Ocupado pela arma de duas mãos.
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </CollapsibleSection>
            );
          })()}

          {/* Inventário - Itens desequipados */}
          {(() => {
            const unequippedItems = relations.equipment.filter(
              item =>
                !item.mainHandEquiped &&
                !item.offHandEquiped &&
                !item.armorEquiped &&
                !item.helmetEquiped &&
                !item.twoHandedEquiped
            );

            if (unequippedItems.length === 0) {
              return null;
            }

            return (
              <CollapsibleSection
                title="Inventário"
                expanded={expandedSections.inventory}
                onToggle={() => toggleSection("inventory")}
              >
                <div className="mt-3 space-y-2">
                  {unequippedItems.map((item, index) => (
                    <div
                      key={item.id ?? index}
                      className="rounded border border-green-800/40 bg-[#101010] p-3"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="text-sm font-semibold text-green-200">
                            {item.equipment?.name ?? item.equipmentSlug}
                          </div>
                          <div className="mt-1 text-[11px] text-gray-500">
                            Categoria:{" "}
                            {item.equipment?.category ?? "Desconhecida"}
                          </div>
                          <div className="text-[11px] text-gray-500">
                            Compatível: {item.compatible ? "Sim" : "Não"}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <span className="rounded border border-green-500/35 bg-green-900/10 px-2 py-0.5 text-[10px] font-semibold text-green-300">
                            Desequipado
                          </span>
                        </div>
                      </div>

                      {item.modifier?.name ? (
                        <div className="mt-2 text-[11px] text-green-300">
                          Modificador: +{item.modifier.name}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            );
          })()}
        </div>
      )}

      {/* Habilidades */}
      {relations.skills.length > 0 && (
        <CollapsibleSection
          title="Habilidades"
          expanded={expandedSections.skills}
          onToggle={() => toggleSection("skills")}
        >
          <div className="mt-3 space-y-2">
            {relations.skills.map((skill, index) => (
              <div
                key={skill.id ?? index}
                className="rounded border border-purple-800/40 bg-[#101010] p-3 text-xs"
              >
                <div className="font-semibold text-purple-200">
                  {skill.skill?.name ?? skill.skillSlug}
                </div>
                {skill.skill?.description && (
                  <div className="mt-1 text-gray-300">
                    {skill.skill.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Magias */}
      {relations.spells.length > 0 && (
        <CollapsibleSection
          title="Magias"
          expanded={expandedSections.spells}
          onToggle={() => toggleSection("spells")}
        >
          <div className="mt-3 space-y-2">
            {relations.spells.map((spell, index) => (
              <div
                key={spell.id ?? index}
                className="rounded border border-blue-800/40 bg-[#101010] p-3 text-xs"
              >
                <div className="font-semibold text-blue-200">
                  {spell.spell?.name ?? spell.spellSlug}
                </div>
                {spell.spell?.description && (
                  <div className="mt-1 text-gray-300">
                    {spell.spell.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Ferimentos */}
      {relations.injuries.length > 0 && (
        <CollapsibleSection
          title="Ferimentos"
          expanded={expandedSections.injuries}
          onToggle={() => toggleSection("injuries")}
        >
          <div className="mt-3 space-y-2">
            {relations.injuries.map((injury, index) => (
              <div
                key={injury.id ?? index}
                className="rounded border border-red-800/40 bg-[#101010] p-3 text-xs"
              >
                <div className="font-semibold text-red-200">
                  {injury.injury?.name ?? injury.injurySlug}
                </div>
                {injury.injury?.description && (
                  <div className="mt-1 text-gray-300">
                    {injury.injury.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Mutações */}
      {mutations.length > 0 && (
        <CollapsibleSection
          title="Mutações"
          expanded={expandedSections.mutations}
          onToggle={() => toggleSection("mutations")}
        >
          <div className="mt-3 space-y-2">
            {mutations.map((mutation, index) => (
              <div
                key={mutation.id ?? index}
                className="rounded border border-orange-800/40 bg-[#101010] p-3 text-xs"
              >
                <div className="font-semibold text-orange-200">
                  {mutation.superNaturalAbility?.name ??
                    mutation.superNaturalAbilitySlug}
                </div>
                {mutation.superNaturalAbility?.description && (
                  <div className="mt-1 text-gray-300">
                    {mutation.superNaturalAbility.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Bênçãos de Nurgle */}
      {blessings.length > 0 && (
        <CollapsibleSection
          title="Bênçãos de Nurgle"
          expanded={expandedSections.blessings}
          onToggle={() => toggleSection("blessings")}
        >
          <div className="mt-3 space-y-2">
            {blessings.map((blessing, index) => (
              <div
                key={blessing.id ?? index}
                className="rounded border border-green-800/40 bg-[#101010] p-3 text-xs"
              >
                <div className="font-semibold text-green-200">
                  {blessing.superNaturalAbility?.name ??
                    blessing.superNaturalAbilitySlug}
                </div>
                {blessing.superNaturalAbility?.description && (
                  <div className="mt-1 text-gray-300">
                    {blessing.superNaturalAbility.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Marcas Sagradas */}
      {sacredMarks.length > 0 && (
        <CollapsibleSection
          title="Marcas Sagradas"
          expanded={expandedSections.sacredMarks}
          onToggle={() => toggleSection("sacredMarks")}
        >
          <div className="mt-3 space-y-2">
            {sacredMarks.map((mark, index) => (
              <div
                key={mark.id ?? index}
                className="rounded border border-yellow-800/40 bg-[#101010] p-3 text-xs"
              >
                <div className="font-semibold text-yellow-200">
                  {mark.superNaturalAbility?.name ??
                    mark.superNaturalAbilitySlug}
                </div>
                {mark.superNaturalAbility?.description && (
                  <div className="mt-1 text-gray-300">
                    {mark.superNaturalAbility.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Habilidades Disponíveis da Figura Base */}
      {(() => {
        const availableSkills = (
          selectedBaseFigure as unknown as { avaiableSkills?: unknown[] }
        )?.avaiableSkills;
        if (
          availableSkills &&
          Array.isArray(availableSkills) &&
          availableSkills.length > 0
        ) {
          return (
            <CollapsibleSection
              title="Habilidades Disponíveis"
              expanded={expandedSections.availableSkills}
              onToggle={() => toggleSection("availableSkills")}
            >
              <div className="mt-3 space-y-2">
                {availableSkills.map((skill, index) => {
                  const skillName =
                    typeof skill === "string"
                      ? skill
                      : ((skill as { name?: string; slug?: string })?.name ??
                        (skill as { name?: string; slug?: string })?.slug ??
                        `Habilidade ${index + 1}`);
                  return (
                    <div
                      key={`available-skill-${index}`}
                      className="rounded border border-purple-800/40 bg-[#101010] p-3 text-xs"
                    >
                      <div className="font-semibold text-purple-200">
                        {skillName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CollapsibleSection>
          );
        }
        return null;
      })()}

      {/* Magias Disponíveis da Figura Base */}
      {(() => {
        const availableSpells = (
          selectedBaseFigure as unknown as { avaiableSpells?: unknown[] }
        )?.avaiableSpells;
        if (
          availableSpells &&
          Array.isArray(availableSpells) &&
          availableSpells.length > 0
        ) {
          return (
            <CollapsibleSection
              title="Magias Disponíveis"
              expanded={expandedSections.availableSpells}
              onToggle={() => toggleSection("availableSpells")}
            >
              <div className="mt-3 space-y-2">
                {availableSpells.map((spell, index) => {
                  const spellName =
                    typeof spell === "string"
                      ? spell
                      : ((spell as { name?: string; slug?: string })?.name ??
                        (spell as { name?: string; slug?: string })?.slug ??
                        `Magia ${index + 1}`);
                  return (
                    <div
                      key={`available-spell-${index}`}
                      className="rounded border border-blue-800/40 bg-[#101010] p-3 text-xs"
                    >
                      <div className="font-semibold text-blue-200">
                        {spellName}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CollapsibleSection>
          );
        }
        return null;
      })()}

      {/* Notas */}
      {selectedSoldier.notes && (
        <CollapsibleSection
          title="Notas"
          expanded={expandedSections.notes}
          onToggle={() => toggleSection("notes")}
        >
          <div className="mt-3 text-xs text-gray-300 whitespace-pre-wrap">
            {selectedSoldier.notes}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
};
