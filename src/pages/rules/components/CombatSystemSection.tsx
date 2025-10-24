import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

function CombatSystemSection() {
  return (
    <CollapsibleSection id="sistema-de-combate" title=" Sistema de Combate">
      <MobileText>
        Nas ruínas de Mordheim, a morte não espera ordens. Ela vem quando vem —
        rápida para alguns, cruel para outros. Mas até o caos precisa de
        estrutura, e assim temos as regras do combate. Quem age primeiro
        frequentemente vive para contar a história. Quem hesita... bem, os
        mortos não contam histórias.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Ordem do Turno — Quem Vive, Quem Morre
      </MobileText>
      <MobileText>
        No início de cada jogo, antes que a primeira gota de sangue seja
        derramada, cada jogador lança um <strong>d20</strong> e anota o
        resultado. Esta é a <strong>rolagem de iniciativa</strong> — um número
        frio que determina se você será caçador ou presa. Anote seu resultado
        com cuidado. O jogador com o <strong>maior resultado</strong> será o
        primeiro a agir, seguido pelo segundo maior, depois o terceiro, e assim
        por diante. Esta ordem é absoluta — o destino já lançou os dados. Ela se
        mantém durante todo o turno, definindo quem move primeiro, quem ataca
        primeiro, quem talvez sobreviva primeiro.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Ativação — O Ritual da Morte
      </MobileText>
      <MobileText>
        Os jogadores <strong>ativam uma miniatura</strong> por vez, seguindo
        rigorosamente a ordem de iniciativa. <br />•{" "}
        <strong>Ativando com o Herói:</strong> quando você ativa seu herói, ele
        não precisa agir sozinho — você pode ativar até{" "}
        <strong>3 soldados</strong> que estejam a até
        <strong> 8 cm</strong> dele. <br />•{" "}
        <strong>Ativando com o Campeão:</strong> ao ativar o campeão, ele pode
        liderar até <strong>2 soldados</strong> a<strong> 8 cm</strong>.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Ativação em Grupo
      </MobileText>
      <MobileText>
        Um <strong>herói</strong>, <strong>campeão</strong> ou{" "}
        <strong>soldado</strong> cuja habilidade permita pode declarar uma
        ativação em grupo. Escolha uma quantidade de soldados que poderiam ser
        ativados junto à figura que declarou a ativação em grupo:
        <strong> todos eles realizam primeiro sua ação de movimento</strong>, em
        qualquer ordem. Em seguida,{" "}
        <strong>todos realizam sua segunda ação</strong>, também em qualquer
        ordem. É extremamente útil para <strong>cercar inimigos</strong> ou
        garantir que <strong>todos avancem sobre o mesmo miserável</strong>!
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Ativação de Figuras Neutras
      </MobileText>
      <MobileText>
        Quando todas as figuras dos jogadores tiverem ativado, as figuras
        neutras começam a agir. Eleja um jogador para rolar por elas (ou
        alternem a cada turno, como preferirem). Se houver um{" "}
        <strong>gamemaster</strong>
        na campanha, idealmente ele assume essa função.
      </MobileText>
      <MobileText>
        Para cada figura neutra, <strong>role 1d20</strong>: esse é o valor de
        <strong> iniciativa</strong> da figura. Se duas figuras empatarem na
        iniciativa, elas agem como em uma <strong>ativação em grupo</strong>. Em
        seguida, na ordem de iniciativa das figuras, controle‑as seguindo o
        algoritmo abaixo:
      </MobileText>
      <MobileText>
        • <strong>Ação de movimento</strong>: se a figura não enxerga nenhuma
        figura controlada por jogador, decida a direção aleatoriamente. Lance um
        d20: cada face forma um triângulo — mova a figura seu valor inteiro de
        <strong> Agilidade</strong> na direção apontada pelo{" "}
        <strong>vértice superior</strong> do número mostrado no dado (considere
        o vértice alinhado ao topo do algarismo). Se a figura enxerga uma ou
        mais figuras, mova em direção à <strong>mais próxima</strong>. Se puder
        <strong>declarar Carga</strong>, declara. Se tiver arma à distância,
        mantém‑se no <strong>limite do alcance</strong> de sua arma, preferindo
        sempre <strong>atirar primeiro</strong> e mover depois.
      </MobileText>
      <MobileText>
        • <strong>Outra ação</strong>: se a figura está em combate, usa uma
        <strong> ação de luta</strong> (nunca escolhe empurrar o inimigo 1"). Se
        tiver arma à distância e estiver em alcance, faz um{" "}
        <strong>ataque à distância</strong>, mantendo‑se no limite do alcance da
        arma.
      </MobileText>
      <MobileText>
        •{" "}
        <strong>
          terminou o movimento e ainda não está em combate ou no alcance de tiro
        </strong>
        : a figura usa sua segunda ação para se mover norvamente seguindo as
        mesmas regras de movimento do jogo e de figuras neutras.
      </MobileText>

      <MobileText variant="heading" className="mt-2">
        Fim do Turno — E Recomeça
      </MobileText>
      <MobileText>
        Após todos os jogadores ativarem suas figuras, as
        <strong> figuras neutras</strong> (se houver) agem segundo suas próprias
        regras. Então o turno termina — os mortos são contados, os feridos gemem
        — e o ciclo recomeça. No <strong>próximo turno</strong>, a iniciativa é{" "}
        <strong>rolada novamente</strong>: um novo d20, uma nova ordem, uma nova
        chance de sobreviver… ou não.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mt-2">
        <MobileText variant="heading" className="mb-2">
          Resumo do Ciclo de Turno
        </MobileText>
        <MobileText>1) Início: role iniciativa (d20).</MobileText>
        <MobileText>2) Ativação na ordem de iniciativa.</MobileText>
        <MobileText>3) Herói: pode ativar até 3 soldados a 8 cm.</MobileText>
        <MobileText>4) Campeão: pode ativar até 2 soldados a 8 cm.</MobileText>
        <MobileText>
          5) Figuras neutras: ativam após todos os jogadores.
        </MobileText>
        <MobileText>
          6) Fim do turno: reinicie (role iniciativa novamente).
        </MobileText>
      </div>
    </CollapsibleSection>
  );
}

export default CombatSystemSection;
