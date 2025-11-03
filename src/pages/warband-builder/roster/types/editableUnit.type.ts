import type { UnitAbility, UnitStats } from "../../../../components/UnitCard";
import type { AttributeBreakdown } from "../../../../components/RosterUnitCard";
import type { figure } from "../../types/figure.type";

export interface EditableUnit {
  id: string;
  name: string;
  role?: string;
  quantity?: string;
  lore?: string;
  availability?: string | string[];
  qualidade?: string;
  stats: UnitStats;
  abilities: UnitAbility[];
  figure?: figure;
  equipment?: {
    "hand-to-hand"?: Array<{ name: string; cost: string }>;
    ranged?: Array<{ name: string; cost: string }>;
    armor?: Array<{ name: string; cost: string }>;
    miscellaneous?: Array<{ name: string; cost: string }>;
    modifiers?: Array<{ name: string; cost: string }>;
  };
  chosenAbilities?: UnitAbility[];
  chosenEquipment?: Array<{
    name: string;
    category: string;
    cost?: string;
    data?: any;
  }>;
  chosenMagic?: string[];
  spellAffinity?: {
    aligned0?: string[];
    aligned2?: string[];
  };
  specialRules?: string[];
  injuries?: string;
  xpTrack?: boolean[];
  totalXp?: number;
  statBreakdown?: {
    move?: AttributeBreakdown;
    fight?: AttributeBreakdown;
    shoot?: AttributeBreakdown;
    armour?: AttributeBreakdown;
    vontade?: AttributeBreakdown;
    health?: AttributeBreakdown;
    strength?: AttributeBreakdown;
  };
  equippedItems?: {
    elmo?: string;
    escudo?: string;
    armadura?: string;
    "arma-corpo-a-corpo-1"?: string;
    "arma-corpo-a-corpo-2"?: string;
    "arma-distancia-1"?: string;
    "arma-distancia-2"?: string;
    "adaga-gratis"?: string;
    acessorios?: string[];
  };
}

export interface WarbandSheet {
  name: string;
  faction?: string;
  notes?: string;
  gold?: string;
  wyrdstone?: string;
  vault?: any[];
  units: EditableUnit[];
}

