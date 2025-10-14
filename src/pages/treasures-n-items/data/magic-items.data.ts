export interface MagicItem {
  name: string;
  description: string;
  category?: string;
  power?: number; // For items of power
}

export const magicItems: MagicItem[] = [
  {
    name: "Holy/Unholy Charm",
    category: "Amulet",
    description:
      "Once per game, the wearer may add +4 to a Will Roll to resist a spell. The decision to use the amulet can be made after the die has been rolled.",
  },
  {
    name: "Elven Boots",
    category: "Boots",
    description: "The wearer gains +1 Move.",
  },
  {
    name: "Construct Hammer",
    category: "Construct Equipment",
    description:
      "This large, enchanted hammer can be fitted to a medium or large construct before or after a game. A construct equipped with this item is treated as carrying a magic weapon and receives an additional +1 damage modifier. A construct may only ever be fitted with one construct hammer.",
  },
  {
    name: "Rabbit's Foot",
    category: "Stone",
    description:
      "Once per game, the figure carrying a fate stone may re-roll any one Casting Roll, Stat Roll, Combat Roll, or Shooting Roll.",
  },
  {
    name: "Battle Wizard Gauntlet's",
    category: "Gloves",
    description:
      "Once per game, a spellcaster can use these gloves to gain a +5 to one Casting Roll. The spellcaster must declare that they are using them before the Casting Roll is made.",
  },
  {
    name: "Ogre Bracers",
    category: "Gloves",
    description:
      "The wearer gains a +1 damage modifier on all successful hand-to-hand attacks.",
  },
  {
    name: "Horn of Ruin",
    category: "Horn",
    description:
      "Once per game, the bearer may use an action to blow on the horn. Treat this as a successfully cast Crumble spell.",
  },
  {
    name: "Ring of Elven Grace",
    category: "Ring",
    description:
      "The wearer of this ring never suffers any damage from falling, no matter how great the distance from which they fall/jump.",
  },
  {
    name: "Ring of toe Abysswalker",
    category: "Ring",
    description:
      'Once per game, the wearer of this ring may spend an action to teleport up to 8" anywhere within line of sight, but not off the table. This may not be used to move a figure into or out of combat.',
  },
  {
    name: "Holy/Unholy Signet",
    category: "Ring",
    description: "The wearer of this ring receives +1 Will.",
  },
  {
    name: "Sea Dragon Cloak",
    category: "Robes",
    description:
      "The wearer gains +4 Armour against all missile weapons and firearms attacks.",
  },
  {
    name: "Hierophant Staff",
    category: "Staff",
    description:
      "When this item is found, roll on the Random Spell Table to identify a spell. This staff gives a +1 to the Casting Roll for that specific spell. Note that, if purchasing a staff of casting, you must pay its cost before rolling to identify the spell.",
  },
  {
    name: "Wyrdstone Scepter",
    category: "Item of Power",
    power: 3,
    description:
      "Items of power provide a spellcaster with an additional pool from which they can draw to empower a spell or Will Roll in the same way as they can using their own Health. The number in brackets is the amount of power that can be drawn from an item before the pool runs dry. So, a staff of power (3) can be used to increase a single Casting Roll by +3, three Casting Rolls by +1 each, or one by +2 and one by +1. This power can be used in conjunction with the spellcaster's Health to empower a spell. So, a wizard needing to increase a Casting Roll by 5 could use 3 from a staff of power and 2 from their own Health. Spellcasters using these items are still subject to the standard rules for and limitations on empowerment. Staffs, rings, and wands of power recharge between games.",
  },
  {
    name: "Wyrdstone Band",
    category: "Item of Power",
    power: 2,
    description:
      "Items of power provide a spellcaster with an additional pool from which they can draw to empower a spell or Will Roll in the same way as they can using their own Health. The number in brackets is the amount of power that can be drawn from an item before the pool runs dry. This power can be used in conjunction with the spellcaster's Health to empower a spell. Spellcasters using these items are still subject to the standard rules for and limitations on empowerment. Rings of power recharge between games.",
  },
  {
    name: "Elfbone Wand (2)",
    category: "Item of Power",
    power: 2,
    description:
      "Items of power provide a spellcaster with an additional pool from which they can draw to empower a spell or Will Roll in the same way as they can using their own Health. The number in brackets is the amount of power that can be drawn from an item before the pool runs dry. This power can be used in conjunction with the spellcaster's Health to empower a spell. Spellcasters using these items are still subject to the standard rules for and limitations on empowerment. Wands of power recharge between games.",
  },
  {
    name: "Mage Skull (6)",
    category: "Item of Power",
    power: 6,
    description:
      "Items of power provide a spellcaster with an additional pool from which they can draw to empower a spell or Will Roll in the same way as they can using their own Health. The number in brackets is the amount of power that can be drawn from an item before the pool runs dry. This power can be used in conjunction with the spellcaster's Health to empower a spell. Spellcasters using these items are still subject to the standard rules for and limitations on empowerment. Orbs of power DO NOT recharge between games – once it has been tapped for 6 points of additional power it is empty and can't even be sold.",
  },
  {
    name: "Rector's Scepter",
    category: "Wand",
    description:
      "Once per game, a figure carrying this wand may roll two dice when attempting to cast a spell and choose which one to use.",
  },
];
