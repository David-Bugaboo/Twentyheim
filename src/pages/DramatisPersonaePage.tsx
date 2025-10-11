import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import UnitCard from "../components/UnitCard";
import slugify from "slugify";
import WarbandIndex from "../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  QuoteBox,
  QuoteAttribution,
} from "../components/PageComponents";



const dramatisPersonae = [
  {
    name: "Aenur, Sword of Twilight",
    stats: {
      move: 6,
      fight: "+6",
      shoot: "+2",
      armour: 14,
      will: "+4",
      health: 16,
      cost: "300gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "Ithilmar Two-Handed Weapon (+1 to Fight and count as magical weapon), Ithilmar armour (Heavy armour without -1 to Movement), Sea Dragon Cloak (+1 to armour against shooting attacks).",
      },
      {
        name: "Swordmaster",
        description:
          "As one of the legendary Swordmasters of Hoeth, Aenur may fight twice per activation.",
      },

      {
        name: "Arcane Edge",
        description:
          "Any attacks made by Aenur treats the enemy figure's armour as being 2 points lower. If the enemy figure is using magical armour, ignore this ability",
      },
      {
        name: "Lightning Parries",
        description:
          "Figures cannot gain bonuses to their fight rolls from supporting figures when fighting Aenur.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Skaven, Undead, and Cult of the Possessed. Will Fight only once for each warband. The Warband must play at least 2 games without him before he can be hired again.",
      },
    ],
  },
  {
    name: "Bertha Bestraufrung",
    stats: {
      move: 5,
      fight: "+4",
      shoot: "+0",
      armour: 14,
      will: "+5",
      health: 18,
      cost: "-",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "2x Sigmarite Warhammers, Gromril armour (Heavy armour with +1 to armour).",
      },
      {
        name: "High Matriarch",
        description: `Leader of the Sisters of Sigmar. All Sisters in her warband gain +1 Will. She can cast every spell from the Thaumaturgy and ther Elemental Hammer and Elemental Sphere spells.
          As a priestess, she casts at a -4, but may cast while using armors and shields.`,
      },
      {
        name: "Blessed Warhammers",
        description:
          "Wields two blessed warhammers. Gains +1 Damage while wielding them this way, but cannot pickup trasure without storing one of them and losing this bonus.",
      },
      {
        name: "Righteous Fury",
        description:
          "Bertha gains +2 Fight and +2 Damage against figures with the Demon and Undead traits.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "Bertha Bestraufrung will only join Sisters of Sigmar warbands. She will not ask for money, but will only fight once, against Cult of the Possessed or Vampire Courts warbands.",
      },
    ],
  },
  {
    name: "Johann the Knife",
    stats: {
      move: 8,
      fight: "+4",
      shoot: "+2",
      armour: 11,
      will: "+3",
      health: 14,
      cost: "250gc + 20% upkeep",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Unlimited Daggers, Light armour.",
      },
      {
        name: "Anatomy Savant",
        description:
          "Johann has the Energy Drain trait against any figures that haven't activated yet during this turn.",
      },
      {
        name: "Knife Fighter",
        description:
          'Armed with multiple daggers. May throw up to 2 knives per activation (6" Shooting Attack with -1 damage and Poison trait) spending two actions or fight with two in melee (+1 Attack from Two-Weapon Fighting and Poison trait).',
      },
      {
        name: "Shadow Walker",
        description:
          'Figures may not draw line of sight to Johann while further than 16" away or in cover. Johann gains +3 move if every part of his movement is outside of line of sight of every enemy figure',
      },
      {
        name: "Addicted to Crimson Shade",
        description:
          "May pay Johann's upkeep cost in Crimson Shade instead of gold. His Will stat is 0 for each game where his upkeep is paid in Shade, but the upkeep cost is only 15gc.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Skaven, Undead, and Cult of the Possessed. May be hired for one dose of Crimson Shade instead of gold if you have it.",
      },
    ],
  },
  {
    name: "Verskit, High Executioner of Clan Eshin",

    stats: {
      move: 8,
      fight: "+4",
      shoot: "+2",
      armour: 14,
      will: "+3",
      health: 20,
      cost: "350gc",
    },
    abilities: [
      {
        name: "Masterwork of Clan Enshin",
        description:
          "Each of Verskit Fighting Claws count as a Pistol. This pistol deals 3 damage and ignores 3 points of enemy armour instead of the normal for the pistol, and may be reloaded as normal. Verskit may fire his pistol and fight in the same action.",
      },
      {
        name: "The Flesh is Weak",
        description: "Verskit is immune to Fear, and have the Mind Lock trait.	",
      },
      {
        name: "Unblinking Eye",
        description:
          "Verskit mechanical eye may see thermal signatures through walls and his custom made Warplock Pistols chew through wood and stone like paper. Verskit do not need to have line of sight to shoot with his pistols. Cover and intervening terrain rules apply as normal.",
      },
      {
        name: "Equipment",
        description: "Skaven Fighting Claws, Light armour.",
      },
    ],
  },
  {
    name: "Hrothnar, The Vessel Champion",

    stats: {
      move: 6,
      fight: "+4",
      shoot: "0",
      armour: 13,
      will: "+4",
      health: 14,
      cost: "300gc+20% upkeep",
    },
    abilities: [
      {
        name: "Slave to Darkness",
        description:
          "Hrothnar is a Possessed champion of chaos, and therefore have the Demon trait. At the start of each game, he may choose two Daemonic Attributes. He have those Daemonic Attributes during the game.",
      },
      {
        name: "Shattered Seal",
        description:
          "If Hrothnar is reduced to 0 health, he gains 10 health back and gains Automatic Damage, Elemental Resistance (5), Immune to Critical Hits, Immune to Poison, Magic Attacks, Melt Weapon, Resistant to Missile Weapons",
      },
      {
        name: "Equipment",
        description: "Accursed Weapon, Heavy Armour, Shield.",
      },
    ],
  },
  {
    name: "Rotigus",
    stats: {
      move: 4,
      fight: "+5",
      shoot: "0",
      armour: 12,
      will: "+8",
      health: 18,
      cost: "2 specialist soldiers as sacrifice + 2 specialist soldiers as upkeep sacrifice.",
    },
    abilities: [
      {
        name: "Greater Demon of Nurgle",
        description:
          "Rotigus have the Demon, Immune to Control Demon, Immune to Critical Hits, Immune to Mind Control, Magic Attacks, Spell Reflection.",
      },
      {
        name: "Winds of Putrescence",
        description:
          "If a figure activates within 6” of this creature, the figure must make an immediate Will Roll (TN14) or suffer 4 points of damagea and become poisoned. Undead, constructs, and demons are immune to this damage and thus do not have to make a Will Roll.",
      },
      {
        name: "Equipment",
        description: "Accursed Weapon, Heavy Armour, Shield.",
      },
    ],
  },
];

