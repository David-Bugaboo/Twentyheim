import { type SpellAffinity } from "../components/SpellAffinityTable";

export const spellAffinities: Record<string, SpellAffinity> = {
  // Lizardmen
  slannGreatmage: {
    aligned0: ["Astromancer"],
    aligned2: ["Soothsayer", "Thaumaturge", "Elementalist", "Fatecaster"],
    neutral4: ["Sigilist", "Summoner", "Sonancer"],
    opposed6: ["Illusionist", "Enchanter"],
    anathema: ["Necromancer", "Witch", "Distortionist", "Chronomancer"],
  },

  skinkPriestmage: {
    aligned0: ["Astromancer"],
    aligned2: ["Soothsayer", "Thaumaturge", "Elementalist", "Fatecaster"],
    neutral4: ["Sigilist", "Summoner", "Sonancer"],
    opposed6: ["Illusionist", "Enchanter"],
    anathema: ["Necromancer", "Witch", "Distortionist", "Chronomancer"],
  },

  // Vampire Courts
  necromancer: {
    aligned0: ["Necromancer"],
    aligned2: ["Spiritualist", "Chronomancer"],
    neutral4: ["Witch", "Summoner", "Fatecaster", "Sigilist"],
    opposed6: ["Thaumaturge", "Soothsayer"],
    anathema: ["Astromancer", "Sonancer", "Enchanter"],
  },

  necrarchVampire: {
    aligned0: ["Necromancer"],
    aligned2: ["Spiritualist", "Fatecaster", "Witch"],
    neutral4: ["Chronomancer", "Summoner", "Illusionist", "Sigilist"],
    opposed6: ["Elementalist", "Soothsayer"],
    anathema: ["Astromancer", "Thaumaturge", "Sonancer"],
  },

  // Wood Elves
  spellsinger: {
    aligned0: ["Sonancer"],
    aligned2: ["Elementalist", "Soothsayer"],
    neutral4: ["Enchanter", "Thaumaturge", "Astromancer", "Illusionist"],
    opposed6: ["Summoner", "Witch"],
    anathema: ["Necromancer", "Distortionist", "Chronomancer"],
  },

  // Orc Mob
  orcShaman: {
    aligned0: ["Elementalist"],
    aligned2: ["Soothsayer", "Distortionist"],
    neutral4: ["Summoner", "Witch", "Spiritualist"],
    opposed6: ["Sigilist", "Enchanter", "Astromancer"],
    anathema: ["Necromancer", "Thaumaturge", "Chronomancer", "Fatecaster"],
  },

  // Skaven
  clanEshinSorcerer: {
    aligned0: ["Witch"],
    aligned2: ["Elementalist", "Summoner"],
    neutral4: ["Distortionist", "Illusionist", "Necromancer", "Spiritualist"],
    opposed6: ["Soothsayer", "Thaumaturge"],
    anathema: ["Astromancer", "Sonancer", "Chronomancer", "Enchanter"],
  },

  // Cult of the Possessed
  magisterOfChaos: {
    aligned0: ["Summoner"],
    aligned2: ["Elementalist", "Distortionist", "Illusionist"],
    neutral4: ["Witch", "Necromancer", "Chronomancer"],
    opposed6: ["Sigilist", "Soothsayer"],
    anathema: ["Thaumaturge", "Astromancer", "Sonancer", "Enchanter"],
  },

  // Brides of Khaine
  hagQueen: {
    aligned0: ["Witch"],
    aligned2: ["Soothsayer", "Spiritualist", "Fatecaster", "Illusionist"],
    neutral4: ["Enchanter", "Summoner", "Elementalist"],
    opposed6: ["Sigilist", "Chronomancer"],
    anathema: ["Thaumaturge", "Necromancer", "Astromancer"],
  },

  // Mercenaries - Wolf Priest
  wolfPriestOfUlric: {
    aligned0: ["Thaumaturge"],
  },

  // Sons of Hashut
  priestArtificer: {
    aligned0: ["Enchanter"],
    aligned2: ["Sigilist", "Elementalist", "Thaumaturge"],
    neutral4: ["Illusionist", "Summoner", "Soothsayer"],
    opposed6: ["Witch", "Distortionist"],
    anathema: ["Necromancer", "Spiritualist", "Chronomancer", "Fatecaster"],
  },

  // Beastmen Raiders
  beastmanSorcerer: {
    aligned0: ["Summoner"],
    aligned2: ["Elementalist", "Distortionist", "Illusionist", "Witch"],
    neutral4: ["Necromancer", "Chronomancer"],
    opposed6: ["Sigilist", "Soothsayer", "Enchanter"],
    anathema: ["Thaumaturge", "Astromancer", "Sonancer", "Fatecaster"],
  },

  // Sea Guard of Ulthuan
  loremasterOfHoeth: {
    aligned0: [
      "Elementalist",
      "Enchanter",
      "Illusionist",
      "Necromancer",
      "Sigilist",
      "Soothsayer",
      "Summoner",
      "Thaumaturge",
      "Witch",
      "Chronomancer",
      "Distortionist",
      "Spiritualist",
      "Fatecaster",
      "Astromancer",
      "Sonancer",
    ],
  },
};
