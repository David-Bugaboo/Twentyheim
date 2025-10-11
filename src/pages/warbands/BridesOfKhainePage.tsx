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

const bridesUnits = [
  {
    name: "Hag Queen",
    role: "Hero",
    stats: {
      move: 8,
      fight: "+1",
      shoot: "0",
      armour: 9,
      will: "+4",
      health: 14,
      cost: "-",
    },
    spellAffinity: {
      aligned0: ["Witch"],
      aligned2: ["Soothsayer", "Spiritualist", "Fatecaster", "Illusionist"],
      neutral4: ["Enchanter", "Summoner", "Elementalist"],
      opposed6: ["Sigilist", "Chronomancer"],
      anathema: ["Thaumaturge", "Necromancer", "Astromancer"],
    },
    abilities: [
      {
        name: "Spiritual Leader",
        description:
          "Any figure that activates along with this figure during the Hero's phase can use the Hag Queen's Will stat instead of its own.",
      },
      {
        name: "Blessed by Khaine",
        description:
          "The Hag Queen is a spellcaster, and may cast spells from the Soothsayer, Witch, Spiritualist, Fatecaster and Illusion Schools.",
      },
      {
        name: "Witchbrew",
        description:
          "As long as the Hag Queen is on the battlefield, every model on the warband's starts with a vial of Witchbrew. This vial do not spend an item slot. A Bride can drink this vial to gain an extra action. This may not take a model to more than 3 actions per turn. If the Bride does not cause damage in a turn in which she consumed the witchbrew, she takes 5 damage.",
      },
      {
        name: "Equipment",
        description:
          "The Hag Queen may start with and equip daggers, staffs, and the warband's exclusive Sacrificial Dagger.",
      },
    ],
  },
  {
    name: "Slaughter Queen",
    role: "Champion",
    stats: {
      move: 8,
      fight: "+3",
      shoot: "0",
      armour: 9,
      will: "+3",
      health: 14,
      cost: "-",
    },
    abilities: [
      {
        name: "Khaine's Torturer",
        description:
          "The Slaughter Queen may use powers from the Whispers of Pain. She starts the game with 5 powers from that list. One of these powers is her signature Whisper, and have an activation number of 5. The others have an activation number of 8.",
      },
      {
        name: "Equipment",
        description:
          "The Hag Queen may start with and equip daggers, hand weapons, light armour and the warband's exclusive Sacrificial Dagger.",
      },
    ],
  },
  {
    name: "Blood Sister",
    stats: {
      move: 8,
      fight: "+2",
      shoot: "0",
      armour: 9,
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
    name: "Slaughter Sister",
    stats: {
      move: 8,
      fight: "+4",
      shoot: "0",
      armour: 10,
      will: "0",
      health: 10,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon, Sacrificial Dagger, Light armour",
      },
    ],
  },
  {
    name: "Witch Elf",
    stats: {
      move: 8,
      fight: "+3",
      shoot: "0",
      armour: 10,
      will: "0",
      health: 10,
      cost: "90gc",
    },
    abilities: [
      {
        name: "Tongue of pain",
        description:
          'Witch Elves may fight with enemy figures up to 1.5" away. In this case, the enemy figure have a -2 to it\'s fight stat. She may also force combat from a range of 1.5".',
      },
      {
        name: "Equipment",
        description: "Hand Weapon, Sacrificial Dagger, Light armour",
      },
    ],
  },
  {
    name: "Beastmaster Sister",
    role: "Specialist",
    stats: {
      move: 8,
      fight: "+3",
      shoot: "0",
      armour: 10,
      will: "+1",
      health: 12,
      cost: "125gc",
    },
    abilities: [
      {
        name: "Cold One Tamer",
        description:
          "For each Beastmaster Sister on the Battlefield, this warband may hire two Cold One Beasthounds. The beasthounds leave the warband immediately if their associated Beastmaster Sister dies.",
      },
      {
        name: "Equipment",
        description: "Hand Weapon, Sacrificial Dagger, Light armour",
      },
    ],
  },
  {
    name: "Khinerai Heartrenders",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "+2",
      shoot: "0",
      armour: 9,
      will: "+1",
      health: 12,
      cost: "125gc",
    },
    abilities: [
      {
        name: "Winged Torturers",
        description:
          "Khinerai Heartrenders have the Flying trait. If the Khinerai Heartrender moves and fights in the same activation, it gains +2 Fight for that activation only. She cannot choose to stay in combat when this ability is used.",
      },
      {
        name: "Equipment",
        description: "Hand Weapon, Sacrificial Dagger",
      },
    ],
  },
  {
    name: "Cold One Beasthound",
    stats: {
      move: 8,
      fight: "+3",
      shoot: "0",
      armour: 12,
      will: "+2",
      health: 12,
      cost: "25gc",
    },
    abilities: [
      {
        name: "Wicked Loyalty",
        description:
          'Cold One Beasthounds that do not activate within 6" of a Beastmaster Sister act as uncontrolled creatures. They remain as such until the end of the game. Cold One Beasthounds may not use the Spiritual Leader ability of the Hag Queen; their only loyalty is to the beastmaster.',
      },
    ],
  },
];

const bridesEquipment = [
  {
    name: "Sacrificial Dagger",
    description:
      "The Sacrificial Dagger is a hooked and cruel knife designed to flay skin with each strike. It count as a dagger, but scores critical hit with a roll 19 or 20 on any attack with it on the main hand or offhand.",
  },
];

