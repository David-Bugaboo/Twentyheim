import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import UnitCard from "../../components/UnitCard";
import PowerCard from "../../components/PowerCard";
import EquipmentCard from "../../components/EquipmentCard";
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

const dwarfUnits = [
  {
    name: "Dwarf Trollslayer",
    role: "Hero",
    stats: {
      move: 4,
      fight: "+3",
      shoot: "+0",
      armor: 11,
      will: "+4",
      health: 20,
      cost: "-",
    },
    abilities: [
      {
        name: "Grudgemaster",
        description:
          "Any figure that activates along with this figure during the Hero's Phase can use the Captain's Will stat instead of its own.",
      },
      {
        name: "Slayer Sagas",
        description:
          "The Dwarf Trollslayer starts with 5 powers from the Slayer Sagas list. One of these powers is his personal Saga and its activation power is 3. The other powers have an activation number of 5.",
      },
      {
        name: "Deathwish",
        description: "A Dwarf Trollslayer is immune to Fear and has Mind Lock.",
      },
      {
        name: "Equipment",
        description:
          "A dwarf trollslayer can start and equip Two-handed weapons, hand weapons, daggers and the Warband's exclusive Dwarf Axes and Dwarf Great Axes.",
      },
    ],
  },
  {
    name: "Dwarf Engineer",
    role: "Champion",
    stats: {
      move: 4,
      fight: "+2",
      shoot: "+2",
      armor: 11,
      will: "+3",
      health: 18,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Dwarven Masterpieces",
        description:
          "The Dwarf Engineer starts with 5 powers from the Undermountain Masterpieces list. One of these powers is his signature Masterpiece and its activation power is 5. The other powers have an activation number of 8.",
      },
      {
        name: "Military Engineering",
        description: `The Dwarf Engineer makes all Firearms and Crossbows of his warband gain an extra 4" of range.`,
      },
      {
        name: "Equipment",
        description:
          "A dwarf Engineer can start and equip Pistols, Handguns, Blunderbusses, Crossbows, Hand Crossbows, Light Armor and the Warband's exclusive Flamethrower, Dwarf Axes and Gromril Armor.",
      },
    ],
  },
  {
    name: "Beardlings",
    stats: {
      move: 4,
      fight: "+2",
      shoot: "+0",
      armor: 11,
      will: "-1",
      health: 12,
      cost: "Free",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Dwarven Axe.",
      },
    ],
  },
  {
    name: "Dwarf Clansmen",
    stats: {
      move: 4,
      fight: "+3",
      shoot: "+0",
      armor: 13,
      will: "+1",
      health: 12,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "2x Dwarf Axes or Dwarf Greataxe and Gromril Armor.",
      },
    ],
  },
  {
    name: "Dwarf Thunderers",
    role: "Specialist",
    stats: {
      move: 4,
      fight: "+2",
      shoot: "+3",
      armor: 13,
      will: "+1",
      health: 12,
      cost: "125gc",
    },
    abilities: [
      {
        name: "Gun-training",
        description:
          "A Dwarf Thunderer is allowed to take a special 'aim' action, which can be taken as a move action. If this action is immediately followed by a shoot action in the same activation, the Dwarf Thunderer may ignore the first piece of intervening terrain (but not cover) between him and his target.",
      },
      {
        name: "Equipment",
        description:
          "Crossbow and Quiver OR Musket and Powder Horn OR Blunderbuss and Powder Horn, Gromril Armor.",
      },
    ],
  },
  {
    name: "Dwarf Mechanic",
    role: "Specialist",
    stats: {
      move: 4,
      fight: "+2",
      shoot: "+0",
      armor: 11,
      will: "+1",
      health: 12,
      cost: "25gc",
    },
    abilities: [
      {
        name: "Engineering Support",
        description:
          "The terrain and climate is tough on equipment and constructs. Dwarf Mechanics are expert handymen that help with repairs and maintenance. A warband that has a Dwarf Mechanic gains a +1 to one attempt to activate Ironmen Masterpiece or Gromril Reforging Masterpiece between each game. This bonus only applies to the Engineer.",
      },
      {
        name: "Improviser",
        description:
          "Because Dwarf Mechanics are used to improvising, they never count as unarmed. If they are ever without a weapon, they count as armed with a dagger.",
      },
      {
        name: "Equipment",
        description: "Hand Weapon.",
      },
    ],
  },
  {
    name: "Dwarf Metallurgic",
    role: "Specialist",
    stats: {
      move: 4,
      fight: "+3",
      shoot: "+0",
      armor: 13,
      will: "+1",
      health: 14,
      cost: "60gc",
    },
    abilities: [
      {
        name: "Material Scrounger",
        description:
          "A Warband with a Metallurgic may roll an extra die on the Construct Modification Table during the Black Market Contacts rolls. Additionally, the warband gains a 20% discount on all purchases made from the Construct Modification Table.",
      },
      {
        name: "Forge Expert",
        description:
          "Years of working with metal and materials have made Metallurgics excellent fighters. They carry both a staff and a Dwarf Axe, and may decide which to use during any given round of combat, but must decide before the dice are rolled.",
      },
      {
        name: "Equipment",
        description: "Staff, Dwarf Axe, Gromril Armor.",
      },
    ],
  },
];

