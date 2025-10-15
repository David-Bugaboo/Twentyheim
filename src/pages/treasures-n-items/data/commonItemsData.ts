export interface EquipmentItem {
  id: string;
  name: string;
  properties: Array<{ label: string; value: string }>;
  description: string;
}

export interface EquipmentCategory {
  id: string;
  label: string;
  icon: string;
  items: EquipmentItem[];
}

export const commonItemsData: EquipmentCategory[] = [
  // MELEE WEAPONS
  {
    id: "melee-weapons",
    label: "Melee Weapons",
    icon: "",
    items: [
      {
        id: "dagger",
        name: "Dagger",
        properties: [
          { label: "Type", value: "Melee Weapon" },
          { label: "Damage Modifier", value: "-1" },
          { label: "Item Slots", value: "First dagger takes no slot" },
        ],
        description:
          "This is a knife or other small weapon such as a light club. Daggers have a -1 damage modifier.\n\n**Important:** The first dagger carried by a figure does not take up an item slot. So, a wizard can carry a dagger, plus up to five other items.\n\nThe dagger is the universal backup weapon — light, discreet, and useful both in combat and as a survival tool. Many warriors carry one even when well-armed, for you never know when an extra blade might save your life.",
      },
      {
        id: "hand-weapon",
        name: "Hand Weapon",
        properties: [
          { label: "Type", value: "Melee Weapon" },
          { label: "Damage Modifier", value: "None (0)" },
        ],
        description:
          "This includes any kind of weapon that is commonly wielded with one hand, including swords, scimitars, hand axes, maces, and even light spears. These weapons have no modifiers in combat.\n\nHand weapons are the standard armament in Mordheim — versatile, reliable, and effective. They are the ideal choice for warriors who wish to use a shield or another weapon in their off-hand.",
      },
      {
        id: "two-handed-weapon",
        name: "Two-Handed Weapon",
        properties: [
          { label: "Type", value: "Melee Weapon" },
          { label: "Damage Modifier", value: "+2" },
          { label: "Item Slots", value: "2 slots" },
        ],
        description:
          "This includes any kind of heavy melee weapon that requires two hands to wield, such as two-handed swords, battle-axes, polearms, large flails, and heavy spears.\n\nThese weapons do +2 damage. Because they are so bulky, these weapons take up two item slots. So, a wizard carrying a two-handed weapon may only carry up to three other items.\n\nTwo-handed weapons are the symbol of powerful warriors who rely on brute strength. The additional damage can be devastating, but the cost in mobility and versatility is significant.",
      },
      {
        id: "staff",
        name: "Staff",
        properties: [
          { label: "Type", value: "Melee Weapon" },
          { label: "User Damage Modifier", value: "-1" },
          {
            label: "Opponent Damage Modifier",
            value: "-1 (hand-to-hand only)",
          },
        ],
        description:
          "The staff is better known for its defensive properties. Staffs do -1 damage.\n\nIn hand-to-hand combat, however, it also gives the opponent a -1 damage modifier. The staff does not give this modifier to shooting attacks.\n\nThis category also includes magic staffs.\n\nStaffs are the preferred weapon of wizards and priests — not for offensive capability, but for the protection they offer. The ability to reduce incoming damage can be the difference between survival and death for fragile spellcasters.",
      },
      {
        id: "unarmed",
        name: "Unarmed",
        properties: [{ label: "Penalties", value: "-2 Fight, -2 Damage" }],
        description:
          "If a model ends up with no weapons, it can fight as normal but suffers -2 Fight and a -2 damage modifier.\n\n**Important Note:** Creatures that have no weapons listed in their notes fight with natural weapons and are thus never counted as unarmed.\n\nBeing unarmed in Mordheim is a near-certain death sentence. Even the most skilled warrior is severely handicapped without a proper weapon.",
      },
    ],
  },

  // RANGED WEAPONS
  {
    id: "ranged-weapons",
    label: "Ranged Weapons",
    icon: "",
    items: [
      {
        id: "bow",
        name: "Bow",
        properties: [
          { label: "Type", value: "Ranged Weapon" },
          { label: "Maximum Range", value: '24"' },
          { label: "Damage Modifier", value: "None (0)" },
          { label: "Requires", value: "Quiver" },
        ],
        description:
          'The most common form of missile weapon in Frostgrave is the bow. The game makes no distinction between types of bow, and players are free to depict them as longbows, composite bows, etc.\n\nBows may be loaded and fired in a single action.\n\nFor game purposes, the maximum range of a bow is 24", as there should never be more than 24" of open line of sight anywhere in the close confines of the Frozen City.\n\nIn order to use a bow, a figure must also be carrying a quiver (which fills another item slot) or some type of magic ammunition.\n\nThe bow is the most versatile ranged weapon — quick to use, decent range, and reliable. It is the weapon of choice for scouts, rangers, and elven warriors.',
      },
      {
        id: "crossbow",
        name: "Crossbow",
        properties: [
          { label: "Type", value: "Ranged Weapon" },
          { label: "Maximum Range", value: '24"' },
          { label: "Damage Modifier", value: "+2" },
          { label: "Reload", value: "Requires 1 action" },
          { label: "Requires", value: "Quiver" },
        ],
        description:
          'Crossbows take one action to load and one action to fire. If a figure wishes, it may replace its movement action with a "reload" action.\n\nCrossbows have a +2 damage modifier.\n\nCrossbows also have a maximum range of 24". It is assumed that all crossbows start the game loaded and ready to fire.\n\nIn order to use a crossbow, a figure must also be carrying a quiver (which fills another item slot) or some type of magic ammunition.\n\nCrossbows pack more punch than bows, but the reload time makes them less flexible in extended firefights. They are favored by warriors who want to guarantee their first shot counts.',
      },
      {
        id: "hand-crossbow",
        name: "Hand Crossbow",
        properties: [
          { label: "Type", value: "Ranged Weapon / Melee Weapon" },
          { label: "Maximum Range", value: '12"' },
          { label: "Damage Modifier", value: "+1" },
          { label: "Reload", value: "Requires 1 action (one-handed)" },
          { label: "Melee Use", value: "Counts as dagger" },
        ],
        description:
          'Hand Crossbows take one action to load and one action to fire. If a figure wishes, it may replace its movement action with a "reload" action. However, they may be used and loaded with only one hand.\n\nCrossbows have a +1 damage modifier and a maximum range of 12".\n\nAdditionally, Hand Crossbows count as daggers in close combat, including for Two-Weapon Fighting.\n\nIt is assumed that all hand crossbows start the game loaded and ready to fire.\n\nHand crossbows are the weapon of choice for assassins and rogues — compact, deadly at close range, and functional in melee if needed.',
      },
      {
        id: "sling",
        name: "Sling",
        properties: [
          { label: "Type", value: "Ranged Weapon" },
          { label: "Maximum Range", value: '16"' },
          { label: "Damage Modifier", value: "-2" },
          { label: "Special", value: "Can be used in offhand" },
        ],
        description:
          "A simple ranged weapon favored by the poorest warriors.\n\nThe sling can be used in the off-hand alongside another weapon, and does not cause encumberance when carrying Wyrdstone Shards.\n\nWhile weak, the sling's versatility makes it valuable for support fighters who need a ranged option without sacrificing melee capability.",
      },
      {
        id: "throwing-weapon",
        name: "Throwing Weapon",
        properties: [
          { label: "Type", value: "Melee & Ranged Weapon" },
          { label: "Throwing Range", value: '10"' },
          { label: "Damage Modifier", value: "None (0)" },
          { label: "Melee", value: "Counts as hand weapon" },
        ],
        description:
          'Throwing Weapon are treated as hand weapons when used in hand-to-hand combat.\n\nThey can also be thrown up to 10". A thrown weapon is treated as a standard shooting attack and follows all of the rules for bows and crossbows.\n\nAny spell or special affect that causes a penalty to bow and crossbow attacks will also affect attacks with thrown javelins.\n\nThe javelin is the ultimate versatile weapon — effective both in melee and at range, making it ideal for warriors who need to adapt quickly to different combat situations.',
      },
    ],
  },

  // THROWING WEAPONS

  // FIREARMS
  {
    id: "firearms",
    label: "Black Powder Firearms",
    icon: "",
    items: [
      {
        id: "pistol",
        name: "Pistol",
        properties: [
          { label: "Type", value: "One-Handed Firearm" },
          { label: "Maximum Range", value: '10"' },
          { label: "Damage Modifier", value: "+2" },
          { label: "Armor Piercing", value: "Ignores 2 points of armor" },
          { label: "Reload", value: "Requires 1 action" },
          { label: "Melee Use", value: "Counts as dagger" },
          { label: "Requires", value: "Powder Horn" },
        ],
        description:
          'A one-handed firearm with 10" range. Deals +2 damage and ignores 2 points of armour from target figures.\n\nCount as a dagger in hand-to-hand combat, including for Two-Weapon Fighting. Requires an action to reload.\n\nPistols combine ranged lethality with melee utility, making them the favored sidearm of captains and duelists.',
      },
      {
        id: "musket",
        name: "Musket",
        properties: [
          { label: "Type", value: "Two-Handed Firearm" },
          { label: "Maximum Range", value: '24"' },
          { label: "Damage Modifier", value: "+2" },
          { label: "Armor Piercing", value: "Ignores 2 points of armor" },
          { label: "Reload", value: "Requires 1 action" },
          { label: "Melee Use", value: "As two-handed weapon (no +2 damage)" },
          { label: "Requires", value: "Powder Horn" },
        ],
        description:
          'This larger, two-handed firearm is the most common variety of black powder weapon. Deals +2 damage and ignores 2 points of armour from target figures. Muskets have a maximum effective range of 24".\n\nA model may only ever carry one musket and can never carry a shield. A musket can be used in hand-to-hand combat. It counts as a two-handed weapon, but does not receive the usual +2 damage bonus.\n\nThe musket is the weapon of professional soldiers — powerful, armor-piercing, but slow to reload and cumbersome in melee.',
      },
      {
        id: "blunderbuss",
        name: "Blunderbuss",
        properties: [
          { label: "Type", value: "Two-Handed Firearm" },
          { label: "Maximum Range", value: '14"' },
          { label: "Special", value: "Fires in a spread" },
          { label: "Reload", value: "Requires 1 action" },
          { label: "Melee Use", value: "As pistol (no two-weapon fighting)" },
          { label: "Requires", value: "Powder Horn" },
        ],
        description:
          'Usually falling between a pistol and a musket in size, a blunderbuss is a two-handed weapon that fires a spread of pellets instead of a single bullet. It has a maximum effective range of 14".\n\nWhen firing a blunderbuss, pick your target figure, and then make a shooting attack against that target and every other figure within 1" of it. Roll against your initial target first. If this roll is a misfire, do not roll against the other figures. Rolls of 1 when rolling against additional targets do not count as misfires.\n\nA blunderbuss can be used in hand-to-hand combat in the same way as a pistol, except it does not count for two-weapon fighting.\n\nThe blunderbuss excels at close quarters, where its spread can hit multiple enemies. It is the weapon of choice for boarding actions and street fighting.',
      },
    ],
  },

  // ARMOR & SHIELDS
  {
    id: "armor",
    label: "Armor & Shields",
    icon: "",
    items: [
      {
        id: "shield",
        name: "Shield",
        properties: [
          { label: "Type", value: "Defensive Equipment" },
          { label: "Armor Bonus", value: "+1" },
          { label: "Requirements", value: "One-handed weapon or free hand" },
        ],
        description:
          "A defensive item that provides +1 armour. Can be used with one-handed weapons.\n\nShields are the mark of a disciplined warrior. Whether a small buckler or a full tower shield, they provide crucial protection in the chaotic streets of Mordheim.",
      },
      {
        id: "light-armor",
        name: "Light Armor",
        properties: [
          { label: "Type", value: "Armor" },
          { label: "Armor Bonus", value: "+1" },
          { label: "Movement Penalty", value: "None" },
        ],
        description:
          "Leather or light mail armor. Provides +1 armour. Does not interfere with movement.\n\nLight armor offers a good balance between protection and mobility, making it the choice of scouts, rogues, and lightly-equipped warriors.",
      },
      {
        id: "heavy-armor",
        name: "Heavy Armor",
        properties: [
          { label: "Type", value: "Armor" },
          { label: "Armor Bonus", value: "+2" },
          { label: "Movement Penalty", value: "-1 Move" },
        ],
        description:
          "Plate mail or full armor. Provides +2 armour. Have a -1 Penalty to movement.\n\nHeavy armor provides excellent protection but at the cost of mobility. It is favored by veteran warriors and heavily-armored knights who can afford to sacrifice speed for survivability.",
      },
      {
        id: "quiver",
        name: "Quiver",
        properties: [
          { label: "Type", value: "Ammunition Storage" },
          { label: "For", value: "Bows and Crossbows" },
          { label: "Item Slots", value: "1 slot" },
        ],
        description:
          "Contains arrows or bolts for bows and crossbows. Required to use ranged weapons unless using magic ammunition. Fills one item slot.\n\nWithout a quiver, a bow is just an expensive club. Every archer needs one.",
      },
      {
        id: "powder-horn",
        name: "Powder Horn",
        properties: [
          { label: "Type", value: "Ammunition Storage" },
          { label: "For", value: "Black Powder Weapons" },
          { label: "Item Slots", value: "1 slot" },
        ],
        description:
          "Required accessory for black powder weapons. Contains the gunpowder needed to reload and fire muskets, pistols, and blunderbusses.\n\nWithout powder, a firearm is worthless. Keep your powder dry.",
      },
    ],
  },
];