const whispersOfPain = [
  {
    name: "Whisper of Torture",
    when: "Whenever the Slaughter Queen fights against an enemy figure that took at least 1 damage.",
    effect:
      "The creature rolls that fight not with it's Fight stat, but with it's Will stat.",
  },
  {
    name: "Whisper of Lashing",
    when: "At any point during the Slaughter Queen activation.",
    effect:
      'The Slaughter Queen chooses a creature within 3" of her. As an action, she makes a fight roll opposed by that figure\'s fight roll. If she wins the roll, the figure is moved up to 3" in her direction. She may use that movement to make the target figure enters combat with her. If she does it, she may then fight with her remaining action.',
  },
  {
    name: "Whisper of Toxicity",
    when: "At any point during the Slaughter Queen activation.",
    effect:
      "Until the start of her next activation, the Slaughter Queen gains the Poison trait.",
  },
  {
    name: "Whisper of Exsanguination",
    when: "Whenever the Slaughter Queen wins a Fight and causes at least 1 damage.",
    effect:
      "The creature gains a bleed token. A creature with a bleed token takes 2 damage whenever it moves or take damage. If the creature already has a bleed token, it takes 1 extra damage.",
  },
  {
    name: "Whisper of Submission",
    when: "Whenever an enemy figure tries to move into combat with the Slaughter Queen.",
    effect:
      'That figure must make a Will Roll with a Target Number of 16 to complete its movement. If it fails, its movement ends 1" from the Slaughter Queen and its activation ends, any unused actions are lost. Whisper of Submission cannot be used against Heroes and Champions.',
  },
  {
    name: "Whisper of Flaying",
    when: "Whenever the Slaughter Queen wins a Fight and causes at least 1 damage.",
    effect:
      "The enemy figure loses 1 armour until the end of the game. This power cannot take a figure to less than 6 armour.",
  },
  {
    name: "Whisper of Slaughter",
    when: "Whenever the Slaughter Queen wins a Fight and causes at least 1 damage.",
    effect:
      'The Slaughter Queen may immediately move 4", including out of combat. She can enter combat with another creature during this movement. If she does so, or stays in combat with the target of this power, she gains an extra action. This action can only be used to attack. This power cannot take a creature to over 3 actions.',
  },
  {
    name: "Whisper of Broken Minds",
    when: "At any point during the Slaughter Queen activation.",
    effect:
      'Choose any figure within 6". That figure should make an immediate Will Roll with a Target Number of 16. If it fails, the figure loses its next activation, but is otherwise unharmed. Heroes and Champions receive +5 on this Will Roll.',
  },
  {
    name: "Whisper of Punishment",
    when: 'Whenever a figure moves within 3" of the Slaughter Queen, with no figures between them.',
    effect:
      'The Slaughter Queen may force combat with the moving figure. This ability can only be used against a figure with which the Slaughter Queen would normally be allowed to force combat were it within 1". No other figure may force combat with the Slaughter Queen or the target figure while Whisper of Punishment is in effect.',
  },
  {
    name: "Whisper of Rapture",
    when: "At any point during the Slaughter Queen activation.",
    effect:
      "The Slaughter Queen may move through terrain and figures as if they were not there. However, she cannot end movement within a piece of terrain of creature. If she moves through a creature, that creature takes 2 damage. A creature can only take damage due to this cause once per turn.",
  },
  {
    name: "Whisper of Sacrifice",
    when: "At any point during the Slaughter Queen activation.",
    effect:
      "The Slaughter Queen gains +2 Damage and +2 Move, but her armour is set to 8 until the start of her next activation.",
  },
  {
    name: "Whisper of Torn Flesh",
    when: "At any point the Slaughter Queen wins a fight with a roll of 18, 19 or 20.",
    effect: "Treat this hit as a critical hit.",
  },
];

function BridesOfKhainePage() {
  const navigate = useNavigate();

  const units = bridesUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const equipment = bridesEquipment.map((item) => ({
    id: slugify(item.name, { lower: true }),
    label: item.name,
    type: "Equipment",
  }));

  const whispers = whispersOfPain.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Whisper",
  }));

  const sections = [...units, ...equipment, ...whispers];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Brides of Khaine" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {bridesUnits.map((unit, index) => (
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

          <div id="equipment">
            <PowerListTitle>Special Equipment</PowerListTitle>
            {bridesEquipment.map((item, index) => (
              <div key={index} id={slugify(item.name, { lower: true })}>
                <EquipmentCard
                  name={item.name}
                  description={item.description}
                />
              </div>
            ))}
          </div>

          <div id="whispers">
            <PowerListTitle>Whispers of Pain</PowerListTitle>

            <ParchmentText>
              The Whispers of Pain are the dark teachings of Khaine, the God of
              Murder, channeled through the Slaughter Queen. These powers embody{" "}
              <strong>
                sadistic combat mastery, psychological warfare, and relentless
                bloodshed
              </strong>
              . Each Whisper represents a technique of torture and domination,
              designed to break the will and body of enemies.
              <br />
              <br />
              From inflicting bleeding wounds to forcing enemies into
              submission, the Whispers make the Slaughter Queen a terrifying
              force on the battlefield. The identity emphasizes{" "}
              <strong>
                aggressive mobility, damage over time effects, and mental
                domination
              </strong>
              , turning every activation into a dance of death that grows
              deadlier with each strike.
              <br />
              <br />
              In short, the Whispers of Pain are designed to make the Slaughter
              Queen feel like{" "}
              <strong>Khaine's chosen instrument of murder</strong> — a
              whirlwind of blades and screams that leaves only blood and broken
              minds in her wake.
            </ParchmentText>

            {whispersOfPain.map((power, index) => (
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

export default BridesOfKhainePage;
