import { SkillList } from './skill-list.entity';

export class PromotedHeroSkillLists {
  id!: string;
  warbandSoldierId!: string;
  skillListSlug!: string;
  createdAt!: Date;
  skillList?: SkillList;
}

