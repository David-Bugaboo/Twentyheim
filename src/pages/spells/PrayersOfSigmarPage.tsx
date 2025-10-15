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

export default function PrayersOfSigmarPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Hammer of Sigmar",
      castingNumber: 14,
      range: "Line of Sight",
      effect:
        "This spell is cast upon a weapon. The next time the figure wielding this weapon wins a round of combat and does at least 1 point of damage, this weapon inflicts an additional 5 points of elemental magic damage. If cast on a normal weapon, which is then used against a creature that is Immune to Normal Weapons, this weapon will only deal the 5 points of elemental magic damage. If cast on a bow or crossbow the spell only applies to the next attack.",
    },
    {
      name: "Armour of Righteousness",
      castingNumber: 12,
      range: "Line of Sight",
      effect:
        "The target of this spell receives +2 Armour for the rest of the game. This spell has no effect on a target that already has Armour of 14 or higher. Multiple castings of Armour of Righteousness on the same figure have no effect.",
    },
    {
      name: "Healing Hand",
      castingNumber: 10,
      range: "Touch",
      effect:
        "This spell restores up to 5 points of lost Health to a target figure or the caster. This spell cannot take a model above its starting Health. This spell has no effect on undead or constructs.",
    },
    {
      name: "Beacon of Courage",
      castingNumber: 16,
      range: "Line of Sight",
      effect:
        "The target of this spell becomes immune to Mind Control and Suggestion spells for the rest of the game, and any current Mind Control spells on the figure are cancelled. The figure gains +2 Will for the rest of the game.",
    },
    {
      name: "Twin Tailed Comet",
      castingNumber: 18,
      range: "Line of Sight",
      effect:
        'The caster makes a +3 elemental magic shooting attack against a target within 16". This attack does +4 damage. In addition, all figures in contact with the target figure also suffer a +1 elemental magic shooting attack that does +4 damage. Any figure that suffers damage from these attacks is immediately moved 2" in a random direction.',
    },
    {
      name: "Soulfire",
      castingNumber: 12,
      range: "Line of Sight",
      effect:
        'The spellcaster makes a +3 elemental shooting attack against a target figure within 16" and line of sight. The attack have +2 damage. If this attack is made against a Daemon, it becomes a +7 holy shooting attack with the same damage bonus.',
    },
    {
      name: "Scourge of the Wicked",
      castingNumber: 14,
      range: "Line of Sight",
      effect:
        "All daemons within line of sight of the spellcaster must pass an immediate Will Roll with a Target Number equal to the Casting Roll. If a demon fails the roll and its current Will is +4 or less, it is immediately reduced to 0 Health and removed from the table. If its current Will is +5 or higher, it suffers damage equal to three times the amount by which it failed the Will Roll.",
    },
    {
      name: "Sunder the Arcane",
      castingNumber: 16,
      range: "Line of Sight",
      effect:
        "Immediately cancels the ongoing effect of any one casting of any one spell. It cannot unsummon a creature, but it can cancel the control of a creature that is a temporary member of a warband.",
    },
    {
      name: "Storm of Soulfire",
      castingNumber: 16,
      range: "Area Effect",
      effect:
        "Every demon on the table must make a Will Roll against this spell's Casting Roll or suffer 3 points of holy damage. Additionally, any attempts to cast any spell that would summon or create an undead or daemon creature suffers -4 to the Casting Roll for the rest of the game (non cumulative). The priest takes 1 point of damage every time this spell is successfully cast.",
    },
    {
      name: "Righteous Wrath",
      castingNumber: 12,
      range: "Line of Sight",
      effect:
        "The target figure gains +1 Fight for the rest of the game. Multiple castings of Righteous Wrath on the same target have no effect.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Orações de Sigmar" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#daa520",
              mb: 3,
            }}
          >
            The Heldenhammer's Divine Protection
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Sigmar Heldenhammer, the founder of the Empire and greatest
            warrior-king of mankind, ascended to godhood and now watches over
            his people. His priests are warrior-clerics who wield divine power
            to smite the enemies of mankind, protect the innocent, and banish
            the creatures of darkness. The Prayers of Sigmar are a powerful
            force against Chaos, undead, and all who would threaten the Empire.
          </ParchmentText>

          <PowerListTitle>Prayers of Sigmar</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Orações de Sigmar"
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
