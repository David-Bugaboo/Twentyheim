import MobileText from "../../../components/MobileText";
import ActionSubsection from "./ActionSubsection";
import ActionSubsubsection from "./ActionSubsubsection";
import QuoteSection from "../../../components/QuoteSection";

const CombatActionSection = () => {
  return (
    <ActionSubsection title="Ação de Luta" color="#c0392b">
      <MobileText className="mb-4">
        O momento da verdade. Aço contra aço, força contra força, vida contra
        morte. Uma figura pode declarar{" "}
        <strong>luta contra uma figura que esteja em combate</strong> com ela.
        Note: uma figura só pode entrar em combate com outra através de uma{" "}
        <strong>ação de carga</strong> ou <strong>habilidades especiais</strong>
      </MobileText>

      <ActionSubsubsection title="A Rolagem de Luta">
        <MobileText className="mb-3">
          Uma figura só pode usar essa ação se estiver em combate com outra
          figura. A figura que está usando sua ação de luta rola um teste
          contestado de <strong>Ímpeto (d20)</strong>, contra uma das criaturas
          que esteja em combate. Ambas as figuras adicionam quaisquer
          modificadores de armas, marcadores, habilidades, magias e poderes.
        </MobileText>
        <MobileText className="mb-3">
          A figura que vencer esse teste contestado{" "}
          <strong>GANHA A LUTA</strong> e causa dano a outra figura. Simples.
          Brutal. Definitivo.
        </MobileText>
        <MobileText className="mb-4">
          <strong>Em caso de empate:</strong> Ambas as figuras causam dano uma à
          outra. Ninguém sai ileso quando aço encontra aço em perfeita simetria
          mortal.
        </MobileText>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            LUTAR COM DUAS MÃOS
          </MobileText>
          <MobileText className="mb-3">
            Uma figura que esteja usando uma arma com a característica leve na
            sua mão secundária, e uma arma corpo a corpo de uma mão na
            principal, ganha <strong>+1 de ímpeto</strong> ao lutar, mas não
            pode pegar fragmentos de pedra-bruxa por estar com ambas as mãos
            ocupadas. Quaisquer bônus de dano de armas de mão secundária são
            ignoradas, mas danos para vontade ou ímpeto são sempre levados em
            conta.
          </MobileText>
        </div>
      </ActionSubsubsection>

      <ActionSubsubsection title="Causando Dano">
        <MobileText className="mb-4">
          Para causar dano, pegue a <strong>rolagem de ímpeto</strong> da figura
          que ganhou a luta e some a quaisquer modificador de dano ganhos de
          armas, magias, poderes, habilidades e itens mágicos. Então{" "}
          <strong>subtraia esse valor da Armadura</strong> da figura que perdeu
          a luta. Ela recebe esse valor de dano, e subtrai dos seus pontos de
          vigor. Se o resultado for zero ou negativo, nenhum dano é causado — o
          ataque apenas resvalou no seu alvo, sem maiores efeitos.
        </MobileText>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            DANO CRÍTICO
          </MobileText>

          <MobileText className="mb-3">
            Se uma figura ganhar uma luta ao rolar um{" "}
            <strong>20 natural</strong> na rolagem de ímpeto, ela causa{" "}
            <strong>+5 de dano</strong>. Se ambas as figuras em um combate
            rolarem um 20 natural, os críticos se anulam e elas causam dano
            normal uma a outra.
          </MobileText>
        </div>
      </ActionSubsubsection>

      <ActionSubsubsection title="Após a Luta">
        <MobileText className="mb-4">
          Ao final do combate, a figura que ganhou escolhe:{" "}
          <strong>continuar em combate</strong> (mantendo as bases tocando),{" "}
          <strong>empurrar a figura perdedora 3 cm para trás</strong>, movendo-a
          essa distância, ou Mover-se para fora de combate, movendo-se até 3cm
          em qualquer direção, contanto que quebre o contato de base com a outra
          figura. Tenha em mente que quaisquer um desses movimentos pode ser
          interceptado normalmente, mas não podem ser usados para fazer uma
          figura mover para fora da mesa. Uma figura não pode declarar cargas
          com esse movimento.
        </MobileText>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            Exemplo: Mercenário vs Orc
          </MobileText>

          <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-3">
            <MobileText className="italic text-[#a89968] mb-3">
              Gottfried havia completado uma carga contra um Minino Orc no turno
              anterior. Agora, bases tocando, cara a cara com dois metros de
              músculo verde e fedor, ele declara uma ação de luta. Sua
              Zweihander pesa em suas mãos — pelo menos a espada era confiável.
              O orc, menos.
            </MobileText>

            <MobileText className="italic text-[#a89968] mb-3">
              <strong>Gottfried rola:</strong> d20 = 14, +2 de Ímpeto do machado
              = <strong>16 total</strong>
              <br />
              <strong>O Orc rola:</strong> d20 = 10, +3 de Ímpeto ={" "}
              <strong>13 total</strong>
              <br />
              <em style={{ color: "#a89968" }}>
                O orc berrou "WAAAGH!" com toda confiança de quem nunca aprendeu
                matemática. Gottfried sorriu. Tristemente.
              </em>
            </MobileText>

            <MobileText className="italic text-[#a89968] mb-3">
              Gottfried vence! Agora calcula o dano: 16 (sua rolagem) +2 (arma
              de duas mãos) = 18. Subtrai a Armadura do Orc (12):{" "}
              <strong>6 pontos de dano</strong>. A Zweihander corta fundo na
              couraça improvisada do pele-verde. Sangue verde jorra — a cor
              favorita de Gottfried, ultimamente. O orc grita um xingamento
              gultural.
            </MobileText>

            <MobileText className="italic text-[#a89968] mb-0">
              Gottfried escolhe empurrar. O orc é arremessado 3 cm para trás,
              cambaleando como bêbado. Mas o maldito ainda está de pé. Ainda
              respira. Orcs são irritantemente difíceis de matar — algo sobre
              crânios grossos e cérebros pequenos tornando-os resistentes a
              trauma e ser um maldito cogumelo vivo. A luta não acabou, apenas
              pausou. Gottfried suspira. "Sempre duas lapadas pra matar vocês
              hein?"
            </MobileText>
          </div>
        </div>
      </ActionSubsubsection>

      <ActionSubsubsection title="Cair em Cima! — A Vantagem dos Números">
        <MobileText className="mb-4">
          Em Mordheim, honra é um luxo. Lutar limpo é coisa de tolos. Quando uma
          figura está em combate com <strong>mais de uma figura inimiga</strong>
          , ou tem <strong>figuras aliadas no mesmo combate</strong>, bônus são
          aplicados. Porque laminas nunca são demais.
        </MobileText>

        <div className="bg-[#382929] p-3 rounded mb-4">
          <MobileText className="mb-3">
            <strong style={{ color: "#d4af37" }}>
              Figuras de Suporte (+2):
            </strong>{" "}
            Cada figura aliada que também esteja em combate com a figura alvo E
            não esteja em combate com outra figura concede <strong>+2</strong>.
            Este bônus é cumulativo, então três figuras de suporte elegíveis
            concedem +6 de modificador.
          </MobileText>

          <MobileText className="mb-3">
            <strong style={{ color: "#d4af37" }}>Cancelamento de Bônus:</strong>{" "}
            Note que apenas uma figura por combate pode receber modificador de
            figuras de suporte. Se ambas as figuras são elegíveis para +2, eles
            se cancelam e ambas lutam com +0. Similarmente, se uma é elegível
            para +4 e a outra para +2, a primeira luta com +2 e a segunda com
            +0.
          </MobileText>

          <MobileText>
            <strong style={{ color: "#d4af37" }}>Limite Máximo:</strong> Uma
            figura nunca pode ganhar mais de <strong>+6</strong> de figuras de
            suporte. Mesmo cercada por vinte aliados, apenas três podem
            efetivamente ajudar no combate — muito mais que isso e todos só
            atrapalham uns aos outros.
          </MobileText>
        </div>

        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929]">
          <MobileText className="italic text-[#a89968] mb-3">
            Três mercenários cercam um único Orc Nob. Klaus ataca, enquanto seus
            dois companheiros também estão em combate com o pele-verde (mas não
            lutando com outras figuras).
          </MobileText>

          <MobileText className="italic text-[#a89968] mb-3">
            <strong>Klaus recebe +4</strong> (dois aliados × +2 cada).
            <br />
            <strong>O Orc recebe +0</strong> (sem aliados).
            <br />
            Klaus rola d20 = 8, +3 de Ímpeto, +4 de suporte ={" "}
            <strong>15</strong>
            <br />
            Orc rola d20 = 12, +3 de Ímpeto = <strong>15</strong>
          </MobileText>

          <MobileText className="italic text-[#a89968] mb-0">
            Empate — 15 contra 15. Ambos se chocam, aço contra aço. Ambos
            calculam dano. Klaus: 15 +2 (Arma de duas mãos) = 17 - 12 (Armadura
            Pesada) = <strong>5 de dano no orc</strong>. O Orc: 15 (Arma de Mão)
            = 15 - 11 (Armadura Leve) = <strong>4 de dano em Klaus</strong>. O
            orc rosna, sangrando. Klaus cospe sangue, também sangrando. Cercado
            mas não dominado, o pele-verde sorri com presas ensanguentadas.
            Klaus murmura para seus homens, segurando as costelas: "Próxima vez,
            um de vocês também ataca. Três espadas são um cabra desse a menos...
            e minhas costelas agradecem.". Apesar de ter repreendido seus
            homens, no fundo ele sabe que sem o suporte deles, o Orc teria
            machucado mais que suas costelas. Bem mais.
          </MobileText>
        </div>
      </ActionSubsubsection>
    </ActionSubsection>
  );
};

export default CombatActionSection;
