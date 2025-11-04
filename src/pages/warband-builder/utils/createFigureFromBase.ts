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

  // Pega availableSkills de várias fontes
  const availableSkillsFromBase =
    baseFigure?.availableSkills ||
    baseFigure?.stats?.skills ||
    baseFigure?.baseStats?.skills ||
    [];

  return {
    id,
    baseFigureId,
    campaignName: initialData?.campaignName || "",
    // Equipamentos equipados
    equiped: initialData?.equiped || [],
    // Skills aprendidas (referências)
    skills: initialData?.skills || [],
    // Skills disponíveis para escolha (IDs base)
    availableSkills: initialData?.availableSkills || availableSkillsFromBase,
    // Spells aprendidas (referências)
    spells: initialData?.spells || [],
    // Spells disponíveis para escolha (IDs base)
    availableSpells: initialData?.availableSpells || [],
    // Mutações (referências)
    mutations: initialData?.mutations || [],
    // Marcas sagradas (referências)
    sacredMarks: initialData?.sacredMarks || [],
    // Bênçãos de Nurgle (referências)
    nurgleBlessings: initialData?.nurgleBlessings || [],
    // Avanços
    advancements: initialData?.advancements || [],
    // Ferimentos
    injuries: initialData?.injuries || [],
    // Magias
    magic: initialData?.magic || [],
    // Regras especiais extras
    extraSpecialRules: initialData?.extraSpecialRules || [],
    // XP
    xp: startingXp,
    // Modificadores misc (opcional, para edição manual)
    miscModifiers: initialData?.miscModifiers,
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

/**
 * Cria um objeto SacredMark no novo formato (UUID + base_id)
 */
export function createSacredMarkFromBase(baseSacredMark: any): { id: string; base_sacred_mark_id: string } {
  return {
    id: generateUUID(),
    base_sacred_mark_id: baseSacredMark.id || baseSacredMark.base_sacred_mark_id || "",
  };
}

/**
 * Cria um objeto NurgleBlessing no novo formato (UUID + base_id)
 */
export function createNurgleBlessingFromBase(baseBlessing: any): { id: string; base_nurgle_blessing_id: string } {
  return {
    id: generateUUID(),
    base_nurgle_blessing_id: baseBlessing.id || baseBlessing.base_nurgle_blessing_id || "",
  };
}

