export interface Potion {
  name: string;
  category: "Lesser" | "Greater";
  purchasePrice: string;
  salePrice: string;
  ingredientCost?: string;
  description: string;
  usage: string;
}

export const potionsData: Potion[] = [
  // LESSER POTIONS
  {
    name: "Tears of Shallya",
    category: "Lesser",
    purchasePrice: "50gc",
    salePrice: "25gc",
    ingredientCost: "25gc",
    usage: "Drink as an action",
    description:
      "This potion restores up to 5 lost points of Health. It may not take a figure above its normal starting Health.",
  },
  {
    name: "Potion of Ogre Arms",
    category: "Lesser",
    purchasePrice: "75gc",
    salePrice: "30gc",
    ingredientCost: "30gc",
    usage: "Drink as an action",
    description:
      "A figure that drinks this potion receives +1 Fight for the rest of the game.",
  },
  {
    name: "Potion of Ironblood",
    category: "Lesser",
    purchasePrice: "75gc",
    salePrice: "30gc",
    ingredientCost: "30gc",
    usage: "Drink as an action",
    description:
      "The figure that drinks this potion receives +1 Armour for the rest of the game.",
  },
  {
    name: "Bugman's Ale",
    category: "Lesser",
    purchasePrice: "100gc",
    salePrice: "40gc",
    ingredientCost: "40gc",
    usage: "Drink as an action",
    description:
      "A figure that drinks this potion gains +5 Will for the rest of the game.",
  },
  {
    name: "Elven Elixir",
    category: "Lesser",
    purchasePrice: "75gc",
    salePrice: "30gc",
    ingredientCost: "30gc",
    usage: "Drink as an action",
    description:
      "The figure who drinks this potion receives +2 Move for the rest of the game. This may not take a figure's Move above 9.",
  },
  {
    name: "Malekith's Wine",
    category: "Lesser",
    purchasePrice: "200gc",
    salePrice: "80gc",
    ingredientCost: "80gc",
    usage: "Drink as an action",
    description:
      "A figure that drinks this potion is treated as though an Invisibility spell was cast upon it.",
  },
  {
    name: "Elixir of the Veilwalker",
    category: "Lesser",
    purchasePrice: "200gc",
    salePrice: "80gc",
    ingredientCost: "80gc",
    usage: "Drink as an action",
    description:
      "A figure that drinks this potion is treated as though it had just cast the Teleport spell.",
  },
  {
    name: "Kislevite Cocktail",
    category: "Lesser",
    purchasePrice: "100gc",
    salePrice: "40gc",
    ingredientCost: "40gc",
    usage: "Throw as an action (not a move action)",
    description:
      "Throwing this cocktail follows all the rules of casting the Grenade spell, except that it can be used by a non-spellcaster, no Casting Roll is necessary, and the target point must be within 8\". Use of this potion cannot replace a move action.",
  },
  {
    name: "Kharadron Ale",
    category: "Lesser",
    purchasePrice: "150gc",
    salePrice: "60gc",
    ingredientCost: "60gc",
    usage: "Drink as an action, then use remaining action to breathe fire",
    description:
      "A figure that drinks this potion and still has an action remaining in the same activation, may use that action to make a +3 elemental magic shooting attack at a figure within 6\".",
  },
  {
    name: "Brimstone Elixir",
    category: "Lesser",
    purchasePrice: "150gc",
    salePrice: "60gc",
    ingredientCost: "60gc",
    usage: "Drink as an action",
    description:
      "A figure that drinks this potion ignores the next 5 points of elemental damage it takes.",
  },
  {
    name: "Powdered Daemonbone",
    category: "Lesser",
    purchasePrice: "100gc",
    salePrice: "40gc",
    ingredientCost: "40gc",
    usage: "Sprinkle on weapon as an action",
    description:
      "If this dust is sprinkled over a weapon, that weapon counts as a magic weapon for the rest of the game. It may be sprinkled over an arrow or crossbow bolt, though these will be one-use items.",
  },
  {
    name: "Mad Cap Mushroom Elixir",
    category: "Lesser",
    purchasePrice: "200gc",
    salePrice: "80gc",
    ingredientCost: "80gc",
    usage: "Drink as an action",
    description:
      "The figure gains +1 Fight and receives an additional +1 damage modifier on any successful hand-to-hand attack. However, the figure must, if possible, use all its actions every turn to move into combat with and fight the closest enemy figure (including uncontrolled creatures) in line of sight and not currently in combat.",
  },
  {
    name: "Black Lotus Vial",
    category: "Lesser",
    purchasePrice: "50gc",
    salePrice: "20gc",
    ingredientCost: "20gc",
    usage: "Apply to weapon as an action",
    description:
      "This sticky poison may be used to coat any weapon except a staff, bow, or crossbow. It can be used on one arrow or crossbow bolt. The next time this weapon causes damage, the figure that takes the damage is poisoned (assuming that figure is not immune to poison). The weapon loses the ability to poison after the first attack with it that causes damage. This potion is not magic and not affected by anything that cancels magic.",
  },
  {
    name: "Prismskin Brew",
    category: "Lesser",
    purchasePrice: "250gc",
    salePrice: "100gc",
    ingredientCost: "100gc",
    usage: "Drink as an action",
    description:
      "This potion allows a figure to blend in with their surroundings. No other figure may draw line of sight to this figure if they are more than 12\" away. Thus, this figure may only be targeted by an attack or a spell from another figure that is within 12\".",
  },
  {
    name: "Witchsight Mead",
    category: "Lesser",
    purchasePrice: "150gc",
    salePrice: "60gc",
    ingredientCost: "60gc",
    usage: "Drink as an action",
    description:
      "A figure that drinks this potion ignores the effects of Invisibility for the rest of the game. Furthermore, if this figure moves into combat with an Illusionary Soldier, the Illusionary Soldier is immediately removed from the table.",
  },
  {
    name: "Bottle of Burrowing",
    category: "Lesser",
    purchasePrice: "400gc",
    salePrice: "150gc",
    ingredientCost: "150gc",
    usage: "Drink as an action",
    description:
      "A figure that drinks this potion may use any remaining actions in the activation to move directly through terrain. The figure may not end its activation inside terrain, so must have enough movement to make it completely through the terrain piece.",
  },
  {
    name: "Construct Oil",
    category: "Lesser",
    purchasePrice: "250gc",
    salePrice: "100gc",
    ingredientCost: "100gc",
    usage: "Out of Game - apply after any game",
    description:
      "After any game, a wizard may use this magic oil on one construct in their warband, giving it a permanent +1 to its Move stat. Each construct may only ever receive the benefit of construct oil once.",
  },
  {
    name: "Enbalming Solution",
    category: "Lesser",
    purchasePrice: "500gc",
    salePrice: "200gc",
    ingredientCost: "200gc",
    usage: "Out of Game - use on dead figure after game",
    description:
      "This potion may be used on any figure, other than a wizard, who died in the previous game. This potion perfectly preserves the body of the figure for the next five games. After each of the next five games, a wizard may use an elixir of life potion or a Miraculous Cure spell on the preserved figure. While a figure is preserved, it does not count as a member of the warband for the purpose of calculating maximum warband size, but will do so if brought back to life. A wizard may not hire another apprentice if they have one preserved. If, after the fifth game, the preserved figure has not been brought back to life, it is dead, and should be removed from the Wizard Sheet.",
  },

  // GREATER POTIONS
  {
    name: "Witchboon Potion",
    category: "Greater",
    purchasePrice: "500gc",
    salePrice: "200gc",
    ingredientCost: "200gc",
    usage: "Drink as an action (before casting spell)",
    description:
      "The next time a spellcaster casts a spell after drinking this potion, they add +4 to their Casting Roll but suffer 2 damage, in addition to any other effects of casting the spell. A spellcaster may only use one cordial of empowerment per game. This potion may not be used to cast Out of Game spells.",
  },
  {
    name: "Ratling Flask",
    category: "Greater",
    purchasePrice: "500gc",
    salePrice: "200gc",
    ingredientCost: "200gc",
    usage: "Drink as an action while carrying treasure",
    description:
      "A figure that is carrying treasure may use the potion to shrink it down to a size that will fit in a pocket. This figure no longer suffers any penalties to Move, Fight, or swimming for carrying this treasure. It may even carry a second treasure token. If the effect of this potion is cancelled while the figure is carrying two treasures, it must choose one and immediately drop it. If the shrunk treasure is dropped for any reason, it returns to its normal size.",
  },
  {
    name: "Greater Tears of Shallya",
    category: "Greater",
    purchasePrice: "2,000gc",
    salePrice: "300gc",
    ingredientCost: "750gc",
    usage: "Drink as an action (in game or out of game)",
    description:
      "A figure that drinks this potion is immediately restored to its starting Health and is cured of any poison or temporary stat reductions. This potion may also be used after a game to cure the figure of any permanent injuries.",
  },
  {
    name: "Morr`s Milk",
    category: "Greater",
    purchasePrice: "2,000gc",
    salePrice: "300gc",
    ingredientCost: "500gc",
    usage: "Out of Game - wizard only, before a game",
    description:
      "This potion can only be used by a wizard immediately before a game. The wizard should immediately make a Will Roll (TN12). If successful, then the wizard gains an extra 50 experience points after the game. This does not count towards the 300 experience point maximum in a game. If unsuccessful, the wizard has 30 experience points deducted from those earned during the game (this cannot take the total experience gained for the game below 0). These 30 experience points are deducted from the maximum that can be earned (meaning a wizard that fails can earn a maximum of 270 experience points in the game).",
  },
  {
    name: "Maelstrom Draught	",
    category: "Greater",
    purchasePrice: "1,500gc",
    salePrice: "200gc",
    ingredientCost: "600gc",
    usage: "Drink as an action (before casting spell)",
    description:
      "If a figure drinks this potion, and then casts a spell during the same activation, then the figure may attempt to cast that spell twice. The attempts should be made one right after another. Each attempt may have a separate target, both of which must be declared before any rolls are made.",
  },
  {
    name: "Bottle of Darkness",
    category: "Greater",
    purchasePrice: "1,500gc",
    salePrice: "300gc",
    ingredientCost: "600gc",
    usage: "Shatter on ground as an action",
    description:
      "If a figure shatters this bottle on the ground, an unnatural darkness immediately falls upon the battlefield. Line of sight for everyone is reduced to 12\" for the rest of the game.",
  },
  {
    name: "Ethereal Vacuum",
    category: "Greater",
    purchasePrice: "2,000gc",
    salePrice: "200gc",
    ingredientCost: "800gc",
    usage: "Open as an action",
    description:
      "When a character spends an action to open this bottle, all creatures with the Ethereal trait within 8\" must make a Will Roll (TN20). If they fail, they are sucked into the bottle and imprisoned. Immediately remove the figure from the table and award any experience points that would have been earned for killing such a creature.",
  },
  {
    name: "Potion of Invulnerability",
    category: "Greater",
    purchasePrice: "—",
    salePrice: "400gc",
    ingredientCost: "2,000gc",
    usage: "Drink as an action",
    description:
      "A figure that drinks this potion is immune to damage from non-magic weapons. Whenever this figure activates, roll a die. On a 17+, the effects of the potion end immediately.",
  },
  {
    name: "Bottle of Null",
    category: "Greater",
    purchasePrice: "—",
    salePrice: "200gc",
    ingredientCost: "1,000gc",
    usage: "Open as an action",
    description:
      "If a figure opens this bottle, all spells in play are immediately cancelled. This will not unsummon creatures, but it will cancel Control spells, including the Control Demon spell inherent in Summon Demon. Furthermore, all spellcasters must make a Will Roll (TN14) or suffer 1 point of damage.",
  },
  {
    name: "Elixir of Life",
    category: "Greater",
    purchasePrice: "—",
    salePrice: "1,000gc",
    ingredientCost: "3,000gc",
    usage: "Out of Game - use after any game",
    description:
      "This is the rarest and most valuable of all potions. It can never be bought and only a desperate fool would ever sell it. It may be used immediately after any game. If used, one figure that died during that game is brought back to life. The figure suffers no ill effects from death and may take part in the next game.",
  },
];

