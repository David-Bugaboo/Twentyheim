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

const skavenUnits = [
  {
    name: "Assassin",
    role: "Hero",
    stats: {
      move: 8,
      fight: "+3",
      shoot: "+1",
      armor: 10,
      will: "+3",
      health: 14,
      cost: "-",
    },
    abilities: [
      {
        name: "Shadow Lord",
        description:
          "Any figure that activates along with this figure during the Hero's Phase can use the Figure's Will stat instead of its own.",
      },
      {
        name: "Fangs of the Horned Rat",
        description:
          "Any figure damaged by an assassin's attack is poisoned and is reduced to one standard action per activation until healed through the use of a Heal spell or Healing potion or until the game ends. Undead and constructs are immune to poison. Furthermore, assassins gain an additional +2 to their Fight if they are already receiving a bonus from one or more supporting figures. However, assassins themselves never count as a supporting figure for anyone else, even members of their own warband and other assassins.",
      },
      {
        name: "Clan Eshin Martial Arts",
        description:
          "The Assassin starts with 5 powers from the Clan Eshin Martial Arts list. One of these powers is his signature Martial Art and has an activation number of 3. The rest of the powers have an activation number of 5.",
      },
      {
        name: "Equipment",
        description:
          "Assassins can equip and start with Daggers, Hand Weapons, Light Armor, Slings and Hand Crossbows. They can also start with the Skaven exclusive Fighting Claws.",
      },
    ],
  },
  {
    name: "Clan Eshin Sorcerer",
    role: "Champion",
    stats: {
      move: 8,
      fight: "-1",
      shoot: "+0",
      armor: 10,
      will: "+3",
      health: 12,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Apprentice Spellcaster",
        description:
          "Clan Eshin Sorcerers may cast spells from the Elementalist, Witch and Summoner schools of magic. The figure starts the game with 4 such spells, and always casts them at a -2 Casting roll.",
        spellAffinity: "clanEshinSorcerer",
      },
      {
        name: "Equipment",
        description:
          "A Clan Eshin Sorcerer may start with and equip: Daggers, Staffs and Hand Crossbows.",
      },
    ],
  },
  {
    name: "Clan Rats",
    stats: {
      move: 8,
      fight: "-1",
      shoot: "0",
      armor: 10,
      will: "0",
      health: 8,
      cost: "Free",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Dagger, Sling",
      },
    ],
  },
  {
    name: "Giant Rat",
    stats: {
      move: 6,
      fight: "0",
      shoot: "0",
      armor: 6,
      will: "0",
      health: 1,
      cost: "Free",
    },
    abilities: [
      {
        name: "Equipment",
        description: "None. Giant Rats attack with their yellowed fangs only.",
      },
      {
        name: "Sewer's Beast",
        description: "Giant rats have the Animal and Pack Hunter traits.",
      },
    ],
  },
  {
    name: "Black Skaven",
    role: "Specialist",
    stats: {
      move: 8,
      fight: "+4",
      shoot: "+0",
      armor: 10,
      will: "+2",
      health: 10,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Light Armor, Skaven Fighting Claws",
      },
    ],
  },
  {
    name: "Night Runners",
    role: "Specialist",
    stats: {
      move: 8,
      fight: "1",
      shoot: "1",
      armor: 10,
      will: "0",
      health: 10,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Dagger, Hand Crossbow",
      },
      {
        name: "Wall Running",
        description: `A Night Runner never suffers a movement penalty for climbing and receives +5 to any Stat Roll that is made for the purpose of climbing. Furthermore, any time a Night Runner falls, treat the distance as 2" less than it actually is for the purpose of determining damage.`,
      },
    ],
  },
  {
    name: "Rat Ogre",
    stats: {
      move: 7,
      fight: "+4",
      shoot: "0",
      armor: 12,
      will: "0",
      health: 16,
      cost: "200gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Jaws, claws and brute force!",
      },
      {
        name: "Moulder's Monstrosity",
        description: "Rat Ogres have Large, Strong, Animal and Fear.",
      },
      {
        name: "Meat Wall",
        description:
          "Ranged Attackers cannot make Shooting attacks against other Skaven figures if the Rat Ogre is the closest model.",
      },
    ],
  },
];

const skavenEquipment = [
  {
    name: "Skaven Fighting Claws",
    description:
      "Skaven Fighting Claws count as if the user is using two daggers (+1 to fight due to Two Weapon Fighting rules and -1 damage) and occupies both its hands. Figures equipped with Skaven Fighting Claws can climb with no movement penalties.",
  },
];

