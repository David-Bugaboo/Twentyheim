import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import { useRef } from "react";

import HeaderH3 from "../../components/HeaderH3";
import UnitCard, {
  type UnitAbility,
  type UnitStats,
} from "../../components/UnitCard";
import GenericTable from "../../components/GenericTable";
import stats from "./data/happenins-datasheets.data.json";

// Lista de todos os acontecimentos
const acontecimentos = [
  { numero: 1, titulo: "Mercenário Ogro", id: "mercenario-ogro" },
  { numero: 2, titulo: "Enxame de Ratos", id: "enxame-ratos" },
  { numero: 3, titulo: "Terremoto", id: "terremoto" },
  { numero: 4, titulo: "Ventos Fortes", id: "ventos-fortes" },
  {
    numero: 5,
    titulo: "Sangue para o Deus do Sangue!",
    id: "sangue-deus-sangue",
  },
  { numero: 6, titulo: "Descoberta Sorte", id: "descoberta-sorte" },
  { numero: 7, titulo: "Espírito Inquieto", id: "espirito-inquieto" },
  { numero: 8, titulo: "Prédio em Chamas", id: "predio-chamas" },
  { numero: 9, titulo: "Devorador de Homens", id: "devorador-homens" },
  { numero: 10, titulo: "Esqueletos", id: "esqueletos" },
  {
    numero: 11,
    titulo: "Distorção da Realidade",
    id: "Distorção da Realidade",
  },
  { numero: 12, titulo: "Prole do Caos", id: "prole-caos" },
  { numero: 13, titulo: "Prédio Desmoronando", id: "predio-desmoronando" },
  { numero: 14, titulo: "Rabiscos em uma Parede", id: "rabiscos-parede" },
  { numero: 15, titulo: "Névoa Espessa", id: "nevoa-espessa" },
  { numero: 16, titulo: "Mãos de Pedra", id: "maos-pedra" },
  { numero: 17, titulo: "Matilha de Cães", id: "matilha-caes" },
  { numero: 18, titulo: "Tempestade do Caos", id: "tempestade-caos" },
  { numero: 19, titulo: "Praga de Moscas", id: "praga-moscas" },
  { numero: 20, titulo: "Poço Refletor", id: "poço-refletor" },
  { numero: 21, titulo: "Vítimas da Peste", id: "vitimas-peste" },
  { numero: 22, titulo: "Último em Pé", id: "ultimo-pe" },
  { numero: 23, titulo: "Armadilhas", id: "armadilhas" },
  { numero: 24, titulo: "Fruto Proibido", id: "fruto-proibido" },
  { numero: 25, titulo: "Os Perdidos", id: "os-perdidos" },
];