// Dice tables for random potion generation
export const lesserPotionTable = [
  { roll: "1-2", potion: "Potion of Healing" },
  { roll: "3-4", potion: "Potion of Strength" },
  { roll: "5-6", potion: "Potion of Toughness" },
  { roll: "7-8", potion: "Potion of Iron Mind" },
  { roll: "9-10", potion: "Elixir of Speed" },
  { roll: "11-12", potion: "Potion of Invisibility" },
  { roll: "13-14", potion: "Potion of Teleportation" },
  { roll: "15-16", potion: "Explosive Cocktail" },
  { roll: "17-18", potion: "Potion of Fire Breath" },
  { roll: "19-20", potion: "Potion of Elemental Absorption" },
];

export const greaterPotionTable = [
  { roll: "1-2", potion: "Cordial of Empowerment" },
  { roll: "3-4", potion: "Shrinking Potion" },
  { roll: "5-6", potion: "Potion of Restoration" },
  { roll: "7-8", potion: "Bottle of Dreams and Nightmares" },
  { roll: "9-10", potion: "Shatterstar Draught" },
  { roll: "11-12", potion: "Bottle of Darkness" },
  { roll: "13-14", potion: "Ethereal Vacuum" },
  { roll: "15-16", potion: "Potion of Invulnerability" },
  { roll: "17-18", potion: "Bottle of Null" },
  { roll: "19-20", potion: "Elixir of Life" },
];

