import { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import defendTheFindImg from "../../../assets/scenarios-images/defend-the-find.png";

function DefendTheFindPage() {
  const [isImageCollapsed, setIsImageCollapsed] = useState(false);

  const navigationSections = [
    { id: "intro", title: "Defender o Tesouro", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "setup", title: "Terreno", level: 1 },
    { id: "attacker-and-defender", title: "Atacante e Defensor", level: 1 },
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
              <PageTitle>Defender o Tesouro</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Muitas vezes, um bando encontra um lugar com um monte de
                pedra-bruxa ou outro tesouro lá dentro — só pra ser desafiada
                por outro bando de desesperados. Isso quase sempre acaba em uma
                briga sangrenta, já que é bem improvável que qualquer um dos
                lados vá querer abrir mão da riqueza sem abrir alguns crânios
                antes.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Você precisa proteger fragmentos de Pedra-Bruxa da invasão
                inimiga.
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

            <div id="attacker-and-defender" className="mt-8">
              <HeaderH2>Atacante e Defensor</HeaderH2>
              <MobileText>
                O bando com menos figuras é automaticamente o defensor. Se os
                dois lados tem o mesmo número de figuras, os Líderes dos bandos
                fazem um teste contestado de Vontade. O Vencedor é o defensor.
              </MobileText>
            </div>

            <div id="deployment" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>
              <MobileText>
                O Bando defensor deve posicionar suas figuras dentro ou a até
                15cm da peça de terreno central. O Bando atacante deve
                posicionar suas figuras a até 15cm de qualquer borda do
                tabuleiro. O Bando atacante pode dividir seu bando entre várias
                das bordas do tabuleiro.
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
                  src={defendTheFindImg}
                  alt="Defender o Tesouro"
                  className="w-3/4 mx-auto rounded-lg"
                />
              )}
            </div>

            <div id="victory" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                Se no final de um turno, o atacante tem mais figuras dentro ou a
                até 15cm da peça de terreno central que o defensor, o jogo acaba
                com os atacantes vencendo. Alternativamente o jogo também acaba
                se um dos bandos for totalmente eliminado ou debandar, com o
                outro bando vencendo.
              </MobileText>
            </div>

            <div id="experience" className="mt-8">
              <HeaderH2>Experiência</HeaderH2>
              <MobileText>
                Sobrevivência: +1XP para cada figura que sobreviveu a partida.
                Vitória: +1 de XP para o líder do bando vencedor. Massacre:
                Heróis ganham +1 de XP para cada inimigo que reduzem a 0 de
                vida.
              </MobileText>
            </div>

            <div id="wyrdstone" className="mt-8">
              <HeaderH2>Pedra-Bruxa</HeaderH2>
              <MobileText>
                Um fragmento de pedra-bruxa para cada Herói ou Líder dentro ou a
                até 15cm da peça de terreno central.
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default DefendTheFindPage;
