import type { Spell } from "./spell.interface";

export const druidcraftOfTheOldOnes: Spell[] = [
  {
    roll: 1,
    name: "Sotek's Command",
    school: "Magic of the Old Ones",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "This spell may only target an Saurian. That Saurian must make a Will Roll to resist. If the Saurian fails the Will Roll, it joins the Skink's Priest crew, and the controlling player may activate it in his next Soldier phase. A Skink Priest may not cast this spell while he already has another Saurian under control. The caster may cancel the effect of this spell at any time as a free action. The Saurian leaves the crew at the end of the game.",
  },
  {
    roll: 2,
    name: "Blessing of the Green Serpent",
    school: "Magic of the Old Ones",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "The target of this spell has its weapon coated in a potent venom. The next time this figure causes a damaging attack, either in hand-to-hand combat or by shooting, the victim of that attack counts as Poisoned. The target of this spell must be carrying an actual weapon.",
  },
  {
    roll: 3,
    name: "Call the Stampede",
    school: "Magic of the Old Ones",
    castingNumber: 8,
    range: "Area Effect",
    description:
      "At the end of every turn, the Skink Priest should roll a die. On a 10+, roll for at the Stampede Table and them roll for a edge of the board for the stampede to appear. If the roll is 17+, the Skink Priest may choose the board edge from which the Stampede appears  .",
  },
  {
    roll: 4,
    name: "Carve Tablet",
    school: "Magic of the Old Ones",
    castingNumber: 12,
    range: "Out of Game (A)",
    description:
      "The Skink Priest carves the wise words of the Slann in a Stone Plaque. The tablet must be of a spell that the Skink Priest knows. The tablet may be sold, carried by the Skink Priest, or stored in the Skink Priest's vault.",
  },
  {
    roll: 5,
    name: "Meditate on the Word",
    school: "Magic of the Old Ones",
    castingNumber: 12,
    range: "Out of Game (A)",
    description:
      "This spell allows a Skink Priest to meditate on the sacred knowledge inscribed in ancient tablets and plaques of the Old Ones, absorbing their wisdom without having to study them at length. A Skink Priest immediately gains 40 experience points for casting this spell to represent the speed with which they can gain knowledge. This experience does not count against the maximum that can be earned in one game. This spell may only be cast after a game in which the Skink Priest was not reduced to 0 Health.",
  },
  {
    roll: 6,
    name: "Edict of the Old Ones",
    school: "Magic of the Old Ones",
    castingNumber: 14,
    range: "Area Effect",
    description:
      "The Skink Priest brings forth the Autorithy of the Old Ones to change the flow of the winds of magic. The Skink Priest may pick one spell for the Edict of the Old Ones to affect. All rolls to cast that particular spell are at +3 for the rest of the game. A Skink Priest may only have one Edict of the Old Ones spell in effect at a time. Only one Edict of the Old Ones can be active for each specific target spell at one time.",
  },
  {
    roll: 7,
    name: "Scales of Tepok",
    school: "Magic of the Old Ones",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "The target receives +2 Armour for the rest of the game. This may not take a figure above Armour 14 (i.e. figures with Armour 13 go to Armour 14). Multiple castings of Scales of Tzunki on the same target have no effect.",
  },
  {
    roll: 8,
    name: "Fall of the Starspawn",
    school: "Magic of the Old Ones",
    castingNumber: 14,
    range: "Line of Sight",
    description:
      'The caster makes a +3 elemental magic shooting attack against a target within 16". This attack does +4 damage. In addition, all figures in contact with the target figure also suffer a +1 elemental magic shooting attack that does +4 damage. Any figure that suffers damage from these attacks is immediately moved 2" in a random direction.',
  },
  {
    roll: 9,
    name: "Starpawn's Aid",
    school: "Magic of the Old Ones",
    castingNumber: 12,
    range: "Line of Sight",
    description: `This spell channels the ancient power of the celestial beings that serve the Old Ones. This spell creates a Starspawn. The Skink Priest may place a starspawn anywhere within 6" and line of sight.
        This starspawn is under the control of the Skink Priest and moves during the soldier phase. Any effect that cancels magic, can cancel the control of the elemental, in which 
        case it would become an uncontrolled creature.`,
  },
  {
    roll: 10,
    name: "Chotek's Eruption",
    school: "Magic of the Old Ones",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      'This spell creates a 2" diameter, 3" high, circular, pillar of flame, within 12" of the caster. This pillar may not be placed in contact with a figure. Anytime a figure moves into contact with this circle of flame, or activates while in contact with it, it suffers an +3 elemental magic attack. The pillar blocks line of sight. At the end of each turn, roll a die. On 1–2 the flame is extinguished and should be removed from the table.',
  },
  {
    roll: 11,
    name: "Tepok's Forbiddance",
    school: "Magic of the Old Ones",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "Immediately cancels the ongoing effect of any one casting of any one spell. It cannot unsummon a creature, but it can cancel the control of a creature that is a temporary member of a warband.",
  },
  {
    roll: 12,
    name: "Sacred Marks",
    school: "Magic of the Old Ones",
    castingNumber: 12,
    range: "Out of Game(B)",
    description:
      "This spell causes one Sacred Mark of the Old Ones to appear on one member of the warband, blessed by the ancient powers. The mark glows with celestial energy, marking the bearer as favored by the Old Ones. It may not be cast on demons, undead, constructs or animals, nor can it be cast upon a Skink Priest, since he is already marked. See Sacred Marks rules for full details.",
  },
  {
    roll: 13,
    name: "Chotek's Conflagration",
    school: "Magic of the Old Ones",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      'The Skink Priest selects an enemy figure within 16" and line of sight and hurls a wave of destructive fire energy at it. The target and every figure within 1" and line of sight of the target immediately suffers a +5 elemental magic shooting attack. Roll this shooting attack separately for each figure. Treat the target figure as the origin of the attack for the purposes of determining cover or intervening terrain for all other figures suffering the attack. This spell may not target an enemy figure that is even partially obscured by another figure.',
  },
  {
    roll: 14,
    name: "Mystical Herbalism",
    school: "Magic of the Old Ones",
    castingNumber: 12,
    range: "Out of Game (B)",
    description:
      "The Skink Priest uses ancient knowledge of the  mystical plants and herbs to create one Lesser Potion of their choice that may be sold, stored in the Skink Priest's vault, or given to a member of the warband. A Skink Priest may use this spell to create a Greater Potion. First, they must declare what potion they are attempting to brew and pay the listed ingredients cost. The Skink Priest should then roll to cast Mystical Herbalism with a -4 to the Casting Roll. If successful, the potion is created and can be immediately assigned to a figure in the warband, sold, or stored in the Skink Priest's vault. If unsuccessful, the potion is not created and the money spent on ingredients is lost.",
  },
  {
    roll: 15,
    name: "Summon Marsh",
    school: "Magic of the Old Ones",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      'All ground within 3" of a target point becomes a body of deep water.',
  },
  {
    roll: 16,
    name: "Green Serpent's Darts",
    school: "Magic of the Old Ones",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "Make an immediate plus +3 poisoned shooting attack against the target figure. This is a non-magic attack.",
  },
  {
    roll: 17,
    name: "Ritual of Totem Protection",
    school: "Magic of the Old Ones",
    castingNumber: 12,
    range: "Touch",
    description:
      'Creates a circle with a 3" diameter which no demon or undead creature can enter or pass through. If something forces them into contact with the circle, they stop at its edge. A Skink Priest may only have one active circle of protection at a time, but they do not have to remain within it. The Skink Priest may cancel this spell at the end of any turn. Otherwise, roll a die at the end of every turn: on a 1–3 the spell is cancelled.',
  },
  {
    roll: 18,
    name: "Sunlight's Bolt",
    school: "Magic of the Old Ones",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "The target must make an immediate Will Roll with a Target Number equal to the Casting Roll. If it fails, it may not attack, shoot, or cast Line of Sight spells. Its Fight stat is reduced to +0 and its Move to 1. At the end of each turn, the figure may attempt another Will Roll with the same Target Number. If successful, the spell is cancelled.",
  },
  {
    roll: 19,
    name: "Wavecrash of the Sacred River",
    school: "Magic of the Old Ones",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'The target of this spell must either be in the water or within 4" of a body of water that is at least 2" in diameter. This figure suffers an immediate +8 magic attack.',
  },
  {
    roll: 20,
    name: "Lustrian's Transmutation",
    school: "Magic of the Old Ones",
    castingNumber: 10,
    range: "Out of Game",
    description:
      "The Skink Priest may attempt to cast this spell before rolling for treasure at the end of a game. If successful, the Skink Priest may roll two dice and choose which one to keep when making the first roll to determine what treasure has been found. If both dice roll the same number, however, the token is lost – experience is still gained, but no treasure is found.",
  },
];
