import { WarbandSoldier } from './warband-soldier.entity';
import { EquipmentToVault } from './equipment-to-vault.entity';
import { Faction } from './faction.entity';
import { User } from './user.entity';
import { BaseFigure } from './base-figure.entity';

export class Warband {
  id!: string;
  name!: string;
  crowns!: number;
  wyrdstone!: number;
  factionSlug!: string;
  userId!: string;
  vault?: EquipmentToVault[];
  warbandSoldiers?: WarbandSoldier[];
  faction?: Faction | null;
  user?: User | null;
  mercenaries?: BaseFigure[];
  legends?: BaseFigure[];
  createdAt!: Date;
}
