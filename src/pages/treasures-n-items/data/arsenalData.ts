export interface ArsenalItem {
  name: string;
  bonus: string;
  purchasePrice: string;
  salePrice: string;
  category: "Weapon" | "Armor" | "Accessory";
}

export const arsenalData: ArsenalItem[] = [
  // WEAPONS
  {
    name: "Hand Weapon",
    bonus: "+1 damage modifier",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "Hand Weapon",
    bonus: "+1 Fight",
    purchasePrice: "500gc",
    salePrice: "200gc",
    category: "Weapon",
  },
  {
    name: "Hand Weapon",
    bonus: "+2 Will",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "Two-Handed Weapon",
    bonus: "+1 damage modifier",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "Two-Handed Weapon",
    bonus: "+1 Fight",
    purchasePrice: "500gc",
    salePrice: "200gc",
    category: "Weapon",
  },
  {
    name: "Two-Handed Weapon",
    bonus: "+2 Will",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "Bow",
    bonus: "+1 damage modifier",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "Bow",
    bonus: "+1 Shoot",
    purchasePrice: "600gc",
    salePrice: "250gc",
    category: "Weapon",
  },
  {
    name: "Crossbow",
    bonus: "+1 damage modifier",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "Crossbow",
    bonus: "+1 Shoot",
    purchasePrice: "600gc",
    salePrice: "250gc",
    category: "Weapon",
  },
  {
    name: "Dagger",
    bonus: "+1 Fight",
    purchasePrice: "400gc",
    salePrice: "200gc",
    category: "Weapon",
  },
  {
    name: "Dagger",
    bonus: "+1 damage modifier",
    purchasePrice: "400gc",
    salePrice: "150gc",
    category: "Weapon",
  },
  {
    name: "Dagger",
    bonus: "+2 damage modifier",
    purchasePrice: "500gc",
    salePrice: "200gc",
    category: "Weapon",
  },
  {
    name: "Staff",
    bonus: "+1 Fight",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },

  // ARMOR
  {
    name: "Light Armour",
    bonus: "+1 Armour",
    purchasePrice: "600gc",
    salePrice: "200gc",
    category: "Armor",
  },
  {
    name: "Heavy Armour",
    bonus: "Elemental Absorption",
    purchasePrice: "800gc",
    salePrice: "300gc",
    category: "Armor",
  },
  {
    name: "Shield",
    bonus: "+1 Armour",
    purchasePrice: "700gc",
    salePrice: "250gc",
    category: "Armor",
  },

  // ACCESSORIES
  {
    name: "Ring of Protection",
    bonus: "+1 Armour",
    purchasePrice: "600gc",
    salePrice: "250gc",
    category: "Accessory",
  },
  {
    name: "Cloak of Protection",
    bonus: "+1 Armour",
    purchasePrice: "600gc",
    salePrice: "250gc",
    category: "Accessory",
  },
  {
    name: "Cloak of Night",
    bonus: "Elemental Absorption",
    purchasePrice: "500gc",
    salePrice: "200gc",
    category: "Accessory",
  },
];
