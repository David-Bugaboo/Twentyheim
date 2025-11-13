import { Advancement } from "./advancement.entity";

export class AdvancementToWarbandSoldier {
  id!: string;
  advancementSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  advancement?: Advancement;
}
