import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import UnitCard from "../../components/UnitCard";
import EquipmentCard from "../../components/EquipmentCard";
import slugify from "slugify";
import WarbandIndex from "../../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  PowerListTitle,
} from "../../components/PageComponents";

const cultUnits = [
  {
    name: "Magister of Chaos",
    role: "Hero",
    stats: {
      move: 4,
      fight: "+4",
      shoot: "+0",
      armor: 10,
      will: "+4",
      health: 14,
      cost: "-",
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
        spellAffinity: "magisterOfChaos",
      },
      {
        name: "Pact Broker",
        description: `The Magister starts the game knowing the True Name of the Demon who gave him his powers. 
          He may choose an sacrifice, and a Boon from the Fostgrave: Forgotten Pacts supplements.
          At each 10 levels, the Magister may choose another sacrifice and Boon, as it learn the true 
          name of other demons. Forging a new pact takes the place of learning or improving a spell.`,
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
      armor: 11,
      will: "+3",
      health: 16,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Demonic Form",
        description:
          "The possessed cannot activate and use any powers. However, it may buy Demonic Traits from the Frostgrave: Forgotten Pacts supplement. A minor demonic trait costs 25gc, and a Major Demonic trait costs 50gc. These can only be taken when the Possessed is first hired, and never at any other point. The Possessed has Demon.",
      },
      {
        name: "Perfect Vessel",
        description:
          "Whenever the possessed gains a new level, it may buy another Demonic Trait instead of raising an attribute. For each Trait beyond the first, the price increases by 50gc cumulatively.",
      },
      {
        name: "Equipment",
        description: "None. The Possessed never use weapons or armor.",
      },
    ],
  },
  {
    name: "Brethren",
    stats: {
      move: 6,
      fight: "+2",
      shoot: "0",
      armor: 10,
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
    name: "Darksouls",
    stats: {
      move: 7,
      fight: "+1",
      shoot: "0",
      armor: 10,
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
      armor: "11 (12)",
      will: "-1",
      health: 14,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "Accursed Weapon and Shield OR Two Handed Weapon and Light armor.",
      },
      {
        name: "Dessecrated Bloodline",
        description:
          "The Beastman may choose to gain a minor demonic trait instead of a trick of the trade when reachin level 5.",
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
      armor: 10,
      will: "0",
      health: 10,
      cost: "50gc",
    },
    abilities: [
      {
        name: "Corrupted Mutations",
        description:
          "The mutant has a very weak statline for its price. However, it rolls once on the mutations table from the Grave Mutations supplement. Whenever a mutant gains a new level, it rolls on this table again instead of gaining stat points.",
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

  const sections = [...units, ...equipment];

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
