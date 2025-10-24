import { useNavigate } from "react-router-dom";

import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import PageTitle from "../../components/PageTitle";

export default function WeaponsAndEquipmentsPage() {
  const navigate = useNavigate();

  const equipmentCategories = [
    {
      name: "Armas Corpo a Corpo",
      path: "/equipment/melee-weapons",
      description:
        "Lâminas que cortam carne e ossos, maças que esmagam crânios, lanças que perfuram corações. O arsenal do combate direto onde cada golpe pode ser o último.",
    },
    {
      name: "Armas a Distância",
      path: "/equipment/ranged-weapons",
      description:
        "Arcos que enviam flechas mortais, bestas que perfuram armaduras, fundas que arremessam pedras fatais. A morte que vem de longe.",
    },
    {
      name: "Armas de Fogo",
      path: "/equipment/firearms",
      description:
        "Pistolas que cospem fogo e fumaça, mosquetes que ecoam como trovão, canhões portáteis que destroem tudo em seu caminho. A tecnologia da morte.",
    },
    {
      name: "Armaduras e Escudos",
      path: "/equipment/armor-and-shields",
      description:
        "Couro endurecido, cota de malha, placas de aço forjado. A proteção que separa os vivos dos mortos em Mordheim.",
    },
    {
      name: "Acessórios",
      path: "/equipment/acessories",
      description:
        "Acessórios, ferramentas, consumíveis e itens especiais. Tudo que um guerreiro precisa além de suas armas para sobreviver na cidade amaldiçoada.",
    },
    {
      name: "Remédios e Venenos",
      path: "/equipment/remedies-and-poisons",
      description:
        "Poções que curam feridas mortais, venenos que matam sem som, drogas que transformam covardes em heróis. A alquimia da sobrevivência em Mordheim.",
    },
    {
      name: "Modificadores de Equipamento",
      path: "/equipment/modifiers",
      description:
        "Da forja dos Anões ao trabalho élfico, dos segredos de Cathay às criações dos Engenheiros de Nuln. Cada modificador é uma obra de arte que transforma o comum no extraordinário.",
    },
  ];

  const navigationSections = [
    { id: "intro", title: "Armas e Equipamentos", level: 0 },
    { id: "regras-equipamento", title: "Regras de Equipamento", level: 0 },
    { id: "categorias", title: "Categorias de Equipamentos", level: 0 },
    ...equipmentCategories.map((category, index) => ({
      id: `category-${index}`,
      title: category.name,
      level: 1,
    })),
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <PageTitle>Armas e Equipamentos</PageTitle>
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro"></div>

            <div id="regras-equipamento">
              <HeaderH1>Regras de Equipamento</HeaderH1>
            </div>

            <MobileText>
              Como explicado na seção de "Criando um Bando", cada figura tem uma
              quantidade determinada de espaços de itens, podendo carregar até 5
              espaços de equipamento, 6 no caso de figuras grandes. Cada item
              gasta uma quantidade de espaços de item, exceto a primeira de cada
              arma leve.
            </MobileText>

            <MobileText>
              Com acessórios há outra regra a se levar em conta. Só um tipo de
              acessório pode ser carregado por vez. Por exemplo apenas 1
              amuleto, 1 anel, 1 manto e etc.
            </MobileText>

            <MobileText>
              Durante a criação de bando qualquer equipamento das listas do
              bando pode ser comprado, mas depois apenas se procurar os itens
              durante a fase de atividades.
            </MobileText>

            <MobileText>
              Uma figura só pode usar equipamentos descritos em seus
              equipamentos disponíveis e nunca pode mudar essa lista.
            </MobileText>

            <div id="categorias">
              <HeaderH1>Categorias de Equipamentos</HeaderH1>
            </div>
            <MobileText>
              Escolha uma categoria abaixo para explorar os equipamentos
              disponíveis em Mordheim.
            </MobileText>

            <div className="space-y-6 mt-6">
              {equipmentCategories.map((category, index) => (
                <div
                  key={index}
                  id={`category-${index}`}
                  className="border border-gray-700 rounded-lg p-4 bg-[#1a1a1a] text-center"
                >
                  <HeaderH2 className="text-center">{category.name}</HeaderH2>
                  <MobileText className="mb-4 italic text-gray-300 text-center">
                    {category.description}
                  </MobileText>
                  <button
                    onClick={() => navigate(category.path)}
                    className="w-full px-6 py-3 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white rounded-lg transition-colors duration-200 font-bold text-center"
                  >
                    Explorar {category.name}
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
