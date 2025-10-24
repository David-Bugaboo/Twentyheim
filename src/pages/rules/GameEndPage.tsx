import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";

import QuickNavigation from "../../components/QuickNavigation";


function GameEndPage() {
  const navigationSections = [
    { id: "intro", title: "Encerramento do Jogo", level: 0 },
    { id: "condicoes-vitoria", title: "Condições de Vitória", level: 0 },
    {
      id: "captura-automatica",
      title: "Captura Automática de Fragmentos",
      level: 1,
    },
    { id: "resolucao-pos-jogo", title: "Resolução Pós-Jogo", level: 1 },
    { id: "resumo", title: "Resumo do Encerramento", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Encerramento do Jogo</PageTitle>
            </div>

            <MobileText>
              Toda partida em Mordheim tem seu fim. Seja pela exaustão dos
              combatentes, pela fuga com os tesouros, ou pela morte de todos os
              que ousaram desafiar as ruínas amaldiçoadas. O importante é saber
              quando parar... e o que fazer quando a poeira baixar.
            </MobileText>

            <div id="condicoes-vitoria">
              <HeaderH1>Condições de Vitória</HeaderH1>
            </div>
            <MobileText>
              A partida acaba quando uma das seguintes condições é cumprida:
            </MobileText>
            <MobileText>
              •{" "}
              <strong>Todos os fragmentos de Pedra-bruxa saíram do mapa</strong>{" "}
              — Os tesouros foram capturados, e não há mais razão para lutar nas
              ruínas.
            </MobileText>

            <MobileText>
              • <strong>Só um bando tem membros no tabuleiro</strong> — A
              vitória pela eliminação total. Os sobreviventes podem saquear as
              ruínas à vontade.
            </MobileText>

            <MobileText>
              • <strong>Alguma condição específica por cenários</strong> — Cada
              missão pode ter seus próprios objetivos e condições de vitória
              únicos.
            </MobileText>

            <div id="captura-automatica">
              <HeaderH2>Captura Automática de Fragmentos</HeaderH2>
            </div>
            <MobileText>
              Quando o jogo termina, qualquer figura segurando um fragmento de
              Pedra-bruxa automaticamente o captura para seu bando. Não importa
              onde ela esteja no mapa — se está viva e carregando o tesouro, ele
              é seu.
            </MobileText>

            <div id="resolucao-pos-jogo">
              <HeaderH2>Resolução Pós-Jogo</HeaderH2>
            </div>
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
          </MobileSection>
        </div>
      </div>
    </div>

  );
}

export default GameEndPage;
