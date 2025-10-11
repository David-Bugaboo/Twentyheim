import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
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

const witchHuntersUnits = [
  {
    name: "Inquisitor",
    role: "Hero",
    stats: {
      move: 6,
      fight: "+3",
      shoot: "+2",
      armour: 10,
      will: "+5",
      health: 16,
      cost: "-",
    },
    abilities: [
      {
        name: "Inquisition Captain",
        description:
          "Any figure that activates along with this figure during the Hero's Phase can use the Leader's Will stat instead of its own.",
      },
      {
        name: "Inquisition Edicts",
        description:
          "The Inquisitor starts with 5 powers from the Inquisition Edicts List. One of these powers is his signature Edict and has an activation number of 3. The rest of the powers have an activation number of 5.",
      },
      {
        name: "Burn the Witch!",
        description:
          "Inquisitor has +1 Fight and the Burning Touch trait against any figures that can cast spells.",
      },
      {
        name: "Equipment",
        description:
          "The inquisitor may start with and can equip pistols, torches, hand weapons, hand crossbows, crossbows, handguns and light armour. They start with a Holy Relic, and regain one each game as long as there is a Warrior Priest of Sigmar in the Warband.",
      },
    ],
  },
  {
    name: "Warrior Priest of Sigmar",
    role: "Champion",
    stats: {
      move: 6,
      fight: "+2",
      shoot: "+0",
      armour: 10,
      will: "+4",
      health: 14,
      cost: "100gc",
    },
    spellAffinity: {
      aligned0: ["Thaumaturge"],
    },
    abilities: [
      {
        name: "Priest",
        description:
          "The Warrior Priest of Sigmar is a priest, and has a very limited selection of spells compared to other spellcasters. However, it may cast while using armors and shields, cast in combat, and its spells aren't considered spells for magic resistance effects. The Priest casts at a -4 Casting Roll. The priest starts with 2 spells from the Thaumaturge school and the Elemental Hammer spell.",
      },
      {
        name: "Equipment",
        description:
          "The priest may equip hand weapons, two-handed weapons, shields, Light and Heavy armour. The priest starts with a Holy Water Vial and regains it at the start of each game.",
      },
    ],
  },
  {
    name: "Zealot",
    stats: {
      move: 6,
      fight: "+1",
      shoot: "+0",
      armour: 10,
      will: "+1",
      health: 10,
      cost: "Free",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon.",
      },
    ],
  },
  {
    name: "Warhound",
    stats: {
      move: 8,
      fight: "+1",
      shoot: "+0",
      armour: 10,
      will: "0",
      health: 8,
      cost: "10gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "None. Warhounds attack with their teeth and claws.",
      },
      {
        name: "Trained Battlehound",
        description: "The warhound has Animal.",
      },
    ],
  },
  {
    name: "Witch Hunter",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "+3",
      shoot: "+2",
      armour: 11,
      will: "+2",
      health: 12,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Burn the Witch!",
        description:
          "Witch Hunters have +1 damage, +1 Fight, and attacks count as elemental damage against spellcasters of any kind.",
      },
      {
        name: "Equipment",
        description: "Pistol and Hand Weapon OR Musket, Light armour",
      },
    ],
  },
  {
    name: "Flagellant",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "+4",
      shoot: "+0",
      armour: 10,
      will: "+4",
      health: 12,
      cost: "125gc",
    },
    abilities: [
      {
        name: "Fanatical",
        description:
          "Flagellants have the Mind Lock trait, and is Immune to Fear.",
      },
      {
        name: "Equipment",
        description: "Two-Handed Weapon",
      },
    ],
  },
];

