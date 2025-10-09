import { Typography, Tooltip, styled, ClickAwayListener } from "@mui/material";
import { type ReactNode, useState } from "react";

interface GameTerm {
  term: string;
  description: string;
}

const gameTerms: GameTerm[] = [
  {
    term: "Bleed Token",
    description:
      "A creature with a Bleed Token takes 2 damage whenever it moves or takes damage. Healing potions or healing spells/powers can remove Bleed Tokens.",
  },
  {
    term: "Stun Token",
    description:
      "A Figure with a Stun Token must spend an action to remove the Stun Token. It then acts normaly with any actions left.",
  },
  {
    term: "Ablaze Token",
    description:
      "A creature with an Ablaze Token (on fire) takes 3 elemental damage at the start of each of its activations until it spends an action to put the fire out.",
  },
  {
    term: "Echo Token",
    description:
      "A creature with an echo token takes 1 extra damage at any time it takes damage for each echo token it has.",
  },
  {
    term: "Guidance Token",
    description:
      "Can be discarded to reroll a Combat Roll, Shooting Roll, or Stat Roll. The figure must take the result of the reroll. No figure may have more than one guidance token at one time.",
  },
  {
    term: "Hatred Token",
    description:
      "Can be spent to reroll any Fight or Shooting Attack roll that figure makes.No figure may have more than one guidance token at one time. ",
  },
  {
    term: "Marked by The Moon",
    description:
      "Wood Elves shooting against this figure ignore the first piece of intervening terrain. Effects that prevent line of sight beyond X distance stop working. Lost at the start of the figure's activation.",
  },
  {
    term: "Mind Lock",
    description:
      "This creature is Immune to Mind Control and Immune to Suggestion.",
  },
  {
    term: "Large",
    description:
      "This huge creature is easier to target with shooting attacks. It suffers from the Large Target modifier (-2) when defending against shooting attacks.",
  },
  {
    term: "Strong",
    description: "This creature does +2 damage.",
  },
  {
    term: "Fear",
    description:
      "Enemies must pass a TN 12 Will test to move into combat with this creature.",
  },
  {
    term: "Undead",
    description:
      "This creature is immune to poison and never counts as wounded. Undead creatures can pick up and carry treasure tokens but have no item slots.",
  },
  {
    term: "Animal",
    description:
      "A natural creature with less-than-human intelligence. Even if they become a member of a warband, animals cannot pick up treasure tokens and have no item slots.",
  },
  {
    term: "Amphibian",
    description:
      "This creature is perfectly happy on land or in the water. It automatically passes all Swimming Rolls, treats water as normal instead of rough ground, and suffers no Fight penalties for being in the water.",
  },
  {
    term: "Flying",
    description:
      "This creature ignores all terrain and movement penalties when moving. Furthermore, it never takes damage from falling. Flying creatures automatically pass all Swimming Rolls.",
  },
  {
    term: "Levitate",
    description:
      "Ignore any castings of Beauty or Invisibility when determining this creature’s actions. Furthermore, if this figure is ever in combat with an Illusionary Soldier, the Illusionary Soldier is immediately removed from the table.",
  },
  {
    term: "Bounty",
    description:
      "There is a reward of (X) awaiting the warband that kills this creature",
  },
  {
    term: "Truesight",
    description:
      "The figure can see through illusions and magical concealment.",
  },
  {
    term: "Poison",
    description:
      "Attacks from this creature are venomous and deal poison damage.",
  },
  {
    term: "Regeneration",
    description:
      "The figure recovers health at the start of its activation unless prevented by specific damage types.",
  },
  {
    term: "Latch-on",
    description:
      "Figures in combat with this creature may only push back themselves or their opponent only if they do damage. Simply winning the combat is not enough.",
  },
  {
    term: "Opponent Armor Reduction",
    description:
      "If this figure wins a round of combat versus a figure wearing light or heavy armour, its opponent suffers -1 armour against the attack.",
  },
  {
    term: "Energy Drain",
    description:
      "This creature deals double damage in combat. Undead and constructs are immune to this extra damage and just take the standard amount.",
  },
  {
    term: "Vampiric Touch",
    description:
      "This figure gains 2 health whenever it deals at least 1 damage.",
  },
  {
    term: "Pack Hunter",
    description:
      "Whenever a pack hunter is activated, all other pack hunters in contact with it should be activated and moved as one. Roll randomly to see which creature is the ‘pack leader’ and determine the pack’s actions using that figure.",
  },

  {
    term: "Elemental Resistance",
    description:
      "Whenever this creature takes elemental damage, increase its armour by (X) for the purposes of determining damage from that attack.",
  },
  {
    term: "Burning Touch",
    description: "Attacks from this figure deal elemental damage.",
  },
  {
    term: "Horns",
    description:
      "If this creature moves into combat and spends an action to fight as part of the same activation, it receives +2 Fight for that attack only..",
  },
  {
    term: "Construct",
    description:
      "This creature is immune to poison and never counts as wounded. Constructs can pick up and carry treasure tokens but have no item slots. Although constructsmay never carry items, some items may be permanently grafted to them – if available, this option will be noted in the item’s description.",
  },
  {
    term: "Demon",
    description:
      "All attacks made by this creature count as magic attacks. This creature is immune to poison. Demons can pick up and carry treasure tokens but have no item slots.",
  },
  {
    term: "Demon",
    description:
      "This creature is a demon from the Realm of Chaos. Demons are immune to psychology effects and poison.",
  },
  {
    term: "Construct",
    description:
      "This creature is an animated construct. Constructs are immune to poison and psychology effects, and never count as wounded.",
  },
  {
    term: "Elemental Vulnerability",
    description:
      "This creature is vulnerable to elemental damage. When taking elemental damage, reduce its armor by (X) for the purposes of determining damage.",
  },
  {
    term: "Savage",
    description:
      "This creature's attacks count as using a Two-handed weapon, dealing increased damage with brutal strikes.",
  },
  {
    term: "Heavy Cover",
    description:
      "Shooting attacks against figures in Heavy Cover suffer -4 to their Shoot rolls.",
  },
  {
    term: "Light Cover",
    description:
      "Shooting attacks against figures in Light Cover suffer -2 to their Shoot rolls.",
  },
  // Weapons & Equipment
  {
    term: "Hand Weapon",
    description:
      "A standard melee weapon (sword, axe, mace, etc.). No special modifiers. Can be dual-wielded with a dagger or another hand weapon for +1 Fight.",
  },
  {
    term: "Dagger",
    description:
      "A small blade. Deals -1 damage. Can be used in the offhand with a hand weapon or equivalent for +1 Fight.",
  },
  {
    term: "Two-handed Weapon",
    description:
      "A large weapon (greatsword, halberd, etc.) that requires both hands. Deals +2 damage. Cannot be used with a shield or in the offhand. Occupies two item slots.",
  },
  {
    term: "Staff",
    description:
      "A wooden staff favored by spellcasters and travellers. Deals -1 damage, but enemy hand-to-hand combat damage is reduced by 1.",
  },
  {
    term: "Bow",
    description: 'A ranged weapon with 24" range. Requires both hands.',
  },
  {
    term: "Crossbow",
    description:
      "Crossbows take one action to load and one action to fire. If a figure wishes, it may replace its movement action with a ‘reload’ action. Crossbows have a +2 damage modifier. Crossbows also have a maximum range of 24”. It is assumed that all crossbows start the game loaded and ready to fire. In order to use a crossbow, a figure must also be carrying a quiver (which fills another item slot) or some type of magic ammunition.",
  },
  {
    term: "Hand Crossbow",
    description:
      'Hand Crossbows take one action to load and one action to fire. If a figure wishes, it may replace its movement action with a ‘reload’ action. However, they may be used and loaded with only one hand. Crossbows have a +1 damage modifier and a maximum range of 12". Additionally, Hand Crossbows count as daggers in close combat, including for Two-Weapon Fighting. It is assumed that all hand crossbows start the game loaded and ready to fire.',
  },
  {
    term: "Javelin",
    description:
      "Javelins are treated as hand weapons when used in hand-to-hand combat. They can also be thrown up to 10”. A thrown javelin is treated as a standard shooting attack and follows all of the rules for bows and crossbows. Any spell or special affect that causes a penalty to bow and crossbow attacks will also affect attacks with thrown javelins.",
  },
  {
    term: "Sling",
    description:
      "A simple ranged weapon with 6\" range. Deals -2 damage. Can be used in the offhand, and doesn't cause encumberance when carrying Wyrdstone Shards.",
  },
  {
    term: "Light Armor",
    description:
      "Leather or light mail armor. Provides +1 Armor. Does not interfere with movement.",
  },
  {
    term: "Light Armour",
    description:
      "Leather or light mail armor. Provides +1 Armor. Does not interfere with movement.",
  },
  {
    term: "Heavy Armor",
    description:
      "Plate mail or full armor. Provides +2 Armor. Have a -1 Penalty to movement.",
  },
  {
    term: "Heavy Armour",
    description:
      "Plate mail or full armor. Provides +2 Armor. Have a -1 Penalty to movement.",
  },
  {
    term: "Shield",
    description:
      "A defensive item that provides +1 Armor. Can be used with one-handed weapons.",
  },
  {
    term: "Musket",
    description:
      'This larger, two-handed firearm is the most common variety of black powder weapon. Deals +2 damage and ignores 2 points of armor from target figures. Muskets have a maximum effective range of 24". A model may only ever carry one musket and can never carry a shield. A musket can be used in hand-to-hand combat. It counts as a two-handed weapon, but does not receive the usual +2 damage bonus.',
  },
  {
    term: "Pistol",
    description:
      'A one-handed firearm with 10" range. Deals +2 damage and ignores 2 points of armor from target figures. Count as a dagger in hand-to-hand combat, including for Two-Weapon Fighting. Requires an action to reload.',
  },
  {
    term: "Blunderbuss",
    description:
      'Usually falling between a pistol and a musket in size, a blunderbuss is a two-handed weapon that fires a spread of pellets instead of a single bullet. It has a maximum effective range of 14". When firing a blunderbuss, pick your target figure, and then make a shooting attack against that target and every other figure within 1" of it. Roll against your initial target first. If this roll is a misfire, do not roll against the other figures. Rolls of 1 when rolling against additional targets do not count as misfires. A blunderbuss can be used in hand-to-hand combat in the same way as a pistol, except it does not count for two-weapon fighting.',
  },
  {
    term: "Throwing Spear",
    description:
      'Single-use ranged weapon with 8" range. +1 damage modifier when used for shooting, -1 damage modifier in hand-to-hand combat. Once thrown, it is crossed off but replaced for free after the game. Only one may be carried per model.',
  },
  // Warband-Specific Equipment
  {
    term: "Sacrificial Dagger",
    description:
      "Brides of Khaine exclusive. A hooked and cruel knife designed to flay skin with each strike. Counts as a dagger, but scores critical hits on rolls of 19 or 20 on any attack with it in the main hand or offhand.",
  },
  {
    term: "Elven Warglaive",
    description:
      "Sea Guard of Ulthuan exclusive. An elegant and slender weapon, used for both brutal attacking and cunning defense. Counts as a staff, but with a +1 bonus to damage.",
  },
  {
    term: "Skaven Fighting Claws",
    description:
      "Skaven exclusive. Count as if the user is using two daggers (+1 to Fight due to Two-Weapon Fighting and -1 damage) and occupies both hands. Figures equipped with Skaven Fighting Claws can climb with no movement penalties.",
  },
  {
    term: "Fighting Claws",
    description:
      "Skaven exclusive. Count as if the user is using two daggers (+1 to Fight due to Two-Weapon Fighting and -1 damage) and occupies both hands. Figures equipped with Fighting Claws can climb with no movement penalties.",
  },
  {
    term: "Accursed Weapon",
    description:
      "Cult of the Possessed exclusive. Counts as a hand weapon, except it deals an extra +1 damage. However, any unmodified rolls of 1 on the d20 cause 2 damage to the attacking figure.",
  },
  {
    term: "Sigmarite Warhammer",
    description:
      "Sisters of Sigmar exclusive. Counts as a hand weapon, but if it deals 5 or more damage, the target get a Stun Token..",
  },
  {
    term: "Dwarf Axe",
    description:
      "Dwarf Treasure Hunters exclusive. A masterfully built axe that is way lighter than other axes. Counts as a dagger, but without the -1 modifier to damage.",
  },
  {
    term: "Dwarf Axes",
    description:
      "Dwarf Treasure Hunters exclusive. Masterfully built axes that are way lighter than other axes. Count as daggers, but without the -1 modifier to damage.",
  },
  {
    term: "Dwarf Greataxe",
    description:
      "Dwarf Treasure Hunters exclusive. A masterfully crafted weapon designed to pierce through enemy defenses. Counts as a Two-handed weapon that treats enemy figures' armor as being 1 point lower when calculating damage.",
  },
  {
    term: "Dwarf Great Axes",
    description:
      "Dwarf Treasure Hunters exclusive. Masterfully crafted weapons designed to pierce through enemy defenses. Count as Two-handed weapons that treat enemy figures' armor as being 1 point lower when calculating damage.",
  },
  {
    term: "Gromril Armor",
    description:
      "Dwarf Treasure Hunters exclusive. Made from the strongest metal in the Dwarf Kingdoms. As strong as full plate, but at less than half the weight. Counts as Heavy Armor, but without the -1 movement penalty.",
  },
  {
    term: "Asrai Longbow",
    description:
      'Wood Elves exclusive. A masterwork bow crafted from the living wood of Athel Loren. Range: 30". Treats the armor of a figure hit by a shooting attack from this bow as 1 point lower.',
  },
  {
    term: "Moonfire Arrow",
    description:
      "Wood Elves exclusive. A single magical arrow that may be fired once per game. When declared, automatically hits if target is in range and line of sight (no Shoot roll required). Deals +3 damage and reduces target's armor to 10 for calculating damage. Cost: 30gc.",
  },
  {
    term: "Blowpipe",
    description:
      'Lizardmen exclusive. A ranged weapon with 16" range and -4 damage modifier. The blowpipe has the Poison trait, making it deadly despite low damage.',
  },
  {
    term: "Bone Fetish",
    description:
      "Necromancer starting equipment. A dark talisman made from bones and dark materials, can be consumed to gain +2 in the casting roll of the next raise zombie or animate skull spell.",
  },
  {
    term: "Holy Relic",
    description:
      "Witch Hunters exclusive. A blessed item imbued with the power of Sigmar. Inquisitors start with one and regain it each game as long as a Warrior Priest of Sigmar is in the warband. Can be consumed to gain +3 in a single Will stat check.",
  },
  {
    term: "Holy Water Vial",
    description:
      "Can be consumed as a healing potion or thrown as a weapon (3\" range). Against Demons/Undead: deals magical damage and treats target's armor as 8. Against other creatures: no effect. Witch Hunters and Sisters of Sigmar start with one and regain it each game.",
  },
  {
    term: "Powder Horn",
    description:
      "Required accessory for black powder weapons. Contains the gunpowder needed to reload and fire muskets, pistols, and blunderbusses.",
  },
  {
    term: "Quiver",
    description:
      "Contains arrows or bolts for bows and crossbows. Required to use ranged weapons unless using magic ammunition. Fills one item slot.",
  },
  {
    term: "Dart Pouch",
    description:
      "Lizardmen equipment. Contains poisoned darts for use with blowpipes. Required for blowpipe attacks.",
  },
  {
    term: "Potion of Healing",
    description:
      "This potion restores up to 5 lost points of Health. It may not take a figure above its normal starting Health.",
  },
];

