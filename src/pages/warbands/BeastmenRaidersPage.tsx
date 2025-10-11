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

const beastmenUnits = [
  {
    name: "Beastman Chieftain",
    role: "Hero",
    stats: {
      move: 7,
      fight: "+4",
      shoot: "0",
      armour: 10,
      will: "+5",
      health: 14,
      cost: "-",
    },
    abilities: [
      {
        name: "Lord of the Pack",
        description:
          "Beastmen chieftains do not have the same inspiring disposition of other leaders. However, figures activating alongside him in the Hero's phase activate as if they had Pack Hunter. He is always considered the Pack Leader.",
      },
      {
        name: "Blessed by the Beast Blood",
        description:
          "Beastmen Chieftains may choose powers of the Gifts of Beastblood list. He starts with 5 powers. One of these powers is his signature Gift and has an activation number of 3. The others have an activation number of 5.",
      },
      {
        name: "Violent Warmonger",
        description: "Beastmen Chieftains have Strong and Fear.",
      },
      {
        name: "Equipment",
        description:
          "Beastmen chieftains may equip and start with: Two Handed Weapons, Hand Weapons, Shields, Heavy armour, Light armour.",
      },
    ],
  },
  {
    name: "Beastman Sorcerer",
    role: "Champion",
    stats: {
      move: 7,
      fight: "+1",
      shoot: "0",
      armour: 10,
      will: "+5",
      health: 12,
      cost: "-",
    },
    spellAffinity: {
      aligned0: ["Summoner"],
      aligned2: ["Elementalist", "Distortionist", "Illusionist", "Witch"],
      neutral4: ["Necromancer", "Chronomancer"],
      opposed6: ["Sigilist", "Soothsayer", "Enchanter"],
      anathema: ["Thaumaturge", "Astromancer", "Sonancer", "Fatecaster"],
    },
    abilities: [
      {
        name: "Tribal Sorcerer",
        description:
          "The Beastman Sorcerer is a spellcaster of the Summoner School. He may start with 8 spells from that school and cast them at -2.",
      },
      {
        name: "Pact Broker",
        description:
          "The Beastmen Sorcerer made vile pacts to gain his power. He starts the game with the same Pact Broker ability as the Magister of Chaos, and may choose a Pact Boon and Pact Sacrifice. However, unlike the Chaos Magister, he doesn't gain additional Pacts at later levels.",
      },
      {
        name: "Equipment",
        description:
          "Beastmen sorcerers may equip and start with: Two Handed Weapons, Hand Weapons, Shields, Heavy armour, Light armour, Staffs.",
      },
    ],
  },
  {
    name: "Ungor",
    stats: {
      move: 7,
      fight: "2",
      shoot: "0",
      armour: 10,
      will: "-1",
      health: 8,
      cost: "free",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon.",
      },
    ],
  },
  {
    name: "Ungor Spearthrower",
    stats: {
      move: 7,
      fight: "0",
      shoot: "0",
      armour: 10,
      will: "0",
      health: 8,
      cost: "25gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Javelin.",
      },
    ],
  },
  {
    name: "Gor",
    stats: {
      move: 7,
      fight: "+3",
      shoot: "0",
      armour: 12,
      will: "-1",
      health: 10,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon, Shield, Light armour.",
      },
    ],
  },
  {
    name: "Warhounds of Chaos",
    stats: {
      move: 8,
      fight: "+1",
      shoot: "0",
      armour: 10,
      will: "-2",
      health: 8,
      cost: "10gc",
    },
    abilities: [
      {
        name: "Vicious Beast",
        description: "Warhounds have Animal.",
      },
      {
        name: "Equipment",
        description: "Fangs, Horns and Violence!",
      },
    ],
  },
  {
    name: "Bestigor",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "+4",
      shoot: "0",
      armour: 12,
      will: "-1",
      health: 12,
      cost: "125gc",
    },
    abilities: [
      {
        name: "Horned Warmonger",
        description: "The Bestigor has Horns.",
      },
      {
        name: "Equipment",
        description: "Two Handed Weapon, Heavy armour.",
      },
    ],
  },
  {
    name: "Minotaur",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "+4",
      shoot: "0",
      armour: 12,
      will: "+5",
      health: 18,
      cost: "250gc",
    },
    abilities: [
      {
        name: "Bovine Monstrosity",
        description: "The Minotaur has Large, Strong, Fear and Horns.",
      },
      {
        name: "Keen Senses",
        description: "The Minotaur has Truesight.",
      },
      {
        name: "Equipment",
        description: "Two Handed Weapon.",
      },
    ],
  },
];

