import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import WarningBox from "../../components/WarningBox";
import CornerDecoration from "../../components/CornerDecoration";

function GameEndPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Encerramento do Jogo</PageTitle>

            <MobileText>
              Toda partida em Mordheim tem seu fim. Seja pela exaustão dos
              combatentes, pela fuga com os tesouros, ou pela morte de todos os
              que ousaram desafiar as ruínas amaldiçoadas. O importante é saber
              quando parar... e o que fazer quando a poeira baixar.
            </MobileText>

            <HeaderH1>Condições de Vitória</HeaderH1>
            <MobileText>
              A partida acaba quando uma das seguintes condições é cumprida:
            </MobileText>

            <MobileText>
              • <strong>6 turnos de jogo se passaram</strong> — O tempo se
              esgota, e mesmo os mais determinados devem recuar para as sombras.
            </MobileText>

            <MobileText>
              •{" "}
              <strong>Todos os fragmentos de Pedra-bruxa saíram do mapa</strong>{" "}
              — Os tesouros foram capturados, e não há mais razão para lutar nas
              ruínas.
            </MobileText>

            <MobileText>
              • <strong>Só um bando tem membros vivos</strong> — A vitória pela
              eliminação total. Os sobreviventes podem saquear as ruínas à
              vontade.
            </MobileText>

            <MobileText>
              • <strong>Alguma condição específica por cenários</strong> — Cada
              missão pode ter seus próprios objetivos e condições de vitória
              únicos.
            </MobileText>

            <HeaderH2>Captura Automática de Fragmentos</HeaderH2>
            <MobileText>
              Quando o jogo termina, qualquer figura segurando um fragmento de
              Pedra-bruxa automaticamente o captura para seu bando. Não importa
              onde ela esteja no mapa — se está viva e carregando o tesouro, ele
              é seu.
            </MobileText>

            <MobileText>
              <strong>Fragmentos Perdidos:</strong> Fragmentos esquecidos na
              mesa, sem ninguém para carregá-los, são perdidos para sempre. A
              Pedra-bruxa retorna às profundezas das ruínas, aguardando a
              próxima leva de tolos desesperados.
            </MobileText>

            <HeaderH2>Resolução Pós-Jogo</HeaderH2>
            <MobileText>
              Após o encerramento, os bandos devem resolver as consequências de
              suas ações. Ferimentos devem ser tratados, experiência deve ser
              distribuída, e os tesouros devem ser avaliados. A sobrevivência em
              Mordheim é apenas o primeiro passo — o verdadeiro desafio é
              prosperar.
            </MobileText>

            <MobileText>
              Consulte as regras de <strong>Pós-Jogo</strong> para detalhes
              sobre tratamento de ferimentos, desenvolvimento de figuras, e
              gerenciamento de recursos entre as partidas.
            </MobileText>

            <WarningBox title="Resumo do Encerramento" type="info">
              <MobileText>
                • <strong>6 turnos:</strong> Tempo esgotado
              </MobileText>
              <MobileText>
                • <strong>Todos os fragmentos saíram:</strong> Tesouros
                capturados
              </MobileText>
              <MobileText>
                • <strong>Um bando restante:</strong> Vitória por eliminação
              </MobileText>
              <MobileText>
                • <strong>Condições de cenário:</strong> Objetivos específicos
              </MobileText>
              <MobileText>
                • <strong>Captura automática:</strong> Figuras com fragmentos os
                capturam
              </MobileText>
              <MobileText>
                • <strong>Fragmentos perdidos:</strong> Sem carregador =
                perdidos para sempre
              </MobileText>
            </WarningBox>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-8"
            >
              "Em Mordheim, toda partida tem seu fim. Mas os verdadeiros
              vencedores são aqueles que sobrevivem para lutar outro dia."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default GameEndPage;
