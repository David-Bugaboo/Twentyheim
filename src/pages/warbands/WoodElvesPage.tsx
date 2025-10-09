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

const woodElvesUnits = [
  {
    name: "Glade Lord",
    role: "Hero",
    stats: {
      move: 7,
      fight: "0",
      shoot: "+3",
      armor: 9,
      will: "+5",
      health: 18,
      cost: "-",
    },
    abilities: [
      {
        name: "Lord of the Forest",
        description:
          "Any figure that activates along with this figure during the Hero's phase can use the Glade Lord's Will stat instead of its own.",
      },
      {
        name: "Ways of the Wild Hunt",
        description:
          "The Glade Lord starts with 5 powers from the Ways of the Wild Hunt list. One of these powers is his signature Way and has an activation number of 3. The rest of the powers have an activation number of 5.",
      },
      {
        name: "Master Archer",
        description:
          "The Glade Lord is allowed to take a special 'aim' action. If this action is immediately followed by a shoot action in the same activation, the Glade Lord may ignore the first piece of intervening terrain (but not cover) between him and his target.",
      },
      {
        name: "Forest Strider",
        description:
          "The Glade Lord never suffers movement penalties for rough terrain and forest terrain.",
      },
      {
        name: "Equipment",
        description:
          "The Glade Lord may equip Hand Weapons, Bows, Light Armor and the warband's exclusive Asrai Longbow, Moonfire Arrow and Cloak of Leaves.",
      },
    ],
  },
  {
    name: "Spellsinger",
    role: "Champion",
    stats: {
      move: 7,
      fight: "0",
      shoot: "0",
      armor: 8,
      will: "+4",
      health: 12,
      cost: "100gc",
    },
    abilities: [
      {
        name: "Apprentice Spellcaster",
        description:
          "Spellsingers may cast spells from the Elementalist, Soothsayer and Sonancer schools of magic. The figure starts the game with 4 such spells, and always casts them at a -2 Casting roll.",
        spellAffinity: "spellsinger",
      },
      {
        name: "Forest Walk",
        description:
          'Once per game, the Spellsinger may spend an action to teleport to any forest terrain, provided it is not within 6" of an enemy figure. He may not cast in the turn he uses this ability.',
      },
      {
        name: "Equipment",
        description:
          "Spellsingers can start with and equip Daggers, Staffs and Bows.",
      },
    ],
  },
  {
    name: "Glade Scout",
    stats: {
      move: 7,
      fight: "+1",
      shoot: "+0",
      armor: 9,
      will: "+0",
      health: 10,
      cost: "Free",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Hand Weapon.",
      },
    ],
  },
  {
    name: "Glade Guard",
    stats: {
      move: 7,
      fight: "+1",
      shoot: "+2",
      armor: 10,
      will: "+1",
      health: 10,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Equipment",
        description: "Asrai Longbow, Quiver, Dagger, Light Armor.",
      },
    ],
  },
  {
    name: "Wild Rider",
    stats: {
      move: 8,
      fight: "+3",
      shoot: "+0",
      armor: 12,
      will: "+2",
      health: 12,
      cost: "75gc",
    },
    abilities: [
      {
        name: "Wild Hunt Frenzy",
        description:
          'Wild Riders have Mind Lock. Additionally, if a Wild Rider moves at least 6" before entering combat, they gain +1 Damage for the first fight after that.',
      },
      {
        name: "Reckless Abandon",
        description:
          "Wild Riders must always move toward the nearest visible enemy figure if they are not already in combat. If an enemy is visible, and they do not end their turn closest to that enemy that they were before the movement, they gains a Stun Token.",
      },
      {
        name: "Forest Riders",
        description:
          "Wild Riders never suffer movement penalties for any terrain, but cannot climb.",
      },
      {
        name: "Equipment",
        description: "Throwing Spear, Hand Weapon, Light Armor, Shield.",
      },
    ],
  },
  {
    name: "Wardancer",
    role: "Specialist",
    stats: {
      move: 8,
      fight: "+4",
      shoot: "+0",
      armor: 10,
      will: "+1",
      health: 12,
      cost: "150gc",
    },
    abilities: [
      {
        name: "War Dance",
        description:
          "Wardancers have trained to fight more than one opponent at once, and so their opponents can never claim more than +2 for supporting figures, no matter how many friendly figures are actually in combat with the Wardancer. Furthermore, if the Wardancer wins a hand-to-hand combat against an opponent that is wearing light or heavy armor, that opponent suffers -1 Armor for the purposes of determining damage from the Wardancer's attack.",
      },
      {
        name: "Acrobatic",
        description:
          'Wardancers never take falling damage from falls of 6" or less.',
      },
      {
        name: "Equipment",
        description: "Hand Weapon, Dagger, Light Armor.",
      },
    ],
  },
  {
    name: "Waywatcher",
    role: "Specialist",
    stats: {
      move: 7,
      fight: "+1",
      shoot: "+3",
      armor: 10,
      will: "+2",
      health: 10,
      cost: "120gc",
    },
    abilities: [
      {
        name: "Forest Ghost",
        description:
          'Due to their skills in stealth and camouflage, no figure may draw line of sight to a Waywatcher that is more than 16" away or in any kind of cover. Additionally, if a figure can\'t draw line of sight to the Waywatcher due to this ability, the Waywatcher may take a special "Snipe" action against that figure. If this action is taken, its next shooting attack may ignore the first piece of intervening terrain between the Waywatcher and the target.',
      },
      {
        name: "Equipment",
        description: "Asrai Longbow, Hand Weapon, Light Armor.",
      },
    ],
  },
 
  {
    name: "Treant",
    role: "Maximum One",
    stats: {
      move: 4,
      fight: "+2",
      shoot: "-",
      armor: 15,
      will: "+3",
      health: 24,
      cost: "200gc",
    },
    abilities: [
      {
        name: "Ancient Guardian",
        description:
          "The Treant is a Large construct-like creature that has Large. Its skin is thick like bark, but it has Elemental Vulnerability(3).",
      },
      {
        name: "Forest's Presence",
        description:
          'While the Treant has not taken Elemental damage during this turn, all allied figures within 6" of it count as having Heavy Cover.',
      },
    ],
  },
];

