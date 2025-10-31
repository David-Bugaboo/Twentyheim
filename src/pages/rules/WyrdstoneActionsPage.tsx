import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import QuickNavigation from "../../components/QuickNavigation";
import WarningBox from "../../components/WarningBox";

function WyrdstoneActionsPage() {
  const navigationSections = [
    { id: "intro", title: "Carregar Itens", level: 0 },
    { id: "ato-carregar", title: "O Ato de Carregar", level: 0 },
    {
      id: "restricoes-proximidade",
      title: "Restrições de Proximidade",
      level: 1,
    },
    { id: "containers", title: "Containers e Baús", level: 1 },
    { id: "penalidades", title: "Penalidades por Carregar", level: 0 },
    { id: "sobrecarga", title: "Sobrecarga", level: 1 },
    { id: "movimento", title: "Movimento Reduzido", level: 1 },
    { id: "fugir", title: "Fugir com o Item", level: 0 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Carregar Itens</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "A Pedra-Bruxa pulsava em suas mãos, pesada demais para ser um
              simples tesouro. Cada passo era um suplício. Mas o ouro que ela
              valeria nas sombras de Mordheim... isso valeria qualquer
              sacrifício."
              <br />
              <span className="text-sm text-white mt-2 block">
                — Memórias de um Buscador de Tesouros
              </span>
            </MobileText>

            <MobileText>
              Em Mordheim, nem todo tesouro é leve. Alguns itens valiosos — como
              fragmentos de Pedra-Bruxa, baús de moedas, artefatos mágicos, ou
              equipamentos pesados — são objetos grandes e pesados que exigem
              esforço significativo para serem carregados.
            </MobileText>

            <MobileText>
              As regras de carregar itens se aplicam a qualquer objeto pesado ou
              valioso que uma figura queira transportar durante uma batalha.
              Essas regras refletem o peso físico do item, bem como a
              dificuldade de manobrar enquanto segura algo tão valioso.
            </MobileText>

            <div id="ato-carregar">
              <HeaderH1>O Ato de Carregar</HeaderH1>
            </div>

            <MobileText>
              Uma figura pode gastar <strong>uma ação</strong> para pegar e
              começar a carregar um item pesado do chão. Esta ação representa o
              esforço de levantar o objeto e posicioná-lo de forma que possa ser
              transportado.
            </MobileText>

            <div id="restricoes-proximidade">
              <HeaderH2>Restrições de Proximidade</HeaderH2>
            </div>

            <MobileText>
              Uma figura <strong>não pode usar essa ação</strong> se um inimigo
              está a menos de <strong>3 cm do item</strong>. Tentar pegar um
              tesouro pesado enquanto inimigos estão por perto é uma receita
              para o desastre — a figura estará vulnerável e desbalanceada
              durante o processo.
            </MobileText>

            <div id="containers">
              <HeaderH2>Items trancados</HeaderH2>
            </div>
            <MobileText>
              Se o item está dentro de um baú, container ou estrutura fechada, a
              figura deve primeiro gastar uma ação para{" "}
              <strong>destravar o container</strong>, fazendo um teste de{" "}
              <strong>Vontade</strong> contra <strong>CD 14</strong>.
            </MobileText>

            <MobileText>
              Somente após o sucesso neste teste é que uma ação pode ser gasta
              para pegar o item. Destravar requer foco e habilidade — nem todos
              os fechos podem ser abertos sob pressão.
            </MobileText>

            <div id="penalidades">
              <HeaderH1>Penalidades por Carregar</HeaderH1>
            </div>
            <MobileText>
              Carregar itens pesados impõe penalidades significativas à figura.
              O peso físico do objeto, combinado com a necessidade de protegê-lo
              durante a batalha, torna a figura mais lenta e menos eficaz em
              combate.
            </MobileText>

            <div id="movimento">
              <HeaderH2>Movimento Reduzido</HeaderH2>
            </div>
            <MobileText>
              Enquanto estiver carregando um item pesado, a figura tem apenas{" "}
              <strong>metade do seu movimento normal</strong> (arredonde para
              baixo). Um soldado que normalmente se move 16 cm agora se move
              apenas 8 cm.
            </MobileText>

            <MobileText>
              Este movimento reduzido afeta todas as formas de movimento,
              incluindo cargas, escaladas e outros movimentos especiais.
            </MobileText>

            <div id="sobrecarga">
              <HeaderH2>Sobrecarga</HeaderH2>
            </div>
            <MobileText>
              Carregar um item pesado exige manter equilíbrio enquanto se tenta
              lutar. Uma figura carregando um item pesado fica{" "}
              <strong>sobrecarregada</strong> se estiver usando qualquer arma
              que não seja uma <strong>adaga</strong> ou arma de mão sem as
              características <strong>Duas Mãos</strong> ou{" "}
              <strong>Desbalanceada</strong>.
            </MobileText>

            <MobileText>
              Uma figura sobrecarregada sofre <strong>-2</strong> em{" "}
              <strong>Ímpeto</strong>, <strong>Precisão</strong>, rolagens de{" "}
              <strong>conjuração</strong> e <strong>Liderança</strong>.
            </MobileText>

            <WarningBox title="Exceções" type="info">
              <MobileText>
                <strong>Figuras com armas leves na mão secundária</strong> devem
                abrir mão do bônus de lutar com duas armas para conseguir
                carregar itens pesados.
              </MobileText>
            </WarningBox>

            

            <WarningBox title="Resumo das Regras de Carregar Itens" type="info">
              <MobileText>
                • <strong>Ação:</strong> Uma ação para pegar item pesado
              </MobileText>
              <MobileText>
                • <strong>Proximidade:</strong> Inimigos a menos de 3 cm impedem
                a ação
              </MobileText>
              <MobileText>
                • <strong>Containers:</strong> Destravar primeiro (Ld CD 14)
              </MobileText>
              <MobileText>
                • <strong>Movimento:</strong> Reduzido para metade (arredondado
                para baixo)
              </MobileText>
              <MobileText>
                • <strong>Sobrecarga:</strong> -2 em Ímpeto, Precisão,
                Conjuração e Vontade
              </MobileText>
            </WarningBox>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-8 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "A ganância tem peso. Em Mordheim, esse peso é medido em
              centímetros perdidos, golpes falhados e inimigos alcançando suas
              costas enquanto você tropeça com suas riquezas malditas."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default WyrdstoneActionsPage;
