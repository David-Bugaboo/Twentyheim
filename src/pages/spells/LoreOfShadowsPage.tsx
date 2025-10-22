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
      keywords: ["Linha de Visão", "Ilusão"],
      effect:
        "A figura alvo ganha característica Furtividade(12) até o fim do jogo.",
    },
    {
      name: "Mortalha de Escuridão",
      castingNumber: 8,
      keywords: ["Linha de Visão"],
      effect:
        "No turno em que a magia é conjurada, a linha de visão máxima para o jogo é reduzida para 40cm - a mortalha começa a cair. A cada turno depois disto, a linha de visão máxima diminui mais 5cm, até um mínimo de 30cm. As sombras crescem, sempre crescem.",
    },
    {
      name: "Véu da Invisibilidade",
      castingNumber: 12,
      keywords: ["Toque"],
      effect:
        "O mago tece Ulgu ao redor do alvo como um artesão tece seda - camada sobre camada de sombra até que a realidade simplesmente... esqueça que há alguém ali. A figura não se torna transparente - ela deixa de existir para os olhos alheios. É o truque supremo do ilusionista: não esconder, mas fazer com que ninguém procure. Contudo, toda ilusão tem seus limites - atos dramáticos quebram o encanto. Violência, magia, até mesmo pegar algo brilhante demais... e PUFF, o truque se desfaz.\n\nA figura alvo torna-se invisível - simplesmente não está lá para os olhos dos outros. Nenhuma figura pode mover-se para combate com a figura invisível, nem pode ter como alvo com qualquer ataque ou magia (embora ainda possa ser afetada por efeitos de área). Se a figura invisível mover-se para combate, conjurar uma magia, ou pegar uma ficha de tesouro, a performance termina e a magia Invisibilidade é cancelada. Esta magia pode ser conjurada em uma figura já carregando tesouro, tornando ambos invisíveis. Neste caso, se a figura largar o tesouro, a magia é cancelada.",
    },
    {
      name: "Doppelganger",
      castingNumber: 12,
      keywords: ["Ritual", " Toque", "Ilusão"],
      effect:
        "Um soldado ilusório torna-se um membro temporário do bando. Este soldado pode ser de qualquer tipo encontrado no bando. Este soldado não pode pegar tesouro, nem pode causar dano - mas blefa convincentemente. De outra forma conta como um soldado regular: pode engajar em combate (sem causar dano se vencer, mas pode empurrar), dar apoio, ocupar espaço. Se o soldado ilusório sofrer dano de qualquer tipo, PUFF - a ilusão se desfaz. Um bando só pode ter um soldado ilusório a qualquer momento. O jogador deve revelar qual membro é o ilusório. Soldados ilusórios não começam com itens ou equipamento especial.",
    },
    {
      name: "Aspecto do Pavor",
      castingNumber: 12,
      keywords: ["Linha de Visão", "Ilusão", "Psicológico"],
      effect:
        "O mago projeta uma ilusão sobre si mesmo, mas não uma ilusão qualquer - uma MENTIRA que a mente da vítima completa. As sombras se contorcem, assumindo formas de pesadelo. A vítima VÊ seus piores medos. Pode ser um daemonio, um morto-vivo, um predador ancestral - não importa. O que importa é que parece REAL demais. A vítima FOGE, abandonando tudo, apenas tentando se afastar da visão aterrorizante. É um truque cruel, mas eficaz.\n\nO alvo desta magia imediatamente larga quaisquer fichas de tesouro que esteja carregando - mãos tremem demais para segurar. O conjurador pode mover a figura até 8cm em qualquer direção desde que isto não mova a figura para combate ou cause dano imediato (ex: cair mais de 8cm) - a vítima recua em terror. O alvo pode fazer uma Rolagem de Vontade com Classe de Dificuldade igual à Rolagem de Conjuração. Se bem-sucedida, vê através do truque e a magia não tem efeito. Caso contrário, você tem o traço Medo contra aquela criatura até o fim do jogo - o medo persiste.",
    },
    {
      name: "Agulhas Sombrias",
      castingNumber: 10,
      keywords: ["Linha de Visão", "Magic Missile (Magic) (+3)"],
      effect:
        "Atire o Míssil Mágico contra a figura alvo. Define a armadura da figura com Atributo Armadura + Vontade ao invés de Atributo Armadura + Bonus de Armadura",
    },
    {
      name: "Beleza Excêntrica",
      castingNumber: 10,
      keywords: ["Conjurador Apenas"],
      effect:
        "Esta magia faz com que qualquer um que olhe para o conjurador veja uma criatura estranhamente bonita. Qualquer membro de um bando adversário deve fazer um teste de Vontade com CD igual à Rolagem de Conjuração se desejar fazer qualquer uma das seguintes ações: declarar carga contra  o conjurador, fazer um ataque a distância que possa potencialmente atingir o conjurador (incluindo ataques a distância gerados por magias), ou conjurar qualquer magia que tenha o conjurador como alvo. Conjuradores podem forçar esta Rolagem de Vontade da mesma forma que poderiam forçar para resistir a uma magia. Uma figura pode tentar tal Rolagem de Vontade apenas uma vez por turno.",
    },
    {
      name: "Absorver para as Sombras",
      castingNumber: 12,
      keywords: ["Alcance(40)", "Ilusão"],
      effect:
        "uma figura aliada e uma figura inimiga em linha de visão do conjurador são trocadas de lugar. A figura inimiga ganha um Marcador de Atordoamento (essa parte do efeito conta como um efeito psicológico) e a figura aliada ganha Furtividade(18). Esse poder pode ser usada para tirar uma figura aliada de combate, mas apenas se nenhuma das figuras que estejam em combate com ela tenham a característica visão verdadeira.",
    },
    {
      name: "Confusão Universal",
      castingNumber: 14,
      keywords: ["Alcance(50cm)", "Área de Efeito(Zona Grande)"],
      effect:
        "Posicione a Área de Efeito em um ponto alvo. Todas as figuras na área devem fazer um teste de vontade com CD igual á rolagem de conjuração dessa magia. Se a figura falhar nesse teste, ela deve andar seu valor inteiro de movimento em uma direção aleatória. Se uma figura chegar na borda do tabuleiro ou colidir com um terreno durante esse movimento, ele para e a figura ganha um Marcador de Atordoamento. Se duas figuras entrarem em contato de base por conta desse movimento, elas imediatamente lutam.",
    },
    {
      name: "Passo Penumbral",
      castingNumber: 8,
      keywords: ["Conjurador apenas"],
      effect:
        "O Conjurador se teletransporta para qualquer parte do mapa que seja a mais de 20cm de uma figura inimiga e fora da linha de visão de todas as figuras inimigas. Se uma figura está fora da linha de visão de todas as criaturas aliadas, o conjurador pode ser teletransportado em combate com essa figura. ",
    },
    {
      name: "Cortina da Penumbra",
      castingNumber: 8,
      keywords: ["Linha de Visão", "Área de Efeito(Zona Média)"],
      effect:
        "A área de efeito deve ser posicionada inteiramente dentro da linha de visão do conjurador. A Área de Efeito bloqueia linha de visão para dentro e para fora, e figuras dentro dela. Criaturas estão efetivamente cegas dentro da Área de Efeito, usando Ímpeto e Precisão como 0.",
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
