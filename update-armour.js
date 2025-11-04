const fs = require("fs");
const path = require("path");

// Lista de arquivos para atualizar
const filesToUpdate = [
  "src/pages/warbands/witch-hunters/data/witch-hunters.data.json",
  "src/pages/warbands/vampire-courts/data/vampire-courts.data.json",
  "src/pages/warbands/sons-of-hashut/data/sons-of-hashut.data.json",
  "src/pages/warbands/skaven/data/skave,data.json",
  "src/pages/warbands/orc-mob/data/orc-mob.data.json",
  "src/pages/warbands/goblins/data/goblins.data.json",
  "src/pages/warbands/mercenaries/data/mercenaries.data.json",
  "src/pages/warbands/lizardmen/data/lizardmen.data.json",
  "src/pages/warbands/dwarf-treasure-hunters/data/dwarf-treasure-hunters.data.json",
  "src/pages/warbands/cult-of-the-possessed/data/cult-of-the-possessed-page.json",
  "src/pages/warbands/beastman-raiders/beastmen-raiders.data.json",
  "src/pages/warbands/sisters-of-sigmar/data/sisters-of-sigmar.data.json",
  "src/pages/warbands/dark-elf-corsairs/data/dark-elf-corsairs.data.json",
  "src/pages/campanha/data/hired-swords.data.json",
];

function updateArmourInFile(filePath) {
  try {
    const fullPath = path.resolve(filePath);
    const content = fs.readFileSync(fullPath, "utf8");
    const data = JSON.parse(content);

    let updated = false;

    function updateArmour(obj) {
      if (typeof obj !== "object" || obj === null) return;

      if (obj.stats && typeof obj.stats.armour !== "undefined") {
        const oldValue = obj.stats.armour;
        if (typeof oldValue === "number") {
          obj.stats.armour = oldValue + 1;
          updated = true;
        } else if (typeof oldValue === "string") {
          const numValue = parseInt(oldValue, 10);
          if (!isNaN(numValue)) {
            obj.stats.armour = String(numValue + 1);
            updated = true;
          }
        }
      }

      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach(updateArmour);
        } else if (typeof obj[key] === "object") {
          updateArmour(obj[key]);
        }
      }
    }

    if (updated) {
      fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + "\n", "utf8");
    } else {
    }
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
  }
}

// Processar todos os arquivos
filesToUpdate.forEach(updateArmourInFile);
