import { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import occupyImg from "../../../assets/scenarios-images/occupy.png";

function OccupyPage() {
  const [isImageCollapsed, setIsImageCollapsed] = useState(false);

  const navigationSections = [
    { id: "intro", title: "Ocupar", level: 0 },
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
              <PageTitle>Ocupar</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Este cenário acontece em uma parte de Mordheim onde as peças de
                terreno estão lotadas com fragmentos de Pedra-Bruxa e outras
                riquezas. Tomar e conseguir fortificar essas peças de terreno
                significa que seu bando ganha uma boa grana. Infelizmente, os
                outros bandos têm a mesma ideia.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Ambos os bandos tentam capturar o maior número de peças de
                terreno possível.
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

            <div id="deployment" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>
              <MobileText>
                Cada jogador rola um D6. O jogador com a pontuação mais alta
                decide qual bando posiciona primeiro. O primeiro jogador escolhe
                a borda da mesa em que quer posicionar e coloca todas as suas
                figuras dentro de 20cm dela. Seu oponente então posiciona dentro
                de 20cm da borda oposta.
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
                  src={occupyImg}
                  alt="Ocupar"
                  className="w-3/4 mx-auto rounded-lg"
                />
              )}
            </div>

            <div id="specialRules" className="mt-8">
              <HeaderH2>Regras Especiais</HeaderH2>
              <MobileText>
                O objetivo é capturar 5 das peças de terreno na mesa. Marque
                essas peças de terreno, começando com o terreno no centro da
                mesa. E as 4 maiores peças de terreno mais próximas dela. Uma
                peça de terreno é ocupada se pelo menos uma de suas figuras está
                dentro ou adjacente a peça e nenhuma figura inimiga está dentro
                ou adjacente àquela peça de terreno.
              </MobileText>
            </div>

            <div id="victory" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                Nesse jogo testes de Debandada não são feitos — pois o jogo dura
                no máximo oito turnos. Se um bando debandar voluntariamente, ou
                for completamente eliminado o jogo termina e o bando vencedor
                ocupa todas as peças de terreno da mesa.
              </MobileText>
            </div>

            <div id="experience" className="mt-8">
              <HeaderH2>Experiência</HeaderH2>
              <MobileText>
                <strong>Sobrevivência:</strong> +1XP para cada figura que sobreviveu a partida.
                <br />
                <br />
                <strong>Líder Vencedor:</strong> O líder do bando que controla o maior número de
                peças de terreno no final da batalha ganha +1 XP. Se ambos os
                lados ocupam o mesmo número de peças de terreno, então a batalha
                é considerada um empate e nenhum líder ganha este bônus.
                <br />
                <br />
                <strong>Por Inimigo Eliminado:</strong> Qualquer Herói ganha +1 de XP para cada
                inimigo que ele reduz a 0 de vida.
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

export default OccupyPage;