const woodElvesEquipment = [
  {
    name: "Asrai Longbow",
    description:
      'An Asrai Longbow is a masterwork bow crafted from the living wood of Athel Loren. Range: 30", treat the armor of a figure hit by a Shooting Attack from this bow as 1 point lower.',
  },
  {
    name: "Moonfire Arrow",
    description:
      "A Moonfire Arrow is a single magical arrow that may be fired once per game. When declared, the arrow automatically hits if the target is in range and line of sight (no Shoot roll required). The arrow deals +3 Damage and the target's armor is reduced to 10 for calculating damage. Cost: 30gc (single use).",
  },
];

const waysOfTheWildHunt = [
  {
    name: "Way of the Forest's Blessing",
    when: "At the start of any turn, before rolling initiative.",
    effect:
      'If at least half of the warband is in forest terrain or within 3" of forest terrain, the warband automatically wins initiative this turn.',
  },
  {
    name: "Way of the Arrow Storm",
    when: "At any point during the Glade Lord's activation.",
    effect:
      "The Glade Lord immediately gains an extra action. This action can only be used to make shooting attacks and nothing else. This power cannot take the Glade Lord over 3 actions.",
  },
  {
    name: "Way of the Hidden Path",
    when: "At any point during the Glade Lord's activation.",
    effect:
      'The Glade Lord is removed from the table. During their next activation, they may be placed anywhere in forest terrain on the table, or if no forest terrain exists, anywhere on the table that is not within 8" of an enemy figure.',
  },
  {
    name: "Way of the Spellweaver's Arrow",
    when: "At any point during the Glade Lord's activation, if there is a Spellsinger in the warband.",
    effect:
      "If the Glade Lord makes an attack action against a creature, hits, and deals at least 1 damage, the next Casting Roll of a spell made against that creature by the Spellsinger is made at +2.",
  },
  {
    name: "Way of the Wild Hunt's Fury",
    when: "At any point during the Glade Lord's activation.",
    effect:
      "Until the end of his activation, The Glade Lord gains +2 Fight, +2 Move and can attack with his elf bow as if it were a Two Handed Weapon. He must, however, end his turn in combat with an enemy figure. If he cannot do so, he cannot use this power.",
  },
  {
    name: "Way of the Pinning Shot",
    when: "Whenever an enemy figure moves into combat with any wood elf.",
    effect:
      "If the Glade Lord has range and line of sight against the enemy figure, he may immediately make a Shooting Attack against that creature. If that creature is in forest terrain, it may not Fight during this activation.",
  },
  {
    name: "Way of the Killing Shot",
    when: "Whenever the Glade Lord hits a figure with a Shooting Attack, with an unmodified roll of 18, 19 or 20.",
    effect: "the hit is a critical hit.",
  },
  {
    name: "Way of the Forest's Vengeance",
    when: 'Whenever any Wood Elf figure is reduced to 0 Health within 12" of the Glade Lord.',
    effect:
      'The Glade Lord and all Bark Guardians within 6" of him gain +1 Fight and +1 Damage until the end of the turn as the fury of the forest is unleashed.',
  },
  {
    name: "Way of the Moonfire Beacon",
    when: "Whenever the Glade Lord hits a figure with a Shooting Attack made using a Moonfire Arrow.",
    effect:
      "The enemy figure gains a Marked by The Moon token. Any Wood Elf shooting against this figure ignores the first piece of intervening terrain between him and the figure. Effects that make it impossible to draw line of sight if not within X distance also stop working. A Figure loses the Marked by the Moon token at the start of its activation.",
  },
  {
    name: "Way of the Ancient Wrath",
    when: "At any point during the Glade Lord's activation.",
    effect:
      "The Glade Lord may climb upon a Treant within 2\" of himself. While mounted on the Treant, any attacks directed at him are treated as if against Heavy Cover and use the Treant's Armor. The Glade Lord gains +1 Shoot while upon a Treant.",
  },
  {
    name: "Way of the Barkpiercer",
    when: "At any point during the Glade Lord's activation.",
    effect:
      "The Glade Lord draws a straight line from any point of his base to any edge or corner of the battlefield. Any creatures in this line take a Shooting Attack using the Glade Lord's Shoot stat.",
  },
  {
    name: "Way of the Forest's Embrace",
    when: "At any point during the Glade Lord's activation.",
    effect:
      'The area within 6" of the Glade Lord becomes a figment of Athel Loren. Wood Elfs and Bark Guardians within this area count as being in Heavy Cover, and recover 2 health at the start of their activations. If the Glade Lord takes elemental damage, this power effect immediately ends.',
  },
];

