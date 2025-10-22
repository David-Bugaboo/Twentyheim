import { commonItemsData } from "../pages/weapons and equipments/data/commonItemsData";

export function generateRelicTable(): { roll: string; text: string }[] {
  // Get magic items from commonItemsData
  const magicItemsCategory = commonItemsData.find(
    (cat) => cat.id === "magic-items"
  );
  const items = magicItemsCategory?.items || [];

  const table = [];

  for (let i = 1; i <= 20; i++) {
    // Cycle through items
    const item = items[(i - 1) % items.length];

    table.push({
      roll: i.toString().padStart(2, "0"),
      text: item.name,
    });
  }

  return table;
}
