
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import GenericTable from "../../components/GenericTable";
import TzeentchCurseTable from "../../components/TzeentchCurseTable";
import QuickNavigation from "../../components/QuickNavigation";
import LoreSpellCard from "../../components/LoreSpellCard";
import loreOfDeathData from "./data/lore-of-death.json";

export default function LoreOfDeathPage() {


  const navigationSections = [
    { id: "intro", title: "Tradição da Morte - Shyish", level: 0 },
    {
      id: "caracteristicas",
      title: "Características da Tradição da Morte",
      level: 0,
    },
    { id: "perigos-ventos", title: "Perigos dos Ventos", level: 0 },
    { id: "magias", title: "Magias da Tradição da Morte", level: 0 },
    ...loreOfDeathData.map((spell, index) => ({
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
              <PageTitle>Tradição da Morte - Shyish</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "O Vento Púrpura dos Fins e da Mortalidade"
            </MobileText>

            <MobileText className="mb-4">
              A Tradição da Morte é a magia da mortalidade, fins e a passagem do
              tempo. Ela é baseada na manipulação de Shyish, o Vento Púrpura da
              Magia. Magistrados desta tradição são conhecidos como Magos
              Ametista e são justamente temidos. Embora frequentemente
              confundidos com Necromantes, Magos Ametista são bem distintos.
              Eles abraçam o fim natural de todas as coisas, enquanto
              Necromantes buscam conquistar a morte com as mais sombrias magias.
              Conforme crescem em poder, Magos Ametista tornam-se mais
              silenciosos, embora não sombrios. O sopro da tumba os segue, e até
              o mais gordo torna-se magro; contudo eles retêm um humor perverso
              e respeito pela vida.
            </MobileText>

            <div id="caracteristicas">
              <HeaderH2>Características da Tradição da Morte</HeaderH2>
            </div>
            <MobileText className="mb-4">
              Os Magos Ametista são conhecidos por sua conexão com a mortalidade
              e sua capacidade de manipular o tempo e a passagem da vida. Eles
              canalizam o poder de Shyish através de compreensão profunda dos
              ciclos naturais e respeito pela inevitabilidade da morte. Suas
              magias frequentemente envolvem manipulação temporal, drenagem de
              vida, e controle sobre os aspectos finais da existência.
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
              <HeaderH2>Magias da Tradição da Morte</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As magias da Tradição da Morte são conhecidas por sua natureza
              temporal e mortal. Elas manipulam o Vento Púrpura de Shyish para
              criar efeitos relacionados ao tempo, mortalidade, e os aspectos
              finais da existência.
            </MobileText>

            <div className="space-y-6">
              {loreOfDeathData.map((spell, index) => (
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
