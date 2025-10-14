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

export default function LoreOfTheHornedRatPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Marca do Rato Chifrudo",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Uma criatura alvo de sua escolha dentro de linha de visão deve rolar Vontade contra a rolagem de conjuração da magia ou ganhar uma mancha desagradável, tomando a forma de uma ferida aberta e supurante em sua testa ou dorso da mão.\n\nO alvo sofre -2 em todas as rolagens de dado. No fim de cada turno, o alvo pode fazer uma Rolagem de Vontade com Número Alvo igual à Rolagem de Conjuração (com -2, é claro). Se bem-sucedida, esta magia é cancelada. Maldição não pode ser conjurada em uma figura já sofrendo os efeitos de uma magia de Maldição.",
    },
    {
      name: "Prole Voraz",
      castingNumber: 10,
      range: "Apenas o Conjurador",
      effect:
        "O Feiticeiro invoca um enxame de ratos vorazes para cercá-lo. Ataques a distância têm -2 contra o Feiticeiro, e criaturas a até 3cm dele têm -2 Ímpeto e -2 em Rolagens de Conjuração. Esta magia pode ser conjurada mais de uma vez. Cada conjuração aumenta seu alcance em 3cm, até um limite de 8cm.",
    },
    {
      name: "Maré de Pragas",
      castingNumber: 12,
      range: "Efeito de Área",
      effect:
        "Ratos explodem de cada buraco e rachadura no chão, devorando tudo. Coloque três fichas de Enxame de Ratos na mesa dentro de linha de visão do conjurador. Qualquer figura que se mova a até 5cm de uma ficha, ou ative enquanto a até 5cm de uma ficha, sofre 2 pontos de dano e é envenenada. Um conjurador não pode conjurar esta magia se já tiver fichas de queda de estrelas na mesa. O conjurador pode dispensar as fichas como uma ação gratuita.",
    },
    {
      name: "Salto Distorcido",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O feiticeiro Skaven usa seu conhecimento dos padrões das Energias Sombrias para trocar a posição de duas figuras na mesa. Esta magia troca a posição de duas figuras na mesa. As duas figuras sendo transpostas devem ambas estar dentro de linha de visão do conjurador e a até 30cm uma da outra. O conjurador pode conjurar Transpor para trocar de posição consigo mesmo com outra figura. Membros de bandos opostos são alvos elegíveis para serem transpostos, mas podem fazer uma Rolagem de Vontade com Número Alvo igual à Rolagem de Conjuração para tentar resistir à magia. Se bem-sucedida, a magia é cancelada e nenhuma figura é movida. Figuras amigas e criaturas descontroladas não farão tais Rolagens de Vontade.",
    },
    {
      name: "Chuva Tóxica",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O Feiticeiro Skaven invoca uma torrente pútrida de veneno para destruir seus inimigos. Esta magia cria uma chuva poluída circular de 8cm de diâmetro, infinitamente alta, a até 30cm do conjurador. Esta chuva pode ser colocada em contato com uma figura. Sempre que uma figura se mova em contato com esta chuva, ou ative enquanto em contato com ela, ela sofre um ataque mágico envenenado +2. O pilar bloqueia linha de visão. No fim de cada turno, role um dado. Em 1-5 a chuva cessa e deve ser removida da mesa.",
    },
    {
      name: "Relâmpago Bruxeleante",
      castingNumber: 12,
      range: "Efeito de Área",
      effect:
        "Um arco de relâmpago verde maligno salta das mãos do Feiticeiro Skaven, encadeando entre seus inimigos. O conjurador faz um ataque a distância mágico elemental envenenado +0 contra toda figura inimiga (seja de um bando opositor ou criatura descontrolada) a até 30cm e linha de visão. Isto pode incluir figuras inimigas em combate, embora as regras normais para atirar em combate sejam seguidas neste caso.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Tradição do Rato Chifrudo" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#78716c",
              mb: 3,
            }}
          >
            A Magia Blasfema dos Skaven
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição do Rato Chifrudo é a magia corrupta praticada pelos
            feiticeiros Skaven, extraindo poder de seu deus vil, o Grande Rato
            Chifrudo. Esta arte sombria combina os piores aspectos da magia do
            Caos com a astúcia e traição dos homens-rato. Feiticeiros Skaven
            podem invocar enxames de ratos doentes, chamar relâmpagos tóxicos de
            Pedra-bruxa e amaldiçoar seus inimigos com o olhar malevolente de
            seu deus. O próprio ar ao redor destes conjuradores crepita com
            energia instável da Imaterium.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição do Rato Chifrudo</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição do Rato Chifrudo"
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
          onClick={() => navigate("/magic/dark-lores")}
        >
          Voltar para Tradições Sombrias
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
