import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import GenericTable from "../../components/GenericTable";
import TzeentchCurseTable from "../../components/TzeentchCurseTable";
import QuickNavigation from "../../components/QuickNavigation";
import LoreSpellCard from "../../components/LoreSpellCard";
import loreOfMetalData from "./data/lore-of-metal.json";

export default function LoreOfMetalPage() {
  const navigationSections = [
    { id: "intro", title: "Tradição do Metal - Chamon", level: 0 },
    {
      id: "caracteristicas",
      title: "Características da Tradição do Metal",
      level: 0,
    },
    { id: "perigos-ventos", title: "Perigos dos Ventos", level: 0 },
    { id: "magias", title: "Magias da Tradição do Metal", level: 0 },
    ...loreOfMetalData.map((spell, index) => ({
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
              <PageTitle>Tradição do Metal - Chamon</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "O Vento Amarelo da Transmutação e da Alquimia"
            </MobileText>

            <MobileText className="mb-4">
              A Tradição do Metal, também conhecida como Alquimia, é a escola de
              magia que canaliza o poder transformador de Chamon, o Vento
              Amarelo da Magia. Os praticantes desta tradição são conhecidos
              como Alquimistas ou Magos do Metal, e possuem uma conexão profunda
              com os metais, a transmutação, e as forças da transformação. Eles
              são capazes de alterar a natureza dos materiais, criar poções
              alquímicas, e manipular as propriedades físicas dos objetos.
            </MobileText>

            <div id="caracteristicas">
              <HeaderH2>Características da Tradição do Metal</HeaderH2>
            </div>
            <MobileText className="mb-4">
              Os Alquimistas são conhecidos por sua conexão com os metais e sua
              capacidade de manipular as forças da transmutação. Eles canalizam
              o poder de Chamon através de conhecimento científico e compreensão
              das leis da natureza. Suas magias frequentemente envolvem
              transmutação, alquimia, manipulação de metais, e transformação de
              materiais.
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
              <HeaderH2>Magias da Tradição do Metal</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As magias da Tradição do Metal são conhecidas por sua natureza
              transformadora e alquímica. Elas manipulam o Vento Amarelo de
              Chamon para criar efeitos relacionados à transmutação, alquimia,
              manipulação de metais, e transformação de materiais.
            </MobileText>

            <div className="space-y-6">
              {loreOfMetalData.map((spell, index) => (
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
