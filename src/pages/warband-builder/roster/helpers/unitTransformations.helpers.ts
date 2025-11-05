/**
 * Helpers para transformações de unidades (figures -> EditableUnit para renderização)
 */

import { buildEditableUnitFromFigure } from "./warbandBuilders.helpers";
import type { EditableUnit } from "../types/editableUnit.type";
import type { RosterUnitStats } from "../../../../components/RosterUnitCard";
import type { UnitStats } from "../../../../components/UnitCard";
import { extractNumber } from "./stats.helpers";

// Helper para parsear valores numéricos de strings
const parseNumeric = (v: any): number => {
  if (typeof v === "number") return v;
  const s = v == null ? "" : String(v);
  const m = s.match(/-?\d+/);
  return m ? parseInt(m[0], 10) : 0;
};

// Helper para verificar se um valor é "-" (dash)
const isDashValue = (v: any): boolean => {
  if (v === "-" || v === "—") return true;
  const str = String(v || "").trim();
  return str === "-" || str === "—";
};

// Helper para calcular um stat: se base for "-", retorna "-", senão calcula normalmente
const calculateStatValue = (
  baseValue: any,
  modifiers: {
    advancement: number;
    injury: number;
    misc: number;
    equipment: number;
    skills: number;
    mutations: number;
    sacredMarks: number;
    nurgleBlessings: number;
    extraSpecialRules: number;
  }
): number | string => {
  // Se o valor base for "-", retorna "-" sem calcular
  if (isDashValue(baseValue)) {
    return "-";
  }

  // Converte base para número (default 0 se não for número)
  const base =
    typeof baseValue === "number" ? baseValue : parseNumeric(baseValue);

  // Soma todos os modificadores
  return (
    base +
    modifiers.advancement +
    modifiers.injury +
    modifiers.misc +
    modifiers.equipment +
    modifiers.skills +
    modifiers.mutations +
    modifiers.sacredMarks +
    modifiers.nurgleBlessings +
    modifiers.extraSpecialRules
  );
};
import {
  hasTepokMark,
  calculateMutationModifiers,
  calculateSacredMarkModifiers,
  calculateNurgleBlessingModifiers,
  calculateAdvancementModifiers,
  calculateInjuryModifiers,
  calculateSkillModifiers,
  calculateExtraSpecialRulesModifiers,
} from "./warbandCalculations.helpers";

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

  // Marca de Tepok: Se tiver a marca, substitui armadura base por 14
  const sacredMarks = (figure?.sacredMarks || []) as any[];
  const hasTepok = hasTepokMark(sacredMarks);
  const armourBaseValue = hasTepok ? 14 : baseStats.armour;

  return {
    move: createBreakdownLocal("move", baseStats.move),
    fight: createBreakdownLocal("fight", baseStats.fight),
    shoot: createBreakdownLocal("shoot", baseStats.shoot),
    armour: createBreakdownLocal("armour", armourBaseValue),
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
 * @param figure - Figura com dados
 * @param mutationBasesMap - Map de dados base de mutações (key: base_mutation_id)
 * @param sacredMarkBasesMap - Map de dados base de marcas sagradas (key: base_sacred_mark_id)
 * @param blessingBasesMap - Map de dados base de bênçãos de Nurgle (key: base_nurgle_blessing_id)
 */
export function getCombinedStats(
  figure: any,
  mutationBasesMap?: Record<string, any>,
  sacredMarkBasesMap?: Record<string, any>,
  blessingBasesMap?: Record<string, any>,
  skillBasesMap?: Record<string, any>,
  equipmentBasesMap?: Record<string, any>
): UnitStats {
  const baseStats = figure?.baseStats || {};

  // Calcula TODOS os modificadores diretamente dos arrays (não lê de campos salvos)
  const advancements = (figure?.advancements || []) as any[];
  const injuries = (figure?.injuries || []) as any[];
  const skills = (figure?.skills || []) as any[];
  const mutations = (figure?.mutations || []) as any[];
  const sacredMarks = (figure?.sacredMarks || []) as any[];
  const nurgleBlessings = (figure?.nurgleBlessings || []) as any[];
  const extraSpecialRules = (figure?.extraSpecialRules || []) as string[];
  const equipped = (figure?.equiped || []) as any[];

  const advancementsModifiers = calculateAdvancementModifiers(advancements);
  const injuriesModifiers = calculateInjuryModifiers(injuries);
  const skillsModifiers = skillBasesMap
    ? calculateSkillModifiers(skills)
    : {
        move: 0,
        fight: 0,
        shoot: 0,
        armour: 0,
        Vontade: 0,
        strength: 0,
        health: 0,
      };
  const mutationsModifiers = mutationBasesMap
    ? calculateMutationModifiers(mutations, mutationBasesMap)
    : {
        move: 0,
        fight: 0,
        shoot: 0,
        armour: 0,
        Vontade: 0,
        strength: 0,
        health: 0,
      };
  const sacredMarksModifiers = sacredMarkBasesMap
    ? calculateSacredMarkModifiers(sacredMarks, sacredMarkBasesMap)
    : {
        move: 0,
        fight: 0,
        shoot: 0,
        armour: 0,
        Vontade: 0,
        strength: 0,
        health: 0,
      };
  const nurgleBlessingsModifiers = blessingBasesMap
    ? calculateNurgleBlessingModifiers(nurgleBlessings, blessingBasesMap)
    : {
        move: 0,
        fight: 0,
        shoot: 0,
        armour: 0,
        Vontade: 0,
        strength: 0,
        health: 0,
      };

  // Modificadores de regras especiais extras (strings soltas)
  const extraSpecialRulesModifiers = calculateExtraSpecialRulesModifiers(
    extraSpecialRules
  );

  // Calcula modificadores de equipamentos (armorBonus, movePenalty)
  const equipmentModifiers = (() => {
    const modifiers = {
      move: 0,
      fight: 0,
      shoot: 0,
      armour: 0,
      Vontade: 0,
      strength: 0,
      health: 0,
    };

    if (!equipmentBasesMap) return modifiers;

    for (const item of equipped) {
      const baseId = item?.base_equipment_id;
      const baseData = equipmentBasesMap[baseId];

      if (baseData) {
        // Armor bonus
        const armorBonus = parseNumeric(
          baseData.armorBonus || baseData.armourBonus || 0
        );
        modifiers.armour += armorBonus;

        // Move penalty (já é negativo no JSON, então soma)
        const movePenalty = parseNumeric(
          baseData.movePenalty || baseData.penalidadeMovimento || 0
        );
        modifiers.move += movePenalty;
      }
    }

    // Removido: bônus de +1 ímpeto por lutar com Garra Colossal + arma na primária

    return modifiers;
  })();

  // Misc modifiers (opcional, para edição manual)
  const miscModifiers = figure?.miscModifiers || {
    move: 0,
    fight: 0,
    shoot: 0,
    armour: 0,
    Vontade: 0,
    strength: 0,
    health: 0,
  };

  // Overrides de base: Tepok e Regras Especiais
  const hasTepok = hasTepokMark(sacredMarks);
  const rulesLower = extraSpecialRules.map(r => String(r || "").toLowerCase());
  const hasCarneObsidiana = rulesLower.some(
    r =>
      r.includes("carne-de-obsidiana") ||
      r.includes("carne de obsidiana") ||
      r.includes("corpo de obsidiana") ||
      r.includes("corpo-de-obsidiana")
  );
  const hasOssosObsidiana = rulesLower.some(
    r => r.includes("ossos de obsidiana") || r.includes("ossos-de-obsidiana")
  );

  // Precedência: Carne de Obsidiana (14) > Ossos de Obsidiana (8) > Tepok (14) > base
  const baseArmourValue = hasCarneObsidiana
    ? 14
    : hasOssosObsidiana
    ? 8
    : hasTepok
    ? 14
    : baseStats.armour;

  // Health base override: Carne de Obsidiana reduz vida base à metade (arredonda para cima)
  const baseHealthValue = hasCarneObsidiana
    ? Math.ceil(
        (typeof baseStats.health === "number"
          ? baseStats.health
          : parseNumeric(baseStats.health)) / 2
      )
    : baseStats.health;

  // Prepara modificadores para cada stat
  const moveMods = {
    advancement: advancementsModifiers.move,
    injury: injuriesModifiers.move,
    misc: miscModifiers.move,
    equipment: equipmentModifiers.move,
    skills: skillsModifiers.move,
    mutations: mutationsModifiers.move,
    sacredMarks: sacredMarksModifiers.move,
    nurgleBlessings: nurgleBlessingsModifiers.move,
    extraSpecialRules: extraSpecialRulesModifiers.move,
  };

  const fightMods = {
    advancement: advancementsModifiers.fight,
    injury: injuriesModifiers.fight,
    misc: miscModifiers.fight,
    equipment: equipmentModifiers.fight,
    skills: skillsModifiers.fight,
    mutations: mutationsModifiers.fight,
    sacredMarks: sacredMarksModifiers.fight,
    nurgleBlessings: nurgleBlessingsModifiers.fight,
    extraSpecialRules: extraSpecialRulesModifiers.fight,
  };

  const shootMods = {
    advancement: advancementsModifiers.shoot,
    injury: injuriesModifiers.shoot,
    misc: miscModifiers.shoot,
    equipment: equipmentModifiers.shoot,
    skills: skillsModifiers.shoot,
    mutations: mutationsModifiers.shoot,
    sacredMarks: sacredMarksModifiers.shoot,
    nurgleBlessings: nurgleBlessingsModifiers.shoot,
    extraSpecialRules: extraSpecialRulesModifiers.shoot,
  };

  const armourMods = {
    advancement: advancementsModifiers.armour,
    injury: injuriesModifiers.armour,
    misc: miscModifiers.armour,
    equipment: equipmentModifiers.armour,
    skills: skillsModifiers.armour,
    mutations: mutationsModifiers.armour,
    sacredMarks: sacredMarksModifiers.armour,
    nurgleBlessings: nurgleBlessingsModifiers.armour,
    extraSpecialRules: extraSpecialRulesModifiers.armour,
  };

  const vontadeMods = {
    advancement: advancementsModifiers.Vontade,
    injury: injuriesModifiers.Vontade,
    misc: miscModifiers.Vontade,
    equipment: equipmentModifiers.Vontade,
    skills: skillsModifiers.Vontade,
    mutations: mutationsModifiers.Vontade,
    sacredMarks: sacredMarksModifiers.Vontade,
    nurgleBlessings: nurgleBlessingsModifiers.Vontade,
    extraSpecialRules: extraSpecialRulesModifiers.Vontade,
  };

  const healthMods = {
    advancement: advancementsModifiers.health,
    injury: injuriesModifiers.health,
    misc: miscModifiers.health,
    equipment: equipmentModifiers.health,
    skills: skillsModifiers.health,
    mutations: mutationsModifiers.health,
    sacredMarks: sacredMarksModifiers.health,
    nurgleBlessings: nurgleBlessingsModifiers.health,
    extraSpecialRules: extraSpecialRulesModifiers.health,
  };

  const strengthBaseValue =
    baseStats.strength ?? baseStats.força ?? baseStats.For ?? 0;
  const strengthMods = {
    advancement: advancementsModifiers.strength,
    injury: injuriesModifiers.strength,
    misc: miscModifiers.strength,
    equipment: equipmentModifiers.strength,
    skills: skillsModifiers.strength,
    mutations: mutationsModifiers.strength,
    sacredMarks: sacredMarksModifiers.strength,
    nurgleBlessings: nurgleBlessingsModifiers.strength,
    extraSpecialRules: extraSpecialRulesModifiers.strength,
  };

  // Helper para converter resultado para string se necessário (fight, shoot, Vontade são sempre string)
  const toStatString = (value: number | string): string => {
    if (typeof value === "string") return value;
    return String(value);
  };

  return {
    move: calculateStatValue(baseStats.move, moveMods) as number | string,
    fight: toStatString(calculateStatValue(baseStats.fight, fightMods)),
    shoot: toStatString(calculateStatValue(baseStats.shoot, shootMods)),
    armour: calculateStatValue(baseArmourValue, armourMods) as number | string,
    Vontade: toStatString(calculateStatValue(baseStats.Vontade, vontadeMods)),
    health: calculateStatValue(baseHealthValue, healthMods) as number | string,
    strength: calculateStatValue(strengthBaseValue, strengthMods) as
      | number
      | string,
    cost: baseStats.cost || "-",
    startingXp: figure?.xp || baseStats.startingXp || 0,
    skills: figure?.availableSkills || baseStats.skills || [],
    spells: figure?.availableSpells || baseStats.spells || [],
    equipmentSlots: figure?.equipmentSlots || baseStats.equipmentSlots || 5,
  };
}
