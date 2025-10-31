import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import QuickNavigation from "../../components/QuickNavigation";
import SkillCard from "../../components/SkillCard";
import skillsCombate from "./data/combate.skills.json";
import skillsforca from "./data/forca.skills.json";
import skillsatirador from "./data/atirador.skills.json";
import skillsacademica from "./data/academica.skills.json";
import skillsvelocidade from "./data/velocidade.skills.json";
import skillsirmasdeSigmar from "./data/irmas-de-sigmar.skills.json";
import skillsskavenenshin from "./data/skaven-do-cla-enshin.skills.json";
import skillsbeastmenraiders from "./data/saqueadores-homem-fera.skills.json";
import skillsdwarftreasurehunters from "./data/cacadores-de-tesouro-anoes.skills.json";
import skillsdwarftrollslayers from "./data/mata-trolls-anao.skills.json";
import skillsvoncarstein from "./data/habilidades-von-carstein.skills.json";
import skillscrimsondragon from "./data/habilidades-de-dragao-carmesim.skills.json";
import skillsnecrarcas from "./data/habilidades-dos-necrarcas.skills.json";
import skillslahmia from "./data/habilidades-de-lahmia.skills.json";
import skillsstrigoi from "./data/habilidades-de-strigoi.skills.json";
import skillscorsariodruchii from "./data/corsarios-druchii.skills.json";
import skillsgeckos from "./data/habilidades-de-geckos.skills.json";
import skillssaurio from "./data/habilidades-de-saurio.skills.json";
import skillshordasorc from "./data/hordas-orc.skills.json";
import skillsfilhosdehashut from "./data/filhos-de-hashut.skills.json";
import skillspatrulheiroelfo from "./data/patrulheiro-elfico.skills.json";

// Mapeamento de skills para imports estáticos
const skillsData: Record<string, Skill[]> = {
  combate: skillsCombate,
  forca: skillsforca,
  atirador: skillsatirador,
  academica: skillsacademica,
  agilidade: skillsvelocidade,
  "irmas-de-sigmar": skillsirmasdeSigmar,
  "skaven-do-cla-enshin": skillsskavenenshin,
  "saqueadores-homem-fera": skillsbeastmenraiders,
  "cacadores-de-tesouro-anoes": skillsdwarftreasurehunters,
  "mata-trolls-anao": skillsdwarftrollslayers,
  "habilidades-von-carstein": skillsvoncarstein,
  "habilidades-de-dragao-carmesim": skillscrimsondragon,
  "habilidades-dos-necrarcas": skillsnecrarcas,
  "habilidades-de-lahmia": skillslahmia,
  "habilidades-de-strigoi": skillsstrigoi,
  "corsarios-druchii": skillscorsariodruchii,
  "habilidades-de-geckos": skillsgeckos,
  "habilidades-de-saurio": skillssaurio,
  "hordas-orc": skillshordasorc,
  "filhos-de-hashut": skillsfilhosdehashut,
  "patrulheiro-elfo": skillspatrulheiroelfo,
};

interface Skill {
  id: string;
  name: string;
  type: string;
  description: string;
}