function WoodElvesPage() {
  const navigate = useNavigate();

  const units = woodElvesUnits.map((unit) => ({
    id: slugify(unit.name, { lower: true }),
    label: unit.name,
    type: "Unit",
  }));

  const equipment = woodElvesEquipment.map((item) => ({
    id: slugify(item.name, { lower: true }),
    label: item.name,
    type: "Equipment",
  }));

  const ways = waysOfTheWildHunt.map((power) => ({
    id: slugify(power.name, { lower: true }),
    label: power.name,
    type: "Way",
  }));

  const sections = [...units, ...equipment, ...ways];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Wood Elves of Athel Loren" />

      <ContentSection>
        <ContentContainer>
          <div id="units">
            {woodElvesUnits.map((unit, index) => (
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
            {woodElvesEquipment.map((item, index) => (
              <div key={index} id={slugify(item.name, { lower: true })}>
                <EquipmentCard
                  name={item.name}
                  description={item.description}
                />
              </div>
            ))}
          </div>

          <div id="ways">
            <PowerListTitle>Ways of the Wild Hunt</PowerListTitle>

            <ParchmentText>
              The Ways of the Wild Hunt represent the ancient traditions of the
              Wood Elves, blending martial prowess with the primal magic of
              Athel Loren. These powers emphasize{" "}
              <strong>
                mobility, deadly archery, and harmony with the forest itself
              </strong>
              . From disappearing into hidden paths to unleashing storms of
              arrows, each Way reflects the savage grace and supernatural
              connection to nature that defines the Wood Elves.
              <br />
              <br />
              In short, the Ways of the Wild Hunt are designed to make the Glade
              Lord feel like a master hunter and guardian of the forest — swift,
              deadly, and one with the wild.
            </ParchmentText>

            {waysOfTheWildHunt.map((power, index) => (
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

export default WoodElvesPage;
