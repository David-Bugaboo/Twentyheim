import { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import streetFightImg from "../../../assets/scenarios-images/street-fight.png";

function StreetFightPage() {
  const [isImageCollapsed, setIsImageCollapsed] = useState(false);

  const navigationSections = [
    { id: "intro", title: "Briga de Rua", level: 0 },
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
              <PageTitle>Briga de Rua</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Frequentemente, dois bandos se encontram cara a cara nas ruas
                estreitas de Mordheim. Às vezes eles passam um pelo outro sem
                maiores problemas, mas frequentemente o encontro termina em
                derramamento de sangue.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Ambos os bandos tentam alcançar o outro lado da rua.
              </MobileText>
            </div>

            <div id="setup" className="mt-8">
              <HeaderH2>Terreno</HeaderH2>
              <MobileText>
                Posicione todas as peças de terreno formando uma única rua, sem
                lacunas nas laterais. Atrás das peças de terreno estão ruínas
                intransponíveis, embora as próprias peças de terreno ainda sejam
                acessíveis. A única saída é pela rua. A rua pode ser tão sinuosa
                quanto você quiser e não deve ser muito estreita para lutar, mas
                pode ter gargalos estreitos em alguns pontos. Espalhe pequenos
                obstáculos, barricadas e peças de cobertura na rua em si.
                Sugerimos que o terreno seja montado dentro de uma área
                aproximada de 3' x 3' (90cm x 90cm).
              </MobileText>
            </div>

            <div id="warbands" className="mt-8">
              <HeaderH2>Bandos</HeaderH2>
              <MobileText>
                Ambos os jogadores rolam um dado para ver quem posiciona
                primeiro. Quem obtiver o maior resultado escolhe se posiciona
                primeiro ou não. Os bandos são posicionados dentro de 15cm das
                extremidades opostas da rua.
              </MobileText>
            </div>

            <div id="deployment" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>
              <MobileText>
                Ambos os jogadores rolam um D6 para ver quem posiciona primeiro.
                Quem obtiver o maior resultado escolhe se posiciona primeiro ou
                segundo em que extremidade da rua posicionará. Os bandos são
                posicionados dentro de 15cm das extremidades opostas da rua.
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
                  src={streetFightImg}
                  alt="Briga de Rua"
                  className="w-3/4 mx-auto rounded-lg"
                />
              )}
            </div>

            <div id="specialRules" className="mt-8">
              <HeaderH2>Regras Especiais</HeaderH2>
              <MobileText>
                Nenhum bando pode sair da rua pela sua própria extremidade dela.
              </MobileText>
            </div>

            <div id="victory" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                Quando um dos bandos consegue mover todas as suas figuras
                restantes para fora do tabuleiro através da extremidade oposta
                da rua em que começou, o jogo termina e esse jogador é
                vitorioso. Alternativamente, um bando que falha em um teste de
                Debandada perde o jogo.
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

export default StreetFightPage;