const dwarfEquipment = [
  {
    name: "Dwarf Axe",
    description:
      "A Dwarf Axe is masterfully built and is way lighter than other axes. It counts as a dagger, but without the -1 modifier to damage.",
  },
  {
    name: "Dwarf Greataxe",
    description:
      "A Dwarf Greataxe is a masterfully crafted weapon designed to pierce through enemy defenses. Dwarven Greataxes count as Two-handed weapons that treat enemy figures' armor as being 1 point lower when calculating damage.",
  },
  {
    name: "Gromril Armor",
    description:
      "Gromril Armor is made from the strongest metal in the Dwarf Kingdoms. It is a strong as a full plate, but at less than half the weight. It counts as a Heavy Armor, but without the -1 movement.",
  },
];

const slayerSagas = [
  {
    name: "Saga of the Ogreslaying",
    when: "At any point a Trollslayer fights with a figure with Large.",
    effect: `The Slayer gains +2 to Fight, and ignores 1 point of armor from the enemy figure for that fight only.`,
  },
  {
    name: "Saga of the Violent Bloodletting",
    when: "At any time a Trollslayer wins a fight but fails to cause damage.",
    effect:
      "The trollslayer attacks again. If he hits but fails to cause damage again, he will attack again, until he either misses or causes damage. Each attack will give +1 damage, cumulatively, to the slayer, but will cost 1 health, just as if the Slayer was activating this power again.",
  },
  {
    name: "Saga of Flaying",
    when: "At any time a Trollslayer wins a fight and deals at least 5 damage.",
    effect:
      "The figure the Slayer is in combat with gains a Bleed Token. While this figure has a Bleed Token, it takes 2 damage whenever it moves or takes damage. A healing potion or healing skill or power can remove a Bleed Token.",
  },
  {
    name: "Saga of Pursuit",
    when: "At any point during a Trollslayer activation.",
    effect: `The trollslayer selects a target enemy figure within 6". The Trollslayer gains +2 to his movement stat, but must enter combat with that creature. If he cannot enter combat with that creature with the +2 bonus to movement, he cannot activate this power. The trollslayer will gain +1 Damage in his next fight against that creature.`,
  },
  {
    name: "Saga of Recklessness",
    when: "At any point during a Trollslayer activation.",
    effect:
      "Until the end of this activation, the Trollslayer causes damage even when losing the fight, but also takes damage as normal.",
  },
  {
    name: "Saga of Beheading",
    when: "At any time a Trollslayer wins a fight and the damage leaves the enemy figure with less than 3 health.",
    effect: "The creature is immediately reduced to 0 Health.",
  },
  {
    name: "Saga of Inebriating Hatred",
    when: "At any time a Trollslayer reduces an enemy figure to 0 Health.",
    effect: "The trollslayer gains 3 health.",
  },
  {
    name: "Saga of Unflinching Will",
    when: "At the first time a trollslayer is reduced to 0 health during the game.",
    effect: "The Trollslayer is reduced to 1 health instead.",
  },
  {
    name: "Saga of Stoneflesh",
    when: "Anytime the trollslayer takes damage.",
    effect:
      "Reduce the amount of damage by 4. If this takes the result to 0 or less, the Trollslayer suffers no other effects from a damaging attack (e.g. poison).",
  },
  {
    name: "Saga of the Gorge-crosser",
    when: "Anytime during the Trollslayer activation.",
    effect: `The Trollslayer can use an action to make a 'Leap' move instead of a normal move. In a Leap, the Trollslayer may move up to his full movement allowance +2 in a straight line, in any direction (including straight upwards). If this move ends with the Trollslayer in the air, immediately move it back down to the table and take falling damage as appropriate. If the Slayer ends this movement in combat with a creature, it gains +2 Damage in his next fight.`,
  },
  {
    name: "Saga of the Unmovable Object",
    when: "Any time the Trollslayer would be moved by an external force, including being pushed back in combat, being moved by a spell, or by some other special rule.",
    effect:
      "The Slayer may choose to either not move, or to move any distance up to the amount normally specified by the external force.",
  },
  {
    name: "Saga of the Mountain Hurler",
    when: "Any time the Trollslayer wins a fight in hand-to-hand combat.",
    effect: `The Slayer does +1 damage and, additionally, may choose to push back his opponent up to 4" instead of the normal 1". This push back may move the figure through or over terrain or over other figures, causing 2 damage for each terrain and figure crossed. It may also move the figure into combat with another figure.`,
  },
];

