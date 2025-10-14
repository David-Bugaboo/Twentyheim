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

export default function LoreOfFirePage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Espada Fulgurante de Rhuin",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Uma espada flamejante se materializa nas mãos de um aliado.\n\nEsta magia é conjurada sobre uma arma. Na próxima vez que a figura empunhando esta arma vencer uma rodada de combate e causar pelo menos 1 ponto de dano, esta arma inflige 5 pontos adicionais de dano mágico elemental. Se conjurada em uma arma normal, que então é usada contra uma criatura Imune a Armas Normais, esta arma causará apenas os 5 pontos de dano mágico elemental. Se conjurada em uma arma de projétil ou arma de fogo, a magia só se aplica ao próximo ataque.",
    },
    {
      name: "Bola de Fogo",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O conjurador seleciona uma figura inimiga a até 40cm e linha de visão e arremessa uma bola de fogo ardente nela. O alvo e toda figura a até 3cm e linha de visão do alvo imediatamente sofrem um ataque a distância mágico elemental +5. Role este ataque a distância separadamente para cada figura. Trate a figura alvo como a origem do ataque para fins de determinar cobertura ou terreno interposto para todas as outras figuras sofrendo o ataque. Esta magia não pode ter como alvo uma figura inimiga que esteja mesmo parcialmente obscurecida por outra figura.",
    },
    {
      name: "Baforada Flamejante",
      castingNumber: 12,
      range: "Efeito de Área",
      effect:
        "Você exala uma torrente ondulante de chamas, semelhante à dos dragões da lenda.\n\nO conjurador faz um ataque a distância mágico elemental +0 contra toda figura inimiga (seja de um bando opositor ou criatura descontrolada) a até 30cm e linha de visão. Isto pode incluir figuras inimigas em combate, embora as regras normais para atirar em combate sejam seguidas neste caso.",
    },
    {
      name: "Conflagração da Perdição",
      castingNumber: 12,
      range: "Efeito de Área",
      effect:
        "Este é o feitiço mais destrutivo no arsenal do Mago Flamejante. Quando você invoca uma conflagração da perdição, um inferno flamejante envolve uma área a até 8cm do conjurador.\n\nToda figura nessa área (mas não contando o conjurador) sofre um ataque mágico elemental +5.",
    },
    {
      name: "Chama de Uzhul",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Você arremessa um raio de fogo em um oponente a até 40cm e linha de visão.\n\nO conjurador faz um ataque a distância mágico elemental +7 contra o alvo.",
    },
    {
      name: "Escudo de Aqshy",
      castingNumber: 10,
      range: "Apenas o Conjurador",
      effect:
        "Você se envolve com correntes do Vento Vermelho, que o protegem contra ataques.\n\nO conjurador forma um escudo flutuante que absorve os próximos 3 pontos de dano que o conjurador normalmente sofreria em combate ou de um ataque a distância. Uma vez que 3 pontos tenham sido absorvidos, a magia é cancelada. Um conjurador só pode ter um Escudo de Aqshy ativo por vez.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Aqshy - Tradição do Fogo" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#ff6b35",
              mb: 3,
            }}
          >
            O Vento Vermelho da Destruição e Paixão
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição do Fogo, ou Piromancia como às vezes é conhecida, é a
            escola de magia mais agressiva. Ela é baseada na manipulação de
            Aqshy, o Vento Vermelho da Magia. Magistrados desta tradição são
            conhecidos como Magos Flamejantes e são frequentemente encontrados
            no campo de batalha, já que comandam um arsenal de feitiços
            impressionantemente destrutivos. Conforme crescem em poder, Magos
            Flamejantes tornam-se cada vez mais irascíveis e hiperativos. Seus
            cabelos e sobrancelhas tornam-se vermelho flamejante e tremulam em
            uma brisa invisível. São rápidos em se ofender, e rápidos em sentir
            frio. Magos Flamejantes frequentemente adotam tatuagens faciais
            conforme progridem em habilidade.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição do Fogo</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição do Fogo"
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
          onClick={() => navigate("/magic/arcane-lores")}
        >
          Voltar para Tradições Arcanas
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
