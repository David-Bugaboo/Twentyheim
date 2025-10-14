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
    name: "Gromril Hand Weapon",
    bonus: "+1 damage modifier",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "Ithilmar Hand Weapon",
    bonus: "+1 Fight",
    purchasePrice: "500gc",
    salePrice: "200gc",
    category: "Weapon",
  },
  {
    name: "Blessed/Dessecrated Hand Weapon",
    bonus: "+2 Will",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "Gromril Two-Handed Weapon",
    bonus: "+1 damage modifier",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "IthilmarTwo-Handed Weapon",
    bonus: "+1 Fight",
    purchasePrice: "500gc",
    salePrice: "200gc",
    category: "Weapon",
  },
  {
    name: "Blessed/Dessecrated Two-Handed Weapon",
    bonus: "+2 Will",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "Oak Greatbow",
    bonus: "+1 damage modifier",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "Elven Bow",
    bonus: "+1 Shoot",
    purchasePrice: "600gc",
    salePrice: "250gc",
    category: "Weapon",
  },
  {
    name: "Repeater Crossbow",
    bonus: "+1 damage modifier",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },
  {
    name: "Gromril Framed Crossbow",
    bonus: "+1 Shoot",
    purchasePrice: "600gc",
    salePrice: "250gc",
    category: "Weapon",
  },
  {
    name: "Stilleto Dagger",
    bonus: "+1 Fight",
    purchasePrice: "400gc",
    salePrice: "200gc",
    category: "Weapon",
  },
  {
    name: "Serrated Dagger",
    bonus: "+1 damage modifier",
    purchasePrice: "400gc",
    salePrice: "150gc",
    category: "Weapon",
  },
  {
    name: "Swordbreaker Knife",
    bonus: "+2 damage modifier",
    purchasePrice: "500gc",
    salePrice: "200gc",
    category: "Weapon",
  },
  {
    name: "Athel Loren Staff",
    bonus: "+1 Fight",
    purchasePrice: "300gc",
    salePrice: "125gc",
    category: "Weapon",
  },

  // ARMOR
  {
    name: "Gromril Light Armour",
    bonus: "+1 Armour",
    purchasePrice: "600gc",
    salePrice: "200gc",
    category: "Armor",
  },
  {
    name: "Dragon Scaled Heavy Armour",
    bonus: "Elemental Absorption",
    purchasePrice: "800gc",
    salePrice: "300gc",
    category: "Armor",
  },
  {
    name: "Gromril Shield",
    bonus: "+1 Armour",
    purchasePrice: "700gc",
    salePrice: "250gc",
    category: "Armor",
  },

  // ACCESSORIES
  {
    name: "Ring of Warding",
    bonus: "+1 Armour",
    purchasePrice: "600gc",
    salePrice: "250gc",
    category: "Accessory",
  },
  {
    name: "White Wolf Pelt",
    bonus: "+1 Armour",
    purchasePrice: "600gc",
    salePrice: "250gc",
    category: "Accessory",
  },
  {
    name: "Wyrm Cloak",
    bonus: "Elemental Absorption",
    purchasePrice: "500gc",
    salePrice: "200gc",
    category: "Accessory",
  },
];
