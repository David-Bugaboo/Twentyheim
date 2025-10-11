import type { Spell } from "./spell.interface";



export const chaosRituals: Spell[] = [
  {
    roll:1,
    name: "Bimd Daemon",
    school: "Chaos Rituals",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "The target figure with the demon trait must make an immediate Will Roll with a Target Number equal to the Casting Roll. If it fails, it becomes a temporary member of the spellcaster's warband. This control lasts for the rest of the game or until the spell is cancelled. The spellcaster may spend an action to cancel this spell. A spellcaster may only control one daemon at a time.",
  },
  {
    roll:2,
    name: "Tear the Veil",
    school: "Chaos Rituals",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      'The spellcaster creates a small tear in the fabric of the universe. This rift is painful to humans and creatures, but will anihilate the ephemeral existence of dragons. The spellcaster selects a target point. All figures within 2" of that point must make a Will Roll with a Target Number equal to the Casting Roll or suffer 2 points of damage. Daemons that fail the Will Roll take damage equal to the Casting Roll.',
  },
  {
    roll:3,
    name: "Dark Wings of Skarbrand",
    school: "Chaos Rituals",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'This spell may only be cast on a member of the spellcaster\'s warband. Immediately move the target figure up to 10" in any direction, including vertically. This move must either be in a straight line or an arc. It cannot curve around corners. If this move leaves the figure above the ground, it immediately falls, taking damage as normal. If the target is carrying treasure, this move is reduced to 5". This move may not take a figure off the table or into combat. The target of this spell may take no other actions this turn, though it may have taken actions previously.',
  },
  {
    roll:4,
    name: "Rite of Possession",
    school: "Chaos Rituals",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "This spell may only be cast on a permanent or temporary member of the spellcaster's own warband, except the wizard, apprentice, or daemons. The target is possessed by a daemon and gains +2 Fight, +1 Armour, and -2 Will and counts as a daemon (i.e. it will be affected by Banish, Control Daemon, Circle of Protection, etc.). This figure may not be part of a group activation. If removed from the game for any reason (such as being hit by a Banish spell), check for the character's survival as normal. A spellcaster may only have one Daemonic Possession spell active at a time.",
  },
  {
    roll:5,
    name: "Summon Lesser Daemon",
    school: "Chaos Rituals",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "The spellcaster places an Swarm of Nurglings or a Pink Horror on the table anywhere within the spellcaster's line of sight, but no closer than 3\" to any other figure. The summoned figure follows the normal rules for uncontrolled creatures and will activate in the next Creature phase. If the spellcaster casts this spell a second time, the first summoned figure immediately vanishes.",
  },
  {
    roll:6,
    name: "Traverse the Chaos Realm",
    school: "Chaos Rituals",
    castingNumber: 10,
    range: "Self Only",
    description:
      "Although the spellcaster remains in the same physical location, they move briefly through the Realm of Chaos. For the rest of this turn, they can ignore all terrain when moving, thus walking through walls or across chasms. They may not be the target of any shooting attacks or spells. The spellcaster will never be considered in combat during the turn, nor can they be attacked by any figure. They may not, however, pick up treasure or in any way affect other figures or terrain on the table. If they are carrying treasure, they drop it. Movin through the realm of chaos fractures the sanity of the spellcaster.If a spellcaster attempts to cast this spell in a second consecutive turn, they suffer a -5 modifier to their Casting Roll, -10 if they attempt it three turns in a row, and -15 on the fourth turn and beyond.",
  },
  {
    roll:7,
    name: "Swarm of Nurglings",
    school: "Chaos Rituals",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      'The target figure is attacked by a swarm of nurglings that try to devour it alive. The swarm of nurglings has a 1" radius centred on, and moving with, the target figure. It affects all figures, including the target figure, fully or partially within this radius. While being pestered by the nurglings, a figure has -4 Fight and -4 Shoot (to a minimum of +0) and -2 to Casting Rolls. After this figure activates each turn, it may make a Will Roll with a Target Number equal to the Casting Roll. If successful, the spell is cancelled. Other figures within the radius may simply move away to escape. A figure may only ever be affected by one Swarm of Nurglings spell at a time, whether as a target or by virtue of being within the 1" radius. Large creatures, undead, and constructs are immune to this spell.',
  },
  {
    roll:8,
    name: "Daemonic Summoning",
    school: "Chaos Rituals",
    castingNumber: 12,
    range: "Touch",
    description:
      'Immediately place a daemon on the table within 1" of the spellcaster. It may not be placed straight into combat. This daemon is considered to be under the effects of a Dominate Daemon spell by the same spellcaster, and thus this spell may not be cast if the spellcaster is already controlling a daemon. The type of daemon summoned depends on the amount by which the spellcaster succeeded on their Casting Roll: 0–5 minor demon, 6–12 daemon, 13+ major daemon. If a spellcaster rolls a 1 while attempting to cast this spell, they summon an uncontrolled daemon and must place this daemon in combat with the spellcaster. Roll a die to determine the type of daemon: 1–10 minor daemon, 11–17 daemon, 18+ major daemon. A spellcaster cannot empower a roll of 1 when casting this spell but there is otherwise no limit on empowering this spell. It may be empowered above 18.',
  },

  // Chaos Rituals (CN +2)
  {
    roll:9,
    name: "Wreathed in Distortion",
    school: "Chaos Rituals",
    castingNumber: 14,
    range: "Area Effect",
    description:
      "The spellcaster weaves a web of dessecreated reality around himself, making project trajetories go awry without the rules of physics and geometry. All bow and crossbow attacks are made with -1 Shoot for the rest of the game. This spell may be cast multiple times (and by multiple spellcasters), with each additional casting increasing the penalty by a further -1, up to a maximum of -5.",
  },
  {
    roll:10,
    name: "Hellfire Blade",
    school: "Chaos Rituals",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "This spell is cast upon a weapon, infusing it with corrupting Chaos energy. The next time the figure wielding this weapon wins a round of combat and does at least 1 point of damage, this weapon inflicts an additional 5 points of elemental magic damage. If cast on a normal weapon, which is then used against a creature that is Immune to Normal Weapons, this weapon will only deal the 5 points of elemental magic damage. If cast on a bow or crossbow the spell only applies to the next attack.",
  },
  {
    roll:11,
    name: "Hand of Belakor",
    school: "Chaos Rituals",
    castingNumber: 14,
    range: "Line of Sight",
    description:
      'The spellcaster selects an enemy figure within 16" and line of sight and hurls a ball of destructive Chaos energy at it. The target and every figure within 1" and line of sight of the target immediately suffers a +5 elemental magic shooting attack. Roll this shooting attack separately for each figure. Treat the target figure as the origin of the attack for the purposes of determining cover or intervening terrain for all other figures suffering the attack. This spell may not target an enemy figure that is even partially obscured by another figure.',
  },
  {
    roll:12,
    name: "Storm of Ruin",
    school: "Chaos Rituals",
    castingNumber: 14,
    range: "Area Effect",
    description:
      'The spellcaster brings forth the baleful energies from the realm of Chaos, unleashing a storm of destruction upon the enemy. The spellcaster makes a +0 elemental magic shooting attack against every enemy figure (either from an opposing warband or uncontrolled creature) within 12" and line of sight. This may include enemy figures in combat, although the normal rules for shooting into combat are followed in this case.',
  },
  {
    roll:13,
    name: "Vortex of Annihilation",
    school: "Chaos Rituals",
    castingNumber: 14,
    range: "Area Effect",
    description:
      'A swirling vortex of raw Chaos energy erupts around the spellcaster. Every figure within 3" of the spellcaster (but not counting the spellcaster) suffers a +5 elemental magic attack.',
  },
  {
    roll:14,
    name: "Daemonic Protector",
    school: "Chaos Rituals",
    castingNumber: 12,
    range: "Self Only",
    description:
      "The Spellcaster summons a minor demon to protect them from harm. Once 3 points have been absorbed the spell is cancelled. A spellcaster may only have one Daemonic Protector active at any time.",
  },
  {
    roll:15,
    name: "Doombolt",
    school: "Chaos Rituals",
    castingNumber: 14,
    range: "Line of Sight",
    description:
      'The spellcaster makes a +7 elemental magic shooting attack against a target figure within 16" and line of sight. A soldier reduced to 0 health by this attack is dead, with no rolls on the Soldier Survival Table.',
  },
  {
    roll:16,
    name: "Dread Fort Wall",
    school: "Chaos Rituals",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      'This spell creates a 6"-long, 3"-high wall of pure jagged dark steel, part of which must be within 10" and line of sight of the spellcaster. This wall can be climbed as normal. If a creature starts it\'s activation within 1" of the wall, it takes 2 damage. At the end of each turn, after the turn in which the spell was cast, roll a die, on a 1–4 the wall vanishes.',
  },

  // Chaos Rituals (CN +2)
  {
    roll:17,
    name: "Minor Possession",
    school: "Chaos Rituals",
    castingNumber: 12,
    range: "Out of Game (B)",
    description:
      "The spellcaster invites a minor daemon to possess him and empower his body. A spellcaster possessed in this way gains +2 Health (write as a split stat). If the spellcaster is ever reduced to 1 Health or less, that minor daemon is banished from his body. At the start of the next game, the spellcaster reverts to their normal Health, unless another invite Possession spell is successfully cast.",
  },

  {
    roll:18,
    name: "Distill Warp Essence",
    school: "Chaos Rituals",
    castingNumber: 14,
    range: "Out of Game (B)",
    description:
      "The spellcaster distills raw Chaos energy into a usable potion. The spellcaster creates one Lesser Potion of their choice that may be sold, stored in the wizard's vault, or given to a member of the warband. A wizard (and only a wizard) may use this spell to create a Greater Potion. First, they must declare what potion they are attempting to brew and pay the listed ingredients cost. The wizard should then roll to cast Distill Warp Essence with a -4 to the Casting Roll. If successful, the potion is created and can be immediately assigned to a figure in the warband, sold, or stored in the wizard's vault. If unsuccessful, the potion is not created and the money spent on ingredients is lost.",
  },
  {
    roll:19,
    name: "Mind Shatter",
    school: "Chaos Rituals",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "The spellcaster uses the Dhar to destroy his enemies sanity. At the end of each turn, the target may make a Will Roll with the Target Number equal to the Casting Roll (at -2, of course). If successful, this spell is cancelled. Mark of Chaos cannot be cast on a figure already suffering the effects of a Mind Shatter spell.",
  },
  {
    roll:20,
    name: "Veil of Slaneesh",
    school: "Chaos Rituals",
    castingNumber: 10,
    range: "Self Only",
    description:
      "This spell causes anyone who looks on the spellcaster to see a paragon of beauty. Any member of an opposing warband must make a Will Roll with a Target Number equal to the Casting Roll if they wish to do any of the following: move into combat with the spellcaster, make a shooting attack that could potentially hit the spellcaster (including shooting attacks generated by spells), or cast any spell that targets the spellcaster. Spellcasters may empower this Will Roll in the same way they would to resist a spell. A figure may only attempt such a Will Roll once per turn.",
  },
];
