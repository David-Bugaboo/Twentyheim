import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import GenericTable from "../../components/GenericTable";
import TzeentchCurseTable from "../../components/TzeentchCurseTable";
import TzeentchGiftsTable from "../../components/TzeentchGiftsTable";
import QuickNavigation from "../../components/QuickNavigation";
import loreOfChaosData from "./data/lore-of-chaos.json";
import LoreSpellCard from "../../components/LoreSpellCard";

export default function LoreOfChaosPage() {
  const navigationSections = [
    { id: "intro", title: "Tradição do Caos - As Artes Proibidas", level: 0 },
    {
      id: "caracteristicas",
      title: "Características da Tradição do Caos",
      level: 0,
    },
    { id: "preco-poder", title: "O Preço do Poder Sombrio", level: 0 },
    { id: "magias", title: "Magias da Tradição do Caos", level: 0 },
    ...loreOfChaosData.map((spell, index) => ({
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
              <PageTitle>Tradição do Caos - As Artes Proibidas</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "O Poder Corrompido do Reino do Caos"
            </MobileText>

            <MobileText className="mb-4">
              A Tradição do Caos é a magia mais perigosa e corrupta, baseada na
              manipulação direta das forças do Reino do Caos. Os praticantes
              desta tradição são conhecidos como Feiticeiros do Caos ou
              Cultistas, e possuem uma conexão profunda com os daemônios e as
              forças da corrupção. Eles são capazes de invocar daemônios,
              corromper mentes, e canalizar o poder destrutivo do Caos.
            </MobileText>

            <div id="caracteristicas">
              <HeaderH2>Características da Tradição do Caos</HeaderH2>
            </div>
            <MobileText className="mb-4">
              Os Feiticeiros do Caos são conhecidos por sua conexão com os
              daemônios e sua capacidade de manipular as forças da corrupção.
              Eles canalizam o poder do Reino do Caos através de rituais
              blasfemos e uma compreensão profunda das forças daentrópicas. Suas
              magias frequentemente envolvem invocação de daemônios, corrupção
              mental, e manipulação das forças do Caos.
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
              <HeaderH2>Magias da Tradição do Caos</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As magias da Tradição do Caos são conhecidas por sua natureza
              corrupta e destrutiva. Elas manipulam as forças do Reino do Caos
              para criar efeitos relacionados à invocação de daemônios,
              corrupção mental, e manipulação das forças entrópicas.
            </MobileText>

            <div className="space-y-6">
              {loreOfChaosData.map((spell, index) => (
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
