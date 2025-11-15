import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import WarningBox from "../../components/WarningBox";
import QuickNavigation from "../../components/QuickNavigation";

function CombatSystemPage() {
  const navigationSections = [
    { id: "intro", title: "Sistema de Combate", level: 0 },
    {
      id: "ordem-turno",
      title: "Ordem do Turno — Quem Vive, Quem Morre",
      level: 0,
    },
    { id: "teste-debandada", title: "O Teste de Debandada", level: 0 },
    { id: "ativacao", title: "Ativação — O Ritual da Morte", level: 0 },
    { id: "ativando-lider", title: "Ativando com o Líder", level: 1 },
    { id: "ativando-soldados", title: "Ativando com o Soldados", level: 1 },
    {
      id: "figuras-nao-controladas",
      title: "Ativação de Figuras Não Controladas",
      level: 0,
    },
    {
      id: "algoritmo-figuras",
      title: "Algoritmo de Ações das Figuras Neutras",
      level: 1,
    },
    { id: "passo-1", title: "Passo 1: A Criatura Está em Combate?", level: 1 },
    {
      id: "passo-2",
      title: "Passo 2: Há um Membro do Bando à Vista?",
      level: 1,
    },
    { id: "passo-3", title: "Passo 3: Movimento Aleatório", level: 1 },
    { id: "fim-turno", title: "Fim do Turno — E Recomeça", level: 0 },
    {
      id: "vigilancia",
      title: "Vigilância: a força da elite contra as hordas",
      level: 0,
    },
    { id: "acoes", title: "As Ações", level: 0 },
    { id: "regra-duas-acoes", title: "A Regra das Duas Ações", level: 1 },
    { id: "tipos-acao", title: "Tipos de Ação", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Sistema de Combate</PageTitle>
            </div>

            <MobileText>
              Nas ruínas de Mordheim, a morte não espera ordens. Ela vem quando
              vem — rápida para alguns, cruel para outros. Mas até o caos
              precisa de estrutura, e assim temos as regras do combate. Quem age
              primeiro frequentemente vive para contar a história. Quem
              hesita... bem, os mortos não contam histórias.
            </MobileText>

            <div id="ordem-turno">
              <HeaderH1>Ordem do Turno — Quem Vive, Quem Morre</HeaderH1>
            </div>
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
              primeiro, quem talvez sobreviva primeiro. Cada um dos jogadores
              que rolar abaixo de 5 na rolagem de iniciativa desencadeia um
              acontecimento. Para mais informações sobre como definir o
              acontecimento e uma descrição completa deles, vá até a página de
              acontecimentos.
            </MobileText>

            <div className="mt-4 mb-6 flex justify-center">
              <a
                href="/rules/happenings"
                className="w-full md:w-1/2 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-bold text-center block"
              >
                Ver Acontecimentos
              </a>
            </div>

            <div id="teste-debandada">
              <HeaderH1>O Teste de Debandada</HeaderH1>
            </div>
            <MobileText>
              No começo de cada turno, todos os bandos que tenham perdido mais
              de um quarto das suas figuras devem rolar um{" "}
              <strong>teste de debandada</strong>. É um teste de Vontade CD +
              número de figuras reduzidas a 0 de vida, que deve ser feito pelo{" "}
              <strong>Líder</strong>. Se o Líder estiver morto, um{" "}
              <strong>herói à escolha do jogador</strong> pode fazer. Se não
              tiverem líderes ou heróis vivos, o bando debanda automaticamente.
            </MobileText>
            <MobileText>
              Um bando que debanda remove todas as suas figuras da mesa e está
              fora do jogo. As figuras que saíram por debandada não precisam
              rolar sobrevivência. Um bando pode escolher falhar nesse teste
              voluntariamente para preservar seus soldados vivos para um próximo
              jogo. Fragmentos de Pedra-Bruxa já capturados ainda são ganhos, e
              experiência e testes de sobrevivência para figuras reduzidas a 0
              de vida são feitos normalmente.
            </MobileText>

            <div id="ativacao">
              <HeaderH1>Ativação — O Ritual da Morte</HeaderH1>
            </div>
            <MobileText>
              Os jogadores <strong>ativam uma miniatura</strong>. Então, o
              próximo jogador na ordem de iniciativa ativa uma miniatura, e
              assim sucessivamente até que todos os seus jogadores tenham
              ativado todas as suas figuras. Note que a ativação do herói e
              campeão tem regras especiais, descritas abaixo:
            </MobileText>

            <div id="ativando-lider">
              <HeaderH2>Ativando com o Líder</HeaderH2>
            </div>
            <MobileText>
              Quando você ativa seu líder, ele não precisa agir sozinho — você
              pode ativar até <strong>3 soldados</strong> que estejam a até{" "}
              <strong>8 cm</strong> dele.
            </MobileText>

            <div id="ativando-soldados">
              <HeaderH2>Ativando com o Soldados</HeaderH2>
            </div>
            <MobileText>
              Soldados ativam normalmente, sem regras especiais, fazendo suas
              ações e terminando suas ativações.
            </MobileText>

            <WarningBox title="Ativação em Grupo" type="info">
              Quando um líder usa sua regra especial Líder para ativar outras
              figuras junto a si, ele pode declarar uma{" "}
              <strong>Ativação em Grupo</strong>
              <strong>
                {" "}
                todos as figuras envoilvidas na ativação realizam primeiro sua
                ação de movimento
              </strong>
              , em qualquer ordem. Em seguida,{" "}
              <strong>todos realizam sua segunda ação</strong>, também em
              qualquer ordem. É extremamente útil para{" "}
              <strong>cercar inimigos</strong> ou flanquear posições
              estratégicas.{" "}
            </WarningBox>

            <div id="trocar-equipamentos">
              <HeaderH1>Trocar Equipamentos</HeaderH1>
            </div>
            <MobileText>
              No começo da sua ativação, uma figura pode trocar quais itens
              carregas estão equipados em qualquer uma de suas mãos ou ambas.
              Esse é o unico momento que uma figura pode trocar seus
              equipamentos durante a partida, embora nunca possa trocar elmos ou
              armaduras, visto que só pode carregar um de cada desses itens.
            </MobileText>

            <div id="figuras-nao-controladas">
              <HeaderH1>Ativação de Figuras Não Controladas</HeaderH1>
            </div>
            <MobileText>
              Quando todas as figuras dos jogadores tiverem ativado, as figuras
              não controladas começam a agir. Eleja um jogador para rolar por
              elas (ou alternem a cada turno, como preferirem). Se houver um{" "}
              <strong>gamemaster</strong>
              na campanha, idealmente ele assume essa função.
            </MobileText>

            <MobileText>
              Para cada figura neutra, <strong>role 1d20</strong>: esse é o
              valor de <strong>iniciativa</strong> da figura. Se duas figuras
              empatarem na iniciativa, elas agem como em uma{" "}
              <strong>ativação em grupo</strong>. Em seguida, na ordem de
              iniciativa das figuras, controle-as seguindo o algoritmo abaixo:
            </MobileText>

            <div id="algoritmo-figuras">
              <HeaderH2>Algoritmo de Ações das Figuras Neutras</HeaderH2>
            </div>
            <MobileText>
              Para cada figura neutra, siga este algoritmo passo a passo para
              determinar suas ações:
            </MobileText>

            <div id="passo-1">
              <HeaderH3>Passo 1: A Criatura Está em Combate?</HeaderH3>
            </div>
            <MobileText>
              <strong>SIM:</strong> A figura usará sua ação para lutar. Se
              vencer o combate, escolherá permanecer em combate. Se a figura
              estiver em combate com mais de um oponente, atacará aquele com o{" "}
              <strong>menor Vigor atual</strong>.
            </MobileText>
            <MobileText>
              <strong>NÃO:</strong> Prossiga para o Passo 2.
            </MobileText>

            <div id="passo-2">
              <HeaderH3>Passo 2: Há um Membro do Bando à Vista?</HeaderH3>
            </div>
            <MobileText>
              <strong>SIM:</strong> Se a figura estiver armada com uma arma à
              distância e houver um membro do bando dentro do alcance, ela
              atirará no alvo elegível mais próximo. Ela não tomará uma segunda
              ação. Se a figura não tiver arma à distância, ela se moverá o
              máximo possível em direção ao membro do bando visível mais
              próximo, escalando obstáculos conforme necessário. A figura
              entrará em combate se possível. Se a figura entrou em combate e
              ainda tem uma ação restante, vá para o Passo 1.
            </MobileText>
            <MobileText>
              <strong>NÃO:</strong> Prossiga para o Passo 3.
            </MobileText>

            <div id="passo-3">
              <HeaderH3>Passo 3: Movimento Aleatório</HeaderH3>
            </div>
            <MobileText>
              A figura tomará uma ação para se mover. Determine uma direção
              aleatória e mova a figura sua distância total de{" "}
              <strong>Movimento</strong> nessa direção. Se a figura se mover
              contra uma parede ou outro obstáculo (incluindo a borda da mesa –
              figuras nunca deixarão a mesa devido ao movimento aleatório), pare
              seu movimento nesse ponto. Uma vez que este movimento esteja
              completo, se a figura ainda tem uma ação restante, verifique o
              Passo 2 mais uma vez – se nenhum alvo se apresentou, a ativação da
              figura termina e nenhuma segunda ação é tomada, caso contrário,
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

            <div id="fim-turno">
              <HeaderH1>Fim do Turno — E Recomeça</HeaderH1>
            </div>
            <MobileText>
              Após todos os jogadores ativarem suas figuras, as{" "}
              <strong>figuras neutras</strong> (se houver) agem segundo suas
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

            <div id="acoes">
              <HeaderH1>As Ações</HeaderH1>
            </div>
            <MobileText>
              Em Mordheim, cada momento conta. Cada decisão pode ser sua última.
              Quando uma figura é ativada, ela tem um breve lampejo de tempo
              para agir — para mover, atacar, conjurar, ou simplesmente
              sobreviver mais um instante. Este é o momento em que heróis são
              feitos... ou enterrados.
            </MobileText>

            <div id="regra-duas-acoes">
              <HeaderH2>A Regra das Duas Ações</HeaderH2>
            </div>

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

            <div id="tipos-acao">
              <HeaderH2>Tipos de Ação</HeaderH2>
            </div>
            

            <MobileText>
              Durante sua ativação, cada figura pode realizar duas ações.
              Existem vários tipos de ações disponíveis, cada uma com suas
              próprias regras e estratégias. Clique nos botões abaixo para
              aprender sobre cada tipo de ação em detalhes:
            </MobileText>

            <div className="space-y-4 mt-6">
              <a
                href="/rules/movement-actions"
                className="block w-full md:w-1/2 mx-auto bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 rounded-lg p-4 transition-colors duration-200 group text-center"
              >
                <HeaderH3 className="text-green-300 group-hover:text-green-200 mb-2 text-center">
                  Movimento
                </HeaderH3>
                <MobileText className="text-white text-sm text-center">
                  Caminhar, correr, escalar e outras formas de se deslocar pelo
                  campo de batalha.
                </MobileText>
              </a>

              <a
                href="/rules/reactions"
                className="block w-full md:w-1/2 mx-auto bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 rounded-lg p-4 transition-colors duration-200 group text-center"
              >
                <HeaderH3 className="text-green-300 group-hover:text-green-200 mb-2 text-center">
                  Reações
                </HeaderH3>
                <MobileText className="text-white text-sm text-center">
                  Ações desencadeadas em resposta a eventos do jogo.
                </MobileText>
              </a>

              <a
                href="/rules/combat-actions"
                className="block w-full md:w-1/2 mx-auto bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 rounded-lg p-4 transition-colors duration-200 group text-center"
              >
                <HeaderH3 className="text-green-300 group-hover:text-green-200 mb-2 text-center">
                  Combate
                </HeaderH3>
                <MobileText className="text-white text-sm text-center">
                  Atacar, empurrar e outras ações de combate corpo a corpo.
                </MobileText>
              </a>

              <a
                href="/rules/ranged-actions"
                className="block w-full md:w-1/2 mx-auto bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 rounded-lg p-4 transition-colors duration-200 group text-center"
              >
                <HeaderH3 className="text-green-300 group-hover:text-green-200 mb-2 text-center">
                  Ataque a Distância
                </HeaderH3>
                <MobileText className="text-white text-sm text-center">
                  Atirar, mirar e outras ações com armas de longo alcance.
                </MobileText>
              </a>

              <a
                href="/rules/spellcasting-actions"
                className="block w-full md:w-1/2 mx-auto bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 rounded-lg p-4 transition-colors duration-200 group text-center"
              >
                <HeaderH3 className="text-green-300 group-hover:text-green-200 mb-2 text-center">
                  Conjurar
                </HeaderH3>
                <MobileText className="text-white text-sm text-center">
                  Conjurar magias e canalizar os ventos da magia.
                </MobileText>
              </a>

              <a
                href="/rules/power-actions"
                className="block w-full md:w-1/2 mx-auto bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 rounded-lg p-4 transition-colors duration-200 group text-center"
              >
                <HeaderH3 className="text-green-300 group-hover:text-green-200 mb-2 text-center">
                  Habilidades
                </HeaderH3>
                <MobileText className="text-white text-sm text-center">
                  Usar habilidades especiais e poderes únicos.
                </MobileText>
              </a>

              <a
                href="/rules/wyrdstone-actions"
                className="block w-full md:w-1/2 mx-auto bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 rounded-lg p-4 transition-colors duration-200 group text-center"
              >
                <HeaderH3 className="text-green-300 group-hover:text-green-200 mb-2 text-center">
                  Pegar
                </HeaderH3>
                <MobileText className="text-white text-sm text-center">
                  Pegar fragmentos de Pedra-bruxa e tesouros.
                </MobileText>
              </a>

              <a
                href="/rules/other-actions"
                className="block w-full md:w-1/2 mx-auto bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 rounded-lg p-4 transition-colors duration-200 group text-center"
              >
                <HeaderH3 className="text-green-300 group-hover:text-green-200 mb-2 text-center">
                  Outras
                </HeaderH3>
                <MobileText className="text-white text-sm text-center">
                  Interagir com objetos, usar itens e outras ações especiais.
                </MobileText>
              </a>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default CombatSystemPage;
