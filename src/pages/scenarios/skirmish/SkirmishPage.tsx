import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import CollapsibleImage from "../../../components/CollapsibleImage";
import skirmishImg from "../../../assets/scenarios-images/skirmish.png";

function SkirmishPage() {
  const navigationSections = [
    { id: "intro", title: "Escaramuça", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "setup", title: "Terreno", level: 1 },
    { id: "warbands", title: "Bandos", level: 1 },
    { id: "deployment", title: "Posicionamento", level: 1 },
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
              <PageTitle>Escaramuça</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Nas vastidões das ruínas de Mordheim, sempre existe o risco de
                se deparar com um bando rival. Embora dois grupos às vezes
                passem um pelo outro sem luta, mais frequentemente há uma
                batalha feroz entre as ruínas. Se um bando conseguir afastar
                seus rivais, terá uma área maior para procurar pedra-bruxa.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Uma briga entre bandos rivais nas ruínas de Mordheim.
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
                Cada jogador rola um dado. Quem obtiver o maior resultado
                escolhe quem posiciona as figuras primeiro. O primeiro jogador
                então escolhe qual borda da mesa usar, colocando todas as suas
                figuras dentro de 20cm dessa borda. Seu oponente então coloca
                dentro de 20cm da borda oposta.
              </MobileText>
            </div>

            <div id="deployment" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>
              <MobileText>
                O primeiro jogador escolhe qual borda do tabuleiro usar e
                posiciona todas as suas figuras dentro de 20cm dessa borda. O
                oponente então posiciona suas figuras dentro de 20cm da borda
                oposta.
              </MobileText>
            </div>

            <CollapsibleImage
              src={skirmishImg}
              alt="Escaramuça"
              imgClassName="w-3/4 mx-auto rounded-lg"
            />

            <div id="victory" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                Quando um dos bandos falha em seu teste de Debandada, o jogo
                termina. O bando que debandou perde e seus oponentes vencem.
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

            <div id="wyrdstone" className="mt-8">
              <HeaderH2>Pedra-Bruxa</HeaderH2>
              <MobileText>
                Não há ganho de pedra-bruxa nesse cenário.
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default SkirmishPage;
