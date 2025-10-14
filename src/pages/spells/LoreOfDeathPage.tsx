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

export default function LoreOfDeathPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Canalizar Vida",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você suga a essência vital de um inimigo dentro de sua linha de visão e a usa para curar a si mesmo.\n\nO alvo deve fazer uma Rolagem de Vontade imediata com Número Alvo igual à Rolagem de Conjuração. Se falhar, o alvo imediatamente perde 3 Vigor e o conjurador recupera 3 Vigor. O conjurador ganha 3 Vigor, mesmo se o alvo tinha menos Vigor restante. Isto não pode levar o conjurador acima de seu Vigor inicial. Esta magia não tem efeito em mortos-vivos ou constructos. Um conjurador pode ter como alvo um membro de seu próprio bando – se o fizer, entretanto, o alvo imediatamente (e permanentemente) deixa o bando e é tratado como uma criatura descontrolada pelo resto do jogo.",
    },
    {
      name: "Ultimas Palavras",
      castingNumber: 12,
      range: "Fora de Jogo (D)",
      effect:
        "Você pode fazer uma pergunta à alma partindo de um aliado ou inimigo morto.\n\nO conjurador adiciona +4 à sua próxima tentativa de conjurar uma magia Fora de Jogo (A), desde que seja antes do próximo jogo.",
    },
    {
      name: "Ceifadora Espectral",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "Uma foice de energia Ametista se materializa nas mãos de um aliado dentro da linha de visão.\n\nO conjurador faz uma arma de corpo a corpo se tornar uma foice ceifadora espectral. Esta arma agora é considerada mágica e causa +1 de dano, ou +2 se usada contra mortos-vivos.",
    },
    {
      name: "Ventos do Fim",
      castingNumber: 18,
      range: "Linha de Visão",
      effect:
        "Você invoca um vento letal de Shyish em qualquer lugar dentro de sua linha de visão.\n\nEsta magia tem como alvo uma figura a até 20cm. O alvo deve fazer uma Rolagem de Vontade com Número Alvo igual à Rolagem de Conjuração ou ser imediatamente reduzido a 0 Vigor. Todas as figuras podem potencializar sua Rolagem de Vontade para resistir a esta magia, mesmo não-conjuradores. O conjurador imediatamente perde 1 Vigor ao tentar esta magia (mesmo se for conjurada com sucesso), além de qualquer perda incorrida por falha ou potencialização. Esta magia não tem efeito em mortos-vivos ou constructos.",
    },
    {
      name: "Ceifar Juventude",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você faz um personagem dentro de sua linha de visão envelhecer anos em questão de segundos.\n\nA figura alvo deve fazer uma Rolagem de Vontade imediata com Número Alvo igual à Rolagem de Conjuração. Se falhar, ela não recebe ações em sua próxima ativação. Além disso, a figura sofre -3 Ímpeto (até um mínimo de +0) e não pode ter Salto conjurado sobre ela até depois de fazer sua próxima ação de movimento. Criaturas Grandes recebem +8 em sua Rolagem de Vontade para resistir a esta magia.",
    },
    {
      name: "Maré da Decadência",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Você faz um edifício dentro de sua linha de visão envelhecer e deteriorar até virar pó.\n\nEsta magia só pode ter como alvo estruturas inanimadas como edifícios e paredes. O conjurador acelera rapidamente a passagem do tempo em uma pequena área da estrutura, causando seu colapso. Isto pode criar um buraco do tamanho de uma porta através de qualquer parede, que deve ser indicado no tabulleiro de alguma forma. A magia também pode ser usada para colapsar uma seção de piso sob uma figura em pé em um nível acima do solo. Neste caso, a figura prestes a ser afetada deve passar em uma Rolagem de Agilidade (NA 22) ou cair para o próximo nível abaixo e sofrer dano apropriadamente. Se esta magia for conjurada em uma parede criada pela magia Parede, a parede é completamente destruída.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Shyish - Tradição da Morte" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#a78bfa",
              mb: 3,
            }}
          >
            O Vento Púrpura dos Fins e da Mortalidade
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição da Morte é a magia da mortalidade, fins e a passagem do
            tempo. Ela é baseada na manipulação de Shyish, o Vento Púrpura da
            Magia. Magistrados desta tradição são conhecidos como Magos Ametista
            e são justamente temidos. Embora frequentemente confundidos com
            Necromantes, Magos Ametista são bem distintos. Eles abraçam o fim
            natural de todas as coisas, enquanto Necromantes buscam conquistar a
            morte com as mais sombrias magias. Conforme crescem em poder, Magos
            Ametista tornam-se mais silenciosos, embora não sombrios. O sopro da
            tumba os segue, e até o mais gordo torna-se magro; contudo eles
            retêm um humor perverso e respeito pela vida.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição da Morte</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição da Morte"
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
