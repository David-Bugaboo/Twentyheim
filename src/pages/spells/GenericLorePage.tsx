import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import QuickNavigation from "../../components/QuickNavigation";
import LoreSpellCard from "../../components/LoreSpellCard";

// Imports estáticos das tradições de magia
import loreHornedRat from "./data/lore-of-horned-rat.json";
import loreNecromancy from "./data/lore-of-necromancy.json";
import druchiiMagic from "./data/druchii-magic.json";
import magicOldOnes from "./data/magic-of-the-old-ones.json";
import magicGoblins from "./data/magic-of-the-goblins.json";
import magicWaaaaagh from "./data/magic-of-the-waaaaagh.json";
import prayersSigmar from "./data/prayers-of-sigmar.json";
import prayersUlric from "./data/prayers-of-ulric.json";
import ritualsChaos from "./data/rituals-of-chaos.json";
import ritualsHashut from "./data/rituals-of-hashut.json";
import lesserMagic from "./data/lesser-magic.json";

// Mapeamento de tradições para imports estáticos
const loreData: Record<string, Spell[]> = {
  "lore-of-horned-rat": loreHornedRat,
  "lore-of-necromancy": loreNecromancy,
  "druchii-magic": druchiiMagic,
  "magic-of-the-old-ones": magicOldOnes,
  "magic-of-the-goblins": magicGoblins,
  "magic-of-the-waaaaagh": magicWaaaaagh,
  "prayers-of-sigmar": prayersSigmar,
  "prayers-of-ulric": prayersUlric,
  "rituals-of-chaos": ritualsChaos,
  "rituals-of-hashut": ritualsHashut,
  "lesser-magic": lesserMagic,
};

interface Spell {
  name: string;
  castingNumber: number;
  keywords: string[];
  effect: string;
}

// Mapeamento de slugs para nomes amigáveis e arquivos JSON
const loreConfig: Record<string, { name: string; file: string }> = {
  "lore-of-horned-rat": {
    name: "Tradição do Rato Chifrudo",
    file: "lore-of-horned-rat.json",
  },
  "lore-of-necromancy": {
    name: "Tradição da Necromancia",
    file: "lore-of-necromancy.json",
  },
  "druchii-magic": { name: "Magia Druchii", file: "druchii-magic.json" },
  "magic-of-the-old-ones": {
    name: "Magia dos Antigos",
    file: "magic-of-the-old-ones.json",
  },
  "rituals-of-chaos": {
    name: "Rituais do Caos",
    file: "rituals-of-chaos.json",
  },
  "rituals-of-hashut": {
    name: "Rituais de Hashut",
    file: "rituals-of-hashut.json",
  },
  "magic-of-the-goblins": {
    name: "Magia dos Goblins",
    file: "magic-of-the-goblins.json",
  },
  "magic-of-the-waaaaagh": {
    name: "Magia da WAAAAAAAGH!",
    file: "magic-of-the-waaaaagh.json",
  },
  "lesser-magic": {
    name: "Magia Inferior",
    file: "lesser-magic.json",
  },
  "prayers-of-sigmar": {
    name: "Orações de Sigmar",
    file: "prayers-of-sigmar.json",
  },
  "prayers-of-ulric": {
    name: "Orações de Ulric",
    file: "prayers-of-ulric.json",
  },
};

function GenericLorePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLoreData = () => {
      if (!slug || !loreConfig[slug]) {
        setError(`Tradição "${slug}" não encontrada`);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = loreData[slug];
        if (data) {
          setSpells(data);
        } else {
          setError("Magias não encontradas para esta tradição");
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar as magias dessa tradição");
      } finally {
        setLoading(false);
      }
    };

    loadLoreData();
  }, [slug]);

  const loreInfo = slug ? loreConfig[slug] : null;

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

  if (error || !loreInfo) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Erro</PageTitle>
              <MobileText>{error || "Tradição não encontrada"}</MobileText>
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

  const navigationSections = [
    { id: "intro", title: loreInfo.name, level: 0 },
    ...spells.map((spell, index) => ({
      id: `spell-${index}`,
      title: spell.name,
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
              <PageTitle>{loreInfo.name}</PageTitle>
            </div>

            <div className="space-y-6 mt-6">
              {spells.map((spell, index) => (
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
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default GenericLorePage;
