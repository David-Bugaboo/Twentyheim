import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import multiplayerGamesImg from "../../../assets/scenarios-images/multiplayer-games.png";
import CollapsibleImage from "../../../components/CollapsibleImage";

function TreasureHuntPage() {
  const navigationSections = [
    { id: "intro", title: "Caça ao Tesouro", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "terrain", title: "Terreno", level: 1 },
    { id: "setup", title: "Configuração", level: 1 },
    { id: "specialRules", title: "Regras Especiais", level: 1 },
    { id: "starting", title: "Início do Jogo", level: 1 },
    { id: "victoryCondition", title: "Condição de Vitória", level: 1 },
    { id: "experience", title: "Experiência", level: 1 },
    { id: "wyrdstone", title: "Pedra-Bruxa", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Caça ao Tesouro</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Frequentemente, vários bandos ouvem o mesmo rumor sobre um
                depósito de Pedra-Bruxa e decidem explorar aquela seção da
                cidade ao mesmo tempo. Uma batalha se desenrola, com os
                vencedores levando a maior parte dos fragmentos para casa com
                eles.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Bandos de condenados lutam por pedra bruxa.
              </MobileText>
            </div>

            <div id="terrain" className="mt-8">
              <HeaderH2>Terreno</HeaderH2>
              <MobileText>
                Cada jogador, alternando, coloca uma peça de terreno — seja um
                prédio em ruínas, torre ou item similar, até que a mesa esteja
                densamente populada com terreno, cheias de becos e curvas
                sinuosas. Sugerimos que o terreno seja montado dentro de uma
                área aproximada de 4' x 3' (120cm x 90cm).
              </MobileText>
            </div>

            <div id="deployment" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>
              <MobileText className="mb-4">
                Uma vez que você tenha posicionado o terreno, coloque 2
                marcadores de Pedra-Bruxa para cada bando envolvido no jogo na
                mesa para representar onde os fragmentos estão.
              </MobileText>
              <MobileText className="mb-4">
                Cada jogador, alternando, coloca um marcador de Pedra-Bruxa. Os
                jogadores rolam um D20 + Vontade do lider do seu bando para
                determinar a ordem do posicionamento de Pedra-Bruxa.
              </MobileText>
              <MobileText className="mb-4">
                Usando a mesma ordem de posicionamento de pedra bruxa, os
                jogadores alternam posicionando suas figuras em um dos segmentos
                a sua escolha, com nenhuma figura a menos de 15cm de outra.
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
                Guerreiros podem pegar os marcadores simplesmente movendo-se
                para contato com eles. Um guerreiro não pode transferir sua
                Pedra-Bruxa para outro guerreiro. Se o guerreiro que está
                carregando um marcador é posto fora de ação, coloque o marcador
                de volta na mesa onde ele caiu.
              </MobileText>
            </div>

            <div id="victoryCondition" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                O jogo termina quando todos os bandos, exceto um, falharam em
                seu teste de Debandada ou forem eliminados. Os que debandaram ou
                foram eliminados automaticamente perdem. perdem. Se dois ou mais
                bandos aliaram, eles podem escolher compartilhar a vitória e
                terminar o jogo.
              </MobileText>
            </div>

            <div id="experience" className="mt-8">
              <HeaderH2>Experiência</HeaderH2>
              <MobileText>
                <ul>
                  <li>
                    <strong>Sobrevivência</strong>: Se um Herói ou Soldado
                    sobrevive à batalha, eles ganham +1 de Experiência.
                  </li>
                  <li>
                    <strong>Líder Vencedor</strong>: O líder do bando vencedor
                    ganha +1 de Experiência.
                  </li>
                  <li>
                    <strong>Inimigo Fora de Ação</strong>: Um Herói ganha +1 de
                    Experiência para cada inimigo que ele coloca fora de ação.
                  </li>
                  <li>
                    <strong>Por Marcador de Pedra-Bruxa</strong>: Se um Herói ou
                    Soldado está carregando um marcador de Pedra-Bruxa no final
                    da batalha, ele recebe +1 de Experiência.
                  </li>
                </ul>
              </MobileText>
            </div>

            <div id="wyrdstone" className="mt-8">
              <HeaderH2>Pedra-Bruxa</HeaderH2>
              <MobileText>
                Seu bando ganha um fragmento de Pedra-Bruxa para cada marcador
                em sua posse no final da batalha.
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default TreasureHuntPage;
