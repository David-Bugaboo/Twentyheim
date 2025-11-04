import type { Advancement } from "./advancements.type";
import type { Equipment } from "./equipment.type";
import type { Injury } from "./injuries.type";
import type { Mutation } from "./mutation.type";
import type { NurgleBlessing } from "./nurgle-blessing.type";
import type { SacredMark } from "./sacred-marks.type";
import type { Skill } from "./skills.type";
import type { Spell } from "./spells.type";

/**
 * Interface para representar uma figura no warband
 *
 * IMPORTANTE: Todos os modificadores (advancements, injuries, skills, mutations, etc)
 * são calculados APENAS no render, NÃO são salvos no objeto figure.
 *
 * Apenas as referências (arrays de objetos com id + base_id) são salvas.
 */
export interface figure {
  id: string;
  baseFigureId: string;
  campaignName: string;
  notes?: string;

  // Equipamentos equipados (array de referências com UUID + base_equipment_id)
  equiped: Equipment[];

  // Skills aprendidas (array de referências com UUID + base_skill_id)
  skills?: Skill[];

  // Skills disponíveis para escolha (array de IDs base de skills)
  availableSkills?: string[];

  // Spells aprendidas (array de referências com UUID + base_spell_id)
  spells?: Spell[];

  // Spells disponíveis para escolha (array de IDs base de spells)
  availableSpells?: string[];

  // Mutações (array de referências com UUID + base_mutation_id)
  mutations: Mutation[];

  // Marcas sagradas (array de referências com UUID + base_sacred_mark_id)
  sacredMarks: SacredMark[];

  // Bênçãos de Nurgle (array de referências com UUID + base_nurgle_blessing_id)
  nurgleBlessings: NurgleBlessing[];

  // Avanços (array de objetos com name e effect)
  advancements: Advancement[];

  // Ferimentos (array de objetos com name e description)
  injuries: Injury[];

  // Magias (array de referências com UUID + base_spell_id + casting_number_modifier)
  magic: Spell[];

  // Regras especiais extras (array de strings)
  extraSpecialRules: string[];

  // XP acumulado
  xp: number;

  // Modificadores misc (para edição manual, se necessário)
  // NOTA: Outros modificadores (advancements, injuries, skills, equipment, mutations, etc)
  // são calculados apenas no render a partir dos arrays acima
  miscModifiers?: {
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    Vontade: number;
    strength: number;
    health: number;
  };
}
