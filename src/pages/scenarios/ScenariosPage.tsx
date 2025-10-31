import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import scenariosData from "./data/scenarios.data.json";

interface Scenario {
  id: string;
  name: string;
  type: string;
  summary?: string;
}

function ScenariosPage() {
  const navigate = useNavigate();

  const scenarios1v1 = scenariosData.filter((s: Scenario) => s.type === "1v1");
  const scenariosMultiplayer = scenariosData.filter(
    (s: Scenario) => s.type === "Multiplayer"
  );

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Cenários</PageTitle>

            <MobileText className="mt-6">
              Os cenários são missões especiais que podem ser jogadas durante um
              jogo singular ou uma campanha de Mordheim. Cada cenário oferece
              regras únicas, condições de vitória específicas. Os jogadores
              envolvidos em uma partida rolam um dado antes de cada partida. O
              jogador com maior resultado decide qual cenário será jogado. Os
              cenários definem como posicionar os terrenos, figuras e outros
              detalhes importantes para o bom andamento da partida.
            </MobileText>

            <MobileText className="mt-4">
              Escolha um cenário abaixo para ver as regras completas e detalhes
              sobre como jogá-lo.
            </MobileText>

            <HeaderH2 className="mt-8 mb-2">Cenários 1v1</HeaderH2>
            <MobileText className="mb-4 text-sm text-gray-400">
              Cenários projetados para partidas entre dois bandos. Esses
              cenários focam em confrontos diretos e objetivos claros entre
              adversários, ideal para partidas rápidas e intensas.
            </MobileText>

            <div className="space-y-2 mb-8">
              {scenarios1v1.map((scenario: Scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => navigate(`/scenarios/${scenario.id}`)}
                  className="w-full text-left bg-green-900/20 border border-green-500/40 rounded-lg p-4 hover:bg-green-800/30 hover:border-green-400/60 transition-colors duration-200"
                >
                  <div className="font-bold text-green-300 mb-1">
                    {scenario.name}
                  </div>
                  {scenario.summary && (
                    <div className="text-sm text-gray-300 italic">
                      {scenario.summary}
                    </div>
                  )}
                </button>
              ))}
            </div>

            <HeaderH2 className="mt-8 mb-2">Cenários Multiplayer</HeaderH2>
            <MobileText className="mb-4 text-sm text-gray-400">
              Cenários projetados para três ou mais bandos. Esses cenários são
              mais caóticos e estratégicos, permitindo alianças temporárias,
              traições e objetivos que podem ser compartilhados ou disputados
              entre múltiplos jogadores.
            </MobileText>

            <div className="space-y-2 mb-8">
              {scenariosMultiplayer.map((scenario: Scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => navigate(`/scenarios/${scenario.id}`)}
                  className="w-full text-left bg-green-900/20 border border-green-500/40 rounded-lg p-4 hover:bg-green-800/30 hover:border-green-400/60 transition-colors duration-200"
                >
                  <div className="font-bold text-green-300 mb-1">
                    {scenario.name}
                  </div>
                  {scenario.summary && (
                    <div className="text-sm text-gray-300 italic">
                      {scenario.summary}
                    </div>
                  )}
                </button>
              ))}
            </div>

            <MobileText className="mt-8 italic text-sm">
              * Os cenários podem ser jogados como partidas independentes ou
              como parte de sua campanha. Certifique-se de ajustar as regras de
              experiência e pedra-bruxa de acordo com o cenário escolhido.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default ScenariosPage;
