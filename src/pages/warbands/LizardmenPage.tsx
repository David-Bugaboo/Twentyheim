import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import UnitCard from "../../components/UnitCard";
import EquipmentCard from "../../components/EquipmentCard";
import TotemicPowerCard from "../../components/TotemicPowerCard";
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
    name: "Skink Priestmage",
    role: "Hero",
    stats: {
      move: 4,
      fight: "-2",
      shoot: "-2",
      armour: 14,
      will: "+6",
      health: 16,
      cost: "-",
    },
    abilities: [
      {
        name: "Guide of the Tribe",
        description:
          "Any creatures that activate in the Hero's phase alongside the Skink Priestmage may use the Priestmage's Will stat instead of its own.",
      },
      {
        name: "Druid Master",
        description:
          "The Skink Priestmage is an ancient Druid who commands the primal forces of nature with unmatched mastery. He may only cast spells from the Druidcraft of the Old Ones school of magic and starts with 8 such spells. Druid spells channel the spirits of the world itself rather than the Winds of Magic, so they do not require grimoires to learn and do not cause damage to the caster when failing to cast. However, Druid spells tend to have less raw power than other schools of magic, compensated by their versatility and reliability.",
      },
      {
        name: "Reptilian Ancestry",
        description: "The Skink Priestmage has Amphibian.",
      },
      {
        name: "Equipment",
        description:
          "Skink Priestmages may start with hand weapons, two-handed weapons, staffs, javelins, throwing spears and the Warband's exclusive Blowpipe.",
      },
    ],
  },
  {
    name: "Saurus Totem Warrior",
    role: "Champion",
    stats: {
      move: 6,
      fight: "+4",
      shoot: "+1",
      armour: 12,
      will: "+5",
      health: 18,
      cost: "120gc",
    },
    abilities: [
      {
        name: "Totemic Fury",
        description: `The Saurus Totem Warrior doesn't rely on martial prowess, and therefore do not use powers. 
          However, he can channel the Fury of the Spirit Guides of his people to grow in people and
           destroy his enemys.
           The Saurus Totem Warrior starts the game with a Totemic Fury Activated. If he wishes to exchange his
           current totemic fury for any other he knows, he must pass a Will stat check with a Target Number of 14. If he fails
           this test, he takes 3 damage. If he succeeds, he is now under the effect of another totemic fury he knows. `,
      },
      {
        name: "Reptilian Ancestry",
        description: "The Saurus Totem Warrior has Amphibian.",
      },
      {
        name: "Crushing Jaws",
        description: `The Saurus Totem Warrior has a powerful bite that can crush steel as easily as flesh. He can fight  
        unamed without any penalties. In addition, when fighting with a weapon, the combination of his bites and 
        attacks grant him the Opponent Armour Reduction trait.`,
      },
      {
        name: "Equipment",
        description:
          "Saurus Totem Warriors may start with and equip Daggers, Hand Weapons, Two Handed Weapons, Javelins, Throwing Spears, Light Armor and Shields.",
      },
    ],
  },
  {
    name: "Skink Braves",
    stats: {
      move: 7,
      fight: "+1",
      shoot: "0",
      armour: 12,
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
        description: "Dagger, Shield",
      },
    ],
  },
  {
    name: "Saurus Braves",
    stats: {
      move: 5,
      fight: "+3",
      shoot: "0",
      armour: "12 (13)",
      will: "+1",
      health: 14,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Crushing Bite",
        description:
          "The Saurus have a humongous jaw that can tear enemies and crush armour. The Saurus have Opponent armour Reduction due to using their bites alongside their weapons.",
      },
      {
        name: "Reptilian Ancestry",
        description: "The Saurus Brave has Amphibian.",
      },
      {
        name: "Equipment",
        description: "Hand weapon and Shield OR Two-Handed Weapon.",
      },
    ],
  },
  {
    name: "Skink Hunters",
    stats: {
      move: 7,
      fight: "0",
      shoot: "0",
      armour: 12,
      will: "0",
      health: 12,
      cost: "25gc",
    },
    abilities: [
      {
        name: "Reptilian Ancestry",
        description: "The Skink Braves have Amphibian.",
      },
      {
        name: "Equipment",
        description: "Javelins, Light Armor",
      },
    ],
  },
  {
    name: "Crestwarrior",
    role: "Specialist",
    stats: {
      move: 7,
      fight: "+2",
      shoot: "+2",
      armour: 12,
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
        description: "Javelin, Light Armour.",
      },
    ],
  },
  {
    name: "Chameleon Blowdarter",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "-1",
      shoot: "+4",
      armour: 11,
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
      armour: 15,
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

const totemicPowers = [
  {
    name: "Fury of Xlatax, the Crocodile Ancient",
    effect:
      'The Totem Warrior gains the Latch-on trait. Additionally, whenever a creature moves within 3" of him, he may, as a free action, move up to 3" and enter combat with that creature.',
  },
  {
    name: "Fury of Zatal, the Emerald Serpent",
    effect:
      'The Totem Warrior may, as a special action, make a 3" ranged Shooting Attack using his Fight stat that has the Poisonous trait. If he wins the roll by more than 5, he may move the target up to 3" toward him. If this brings the target into contact, he may use any remaining actions to fight it.',
  },
  {
    name: "Fury of Huanchi, the Horned Stalker",
    effect:
      "The Totem Warrior gains the Horns trait and may move through figures and terrain, but only if he ends his move in combat.",
  },
  {
    name: "Fury of Tepok, the Sky Raptor",
    effect:
      'The Totem Warrior gains +2 Fight against Shooting Attacks. Additionally, whenever he is targeted by a Shooting Attack (including spells), he may move 3" toward the attacker.',
  },
  {
    name: "Fury of the Mirrorscale",
    effect:
      "Any spell cast upon the Totem Warrior that he resists with a successful Fight or Will Roll is reflected back upon the caster. The original caster becomes the new target of the spell and must resolve any rolls required.",
  },
  {
    name: "Fury of Chotec, the Magma Maw",
    effect:
      "The Totem Warrior gains the Burning Touch, Melt Weapon, Automatic Damage, Elemental Blast, and Elemental Resistance (5) traits. All his attacks count as Elemental Damage.",
  },
  {
    name: "Fury of Tlazcotl, the Monarch Unyielding",
    effect:
      "Any figure that attempts to move within 3\" of the Totem Warrior must make a Will Roll (TN = 10 + Totem Warrior's Will). If failed, their movement immediately ends. They may take other actions but cannot approach closer until their next activation.",
  },
  {
    name: "Fury of the Prowlscale",
    effect:
      "The Totem Warrior becomes a master of pack hunting and flanking. If he attacks a figure while supported by an ally, the first supporting figure grants +4 Fight instead of +2. Further supporters add the usual +2.",
  },
  {
    name: "Fury of Kroxgor, the Ironback",
    effect:
      'The Totem Warrior\'s Armor is treated as 3 points higher (to a maximum of 16). Enemies may choose to "aim for weak spots" when attacking, suffering –2 Fight or –2 Shoot, but treating Armor as normal if they hit.',
  },
  {
    name: "Fury of Sotek's Spawn",
    effect:
      'The Totem Warrior spits acid at the nearest enemy within 6" and line of sight as a free action. This counts as a normal shooting attack that deals +2 Damage and ignores 1 point of Armor. If no enemies are within range, this action is lost.',
  },
  {
    name: "Fury of the Twin Snapjaw",
    effect:
      "The Totem Warrior excels at fighting multiple foes. Any figure in combat with him counts as having one fewer supporting figure (to a minimum of 0).",
  },
  {
    name: "Fury of the Giant Gecko",
    effect:
      'The Totem Warrior gains the Expert Climber trait. When determining falling damage, reduce the fall distance by 2" (so he may fall 5" before taking damage).',
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
      "Blowpipes are deadly tools in the hands of Skinks, delivering poisoned darts that can incapacitate even heavily armored foes. While the damage is reduced, the poison effect makes them particularly effective against targets that rely on high health pools rather than armour.",
  },
];

function LizardmenPage() {
  const navigate = useNavigate();

  const units = lizardmenUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const totemicPowersSections = totemicPowers.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Totemic Power",
  }));

  const equipment = lizardmenEquipment.map((item) => ({
    id: slugify(item.name, { lower: true }),
    label: item.name,
    type: "Equipment",
  }));

  const sections = [...units, ...totemicPowersSections, ...equipment];

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

          <div id="totemic-powers">
            <PowerListTitle>Totemic Powers</PowerListTitle>
            {totemicPowers.map((power, index) => (
              <div key={index} id={slugify(power.name, { lower: true })}>
                <TotemicPowerCard name={power.name} effect={power.effect} />
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
