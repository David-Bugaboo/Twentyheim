import { Injury } from "./injury.entity";

export class InjuryToWarbandSoldier {
  id!: string;
  injurySlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  injury?: Injury;
}


