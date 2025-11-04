const fs = require("fs");

// Read the App.tsx file
let content = fs.readFileSync("src/App.tsx", "utf8");

// Function to convert string abilities to object abilities
function convertAbilities(match, abilitiesArray) {
  try {
    const abilities = JSON.parse(abilitiesArray);
    if (
      Array.isArray(abilities) &&
      abilities.length > 0 &&
      typeof abilities[0] === "string"
    ) {
      const convertedAbilities = abilities.map(ability => ({
        name: ability,
        description: `Special ability: ${ability}`,
      }));
      return `abilities: ${JSON.stringify(convertedAbilities, null, 10)}`;
    }
  } catch (e) {
    // If parsing fails, return original
  }
  return match;
}

// Replace all abilities arrays
content = content.replace(
  /abilities: \[([^\]]+)\]/g,
  (match, abilitiesArray) => {
    return convertAbilities(match, `[${abilitiesArray}]`);
  }
);

// Write back to file
fs.writeFileSync("src/App.tsx", content);
