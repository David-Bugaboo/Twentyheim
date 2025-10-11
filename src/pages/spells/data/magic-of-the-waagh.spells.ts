import type { Spell } from "./spell.interface";

export const magicOfTheWaagh: Spell[] = [
  {
    roll: 1,
    name: "SHAKE DA GROUND!",
    school: "Magic of the Waagh!",
    castingNumber: 12,
    range: "Area Effect",
    description:
      'The caster pounds the ground and sends a massive shockwave rolling through the earth. Every figure within 8" of the caster (but not the caster) must make an immediate Move Roll (TN20). Large creatures get +2 to this roll. If the figure fails, it is knocked prone. While prone, a figure is a -2 Fight, -2 Shoot, and -2 to all Casting Rolls and may not take a move action. A figure can get back to their feet simply by spending a move action. This requires the full move action.',
  },
  {
    roll: 2,
    name: "YOU NOT HITTIN'",
    school: "Magic of the Waagh!",
    castingNumber: 8,
    range: "Area Effect",
    description:
      'Pure raw energy roils around the Shaman and his allies. Any figures within 3", suffer no penalties for being Large when rolling against shooting attacks.',
  },
  {
    roll: 3,
    name: "STOMP THROUGH!",
    school: "Magic of the Waagh!",
    castingNumber: 14,
    range: "Line of Sight",
    description:
      'This spell can target any piece of terrain within 12" of the caster. A 3" diameter, infinitely high, section of that terrain is completely destroyed and should be either removed from the table or marked in some way. Any figure that was standing on that terrain falls, taking damage as normal. In addition, all figures on or within 2" of the destroyed section of terrain immediately suffer a +2 non-magical shooting attack.',
  },
  {
    roll: 4,
    name: "GET MOVIN' YA GIT!",
    school: "Magic of the Waagh!",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "This spell may only be cast on a member of the spellcaster's warband or an uncontrolled creature. This figure will activate at the end of the current phase instead of in its normal phase. For example, if a Shaman casts this spell on an uncontrolled creature, the creature will activate at the end of that player's Champion phase instead of the Creature phase. Spellcasters may not cast this spell on themselves, nor on a figure that has already activated in the current turn. A miniature activated through this spell counts as having been activated together with the Warboz for effects of the Riotous ability.",
  },
  {
    roll: 5,
    name: "BASH 'EM ALL!",
    school: "Magic of the Waagh!",
    castingNumber: 12,
    range: "Area Effect",
    description:
      'Every figure within 3" of the spellcaster (but not counting the spellcaster) suffers a +5 elemental magic attack.',
  },
  {
    roll: 6,
    name: "GET OUT!",
    school: "Magic of the Waagh!",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'The target suffers an immediate +10 attack. Instead of taking damage from this attack, the target is moved 1" directly away from the spellcaster for every point of damage they would have taken. If this pushes the target into the edge of the table or a piece of terrain over ½" high, they stop immediately. Other figures do not stop (or get hit by) a pushed figure – they are assumed to step out of the way. If this spell is cast from beneath a figure it will push them up. If the target is pushed up or off a height, it suffers falling damage as normal. This spell can push a figure out of combat, and as it is not a shooting attack, the target is not randomized.',
  },
  {
    roll: 7,
    name: "MAKE DA CHOPPA BIGGA!",
    school: "Magic of the Waagh!",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "This spell targets a weapon of the spellcaster's choosing. If cast on a melee weapon, this weapon counts as a magic weapon with +1 Fight. Bows and crossbows count as magic weapons with +1 Shoot, but the attacks made with them do not count as magic attacks. This spell may be cast on a single arrow or crossbow bolt, in which case that ammunition gives +1 Shoot and its attack counts as magic, but for the next shooting attack only. This spell may only be cast once on each weapon. When using both a magic missile weapon and magic ammunition, the shooter may choose to apply the bonus of one or the other, but not both.",
  },
  {
    roll: 8,
    name: "GET BIGGA AN' KRUMP 'EM!",
    school: "Magic of the Waagh!",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "The target receives +2 Fight. Multiple castings of Get Bigga an' Krump 'Em! on the same target have no effect.",
  },
  {
    roll: 9,
    name: "SMASH DA RUBBLE!",
    school: "Magic of the Waagh!",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'The spellcaster selects a point on a terrain feature that is within line of sight and at least 1" in height. Make a +4 non-magic attack against all figures that are within 1.5" of the target point.',
  },
  {
    roll: 10,
    name: "ARMOR NO FUN!",
    school: "Magic of the Waagh!",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "This spell destroys a target figure's armour. If the target was wearing leather armour, it suffers -1 Armour for the rest of the game. If it was wearing mail armour it suffers -2 Armour for the rest of the game. Furthermore, the target must make a Will roll or take 5 points of damage. The figure's armour is replaced for free after the game. This spell has no effect on a figure wearing magic armour.",
  },
  {
    roll: 11,
    name: "WAAAGH! ROAR!",
    school: "Magic of the Waagh!",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      'Make a +4 non-magic shooting attack against the target figure. If it hits, the target immediately suffers -2 Armour (to a minimum of 10) for the purposes of this attack only. Furthermore, in addition to any damage taken due to this attack, move the target figure back in a straight line away from the spellcaster a number of inches equal to the damage taken or until the figure hits a terrain feature more than 0.5" tall.',
  },
  {
    roll: 12,
    name: "STOP YE BARKIN'!",
    school: "Magic of the Waagh!",
    castingNumber: 8,
    range: "Area Effect",
    description:
      'All animals within 12" of the spellcaster must make a Will roll or lose their next activation. Furthermore, any animal that has lost its next activation will not force combat with any figure until the next turn.',
  },
  {
    roll: 13,
    name: "SQUIGASAUR COMES!",
    school: "Magic of the Waagh!",
    castingNumber: 16,
    range: "Area Effect",
    description:
      'The Shaman invokes the power of the Waagh! to summon a Squigasaur. Place the Squigasaur anywhere within 6" of the Shaman. The Squigasaur can be immediately mounted by the Shaman or any warrior that is not a goblin. The normal limit of one mount per warband applies. If the warband does not have the Breeding Cave base upgrade, the Squigasaur leaves the warband at the end of the game.',
  },
  {
    roll: 14,
    name: "GROW BIGGA!",
    school: "Magic of the Waagh!",
    castingNumber: 14,
    range: "Line of Sight",
    description:
      "The target Orc grows to massive size through fungal growth! The target gains the Large trait and +1 Fight until the end of the game. This spell cannot be cast on creatures that already have the Large trait.",
  },
  {
    roll: 15,
    name: "TIME TO WAAAAAGH!",
    school: "Magic of the Waagh!",
    castingNumber: 16,
    range: "Line of Sight",
    description:
      "The target figure within line of sight is treated as if it were under the effect of the Warboz's Waaagh! power. The target gains all benefits of the Waaagh! power and, if the target does not fight during this turn, it suffers the normal damage at the end of the turn as per the Waaagh! power. This spell lasts until the end of the turn.",
  },
  {
    roll: 16,
    name: "WE GO FIRST!",
    school: "Magic of the Waagh!",
    castingNumber: 12,
    range: "Out of Game (B)",
    description:
      "If this spellcaster is on the table, its warband may add +2 to its Initiative Rolls for the purposes of determining the primary player only. This bonus stacks so, if both the wizard and the apprentice have cast this spell and are both on the table, the player may add +4 to their Initiative Rolls. The maximum possible bonus is +4. This spell counts as active on the spellcaster during the game and may be cancelled by anything that cancels spells.",
  },
  {
    roll: 17,
    name: "SEE IT COMIN'!",
    school: "Magic of the Waagh!",
    castingNumber: 12,
    range: "Touch",
    description:
      "This spell gives the target a magic insight into the moves their opponent will attempt in a fight. It grants the target +1 Fight and +1 Armour for the remainder of the game. Multiple castings of this spell on the same target have no effect.",
  },
  {
    roll: 18,
    name: "YA DO DIS!",
    school: "Magic of the Waagh!",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      'The target of this spell immediately drops any treasure tokens it is carrying. The spellcaster may move the figure up to 3" in any direction provided this does not move the figure into combat or cause it any immediate damage (e.g. falling more than 3"). The target of this spell may make a Will Roll with a Target Number equal to the Casting Roll. If successful, the spell has no effect.',
  },
  {
    roll: 19,
    name: "SMELL DA LOOT!",
    school: "Magic of the Waagh!",
    castingNumber: 12,
    range: "Out of Game (B)",
    description:
      "This spell makes the shaman feel da' loot everywhere. Every successful casting of this spell before a game allows the player to make two rolls for a single treasure token (other than the central treasure, which is unaffected by this spell) after the game and choose which one to take.",
  },
  {
    roll: 20,
    name: "SNOTLING DISTURBANCE!",
    school: "Magic of the Waagh!",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      'The target figure is attacked by a swarm of annoying snotlings that bite, pull, and distract. The swarm of snotlings has a 1" radius centred on, and moving with, the target figure. It affects all figures, including the target figure, fully or partially within this radius. While being pestered by the snotlings, a figure has -4 Fight and -4 Shoot (to a minimum of +0) and -2 to Casting Rolls. After this figure activates each turn, it may make a Will Roll with a Target Number equal to the Casting Roll. If successful, the spell is cancelled. Other figures within the radius may simply move away to escape. A figure may only ever be affected by one Snotling Disturbance spell at a time, whether as a target or by virtue of being within the 1" radius. Large creatures, undead, and constructs are immune to this spell.',
  },
];
