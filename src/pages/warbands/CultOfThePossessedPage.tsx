import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import UnitCard from "../../components/UnitCard";
import EquipmentCard from "../../components/EquipmentCard";
import PowerCard from "../../components/PowerCard";
import slugify from "slugify";
import WarbandIndex from "../../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  PowerListTitle,
  ParchmentText,
} from "../../components/PageComponents";

const cultUnits = [
  {
    name: "Magister of Chaos",
    role: "Hero",
    stats: {
      move: 4,
      fight: "+4",
      shoot: "+0",
      armour: 10,
      will: "+4",
      health: 14,
      cost: "-",
    },
    spellAffinity: {
      aligned0: ["Summoner"],
      aligned2: ["Elementalist", "Distortionist", "Illusionist"],
      neutral4: ["Witch", "Necromancer", "Chronomancer"],
      opposed6: ["Sigilist", "Soothsayer"],
      anathema: ["Thaumaturge", "Astromancer", "Sonancer", "Enchanter"],
    },
    abilities: [
      {
        name: "Possesser",
        description:
          "Any figure that activates along with this figure during the Hero's Phase can use the Leader's Will stat instead of its own.",
      },
      {
        name: "Master Spellcaster",
        description:
          "The Magister of Chaos may cast spells from the Summoner, Elementalist, Distortionist and Illusion schools of magic. The figure starts the game with 6 such spells.",
      },
      {
        name: "Pact Broker",
        description: `The Magister starts the game having sold a fragment of his soul to the daemons of the Realm of Chaos. 
          He may choose one Sacrifice and one Boon from the Pact lists below.
          At every 10 levels, the Magister's soul grows so saturated with dark power that he may sell another fragment, 
          allowing him to choose another Sacrifice and Boon. Selling a new soul fragment takes the place of learning or improving a spell.`,
      },
      {
        name: "Equipment",
        description:
          "A Magister of Chaos may start with and equip staffs, daggers, hand weapons, two-handed weapons and the Cult of the Possessed exclusive Accursed Weapon.",
      },
    ],
  },
  {
    name: "Possessed",
    role: "Champion",
    stats: {
      move: 7,
      fight: "+4",
      shoot: "-",
      armour: 11,
      will: "+3",
      health: 18,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Demonic Form",
        description:
          "The Possessed cannot activate and use any powers. However, when first hired, they may select and gain a single Daemonic Attribute. The Possessed has the Demon trait.",
      },
      {
        name: "Perfect Vessel",
        description:
          "Whenever the Possessed gains a new level, they may purchase another Daemonic Attribute instead of raising an attribute. Each additional attribute costs 50gc more than the previous one (50gc for first, 100gc for second, 150gc for third, etc.).",
      },
      {
        name: "Equipment",
        description: "None. The Possessed never use weapons or armour.",
      },
    ],
  },
  {
    name: "Brethren",
    stats: {
      move: 6,
      fight: "+2",
      shoot: "0",
      armour: 10,
      will: "-1",
      health: 10,
      cost: "Free",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon",
      },
    ],
  },
  {
    name: "Crazed Javelineer",
    stats: {
      move: 7,
      fight: "0",
      shoot: "0",
      armour: 10,
      will: "-2",
      health: 10,
      cost: "15gc",
    },
    abilities: [
      {
        name: "Mad Violence",
        description:
          "The Crazed Javelineer must always shoot his javelins at the closest enemy unit without cover.",
      },
      {
        name: "Equipment",
        description: "Javelin",
      },
    ],
  },
  {
    name: "Darksouls",
    stats: {
      move: 7,
      fight: "+1",
      shoot: "0",
      armour: 10,
      will: "+5",
      health: 10,
      cost: "30gc",
    },
    abilities: [
      {
        name: "Dessecrated Mind",
        description:
          "The Darksoul had his mind completely broken by his possession. He has Mind Lock.",
      },
      {
        name: "Equipment",
        description: "Accursed Weapon",
      },
    ],
  },
  {
    name: "Beastman",
    role: "Specialist",
    stats: {
      move: 7,
      fight: "+3",
      shoot: "0",
      armour: "11 (12)",
      will: "-1",
      health: 14,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "Accursed Weapon and Shield OR Two Handed Weapon and Light armour.",
      },
      {
        name: "Dessecrated Bloodline",
        description:
          "The Beastman may choose to gain a Daemonic Attribute instead of a trick of the trade when reaching level 5.",
      },
    ],
  },

  {
    name: "Mutant",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "+2",
      shoot: "0",
      armour: 10,
      will: "0",
      health: 10,
      cost: "50gc",
    },
    abilities: [
      {
        name: "Vessel of Chaos",
        description:
          "When first hired, the Mutant may purchase one Daemonic Attribute for 50gc. Whenever a Mutant gains a new level, it may choose to gain another Daemonic Attribute instead of gaining stat points. Each additional attribute costs 50gc more than the previous one (50gc for first, 100gc for second, 150gc for third, etc.).",
      },
      {
        name: "Equipment",
        description: "Accursed Weapon and Dagger OR Two-handed Weapon.",
      },
    ],
  },
];

