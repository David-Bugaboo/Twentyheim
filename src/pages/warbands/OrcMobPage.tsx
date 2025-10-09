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

const orcMobUnits = [
  {
    name: "Orc Warboz",
    role: "Hero",
    stats: {
      move: 5,
      fight: "+4",
      shoot: "0",
      armor: 10,
      will: "+2",
      health: 18,
      cost: "-",
    },
    abilities: [
      {
        name: "Warboz",
        description:
          "Any figure that activates along with this figure during the Hero's Phase can use the Captain's Will stat instead of its own.",
      },
      {
        name: "Da Biggest n' Da Baddest",
        description: "The Orc Warboz has the Strong and Large traits.",
      },
      {
        name: "Krumpin's of the Waaaaagh!",
        description:
          "The Orc Warboz starts with 5 powers from the Krumpin's of the Waaaaagh list. One power is his signature Krumpin' and has an activation power of 3. The others have an activation power of 5.",
      },
      {
        name: "Equipment",
        description:
          "The Orc Warboz may equip Hand Weapons, Two-handed Weapons, Light Armors, Heavy Armors, Shields.",
      },
    ],
  },
  {
    name: "Orc Shaman",
    role: "Champion",
    stats: {
      move: 6,
      fight: "+1",
      shoot: "+0",
      armor: 10,
      will: "+4",
      health: 12,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Apprentice Spellcaster",
        description:
          "The Orc Shaman may cast spells from the Soothsayer, Elementalist and Distortionist schools of magic. The figure starts the game with 4 such spells, and always casts them with a -2 Casting roll.",
        spellAffinity: "orcShaman",
      },
      {
        name: "Equipment",
        description: "An Orc Shaman may only equip staffs.",
      },
    ],
  },
  {
    name: "Goblin Warriors",
    stats: {
      move: 8,
      fight: "0",
      shoot: "0",
      armor: 8,
      will: "-2",
      health: 4,
      cost: "Free",
    },
    abilities: [
      {
        name: "Riotous",
        description:
          "Goblin Warriors that didn't activate in the same phase as the Warboz or Orc Shaman act as uncontrolled creatures during the creature phase.",
      },
      {
        name: "Runts",
        description: "Goblins do not gain experience.",
      },
      {
        name: "Equipment",
        description: "dagger, sling",
      },
    ],
  },
  {
    name: "Orc Boyz",
    stats: {
      move: 4,
      fight: "+3",
      shoot: "+0",
      armor: "11",
      will: "+3",
      health: 16,
      cost: "50gc",
    },
    abilities: [
      {
        name: "Riotous",
        description:
          "Orc Boyz that didn't activate in the same phase as the Warboz or Orc Shaman act as uncontrolled creatures during the creature phase.",
      },
      {
        name: "Equipment",
        description: "2x Hand Weapons, Light Armor.",
      },
    ],
  },
  {
    name: "Orc Choppa Thrower",
    role: "Specialist",
    stats: {
      move: 4,
      fight: "+2",
      shoot: "0",
      armor: "11",
      will: "+3",
      health: 16,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Riotous",
        description:
          "Orc Boyz that didn't activate in the same phase as the Warboz or Orc Shaman act as uncontrolled creatures during the creature phase.",
      },
      
      {
        name: "Equipment",
        description: "Javelin, Light Armor.",
      },
    ],
  },
  {
    name: "Orc Nobz",
    role: "Specialist",
    stats: {
      move: 4,
      fight: "+4",
      shoot: "+0",
      armor: "12",
      will: "+3",
      health: 16,
      cost: "125gc",
    },
    abilities: [
      {
        name: "Born to Krump",
        description: "Orc Nobz have Strong.",
      },
      {
        name: "Riotous",
        description:
          "Orc Nobz that didn't activate in the same phase as the Warboz act as uncontrolled creatures during the creature phase.",
      },
      {
        name: "Equipment",
        description: "Two-Handed Weapon",
      },
    ],
  },
  {
    name: "Cave Squigs",
    role: "Specialist",
    stats: {
      move: "1d20/2",
      fight: "+2",
      shoot: "-",
      armor: 12,
      will: "0",
      health: 8,
      cost: "40gc",
    },
    abilities: [
      {
        name: "Bouncers",
        description: `Cave Squigs do not have a set Movement characteristic but move with an ungainly bouncing stride. To represent this, when moving Squigs, roll 1d20 and divide it by 2, rounding up for the distance they move (minimum 3"). Squigs may never take both actions as movement.`,
      },
      {
        name: "Riotous",
        description: `Squigs that aren't mounted by goblins or didn't activate along a Goblin Warrior act as uncontrolled creatures in the creature phase.`,
      },
      {
        name: "Cave Dweller",
        description: "Squigs have Animal.",
      },
      {
        name: "Runtsteed",
        description:
          "The Cave Squigs can be mounted by goblins. Follow the rules for mounts in Spellcaster Magazine #1. A goblin mounted in a Squig follows the Bouncer rule.",
      },
    ],
  },
  {
    name: "Goblin Fanatic",
    role: "Specialist",
    stats: {
      move: 8,
      fight: "+3",
      shoot: "-",
      armor: 8,
      will: "-2",
      health: 8,
      cost: "50gc",
    },
    abilities: [
      {
        name: "Mad Cap Mushrooms",
        description:
          "Goblin Fanatics are permanently under the influence of Mad Cap Mushrooms, which makes them feel no pain and gives them unnatural strength. They have Mind Lock and are immune to Fear.",
      },
      {
        name: "Whirling Dervish",
        description:
          "The Goblin Fanatic moves in a chaotic, spinning pattern. When activating, determine the direction of the movement in the same way an uncontrolled creature would. The Fanatic must move its full movement distance in that direction. The Fanatic must enter combat with any figure (enemy or ally) it touches during this movement. If the Fanatic collides with any terrain piece, it takes 5 damage but continues moving. The Fanatic cannot voluntarily stop until it has moved its full distance or is forced into combat.",
      },
      {
        name: "Ball and Chain",
        description:
          "The Goblin Fanatic is equipped with a massive ball and chain. This weapon is treated as a two-handed weapon that grants +4 damage. A figure equipped with a ball and chain may carry no other weapons or equipment.",
      },
      {
        name: "Unwieldy",
        description:
          "The great weight of the Ball and Chain can easily tear ligaments or pull the wielder's arms out of their sockets. While under the influence of Mad Cap Mushrooms the fanatic will not notice such effects, but when the drug wears off he will be in great pain. At the end of each battle, the controlling player must roll on the Soldier Survival Table for this model, just as if the model had been reduced to 0 health. If the model was reduced to 0 health normally during the game, just roll once on the Soldier Survival Table - there is no need to make a second roll.",
      },
      {
        name: "Riotous",
        description:
          "Goblin Fanatics that didn't activate in the same phase as the Warboz or Orc Shaman act as uncontrolled creatures during the creature phase.",
      },
      {
        name: "Equipment",
        description: "Ball and Chain (cannot equip anything else).",
      },
    ],
  },
  {
    name: "Troll",
    stats: {
      move: 4,
      fight: "+4",
      shoot: "+0",
      armor: 14,
      will: "+2",
      health: 18,
      cost: "200gc",
    },
    abilities: [
      {
        name: "Monstrous Beast",
        description: "Trolls have Large, Strong and Fear.",
      },
      {
        name: "Regeneration",
        description: `Trolls have Regeneration.`,
      },
      {
        name: "Equipment",
        description: "Two handed weapon.",
      },
    ],
  },
];

