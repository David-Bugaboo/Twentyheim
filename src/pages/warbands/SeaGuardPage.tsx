import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
import EquipmentCard from "../../components/EquipmentCard";
import slugify from "slugify";
import WarbandIndex from "../../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

const seaGuardUnits = [
  {
    name: "Loremaster of Hoeth",
    role: "Hero",
    stats: {
      move: 7,
      fight: "+1",
      shoot: "+1",
      armour: 9,
      will: "+6",
      health: 14,
      cost: "-",
    },
    spellAffinity: {
      aligned0: [
        "Elementalist",
        "Enchanter",
        "Illusionist",
        "Necromancer",
        "Sigilist",
        "Soothsayer",
        "Summoner",
        "Thaumaturge",
        "Witch",
        "Chronomancer",
        "Distortionist",
        "Spiritualist",
        "Fatecaster",
        "Astromancer",
        "Sonancer",
      ],
    },
    abilities: [
      {
        name: "Arcane Master",
        description:
          "Any figure that activates along with this figure during the Hero's phase can use the Captain's Will stat instead of it's own.",
      },
      {
        name: "Spellcaster",
        description:
          "The Loremaster can learn and cast spells from any school of magic. The loremaster starts with 8 spells from any school.",
      },
      {
        name: "Equipment",
        description: "The loremaster can use Staffs, Hand Weapons and Bows.",
      },
    ],
  },
  {
    name: "Phoenix Guard",
    role: "Champion",
    stats: {
      move: 7,
      fight: "+3",
      shoot: "+1",
      armour: 10,
      will: "+3",
      health: 18,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Tidewall Stance",
        description:
          "While the Phoenix Guardiann is in base contact with the Loremaster, the Loremaster gains +2 armour.",
      },
      {
        name: "Tides of Hoeth",
        description:
          "The Phoenix Guardiann starts with 5 powers from the Tides of Hoeth list. One of them is their signature Tide and have an Activation number of 3, and the rest have Activation number of 5.",
      },
      {
        name: "Equipment",
        description:
          "The Phoenix Guardiann may equip Hand Weapons, Two-handed weapons, bows, shields, light armour, heavy armour and the Warband's exclusive Elven Warglaive.",
      },
    ],
  },
  {
    name: "Sailor-Recruits",
    stats: {
      move: 7,
      fight: "+2",
      shoot: "+0",
      armour: 9,
      will: "-1",
      health: 10,
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
    name: "Lothern Spearmen",
    stats: {
      move: 7,
      fight: "+3",
      shoot: "0",
      armour: 11,
      will: "+1",
      health: 12,
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
    name: "Lothern Halberdier",
    stats: {
      move: 7,
      fight: "+3",
      shoot: "0",
      armour: 10,
      will: "0",
      health: 10,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Elven Warglaive, Light armour.",
      },
    ],
  },
  {
    name: "Galespear",
    role: "Specialist",
    stats: {
      move: 7,
      fight: "+3",
      shoot: "0",
      armour: 9,
      will: "+4",
      health: 12,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Spear of the White Tower",
        description: "The Galespear attacks count as magical.",
      },
      {
        name: "Equipment",
        description: "Elven Warglaive.",
      },
    ],
  },
  {
    name: "Lothern Bannerman",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "+3",
      shoot: "0",
      armour: 11,
      will: "+1",
      health: 12,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Inspiring Banner",
        description:
          "Any allied models within 6\" and line of sight of this model gain +1 Will.",
      },
      {
        name: "Equipment",
        description: "Elven Warglaive, Heavy armour.",
      },
    ],
  },
  {
    name: "Windpiercer",
    role: "Specialist",
    stats: {
      move: 7,
      fight: "+1",
      shoot: "+3",
      armour: 10,
      will: "+2",
      health: 10,
      cost: "125gc",
    },
    abilities: [
      {
        name: "Gather the Winds",
        description:
          'The Wind Piercer may use an action to gather the winds around his arrow. The next Shooting Attack made by the wind piercer gains an additional 4" of range.',
      },
      {
        name: "Equipment",
        description: "Bow, Hand Weapon, Light armour.",
      },
    ],
  },
];

const seaGuardEquipment = [
  {
    name: "Elven Warglaive",
    description:
      "An Elven Warglaive is an elegant and slender weapon, used for both brutal attacking and cunning defense. It counts as a staff, but with a +1 bonus to damage.",
  },
];

