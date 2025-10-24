import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import GenericTable from "../../components/GenericTable";
import TzeentchCurseTable from "../../components/TzeentchCurseTable";
import TzeentchGiftsTable from "../../components/TzeentchGiftsTable";
import QuickNavigation from "../../components/QuickNavigation";
import loreOfHashutData from "./data/lore-of-hashut.json";
import LoreSpellCard from "../../components/LoreSpellCard";

export default function LoreOfHashutPage() {
  const navigationSections = [
    {
      id: "intro",
      title: "Tradição de Hashut - As Artes da Forja Sombria",
      level: 0,
    },
    {
      id: "caracteristicas",
      title: "Características da Tradição de Hashut",
      level: 0,
    },
    { id: "preco-poder", title: "O Preço do Poder Sombrio", level: 0 },
    { id: "magias", title: "Magias da Tradição de Hashut", level: 0 },
    ...loreOfHashutData.map((spell, index) => ({
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
                Tradição de Hashut - As Artes da Forja Sombria
              </PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "O Poder da Forja e do Fogo Infernal"
            </MobileText>

            <MobileText className="mb-4">
              A Tradição de Hashut é a magia dos Anões do Caos, baseada na
              manipulação do fogo infernal e das forças da forja. Os praticantes
              desta tradição são conhecidos como Sacerdotes de Hashut ou
              Forjadores, e possuem uma conexão profunda com o fogo, o metal e
              as máquinas infernais. Eles são capazes de manipular magma,
              controlar construtos, e canalizar o poder destrutivo do fogo
              vulcânico.
            </MobileText>

            <div id="caracteristicas">
              <HeaderH2>Características da Tradição de Hashut</HeaderH2>
            </div>
            <MobileText className="mb-4">
              Os Sacerdotes de Hashut são conhecidos por sua conexão com o fogo
              infernal e sua capacidade de manipular metal e magma. Eles
              canalizam o poder de Hashut através de rituais de forja e uma
              compreensão profunda das forças vulcânicas. Suas magias
              frequentemente envolvem fogo, metal, controle de construtos, e
              manipulação de forças geológicas.
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
                  Sempre que uma criatura tenta conjurar uma magia de tradição
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
              <HeaderH2>Magias da Tradição de Hashut</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As magias da Tradição de Hashut são conhecidas por sua natureza
              destrutiva e focada na forja. Elas manipulam o fogo infernal para
              criar efeitos relacionados ao magma, controle de construtos, e
              manipulação de forças vulcânicas.
            </MobileText>

            <div className="space-y-6">
              {loreOfHashutData.map((spell, index) => (
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
