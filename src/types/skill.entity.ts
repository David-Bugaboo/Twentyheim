import { SkillList } from "./skill-list.entity";

export type SkillAttributeModifiers = {
  move: number;
  will: number;
  fight: number;
  shoot: number;
  armour: number;
  health: number;
  strength: number;
};

export class Skill {
  id!: string;
  slug!: string;
  name!: string;
  skillListSlug!: string;
  description!: string;
  createdAt!: Date;
  attributeModifiers?: SkillAttributeModifiers;
  extraNaturalAttacks?: any;
  extraSkillLists?: string[];
  extraSpellLists?: string[];
  skillList?: SkillList;
}


