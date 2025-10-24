import MobileText from "../../../components/MobileText";
import ActionSubsection from "./ActionSubsection";
import ActionSubsubsection from "./ActionSubsubsection";

const ChargeActionSection = () => {
  return (
    <ActionSubsection title="Carga: Entrando em Combate!" color="#e74c3c">
      <ActionSubsubsection title="Declarar Carga">
        <MobileText className="mb-3">
          No começo de sua ação de movimento, uma figura pode{" "}
          <strong>declarar carga</strong>
          contra uma figura inimiga que enxerga. Ela então deve se mover, usando
          quaisquer tipos de movimento possíveis até que sua base toque a
          daquela figura.
        </MobileText>
      </ActionSubsubsection>

      <ActionSubsubsection title="Completar a Carga">
        <MobileText className="mb-3">
          Se a figura que declarou a carga conseguir tocar na base de seu alvo,
          ela
          <strong>completa a carga</strong> e entra em combate com o alvo. Caso
          qualquer efeito interrompa seu movimento ou a figura alvo se mova
          reativamente de forma que o movimento não seja suficiente para
          encostar na base, a carga <strong>falha</strong> e não entra em
          combate. Note, que apesar da carga poder falhar, uma figura não pode
          falhar uma carga de propósito, parando de se mover ou declarando carga
          contra uma figura cujo seu movimento não seja suficiente para
          alcançar, seja naturalmente ou devido a terreno acidentado e outras
          regras de terreno. Cargar contra um inimigo é uma ação de impeto! uma
          corrida maluca rumo a violência deve ser completada!
        </MobileText>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-4">
          <MobileText className="italic text-[#a89968] mb-0">
            O inquisidor viu o necromante através da névoa pútrida.
            "Arrependa-se, sacrilegioso!" rugiu, e suas pernas trovejaram sobre
            os escombros. Quatorze centímetros de fúria pura, contornando
            destroços e cadáveres até que sua base bateu contra a do necromante.
            O impacto sozinho quase derrubou o herege.
          </MobileText>
        </div>
      </ActionSubsubsection>

      <ActionSubsubsection title="Interceptando">
        <MobileText className="mb-3">
          Se uma figura fizer um movimento a até 3cm de uma figura inimiga que
          tenha linha de visão contra ela, esta pode declarar uma{" "}
          <strong>interceptação</strong>. A figura que declarou interceptação
          move a figura que estava se movendo até que está encoste em sua base.
          As duas figuras agora estão em combate. Uma figura que está durante um
          movimento de car
        </MobileText>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-4">
          <MobileText className="italic text-[#a89968] mb-0">
            A Matriarca viu o Possuído correndo em direção à Noviça indefesa.
            "Não passará!" gritou, lançando-se no caminho do demônio. O Possuído
            estava a apenas 2cm quando ela interceptou, forçando-o a desviar
            para colidir com ela em vez da jovem. Aço sagrado encontrou carne
            corrompida, e a Noviça foi salva por uma irmã mais experiente.
          </MobileText>
        </div>
      </ActionSubsubsection>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Combinando Movimentos
        </MobileText>
        <MobileText className="mb-3">
          As diferentes formas de movimento podem ser{" "}
          <strong>combinadas durante a mesma ação</strong>. Uma unidade criativa
          (ou desesperada) pode declarar uma carga e escalar um muro para chegar
          ao seu alvo, ou pular um espaço entre duas varandas durante um
          movimento normal, ou atravessar terreno acidentado enquanto dispara
          para fugir de de uma multidão de fanáticas.
        </MobileText>

        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929]">
          <MobileText className="italic text-[#a89968] mb-0">
            O skaven farejou a coisa-homem no andar superior. Guinchando baixo,
            correu 8 cm através dos escombros, depois escalou 3 cm de parede
            (gastando 6 cm de movimento), e finalmente saltou 5 cm até a varanda
            onde o humano se escondia. Tudo em uma única ação. A coisa-homem nem
            teve tempo de gritar. Sim-sim, criatividade é sobrevivência.
          </MobileText>
        </div>
      </div>
    </ActionSubsection>
  );
};

export default ChargeActionSection;
