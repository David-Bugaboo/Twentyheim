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

const vampireCourtsUnits = [
  {
    name: "Vampire Count",
    role: "Hero",
    stats: {
      move: 6,
      fight: "+3",
      shoot: "+1",
      armour: 10,
      will: "+5",
      health: 20,
      cost: "-",
    },
    abilities: [
      {
        name: "Master of Undeath",
        description:
          "Any figure that activates along with this figure during the Hero's Phase can use the Figure's Will stat instead of its own.",
      },
      {
        name: "Bloodline Traditions",
        description:
          "Vampire Counts start with 5 powers from the Bloodline Traditions. One of these powers is their Inherited Tradition and has an activation power of 3. The others have an activation power of 5.",
      },
      {
        name: "Superior Undead",
        description:
          "Vampire Counts have the following traits: Undead, Immune to Control Undead, Magic Attacks, Mind Lock, Thaumaturgic Vulnerability, True Sight, and Partial Immunity to Normal Damage, and Fear. However, he has 5 item slots as normal.",
      },
      {
        name: "Undead Constitution",
        description:
          "The Vampire is undead and cannot be healed by healing spells or heal naturally. A vampire does not heal between games. Instead, it must pay 5gc for each point of life it recovers. If a vampire is reduced to 0 HP during a game and does not have at least 5gc in its warband sheet, it will count as having rolled a Dead result on the Injury table.",
      },
      {
        name: "Equipment",
        description:
          "The Vampire Count's bloodline will decide which gear it may use.",
      },
    ],
  },
  {
    name: "Necromancer",
    role: "Champion",
    stats: {
      move: 5,
      fight: "+1",
      shoot: "+0",
      armour: 10,
      will: "+4",
      health: 14,
      cost: "100gc",
    },
    spellAffinity: {
      aligned0: ["Necromancer"],
      aligned2: ["Spiritualist", "Chronomancer"],
      neutral4: ["Witch", "Fatecaster", "Sigilist"],
      opposed6: ["Soothsayer"],
      anathema: [
        "Astromancer",
        "Sonancer",
        "Enchanter",
        "Thaumaturge",
        "Summoner",
      ],
    },
    abilities: [
      {
        name: "Apprentice Spellcaster",
        description:
          "Necromancers may cast spells from the Necromancer, Spiritualist and Chronomancer schools of magic. The figure starts the game with 4 such spells, and always casts them at a -2 Casting roll.",
      },
      {
        name: "Equipment",
        description:
          "Necromancers can only choose Hand-weapons, Daggers and Staffs from the General Equipment List. However, they start with a Bone Fetish.",
      },
      {
        name: "Graverobber",
        description:
          "The necromancer gains 10XP for each creature without the Animal, Undead, Demon and Construct keywords that was taken to 0 HP during this game, irrespective of who actually took the figure to 0 HP.",
      },
    ],
  },
  {
    name: "Zombie",
    stats: {
      move: 4,
      fight: "+1",
      shoot: "+0",
      armour: 12,
      will: "+0",
      health: 6,
      cost: "free",
    },
    abilities: [
      {
        name: "Equipment",
        description: "None. Zombies grab and bite their poor victims.",
      },
      {
        name: "Undead",
        description: "Zombies have Undead.",
      },
      {
        name: "Brainless",
        description: "Zombies cannot earn XP.",
      },
    ],
  },
  {
    name: "Skeleton Archer",
    stats: {
      move: 6,
      fight: "+0",
      shoot: "+0",
      armour: 10,
      will: "+0",
      health: 5,
      cost: "25gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Bow",
      },
      {
        name: "Animated Marksmen",
        description: "Skeleton Archers have Undead.",
      },
      {
        name: "Brainless",
        description: "Skeleton Archers cannot earn XP.",
      },
    ],
  },
  {
    name: "Dire Wolves",
    stats: {
      move: 7,
      fight: "+2",
      shoot: "+0",
      armour: 10,
      will: "+2",
      health: 10,
      cost: "50gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "None. Dire Wolves kill with their claws and fangs.",
      },
      {
        name: "Undead Beast",
        description: "Dire Wolves have Undead and Fear.",
      },
    ],
  },
  {
    name: "Dregs",
    role: "Specialist",
    stats: {
      move: 6,
      fight: "+0",
      shoot: "+0",
      armour: 10,
      will: "0",
      health: 10,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Dagger, Sling",
      },
      {
        name: "Vampire's Thrall",
        description:
          "If this figure takes part in a game as part of a vampire's warband and ends the game without rolling a 'Dead' or 'Badly Wounded' result on the survival table, it can harvest the blood of the dead and wounded for its master. Count the number of warband members, for all players, that were reduced to 0 Health during the game. Do not count undead, constructs, demons, or animals. The vampire may regain this many points of Health without having to pay for them. A vampire may only benefit from one figure with this attribute after each game.",
      },
    ],
  },
  {
    name: "Ghouls",
    role: "Specialist",
    stats: {
      move: 8,
      fight: "+4",
      shoot: "+0",
      armour: 12,
      will: "+6",
      health: 14,
      cost: "150gc",
    },
    abilities: [
      {
        name: "Equipment",
        description:
          "None. Ghouls attack with their bare hands and have no penalties for that.",
      },
      {
        name: "Savage",
        description:
          "Ghoul attacks count as using a Two-handed weapon, dealing increased damage with their brutal claws and fangs.",
      },
      {
        name: "Undead Predator",
        description: "Ghouls have Undead and Fear.",
      },
    ],
  }
  
];

