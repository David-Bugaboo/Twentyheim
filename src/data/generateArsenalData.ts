import { commonItemsData } from "../pages/treasures-n-items/data/commonItemsData";

// Generate d100 table with random picks
export function generateArsenalTable() {
  // Get magic weapons and armor from commonItemsData
  const magicWeapons = commonItemsData.find((cat) => cat.id === "magic-weapons");
  const magicArmor = commonItemsData.find((cat) => cat.id === "magic-armor");

  // Combine all items
  const allItems = [
    ...(magicWeapons?.items || []),
    ...(magicArmor?.items || []),
  ];

  const table = [];

  // Generate 100 rows
  for (let i = 1; i <= 100; i++) {
    // Cycle through items
    const item = allItems[(i - 1) % allItems.length];

    table.push({
      roll: i.toString().padStart(2, "0"),
      item: item.name,
    });
  }

  return table;
}

// Static d20 Magic Weapon/Armour table - official Mordheim rules
export function generateMagicArsenalD20Table() {
  const table = [
    { roll: "1", item: "Arma de Uma Mão", effect: "+1 modificador de dano", price: "300 / 125" },
    { roll: "2", item: "Arma de Uma Mão", effect: "+1 Ímpeto", price: "500 / 200" },
    { roll: "3", item: "Arma de Uma Mão", effect: "+2 Vontade", price: "300 / 125" },
    { roll: "4", item: "Arma de Duas Mãos", effect: "+1 modificador de dano", price: "300 / 125" },
    { roll: "5", item: "Arma de Duas Mãos", effect: "+1 Ímpeto", price: "500 / 200" },
    { roll: "6", item: "Arma de Duas Mãos", effect: "+2 Vontade", price: "300 / 125" },
    { roll: "7", item: "Arco", effect: "+1 modificador de dano", price: "300 / 125" },
    { roll: "8", item: "Arco", effect: "+1 Tiro", price: "600 / 250" },
    { roll: "9", item: "Besta", effect: "+1 modificador de dano", price: "300 / 125" },
    { roll: "10", item: "Besta", effect: "+1 Tiro", price: "600 / 250" },
    { roll: "11", item: "Adaga", effect: "+1 Ímpeto", price: "400 / 200" },
    { roll: "12", item: "Adaga", effect: "+1 modificador de dano", price: "400 / 150" },
    { roll: "13", item: "Adaga", effect: "+2 modificador de dano", price: "500 / 200" },
    { roll: "14", item: "Armadura Leve", effect: "+1 Armadura", price: "600 / 200" },
    { roll: "15", item: "Armadura Pesada", effect: "Absorção Elemental", price: "800 / 300" },
    { roll: "16", item: "Escudo", effect: "+1 Armadura", price: "700 / 250" },
    { roll: "17", item: "Anel de Proteção", effect: "+1 Armadura", price: "600 / 250" },
    { roll: "18", item: "Manto de Proteção", effect: "+1 Armadura", price: "600 / 250" },
    { roll: "19", item: "Manto da Noite", effect: "Absorção Elemental", price: "500 / 200" },
    { roll: "20", item: "Cajado", effect: "+1 Ímpeto", price: "300 / 125" },
  ];

  return table;
}
