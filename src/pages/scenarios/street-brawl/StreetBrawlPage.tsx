import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import multiplayerGamesImg from "../../../assets/scenarios-images/multiplayer-games.png";
import CollapsibleImage from "../../../components/CollapsibleImage";

function StreetBrawlPage() {
  const navigationSections = [
    { id: "intro", title: "Briga de Rua", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "terrain", title: "Terreno", level: 1 },
    { id: "deployment", title: "Posicionamento", level: 1 },
    { id: "starting", title: "Início do Jogo", level: 1 },
    { id: "victoryCondition", title: "Condição de Vitória", level: 1 },
    { id: "experience", title: "Experiência", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Briga de Rua</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Guerras de território são um acontecimento comum nas ruínas de
                Mordheim. Quando vários bandos competem pela mesma área, uma
                briga caótica de tudo ou nada pode se desenrolar, onde alianças
                são rapidamente feitas e quebradas e corpos sangrando inundam a
                rua. Quaisquer bandos que vençam o dia terão uma área maior para
                procurar a preciosa Pedra-Bruxa.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Bandos disputam a posse de uma região valiosa da cidade.
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
              <MobileText>
                Os jogadores rolam um D20 + Vontade do líder do bando. Eles
                então alternam escolhendo um segmento e posicionando suas
                figuras em uma ordem determinada por essa rolagem.
              </MobileText>
            </div>

            <CollapsibleImage
              src={multiplayerGamesImg}
              alt="Jogos Multijogador"
              imgClassName="w-3/4 mx-auto rounded-lg"
            />

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
                <strong>Sobrevivência:</strong> +1XP para cada figura que
                sobreviveu a partida.
                <br />
                <br />
                <strong>Líder Vencedor:</strong> O líder do bando vencedor ganha
                +1 XP.
                <br />
                <br />
                <strong>Por Inimigo Eliminado:</strong> Qualquer Herói ganha +1
                de XP para cada inimigo que ele reduz a 0 de vida.
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default StreetBrawlPage;
