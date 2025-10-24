
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import GenericTable from "../../components/GenericTable";
import TzeentchCurseTable from "../../components/TzeentchCurseTable";
import QuickNavigation from "../../components/QuickNavigation";
import LoreSpellCard from "../../components/LoreSpellCard";
import loreOfBeastsData from "./data/lore-of-beasts.json";

export default function LoreOfBeastsPage() {


  const navigationSections = [
    { id: "intro", title: "Tradição das Bestas - Ghur", level: 0 },
    {
      id: "caracteristicas",
      title: "Características da Tradição das Bestas",
      level: 0,
    },
    { id: "perigos-ventos", title: "Perigos dos Ventos", level: 0 },
    { id: "magias", title: "Magias da Tradição das Bestas", level: 0 },
    ...loreOfBeastsData.map((spell, index) => ({
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
              <PageTitle>Tradição das Bestas - Ghur</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "O Vento Marrom da Natureza Selvagem e Instinto Primitivo"
            </MobileText>

            <MobileText className="mb-4">
              A Tradição das Bestas, também conhecida como Bestiomancia, é a
              escola de magia que canaliza o poder bruto de Ghur, o Vento Marrom
              da Magia. Os praticantes desta tradição são conhecidos como
              Guardiões das Bestas ou Xamãs Selvagens, e possuem uma conexão
              profunda com o mundo natural e suas criaturas. Eles são capazes de
              se comunicar com animais, transformar-se em bestas poderosas, e
              invocar a fúria primitiva que habita em todos os seres vivos.
            </MobileText>

            <div id="caracteristicas">
              <HeaderH2>Características da Tradição das Bestas</HeaderH2>
            </div>
            <MobileText className="mb-4">
              Os Guardiões das Bestas são conhecidos por sua conexão única com a
              natureza selvagem. Eles canalizam o poder de Ghur através de
              instintos primitivos e uma compreensão profunda do mundo animal.
              Suas magias frequentemente envolvem transformações, comunicação
              com animais, e invocação da fúria selvagem.
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
              <HeaderH2>Magias da Tradição das Bestas</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As magias da Tradição das Bestas são conhecidas por sua natureza
              selvagem e instintiva. Elas manipulam o Vento Marrom de Ghur para
              criar transformações, comunicação com animais, e efeitos que
              despertam a fúria primitiva.
            </MobileText>

            <div className="space-y-6">
              {loreOfBeastsData.map((spell, index) => (
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
