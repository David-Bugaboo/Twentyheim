import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import WarningBox from "../../components/WarningBox";

function ReactionsPage() {
  const navigationSections = [
    { id: "intro", title: "Reações", level: 0 },
    { id: "o-que-sao", title: "O que são Reações?", level: 0 },
    { id: "limite-reacoes", title: "Limite de Reações", level: 0 },
    { id: "interceptacao", title: "Interceptação", level: 0 },
    { id: "vigilia", title: "Vigília", level: 0 },
    { id: "outras-reacoes", title: "Outras Reações", level: 0 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Reações</PageTitle>
            </div>

            <div id="o-que-sao">
              <HeaderH1>O que são Reações?</HeaderH1>
            </div>
            <MobileText>
              Reações são ações desencadeadas que permitem às figuras responder
              a eventos específicos durante o jogo. Ao contrário das ações
              normais que uma figura executa durante sua própria ativação, as
              reações são disparadas por eventos que ocorrem fora do turno da
              figura — seja pelo movimento de um inimigo, por um ataque
              recebido, ou por qualquer outro gatilho específico definido pela
              habilidade ou magia.
            </MobileText>

            <MobileText>
              Essas ações reativas são fundamentais para a dinâmica de combate
              defensivo e tático. Elas transformam seu guerreiro de um simples
              alvo em uma figura que pode responder ativamente às ameaças ao seu
              redor, mesmo quando não é sua vez de agir.
            </MobileText>

            <div id="limite-reacoes">
              <HeaderH1>Limite de Reações</HeaderH1>
            </div>

            <WarningBox title="Regra Geral" type="warning">
              <MobileText>
                <strong>
                  Uma figura tem apenas uma reação por turno de jogo
                </strong>
                , a não ser que algum efeito específico diga o contrário.
              </MobileText>
            </WarningBox>

            <MobileText>
              Este limite representa a capacidade natural de uma figura de se
              concentrar e reagir rapidamente a situações perigosas. Uma vez que
              uma reação é usada, a figura precisa esperar até o próximo turno
              para usar outra reação.
            </MobileText>

            <MobileText>
              Algumas habilidades ou magias podem conceder reações adicionais ou
              modificar este limite, mas essas são exceções claramente
              especificadas na descrição da habilidade.
            </MobileText>

            <HeaderH1 className="mt-6">
              Reações Extras por diferença de modelos
            </HeaderH1>
            <MobileText>
              Em partidas <strong>1v1</strong>, quando um bando termina todas as
              suas ativações antes do oponente, a partir desse momento, para
              cada ativação que o <strong>oponente realizar</strong>, o bando
              que já terminou suas ativações ganha{" "}
              <strong>1 reação extra</strong> que pode ser usada{" "}
              <strong>apenas durante aquela ativação</strong> do oponente.
            </MobileText>
            <MobileText>
              Uma mesma figura só pode usar <strong>uma</strong> dessas reações
              extras por turno.
            </MobileText>

            <div id="interceptacao">
              <HeaderH1>Interceptação, Vigília e Aparar</HeaderH1>
            </div>

            <WarningBox title="Reações Universais" type="info">
              <MobileText>
                <strong>
                  Interceptação e Vigília são as únicas reações que qualquer
                  figura pode usar
                </strong>{" "}
                em um turno, sem precisar de habilidades ou magias específicas.
              </MobileText>
              <MobileText>
                Embora Qualquer figura possa usar a reação Aparar, ela só pode
                ser usada se a figura estiver equipada com uma ou mais armas com
                a palavra-chave
                <strong>Aparar</strong> ou tiver habilidades que permitam usar
                mesmo sem armas específicas.
              </MobileText>
            </WarningBox>

            <HeaderH2>Interceptação</HeaderH2>

            <MobileText>
              A interceptação é uma reação fundamental do jogo, permitindo que
              qualquer figura possa intervir quando um inimigo se move muito
              perto dela.
            </MobileText>

            <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 my-6">
              <HeaderH2 className="text-green-300 mb-4">
                Como Funciona a Interceptação
              </HeaderH2>

              <MobileText className="mb-3">
                Se uma figura inimiga fizer um movimento a até{" "}
                <strong>3cm de distância</strong> de uma figura que tenha{" "}
                <strong>linha de visão</strong> contra ela, esta pode declarar
                uma <strong>interceptação</strong>. Uma figura não pode
                interceptar uma figura inimiga se ela for o alvo de uma carga desta
                figura inimiga.
              </MobileText>

              <MobileText className="mb-3">
                Quando uma interceptação é declarada:
              </MobileText>

              <MobileText className="mb-2 ml-4">
                • A figura que declarou interceptação move a figura inimiga que
                estava se movendo até que esta encoste em sua base
              </MobileText>

              <MobileText className="mb-4 ml-4">
                • As duas figuras agora estão <strong>em combate</strong> e a
                figura reagindo pode usar uma ação de luta imediatamente, como
                parte da reação. Isso não conta como completar uma carga.
              </MobileText>
            </div>

            <HeaderH2>Vigília</HeaderH2>

            <MobileText>
              A Vigília é uma reação que permite a uma figura montar uma posição
              defensiva de longo alcance, pronta para atacar inimigos que se
              aproximam.
            </MobileText>

            <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 my-6">
              <HeaderH2 className="text-green-300 mb-4">
                Como Funciona a Vigília
              </HeaderH2>

              <MobileText className="mb-2 ml-4">
                Se uma figura inimiga entra dentro de metade do alcance de uma
                arma a distância equipada por uma figura, ela pode usar uma
                reação de vigília.
              </MobileText>

              <MobileText className="mb-4 ml-4">
                • Efeito: a figura usando a reação de vigília pode{" "}
                <strong>atirar na figura alvo</strong> que desencadeou a reação.
              </MobileText>
            </div>

            <HeaderH2>Aparar</HeaderH2>

            <MobileText>
              Aparar é uma reação que permite a uma figura defletir um ataque
              corpo a corpo que normalmente a atingiria. Essa reação só pode ser
              usada se a figura tiver um equipamento com a palavra-chave
              "Aparar" ou uma habilidade específica que permite que use a
              reação.
            </MobileText>

            <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 my-6">
              <HeaderH2 className="text-green-300 mb-4">
                Como Funciona Aparar
              </HeaderH2>

              <MobileText className="mb-2 ml-4">
                • Uma figura que <strong>perca uma luta</strong> pode usar a
                seguinte reação:
              </MobileText>

              <MobileText className="mb-2 ml-4">
                • Gatilho: quando uma figura inimiga{" "}
                <strong>causaria dano corpo a corpo</strong> após vencer uma
                luta.
              </MobileText>

              <MobileText className="mb-4 ml-4">
                • Efeito: a figura que tomaria o dano pode{" "}
                <strong>aparar o ataque</strong> fazendo outra rolagem de
                Ímpeto, mas sem aplicar bônus ganhos específicamente por
                completar cargas. Caso sua nova rolagem seja maior que a rolagem
                inimiga, a figura não toma dano daquele ataque, embora ainda
                seja considerada perdedora da luta para outros efeitos. Uma
                figura não pode aparar ataques de uma figura cujo bônus de
                Ímpeto usado no teste de luta seja mais que o dobro do seu. Uma
                figura com equipamentos com a palavra-chave "Aparar" em ambas as
                mãos ganha +2 na sua rolagem para essa reação.
              </MobileText>
            </div>

            <div id="outras-reacoes">
              <HeaderH1>Outras Reações</HeaderH1>
            </div>

            <MobileText>
              Todas as outras reações disponíveis no jogo são resultado de{" "}
              <strong>habilidades específicas</strong> ou{" "}
              <strong>magias</strong>.
            </MobileText>

            <WarningBox title="Importante" type="info">
              <MobileText>
                Cada habilidade que concede uma reação especifica claramente:
              </MobileText>
              <MobileText className="mt-2">
                • Quando a reação pode ser usada (seu gatilho)
              </MobileText>
              <MobileText>• O efeito da reação</MobileText>
              <MobileText>
                • Se ela conta contra o limite de uma reação por turno ou não
              </MobileText>
            </WarningBox>

            <MobileText className="mt-6">
              Escolher habilidades que concedem reações é uma estratégia
              defensiva poderosa, transformando seus guerreiros em figuras
              resilientes capazes de responder a ameaças de forma proativa.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default ReactionsPage;
