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

const lizardmenUnits = [
  {
    name: "Slann Greatmage",
    role: "Hero",
    stats: {
      move: 4,
      fight: "-2",
      shoot: "-2",
      armor: 14,
      will: "+6",
      health: 16,
      cost: "-",
    },
    abilities: [
      {
        name: "Master Spellcaster",
        description:
          "The Slann Greatmage may cast spells from soothsayer, thaumaturgy, elementalist, fatecaster and astromancer. He starts with 8 such spells.",
        spellAffinity: "slannGreatmage",
      },
      {
        name: "Palanquin of the Great",
        description: "The Slann Greatmage has Levitate.",
      },
      {
        name: "Equipment",
        description: "Slann Greatmages cannot use any equipment.",
      },
    ],
  },
  {
    name: "Skink Priestmage",
    role: "Champion",
    stats: {
      move: 6,
      fight: "+1",
      shoot: "+0",
      armor: 11,
      will: "+4",
      health: 14,
      cost: "120gc",
    },
    abilities: [
      {
        name: "Apprentice Spellcaster",
        description:
          "The Skink Priestmage may cast spells from the soothsayer, thaumaturgy, elementalist, fatecaster and astromancer schools. The figure starts the game with 4 such spells, and always casts them with a -2 Casting roll.",
        spellAffinity: "skinkPriestmage",
      },
      {
        name: "Tribal Tattooer",
        description:
          "The Skink Priestmage may cast the spell Mystic Brand, and always counts as having it.",
      },
      {
        name: "Reptilian Ancestry",
        description: "The Skink Priestmage has Amphibian.",
      },
      {
        name: "Equipment",
        description:
          "Skink Priestmage may start with and equip daggers, staffs and the Warband's Specific Blowpipe.",
      },
    ],
  },
  {
    name: "Skink Braves",
    stats: {
      move: 7,
      fight: "+1",
      shoot: "0",
      armor: 11,
      will: "-1",
      health: 10,
      cost: "Free",
    },
    abilities: [
      {
        name: "Reptilian Ancestry",
        description: "The Skink Braves have Amphibian.",
      },
      {
        name: "Equipment",
        description: "Hand weapon.",
      },
    ],
  },
  {
    name: "Saurus Braves",
    stats: {
      move: 5,
      fight: "+3",
      shoot: "0",
      armor: "12 (13)",
      will: "+1",
      health: 14,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Crushing Bite",
        description:
          "The Saurus have a humongous jaw that can tear enemies and crush armor. The Saurus have Opponent Armor Reduction due to using their bites alongside their weapons.",
      },
      {
        name: "Crocodilian Ancestry",
        description: "The Saurus Brave has Amphibian.",
      },
      {
        name: "Equipment",
        description: "Hand weapon and Shield OR Two-Handed Weapon.",
      },
    ],
  },
  {
    name: "Saurus Totem-warriors",
    role: "Specialist",
    stats: {
      move: 5,
      fight: "+3",
      shoot: "+0",
      armor: "12 (13)",
      will: "+4",
      health: 14,
      cost: "200gc",
    },
    abilities: [
      {
        name: "Totemic Fury",
        description:
          "Whenever a totem warrior is activated, it may make a Will Roll with a Target Number of 16 as a free action. If successful, choose and apply one of the following bonuses that lasts until its next activation: +1 Move, +1 Fight, +1 Armor or +2 Will.",
      },
      {
        name: "Crushing Bite",
        description:
          "The Saurus have a humongous jaw that can tear enemies and crush armor. The Totem-warriors have Opponent Armor Reduction due to using their bites alongside their weapons.",
      },
      {
        name: "Crocodilian Ancestry",
        description: "The Saurus Totem-warrior has Amphibian.",
      },
      {
        name: "Equipment",
        description: "Hand Weapon and Shield OR Two-Handed weapon.",
      },
    ],
  },
  {
    name: "Skink Crestwarrior",
    role: "Specialist",
    stats: {
      move: 7,
      fight: "+2",
      shoot: "+2",
      armor: 11,
      will: "+1",
      health: 10,
      cost: "120gc",
    },
    abilities: [
      {
        name: "Jungleguard",
        description:
          "Skink Crestwarriors are used to fight and charge through terrain way worse than the rubble of Mordheim. They ignore movement penalties for passing through rough ground.",
      },
      {
        name: "Sudden Action",
        description: `At the start of the game, after both sides have set up, but before the first Initiative Rolls, a player with a Crestwarrior may move it and one other figure in base-to-base contact with it up to 3". The Crestwarrior and the other figure must remain in base-to-base contact at the end of this move.`,
      },
      {
        name: "Reptilian Ancestry",
        description: "The Skink Crestwarrior has Amphibian.",
      },
      {
        name: "Equipment",
        description: "Hand Weapon and Javelins.",
      },
    ],
  },
  {
    name: "Skink Blowdarter",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "-1",
      shoot: "+4",
      armor: 11,
      will: "+4",
      health: 14,
      cost: "120gc",
    },
    abilities: [
      {
        name: "Pinpoint Darts",
        description:
          "Skink Blowdarters are allowed to take a special 'aim' action. If this action is immediately followed by a shoot action in the same activation, the Skink Blowdarter may ignore the first piece of intervening terrain (not cover) between him and his target.",
      },
      {
        name: "Reptilian Ancestry",
        description: "The Skink Blowdarter has Amphibian.",
      },
      {
        name: "Chamelonic Scales",
        description: `Due to their refractive scales, no figure may draw line of sight to a Blowdarter that is more than 16" away or in any kind of cover.`,
      },
      {
        name: "Equipment",
        description: "Hand weapon, Blowpipe, Dart pouch.",
      },
    ],
  },
  {
    name: "Kroxigor",
    stats: {
      move: 4,
      fight: "+4",
      shoot: "0",
      armor: 15,
      will: "0",
      health: 16,
      cost: "200gc",
    },
    abilities: [
      {
        name: "Lumbering River Hunter",
        description: "The Kroxigor has Large, Strong, Fear and Amphibian.",
      },
      {
        name: "Cannibalism",
        description:
          "Whenever this figure reduces a creature to 0 HP, it gains 5 health.",
      },
      {
        name: "Equipment",
        description: "Two-Handed Weapon.",
      },
    ],
  },
];

const lizardmenEquipment = [
  {
    name: "Blowpipe",
    properties: [
      { label: "Type", value: "Ranged Weapon" },
      { label: "Range", value: '16"' },
      { label: "Damage Modifier", value: "-4" },
      { label: "Special", value: "Poison trait" },
    ],
    description:
      "Blowpipes are deadly tools in the hands of Skinks, delivering poisoned darts that can incapacitate even heavily armored foes. While the damage is reduced, the poison effect makes them particularly effective against targets that rely on high health pools rather than armor.",
  },
];

function LizardmenPage() {
  const navigate = useNavigate();

  const units = lizardmenUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const equipment = lizardmenEquipment.map((item) => ({
    id: slugify(item.name, { lower: true }),
    label: item.name,
    type: "Equipment",
  }));

  const sections = [...units, ...equipment];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Lizardmen" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {lizardmenUnits.map((unit, index) => (
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
            {lizardmenEquipment.map((item, index) => (
              <div key={index} id={slugify(item.name, { lower: true })}>
                <EquipmentCard
                  name={item.name}
                  properties={item.properties}
                  description={item.description}
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

export default LizardmenPage;
