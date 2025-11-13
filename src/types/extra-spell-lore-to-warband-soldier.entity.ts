import { SpellLore } from "./spell-lore.entity";

export class ExtraSpellLoreToWarbandSoldier {
  id!: string;
  spellLoreSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  source!: string;
  spellLore?: SpellLore;
}


