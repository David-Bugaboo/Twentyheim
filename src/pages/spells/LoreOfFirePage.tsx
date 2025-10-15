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
        "Chamas vermelhas e alaranjadas envolvem a arma do aliado, transformando-a em uma lâmina incandescente que queima com calor abrasador. O metal brilha branco-quente, e o ar ao redor ondula com o calor intenso. O próximo golpe não apenas corta - carboniza, queima e incendeia.\n\nEsta magia é conjurada sobre uma arma. Na próxima vez que a figura empunhando esta arma vencer uma rodada de combate e causar pelo menos 1 ponto de dano, esta arma inflige 5 pontos adicionais de dano mágico elemental enquanto o fogo consome a vítima. Se conjurada em uma arma normal, que então é usada contra uma criatura Imune a Armas Normais, esta arma causará apenas os 5 pontos de dano mágico elemental - o fogo puro ainda queima. Se conjurada em uma arma de projétil ou arma de fogo, a munição se torna uma flecha ou bala flamejante, e a magia só se aplica ao próximo ataque.",
    },
    {
      name: "Bola de Fogo",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O mago concentra o Vento Vermelho em suas mãos até que uma esfera de chamas incandescentes se forme, crescendo e girando com poder destrutivo contido. Com um grito de guerra, ele a arremessa. A bola de fogo atravessa o ar deixando uma trilha de calor e fumaça antes de EXPLODIR em uma detonação devastadora que carboniza tudo em seu raio. A explosão é tão intensa que até aqueles próximos ao impacto são engolfados pelas chamas.\n\nO conjurador seleciona uma figura inimiga a até 40cm e linha de visão e arremessa uma bola de fogo ardente nela. O alvo e toda figura a até 3cm e linha de visão do alvo imediatamente sofrem um ataque a distância mágico elemental +5 - uma explosão flamejante que não poupa ninguém. Role este ataque a distância separadamente para cada figura. Trate a figura alvo como a origem do ataque para fins de determinar cobertura ou terreno interposto para todas as outras figuras sofrendo o ataque. Esta magia não pode ter como alvo uma figura inimiga que esteja mesmo parcialmente obscurecida por outra figura - o mago precisa de uma linha de arremesso clara.",
    },
    {
      name: "Baforada Flamejante",
      castingNumber: 12,
      range: "Efeito de Área",
      effect:
        "O mago respira fundo, enchendo seus pulmões não com ar mas com puro fogo mágico. Então, como um dragão ancestral, ele EXALA uma torrente devastadora de chamas que varre o campo de batalha. Uma parede ondulante de fogo ruge para frente, consumindo tudo em seu caminho. Inimigos gritam enquanto suas roupas e carne chamuscam, o calor intenso os cegando e queimando.\n\nO conjurador faz um ataque a distância mágico elemental +0 contra toda figura inimiga (seja de um bando opositor ou criatura descontrolada) a até 30cm e linha de visão - uma carnificina flamejante que varre a área. Isto pode incluir figuras inimigas em combate, embora as regras normais para atirar em combate sejam seguidas neste caso.",
    },
    {
      name: "Conflagração da Perdição",
      castingNumber: 12,
      range: "Efeito de Área",
      effect:
        "Este é o ápice da destruição flamejante - a magia mais brutal e devastadora que um Mago Flamejante pode conjurar. O mago ergue os braços ao céu e grita uma palavra de poder, e o mundo EXPLODE em chamas. Um inferno apocalíptico irrompe ao redor dele, uma tempestade de fogo que incinera TUDO. Chamas brancas e amarelas rugem em todas as direções, a temperatura sobe a níveis insuportáveis, e tudo não protegido é consumido em uma conflagração cegante. O próprio ar queima.\n\nToda figura em uma área de até 8cm do conjurador (mas não contando o conjurador, protegido no olho da tempestade flamejante) sofre um ataque mágico elemental +5 - aniquilação pura.",
    },
    {
      name: "Chama de Uzhul",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O mago aponta com ambas as mãos para sua vítima e libera o poder destrutivo de Uzhul, o senhor do fogo. Um raio concentrado de chamas brancas super-aquecidas dispara como uma lança incandescente, perfurando o ar com um rugido ensurdecedor. Não é uma chama que se espalha - é um golpe preciso e devastador, focado em pura destruição. O que atingir será incinerado.\n\nO conjurador faz um ataque a distância mágico elemental +7 contra um alvo a até 40cm e linha de visão - um golpe flamejante de poder brutal.",
    },
    {
      name: "Escudo de Aqshy",
      castingNumber: 10,
      range: "Apenas o Conjurador",
      effect:
        "O mago envolve-se em uma aura ondulante de chamas protetoras. Correntes do Vento Vermelho giram ao seu redor como serpentes flamejantes, formando uma barreira ardente. Quando golpes ou flechas se aproximam, as chamas saltam para interceptá-los, vaporizando projéteis e queimando lâminas antes que possam alcançar carne. O calor é intenso - inimigos próximos recuam instintivamente, e o ar estala com energia incandescente.\n\nO conjurador forma um escudo flutuante de fogo que absorve os próximos 3 pontos de dano que o conjurador normalmente sofreria em combate ou de um ataque a distância. Uma vez que 3 pontos tenham sido absorvidos, as chamas se extinguem e a magia é cancelada. Um conjurador só pode ter um Escudo de Aqshy ativo por vez.",
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
