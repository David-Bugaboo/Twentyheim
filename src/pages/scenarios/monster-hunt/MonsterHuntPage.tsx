import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import GenericTable from "../../../components/GenericTable";
import UnitCard from "../../../components/UnitCard";
import monstersData from "./monsters-statblocks.data.json";
import multiplayerGamesImg from "../../../assets/scenarios-images/multiplayer-games.png";
import CollapsibleImage from "../../../components/CollapsibleImage";

function MonsterHuntPage() {
  const treasureHoardData = [
    { Item: "3D20 coroas", Rolagem: "Automático" },
    { Item: "Artefato Mágico (role na tabela de artefatos)", Rolagem: "20+" },
    { Item: "D3+1 fragmentos de Pedra-Bruxa", Rolagem: "10+" },
    { Item: "Machado Gromril", Rolagem: "15+" },
    { Item: "Armadura Pesada", Rolagem: "15+" },
    { Item: "Armadura Leve", Rolagem: "10+" },
    { Item: "Armadura Leve", Rolagem: "10+" },
    { Item: "Escudo", Rolagem: "10+" },
    { Item: "Elmo", Rolagem: "10+" },
    { Item: "3 Espadas", Rolagem: "10+" },
    { Item: "3 gemas valendo 10 coroas cada", Rolagem: "12+" },
    { Item: "3 Joias valendo D20 x 2 coroas", Rolagem: "16+" },
  ];

  const monsterTypeTable = [
    { D6: "1", Resultado: "Hidra Jovem" },
    { D6: "2", Resultado: "Dragão Jovem" },
    { D6: "3", Resultado: "Wyvern Jovem" },
    { D6: "4", Resultado: "Grifo Jovem" },
    { D6: "5", Resultado: "Hipogrifo Jovem" },
    { D6: "6", Resultado: "Quimera Jovem" },
  ];

  const navigationSections = [
    { id: "intro", title: "Caça ao Monstro", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "terrain", title: "Terreno", level: 1 },
    { id: "setup", title: "Configuração", level: 1 },
    { id: "specialRules", title: "Regras Especiais", level: 1 },
    { id: "victoryCondition", title: "Condição de Vitória", level: 1 },
    { id: "experience", title: "Experiência", level: 1 },
    { id: "treasure", title: "Tesouro do Monstro", level: 1 },
    { id: "monsterTypes", title: "Criaturas em Mordheim", level: 1 },
    { id: "monsterProfiles", title: "Perfis dos Monstros", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Caça ao Monstro</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Os bandos ouviram rumores de que uma terrível criatura saiu de
                sua toca sob a cidade após a devastação recente e estabeleceu um
                novo lar nas ruínas. Você ouviu histórias sobre tais criaturas e
                o tesouro que elas acumulam é coisa de lendas. Você decidiu
                verificar por si mesmo se os rumores são verdadeiros.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Vários bandos caçam uma besta selvagem nas ruínas de Mordheim.
              </MobileText>
            </div>

            <div id="setup" className="mt-8">
              <HeaderH2>Terreno</HeaderH2>
              <MobileText>
                Cada jogador, alternando, coloca uma peça de terreno — seja um
                prédio em ruínas, torre ou item similar, até que a mesa esteja
                densamente populada com terreno, cheias de becos e curvas
                sinuosas. Sugerimos que o terreno seja montado dentro de uma
                área aproximada de 4' x 3' (120cm x 90cm). Posicione o covil do
                monstro no centro da mesa.
              </MobileText>
            </div>

            <div id="setup" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>
              <MobileText>
                Os jogadores rolam um D20 + Vontade do líder do bando. Eles
                então escolhem um segmento e alternam posicionando figuras na
                ordem determinada pelo resultado das suas rolagens.
              </MobileText>
            </div>

            <CollapsibleImage
              src={multiplayerGamesImg}
              alt="Jogos Multijogador"
              imgClassName="w-3/4 mx-auto rounded-lg"
            />

            <div id="specialRules" className="mt-8">
              <HeaderH2>Regras Especiais</HeaderH2>
              <MobileText>
                O covil do monstro está localizado no prédio central e é onde a
                besta estará. Uma vida inteira vivendo em cavernas sob a cidade
                manteve a criatura de aprender a usar suas asas. Portanto, ao
                contrário da maioria dos monstros, esta besta não pode voar.
              </MobileText>
              <MobileText className="mt-4">
                O monstro não deixará seu covil por nenhuma razão, embora use
                sua baforada contra qualquer modelo no alcance que possa ver e,
                é claro, atacará qualquer modelo que entrar em seu covil. Ele
                age como uma criatura neutra, mas age no começo de cada turno ao
                invés de no final.
              </MobileText>
            </div>

            <div id="victoryCondition" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                Quando um bando (ou mais de um, se os jogadores concordaram em
                compartilhar o tesouro do monstro) é o único a ter qualquer
                modelo dentro de 15cm do covil do monstro, e o monstro foi posto
                fora de ação, esse bando é vitorioso e ganha o tesouro do
                monstro. Se dois ou mais jogadores decidiram compartilhar o
                tesouro, eles devem decidir como dividi-lo. Se não conseguirem
                determinar isso pacificamente, seus bandos terão que decidir não
                através de uma partida!
              </MobileText>
            </div>

            <div id="experience" className="mt-8">
              <HeaderH2>Experiência</HeaderH2>
              <MobileText>
                <ul>
                  <li>
                    <strong>Don Quixote de Tilea</strong>: +1 Por ferir o
                    monstro.
                  </li>
                  <li>
                    <strong>Caçador de Monstros</strong>: +2 Por reduzir o
                    monstro a 0 de vida.
                  </li>
                  <li>
                    <strong>Sobrevivência</strong>: Se um Herói ou grupo de
                    Seguidores sobrevive à batalha, eles ganham +1 de
                    Experiência.
                  </li>
                  <li>
                    <strong>Líder Vencedor</strong>: O líder do bando vencedor
                    ganha +1 de Experiência.
                  </li>
                  <li>
                    <strong>Inimigo Fora de Ação</strong>: Um Herói ganha +1 de
                    Experiência para cada inimigo que ele coloca fora de ação.
                  </li>
                </ul>
              </MobileText>
            </div>

            <div id="treasure" className="mt-8">
              <HeaderH2>Tesouro do Monstro</HeaderH2>
              <MobileText className="mb-4">
                O jovem monstro moveu seu tesouro com ele para seu novo covil.
                Por causa de sua idade, o jovem monstro não coletou tanto
                tesouro quanto uma criatura mais velha de seu tipo. Ainda assim,
                ele acumulou uma quantidade respeitável. Qualquer bando que
                tenha controle do covil do monstro no final do jogo pode
                procurá-lo para ver o que contém. Note que você rola para cada
                item separadamente, exceto pelas coroas de ouro, que são sempre
                encontradas. Se rolar um resultado maior que o indicado na
                tabela, você ganha o item. Se mais de um jogador ganhar, eles
                devem decidir quem rolará em cada item, e dividem as coroas.
              </MobileText>
              <GenericTable data={treasureHoardData} scrollable={false} />
            </div>

            <div id="monsterTypes" className="mt-8">
              <HeaderH2>Criaturas em Mordheim</HeaderH2>
              <MobileText className="mb-4">
                Monstros em Mordheim são um pouco menores que suas contrapartes
                de Warhammer – eles representam criaturas que ficaram escondidas
                nas cavernas sob a cidade, são ex-habitantes do mundialmente
                famoso Zoológico Imperial de Mordheim, ou são membros jovens de
                sua espécie que recentemente foram forçados para fora do ninho e
                decidiram estabelecer um novo covil na cidade arruinada. Ainda
                assim, todos os monstros tem a característica Monstro.
              </MobileText>
              <GenericTable data={monsterTypeTable} scrollable={false} />
            </div>

            <div id="monsterProfiles" className="mt-8">
              <HeaderH2>Perfis dos Monstros</HeaderH2>

              <div className="mt-6 space-y-6">
                {monstersData.map((monster) => (
                  <UnitCard
                    key={monster.id}
                    id={monster.id}
                    name={monster.name}
                    role={monster.role}
                    quantity={monster.quantity}
                    stats={monster.stats}
                    abilities={monster.abilities}
                  />
                ))}
              </div>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default MonsterHuntPage;