function HappeningsPage() {
  // Criar refs para cada acontecimento
  const refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {};
  acontecimentos.forEach((acontecimento) => {
    refs[acontecimento.id] = useRef<HTMLDivElement | null>(null);
  });

  const navigationSections = [
    { id: "intro", title: "Acontecimentos", level: 0 },
    { id: "o-que-sao", title: "O que são Acontecimentos?", level: 0 },
    {
      id: "tabela-acontecimentos",
      title: "Tabela de Acontecimentos",
      level: 0,
    },
    { id: "regras-gerais", title: "Acontecimentos", level: 0 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Acontecimentos</PageTitle>
            </div>

            <div id="o-que-sao">
              <HeaderH1>O que são Acontecimentos?</HeaderH1>
            </div>
            <MobileText>
              Durante a rolagem de iniciativa, para cada jogador que rolou 5 ou
              menos na sua rolagem de iniciativa, um acontecimento é
              desencadeado. Se um acontecimento especificar um bando como alvo,
              o alvo é o jogador que fez a rolagem que desencadeou o
              acontecimento específico. Role o acontecimento imediatamente
              depois da rolagem de iniciativa de 5 ou menos para que sempre
              fique claro quem o desencadeou. Para cada acontecimento
              desencadeado, role um d20, some com a rolagem de iniciativa que
              desencadeou o acontecimento e compare com os resultados abaixo:
            </MobileText>

            <div id="tabela-acontecimentos">
              <HeaderH2>Tabela de Acontecimentos</HeaderH2>
            </div>
            <MobileText>
              Clique em qualquer acontecimento na tabela abaixo para ir
              diretamente à sua descrição:
            </MobileText>

            <div className="my-6">
              <GenericTable
                data={acontecimentos.map((acontecimento) => ({
                  D20: acontecimento.numero.toString(),
                  Acontecimento: (
                    <button
                      key={acontecimento.id}
                      onClick={() =>
                        refs[acontecimento.id].current?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        })
                      }
                      className="text-green-600 hover:text-blue-300 underline transition-colors cursor-pointer"
                    >
                      {acontecimento.titulo}
                    </button>
                  ),
                }))}
              />
            </div>

            <div id="regras-gerais">
              <HeaderH1>Acontecimentos</HeaderH1>
            </div>

            <div id="mercenario-ogro" ref={refs["mercenario-ogro"]}>
              <HeaderH3>1 - Mercenário Ogro</HeaderH3>
            </div>
            <MobileText className="italic">
              Um Mercenário Ogro aparece mais adiante na rua. Sentindo problemas
              se aproximando, ele decide aproveitar a oportunidade e oferecer
              seus serviços ao bando com menos fragmentos de pedra-bruxa
              capturados.
            </MobileText>
            <MobileText>
              O bando ao qual ele oferece ajuda deve adicioná-lo às suas figuras
              do bando para este jogo. No final do jogo, o Ogro exige pagamento
              pelos serviços prestados, de 80 coroas. O bando ao qual ele se
              juntou deve pagar. Se o bando não puder (ou não quiser) pagá-lo,
              ele sai, mas não antes de descontar sua frustração em um membro
              aleatório do bando (role apenas entre os membros do bando que não
              foram eliminados durante o jogo). Role sobrevivência para este
              membro infeliz, como se ele tivesse sido reduzido a 0 de vida.
            </MobileText>
            <UnitCard
              id="mercenario-ogro"
              name="Mercenário Ogro"
              role="Mercenário"
              quantity="0-1"
              stats={
                stats.find((stat) => stat.id === "mercenario-ogro")
                  ?.stats as UnitStats
              }
              abilities={
                stats.find((stat) => stat.id === "mercenario-ogro")
                  ?.abilities as UnitAbility[]
              }
            />

            <div id="enxame-ratos" ref={refs["enxame-ratos"]}>
              <HeaderH3>2 - Enxame de Ratos</HeaderH3>
            </div>
            <MobileText className="italic">
              Algo nos esgotos assustou os ratos que vivem lá. Eles estão com
              pressa para fugir e atacarão qualquer coisa que esteja em seu
              caminho.
            </MobileText>
            <MobileText>
              Use uma base de 80mm x 120mm para representar os ratos. Seis bases
              de monstro (use enxames de ratos se tiver disponível), colocadas
              em um retângulo com um lado curto representando a frente,
              funcionarão bem. O enxame é posicionado exatamente no meio da
              borda do tabuleiro que o jogador que desencadeou esse evento
              posicionou suas miniaturas. Os ratos se movem 1d20+5 a cada turno,
              como figuras não controladas. Não se pode interceptar ou declarar
              cargas contra os ratos, nem fazer ataques a distância, e fizerem
              contato com uma figura, passarão por cima dela. Qualquer figura
              sobre a qual os ratos passem sofrerá um ataque +5. Qualquer magia
              , acessório ou ataque de área de efeito tirará os ratos de campo.
              Eles continuarão em campo até que alcancem uma borda do tabuleiro.
            </MobileText>

            <div id="terremoto" ref={refs["terremoto"]}>
              <HeaderH3>3 - Terremoto</HeaderH3>
            </div>
            <MobileText className="italic">
              Poderosas energias mágicas da cratera no centro da cidade sacodem
              a paisagem local. O chão se agita e se dobra violentamente e os
              membros do bando acham difícil manter o equilíbrio.
            </MobileText>
            <MobileText>
              O terremoto dura esse turno apenas. Enquanto o tremor persistir,
              todo movimento é reduzido pela metade, e rolagens de Ímpeto e
              Precisão são feitas com uma penalidade de -2.
            </MobileText>

            <div id="ventos-fortes" ref={refs["ventos-fortes"]}>
              <HeaderH3>4 - Ventos Fortes</HeaderH3>
            </div>
            <MobileText className="italic">
              Um vento poderoso grita pela área, espalhando detritos
              selvagemente e derrubando qualquer coisa que não esteja firmemente
              ancorada ao chão.
            </MobileText>
            <MobileText>
              Os membros de todos os bandos agora sofrem uma penalidade de -1 em
              todas as rolagens de ataque a distância até o fim do turno.
              Movimento de escalada é reduzido a um gasto de 3 de movimento para
              cada 1cm de escalada.
            </MobileText>

            <div id="sangue-deus-sangue" ref={refs["sangue-deus-sangue"]}>
              <HeaderH3>5 - Sangue para o Deus do Sangue!</HeaderH3>
            </div>
            <MobileText className="italic">
              Infelizmente para os bandos envolvidos, o cheiro de sangue trouxe
              a atenção de um dos servos de Khorne. A realidade é rompida quando
              um Sanguissedento feroz emerge do Reino do Caos para derramar
              ainda mais sangue para seu mestre.
            </MobileText>
            <MobileText>
              O Sanguissedento tem as seguintes características e regras
              especiais:
            </MobileText>
            <UnitCard
              id="sanguissedento"
              name="Sanguissedento"
              role="Daemônio"
              quantity="0-1"
              stats={
                stats.find((stat) => stat.id === "sanguissedento")
                  ?.stats as UnitStats
              }
              abilities={
                stats.find((stat) => stat.id === "sanguissedento")
                  ?.abilities as UnitAbility[]
              }
            />
            <MobileText>
              O Sanguissedento é posicionado no combate com mais figuras que
              exista no tabuleiro. Ele age como uma criatura não controlada,
              exceto que pode tomar uma ação de luta ou declarar uma carga
              movendo seu movimento completo sempre que qualquer outra figura no
              tabuleiro tomar uma ação de luta ou declarar carga. A violência é
              seu combustível!
            </MobileText>
            <MobileText>
              Se não houver combates acontecendo, ele é posicionado no centro da
              borda do tabuleiro que o jogador que desencadeou o evento
              posicionou suas figuras. Ele sempre usará todas as suas ações para
              se mover e carregar a figura mais próxima, e não precisa ter linha
              de visão para nenhuma das duas coisas. Após ser reduzido a 8 de
              vida, ou após 8 turnos, ou após reduzir 8 criaturas a 0 de vida,
              ele desaparece.
            </MobileText>

            <div id="achado-sorte" ref={refs["descoberta-sorte"]}>
              <HeaderH3>6 - Achado de Sorte</HeaderH3>
            </div>
            <MobileText className="italic">
              Uma figura aleatória do bando que desencadeou o evento, tropeça em
              um fragmento de Pedra-Bruxa!
            </MobileText>
            <MobileText>
              Posicione um fragmento de Pedra-Bruxa em contato de base com uma
              figura aleatória do bando que desencadeou o evento.
            </MobileText>

            <div id="espirito-inquieto" ref={refs["espirito-inquieto"]}>
              <HeaderH3>7 - Espírito Inquieto</HeaderH3>
            </div>
            <MobileText className="italic">
              Incontáveis infelizes sofreram mortes agonizantes de diferentes
              formas desde que o cometa caiu na cidade. Nem todos esses
              indivíduos podem facilmente aceitar sua nova condição e se recusam
              fazer a passagem para o pós-vida. Talvez tenham deixado alguma
              tarefa importante inacabada ou busquem vingança contra aqueles que
              os prejudicaram. Os bandos tropeçaram em um desses fantasmas.
            </MobileText>
            <MobileText>
              Um Espectro é posicionado exatamente no centro do tabuleiro.
              Qualquer membro do bando que esteja a 20cm do espírito no início
              de sua ativação deve fazer um teste de Vontade CD 14 ou perder sua
              ação de movimento, paralisado de medo. Modelos que são imunes à
              Aterrorizante ou Efeitos Psicológicos passam automaticamente neste
              teste. Esta criatura é incapaz de afetar (ou ser afetada por) o
              mundo físico, mas é um horror terrível de qualquer forma. O
              espírito se move 10cm em uma direção aleatória no começo de cada
              turno, passando por peças de terreno ou figuras como se não
              estivessem lá. A única exceção a isso é se o espírito entrar em
              contato com uma Matriarca Sigmarita ou um Sacerdote Marcial de
              Sigmar. Esses modelos podem escolher colocar os mortos para
              descansar. Se o jogador que controla tal modelo decidir fazer isso
              como uma ação (pode substituir a ação de movimento), o espírito é
              imediatamente banido (desaparece e não retorna) e o sacerdote ou
              matriarca ganham 20 de experiência.
            </MobileText>

            <div id="predio-chamas" ref={refs["predio-chamas"]}>
              <HeaderH3>8 - Prédio em Chamas</HeaderH3>
            </div>
            <MobileText className="italic">
              De repente, uma das peças de terreno (escolhida aleatoriamente)
              explode em chamas, inflamado por brasas fumegantes de um fogo que
              se pensava ter sido extinto há muito tempo.
            </MobileText>
            <MobileText>
              Qualquer modelo dentro ou até 3cm da peça de terreno sofre um
              ataque Flamejante +4 no começo de sua ativação, e recebe um
              Marcador de Chamas. Pelo resto do jogo, o prédio em si causará
              medo devido às chamas incandescentes e qualquer um que queira se
              mover para dentro ou até 3cm da peça de terreno deve passar em um
              teste de Vontade CD 14 ou perder sua ação de movimento, paralisado
              de medo.
            </MobileText>

            <div id="devorador-homens" ref={refs["devorador-homens"]}>
              <HeaderH3>9 - Devorador de Homens</HeaderH3>
            </div>
            <MobileText className="italic">
              Uma dos Salgueiros crescendo na área foi transformada em um
              predador carnívoro pela exposição à magia do Caos que inunda a
              área.
            </MobileText>
            <MobileText>
              Determine aleatoriamente qual membro do bando que desencadeou o
              evento encontra a planta. Essa figura é atacada no começo da sua
              ativação quando uma boca grande se abre no tronco da árvore e seus
              galhos chicoteiam para agarrar sua vítima infeliz. Posicione O
              Salgueiro Devorador de Homens em combate com a figura.
            </MobileText>
            <UnitCard
              id="sanguissedento"
              name="Sanguissedento"
              role="Daemônio"
              quantity="0-1"
              stats={
                stats.find(
                  (stat) => stat.id === "salgueiro-devorador-de-homens"
                )?.stats as UnitStats
              }
              abilities={
                stats.find(
                  (stat) => stat.id === "salgueiro-devorador-de-homens"
                )?.abilities as UnitAbility[]
              }
            />
            <MobileText>
              O Salgueiro não pode se mover, mas interceptará qualquer movimento
              próximo a ele. Ele tem vida e armadura demais para ser reduzida a
              0 de vida fácilmente, mas se um bando chegar a conseguir,
              posicione dois marcadores de Pedra-Bruxa onde ela estava. Tirando
              essas características, ele age como uma figura não controlada
              normalmente.
            </MobileText>

            <div id="esqueletos" ref={refs["esqueletos"]}>
              <HeaderH3>10 - Esqueletos</HeaderH3>
            </div>
            <MobileText className="italic">
              Enquanto a magia intensa da área dissolve rapidamente esqueletos
              em pó, hordas cambaleantes deles surgem aleatoriamente dos ossos
              dos caídos. Descontrolados, eles vagam pelo deserto da cidade,
              atacando cegamente tudo que encontram antes de se desfazerem.
            </MobileText>
            <MobileText>
              Posicione 12 esqueletos no campo de batalha, surgindo de peças de
              terreno aleatoriamente decididas.
            </MobileText>

            <MobileText>
              Os Esqueletos agem como figuras não controladas normalmente. Se 6
              dos esqueletos forem eliminados, a magia necromântica se
              enfraquece e os outros se desfazem em pó. Um necromante presente
              no jogo no momento em que isso acontece agora pode levantar
              esqueletos com sua magia Erguer Mortos-Vivos.
            </MobileText>
            <UnitCard
              id="esqueleto"
              name="Esqueleto"
              role="Morto-Vivo"
              quantity="12"
              stats={
                stats.find((stat) => stat.id === "esqueleto")
                  ?.stats as UnitStats
              }
              abilities={
                stats.find((stat) => stat.id === "esqueleto")
                  ?.abilities as UnitAbility[]
              }
            />

            <div id="distorcao-realidade" ref={refs["Distorção da Realidade"]}>
              <HeaderH3>11 - Distorção da Realidade</HeaderH3>
            </div>
            <MobileText className="italic">
              A própria realidade parece se torcer, distorcendo percepções até
              que ninguém possa ter certeza do que seus sentidos lhes dizem.
            </MobileText>
            <MobileText>
              Role um D20 no início de cada turno do jogador. Durante esse
              turno, o bando do jogador que desencadeou esse acontecimento usa o
              valor rolado no d20 para qualquer medida de distância, incluindo
              alcance, movimento, distância que o líder pode ativar figuras e
              etc.
            </MobileText>

            <div id="prole-caos" ref={refs["prole-caos"]}>
              <HeaderH3>12 - Prole do Caos</HeaderH3>
            </div>
            <MobileText className="italic">
              Os bandos tropeçaram em um dos muitos ex-habitantes da cidade que
              chegaram muito perto da cratera no centro da cidade e foram
              transformados em uma Prole do Caos. Posicione 4 Proles do Caos no
              campo de batalha, surgindo da borda do tabuleiro em que o jogador
              que desencadeou o evento posicionou suas figuras. As proles agem
              normalmente como figuras não controladas.
            </MobileText>
            <UnitCard
              id="prole-do-caos"
              name="Prole do Caos"
              role="Daemônio"
              quantity="1"
              stats={
                stats.find((stat) => stat.id === "prole-do-caos")
                  ?.stats as UnitStats
              }
              abilities={
                stats.find((stat) => stat.id === "prole-do-caos")
                  ?.abilities as UnitAbility[]
              }
            />
            <div id="predio-desmoronando" ref={refs["predio-desmoronando"]}>
              <HeaderH3>13 - Prédio Desmoronando</HeaderH3>
            </div>
            <MobileText>
              Escolha uma peça de terreno aleatoriamente. Qualquer figura dentro
              da peça de terreno ou a 3cm dela deve passar em um teste de
              Movimento CD 30 ou sofrer um ataque +10, conforme o prédio
              desmorona. Remova a peça de terreno da mesa (substituindo por
              ruínas se possível), e coloque os modelos de volta na mesa onde
              estavam. Qualquer figura no telhado quando ele desmorona
              automaticamente cai de qualquer altura que estivesse.
            </MobileText>

            <div id="rabiscos-parede" ref={refs["rabiscos-parede"]}>
              <HeaderH3>14 - Rabiscos em uma Parede</HeaderH3>
            </div>
            <MobileText className="italic">
              Um membro do bando que desencadeou o acontecimento determinado
              aleatoriamente, que está a 10cm de uma peça de terreno (se não
              houver modelos tão perto de uma peça de terreno, ignore este
              encontro), vê escrita aparecer subitamente em sangue na parede
              mais próxima a ele.
            </MobileText>
            <MobileText>
              Role na seguinte tabela para descobrir o que a escrita diz:
            </MobileText>
            <GenericTable
              data={[
                {
                  D20: "1-4",
                  Resultado:
                    "As escritas são um mapa da área. O bando do modelo recebe um +5 na rolagem de iniciativa do próximo turno.",
                },
                {
                  D20: "5-8",
                  Resultado:
                    "Ler a escrita acidentalmente enfeitiça o leitor. O modelo sofre uma maldição infernal e agora tem uma penalidade de -2 em todos os rolamentos de dados pelo resto do jogo.",
                },
                {
                  D20: "9-12",
                  Resultado:
                    "O membro do bando aprende sobre uma boa grana escondida dentro do prédio. Se o modelo não for reduzido a 0 de vida, o bando ganha 1d20 moedas de ouro no final do jogo.",
                },
                {
                  D20: "13-16",
                  Resultado:
                    "As escritas revelam todos os esconderijos na área. O modelo ganha Furtividade(12) pelo resto do jogo.",
                },
                {
                  D20: "17-19",
                  Resultado:
                    "O membro do bando aprende sobre uma passagem secreta dentro da peça de terreno. Se ele se mover para dentro da peça de terreno, pode ser reposicionado no próximo turno em contato com qualquer outra peça de terreno de tamanho similar.",
                },
                {
                  D20: "20",
                  Resultado:
                    "Uma leitura divertida, mas nada mais acontece (Veskit esteve aqui!).",
                },
              ]}
            />

            <div id="nevoa-espessa" ref={refs["nevoa-espessa"]}>
              <HeaderH3>15 - Névoa Espessa</HeaderH3>
            </div>
            <MobileText className="italic">
              Uma névoa se aproxima, espessa como sopa de ervilha.
            </MobileText>
            <MobileText>
              Role 1d20. Essa é a distância máxima que todos os modelos no
              tabuleiro podem traçar linha de visão durante esse turno. Um
              modelo com uma tocha ou lanterna pode ver 4cm mais longe.
            </MobileText>

            <div id="maos-pedra" ref={refs["maos-pedra"]}>
              <HeaderH3>16 - Mãos de Pedra</HeaderH3>
            </div>
            <MobileText className="italic">
              Mãos de terra e pedra subitamente se projetam do chão em uma
              pequena área do campo de batalha.
            </MobileText>
            <MobileText>
              O Jogador que desencadeou o evento deve escolher um local em
              qualquer lugar do campo de batalha e posicionar uma Área de
              Efeito(Zona Pequena) naquele local. Qualquer figura que atravesse
              essa área de efeito deve rolar um teste de Vontade CD 14 ou sua
              ação de movimento é imediatamente interrompida.
            </MobileText>

            <div id="matilha-caes" ref={refs["matilha-caes"]}>
              <HeaderH3>17 - Matilha de Cães</HeaderH3>
            </div>
            <MobileText className="italic">
              Eventos recentes em Mordheim fizeram com que muitos dos cães da
              cidade de repente fosse abandonados. Grupos desses animais se
              tornaram selvagens e formaram matilhas de caça. Os bandos foram
              farejados por uma dessas matilhas, que está terrivelmente faminta.
            </MobileText>
            <MobileText>
              A matilha consiste de 12 cães selvagens (use as estatísticas dos
              Cães de Guerra da lista de bando dos Caçadores de Bruxas). Eles
              agem como figuras não controladas normalmente. Se membros de uma
              matilha de cães reduzirem um um membro do bando a 0 de vida, ele
              será devorado vivo se não for resgatado. Se nenhum modelo do mesmo
              bando chegar a 14" de onde o modelo foi reduzido a 0 de vida até o
              final deste turno, o membro caído é considerado definitivamente
              morto, virando ração de cachorro.
            </MobileText>

            <div id="tempestade-caos" ref={refs["tempestade-caos"]}>
              <HeaderH3>18 - Tempestade do Caos</HeaderH3>
            </div>
            <MobileText className="italic">
              Nuvens se reúnem rapidamente acima da cidade em uma massa
              amarelo-esverdeada doentia e não natural, carregada de relâmpagos
              da warp que começam a bruxulear de uma nuvem para outra. Trovões
              sacodem o ar, emitindo ruídos que são perturbadoramente parecidos
              com gritos. As próprias nuvens parecem assumir as formas de
              criaturas monstruosas e os bandos no conflito se olham com medo em
              seus rostos.
            </MobileText>
            <MobileText>
              Role um D20 para ver o que a manifestação da tempestade trará:
            </MobileText>
            <GenericTable
              data={[
                {
                  D20: "1-4",
                  Resultado:
                    "Relâmpagos infernais começam a atingir o chão em busca de uma vítima. Ele atingirá a figura com o maior valor de armadura no tabuleiro (determinando aleatoriamente em caso de empate). Aquela figura recebe um ataque +7 elétrico. O relâmpago infernal continuará buscando vítimas até o fim do jogo.",
                },
                {
                  D20: "5-8",
                  Resultado:
                    "Peixes subitamente caem do céu para bombardear a área! Todo movimento é reduzido pela metade durante esse turno (devido aos peixes molhados e batendo sob os pés), mas não há outro efeito.",
                },
                {
                  D20: "9-12",
                  Resultado:
                    "Poeira de Pedra-Bruxa se misturou com o vapor d'água na área e produziu as nuvens de aparência estranha das quais uma chuva contaminada começa a cair. A chuva queima a carne e corrói pedra e metal. Qualquer figura que não estiver sob uma plataforma ou teto ou não estiver em cobertura recebe um ataque venenoso +4.",
                },
                {
                  D20: "13-16",
                  Resultado:
                    "Uma massa mágica de relâmpago se forma perto do chão, iluminando a área com um brilho esverdeado assombrado. Ela começa a se mover pela área, atraída por poderes mágicos dos quais se alimenta. Coloque uma figura para representar essa massa maligna, usando uma base de 60mm. Ela age como uma figura não controlada normalmente, mas sempre se move na direção do conjurador de maior nível no tabuleiro. Se não houver usuários de magia no jogo, a massa se moverá em direção à borda oposta da mesa, não fazendo nada além de bloquear a linha de visão conforme se move. Se a figura para o qual a massa está se movendo lançar uma magia, mova imediatamente o marcador mais 12cm em direção ao modelo. Se a massa de relâmpago tocar a figura alvo, o figura é congelado no tempo, perdendo todas as suas ações em qualquer ativação. Enquanto congelado, o modelo não pode ser atacado ou prejudicado de forma alguma - a massa de relâmpago protege sua presa! Após congelar um modelo, o relâmpago não se moverá mais, mas permanecerá perto de sua vítima para se alimentar. A massa de relâmpago se alimentará por 3 turnos da energia mágica de sua vítima e então voa de volta em direção às nuvens warp acima, libertando o usuário de magia. Se o jogo terminar antes que a alimentação seja feita, a vítima é imediatamente liberada. Vítimas não sofrem efeitos de longo prazo de sua exposição ao relâmpago.",
                },
                {
                  D20: "17-19",
                  Resultado:
                    "Um ronco é ouvido de cima, conforme trovões irrompem das nuvens estranhas. Os trovões se tornam mais intensos e os pulsos pesados de ar trazem guerreiros aos joelhos como se tivessem sido atingidos por balas de canhão de ar sólido. 5 modelos selecionados aleatoriamente no tabuleiro recebem marcadores de Atordoamento ao serem derrubados pelas rajadas de ar. Se qualquer um dessas figuras estiver em combate, todas as figuras em combate também recebem esses marcadores.",
                },
                {
                  D20: "20",
                  Resultado:
                    "Tentáculos de fumaça descem das nuvens, envolvendo as cabeças dos membros dos bandos. Selecione aleatoriamente um Herói de cada bando - esses guerreiros foram escolhidos por deuses da tempestade rivais como seus campeões. Os modelos escolhidos devem se mover em direção um ao outro a cada turno e declarar e completar uma carga o mais rapidamente possível. Uma vez em combate, eles sempre escolherão permanecer em combate e lutarão até que apenas um permaneça (o combate terminará quando um dos modelos reduzir seu rival a 0 de Vida). Se um bando não tiver mais Heróis em jogo quando os deuses da tempestade escolherem seus campeões, um soldado aleatório será escolhido daquele bando em vez disso.",
                },
              ]}
            />
            <div id="praga-moscas" ref={refs["praga-moscas"]}>
              <HeaderH3>Praga de Moscas</HeaderH3>
              <MobileText className="italic">
                Uma nuvem enorme de moscas aparece no céu e mergulha nos bandos
                abaixo.
              </MobileText>
              <MobileText>
                Todos os modelos no tabuleiro recebem uma penalidade de -2 em
                Ímpeto e Precisão, pois moscas zumbem ao redor deles e entram em
                orifícios abertos. As moscas permanecem por 3 turnos de jogo e
                então voam para longe.
              </MobileText>
            </div>

            <div id="poço-refletor" ref={refs["poço-refletor"]}>
              <HeaderH3>Poço Refletor</HeaderH3>
              <MobileText className="italic">
                Um guerreiro no chão (selecionado aleatoriamente do bando que
                desencadeou o acontecimento) nota uma pequena poça do que parece
                ser água parada. Refletindo o céu sombrio acima, parece ser
                metal líquido ou água prateada não naturalmente profunda,
                ondulando apenas ligeiramente com a brisa úmida soprando pela
                cidade. Ele pode ignorá-la, ou se curvar rapidamente para espiar
                em suas profundezas.
              </MobileText>
              <MobileText>
                Se ele for corajoso o suficiente para olhar no líquido turvo,
                role um D20:
              </MobileText>
              <GenericTable
                data={[
                  {
                    D20: "1-4",
                    Resultado:
                      "A água reflete imagens enloquecedoras de sua própria morte, enchendo-o de medo por sua própria vida. Pelo resto do jogo, ela recebe -3 de Vontade.",
                  },
                  {
                    D20: "5-8",
                    Resultado:
                      "A figura vislumbra uma imagem do que ainda está por vir. Pelo resto do turno atual, ele pode re-rolar (uma vez!) qualquer rolagem de Ímpeto ou Precisão.",
                  },
                  {
                    D20: "9-12",
                    Resultado:
                      "Uma imagem fraca de seu deus aparece, seja Sigmar ou até mesmo o terrível Senhor das Sombras. Cheio de coragem, o guerreiro pode passar automaticamente em qualquer teste de Vontade que seja obrigado a fazer pelo resto do jogo.",
                  },
                  {
                    D20: "13-16",
                    Resultado:
                      "A figura espiou nas profundezas de sua própria mente, desbloqueando habilidades não utilizadas. Ele pode detectar qualquer modelo inimigo escondido naquele turno, mesmo aqueles não em sua linha de visão normal, e passa a informação para o resto de seus companheiros. Todas as figuras inimigas perdem a características Furtividade(X).",
                  },
                  {
                    D20: "17-19",
                    Resultado:
                      "Um braço esguio se estende da poça, deixando nenhuma ondulação no líquido liso, e dedos pálidos tocam o peito do guerreiro. O toque suave causa um brilho fraco, que se espalha por todo seu corpo. Embora rapidamente se atenue, uma forte sensação de força e vitalidade fica para trás. O guerreiro pode transformar o próximo dano que receber no jogo em 0, ignorando quaisquer efeitos adicionais do ataque.",
                  },
                  {
                    D20: "20",
                    Resultado:
                      "A cidade escolhe revelar sua verdadeira face ao guerreiro, desvelando a inteligência monstruosa que se esconde por trás da fachada de simples ruínas e escombros. A mente do guerreiro é dominada pela enormidade da impressão e ele tropeça em terror absoluto. Pelo resto do jogo, todos os modelos inimigos contam como tendo a característica Aterrorizante para esta figura e ele se recusará a chegar a 6cm de qualquer Peça de Terreno. Após o jogo, os efeitos desaparecerão, embora ele sempre hesite ligeiramente antes de entrar em um quarto sem luz de agora em diante...",
                  },
                ]}
              />
              <MobileText>
                <strong>Nota:</strong> Apenas guerreiros que podem ganhar
                experiência podem escolher olhar na poça, todos os outros
                simplesmente não são inteligentes o suficiente para ligar!
              </MobileText>
            </div>

            

            <div id="vitimas-peste" ref={refs["vitimas-peste"]}>
              <HeaderH3>Vítimas da Peste</HeaderH3>
            </div>
            <MobileText className="italic">
              Doença é uma ocorrência comum entre os poucos sobreviventes
              restantes nas ruínas da cidade.
            </MobileText>
            <MobileText>
              Este grupo de 5 cidadãos é posicionado em 5 peças de terreno
              decididas aleatoriamente no tabuleiro. Eles contraíram uma praga
              particularmente desagradável conhecida como Necrose de Nurgle.
              Eles se movem em ritmo normal (14cm) em direção aos membros do
              bando mais próximo, buscando sua ajuda. Se entrarem em contato com
              um membro do bando, eles não atacarão, mas em vez disso se
              agarrarão a ele enquanto suplicam por sua ajuda, dificultando-o
              muito. Um modelo com Vítimas da Peste em contato com ele age como
              se tivesse carregando um fragmento de Pedra-Bruxa. Se uma figura
              declarar carga ou fizer um ataque a distância contra uma Vítima da
              Peste, ela imediatamente foge, sendo removida do tabuleiro. No
              final do jogo, role um dado para cada membro do bando em jogo
              quando as Vítimas da Peste apareceram e em um rolamento de 1-5,
              aquele membro contraiu a Necrose de Nurgle. Role novamente para
              ver que efeito a doença tem naquele membro:
            </MobileText>
            <GenericTable
              data={[
                {
                  D20: "1-3",
                  Resultado:
                    "Sintomas Maiores: A praga corre pelo sistema da vítima, produzindo lesões horríveis e desfigurantes antes de matá-la. Se o modelo for um Subordinado, ele morre. Se o modelo for um Herói, role 3 vezes na tabela de Sobrevivência (ignorando os resultados de Roubado, Inimizade Amarga, Capturado e Vendido para as Arenas) para determinar os efeitos de longo prazo da doença.",
                },
                {
                  D20: "4-17",
                  Resultado:
                    "Sintomas Menores: A Necrose cobra seu preço da vítima conforme segue seu curso. Sem descanso adequado na cama, a vítima morrerá. O membro do bando deve perder o próximo jogo enquanto se recupera.",
                },
                {
                  D20: "18-20",
                  Resultado:
                    "Recuperação Completa! A vítima tem uma constituição especialmente resistente ou contrai um caso extremamente leve da doença. A vítima não sofre efeitos adversos.",
                },
              ]}
            />

            <div id="ultimo-pe" ref={refs["ultimo-pe"]}>
              <HeaderH3>22 - Último em Pé</HeaderH3>
            </div>
            <MobileText className="italic">
              Os horrores de Mordheim podem levar até a mente mais forte além do
              ponto da loucura. Esta Matriarca Sigmarita viu todo o seu bando
              cortado ao seu redor e a experiência se mostrou demais. Ela agora
              busca vingança e não é particular sobre quem vai pagar!
            </MobileText>
            <MobileText>
              Posicione uma Matriarca Sigmarita no centro do tabuleiro (use as
              estatísticas da Matriarca Sigmarita do bando Irmãs de Sigmar). Ela
              está armada com um Martelo Sigmarita e chicote de aço e veste
              armadura pesada e um elmo. Ela também carrega Água Benta e uma
              Relíquia Sagrada consigo. Ela conhece as orações Martelo de Sigmar
              e Armadura da Retidão. Role aleatoriamente para determinar qual
              ela conjura a cada turno. Um bando de Irmãs de Sigmar ganha a Irmã
              como um reforço para o seu bando, embora ela parta no final do
              jogo. Quando a Matriarca Sigmarita é reduzida a 0 de vida, um
              marcador de equipamento é posicionado no local onde ela estava.
              Qualquer bando que capturar esse marcador, que segue as mesmas
              regras de um fragmento de pedra bruxa ganha os equipamentos da
              Matriarca.
            </MobileText>

            <div id="armadilhas" ref={refs["armadilhas"]}>
              <HeaderH3>23 - Armadilhas</HeaderH3>
            </div>
            <MobileText className="italic">
              Alguns indivíduos nefastos prenderam toda a área que os bandos
              estão procurando. Essas armadilhas podem tomar a forma de poços
              com espinhos, armadilhas mortais, tábuas com espinhos acionadas
              por mola, etc.
            </MobileText>
            <MobileText>
              Quando este encontro é rolado, o bando que desencadeou o evento
              deve determinar aleatoriamente qual de seus membros do bando
              descobriu a primeira armadilha. Este indivíduo infeliz ativa uma
              armadilha imediatamente. Se a armadilha não for evitada passando
              em um teste de Vontade CD 15, aquele modelo sofre um ataque +5 . A
              partir deste ponto até o final do jogo, cada jogador que rolar um
              múltiplo de 5 na sua rolagem de iniciativa deve repetir esse mesmo
              processo.
            </MobileText>

            <div id="fruto-proibido" ref={refs["fruto-proibido"]}>
              <HeaderH3>24 - Fruto Proibido</HeaderH3>
            </div>
            <MobileText className="italic">
              Flores fantasmagóricas brancas subitamente se abrem em uma árvore
              na área e emitem uma fragrância poderosa.
            </MobileText>
            <MobileText>
              Determine aleatoriamente um membro do bando que desencadeou o
              evento que por acaso está ao lado da árvore quando ela ganha vida.
              Coloque a árvore a 6cm deste modelo. Qualquer membro do bando a
              20cm da árvore deve fazer um teste de Vontade CD 13 no início de
              cada uma de suas ativações ou se mover o mais rapidamente possível
              em direção à árvore. Se a 3cm da árvore, um modelo enfeitiçado,
              como uma ação, pegará e comerá um dos frutos inchados e vermelhos
              como sangue pendurados em seus galhos. Qualquer modelo comendo um
              dos frutos é automaticamente reduzido a 0 de vida, pois venenos
              poderosos o incapacitam. Um modelo do bando não-enfeitiçado pode
              impedir outro modelo de se mover em direção à árvore movendo-se em
              contato base a base com ele e segurando-o. Nenhum modelo pode
              fazer mais nada enquanto o modelo enfeitiçado tenta se mover em
              direção à árvore e o modelo restritivo tenta impedi-lo de fazer
              isso. Tanto modelos enfeitiçados quanto restritivos podem reagir
              normalmente se atacados em combate corpo a corpo e um modelo
              restritivo pode desistir de suas tentativas a qualquer momento.
              Este encontro dura o restante do jogo. Inspeção próxima da árvore
              revela os ossos de vários animais cobertos de grama e folhas
              deitados em sua base. A Árvore é um Alvo Grande. Figuras com
              Mente-Férrea e Visão Verdadeira são imunes a esse efeito.
            </MobileText>

           

            <div id="os-perdidos" ref={refs["os-perdidos"]}>
              <HeaderH3>Os Perdidos</HeaderH3>
              <MobileText className="italic">
                Muitos veem a destruição de Mordheim como um sinal de que o
                mundo está chegando ao fim. Grupos desses lunáticos são
                frequentemente atraídos para a cidade onde atacam qualquer um
                que encontrem, certos de que estão de alguma forma ajudando a
                evitar esta catástrofe.
              </MobileText>
              <MobileText>
                Posicione 3 Flagelantes armados com Manguais no centro do
                tabuleiro (use as estatísticas da Flagelante do bando Caçadores
                de Bruxas). Eles agem como criaturas não controladas
                normalmente.
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default HappeningsPage;