const inquisitionEdicts = [
  {
    name: "Edict of Condemnation",
    when: "At any point during the Inquisitor's activation.",
    effect: `The Inquisitor may choose any figure within line of sight. Until the end of the turn, that figure gains Bounty(X), with X being its base value. Leaders are worth 100gp. Allied figures have +1 Fight against that creature while this effect lasts.`,
  },
  {
    name: "Edict of Tongue-cutting",
    when: "At any point during the Inquisitor's activation.",
    effect: `Enemy spellcasters within 6" of the Inquisitor make their Casting rolls at -4 until the end of the turn.`,
  },
  {
    name: "Edict of Witch Burning",
    when: "When the inquisitor deals at least 3 damage to a spellcaster.",
    effect: "The Spellcaster receives an Ablaze Token.",
  },
  {
    name: "Edict of the Twin Exorcism",
    when: "At any point during the Inquisitor's activation.",
    effect:
      "The Inquisitor receives an extra action. That action can only be used to attack with his offhand weapon, but using its damage values and without two weapon fighting rules.",
  },
  {
    name: "Edict of Accusation",
    when: "Whenever a figure tries to enter combat with the Inquisitor.",
    effect: `That figure must make a Will Roll with a Target Number equal to this power activation roll to complete its movement. If it fails, its movement ends 1" from the Inquisitor and its activation ends, any unused actions are lost. Edict of Accusation cannot be used against Heroes and Champions.`,
  },
  {
    name: "Edict of the Infallible Hunter",
    when: "Whenever the Inquisitor has hit a Shooting attack and rolled an unmodified 18 or 19 on the die.",
    effect: "Treat this hit as a critical hit.",
  },
  {
    name: "Edict of Fanaticism",
    when: "At any point during the Inquisitor Activation.",
    effect:
      "Choose one member of the warband that has been reduced to 0 Health during the game. That figure returns to the table, adjacent to the figure activating this power. The figure has 1 Health and counts as wounded (may only take one action instead of two). They are treated as a normal warband member in every other way. Any given figure may only be returned to the table once each game through the use of Edict of Fanaticism.",
  },
  {
    name: "Edict of Hatred",
    when: "At any point during the Inquisitor Activation.",
    effect:
      "Choose one Witch Hunter or Flagellant that can activate alongside the Inquisitor in the Hero's Phase. That figure gains a Hatred Token.",
  },
  {
    name: "Edict of Alacrity",
    when: "At any point during the Inquisitor Activation.",
    effect: `The Inquisitor may immediately move 2" in any direction, including out of combat. No figure may force combat during this move. The Inquisitor may enter combat with this movement but cannot exit the table using this move.`,
  },
  {
    name: "Edict of Confiscation",
    when: "At any point during the Inquisitor Activation.",
    effect: `This power targets a Wyrdstone Shard or a figure carrying such a token that is within 12". If the token is not being carried, the Inquisitor may move the Wyrdstone Shard token 4" in any direction. If a figure is carrying the token, then that figure must make a Will Roll (TN16). If failed, the Inquisitor may move the loot token up to 4" in any direction.`,
  },
  {
    name: "Edict of the Truce",
    when: "At any time the inquisitor wins a Hand to Hand combat, even if no damage is caused.",
    effect:
      "The Heritor inflicts no damage, but may instead choose one weapon carried by his enemy and disarm him of it. The disarmed figure loses the use of that weapon for the rest of the game, but recovers it for free after the game.",
  },
  {
    name: "Edict of Reprieval",
    when: "Whenever an Shooting Attack is made against the Inquisitor.",
    effect:
      'The Shooting Attack automatically misses, and the Shooter action is lost. If an enemy figure is within 3" of the Inquisitor, that creature takes the same Shooting Attack canceled by this power.',
  },
];

function WitchHuntersPage() {
  const navigate = useNavigate();

  const units = witchHuntersUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const edicts = inquisitionEdicts.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Inquisition Edict",
  }));

  const sections = [...units, ...edicts];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Witch Hunters" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {witchHuntersUnits.map((unit, index) => (
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

          <div id="edicts">
            <PowerListTitle>Inquisition Edicts</PowerListTitle>

            <ParchmentText>
              The Inquisition Edicts are battlefield decrees that embody
              authority, zeal, and ruthless judgment. They are not mere tricks
              or tactics, but proclamations of faith and law that reshape the
              fight through fear, control, and fanatic conviction. Their design
              emphasizes{" "}
              <strong>
                targeted suppression, divine punishment, and the rallying of
                allies under uncompromising will
              </strong>
              .
              <br />
              <br />
              In short, the Inquisition Edicts are designed to transform the
              Inquisitor into a living embodiment of fanatic justice: a figure
              who bends allies and enemies alike to his unyielding vision,
              punishing heresy with fire, steel, and unbreakable will.
            </ParchmentText>

            {inquisitionEdicts.map((power, index) => (
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

export default WitchHuntersPage;
