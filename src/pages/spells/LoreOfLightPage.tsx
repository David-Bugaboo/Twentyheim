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

export default function LoreOfLightPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Cura de Hysh",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Esta magia restaura até 5 pontos de Vigor perdido e remove quaisquer fichas de uma figura alvo a até 15cm. Esta magia não pode levar um modelo acima de seu Vigor inicial. Esta magia não tem efeito em mortos-vivos ou constructos.",
    },
    {
      name: "Exorcismo",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você envolve um Daemônio dentro de sua linha de visão nos tentáculos de Hysh, usando a pureza da luz para bani-lo de volta ao Reino do Caos.\n\nEsse daemônio deve passar em uma Rolagem de Vontade imediata com Número Alvo igual à Rolagem de Conjuração. Se o daemônio falhar na rolagem e sua Vontade atual for +4 ou menos, ele é imediatamente reduzido a 0 Vigor e removido do tabuleiro. Se sua Vontade atual for +5 ou maior, ele sofre dano igual a três vezes a quantidade pela qual falhou na Rolagem de Vontade.",
    },
    {
      name: "Olhos da Verdade",
      castingNumber: 10,
      range: "Apenas o Conjurador",
      effect:
        "Seus olhos brilham com a luz da verdade.\n\nO conjurador, e todas as figuras amigas a até 15cm do conjurador, podem ver figuras invisíveis e são imunes aos efeitos de magias de Sedução Sombria. Além disso, se uma figura invisível estiver a até 15cm do conjurador, a magia Invisibilidade é cancelada. Se um Soldado Ilusório estiver a até 15cm do conjurador, ele é imediatamente removido da mesa.",
    },
    {
      name: "Olhar Radiante",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Seu olhar foca poder radiante em um alvo dentro de linha de visão.\n\nO alvo deve fazer uma Rolagem de Vontade imediata com Número Alvo igual à Rolagem de Conjuração. Se falhar, ele não pode atacar, atirar ou conjurar magias de Linha de Visão. Seu atributo de Ímpeto é reduzido a +0 e sua Agilidade a 1. No fim de cada turno, a figura pode tentar outra Rolagem de Vontade com o mesmo Número Alvo. Se bem-sucedida, a magia é cancelada.",
    },
    {
      name: "Manto Cintilante",
      castingNumber: 12,
      range: "Efeito de Área",
      effect:
        "Você se cerca com um campo de luz que o protege de ataques a distância.\n\nTodos os Ataques a Distância são feitos com -1 Precisão pelo resto do jogo. Esta magia pode ser conjurada múltiplas vezes, com cada conjuração adicional aumentando a penalidade em mais -1, até um máximo de -5.",
    },
    {
      name: "Inspiração",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "Você abre sua mente a Hysh e deixa a luz da sabedoria iluminar a mente de uma figura.\n\nO alvo desta magia torna-se imune a magias de Controle Mental e Sugestão pelo resto do jogo, e quaisquer magias de Controle Mental atuais sobre a figura são canceladas. A figura ganha +2 Vontade pelo resto do jogo.",
    },
    {
      name: "Círculo de Radiância",
      castingNumber: 12,
      range: "Toque",
      effect:
        "Cria um círculo com 8cm de diâmetro no qual nenhum daemônio ou criatura morta-viva pode entrar ou passar. Se algo os forçar ao contato com o círculo, eles param em sua borda. Um conjurador só pode ter um círculo de radiância ativo por vez, mas não precisa permanecer dentro dele. O conjurador pode cancelar esta magia no fim de qualquer turno. Caso contrário, role um dado no fim de cada turno: em 1-3 a magia é cancelada.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Hysh - Tradição da Luz" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#fff8dc",
              mb: 3,
            }}
          >
            O Vento Branco da Pureza e Iluminação
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição da Luz é a magia da iluminação física e mental. Baseada
            na manipulação de Hysh, o Vento Branco da Magia, esta tradição trata
            de verdade, sabedoria, poder radiante e energia que dá vida.
            Magistrados desta tradição são conhecidos como Hierofantes ou Magos
            da Luz e são sábios filósofos, curadores potentes e destemidos
            banidores de Daemônios. Conforme estes Magos crescem em poder,
            tendem ao intelectualismo seco e sagacidade, ao invés de humor. A
            cor escorre de sua pele e cabelo, tornando-se mais claros e
            semi-transparentes em alguns casos, enquanto os olhos tendem a uma
            brancura leitosa ou uma luminescência dourada. A maioria passa seu
            tempo livre lendo ou em contemplação solene.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição da Luz</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição da Luz"
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
