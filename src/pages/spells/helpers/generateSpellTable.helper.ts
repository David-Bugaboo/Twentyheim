

// Generate d100 table with random picks
export function generateSpellTable(spellArray: { name: string; school: string; castingNumber: string; range: string; description: string }[]) {


  const table = [];

  for (let i = 1; i <= 20; i++) {
    spellArray.splice(0, 1);

    spellArray.splice(1, 1);

    const itemA = spellArray[0];
    const itemB = spellArray[1];

    table.push({
      roll: i.toString().padStart(2, "0"),
      optionA: {
        text: itemA.name,
      },
      optionB: {
        text: itemB.name,
      },
    });
  }

  return table;
}
