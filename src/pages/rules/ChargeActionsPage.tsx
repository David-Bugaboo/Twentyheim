import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import WarningBox from "../../components/WarningBox";

function ChargeActionsPage() {
  const navigationSections = [
    { id: "intro", title: "Ações de Carga", level: 0 },
    { id: "entrando-em-combate", title: "Entrando em Combate", level: 0 },
    { id: "declaracao-carga", title: "Declaração de Carga", level: 1 },
    { id: "completando-carga", title: "Completando a Carga", level: 1 },
    { id: "cargas-multiplas", title: "Cargas Múltiplas", level: 1 },
    { id: "combinando-movimentos", title: "Combinando Movimentos", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Ação de Carga</PageTitle>
            </div>

            <div id="entrando-em-combate">
              <HeaderH1>Entrando em Combate</HeaderH1>
            </div>

            <MobileText>
              A única forma de entrar em combate com uma figura inimiga é
              através de uma <strong>Declaração de Carga</strong>. Uma figura
              não pode simplesmente "andar até" um inimigo e começar a lutar —
              ela deve declarar sua intenção de atacar e seguir até o fim.
            </MobileText>

            <MobileText>
              Cargar contra um inimigo é uma ação de ímpeto! Uma corrida maluca
              rumo à violência que deve ser completada com determinação total.
            </MobileText>

            <div id="declaracao-carga">
              <HeaderH2>Declaração de Carga</HeaderH2>
            </div>

            <MobileText>
              Gastando <strong>duas ações</strong> (incluindo a ação de
              movimento), uma figura pode <strong>declarar carga</strong> contra
              uma figura inimiga que ela consiga traçar linha de visão e cuja
              distância efetiva (levando em consideração penalidades de
              movimento como terreno acidentado e escalada) entre as duas
              figuras seja menor ou igual a{" "}
              <strong>duas vezes o atributo movimento</strong> em cm do
              declarador da carga.
            </MobileText>

            <MobileText>
              Ela então deve se mover o dobro do seu movimento normal, usando
              quaisquer tipos de movimento disponíveis até que sua base toque a
              daquela figura.
            </MobileText>

            <div id="completando-carga">
              <HeaderH2>Completando a Carga</HeaderH2>
            </div>

            <MobileText>
              Se a figura que declarou a carga conseguir tocar na base de seu
              alvo, ela <strong>completa a carga</strong> e entra em combate com
              o alvo, imediatamente usando uma ação de luta como parte da ação
              de carga.
            </MobileText>

            <MobileText>
              Caso qualquer efeito interrompa seu movimento ou a figura alvo se
              mova reativamente de forma que o movimento não seja suficiente
              para encostar na base, a carga <strong>falha</strong> e não entra
              em combate.
            </MobileText>

            <WarningBox title="Não Falhar de Propósito" type="warning">
              <MobileText>
                Note que apesar da carga poder falhar, uma figura não pode
                falhar uma carga de propósito, parando de se mover ou declarando
                carga contra uma figura cujo seu movimento não seja suficiente
                para alcançar, seja naturalmente ou devido a terreno acidentado
                e outras regras de terreno.
              </MobileText>
            </WarningBox>

            <div id="cargas-multiplas">
              <HeaderH2>Cargas Múltiplas</HeaderH2>
            </div>

            <MobileText>
              Uma figura pode declarar carga contra{" "}
              <strong>mais de uma figura</strong>, contanto que seja possível
              tocar na base de ambas em alguma parte do movimento. A figura deve
              completar o movimento tocando todas as figuras declaradas como
              alvos, ou a carga falha completamente.
            </MobileText>

            <div id="combinando-movimentos">
              <HeaderH2>Combinando Movimentos em Cargas</HeaderH2>
            </div>

            <MobileText>
              Durante uma carga, as diferentes formas de movimento podem ser{" "}
              <strong>combinadas na mesma ação</strong>. Uma unidade criativa
              (ou desesperada) pode declarar uma carga e escalar um muro para
              chegar ao seu alvo, ou pular um espaço entre duas varandas, ou
              atravessar terreno acidentado para alcançar o inimigo.
            </MobileText>

            <WarningBox title="Resumo das Ações de Carga" type="info">
              <MobileText>
                • <strong>Custo:</strong> Duas ações para declarar carga
              </MobileText>
              <MobileText>
                • <strong>Alcance:</strong> Até 2x o Movimento em cm
              </MobileText>
              <MobileText>
                • <strong>Movimento:</strong> Dobro do movimento normal
              </MobileText>
              <MobileText>
                • <strong>Resultado:</strong> Entra em combate se tocar na base
              </MobileText>
              <MobileText>
                • <strong>Cargas Múltiplas:</strong> Possível, mas todas devem
                ser completadas
              </MobileText>
              <MobileText>
                • <strong>Combinar Movimentos:</strong> Escalar, pular, nadar,
                etc.
              </MobileText>
              <MobileText>
                • <strong>Falhar de Propósito:</strong> Não permitido
              </MobileText>
            </WarningBox>

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8 italic"
            >
              "Em Mordheim, hesitar é morrer. Uma carga bem executada é a
              diferença entre um cadáver e um guerreiro vivo."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default ChargeActionsPage;
