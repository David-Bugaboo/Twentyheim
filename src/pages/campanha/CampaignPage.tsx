import MobileText from "../../components/MobileText";

import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";

import MobileNavigationButtons from "../../components/MobileNavigationButtons";
import HeaderH3 from "../../components/HeaderH3";

function CampaignPage() {
  // Dados para a tabela de passos da fase de campanha

  // Botões de navegação para cada passo
  const navigationButtons = [
    { label: "1. Ferimentos e Morte", path: "/campaign/survival-test" },
    { label: "2. Experiência e Níveis", path: "/campaign/skills" },
    { label: "3. Atividades de Campanha", path: "/campaign/exploration" },
    { label: "4. Venda Pedra-Bruxa", path: "/campaign/wyrdstone-selling" },
    { label: "5. Gastar Coroas", path: "/campaign/rewards" },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <div className="space-y-6">
            <HeaderH1>A Fase de Campanha</HeaderH1>

            <MobileText className="mb-6">
              Enquanto 20Heim pode ser jogada com jogos isolados, essa não é a
              forma ideal de jogar. A melhor forma é jogar uma campanha, uma
              cadeia de jogos interconectados, onde cada jogo tem consequências
              para o futuro do bando, e seus heróis crescem em poder e posses.
              Após um jogo, começa a Fase de Campanha, onde os jogadores
              desenrolarão as várias consequências do que foi feito no jogo
              anterior.
            </MobileText>

            <HeaderH2>Passos da Fase de Campanha</HeaderH2>
            <MobileText className="mb-4">
              A Fase de Campanha deve ser realizada na seguinte ordem:
            </MobileText>
            <HeaderH3>1. Ferimentos e Morte</HeaderH3>
            <MobileText>
              Teste de sobrevivência para heróis e soldados feridos
            </MobileText>
            <HeaderH3>2. Alocar experiência e subir níveis</HeaderH3>
            <MobileText>
              Distribuir pontos de experiência e subir níveis
            </MobileText>
            <HeaderH3>3. Atividades de campanha</HeaderH3>
            <MobileText>Exploração, eventos e atividades do bando</MobileText>
            <HeaderH3>4. Venda Pedra-Bruxa</HeaderH3>
            <MobileText>Vender fragmentos de Pedra-Bruxa coletados</MobileText>
            <HeaderH3>5. Gastar Coroas</HeaderH3>
            <MobileText>Comprar equipamentos, contratar soldados</MobileText>

            <HeaderH2>Navegação Rápida</HeaderH2>
            <MobileText className="mb-4">
              Clique nos botões abaixo para acessar cada seção da fase de
              campanha:
            </MobileText>
            <MobileNavigationButtons buttons={navigationButtons} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignPage;
