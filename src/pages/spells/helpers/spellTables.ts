import { generateSpellTable } from "./generateSpellTable.helper";
import { magicOfTheHornedRat } from "../data/magic-of-the-horned-rat.spells";
import { loreOfNecromancy } from "../data/lore-of-necromancy.spells";
import { magicOfTheWhiteTower } from "../data/high-magic-of-ulthuan.spells";
import { magicOfTheWaagh } from "../data/magic-of-the-waagh.spells";
import { magicOfKhaine } from "../data/magic-of-khaine.spells";
import { chaosRituals } from "../data/chaos-rituals.spells";

// Generate spell tables for each composite school
export const hornedRatSpellTable = generateSpellTable([...magicOfTheHornedRat]);
export const necromancySpellTable = generateSpellTable([...loreOfNecromancy]);
export const whiteTowerSpellTable = generateSpellTable([
  ...magicOfTheWhiteTower,
]);
export const waaghSpellTable = generateSpellTable([...magicOfTheWaagh]);
export const khaineSpellTable = generateSpellTable([...magicOfKhaine]);
export const chaosRitualsSpellTable = generateSpellTable([...chaosRituals]);
