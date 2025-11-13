import type { SkillAttributeModifiers } from "./skill.entity";

export class Injury {
  id!: string;
  slug!: string;
  name!: string;
  description!: string;
  createdAt!: Date;
  attributeModifiers?: SkillAttributeModifiers | null;
}


