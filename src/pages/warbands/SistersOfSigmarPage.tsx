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

const sistersUnits = [
  {
    name: "Sigmarite Matriarch",
    role: "Hero",
    stats: {
      move: 6,
      fight: "+3",
      shoot: "+0",
      armor: 10,
      will: "+4",
      health: 16,
      cost: "-",
    },
    abilities: [
      {
        name: "High Priestess",
        description:
          "The Sigmarite Matriarch is a High Priest, and has a very limited selection of spells compared to other spellcasters. However, she may cast while using armors and shields, and her spells aren't considered spells for magic resistance effects. The Priest casts at a -2 Casting Roll. The priest starts with 3 spells from the Thaumaturge school and the Elemental Hammer and Elemental Sphere spells.",
      },
      {
        name: "Equipment",
        description:
          "The Sigmarite Matriarch may equip hand weapons, two-handed weapons, shields, Light Armor, Heavy Armor and the warband's exclusive Sigmarite Warhammer. The Sigmarite Matriarch starts with a Holy Water Vial and regains it at the start of each game.",
      },
    ],
  },
  {
    name: "Augur",
    role: "Champion",
    stats: {
      move: 6,
      fight: "+1",
      shoot: "-",
      armor: 10,
      will: "+4",
      health: 14,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Words of Sigmar",
        description:
          "The Augur starts with 5 powers from the Words of Sigmar list. One of these powers is her signature Word and has an activation number of 5. The rest of the powers have an activation number of 8.",
      },
      {
        name: "Blessed Sight",
        description:
          "The Augur has the Truesight. She may also use her Blessed Sight to avoid problems while exploring. She may reroll her exploration roll.",
      },
      {
        name: "Equipment",
        description:
          "The Augur may only equip staffs, hand weapons, daggers and shields.",
      },
    ],
  },
  {
    name: "Novitiate Sisters",
    stats: {
      move: 5,
      fight: "+2",
      shoot: "0",
      armor: 11,
      will: "+1",
      health: 10,
      cost: "free",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon and Shield",
      },
    ],
  },
  {
    name: "Hospitalier Sister",
    stats: {
      move: 5,
      fight: "+1",
      shoot: "0",
      armor: 10,
      will: "+3",
      health: 12,
      cost: "75gp",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon and Shield",
      },
      {
        name: "Mercy",
        description:
          "Hospitalier Sisters start each game with a potion of healing. An Hospitalier Sister may spend an action to give a potion to a member of the same warband within 1”, provided neither are in combat. The figure receiving the potion counts as having drunk it, and effects are applied immediately. Note that this rule applies to any potion carried by an Hospitalier Sister, not just their free healing potion.",
      },
    ],
  },
  {
    name: "Chapel Guard Sister",
    stats: {
      move: 5,
      fight: "+3",
      shoot: "0",
      armor: 12,
      will: "+1",
      health: 12,
      cost: "75gp",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Two-Handed Weapon, Light Armor",
      },
    ],
  },
  {
    name: "Sister Superior",
    role: "Specialist",
    stats: {
      move: 5,
      fight: "+3",
      shoot: "0",
      armor: 13,
      will: "+2",
      health: 14,
      cost: "125gc",
    },
    abilities: [
      {
        name: "Destroyer of the Unclean",
        description:
          "The Sister Superior has +1 Fight and +1 Damage against figures with the Demon and Undead traits, and her attacks count as holy (count as magical, but ignore magical resistance) against such targets.",
      },
      {
        name: "Equipment",
        description: "Sigmarite Warhammer, Shield, Heavy Armor",
      },
    ],
  },
  {
    name: "Sigmarite Sister",
    role: "Specialist",
    stats: {
      move: 5,
      fight: "+4",
      shoot: "0",
      armor: "12 (13)",
      will: "+1",
      health: 12,
      cost: "125gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "Sigmarite Warhammer and Shield OR Two Handed Weapon, Heavy Armor.",
      },
    ],
  },
  {
    name: "Smiter Sister",
    role: "Specialist",
    stats: {
      move: 5,
      fight: "+2",
      shoot: "+2",
      armor: "12",
      will: "+1",
      health: 12,
      cost: "125gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "Sigmarite Warhammer, Hand Crossbow, Quiver, Heavy Armor.",
      },
    ],
  },
];

const sistersEquipment = [
  {
    name: "Sigmarite Warhammer",
    description:
      "This weapon counts as a Hand Weapon, but if it deals 5 or more damage, the target gains a Stun Token.",
    notes:
      "The Sigmarite Warhammer is a blessed weapon of the Sisters, capable of stunning even the most resilient foes. When struck with sufficient force, enemies find themselves dazed and unable to fully respond, giving the Sisters a crucial tactical advantage.",
  },
];

