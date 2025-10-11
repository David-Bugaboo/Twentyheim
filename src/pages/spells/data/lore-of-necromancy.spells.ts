import type { Spell } from "./spell.interface";

export const loreOfNecromancy: Spell[] = [
  {
    roll: 1,
    name: "Animate Skull",
    school: "Lore of Necromancy",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      'The necromancer fills a skull with magic malice and throws it at an opponent. Place one animated skull within 6" of the necromancer. It can be placed directly into combat. This skull is an uncontrolled creature. The necromancer may not cast this spell again until this creature is removed from the table, but may spend an action to cancel the spell, in which case the animated skull is immediately removed from the table.',
  },
  {
    roll: 2,
    name: "Raise Zombie",
    school: "Lore of Necromancy",
    castingNumber: 10,
    range: "Out of Game (B) OR Touch",
    description:
      "The necromancer adds one zombie to their warband as a temporary member. If the spell is cast before the game, the zombie can be deployed normally. If it is cast during a game, the zombie appears in base contact with the necromancer. A warband may only have one raised zombie at any one time. If the zombie is killed or exits the table, Raise Zombie can be cast again to create another.",
  },
  {
    roll: 3,
    name: "Grave Grasp",
    school: "Lore of Necromancy",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "A skeletal hand reaches out of the ground and grabs the target's ankle. The figure may not take any move actions until it escapes. Any form of magic movement, except the Leap spell, allows a figure to escape the hand; otherwise, the only way to escape is to fight the hand, which has Fight +0, Health 1. If the hand takes one point of damage, it vanishes, and the target is free. Other figures in base contact may attack the hand or give a support bonus. If the hand wins the fight, it does damage as normal. This spell may only be cast against a target that is standing on the ground. Large creatures are unaffected by this spell. The maximum range for this spell is 18\".",
  },
  {
    roll: 4,
    name: "Soul Leech",
    school: "Lore of Necromancy",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "The target must make an immediate Will Roll with a Target Number equal to the Casting Roll. If failed, the target immediately loses 3 Health and the necromancer regains 3 Health. The necromancer gains 3 Health, even if the target had less Health than that remaining. This may not take the necromancer above their starting Health. This spell has no effect on undead or constructs. A necromancer may target a member of their own warband – if they do, however, the target immediately (and permanently) leaves the warband and is treated as an uncontrolled creature for the rest of the game.",
  },
  {
    roll: 5,
    name: "Spines of Nagash",
    school: "Lore of Necromancy",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      'This spell fires a small, sharp shard of bone. The necromancer makes a +5 shooting attack against any figure within line of sight and 12". This does not count as a magic attack.',
  },
  {
    roll: 6,
    name: "Rot Magic",
    school: "Lore of Necromancy",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "Casting this spell causes the necromancer to immediately take 1 point of damage. When this spell is cast, it cancels the effects of a single casting of any one spell currently in play. This spell cannot unsummon a creature, but it can cancel the control of a creature.",
  },
  {
    roll: 7,
    name: "Nagash's Command",
    school: "Lore of Necromancy",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "The target undead creature must make an immediate Will Roll with a Target Number equal to the Casting Roll. If the roll fails, the undead creature becomes a temporary member of the necromancer's warband. This control lasts for the rest of the game or until the spell is cancelled. The necromancer may spend an action to cancel this spell. A necromancer may only control one undead creature at a time.",
  },
  {
    roll: 8,
    name: "Finger of Death",
    school: "Lore of Necromancy",
    castingNumber: 18,
    range: "Line of Sight",
    description:
      'This spell targets a figure within 8". The target must make a Will Roll with a Target Number equal to the Casting Roll or be immediately reduced to 0 Health. All figures may empower their Will Roll to resist this spell, even non-spellcasters. The necromancer immediately loses 1 Health upon attempting this spell (even if it is cast successfully), in addition to any loss incurred by failure or empowerment. This spell has no effect on undead or constructs.',
  },
  {
    roll: 9,
    name: "Fleshcrafted Bridge",
    school: "Lore of Necromancy",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      'The necromancer uses necromantic flesh and bone to create a temporary bridge, ramp, or staircase. Place a bridge 6" long and 2" wide anywhere that is completely in the line of sight of the necromancer. The bridge has no appreciable thickness and is essentially two-dimensional. The ends of this bridge do not have to be on the same horizontal plane, nor do the ends of the bridge need to be anchored on terrain, they may float in the air. Figures may move along this bridge at their normal movement rate, even when essentially climbing. Each necromancer may only have one bridge in play at any time. Whenever the necromancer activates, they may cancel this spell as a free action. Otherwise roll a die at the end of every turn: on a 1–2 the bridge vanishes. Figures on the bridge when it vanishes will fall to the ground.',
  },
  {
    roll: 10,
    name: "Call of the Nightwing",
    school: "Lore of Necromancy",
    castingNumber: 10,
    range: "Area Effect",
    description:
      "The Necromancer may immediately place a sylvanian giant bat adjacent to the table edge, anywhere within the warband's deployment zone for that game. This bat always activates in the soldier phase. It receives only one action the turn it arrives but has the normal two afterwards. The bat is under the necromancer's control, except if the spell is cancelled by some effect. A necromancer may only have one controlled bat on the table at any time.",
  },
  {
    roll: 11,
    name: "Exhume of the Wicked",
    school: "Lore of Necromancy",
    castingNumber: 12,
    range: "Area Effect",
    description:
      "The Necromancer summons a Newborn Ghoul to temporarily join their warband. This ghoul may be placed on the table anywhere the Necromancer's warband was allowed to deploy for the scenario, as long as it is no closer than 3\" to an enemy figure. The caster may not cast this spell again until the ghoul either leaves the table or ceases to be part of their warband. The ghoul may pick up and carry treasure but can never have or use items.",
  },
  {
    roll: 12,
    name: "Vampiric Gaze",
    school: "Lore of Necromancy",
    castingNumber: 14,
    range: "Line of Sight",
    description: `This spell may be cast while the caster is in combat, otherwise it has a maximum range of 2". Select a target figure, that figure must make a Will Roll to resist. If the Will Roll fails, the target temporarily joins
    the spellcaster’s warband, activating as normal. After the figure activates each turn, it must make another Will Roll with a Target Number equal to the Casting Roll. If successful, the spell is cancelled
     and the figure returns to its normal allegiance. A figure under Vampiric Gaze cannot purposely take any action that causes it immediate damage but can be moved into combat and may attack an enemy figure. A figure under Vampiric Gazer 
     is not allowed to move off the table. The spell is immediately cancelled if the target is ever out of line of sight or more than 12" away from the caster.`,
  },
  {
    roll: 13,
    name: "Speak with the Dead",
    school: "Lore of Necromancy",
    castingNumber: 12,
    range: "Out of Game (A)",
    description:
      "The spellcaster communes with the spirits of the dead to gain forbidden knowledge. The spellcaster adds +4 to his next attempt to cast an Out of Game spell, provided that it is before the next game. After successfully casting this spell, the necromancer may immediately attempt to cast one Out of Game (B) spell.",
  },
  {
    roll: 14,
    name: "Nighthaunter",
    school: "Lore of Necromancy",
    castingNumber: 10,
    range: "Self Only",
    description:
      "The caster fuses his soul and his body, becoming a gheist. He gains the flying trait. While in gheist form, the caster may move through any space, no matter how small. While in gheist form the caster may not pick up or carry treasure, and any treasure being carried is dropped. The caster may not cast spells or use any items, nor may it attack or make a shooting attack. The caster is immune to all forms of non-magic damage. Other figures can move into combat with the caster and attack. However, no figure may force combat against the caster. If in combat, the caster may move out of combat freely. The caster may end this spell as a free action at any point during its activation or at the end of a turn.",
  },
  {
    roll: 15,
    name: "Nighthaunter's Call",
    school: "Lore of Necromancy",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "The spellcaster may place a Nighthaunter on the table anywhere within line of sight. After the Nighthaunter is placed, roll a die and immediately move the wraith that many inches in a random direction. If this would take the Nighthaunter off the board, then it is lost and is out of the game. Otherwise, it activates in the next creature phase as normal. This Nighthaunter is an uncontrolled creature.",
  },
  {
    roll: 16,
    name: "Nighthaunter Possession",
    school: "Lore of Necromancy",
    castingNumber: 8,
    range: "Line of Sight",
    description:
      "This spell may be cast on a construct that is not immune to Control Construct or a non-ethereal undead that is not immune to Control Undead. A spirit takes possession of the construct or undead. That figure immediately becomes an uncontrolled creature. If it is carrying treasure, it immediately drops it. The target creature may make a Will roll with a Target Number of 20 to resist. It may attempt this roll at the end of each of its activations. The inhabiting creature is susceptible to the Command Ethereal spell, but not Control Undead.",
  },
  {
    roll: 17,
    name: "Dreadful Bone Wall",
    school: "Lore of Necromancy",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      'This spell creates a 6"-long, 3"-high wall of jagged bones and skulls, part of which must be within 10" and line of sight of the necromancer. This wall can be climbed as normal. Any creature that starts its activation within 1" of the wall must make a Will Roll against TN 12 or take 2 points of damage from the dreadful aura. At the end of each turn, after the turn in which the spell was cast, roll a die, on a 1–4 the wall vanishes.',
  },
  {
    roll: 18,
    name: "Rigor Mortis",
    school: "Lore of Necromancy",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "The target figure must make an immediate Will Roll with a Target Number equal to the Casting Roll. If it fails, it receives no actions in its next activation. Furthermore, the figure suffers -3 Fight (to a minimum of +0) and may not have Leap cast upon it until after it makes its next move action. Large creatures receive +8 to their Will Roll to resist this spell.",
  },
  {
    roll: 19,
    name: "Spirit of Rust",
    school: "Lore of Necromancy",
    castingNumber: 12,
    range: "Line of Sight",
    description:
      "The necromancer selects a target's weapon and summons a spirit of rust and decay to possess it, causing it to decay and fall apart, rendering it useless for the rest of the game. This spell has no effect on magic weapons (even those only temporarily enchanted). This spell has no effect on creatures (unless they are specifically identified as being equipped with a weapon from the General Arms and Armour List).",
  },
  {
    roll: 20,
    name: "Putrify Foundations",
    school: "Lore of Necromancy",
    castingNumber: 10,
    range: "Line of Sight",
    description:
      "This spell can only target inanimate structures such as buildings and walls. The necromancer rapidly speeds up decay and rot in a small area of the structure, causing it to collapse. This can create a doorway-sized hole through any wall, which should be indicated on the table somehow. The spell can also be used to collapse a section of floor beneath a figure standing on a level above the ground. In this case, the figure about to be affected must pass a Move Roll (TN22) or fall to the next level down and taking damage appropriately. If this spell is cast on a wall created by the Wall spell, the wall is completely destroyed. If it is cast on terrain holding a Wizard Eye, the Wizard Eye is cancelled.",
  },
];