const clanEshinMartialArts = [
  {
    name: "Shadow Step Style",
    when: "At the start of the Assassin's activation.",
    effect:
      "during his next movement action only the Assassin may move through terrain as if it was not there, but cannot end his movement while still through a piece of terrain.",
  },
  {
    name: "Night Stalker Style",
    when: "Any time the Assassin is named as the target of a shooting attack from a figure. Additionally, the Assassin must either be in cover, or there must be intervening terrain between the shooter and the Assassin.",
    effect:
      "The shot automatically misses without any shooting rolls being made. This ability may not be used while the Assassin is in combat. It does apply to shooting attacks caused by Spells.",
  },
  {
    name: "Black Hunger Style",
    when: "Whenever the Assassin has won a combat and rolled an unmodified 18 or 19 on the die (before any modifiers are taken into account).",
    effect: "Treat this hit as a critical hit.",
  },
  {
    name: "Dashing Rat Style",
    when: "During the Assassin's Activation.",
    effect:
      "During his next movement action only, the Assassin receives +4 to his Move and takes no falling damage.",
  },
  {
    name: "Wyrdblade Style",
    when: "At the start of an Assassin's activation before any actions are taken.",
    effect: `For the rest of the turn, the Assassin counts as if he is armed with a magic weapon which gives him +2 Fight. If the Assassin is already using a magic or superior weapon, this effect replaces any Fight bonuses from that weapon, although damage bonuses and other special abilities are retained.`,
  },
  {
    name: "Chittering Arrow Style",
    when: "At any point the Assassin makes a Shooting Attack.",
    effect:
      "No modifiers for cover or intervening terrain are applied to the shot. The Assassin must still have line of sight in order to declare the shot.",
  },
  {
    name: "Flying Death Style",
    when: "At any point during the Assassin's activation.",
    effect: `The Assassin can use an action to make a 'Leap' move instead of a normal move. In a Leap, the Assassin may move up to his full movement allowance in a straight line, in any direction (including straight upwards), provided that line is free of obstacles. If this move ends with the Assassin in the air, immediately move it back down to the table and take falling damage as appropriate. Leap may not be used while an Assassin is in combat. Alternatively, an Assassin may combine two actions to make one Leap of up to 1.5 times his Move.`,
  },
  {
    name: "God's Horn Style",
    when: "At any point during the Assassin's activation.",
    effect:
      "The next time this figure makes a Shooting attack with a hand crossbow or pistol, the shot does +3 Damage. This is cumulative with other damage modifiers for the weapon.",
  },
  {
    name: "Swarm of Stings Style",
    when: "At any point during the Assassin's activation.",
    effect:
      "The Assassin receives an extra action. This extra action cannot be movement (so the Assassin can take a maximum of two movement actions during his turn). This may not take the Assassin above three actions.",
  },
  {
    name: "Hungry Hands Style",
    when: "At any point during the Assassin's activation.",
    effect: `This power may only be used against a soldier carrying a Wyrdstone Shard within 2" of the Assassin. That figure must make an immediate Fight Roll  with a target number equal to this power activation roll. If failed, the figure immediately drops the loot token and the Assassin may move it up to 4" in any direction and pick up the Wyrdstone Shard.`,
  },
  {
    name: "Horned Wraith Style",
    when: "At any point during the Assassin's activation.",
    effect: `No figure may draw line of sight to this figure if it is more than 12" away and it gains +2 Fight when rolling against Shooting attacks until hit by a shooting attack or until the end of the turn, whichever comes first.`,
  },
  {
    name: "Void Killer Style",
    when: "At any point during the Assassin's activation.",
    effect: `As an action, the assassin is removed from the table. Then, during its next activation, as an action, it may be positioned at any point that is not within 8" of an enemy figure and outside of every enemy figure's line of sight. If an enemy figure is outside of line of sight of every allied figure, the Assassin may be setup in combat with it.`,
  },
];

function SkavenPage() {
  const navigate = useNavigate();

  const units = skavenUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const equipment = skavenEquipment.map((item) => ({
    id: slugify(item.name, { lower: true }),
    label: item.name,
    type: "Equipment",
  }));

  const martialArts = clanEshinMartialArts.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Clan Eshin Martial Art",
  }));

  const sections = [...units, ...equipment, ...martialArts];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Skaven of Clan Eshin" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {skavenUnits.map((unit, index) => (
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
            {skavenEquipment.map((item, index) => (
              <div key={index} id={slugify(item.name, { lower: true })}>
                <EquipmentCard
                  name={item.name}
                  description={item.description}
                />
              </div>
            ))}
          </div>

          <div id="martialarts">
            <PowerListTitle>Clan Eshin Martial Arts</PowerListTitle>

            <ParchmentText>
              The Clan Eshin styles are designed as a toolkit of deadly
              disciplines for assassins, each representing a secret technique
              that twists the flow of battle in their favor. Their design
              identity is rooted in{" "}
              <strong>mobility, deception, and surgical lethality</strong>
              . Instead of granting broad or constant advantages, they deliver
              sharp, situational bursts of power that allow the assassin to
              dictate when and how engagements occur.
              <br />
              <br />
              In short, the Clan Eshin Martial Arts are designed to make the
              assassin feel like an unpredictable blade in the dark: elusive,
              precise, and terrifying when unleashed at the right moment.
            </ParchmentText>

            {clanEshinMartialArts.map((power, index) => (
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

export default SkavenPage;
