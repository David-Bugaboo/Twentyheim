import { Skill } from "./skill.entity";

export class SkillToWarbandSoldier {
  id!: string;
  skillSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  skill?: Skill;
}


