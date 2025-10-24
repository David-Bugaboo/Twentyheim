import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";

import HeaderH2 from "../../../components/HeaderH2";

import GenericTable from "../../../components/GenericTable";
import TzeentchCurseTable from "../../../components/TzeentchCurseTable";
import QuickNavigation from "../../../components/QuickNavigation";

export default function ArcaneLoresPage() {
  const navigate = useNavigate();

  const lores = [
    { name: "Aqshy - Tradição do Fogo", path: "/magic/arcane-lores/fire" },
    { name: "Azyr - Tradição dos Céus", path: "/magic/arcane-lores/heavens" },
    { name: "Chamon - Tradição do Metal", path: "/magic/arcane-lores/metal" },
    { name: "Ghyran - Tradição da Vida", path: "/magic/arcane-lores/life" },
    { name: "Hysh - Tradição da Luz", path: "/magic/arcane-lores/light" },
    { name: "Ulgu - Tradição das Sombras", path: "/magic/arcane-lores/shadows" },
    { name: "Shyish - Tradição da Morte", path: "/magic/arcane-lores/death" },
    { name: "Ghur - Tradição das Bestas", path: "/magic/arcane-lores/beasts" },
  ];

  const navigationSections = [
    {
      id: "intro",
      title: "Tradições Arcanas - Os Oito Ventos da Magia",
      level: 0,
    },
    { id: "perigos-ventos", title: "Perigos dos Ventos", level: 0 },
    { id: "oito-ventos", title: "Os Oito Ventos", level: 0 },
    ...lores.map((lore, index) => ({
      id: `lore-${index}`,
      title: lore.name,
      level: 1,
    })),
  ];

  const damageTableData = [
    { "Falhou por": "1-4", "Dano Sofrido": "Nenhum" },
    { "Falhou por": "5-9", "Dano Sofrido": "1" },
    { "Falhou por": "10-19", "Dano Sofrido": "2" },
    { "Falhou por": "20+", "Dano Sofrido": "5" },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Tradições Arcanas - Os Oito Ventos da Magia</PageTitle>
            </div>

            <MobileText>
              Assim como o emblema do Caos tem oito flechas, a magia também tem
              oito ventos. Eles sopram pelo mundo, carregando a energia do Caos
              com eles. Enquanto a magia bruta é unificada dentro do Reino do
              Caos, quando ela vem para este mundo, refrata-se em oito "cores",
              conhecidas coletivamente como os Ventos da Magia. Conjuradores
              ganham seu poder ao se conectar a esses Ventos da Magia. Alguns
              fazem isso juntando-se a uma Ordem dedicada ao estudo de uma cor
              da magia. Outros fazem isso através de oração, sorte ou instinto.
              Como estão brincando com a essência do próprio Caos, sejam quais
              forem seus métodos, todos os conjuradores arriscam suas vidas e
              até suas almas quando praticam magia.
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

              <GenericTable data={damageTableData} scrollable={false} />

              <TzeentchCurseTable />
            </div>

            <div id="oito-ventos">
              <HeaderH2>Os Oito Ventos</HeaderH2>
            </div>
            <MobileText className="mb-4">
              Escolha uma tradição arcana para explorar suas magias específicas:
            </MobileText>

            <div className="space-y-3">
              {lores.map((lore, index) => (
                <div key={lore.path} id={`lore-${index}`}>
                  <button
                    onClick={() => navigate(lore.path)}
                    className="w-full px-4 py-3 rounded-md transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500/30 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white active:scale-[0.99]"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    <span className="text-sm tracking-wide">{lore.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