function DramatisPersonaePage() {
  const navigate = useNavigate();

  const sections = [
    {
      id: "general-rules",
      label: "General Rules",
      type: "Rules",
    },
    ...dramatisPersonae.map((unit) => ({
      id: slugify(unit.name, { lower: true }),
      label: unit.name,
      type: "Units",
    })),
    {
      id: "special-rules",
      label: "Special Rules",
      type: "Rules",
    },
  ];

  return (
    <PageContainer>
      <Header title="Dramatis Personae" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            <Typography
              sx={{
                fontFamily: '"Crimson Text", serif',
                fontSize: "1.2rem",
                fontStyle: "italic",
                color: "#d4c4a8",
                mb: 1,
              }}
            >
              "he stumps and greasy ashes of the pyres covered the common field
              as far as the eye could see and the smoke from the witch-fires
              drifted through the streets. Its stench filled our mouths for days
              afterwards."
            </Typography>
            <QuoteAttribution>— Diary of Selestian Bran</QuoteAttribution>
          </QuoteBox>

          <div id="general-rules">
            <ParchmentText sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
              <strong style={{ color: "#d4af37", fontSize: "1.6rem" }}>
                Dramatis Personae Rules
              </strong>
              <p>
                Dramatis Personae are unique individuals, legendary warriors and
                infamous rogues whose reputations precede them throughout the
                Empire. Unlike common Hired Swords, these exceptional characters
                have their own goals, personalities, and stories. They cannot be
                simply bought — they must be encountered through fate or special
                circumstances.
              </p>
              <br />
              <p>
                Each Dramatis Personae has unique abilities that far exceed
                normal warriors. They do not count toward your warband's maximum
                model limit, but they significantly increase your warband's
                rating. Most cannot gain experience or advance — they are
                already at the peak of their abilities. Some have special hiring
                conditions, and a few cannot be hired at all, appearing only
                through specific events or scenarios.
              </p>
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Warband Slot Requirements
              </strong>
              <br />
              <br />
              Dramatis Personae are powerful individuals who take up valuable
              space in your warband's hierarchy.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Specialist Slot Rules:
              </strong>
              <br />• <strong>Dramatis Personae</strong> take up{" "}
              <strong>two Specialist slots</strong> in your warband, but still
              count as only <strong>one model</strong> for the warband's 10
              model limit
              <br />• <strong>Hired Swords</strong> take up{" "}
              <strong>one Specialist slot</strong> and count as one model
              <br />• Both count against your warband's specialist limit
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Dramatis Personae Exclusivity
              </strong>
              <br />
              <br />
              Unlike common Hired Swords, Dramatis Personae are{" "}
              <strong>unique individuals</strong> who can only serve one warband
              at a time. Their legendary status means they cannot be in multiple
              places at once, and their presence is a matter of fate and
              opportunity.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Unique Service Rules:
              </strong>
              <br />• A Dramatis Personae{" "}
              <strong>cannot be in two different warbands</strong>{" "}
              simultaneously (even in different campaigns)
              <br />• If a Dramatis Personae event is rolled on the Exploration
              table while that individual is already serving another warband,{" "}
              <strong>reroll the event</strong>
              <br />• Once a Dramatis Personae leaves a warband (upkeep not
              paid, dies, or completes their service), they become available to
              other warbands again
              <br />• <strong>
                Hired Swords do not have this limitation
              </strong>{" "}
              — the same Hired Sword type can serve multiple warbands
              simultaneously
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Example: If "Aenur, Sword of Twilight" is currently serving your
                warband and another player rolls his event, they must reroll
                that event. However, if you have a "Dwarf Troll Slayer" Hired
                Sword, another player can also hire a Dwarf Troll Slayer — there
                are many slayers in Mordheim.
              </em>
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Payment and Upkeep
              </strong>
              <br />
              <br />
              Each Dramatis Personae has their own payment structure and
              conditions. Some require gold crowns, others demand wyrdstone,
              magic items, or even special conditions to be met.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Payment Rules:</strong>
              <br />• <strong>Initial Hiring Cost:</strong> The price (or
              conditions) required to initially hire the individual. This may be
              gold, items, or completing a specific scenario
              <br />• <strong>Upkeep:</strong> Some Dramatis Personae require
              payment after each battle to remain with your warband. If upkeep
              is not paid, they leave permanently (unless their description
              states otherwise)
              <br />• <strong>Special Payment:</strong> Some individuals accept
              alternative forms of payment (wyrdstone, magic items, first
              treasure roll, etc.)
              <br />• <strong>No Upkeep:</strong> Some Dramatis Personae serve
              for free once hired, while others only stay for a single battle
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Experience and Advancement
              </strong>
              <br />
              <br />
              Most Dramatis Personae are already legendary warriors at the peak
              of their abilities. They do not gain experience or advance like
              normal warband members.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Advancement Restrictions:
              </strong>
              <br />• Dramatis Personae <strong>cannot gain experience</strong>{" "}
              from battles
              <br />• They <strong>cannot learn new skills</strong> or increase
              their characteristics
              <br />• They arrive fully formed and leave the same way
              <br />• Their abilities and statistics are fixed and cannot be
              modified (except by temporary effects during battle)
            </ParchmentText>
          </div>

          {/* Game Terms Section */}
          <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
            <ParchmentText>
              <strong style={{ color: "#d4af37", fontSize: "1.5rem" }}>
                Game Terms
              </strong>
              <br />
              <br />
              Some Dramatis Personae have special abilities that use specific
              game terms. These are defined below:
            </ParchmentText>

            <Box sx={{ mt: 3 }}>
              <ParchmentText>
                <strong style={{ color: "#c4a870", fontSize: "1.2rem" }}>
                  Automatic Damage
                </strong>
                <br />
                Any figure that activates while in combat with this creature
                takes 2 points of elemental magic damage. Creatures with
                automatic damage are immune to damage from automatic damage.
              </ParchmentText>
            </Box>

            <Box sx={{ mt: 3 }}>
              <ParchmentText>
                <strong style={{ color: "#c4a870", fontSize: "1.2rem" }}>
                  Melt Weapon
                </strong>
                <br />
                If a figure that is fighting this creature rolls a natural '1'
                on their attack roll, then the weapon they are using is
                immediately destroyed. This attribute has no effect on magic
                weapons.
              </ParchmentText>
            </Box>

            <Box sx={{ mt: 3 }}>
              <ParchmentText>
                <strong style={{ color: "#c4a870", fontSize: "1.2rem" }}>
                  Spell Reflection
                </strong>
                <br />
                Any time a spell is successfully cast upon this creature, roll a
                die: on a 16+ the spell is reflected back on the figure that
                originally cast the spell. This spellcaster should make any Will
                Rolls or Combat Rolls required as the target of the spell. This
                includes any spells that include the creature in their area of
                effect.
              </ParchmentText>
            </Box>

            <Box sx={{ mt: 3 }}>
              <ParchmentText>
                <strong style={{ color: "#c4a870", fontSize: "1.2rem" }}>
                  Resistant to Missile Weapons
                </strong>
                <br />
                This creature never takes more than 2 points of damage from
                non-magic bow, crossbow, or javelin attacks. It takes full
                damage from all other shooting attacks, including attacks made
                with magic arrows, bolts, or javelins.
              </ParchmentText>
            </Box>
          </div>

          <Box sx={{ mb: 4 }}>
            <WarbandIndex sections={sections} />
          </Box>

          {dramatisPersonae.map((unit) => (
            <div
              key={slugify(unit.name, { lower: true })}
              id={slugify(unit.name, { lower: true })}
            >
              <UnitCard
                name={unit.name}
                stats={unit.stats}
                abilities={unit.abilities}
              />
            </div>
          ))}
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <StyledNavigationButton
            onClick={() => navigate("/")}
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "rgba(20, 18, 14, 0.6)",
              "&:hover": {
                backgroundColor: "rgba(28, 24, 18, 0.8)",
              },
            }}
          >
            Return to Home
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default DramatisPersonaePage;
