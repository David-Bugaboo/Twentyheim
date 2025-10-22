import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import KeywordChipExample from "../components/KeywordChipExample";
import AreaEffectDefinitions from "../components/AreaEffectDefinitions";
import SpellCard from "../components/SpellCard";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../components/PageComponents";

export default function KeywordChipDemoPage() {
  const navigate = useNavigate();

  const exampleSpells = [
    {
      name: "Bola de Fogo",
      school: "Tradição do Fogo",
      castingNumber: 12,
      keywords: ["Alcance(16)", "Área de Efeito (Zona Pequena)"],
      effect:
        "O conjurador lança uma bola de fogo ardente que explode ao atingir seu alvo. Escolha uma figura alvo dentro do alcance e posiciona a Área de Efeito centrada dela. Todas as figuras dentro da área de Efeito sofrem um ataque a distância flamejante +5.",
    },
    {
      name: "Inspiração",
      school: "Tradição da Luz",
      castingNumber: 12,
      keywords: ["Linha de Visão", "Psicológico"],
      effect:
        "O mago canaliza a luz da sabedoria pura diretamente na mente do alvo. O alvo desta magia torna-se imune a magias com Psicologico no seu tipo de alvo - a mente iluminada não pode ser enganada.",
    },
    {
      name: "Ritual do Despertar",
      school: "Tradição da Necromancia",
      castingNumber: 14,
      keywords: ["Ritual", "Invocação"],
      effect:
        "Escolha qualquer soldado que não seja morto-vivo, construto, animal ou daêmonio que tenha que tenha rolado um resultado de Morto na tabela de sobrevivência após o último jogo contra o bando do conjurador. O soldado revive como um regressado do bando do conjurador.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Demonstração - Cards de Palavras-Chave" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#cd853f",
              mb: 3,
            }}
          >
            Novos Cards Visuais para Palavras-Chave das Magias
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Os novos cards de palavras-chave das magias foram criados para
            melhorar a legibilidade e organização visual das informações das
            magias. Cada tipo de palavra-chave tem sua própria cor e estilo para
            facilitar a identificação rápida.
          </ParchmentText>

          <PowerListTitle>Exemplos de Tipos de Palavras-Chave</PowerListTitle>
          
          <KeywordChipExample />

          <PowerListTitle>Definições das Áreas de Efeito</PowerListTitle>
          
          <AreaEffectDefinitions />

          <PowerListTitle>Exemplos de Magias com Novos Cards</PowerListTitle>

          {exampleSpells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school={spell.school}
              castingNumber={spell.castingNumber}
              keywords={spell.keywords}
              effect={spell.effect}
            />
          ))}
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/magic/arcane-lores")}
        >
          Voltar para Tradições Arcanas
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
