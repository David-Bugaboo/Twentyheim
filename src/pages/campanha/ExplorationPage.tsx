import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import HeaderH4 from "../../components/HeaderH4";
import CornerDecoration from "../../components/CornerDecoration";

function ExplorationPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Enviar Líderes às Ruínas</PageTitle>

            <MobileText>
              Heróis e campeões podem ser enviados para explorar as ruínas de
              Mordheim em busca de tesouros, conhecimento, ou poder. Esta é uma
              atividade arriscada, mas potencialmente recompensadora.
            </MobileText>

            <HeaderH1>Quem pode explorar</HeaderH1>
            <MobileText>
              Apenas líderes e hérois podem explorar as ruínas de Mordheim. Não
              que o resto do bando fique bebendo ou perdidos em cabarés enquanto
              os seus líderes se matam nas ruinas: Eles estão explorando junto,
              como suporte aos seus superiores.
            </MobileText>

            <HeaderH1>Atividades de Exploração</HeaderH1>

            <HeaderH2>Adentrar as Ruínas</HeaderH2>
            <MobileText>
              Se enviar seu héroi ou campeão para tentar a sorte nas ruínas,
              jogue um d20, e consulte a tabela de eventos na página Eventos de
              Exploração e confira que destino aguarda seu estimado líder. Caso
              envia ambos os líderes do bando, role 1d20 adicional e some o
              resultado ao primeiro. A tabela tem resultados de 1-40, garantindo
              que as melhores probabilidades só acontençam se ambos sairem rumo
              a cidade. Caso o jogador envie mais de 2 figuras para explorar as
              ruínas, cada figura adicional concede 1d20 extra, contudo
              independente de quantos d20 forem rolados, o jogador sempre deve
              escolher dois deles para ser a rolagem de exploração efetiva.
            </MobileText>

            <HeaderH2>Procurar no Mercado Negro</HeaderH2>
            <MobileText>
              Para cara uma das figuras enviadas para explorar as ruínas, o jogador 
              pode rolar 1d20. O jogador pode comprar qualquer item cuja Raridade 
              seja menor que o valor rodado no d20.
            </MobileText>

            <HeaderH2>Procurar Mercenários</HeaderH2>
            <MobileText>
              Para cara uma das figuras enviadas para explorar as ruínas, o jogador 
              pode rolar 1d20. O jogador pode contratar qualquer mercenário cuja raridade 
              seja menor que o valor rodado no d20.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default ExplorationPage;
