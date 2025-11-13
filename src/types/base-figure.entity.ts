import { FigureToAvaiableEquipment } from "./figure-to-avaiable-equipment.entity";
import { FigureToSkillList } from "./figure-to-skill-list.entity";
import { FigureToSpellLore } from "./figure-to-spell-lore.entity";
import type { SkillAttributeModifiers } from "./skill.entity";

export type Role = string;

export type NaturalAttackSpecialRule = {
  label?: string;
  value?: string;
  title?: string;
  description?: string;
};

export type NaturalAttack = {
  name: string;
  damage: string | number;
  type: string;
  range?: string | null;
  specialRules?: NaturalAttackSpecialRule[];
  description?: string | string[] | null;
};

export class BaseFigure {
  id!: string;
  name!: string;
  role!: Role;
  slug!: string;
  lore!: string;
  upkeep?:number | null;
  avaiability!: string[];
  exclusions!: string[];
  quality!: number;
  canGetMutations!: boolean;
  canGetSacredMarks!: boolean;
  canGetBlessings!: boolean;
  race?: string | null;
  factionSlug?: string | null;
  cost!: number;
  movement!: number;
  fight!: number;
  shoot!: number;
  armour!: number;
  will!: number;
  health!: number;
  strength!: number;
  equipmentSlots!: number;
  startingXp?: number | null;
  createdAt!: Date;
  specialRules!: unknown;
  naturalAttacks?: NaturalAttack[] | null;
  miscModifiers?: SkillAttributeModifiers | null;
  avaiableEquipment?: FigureToAvaiableEquipment[];
  skillLists?: FigureToSkillList[];
  spellLores?: FigureToSpellLore[];
}