const wordsOfSigmar = [
  {
    name: "Word of Hexbane",
    when: `Whenever a spell targets the Augur or any Sister within 3" of the Augur.`,
    effect:
      "The spell automatically fails, with no Casting Roll made, and the caster's action is lost.",
  },
  {
    name: "Word of Guidance",
    when: "At any point during the Augur's Activation.",
    effect: `Place a Guidance Token next to a Sister within 12" of the Augur.`,
  },
  {
    name: "Word of Righteous Protection",
    when: `Whenever the Augur or a Sister within 3" of the Augur takes at least 5 damage.`,
    effect:
      "Reduce that damage by 5. If the damage is reduced to 0, any effects from that attack are also negated.",
  },
  {
    name: "Word of Solace",
    when: `Anytime the Augur or a Sister within 3" of the Augur makes a Will roll.`,
    effect: "Immediately add +5 to that Will roll.",
  },
  {
    name: "Word of Health",
    when: "Before the game.",
    effect:
      "The Augur regains up to 3 points of lost Health, and any tokens (Bleed, Echo and etc) are removed.",
  },
  {
    name: "Word of the Bastion",
    when: 'At any point the Augur or a Sister within 3" of the Augur would be moved by an external force.',
    effect:
      "The Augur may choose to either not move, or to move any distance up to the amount normally specified by the external force.",
  },
  {
    name: "Word of the Blessed Warrior",
    when: `At any point during the Augur's activation.`,
    effect: `For the rest of the turn, the Augur or a Sister within 6" of the Augur counts as if she is armed with a magic weapon which gives her +2 Fight. If the Augur is already using a magic or superior weapon, this effect replaces any Fight bonuses from that weapon, although damage bonuses and other special abilities are retained.`,
  },
  {
    name: "Word of the Holy Wrath",
    when: `When the Augur or another Sister within 3" of the Augur wins a Fight and deals damage.`,
    effect:
      "That attack counts the Enemy Armor as 4 points lower when calculating damage. If the weapon used was a Sigmarite Warhammer, it always causes it's special effect irrespective of how much damage was actually caused.",
  },
  {
    name: "Word of the Unescapable Fate",
    when: `Whenever the Augur or any Sister within 3" fails any dice roll.`,
    effect:
      "Reroll the failed roll, but throw two dice instead and take the higher roll. If a 1 is rolled on both dice, this figure takes 10 points of damage.",
  },
  {
    name: "Word of the Prosperity",
    when: "Out of game, when the warband rolls for its treasures.",
    effect:
      "The warband may roll two dice and choose which one to keep when making the first roll to determine what treasure has been found.",
  },
  {
    name: "Word of the Heavenly Vision",
    when: "At any point during the Augur's activation.",
    effect: `A sister within 12" of the Augur gains Truesight until the first time she Fights or Make a Shooting Attack or until the end of the turn, whichever comes first.`,
  },
  {
    name: "Word of Stormblood",
    when: "At the Start of Champion's phase, before any actions are taken.",
    effect:
      "Any sisters that activate during the champion phase gain Elemental Resistance(5) until the first elemental attack they take or until the end of the turn, whichever comes first.",
  },
];

function SistersOfSigmarPage() {
  const navigate = useNavigate();

  const units = sistersUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const equipment = sistersEquipment.map((item) => ({
    id: slugify(item.name, { lower: true }),
    label: item.name,
    type: "Equipment",
  }));

  const words = wordsOfSigmar.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Word",
  }));

  const sections = [...units, ...equipment, ...words];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Sisters of Sigmar" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {sistersUnits.map((unit, index) => (
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
            {sistersEquipment.map((item, index) => (
              <div key={index} id={slugify(item.name, { lower: true })}>
                <EquipmentCard
                  name={item.name}
                  description={item.description}
                  notes={item.notes}
                />
              </div>
            ))}
          </div>

          <div id="words">
            <PowerListTitle>Words of Sigmar</PowerListTitle>

            <ParchmentText>
              The Words of Sigmar are holy invocations spoken by the Augur,
              transforming divine authority into direct blessings, protections,
              and punishments. Their design emphasizes{" "}
              <strong>
                faith as a shield, destiny as a weapon, and divine voice as the
                bridge between mortal and sacred
              </strong>
              . Mechanically, they focus on protection, rerolls, and situational
              empowerment, ensuring that the Sisters endure longer, strike
              harder, and resist the forces of corruption.
              <br />
              <br />
              In short, the Words of Sigmar are designed to make the Augur feel
              like the sacred mouthpiece of divine will — a leader whose spoken
              blessings protect her flock and whose wrathful proclamations smite
              the enemies of the faith.
            </ParchmentText>

            {wordsOfSigmar.map((power, index) => (
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

export default SistersOfSigmarPage;
