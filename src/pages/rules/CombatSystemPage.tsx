import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import WarningBox from "../../components/WarningBox";
import CornerDecoration from "../../components/CornerDecoration";

function CombatSystemPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Sistema de Combate</PageTitle>

            <MobileText>
              Nas ruínas de Mordheim, a morte não espera ordens. Ela vem quando
              vem — rápida para alguns, cruel para outros. Mas até o caos
              precisa de estrutura, e assim temos as regras do combate. Quem age
              primeiro frequentemente vive para contar a história. Quem
              hesita... bem, os mortos não contam histórias.
            </MobileText>

            <HeaderH1>Ordem do Turno — Quem Vive, Quem Morre</HeaderH1>
            <MobileText>
              No início de cada jogo, antes que a primeira gota de sangue seja
              derramada, cada jogador lança um <strong>d20</strong> e anota o
              resultado. Esta é a <strong>rolagem de iniciativa</strong> — um
              número frio que determina se você será caçador ou presa. Anote seu
              resultado com cuidado. O jogador com o{" "}
              <strong>maior resultado</strong> será o primeiro a agir, seguido
              pelo segundo maior, depois o terceiro, e assim por diante. Esta
              ordem é absoluta — o destino já lançou os dados. Ela se mantém
              durante todo o turno, definindo quem move primeiro, quem ataca
              primeiro, quem talvez sobreviva primeiro.
            </MobileText>

            <HeaderH1>Ativação — O Ritual da Morte</HeaderH1>
            <MobileText>
              Os jogadores <strong>ativam uma miniatura</strong>. Então, o
              proximo jogador na ordem de iniciativa ativa uma miniatura, e
              assim sucessivamente até que todos os seus jogadores tenham
              ativado todas as suas figuras. Note que a ativação do héroi e
              campeão tem regras especiais, descritas abaixo:
            </MobileText>

            <HeaderH2>Ativando com o Líder</HeaderH2>
            <MobileText>
              Quando você ativa seu líder, ele não precisa agir sozinho — você
              pode ativar até <strong>3 soldados</strong> que estejam a até{" "}
              <strong>8 cm</strong> dele.
            </MobileText>

            <HeaderH2>Ativando com o Soldados</HeaderH2>
            <MobileText>
              Soldados ativam normalmente, sem regras especiais, fazendos suas
              ações e terminando suas ativações.
            </MobileText>

            <WarningBox title="Ativação em Grupo" type="info">
              Um <strong>herói</strong>, <strong>campeão</strong> ou{" "}
              <strong>soldado</strong> cuja habilidade permita pode declarar uma
              ativação em grupo. Escolha uma quantidade de soldados que poderiam
              ser ativados junto à figura que declarou a ativação em grupo:
              <strong>
                {" "}
                todos eles realizam primeiro sua ação de movimento
              </strong>
              , em qualquer ordem. Em seguida,{" "}
              <strong>todos realizam uma segunda ação</strong>, também em
              qualquer ordem. É extremamente útil para{" "}
              <strong>cercar inimigos</strong> ou flanquear posições
              estratégicas.{" "}
            </WarningBox>

            <HeaderH1>Ativação de Criaturas Não Controladas</HeaderH1>
            <MobileText>
              Quando todas as figuras dos jogadores tiverem ativado, as
              criaturas não controladas começam a agir. Eleja um jogador para
              rolar por elas (ou alternem a cada turno, como preferirem). Se
              houver um <strong>gamemaster</strong>
              na campanha, idealmente ele assume essa função.
            </MobileText>

            <MobileText>
              Para cada criatura neutra, <strong>role 1d20</strong>: esse é o
              valor de
              <strong> iniciativa</strong> da criatura. Se duas criaturas
              empatarem na iniciativa, elas agem como em uma{" "}
              <strong>ativação em grupo</strong>. Em seguida, na ordem de
              iniciativa das criaturas, controle‑as seguindo o algoritmo abaixo:
            </MobileText>

            <HeaderH2>Algoritmo de Ações das Criaturas Neutras</HeaderH2>
            <MobileText>
              Para cada criatura neutra, siga este algoritmo passo a passo para
              determinar suas ações:
            </MobileText>

            <HeaderH3>Passo 1: A Criatura Está em Combate?</HeaderH3>
            <MobileText>
              <strong>SIM:</strong> A criatura usará sua ação para lutar. Se
              vencer o combate, escolherá permanecer em combate. Se a criatura
              estiver em combate com mais de um oponente, atacará aquele com o{" "}
              <strong>menor Vigor atual</strong>.
            </MobileText>
            <MobileText>
              <strong>NÃO:</strong> Prossiga para o Passo 2.
            </MobileText>

            <HeaderH3>Passo 2: Há um Membro do Bando à Vista?</HeaderH3>
            <MobileText>
              <strong>SIM:</strong> Se a criatura estiver armada com uma arma à
              distância e houver um membro do bando dentro do alcance, ela
              atirará no alvo elegível mais próximo. Ela não tomará uma segunda
              ação. Se a criatura não tiver arma à distância, ela se moverá o
              máximo possível em direção ao membro do bando visível mais
              próximo, escalando obstáculos conforme necessário. A criatura
              entrará em combate se possível. Se a criatura entrou em combate e
              ainda tem uma ação restante, vá para o Passo 1.
            </MobileText>
            <MobileText>
              <strong>NÃO:</strong> Prossiga para o Passo 3.
            </MobileText>

            <HeaderH3>Passo 3: Movimento Aleatório</HeaderH3>
            <MobileText>
              A criatura tomará uma ação para se mover. Determine uma direção
              aleatória e mova a criatura sua distância total de{" "}
              <strong>Movimento</strong> nessa direção. Se a criatura se mover
              contra uma parede ou outro obstáculo (incluindo a borda da mesa –
              criaturas nunca deixarão a mesa devido ao movimento aleatório),
              pare seu movimento nesse ponto. Uma vez que este movimento esteja
              completo, se a criatura ainda tem uma ação restante, verifique o
              Passo 2 mais uma vez – se nenhum alvo se apresentou, a ativação da
              criatura termina e nenhuma segunda ação é tomada, caso contrário,
              prossiga com o Passo 2 normalmente.
            </MobileText>

            <WarningBox title="Direções Aleatórias" type="info">
              Ocasionalmente, os jogadores serão chamados para determinar uma
              direção aleatória. Um método simples para isso é rolar um dado.
              Como cada face de um d20 é um triângulo, ele pode servir como uma
              pequena seta. Simplesmente olhe para a direção indicada pelo{" "}
              <strong>topo do triângulo</strong> – o ponto que fica acima do
              número.
            </WarningBox>

            <HeaderH1>Fim do Turno — E Recomeça</HeaderH1>
            <MobileText>
              Após todos os jogadores ativarem suas figuras, as
              <strong> criaturas neutras</strong> (se houver) agem segundo suas
              próprias regras. Então o turno termina — os mortos são contados,
              os feridos gemem — e o ciclo recomeça. No{" "}
              <strong>próximo turno</strong>, a iniciativa é{" "}
              <strong>rolada novamente</strong>: um novo d20, uma nova ordem,
              uma nova chance de sobreviver… ou não.
            </MobileText>

            <WarningBox title="Marcadores de Ativação" type="info">
              <MobileText>
                É interessante marcar de alguma forma quais unidades já foram
                ativadas durante o turno. Como o jogo já utiliza marcadores para
                várias habilidades e magias, seria útil usar marcadores de
                "unidade ativada" para facilitar o controle durante a batalha.
                Na seção de Downloads do site, você encontrará uma folha com
                diversos marcadores, incluindo marcadores específicos para
                unidades ativadas que podem ser utilizados para esse propósito.
              </MobileText>
            </WarningBox>

            <HeaderH1>Vigilância: a força da elite contra as hordas</HeaderH1>
            <MobileText>
              Em Mordheim, alguns bandos tem muitos mais soldados que os outros.
              Em um sistema em que as ativações são alternadas, isso poderia
              significar que apenas encher seu bando com soldados baratos
              poderia vencer qualquer jogo pela força dos números. Contudo,
              soldados experientes e de bem treinados não cairão para esse tipo
              de tática tão fácil.
            </MobileText>
            <MobileText>
              Sempre que um jogador tiver ativado todas as suas figuras, para
              cada figura de outro jogador que ativar, ele ganha um{" "}
              <strong>Marcador de Vigilância</strong>. Um Marcador de Vigilância
              pode ser usado no final da ativação de uma figura inimiga, para
              que a figura que usou faça uma única ação, que pode ser qualquer
              uma. Uma figura só pode receber um marcador de vigilância por
              turno.
            </MobileText>

            <HeaderH1>As Ações</HeaderH1>
            <MobileText>
              Em Mordheim, cada momento conta. Cada decisão pode ser sua última.
              Quando uma figura é ativada, ela tem um breve lampejo de tempo
              para agir — para mover, atacar, conjurar, ou simplesmente
              sobreviver mais um instante. Este é o momento em que heróis são
              feitos... ou enterrados.
            </MobileText>

            <HeaderH2>A Regra das Duas Ações</HeaderH2>

            <MobileText className="mb-3">
              Cada figura, exceto em situações especiais ditadas pelo destino ou
              pela magia, pode tomar <strong>duas ações</strong> durante sua
              ativação. Duas escolhas.
            </MobileText>

            <MobileText className="mb-3">
              Uma das ações deve ser uma <strong>Ação de Movimento</strong>.
              Lembre-se, apesar da ação de movimento ser obrigatória, não
              importa se ela é a primeira ou segunda ação. Uma figura pode se
              mover para que um inimigo esteja no alcance, e então conjurar uma
              magia, ou atirar primeiro e mover-se depois para não perder a
              estabilidade da sua mira.
            </MobileText>
            <WarningBox
              title="Exceção — Substituindo Ação de Movimento"
              type="info"
            >
              Alguns efeitos de habilidades e características especificam que
              podem substituir a ação de movimento. Nestes casos raros, o
              jogador pode tomar essa ação especial no lugar do movimento
              obrigatório, antes ou depois de qualquer outra ação normal.
            </WarningBox>

            <HeaderH2>Tipos de Ação</HeaderH2>
            <MobileText variant="quote" className="mb-4">
              "Cada ação é uma aposta com a morte. Escolha sabiamente."
            </MobileText>

            <MobileText>
              Durante sua ativação, cada figura pode realizar duas ações.
              Existem vários tipos de ações disponíveis, cada uma com suas
              próprias regras e estratégias. Clique nos botões abaixo para
              aprender sobre cada tipo de ação em detalhes:
            </MobileText>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <a
                href="/rules/movement-actions"
                className="bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333] hover:border-[#555] rounded-lg p-4 transition-colors duration-200 group"
              >
                <HeaderH3 className="text-white group-hover:text-[#8b7355] mb-2">
                  Ações de Movimento
                </HeaderH3>
                <MobileText className="text-sm">
                  Caminhar, correr, escalar e outras formas de se deslocar pelo
                  campo de batalha.
                </MobileText>
              </a>

              <a
                href="/rules/combat-actions"
                className="bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333] hover:border-[#555] rounded-lg p-4 transition-colors duration-200 group"
              >
                <HeaderH3 className="text-white group-hover:text-[#8b7355] mb-2">
                  Ações de Combate
                </HeaderH3>
                <MobileText className="text-sm">
                  Atacar, carregar, empurrar e outras ações de combate corpo a
                  corpo.
                </MobileText>
              </a>

              <a
                href="/rules/ranged-actions"
                className="bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333] hover:border-[#555] rounded-lg p-4 transition-colors duration-200 group"
              >
                <HeaderH3 className="text-white group-hover:text-[#8b7355] mb-2">
                  Ações à Distância
                </HeaderH3>
                <MobileText className="text-sm">
                  Atirar, mirar e outras ações com armas de longo alcance.
                </MobileText>
              </a>

              <a
                href="/rules/power-actions"
                className="bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333] hover:border-[#555] rounded-lg p-4 transition-colors duration-200 group"
              >
                <HeaderH3 className="text-white group-hover:text-[#8b7355] mb-2">
                  Ações de Poder
                </HeaderH3>
                <MobileText className="text-sm">
                  Conjurar magias, usar poderes especiais e habilidades únicas.
                </MobileText>
              </a>

              <a
                href="/rules/other-actions"
                className="bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333] hover:border-[#555] rounded-lg p-4 transition-colors duration-200 group"
              >
                <HeaderH3 className="text-white group-hover:text-[#8b7355] mb-2">
                  Outras Ações
                </HeaderH3>
                <MobileText className="text-sm">
                  Interagir com objetos, usar itens e outras ações especiais.
                </MobileText>
              </a>

              <a
                href="/rules/post-game"
                className="bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333] hover:border-[#555] rounded-lg p-4 transition-colors duration-200 group"
              >
                <HeaderH3 className="text-white group-hover:text-[#8b7355] mb-2">
                  Pós-Jogo
                </HeaderH3>
                <MobileText className="text-sm">
                  Resolução de ferimentos, experiência e desenvolvimento do
                  bando.
                </MobileText>
              </a>
            </div>

            <WarningBox title="Dica Estratégica" type="info">
              A iniciativa é crucial em Mordheim. Habilidades que aumentam a
              iniciativa, ou permitam uma ativação imediata são muito valiosas.
              Use isso para cercar oponentes, tomar posições vantajosas ou
              eliminar ameaças antes que elas possam agir.
            </WarningBox>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default CombatSystemPage;