const tidesOfHoeth = [
  {
    name: "Shield of the Tempest",
    when: 'When the Loremaster is targeted by a ranged attack and is Within 3" of the Phoenix Guard.',
    effect:
      'up to 3 allied models within 3" of the Phoenix Guard gain +2 armour for the next attack they take or until the end of the turn, whichever comes first.',
  },
  {
    name: "Coral Wall Formation",
    when: 'Whenever the Phoenix Guard is within 3" of the Loremaster and a enemy figure tries to move into combat with the Loremaster.',
    effect:
      "The Phoenix Guard may immediately move up to 3\". If the Phoenix Guard ends it's movement between the Loremaster and that figure, the figure loses 2 Move.",
  },
  {
    name: "Reflecting Pool",
    when: 'At any time the Loremaster casts a spell within 6" of the Phoenix Guard.',
    effect:
      "The Loremaster may draw line of sight and treat the spell origin point from the Phoenix Guard, including to measure range.",
  },
  {
    name: "Surge of the Tides",
    when: 'At any time the Loremaster fails to cast a spell within 6" of the Phoenix Guard.',
    effect:
      "The Phoenix Guard may exert that spell as if it was a power, taking damage in a 1:1 ratio to increase that casting roll.",
  },
  {
    name: "Gale Step",
    when: "At any point during the Phoenix Guard activation.",
    effect:
      'If the Loremaster is still on the table, swap positions with them. If the Loremaster is not on the table, place the Phoenix Guard anywhere within 6" of his initial position. This ability can be used to remove the Loremaster from combat.',
  },
  {
    name: "Deflection of the Currents",
    when: 'Whenever the Phoenix Guard or any friendly figure within 3" of them loses a fight.',
    effect:
      'The Phoenix Guard can move up to 3" and enter that combat. Any damage caused by the attack that triggered this power is reduced by 4. If that damage is reduced to 0, the Phoenix Guard may immediately fight the enemy figure.',
  },
  {
    name: "Echoing of the Waves",
    when: "At any point the Phoenix Guard wins a fight against an enemy creature and deals at least 1 damage.",
    effect:
      "That creature gains an echo token. Any creature from the Warband that makes and succeeds on an attack against a creature with an echo token adds another echo token to it. A creature with an echo token takes 1 extra damage at anytime it takes damage for each echo token it has. The Loremaster may spend an action to consume any number of echo tokens on a creature and gain that number of echo tokens as a bonus to his casting roll. All echo tokens are lost at the start of each turn.",
  },
  {
    name: "Scrimshawed armour",
    when: "At any time the Phoenix Guard is affected by a Spell.",
    effect:
      "The Phoenix Guard gains a +5 Will against that effect. After the end of the battle, if the Phoenix Guard was not knocked out, it may activate this power again. If successful, he creates a scroll from one of the spells this power was used against as if the Write Scroll spell was cast.",
  },
  {
    name: "Rippling Waves",
    when: "Whenever the Phoenix Guard wins a fight and causes at least 1 damage.",
    effect:
      'One allied model within 3" that is also in combat with the same or other figures may immediately attack as a free action.',
  },
  {
    name: "Tidal Currents",
    when: "Whenever the Phoenix Guard wins a fight and causes at least 1 damage.",
    effect:
      'The Phoenix Guard causes 1 extra damage and may move that figure up to 4" in any direction. Allied units can force that figure into combat.',
  },
  {
    name: "Wavecrash",
    when: 'Whenever the Loremaster or any allied figure within 6" takes any damage.',
    effect:
      'The Phoenix Guard may immediately make a +3 Magic Shooting Attack against the damage dealing figure. If the Loremaster was the one taking damage, the damage dealing creature and everyone within 3" of the Phoenix Guard take a +3 Magic Shooting Attack.',
  },
  {
    name: "Steel Typhoon",
    when: "At any point during the Phoenix Guard activation.",
    effect:
      'The Phoenix Guard may force combat within an extra 3" until the next time they force combat or until the end of the turn, whichever comes first.',
  },
];

function SeaGuardPage() {
  const navigate = useNavigate();

  const units = seaGuardUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const equipment = seaGuardEquipment.map((item) => ({
    id: slugify(item.name, { lower: true }),
    label: item.name,
    type: "Equipment",
  }));

  const tides = tidesOfHoeth.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Tide",
  }));

  const sections = [...units, ...equipment, ...tides];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Sea Guard of Ulthuan" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {seaGuardUnits.map((unit, index) => (
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
            {seaGuardEquipment.map((item, index) => (
              <div key={index} id={slugify(item.name, { lower: true })}>
                <EquipmentCard
                  name={item.name}
                  description={item.description}
                />
              </div>
            ))}
          </div>

          <div id="tides">
            <PowerListTitle>Tides of Hoeth</PowerListTitle>

            <ParchmentText>
              Tides of Hoeth represents the harmonious interplay between mastery
              of arcane power and protective strategy. The warband is built
              around the symbiosis of the <strong>Loremaster</strong> and the{" "}
              <strong>Phoenix Guard</strong>, creating a duality of offense and
              defense, intelligence and raw battlefield control.
              <br />
              <br />
              The identity emphasizes{" "}
              <strong>
                linked synergy, protective control, and reactive power flow
              </strong>
              . Most powers revolve around the proximity and coordination
              between the Loremaster and the Phoenix Guard, making positioning
              and timing critical. The warband rewards teamwork over individual
              heroics, turning the tide of battle through cascading effects and
              spell integration.
              <br />
              <br />
              In short, Tides of Hoeth is designed to make the warband feel like
              a <strong>living, moving system</strong>, where protection, magic,
              and combat amplify each other.
            </ParchmentText>

            {tidesOfHoeth.map((power, index) => (
              <div key={index} id={slugify(power.name, { lower: true })}>
                <PowerCard
                  name={power.name}
                  when={power.when}
                  effect={power.effect}
                />
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

export default SeaGuardPage;