const cultEquipment = [
  {
    name: "Accursed Weapon",
    description:
      "This weapon counts as a hand weapon, except it deals an extra +1 damage. However, any unmodified rolls of 1 on the d20 cause 2 damage to the attacking figure.",
    notes:
      "The Accursed Weapon is a deadly but unpredictable tool, reflecting the corrupting influence of Chaos. It grants significant offensive power but carries a terrible risk — the weapon may turn on its wielder when fortune fails.",
  },
];

const daemonicAttributes = [
  {
    name: "Armoured Hide",
    description:
      "The possessed is covered in scales, plates, or some other form of natural armour. Increase its Armour stat by 1.",
  },
  {
    name: "Chameleonic",
    description:
      'The possessed blends in with its surroundings and is very difficult to see beyond a short distance. No figure may draw line of sight to this figure if they are more than 12" away.',
  },
  {
    name: "Daemonic Strength",
    description:
      "This possessed counts as being armed with a two-handed weapon for the purposes of determining damage in hand-to-hand combat.",
  },
  {
    name: "Extra Arms",
    description:
      "The possessed has more than two arms, which increases its fighting ability. Increase its Fight stat by 1.",
  },
  {
    name: "Extra Legs",
    description:
      "The possessed has more than two legs, or some other means of faster locomotion. Increase its Move stat by 1.",
  },
  {
    name: "Explosive Demise",
    description:
      'When this possessed is reduced to 0 Health, it exits this plane of existence in a fiery explosion. Every figure within 3" suffers a +3 elemental magic shooting attack.',
  },
  {
    name: "Horns",
    description:
      "The possessed has one or more large horns or antlers that it can use to attempt to gore targets. If the possessed attacks on the same turn it moved into combat, it gains a +2 Fight for that attack only.",
  },
  {
    name: "Horrific",
    description:
      "Any living figure (not undead or constructs) that wishes to move into combat with this possessed must first make a Will roll with a Target Number of 14. Failure does not cause the figure to lose its action, but it cannot attempt this roll again until its next activation.",
  },
  {
    name: "Levitation",
    description:
      "The possessed floats above the ground. It never suffers a movement reduction due to rough ground or climbing.",
  },
  {
    name: "Hellfire Claws",
    description:
      "All attacks made by this possessed count as elemental as well.",
  },
  {
    name: "Numbing Touch",
    description:
      "Any figure that loses a combat against the possessed suffers -1 Fight for the rest of the game (or until healed by a Heal spell or Healing Potion) in addition to any damage he suffers. This is not cumulative.",
  },
  {
    name: "Poisonous",
    description:
      "A figure damaged by this possessed in hand-to-hand combat is treated as poisoned for the rest of the game or until healed by either a Heal spell or Healing Potion.",
  },
  {
    name: "Tentacles",
    description:
      'The possessed possesses several long tentacles. Any time a figure moves within 2" of the possessed, but does not enter combat, the possessed may make a free +0 shooting attack against the figure.',
  },
  {
    name: "True Sight",
    description:
      "This possessed is immune to the spells Beauty, Invisibility, and Monstrous Form.",
  },
  {
    name: "Two Heads",
    description:
      "The possessed has two heads, or at least two independently focusable eyes, which gives it an advantage when fighting multiple opponents in hand-to-hand combat. A figure fighting a two-headed possessed always counts as having one supporting figure fewer than he actually does. So, an attacking figure with one supporting figure receives no bonus, one with two supporting figures receives +2, and so on.",
  },
  {
    name: "Vampiric",
    description:
      "Anytime the possessed damages a creature in hand-to-hand combat that isn't undead or a construct, it immediately regains 2 points of lost Health. This may not take the possessed over its starting Health.",
  },
  {
    name: "Vestigial Wings",
    description:
      "The possessed possesses a small pair of wings. While it cannot actually fly, it never suffers damage from falling, no matter the distance.",
  },
  {
    name: "Acidic Blood",
    description:
      "The possessed's blood is a powerful acid that can eat through metal and flesh alike. Whenever a figure damages this possessed, it should make an immediate Will roll. If the total of this roll is 12 or greater nothing happens. If the total is 11 or less, then the figure immediately suffers 3 damage. In addition, if the figure is fighting with a non-magic weapon, that weapon is destroyed. It is replaced for free after the game.",
  },
  {
    name: "Blinding Aura",
    description:
      'Any figure that activates within 6" of this possessed must make a Will roll versus a Target Number of 12 or be blinded. While blinded, the figure may not attack, shoot, or cast Line of Sight spells. His Fight stat is reduced to +0 and his Move to 1. At the start of each turn, the figure may attempt another Will roll against the same Target Number to recover from the effects of the blindness. Otherwise, the effects last until the end of the game.',
  },

  {
    name: "Elemental Absorption",
    description:
      "This possessed absorbs elemental energy. It ignores the first 5 points of damage from any attack caused by a spell from the Elementalist school of magic, or any other attack identified as elemental magic.",
  },
  {
    name: "Insubstantial Movement",
    description:
      "possesseds with this ability are capable of moving through walls and even the ground beneath Frostgrave. If this possessed makes a move that would take them into a piece of terrain, they may move through the terrain as though it were not there, provided they have enough movement to make it to the other side. These possesseds cannot draw line of sight through terrain.",
  },
  {
    name: "Life Bane",
    description:
      'Any living figure which activates while within 3" of this possessed must make a Will roll versus a Target Number of 14 or immediately suffer 3 points of damage.',
  },
  {
    name: "Maelstrom",
    description:
      "The possessed is surrounded by swirling winds, fire, or some other form of elemental energy. All shooting attacks against the possessed are at -2.",
  },
  {
    name: "Magic Sink",
    description:
      "The possessed absorbs magic energy directed at it. Any time a spell targets this possessed, the caster must roll the Casting Roll twice and take the lower result.",
  },
  {
    name: "Mind Lock",
    description: "This creature is Immune to Mind Control,Suggestion and Fear.",
  },
  {
    name: "Regeneration",
    description:
      "At the start of each of the possessed's activations, it regains 2 points of lost Health. This may not take it above its starting Health.",
  },
  {
    name: "Serendipitous",
    description:
      'Once per turn, when any figure within 12" of this possessed rolls a natural 1 or natural 20 on any roll, the possessed may force that figure to reroll. The second result stands.',
  },
  {
    name: "Hellspawner",
    description:
      'At the start of each turn, roll a die. On a roll of 16+, an imp appears within 3" of this possessed. The imp is treated as an uncontrolled creature and activates in the creature phase.',
  },
];

