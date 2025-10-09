import { Box } from "@mui/material";
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

const hiredSwords = [
  {
    name: "Dwarf Ogreslayer",
    role: "Hero",
    stats: {
      move: 4,
      fight: "+4",
      shoot: "0",
      armor: 12,
      will: "+4",
      health: 20,
      cost: "150gc + 10% upkeep",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "Dwarven Great Axe (Two Handed Weapon that treats enemy figures' armor as being 1 point lower when calculating damage), Dwarf Axe (count as a dagger but without the -1 modifier to damage), Ogre Pelt (+1 Armor)",
      },
      {
        name: "Deathwish",
        description:
          "A Dwarf Trollslayer is immune to the Fear trait and has the Mind Lock trait.",
      },
      {
        name: "Relentless Destruction",
        description: "The Dwarf Ogreslayer have the Strong trait.",
      },
    ],
  },
  {
    name: "Elf Ranger",
    stats: {
      move: 7,
      fight: "+2",
      shoot: "+2",
      armor: 10,
      will: "+2",
      health: 12,
      cost: "125gc + 10%",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Elven Bow, Dagger, Light armor.",
      },
      {
        name: "Forest Walker",
        description:
          "Suffers no movement penalties in rough terrain. May move through woods at full speed.",
      },
      {
        name: "Masterful Scouting",
        description: `Furthermore, at the start of the game, after both sides have set up, but before the first Initiative Rolls, a player with a
        Elf Ranger may move it and one other figure in base-to-base contact with it up to 3".
        The Elf Ranger and the other figure must remain in base-to-base contact at the end
        of this move. If more than one player has a Elf Ranger in their crew, they are each
        allowed to make this special move and should do so in the reverse order to which they
        deployed their crews (so, the player who set up first would be the last to move his
        Elf Ranger).`,
      },
      {
        name: "Elven Bow",
        description:
          "Long Bow with 30\" range. Treats enemy figures' armor as being 1 point lower when calculating damage.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by Mercenaries and Witch Hunters. Cannot be hired by Undead, Skaven, Orcs, Lizardmen, or Cult of the Possessed. Dwarf Treasure Hunters may hire at 20% upkeep (old grudges).",
      },
    ],
  },
  {
    name: "Freelancer",
    stats: {
      move: 5,
      fight: "+3",
      shoot: "+1",
      armor: 14,
      will: "+2",
      health: 14,
      cost: "150gc + 20%",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Lance, shield, hand weapon, heavy armour, Horse",
      },
      {
        name: "Knight",
        description:
          "The Freelancer starts every battle riding a horse. The statblock for the horse and riding rules are in the Spellcaster Magazine #1",
      },
      {
        name: "Warhorse",
        description:
          "The Warhorse have the Charger and Aggressive Advanced Horsemanship training bonuses. Check the Spellcaster Magazine #1 to check these bonuses",
      },
      {
        name: "Lance",
        description:
          "A Lance count as a hand weapon, but deals +2 damage when mounted. Lances break on a critical hit.",
      },
      {
        name: "Horse Lodging",
        description:
          "A Freelancer takes care of lodging and feeding his own horse. The Stable base upgrade isn't needed. His upkeep is 10% highet to compensate for this.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by Mercenaries, Witch Hunters, and Dwarf Treasure Hunters. Cannot be hired by Undead, Skaven, Orcs, or Cult of the Possessed.",
      },
    ],
  },
  {
    name: "Halfling Scout",
    stats: {
      move: 7,
      fight: "+0",
      shoot: "+3",
      armor: 10,
      will: "+1",
      health: 8,
      cost: "140gc + 5%",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Short Bow, Dagger.",
      },
      {
        name: "Small",
        description:
          "A figure may only make a Shooting Attack against a Halfling Scout if the Halfling Scout is the closes model to it.",
      },
      {
        name: "Nimble",
        description:
          "Takes no Penalties for moving before Shooting. Does not suffer any movement penalties for rough terrain or climbing.",
      },
      {
        name: "Lucky",
        description:
          "Starts each game with a Luck token. May spend the token to reroll any one failed roll of any type.",
      },
      {
        name: "Stealthy Marksmen",
        description:
          "When making a Shooting Attack against a creature that still haven't activated, ignore the first piece of intervening terrain (but not cover) between them.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Skaven, Undead, Cult of the Possessed, and Orcs.",
      },
    ],
  },
  {
    name: "Ogre Bodyguard",
    stats: {
      move: 4,
      fight: "+4",
      shoot: "0",
      armor: 14,
      will: "+2",
      health: 18,
      cost: "200gc + 15%",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Two Handed Weapon.",
      },
      {
        name: "Trained Monster",
        description:
          "The Ogre Bodyguard have the Large, Strong and Fear traits.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Skaven. Requires double upkeep if alignment doesn't match.",
      },
    ],
  },
  {
    name: "Warlock",
    stats: {
      move: 6,
      fight: "+1",
      shoot: "+0",
      armor: 10,
      will: "+4",
      health: 10,
      cost: "100gc + 10%",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Staff.",
      },
      {
        name: "Hedge Mage",
        description:
          "The Warlock is a Spellcaster. He starts with the Elemental Bolt, Enchant Weapon and Suggestion spells and may not learn any other spells. He cast these spells at -4.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Witch Hunters and Sisters of Sigmar. Good-aligned warbands suffer -1 Will while he's in the warband (corruption).",
      },
    ],
  },
  {
    name: "Arabian Merchant",
    stats: {
      move: 6,
      fight: "+1",
      shoot: "+0",
      armor: 10,
      will: "+2",
      health: 10,
      cost: "100gc + 10%",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon, Light Armor.",
      },
      {
        name: "Mercantile Network",
        description:
          "After each game in which the Arabian Merchant was not taken out of action, the warband  may roll two extra dice when rolling Black Market Contacts. He add a +3 Bonus to these extra dice rolls.",
      },
      {
        name: "Trader",
        description:
          "The warband sells items at a 20% bonus. The warband buys items at a 10% discount.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by Mercenaries, Dwarfs, Witch Hunters, Sisters of Sigmar, and Lizardmen.",
      },
    ],
  },
  {
    name: "Beast Hunter",
    stats: {
      move: 5,
      fight: "+2",
      shoot: "+2",
      armor: 11,
      will: "+0",
      health: 12,
      cost: "125gc + 10%",
    },
    abilities: [
      {
        name: "Equipment",
        description: "hand Weapon, Bow, Quiver, Dagger, Light Armor.",
      },
      {
        name: "Trophy Taking",
        description: `Because of their experience hunting ‘prize animals’ they gain
       +1 Shoot when shooting at prize animals and +1 Fight when fighting them. Any figures 
       with the Animal or Large traits count for this skill. Whenever the Beast Hunter kills such
       a creature, every figure in the warband gains 5XP and an extra 5gc is gained at the end of the game. The Hunter does not 
       the warband's do not need to pay upkeep to the Beast Hunter in the turn it killed such a creature.
       `,
      },
      {
        name: "Trapper",
        description: "The Beast Hunter have the Set Traps trait.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Skaven, Undead, Orcs, and Cult of the Possessed.",
      },
    ],
  },
  {
    name: "Highwayman",
    stats: {
      move: 7,
      fight: "+3",
      shoot: "+2",
      armor: 11,
      will: "+2",
      health: 12,
      cost: "200gc + 20%",
    },
    abilities: [
      {
        name: "Equipment",
        description: "2 Pistols, Hand Weapon, Leather Armor, Horse",
      },
      {
        name: "Ambusher",
        description:
          'During deployment, may me placed anywhere on the table further than 6" of enemy figures and outside of line of sight of every enemy figure. ',
      },
      {
        name: "Mobile Bandit",
        description:
          "The Highwayman starts every battle riding a horse. The statblock for the horse and riding rules are in the Spellcaster Magazine #1",
      },
      {
        name: "Draft Horse",
        description:
          "The horse have the Surefooted Advanced Horsemanship training bonus. Check the Spellcaster Magazine #1 to check these bonuses",
      },
      {
        name: "Horse Lodging",
        description:
          "A Highwayman takes care of lodging and feeding his own horse. The Stable base upgrade isn't needed. His upkeep is 10% highet to compensate for this.",
      },
      {
        name: "Quick Draw",
        description:
          'May make a Shooting Attack and Fight attack during the same activation. He may move 3" as an free action between both attacks. This movement may be used to enter combat, but not to leave the table.',
      },
      {
        name: "No honor between thieves",
        description:
          "A Highwayman, despite all his skill and bravado, is not to be trusted. At the end of each battle roll a D20, on a roll of a 1-5 the warband loses 1 Wyrdstone Shard than they would normally as the Highwayman has stolen it for himself (this Wyrdstone Shard is lost!). Obviously, if this keeps happening it will be up to warband leader to keep the Highwayman in his employ or not.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Sisters of Sigmar and Witch Hunters.",
      },
    ],
  },
  {
    name: "Imperial Assassin",
    stats: {
      move: 7,
      fight: "+2",
      shoot: "+0",
      armor: 10,
      will: "+2",
      health: 10,
      cost: "80gc + 10%",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Two Daggers, Light Armor.",
      },
      {
        name: "Black Lotus coated Blades",
        description: "The Imperial Assassin has the Poison trait.",
      },
      {
        name: "Stealth",
        description:
          'Enemies cannot draw line of sight to the Imperial Assassin while further than  12" away.',
      },
      {
        name: "Backstabber",
        description: `Imperial Assassins gain an additional +2 to their Fight if they are already receiving
a bonus from one or more supporting figures (so, an assassin with 1 supporting figure
would gain a +4 modifier). However, assassins themselves never count as a supporting
figure for anyone else, even members of their own warband.`,
      },
      {
        name: "Rapelling Death",
        description: `Once per game, if not in combat, the Assasin may as an action, be removed from the table. Then,
        during its next activation, as an action, it may then be positioned at any point that is not within 8" of an enemy figure and outside of every enemy figure line of sight. If a enemy figure is outside of light of sight of every other figure of it's warband, the Assassin may be setup in combat with it.`,
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Witch Hunters, Sisters of Sigmar, Orcs, and Skaven.",
      },
    ],
  },
  {
    name: "Roadwarden",
    stats: {
      move: 5,
      fight: "+3",
      shoot: "+0",
      armor: 13,
      will: "+2",
      health: 14,
      cost: "120gc + 20%",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon, Hand Crossbow, Heavy armor, Horse",
      },
      {
        name: "Roadwarden",
        description:
          "The Roadwarden starts every battle riding a horse. The statblock for the horse and riding rules are in the Spellcaster Magazine #1",
      },
      {
        name: "Stalwart Horsemanship",
        description:
          "The Warhorse have the Barding and Loyal Advanced Horsemanship training bonuses. Check the Spellcaster Magazine #1 to check these bonuses",
      },
      {
        name: "Horse Lodging",
        description:
          "A Roadwarden takes care of lodging and feeding his own horse. The Stable base upgrade isn't needed. His upkeep is 10% highet to compensate for this.",
      },
      {
        name: "Sworn Protector",
        description:
          'Whenever a enemy figure moves into combat with a friendly figure within 3" of the Roadwarden, the Roadwarden may move up to 3" and also move into that combat.',
      },
      {
        name: "Stalwart",
        description: "May never leave the table and have the Mind Lock trait.",
      },
      {
        name: "Criminal Arrester",
        description:
          "The Roadwarden chooses one figure from the enemy warband at the start of the game. That figure have the Bounty(100) trait to the Bounty Hunter only. That figure does not roll on the Injury table if taken out of action, making a full recovery automatically.",
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by Witch Hunters, Sisters of Sigmar, Dwarfs, Mercenaries, and Lizardmen.",
      },
    ],
  },
  {
    name: "Tilean Marksman",
    stats: {
      move: 6,
      fight: "2",
      shoot: "+2",
      armor: 11,
      will: "+1",
      health: 12,
      cost: "150gc + 15%",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          'MasterworkCrossbow(+1 to Shoot, +6" range), Hand Weapon, Pavise, Light Armor.',
      },
      {
        name: "Crack Shot",
        description: `A Tilean Marksman causes critical hits on rolls of 19 or 20. A figure that takes more than 5 damage from a Tilean Marskman Shooting Attack may only use one action during it's next activation.`,
      },
      {
        name: "Seagull's Dive",
        description: `When shooting from a elevated position against an enemy figure, the Tilean Marksman may treat the armor of any enemy figure as being 1 point lower.`,
      },
      {
        name: "Hiring Restrictions",
        description:
          "May be hired by any warband except Skaven, Orcs, and Undead.",
      },
    ],
  },
];

