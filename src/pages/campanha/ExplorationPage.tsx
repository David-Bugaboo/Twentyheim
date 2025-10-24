import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";

import GenericTable from "../../components/GenericTable";
import { useNavigate } from "react-router-dom";

function ExplorationPage() {
  const navigate = useNavigate();

  const shardsFound = [
    {
      "Soma das Rolagens": "1-16",
      "Fragmentos de Pedra-Bruxa Encontrados": "1",
    },
    {
      "Soma das Rolagens": "17-33",
      "Fragmentos de Pedra-Bruxa Encontrados": "2",
    },
    {
      "Soma das Rolagens": "34-50",
      "Fragmentos de Pedra-Bruxa Encontrados": "3",
    },
    {
      "Soma das Rolagens": "51-67",
      "Fragmentos de Pedra-Bruxa Encontrados": "4",
    },
    {
      "Soma das Rolagens": "68-84",
      "Fragmentos de Pedra-Bruxa Encontrados": "5",
    },
    {
      "Soma das Rolagens": "85-99",
      "Fragmentos de Pedra-Bruxa Encontrados": "6",
    },
    {
      "Soma das Rolagens": "100+",
      "Fragmentos de Pedra-Bruxa Encontrados": "7",
    },
  ];
  const explorationEvent = [
    {
      Evento: "O Poço",
      "Tipo de rolagem": "Duplos",
      números: "1-5",
    },
  ];
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Fase de Atividades</PageTitle>
            <MobileText>
              Os Hérois do bando são líderes capazes de executar diversas
              atividades e tarefas para o bando, desde entrar nas feiras
              sombrias de Mordheim para buscar itens, até se infiltrar nas
              tavernas sujas das cidades em volta para buscar mercenários para
              seus ranques. As diversas atividades que os Hérois podem fazer
              serão descritas abaixo.
            </MobileText>
            <HeaderH1>Quem pode fazer atividades</HeaderH1>
            <MobileText>
              Apenas líderes e hérois podem realizar atividades. Não que o resto
              do bando fique bebendo ou perdidos em um corpo de cerveja enquanto
              os seus líderes se matam de trabalhar: Eles estão sendo
              coordenados pelos seus superiores. Cada héroi pode executar apenas
              uma atividade durante essa etapa da fase de campanha.
            </MobileText>
            <HeaderH1>Atividades Fora de Jogo</HeaderH1>
            <HeaderH2>Conjurar Ritual</HeaderH2>
            <MobileText>
              Conjuradores com acesso a rituais podem conjurá-los durante esse
              momento. Conjurar uma magia dessa forma gasta um tempo
              considerável, desde o preparo até a conjuração em si.
            </MobileText>
            <HeaderH2>Usar Habilidades Fora do Jogo</HeaderH2>
            <MobileText>
              Algumas habilidades tem como gatilho "Fora do Jogo, na etapa de
              Atividades da Fase de Campanha." O héroi as usa nessa fase. Essas
              habilidades exigem preparo, consumindo o tempo do héroi na fase de
              campanha.
            </MobileText>
            <HeaderH2>Exploração</HeaderH2>
            <MobileText>
              Para cada Héroi enviado para as ruínas, o jogador rola um dado,
              para um máximo de 6. Os dados rolados são chamados de{" "}
              <strong>dados de exploração</strong>. O jogador então soma seus
              dados de exploração após aplicar quaisquer bonus dados por
              habilidades. Pegue o resultado e compare com a tabela abaixo para
              determinar quantos fragmentos de pedra-bruxa foram encontrados na
              exploração.
            </MobileText>
            <GenericTable data={shardsFound} scrollable={false} />
            Caso o jogador role dois ou mais números iguais nos dados de
            exploração, ele desencadeira um evento de exploração! Nesse caso o
            jogador define qual a range dos numeros iguais. Por exemplo, uma
            rolagem de 5,5,8,12,7 desencaderia evento de exploração "O Poço", já
            que o jogador rolou dois números iguais entre 1 e 5, o próprio
            número 5:
            <GenericTable data={explorationEvent} scrollable={false} />
            <MobileText>
              Consulte a página de Eventos de Exploração para uma descrição
              completa deles e a tabela de eventos possíveis.
            </MobileText>
            <div className="mt-4 mb-6 flex justify-center">
              <button
                onClick={() => navigate("/campaign/exploration-events")}
                className="w-full md:w-1/2 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-bold"
              >
                Ver Eventos de Exploração
              </button>
            </div>
            <HeaderH2>Procurar no Mercado Negro</HeaderH2>
            <MobileText>
              Para cada um dos Hérois enviados para procurar no mercado negro,
              ele escolhe um item qualquer (Armas, Armaduras, Acessórios ou
              Remédios e Poções) com Raridade não comum. Ele então rola um
              dado, o <strong>dado de busca</strong>. Se o jogador rolar mais
              que a raridade do item escolhido, ele encontra o item no mercado
              negro e pode comprá-lo.
            </MobileText>
            
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default ExplorationPage;
