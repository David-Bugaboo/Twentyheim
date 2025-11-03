import type { figure } from "../types/figure.type";
import type { Equipment } from "../types/equipment.type";

/**
 * Gera um UUID único
 */
export function generateUUID(): string {
  return crypto.randomUUID();
}

/**
 * Cria um objeto figure no novo formato (UUID + base_id)
 * baseFigure deve ter um campo `id` que será usado como baseFigureId
 */
export function createFigureFromBase(
  baseFigure: any,
  initialData?: Partial<figure>
): figure {
  const id = generateUUID();
  const baseFigureId = baseFigure.id || baseFigure.baseFigureId || "";

  // Pega o startingXP da base da figura (pode estar em stats.startingXp ou baseStats.startingXp)
  const startingXp = 
    initialData?.xp ?? 
    baseFigure?.stats?.startingXp ?? 
    baseFigure?.baseStats?.startingXp ?? 
    0;

  return {
    id,
    baseFigureId,
    campaignName: initialData?.campaignName || "",
    injuriesModifiers: initialData?.injuriesModifiers || {
      move: 0,
      fight: 0,
      shoot: 0,
      armour: 0,
      Vontade: 0,
      health: 0,
    },
    advancementsModifiers: initialData?.advancementsModifiers || {
      move: 0,
      fight: 0,
      shoot: 0,
      armour: 0,
      Vontade: 0,
      health: 0,
    },
    miscModifiers: initialData?.miscModifiers || {
      move: 0,
      fight: 0,
      shoot: 0,
      armour: 0,
      Vontade: 0,
      health: 0,
    },
    equipmentModifiers: initialData?.equipmentModifiers || {
      move: 0,
      fight: 0,
      shoot: 0,
      armour: 0,
      Vontade: 0,
      health: 0,
    },
    availableSkills: initialData?.availableSkills || [],
    availableSpells: initialData?.availableSpells || [],
    mutations: initialData?.mutations || [],
    sacredMarks: initialData?.sacredMarks || [],
    nurgleBlessings: initialData?.nurgleBlessings || [],
    advancements: initialData?.advancements || [],
    injuries: initialData?.injuries || [],
    equipment: initialData?.equipment || [],
    magic: initialData?.magic || [],
    extraSpecialRules: initialData?.extraSpecialRules || [],
    xp: startingXp,
  };
}

/**
 * Cria um objeto Equipment no novo formato (UUID + base_ids)
 */
export function createEquipmentFromBase(
  baseEquipment: any,
  baseModifier?: any
): Equipment {
  // Usa templateId (ID original do JSON) ou id direto se não tiver templateId
  const baseEquipmentId = baseEquipment.templateId || baseEquipment.id || baseEquipment.base_equipment_id || "";
  
  // Para modificadores, usa o ID direto (que já vem dos JSONs como "pesado", etc.)
  const baseModifierId = baseModifier?.id || baseModifier?.base_modifier_id || undefined;
  
  console.log(`[createEquipmentFromBase] Criando Equipment:`, {
    templateId: baseEquipment.templateId,
    id: baseEquipment.id,
    base_equipment_id: baseEquipmentId,
    base_modifier_id: baseModifierId,
    name: baseEquipment.name,
  });
  
  return {
    id: generateUUID(),
    base_equipment_id: baseEquipmentId,
    base_modifier_id: baseModifierId,
  };
}

/**
 * Cria um objeto Skill no novo formato (UUID + base_id)
 */
export function createSkillFromBase(baseSkill: any): { id: string; base_skill_id: string } {
  return {
    id: generateUUID(),
    base_skill_id: baseSkill.id || baseSkill.base_skill_id || "",
  };
}

/**
 * Cria um objeto Spell no novo formato (UUID + base_id)
 */
export function createSpellFromBase(
  baseSpell: any,
  castingNumberModifier: number = 0
): { id: string; base_spell_id: string; casting_number_modifier: number } {
  return {
    id: generateUUID(),
    base_spell_id: baseSpell.id || baseSpell.base_spell_id || "",
    casting_number_modifier: castingNumberModifier,
  };
}

/**
 * Cria um objeto Mutation no novo formato (UUID + base_id)
 */
export function createMutationFromBase(baseMutation: any): { id: string; base_mutation_id: string } {
  return {
    id: generateUUID(),
    base_mutation_id: baseMutation.id || baseMutation.base_mutation_id || "",
  };
}