const krumpinsOfTheWaaaagh = [
  {
    name: "'Ere we go",
    when: "At the Start of Hero's phase, before any actions are taken.",
    effect:
      "The Boz and up to 3 Nobz or Boyz that activate during this phase are immune to Fear until the end of the turn.",
  },
  {
    name: "Mushroom 'Ide",
    when: "At any point during the Orc Boz activation Or Out of Game.",
    effect:
      "The Orc Boz may make one attempt to activate this power before each game. The Boz heals one permanent injury. If used during the game, the Boz recovers 5 health.",
  },
  {
    name: "Da Rock Lobba",
    when: "At any point during the Orc Boz activation.",
    effect: `The Orc Boz may spend an action to pick up a large rock, log, dead body etc, and hurl it at an enemy. The Boz may make a shooting attack with a maximum range of 8". This shooting attack is made with the Boz's Shoot stat. If the attack hits, it does +3 damage.`,
  },
  {
    name: "Brutal Kunnin'",
    when: "At any point during the Orc Boz Activation.",
    effect: `Choose an Orc Nobz or Orc Boy within 6". This figure may immediately activate and count as having activated alongside the Orc Boz for that activation.`,
  },
  {
    name: "Skull smasha",
    when: "Whenever the Warboz has won a combat and rolled either an unmodified 18 or 19 on the die.",
    effect:
      "Treat that hit as a critical hit. The figure hit may only use one action during its next activation.",
  },
  {
    name: "Da Armor Krusha'",
    when: "Whenever the Warboz has won a combat and dealt at least 5 damage.",
    effect:
      "If the target was wearing light armor, it suffers -1 Armor for the rest of the game. If it was wearing heavy armor it suffers -2 Armor for the rest of the game.",
  },
  {
    name: "Grabba' Chief",
    when: "At any point the Warboz fights with one or more figures.",
    effect: "The Warboz gains Latch-on for that fight only.",
  },
  {
    name: "Screamin' me Lungs Ou'",
    when: "At any point during the Warboz activation.",
    effect: `Any figures within 3" of the Warboz must roll Will against a target number equal to this power activation roll. Figures that fail can only use one action during their next activation.`,
  },
  {
    name: "Outa o' me way!",
    when: "At the beginning of a Warboz movement.",
    effect: `Choose a target enemy figure that the Warboz can move into combat with this turn. When moving towards that figure, Ignore any terrain and figures on the way, and no creature can force the Warboz into combat. If the Warboz walks through a figure, it may roll an opposed Fight check against that Figure. If that figure loses the roll, the Warboz may move it 3" in any direction, except outside of the table or into combat. The Warboz must finish the movement into combat with the target figure.`,
  },
  {
    name: "Da Bigga Arms",
    when: "Anytime the Warboz has made a Fight Stat Roll (Any Fight Roll with a Target Number).",
    effect:
      "Add +5 to the Warboz's roll. Alternatively, a Warboz may utilize this ability whenever he wins a combat to inflict +1 damage.",
  },
  {
    name: "Da Big Clobba'",
    when: "Any time the Warboz wins a fight in hand-to-hand combat.",
    effect:
      "The Warboz does an additional 3 points of damage on top of whatever damage he would normally inflict.",
  },
  {
    name: "WAAAAAAAAAGH!",
    when: "At the start of any turn, before rolling initiative, once per game.",
    effect:
      "Every Nob, Boy, Goblin and the Warboz himself gain +4 move, +2 Fight, +2 Damage, are immune to fear and have the Mind Lock trait until the end of the turn. The Warboz warband is the initiative winner irrespective of any rolls. Figures affected by the Waagh can only move towards enemies, and take 5 points of Damage if they do not enter combat during the turn. They cannot pick up wyrdstone shards. Every figure in the warband takes the Damage from activating this ability.",
  },
];

function OrcMobPage() {
  const navigate = useNavigate();

  const units = orcMobUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const krumpins = krumpinsOfTheWaaaagh.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Krumpin",
  }));

  const sections = [...units, ...krumpins];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Orc Mob" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {orcMobUnits.map((unit, index) => (
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

          <div id="krumpins">
            <PowerListTitle>Krumpin's of the Waaaaagh!</PowerListTitle>

            <ParchmentText>
              The Krumpin's of the Waaaaagh represent the brutal, unstoppable
              force of Orcish fury in combat. These powers embody the savage
              nature of Orks — raw strength, terrifying momentum, and the
              legendary Waaagh! itself that transforms the warband into an
              unstoppable green tide.
              <br />
              <br />
              From smashing armor to screaming enemies into submission, these
              abilities make the Warboz a devastating force that grows more
              dangerous as the battle intensifies. The ultimate expression of
              Orc power is the mighty WAAAAGH!, a once-per-game explosion of
              fury that can turn the tide of any battle.
            </ParchmentText>

            {krumpinsOfTheWaaaagh.map((power, index) => (
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

export default OrcMobPage;
