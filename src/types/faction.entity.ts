import type { NaturalAttack } from "./base-figure.entity";

export class Faction {
  id!: string;
  slug!: string;
  name!: string;
  createdAt!: Date;
  figures?: Array<{
    id: string;
    name: string;
    slug: string;
    cost: number;
    role: string;
    specialRules?: unknown;
    naturalAttacks?: NaturalAttack[] | null;
    skillLists?: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
    spellLores?: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  }>;
}


