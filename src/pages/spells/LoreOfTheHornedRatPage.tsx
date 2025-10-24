import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import GenericTable from "../../components/GenericTable";
import TzeentchCurseTable from "../../components/TzeentchCurseTable";
import TzeentchGiftsTable from "../../components/TzeentchGiftsTable";
import QuickNavigation from "../../components/QuickNavigation";
import loreOfHornedRatData from "./data/lore-of-horned-rat.json";
import LoreSpellCard from "../../components/LoreSpellCard";

export default function LoreOfTheHornedRatPage() {
  const navigationSections = [
    {
      id: "intro",
      title: "Tradição do Rato Chifrudo - As Artes Sombrias",
      level: 0,
    },
    {
      id: "caracteristicas",
      title: "Características da Tradição do Rato Chifrudo",
      level: 0,
    },
    { id: "preco-poder", title: "O Preço do Poder Sombrio", level: 0 },
    { id: "magias", title: "Magias da Tradição do Rato Chifrudo", level: 0 },
    ...loreOfHornedRatData.map((spell, index) => ({
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
              <PageTitle>
                Tradição do Rato Chifrudo - As Artes Sombrias
              </PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "O Poder Corrompido do Grande Rato Chifrudo"
            </MobileText>

            <MobileText className="mb-4">
              A Tradição do Rato Chifrudo é a magia dos Skaven, baseada na
              manipulação das Energias Sombrias e na corrupção do Grande Rato
              Chifrudo. Os praticantes desta tradição são conhecidos como
              Feiticeiros Skaven ou Sacerdotes do Rato Chifrudo, e possuem uma
              conexão profunda com a covardia, a traição e as forças sombrias.
              Eles são capazes de manipular ilusões, controlar ratazanas, e
              canalizar o poder corrupto de seu deus.
            </MobileText>

            <div id="caracteristicas">
              <HeaderH2>Características da Tradição do Rato Chifrudo</HeaderH2>
            </div>
            <MobileText className="mb-4">
              Os Feiticeiros Skaven são conhecidos por sua natureza covarde e
              traiçoeira, e sua capacidade de manipular as Energias Sombrias.
              Eles canalizam o poder do Grande Rato Chifrudo através de rituais
              sombrios e uma compreensão profunda da corrupção. Suas magias
              frequentemente envolvem ilusões, manipulação de ratazanas, e
              efeitos baseados na covardia e traição.
            </MobileText>

            <div
              id="preco-poder"
              className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 mb-6"
            >
              <HeaderH2 className="text-green-300 mb-4">
                O Preço do Poder Sombrio
              </HeaderH2>

              <MobileText className="mb-4">
                Devido à sua natureza profana e instável, estas magias são mais
                difíceis de conjurar, mesmo que sejam um pouco mais poderosas
                que o normal.{" "}
                <strong>
                  Sempre que uma figura tenta conjurar uma magia de tradição
                  sombria, com sucesso ou não, ela sofre 1 de dano.
                </strong>{" "}
                Se ela falhar ao conjurar uma magia destas tradições, ela sofre
                mais dano além daquele 1 de dano de acordo com a tabela abaixo:
              </MobileText>

              <GenericTable
                data={[
                  { "Falhou por": "1-4", "Dano Sofrido": "2" },
                  { "Falhou por": "5-9", "Dano Sofrido": "3" },
                  { "Falhou por": "10-19", "Dano Sofrido": "4" },
                  { "Falhou por": "20+", "Dano Sofrido": "7" },
                ]}
                scrollable={false}
              />

              <TzeentchCurseTable />

              <TzeentchGiftsTable />
            </div>

            <div id="magias">
              <HeaderH2>Magias da Tradição do Rato Chifrudo</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As magias da Tradição do Rato Chifrudo são conhecidas por sua
              natureza traiçoeira e covarde. Elas manipulam as Energias Sombrias
              para criar efeitos relacionados à ilusão, manipulação de
              ratazanas, e poderes baseados na covardia e traição.
            </MobileText>

            <div className="space-y-6">
              {loreOfHornedRatData.map((spell, index) => (
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
