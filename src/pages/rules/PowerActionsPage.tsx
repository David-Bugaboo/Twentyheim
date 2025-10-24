import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import WarningBox from "../../components/WarningBox";
import QuickNavigation from "../../components/QuickNavigation";

function PowerActionsPage() {
  const navigationSections = [
    { id: "intro", title: "Ações de Habilidade", level: 0 },
    { id: "ativando-habilidades", title: "Ativando Habilidades", level: 0 },
    { id: "stress", title: "Stress — O Preço da Excelência", level: 1 },
    { id: "acao-especial", title: "Uma Ação Especial", level: 1 },
    { id: "forcar-poderes", title: "Forçar Poderes", level: 1 },
    {
      id: "stress-acumulado",
      title: "Stress Acumulado — O Limite da Carne",
      level: 1,
    },
    { id: "resumo", title: "Resumo das Ações de Poder", level: 1 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Ações de Habilidade</PageTitle>
            </div>

            <MobileText>
              Não é magia — é algo mais visceral. Mais brutal. O auge da
              habilidade marcial, técnica refinada até a perfeição, ou pura
              força de vontade manifestada em feitos sobre-humanos. Mas grandeza
              tem seu preço, e esse preço é pago em dor.
            </MobileText>

            <div id="ativando-habilidades">
              <HeaderH1>Ativando Habilidades</HeaderH1>
            </div>
            <MobileText>
              Uma figura que pode usar habilidades utiliza essa ação para
              ativá-las. A figura rola um <strong>d20</strong> — a rolagem de
              ativação. Se essa rolagem for <strong>maior ou igual</strong> que
              a <strong>Classe de Dificuldade (CD)</strong> da habilidade, a
              habilidade é ativada com sucesso. Caso contrário, a habilidade
              falha.
            </MobileText>

            <div id="stress">
              <HeaderH2>Stress — O Preço da Excelência</HeaderH2>
            </div>
            <MobileText>
              Ativar um habilidade é usar o auge da habilidade marcial do
              personagem, e a carga mental e física é grande. Músculos rasgam.
              Nervos queimam. Ossos rangem sob pressão impossível.
            </MobileText>

            <MobileText>
              <strong>Ao tentar ativar um habilidade:</strong> O jogador toma{" "}
              <strong>1 ponto de dano</strong> automaticamente. O esforço de
              tentar já cobra seu tributo.
            </MobileText>

            <MobileText>
              <strong>Caso falhe em ativar o habilidade:</strong> Toma mais{" "}
              <strong>2 pontos de dano</strong>, para um total de{" "}
              <strong>3 pontos</strong>. Falha não apenas nega o efeito — ela
              machuca. Profundamente.
            </MobileText>

            <div id="acao-especial">
              <HeaderH2>Uma Ação Especial</HeaderH2>
            </div>
            <MobileText>
              Esta ação é especial: ela <strong>não gasta</strong> uma das ações
              do jogador por padrão, a não ser que um habilidade específico
              exija isso para aplicar seus efeitos. Você pode ativar um
              habilidade e ainda mover, atacar, ou realizar outras ações. O
              corpo grita em protesto, mas obedece.
            </MobileText>

            <div id="forcar-poderes">
              <WarningBox title="Forçar Poderes" type="warning">
                <MobileText>
                  Assim como magias, habilidadees podem ser{" "}
                  <strong>Forçados</strong>. Aumente a rolagem de ativação em{" "}
                  <strong>+1 para cada 1 ponto de vida gasto</strong>. A rolagem
                  de ativação nunca pode exceder <strong>18</strong>.
                </MobileText>

                <MobileText>
                  <strong>Quando Forçar:</strong> Uma figura pode forçar{" "}
                  <strong>mesmo depois de já ter rolado</strong> o d20, e{" "}
                  <strong>mesmo se a rolagem tiver tido sucesso</strong>. Isso
                  permite tornar o efeito mais difícil de resistir, aumentar a
                  potência do habilidade, ou garantir que uma habilidade crucial
                  não falhe. O sangue sempre tem um preço, mas às vezes vale a
                  pena pagá-lo.
                </MobileText>
              </WarningBox>
            </div>

            <div id="stress-acumulado">
              <HeaderH2>Stress Acumulado — O Limite da Carne</HeaderH2>
            </div>
            <MobileText>
              Um jogador pode usar essa ação{" "}
              <strong>uma vez por ativação de cada figura</strong> no jogo,
              podendo usar vários habilidadees no mesmo turno — um a cada
              ativação. Mas à medida que o stress se acumula, os habilidadees
              ficam mais difíceis de ativar. O corpo tem limites.
            </MobileText>

            <MobileText>
              <strong>Penalidade Progressiva:</strong> Cada habilidade além do
              primeiro usado no turno tem sua CD aumentada em{" "}
              <strong>+3 para cada outro habilidade</strong> ativado antes dele:
            </MobileText>

            <MobileText>
              • <strong>Primeiro habilidade:</strong> CD normal
              <br />• <strong>Segundo habilidade:</strong> CD +3
              <br />• <strong>Terceiro habilidade:</strong> CD +6
              <br />• <strong>Quarto habilidade:</strong> CD +9
              <br />• <strong>Quinto habilidade:</strong> CD +12
              <br />• <strong>Sexto habilidade:</strong> CD +15
            </MobileText>

            <MobileText>
              <strong>Limite Absoluto:</strong> Quando a penalidade chegar a{" "}
              <strong>+15</strong>, habilidades não podem mais ser ativados
              neste turno. O corpo simplesmente se recusa. Carne e osso têm
              limites que nem a vontade mais feroz pode ultrapassar.
            </MobileText>

            <div id="resumo">
              <WarningBox title="Resumo das Ações de Poder" type="info">
                <MobileText>
                  • <strong>Rolagem:</strong> d20 contra CD do habilidade
                </MobileText>
                <MobileText>
                  • <strong>Sucesso:</strong> Rolagem de ativação {">="} CD =
                  habilidade ativado
                </MobileText>
                <MobileText>
                  • <strong>Falha:</strong> Rolagem de ativação {"<"} CD =
                  habilidade falha
                </MobileText>
                <MobileText>
                  • <strong>Dano por tentar:</strong> 1 ponto automático
                </MobileText>
                <MobileText>
                  • <strong>Dano por falhar:</strong> +2 pontos (total 3)
                </MobileText>
                <MobileText>
                  • <strong>Forçar:</strong> +1 por ponto de vida gasto (máximo
                  18)
                </MobileText>
                <MobileText>
                  • <strong>Penalidade progressiva:</strong> +3 CD por
                  habilidade adicional
                </MobileText>
                <MobileText>
                  • <strong>Limite:</strong> Máximo +15 de penalidade
                </MobileText>
              </WarningBox>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default PowerActionsPage;
