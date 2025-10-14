import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import SpellCard from "../../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

export default function PrayersOfUlricPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Winter's Chill",
      castingNumber: 14,
      range: "Self Only",
      effect: 'All enemy figures within 2" of the spellcaster receive -2 Fight.',
    },
    {
      name: "Battle's Fury",
      castingNumber: 14,
      range: "Line of Sight",
      effect:
        "The target figure gains +1 Fight and Move for the rest of the game. Multiple castings of Righteous Wrath on the same target have no effect.",
    },
    {
      name: "Howl of the Wolf",
      castingNumber: 12,
      range: "Line of Sight",
      effect:
        "This spell may only be cast on a member of the spellcaster's warband or an uncontrolled creature. This figure will activate at the end of the current phase instead of in its normal phase. For example, if an apprentice casts this spell on an uncontrolled creature, the creature will activate at the end of that player's Apprentice phase instead of the Creature phase. Spellcasters may not cast this spell on themselves, nor on a figure that has already activated in the current turn.",
    },
    {
      name: "Heart of the Wolf",
      castingNumber: 14,
      range: "Line of Sight",
      effect:
        "The target of this spell becomes immune to Fear for the rest of the game. The figure gains +2 Will for the rest of the game.",
    },
    {
      name: "Ice Storm",
      castingNumber: 16,
      range: "Area Effect",
      effect:
        'The spellcaster makes a +0 elemental magic shooting attack against every enemy figure (either from an opposing warband or uncontrolled creature) within 6" and line of sight. This may include enemy figures in combat, although the normal rules for shooting into combat are followed in this case. A figure hit by this attack gains a Stun Token.',
    },
    {
      name: "Hammerschlag",
      castingNumber: 16,
      range: "Self Only",
      effect:
        "This spell overrides the normal rule that a spell may not be cast when a figure is in combat – it may only be cast when the spellcaster is in combat. The spellcaster receives a free Fight action that must be used immediately. The spellcaster receives +4 Fight during this action. Creatures hit by this attack gain a Stun Token.",
    },
    {
      name: "Call of Ulric",
      castingNumber: 14,
      range: "Self Only",
      effect:
        "The caster transforms themselves into a Great White Wolf. Gaining +3 Fight (may not take the caster above 6 fight) and +2 Move. The caster may not use any items. In combat the caster suffers no penalty for being unarmed and its attacks are magical. The caster cannot cast spells while in animal form. The caster may end this spell and return to its normal form as a free action during their activation.",
    },
    {
      name: "Glacier",
      castingNumber: 14,
      range: "Line of Sight",
      effect:
        'Creates a Glacier, 6" long, 3" wide, and 1" tall. Any figure that wishes to climb over the brambles must first make a Will Roll with a Target Number of 14. If they fail, their current action ends immediately.',
    },
    {
      name: "Blizzard",
      castingNumber: 12,
      range: "Area Effect",
      effect:
        "All ranged attacks are made with -1 Shoot for the rest of the game. This spell may be cast multiple times, with each additional casting increasing the penalty by a further -1, up to a maximum of -5.",
    },
    {
      name: "Ulric's Gift",
      castingNumber: 12,
      range: "Out of Game (B)",
      effect:
        "The spellcaster summons a Great White Wolf animal companion. All Animal Companions count as standard soldiers. This Great White Wolf is blessed by Ulric himself and receives a permanent +3 Will. A spellcaster may only have one Great White Wolf at any time.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Orações de Ulric" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#87ceeb",
              mb: 3,
            }}
          >
            🐺 The White Wolf's Savage Blessing
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Ulric, the God of Winter, Wolves, and War, is the ancient patron deity of
            the northern tribes. His priests are fierce warriors who embody the savage
            strength of the wolf and the merciless cold of winter. Through their
            prayers, they can summon blizzards, transform into great wolves, and imbue
            their allies with the fury of battle. The Prayers of Ulric are a testament
            to primal strength and the harsh realities of survival in the frozen north.
          </ParchmentText>

          <PowerListTitle>Prayers of Ulric</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Orações de Ulric"
              castingNumber={spell.castingNumber}
              range={spell.range}
              effect={spell.effect}
            />
          ))}
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/magic/divine-lores")}
        >
          Voltar para Tradições Divinas
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}

