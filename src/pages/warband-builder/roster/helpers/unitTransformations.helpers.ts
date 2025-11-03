/**
 * Helpers para transformações de unidades (figures -> EditableUnit para renderização)
 */

import { buildEditableUnitFromFigure } from "./warbandBuilders.helpers";
import type { EditableUnit } from "../types/editableUnit.type";
import type { RosterUnitStats } from "../../../../components/RosterUnitCard";
import type { UnitStats } from "../../../../components/UnitCard";
import { extractNumber } from "./stats.helpers";

/**
 * Converte figures do warband para EditableUnit[] para renderização
 */
export function figuresToEditableUnits(figures: any[]): EditableUnit[] {
  return (figures || []).map((fig: any, idx: number) =>
    buildEditableUnitFromFigure(fig, idx)
  );
}

/**
 * Cria RosterUnitStats com breakdown a partir de UnitStats e figure
 */
export function createRosterStats(
  baseStats: UnitStats,
  figure: any
): RosterUnitStats {
  const createBreakdownLocal = (
    key: keyof RosterUnitStats,
    baseValue: number | string
  ) => {
    const existing = figure?.statBreakdown?.[key];
    return {
      base: extractNumber(baseValue),
      advancement: existing?.advancement || 0,
      injury: existing?.injury || 0,
      misc: existing?.misc || 0,
    };
  };

  return {
    move: createBreakdownLocal("move", baseStats.move),
    fight: createBreakdownLocal("fight", baseStats.fight),
    shoot: createBreakdownLocal("shoot", baseStats.shoot),
    armour: createBreakdownLocal("armour", baseStats.armour),
    vontade: createBreakdownLocal("vontade", baseStats.Vontade),
    health: createBreakdownLocal("health", baseStats.health),
    strength:
      baseStats.strength !== undefined ||
      baseStats.força !== undefined ||
      baseStats.For !== undefined
        ? createBreakdownLocal(
            "strength",
            baseStats.strength ?? baseStats.força ?? baseStats.For ?? 0
          )
        : undefined,
  };
}

/**
 * Obtém stats combinados de uma figure (baseStats + modificadores)
 */
export function getCombinedStats(figure: any): UnitStats {
  const baseStats = figure?.baseStats || {};
  const advancementsModifiers = figure?.advancementsModifiers || {};
  const injuriesModifiers = figure?.injuriesModifiers || {};
  const miscModifiers = figure?.miscModifiers || {};
  const equipmentModifiers = figure?.equipmentModifiers || {};

  return {
    move:
      (baseStats.move || 0) +
      (advancementsModifiers.move || 0) +
      (injuriesModifiers.move || 0) +
      (miscModifiers.move || 0) +
      (equipmentModifiers.move || 0),
    fight:
      (baseStats.fight || 0) +
      (advancementsModifiers.fight || 0) +
      (injuriesModifiers.fight || 0) +
      (miscModifiers.fight || 0) +
      (equipmentModifiers.fight || 0),
    shoot:
      (baseStats.shoot || 0) +
      (advancementsModifiers.shoot || 0) +
      (injuriesModifiers.shoot || 0) +
      (miscModifiers.shoot || 0) +
      (equipmentModifiers.shoot || 0),
    armour:
      (baseStats.armour || 0) +
      (advancementsModifiers.armour || 0) +
      (injuriesModifiers.armour || 0) +
      (miscModifiers.armour || 0) +
      (equipmentModifiers.armour || 0),
    Vontade:
      (baseStats.Vontade || 0) +
      (advancementsModifiers.Vontade || 0) +
      (injuriesModifiers.Vontade || 0) +
      (miscModifiers.Vontade || 0) +
      (equipmentModifiers.Vontade || 0),
    health:
      (baseStats.health || 0) +
      (advancementsModifiers.health || 0) +
      (injuriesModifiers.health || 0) +
      (miscModifiers.health || 0) +
      (equipmentModifiers.health || 0),
    strength:
      baseStats.strength !== undefined ||
      baseStats.força !== undefined ||
      baseStats.For !== undefined
        ? (baseStats.strength || baseStats.força || baseStats.For || 0) +
          (advancementsModifiers.strength || 0) +
          (injuriesModifiers.strength || 0) +
          (miscModifiers.strength || 0) +
          (equipmentModifiers.strength || 0)
        : undefined,
    cost: baseStats.cost || "-",
    startingXp: figure?.xp || baseStats.startingXp || 0,
    skills: figure?.availableSkills || baseStats.skills || [],
    spells: figure?.availableSpells || baseStats.spells || [],
    equipmentSlots: figure?.equipmentSlots || baseStats.equipmentSlots || 5,
  };
}

