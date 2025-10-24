import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import WarningBox from "../../components/WarningBox";

function CombatActionsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Ações de Combate</PageTitle>

            <MobileText>
              O combate em Mordheim é brutal, rápido e mortal. Quando duas
              figuras se encontram em contato de base, a violência explode em
              uma dança de aço e sangue. Mas entrar em combate não é simples —
              requer coragem, oportunidade e, acima de tudo, uma{" "}
              <strong>Declaração de Carga</strong>.
            </MobileText>

            <HeaderH1>Entrando em Combate</HeaderH1>
            <MobileText>
              A única forma de entrar em combate com uma figura inimiga é
              através de uma <strong>Declaração de Carga</strong>. Não há
              exceções. Uma figura não pode simplesmente "andar até" um inimigo
              e começar a lutar — ela deve declarar sua intenção de atacar e
              seguir até o fim.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "O inquisidor viu o necromante através da névoa pútrida.
              'Arrependa-se, sacrilegioso!' rugiu, e suas pernas trovejaram
              sobre os escombros. Quatorze centímetros de fúria pura,
              contornando destroços e cadáveres até que sua base bateu contra a
              do necromante. O impacto sozinho quase derrubou o herege."
            </MobileText>

            <HeaderH2>Declaração de Carga</HeaderH2>
            <MobileText>
              No começo de sua primeira ação de movimento do turno, uma figura
              pode <strong>declarar carga</strong> contra uma figura inimiga que
              consiga traçar linha de visão e que consiga entrar em contato de
              base através de uma ação de movimento válida. Ela então deve se
              mover, usando quaisquer tipos de movimento possíveis até que sua
              base toque a daquela figura.
            </MobileText>

            <WarningBox title="Importante" type="warning">
              <strong>Importante:</strong> Como dito acima, uma figura só pode
              declarar carga na <strong>primeira ação de movimento</strong> do
              turno. Isso significa que só há uma oportunidade de carga por
              ativação. use com sabedoria.
            </WarningBox>

            <HeaderH2>Completando a Carga</HeaderH2>
            <MobileText>
              Se a figura que declarou a carga conseguir tocar na base de seu
              alvo, ela <strong>completa a carga</strong> e entra em combate com
              o alvo. Caso qualquer efeito interrompa seu movimento ou a figura
              alvo se mova reativamente de forma que o movimento não seja
              suficiente para encostar na base, a carga <strong>falha</strong> e
              não entra em combate.
            </MobileText>

            <MobileText>
              Note que apesar da carga poder falhar, uma criatura não pode
              falhar uma carga de propósito, parando de se mover ou declarando
              carga contra uma criatura cujo seu movimento não seja suficiente
              para alcançar, seja naturalmente ou devido a terreno acidentado e
              outras regras de terreno. Cargar contra um inimigo é uma ação de
              impeto! Uma corrida maluca rumo à violência deve ser completada!
            </MobileText>

            <HeaderH2>Cargas Múltiplas</HeaderH2>
            <MobileText>
              Uma figura pode declarar carga contra{" "}
              <strong>mais de uma figura</strong>, contanto que seja possível
              tocar na base de ambas em alguma parte do movimento. A figura deve
              completar o movimento tocando todas as figuras declaradas como
              alvos, ou a carga falha completamente.
            </MobileText>

            <HeaderH2>Combinando Movimentos em Cargas</HeaderH2>
            <MobileText>
              Durante uma carga, as diferentes formas de movimento podem ser{" "}
              <strong>combinadas na mesma ação</strong>. Uma unidade criativa
              (ou desesperada) pode declarar uma carga e escalar um muro para
              chegar ao seu alvo, ou pular um espaço entre duas varandas, ou
              atravessar terreno acidentado para alcançar o inimigo.
            </MobileText>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-4"
            >
              "O skaven farejou a coisa-homem no andar superior. Guinchando
              baixo, correu 8 cm através dos escombros, depois escalou 3 cm de
              parede (gastando 6 cm de movimento), e finalmente saltou 5 cm até
              a varanda onde o humano se escondia. Tudo em uma única carga. A
              coisa-homem nem teve tempo de gritar. Sim-sim, criatividade é
              sobrevivência."
            </MobileText>

            <HeaderH1>Ação de Luta</HeaderH1>
            <MobileText>
              O momento da verdade. Aço contra aço, força contra força, vida
              contra morte. Uma figura pode usar uma ação de luta{" "}
              <strong>contra uma figura que esteja em combate</strong>.
            </MobileText>

            <HeaderH2>A Rolagem de Luta</HeaderH2>
            <MobileText>
              A figura que está usando sua ação de luta rola um teste contestado
              de <strong>Ímpeto</strong>, contra uma das figuras que esteja em
              combate com ela. Ambas as figuras adicionam quaisquer
              modificadores de armas, marcadores, habilidades, magias e poderes.
            </MobileText>

            <MobileText>
              A figura que vencer esse teste contestado{" "}
              <strong>GANHA A LUTA</strong> e <strong>acerta um ataque</strong>{" "}
              , causando dano a outra figura. Simples. Brutal. Definitivo.
            </MobileText>

            <MobileText>
              <strong>Em caso de empate:</strong> Ambas as figuras acertam um
              ataque e causam dano uma à outra. Ninguém sai ileso quando aço
              encontra aço em perfeita simetria mortal.
            </MobileText>

            <WarningBox title="LUTAR COM DUAS MÃOS" type="info">
              <MobileText>
                Uma figura que esteja usando uma arma com a característica leve
                na sua mão secundária, e uma arma corpo a corpo de uma mão na
                principal, ganha <strong>+1 de Ímpeto</strong> ao lutar, mas não
                pode pegar fragmentos de pedra-bruxa por estar com ambas as mãos
                ocupadas. Quaisquer bônus de dano de armas de mão secundária são
                ignoradas, mas danos para vontade ou Ímpeto são sempre levados
                em conta.
              </MobileText>
            </WarningBox>

            <HeaderH2>Causando Dano</HeaderH2>
            <MobileText>
              Para causar dano, pegue a <strong>rolagem de Ímpeto</strong> da
              figura que ganhou a luta e some a quaisquer modificador de dano
              ganhos de armas, magias, poderes, habilidades e itens mágicos.
              Então <strong>subtraia esse valor da Armadura</strong> da figura
              que perdeu a luta. Ela recebe esse valor de dano, e subtrai dos
              seus pontos de vigor. Se o resultado for zero ou negativo, nenhum
              dano é causado — o ataque apenas resvalou no seu alvo, sem maiores
              efeitos.
            </MobileText>

            <div className="mt-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg">
              <HeaderH2 className="text-green-300 mb-2">
                Tipos Especiais de Dano e Condições
              </HeaderH2>
              <MobileText className="text-green-100 mb-4">
                Para conferir tipos especiais de dano, danos críticos e
                condições negativas causadas por ataques, consulte a página
                dedicada.
              </MobileText>
              <a
                href="/rules/negative-conditions"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Ver Dano e Condições Negativas
              </a>
            </div>

            <HeaderH2>Após a Luta</HeaderH2>
            <MobileText>
              Ao final do combate, a figura que ganhou escolhe:{" "}
              <strong>continuar em combate</strong> (mantendo as bases tocando),{" "}
              <strong>empurrar a figura perdedora 3 cm para trás</strong>,
              movendo-a essa distância, ou <strong>sair de combate</strong>,
              movendo-se até 3cm em qualquer direção, contanto que quebre o
              contato de base com a outra figura. Tenha em mente que quaisquer
              um desses movimentos pode ser interceptado normalmente, mas não
              podem ser usados para fazer uma figura mover para fora da mesa.
              Uma figura não pode declarar cargas com esse movimento.
            </MobileText>

            <HeaderH2>Cair em Cima! — A Vantagem dos Números</HeaderH2>
            <MobileText>
              Em Mordheim, honra é um luxo. Lutar limpo é coisa de tolos. Quando
              uma figura está em combate com{" "}
              <strong>mais de uma figura inimiga</strong>, ou tem{" "}
              <strong>figuras aliadas no mesmo combate</strong>, bônus são
              aplicados. Porque laminas nunca são demais.
            </MobileText>

            <HeaderH3 className="mb-3 text-white">
              Figuras de Suporte (+2)
            </HeaderH3>
            <MobileText>
              Cada figura aliada que também esteja em combate com a figura alvo
              E não esteja em combate com outra figura concede{" "}
              <strong>+2</strong>. Este bônus é cumulativo, então três figuras
              de suporte elegíveis concedem +6 de modificador.
            </MobileText>
            <HeaderH3 className="mb-3 text-white">
              Cancelamento de Bônus
            </HeaderH3>
            <MobileText>
              Note que apenas uma figura por combate pode receber modificador de
              figuras de suporte. Se ambas as figuras são elegíveis para +2,
              eles se cancelam e ambas lutam com +0. Similarmente, se uma é
              elegível para +4 e a outra para +2, a primeira luta com +2 e a
              segunda com +0.
            </MobileText>
            <HeaderH3 className="mb-3 text-white">Limite Máximo</HeaderH3>
            <MobileText>
              Uma figura nunca pode ganhar mais de <strong>+6</strong> de
              figuras de suporte. Mesmo cercada por vinte aliados, apenas três
              podem efetivamente ajudar no combate — muito mais que isso e todos
              só atrapalham uns aos outros.
            </MobileText>

            <WarningBox title="Resumo das Ações de Combate" type="info">
              <MobileText>
                • <strong>Entrar em Combate:</strong> Apenas através de
                Declaração de Carga
              </MobileText>
              <MobileText>
                • <strong>Declaração de Carga:</strong> Uma por turno, no início
                do movimento
              </MobileText>
              <MobileText>
                • <strong>Movimentos Válidos:</strong> Todos exceto Fuga
                Desesperada, Disparada, 3cm pós-combate e efeitos especiais
              </MobileText>
              <MobileText>
                • <strong>Ação de Luta:</strong> Teste contestado de Ímpeto
                (d20) + modificadores
              </MobileText>
              <MobileText>
                • <strong>Causar Dano:</strong> Rolagem de Ímpeto +
                modificadores - Armadura do alvo
              </MobileText>
              <MobileText>
                • <strong>Dano Crítico:</strong> 20 natural = +5 de dano extra
              </MobileText>
              <MobileText>
                • <strong>Após a Luta:</strong> Continuar, empurrar 3cm, ou sair
                3cm
              </MobileText>
              <MobileText>
                • <strong>Figuras de Suporte:</strong> +2 por aliado (máximo +6)
              </MobileText>
              <MobileText>
                • <strong>Combinar Movimentos:</strong> Diferentes tipos podem
                ser usados na mesma ação
              </MobileText>
            </WarningBox>

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Em Mordheim, combate é sobrevivência. Quem ataca primeiro, vive
              mais tempo. Quem hesita, morre primeiro."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default CombatActionsPage;
