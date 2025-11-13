import type { SkillAttributeModifiers } from "./skill.entity";

type NaturalAttackSpecialRule = {
  label: string;
  value: string;
};

type NaturalAttack = {
  name: string;
  type: string;
  range?: string | null;
  damage: string;
  specialRules?: NaturalAttackSpecialRule[];
};

export class SuperNaturalAbility {
  id!: string;
  slug!: string;
  name!: string;
  description!: string;
  cost!: number;
  category!: string;
  createdAt!: Date;
  attributeModifiers?: SkillAttributeModifiers | null;
  extraNaturalAttack?: NaturalAttack | null;
}


