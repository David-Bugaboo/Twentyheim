import type { SkillAttributeModifiers } from "./skill.entity";

export class Advancement {
  id!: string;
  slug!: string;
  name!: string;
  description!: string;
  createdAt!: Date;
  attributeModifiers?: SkillAttributeModifiers | null;
}


