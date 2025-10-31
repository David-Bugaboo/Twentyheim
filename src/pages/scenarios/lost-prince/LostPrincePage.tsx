import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import GenericTable from "../../../components/GenericTable";
import multiplayerGamesImg from "../../../assets/scenarios-images/multiplayer-games.png";
import CollapsibleImage from "../../../components/CollapsibleImage";

function LostPrincePage() {
  const rewardTableData = [
    { Item: "3D20 coroas", D6: "Automático" },
    { Item: "3 Espadas", D6: "10+" },
    { Item: "Armadura Pesada", D6: "12+" },
    { Item: "Armadura Leve", D6: "10+" },
    { Item: "Escudo", D6: "10+" },
    { Item: "Elmo", D6: "10+" },
    { Item: "3 gemas valendo 10 coroas cada", D6: "14+" },
  ];

  const navigationSections = [
    { id: "intro", title: "O Herdeiro Perdido", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "terrain", title: "Terreno", level: 1 },
    { id: "deployment", title: "Posicionamento", level: 1 },
    { id: "specialRules", title: "Regras Especiais", level: 1 },
    { id: "starting", title: "Início do Jogo", level: 1 },
    { id: "victoryCondition", title: "Condição de Vitória", level: 1 },
    { id: "experience", title: "Experiência", level: 1 },
    { id: "reward", title: "A Recompensa", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>O Herdeiro Perdido</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Menestréis itinerantes frequentemente contam histórias da Cidade
                dos Condenados e, por causa disso, filhos das classes
                privilegiadas frequentemente veem a cidade de Mordheim como uma
                grande aventura romântica. Às vezes um deles foge de casa para
                se unir a um bando mercenário e se provar para sua família.
                Frequentemente esses indivíduos são mortos antes mesmo de
                chegarem à cidade, mas de vez em quando um tem sorte e realmente
                chega lá. Às vezes suas famílias ficam felizes em ver o jovem
                tolo ir, mas de vez em quando, um rico mercador ou nobre
                realmente pagará para ter seu filho salvo de seu destino
                inevitável em Mordheim.
              </MobileText>
              <MobileText variant="quote" className="mb-6 italic">
                Os bandos ouviram rumores de que o filho de um homem poderoso
                vagueou para as ruínas e uma recompensa generosa será paga por
                seu retorno.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Os Bandos tentam resgatar um rico herdeiro.
              </MobileText>
            </div>

            <div id="terrain" className="mt-8">
              <HeaderH2>Terreno</HeaderH2>
              <MobileText>
                Cada jogador, alternando, coloca uma peça de terreno — seja um
                prédio em ruínas, torre ou item similar, até que a mesa esteja
                densamente populada com terreno, cheias de becos e curvas
                sinuosas. Sugerimos que o terreno seja montado dentro de uma
                área aproximada de 4' x 3' (120cm x 90cm).
              </MobileText>
            </div>

            <div id="deployment" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>
              <MobileText>
                Os jogadores rolam um D20 + Vontade do líder do bando. Eles
                então alternam escolhendo um segmento e posicionando suas
                figuras em uma ordem determinada por essa rolagem.
              </MobileText>
            </div>

            <CollapsibleImage
              src={multiplayerGamesImg}
              alt="Jogos Multijogador"
              imgClassName="w-3/4 mx-auto rounded-lg"
            />

            <div id="specialRules" className="mt-8">
              <HeaderH2>Regras Especiais</HeaderH2>
              <MobileText className="mb-4">
                O filho do mercador é inicialmente colocado no centro do
                tabuleiro. Ele vagará 10 cm em uma direção aleatória no início
                de cada turno do primeiro jogador, até que alguém o "resgate".
              </MobileText>
              <MobileText className="mb-4">
                Se um membro do bando entrar em contato com o filho do mercador
                (através de movimento normal, NÃO através de carga — esta é uma
                exceção às regras normais e representa que o filho do mercador
                não é um inimigo e não deve ser engajado em combate), o garoto
                se apegara àquele membro e o seguirá por aí.
              </MobileText>
              <MobileText className="mb-4">
                Se o "resgatador" é reduzido a 0 de vida ou seu bando debanda, o
                filho do mercador se apegara a próxima figura que entrar em
                contato com ele.
              </MobileText>
              <MobileText>
                Se alguém desejar atacar o filho do mercador, ele tem as mesmas
                estatísticas de um Recruto (veja o bando Mercenários) e está
                armado com uma espada e adaga. Se ele for morto, o jogo
                imediatamente termina e nenhum bando vence o jogo.
              </MobileText>
            </div>

            <div id="victoryCondition" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                O jogo termina quando um bando consegue tirar o filho do
                mercador da mesa. Esse bando (e qualquer bando aliado) é o
                vencedor.
              </MobileText>
            </div>

            <div id="experience" className="mt-8">
              <HeaderH2>Experiência</HeaderH2>
              <MobileText>
                <ul>
                  <li>
                    <strong>Sobrevivência</strong>: Se um Herói ou Soldado
                    sobrevive à batalha, eles ganham +1 de Experiência.
                  </li>
                  <li>
                    <strong>Líder Vencedor</strong>: O líder do bando vencedor
                    ganha +1 de Experiência.
                  </li>
                  <li>
                    <strong>Inimigo Fora de Ação</strong>: Um Herói ganha +1 de
                    Experiência para cada inimigo que ele reduz a 0 de vida.
                  </li>
                </ul>
              </MobileText>
            </div>

            <div id="reward" className="mt-8">
              <HeaderH2>A Recompensa</HeaderH2>
              <MobileText className="mb-4">
                O pai agradecido premia o bando vencedor com o seguinte tesouro.
                Note que você rola para cada item separadamente, e o ganha se o
                resultado for igual ou maior que o valor indicado exceto pelas
                coroas de ouro, que são sempre recebidas. Se mais de um bando
                vencer o jogo, os jogadores devem definir quem rolará para cada
                item e dividir as coroas.
              </MobileText>
              <GenericTable data={rewardTableData} scrollable={false} />
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default LostPrincePage;