const bloodlineTraditions = [
  {
    name: "Tradition of Charming",
    when: "At any time a creature fights the vampire.",
    effect:
      "The creature must make a Will roll against a TN equal to this power activation roll. The attack is negated and the action lost.",
  },
  {
    name: "Tradition of Blood Draining",
    when: "At any time the Vampire wins a Fight and deals at least 3 damage.",
    effect:
      "The vampire drains the victim's blood through its wounds. The vampire recovers 3 health and the creature gets a Bleed Token.",
  },
  {
    name: "Tradition of Mistwalking",
    when: "At any time during the vampire's activation.",
    effect: `The vampire turns partially into mist and becomes hard to see until the start of its next activation. While in Mist Form, no figure may draw line of sight to this figure if it is more than 12" away. In addition, it gains +2 Fight when making a Fight Roll against any shooting attack, until it is hit by a Shooting Attack or until the end of the turn, whichever comes first.`,
  },
  {
    name: "Tradition of the Chittering Mass",
    when: "At any time during the vampire's activation.",
    effect:
      "The vampire turns into a Swarm of Voracious Rats. During his next movement action, The vampire may move through terrain as though it were not there, but may not end his movement while still through a piece of terrain. Furthermore, the creature never suffers any movement penalty for climbing or moving over rough ground. The vampire can move through enemy figures as well (but cannot end it's movement while still through them), and when doing so, cannot be forced into combat, dealing 2 damage to any creature it passes through.",
  },
  {
    name: "Tradition of the Moonhunting",
    when: "At any time during the vampire's activation.",
    effect: `The vampire turns into a Humongous Dire Wolf. The vampire gains Large and Strong, and gains 2 move, but does not benefit from armour and weapons while transformed. The Vampire cannot carry treasure, but does not count as an animal. Any direwolves within 6" of the vampire gain +2 Will while he's transformed and may activate as if they and the vampire have Pack Hunter.`,
  },
  {
    name: "Tradition of Tyranny",
    when: "At any time during the vampire's activation.",
    effect: `The vampire extends the range of his Master of Undead ability by 6".`,
  },
  {
    name: "Tradition of the Red Fury",
    when: "At any time during the vampire's activation.",
    effect:
      "The vampire gains Energy Drain until the start of its next activation. However, if it doesn't deal damage until then, it takes 8 points of Damage.",
  },
  {
    name: "Tradition of Transfixing",
    when: "At any time during the vampire's activation.",
    effect: `Target Soldier  within 12" and line of sight of the Vampire must roll a Will roll against a TN equal to this power activation roll. If that creature fails, until the start of its next activation it becomes a temporary member of this warband. The figure cannot make self-deprecatory actions such as falling on purpose or leaving the table, but can fight and shoot as normal. Whenever that figure deals damage, the vampire recovers 2 health. The creature must roll Will against this power activation roll whenever it would take damage and at the start of each of it's turn, leaving the vampire control if succeeding in the roll.`,
  },
  {
    name: "Tradition of the Fell Ancestor",
    when: "At any time during the vampire's activation.",
    effect:
      "The vampire transforms into a Monstrous Fellbat. It gains Flying, Latch-on, and Vampiric Touch, but cannot benefit from armour and weapons until the end of its turn. Creatures attacked by the vampire that take at least 4 damage gain a Bleed Token.",
  },
  {
    name: "Tradition of the Bloodhelix",
    when: "At any time during the vampire's activation.",
    effect: `Any creature with Bleed Tokens within 9" of the vampire suffers a +3 Magic attack. For each creature hit this way, the vampire recovers 2 health. Creatures hit by the attack remove their Bleed Tokens.`,
  },
  {
    name: "Tradition of Seduction",
    when: "At any time during the vampire's activation.",
    effect: `A target figure within line of sight of the vampire must make a Will roll against this power activation roll. If the roll fails, the creature drops any Wyrdstone Shards it is carrying and moves its full movement allowance towards the vampire, always ending within 3" of it. It can be forced into combat or fall during this movement, but cannot enter combat. A creature with a Bleed Token has a -3 on its will roll against this power.`,
  },
  {
    name: "Tradition of Heartpiercing",
    when: "Whenever the Vampire wins a fight with an unmodified roll of 18, 19 or 20.",
    effect: "That hit is a critical hit. The enemy figure gains a Bleed Token.",
  },
];

