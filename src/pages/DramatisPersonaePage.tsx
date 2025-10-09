import { Box, styled, Typography } from "@mui/material";
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

const AbilityText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.1rem",
  lineHeight: 1.6,
  color: "#d4c4a8",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
}));

const dramatisPersonae = [
  {
    name: "Aenur, Sword of Twilight",
    stats: {
      move: 6,
      fight: "+6",
      shoot: "+2",
      armor: 14,
      will: "+4",
      health: 16,
      cost: "300gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "Ithilmar Two-Handed Weapon (+1 to Fight and count as magical weapon), Ithilmar Armor (Heavy Armor without -1 to Movement), Sea Dragon Cloak (+1 to Armor against shooting attacks).",
      },
      {
        name: "Swordmaster",
        description:
          "As one of the legendary Swordmasters of Hoeth, Aenur may fight twice per activation.",
      },

      {
        name: "Arcane Edge",
        description:
          "Any attacks made by Aenur treats the enemy figure's armor as being 10. If the enemy figure is using magical armor, ignore this ability",
      },
      {
        name: "Tidal Parries",
        description:
          "Figures cannot gain bonuses from supporting figures when fighting Aenur.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Skaven, Undead, and Cult of the Possessed. Does not require upkeep, instead taking the first treasure roll made after the game.",
      },
    ],
  },
  {
    name: "Bertha Bestraufrung",
    stats: {
      move: 5,
      fight: "+4",
      shoot: "+0",
      armor: 14,
      will: "+5",
      health: 18,
      cost: "-",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "2x Sigmarite Warhammers, Gromril Armor (Heavy Armor with +1 to Armor).",
      },
      {
        name: "High Matriarch",
        description: `Leader of the Sisters of Sigmar. All Sisters in her warband gain +1 Will. She can cast every spell from the Thaumaturgy and ther Elemental Hammer and Elemental Sphere spells.
          As a priestess, she casts at a -4, but may cast while using armors and shields.`,
      },
      {
        name: "Stormborne Exorcism",
        description: `Any Demons or Undead that are hit by Bertha's Elemental Sphere spell are immediately subject to the 
          banish demon or destroy undead spells using the same casting roll.`,
      },
      {
        name: "Blessed Warhammers",
        description:
          "Wields two blessed warhammers. Gains +1 Armor while wielding them this way, but cannot pickup trasure without storing one of them.",
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
      armor: 11,
      will: "+3",
      health: 14,
      cost: "200 + 20% upkeep",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Unlimited Daggers, Light Armor.",
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
          'Figures may not draw line of sight to Johann while further than 20" away or in cover. Johann gains +3 move if every part of his movement is outside of line of sight of every enemy figure',
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
    name: "Nicodemus, The Cursed Pilgrim",
    stats: {
      move: 5,
      fight: "+2",
      shoot: "+0",
      armor: 11,
      will: "+5",
      health: 18,
      cost: "2 Magic Items as initial hiring cost + 1 Wyrdstone per game",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Gigantic Staff",
      },
      {
        name: "Giant Wizard",
        description: "This creature have the Large trait.",
      },
      {
        name: "Destructive Wyrdtide",
        description:
          "Nicodemus is a spellcaster. He may cast spells from the Elementalist, Astromancer and Distortionist schools of magic. When he is hired, the hiring player may choose eight spells from these schools in any combination. He cast those spells at a -2 Casting Roll due to his clumsy size.",
      },
      {
        name: "Gigantic Caster",
        description: `While Nicodemus size makes incantantions harder to intone and weave, The extra magic contained within his power gives an extra whoomp to his spells. The range of
          spells he cast is increased by 6" and the damage of any spell is increased by 2.`,
      },
      {
        name: "Growing Curse",
        description:
          "If upkeep is not paid, Nicodemus leaves the warband permanently. His curse slowly kills him without wyrdstone.",
      },
      {
        name: "Magic Staff",
        description: "Counts as a Two-Handed Weapon due to it's size..",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Skaven, Undead, Cult of the Possessed, and Witch Hunters. Must be paid in wyrdstone, not gold. Requires 1 wyrdstone shard after each battle or he leaves permanently.",
      },
    ],
  },
  {
    name: "Ulli Leitpold",
    stats: {
      move: 6,
      fight: "+4",
      shoot: "+0",
      armor: 11,
      will: "+2",
      health: 14,
      cost: "125gc + Marquand Cost.",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Two-Handed Weapon, Light armor.",
      },
      {
        name: "Skull Basher",
        description:
          "Whenever Ulli wins a Fight and deals 5 damage to the enemy figure, that enemy figure may only use one action during it's next activation.",
      },
      {
        name: "Unstoppable Charge",
        description: `When Ulli uses a move action, he may choose a figure that he has  enough movement to enter combat with.
          During his move action, he cannot be forced into combat, but he must finish the movement into combat with the target figure.
          If Ulli wins the Fight, he may move that figure 3" in any direction, instead of the normal separate 1"`,
      },
      {
        name: "Hiring Restrictions",
        description:
          "Must be hired as a pair with Marquand Volker. May be hired by any warband except Sisters of Sigmar and Witch Hunters. See Special Rules below.",
      },
    ],
  },
  {
    name: "Marquand Volker",
    stats: {
      move: 8,
      fight: "+2",
      shoot: "+2",
      armor: 11,
      will: "+3",
      health: 14,
      cost: "125gc + Ulli Leitpold Cost",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon, Daggers, Light armor.",
      },
      {
        name: "Step Aside",
        description: `Whenever a figure moves within 3" of Marquand, or Makes a Shooting Attack against him, Marquand may immediately move 3" in any direction. He cannot move into combat with another figure or leave the table during this movement.
          If Marquand leaves the range of the ranged weapon, the attack is cancelled. If he moves into cover, or behind intervening terrain 
          it now counts for that Shooting Attack.`,
      },
      {
        name: "Knife Fighter",
        description:
          'May throw daggers (12" Shooting Attack, -1 damage ) or use them if offhand for Two Weapon Fighting with the Hand Weapon .',
      },
      {
        name: "Lightning Reflexes",
        description:
          "Marquand is ALWAYS the first figure to activate in any turn, irrespective of any phase or initiative rolls.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "Must be hired as a pair with Ulli Leitpold. May be hired by any warband except Sisters of Sigmar and Witch Hunters. See Special Rules below.",
      },
    ],
  },
];

