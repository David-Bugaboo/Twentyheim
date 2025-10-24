import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import GenericTable from "../../components/GenericTable";
import TzeentchCurseTable from "../../components/TzeentchCurseTable";
import QuickNavigation from "../../components/QuickNavigation";
import LoreSpellCard from "../../components/LoreSpellCard";
import loreOfFireData from "./data/lore-of-fire.json";

export default function LoreOfFirePage() {
  const navigationSections = [
    { id: "intro", title: "Tradição do Fogo - Aqshy", level: 0 },
    {
      id: "caracteristicas",
      title: "Características da Tradição do Fogo",
      level: 0,
    },
    { id: "perigos-ventos", title: "Perigos dos Ventos", level: 0 },
    { id: "magias", title: "Magias da Tradição do Fogo", level: 0 },
    ...loreOfFireData.map((spell, index) => ({
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
              <PageTitle>Tradição do Fogo - Aqshy</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "O Vento Vermelho da Destruição e Paixão"
            </MobileText>

            <MobileText className="mb-4">
              A Tradição do Fogo, ou Piromancia como às vezes é conhecida, é a
              escola de magia mais agressiva. Ela é baseada na manipulação de
              Aqshy, o Vento Vermelho da Magia. Magistrados desta tradição são
              conhecidos como Magos Flamejantes e são frequentemente encontrados
              no campo de batalha, já que comandam um arsenal de feitiços
              impressionantemente destrutivos. Conforme crescem em poder, Magos
              Flamejantes tornam-se cada vez mais irascíveis e hiperativos. Seus
              cabelos e sobrancelhas tornam-se vermelho flamejante e tremulam em
              uma brisa invisível. São rápidos em se ofender, e rápidos em
              sentir frio. Magos Flamejantes frequentemente adotam tatuagens
              faciais conforme progridem em habilidade.
            </MobileText>

            <div id="caracteristicas">
              <HeaderH2>Características da Tradição do Fogo</HeaderH2>
            </div>
            <MobileText className="mb-4">
              Os Piromantes são conhecidos por sua natureza explosiva e
              destrutiva. Eles canalizam o poder bruto de Aqshy através de
              emoções intensas e paixão ardente. Suas magias são frequentemente
              acompanhadas por chamas, fumaça e calor intenso.
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
              <HeaderH2>Magias da Tradição do Fogo</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As magias da Tradição do Fogo são conhecidas por sua natureza
              destrutiva e agressiva. Elas manipulam o Vento Vermelho de Aqshy
              para criar chamas, explosões e efeitos de calor intenso.
            </MobileText>

            <div className="space-y-6">
              {loreOfFireData.map((spell, index) => (
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
