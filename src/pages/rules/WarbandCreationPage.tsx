import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import WarningBox from "../../components/WarningBox";
import HeaderH3 from "../../components/HeaderH3";

function WarbandCreationPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Montando Bando</PageTitle>

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
              armas, conquistar <strong>Pedra-bruxa</strong> e{" "}
              <strong>relíquias mágicas</strong>
              enquanto se embrenha pelos becos sombrios de Mordheim. É ali,
              entre vitórias e cicatrizes, que as lendas nascem.
            </WarningBox>

            <HeaderH1>Montando o Bando</HeaderH1>
            <MobileText>
              Cada jogador que jogará uma partida isolada, ou uma campanha, tem
              <strong>500 coroas de ouro</strong> para contratar e equipar seus
              solados. É o bastante para pagar algumas boas mãos para carregar
              pedra-bruxa para você. As figuras do bando são contratados na
              ordem abaixo. O primeiro passo é criar a sua conta em 20Heim, e
              criar seu bando no nosso construtor de bando. Então, siga os
              passos abaixo para ir criando sua tropa de desgarrados.
            </MobileText>

            <HeaderH2>1) Escolha sua facção</HeaderH2>
            <MobileText>
              Escolha uma dentre as 14 facções disponíveis no jogo. Ela ditará
              quais figuras voce pode contratar para o seu bando, e quais
              equipamentos estarão disponíveis para ele, além de determinar o
              motivo narrativo para que o bando esteja em Mordheim.
            </MobileText>

            <HeaderH2>2) O Héroi</HeaderH2>
            <MobileText>
              Todo bando precisa de um líder, o primeiro a enfrentar o perigo e,
              muitas vezes, o último a cair, liderando seus soldados junto a si.
              Cada facção tem uma figura que é determinada como o Héroi do
              bando, especificado em sua ficha. e ela é a primeira figura que
              deve ser adicionada ao bando. Os hérois não tem custo para serem
              contratados, e sempre são adicionados automaticamente no bando.
            </MobileText>

            <HeaderH2>3) O Campeão </HeaderH2>
            <MobileText>
              Tecnicamente opcional; praticamente essencial. Um campeão é seu
              braço direito e pode ativar soldados junto consigo assim como
              hérois, transformando desordem em força coordenada.
            </MobileText>

            <HeaderH3>Custo</HeaderH3>
            <MobileText>
              pague o custo em coroas indicado na ficha do campeão.
            </MobileText>

            <HeaderH2>Poderes, Magias e Outros</HeaderH2>
            <MobileText>
              Campeões e heróis costumam ser ativadores de poderes ou
              conjuradores. Cada ficha de figura diz quantos poderes ou magias
              de de quais listas ela pode escolher. Faça essas escolhas para
              ambas as figuras e proceda para contratar soldados.
            </MobileText>

            <HeaderH2>3) Os Soldados — Carne para o Moedor</HeaderH2>
            <MobileText>
              Recrute até <strong>8 soldados</strong> com o ouro restante.
              Alguns são veteranos, outros mal seguram uma lâmina sem se ferir.
              Cada soldado indica em sua ficha a quantidade máxima que pode
              existir no bando.
            </MobileText>

            <HeaderH2>Custos</HeaderH2>
            <MobileText>Pague o custo indicado na ficha do soldado.</MobileText>

            <HeaderH2>4) Equipando o Bando</HeaderH2>
            <MobileText>
              Após contratar todas as figuras do seu bando, é hora de equipá-las
              adequadamente. Cada figura precisa de armas, armaduras e
              acessórios para sobreviver às ruínas de Mordheim. Use o ouro
              restante para comprar equipamentos para cada membro do seu bando.
            </MobileText>

            <HeaderH3>Onde Comprar Equipamentos</HeaderH3>
            <MobileText>
              • <strong>Regras de Equipamento:</strong> Consulte a seção{" "}
              <a
                href="/rules/equipment-rules"
                className="text-blue-400 underline"
              >
                Regras de Equipamento
              </a>{" "}
              para entender como funcionam as regras de equipamento, restrições
              e limitações.
              <br />• <strong>Lista de Itens:</strong> Veja a lista completa com
              custos e estatísticas em{" "}
              <a href="/items/common-items" className="text-blue-400 underline">
                Itens Comuns
              </a>
              .
            </MobileText>

            <HeaderH3>Restrições de Compra</HeaderH3>
            <MobileText>
              <strong>Apenas itens comuns podem ser comprados</strong> durante a
              criação inicial do bando. Itens raros, mágicos e relíquias só
              estarão disponíveis durante campanhas, através de descobertas ou
              comércio especializado nas ruínas de Mordheim.
            </MobileText>

            <HeaderH3>Dicas de Equipamento</HeaderH3>
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

            <WarningBox title="Dicas para Novos Capitães" type="info">
                • <strong>Diversifique:</strong> Tenha figuras para combate
                corpo a corpo e à distância
                <br />• <strong>Mantenha reservas:</strong> Guarde algumas
                coroas para equipar seu bando.
                <br />• <strong>Soldados especializados:</strong> Figuras que
                consigam ocupar funções estratégicas bem definidas como ataque a
                distância, suporte mágico, batedores e etcetera.
                <br />• <strong>Comece simples:</strong> Não complique demais na
                primeira vez.
                <br />• <strong>Teste o básico:</strong> Aprenda as mecânicas
                antes de estratégias avançadas.
                <br />• <strong>Mantenha registros:</strong> Anote todo o
                possível se preferir não usar nosso construtor de bando. O
                importante é que voce se sinta confortável com o jogo e as
                regras.
                <br />• <strong>Comece simples:</strong> Não complique demais na
                primeira vez.
                <br />• <strong>Teste o básico:</strong> Aprenda as mecânicas
                antes de estratégias avançadas.
                <br />• <strong>Mantenha registros:</strong> Anote todo o
                possível se preferir não usar nosso construtor de bando. O
                importante é que voce se sinta confortável com o jogo e as
                regras.
              
            </WarningBox>
            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed mt-8"
            >
              Com as tropas contratadas, o bando entra nos mercados sujos e
              indignos de Mordheim buscando equipamentos para comprar. Vá para a
              seção de <a href="rules/equipment-rules">Equipamentos</a> para ver
              as regras de equipamento.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default WarbandCreationPage;
