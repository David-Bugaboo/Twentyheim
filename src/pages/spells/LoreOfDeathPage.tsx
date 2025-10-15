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
        "O mago estende a mão como uma garra e puxa, não no corpo físico, mas na força vital que o sustenta. A vítima sente um frio terrível se espalhando de dentro para fora enquanto anos de vida são arrancados dela. O mago, por sua vez, sente um calor antinatural enquanto a essência roubada preenche suas veias - um prazer sombrio que muitos magos Ametista lutam para não desejar demais.\n\nO alvo deve fazer uma Rolagem de Vontade imediata com Classe de Dificuldade igual à Rolagem de Conjuração. Se falhar, o alvo imediatamente perde 3 Vigor enquanto sua força vital é drenada, e o conjurador recupera 3 Vigor. O conjurador ganha 3 Vigor, mesmo se o alvo tinha menos Vigor restante. Isto não pode levar o conjurador acima de seu Vigor inicial. Esta magia não tem efeito em mortos-vivos ou constructos - não há vida a ser roubada de algo que já não vive. Um conjurador pode ter como alvo um membro de seu próprio bando - se o fizer, entretanto, a traição é completa e o alvo imediatamente (e permanentemente) deixa o bando e é tratado como uma criatura descontrolada pelo resto do jogo.",
    },
    {
      name: "Ultimas Palavras",
      castingNumber: 12,
      range: "Fora de Jogo (D)",
      effect:
        "O mago se ajoelha sobre o cadáver ainda morno e coloca as mãos sobre ele, murmurando palavras na língua dos mortos. Por um breve momento, a alma que partia hesita no limiar, presa entre os mundos. Lábios sem vida se movem, e uma voz fantasmagórica sussurra segredos que apenas os mortos conhecem - o conhecimento adquirido custa caro, mas vale cada fragmento de alma gasto.\n\nVocê pode fazer uma pergunta à alma partindo de um aliado ou inimigo morto. O conjurador adiciona +4 à sua próxima tentativa de conjurar uma magia Fora de Jogo (A), desde que seja antes do próximo jogo.",
    },
    {
      name: "Ceifadora Espectral",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "O Vento Púrpura se enrosca ao redor de uma arma, transformando-a temporariamente na própria lâmina do fim. A arma brilha com luz fantasmagórica, sua forma distorcendo-se sutilmente até lembrar a foice da própria Morte. Aqueles cortados por esta lâmina não sentem apenas aço, mas o toque frio da mortalidade.\n\nO conjurador faz uma arma de corpo a corpo se tornar uma foice ceifadora espectral. Esta arma agora é considerada mágica e causa +1 de dano. Contra mortos-vivos, a lâmina brilha ainda mais intensamente, reconhecendo aquilo que deveria ter permanecido morto, e causa +2 de dano - uma sentença definitiva para aqueles que zombam da morte.",
    },
    {
      name: "Ventos do Fim",
      castingNumber: 18,
      range: "Linha de Visão",
      effect:
        "Esta é a magia mais terrível dos Magos Ametista - invocar o próprio sopro do fim dos tempos. O ar se torna gélido e pesado, carregado com o peso de todas as mortes que já foram e que ainda serão. Um vento invisível mas inegável varre a vítima, e por um momento ela sente todo o peso de sua mortalidade. É uma magia que cobra seu preço - arrancar vida tão completamente drena também o lançador, lembrando-o que ele também é mortal.\n\nEsta magia tem como alvo uma figura a até 20cm. O alvo deve fazer uma Rolagem de Vontade com Classe de Dificuldade igual à Rolagem de Conjuração ou ser imediatamente reduzido a 0 Vigor - o fim chega para ele. Todas as figuras podem potencializar sua Rolagem de Vontade para resistir a esta magia, mesmo não-conjuradores - a luta contra a morte é universal. O conjurador imediatamente perde 1 Vigor ao tentar esta magia (mesmo se for conjurada com sucesso), além de qualquer perda incorrida por falha ou potencialização. Esta magia não tem efeito em mortos-vivos ou constructos - eles já conhecem o fim.",
    },
    {
      name: "Ceifar Juventude",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O mago aponta para a vítima e acelera a passagem do tempo apenas sobre ela. Em questão de segundos, anos passam. Cabelos escurecem e depois embranquecem, pele se enruga, músculos antes vigorosos se atrofiam. A vítima sente cada ano roubado dela, décadas de cansaço descendo sobre seus ombros como um manto de chumbo. Alguns recuperam sua juventude quando a magia passa, outros carregam as cicatrizes do tempo perdido para sempre.\n\nA figura alvo deve fazer uma Rolagem de Vontade imediata com Classe de Dificuldade igual à Rolagem de Conjuração. Se falhar, o peso dos anos roubados a paralisa - ela não recebe ações em sua próxima ativação, mal conseguindo se mover sob o fardo. Além disso, a figura sofre -3 Ímpeto (até um mínimo de +0) enquanto seus membros enfraquecem, e não pode ter Salto conjurado sobre ela até depois de fazer sua próxima ação de movimento - ossos frágeis não suportam tais saltos. Criaturas Grandes recebem +8 em sua Rolagem de Vontade para resistir a esta magia - sua massa maior as ancora no presente.",
    },
    {
      name: "Maré da Decadência",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O mago direciona o fluxo do tempo contra as obras mortais. Pedra que levou anos para ser talhada racha e se esfacela em momentos. Madeira apodrece, metal enferruja, argamassa se desintegra. Séculos de deterioração são comprimidos em segundos, e até as construções mais sólidas se rendem ao peso inevitável do tempo. É um lembrete cruel de que nada dura para sempre - nem mesmo as ambições humanas.\n\nEsta magia só pode ter como alvo estruturas inanimadas como edifícios e paredes. O conjurador acelera rapidamente a passagem do tempo em uma pequena área da estrutura, causando seu colapso. Isto pode criar um buraco do tamanho de uma porta através de qualquer parede, que deve ser indicado no tabuleiro de alguma forma. A magia também pode ser usada para colapsar uma seção de piso sob uma figura em pé em um nível acima do solo. Neste caso, a figura prestes a ser afetada deve passar em uma Rolagem de Agilidade (NA 22) ou cair para o próximo nível abaixo e sofrer dano apropriadamente enquanto o chão desmorona sob seus pés. Se esta magia for conjurada em uma parede criada pela magia Parede, a parede é completamente destruída, desintegrando-se em pó.",
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
