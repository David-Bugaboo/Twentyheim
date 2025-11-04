import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import QuickNavigation from "../../components/QuickNavigation";
import LoreSpellCard from "../../components/LoreSpellCard";
import { useJsonData } from "../../hooks/useJsonData";
import { getStaticImport } from "../../data/jsonFileMap";

interface Spell {
  name: string;
  castingNumber: number;
  keywords: string[];
  effect: string;
}

// Mapeamento de slugs para fileIds e nomes
const loreConfig: Record<string, { name: string; fileId: string }> = {
  "lore-of-horned-rat": {
    name: "Tradição do Rato Chifrudo",
    fileId: "lore-of-horned-rat",
  },
  "lore-of-necromancy": {
    name: "Tradição da Necromancia",
    fileId: "lore-of-necromancy",
  },
  "druchii-magic": { 
    name: "Magia Druchii", 
    fileId: "druchii-magic" 
  },
  "magic-of-the-old-ones": {
    name: "Magia dos Antigos",
    fileId: "magic-of-the-old-ones",
  },
  "rituals-of-chaos": {
    name: "Rituais do Caos",
    fileId: "rituals-of-chaos",
  },
  "rituals-of-hashut": {
    name: "Rituais de Hashut",
    fileId: "rituals-of-hashut",
  },
  "magic-of-the-goblins": {
    name: "Magia dos Goblins",
    fileId: "magic-of-the-goblins",
  },
  "magic-of-the-waaaaagh": {
    name: "Magia da WAAAAAAAGH!",
    fileId: "magic-of-the-waaaaagh",
  },
  "lesser-magic": {
    name: "Magia Inferior",
    fileId: "lesser-magic",
  },
  "prayers-of-sigmar": {
    name: "Orações de Sigmar",
    fileId: "prayers-of-sigmar",
  },
  "prayers-of-ulric": {
    name: "Orações de Ulric",
    fileId: "prayers-of-ulric",
  },
  "rituals-of-nurgle": {
    name: "Rituais de Nurgle",
    fileId: "rituals-of-nurgle",
  },
};

function GenericLorePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Obtém a configuração baseada no slug
  const config = slug ? loreConfig[slug] : null;
  
  // Cria o staticImport apenas se o slug for válido
  const staticImportFn = useMemo(() => {
    if (!config) return () => Promise.resolve({ default: [] });
    return () => getStaticImport(config.fileId)();
  }, [config]);
  
  // Carrega dados via hook (Firestore -> IndexedDB -> Static)
  const { data: spells, loading, error: loadError } = useJsonData<Spell[]>({
    fileId: config?.fileId || "",
    staticImport: staticImportFn,
    enabled: !!config,
  });

  const error = config ? null : `Tradição "${slug}" não encontrada`;

  if (loading) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Carregando...</PageTitle>
              <MobileText>
                Por favor, aguarde enquanto carregamos as magias.
              </MobileText>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  if (error || loadError || !config) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Erro</PageTitle>
              <MobileText>{error || loadError?.message || "Tradição não encontrada"}</MobileText>
              <button
                onClick={() => navigate("/magic")}
                className="mt-4 px-4 py-2 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white rounded-lg transition-colors duration-200"
              >
                Voltar para Magia
              </button>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  const spellsArray = (spells || []) as Spell[];
  const navigationSections = [
    { id: "intro", title: config.name, level: 0 },
    ...spellsArray.map((spell, index) => ({
      id: `spell-${index}`,
      title: spell.name,
      level: 1,
    })),
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} loading={loading} />
          <MobileSection>
            <div id="intro">
              <PageTitle>{config.name}</PageTitle>
            </div>

            {loading ? (
              <MobileText>Carregando magias...</MobileText>
            ) : spellsArray.length === 0 ? (
              <MobileText>Nenhuma magia encontrada para esta tradição.</MobileText>
            ) : (
            <div className="space-y-6 mt-6">
                {spellsArray.map((spell, index) => (
                <div key={index} id={`spell-${index}`}>
                  <LoreSpellCard
                    name={spell.name}
                    castingNumber={spell.castingNumber}
                    keywords={spell.keywords}
                    effect={spell.effect}
                  />
                </div>
              ))}
            </div>
            )}
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default GenericLorePage;
