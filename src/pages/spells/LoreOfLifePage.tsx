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

export default function LoreOfLifePage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Sangue da Terra",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "O druida toca o solo e sente o pulso da própria terra - o fluxo constante de seiva através de raízes antigas, a respiração lenta das árvores milenares, o ciclo eterno de crescimento e renovação. Com reverência, ele direciona essa energia vital para um aliado. Veias de luz verde percorrem o corpo do alvo enquanto a vitalidade da natureza o preenche, fortalecendo-o como uma árvore que resiste às tempestades.\n\nEscolha um alvo a até 30cm. Esta magia concede ao alvo +2 Vigor pelo resto do jogo - enraizado na força da terra. Isto pode levar uma figura acima de seu Vigor inicial. Uma figura só pode ter uma magia Sangue da Terra conjurada sobre ela por jogo.",
    },
    {
      name: "Portal dos Dolmens",
      castingNumber: 10,
      range: "Apenas o Conjurador",
      effect:
        "O druida invoca o poder dos círculos de pedra ancestrais, os portais naturais que conectam lugares sagrados. Seu corpo se dissolve em folhas e luz verde, fundindo-se momentaneamente com a teia de vida que conecta toda a natureza. Por um breve instante, ele caminha através das raízes profundas da terra, viajando pelos caminhos invisíveis que apenas os druidas conhecem. Então reemerge, como uma semente brotando, em outro lugar.\n\nO conjurador imediatamente se move para qualquer lugar dentro de linha de visão, viajando através da rede natural, mas não pode realizar outras ações neste turno após conjurar esta magia. Esta magia não pode ser usada para entrar em combate ou para sair da mesa.",
    },
    {
      name: "Gêiser",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O druida bate seu cajado no chão e desperta as águas primordiais que dormem nas profundezas. Com um rugido da terra, um gêiser de água fervente irrompe violentamente do solo. É a fúria natural da terra - não maligna, mas selvagem e indomável como um rio em cheia. A água queima com o calor das entranhas do mundo, vapor subindo em nuvens densas que obscurecem a visão.\n\nColoque um pilar circular de água fervente de 5cm de diâmetro, 8cm de altura em qualquer ponto dentro de linha de visão a até 30cm do conjurador. Este pilar não pode ser colocado em contato com uma figura. Sempre que uma figura se mover em contato com este gêiser, ou ativar enquanto em contato com ele, ela sofre um ataque mágico elemental +3. O pilar bloqueia linha de visão. No fim de cada turno, role um dado. Em 1-2 o gêiser cessa naturalmente e deve ser removido da mesa.",
    },
    {
      name: "Parede de Espinhos",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "O druida convoca o aspecto defensivo da natureza. Do solo brotam vinhas retorcidas cobertas por espinhos afiados como adagas, crescendo em segundos até formar uma barreira densa e ameaçadora. São os mesmos espinhos que protegem as rosas mais belas - a natureza não diferencia beleza de perigo. Tocar essas plantas requer coragem, pois elas não cedem gentilmente.\n\nCria uma linha de espinhos densos de 15cm de comprimento, 3cm de largura e 3cm de altura. Os espinhos não bloqueiam linha de visão, mas podem contar como terreno interveniente. Qualquer figura que deseje escalar sobre os espinhos deve primeiro fazer uma Rolagem de Vontade com Classe de Dificuldade de 14. Se falhar, a hesitação domina e sua ação atual termina imediatamente.",
    },
    {
      name: "Ímpeto da Vida",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O druida canaliza a força vital renovadora da natureza através do alvo, acelerando os processos naturais de cura e revitalizando o corpo exausto. A magia responde ao estado da criatura - para os feridos, traz regeneração; para os saudáveis, traz vigor explosivo. É como a primavera chegando após o inverno: aqueles à beira da morte florescem novamente, enquanto aqueles já fortes sentem uma energia súbita que os impele à ação.\n\nSe o alvo tiver menos da metade de seu Vigor máximo, a energia vital preenche suas feridas - ele ganha Vigor suficiente para ter metade do seu Vigor máximo +1. Se o alvo já tiver mais da metade de seu Vigor máximo, a vitalidade se manifesta como energia pura - ele ganha uma ação extra na sua próxima ativação.",
    },
    {
      name: "Nascente",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O druida ergue as mãos e invoca o ciclo das águas - a chuva que cai, a neve que derrete, os rios que fluem. O Vento Verde concentra-se, e do solo brota uma nascente cristalina. A água surge do nada, enchendo a área como se sempre estivesse destinada a estar ali. É a dádiva da vida - onde há água, há esperança de crescimento. Mas água profunda também pode afogar os incautos.\n\nTodo solo a até 8cm de um ponto alvo se torna água profunda - uma piscina natural criada pela vontade do druida.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Ghyran - Tradição da Vida" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#90ee90",
              mb: 3,
            }}
          >
            O Vento Verde do Crescimento e Vitalidade
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição da Vida é a magia da natureza, da terra crescente e das
            estações. Ela é baseada na manipulação de Ghyran, o Vento Verde da
            Magia. Magistrados desta tradição são conhecidos como Magos de Jade
            e sentem-se mais em casa no campo. Eles visitam cidades quando
            devem, mas preferem estar cercados pela majestade e poder da selva.
            Magos de Jade poderosos andam descalços, para estarem em contato
            constante com a terra. Conforme progridem em sua Ordem, assumem
            aspectos das estações, ficando cansados no Inverno, sóbrios no
            Outono, excitados na Primavera e vibrantes no Verão. Seus cabelos e
            unhas crescem muito rápido, e raramente sofrem de doenças.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição da Vida</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição da Vida"
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
