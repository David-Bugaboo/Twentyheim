import { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import hiddenTreasureImg from "../../../assets/scenarios-images/hidden-treasure.png";

function HiddenTreasurePage() {
  const [isImageCollapsed, setIsImageCollapsed] = useState(false);

  const navigationSections = [
    { id: "intro", title: "Tesouro Escondido", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "setup", title: "Terreno", level: 1 },
    { id: "deployment", title: "Posicionamento", level: 1 },
    { id: "specialRules", title: "Regras Especiais", level: 1 },
    { id: "victory", title: "Condição de Vitória", level: 1 },
    { id: "experience", title: "Experiência", level: 1 },
    { id: "wyrdstone", title: "Pedra-Bruxa", level: 1 },
    { id: "treasure", title: "Tabela de Tesouro", level: 1 },
  ];

  const treasureTable = [
    { item: "1d20+5 coroas", roll: "Automático" },
    { item: "3 fragmentos de pedra-bruxa", roll: "16+" },
    { item: "Armadura Leve", roll: "10+" },
    { item: "Espada", roll: "8+" },
    { item: "3 gemas valendo 10 coroas cada", roll: "14+" },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Tesouro Escondido</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Há um rumor de que uma das peças de terreno arruinadas tem um
                porão oculto com um baú de tesouro escondido nele. Dois bandos
                rivais ouviram falar do porão e agora estão procurando na área.
                Quem sabe o que eles encontrarão?
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Procurar as peças de terreno por um tesouro escondido.
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
                Ambos os jogadores rolam um D6 e quem obtiver o maior resultado
                escolhe qual bando posiciona primeiro. Este bando é posicionado
                dentro de 20cm de qualquer borda da mesa que o jogador escolher.
                Seu oponente então posiciona dentro de 20cm do lado oposto.
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
                  src={hiddenTreasureImg}
                  alt="Tesouro Escondido"
                  className="w-3/4 mx-auto rounded-lg"
                />
              )}
            </div>

            <div id="specialRules" className="mt-8">
              <HeaderH2>Regras Especiais</HeaderH2>
              <MobileText>
                Todos os guerreiros (não animais!) em cada bando sabem
                aproximadamente o que estão procurando e devem inspecionar as
                peças de terreno para encontrar o tesouro. Cada vez que uma
                figura está adjacente a uma peça de terreno grande que não foi
                previamente revistada por nenhum dos lados, ela pode gastar uma
                ação para revistar aquela peça de terreno rolando um dado. Em
                uma rolagem de 20, ela encontrou o tesouro. Peças de terreno nas
                zonas de posicionamento não podem ser revistadas (já que já
                foram completamente saqueadas) e cada peça de terreno só pode
                ser revistada uma vez. Se nenhum dos bandos conseguiu 20 em
                nenhuma rolagem quando resta apenas uma peça de terreno a ser
                revistada, o tesouro será automaticamente encontrado lá. Depois
                de encontrar o baú de tesouro, o guerreiro deve então levá-lo
                para segurança, saindo do tabuleiro pela borda da mesa em que o
                seu controlador posicionou suas figuras. Carregar o baú de
                tesouro segue as regras de carregar itens pesados.
              </MobileText>
            </div>

            <div id="victory" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                Quando um bando consegue capturar o tesouro, ou um bando falha
                em um teste de Debandada ou é completamente eliminado, o jogo
                termina. Nesse caso específico o bando vitorioso então ganha o
                baú de tesouro.
              </MobileText>
            </div>

            <div id="experience" className="mt-8">
              <HeaderH2>Experiência</HeaderH2>
              <MobileText>
                Sobrevivência: +1XP para cada figura que sobreviveu a partida.
                Líder Vencedor: O líder do bando vencedor ganha +1 XP. Por
                Inimigo Eliminado: Qualquer Herói ganha +1 de XP para cada
                inimigo que ele reduz a 0 de vida. Por Encontrar o Baú: Se um
                Herói ou Soldado encontrar o baú de tesouro ele ganha +2 XP.
              </MobileText>
            </div>

            <div id="wyrdstone" className="mt-8">
              <HeaderH2>Pedra-Bruxa</HeaderH2>
              <MobileText>
                Se conseguiu capturar o tesouro, no fim do jogo, faça uma
                rolagem para cada item na tabela de tesouro. Se fizer a rolagem
                indicada ou maior, ganha aquele item.
              </MobileText>
            </div>

            <div id="treasure" className="mt-8">
              <HeaderH2>Tabela de Tesouro</HeaderH2>
              <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 mt-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-green-500/40">
                      <th className="text-left text-green-300 py-2 pr-4">
                        Item
                      </th>
                      <th className="text-left text-green-300 py-2">Rolagem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {treasureTable.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-green-500/20 last:border-0"
                      >
                        <td className="text-white py-2 pr-4">{item.item}</td>
                        <td className="text-green-400 py-2">{item.roll}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default HiddenTreasurePage;
