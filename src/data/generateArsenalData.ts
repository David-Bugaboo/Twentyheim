

import { arsenalData } from "../pages/treasures-n-items/data/arsenalData";

// Generate d100 table with random picks
export function generateArsenalTable() {
  // Combine all items


  const table = [];
  // Copy array

  // Generate 99 rows
  for (let i = 1; i <= 100; i++) {
    // Refill if empty

    

   

    arsenalData.splice(0, 1); // Remove from array

   

    const arsenalItem = arsenalData[0];

    table.push({
      roll: i.toString().padStart(2, "0"),
      item: arsenalItem.name,
    });
  }

  return table;
}
