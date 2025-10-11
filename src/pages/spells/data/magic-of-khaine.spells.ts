import type { Spell } from "./spell.interface";

export const magicOfKhaine: Spell[] = [
  {
    roll: 1,
    name: "Visions of Violence",
    school: "Magic of Khaine",
    castingNumber: 12,
    range: "Out of Game(B)",
    description:
      "This spell may only be cast directly before a game. The spell targets a hero or champion from one of the opposing warbands in the game about to be played. When experience is calculated after the game, the target loses 20 experience points from the amount earned during the game. This cannot take the experience earned below zero. The effects of this spell continues in every subsequent game which includes both the spellcaster and the target. This spell cannot be cancelled, nor is it affected by any kind of holy urns. The only way to end the effects of this spell is for the target to play in a game in which the spellcaster is reduced to 0 Health. As soon as this happens, the spell is cancelled. If this occurs in the game immediately following the spell being cast, the target suffers no experience penalty.",
  },
  {
    roll: 2,
    name: "Irrational Bloodfrenzy",
    school: "Magic of Khaine",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "The next time the figure that is the target of this spell has to roll a die for any reason, roll two dice instead and take the lower roll. If a 20 is rolled on both dice, the target figure gains +1 to all die rolls for the remainder of the game.",
  },
  {
    roll: 3,
    name: "Bloodboil",
    school: "Magic of Khaine",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "This spell may be cast on any figure within 6\" of the spellcaster. Whenever this figure is activated, roll a die: on a 1–5 the figure receives one action fewer (to a minimum of 0), on a 6–15 nothing happens, and on 16–20 the figure receives one additional action (to a maximum of 3). On a roll of 1 or 20, the spell ends after the figure's activation. Otherwise, the spell remains until the end of the game. Multiple castings of this spell on the same figure have no effect.",
  },
  {
    roll: 4,
    name: "Distort Pathways",
    school: "Magic of Khaine",
    castingNumber: 10,
    range: "Out of Game(B)",
    description:
      'This spell may only be cast immediately before a game. After the warbands have been placed on the table, the spellcaster may pick one opposing soldier and move it up to 18". The figure must still be placed in a legal deployment area for his warband.',
  },
  {
    roll: 5,
    name: "Exsanguinate",
    school: "Magic of Khaine",
    castingNumber: 18,
    range: "Line of Sight",
    description:
      'This spell targets a figure within 8". The target must make a Will Roll with a Target Number equal to the Casting Roll or be immediately reduced to 0 Health. All figures may empower their Will Roll to resist this spell, even non-spellcasters. The spellcaster immediately loses 1 Health upon attempting this spell (even if it is cast successfully), in addition to any loss incurred by failure or empowerment. This spell has no effect on undead or constructs.',
  },
  {
    roll: 6,
    name: "Blood Explosion",
    school: "Magic of Khaine",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'The spellcaster selects a point that is within line of sight. Make a +4 non-magic attack against all figures that are within 1.5" of the target point.',
  },
  {
    roll: 7,
    name: "Unbound Painlust",
    school: "Magic of Khaine",
    castingNumber: 16,
    range: "Line of Sight",
    description:
      "The target figure will activate again in the Champion's phase and the Soldier phase. This is in addition to the figures that can normally activate in those phases. The target figure may not activate any additional soldiers or be part of a group activation in these phases. The target may perform one action in each of these two phases and may take any action – they are not limited to movement. If the target moved at all in a previous activation during the turn, any additional move actions are at half rate. If this spell is cast on the same target in consecutive turns, both the Hag Queen and the target figure immediately suffer 8 points of damage.",
  },
  {
    roll: 8,
    name: "Intensify Masochism",
    school: "Magic of Khaine",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "The target of this spell becomes immune to Mind Control and Suggestion effects for the rest of the game, and any such spells on the figure are cancelled. The figure gains +2 Will for the rest of the game.",
  },

  {
    roll: 9,
    name: "Crystallize Blood",
    school: "Magic of Khaine",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "This spell can be cast on a melee weapon or one piece of ammunition for a missile weapon. If a figure hits with this weapon, treat its opponent as having Armour -4 (to a minimum of 10).",
  },
  {
    roll: 10,
    name: "Hagbrew",
    school: "Magic of Khaine",
    castingNumber: 12,
    range: "Out of Game (B)",
    description:
      "The spellcaster creates one Lesser Potion of their choice that may be sold, stored in the wizard's vault, or given to a member of the warband. A wizard (and only a wizard) may use this spell to create a Greater Potion. First, they must declare what potion they are attempting to brew and pay the listed ingredients cost. The wizard should then roll to cast Hagbrew with a -4 to the Casting Roll. If successful, the potion is created and can be immediately assigned to a figure in the warband, sold, or stored in the wizard's vault. If unsuccessful, the potion is not created and the money spent on ingredients is lost.",
  },
  {
    roll: 11,
    name: "Mind Torture",
    school: "Magic of Khaine",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "The target suffers -2 to all die rolls. At the end of each turn, the target may make a Will Roll with the Target Number equal to the Casting Roll (at -2, of course). If successful, this spell is cancelled. Veil of Rage cannot be cast on a figure already suffering the effects of a Veil of Rage spell.",
  },
  {
    roll: 12,
    name: "Sanguine Mist",
    school: "Magic of Khaine",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'Place a line of fog, 6" long, 3" high, and 1" thick anywhere on the table as long as some part of it is within line of sight of the spellcaster and all of it is within 24". Figures can move through the fog with no penalty, but line of sight may not be drawn through it. At the start of each new turn, roll a die. On a result of 1–4 the fog dissipates and is removed from the table.',
  },
  {
    roll: 13,
    name: "Tendrils of Agony",
    school: "Magic of Khaine",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "Make an immediate plus +3 poisoned shooting attack against the target figure. This is a non-magic attack.",
  },
  {
    roll: 14,
    name: "Toxic Assassination",
    school: "Magic of Khaine",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "The target of this spell has its weapon coated in a potent venom. The next time this figure causes a damaging attack, either in hand-to-hand combat or by shooting, the victim of that attack counts as Poisoned. The target of this spell must be carrying an actual weapon.",
  },
  {
    roll: 15,
    name: "Painful Seduction",
    school: "Magic of Khaine",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      'The target of this spell immediately drops any treasure tokens it is carrying. The spellcaster may move the figure up to 3" in any direction including into combat, but not out of the table, or cause it any immediate damage (e.g. falling more than 3"). The target of this spell may make a Will Roll with a Target Number equal to the Casting Roll. If successful, the spell has no effect.',
  },
  {
    roll: 16,
    name: "Peer Through the Veil",
    school: "Magic of Khaine",
    castingNumber: 10,
    range: "Self Only",
    description:
      'The spellcaster, and all friendly figures within 6" of the spellcaster, can see invisible figures and are immune to the effects of the Beauty spell. Furthermore, if an invisible figure is within 6" of the spellcaster, the Invisibility spell is cancelled. If an Illusionary Soldier is within 6" of the spellcaster, it is immediately removed from the table.',
  },
  {
    roll: 17,
    name: "Sanguinary Step",
    school: "Magic of Khaine",
    castingNumber: 12,
    range: "Line of Sight",
    description: `This spell may only be cast on a member of the spellcaster's warband. Immediately move the target figure up to 10" in any direction, including vertically. This move must either be in a straight line or an arc. 
       It cannot curve around corners. If this move leaves the figure above the ground, it immediately falls, taking damage as normal. If the target is carrying treasure, this move is reduced to 5". This move may not take a 
       figure off the table, but may move it into combat. The target of the Sanguinary Step spell may take no other actions this turn other than a fight, though it may have taken actions previously.`,
  },
  {
    roll: 18,
    name: "Scriptures of the Flayed",
    school: "Magic of Khaine",
    castingNumber: 12,
    range: "Out of Game (A)",
    description:
      "This spell creates one scroll written in blood on flayed skin. The scroll must be of a spell that the spellcaster either knows or a spell for which they own the grimoire. The scroll may be sold, given to a figure, or stored in the wizard's vault.",
  },
  {
    roll: 19,
    name: "Khaine's Tenacity",
    school: "Magic of Khaine",
    castingNumber: 12,
    range: "Touch",
    description:
      "This spell gives the target a magic insight into the moves their opponent will attempt in a fight. It grants the target +1 Fight and +1 Armour for the remainder of the game. Multiple castings of this spell on the same target have no effect.",
  },
  {
    roll: 20,
    name: "Murderous Intent",
    school: "Magic of Khaine",
    castingNumber: 12,
    range: "Out of Game (B)",
    description:
      "If this spellcaster is on the table, its warband may add +2 to its Initiative Rolls for the purposes of determining the primary player only. This bonus stacks so, if both the wizard and the apprentice have cast this spell and are both on the table, the player may add +4 to their Initiative Rolls. The maximum possible bonus is +4. This spell counts as active on the spellcaster during the game and may be cancelled by anything that cancels spells.",
  },
];