const StyledTooltipTerm = styled("span")({
  textDecoration: "underline dotted",
  textDecorationColor: "#d4af37",
  textDecorationThickness: "1px",
  textUnderlineOffset: "2px",
  cursor: "pointer",
  userSelect: "none",
  "&:hover": {
    color: "#d4af37",
  },
  "&:active": {
    color: "#c4a870",
  },
});

// Component for individual tooltip terms with mobile support
interface TooltipTermProps {
  term: string;
  description: string;
  termKey: string;
}

function TooltipTerm({ term, description, termKey }: TooltipTermProps) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipToggle = () => {
    setOpen(!open);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <span>
        <Tooltip
          key={termKey}
          title={description}
          arrow
          placement="top"
          open={open}
          onClose={handleTooltipClose}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          sx={{
            "& .MuiTooltip-tooltip": {
              backgroundColor: "rgba(28, 24, 18, 0.95)",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              fontSize: "1.05rem",
              maxWidth: "400px",
              padding: "1rem 1.25rem",
              fontFamily: '"Crimson Text", serif',
            },
            "& .MuiTooltip-arrow": {
              color: "rgba(28, 24, 18, 0.95)",
            },
          }}
        >
          <StyledTooltipTerm
            onClick={handleTooltipToggle}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {term}
          </StyledTooltipTerm>
        </Tooltip>
      </span>
    </ClickAwayListener>
  );
}

