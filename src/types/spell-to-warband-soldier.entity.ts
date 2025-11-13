import { Spell } from "./spell.entity";

export class SpellToWarbandSoldier {
  id!: string;
  spellSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  spell?: Spell;
}


