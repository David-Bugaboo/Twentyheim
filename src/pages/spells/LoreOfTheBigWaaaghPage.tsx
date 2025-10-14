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

export default function LoreOfTheBigWaaaghPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "'Ard as Nails",
      castingNumber: 16,
      range: "Line of Sight",
      effect:
        "The target receives +3 Armour for the rest of the game. This may not take a figure above Armour 15 (i.e. figures with Armour 13 go to Armour 14). Multiple castings of 'Ard as Nails on the same target have no effect.",
    },
    {
      name: "Brain Busta",
      castingNumber: 18,
      range: "Line of Sight",
      effect:
        'The spellcaster makes a +7 elemental magic shooting attack against a target figure within 16" and line of sight. A target hit by this attack gains a Stun Token.',
    },
    {
      name: "Get em' boys",
      castingNumber: 16,
      range: "Line of Sight",
      effect:
        "The target receives +3 Fight. Multiple Get em' Boys spells on the same target have no effect.",
    },
    {
      name: "Da Krunch (or Da Foot o' Gork)",
      castingNumber: 20,
      range: "Line of Sight",
      effect:
        'The caster makes a +6 elemental magic shooting attack against a target within 16". This attack does +5 damage. In addition, all figures in contact with the target figure also suffer a +2 elemental magic shooting attack that does +5 damage. Any figure that suffers damage from these attacks is immediately moved 4" in a random direction.',
    },
    {
      name: "'Eadbutt",
      castingNumber: 18,
      range: "Line of Sight",
      effect:
        "Make a +6 non-magic shooting attack against the target figure. If it hits, the target immediately suffers -3 Armour (to a minimum of 10) for the purposes of this attack only. Furthermore, in addition to any damage taken due to this attack, move the target figure back in a straight line away from the spellcaster a number of inches equal to the damage taken, or until the figure hits a terrain feature more than 1\" tall.",
    },
    {
      name: "'Eadsquisha",
      castingNumber: 24,
      range: "Line of Sight",
      effect:
        'This spell targets a figure within 8". The target must make a Will Roll with a Target Number equal to the Casting Roll or be immediately reduced to 0 Health. All figures may empower their Will Roll to resist this spell, even non-spellcasters. The spellcaster immediately loses 1 Health upon attempting this spell (even if it is cast successfully), in addition to any loss incurred by failure or empowerment. This spell has no effect on undead or constructs. If a creature dies under the effect of this spell, the caster can choose another target figure within 3\'\' of the primary target figure. That figure is also subjected to this spell effects.',
    },
    {
      name: "'Ere We Go!",
      castingNumber: 18,
      range: "Out of Game (B)",
      effect:
        "If this spellcaster is on the table, its warband may add +4 to its Initiative Rolls for the purposes of determining the primary player only. This spell counts as active on the spellcaster during the game and may be cancelled by anything that cancels spells.",
    },
    {
      name: "'Da Evil Sun",
      castingNumber: 18,
      range: "Line of Sight",
      effect:
        'The spellcaster selects an enemy figure within 16" and line of sight and hurls a sphere of pure fire at it. The target and every figure within 1" and line of sight of the target immediately suffers a +7 elemental magic shooting attack. Roll this shooting attack separately for each figure. Treat the target figure as the origin of the attack for the purposes of determining cover or intervening terrain for all other figures suffering the attack. This spell may not target an enemy figure that is even partially obscured by another figure.',
    },
    {
      name: "Go For Da 'Ead, Boyz!",
      castingNumber: 14,
      range: "Line of Sight",
      effect:
        "This spell can be cast on a melee weapon. If a figure hits with this weapon, treat its opponent as having Armour -5 (to a minimum of 10).",
    },
    {
      name: "Choppa of Gork",
      castingNumber: 16,
      range: "Line of Sight",
      effect:
        "This spell is cast upon a melee weapon. The next time the figure wielding this weapon wins a round of combat and does at least 1 point of damage, this weapon inflicts an additional 5 points of elemental magic damage. If cast on a normal weapon, which is then used against a creature that is Immune to Normal Weapons, this weapon will only deal the 5 points of elemental magic damage.",
    },
    {
      name: "Gaze of Mork",
      castingNumber: 14,
      range: "Line of Sight",
      effect:
        "Draw a straight line from the spellcaster to any point on the table. Make a +6 elemental magic shooting attack against any figures along that line that are not completely concealed by cover.",
    },
    {
      name: "Hand o' Gork",
      castingNumber: 18,
      range: "Line of Sight",
      effect:
        'This spell may target any figure within 12". Move that figure 4" in a random direction. A figure may make a Will Roll with a Target Number equal to the Casting Roll in order to resist this spell. If successful, the figure does not move. Uncontrolled creatures will always attempt this Will Roll.',
    },
    {
      name: "Idol of the WAAAAGH!",
      castingNumber: 22,
      range: "Out of Game (B) or Touch",
      effect:
        'This spell engraves hateful scribbles and snot drawings into a stone surface. This can be the wall of a building or cave, a cliff-face, a statue, or even a free-standing stone. While the caster is within 12" of this stone, it may empower all of its spells and Will Rolls on a 1-for-2 basis (one Health for one increase to the roll) instead of the 1-for-1 that is normal for spellcasters. In addition, the shaman may draw line of sight from the Idol for spellcasting effects. A Shaman may have two of these idols active at any one time, but they must be at least 36" apart. A spellcaster may cancel any casting of this spell at any time. Idols may be destroyed but are immune to non-magic attacks. Treat a idol as Fight +0, Armour 22, Health 1. If this spell is successfully cast before a game, the shaman may place a runic stone anywhere in their deployment zone.',
    },
  ];

  return (
    <PageContainer>
      <Header title="Tradição do Grande WAAAGH!" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#6b8e23",
              mb: 3,
            }}
          >
            💚 DA POWER OF GORK AN' MORK!
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            The Lore of the Big WAAAGH! is the brutal, primal magic of the Greenskins.
            Powered by the collective psychic energy of Gork (who is brutally cunning)
            and Mork (who is cunningly brutal), these spells manifest as raw destructive
            force. Orc Shamans channel the WAAAGH! energy that builds up when Orcs and
            Goblins gather in large numbers, turning it into devastating magical attacks
            that can crush heads, throw enemies around like ragdolls, and make da boyz
            even 'arder than usual. WAAAGH!
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição do Grande WAAAGH!</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição do Grande WAAAGH!"
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
          onClick={() => navigate("/magic/greenskin-lores")}
        >
          Voltar para Tradições Peles-Verdes
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}

