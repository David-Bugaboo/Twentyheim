import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";

function RewardsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Gastando Coroas</PageTitle>

            <MobileText>
              Se você vendeu seus fragmentos de pedra-bruxa, ou um herói
              conseguiu um bom saque explorando as ruínas, esse é o momento de
              gastar suas coroas.
            </MobileText>

            <HeaderH1>Vender Itens</HeaderH1>
            <MobileText>
              O jogador pode vender qualquer item que tenha no cofre do seu
              bando, ganhando metade das coroas do preço de compra dele.
            </MobileText>

            <HeaderH1>Rearmar-se</HeaderH1>
            <MobileText>
              Qualquer número de itens de raridade comum podem ser comprados
              pelos seus custos normais. Lembre-se de que figuras só podem
              equipar itens que estejam na sua tabela de equipamento.
            </MobileText>

            <HeaderH1>Comprar Itens Raros</HeaderH1>
            <MobileText>
              Se o jogador tiver enviado seus heróis para procurar itens no
              mercado negro, ele pode comprar os itens rolados na atividade.
            </MobileText>

            <HeaderH1>Contratar Soldados e Heróis</HeaderH1>
            <MobileText>
              Você pode contratar novos soldados, pagando a mesma quantidade que
              pagaria no começo da campanha. A diferença principal é que um novo
              soldado só pode ser equipado com um item raro se este for obtido
              através de <strong>Procurar no Mercado Negro.</strong> Todos os
              limites normais de limite de soldados se aplica. Todos começam no
              nível 1. Você pode contratar soldados de nível mais alto
              multiplicando o custo pelo nível pretendido. (um Carniçal de 50
              coroas custaria 150 coroas para contratar no nível 3.) Role todos
              os avanços imediatamente. Uma figura nunca pode ser comprada com o
              nível maior que o maior nível dentre as figuras do bando.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default RewardsPage;
