import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import WarningBox from "../../components/WarningBox";
import QuickNavigation from "../../components/QuickNavigation";
import EquipmentDetailCard from "../../components/EquipmentDetailCard";
import { useNavigate } from "react-router-dom";
import { fetchEquipmentBySlug } from "../../services/queries.service";
import type { EquipmentDetailQueryResponse } from "../../services/queries.service";

function EquipmentRulesPage() {
  const navigate = useNavigate();
  const [daggerData, setDaggerData] =
    useState<EquipmentDetailQueryResponse | null>(null);
  const [armorData, setArmorData] =
    useState<EquipmentDetailQueryResponse | null>(null);
  const [torchData, setTorchData] =
    useState<EquipmentDetailQueryResponse | null>(null);
  const [tearsData, setTearsData] =
    useState<EquipmentDetailQueryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    const loadEquipments = async () => {
      setLoading(true);
      setError(null);
      try {
        const [dagger, armor, torch, tears] = await Promise.all([
          fetchEquipmentBySlug("adaga", controller.signal),
          fetchEquipmentBySlug("armadura-pesada", controller.signal),
          fetchEquipmentBySlug("tocha", controller.signal),
          fetchEquipmentBySlug("lagrimas-de-shallaya", controller.signal),
        ]);
        if (!abort) {
          setDaggerData(dagger);
          setArmorData(armor);
          setTorchData(torch);
          setTearsData(tears);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar equipamentos:", err);
          setError("Não foi possível carregar os equipamentos.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadEquipments();

    return () => {
      abort = true;
      controller.abort();
    };
  }, []);

  const navigationSections = [
    { id: "intro", title: "Equipamentos", level: 0 },
    { id: "espacos-item", title: "Espaços de Item", level: 0 },
    { id: "regra-um", title: "A Regra de Um", level: 1 },
    { id: "armas", title: "Armas", level: 0 },
    { id: "atributos-armas", title: "Atributos", level: 1 },
    { id: "exemplo-adaga", title: "Exemplo: Adaga", level: 1 },
    { id: "armaduras", title: "Armaduras", level: 0 },
    { id: "atributos-armaduras", title: "Atributos", level: 1 },
    { id: "exemplo-armadura", title: "Exemplo: Armadura Pesada", level: 1 },
    { id: "acessorios", title: "Acessórios", level: 0 },
    { id: "exemplo-tocha", title: "Exemplo: Tocha", level: 1 },
    { id: "remedios-e-venenos", title: "Remédios e Venenos", level: 0 },
    { id: "exemplo-lagrimas", title: "Exemplo: Lágrimas de Shallya", level: 1 },
    { id: "categorias", title: "Categorias de Equipamentos", level: 0 },
  ];

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
      path: "/equipment/accessories",
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

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Equipamentos</PageTitle>
            </div>

            <MobileText>
              Em 20Heim, o equipamento é fundamental para a sobrevivência nas
              ruínas da cidade dos condenados. Cada figura pode carregar uma
              quantidade limitada de itens, e saber como usar esses equipamentos
              corretamente pode ser a diferença entre a vida e a morte na Cidade
              dos Condenados.
            </MobileText>

            <div id="espacos-item">
              <HeaderH1>Limite de Carga</HeaderH1>
            </div>
            <MobileText>
              Figuras podem carregar uma armadura , duas armas corpo a corpo ou
              escudos e 2 armas a distâncias. Outras categorias de equipamento
              não tem limite de quantos podem ser carregados.
            </MobileText>

            <div id="espacos-de-equipamento">
              <HeaderH1>Espaços de Equipamento</HeaderH1>
            </div>
            <MobileText>
              Uma figura pode ter um elmo, uma armadura, e uma arma equipada na
              mão primaria e/ou secundária. Apenas escudos e armas com a
              característica Leve ou Pistola podem ser equipadas na mão
              secundária. Qualquer arma, mas não escudos podem ser equipados na
              mão principal. Armas de duas mãos ocupam ambas as mãos, e armas
              versáteis podem ser equipados com duas mãos.
            </MobileText>

            <div id="armas">
              <HeaderH1>Armas</HeaderH1>
            </div>
            <MobileText>
              São a forma mais segura de tirar um inimigo de circulação em
              Mordheim. Elas vêm nas mais diversas variedades e tipos,
              oferecendo bônus específicos e ocupando nichos estratégicos únicos
              para um guerreiro que as use. Os atributos mais importantes de uma
              arma são:
            </MobileText>
            <div id="atributos-armas">
              <HeaderH2>Atributos</HeaderH2>
            </div>
            <MobileText>
              • <strong>Tipo:</strong> O tipo de arma, dentre corpo-a-corpo, a
              distância e de fogo.
              <br />• <strong>Modificador de Dano:</strong> Quanto dano a arma
              adiciona ou subtrai de um ataque desferido.
              <br />• <strong>Alcance Máximo:</strong> Para armas de distância.
              A distância máxima que a arma pode atingir.
              <br />• <strong>Palavras-chave:</strong> Quaisquer propriedades
              especiais que a arma tenha, como Leve, Penetração de Armadura (X)
              e etcetera.
            </MobileText>

            <WarningBox title="Importante" type="warning">
              <MobileText>
                É importante armar as suas figuras! Uma figura sem ataques
                naturais e sem armas equipadas tem -2 em testes de luta e causa
                -2 de Dano.
              </MobileText>
            </WarningBox>

            <div id="exemplo-adaga">
              <HeaderH2>Exemplo: Adaga</HeaderH2>
            </div>
            <EquipmentDetailCard
              equipment={daggerData ?? ({} as EquipmentDetailQueryResponse)}
              loading={loading}
              error={error}
            />
            <div id="armaduras">
              <HeaderH1>Armaduras</HeaderH1>
            </div>
            <MobileText>
              Qual a melhor forma de não levar uma punhalada em uma cidade onde
              todos estão tentando deslizar uma lâmina entre suas costelas? Uma
              camada de gambenson e malha entre a ponta do punhal e sua pele,
              claro! Armaduras são a forma mais confiável de aumentar sua
              característica <strong>Armadura</strong>. Todas as armaduras
              fornecem um bônus para Armadura baseado na sua categoria, embora
              algumas ocupem mais espaços de equipamento e imponham penalidades
              a <strong>Movimento</strong>.
            </MobileText>
            <div id="atributos-armaduras">
              <HeaderH2>Atributos</HeaderH2>
            </div>
            <MobileText>
              • <strong>Bônus de Armadura:</strong> O quanto a armadura aumenta
              a Armadura.
              <br />• <strong>Penalidade de Movimento:</strong> Quanto a
              característica Movimento é penalizada.
              <br />• <strong>Palavras-chave:</strong> Quaisquer propriedades
              especiais que a arma tenha, como ocupar mais de um espaço de
              equipamento, fornecer resistência a tipos específicos e etcetera.
            </MobileText>

            <WarningBox title="Importante" type="warning">
              <MobileText>
                Uma figura nunca pode alcançar um valor de Armadura maior que
                17, independente de bônus naturais ou de equipamentos.
              </MobileText>
            </WarningBox>

            <div id="exemplo-armadura">
              <HeaderH2>Exemplo: Armadura Pesada</HeaderH2>
            </div>
            <EquipmentDetailCard
              equipment={armorData ?? ({} as EquipmentDetailQueryResponse)}
              loading={loading}
              error={error}
            />

            <div id="acessorios">
              <HeaderH1>Acessórios</HeaderH1>
            </div>
            <MobileText>
              Armas e Armaduras são excelentes na hora de lutar, mas existem
              várias outras coisas importantes a se pensar em Mordheim. Portas a
              arrombar, escuridão a desbravar e algum lugar para carregar suas
              flechas. Essa é a função dos acessórios: Embora não pareçam
              extremamente úteis a princípio, eles podem ser a diferença entre
              escapar de uma horda de zumbis subindo um cavalete portátil ou
              morrer com os ossos roídos em um beco. Escolha com sabedoria.
            </MobileText>

            <div id="exemplo-tocha">
              <HeaderH2>Exemplo: Tocha</HeaderH2>
            </div>
            <EquipmentDetailCard
              equipment={torchData ?? ({} as EquipmentDetailQueryResponse)}
              loading={loading}
              error={error}
            />

            <div id="remedios-e-venenos">
              <HeaderH1>Remédios e Venenos</HeaderH1>
            </div>
            <MobileText>
              Em Mordheim, onde cada ferimento pode ser fatal e cada cura é
              preciosa, remédios e venenos são ferramentas essenciais para a
              sobrevivência. Remédios podem salvar a vida de um guerreiro
              ferido, enquanto venenos podem garantir que um inimigo não se
              levante novamente. Cada item tem suas próprias propriedades e
              efeitos únicos.
            </MobileText>

            <div id="exemplo-lagrimas">
              <HeaderH2>Exemplo: Lágrimas de Shallya</HeaderH2>
            </div>
            <EquipmentDetailCard
              equipment={tearsData ?? ({} as EquipmentDetailQueryResponse)}
              loading={loading}
              error={error}
            />

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

export default EquipmentRulesPage;