const pactSacrifices = [
  {
    name: "Blood",
    description:
      "The Magister must offer up some of his own blood to the Daemon. He begins each game at -4 Health.",
  },
  {
    name: "Tithing",
    description:
      "The Magister must offer up one Wyrdstone Shard after each game. After a game, the magister must select one Wyrdstone Shard acquired during the game and discard it. The Magister may always choose which shard to discard, but the choice must be made before any roll is made on the treasure table. If a Magister gains no Wyrdstone Shards during a game, he must offer up 50gc instead (note that a magister may never choose to offer the 50gc instead of a Wyrdstone Shard). If he cannot do either, his pact is broken.",
  },
  {
    name: "Worship",
    description:
      "One member of the warband must stay at the magister's base to perform devotions. This can be any member of the warband except warhounds, undead, and constructs. It does not have to be the same warband member each time. It cannot be a warband member who must otherwise miss the coming game while recovering from an injury.",
  },
  {
    name: "Arcane Energy",
    description:
      "The magister must offer up a piece of his spellcasting ability. Before the game, randomly determine one spell known by the magister. He may not cast this spell before, during, or after the next game.",
  },
  {
    name: "Prayer",
    description:
      "The magister begins each game with a silent prayer. The magister may only take one action per turn for the rest of the game.",
  },
];

