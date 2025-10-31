import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import QuickNavigation from "../../components/QuickNavigation";
import HeaderH2 from "../../components/HeaderH2";
import scenariosData from "./data/scenarios.data.json";

// Imports estáticos das imagens dos cenários
import defendTheFindImg from "../../assets/scenarios-images/defend-the-find.png";
import skirmishImg from "../../assets/scenarios-images/skirmish.png";
import wyrdstoneHuntImg from "../../assets/scenarios-images/wyrdstone-hunt.png";
import breakthroughImg from "../../assets/scenarios-images/breakthrough.png";
import streetFightImg from "../../assets/scenarios-images/street-fight.png";
import chanceEncounterImg from "../../assets/scenarios-images/chance-encounter.png";
import hiddenTreasureImg from "../../assets/scenarios-images/hidden-treasure.png";
import occupyImg from "../../assets/scenarios-images/occupy.png";
import surpriseAttackImg from "../../assets/scenarios-images/surprise-attack.png";

const scenarioImages: Record<string, string> = {
  "defend-the-find": defendTheFindImg,
  skirmish: skirmishImg,
  "wyrdstone-hunt": wyrdstoneHuntImg,
  breakthrough: breakthroughImg,
  "street-fight": streetFightImg,
  "chance-encounter": chanceEncounterImg,
  "hidden-treasure": hiddenTreasureImg,
  occupy: occupyImg,
  "surprise-attack": surpriseAttackImg,
};

interface Scenario {
  id: string;
  name: string;
  type: string;
  summary?: string;
  flavor?: string;
  description?: string;
  setup?: string;
  warbands?: string;
  deployment?: string;
  specialRules?: string;
  victoryCondition?: string;
  experience?: string;
  wyrdstone?: string;
  treasureTable?: Array<{ item: string; roll: string }>;
}

function GenericScenarioPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scenarioImage, setScenarioImage] = useState<string | null>(null);
  const [isImageCollapsed, setIsImageCollapsed] = useState(false);

  useEffect(() => {
    if (!slug) {
      setError("Slug não fornecido");
      setLoading(false);
      return;
    }

    const foundScenario = scenariosData.find((s) => s.id === slug);

    if (!foundScenario) {
      setError(`Cenário "${slug}" não encontrado`);
      setLoading(false);
      return;
    }

    setScenario(foundScenario);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    if (scenario?.id) {
      const image = scenarioImages[scenario.id];
      setScenarioImage(image || null);
    }
  }, [scenario]);

  if (loading) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Carregando...</PageTitle>
              <MobileText>
                Por favor, aguarde enquanto carregamos o cenário.
              </MobileText>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  if (error || !scenario) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Erro</PageTitle>
              <MobileText>{error || "Cenário não encontrado"}</MobileText>
              <button
                onClick={() => navigate("/campaign")}
                className="mt-4 px-4 py-2 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white rounded-lg transition-colors duration-200"
              >
                Voltar para Campanha
              </button>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  const navigationSections = [
    { id: "intro", title: scenario.name, level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "setup", title: "Terreno", level: 1 },
    { id: "warbands", title: "Bandos", level: 1 },
    { id: "deployment", title: "Posicionamento", level: 1 },
    ...(scenario.specialRules
      ? [{ id: "specialRules", title: "Regras Especiais", level: 1 }]
      : []),
    { id: "victory", title: "Condição de Vitória", level: 1 },
    { id: "experience", title: "Experiência", level: 1 },
    {
      id: "wyrdstone",
      title: scenario.type === "1v1" ? "Pedra-Bruxa" : "Ganhos",
      level: 1,
    },
    ...(scenario.treasureTable
      ? [{ id: "treasure", title: "Tabela de Tesouro", level: 1 }]
      : []),
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>{scenario.name}</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              {scenario.flavor && (
                <MobileText variant="quote" className="mb-6 italic">
                  {scenario.flavor}
                </MobileText>
              )}
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>{scenario.description}</MobileText>
            </div>

            <div id="setup" className="mt-8">
              <HeaderH2>Terreno</HeaderH2>
              <MobileText>{scenario.setup}</MobileText>
            </div>

            <div id="warbands" className="mt-8">
              <HeaderH2>Bandos</HeaderH2>
              <MobileText>{scenario.warbands}</MobileText>
            </div>

            <div id="deployment" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>
              <MobileText>{scenario.deployment}</MobileText>
            </div>

            {scenarioImage && (
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
                    src={scenarioImage}
                    alt={scenario.name}
                    className="w-3/4 mx-auto rounded-lg"
                  />
                )}
              </div>
            )}

            {scenario.specialRules && (
              <div id="specialRules" className="mt-8">
                <HeaderH2>Regras Especiais</HeaderH2>
                <MobileText>{scenario.specialRules}</MobileText>
              </div>
            )}

            <div id="victory" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>{scenario.victoryCondition}</MobileText>
            </div>

            <div id="experience" className="mt-8">
              <HeaderH2>Experiência</HeaderH2>
              <MobileText>{scenario.experience}</MobileText>
            </div>

            <div id="wyrdstone" className="mt-8">
              <HeaderH2>
                {scenario.type === "1v1" ? "Pedra-Bruxa" : "Ganhos"}
              </HeaderH2>
              <MobileText>{scenario.wyrdstone}</MobileText>
            </div>

            {scenario.treasureTable && (
              <div id="treasure" className="mt-8">
                <HeaderH2>Tabela de Tesouro</HeaderH2>
                <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 mt-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-green-500/40">
                        <th className="text-left text-green-300 py-2 pr-4">
                          Item
                        </th>
                        <th className="text-left text-green-300 py-2">
                          Rolagem
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {scenario.treasureTable.map((item, index) => (
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
            )}
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default GenericScenarioPage;
