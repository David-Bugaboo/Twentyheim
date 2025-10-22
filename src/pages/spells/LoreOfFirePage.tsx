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
      keywords: ["Linha de Visão"],
      effect:
        "A arma alvo irrompe em chamas arcanas até o fim do jogo. A arma conta como uma arma mágica com bonus de +2 de Ímpeto e que causa dano flamejante.",
    },
    {
      name: "Bola de Fogo",
      castingNumber: 12,
      keywords: ["Alcance(16)", "Área de Efeito (Zona Pequena)"],
      effect:
        "Centralize a Área de Efeito em uma figura alvo que o conjurador enxergue completamente. O conjurador ataca todas as figuras dentro da área de efeito com um ataque flamejante +5. Trate a figura alvo como ponto de origem para determinar cobertura ou terreno interposto para todas as outras figuras sofrendo ataques.",
    },
    {
      name: "Baforada Flamejante",
      castingNumber: 12,
      keywords: ["Área de Efeito (Cone)"],
      effect:
        "Todas as figuras dentro da Área de Efeito sofrem um ataque a distância flamejante +2. Trate o conjurador como ponto de origem para determinar cobertura ou terreno interposto para todas as outras figuras sofrendo o ataque. Qualquer criatura que sofrer mais de 5 de dano ganha um Marcador de Chamas.",
    },
    {
      name: "Conflagração da Perdição",
      castingNumber: 12,
      keywords: ["Area de Efeito (Explosão Média)"],
      effect:
        "Centre a Área de Efeito no Conjurador. Todas as figuras na área de efeito (mas não contando o conjurador, protegido no olho da tempestade flamejante) sofrem um ataque a distancia flamejante +5. Trate o conjurador como ponto de origem para determinar cobertura ou terreno interposto para todas as outras figuras sofrendo o ataque. Todas as figuras atingidas ganham um Marcador de Chamas.",
    },
    {
      name: "Chama de Uzhul",
      castingNumber: 12,
      keywords: ["Alcance(40cm)", "Míssil Magico (Flamejante)(+7)"],
      effect:
        "O conjurador faz um ataque com o míssil mágico em uma figura alvo.",
    },
    {
      name: "Escudo de Aqshy",
      castingNumber: 10,
      keywords: ["Conjurador Apenas"],
      effect:
        "O mago envolve-se em uma aura ondulante de chamas protetoras. Correntes do Vento Vermelho giram ao seu redor como serpentes flamejantes, formando uma barreira ardente. Quando golpes ou flechas se aproximam, as chamas saltam para interceptá-los, vaporizando projéteis e queimando lâminas antes que possam alcançar carne. O calor é intenso - inimigos próximos recuam instintivamente, e o ar estala com energia incandescente.\n\nO conjurador forma um escudo flutuante de fogo que absorve os próximos 3 pontos de dano que o conjurador normalmente sofreria em combate ou de um ataque a distância. Uma vez que 3 pontos tenham sido absorvidos, as chamas se extinguem e a magia é cancelada. Um conjurador só pode ter um Escudo de Aqshy ativo por vez.",
    },
    {
      name: "Cauterizar",
      castingNumber: 8,
      keywords: ["Toque"],
      effect:
        "A figura alvo Ferida não conta mais como Ferida até tomar dano novamente e perde quaisquer Marcadores de Sangramento.",
    },
    {
      name: "Coroa de Chamas",
      castingNumber: 12,
      keywords: ["Conjurador Apenas"],
      effect:
        "Se o conjurador estiver na mesa, seu bando pode adicionar +2 às suas Rolagens de Iniciativa para determinar o jogador principal até o fim do jogo. Esta magia conta como ativa no conjurador durante o jogo e pode ser cancelada por qualquer coisa que cancele magias.",
    },
    {
      name: "Pilares Flamejantes",
      castingNumber: 14,
      keywords: ["Linha de Visão", "Área de Efeito (Zona Pequena)"],
      effect:
        "Posicione 3 Áreas de Efeito em 3 pontos alvos, que devem estar a pelo menos 20cm um do outro e a não menos de 20cm de uma figura. Qualquer figura que atravessar ou começar sua ativação em cima de uma dessas áreas de efeito ganha um Marcador de Chamas. Os pilares permanecem ativos até o fim do jogo. O Conjurador só pode ter até 3 pilares ativos por vez, e só pode cancelar um pilar por vez como uma ação livre durante sua ativação.",
    },
    {
      name: "Corações em Chamas",
      castingNumber: 12,
      keywords: ["Linha de Visão"],
      effect:
        "A figura aliada alvo ganha a característica Mente Férrea até o fim do jogo.",
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
