import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import WarningBox from "../../components/WarningBox";
import QuickNavigation from "../../components/QuickNavigation";

function MovementActionsPage() {
  const navigationSections = [
    { id: "intro", title: "Ações de Movimento", level: 0 },
    {
      id: "restricao-combate",
      title: "Restrição: Figuras em Combate",
      level: 1,
    },
    { id: "movimento-normal", title: "Movimento Normal", level: 0 },
    { id: "escalar", title: "Escalar", level: 0 },
    { id: "pular", title: "Pular", level: 0 },
    { id: "queda", title: "Queda", level: 0 },
    { id: "terreno-acidentado", title: "Terreno Acidentado", level: 0 },
    { id: "natacao", title: "Natação", level: 0 },
    { id: "agua-rasa", title: "Água Rasa", level: 1 },
    { id: "agua-profunda", title: "Água Profunda", level: 1 },
    { id: "fuga-desesperada", title: "Fuga Desesperada", level: 0 },
    { id: "acao-disparada", title: "Ação de Disparada", level: 0 },
    { id: "combinando-movimentos", title: "Combinando Movimentos", level: 0 },
    { id: "interceptacao", title: "Interceptação", level: 0 },
    { id: "resumo", title: "Resumo das Ações de Movimento", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Ações de Movimento</PageTitle>
            </div>

            <MobileText>
              A figura pode se mover das seguintes formas durante seu turno:
            </MobileText>

            <div id="restricao-combate">
              <WarningBox title="Restrição: Figuras em Combate" type="warning">
                <MobileText>
                  <strong>Uma figura em combate não pode se mover</strong>{" "}
                  através de ações de movimento normais. Figuras em combate só
                  podem se mover caso vençam o combate e optem por ou empurrar o
                  inimigo 3cm para trás ou se afastar 3cm, ambas as opções
                  encerrando o combate e permitindo movimento. ouemuma a através
                  de habilidades especiais.
                </MobileText>
              </WarningBox>
            </div>

            <div id="movimento-normal">
              <HeaderH1>Movimento Normal</HeaderH1>
            </div>
            <MobileText>
              A miniatura pode se mover uma distância de até seu{" "}
              <strong>atributo de Movimento em centímetros</strong>. Durante este
              movimento, ela pode se virar quanto quiser, fazer qualquer tipo de
              curva, e atravessa automaticamente qualquer obstáculo com menos de
              2 cm de altura. Contudo, esse movimento deve ser estritamente{" "}
              <strong>horizontal</strong>. Esse movimento não pode ser usado
              para entrar em contato de base com uma figura inimiga.
            </MobileText>

            <div id="escalar">
              <HeaderH1>Escalar</HeaderH1>
            </div>
            <MobileText>
              Uma miniatura pode escalar superfícies verticais como muros e
              paredes. Para tal, ela se move ao longo de seu comprimento
              vertical da parede ou obstáculo, gastando{" "}
              <strong>2 cm de movimento para cada 1 cm de escalada</strong>. Uma
              figura que termine seu movimento escalando cai no chão ao final do
              movimento, seguindo as regras normais de queda. Esse movimento não
              pode ser usado para entrar em contato de base com uma figura
              inimiga.
            </MobileText>

            

            <div id="pular">
              <HeaderH1>Pular</HeaderH1>
            </div>
            <MobileText>
              Uma figura pode declarar um pulo. Ela pode se mover uma distância
              horizontal, vertical ou ambos de até <strong>10 cm</strong>, não
              sendo afetado por queda ou altura durante esse movimento, mas deve
              ter se movido normalmente a distância que deseja pular antes de
              declarar um pulo. Se uma criatura termina seu pulo no ar, ela cai
              ao final do movimento, seguindo regras de queda. A distância
              percorrida no pulo não conta contra o movimento de uma criatura.
              Se não percorrer nenhuma distância, a figura ainda pode pular 3cm.
              Esse movimento não pode ser usado para entrar em contato de base
              com uma figura inimiga.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "Klaus correu pelos escombros, ganhando impulso. Oito centímetros
              de corrida furiosa antes de saltar sobre o abismo de 8 cm entre os
              edifícios. Por um momento, pairou no ar, suspenso entre vida e
              morte. Aterrizou do outro lado com um baque, rolando para absorver
              o impacto. Atrás dele, seus perseguidores hesitaram na beira do
              prédio anterior."
            </MobileText>

            <div id="queda">
              <HeaderH1>Queda</HeaderH1>
            </div>
            <MobileText>
              Uma figura pode cair até{" "}
              <strong>8 cm sem tomar nenhum tipo de dano</strong>. Se cair mais
              que isso, tome de dano igual a{" "}
              <strong>metade da distância caída</strong>.
            </MobileText>

            

            <div id="terreno-acidentado">
              <HeaderH1>Terreno Acidentado</HeaderH1>
            </div>
            <MobileText>
              Criatura gasta <strong>2 cm de movimento para cada 1 cm</strong>{" "}
              que se move em terreno acidentado. Criaturas montadas além disso
              rolam na tabela de "Opa garoto!".
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "O soldado mergulhou nos escombros — pedras soltas, vigas
              quebradas, corpos em decomposição. Cada passo era uma armadilha.
              Seu movimento de 16 cm minguou para míseros 8 cm através da ruína.
              Atrás dele, o cavaleiro montado tentou seguir, mas seu cavalo
              tropeçou nas pedras irregulares."
            </MobileText>

            <div id="natacao">
              <HeaderH1>Natação</HeaderH1>
            </div>

            <div id="agua-rasa">
              <HeaderH2>Água Rasa</HeaderH2>
            </div>
            <MobileText>
              Terreno de Água rasa apenas conta como terreno acidentado, e não
              oferece nenhuma outra penalidade além disso.
            </MobileText>

            <div id="agua-profunda">
              <HeaderH2>Água Profunda</HeaderH2>
            </div>
            <MobileText>
              Água profunda é muito complexa de navegar e figuras que queiram
              cruzá-la devem nadar. Figura deve rolar um teste de Ímpeto (CD 5).
              Adicione modificadores de natação de acordo com a tabela
              específica. Se tiver sucesso, pode ativar normalmente, embora
              tratando a água como terreno acidentado. Se falhar, perde a
              ativação e toma dano igual ao quanto falhou o teste.
            </MobileText>

            <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333] mb-4">
              <HeaderH3 className="mb-3 text-center text-white">
                Tabela de Modificadores de Natação
              </HeaderH3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[#555]">
                      <th className="text-left py-3 px-4 text-white font-semibold">
                        Tipo de Armadura
                      </th>
                      <th className="text-center py-3 px-4 text-white font-semibold">
                        Modificador
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#333] hover:bg-[#2a2a2a]">
                      <td className="py-3 px-4 text-[#e0e0e0]">
                        Armadura Leve
                      </td>
                      <td className="text-center py-3 px-4 text-[#e0e0e0] font-semibold">
                        -2
                      </td>
                    </tr>
                    <tr className="border-b border-[#333] hover:bg-[#2a2a2a]">
                      <td className="py-3 px-4 text-[#e0e0e0]">
                        Armadura Pesada
                      </td>
                      <td className="text-center py-3 px-4 text-[#e0e0e0] font-semibold">
                        -5
                      </td>
                    </tr>
                    <tr className="border-b border-[#333] hover:bg-[#2a2a2a]">
                      <td className="py-3 px-4 text-[#e0e0e0]">Escudo</td>
                      <td className="text-center py-3 px-4 text-[#e0e0e0] font-semibold">
                        -1
                      </td>
                    </tr>
                    <tr className="hover:bg-[#2a2a2a]">
                      <td className="py-3 px-4 text-[#e0e0e0]">
                        Carregando Tesouro
                      </td>
                      <td className="text-center py-3 px-4 text-[#e0e0e0] font-semibold">
                        -2
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            

            <div id="fuga-desesperada">
              <HeaderH1>Fuga Desesperada</HeaderH1>
            </div>
            <MobileText>
              Uma figura pode gastar sua primeira ação do turno para tomar uma
              ação de fuga desesperada. Ao tomar essa ação, ela se move até{" "}
              <strong>8 cm</strong>, independente de quaisquer penalidades de
              movimento e terreno. A ativação da figura então termina
              imediatamente. Esse movimento não pode ser usado para entrar em
              contato de base com uma figura inimiga.
            </MobileText>

            

            <div id="acao-disparada">
              <HeaderH1>Ação de Disparada</HeaderH1>
            </div>
            <MobileText>
              Uma figura pode gastar sua segunda ação do turno para se mover
              novamente, seguindo as mesmas regras de movimento descritas acima,
              mas tendo apenas{" "}
              <strong>metade do seu valor de agilidade para o movimento</strong>
              . Esse movimento não pode ser usado para entrar em contato de base
              com uma figura inimiga.
            </MobileText>

            

            <div id="combinando-movimentos">
              <HeaderH1>Combinando Movimentos</HeaderH1>
            </div>
            <MobileText>
              As diferentes formas de movimento podem ser{" "}
              <strong>combinadas durante a mesma ação</strong>. Uma figura
              criativa pode escalar um muro, depois pular para outra plataforma,
              atravessar terreno acidentado, ou até mesmo nadar através de água
              rasa — tudo em um único movimento.
            </MobileText>

            

            <div id="interceptacao">
              <HeaderH1>Interceptação</HeaderH1>
            </div>
            <MobileText>
              Se uma figura fizer um movimento a até 3cm de uma figura inimiga
              que tenha linha de visão contra ela, esta pode declarar uma{" "}
              <strong>interceptação</strong>. A figura que declarou
              interceptação move a figura que estava se movendo até que esta
              encoste em sua base. As duas figuras agora estão em combate.
            </MobileText>

            

            <div id="resumo">
              <WarningBox title="Resumo das Ações de Movimento" type="info">
                <MobileText>
                  • <strong>Movimento Normal:</strong> Até Movimento em cm
                </MobileText>
                <MobileText>
                  • <strong>Escalar:</strong> 2 cm de movimento para cada 1 cm
                  vertical
                </MobileText>
                <MobileText>
                  • <strong>Pular:</strong> Até 10 cm (horizontal/vertical)
                </MobileText>
                <MobileText>
                  • <strong>Queda:</strong> Até 8 cm sem dano, depois metade da
                  distância
                </MobileText>
                <MobileText>
                  • <strong>Terreno Acidentado:</strong> 2 cm de movimento para
                  cada 1 cm
                </MobileText>
                <MobileText>
                  • <strong>Natação:</strong> Teste de Ímpeto (CD 5) com
                  modificadores
                </MobileText>
                <MobileText>
                  • <strong>Fuga Desesperada:</strong> 8 cm, ignora penalidades
                </MobileText>
                <MobileText>
                  • <strong>Disparada:</strong> Metade da Movimento como segunda ação
                </MobileText>
                <MobileText>
                  • <strong>Combinar Movimentos:</strong> Diferentes tipos podem
                  ser usados na mesma ação
                </MobileText>
                <MobileText>
                  • <strong>Interceptação:</strong> Pode interceptar movimento a
                  até 3cm
                </MobileText>
              </WarningBox>
            </div>

            
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default MovementActionsPage;
