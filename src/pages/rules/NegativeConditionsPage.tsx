import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import gameTermsData from "./data/game-terms.json";

function NegativeConditionsPage() {
  const navigationSections = [
    { id: "intro", title: "Condições Negativas", level: 0 },
    { id: "tipos-dano", title: "Tipos de Dano", level: 0 },
    { id: "danos-criticos", title: "Danos Críticos", level: 0 },
    { id: "marcadores", title: "Marcadores de Condição", level: 0 },
    { id: "caracteristicas", title: "Características Especiais", level: 0 },
  ];

  // Filtrar marcadores de condição negativa
  const negativeMarkers = gameTermsData
    .filter((term) => term.term.includes("Marcador de"))
    .filter(
      (term) =>
        term.term.includes("Veneno") ||
        term.term.includes("Ferida") ||
        term.term.includes("Congelamento") ||
        term.term.includes("Chamas") ||
        term.term.includes("Atordoamento") ||
        term.term.includes("Sangramento")
    );

  // Filtrar características que podem ser consideradas negativas

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Dano e Condições Negativas</PageTitle>
              <MobileText>
                Em 20heim, as figuras podem ser afetadas por diversas condições
                negativas que impactam sua capacidade de combate, movimento e
                sobrevivência. Essas condições podem ser causadas por ataques
                especiais, magias, venenos, ferimentos ou outros efeitos do
                ambiente corrompido da cidade amaldiçoada.
              </MobileText>

              <MobileText>
                As condições negativas são representadas principalmente por
                marcadores que são colocados nas figuras, cada um com seus
                próprios efeitos e métodos de remoção. Conhecer essas condições
                é essencial para entender como o combate e a sobrevivência
                funcionam em 20heim.
              </MobileText>
            </div>

            <div id="tipos-dano">
              <HeaderH1>Tipos de Dano</HeaderH1>
              <MobileText>
                Em 20heim, existem diferentes tipos de dano que podem ser
                causados por armas, magias e outros efeitos. Cada tipo tem suas
                próprias propriedades e interage de forma única com diferentes
                tipos de criaturas e resistências.
              </MobileText>

              <div className="mb-6">
                <HeaderH2 className="text-green-300 mb-2">Normal</HeaderH2>
                <MobileText>
                  O tipo de dano mais comum, sem propriedades especiais. Algumas
                  criaturas podem ter resistência ou imunidade a este tipo de
                  dano.
                </MobileText>
              </div>

              <div className="mb-6">
                <HeaderH2 className="text-green-300 mb-2">Mágico</HeaderH2>
                <MobileText>
                  Semelhante ao dano normal, mas com menos criaturas
                  resistentes. Criaturas com resistência mágica podem reduzir ou
                  ignorar este tipo de dano.
                </MobileText>
              </div>

              <div className="mb-6">
                <HeaderH2 className="text-green-300 mb-2">Sagrado</HeaderH2>
                <MobileText>
                  Semelhante ao dano mágico, mas pode danificar até criaturas
                  que têm resistência mágica ou imunidade a dano mágico. Muito
                  eficaz contra criaturas sobrenaturais e corrompidas.
                </MobileText>
              </div>

              <div className="mb-6">
                <HeaderH2 className="text-green-300 mb-2">Venenoso</HeaderH2>
                <MobileText>
                  Criaturas que recebem este tipo de dano recebem
                  automaticamente um marcador de veneno, independentemente do
                  dano causado.
                </MobileText>
              </div>

              <div className="mb-6">
                <HeaderH2 className="text-green-300 mb-2">Flamejante</HeaderH2>
                <MobileText>
                  Como o dano normal, mas com menos criaturas resistentes e
                  algumas vulneráveis. Um ataque crítico com este tipo de dano
                  faz a figura alvo receber um marcador de chamas.
                </MobileText>
              </div>

              <div className="mb-6">
                <HeaderH2 className="text-green-300 mb-2">Elétrico</HeaderH2>
                <MobileText>
                  Como o dano normal, mas com menos criaturas resistentes e
                  algumas vulneráveis. Um ataque crítico com este tipo de dano
                  ignora quaisquer bônus de armadura.
                </MobileText>
              </div>

              <div className="mb-6">
                <HeaderH2 className="text-green-300 mb-2">Gélido</HeaderH2>
                <MobileText>
                  Como o dano normal, mas com menos criaturas resistentes e
                  algumas vulneráveis. Um ataque crítico com este tipo de dano
                  faz a figura alvo receber um marcador de congelamento.
                </MobileText>
              </div>
            </div>

            <div id="danos-criticos">
              <HeaderH1>Danos Críticos</HeaderH1>
              <MobileText>
                Os danos críticos são um elemento fundamental do sistema de
                combate em Mordheim, representando golpes excepcionalmente
                precisos ou devastadores que podem mudar o curso de uma batalha.
              </MobileText>

              <MobileText>
                <strong>Ataques Críticos:</strong> Qualquer ataque causa +5 de
                dano quando o atacante rola um 20 natural (antes de
                modificadores). Um ataque crítico só pode ser defendido por
                outra rolagem crítica (20 natural na defesa), incluindo se o
                ataque crítico foi causado por habilidades especiais.
              </MobileText>

              <MobileText>
                <strong>Defesa Crítica:</strong> Quando o defensor rola um 20
                natural na rolagem de defesa, ele automaticamente bloqueia
                qualquer ataque, mesmo ataques críticos. Isso significa que
                apenas críticos podem defender contra críticos.
              </MobileText>
            </div>

            <div id="marcadores">
              <HeaderH1>Marcadores de Condição</HeaderH1>
              {negativeMarkers.map((term, index) => (
                <div key={index} id={`marker-${index}`} className="mb-6">
                  <HeaderH2 className="text-green-300 mb-2">
                    {term.term}
                  </HeaderH2>
                  <MobileText>{term.description}</MobileText>
                </div>
              ))}
            </div>

            <MobileText>
              <strong>Dica Importante:</strong> Lembre-se de que algumas figuras
              podem ser imunes a certas condições negativas devido às suas
              características especiais. Por exemplo, figuras com a
              característica "Morto-Vivo" são imunes a veneno, e figuras com
              "Mente-Férrea" são imunes a efeitos psicológicos.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default NegativeConditionsPage;