interface GameTextProps {
  children: string;
  component?: React.ElementType;
  [key: string]: any;
}

// Helper function to escape regex special characters
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function GameText({
  children,
  component = Typography,
  ...props
}: GameTextProps) {
  const Component = component;

  const processText = (text: string): ReactNode[] => {
    const elements: ReactNode[] = [];
    let remainingText = text;
    let keyCounter = 0;

    // Sort terms by length (longest first) to match longer terms before shorter ones
    const sortedTerms = [...gameTerms].sort(
      (a, b) => b.term.length - a.term.length
    );

    while (remainingText.length > 0) {
      let foundMatch = false;
      let earliestMatch: {
        index: number;
        term: string;
        description: string;
        matchedText: string;
      } | null = null;

      // Find the earliest match among all terms
      for (const { term, description } of sortedTerms) {
        // Escape special regex characters in the term
        const escapedTerm = escapeRegex(term);

        // Create regex that matches the term (case insensitive)
        // Allow optional 's' at the end for plurals
        const regex = new RegExp(`\\b${escapedTerm}s?\\b`, "i");
        const match = remainingText.match(regex);

        if (match && match.index !== undefined) {
          // Check if this match would be the earliest one
          if (!earliestMatch || match.index < earliestMatch.index) {
            earliestMatch = {
              index: match.index,
              term,
              description,
              matchedText: match[0],
            };
          }
        }
      }

      // If we found a match, process it
      if (earliestMatch) {
        // Add text before the match
        if (earliestMatch.index > 0) {
          elements.push(remainingText.substring(0, earliestMatch.index));
        }

        // Add the matched term with tooltip
        elements.push(
          <TooltipTerm
            key={`tooltip-${keyCounter++}`}
            term={earliestMatch.matchedText}
            description={earliestMatch.description}
            termKey={`tooltip-${keyCounter}`}
          />
        );

        // Update remaining text
        remainingText = remainingText.substring(
          earliestMatch.index + earliestMatch.matchedText.length
        );
        foundMatch = true;
      }

      // If no match found, add the rest of the text and break
      if (!foundMatch) {
        elements.push(remainingText);
        break;
      }
    }

    return elements;
  };

  return <Component {...props}>{processText(children)}</Component>;
}

export default GameText;