// Mapeamento de slugs para nomes amigáveis e arquivos JSON
const skillConfig: Record<string, { name: string; file: string }> = {
  combate: { name: "Habilidades de Combate", file: "combate.skills.json" },
  atirador: { name: "Habilidades de Atirador", file: "atirador.skills.json" },
  academica: { name: "Habilidades Acadêmicas", file: "academica.skills.json" },
  forca: { name: "Habilidades de Força", file: "forca.skills.json" },
  agilidade: {
    name: "Habilidades de Agilidade",
    file: "velocidade.skills.json",
  },
  "irmas-de-sigmar": {
    name: "Habilidades das Irmãs de Sigmar",
    file: "irmas-de-sigmar.skills.json",
  },
  "skaven-do-cla-enshin": {
    name: "Habilidades Skaven do Clã Enshin",
    file: "skaven-do-cla-enshin.skills.json",
  },
  "saqueadores-homem-fera": {
    name: "Habilidades dos Saqueadores Homem-Fera",
    file: "saqueadores-homem-fera.skills.json",
  },
  "cacadores-de-tesouro-anoes": {
    name: "Habilidades dos Caçadores de Tesouro Anões",
    file: "cacadores-de-tesouro-anoes.skills.json",
  },
  "mata-trolls-anao": {
    name: "Habilidades dos Mata-Trolls Anão",
    file: "mata-trolls-anao.skills.json",
  },
  "habilidades-von-carstein": {
    name: "Habilidades Von Carstein",
    file: "habilidades-von-carstein.skills.json",
  },
  "habilidades-de-dragao-carmesim": {
    name: "Habilidades de Dragão Carmesim",
    file: "habilidades-de-dragao-carmesim.skills.json",
  },
  "habilidades-dos-necrarcas": {
    name: "Habilidades dos Necrarcas",
    file: "habilidades-dos-necrarcas.skills.json",
  },
  "habilidades-de-lahmia": {
    name: "Habilidades de Lahmia",
    file: "habilidades-de-lahmia.skills.json",
  },
  "habilidades-de-strigoi": {
    name: "Habilidades de Strigoi",
    file: "habilidades-de-strigoi.skills.json",
  },
  "corsarios-druchii": {
    name: "Habilidades dos Corsários Druchii",
    file: "corsarios-druchii.skills.json",
  },
  "habilidades-de-geckos": {
    name: "Habilidades de Geckos",
    file: "habilidades-de-geckos.skills.json",
  },
  "habilidades-de-saurio": {
    name: "Habilidades de Sáurio",
    file: "habilidades-de-saurio.skills.json",
  },
  "habilidades-de-saurios": {
    name: "Habilidades de Sáurios",
    file: "habilidades-de-saurios.skills.json",
  },
  "hordas-orc": {
    name: "Habilidades das Hordas Orc",
    file: "hordas-orc.skills.json",
  },
  "filhos-de-hashut": {
    name: "Habilidades dos Filhos de Hashut",
    file: "filhos-de-hashut.skills.json",
  },
  "patrulheiro-elfo": {
    name: "Habilidades do Patrulheiro Elfo",
    file: "patrulheiro-elfo.skills.json",
  },
};

function GenericSkillsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkillsData = () => {
      if (!slug || !skillConfig[slug]) {
        setError(`Tipo de skill "${slug}" não encontrado`);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = skillsData[slug];
        if (data) {
          setSkills(data);
        } else {
          setError("Habilidades não encontradas para este tipo");
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar as habilidades desse tipo");
      } finally {
        setLoading(false);
      }
    };

    loadSkillsData();
  }, [slug]);

  const skillInfo = slug ? skillConfig[slug] : null;

  if (loading) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Carregando...</PageTitle>
              <MobileText>
                Por favor, aguarde enquanto carregamos as habilidades.
              </MobileText>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  if (error || !skillInfo) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Erro</PageTitle>
              <MobileText>{error || "Tipo de skill não encontrado"}</MobileText>
              <button
                onClick={() => navigate("/skills")}
                className="mt-4 px-4 py-2 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white rounded-lg transition-colors duration-200"
              >
                Voltar para Skills
              </button>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  const navigationSections = [
    { id: "intro", title: skillInfo.name, level: 0 },
    ...skills.map((skill, index) => ({
      id: `skill-${index}`,
      title: skill.name,
      level: 1,
    })),
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>{skillInfo.name}</PageTitle>
            </div>

            <div className="space-y-6 mt-6">
              {skills.map((skill, index) => (
                <div key={skill.id || index} id={`skill-${index}`}>
                  <SkillCard
                    name={skill.name}
                    description={skill.description}
                  />
                </div>
              ))}
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default GenericSkillsPage;
