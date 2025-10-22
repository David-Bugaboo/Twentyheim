export interface SpecialRule {
  label: string;
  value: string;
}

export interface EquipmentItem {
  roll?: string | null;
  id:string;
  name: string;
  type: string;
  damageModifier: string | null;
  purchaseCost: string | null;
  sellCost: string | null;
  maxRange?: string | null;
  exclusive: string | null;
  flavorText: string | null;
  user: string | null;
  slots: string | null;
  effect: string | null;
  armorBonus: string | null;
  movePenalty: string | null;
  requirements: string | null;
  specialRules: SpecialRule[];
  ref?: React.RefObject<null> | null;
}

export interface EquipmentCategory {
  id: string;
  label: string;
  icon: string;
  items: EquipmentItem[];
}