const undermountainMasterpieces = [
  {
    name: "Ironmen Masterpiece",
    when: "Out of Game.",
    effect:
      "The player may immediately add one construct soldier to their crew for no cost. This soldier can be of any type from the Frostgrave Core Book or the Fireheart book, but the warband is subject to its normal limit of soldiers. A Large construct takes up two slots in the limit, and consumes 10% of the warband earnings as upkeep.",
  },
  {
    name: "Steam Power Armor Masterpiece",
    when: "Out of Game.",
    effect:
      "One soldier of the warband that is equipped or can be equipped with Gromril Armor is equipped with Steam Power Armor. Each game in which this soldier is used, the player must pay 50gc as upkeep for the armor. If the upkeep is not paid or this power is not activated, the soldier does not gain the armor's benefits but can still be used normally. A figure clad in this armor gains +4 Armor. Steam Power Armor counts as carrying a hand weapon, a pistol, and a filter mask — all built in. The filter mask makes the figure Immune to Poison.",
  },
  {
    name: "Glider Masterpiece",
    when: "Out of Game.",
    effect:
      "The Engineer builds a Glider to one target soldier of the warband or himself. The glider fills one item slot. A creature with a glider may move from a higher point to a lower as if it had Flying.",
  },
  {
    name: "Grenade Launcher Masterpiece",
    when: "Out of Game.",
    effect: `The Engineer attaches a grenade launcher to the barrel of a Dwarf Thunderer's Gun or his own gun, taking up a item slot and adding a new mode of fire to that weapon. The grenade launcher works by choosing a target within 14". The target and every figure within 3" of it take a Elemental Shooting Attack made with the grenade launcher user Shoot stat. Targets hit by the attack get an Ablaze Token. The Grenade Launcher takes an entire activation to reload.`,
  },
  {
    name: "Sawblade Bayonet Masterpiece",
    when: "Out of Game.",
    effect:
      "The engineer mounts a Steam Powered Chainsaw blade on any warband's firearm, taking up a item slot. When that weapon is used as a Close Combat Weapon, it ignores 1 point of armor from the enemy figure, even if it is on an Offhand pistol.",
  },
  {
    name: "Magnetic Boots Masterpiece",
    when: "Out of Game.",
    effect:
      "The engineer fits one warband figure with magnetic laced boots. The Magnetic Boots take up an item slot and a figure equipped with it may climb without spending any extra movement.",
  },
  {
    name: "Gromril Reforging Masterpiece",
    when: "Out of Game.",
    effect:
      "Choose one melee weapon from one warband's figure. That weapon gains +1 fight and counts as magical. A weapon cannot be the target of this masterpiece twice.",
  },
  {
    name: "Dragon's Breath Flamethrower Masterpiece",
    when: "Out of Game.",
    effect:
      'The Engineer chooses one Large Construct from the warband. The construct may as an action, make a +3 Shooting attack against the 3 closest figures within 6" in one direction decided by the player. The damage from that attack is elemental and targets hit by it get an Ablaze Token. The engineer may, once per game, activate this Attack from this construct on his activation.',
  },
  {
    name: "Shockwave Gauntlets Masterpiece",
    when: "Out of Game.",
    effect: `The engineer chooses one Large Construct from the warband without a masterpiece. Whenever the Construct fights, every figure within 1" of it take a +3 Shooting Attack. Figures that are hit by the attack are then pushed back 1".`,
  },
  {
    name: "Portable Welding Kit Masterpiece",
    when: "At any point during the engineer's activation.",
    effect: `The engineer chooses a construct, broken weapon or broken armor within 1" of it. If he chooses a construct, it recovers 5 Health. If he chooses a broken weapon, it is fixed, and may be used again.`,
  },
  {
    name: "Landmine Masterpiece",
    when: "At any point during the engineer's activation.",
    effect: `The engineer places a landmine on the floor or wall in base contact with themselves". If any creature moves within 1" of the landmine, it explodes, and every figure within 3" of it takes a +5 Shooting attack, ignoring 2 points of armor from the targets. The Engineer may only have 2 landmines active at a time.`,
  },
  {
    name: "Hookshot Masterpiece",
    when: "Out of Game.",
    effect: `The engineer fits one warband figure with a Hookshot. The Hookshot takes up one item slot. As an action (can be a move action), a figure may activate the hookshot, targeting any terrain piece or edge of platform within line of sight and 12". The figure moves in that direction immediately, and cannot be forced out of combat. Each hookshot can only be used once per game.`,
  },
];

