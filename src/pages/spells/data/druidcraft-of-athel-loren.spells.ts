import type { Spell } from "./spell.interface";

export const druidcraftAthelLorenSpells: Spell[] = [
  {
    roll: 1,
    name: "Wild Rider Fury",
    school: "Druidcraft of Athel Loren",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "The target figure gains +1 Fight for the rest of the game. Multiple castings of Beast Strength on the same target have no effect.",
  },
  {
    roll: 2,
    name: "Word of the Asrai",
    school: "Druidcraft of Athel Loren",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "This spell may be cast upon any animal that is not currently under the control of any warband. The figure should make a Will Roll to resist. If the figure fails the Will Roll, the Spellsinger may immediately cause it to take one action. If the creature is not currently in combat, that action must be movement. The Spellsinger may force the animal to make any legal move, so far as that movement does not cause the creature direct harm (e.g. falling, walking into fire). If the creature is in combat, the Spellsinger can make it attack any figure with which it is in combat, or may compel it to use a movement action to move out of combat.",
  },
  {
    roll: 3,
    name: "Kurnoro's Command",
    school: "Druidcraft of Athel Loren",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "This spell may only target an animal. That animal must make a Will Roll to resist. If the animal fails the Will Roll, it joins the Spellsinger's warband, and the controlling player may activate it in his next Soldier phase. A Spellsinger may not cast this spell while she already has another animal under control. The caster may cancel the effect of this spell at any time as a free action. The animal leaves the warband at the end of the game.",
  },
  {
    roll: 4,
    name: "Wardens of Athel Loren",
    school: "Druidcraft of Athel Loren",
    castingNumber: 8,
    range: "Area Effect",
    description:
      "Roll a die to see what type of animal has been summoned: 1–4 wolf, 5–7 boar, 8–10 leopard, 11–13 giant-owl, 14–16 Stag, 17–20 Bear, . At the end of this turn, place the summoned animal on the table, touching any table edge, except the one opposite your own starting edge. This animal counts as a member of your crew for the rest of the game. A Spellsinger may not cast this spell if she already has a summoned animal on the table.",
  },
  {
    roll: 5,
    name: "Infinite Canopy",
    school: "Druidcraft of Athel Loren",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'The Shadow of Atel Loren\'s Trees in brough forth by the Spellsinger. On the turn the spell is cast, the maximum line of sight for the game is reduced to 16". Every turn after this, the maximum line of sight decreases by another 2", to a maximum of 12".',
  },
  {
    roll: 6,
    name: "Faerie Hunt",
    school: "Druidcraft of Athel Loren",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "Creates a Faerie anywhere within 6\" of the caster. This creature activates immediately after the Spellsinger's activation. This creature is removed from the table at the end of the turn.",
  },
  {
    roll: 7,
    name: "Melody of the Bestial Howl",
    school: "Druidcraft of Athel Loren",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "Pick a target within 20\" and in line of sight. At the end of the target figure's next activation, after it has taken all of its actions, make a +6 attack against it. This is considered a non-magic attack. Additionally, if the figure is wearing heavy armour, subtract 2 from its Armour for the purpose of determining damage.",
  },
  {
    roll: 8,
    name: "Tenacity of the Glade Lord",
    school: "Druidcraft of Athel Loren",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "This spell may only be cast on a member of the Spellsinger's crew who is within 8\" and is carrying a bow. The next time that figure makes a shooting attack, it receives a +3 to its Shooting Roll.",
  },
  {
    roll: 9,
    name: "Forbiddance of the Loren Guard",
    school: "Druidcraft of Athel Loren",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'Pick a target figure within 20" and in line of sight. This figure may not be part of the same crew as the Spellsinger. That figure must make a Will Roll. If the target fails its Will Roll, the Spellsinger may move the target figure up to 4" in a straight line in any horizontal direction. The target may not be moved through terrain, or other figures, but may be moved into combat or off terrain that is above the ground. This may take a figure out of combat.',
  },
  {
    roll: 10,
    name: "Flight of the Owls",
    school: "Druidcraft of Athel Loren",
    castingNumber: 8,
    range: "Self Only",
    description:
      "The Spellsinger may immediately move 6\" in any direction (including vertically), without being subject to any penalties for movement (e.g. climbing, rough ground, carrying treasure). She may even move herself down off of terrain. However, if this leaves the Spellsinger in mid-air, she will immediately fall to the ground, suffering the usual damage for falls, from the point at which the spell's movement ended.",
  },
  {
    roll: 11,
    name: "Tree Revenant Armor",
    school: "Druidcraft of Athel Loren",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "The target of this spell receives +1 Armour for the rest of the game. This spell has no effect on a target that already has Armour of 14 or higher. Multiple castings of Tree Revenant Armor on the same figure have no effect.",
  },
  {
    roll: 12,
    name: "Thorn Barrier",
    school: "Druidcraft of Athel Loren",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'Creates a line of dense brambles 6" long, 1" wide, and 1" tall. The Thorn Barrier do not block line of sight, but may count as intervening terrain. Any figure that wishes to climb over the Thorn Barrier must first make a Will Roll with a Target Number of 14. If they fail, their current action ends immediately.',
  },
  {
    roll: 13,
    name: "Vine Ladder",
    school: "Druidcraft of Athel Loren",
    castingNumber: 6,
    range: "Line of Sight",
    description:
      "This spell creates a permanent ladder of any height attached to the side of a terrain piece. Figures using this ladder do not suffer any movement penalties for climbing.",
  },
  {
    roll: 14,
    name: "March of the Forest",
    school: "Druidcraft of Athel Loren",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'This spell may be cast on any piece of terrain that is primarily composed of vegetation. The Spellsinger may move this terrain piece up to 3" in any direction. The terrain piece may not be moved onto or through another terrain piece or figure.',
  },
  {
    roll: 15,
    name: "Grasp of the Grove",
    school: "Druidcraft of Athel Loren",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "The target of this spell is ensnared in clinging weeds and vines. Each time the target is activated, it must make a Fight Roll with a Target Number of 15 (creatures with the 'Large' trait receive +4 to this roll). If the target fails, it may take only one action during its next activation, which cannot be movement. Once a target has made its Fight Roll, it has escaped the vines and is no longer ensnared.",
  },
  {
    roll: 16,
    name: "Song of Shattered Steel",
    school: "Druidcraft of Athel Loren",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "After naming the target of this spell, the caster should pick one of the target's weapons. The spell uses the power of the song to sunder it and potentially make it useless. Roll a die and consult the Song of Shattered Steel Table. Add +10 if it is magic.\n\nWarp Weapon Table:\n• 1–10: The weapon is destroyed\n• 11–15: The weapon is full of fissures, the wielder suffers -1 Fight.\n• 16–20: The weapon is brittle and does -1 damage.\n• 21+: The weapon is undamaged.\n\nThe effects of this spell are permanent. This spell may be cast multiple times against the same weapon of the target and penalties do stack.",
  },
  {
    roll: 17,
    name: "Quiet Grove",
    school: "Druidcraft of Athel Loren",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "This spell only affects spellcasters. The target of the spell may not activate any other figures during their activation phase. Additionally, they receive a -2 to all casting rolls. The target may attempt to resist this spell by making a Will roll.",
  },
  {
    roll: 18,
    name: "Veil of Echoes",
    school: "Druidcraft of Athel Loren",
    castingNumber: 10,
    range: "Self Only",
    description:
      'All enemy figures within 2" of the Spellsinger receive -1 Fight.',
  },
  {
    roll: 19,
    name: "Lire of Kurnoros",
    school: "Druidcraft of Athel Loren",
    castingNumber: 10,
    range: "Self Only & Out of Game",
    description:
      "This spell temporarily enchants a musical instrument to play louder and more clearly than before. The Spellsinger may imbue the instruments of any warband figure and gains +2 Will while doing so. A figure cannot benefit from more than one instruments. This enchanted instrument does not take up an item slot, and the enchantment lasts until the end of the game. After the game, however, a Spellsinger that successfully cast this spell during the game may make one further attempt to cast it as an Out of Game spell. If successful, a permanent magic item is created – it grants a +2 Will bonus to the bearer, takes up an item slot, and may be used by any member of the warband.",
  },
  {
    roll: 20,
    name: "Athel's Loren Sacred Arrow",
    school: "Druidcraft of Athel Loren",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "The Spellsinger makes a +3 magic shooting attack against one figure within line of sight. If the attack hits, it does +2 damage. The attack ignores any intervening terrain (but not cover) between the caster and the target.",
  },
];
