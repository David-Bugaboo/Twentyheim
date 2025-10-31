import { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import breakthroughImg from "../../../assets/scenarios-images/breakthrough.png";

function BreakthroughPage() {
  const [isImageCollapsed, setIsImageCollapsed] = useState(false);

  const navigationSections = [
    { id: "intro", title: "Romper Linhas", level: 0 },
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
              <PageTitle>Romper Linhas</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Quando rumores de um grande depósito de Pedra-Bruxa começam a
                circular, bandos montam expedições para desenterrar a riqueza.
                No entanto, seus rivais frequentemente tentam sabotá-los,
                ansiosos para reivindicar toda a Pedra-Bruxa para si mesmos.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                O atacante precisa alcançar o outro lado do tabuleiro.
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
                O jogador com o bando de menor qualidade pode escolher ser o
                atacante ou defensor.
              </MobileText>
            </div>

            <div id="deployment" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>
              <MobileText>
                Cada jogador rola um dado. Quem obtiver o maior resultado decide
                em qual borda da mesa o atacante posiciona. O atacante posiciona
                primeiro, dentro de 20cm de sua borda da mesa. O defensor então
                posiciona em qualquer lugar da mesa, contanto que todas as suas
                figuras estejam a pelo menos 35cm de distância de qualquer
                atacante, mas devem escolher um lado da mesa de qualquer forma.
              </MobileText>
            </div>

            <div className="mt-8 mb-6">
              <button
                onClick={() => setIsImageCollapsed(!isImageCollapsed)}
                className="w-full text-left mb-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <span className="text-sm font-medium">
                  {isImageCollapsed ? "▶ Mostrar Imagem" : "▼ Ocultar Imagem"}
                </span>
              </button>
              {!isImageCollapsed && (
                <img
                  src={breakthroughImg}
                  alt="Romper Linhas"
                  className="w-3/4 mx-auto rounded-lg"
                />
              )}
            </div>

            <div id="victory" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                Se um dos bandos falhar em um teste de Debandada, o jogo termina
                imediatamente e o bando que debandou perde. Se o atacante
                conseguir mover duas ou mais figuras para dentro de 5cm da borda
                da mesa do defensor, elas romperam as linhas e vencem o jogo.
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
                <strong>Rompendo Linhas:</strong> Qualquer figura ganha +1 XP
                por romper as linhas inimigas.
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

export default BreakthroughPage;
