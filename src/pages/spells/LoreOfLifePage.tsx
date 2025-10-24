import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import GenericTable from "../../components/GenericTable";
import TzeentchCurseTable from "../../components/TzeentchCurseTable";
import QuickNavigation from "../../components/QuickNavigation";
import LoreSpellCard from "../../components/LoreSpellCard";
import loreOfLifeData from "./data/lore-of-life.json";

export default function LoreOfLifePage() {
  const navigate = useNavigate();

  const navigationSections = [
    { id: "intro", title: "Tradição da Vida - Ghyran", level: 0 },
    {
      id: "caracteristicas",
      title: "Características da Tradição da Vida",
      level: 0,
    },
    { id: "perigos-ventos", title: "Perigos dos Ventos", level: 0 },
    { id: "magias", title: "Magias da Tradição da Vida", level: 0 },
    ...loreOfLifeData.map((spell, index) => ({
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
              <PageTitle>Tradição da Vida - Ghyran</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "O Vento Verde da Natureza e da Vida"
            </MobileText>

            <MobileText className="mb-4">
              A Tradição da Vida, também conhecida como Druidismo, é a escola de
              magia que canaliza o poder natural de Ghyran, o Vento Verde da
              Magia. Os praticantes desta tradição são conhecidos como Druidas
              ou Guardiões da Natureza, e possuem uma conexão profunda com o
              mundo natural, as plantas, e as forças da vida. Eles são capazes
              de curar ferimentos, manipular a vegetação, e canalizar a energia
              vital da terra.
            </MobileText>

            <div id="caracteristicas">
              <HeaderH2>Características da Tradição da Vida</HeaderH2>
            </div>
            <MobileText className="mb-4">
              Os Druidas são conhecidos por sua conexão com a natureza e sua
              capacidade de manipular as forças da vida. Eles canalizam o poder
              de Ghyran através de harmonia com o mundo natural e compreensão
              dos ciclos da vida. Suas magias frequentemente envolvem cura,
              crescimento de plantas, e manipulação dos elementos naturais.
            </MobileText>

            <div
              id="perigos-ventos"
              className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 mb-6"
            >
              <HeaderH2 className="text-green-300 mb-4">
                Perigos dos Ventos
              </HeaderH2>

              <MobileText className="mb-4">
                Representando os perigos de canalizar o Caos bruto, sempre que
                um Conjurador falha ao conjurar uma magia de uma tradição
                arcana, ele sofre dano de acordo com a tabela abaixo:
              </MobileText>

              <GenericTable
                data={[
                  { "Falhou por": "1-4", "Dano Sofrido": "Nenhum" },
                  { "Falhou por": "5-9", "Dano Sofrido": "1" },
                  { "Falhou por": "10-19", "Dano Sofrido": "2" },
                  { "Falhou por": "20+", "Dano Sofrido": "5" },
                ]}
                scrollable={false}
              />

              <TzeentchCurseTable />
            </div>

            <div id="magias">
              <HeaderH2>Magias da Tradição da Vida</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As magias da Tradição da Vida são conhecidas por sua natureza
              curativa e natural. Elas manipulam o Vento Verde de Ghyran para
              criar efeitos relacionados à cura, crescimento, e as forças da
              natureza.
            </MobileText>

            <div className="space-y-6">
              {loreOfLifeData.map((spell, index) => (
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

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate("/magic/arcane-lores")}
                className="w-full md:w-1/2 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-bold"
              >
                Voltar às Tradições Arcanas
              </button>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