function VampireCourtsPage() {
  const navigate = useNavigate();

  const units = vampireCourtsUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const traditions = bloodlineTraditions.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Tradition",
  }));

  const bloodlines = [
    {
      id: "vampiric-bloodline",
      label: "Vampiric Bloodlines",
      type: "Bloodline",
    },
  ];

  const sections = [...bloodlines, ...units, ...traditions];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Vampire Courts" />

      <ContentSection>
        <ContentContainer>
          <div id="vampiric-bloodline">
            <ParchmentText sx={{ marginTop: "2rem" }}>
              <strong style={{ color: "#d4af37", fontSize: "1.6rem" }}>
                Vampiric Bloodlines
              </strong>
              <br />
              <br />
              When creating a Vampire Courts warband, you must choose one of the
              following vampiric bloodlines. This choice defines your Vampire's
              unique characteristics and affects your entire warband.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Blood Dragon
              </strong>
              <br />
              <br />
              The Blood Dragons are a martial bloodline of vampires who pride
              themselves on their prowess in battle. They are fearsome warriors
              who disdain the use of ranged weapons, preferring to meet their
              enemies face to face in honorable combat. Their martial discipline
              inspires even their lowliest followers to fight with greater
              ferocity.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Martial Prowess:</strong> The Vampire gains +2
              Fight
              <br />• <strong>Honorable Combat:</strong> The Vampire cannot use
              missile weapons
              <br />• <strong>Disciplined Dregs:</strong> Dregs gain +1 Fight
              <br />• <strong>No Skeleton Archers:</strong> Cannot hire Skeleton
              Archers
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Lahmian
              </strong>
              <br />
              <br />
              The Lahmian bloodline descends from the ancient queen Neferata,
              mistress of seduction and manipulation. These vampires rely on
              supernatural beauty and mental dominance rather than brute force,
              bending the will of mortals and making enemies hesitate before
              striking. They move with unnatural grace and prefer subtlety to
              heavy armour and weapons.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Supernatural Grace:</strong> The Vampire gains +2
              Move and +2 Will, but loses -2 Fight and -2 Health
              <br />• <strong>Mesmerizing Presence:</strong> The Lahmian appears
              stunningly beautiful in the eyes of all living creatures who
              behold it. Any figure that wishes to attack her must first make a
              Will roll with a Target Number of 15. If the roll fails, the
              figure may not attack, but may select another action instead. The
              Will roll also applies to anyone wishing to cast a spell that
              would cause an attack on or potential damage to the Lahmian.
              Undead and constructs are immune to this effect.
              <br />• <strong>Light and Deadly:</strong> The Vampire cannot wear
              armour and can only use daggers as weapons
              <br />• <strong>Cult of Seduction:</strong> Dregs are hired at
              50gc (instead of 75gc), but Ghouls are hired at 200gc (instead of
              150gc) and Dire Wolves at 75gc (instead of 50gc)
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Strigoi
              </strong>
              <br />
              <br />
              The Strigoi are degenerate vampires who have abandoned
              civilization entirely, devolving into bestial predators. They are
              monstrous creatures of incredible strength and ferocity, fighting
              with savage fury and bare claws. Their feral nature extends to
              their followers, with newly turned ghouls serving as their primary
              foot soldiers.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Bestial Monster:</strong> The Vampire gains +2
              Fight, +2 Move, +2 armour and +2 Health, and gains Savage
              <br />• <strong>Feral Nature:</strong> The Vampire cannot use
              equipment and gains Large
              <br />• <strong>Newborn Ghouls:</strong> Strigoi vampires may hire
              Newborn Ghouls instead of Zombies. Newborn Ghouls change the
              Zombie stats to: Fight +2, armour 10, Will +2, Move 6 and Health
              12
              <br />• <strong>Ghoul Court:</strong> Ghouls are hired at 100gc
              (instead of 150gc)
              <br />• <strong>Hated by the Living:</strong> Necromancers are
              hired at 125gc (instead of 100gc), Dregs are hired at 100gc.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Necrarch
              </strong>
              <br />
              <br />
              The Necrarchs are scholarly vampires who have dedicated their
              eternal unlives to the study of necromancy and dark magic. They
              are powerful spellcasters who eschew physical combat in favor of
              commanding the winds of magic, drawing upon multiple schools of
              arcane knowledge to devastating effect. Their obsession with magic
              leaves little time for recruiting common followers.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Master Spellcaster:</strong> The Vampire does not
              gain powers from the Bloodline Traditions list, instead being a
              Master Spellcaster The Vampire may cast spells from the
              Necromancy, Spiritualist, Fatecaster and Witch schools. It starts
              the game with 8 spells from any of these lists. (Spell Affinity:
              Primary School +0: Necromancer | Aligned +2: Spiritualist,
              Fatecaster, Witch | Neutral +4: Chronomancer, Summoner,
              Illusionist, Sigilist | Opposed +6: Elementalist, Soothsayer |
              Anathema: Astromancer, Thaumaturge, Sonancer)
              <br />• <strong>Hatred Against the Living:</strong> Necrarchs
              100gc instead of 75gc to hire Dregs.
              <br />• <strong>Weak Constitution:</strong> Necrarchs start with
              -1 Fight, -1 Shoot and -2 Health, but gain +2 Will.
              <br />
              <br />
              <strong style={{ color: "#d4af37", fontSize: "1.3rem" }}>
                Von Carstein
              </strong>
              <br />
              <br />
              The Von Carstein bloodline represents vampiric nobility at its
              finest, combining aristocratic bearing with formidable combat
              ability. These vampires are natural leaders who command their
              undead legions with iron will and tactical brilliance. Their
              presence on the battlefield inspires their followers and extends
              their sphere of influence far beyond that of lesser vampires.
              <br />
              <br />
              <strong style={{ color: "#c4a870" }}>Special Rules:</strong>
              <br />• <strong>Vampiric Aristocracy:</strong> The Vampire gains
              +2 Will, +1 Fight and +1 Shoot
              <br />• <strong>Extended Command:</strong> Von Carsteins can
              activate figures within 6" of them during the Hero's Phase
              (instead of the normal 3" from Master of Undeath)
            </ParchmentText>
          </div>

          <div id="units">
            {vampireCourtsUnits.map((unit, index) => (
              <div key={index} id={slugify(unit.name, { lower: true })}>
                <UnitCard
                  name={unit.name}
                  role={unit.role}
                  stats={unit.stats}
                  abilities={unit.abilities}
                  {...(unit.spellAffinity && {
                    spellAffinity: unit.spellAffinity,
                  })}
                />
              </div>
            ))}
          </div>

          <div id="traditions">
            <PowerListTitle>Bloodline Traditions</PowerListTitle>

            <ParchmentText>
              Bloodline Traditions embody the monstrous legacy of vampiric power
              — ancient curses, feral transformations, and unholy dominion over
              both blood and will. Their design emphasizes the vampire as the
              warband's terrifying centerpiece, bending the battlefield through
              personal might and supernatural presence.
              <br />
              <br />
              In short: Bloodline Traditions are designed to make the vampire
              feel like a gothic monster-king — a predator, shapeshifter, and
              tyrant in one body. Their identity is singular and theatrical,
              ensuring every activation feels like a scene from a vampire
              legend: blood spilled, wills broken, and darkness unleashed.
            </ParchmentText>

            {bloodlineTraditions.map((power, index) => (
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

export default VampireCourtsPage;
