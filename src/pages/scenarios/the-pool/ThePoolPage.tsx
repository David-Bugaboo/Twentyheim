import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import QuickNavigation from "../../../components/QuickNavigation";
import HeaderH2 from "../../../components/HeaderH2";
import multiplayerGamesImg from "../../../assets/scenarios-images/multiplayer-games.png";
import CollapsibleImage from "../../../components/CollapsibleImage";

function ThePoolPage() {
  const navigationSections = [
    { id: "intro", title: "O Lago", level: 0 },
    { id: "flavor", title: "História", level: 1 },
    { id: "description", title: "Descrição", level: 1 },
    { id: "terrain", title: "Terreno", level: 1 },
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
              <PageTitle>O Lago</PageTitle>
            </div>

            <div id="flavor" className="mt-8">
              <MobileText variant="quote" className="mb-6 italic">
                Rumores abundam sobre uma poça na cidade cujas águas têm poderes
                mágicos de cura. Os patronos dos bandos acreditam que as
                propriedades mágicas da água se devem a um grande depósito de
                Pedra-Bruxa dentro da poça. Os bandos foram enviados para
                coletar o máximo de Pedra-Bruxa possível da poça.
              </MobileText>
            </div>

            <div id="description" className="mt-8">
              <HeaderH2>Descrição</HeaderH2>
              <MobileText>
                Bandos reviram um Lago contaminado em Mordheim em busca de
                Pedra-Bruxa.
              </MobileText>
            </div>

            <div id="terrain" className="mt-8">
              <HeaderH2>Terreno</HeaderH2>
              <MobileText className="mb-4">
                Cada jogador, alternando, coloca uma peça de terreno — seja um
                prédio em ruínas, torre ou item similar. Sugerimos que o terreno
                seja montado dentro de uma área aproximada de 4' x 3' (120cm x
                90cm).
              </MobileText>
              <MobileText>
                A primeira peça de terreno deve ser um lago com aproximadamente
                15cm de diâmetro. O objetivo do cenário é reunir toda a
                Pedra-Bruxa desse lago.
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
                Role um 1d20 para descobrir quantos fragmentos de Pedra-Bruxa
                estão no lago. O lago conta como água rasa. Qualquer Herói que
                gaste duas ações (uma delas podendo ser de movimento) dentro de
                do lago procurando Pedra-Bruxa pode rolar para conferir se
                encontrou pedra-bruxa.
              </MobileText>
              <MobileText className="mb-4">
                O Herói faz um teste de Vontade CD 16. Caso tenha sucesso, ele
                encontra um fragmento de Pedra-Bruxa.
              </MobileText>
              <MobileText className="mb-4">
                Apenas tantos fragmentos quanto foram rolados no início do jogo
                podem ser encontrados; qualquer procura depois disso é inútil.
                Um Herói pode carregar qualquer quantidade de Pedra-Bruxa sem
                penalidade.
              </MobileText>
              <MobileText>
                Heróis não podem transferir sua Pedra-Bruxa para outro
                guerreiro. Se o Herói que está carregando Pedra-Bruxa é reduzido
                a 0 de vida, coloque a quantidade de Pedra-Bruxa que ele
                carregava em marcadores de Pedra-Bruxa na mesa novamente onde
                ele caiu. Outra figura pode então pegar esses marcadores
                simplesmente movendo-se para contato com eles.
              </MobileText>
            </div>

            <div id="victoryCondition" className="mt-8">
              <HeaderH2>Condição de Vitória</HeaderH2>
              <MobileText>
                O jogo termina quando todos os bandos, exceto um, falharam em
                seu teste de Debandada ou forem eliminados. Os que debandaram ou
                foram eliminados automaticamente perdem. Se um ou mais bandos
                aliaram, eles podem escolher compartilhar a vitória e terminar o
                jogo.
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
                    Experiência para cada inimigo que ele coloca fora de ação.
                  </li>
                  <li>
                    <strong>Por Marcador de Pedra-Bruxa</strong>: Se um Herói ou
                    Soldado está carregando um marcador de Pedra-Bruxa no final
                    da batalha, ele recebe +1 de Experiência.
                  </li>
                </ul>
              </MobileText>
            </div>

            <div id="wyrdstone" className="mt-8">
              <HeaderH2>Pedra-Bruxa</HeaderH2>
              <MobileText>
                Seu bando ganha um fragmento de Pedra-Bruxa para cada marcador
                em sua posse no final da batalha.
              </MobileText>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default ThePoolPage;
