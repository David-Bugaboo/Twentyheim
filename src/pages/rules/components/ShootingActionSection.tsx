import MobileText from "../../../components/MobileText";
import ActionSubsection from "./ActionSubsection";
import ActionSubsubsection from "./ActionSubsubsection";


const ShootingActionSection = () => {
  return (
    <ActionSubsection title="Ação de Tiro" color="#f39c12">
      <MobileText className="mb-4">
        A covardia tem seu lugar — especialmente quando esse lugar é fora do
        alcance do inimigo. A figura que usa a ação de tiro seleciona uma de
        suas <strong>armas à distância</strong>, e então seleciona uma figura
        dentro do <strong>alcance daquela arma</strong> que ela consiga
        enxergar.
      </MobileText>

      <ActionSubsubsection title="A Rolagem de Tiro">
        <MobileText className="mb-3">
          A figura atiradora rola <strong>Precisão (d20)</strong>, adicionando
          quaisquer modificadores advindos de feitiços, poderes, itens ou
          traits. A figura alvo então rola <strong>Ímpeto (d20)</strong>,
          adicionando quaisquer modificadores relevantes — incluindo os da
          tabela de defesa contra tiro abaixo.
        </MobileText>
        <MobileText className="mb-4">
          Se a rolagem de Precisão for <strong>maior</strong> que a de Ímpeto do
          alvo, o atacante causa dano seguindo as mesmas regras do combate corpo
          a corpo. Em caso de <strong>empate</strong> ou caso a rolagem de
          Ímpeto seja maior, <strong>nenhum dano é causado</strong> — a flecha
          erra, o virote desvia, a bala se perde nas sombras.
        </MobileText>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            Tabela de Modificadores de Defesa Contra Tiro
          </MobileText>
          <MobileText className="mb-3">
            <strong style={{ color: "#d4af37" }}>
              Terreno Intermediário (+1):
            </strong>{" "}
            Cada peça de terreno entre o atirador e o alvo concede +1.
            Cumulativo — três peças de terreno concedem +3. Note que se o alvo
            está em contato com uma peça de terreno, ela conta como cobertura ao
            invés de terreno intermediário. Se o atirador está em contato com
            terreno, não conta como intermediário (mas pode bloquear linha de
            visão). Outras figuras contam como terreno intermediário.
          </MobileText>

          <MobileText className="mb-3">
            <strong style={{ color: "#d4af37" }}>Cobertura Leve (+2):</strong> O
            alvo está em contato com cobertura sólida (rochas, muros, madeira
            grossa, outras figuras) que obscurece até metade de seu corpo, ou
            com cobertura leve (arbustos, vegetação rasteira) que quase
            completamente obscurece seu corpo.
          </MobileText>

          <MobileText className="mb-3">
            <strong style={{ color: "#d4af37" }}>Cobertura Pesada (+4):</strong>{" "}
            O alvo está em contato com cobertura sólida que quase completamente
            obscurece seu corpo.
          </MobileText>

          <MobileText className="mb-3">
            <strong style={{ color: "#d4af37" }}>Tiro Apressado (+1):</strong> O
            atirador se moveu anteriormente durante esta ativação. Difícil mirar
            quando seus pulmões ainda ardem da corrida.
          </MobileText>

          <MobileText>
            <strong style={{ color: "#d4af37" }}>Alvo Grande (-2):</strong> O
            alvo é particularmente alto ou incomumente grande. Normalmente se
            aplica apenas a criaturas com a característica Grande. Algumas
            coisas são difíceis de errar.
          </MobileText>
        </div>
        <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
          <MobileText variant="heading" className="mb-3">
            Exemplo: Besteiro vs Necromante
          </MobileText>

          <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-3">
            <MobileText className="italic text-[#a89968] mb-3">
              Hans, o besteiro, espiou através das ruínas. Lá — o necromante, 60
              cm à frente, parcialmente atrás de um muro quebrado. Hans já havia
              se movido 8 cm neste turno para conseguir linha de visão. Não
              ideal, mas quando é?
            </MobileText>

            <MobileText className="italic text-[#a89968] mb-3">
              <strong>Hans rola Precisão:</strong> d20 = 13, +2 (Precisão) ={" "}
              <strong>15 total</strong>
              <br />
              <strong>Necromante rola Ímpeto:</strong> d20 = 9, +0 (Ímpeto), +2
              (cobertura leve do muro), +1 (tiro apressado de Hans) ={" "}
              <strong>12 total</strong>
            </MobileText>

            <MobileText className="italic text-[#a89968] mb-3">
              Hans vence! Calcula dano: 15 +2 (besta) = 17 - 10 (armadura do
              necromante) = <strong>7 pontos de dano</strong>. O virote perfura
              o ombro do conjurador. Ele grita — surpreendentemente agudo para
              alguém que lida com mortos.
            </MobileText>

            <MobileText className="italic text-[#a89968] mb-0">
              Hans sorri. Depois franze a testa. O necromante ainda está de pé,
              segurando o ombro perfurado, olhos brilhando com ódio e magia
              sombria. "Ele devia ter ficado mais perto do muro," Hans pensa.
              "Ele, não eu. Não arredo pé daqui."
            </MobileText>
          </div>
        </div>
      </ActionSubsubsection>
    </ActionSubsection>
  );
};

export default ShootingActionSection;
