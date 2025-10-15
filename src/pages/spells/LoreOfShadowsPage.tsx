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

export default function LoreOfShadowsPage() {
  const navigate = useNavigate();

  const spells = [
    {
      name: "Manto de Sombras",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O mago puxa as sombras ao redor do alvo como se fossem um manto tangível. As trevas aderem à pele, dobram-se nas dobras das roupas, tornam a silhueta indistinta e vaga. Não é invisibilidade - é algo mais sutil. O olho desliza sem focar, a mente esquece de prestar atenção. 'Havia alguém ali? Não, só sombras.' O truque perfeito para quem sabe que não ser visto é melhor que não ser encontrado.\n\nFiguras não podem traçar linha de visão para a figura alvo de mais de 25cm de distância se ela estiver em qualquer tipo de cobertura - os olhos simplesmente não conseguem captar o que está envolto em sombras.",
    },
    {
      name: "Mortalha de Escuridão",
      castingNumber: 8,
      range: "Linha de Visão",
      effect:
        "O mago espalha os braços e as sombras RESPONDEM. Névoa cinzenta e etérea se espalha pelo campo de batalha, engolindo a luz, tornando cada canto um mistério. Não é escuridão natural - é uma mortalha mágica que cresce e se espessa como coisa viva. O mundo encolhe. Horizontes desaparecem. Até aliados começam a parecer vultos vagos na penumbra crescente. O campo de batalha se torna o playground do trapaceiro.\n\nNo turno em que a magia é conjurada, a linha de visão máxima para o jogo é reduzida para 40cm - a mortalha começa a cair. A cada turno depois disto, a linha de visão máxima diminui mais 5cm, até um mínimo de 30cm. As sombras crescem, sempre crescem.",
    },
    {
      name: "Veu da Invisibilidade",
      castingNumber: 12,
      range: "Toque",
      effect:
        "O mago tece Ulgu ao redor do alvo como um artesão tece seda - camada sobre camada de sombra até que a realidade simplesmente... esqueça que há alguém ali. A figura não se torna transparente - ela deixa de existir para os olhos alheios. É o truque supremo do ilusionista: não esconder, mas fazer com que ninguém procure. Contudo, toda ilusão tem seus limites - atos dramáticos quebram o encanto. Violência, magia, até mesmo pegar algo brilhante demais... e PUFF, o truque se desfaz.\n\nA figura alvo torna-se invisível - simplesmente não está lá para os olhos dos outros. Nenhuma figura pode mover-se para combate com a figura invisível, nem pode ter como alvo com qualquer ataque ou magia (embora ainda possa ser afetada por efeitos de área). Se a figura invisível mover-se para combate, conjurar uma magia, ou pegar uma ficha de tesouro, a performance termina e a magia Invisibilidade é cancelada. Esta magia pode ser conjurada em uma figura já carregando tesouro, tornando ambos invisíveis. Neste caso, se a figura largar o tesouro, a magia é cancelada.",
    },
    {
      name: "Ilusão",
      castingNumber: 12,
      range: "Fora de Jogo (A) OU Toque",
      effect:
        "O mago tece luz, sombra e percepção em algo quase real. A ilusão caminha, respira, até mesmo fala. Você pode ver detalhes - cicatrizes, sujeira nas botas, o balanço da arma no cinto. Você pode OUVIR o ranger do couro. Você pode CHEIRAR suor. É uma obra-prima de enganação. Até tocar a ilusão parece real - por um momento. Mas é só fumaça e espelhos. Um golpe verdadeiro passa através dela e o truque é revelado: nunca houve nada ali.\n\nUm soldado ilusório torna-se um membro temporário do bando. Este soldado pode ser de qualquer tipo encontrado no bando. Este soldado não pode pegar tesouro, nem pode causar dano - mas blefa convincentemente. De outra forma conta como um soldado regular: pode engajar em combate (sem causar dano se vencer, mas pode empurrar), dar apoio, ocupar espaço. Se o soldado ilusório sofrer dano de qualquer tipo, PUFF - a ilusão se desfaz. Um bando só pode ter um soldado ilusório a qualquer momento. O jogador deve revelar qual membro é o ilusório. Soldados ilusórios não começam com itens ou equipamento especial.",
    },
    {
      name: "Aspecto do Pavor",
      castingNumber: 12,
      range: "Linha de Visão",
      effect:
        "O mago projeta uma ilusão sobre si mesmo, mas não uma ilusão qualquer - uma MENTIRA que a mente da vítima completa. As sombras se contorcem, assumindo formas de pesadelo. A vítima VÊ seus piores medos. Pode ser um daemonio, um morto-vivo, um predador ancestral - não importa. O que importa é que parece REAL demais. A vítima FOGE, abandonando tudo, apenas tentando se afastar da visão aterrorizante. É um truque cruel, mas eficaz.\n\nO alvo desta magia imediatamente larga quaisquer fichas de tesouro que esteja carregando - mãos tremem demais para segurar. O conjurador pode mover a figura até 8cm em qualquer direção desde que isto não mova a figura para combate ou cause dano imediato (ex: cair mais de 8cm) - a vítima recua em terror. O alvo pode fazer uma Rolagem de Vontade com Classe de Dificuldade igual à Rolagem de Conjuração. Se bem-sucedida, vê através do truque e a magia não tem efeito. Caso contrário, você tem o traço Medo contra aquela criatura até o fim do jogo - o medo persiste.",
    },
    {
      name: "Agulhas Sombrias",
      castingNumber: 10,
      range: "Linha de Visão",
      effect:
        "O mago molda as próprias trevas em lâminas afiadas - não de aço, mas de ausência solidificada. As facas são negras como vazio, tão escuras que parecem buracos na realidade. Quando arremessadas, voam silenciosamente, sem brilho de metal para denunciá-las. A vítima sente a mordida fria antes de ver o que a atingiu. E pior - as lâminas estão cobertas em veneno nascido das sombras, uma toxina que não existe em natureza alguma.\n\nFaça um ataque a distância envenenado +3 imediato contra a figura alvo. Este é um ataque não-mágico - as facas são substância real, embora nascidas de sombras.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Ulgu - Tradição das Sombras" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#9370db",
              mb: 3,
            }}
          >
            O Vento Cinza do Engano e Ilusão
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            A Tradição das Sombras é a magia do ocultamento, ilusão, confusão e
            ocasionalmente morte invisível. Ela é baseada na manipulação de
            Ulgu, o Vento Cinza da Magia. Magistrados desta tradição são
            conhecidos como Magos Cinzentos e são um grupo enigmático. Estão tão
            envoltos em engano que seus verdadeiros sentimentos e agendas
            raramente são conhecidos. Magos Cinzentos são às vezes conhecidos
            como ilusionistas ou Magos trapaceiros. Conforme Magos Cinzentos
            crescem em poder, assumem uma presença enigmática e uma aparência
            lupina. Com longos cabelos cinzentos e fibrosos e uma postura magra
            e de pés leves, começam a parecer quase malandros, não fossem seus
            olhos cinza tempestade. Mesmo com estas características distintivas,
            as pessoas acham difícil descrever um poderoso Mago das Sombras,
            pois seus rostos parecem tornar-se vagos e indistintos. Alguns
            afirmam que eles mudam sutilmente para se adequar aos arredores, mas
            isto parece inverossímil demais, mesmo para Altos Magistrados.
          </ParchmentText>

          <PowerListTitle>Feitiços da Tradição das Sombras</PowerListTitle>

          {spells.map((spell, index) => (
            <SpellCard
              key={index}
              id={spell.name.toLowerCase().replace(/\s+/g, "-")}
              name={spell.name}
              school="Tradição das Sombras"
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
