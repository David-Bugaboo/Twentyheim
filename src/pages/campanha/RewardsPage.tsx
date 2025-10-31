import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import { useNavigate } from "react-router-dom";

function RewardsPage() {
  const navigate = useNavigate();
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

            <HeaderH1>Contratar e Pagar Mercenários</HeaderH1>
            <MobileText>
              O jogador pode contratar quaisquer mercenários disponíveis para
              seu bando e então pagar suas taxas de manutenção. Se contratar
              mercenários, recalcule a qualidade do bando, lembrando de somar os
              valores específicos que cada mercenário adiciona a qualidade do
              bando.
            </MobileText>

            <button
              onClick={() => navigate("/campaign/mercenaries")}
              className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
            >
              Mercenários
            </button>

            <HeaderH1>Contratar e Pagar Lendas</HeaderH1>
            <MobileText>
              O jogador pode contratar quaisquer lendas que seus Heróis tenham
              encontrado durante a atividade "Encontrar Lendas". Se uma lenda já
              estiver no bando, ele então paga o custo de manutenção nessa
              etapa. Recalcule a qualidade do bando, lembrando de somar os
              valores específicos que cada lenda adiciona a qualidade do bando.
            </MobileText>

            <button
              onClick={() => navigate("/campaign/legends")}
              className="w-full px-4 py-2 rounded-md transition-all duration-150 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white text-sm"
            >
              Lendas
            </button>

            <HeaderH1>Contratar Soldados e Heróis</HeaderH1>
            <MobileText>
              Você pode contratar novos soldados ou hérois, pagando a mesma
              quantidade que pagaria no começo da campanha. A diferença
              principal é que um novo soldado só pode ser equipado com um item
              não-comum se este for obtido através de{" "}
              <strong>Procurar no Mercado Negro.</strong> Recalcule a{" "}
              <a href="/rules/qualidade-do-bando">qualidade do bando</a>.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default RewardsPage;
