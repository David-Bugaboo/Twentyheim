import { SkillList } from "./skill-list.entity";

export class ExtraSkillListToWarbandSoldier {
  id!: string;
  skillListSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  source!: string;
  skillList?: SkillList;
}