const pactBoons = [
  {
    name: "Demonic Endurance",
    description:
      "The First time the Magister would be red to 0 health, it instead is reduced to 1 health. ",
  },
  {
    name: "Demonic Power",
    description:
      "The magister gains one random, minor daemonic attribute. Roll once on the Minor Daemonic Attribute Table (Note that results of Backstabber, Chameleonic, Levitation, or Teleport should be rerolled). Once an attribute has been determined, the magister may choose to reroll it, but must accept the second result. Once a result has been determined, the magister gains the effects of the attribute (simply replace the word 'demon' with the word 'magister' in the attribute description). Even though many of these attributes will change the physical appearance of the magister, they are not permanent. If the pact between the magister and the demon is ever broken, this boon will be lost. Also, if the attribute results in a stat increase, it should be written as a split stat. This increase will not apply to the apprentice, but nor does it apply to a magister's maximum advancement in that stat. Thus it is possible for a magister to have Fight +5 and a daemonic attribute that gives him +1 Fight, for a total of Fight +5/+6.",
  },
  {
    name: "Lost Secrets",
    description:
      "When rolling for treasure after a game, the magister may reroll any one result on a treasure table. If he chooses to do so, he must take the second result. A magister may roll for all his treasure before selecting which result to discard and reroll.",
  },
  {
    name: "Pentaculum",
    description:
      "A magister that successfully casts Bind Demon during a game may choose to imprison that demon inside a magic amulet called a pentaculum. Immediately remove the demon from the game. The pentaculum does not count towards the magister's item limit during the game, and is stored in the magister's vault after the game. A pentaculum may be discarded at any time to add +3 to the Casting Roll of one Out of Game spell. The decision to use the pentaculum must be made before the Casting Roll is made. Only one pentaculum can be used for any given Casting Roll.",
  },
  {
    name: "Twist of Fate",
    description:
      "Once per game, the player controlling this magister may reroll any one die roll made by any member of his warband, including initiative rolls. It cannot be used for rolls made by random creatures, other warbands, or other random effects. It can only be used during a game and cannot be saved from one game to the next. When a die is rerolled, the previous roll is lost, and the new roll must be accepted. It is never possible to reroll a reroll.",
  },
];

