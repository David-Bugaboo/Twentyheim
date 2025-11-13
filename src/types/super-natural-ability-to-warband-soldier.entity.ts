import { SuperNaturalAbility } from "./super-natural-ability.entity";

export class SuperNaturalAbilityToWarbandSoldier {
  id!: string;
  superNaturalAbilitySlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  superNaturalAbility?: SuperNaturalAbility;
}