function HiredSwordsPage() {
  const navigate = useNavigate();

  const sections = [
    {
      id: "general-rules",
      label: "General Rules",
      type: "Rules",
    },
    ...hiredSwords.map((unit) => ({
      id: slugify(unit.name, { lower: true }),
      label: unit.name,
      type: "Units",
    })),
  ];

  return (
    <PageContainer>
      <Header title="Hired Swords of Mordheim" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "Gold buys swords, but it cannot buy loyalty. These mercenaries come
            and go like shadows, fighting for whoever pays the most. Today they
            stand beside you. Tomorrow? Who knows."
            <QuoteAttribution>
              — Captain Hermann Todbringer, Reikland Mercenaries
            </QuoteAttribution>
          </QuoteBox>

          <div id="general-rules">
            <ParchmentText sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
              <strong style={{ color: "#d4af37", fontSize: "1.6rem" }}>
                Hired Swords Rules
              </strong>
              <p>
                The City of the Damned draws warriors from across the Old World.
                Mercenaries, outcasts, and fortune-seekers all come seeking
                gold, glory, or redemption in Mordheim's cursed streets. These
                Hired Swords fight for coin rather than conviction, their
                loyalty lasting only as long as the gold keeps flowing.
              </p>
              <br />
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Warband Slot Requirements
              </strong>
              <br />
              <br />
              Hired Swords are professional warriors who take up valuable space
              in your warband's hierarchy.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Specialist Slot Rules:
              </strong>
              <br />• Hired Swords and Dramatis Personae each take up{" "}
              <strong>one Specialist slot</strong> in your warband
              <br />• This means they count against your warband's specialist
              limit and total model count
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Hiring Process
              </strong>
              <br />
              <br />
              Hired Swords can be recruited during if a warband finds them
              through exploration events. battle.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Hiring Steps:</strong>
              <br />• <strong>Meet Hiring Conditions:</strong> Your warband must
              meet any specific hiring conditions listed for that individual
              (alignment, warband type, special challenges, etc.)
              <br />• <strong>Pay the Hiring Cost:</strong> If conditions are
              met, you may immediately pay the hiring cost listed on the Hired
              Sword's card to recruit them
              <br />• <strong>Add to Warband:</strong> The new recruit joins
              your warband immediately and can be used in your next game
              <br />• <strong>Hiring Restrictions:</strong> Each Hired Sword
              lists which warbands may hire them. Some may not work with certain
              factions due to racial tensions, moral conflicts, or other reasons
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Upkeep Costs
              </strong>
              <br />
              <br />
              Unlike regular warriors, Hired Swords demand payment for their
              continued service. They are mercenaries first and foremost, and
              will leave if their payment is not met.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Paying Upkeep:</strong>
              <br />• Upkeep must be paid <strong>
                between each game
              </strong>{" "}
              (during the post-game phase before the next battle)
              <br />• The upkeep cost is listed on each Hired Sword's card
              (example: "10% upkeep" means 10% of their hiring cost, rounded up)
              <br />• If you cannot or choose not to pay upkeep, the Hired Sword{" "}
              <strong>leaves your warband permanently</strong>
              <br />• Some individuals may accept alternative payment
              (Wyrdstone, Crimson Shade, magic items, etc.) as noted in their
              abilities
              <br />• Upkeep represents payment, bribes, equipment maintenance,
              and other costs of keeping a mercenary satisfied
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Experience and Advancement
              </strong>
              <br />
              <br />
              Hired Swords are already experienced warriors at the peak of their
              abilities. Unlike regular warband members, they do not grow or
              learn through battle.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Advancement Restrictions:
              </strong>
              <br />• Hired Swords <strong>cannot gain experience</strong> from
              battles
              <br />• They <strong>cannot learn new skills</strong> or increase
              their characteristics
              <br />• They arrive fully trained and leave the same way
              <br />• Their abilities and statistics are fixed and cannot be
              modified (except by temporary effects during battle)
              <br />• This is balanced by their immediate availability and high
              skill level
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Availability
              </strong>
              <br />
              <br />
              Unlike Dramatis Personae (unique named individuals), Hired Swords
              represent types of mercenaries rather than specific individuals.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>
                Multiple Hiring Rules:
              </strong>
              <br />•{" "}
              <strong>
                The same type of Hired Sword can serve multiple warbands
              </strong>{" "}
              simultaneously
              <br />• There is no exclusivity — if you hire a "Dwarf
              Trollslayer," another player can also hire a different Dwarf
              Trollslayer
              <br />• Each represents a different individual of that profession,
              not a single unique person
              <br />• This is different from Dramatis Personae, who are unique
              individuals and can only serve one warband at a time
              <br />
              <br />
              <em style={{ color: "#c4a870" }}>
                Example: Your warband has hired an "Elf Ranger" — this
                represents one of many elven rangers wandering Mordheim. Another
                player can also hire an Elf Ranger; these are different
                individuals with the same profession and training.
              </em>
            </ParchmentText>
          </div>

          <Box sx={{ mb: 4 }}>
            <WarbandIndex sections={sections} />
          </Box>

          {hiredSwords.map((unit) => (
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

export default HiredSwordsPage;
