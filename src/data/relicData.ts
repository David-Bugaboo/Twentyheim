
import { magicItems } from "../pages/treasures-n-items/data/magic-items.data";

export function generateRelicTable(): { roll: string; text: string }[] {

  const table = [];

  for (let i = 1; i <= 20; i++) {
    magicItems.splice(0, 1);

    const magicItem = magicItems[0];
  

    table.push({
      roll: i.toString().padStart(2, "0"),
      text: magicItem.name,
    });
  }


  return table;
}
