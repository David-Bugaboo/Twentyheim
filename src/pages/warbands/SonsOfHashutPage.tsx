import Header from "../../components/Header";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
import slugify from "slugify";
import WarbandIndex from "../../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  PowerListTitle,
} from "../../components/PageComponents";

const sonsOfHashutUnits = [
  {
    name: "Priest-Artificer",
    role: "Hero",
    stats: {
      move: 4,
      fight: "+2",
      shoot: "0",
      armour: 11,
      will: "+4",
      health: 16,
      cost: "-",
    },
    spellAffinity: {
      aligned0: ["Enchanter"],
      aligned2: ["Sigilist", "Elementalist", "Thaumaturge"],
      neutral4: ["Illusionist", "Summoner", "Soothsayer"],
      opposed6: ["Witch", "Distortionist"],
      anathema: ["Necromancer", "Spiritualist", "Chronomancer", "Fatecaster"],
    },
    abilities: [
      {
        name: "Favorite of Hashut",
        description:
          "Any figure that activates along with this figure during the Hero's phase can use the Sorcerer's Will stat instead of its own.",
      },
      {
        name: "Master Spellcaster",
        description:
          "The Sorcerer is a spellcaster of the enchantment school. He starts with 8 spells.",
      },
      {
        name: "Sorcerer-Artificer",
        description:
          'Whenever the Sorcerer animates or takes control of a construct, it gains Demon, Elemental Resistance(3), and gains a +2 Elemental Shooting attack with 8" range and +2 Damage. This attack must be reloaded like a crossbow or firearm.',
      },
      {
        name: "Equipment",
        description:
          "The Hashut Sorcerer may equip and start with hand weapons, two handed weapons, daggers, crossbows, hand crossbows and staffs.",
      },
    ],
  },
  {
    name: "Bull Centaur",
    role: "Champion",
    stats: {
      move: 6,
      fight: "+4",
      shoot: "+1",
      armour: 11,
      will: "+4",
      health: 20,
      cost: "-",
    },
    abilities: [
      {
        name: "Charger",
        description:
          "The equine build of the Bull Centaur makes his charges as devastating as a battering ram. He has Horns. However, he cannot climb, and rough terrain costs 3 move for 1 inch of movement instead of 2.",
      },
      {
        name: "Liutenant of Hatred",
        description:
          "The Bull Centaur may choose powers from the Doctrines of Hashut list. He starts with 5 powers. One of the powers is his signature doctrine, and has an activation number of 5. The others have an activation power of 8.",
      },
      {
        name: "Equipment",
        description:
          "The Bull Centaur may equip and start with hand weapons, two handed weapons, daggers, crossbows, hand crossbows, Light armour and Heavy armour.",
      },
    ],
  },
  {
    name: "Forge Guards",
    stats: {
      move: 4,
      fight: "+3",
      shoot: "0",
      armour: 14,
      will: "0",
      health: 14,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon, Shield, Heavy armour.",
      },
    ],
  },
  {
    name: "Hobgoblin",
    stats: {
      move: 7,
      fight: "0",
      shoot: "0",
      armour: 9,
      will: "-2",
      health: 8,
      cost: "free",
    },
    abilities: [
      {
        name: "Coward",
        description:
          "Hobgoblins are naturally cowardly creatures that are forced to fight by their Chaos Dwarf masters. As a result, they take damage easily and at the slightest opportunity try to escape from their captors. When rolling on the Soldier Survival Table, any result of less than 15 results in a dead or fleeing hobgoblin. A result of 16-18 means they will skip a game. On a 19-20 they make a full recovery.",
      },
      {
        name: "Equipment",
        description: "Pistol, Hand Weapon, Light armour.",
      },
    ],
  },
  {
    name: "Gaoler",
    stats: {
      move: 4,
      fight: "+3",
      shoot: "0",
      armour: 13,
      will: "1",
      health: 14,
      cost: "80gc",
    },
    abilities: [
      {
        name: "Manhunters",
        description: "Gaolers have Fear.",
      },
      {
        name: "Equipment",
        description: "Two-Handed Weapon, Heavy armour.",
      },
    ],
  },
  {
    name: "Hordebreaker",
    role: "Specialist",
    stats: {
      move: 4,
      fight: "2",
      shoot: "2",
      armour: 13,
      will: "+1",
      health: 12,
      cost: "80gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Blunderbuss, Hand Weapon, Heavy armour.",
      },
    ],
  },
  {
    name: "Foundry Master",
    role: "Specialist",
    stats: {
      move: 4,
      fight: "1",
      shoot: "2",
      armour: 12,
      will: "+1",
      health: 12,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Hellsmith",
        description:
          "A Priest-Artificer that has a Foundry Master in their warband gains a +1 to one attempt to cast Embed Enchantment or Animate Construct between each game. This bonus can only be gained once, irrespective on how many Foundry masters the warband have.",
      },
      {
        name: "Equipment",
        description: "Pistol, Hand Weapon, Light armour.",
      },
    ],
  },
  {
    name: "Barghests",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "2",
      shoot: "0",
      armour: 13,
      will: "+1",
      health: 14,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Hellforged Hound",
        description:
          "A Barghest has the Demon and Construct traits, cannot pick up wyrdstone shards or gain xp.",
      },
      {
        name: "Infernal Beacon",
        description:
          "Barghests have the Demon Portal and Construct Spikes construct upgrades by default.",
      },
      {
        name: "Equipment",
        description: "None. Hellforged claws and fangs.",
      },
    ],
  },
];