function CultOfThePossessedPage() {
  const navigate = useNavigate();

  const units = cultUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const equipment = cultEquipment.map((item) => ({
    id: slugify(item.name, { lower: true }),
    label: item.name,
    type: "Equipment",
  }));

  const attributes = daemonicAttributes.map((attr) => ({
    id: slugify(attr.name, { lower: true }),
    label: attr.name,
    type: "Attribute",
  }));

  const sacrifices = pactSacrifices.map((sacrifice) => ({
    id: slugify(sacrifice.name, { lower: true }),
    label: sacrifice.name,
    type: "Sacrifice",
  }));

  const boons = pactBoons.map((boon) => ({
    id: slugify(boon.name, { lower: true }),
    label: boon.name,
    type: "Boon",
  }));

  const sections = [
    ...units,
    ...equipment,
    ...attributes,
    ...sacrifices,
    ...boons,
  ];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Cult of the Possessed" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {cultUnits.map((unit, index) => (
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

          <div id="equipment">
            <PowerListTitle>Special Equipment</PowerListTitle>
            {cultEquipment.map((item, index) => (
              <div key={index} id={slugify(item.name, { lower: true })}>
                <EquipmentCard
                  name={item.name}
                  description={item.description}
                  notes={item.notes}
                />
              </div>
            ))}
          </div>

          <div id="daemonic-attributes">
            <PowerListTitle>Daemonic Attributes</PowerListTitle>

            <ParchmentText>
              The Possessed and Mutants are warriors whose bodies have become
              vessels for demonic entities and chaotic corruption. As the daemon
              within grows stronger, it manifests physical and supernatural
              attributes that warp both flesh and soul. These daemonic
              attributes represent the terrible gifts bestowed upon those who
              have surrendered themselves to the powers of Chaos.
              <br />
              <br />
              <strong>For Possessed:</strong> When a Possessed is first hired,
              the warband may purchase Daemonic Attributes for them,
              representing the initial stage of their corruption. As the
              Possessed gains experience and levels up, they may choose to
              embrace further corruption by gaining additional attributes
              instead of improving their base statistics. Each attribute costs
              50gc, with each additional attribute costing 50gc more than the
              previous (50gc for first, 100gc for second, 150gc for third,
              etc.).
              <br />
              <br />
              <strong>For Mutants:</strong> When a Mutant is first hired, they
              may purchase one Daemonic Attribute for 50gc. Each time a Mutant
              gains a level, they may choose to purchase another Demonic
              Attribute instead of gaining stat points. Each additional
              attribute costs 50gc more than the previous one (50gc for first,
              100gc for second, 150gc for third, etc.).
              <br />
              <br />
              <strong>Vessels of Chaos:</strong> Both Possessed and Mutants
              manifest the physical marks of their corruption, making them
              increasingly monstrous with each transformation. However, each
              figure may only manifest each specific attribute once — the
              daemon's essence shapes the host in unique ways that cannot be
              replicated.
            </ParchmentText>

            {daemonicAttributes.map((attr, index) => (
              <div key={index} id={slugify(attr.name, { lower: true })}>
                <PowerCard name={attr.name} effect={attr.description} />
              </div>
            ))}
          </div>

          <div id="pact-sacrifices">
            <PowerListTitle>Pact Sacrifices</PowerListTitle>

            <ParchmentText>
              The Magister of Chaos has sold a fragment of his soul to the
              daemons of the Realm of Chaos. This terrible bargain grants him
              dark power, but binds him ever more tightly to the infernal forces
              that now hold pieces of his very essence. Each daemon that claims
              a soul fragment demands a Sacrifice — a regular offering that
              maintains the connection between the mortal world and the warp. To
              refuse is to risk the daemon consuming what remains of the
              Magister's soul.
              <br />
              <br />
              <strong>Selling Soul Fragments:</strong> When first creating the
              Magister and at every 10 levels thereafter, his soul grows so
              saturated with dark power that he may sell another fragment. With
              each fragment sold, the Magister must select one Sacrifice from
              the list below. This Sacrifice represents the specific price
              demanded by the daemon who claimed that fragment. Once chosen, it
              cannot be changed — the contract is written in blood and essence.
              <br />
              <br />
              <strong>The Price of Power:</strong>
              <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
                <li>
                  Each Sacrifice must be performed before every game (or
                  during/after as specified)
                </li>
                <li>
                  Failure to perform a Sacrifice severs the connection to that
                  soul fragment and its associated Boon
                </li>
                <li>
                  The same Sacrifice cannot be selected for multiple soul
                  fragments — each daemon has unique demands
                </li>
                <li>
                  The more fragments sold, the more the Magister becomes a
                  puppet of the dark powers
                </li>
              </ul>
            </ParchmentText>

            {pactSacrifices.map((sacrifice, index) => (
              <div key={index} id={slugify(sacrifice.name, { lower: true })}>
                <PowerCard
                  name={sacrifice.name}
                  effect={sacrifice.description}
                />
              </div>
            ))}
          </div>

          <div id="pact-boons">
            <PowerListTitle>Pact Boons</PowerListTitle>

            <ParchmentText>
              For each soul fragment sold (and Sacrifice performed), the daemon
              grants the Magister a Boon — a dark gift that flows from the
              fragment of essence it now possesses. These boons represent the
              unholy power channeled through the connection between the Magister
              and the Realm of Chaos. As more fragments are sold, the Magister
              accumulates terrible abilities, but his very identity begins to
              dissolve into the warp.
              <br />
              <br />
              <strong>Receiving Boons:</strong> For each soul fragment sold (and
              corresponding Sacrifice chosen), the Magister may select one Boon
              from the list below. This selection is permanent for that specific
              fragment — the nature of the daemon's gift is sealed at the moment
              of the soul's sundering.
              <br />
              <br />
              <strong>The Chains of Damnation:</strong>
              <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
                <li>
                  Each Boon is tied to its corresponding soul fragment and
                  Sacrifice
                </li>
                <li>
                  If the Sacrifice is not performed, the connection to that
                  fragment (and its Boon) is severed
                </li>
                <li>
                  The same Boon cannot be selected for multiple fragments — each
                  piece of the soul grants unique power
                </li>
                <li>
                  With each fragment sold, less of the Magister's humanity
                  remains
                </li>
              </ul>
            </ParchmentText>

            {pactBoons.map((boon, index) => (
              <div key={index} id={slugify(boon.name, { lower: true })}>
                <PowerCard name={boon.name} effect={boon.description} />
              </div>
            ))}
          </div>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <StyledNavigationButton
            onClick={() => navigate("/warbands")}
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "rgba(20, 18, 14, 0.6)",
              "&:hover": {
                backgroundColor: "rgba(28, 24, 18, 0.8)",
              },
            }}
          >
            Back to Warbands
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default CultOfThePossessedPage;
