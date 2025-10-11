import type { Spell } from "./spell.interface";

export const magicOfTheHornedRat: Spell[] = [
  {
    roll: 1,
    name: "Quick-Quick Scurry",
    school: "Magic of the Horned Rat",
    castingNumber: 16,
    range: "Line of Sight",
    description:
      "This spell may only be cast on a member of the Sorcerer's warband or an uncontrolled creature. This figure will activate at the end of the current phase instead of in its normal phase. For example, if a Sorcerer casts this spell on an uncontrolled creature, the creature will activate at the end of that player's Champion's phase instead of the Creature phase. Sorcerers may not cast this spell on themselves, nor on a figure that has already activated in the current turn.",
  },
  {
    roll: 2,
    name: "Warpfire Blade",
    school: "Magic of the Horned Rat",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "The caster causes a weapon to burst into sudden green warpfire. This weapon is now considered magic and does +2 damage. If cast upon a missile weapon, crossbow, or sling the bonus only applies to the next attack made with that weapon.",
  },
  {
    roll: 3,
    name: "Warpfire Conflagration",
    school: "Magic of the Horned Rat",
    castingNumber: 12,
    range: "Area Effect",
    description:
      'The Sorcerer makes a +0 elemental magic shooting attack against every enemy figure (either from an opposing warband or uncontrolled creature) within 12" and line of sight. This may include enemy figures in combat, although the normal rules for shooting into combat are followed in this case.',
  },
  {
    roll: 4,
    name: "Swarm of Greed",
    school: "Magic of the Horned Rat",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'This spell summons a swarm of greedy rats that targets either an unclaimed treasure token or a figure carrying a treasure token. The Sorcerer may move the token up to 6" in a randomly determined direction. The distance can be decided after the direction is determined. If a figure is carrying the token, it may make a Fight Roll with a Target Number of 20 to hold onto it – if unsuccessful, the figure drops it, and the token is moved in the same manner as above.',
  },
  {
    roll: 5,
    name: "Death Globe",
    school: "Magic of the Horned Rat",
    castingNumber: 14,
    range: "Line of Sight",
    description:
      'The Sorcerer takes a glowing sphere of warpstone, imbues it with toxic magic energy and hurls it at their target, whereupon it explodes into hundreds of poisonous fragments. The Sorcerer picks a target point within 14". Every figure, including allies, within 1.5" of that point immediately suffers a +3 poisoned magic shooting attack. Use the target point as the origin of the attack for working out line of sight and cover.',
  },
  {
    roll: 6,
    name: "Wyrdstone Glow",
    school: "Magic of the Horned Rat",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "A brightly glowing green warpstone light surrounds the target figure. For the rest of the game, all shooting attacks against this figure from any source are at +3. Multiple castings of Warpstone Glow on the same target have no effect.",
  },
  {
    roll: 7,
    name: "Rat Sentry",
    school: "Magic of the Horned Rat",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'This spell may be cast on any terrain feature within 12" that has a flat side, such as most ruins. Place a Rat Sentry token on or next to the terrain feature. For the rest of the game, the caster may choose to draw line of sight from the Rat Sentry instead of from the figure when casting spells. The Rat Sentry has 180-degree field of vision. A Sorcerer may only maintain one Rat Sentry at a time. If the terrain piece on which the Rat Sentry is placed is damaged or destroyed (such as by a Crumble spell) the spell is cancelled. The Sorcerer may cancel this spell at the end of any turn.',
  },
  {
    roll: 9,
    name: "Traverse the Underempire",
    school: "Magic of the Horned Rat",
    castingNumber: 10,
    range: "Self Only",
    description:
      "The Sorcerer immediately moves to any location within line of sight, but may take no other actions this turn after casting this spell. This spell may not be used to enter combat or to move off the table.",
  },
  {
    roll: 10,
    name: "Warpstone Traps",
    school: "Magic of the Horned Rat",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      'The Sorcerer places a glowing warpstone trap on the ground or a wall anywhere within 4" and line of sight. A marker should be placed on the table to represent the trap. If any character or creature moves within 1" of the trap, it explodes, and every figure, friend or foe, within 2" suffers an immediate +5 poisoned magic attack. Note that if the trap is placed within 1" of a figure, it does not explode immediately – that figure must move to set it off. A Sorcerer may have up to three such traps in play at any time. At the end of any turn, they may choose to cancel any or all their traps. If the Sorcerer that placed a trap is no longer on the table, roll a die for each trap at the end of each turn: on an 11+ the trap vanishes.',
  },
  {
    roll: 11,
    name: "Cloak of Shadows",
    school: "Magic of the Horned Rat",
    castingNumber: 12,
    range: "Touch",
    description:
      "The target figure becomes invisible. No figure may move into combat with the invisible figure, nor target it with any attack or spell (although it may still be affected by area effects, such as the blast radius of a Grenade spell). If the invisible figure moves into combat, casts a spell, or picks up a treasure token, the Invisibility spell is cancelled. This spell may be cast on a figure already carrying treasure, rendering both invisible. In this case, if the figure drops the treasure, the spell is cancelled.",
  },
  {
    roll: 12,
    name: "Skitterswap",
    school: "Magic of the Horned Rat",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      'This spell switches the position of two figures on the table. The two figures being transposed must both be within line of sight of the Sorcerer and within 12" of one another. The Sorcerer may cast Warp-Switch to switch themselves with another figure. Members of opposing warbands are eligible targets for being transposed but may make a Will Roll with a Target Number equal to the Casting Roll to attempt to resist the spell. If successful, the spell is cancelled and no figures are moved. Friendly figures and uncontrolled creatures will not make such Will Rolls.',
  },
  {
    roll: 13,
    name: "Children of the Horned Rat",
    school: "Magic of the Horned Rat",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      'The Sorcerer invokes the blessing of the Horned Rat, summoning 3 giant rats. Place each giant rat anywhere within 6" of the Sorcerer. These rats have 1 Health each and are uncontrolled creatures that activate in the Creature phase. However, these rats will never attack Skaven figures – they will only attack members of opposing warbands.',
  },
  {
    roll: 14,
    name: "Pollute the Arcane",
    school: "Magic of the Horned Rat",
    castingNumber: 14,
    range: "Area Effect",
    description:
      "This spell pollutes the winds of magic with the corrupting influence of warpstone. The Sorcerer may choose one spell for Pollute the Arcane to affect. All rolls to attempt to cast that particular spell are at -3 for the rest of the game. A Sorcerer may only have one Pollute the Arcane spell in effect at a time. Only one Pollute the Arcane can be active for each specific target spell at one time.",
  },
  {
    roll: 15,
    name: "Swarm of Rats",
    school: "Magic of the Horned Rat",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      'The target figure is attacked by a swarm of rats that bite and distract. The swarm of rats has a 1" radius centred on, and moving with, the target figure. It affects all figures, including the target figure, fully or partially within this radius. While being pestered by the swarm of rats, a figure has -4 Fight and -4 Shoot (to a minimum of +0) and -2 to Casting Rolls. After this figure activates each turn, it may make a Will Roll with a Target Number equal to the Casting Roll. If successful, the spell is cancelled. Other figures within the radius may simply move away to escape. A figure may only ever be affected by one Swarm of Rats spell at a time, whether as a target or by virtue of being within the 1" radius. Large creatures, undead, and constructs are immune to this spell.',
  },
  {
    roll: 16,
    name: "Summon Ravenous Rats",
    school: "Magic of the Horned Rat",
    castingNumber: 12,
    range: "Area Effect",
    description:
      'Place three Ravenous Swarm tokens on the table within line of sight of the Sorcerer. Any figure that moves within 2" of a Ravenous Swarm token, or activates while within 2" of a Ravenous Swarm token, takes 2 points of damage and is damaged. A Sorcerer may not cast this spell if he already has Ravenous Swarm tokens on the table. A Sorcerer may dismiss the Ravenous Swarm tokens using an action.',
  },
  {
    roll: 17,
    name: "Warpstone Mastery",
    school: "Magic of the Horned Rat",
    castingNumber: 10,
    range: "Out of Game",
    description:
      "The Sorcerer may attempt to cast this spell before rolling for treasure. If successful, the Sorcerer may roll two dice and choose which one to keep when making the first roll to determine what treasure has been found. If both dice roll the same number, however, the token is lost – experience is still gained, but no treasure is found.",
  },
  {
    roll: 18,
    name: "Summon Verminlord",
    school: "Magic of the Horned Rat",
    castingNumber: 18,
    range: "Touch",
    description:
      'Immediately place a Verminlord on the table within 1" of the Sorcerer. It may not be placed straight into combat. This Verminlord is considered to be under the effects of a Bind Daemon (Chaos Rituals) spell. If a Sorcerer rolls a 1 while attempting to cast this spell, they summon an uncontrolled Verminlord and must place this demon in combat with the Sorcerer. A Sorcerer cannot empower a roll of 1 when casting this spell. but there is otherwise no limit on empowering this spell.',
  },
  {
    roll: 19,
    name: "Soul Gnaw",
    school: "Magic of the Horned Rat",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "The target suffers -2 to all die rolls. At the end of each turn, the target may make a Will Roll with the Target Number equal to the Casting Roll (at -2, of course). If successful, this spell is cancelled. Soul Gnaw cannot be cast on a figure already suffering the effects of a Soul Gnaw spell.",
  },
  {
    roll: 20,
    name: "Warpstone Alchemy",
    school: "Magic of the Horned Rat",
    castingNumber: 12,
    range: "Out of Game (B)",
    description:
      "The Sorcerer creates one Lesser Potion of their choice that may be sold, stored in the Sorcerer's vault, or given to a member of the warband. A Sorcerer may use this spell to create a Greater Potion. First, they must declare what potion they are attempting to brew and pay the listed ingredients cost. The Sorcerer should then roll to cast Warpstone Alchemy with a -4 to the Casting Roll. If successful, the potion is created and can be immediately assigned to a figure in the warband, sold, or stored in the Sorcerer's vault. If unsuccessful, the potion is not created and the money spent on ingredients is lost.",
  },
];
