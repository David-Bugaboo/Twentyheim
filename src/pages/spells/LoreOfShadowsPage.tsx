
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import GenericTable from "../../components/GenericTable";
import TzeentchCurseTable from "../../components/TzeentchCurseTable";
import QuickNavigation from "../../components/QuickNavigation";
import LoreSpellCard from "../../components/LoreSpellCard";
import loreOfShadowsData from "./data/lore-of-shadows.json";

export default function LoreOfShadowsPage() {


  const navigationSections = [
    { id: "intro", title: "Tradição das Sombras - Ulgu", level: 0 },
    {
      id: "caracteristicas",
      title: "Características da Tradição das Sombras",
      level: 0,
    },
    { id: "perigos-ventos", title: "Perigos dos Ventos", level: 0 },
    { id: "magias", title: "Magias da Tradição das Sombras", level: 0 },
    ...loreOfShadowsData.map((spell, index) => ({
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
              <PageTitle>Tradição das Sombras - Ulgu</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "O Vento Cinza da Ilusão e das Sombras"
            </MobileText>

            <MobileText className="mb-4">
              A Tradição das Sombras, também conhecida como Ilusionismo, é a
              escola de magia que canaliza o poder enganoso de Ulgu, o Vento
              Cinza da Magia. Os praticantes desta tradição são conhecidos como
              Ilusionistas ou Magos das Sombras, e possuem uma conexão profunda
              com as ilusões, o engano, e as forças da obscuridade. Eles são
              capazes de criar ilusões convincentes, manipular a percepção, e se
              mover através das sombras como se fossem parte delas.
            </MobileText>

            <div id="caracteristicas">
              <HeaderH2>Características da Tradição das Sombras</HeaderH2>
            </div>
            <MobileText className="mb-4">
              Os Ilusionistas são conhecidos por sua conexão com as sombras e
              sua capacidade de manipular a percepção e a realidade. Eles
              canalizam o poder de Ulgu através de engano e compreensão das
              ilusões. Suas magias frequentemente envolvem invisibilidade,
              ilusões, manipulação da percepção, e movimento através das
              sombras.
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
              <HeaderH2>Magias da Tradição das Sombras</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As magias da Tradição das Sombras são conhecidas por sua natureza
              ilusória e enganosa. Elas manipulam o Vento Cinza de Ulgu para
              criar efeitos relacionados à invisibilidade, ilusões, manipulação
              da percepção, e movimento através das sombras.
            </MobileText>

            <div className="space-y-6">
              {loreOfShadowsData.map((spell, index) => (
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
