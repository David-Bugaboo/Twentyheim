import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import CollapsibleImage from "../../../components/CollapsibleImage";
import wyrdstoneHuntImg from "../../../assets/scenarios-images/wyrdstone-hunt.png";

function WyrdstoneHuntPage() {
  const navigationSections = [
    { id: "intro", title: "Caça à Pedra-Bruxa", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "setup", title: "Terreno", level: 1 },
    { id: "warbands", title: "Bandos", level: 1 },
    { id: "deployment", title: "Posicionamento", level: 1 },
    { id: "specialRules", title: "Regras Especiais", level: 1 },
    { id: "victory", title: "Condição de Vitória", level: 1 },
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
              <PageTitle>Caça à Pedra-Bruxa</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Vários fragmentos de Pedra-Bruxa foram encontrados espalhados
                pelas ruínas. Ambos os bandos competem para coletar o máximo
                possível antes que seus rivais os alcancem.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Coletar os fragmentos de Pedra-Bruxa espalhados pelas ruínas.
              </MobileText>
            </div>

            <div id="setup" className="mt-8">
              <HeaderH2>Terreno</HeaderH2>
              <MobileText>
                Cada jogador, alternando, coloca uma peça de terreno — seja um
                prédio em ruínas, torre ou item similar, até que a mesa esteja
                densamente populada com terreno, cheias de becos e curvas
                sinuosas. Sugerimos que o terreno seja montado dentro de uma
                área aproximada de 3' x 3' (90cm x 90cm).
              </MobileText>
            </div>

            <div id="warbands" className="mt-8">
              <HeaderH2>Bandos</HeaderH2>
              <MobileText>
                Depois de posicionar o terreno, cada jogador, alternando,
                posiciona um marcador de Pedra-Bruxa no tabuleiro, até 4
                marcadores terem sido posicionados. Role um dado para ver qual
                jogador coloca primeiro. Os marcadores devem ser posicionados a
                mais de 25cm da borda da mesa e pelo menos 15cm afastados uns
                dos outros.
              </MobileText>
            </div>

            <div id="deployment" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>
              <MobileText>
                Ambos os jogadores rolam um D6 para ver quem posiciona primeiro.
                Quem obtiver o maior resultado posiciona primeiro, dentro de
                20cm da borda da mesa de sua escolha. Seu oponente então
                posiciona dentro de 20cm da borda oposta.
              </MobileText>
            </div>

            <CollapsibleImage
              src={wyrdstoneHuntImg}
              alt="Caça à Pedra-Bruxa"
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

            <div id="victory" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                O jogo termina quando um bando falha em seu teste de Debandada
                ou é totalmente eliminado. O bando que debandou ou falhou
                automaticamente perde.
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
                <br />
                <br />
                <strong>Por Marcador de Pedra-Bruxa:</strong> Se um Herói ou
                Soldado está segurando um fragmento de Pedra-Bruxa no fim do
                jogo +1 XP.
              </MobileText>
            </div>

            <div id="wyrdstone" className="mt-8">
              <HeaderH2>Pedra-Bruxa</HeaderH2>
              <MobileText>
                Seus guerreiros ganham um fragmento de Pedra-Bruxa para cada
                figura carregando pedra-bruxa no final do jogo.
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default WyrdstoneHuntPage;