const specialRules = [
  {
    name: "Ulli & Marquand Special Rules",
    description:
      "These two rogues have unique rules that apply when they're hired together.",
    rules: [
      {
        title: "Wanderers",
        text: "Ulli and Marquand only stay with a warband for the duration of one battle. After using them in a game, you may not hire them again until you have fought at least one battle without them.",
      },
      {
        title: "A Fistful of Crowns",
        text: "These rogues will do anything for money. At the start of the game, any opposing player may attempt to bribe the pair by secretly writing down an amount higher than 200gc. The controlling player may write down a counter-bid. If an opponent's bribe is higher than your counter-bid, they gain control of the pair for the rest of the game. Whoever wins (original employer or briber) must pay the written amount.",
      },
      {
        title: "Where's the Money?",
        text: "If you cannot pay the bribe/counter-bid in crowns, the pair will take an equal amount in Magic Items. Failing that, they will leave the warband and never may be hired again. Any Black Market Contact rolls will be made at -3 from now on.",
      },
      {
        title: "Inseparable",
        text: 'These two are like brothers and must remain within 4" of each other at all times. If one is taken Out of Action, the other will attempt to drag him to safety and both leave the battlefield.',
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
              <br/>
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
              <br />• Hired Swords and Dramatis Personae each take up{" "}
              <strong>one Specialist slot</strong> in your warband
              <br />• This means they count against your warband's specialist
              limit and total model count.
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

          <div id="special-rules">
            {specialRules.map((section, idx) => (
              <Box
                key={idx}
                sx={{
                  mb: 4,
                  p: 3,
                  backgroundColor: "rgba(28, 24, 18, 0.6)",
                  border: "2px solid rgba(139, 115, 85, 0.4)",
                  borderRadius: "4px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Cinzel", serif',
                    color: "#d4af37",
                    mb: 2,
                    fontSize: "1.5rem",
                  }}
                >
                  {section.name}
                </Typography>
                <AbilityText sx={{ mb: 2 }}>{section.description}</AbilityText>
                {section.rules.map((rule, ruleIdx) => (
                  <Box key={ruleIdx} sx={{ mb: 2 }}>
                    <Typography
                      sx={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "#e8d4a0",
                        mb: 0.5,
                      }}
                    >
                      {rule.title}
                    </Typography>
                    <AbilityText sx={{ pl: 2 }}>{rule.text}</AbilityText>
                  </Box>
                ))}
              </Box>
            ))}
          </div>
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
