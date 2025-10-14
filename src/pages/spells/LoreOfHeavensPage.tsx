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

export default function LoreOfHeavensPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Presságio de Amur",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Você pode ler os sinais no ar e adivinhar pistas sobre o que o futuro imediato reserva.\n\nNa próxima vez que a figura alvo desta magia tiver que rolar um dado por qualquer razão, role dois dados e pegue o resultado maior. Se um 1 for rolado em ambos os dados, a figura alvo sofre 10 pontos de dano.",
    },
    {
      name: "Augúrio",
      castingNumber: 10,
      range: "Fora de Jogo(D)",
      effect:
        "Você pode adivinhar o futuro de forma limitada ao ler as estrelas.\n\nO conjurador pode tentar conjurar esta magia antes de rolar por tesouro. Se bem-sucedida, o conjurador pode rolar dois dados e escolher qual manter ao fazer a primeira rolagem para determinar que tesouro foi encontrado. Se ambos os dados rolarem o mesmo número, entretanto, a ficha é perdida – experiência ainda é ganha, mas nenhum tesouro é encontrado.",
    },
    {
      name: "Golpe de Relâmpago",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Você pode arremessar um raio em um oponente a até 50cm e linha de visão.\n\n. No fim da próxima ativação da figura alvo, após ela ter realizado todas as suas ações, faça um ataque +6 contra ela. Este é considerado um ataque não-mágico. Além disso, se a figura estiver usando armadura pesada, subtraia 2 de sua Armadura para fins de determinar dano.",
    },
    {
      name: "Tempestade de Relâmpagos",
      castingNumber: 14,
      range: "Linha de Visão",
      effect:
        "Você invoca uma tempestade de relâmpagos em qualquer lugar a até 50cm e linha de visão. Coloque um marcador naquele ponto. No início da próxima ativação do conjurador, todas as figuras a até 8cm daquele ponto **e com linha de visão para ele** sofrem um **ataque a distância +7**. Figuras recebem cobertura como se a linha de visão fosse traçada **do ponto alvo**. Todas as figuras que sofrem este ataque também são **arremessadas 8cm em uma direção aleatória**, mesmo se estiverem em combate. Se o conjurador sair da mesa antes de sua próxima ativação, esta magia é **cancelada**.",
    },
    {
      name: "Estudar as Estrelas",
      castingNumber: 12,
      range: "Fora de Jogo (D)",
      effect:
        "Esta magia permite ao conjurador absorver o conhecimento contina nas posicões estelares. O conjurador imediatamente ganha 40 pontos de experiência por conjurar esta magia para representar a velocidade com que pode ganhar conhecimento. Esta experiência não conta contra o máximo que pode ser ganho em um jogo. Esta magia só pode ser conjurada após um jogo no qual o conjurador não foi reduzido a 0 Vigor.",
    },
    {
      name: "Destino da Perdição",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Você usa a mais poderosa das magias para alterar o curso do próprio destino.\n\nNa próxima vez que a figura alvo desta magia tiver que rolar um dado **por qualquer razão**, ela deve **rolar dois dados e usar o resultado menor**. Se um **20 natural** for rolado em **ambos os dados**, o alvo em vez disso **ganha +1 em todas as rolagens de dado** pelo resto do jogo.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Azyr - Tradição dos Céus" />

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
            O Vento Azul do Destino e Fortuna
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição dos Céus é a magia do céu e das estrelas, de presságios,
            destino e o movimento dos corpos celestes. Mais comumente conhecida
            como Astromancia, ela é baseada na manipulação de Azyr, o Vento Azul
            da Magia. Magistrados desta tradição são conhecidos como Magos
            Celestiais e são famosos oráculos, adivinhos e mestres dos céus e
            estrelas. Conforme crescem em poder, Magos Celestiais tornam-se cada
            vez mais sobrenaturais e oníricos. Seus olhos tornam-se azul
            brilhante, e seus cabelos tendem ao branco. Cheios de movimentos
            lentos e graciosos, Magos Celestiais raramente se apressam.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição dos Céus</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição dos Céus"
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