const giftsOfBeastblood = [
  {
    name: "Gift of Possessed Beast",
    when: "At any point during the Beastman Chieftain activation",
    effect:
      "Choose one Demonic Attribute. You gain that trait until the end of the turn. A successfully  banish demon spell ends this effect prematurely.",
  },
  {
    name: "Gift of the Bloodcurling Howl",
    when: "At any point during the Beastman Chieftain activation.",
    effect:
      'Every figure within 3" of the Beastman Chieftain must roll a Will check against this power activation roll. Any figure that fails this test gains a Stun Token. Animals that fail this test lose their next activation.',
  },
  {
    name: "Gift of the Ironfur",
    when: "Whenever the Beastmen Chieftain loses a Fight or is hit by a Shooting Attack.",
    effect:
      "Reduce any damage that would be taken by 4. If the damage is reduced to 0, do not apply any of the attack special effects.",
  },
  {
    name: "Gift of the Maneater",
    when: "Whenever the Beastmen Chieftain reduces an enemy creature to 0 health.",
    effect:
      "The Beastmen Chieftain gains 5 health, or 10 health if it reduced a creature with Large to 0 health.",
  },
  {
    name: "Gift of the Infernal Hooves",
    when: "Whenever the Beastman Chieftain wins a fight in hand-to-hand combat.",
    effect: "The Chieftain deals +3 damage in addition to normal damage.",
  },
  {
    name: "Gift of the Beast's Intuition",
    when: "At the start of any turn, before rolling Initiative.",
    effect:
      "The Beastman Chieftain's warband automatically wins Initiative this turn. If multiple figures use similar powers, the highest activation roll takes priority.",
  },
  {
    name: "Gift of the Two Headed Monster",
    when: "During the Beastman Chieftain's activation.",
    effect:
      "The Chieftain gains one extra action this turn. This extra action cannot be a movement action.",
  },
  {
    name: "Gift of the Beastmind",
    when: "After the Beastman Chieftain makes a Will Roll.",
    effect: "Add +5 to that Will Roll.",
  },
  {
    name: "Gift of the Beast Within",
    when: "Once per game, at any point during the Chieftain's activation.",
    effect:
      "The Beastman succumbs to pure daemonic rage. For the rest of the turn, he gains +2 Fight, +2 Move, and ignores all modifiers from being outnumbered and may consume Stun Tokens without spending an action. However, he must always move toward and attack the nearest enemy if possible, and if he doesn't finish the turn in combat, he takes 8 damage.",
  },
  {
    name: "Gift of the Ramming Monster",
    when: "At the start of a Beastmen Chieftain activation.",
    effect:
      "The beastmen gains +2 Move during his next movement this turn, and may not be forced into combat during it. Additionally, if he enters combat with a creature, he gains Horns during his first attack after entering combat only.",
  },
  {
    name: "Gift of the Abyssal Hunger",
    when: "At any point the Beast Chieftain loses a fight.",
    effect:
      "The Beastmen causes damage even losing the fight. It still takes damage as normal.",
  },
  {
    name: "Gift of the Contagious Rage",
    when: 'Any time a figure within 3" of the Beastmen Chieftain activates.',
    effect:
      'The Beastmen Chieftain chooses an enemy figure within 6". That figure must pass a Will check against this power activation roll. If the figure fails that check, it must move towards the Beastmen Raider and must enter combat with it if able. The creature gains +1 Fight, but loses -1 armour. If the creature fails to enter combat with the Combat Chieftain, it loses the rest of its activation.',
  },
];

function BeastmenRaidersPage() {
  const units = beastmenUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const gifts = giftsOfBeastblood.map((gift) => ({
    id: slugify(gift.name, { lower: true }),
    label: gift.name,
    type: "Gift",
  }));

  const sections = [...units, ...gifts];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Beastmen Raiders" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {beastmenUnits.map((unit, index) => (
              <div key={index} id={slugify(unit.name, { lower: true })}>
                <UnitCard
                  name={unit.name}
                  role={unit.role}
                  stats={unit.stats}
                  abilities={unit.abilities}
                  {...(unit.spellAffinity && {
                    spellAffinity: unit.spellAffinity,
                  })}
                />
              </div>
            ))}
          </div>

          <div id="gifts">
            <PowerListTitle>Gifts of Beastblood</PowerListTitle>
            {giftsOfBeastblood.map((gift, index) => (
              <div key={index} id={slugify(gift.name, { lower: true })}>
                <PowerCard
                  name={gift.name}
                  when={gift.when}
                  effect={gift.effect}
                />
              </div>
            ))}
          </div>
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
}

export default BeastmenRaidersPage;
