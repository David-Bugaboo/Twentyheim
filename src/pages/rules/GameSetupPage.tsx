import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import WarningBox from "../../components/WarningBox";

function GameSetupPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Preparação da Partida</PageTitle>

            <MobileText>
              Bando montado, equipamentos comprados e anotados. Resta jogar. Para se
              preparar para uma partida, siga os passos abaixo.
            </MobileText>

            <HeaderH1>1) Delimitar o Tabuleiro</HeaderH1>
            <MobileText>
              Uma partida de Mordheim v20 é jogada em um tabuleiro quadrado de
              90x90cm. Essas dimensões permitem jogar com tranquilidade na maioria dos
              tamanhos de mesa presentes nas casas brasileiras. Caso os jogadores
              desejem um jogo mais lento, podem optar por usar um tabuleiro de
              120cmx120cm. Isso gerará partidas mais longas ou diminuirá a letalidade
              inerente de jogos com mais de dois jogadores, mas pode ser exatamente o
              que seu bando busca. Jogar em tabuleiros menores que 90x90cm é possível,
              mas oferecerá uma vantagem considerável a bandos focados em combate
              corpo-a-corpo. Embora não seja estritamente necessário, um{" "}
              <strong>playmat</strong> é uma excelente recomendação, visto que as
              imagens impressas nela podem melhorar a imersão do jogo e a superficie
              do playmat ajuda a nivelar imperfeições da mesa usada para o jogo e
              evitar danos nas bases. Após delimitar um espaço adequado para jogar,
              com ou sem playmat, o próximo passo é posicionar cenários.
            </MobileText>

            <HeaderH1>2) Cenários</HeaderH1>
            <MobileText>
              Os jogadores devem posicionar cenários de forma colaborativa,
              priorizando criar um cenário bonito, narrativo e verticalizado. Mordheim
              é repleta de becos tortutosos, ruínas, escombros e outros horrores,
              então tente passar essa idéia com o posicionamento dos cenários. É
              interessante ter várias construções com plataformas, andares e níveis,
              permitindo que a partida extraia o máximo das mecânicas de movimentação
              do jogo. Além disso, é importante que ao traçar uma linha imaginária de
              qualquer ponto de uma borda da mesa a borda oposta, esta linha seja
              completamente obstruída, garantindo cobertura e esconderijo para os
              bandos que explorarão as ruínas nesta escaramuça.
            </MobileText>

            <div className="mt-4 mb-4">
              <img
                src="/src/assets/terrain-layout-example.png"
                alt="Exemplo de disposição de terreno em Mordheim - mesa com edifícios de papercraft, ruínas, igreja central e miniaturas posicionadas"
                className="w-full rounded-lg border border-[#382929] shadow-lg"
              />
              <MobileText variant="small" className="text-center mt-2 text-[#b89d9d]">
                Exemplo de disposição de terreno: mesa com edifícios de papercraft,
                ruínas, igreja central e miniaturas posicionadas para uma escaramuça
                em Mordheim
              </MobileText>
            </div>

            <HeaderH1>3) Posicionar Fragmentos de Pedra-bruxa</HeaderH1>
            <MobileText>
              Agora você tem uma bela seção arruinada de Mordheim para derramar o
              sangue dos tolos que ousarem te enfrentar. Agora, você precisa de
              algum motivo para derramar suas vísceras no pavimento, certo? Esse
              motivo são os fragmentos de pedra-bruxa. Valiosos, Venenosos e
              viciantes, esses fragmentos são o sangue das veias da economia de
              Mordheim, e os bandos batalhando aqui hoje buscam dominância sobre
              esse recurso. Os fragmentos podem ser representados por qualquer coisa
              com aproximadamente 25mm de diametro. Uma ficha de papel, pedras
              pintadas de verde em cima de uma base de 25mm ou até mesmo pequenas
              peças de impressão 3D que representem esses pedaços do cometa maldito
              que destruiu Mordheim. Esses marcadores sempre são referidos daqui
              para frente como Fragmentos de Pedra-bruxa. O primeiro fragmento deve
              ser posicionado no centro da mesa, ou no mais próximo possivel do
              centro. Então, cada jogador posiciona um fragmento dentro de 20cm do
              tesouro central, mas a mais de 15cm de qualquer outro fragmento.
              Então, cada jogador posiciona ums segundo fragmento a mais de 15cm de
              outros framentos e a mais de 23cm de qualquer borda do tabuleiro. Eles
              não precisam ser necessariamente posicionados na altura do chão, e
              podem ser postos em telhados ou plataformas.
            </MobileText>

            <div className="mt-4 mb-4">
              <img
                src="/src/assets/wyrdstone-fragment-example.png"
                alt="Exemplo de fragmento de Pedra-bruxa - pedra escura com formações cristalinas verdes luminosas emanando energia mágica"
                className="w-full max-w-md mx-auto rounded-lg border border-[#382929] shadow-lg"
              />
              <MobileText
                variant="small"
                className="text-center mt-2 text-[#b89d9d]"
              >
                Exemplo de fragmento de Pedra-bruxa: pedra escura com formações
                cristalinas verdes luminosas, representando a energia mágica e
                venenosa da wyrdstone
              </MobileText>
            </div>

            <HeaderH1>4) Posicionar Figuras</HeaderH1>
            <MobileText>
              Com todos esses passos concluídos, falta apenas posicionar as
              figuras de cada bando no mapa. Cada jogador rola um d20, e o jogador
              com a maior rolagem escolhe qual borda da mesa será a sua. A segunda
              maior rolagem escolhe outra borda (em uma partida de 2 jogadores,
              deve necessiariamente pegar a borda oposta), e assim sucessivamente.
              Os jogador que teve a maior rolagem posiciona todas as suas figuras, seguido 
              pelo jogador com a segunda maior rolagem, e assim sucessivamente. As figuras 
              devem ser todas posicionadas a até 15cm da sua borda da mesa.
            </MobileText>

            <HeaderH1>5) Jogar!</HeaderH1>
            <MobileText>
              Com tudo resolvido, só falta uma coisa: jogar, deixando os dados e suas jogadas contarem uma história épica na cidade dos condenados! Boa Sorte, e siga as regras dispostas na seção de{" "}
              <a href="/rules/combat-system" className="text-blue-400 underline">
                Sistema de Combate
              </a>{" "}
              para jogar sua partida!
            </MobileText>

            <WarningBox title="Dica para Novos Jogadores" type="info">
              Se esta é sua primeira partida, recomendamos começar com um tabuleiro
              de 90x90cm e cenários simples. Conforme ganhar experiência, você
              pode experimentar tabuleiros maiores e cenários mais complexos para
              aumentar o desafio e a imersão.
            </WarningBox>

            <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mt-6">
              <HeaderH2 className="mb-4 text-center">
                Checklist de Preparação
              </HeaderH2>
              <MobileText>✓ Tabuleiro de 90x90cm (ou 120x120cm) delimitado</MobileText>
              <MobileText>✓ Cenários posicionados com cobertura adequada</MobileText>
              <MobileText>✓ Fragmento central de Pedra-bruxa posicionado</MobileText>
              <MobileText>✓ Fragmentos adicionais posicionados pelos jogadores</MobileText>
              <MobileText>✓ Figuras posicionadas nas bordas (até 15cm)</MobileText>
              <MobileText>✓ Dados e marcadores prontos</MobileText>
              <MobileText>✓ Regras de combate consultadas</MobileText>
            </div>

            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              "Nas ruínas de Mordheim, cada esquina esconde perigo e oportunidade.
              Prepare-se bem, pois a cidade dos condenados não perdoa os
              despreparados."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default GameSetupPage;
