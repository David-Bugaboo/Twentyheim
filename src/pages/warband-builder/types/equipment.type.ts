export interface Equipment {
  id: string;
  name: string;
  type: string;
  damageModifier?: number;
  purchaseCost: string;
  armorBonus: number;
  movePenalty?: number;
  slots: number;
  requirements: string | null;
  specialRules: { label: string; value: string }[];
  modifier: { name: string; effect: string };
  maxRange?: string;
}