function DwarfTreasureHuntersPage() {
  const navigate = useNavigate();

  const units = dwarfUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const equipment = dwarfEquipment.map((item) => ({
    id: slugify(item.name, { lower: true }),
    label: item.name,
    type: "Equipment",
  }));

  const sagas = slayerSagas.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Slayer Saga",
  }));

  const masterpieces = undermountainMasterpieces.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Undermountain Masterpiece",
  }));

  const sections = [...units, ...equipment, ...sagas, ...masterpieces];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Dwarf Treasure Hunters" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {dwarfUnits.map((unit, index) => (
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
            {dwarfEquipment.map((item, index) => (
              <div key={index} id={slugify(item.name, { lower: true })}>
                <EquipmentCard
                  name={item.name}
                  description={item.description}
                />
              </div>
            ))}
          </div>

          <div id="sagas">
            <PowerListTitle>Slayer Sagas</PowerListTitle>

            <ParchmentText>
              The Slayer Sagas capture the essence of the Trollslayer as a
              relentless, single-minded predator of monstrous foes. Their design
              emphasizes{" "}
              <strong>ferocity, resilience, and escalating brutality</strong>,
              reflecting a hero who grows stronger as the battle intensifies and
              thrives on taking extreme risks.
              <br />
              <br />
              In short, the Slayer Sagas are designed to make the Trollslayer
              feel like a living engine of vengeance, a figure who thrives in
              danger, hunts monstrous foes, and escalates in power as the fight
              unfolds.
            </ParchmentText>

            {slayerSagas.map((power, index) => (
              <div key={index} id={slugify(power.name, { lower: true })}>
                <PowerCard
                  name={power.name}
                  when={power.when}
                  effect={power.effect}
                />
              </div>
            ))}
          </div>

          <div id="masterpieces">
            <PowerListTitle>Undermountain Masterpieces</PowerListTitle>

            <ParchmentText>
              The Undermountain Masterpieces are extraordinary inventions and
              constructs that showcase the genius and ingenuity of the Engineer.
              Their design emphasizes{" "}
              <strong>
                mechanical innovation, battlefield versatility, and
                high-risk/high-reward engineering
              </strong>
              , offering effects that can drastically shift the tide of battle
              when deployed correctly.
              <br />
              <br />
              In short, the Undermountain Masterpieces are designed to make the
              Engineer feel like a brilliant inventor on the battlefield, whose
              creativity, foresight, and mechanical marvels can dramatically
              alter the flow of combat.
            </ParchmentText>

            {undermountainMasterpieces.map((power, index) => (
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

export default DwarfTreasureHuntersPage;
