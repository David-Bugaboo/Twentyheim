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
        "O feiticeiro Skaven aponta uma garra suja e trêmula, e uma ferida aberta e supurante se manifesta na carne da vítima - testa ou dorso da mão. A marca do Rato Chifrudo é pustulenta, fétida, vazando pus esverdeado que nunca seca. Todos que a veem sentem repulsa instintiva. A própria má sorte parece aderir à vítima como óleo rançoso - armas escorregam de mãos suadas, pés tropeçam em nada, concentração falha. É a maldição dos traiçoeiros - tudo conspira contra o marcado.\n\nO alvo sofre -2 em TODAS as rolagens de dado - a má sorte dos ratos. No fim de cada turno, o alvo pode fazer uma Rolagem de Vontade com CD igual à Rolagem de Conjuração (com -2, é claro - a marca atrapalha até isso!). Se bem-sucedida, a ferida cicatriza e a magia é cancelada. Esta magia não pode ser conjurada em figura já sofrendo efeitos de outra Maldição.",
    },
    {
      name: "Prole Voraz",
      castingNumber: 10,
      range: "Apenas o Conjurador",
      effect:
        "O feiticeiro invoca a prole infinita do Rato Chifrudo. De cada rachadura, de cada buraco, de cada sombra - centenas de ratos famintos emergem como uma maré viva de pelos sujos e caudas viscosas. Cercam o conjurador em uma massa guinchante e pulsante de corpos peludos. O cheiro é nauseante - urina, fezes, podridão. Flechas se perdem na massa de corpos. Inimigos que se aproximam são ENGOLFADOS por mil pequenos dentes afiados que mordem tornozelos, panturrilhas, qualquer carne exposta. Nem o próprio feiticeiro está seguro - ratos sobem em suas costas, arranham, dificultam concentração. Mas isso é proteção Skaven - nojenta, mas eficaz.\n\nAtaques a distância têm -2 contra o Feiticeiro - a massa de ratos absorve projéteis. Criaturas a até 3cm dele têm -2 Ímpeto e -2 em Rolagens de Conjuração - impossível lutar com ratos mordendo! Esta magia pode ser conjurada múltiplas vezes. Cada conjuração aumenta alcance em 3cm, até limite de 8cm - o enxame CRESCE.",
    },
    {
      name: "Maré de Pragas",
      castingNumber: 12,
      range: "Efeito de Área",
      effect:
        "O feiticeiro guincha alto, um som agudo e perturbador, e a resposta vem dos lugares mais nojentos. De esgotos, buracos podres, rachaduras imundas - uma EXPLOSÃO de ratos doentes. Milhares deles, cobrindo o chão como um tapete vivo de pelos emaranhados, caudas viscosas e olhos vermelhos famintos. A massa se contorce, guincha, devora. O fedor é insuportável - doença, decomposição, toxinas. Quem pisa perto é ENGOLFADO pela horda faminta. Mil pequenas mordidas envenenadas, mil pequenas infecções. Três pontos diferentes se tornam centros de pestilência rasteante.\n\nColoque três fichas de Enxame de Ratos na mesa dentro de linha de visão do conjurador. Qualquer figura que se mova a até 5cm de uma ficha, ou ative enquanto a até 5cm de uma ficha, sofre 2 pontos de dano e é envenenada - mordidas tóxicas incontáveis! Um conjurador não pode conjurar esta magia se já tiver fichas de enxame na mesa. O conjurador pode dispensar as fichas como ação gratuita.",
    },
    {
      name: "Salto Distorcido",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Traição perfeita. O feiticeiro torce as Energias Sombrias e troca posições de duas figuras - geralmente colocando um aliado expendível no caminho do perigo enquanto ele mesmo escapa. É a essência da covardia Skaven: usar outros como escudo, sacrificar os fracos para salvar a própria pele imunda. A realidade se distorce por um instante, e duas figuras simplesmente... trocam de lugar. O feiticeiro pode até trocar a si mesmo - geralmente teleportando-se para longe do perigo enquanto algum pobre infeliz toma seu lugar na linha de fogo.\n\nEsta magia troca a posição de duas figuras na mesa. As duas figuras devem estar dentro de linha de visão do conjurador e a até 30cm uma da outra. O conjurador pode trocar de posição consigo mesmo. Membros de bandos opostos podem fazer Rolagem de Vontade com CD igual à Rolagem de Conjuração para resistir. Se bem-sucedida, a magia é cancelada e ninguém move. Figuras amigas e criaturas descontroladas não resistem - obedecem ou não têm escolha.",
    },
    {
      name: "Chuva Tóxica",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O feiticeiro conjura uma chuva de veneno puro. Um pilar de líquido corrosivo verde-doentio desce dos céus em cascata interminável. Não é água - é bile concentrada, ácidos industriais, toxinas destiladas dos esgotos mais profundos de Skavenblight. Queima pele ao toque, corrói metal, inflama olhos. A chuva tóxica forma uma cortina impenetrável de morte química. Quem entra nela sente a pele começar a DERRETER, os pulmões queimarem com vapores venenosos. O pilar de veneno persiste até que os céus finalmente parem de vomitar toxinas.\n\nCria uma chuva poluída circular de 8cm de diâmetro, infinitamente alta, a até 30cm do conjurador. Pode ser colocada em contato com uma figura. Sempre que uma figura se mova em contato com esta chuva, ou ative enquanto em contato com ela, ela sofre um ataque mágico envenenado +2 - corrosão tóxica! O pilar bloqueia linha de visão. No fim de cada turno, role um dado. Em 1-5 a chuva cessa e deve ser removida da mesa.",
    },
    {
      name: "Relâmpago Bruxeleante",
      castingNumber: 12,
      range: "Efeito de Área",
      effect:
        "O feiticeiro ergue garras cheias de Pedra-Bruxa brilhante e energia verde-toxica explode de suas mãos. Não é relâmpago natural - é radiação mágica corrosiva que salta de inimigo em inimigo como doença se espalhando. Cada arco deixa queimaduras esverdeadas fumegantes. Cada toque infecta com toxinas sobrenaturais. A energia se ramifica, buscando gananciosamente cada alvo, não discriminando - desde que seja inimigo para QUEIMAR. O ar fica carregado com ozônio e o cheiro de carne chamuscada.\n\nO conjurador faz um ataque a distância mágico elemental envenenado +0 contra toda figura inimiga (seja de um bando opositor ou criatura descontrolada) a até 30cm e linha de visão - relâmpagos se ramificam para todos! Isto pode incluir figuras inimigas em combate, embora as regras normais para atirar em combate sejam seguidas neste caso.",
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
