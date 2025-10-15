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

export default function LoreOfBeastsPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Asas do Falcão Majestoso",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "O Vento Marrom flui através do conjurador e se manifesta em penas etéreas que irrompem das costas da figura alvo. Asas majestosas de energia primordial se desdobram, fortes o suficiente para erguer até o mais pesado dos guerreiros pelos ares em um voo poderoso.\n\nEsta magia só pode ser conjurada em um membro do bando do conjurador. Mova imediatamente a figura alvo até 25cm em qualquer direção, incluindo verticalmente, enquanto as asas espectrais batem com força sobrenatural. Este movimento deve ser em linha reta ou em arco gracioso. Não pode curvar em cantos. Se este movimento deixar a figura acima do solo quando as asas se dissipam, ela imediatamente cai, sofrendo dano normalmente. Se o alvo estiver carregando tesouro, o peso adicional torna o voo mais laborioso e este movimento é reduzido para 13cm. Este movimento não pode tirar uma figura da mesa ou colocá-la em combate. O alvo desta magia não pode realizar outras ações neste turno, exausto pelo poder selvagem que o transportou, embora possa ter realizado ações anteriormente.",
    },
    {
      name: "Bestialidade Libertada",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O mago canaliza a essência primordial da natureza selvagem, quebrando as correntes da civilização que prendem o espírito bestial adormecido em todo ser consciente. Os olhos do alvo brilham com fúria feral, músculos se contraem com força animal, e um rosnado gutural escapa de seus lábios. A besta interior é libertada! Esta magia não funciona em animais - eles já são bestas e vivem eternamente neste estado de selvageria pura.\n\nO alvo recebe +2 Ímpeto enquanto a fúria primitiva pulsa em suas veias. Múltiplas conjurações desta magia no mesmo alvo não têm efeito - a bestialidade não pode ser libertada duas vezes.",
    },
    {
      name: "Voz do Domador",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O conjurador fala na língua antiga e esquecida dos animais, sua voz carregando o peso do Vento Marrom. Não são palavras que saem de seus lábios, mas rosnados, guinchos e uivos que ecoam com autoridade primordial. As criaturas selvagens reconhecem esta voz - é a voz do alfa da matilha, do touro dominante, do predador supremo.\n\nEsta magia pode ser conjurada em qualquer criatura animal, sauriana ou aquática que não esteja atualmente sob controle de nenhum bando. A criatura deve fazer uma Rolagem de Vontade para resistir ao comando imperioso. Se a criatura falhar na Rolagem de Vontade, o Guardião pode imediatamente fazê-la realizar uma ação. Se a criatura não estiver em combate, essa ação deve ser movimento. O Guardião pode forçar o animal a fazer qualquer movimento legal, contanto que esse movimento não cause dano direto à criatura (ex: queda, andar no fogo) - pois mesmo a magia não pode fazer um animal se autodestruir contra seus instintos mais profundos. Se a criatura estiver em combate, o Guardião pode fazê-la atacar qualquer figura com a qual esteja em combate, ou pode compeli-la a usar uma ação de movimento para sair do combate.",
    },
    {
      name: "Troca-Peles",
      castingNumber: 10,
      range: "Apenas o Conjurador",
      effect:
        "O conjurador abraça totalmente o Vento Marrom, permitindo que a magia selvagem reescreva sua forma física. Ossos estalam e se remodelam, pele se transforma em pelo ou couro, e a mente humana se funde com o instinto animal. É uma transformação antiga e perigosa - muitos que assumem a forma da besta por muito tempo esquecem sua humanidade.\n\nO conjurador se transforma em: um Lobo ágil (+0 na classe de dificuldade), um Cervo veloz (+2 na classe de dificuldade) ou um Urso poderoso (+4 na classe de dificuldade). Todos os atributos do conjurador se tornam os atributos daquela criatura, exceto Vontade e Vigor, que permanecem inalterados - a mente e a força vital permanecem humanas, aprisionadas em carne animal. Enquanto em forma animal, o conjurador é afetado por quaisquer magias, efeitos e bônus contra animais. O conjurador não pode usar nenhum item - garras e patas não podem empunhar espadas ou segurar poções. O conjurador não pode conjurar magias enquanto em forma animal - as palavras de poder não podem ser pronunciadas por bocas bestiais. O conjurador pode terminar esta magia e retornar à sua forma normal como uma ação gratuita durante sua ativação, reassumindo sua humanidade com um suspiro de alívio. O conjurador pode mudar para uma forma animal diferente conjurando a magia novamente.",
    },
    {
      name: "Um Festim de Corvos",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "Com um grito agudo que ecoa estranhamente, o conjurador invoca um bando de corvos famintos das sombras. Os pássaros negros surgem do nada, grasnando e bicando com fúria maníaca, suas asas batendo em um frenesi que bloqueia a visão e seus bicos afiados buscando olhos e carne exposta. A vítima é envolta em um turbilhão de penas negras e gritos ensurdecedores.\n\nA figura alvo é atacada por este bando de corvos vorazes que irritam e distraem sem cessar. O bando de corvos tem um raio de 3cm centrado na, e se movendo com, a figura alvo - uma nuvem negra de fúria aviária. Afeta todas as figuras, incluindo a figura alvo, total ou parcialmente dentro deste raio. Enquanto sendo incomodada pelos corvos, uma figura tem -4 Ímpeto e -4 Precisão (até um mínimo de +0) e -2 em Rolagens de Conjuração - impossível mirar ou concentrar-se com corvos bicando seus olhos! Depois que esta figura ativar a cada turno, ela pode fazer uma Rolagem de Vontade com Classe de Dificuldade igual à Rolagem de Conjuração, tentando reunir força de vontade suficiente para espantar os pássaros. Se bem-sucedida, a magia é cancelada e os corvos se dissipam em sombras. Outras figuras dentro do raio podem simplesmente se afastar para escapar da nuvem de corvos. Uma figura só pode ser afetada por uma magia de Bando de Corvos por vez, seja como alvo ou por estar dentro do raio de 3cm. Criaturas Grandes, mortos-vivos e constructos são imunes a esta magia - grandes demais para serem incomodados ou sem carne viva para os corvos bicarem.",
    },
    {
      name: "Convocação Selvagem",
      castingNumber: 10,
      range: "Fora de Jogo (A)",
      effect:
        "O conjurador adentra os lugares selvagens e invoca um chamado primordial, sua voz ecoando através de florestas e montanhas. O Vento Marrom carrega seu chamado para longe, alcançando os ouvidos de criaturas que reconhecem nele um espírito semelhante. Eventualmente, uma besta responde - não como servo, mas como companheiro, atraída pela força selvagem do mago.\n\nO conjurador invoca um companheiro animal de sua escolha entre as seguintes opções para se tornar um membro permanente de seu bando: urso poderoso, leopardo das neves ágil, sapo de gelo venenoso ou lobo atroz feroz. Todos os Companheiros Animais contam como soldados padrão. Estes não são animais comuns - companheiros animais têm mais força de vontade que exemplos selvagens de sua espécie, tocados pela magia do mago, e recebem um +3 Vontade permanente. Um conjurador só pode ter um companheiro animal por vez - a ligação é profunda demais para ser dividida.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Ghur - Tradição das Bestas" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#cd853f",
              mb: 3,
            }}
          >
            O Vento Marrom da Selvageria e Ferocidade
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição das Bestas é a mais feral das feitiçarias. É a magia dos
            animais e da selvageria primitiva. Ela é baseada na manipulação de
            Ghur, o Vento Marrom da Magia. Magistrados desta tradição são
            conhecidos como Magos Âmbar e eles se apegam aos lugares selvagens
            que são a fonte de sua força. Conforme ganham poder, Magos Âmbar
            tornam-se cada vez mais distantes e inquietos com a sociedade humana
            — seus pelos crescendo densamente, unhas irregulares e dentes
            pontiagudos espelhando a natureza selvagem de suas almas.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição das Bestas</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição das Bestas"
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
