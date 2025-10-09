import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
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
import slugify from "slugify";

const mercenariesUnits = [
  {
    name: "Mercenary Captain",
    role: "Hero",
    stats: {
      move: 6,
      fight: "+3",
      shoot: "+2",
      armor: 10,
      will: "+4",
      health: 18,
      cost: "-",
    },
    abilities: [
      {
        name: "Leader",
        description:
          "Any figure that activates along with this figure during the Hero's Phase can use the Leader's Will stat instead of its own.",
      },
      {
        name: "Martial Master",
        description:
          "The activation power for every Mercenary Captain power is 3.",
      },
      {
        name: "Wardog Tactics",
        description:
          "The Mercenary Captain starts with 5 powers from the Wardog Tactics List. Refer to the Martial Master rule above to define its activation numbers.",
      },
      {
        name: "Equipment",
        description:
          "The Mercenary Captain may start with and equip Daggers, Hand weapons, Two Handed Weapons, Shields, Bows, Crossbows, Crossbow Pistols, Slings, Pistols, Muskets, Blunderbusses, Light Armour and Heavy Armour.",
      },
    ],
  },
  {
    name: "Sergeant",
    role: "Champion",
    stats: {
      move: 6,
      fight: "+2",
      shoot: "+2",
      armor: 10,
      will: "+3",
      health: 12,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "The Sergeant may start with and equip Daggers, Hand weapons, Two Handed Weapons, Shields, Bows, Crossbows, Crossbow Pistols, Slings, Pistols, Muskets, Blunderbusses, Light Armour and Heavy Armour.",
      },
      {
        name: "Wardog Tactics",
        description:
          "The Sergeant starts with 5 powers from the Wardog Tactics List. One of these powers is his signature power, and its activation number is 3. The others have an activation number of 5.",
      },
    ],
  },
  {
    name: "Wolf Priest of Ulric",
    role: "Champion",
    stats: {
      move: 7,
      fight: "+1",
      shoot: "0",
      armor: 11,
      will: "+3",
      health: 14,
      cost: "120gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "The Wolf Priest of Ulric may only equip Two Handed Weapons and may never equip armor or shields. He however, always uses a Wolf Cloak, which gives him =1 armor (already in statblock)",
      },
      {
        name: "Priest",
        description:
          "The Wolf Priest of Ulric is a priest, and has a very limited selection of spells compared to other spellcasters. However, it may cast while in combat, and its spells aren't considered spells for magic resistance effects. The Priest casts at a -4 Casting Roll. The priest may only learn spells from the Thaumaturge school and starts with 2 Thaumaturge spells and the Call Storm spell.",
      },
      {
        name: "Call of Ulric",
        description: `The Wolf Priest transforms into a Great White Wolf. He gains Large, Savage and Pack Hunter, and gains +1 Move, and +2 Fight.
          However, he cannot cast spells. Wolves who activate in the champion phase alongside the Wolf Priest can use his Will stat instead
          of their own.`,
      },
    ],
  },
  {
    name: "Man-at-Arms",
    stats: {
      move: 6,
      fight: "+3",
      shoot: "0",
      armor: "11/12",
      will: "+1",
      health: 12,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "Hand Weapon and Shield OR Two Handed Weapon, Light Armour",
      },
    ],
  },
  {
    name: "Marksmen",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "+2",
      shoot: "+2",
      armor: 11,
      will: "+1",
      health: 10,
      cost: "60gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "Musket OR Blunderbuss, Powder Horn, Leather Armour, Hand Weapon.",
      },
    ],
  },
  {
    name: "Arballist",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "+1",
      shoot: "+2",
      armor: 11,
      will: "+0",
      health: 10,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Crossbow, Light Armour.",
      },
    ],
  },
  {
    name: "Swordsmaster",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "+4",
      shoot: "+0",
      armor: 11,
      will: "+1",
      health: 12,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon, Dagger, Light Armour",
      },
      {
        name: "Blade Murderer",
        description:
          "Swordsmasters have trained to fight more than one opponent at once, and so their opponents can never claim more than +2 for supporting figures, no matter how many friendly figures are actually in combat with the swordsmaster. Furthermore, if the swordsmaster wins a hand-to-hand combat against an opponent that is wearing light or heavy armour, that opponent suffers -1 Armour for the purposes of determining damage from the swordsmaster's attack.",
      },
    ],
  },
  {
    name: "Youngblood",
    stats: {
      move: 6,
      fight: "2",
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
];

const wardogTactics = [
  {
    name: "Get 'em Maggot!",
    when: "At any point during the Captain/Sergeant activation.",
    effect:
      "Choose a target figure from the activator's warband within range. That creature immediately activates irrespective of phase and distance to the activator, and counts as having activated during the same phase as the activator.",
  },
  {
    name: "Shieldwall, now!",
    when: `When the Captain/Sergeant or any creature within 3" is the target of a Shooting attack.`,
    effect: `The power activator and up to 3 figure from its warband within 3" gains +2 extra armor for the next attack they take or until the end of the turn, whatever comes first.`,
  },
  {
    name: "I will sell any maggot with a clean sword to the slave-pits!",
    when: "At the start of the Hero's or Champion's phase, depending on who has the power.",
    effect:
      "Every creature that activates in this phase gains a +1 Fight OR Shoot for the first Fight or Shooting Attack. Choose for each figure.",
  },
  {
    name: "Fix Bayonets!",
    when: `At any time an enemy figure moves into combat with an allied figure equipped with a ranged weapon and within 3" of the Captain or Champion.`,
    effect: "The allied creature gains +2 Fight during that fight only.",
  },
  {
    name: "Brace the Spears!",
    when: `At any time an enemy figure moves into combat with an allied figure equipped with a Two Handed weapon and within 3" of the Captain or Champion.`,
    effect:
      "The enemy figure that moved into combat with the allied figure takes 2 damage.",
  },
  {
    name: "Sharpen your swords!",
    when: "At the start of the Hero's or Champion's phase, depending on who has the power.",
    effect:
      "Any figure that activates during this phase gains a +1 Fight and +1 Damage on their next fight or shooting attack.",
  },
  {
    name: "Oi, I need the bonesaw over 'ere!",
    when: "At any point during the Hero's or Champion's phase, depending on who has the power.",
    effect: `Choose a figure with less than half its health within 1" of the power's activator. As an action the activator performs a quick battlefield surgery and that figure gains 3 health.`,
  },
  {
    name: "Load 'em with the Nails lads!",
    when: "At the start of the Hero's or Champion's phase, depending on who has the power.",
    effect: `Any figures that activated within this phase and make a Shooting Attack with a Blunderbuss increase the range of the blunderbuss effect to 3" instead of 1". The Blunderbuss misfires on a 1-3.`,
  },
  {
    name: "Move your sorry asses forward!",
    when: "At the start of the Hero's or Champion's phase, depending on who has the power.",
    effect:
      "Any figures that activated during this phase gain +2 movement for their next movement action.",
  },
  {
    name: "Blast that bloody cunt!",
    when: "At the start of the Hero's or Champion's phase, depending on who has the power.",
    effect: `The power's activator chooses an enemy figure within 6" and line of sight. Any figures that activated during this phase gain a +2 Shoot in their next Shooting Attack against that creature, but -2 Shoot against any other creature.`,
  },
  {
    name: "Set the tripods up!",
    when: "At the start of the Hero's or Champion's phase, depending on who has the power.",
    effect:
      "Any creatures that activate during this phase can use an action to set up a tripod. The next time they make a Shooting attack, they may ignore the first piece of intervening terrain (not cover) between them and their target.",
  },
  {
    name: "Overwatch Positions!",
    when: "At the start of the Hero's or Champion's phase, depending on who has the power.",
    effect: `Any creatures that activate during this phase choose to spend both its actions to Enter Overwatch. At any point during an enemy figure movement, if it moves within 3" of a figure that Entered Overwatch, the figure who Entered Overwatch may make a Shooting Attack against it as a free action.`,
  },
  {
    name: "Drain the Barrels, today we fight drunk!",
    when: "At the start of the Hero's or Champion's phase, depending on who has the power.",
    effect:
      "Any creatures that activate during this phase are immune to Fear until the end of the turn.",
  },
];

function MercenariesPage() {
  const navigate = useNavigate();

  const units = mercenariesUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const tactics = wardogTactics.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Wardog Tactic",
  }));

  const sections = [...units, ...tactics];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Mercenaries" />

      <ContentSection>
        <ContentContainer>
          <div id="origins">
            <ParchmentText sx={{ marginTop: "2rem" }}>
              <strong style={{ color: "#d4af37", fontSize: "1.6rem" }}>
                Mercenary Origins
              </strong>
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Reikland
              </strong>
              <br />
              <br />
              Reikland lies at the heart of the Empire and its greatest city is
              Altdorf, home of the Grand Theogonist and seat of the Temple of
              Sigmar. Reiklanders are devout followers of Sigmar, the founder,
              first Emperor, and patron god of the Empire. The Grand Prince of
              Reikland (as Siegfried, the ruler of Reikland, styles himself) is
              supported in his claim to the throne by the Grand Theogonist and
              opposed most strongly by the Count of Middenheim and the Priests
              of Ulric.
              <br />
              <br />
              Throughout the Empire Reiklanders are commonly supposed to embody
              the discipline and loyalty of the professional warrior. Brave and
              well-versed in the arts of war, Reiklanders disdain fashionable
              clothing in favour of well-made and practical wargear. In battle
              they often wear coloured ribbons as marks of identification or
              authority.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Military Discipline:</strong> The Captain may
              activate soldiers within 6" of himself rather than the usual 3"
              <br />• <strong>Martial Training:</strong> All Marksmen gain +1 to
              their Shoot stat
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Middenheim
              </strong>
              <br />
              <br />
              Middenheim stands on a mountain pinnacle surrounded by dark forest
              in the centre of Middenland, and is also known as the City of the
              White Wolf after Ulric, the old god of wolves and winter. The
              Count of Middenheim, Mannfred Todbringer, is one of the chief
              contenders for the Emperor's throne.
              <br />
              <br />
              Middenheimers are typically large, strongly built men with a well
              deserved reputation for ferocity. Many wear wolf pelts which
              custom decrees to be the mark of those who have slain a wolf with
              their own hands. These grim warriors are famously contemptuous of
              danger. They frequently go into battle bare-headed, scoffing at
              those who choose to wear helmets.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Physical Prowess:</strong> The Captain and
              Sergeant start with +1 to their Fight stat, but -1 in their Shoot
              stat.
              <br />• <strong>Wolf's Blessed:</strong> The Warband may hire Wolf
              by 10 gp.
              <br />• <strong>Faith of Ulric:</strong> Middenheim warbands
              replace the Sergeant with the Wolf Priest of Ulric.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Marienburg
              </strong>
              <br />
              <br />
              Marienburg is the largest and most prosperous trading city in the
              Old World. Many call it the City of Gold which alone conveys a
              good idea of the wealth of this sprawling cosmopolitan city. The
              city's craftsmen represent every skill known to man. The secretive
              High Order of Honourable Freetraders champions the Lady Magritta
              for the Emperor's throne.
              <br />
              <br />
              Warbands sent to Mordheim are sumptuously dressed and armed.
              Though Marienburgers are often ridiculed as foppish and effete,
              their skill at arms and complete ruthlessness has earned them
              grudging respect. Their chief skills lie in duelling and in the
              use of poisons and other clandestine fighting methods.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Trading Contacts:</strong> Receive can roll an
              extra die when rolling for Black Market rolls.
              <br />• <strong>Wealth of Marienburg:</strong> Start with an extra
              100 gold crowns in campaign play (600gc total), or +20% in one-off
              games
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Ostermark
              </strong>
              <br />
              <br />
              Ostermarkers are used to harsh odds and battling alone to defend
              their farms against mercenaries and other brigands. Their years of
              isolation and self-reliance have made them hardy warriors indeed,
              and, as such, they do not give up easily or balk in the face of
              outnumbering foes.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Hardy:</strong> The Man-at-Arms, Captain and
              Sergeant starts with +1 Will.
              <br />• <strong>Farm Hound:</strong> The Warband may hire
              Warhounds paying the same as Witch Hunters. These warhounds are
              even more stern and have +2 Will.
            </ParchmentText>
          </div>

          <div id="units">
            {mercenariesUnits.map((unit, index) => (
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

          <div id="tactics">
            <PowerListTitle>Wardog Tactics</PowerListTitle>

            <ParchmentText>
              Wardog Tactics represent the brutal discipline of mercenary packs
              driven by survival, fear, and raw aggression. Their design
              emphasizes{" "}
              <strong>collective synergy over individual power</strong>
              , with abilities that ripple through the warband and turn
              scattered fighters into a single, snarling unit.
              <br />
              <br />
              In short, Wardog Tactics are designed to make the warband fight
              like a single organism — less elegant than others, but brutally
              effective through shared momentum and merciless aggression.
            </ParchmentText>

            {wardogTactics.map((power, index) => (
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

export default MercenariesPage;
