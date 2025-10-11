import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ParchmentText,
  ContentContainer,
} from "../components/PageComponents";

export default function ConstructModificationsPage() {
  const navigate = useNavigate();

  const modifications = [
    {
      name: "Construct Hammer",
      effect:
        "This large, enchanted hammer can only be fitted to medium or large constructs. A construct that receives this modification is treated as carrying a magic weapon and receives a +2 damage modifier.",
    },
    {
      name: "Construct Killer",
      effect:
        "This modification includes etching specific runes of power into the body of the construct to tear at the mystical energies powering constructs. Whenever this construct is fighting another construct, it gains +1 Fight and +1 Damage.",
    },
    {
      name: "Demonslayer",
      effect:
        "This modification includes etching specific runes of power into the body of the construct to tear at the mystical energies binding a demon to this plane of existence. Whenever this construct is fighting a demon, it gains +1 Fight and +1 Damage.",
    },
    {
      name: "Undead Slayer",
      effect:
        "This modification includes etching specific runes of power into the body of the construct, to tear at the mystical energies animating the undead. Whenever this construct is fighting an undead opponent, it gains +1 Fight and +1 Damage.",
    },
    {
      name: "Construct Spikes",
      effect:
        "This construct is equipped with large spikes or horns. It gains the Horns attribute.",
    },
    {
      name: "Improved Joints",
      effect:
        "This modification increases the quickness of a construct making it both harder to target and more deadly in combat. The construct gains +1 Fight. This modification cannot be made to a large construct.",
    },
    {
      name: "Projectile Weapon",
      effect:
        "The construct's Shoot stat is increased to +2 if it is lower than this. The construct gains the player's choice of either a bow or crossbow and a quiver. These items should be added to the construct's notes. These items follow all the normal rules. However, the construct still has no item slots, so it may not be given a magical version of any of these items. If this modification is made on a small or medium construct, that construct now counts as a specialist soldier.",
    },
    {
      name: "Flame Discharge",
      effect:
        'Once per game, this construct may make a +3 elemental magic shooting attack with a maximum range of 8". This follows all the normal rules for a shooting attack.',
    },
    {
      name: "Poison Reservoir",
      effect:
        "This construct is equipped with a small poison reservoir that is injected into a victim when it lands a successful melee strike. The first time in a game this construct damages an opponent in combat, the attack counts as poisonous. This is true even if the opponent is immune to poison, in which case the poison is wasted. After this initial strike, the poison is exhausted until the next game.",
    },
    {
      name: "Elemental Armour",
      effect:
        "This construct has been given additional protection versus elemental magic. It gains Elemental Resistance (3).",
    },
    {
      name: "Dense Material",
      effect:
        "This construct is primarily composed of some extremely dense material, such as heavy metals, the hardest of hardwoods, meteoric rock, etc. For that reason, it is very difficult to damage with small projectile weapons. This construct can never suffer more than 3 points of damage from any bow, crossbow, or javelin attack, unless that attack is magical. In this case, increase the maximum by the total addition the ammunition gave to both Shoot and Damage. For example, an arrow that granted +1 Shoot and +1 Damage could do a maximum of 5 points of damage.",
    },
    {
      name: "Projectile Shield",
      effect:
        "The construct gains +2 Armour and +2 Fight whenever it makes a Combat Roll versus a shooting attack from a bow, crossbow, or javelin (including magical versions). The construct is still subject to the maximum armour rule.",
    },
    {
      name: "Impact Absorbers",
      effect:
        "This construct has been modified to minimize the damage of any fall. Treat all distance fallen by this construct as half of the actual amount for the purposes of determining damage. This modification causes no modification penalty.",
    },
    {
      name: "Easily Repaired",
      effect:
        "This construct is built using common parts that can be easily detached and replaced. This construct receives +1 to all Survival Rolls. A wizard receives +2 on all casting rolls of Animate Construct to bring this construct back from the dead or to heal a permanent injury.",
    },
    {
      name: "Self-Repair",
      effect:
        "This construct can repair itself. Perhaps it is composed of material that can flow around and refill damaged areas or maybe it carries tools to work on its own broken parts. Whatever the mechanism, each time the construct activates, it may spend one action (which can replace the move action) to repair one point of damage, up to its starting Health. It may even do this while in combat.",
    },
    {
      name: "Spellfeeder",
      effect:
        "These constructs can siphon off magical energy to repair damage to their bodies. Whenever this construct is the target of a successfully cast spell, it regains 2 points of lost Health, regardless of the effect of the spell (though spells that have no effect against constructs do not trigger this ability).",
    },
    {
      name: "Construct Oil",
      effect:
        "This is a barrel of magical oil used to increase the speed and efficiency of constructs. A construct receiving this modification gains +1 Move.",
    },
    {
      name: "Drillhead",
      effect:
        "The construct is equipped with a drill, or other means of quickly burrowing through terrain. The construct gains the Burrowing attribute. However, on any activation it uses this attribute, it suffers -1 Move (to a minimum of 1).",
    },
    {
      name: "Wings",
      effect:
        "The construct is equipped with wings, or some other means of limited flight. The construct gains the Flying attribute. In addition to the usual modification penalty for taking this modification, this construct may no longer pick up or carry treasure tokens.",
    },
    {
      name: "Watertight",
      effect:
        "The construct is modified to operate in water as easily as it operates on land. The construct gains the Amphibious attribute. This modification can be made with no modification penalty.",
    },
    {
      name: "Improved Resistance",
      effect:
        "The construct is given more independent willpower than is common in constructs. It gains +1 Will. This modification can be made with no modification penalty.",
    },
    {
      name: "Mind Shield",
      effect:
        "A construct with this modification receives +5 to all Will Rolls to resist Control Construct, Mind Control, and Suggestion. In the case of Mind Control, this bonus applies to every roll to resist the spell, not just the initial casting.",
    },
    {
      name: "Mystic Reservoir",
      effect:
        'This construct generates a small amount of excess mystical energy that can be tapped by a spellcaster in its warband. Essentially, the construct has a single point of power each game that can be tapped by the wizard or apprentice in his warband, so long as they are within 12" and line of sight, to empower either a Casting Roll or Will Roll.',
    },
    {
      name: "Thought Command Channel",
      effect:
        'This construct may be activated in the Wizard or Apprentice phase so long as it is within 12" and line of sight (instead of the normal 3"). The construct still counts as one of the three soldiers that can be activated in these phases.',
    },
    {
      name: "Demon Portal",
      effect:
        "This construct has been enchanted with a demonic portal on it. Whenever the wizard (and only the wizard) casts Summon Demon, and this construct is within 12\" of the wizard, it may place the summoned demon in contact with the construct instead of the wizard. If the summoning spellcaster rolls a '1' for the Casting Roll, the demon must still be placed in combat with the caster.",
    },
    {
      name: "Soulsight",
      effect:
        "The construct has been given magic optics or other ways of sensing the world that go beyond normal sight. The construct gains the True Sight attribute.",
    },
    {
      name: "Lightshielding",
      effect:
        "The construct's vision is protected (or it doesn't use traditional vision at all). The construct is immune to the Blinding Light spell. This modification can be made with no modification penalty.",
    },
    {
      name: "Organic Construction",
      effect:
        "This construct contains significant amounts of living material, such as plants, in its design. This construct is affected by Heal and Steal Health spells as though it were not a construct. This modification can be made with no modification penalty.",
    },
    {
      name: "Swarm",
      effect:
        "The construct gains the Swarm ability. This turns the construct into a swarm of smaller entities.",
    },
    {
      name: "Extra Arms",
      effect:
        "The construct has more arms (or other arm-like appendages) making it more difficult to gang up on in a fight. Figures supporting a fight against this construct only grant a +1 supporting figure bonus instead of the normal +2.",
    },
    {
      name: "Distracting",
      effect:
        'Something about the design of the construct makes it incredibly distracting. Whenever this construct, or any figure standing within 2" of the construct, makes a Fight Roll versus a shooting attack, it gains +1 to its roll. Additionally, all Casting Rolls attempted while the construct is within 3" of the caster suffer a -1 penalty.',
    },
    {
      name: "Treasure Lifter",
      effect:
        "This construct has been modified to hoist treasure into a specific compartment. This figure may pick up a treasure token without spending an action, though subject to all the other normal rules. This modification can be made with no modification penalty.",
    },
    {
      name: "Potion Reservoir",
      effect:
        'This construct may carry one potion as though it had an item slot. However, it cannot use this potion. Instead, any friendly figure within 1" may spend an action to consume this potion, provided neither figure is in combat. This modification causes no modification penalty.',
    },
    {
      name: "Smoke Release",
      effect:
        'The construct\'s fireheart creates smoke which slowly builds up inside the creature. Once per game, this construct may spend an action to release its smoke. This can be used in two ways. Either the construct can release it around itself, in which case place a 3" diameter cloud of smoke centered on the construct (3" high). Alternatively, if the construct spends the action to release smoke, then spends its second action to move, it releases the smoke in a line behind it. This line is 1" thick, 3" high and follows the exact path of the construct\'s movement, up to a maximum of 6" long. No figure may draw line of sight into, out of, or through this smoke. Figures may move through the smoke as though it is not there. At the end of each turn after the turn in which the smoke is released, roll a die, on a 16+ the smoke dissipates and should be removed from the table. This modification can be made with no modification penalty.',
    },
    {
      name: "Powerful Shove",
      effect:
        'When this construct defeats an enemy in combat, and chooses to push them back, it may push the opposing figure back 3" instead of the normal 1".',
    },
    {
      name: "Explosive Demise",
      effect:
        'This construct has been filled with a highly volatile substance that is released if the construct is destroyed. If this construct is reduced to 0 Health, all figures within 2" immediately suffer a +3 magical attack. This construct suffers a -4 to all Survival Rolls after the game.',
    },
  ];

  return (
    <PageContainer>
      <Header title="Construct Modifications" />
      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              mb: 4,
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#d4af37",
            }}
          >
            Forging the Artificial — Enhancements for Magical Automatons
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            In the workshops of Mordheim's master enchanters, magical constructs
            were more than simple animated servants — they were works of art,
            engineering marvels that combined arcane binding with mechanical
            precision. Each construct could be customized, enhanced, and
            modified to serve specific purposes. Some were built for war,
            bristling with weapons and armored plates. Others were designed for
            exploration, equipped with wings or drills. Still others served as
            magical batteries, mystic reservoirs of power for their creators.
            <br />
            <br />
            When the comet fell, the secrets of construct creation were
            scattered among the ruins. Now spellcasters who master the Animate
            Construct spell can apply these ancient modifications, enhancing
            their creations with abilities that range from the practical
            (treasure carriers) to the devastating (explosive demise) to the
            arcane (demon portals).
            <br />
            <br />
            <strong>Total Modifications Available:</strong>{" "}
            {modifications.length}
          </ParchmentText>

          <Box
            sx={{
              mb: 5,
              p: 4,
              border: "3px solid #d4af37",
              borderRadius: "8px",
              backgroundColor: "rgba(212, 175, 55, 0.1)",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                mb: 2,
                color: "#d4af37",
              }}
            >
              ⚙️ How Construct Modifications Work
            </ParchmentText>
            <ParchmentText sx={{ lineHeight: 1.8 }}>
              When a wizard successfully casts{" "}
              <strong>Animate Construct</strong>, they may choose to apply
              modifications to enhance the construct's abilities. Each
              modification typically incurs a{" "}
              <strong>modification penalty</strong> to the Casting Roll, making
              it harder to successfully animate the construct.
              <br />
              <br />
              <strong>Key Rules:</strong>
              <br />
              • Modifications are applied when the construct is first animated
              <br />
              • Some modifications state "no modification penalty" — these are
              easier to implement
              <br />
              • A construct can have multiple modifications, but penalties stack
              <br />
              • Once a modification is applied, it is permanent for that
              construct
              <br />
              • If a construct is destroyed and re-animated, modifications must
              be re-applied
              <br />
              <br />
              <em>
                Consult your Game Master about modification penalties and limits
                for your campaign.
              </em>
            </ParchmentText>
          </Box>

          {modifications.map((item, index) => (
            <Box
              key={index}
              id={item.name.toLowerCase().replace(/\s+/g, "-")}
              sx={{
                mb: 3,
                p: 3,
                border: "2px solid #8B4513",
                borderRadius: "4px",
                backgroundColor: "rgba(28, 24, 18, 0.4)",
              }}
            >
              <Box
                sx={{
                  fontWeight: 700,
                  color: "#DAA520",
                  fontSize: "1.3rem",
                  mb: 1,
                  fontFamily: '"Cinzel", serif',
                }}
              >
                {item.name}
              </Box>
              <ParchmentText sx={{ fontSize: "1rem", lineHeight: 1.7 }}>
                {item.effect}
              </ParchmentText>
            </Box>
          ))}

          <ParchmentText
            sx={{
              mt: 6,
              p: 3,
              border: "2px solid #DAA520",
              borderRadius: "3px",
              backgroundColor: "rgba(212, 175, 55, 0.05)",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            "A construct is only as good as its modifications. I've seen basic
            golems with the right enhancements tear through warbands like
            parchment. I've also seen over-modified constructs collapse into
            scrap metal before they took a single step. Balance is everything.
            Choose your modifications wisely, or your creation will be your
            undoing."
            <br />
            <br />— Artificer Kellen, Master of the Mechanical Arts
          </ParchmentText>
        </ContentContainer>
      </ContentSection>
      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/")}
        >
          Voltar ao Início
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
