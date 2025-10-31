import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import multiplayerGamesImg from "../../../assets/scenarios-images/multiplayer-games.png";
import CollapsibleImage from "../../../components/CollapsibleImage";

function HeistPage() {
  const navigationSections = [
    { id: "intro", title: "Heist", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "terrain", title: "Terreno", level: 1 },
    { id: "attacker-and-defender", title: "Atacante e Defensor", level: 1 },
    { id: "deployment", title: "Posicionamento", level: 1 },
    { id: "specialRules", title: "Regras Especiais", level: 1 },
    { id: "starting", title: "Início do Jogo", level: 1 },
    { id: "victoryCondition", title: "Condição de Vitória", level: 1 },
    { id: "experience", title: "Experiência", level: 1 },
    { id: "wyrdstone", title: "Pedra-Bruxa", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>O Roubo</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                O bando defensor descobriu recentemente um rico depósito de
                Pedra-Bruxa. Infelizmente, a notícia vazou e bandos por toda a
                cidade estão os caçando, determinados a tomar o tesouro para si
                mesmos.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Bandos tentam roubar o saque de Pedra-Bruxa de outro.
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

            <div id="attacker-and-defender" className="mt-8">
              <HeaderH2>Atacante e Defensor</HeaderH2>
              <MobileText className="mb-4">
                Todos os jogadores rolam um D20 + Vontade do lider do seu bando.
                O Vencedor escolher quem será o defensor e os atacantes.
              </MobileText>
            </div>

            <div id="deployment" className="mt-8">
              <HeaderH2>Posicionamento</HeaderH2>O Defensor posiciona suas
              figuras dentro ou a até 15cm do centro do tabuleiro. Os atacantes
              então posicionam suas figuras alternadamente, em um segmento a sua
              escolha, usando como ordem a rolagem feita para determinar
              atacante e defensor.
            </div>

            <CollapsibleImage
              src={multiplayerGamesImg}
              alt="Jogos Multijogador"
              imgClassName="w-3/4 mx-auto rounded-lg"
            />

            <div id="specialRules" className="mt-8">
              <HeaderH2>Regras Especiais</HeaderH2>
              <MobileText className="mb-4">
                Cada Herói do bando defensor carrega 2 fragmentos de
                Pedra-Bruxa. Se um Herói carregando Pedra-Bruxa é reduzido a 0
                de vida, coloque um número de marcadores igual à quantidade de
                Pedra-Bruxa que ele estava carregando no chão onde ele caiu.
              </MobileText>
              <MobileText>
                Qualquer Herói movendo-se para contato com os marcadores de
                Pedra-Bruxa pode pegar esses fragmentos de Pedra-Bruxa,
                derrubando-os caso seja reduzido a 0 de vida. Uma figura com
                marcadores de Pedra-Bruxa pode fugir do tabuleiro, movendo-se
                para fora de qualquer borda do tabuleiro.
              </MobileText>
            </div>

            <div id="victoryCondition" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText className="mb-4">
                Não role testes de Debandada durante este jogo. Em vez disso, o
                jogo durará 10 turnos ou até que todos os fragmentos de
                Pedra-Bruxa tenham sido carregados para fora da mesa, o que vier
                primeiro.
              </MobileText>
              <MobileText>
                O bando que conseguir tirar mais fragmentos de Pedra-Bruxa do
                tabuleiro (conte fragmentos carregados pelo bando do héroi ao
                final dos 10 turnos) é considerado o vencedor.
              </MobileText>
            </div>

            <div id="experience" className="mt-8">
              <HeaderH2>Experiência</HeaderH2>
              <MobileText>
                <ul>
                  <li>
                    <strong>Sobrevivência</strong>: Se um Herói ou grupo de
                    Seguidores sobrevive à batalha, eles ganham +1 de
                    Experiência.
                  </li>
                  <li>
                    <strong>Líder Vencedor</strong>: O líder do bando vencedor
                    ganha +1 de Experiência.
                  </li>
                  <li>
                    <strong>Inimigo Fora de Ação</strong>: Um Herói ganha +1 de
                    Experiência para cada inimigo que ele coloca fora de ação.
                  </li>
                  <li>
                    <strong>Por Marcador de Pedra-Bruxa</strong>: Se um Herói ou
                    Seguidor está carregando um marcador de Pedra-Bruxa no final
                    da batalha, ele recebe +1 de Experiência.
                  </li>
                </ul>
              </MobileText>
            </div>

            <div id="wyrdstone" className="mt-8">
              <HeaderH2>Pedra-Bruxa</HeaderH2>
              <MobileText>
                Seu bando ganha um fragmento de Pedra-Bruxa para cada marcador
                em sua posse ou retirado da mesa por uma figura do bando no
                final da batalha.
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default HeistPage;
