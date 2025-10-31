import { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import surpriseAttackImg from "../../../assets/scenarios-images/surprise-attack.png";

function SurpriseAttackPage() {
  const [isImageCollapsed, setIsImageCollapsed] = useState(false);

  const navigationSections = [
    { id: "intro", title: "Ataque Surpresa", level: 0 },
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
              <PageTitle>Ataque Surpresa</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Um bando está procurando saque nas ruínas de Mordheim quando é
                atacado por um bando inimigo. Os defensores estão espalhados e
                devem montar uma defesa rapidamente para expulsar seus
                atacantes.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                O Defensor tenta repelir o atacante e começa com números
                limitados.
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
                Os líderes dos bandos rolam um teste contestado de Vontade. O
                Vencedor é o defensor. O jogador defensor rola um dado para cada
                figura no seu bando, em qualquer ordem que escolher. Em um 10 ou
                menos, elas estão em outro lugar nas ruínas e aparecem mais
                tarde como reforços. Em um 11 ou mais elas são posicionadas no
                início do jogo. Note que pelo menos um Herói e 5 Soldados
                estarão presentes no início do jogo. Se todas rolarem 10 ou
                menos, o último Herói ou os últimos 5 Soldados serão
                automaticamente posicionados no início da batalha. O defensor
                posiciona seus Heróis e Soldados disponíveis na mesa. O atacante
                rola um d20 e posiciona seu bando na borda do tabuleiro cuja sua
                rolagem de dado esteja na faixa.
              </MobileText>
            </div>

            <div id="deployment" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>
              <MobileText>
                Os líderes dos bandos rolam um teste contestado de Vontade. O
                Vencedor é o defensor. O jogador defensor rola um dado para cada
                figura no seu bando, em qualquer ordem que escolher. Em um 10 ou
                menos, elas estão em outro lugar nas ruínas. Em um 11 ou mais
                elas são posicionadas no início. O defensor posiciona seus
                Heróis e Soldados disponíveis na mesa, nenhuma figura pode estar
                mais próxima que 20cm de outra figura ou de uma borda da mesa. O
                atacante posiciona todo o seu bando dentro de 20cm de uma borda
                aleatória da mesa que ele rolou.
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
                  src={surpriseAttackImg}
                  alt="Ataque Surpresa"
                  className="w-3/4 mx-auto rounded-lg"
                />
              )}
            </div>

            <div id="specialRules" className="mt-8">
              <HeaderH2>Regras Especiais</HeaderH2>
              <MobileText>
                O defensor, a partir do segundo turno de jogo, no começo de cada
                turno o defensor pode rolar um dado para cada um de seus
                Soldados ou Heróis ainda não posicionados. Em um 10+ elas são
                posicionadas na mesa em uma borda aleatória, decidida da mesma
                forma que a borda do tabuleiro do atacante. Todas as figuras de
                reforço desse turno chegam da mesma borda do tabuleiro e podem
                agir normalmente quando chegam.
              </MobileText>
            </div>

            <div id="victory" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                O jogo termina quando um bando falha em um teste de Debandada ou
                for eliminado. O bando que debandou ou foi eliminado perde.
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

export default SurpriseAttackPage;
