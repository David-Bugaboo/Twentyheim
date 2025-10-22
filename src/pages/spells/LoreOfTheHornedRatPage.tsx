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
      name: "Salto Rastejante",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Traição perfeita. O feiticeiro torce as Energias Sombrias e troca posições de duas figuras - geralmente colocando um aliado expendível no caminho do perigo enquanto ele mesmo escapa. É a essência da covardia Skaven: usar outros como escudo, sacrificar os fracos para salvar a própria pele imunda. A realidade se distorce por um instante, e duas figuras simplesmente... trocam de lugar. O feiticeiro pode até trocar a si mesmo - geralmente teleportando-se para longe do perigo enquanto algum pobre infeliz toma seu lugar na linha de fogo.\n\nEsta magia troca a posição de duas figuras na mesa. As duas figuras devem estar dentro de linha de visão do conjurador e a até 30cm uma da outra. O conjurador pode trocar de posição consigo mesmo. Membros de bandos opostos podem fazer Rolagem de Vontade com CD igual à Rolagem de Conjuração para resistir. Se bem-sucedida, a magia é cancelada e ninguém move. Figuras amigas e criaturas descontroladas não resistem - obedecem ou não têm escolha.",
    },
    {
      name: "Armadura das Sombras",
      castingNumber: 12,
      keywords: ["Linha de Visão", "Ilusão"],
      effect:
        "A figura alvo ganha +1 de Armadura, não podendo levar a figura a mais de 13 de armadura. Adicionalmente, figuras tem -1 de Precisão ao fazer ataques a distância contra a criatura alvo. Ambos os efeitos duram até o fim do jogo",
    },
    {
      name: "Tufão das Presas Amarelas",
      castingNumber: 10,
      keywords: ["Linha de Visão", "Area de Efeito(Zona Pequena)"],
      effect:
        "A figura alvo é atacada por um enxame de ratazanas. A Área de Efeito é centralizada e se move junto com a figura alvo enquanto a magia permanecer. Afeta todas as figuras, incluindo a figura alvo, dentro da área de efeito. Enquanto sendo incomodada pelos ratos, uma figura tem -4 Ímpeto e -4 Precisão (mínimo de +0) e -2 em Rolagens de Conjuração. Após esta figura ativar a cada turno, pode fazer uma teste de Vontade com CD igual à Rolagem de Conjuração. Se bem-sucedida, a magia é cancelada. Outras figuras dentro da Área de Efeito podem simplesmente se afastar para escapar. Uma figura pode ser afetada por apenas uma magia Tufão das Presas Amarelas por vez, seja como alvo ou por estar dentro da Área de Efeito. Criaturas Grandes, mortos-vivos e construtos são imunes a esta magia.",
    },
    {
      name: "Passo da Ratazana Leve",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect: "A figura alvo ganha a característica Levitar até o fim do jogo.",
    },
    {
      name: "Fome Negra",
      castingNumber: 12,
      keywords: ["Linha de Visão"],
      effect:
        "A figura alvo ganha as características Forte e Mente Férrea até o fim do jogo. No final de qualquer ativação em que a figura alvo não estiver em combate, ela recebe 3 de dano e se torna uma criatura não-controlada, permanecendo assim até o fim do jogo.",
    },
    {
      name: "Pelagem Sombria",
      castingNumber: 10,
      keywords: ["Linha de Visão", "Ilusão"],
      effect:
        "A figura alvo ganha a característica Furtividade(12) até o fim do jogo.",
    },
    {
      name: "Dádiva Pestilenta",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect:
        "A figura alvo ganha um par de garras tóxicas até o fim do jogo. Elas contam como armas com a característica Par e Venenosa, e tem um modificador de dano de +2",
    },
    {
      name: "Dedos Mucosos",
      castingNumber: 12,
      keywords: ["Linha de Visão"],
      effect:
        "Até o fim do jogo, sempre que a criatura alvo vencer uma luta contra uma criatura carregando um fragmento de pedra-bruxa, ela automaticamente passa a estar segurando aquele fragmento.",
    },
    {
      name: "Rastejo Célere",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect: "A figura alvo ganha +4 de Movimento até o fim do jogo.",
    },
    {
      name: "Estrelas Distorcidas",
      castingNumber: 10,
      keywords: ["Linha de Visão", "Míssil Mágico (Mágico Venenoso)(+3)"],
      effect: "Ataque a figura alvo com o Míssil Mágico.",
    },
    {
      name: "Chamas da Distorção",
      castingNumber: 10,
      keywords: ["Área de Efeito(Cone)"],
      effect:
        "Todas as figuras em contato com qualquer uma das áreas de efeito sofre um ataque a distância mágico flamejante +3. Esse ataque tem modificador de dano +2 e ignora o bônus de armadura de qualquer armadura não mágica vestida por uma figura atacada. As áreas de efeito não podem se interpor.",
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
              keywords={spell.keywords || [spell.range || ""]}
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
