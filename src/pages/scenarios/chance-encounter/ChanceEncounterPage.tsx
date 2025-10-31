import { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import chanceEncounterImg from "../../../assets/scenarios-images/chance-encounter.png";

function ChanceEncounterPage() {
  const [isImageCollapsed, setIsImageCollapsed] = useState(false);

  const navigationSections = [
    { id: "intro", title: "Encontro Casual", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "setup", title: "Terreno", level: 1 },
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
              <PageTitle>Encontro Casual</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Ambos os bandos completaram sua busca diária pelas ruínas e
                estão a caminho de seu acampamento quando se encontram. Nenhum
                dos lados esperava uma luta, e o bando que reage mais
                rapidamente tem a vantagem.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Dois bandos tentam roubar a Pedra-Bruxa um do outro.
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
                pode escolher posicionar primeiro ou segundo. O primeiro jogador
                a posicionar configura todo o seu bando na zona de
                posicionamento A. Ele pode escolher qual quadrante da mesa será
                designado como zona de posicionamento A. O segundo bando pode
                então ser posicionado na zona de posicionamento B, mas nenhuma
                figura pode ser posicionada a 35cm de distância de qualquer
                figura inimiga.
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
                  src={chanceEncounterImg}
                  alt="Encontro Casual"
                  className="w-3/4 mx-auto rounded-lg"
                />
              )}
            </div>

            <div id="specialRules" className="mt-8">
              <HeaderH2>Regras Especiais</HeaderH2>
              <MobileText>
                Cada bando carrega 3 fragmentos de Pedra-Bruxa no início da
                batalha. Anote o número que cada bando possui. Ambos os bandos
                ganham toda a Pedra-Bruxa que estavam carregando no início da
                batalha, menos o número de seus próprios Heróis que foram
                reduzidos a 0 de vida durante o jogo, até um mínimo de zero.
                Além disso, eles ganham um fragmento extra de Pedra-Bruxa para
                cada Herói inimigo que reduzirem a 0 de vida, até o número
                máximo de fragmentos que o bando oponente estava carregando no
                início da batalha.
              </MobileText>
            </div>

            <div id="victory" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                A batalha termina quando um bando falha em um teste de
                Debandada. O bando que debandou perde.
              </MobileText>
            </div>

            <div id="experience" className="mt-8">
              <HeaderH2>Experiência</HeaderH2>
              <MobileText>
                Sobrevivência: +1XP para cada figura que sobreviveu a partida.
                Líder Vencedor: O líder do bando vencedor ganha +1 XP. Por
                Inimigo Eliminado: Qualquer Herói ganha +1 de XP para cada
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

export default ChanceEncounterPage;
