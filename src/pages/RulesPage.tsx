import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import WarbandIndex from "../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  QuoteBox,
  QuoteAttribution,
  ParchmentText,
} from "../components/PageComponents";
import { styled } from "@mui/material/styles";

const SectionTitle = styled(Typography)({
  fontFamily: '"Cinzel", serif',
  fontSize: "2rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "1.5rem",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
});

const RuleSection = styled(Box)({
  marginBottom: "3rem",
});

function RulesPage() {
  const navigate = useNavigate();

  const sections = [
    { id: "wyrdstone-shards", label: "Wyrdstone Shards" },
    { id: "phases", label: "The Phases" },
    { id: "two-weapon-fighting", label: "Two Weapon Fighting" },
    { id: "powers", label: "Powers" },
    { id: "fear-trait", label: "The Fear Trait" },
    { id: "campaign-changes", label: "Campaign Changes" },
    { id: "hired-swords", label: "Hired Swords & Dramatis Personae" },
    { id: "bases", label: "Bases and Upgrades" },
    { id: "multiplayer-quick-skirmish", label: "Multiplayer & Quick Skirmish" },
    { id: "wait-token", label: "The Wait Token" },
  ];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="New Rules" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            Crow the black Daemon's brother,
            <br />
            As carrion to corpses gather.
            <br />
            Greed, ambition, guile and hate,
            <br />
            All crowd through fiery gate.
            <br />
            Who now wears Sigmar's crown,
            <br />
            Save be who would be overthrown.
            <QuoteAttribution>
              — Prophesy of Cassandora, Seeress of the Sisters of Sigmar
            </QuoteAttribution>
          </QuoteBox>
        </ContentContainer>
      </ContentSection>

      <ContentSection sx={{ borderTop: "none", paddingTop: 0 }}>
        <ContentContainer>
          <RuleSection id="wyrdstone-shards">
            <SectionTitle variant="h2">Wyrdstone Shards</SectionTitle>
            <ParchmentText>
              In Wyrdgrave, the objectives that warbands fight over are not
              generic treasure tokens, but fragments of the cursed comet that
              destroyed Mordheim — <strong>Wyrdstone Shards</strong>.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Wyrdstone as Treasure:
              </strong>
              <br />
              Wyrdstone Shards replace treasure tokens from standard Frostgrave.
              Any game mechanic, spell, ability, or rule that applies to
              "treasure" or "treasure tokens" applies equally to{" "}
              <strong>Wyrdstone Shards</strong>. This includes:
              <br />
              <br />
              • Movement penalties for carrying treasure
              <br />
              • Spells and abilities that affect treasure holders
              <br />
              • Scoring and victory conditions
              <br />
              • Post-game treasure rolls and rewards
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                The Nature of Wyrdstone:
              </strong>
              <br />
              Despite being called "shards," Wyrdstone fragments are actually{" "}
              <strong>large, jagged blocks</strong> of the malevolent stone —
              heavy, unwieldy, and pulsing with corrupt magical energy. The name
              "shard" is a grim jest among treasure hunters, as even the
              smallest pieces are sizeable chunks of crystallized doom.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Corrupting Influence:
              </strong>
              <br />
              The raw magical energies emanating from Wyrdstone are dangerous to
              all who come near. Any figure carrying a Wyrdstone Shard takes{" "}
              <strong>1 point of Damage</strong> at the start of each of their
              activations. This represents the mental and physical toll of
              prolonged exposure to the stone's corrupting influence.
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                This corruption damage occurs even if the figure does not
                activate (such as when using Group Activation rules). The damage
                is unavoidable as long as the Wyrdstone is carried. Dropping the
                shard immediately stops the corruption.
              </em>
            </ParchmentText>
          </RuleSection>

          <RuleSection id="phases">
            <SectionTitle variant="h2">The Phases</SectionTitle>
            <ParchmentText>
              Wyrdgrave uses a modified phase system compared to Frostgrave.
              Instead of the Wizard Phase and Apprentice Phase, players use the
              Hero's Phase and Champion's Phase.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Hero's Phase:
              </strong>
              <br />
              During the Hero's Phase, the player activates their warband's Hero
              and any soldiers within 3" of it. The Hero and these soldiers may
              move and take their actions as normal. Group Activation rules from
              Frostgrave apply as usual.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Champion's Phase:
              </strong>
              <br />
              During the Champion's Phase, the player activates their warband's
              Champion and any soldiers within 3" of it. The Champion and these
              soldiers may move and take their actions as normal. Group
              Activation rules from Frostgrave apply as usual.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Other Phases:
              </strong>
              <br />
              All other phases (Soldier Phase, Creature Phase) function exactly
              as they do in Frostgrave, including all Group Activation rules and
              special abilities that affect activation order.
            </ParchmentText>
          </RuleSection>

          <RuleSection id="two-weapon-fighting">
            <SectionTitle>Two Weapon Fighting</SectionTitle>
            <ParchmentText>
              A figure equipped with a hand weapon (or equivalent) in their main
              hand and a dagger (or equivalent) in their offhand gains combat
              advantages through dual-wielding techniques.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Two Weapon Fighting Rules:
              </strong>
              <br />• <strong>Combat Bonus:</strong> The figure gains +1 to
              Fight during fights
              <br />• <strong>CarryingRestriction:</strong> Cannot pick up
              Wyrdstone Shards while dual-wielding. The figure must store one of
              the weapons before picking up the shard.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Eligible Weapons:</strong>
              <br />• <strong>Main Hand:</strong> Hand weapon or equivalent
              (weapons that function as hand weapons)
              <br />• <strong>Off Hand:</strong> Dagger or equivalent (weapons
              that count as daggers, such as Dwarf Axes or weapons that
              specifically state they count as daggers in the offhand)
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Two weapon fighting represents the skill of warriors who have
                mastered the art of fighting with a weapon in each hand. The
                additional blade provides both offensive and defensive
                advantages in close combat, though the encumbrance prevents the
                warrior from easily collecting wyrdstone shards during the heat
                of battle.
              </em>
            </ParchmentText>
          </RuleSection>

          <RuleSection id="powers">
            <SectionTitle variant="h2">Powers</SectionTitle>
            <ParchmentText>
              Powers are special abilities that Heroes and Champions can
              activate during battle, representing their martial prowess,
              tactical genius, or supernatural gifts. Unlike spells, powers are
              activated through sheer force of will and physical exertion.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Activating Powers:
              </strong>
              <br />
              To activate a power, a Hero or Champion must:
              <br />
              <br />
              1. Declare which power they wish to activate (must meet the "When"
              condition)
              <br />
              2. Take 1 point of damage
              <br />
              3. Roll a d20 and meet or exceed the power's activation number
              <br />
              <br />
              If the roll succeeds, the power activates and its effect is
              applied immediately. If the roll fails, the power does not
              activate and the figure takes an additional 2 points of damage.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Exerting (Pushing Beyond Limits):
              </strong>
              <br />
              When activating a power, a figure may choose to{" "}
              <strong>Exert</strong> themselves to increase their activation
              roll. By taking additional damage on a 1:1 ratio, they can boost
              their roll. Exerting can be declared{" "}
              <strong>after seeing the result of the d20 roll</strong>, allowing
              players to spend only as much Health as needed to succeed or boost
              their roll.
              <br />
              <br />
              For example, a Hero rolls a 5 when trying to activate a power with
              activation number 8. They could choose to Exert themselves by
              taking 3 additional points of Damage to gain +3 to their roll (5 +
              3 = 8), just enough to succeed.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Minimum Health Requirement:
              </strong>
              <br />
              A figure must have at least 1 Health remaining to activate powers.
              Figures at 0 Health or below cannot activate any powers.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Action Economy:
              </strong>
              <br />
              Activating a power does <strong>not</strong> cost an action unless
              the power's description specifically states otherwise. A figure
              may activate their powers while taking other actions during their
              activation.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Frequency of Power Activation:
              </strong>
              <br />A Hero or Champion may activate their powers{" "}
              <strong>once per activation of any figure in the game</strong>.
              This means a Hero can activate powers during their own activation,
              during an ally's activation, during an enemy's activation, or even
              during the creature phase — as long as the power's "When"
              condition is met.
              <br />
              <br />A figure{" "}
              <strong>
                can activate the same power multiple times per turn
              </strong>{" "}
              if opportunities arise. For example, a Hero could activate the
              same reactive power three times if three different enemy figures
              attack them.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Multiple Power Activations:
              </strong>
              <br />
              Activating multiple powers in the same turn becomes increasingly
              difficult. Each additional power activation in the same turn
              suffers a cumulative penalty to the activation roll:
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Utilization Roll Penalties:
              </strong>
              <br />
              • First power: +0 penalty
              <br />
              • Second power: +3 penalty
              <br />
              • Third power: +6 penalty
              <br />
              • Fourth power: +9 penalty
              <br />
              • Fifth power: +12 penalty
              <br />
              • Sixth power: +15 penalty
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Tip: Use a d6 to track how many powers a figure has activated
                during their turn. Place it next to the figure and increment it
                with each power activation.
              </em>
              <br />
              <br />
              For example, if a Hero tries to activate their third power in the
              turn, and the power they are trying to activate has an activation
              number of 5, they need to roll 5 + 6 = 11 or higher on a d20 to
              succeed. This represents the mounting physical and mental
              exhaustion from pushing beyond mortal limits.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Strategic Consideration:
              </strong>
              <br />
              This penalty system ensures that while powerful figures can
              unleash devastating combinations of abilities, doing so becomes
              increasingly risky. Players must carefully weigh whether the
              tactical advantage is worth the risk of failure and the guaranteed
              Damage from each activation attempt.
            </ParchmentText>
          </RuleSection>

          <RuleSection id="fear-trait">
            <SectionTitle variant="h2">The Fear Trait</SectionTitle>
            <ParchmentText>
              The Fear trait represents creatures so terrifying, monstrous, or
              unnatural that they strike dread into the hearts of those who face
              them. Many large creatures, undead horrors, and demonic entities
              possess this trait.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Fear Mechanics:
              </strong>
              <br />
              Any <strong>living figure</strong> (not undead or constructs) that
              does not have the Mind Lock trait that wishes to move into combat
              with a figure that has the Fear trait, or wishes to force combat
              with such a figure, must first make a <strong>Will roll</strong>{" "}
              with a Target Number of <strong>12</strong>.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>On Success:</strong> The
              figure may move into combat or force combat as normal.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>On Failure:</strong> The
              figure cannot move into combat with, or force combat with, the
              Fear-causing figure this activation. However, the action is not
              lost — the figure may use that action for something else (moving
              elsewhere, shooting, etc.). The figure cannot attempt this Will
              roll again until their next activation.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Example:
              </strong>
              <br />
              A Mercenary (Will +1) wants to charge a Vampire Count (Fear
              trait). The Mercenary must roll a Will check with TN 12. With
              their +1 Will, they need to roll an 11 or higher on the d20. If
              they fail, they cannot move into combat with the Vampire this
              turn, but they could still shoot at it, move away, or take other
              actions. They can try again on their next activation.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Important Notes:
              </strong>
              <br />
              • Undead, Constructs and figures with the Mind Lock trait are
              immune to Fear and never need to make this Will roll
              <br />• The Will roll is required when attempting to{" "}
              <strong>move into combat</strong> or <strong>force combat</strong>{" "}
              with the Fear-causing creature
              <br />
              • Defending against attacks does not require a Fear test
              <br />
              • Some abilities and traits grant immunity to Fear
              <br />• Being <strong>forced into combat</strong> by enemy actions
              (pushed, pulled, spells, etc.) does not require a Fear test
            </ParchmentText>
          </RuleSection>

          <RuleSection id="campaign-changes">
            <SectionTitle variant="h2">Campaign Changes</SectionTitle>
            <ParchmentText>
              Wyrdgrave introduces several modifications to the standard
              Frostgrave campaign system to better reflect the gritty, dangerous
              nature of Mordheim and the importance of veteran soldiers.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Gaining Experience:
              </strong>
              <br />
              All figures in a warband can gain experience points (XP) through
              various actions during and after each game. Wyrdgrave uses the
              following experience rewards:
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Warband Rewards (all figures):
              </strong>
              <br />• <strong>Warband wins the game:</strong> 50 XP to all
              figures
              <br />• <strong>Warband secures the central Wyrdstone:</strong> 50
              XP to all figures
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Non Spellcaster Rewards:
              </strong>
              <br />• <strong>Figure participates in a game:</strong> 40 XP
              <br />•{" "}
              <strong>
                Hero or Champion whenever a Wyrdstone Shard is secured by the
                warband:
              </strong>{" "}
              40 XP
              <br />• <strong>
                Henchmen that secured an Wyrdstone Shard
              </strong>{" "}
              40 XP
              <br />•{" "}
              <strong>
                The Entire warband when the Central Wyrdstone Shard is secured:
              </strong>{" "}
              60 XP
              <br />• <strong>Took an enemy model out of action:</strong> 5 XP
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Spellcaster Rewards:</strong>
              <br />• <strong>
                Spellcaster successfully casts a spell:
              </strong>{" "}
              10 XP per spell (maximum 50 XP per game)
              <br />• <strong>Spellcaster participates in a game:</strong> 50 XP
              <br />•{" "}
              <strong>
                Spellcaster take an enemy out of action with a spell:
              </strong>{" "}
              5 XP
              <br />•{" "}
              <strong>
                An enemy figure fails on a Will roll against a effect of one
                ofthis spellcaster spells.:
              </strong>{" "}
              5 XP
              <br />
              <br />
              These experience rewards encourage active participation, treasure
              hunting, and teamwork to achieve victory objectives.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Leveling Up (Heroes and Champions):
              </strong>
              <br />
              When a Hero or Champion gains a level, they may choose one of the
              following advancement options:
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Stat Improvement:</strong>
              <br />
              Increase any stat by <strong>+1</strong> (or <strong>+2</strong>{" "}
              if choosing Health), up to the racial limits defined on their
              warband's page. Each warband has specific caps for their race to
              maintain thematic balance.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Spellcaster Options:</strong>
              <br />
              If the figure is a spellcaster, they may instead choose to:
              <br />• <strong>Learn a new spell</strong> from a grimoire in
              their possession
              <br />• <strong>Reduce the casting number</strong> of one of their
              known spells by 1 point
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Non-Spellcaster Hero/Champion Options:
              </strong>
              <br />
              If the figure is a non-spellcaster Hero or Champion (not a
              soldier), they may instead choose to:
              <br />• <strong>Learn a new power</strong> from their warband's
              power list (no grimoire needed)
              <br />• <strong>Reduce the activation number</strong> of one of
              their powers by 1 point (minimum activation number of 3)
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Note: A power can never have an activation number lower than 3,
                regardless of improvements.
              </em>
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Soldier Experience and Advancement:
              </strong>
              <br />
              Unlike standard Frostgrave, soldiers in Wyrdgrave can gain
              experience and advance over time, representing hardened veterans
              who have survived the horrors of Mordheim.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Gaining Levels:</strong>
              <br />
              Soldiers gain experience points (XP) just like Heroes and
              Champions. However, they require <strong>200 XP</strong> to gain
              each level, regardless of their current level.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Stat Improvements:</strong>
              <br />
              When a soldier gains a level, they may increase one of their stats
              by +1. However,{" "}
              <strong>each stat can only be increased once</strong>. Once a
              soldier has improved a particular stat (Move, Fight, Shoot,
              armour, Will, or Health), they cannot improve that same stat
              again.
              <br />
              <br />
              For example, a soldier could increase their Fight at level 2,
              their Will at level 3, and their Health at level 4 — but they
              could not increase Fight a second time.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Tricks of the Trade:</strong>
              <br />
              Upon reaching <strong>level 5</strong>, a soldier gains a{" "}
              <strong>Trick of the Trade</strong> from the Frostgrave Folio.
              This represents a veteran warrior's accumulated knowledge and
              battlefield expertise. Choose one Trick that fits the soldier's
              role and equipment.
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Note: Soldiers have a <strong>maximum level of 5</strong>. Once
                they reach level 5 and gain their Trick of the Trade, they
                cannot advance further. This means a fully advanced soldier will
                have 5 stat improvements plus one Trick of the Trade.
              </em>
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Exploring Mordheim:
              </strong>
              <br />
              Between games, Heroes and Champions who survived the last battle
              may venture into the ruins of Mordheim to seek treasure, allies,
              and opportunities. The cursed city holds many secrets, and those
              brave enough to explore its darkened streets may find fortune — or
              death.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Eligible Explorers:</strong>
              <br />• <strong>Heroes</strong> may explore if they were not taken
              Out of Action in the last game
              <br />• <strong>Champions</strong> may explore if they were not
              taken Out of Action in the last game
              <br />• A warband may send both their Hero and Champion to explore
              separately, rolling on the table twice
              <br />• Regular soldiers are assumed to be helping the Hero or
              Champion explore, being coordinated by them
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                The Exploration Phase:
              </strong>
              <br />
              Exploration happens during the post-game sequence, after injuries
              have been resolved and treasure has been rolled and before
              spending experience.
              <br />
              <br />• <strong>Declare Explorers:</strong> Choose which Heroes
              and/or Champions will explore (if any are eligible)
              <br />• <strong>Roll for Each Explorer:</strong> For each
              explorer, roll 1d100 on the Exploration Events table
              <br />• <strong>Resolve Events:</strong> Resolve each event
              immediately, following the instructions in the event description
              <br />• <strong>Pay Costs or Make Checks:</strong> Many events
              require payment, stat checks (Fight, Shoot, Will), or both
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Making Stat Checks:</strong>
              <br />• Roll 1d20 and add the explorer's stat modifier (Fight,
              Shoot, or Will as specified)
              <br />• Compare the result to the Target Number (TN) listed in the
              event
              <br />• If your result equals or exceeds the TN, you succeed
              <br />• If your result is lower than the TN, you fail and suffer
              the consequences
              <br />• Some events list "Automatic" checks — these cannot be
              avoided and must be rolled even if you don't want to engage
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Example: Your Hero with Fight +3 encounters an event requiring a
                Fight check (TN 15). You roll 1d20 and get 14. Add your Fight +3
                for a total of 17. Since 17 ≥ 15, you succeed.
              </em>
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Out of Game Powers and Spells:
              </strong>
              <br />
              Any <strong>Out of Game (B)</strong> powers or spells that a Hero
              or Champion attempts to activate while on an exploration mission
              suffer a <strong>-4 penalty</strong> to their activation or
              casting rolls. This represents the difficulty of performing
              complex rituals and preparations while navigating the dangerous
              ruins alone.
              <br />
              <br />
              For complete exploration rules and the full Exploration Events
              table, see the{" "}
              <strong style={{ color: "#d4af37" }}>Exploration page</strong>.
            </ParchmentText>
          </RuleSection>

          <RuleSection id="hired-swords">
            <SectionTitle variant="h2">
              Hired Swords & Dramatis Personae
            </SectionTitle>
            <ParchmentText>
              The City of the Damned draws warriors from across the Old World.
              Mercenaries, outcasts, and fortune-seekers all come seeking gold,
              glory, or redemption in Mordheim's cursed streets. These fighters
              can be recruited to your warband through exploration.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Hired Swords
              </strong>
              <br />
              <br />
              Hired Swords are professional warriors who fight for coin. They
              represent types of mercenaries rather than specific individuals.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Hired Sword Rules:</strong>
              <br />• Can be encountered through exploration events
              <br />• Fight for coin rather than conviction
              <br />• Take up <strong>one Specialist slot</strong> in your
              warband
              <br />• Count against your warband's specialist limit and total
              model count
              <br />• Require upkeep payment between each game
              <br />• Cannot gain experience or advance
              <br />• May not become your leader
              <br />• <strong>
                Multiple warbands can hire the same type
              </strong>{" "}
              simultaneously — they represent different individuals with the
              same profession
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Dramatis Personae
              </strong>
              <br />
              <br />
              Dramatis Personae are unique, legendary individuals with their own
              goals, personalities, and stories. Unlike common Hired Swords,
              these exceptional characters are singular beings.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Dramatis Personae Rules:
              </strong>
              <br />• <strong>Unique individuals</strong> — only one can exist
              in all campaigns at once
              <br />• Take up <strong>one Specialist slot</strong> in your
              warband
              <br />• <strong>Cannot be in two different warbands</strong>{" "}
              simultaneously
              <br />• If already serving another warband, reroll the exploration
              event
              <br />• Often have special hiring conditions or challenges
              <br />• Cannot gain experience or advance — already at peak
              abilities
              <br />• May require alternative payment (wyrdstone, magic items,
              etc.)
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Encountering & Hiring
              </strong>
              <br />
              <br />
              When your Hero or Champion explores Mordheim and rolls an event on
              the Exploration Events table that involves a Hired Sword or
              Dramatis Personae, they have encountered that individual in the
              ruins.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Hiring Process:</strong>
              <br />• <strong>Meet Hiring Conditions:</strong> Your warband must
              meet any specific hiring conditions listed for that individual
              (alignment, warband type, special challenges, etc.)
              <br />• <strong>Pay the Hiring Cost:</strong> If conditions are
              met, you may immediately pay the hiring cost listed on the
              individual's card to recruit them
              <br />• <strong>Add to Warband:</strong> The new recruit joins
              your warband immediately and can be used in your next game
              <br />• <strong>Hiring Restrictions:</strong> Each individual
              lists which warbands may hire them. Some may attack on sight if
              you're the wrong faction
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Upkeep Costs
              </strong>
              <br />
              <br />
              Unlike regular warriors, Hired Swords and Dramatis Personae demand
              payment for their continued service. They are mercenaries first
              and foremost.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Paying Upkeep:</strong>
              <br />• Upkeep must be paid <strong>
                between each game
              </strong>{" "}
              (during the post-game phase before the next battle)
              <br />• The upkeep cost is listed on each individual's card
              (example: "10% upkeep" means 10% of their hiring cost, rounded up)
              <br />• If you cannot or choose not to pay upkeep, the individual{" "}
              <strong>leaves your warband permanently</strong>
              <br />• Some individuals may accept alternative payment
              (Wyrdstone, Crimson Shade, magic items, first treasure roll, etc.)
              as noted in their abilities
              <br />• Upkeep represents payment, bribes, equipment maintenance,
              and other costs
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Experience & Advancement
              </strong>
              <br />
              <br />
              Hired Swords and Dramatis Personae are already experienced
              warriors at the peak of their abilities. They do not grow through
              battle.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Advancement Restrictions:
              </strong>
              <br />• Cannot gain experience from battles
              <br />• Cannot learn new skills or increase their characteristics
              <br />• Arrive fully formed and leave the same way
              <br />• Abilities and statistics are fixed (except temporary
              effects)
              <br />• Balanced by immediate availability and high skill level
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Example: If "Aenur, Sword of Twilight" (Dramatis Personae) is
                currently serving your warband and another player rolls his
                event, they must reroll that event. However, if you have an "Elf
                Ranger" (Hired Sword), another player can also hire a different
                Elf Ranger — there are many elven rangers in Mordheim.
              </em>
              <br />
              <br />
              For complete lists of Hired Swords and Dramatis Personae, see
              their respective pages.
            </ParchmentText>
          </RuleSection>

          <RuleSection id="bases">
            <SectionTitle variant="h2">Bases and Upgrades</SectionTitle>
            <ParchmentText>
              In Wyrdgrave, warbands do not start with an established base.
              Instead, they must scavenge through the ruins of Mordheim to find
              a suitable location to call home.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Finding Your Base:
              </strong>
              <br />
              Unlike standard Frostgrave where players choose a base at the
              start of the campaign, in Wyrdgrave you must first{" "}
              <strong>discover a base through exploration</strong>.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Discovery Process:</strong>
              <br />• During the post-game exploration phase, your Hero or
              Champion may roll a <strong>Location event</strong> on the
              Exploration Events table
              <br />
              • Location events represent various types of bases: Inns, Temples,
              Crypts, Towers, Breweries, Laboratories, etc.
              <br />• You may choose to <strong>move to that base</strong>,
              making it your warband's new headquarters
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Alternative: Keep Your Current Base
              </strong>
              <br />• If you already have a base, you may choose{" "}
              <strong>not to move</strong> when discovering a new location
              <br />• In this case, you are treated as if you are{" "}
              <strong>occupying the discovered base temporarily</strong> until
              the end of your next game
              <br />
              • This allows you to benefit from the location's special effects
              for one game without permanently relocating
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Base Upgrades:
              </strong>
              <br />
              Once you have established a base, you may purchase upgrades for it
              following the <strong>standard Frostgrave rules</strong> from the
              core rulebook and supplements.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Upgrade Rules:</strong>
              <br />
              • Base upgrades cost gold crowns as listed in the Frostgrave
              rulebooks
              <br />
              • Upgrades provide various benefits: storage, healing, training,
              crafting, etc.
              <br />
              • Some warband-specific equipment or abilities may require certain
              base upgrades (as noted on warband pages)
              <br />
              • Upgrades remain with the base — if you move to a new base, you
              lose access to previous upgrades unless you rebuild them
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Strategy Tip: Consider carefully before moving to a new base.
                Rebuilding all your upgrades can be expensive. However, some
                location types offer unique advantages that might be worth the
                cost of relocation.
              </em>
            </ParchmentText>
          </RuleSection>

          <RuleSection id="multiplayer-quick-skirmish">
            <SectionTitle variant="h2">
              Multiplayer Games and Quick Skirmish
            </SectionTitle>
            <ParchmentText>
              For faster games or multiplayer scenarios with more than two
              players, Wyrdgrave offers a streamlined format that maintains the
              tactical depth while reducing game time.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Quick Skirmish Rules:
              </strong>
              <br />
              When playing a Quick Skirmish or multiplayer game, use the
              following modifications:
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Warband Size:</strong>
              <br />• Players may only use their <strong>Hero</strong> (the
              first figure on their warband page)
              <br />• Players <strong>may not use their Champion</strong> in
              Quick Skirmish games
              <br />• Players may bring{" "}
              <strong>half the normal soldier limit</strong> for their warband
              (rounded down)
              <br />
              • Special units follow normal hiring restrictions and count
              against the reduced soldier limit
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Wyrdstone Deployment:
              </strong>
              <br />• Place only <strong>1 Wyrdstone Shard</strong> on the table
              instead of the normal 2 or more
              <br />
              • The central Wyrdstone should be placed in a highly contested
              location to encourage conflict
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Benefits:
              </strong>
              <br />
              This format ensures that:
              <br />
              • Games complete in 45-60 minutes instead of 90+ minutes
              <br />
              • Multiplayer games (3-4 players) remain manageable
              <br />
              • Each warband maintains its unique identity with reduced
              bookkeeping
              <br />
              • The focus shifts to tactical decisions rather than attrition
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Tip: Quick Skirmish is ideal for casual multiplayer nights, or
                when you want to try a new warband without full campaign
                commitment.
              </em>
            </ParchmentText>
          </RuleSection>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <StyledNavigationButton
            onClick={() => navigate("/exploration")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Exploration Events Table
          </StyledNavigationButton>

          <Box
            sx={{
              borderTop: "1px solid rgba(139, 115, 85, 0.3)",
              pt: 3,
              mt: 2,
            }}
          >
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
              Return to Main Page
            </StyledNavigationButton>
          </Box>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default RulesPage;
