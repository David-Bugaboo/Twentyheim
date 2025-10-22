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
      name: "Encantador de Feras",
      castingNumber: 10,
      keywords: ["Linha de Visão", "Psicológica"],
      effect:
        "Uma criatura não controlada com a característica animal alvo deve testar Vontade com um CD igual a rolagem de conjuração dessa magia. Se falhar, a criatura ignora o conjurador e até 3 figuras do bando a escolha do mesmo quando estiver definindo suas ações. Adicionalmente pode ser usado em uma figura com a característica Animal de um bando inimigo. Se aquela figura falhar no teste de vontade, ela ganha -1 de Ímpeto até sofrer dano.",
    },
    {
      name: "Asas do Falcão Majestoso",
      castingNumber: 12,
      keywords: ["Conjurador Apenas"],
      effect:
        "O Conjurador ganha a característica Voador até o final do jogo. Se o conjurador atacar no mesmo turno que completou uma carga, recebe +2 de Ímpeto, mas não pode escolher se manter em combate caso vença a luta.",
    },
    {
      name: "Garras da Fúria",
      castingNumber: 8,
      keywords: ["Apenas o Conjurador"],
      effect:
        "Até o fim do jogo o conjurador é considerado como equipado com uma Garra em cada mão, que contam como uma arma com modificador de dano +1, a característica leve, e causam dano mágico. Essas garras não pode ser destruídas ou removidos por nenhum efeito, mas causam sobrecarga como normal. O Conjurador pode cancelar a magia como uma ação livre durante sua ativação.",
    },
    {
      name: "Bestialidade Libertada",
      castingNumber: 10,
      keywords: ["Linha de Visão"],
      effect: `A figura alvo recebe +2 Ímpeto até o fim do jogo enquanto a fúria primitiva pulsa em suas veias. Múltiplas conjurações desta magia no mesmo alvo não têm efeito - a bestialidade não pode ser libertada duas vezes. Figuras com a característica Animal não podem ser alvo dessa magia.`,
    },
    {
      name: "Embaixador Feral",
      castingNumber: 10,
      keywords: ["Ritual"],
      effect: `O Conjurador pode falar com lobos, recrutando poderosos animais para o seu bando. Escolha um dos efeitos: -  
        \nEmbaixador dos Lobos:Pode contratar Lobos por 10 coroas até o próximo jogo. Lobos não tem limite de figuras por bando, mas devem respeitar o modelo de figuras da facção.",
        \nEmbaixador dos Corvos: Ganha +10 na primeira rolagem de iniciativa do próximo jogo, e pode escolher em qual lado do tabuleiro irá posicionar suas figuras. Se dois bandos tiverem esse efeito, eles rolam como normal para decidir.",
        \nEmbaixador Felino: Rolagens de Exploração, Mercado Negra e de venda de pedra-bruxa são feitas a +5."`,
    },
    {
      name: "Comando Bestial",
      castingNumber: 10,
      keywords: ["Linha de Visão", "Psicológico"],
      effect:
        "O conjurador fala na língua antiga e esquecida dos animais, sua voz carregando o peso do Vento Marrom. Não são palavras que saem de seus lábios, mas rosnados, guinchos e uivos que ecoam com autoridade primordial. As criaturas selvagens reconhecem esta voz - é a voz do alfa da matilha, do touro dominante, do predador supremo.\n\nEsta magia pode ser conjurada em qualquer criatura animal, sauriana ou aquática que não esteja atualmente sob controle de nenhum bando. A criatura deve fazer uma Rolagem de Vontade para resistir ao comando imperioso. Se a criatura falhar na Rolagem de Vontade, o Guardião pode imediatamente fazê-la realizar uma ação. Se a criatura não estiver em combate, essa ação deve ser movimento. O Guardião pode forçar o animal a fazer qualquer movimento legal, contanto que esse movimento não cause dano direto à criatura (ex: queda, andar no fogo) - pois mesmo a magia não pode fazer um animal se autodestruir contra seus instintos mais profundos. Se a criatura estiver em combate, o Guardião pode fazê-la atacar qualquer figura com a qual esteja em combate, ou pode compeli-la a usar uma ação de movimento para sair do combate.",
    },
    {
      name: "Forma do Lobo Voraz",
      castingNumber: 12,
      keywords: ["Apenas o Conjurador"],
      effect:
        "O conjurador se transforma em um lobo até o fim do jogo (ou até a magia ser cancelada), usando todas as estatísticas do mesmo, exceto Vontade e Vida, que permanencem os originais. Enquanto está nessa forma o conjurador não pode ativar soldados sem a característica Animal junto a si e não pode conjurar feitiços ou se beneficiar de items Seus ataques são mágicos. Ele tem imunidade a qualquer efeito psicológico que funcione apenas contra figuras com a característica animal.",
    },
    {
      name: "Forma do Urso Furioso",
      castingNumber: 14,
      keywords: ["Apenas o Conjurador"],
      effect:
        "O conjurador se transforma em um Urso até o fim do jogo (ou até a magia ser cancelada), usando todas as estatísticas do mesmo, exceto Vontade e Vida, que permanenem os originais. Enquanto está nessa forma o conjurador não pode ativar soldados sem a característica Animal junto a si e não pode conjurar feitiços ou se beneficiar de items. Seus ataques são mágicos. Ele tem imunidade a qualquer efeito psicológico que funcione apenas contra figuras com a característica animal.",
    },
    {
      name: "Um Festim de Corvos",
      castingNumber: 10,
      keywords: ["Linha de Visão", "Área de Efeito (Zona Pequena)"],
      effect:
        "A figura alvo é atacada por este bando de corvos vorazes que irritam e distraem sem cessar. A área de efeito é centralizada e se move com a figura alvo. Afeta todas as figuras, incluindo a figura alvo, total ou parcialmente dentro da área de efeito. Enquanto sendo incomodada pelos corvos, uma figura tem -4 Ímpeto e -4 Precisão (até um mínimo de +0) e -2 em Rolagens de Conjuração. Depois que esta figura ativar a cada turno, ela pode fazer uma Rolagem de Vontade com CD igual à Rolagem de Conjuração, tentando reunir força de vontade suficiente para espantar os pássaros. Se bem-sucedida, a magia é cancelada e os corvos se dissipam em sombras. Outras figuras dentro da área de efeito podem simplesmente se afastar para escapar da nuvem de corvos. Uma figura só pode ser afetada por uma magia de Bando de Corvos por vez, seja como alvo ou por estar dentro da Área de Efeito. Criaturas com as características Grande, Voador, Morto-Vivo e Construto são imunes a esta magia - grandes demais para serem incomodados ou sem carne viva para os corvos bicarem.",
    },
    {
      name: "Convocação Selvagem",
      castingNumber: 10,
      keywords: ["Ritual"],
      effect:
        "O conjurador adentra os lugares selvagens e invoca um chamado primordial, sua voz ecoando através de florestas e montanhas. O Vento Marrom carrega seu chamado para longe, alcançando os ouvidos de criaturas que reconhecem nele um espírito semelhante. Eventualmente, uma besta responde - não como servo, mas como companheiro, atraída pela força selvagem do mago.\n\nO conjurador invoca um companheiro animal de sua escolha entre as seguintes opções para se tornar um membro permanente de seu bando: urso, leopardo, coruja gigante ou lobo. Todos os Companheiros Animais contam como soldados padrão. Estes não são animais comuns - companheiros animais têm mais força de vontade que exemplos selvagens de sua espécie, tocados pela magia do mago, e recebem um +3 Vontade permanente. Um conjurador só pode ter um companheiro animal por vez - a ligação é profunda demais para ser dividida.",
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
              keywords={spell.keywords}
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