const doctrinesOfHashut = [
  {
    name: "Doctrine of Earthshattering",
    when: "At any point during the Bull Centaur activation",
    effect:
      'As an action, the bull centaur stomps the ground violently. Every figure within 2" of the Bull Centaur takes a +4 Attack. Each creature hit gains a Stun Token. The area affected by the power becomes rough terrain.',
  },
  {
    name: "Doctrine of the Whirling Charge",
    when: "Whenever the Bull Centaur moves into combat with more than one figure.",
    effect:
      "If the centaur fights, it fights every creature he moves into combat with. The centaur and enemy figures may not choose to stay into combat after winning the fight.",
  },
  {
    name: "Doctrine of the Violent Trampling",
    when: "At the start of the Bull Centaur move action.",
    effect:
      "The bull centaur must move his entire movement this turn. He may move over terrain and figures, but cannot end his movement through a piece of terrain or a creature, and must move in a straight line. He fights with every figure he passes through, including allied figures, dealing an extra +2 damage in each fight he wins.",
  },
  {
    name: "Doctrine of the Comet",
    when: "At any point during the Bull Centaur activation.",
    effect:
      "The Bull Centaur can use an action to make a 'Leap' move instead of a normal move. In a Leap, the Bull Centaur may move up to his full movement allowance in a straight line, in any direction (including straight upwards), provided that line is free of obstacles. Thus, it is possible to jump over or onto terrain and other obstacles, provided the angle is right. If this move ends with the Bull Centaur in the air, immediately move it back down to the table and take double the appropriate falling damage. If the Bull Centaur wants to make a second movement action in the turn, it is at half move as normal. Alternatively, a Bull Centaur may combine two actions and utilize this action to make one Leap of up to 1.5 times his Move. When the Bull Centaur finishes this movement, every creature within 3\" of him takes a +5 Attack. Any creature hit by this attack gains a Stun Token.",
  },
  {
    name: "Doctrine of the Foe Splitting",
    when: "Whenever the Bull Centaur wins a fight with an unmodified roll of 18, 19 or 20.",
    effect: "That hit is a critical hit. The target figure gets a Stun Token.",
  },
  {
    name: "Doctrine of the Shattering",
    when: "Whenever the Bull Centaur wins a fight and deals at least 1 damage.",
    effect:
      "That hit deals an extra 3 damage on top of any damage it would deal.",
  },
  {
    name: "Doctrine of the Ebonskin",
    when: "Whenever the Bull Centaur takes at least 1 damage.",
    effect:
      "That damage is reduced by 4 points. If the damage is reduced to 0, any additional effects from the attack are negated.",
  },
  {
    name: "Doctrine of the Steel Sundering",
    when: "Whenever the Bull Centaur wins a fight and deals at least 1 damage.",
    effect:
      "The centaur deals no damage, but destroys any armour the enemy figure is using. If the figure is using Heavy armour, its armour is reduced by 2. If it's using light armour, its armour is reduced by 1, until the end of the game.",
  },
  {
    name: "Doctrine of the Blade Eater",
    when: "Whenever an enemy figure scores a critical hit against the Bull Centaur.",
    effect: "The hit is not a critical hit, and deals damage as normal.",
  },
  {
    name: "Doctrine of the Vulcan Soul",
    when: "Whenever the Bull Centaur has made a Fight Stat Roll (Any Fight Roll with a Target Number).",
    effect:
      "Add +5 to the Bull Centaur's roll. Alternatively, a Heritor may utilize this ability whenever he wins a combat to inflict +1 damage.",
  },
  {
    name: "Doctrine of the Mountainbreaker",
    when: "Whenever the Bull Centaur wins a fight and causes at least 1 damage.",
    effect:
      'This ability can be utilized any time the Heritor wins a fight in hand-to-hand combat. The Heritor does +1 damage and, additionally, may choose to push back his opponent up to 4" instead of the normal 1". This push back may move the figure through or over terrain or over other figures. It may also move the figure into combat with another figure.',
  },
  {
    name: "Doctrine of the Unquenchable Fire",
    when: "Whenever the Bull Centaur is reduced to 0 Health.",
    effect: "The Bull Centaur is reduced to 1 health instead.",
  },
];

function SonsOfHashutPage() {
  const units = sonsOfHashutUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const doctrines = doctrinesOfHashut.map((doctrine) => ({
    id: slugify(doctrine.name, { lower: true }),
    label: doctrine.name,
    type: "Doctrine",
  }));

  const sections = [...units, ...doctrines];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Sons of Hashut" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {sonsOfHashutUnits.map((unit, index) => (
              <div key={index} id={slugify(unit.name, { lower: true })}>
                <UnitCard
                  name={unit.name}
                  role={unit.role}
                  stats={unit.stats}
                  abilities={unit.abilities}
                  {...(unit.spellAffinity && { spellAffinity: unit.spellAffinity })}
                />
              </div>
            ))}
          </div>

          <div id="doctrines">
            <PowerListTitle>Doctrines of Hashut</PowerListTitle>
            {doctrinesOfHashut.map((doctrine, index) => (
              <div key={index} id={slugify(doctrine.name, { lower: true })}>
                <PowerCard
                  name={doctrine.name}
                  when={doctrine.when}
                  effect={doctrine.effect}
                />
              </div>
            ))}
          </div>
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
}

export default SonsOfHashutPage;
