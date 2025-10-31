import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import GenericTable from "../../components/GenericTable";
import UnitCard from "../../components/UnitCard";
import legendsData from "./data/lendas.data.json";

function LegendsPage() {
  const navigationSections = [
    { id: "intro", title: "Dramatis Personae", level: 0 },
    { id: "procurando-lendas", title: "Procurando Lendas", level: 0 },
    { id: "taxa-contratacao", title: "Taxa de Contratação", level: 0 },
    {
      id: "experiencia-ferimentos",
      title: "Experiência, Ferimentos e Equipamento",
      level: 0,
    },
    { id: "lista-lendas", title: "Lista de Lendas", level: 0 },
    ...legendsData.map((legend) => ({
      id: legend.id,
      title: legend.name,
      level: 1,
    })),
  ];

  // Criar tabela de lendas
  const legendsTable = legendsData.map((legend) => ({
    Nome: legend.name,
    Custo: legend.stats.cost,
    Manutenção: legend.stats.upkeep,
    Qualidade: legend.qualidade,
    Disponibilidade: Array.isArray(legend.availability)
      ? legend.availability.join(", ")
      : legend.availability,
  }));

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Lendas</PageTitle>
            </div>

            <MobileText>
              Esta seção detalha alguns dos mais estranhos e famosos (ou
              infames) personagens encontrados em Mordheim e nos assentamentos
              em volta. Ocasionalmente, esses guerreiros se juntam às forças de
              um bando (geralmente exigindo Pedra-bruxa ou um saco de ouro como
              pagamento).
            </MobileText>

            <MobileText>
              Os seguintes personagens (conhecidos como 'Lendas') são difíceis
              de encontrar e caros para contratar – você deve ter sorte e ser
              rico para atrair sua atenção.
            </MobileText>

            <MobileText>
              Esta lista não inclui, de forma alguma, todos os guerreiros
              famosos e assassinos de coração frio que você poderia encontrar na
              Cidade dos Condenados. Existem famosos caçadores de ouro Anões,
              Burgomestres da Guilda dos Mercadores, Theodor, o atirador de
              Hochland, e muitos outros. Na verdade, esperamos que os
              personagens detalhados aqui inspirem os jogadores a inventar
              lendas próprias.
            </MobileText>

            <MobileText>
              <strong>Restrições:</strong> Uma lenda só pode existir em um bando
              por vez! Eles são hérois únicos, e não podem estar em dois lugares
              ao mesmo tempo.
            </MobileText>

            <div id="procurando-lendas">
              <HeaderH1>Procurando Lendas</HeaderH1>
            </div>

            <MobileText>
              na etapa de atividades da fase de campanha, você pode enviar
              qualquer número de seus Heróis para procurar uma lenda. Heróis que
              foram reduzidos a 0 de vida na última batalha não podem se juntar
              à busca porque estão se recuperando de seus ferimentos.
            </MobileText>

            <MobileText>
              Decida qual lenda você está procurando e quantos Heróis foram
              enviados para procurá-la. Role um D20 para cada Herói. Se qualquer
              dado tiver um resultado maior que 16, o Herói encontrou a lenda.
            </MobileText>

            <GenericTable
              data={[
                {
                  Passo: "1",
                  Ação: "Decida qual lenda procurar",
                  Detalhes: "Escolha uma lenda específica da lista",
                },
                {
                  Passo: "2",
                  Ação: "Envie Heróis para procurar",
                  Detalhes: "Apenas Heróis podem procurar (não feridos)",
                },
                {
                  Passo: "3",
                  Ação: "Role 1D6 por buscador",
                  Detalhes: "Cada Herói rola um dado",
                },
                {
                  Passo: "4",
                  Ação: "Verifique sucesso",
                  Detalhes: "Se rolar abaixo da Iniciativa = encontrou",
                },
                {
                  Passo: "5",
                  Ação: "Pague taxa de contratação",
                  Detalhes: "Se encontrou e pode pagar",
                },
              ]}
              scrollable={false}
            />

            <div id="taxa-contratacao">
              <HeaderH1>Taxa de Contratação</HeaderH1>
            </div>

            <MobileText>
              O bando deve pagar a taxa de contratação da lenda quando ela for
              recrutada, e após cada batalha que ela lutar, incluindo a
              primeira, você deve pagar uma taxa de manutenção. Essas taxas são
              indicadas nas suas fichas. Se você não tiver coras suficientes
              para pagar pela lenda, ela deixa o bando.
            </MobileText>

            <div id="experiencia-ferimentos">
              <HeaderH1>Experiência, Ferimentos e Equipamento</HeaderH1>
            </div>

            <MobileText>
              <strong>Equipamento:</strong> As lendas têm seu próprio
              equipamento. Apenas elas podem usar este equipamento; não pode ser
              dado a outros guerreiros. Além disso, você não pode comprar armas
              ou equipamentos extras para uma lenda.
            </MobileText>

            <MobileText>
              <strong>Experiência:</strong> As lendas não ganham pontos de
              Experiência, embora sofram ferimentos sérios, assim como Heróis,
              se forem postas fora de ação.
            </MobileText>

            <MobileText>
              <strong>Qualidade do Bando:</strong> A descrição de cada lenda diz
              quanto adicionar à qualidade do seu bando por incluí-las.
              <a href="/rules/warband-quality">
                Recalcule a qualidade do bando
              </a>{" "}
              sempre que uma lenda for contratada.
            </MobileText>

            <div id="lista-lendas">
              <HeaderH1>Lista de Lendas</HeaderH1>
            </div>

            <GenericTable data={legendsTable} scrollable={true} />

            <HeaderH2>Detalhes das Lendas</HeaderH2>

            {legendsData.map((legend) => (
              <div key={legend.id} id={legend.id}>
                <UnitCard
                  id={legend.id}
                  name={legend.name}
                  role={legend.role}
                  stats={legend.stats}
                  lore={legend.lore}
                  availability={legend.availability}
                  qualidade={
                    legend.qualidade ? String(legend.qualidade) : undefined
                  }
                  spellAffinity={
                    "spellAffinity" in legend
                      ? (legend as any).spellAffinity
                      : undefined
                  }
                  abilities={legend.abilities}
                />
              </div>
            ))}

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8 italic"
            >
              "Em Mordheim, até mesmo as lendas têm um preço, e aqueles que
              podem pagá-lo descobrem que o poder vem com um custo terrível."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default LegendsPage;
