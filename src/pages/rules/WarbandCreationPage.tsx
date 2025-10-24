import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import WarningBox from "../../components/WarningBox";
import HeaderH3 from "../../components/HeaderH3";
import QuickNavigation from "../../components/QuickNavigation";

function WarbandCreationPage() {
  const navigationSections = [
    { id: "intro", title: "Montando Bando", level: 0 },
    { id: "montando-bando", title: "Montando o Bando", level: 0 },
    { id: "passo-1", title: "1) Escolha sua facção", level: 1 },
    { id: "passo-2", title: "2) Contratando Figuras", level: 1 },
    { id: "passo-3", title: "3) Equipando o Bando", level: 1 },
    { id: "onde-comprar", title: "Onde Comprar Equipamentos", level: 1 },
    { id: "dicas-equipamento", title: "Dicas de Equipamento", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Montando Bando</PageTitle>
            </div>

            <MobileText>
              Então você deseja liderar almas condenadas pelas ruínas de
              Mordheim? Admirável… ou tolice. Antes de cruzar os portões
              rachados, todo capitão recebe uma bolsa com{" "}
              <strong>500 coroas de ouro</strong>. É o bastante para comprar
              esperança, armar desespero e — com sorte — sobreviver à primeira
              noite. Em Mordheim, cada coroa pesa tanto quanto sangue.
            </MobileText>

            <WarningBox title="Novos Jogadores" type="warning">
              Para novos jogadores, o ideal é jogar alguns{" "}
              <strong>confrontos isolados</strong>
              antes de iniciar uma campanha. Partidas únicas ajudam a aprender o
              fluxo de turno, medir distâncias, entender coberturas e se
              acostumar com as rolagens. Quanto melhor você conhecer as regras,
              mais cruel — e divertida — será a Cidade dos Condenados. Mas a{" "}
              <strong>verdadeira diversão</strong> está nas{" "}
              <strong>campanhas</strong>: ver seu bando{" "}
              <strong>crescer em poder e reputação</strong>, equipar novas
              armas, conquistar <strong>Pedra-Bruxa</strong> e{" "}
              <strong>relíquias mágicas</strong>
              enquanto se embrenha pelos becos sombrios de Mordheim. É ali,
              entre vitórias e cicatrizes, que as lendas nascem.
            </WarningBox>

            <div id="montando-bando">
              <HeaderH1>Montando o Bando</HeaderH1>
            </div>
            <MobileText>
              Cada jogador que jogará uma partida isolada, ou uma campanha, tem{" "}
              <strong>500 coroas de ouro</strong> para contratar e equipar seus
              soldados. É o bastante para pagar algumas boas mãos para carregar
              Pedra-Bruxa para você. As figuras do bando são contratadas na
              ordem abaixo. O primeiro passo é criar a sua conta em 20Heim, e
              criar seu bando no nosso construtor de bando. Então, siga os
              passos abaixo para ir criando sua tropa de desgarrados.
            </MobileText>

            <div id="passo-1">
              <HeaderH2>1) Escolha sua facção</HeaderH2>
            </div>
            <MobileText>
              Escolha uma dentre as facções disponíveis no jogo. Ela ditará
              quais figuras você pode contratar para o seu bando, e quais
              equipamentos estarão disponíveis para ele, além de determinar o
              motivo narrativo para que o bando esteja em Mordheim.
            </MobileText>

            <div id="passo-2">
              <HeaderH2>2) Contratando Figuras</HeaderH2>
            </div>
            <MobileText>
              Compre heróis e soldados seguindo as regras estabelecidas na seção
              Estrutura do Bando de cada facção. Escolha quaisquer magias,
              habilidades, mutações, marcas sagradas e outros benefícios
              disponíveis para cada figura. Pague o custo em coroas de cada
              modelo.
            </MobileText>

            <div id="passo-3">
              <HeaderH2>3) Equipando o Bando</HeaderH2>
            </div>
            <MobileText>
              Após contratar todas as figuras do seu bando, é hora de equipá-los
              adequadamente. Cada figura precisa de armas, armaduras e
              acessórios para sobreviver às ruínas de Mordheim. Use o ouro
              restante para comprar equipamentos para cada membro do seu bando,
              podendo comprar quaisquer itens disponíveis para cada personagem
              de acordo com sua tabela de equipamento. Figuras têm 5 espaços de
              equipamento para carregar, ou 6 no caso de figuras Grandes.
            </MobileText>

            <div id="onde-comprar">
              <HeaderH3>Onde Comprar Equipamentos</HeaderH3>
            </div>
            <MobileText>
              • <strong>Regras de Equipamento:</strong> Consulte a seção{" "}
              <a
                href="/rules/equipment-rules"
                className="text-green-300 hover:text-green-200 underline hover:no-underline transition-colors duration-200"
              >
                Regras de Equipamento
              </a>{" "}
              para entender como funcionam as regras de equipamento, restrições
              e limitações.
              <br />• <strong>Lista de Itens:</strong> Veja a lista completa com
              custos e estatísticas em{" "}
              <a
                href="/items/common-items"
                className="text-green-300 hover:text-green-200 underline hover:no-underline transition-colors duration-200"
              >
                Itens Comuns
              </a>
              .
            </MobileText>

            <div id="dicas-equipamento">
              <HeaderH3>Dicas de Equipamento</HeaderH3>
            </div>
            <MobileText>
              • <strong>Armas corpo a corpo:</strong> Dê a cada figura uma arma
              adequada ao seu papel no bando
              <br />• <strong>Armas à distância:</strong> Equipe alguns soldados
              com arcos, bestas ou armas de fogo
              <br />• <strong>Armaduras:</strong> Proteja seus soldados mais
              valiosos com armaduras adequadas
              <br />• <strong>Acessórios:</strong> Tochas, aljavas e outros
              equipamentos podem ser cruciais para a sobrevivência
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default WarbandCreationPage;
