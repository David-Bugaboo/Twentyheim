import type { SkillAttributeModifiers } from "./skill.entity";

export type ModifierSpecialRule = {
  label?: string;
  value?: string;
  description?: string;
};

export class Modifier {
  id!: string;
  slug!: string;
  name!: string;
  category!: string;
  multiplier!: number;
  effect!: string;
  createdAt!: Date;
  specialRules?: ModifierSpecialRule[] | null;
  attributeModifiers?: SkillAttributeModifiers | null;
}


