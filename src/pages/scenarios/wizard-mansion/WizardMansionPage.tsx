import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import GenericTable from "../../../components/GenericTable";
import multiplayerGamesImg from "../../../assets/scenarios-images/multiplayer-games.png";
import HeaderH3 from "../../../components/HeaderH3";
import CollapsibleImage from "../../../components/CollapsibleImage";

function WizardMansionPage() {
  const defenderItemsData = [
    { D6: "1", Item: "Homem de Madeira" },
    { D6: "2", Item: "3 doses de Raiz de Mandrágora" },
    { D6: "3", Item: "3 doses de Sombra Carmesim" },
    { D6: "4", Item: "Amuleto da Sorte" },
    { D6: "5", Item: "Relíquia Sagrada" },
    { D6: "6", Item: "Manto de Seda de Cathay" },
  ];

  const wizardTreasureData = [
    { Item: "5D20 coroas", D6: "Automático" },
    { Item: "3 gemas valendo 10 coroas cada", D6: "5+" },
    { Item: "Tomo Arcano", D6: "10+" },
    { Item: "Espada Gromril", D6: "15+" },
    { Item: "Athame", D6: "14+" },
    { Item: "3 Lágrimas de Shallaya", D6: "10+" },
    { Item: "Pergaminho do Desvanecimento Arcano", D6: "15+" },
  ];

  const navigationSections = [
    { id: "intro", title: "A Mansão do Bruxo", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "terrain", title: "Terreno", level: 1 },
    { id: "attacker-and-defender", title: "Atacante e Defensor", level: 1 },
    { id: "deployment", title: "Posicionamento", level: 1 },
    { id: "starting", title: "Início do Jogo", level: 1 },
    { id: "specialRules", title: "Regras Especiais", level: 1 },
    { id: "victoryCondition", title: "Condição de Vitória", level: 1 },
    { id: "experience", title: "Experiência", level: 1 },
    { id: "wizardTreasure", title: "Tesouro do Bruxo", level: 1 },
    { id: "newItems", title: "Novos Itens", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>A Mansão do Bruxo</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Nem todos os prédios arruinados na cidade são casas comuns.
                Algumas estruturas notáveis eram as moradias de líderes
                importantes da cidade ou mercadores ricos. Conta-se que há salas
                escondidas repletas de tesouro em tais mansões. Os bandos
                descobriram a localização de um desses prédios. Rumores dizem
                que o antigo proprietário também se envolveu nas artes arcanas,
                o que pode explicar por que sua casa foi quase intocada pela
                devastação.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Um jogador defende a mansão do bruxo de outros bandos.
              </MobileText>
            </div>

            <div id="setup" className="mt-8">
              <HeaderH2>Terreno</HeaderH2>
              <MobileText>
                Cada jogador, alternando, coloca uma peça de terreno — seja um
                prédio em ruínas, torre ou item similar, até que a mesa esteja
                densamente populada com terreno, cheias de becos e curvas
                sinuosas. Sugerimos que o terreno seja montado dentro de uma
                área aproximada de 4' x 3' (120cm x 90cm). Posicione a mansão do
                bruxo no centro da mesa.
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
              figuras dentro ou a até 15cm da mansão do bruxo primeiro. Os
              atacantes então posicionam suas figuras alternadamente, em um
              segmento a sua escolha, usando como ordem a rolagem feita para
              determinar atacante e defensor.
              <MobileText className="mb-4">
                Além disso, para cada bando atacante além do primeiro, o
                defensor rola uma vez na tabela abaixo para determinar o
                equipamento adicional que seu bando começa com. Cada item pode
                ser encontrado apenas uma vez. Se o mesmo número for rolado mais
                de uma vez, re-role. Esses itens representam os achados do bando
                até agora e têm como objetivo dar ao bando uma chance contra
                múltiplos oponentes.
              </MobileText>
              <GenericTable data={defenderItemsData} scrollable={false} />
            </div>

            <CollapsibleImage
              src={multiplayerGamesImg}
              alt="Jogos Multijogador"
              imgClassName="w-3/4 mx-auto rounded-lg"
            />

            <div id="specialRules" className="mt-8">
              <HeaderH2>Regras Especiais</HeaderH2>
              <MobileText>
                Veja na seção de Novos Itens para o Homem de Madeira e os novos
                itens encontrados na mansão.
              </MobileText>
            </div>

            <div id="victoryCondition" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                O jogo termina quando todos os bandos, exceto um, falharam em
                seu teste de Debandad ou foram eliminados. Os que debandaram ou
                foram eliminados automaticamente perdem. automaticamente perdem.
                Se um ou mais bandos aliaram, eles podem escolher compartilhar a
                vitória e terminar o jogo.
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
                </ul>
              </MobileText>
            </div>

            <div id="wizardTreasure" className="mt-8">
              <HeaderH2>Tesouro do Bruxo</HeaderH2>
              <MobileText className="mb-4">
                No final do jogo, o bando vencedor encontra todos os itens da
                tabela de Equipamento do Defensor que não foram encontrados
                antes da batalha.
              </MobileText>
              <MobileText className="mb-4">
                Além disso, role na seguinte tabela para ver quais itens
                adicionais o bando encontra na mansão. Note que você rolará para
                cada item separadamente, exceto pelas coroas de ouro, que são
                sempre encontradas. Se rolar mais que o resultado indicado, você
                ganha o item. Se tiver compartilhado a vitória decida qual
                jogador rolará para cada item e divida as coroas.
              </MobileText>
              <GenericTable data={wizardTreasureData} scrollable={false} />
            </div>

            <div id="newItems" className="mt-8">
              <HeaderH2>Novos Itens</HeaderH2>

              <div className="mt-6">
                <HeaderH3 className="text-xl mb-4">Homem de Madeira</HeaderH3>
                <MobileText>
                  Use as estatísticas e regras especiais de um zumbi mas com a
                  característica Forte e +4 de vida máxima. O Homem de Madeira é
                  uma construção artificial em forma de homem, mas feito de
                  madeira. Ele seguirá os comandos do bando defensor, mas não
                  deixará a mansão do bruxo por nenhuma razão, mesmo após o
                  jogo. O Homem de Madeira obviamente não pode ser negociado.
                </MobileText>
              </div>

              <div className="mt-6">
                <HeaderH3 className="text-xl mb-4">Athame</HeaderH3>
                <MobileText>
                  Uma Athame é uma adaga de prata especial usada em rituais
                  mágicos. Se usada em combate, não manterá sua afiação. Para o
                  primeiro ataque em um jogo, contará como uma adaga normal. No
                  entanto, para o resto do jogo não contará mais como uma arma.
                  Uma figura com acesso a Invocação Daemoniaca ganha +2 no seu
                  teste de Conjuração para usa essa magia. A Athame vale 10
                  coroas de ouro se negociado.
                </MobileText>
              </div>

              <div className="mt-6">
                <HeaderH3 className="text-xl mb-4">
                  Pergaminho do Devanescimento Arcano
                </HeaderH3>
                <MobileText>
                  Este pergaminho contém um contra-feitiço poderoso. Ele pode
                  ser lido em voz alta como uma ação para imediatamente cancelar
                  o efeito de todas as magias em joga, incluindo Áreas de Efeito
                  e bônus. Após um uso, o pergaminho desintegrará e ficará
                  inútil. Ele pode ser negociado por 50 coroas.
                </MobileText>
              </div>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default WizardMansionPage;
