import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import WarningBox from "../../components/WarningBox";
import CornerDecoration from "../../components/CornerDecoration";

function PowerActionsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Ações de Poder</PageTitle>

            <MobileText>
              Não é magia — é algo mais visceral. Mais brutal. O auge da
              habilidade marcial, técnica refinada até a perfeição, ou pura
              força de vontade manifestada em feitos sobre-humanos. Mas grandeza
              tem seu preço, e esse preço é pago em dor.
            </MobileText>

            <HeaderH1>Ativando Poderes</HeaderH1>
            <MobileText>
              Uma figura que pode usar poderes utiliza essa ação para ativá-los.
              A figura rola um <strong>d20</strong> — a rolagem de ativação. Se
              essa rolagem for <strong>maior ou igual</strong> que a{" "}
              <strong>Classe de Dificuldade (CD)</strong> do poder, o poder é
              ativado com sucesso. Caso contrário, o poder falha.
            </MobileText>

            <HeaderH2>Stress — O Preço da Excelência</HeaderH2>
            <MobileText>
              Ativar um poder é usar o auge da habilidade marcial do personagem,
              e a carga mental e física é grande. Músculos rasgam. Nervos
              queimam. Ossos rangem sob pressão impossível.
            </MobileText>

            <MobileText>
              <strong>Ao tentar ativar um poder:</strong> O jogador toma{" "}
              <strong>1 ponto de dano</strong> automaticamente. O esforço de
              tentar já cobra seu tributo.
            </MobileText>

            <MobileText>
              <strong>Caso falhe em ativar o poder:</strong> Toma mais{" "}
              <strong>2 pontos de dano</strong>, para um total de{" "}
              <strong>3 pontos</strong>. Falha não apenas nega o efeito — ela
              machuca. Profundamente.
            </MobileText>

            <HeaderH2>Uma Ação Especial</HeaderH2>
            <MobileText>
              Esta ação é especial: ela <strong>não gasta</strong> uma das ações
              do jogador por padrão, a não ser que um poder específico exija
              isso para aplicar seus efeitos. Você pode ativar um poder e ainda
              mover, atacar, ou realizar outras ações. O corpo grita em
              protesto, mas obedece.
            </MobileText>

            <WarningBox title="Forçar Poderes" type="warning">
              <MobileText>
                Assim como magias, poderes podem ser <strong>Forçados</strong>.
                Aumente a rolagem de ativação em{" "}
                <strong>+1 para cada 1 ponto de vida gasto</strong>. A rolagem
                de ativação nunca pode exceder <strong>18</strong>.
              </MobileText>

              <MobileText>
                <strong>Quando Forçar:</strong> Uma figura pode forçar{" "}
                <strong>mesmo depois de já ter rolado</strong> o d20, e{" "}
                <strong>mesmo se a rolagem tiver tido sucesso</strong>. Isso
                permite tornar o efeito mais difícil de resistir, aumentar a
                potência do poder, ou garantir que uma habilidade crucial não
                falhe. O sangue sempre tem um preço, mas às vezes vale a pena
                pagá-lo.
              </MobileText>
            </WarningBox>

            <HeaderH2>Stress Acumulado — O Limite da Carne</HeaderH2>
            <MobileText>
              Um jogador pode usar essa ação{" "}
              <strong>uma vez por ativação de cada figura</strong> no jogo,
              podendo usar vários poderes no mesmo turno — um a cada ativação.
              Mas à medida que o stress se acumula, os poderes ficam mais
              difíceis de ativar. O corpo tem limites.
            </MobileText>

            <MobileText>
              <strong>Penalidade Progressiva:</strong> Cada poder além do
              primeiro usado no turno tem sua CD aumentada em{" "}
              <strong>+3 para cada outro poder</strong> ativado antes dele:
            </MobileText>

            <MobileText>
              • <strong>Primeiro poder:</strong> CD normal
              <br />• <strong>Segundo poder:</strong> CD +3
              <br />• <strong>Terceiro poder:</strong> CD +6
              <br />• <strong>Quarto poder:</strong> CD +9
              <br />• <strong>Quinto poder:</strong> CD +12
              <br />• <strong>Sexto poder:</strong> CD +15
            </MobileText>

            <MobileText>
              <strong>Limite Absoluto:</strong> Quando a penalidade chegar a{" "}
              <strong>+15</strong>, poderes não podem mais ser ativados neste
              turno. O corpo simplesmente se recusa. Carne e osso têm limites
              que nem a vontade mais feroz pode ultrapassar.
            </MobileText>

            <WarningBox title="Resumo das Ações de Poder" type="info">
              <MobileText>
                • <strong>Rolagem:</strong> d20 contra CD do poder
              </MobileText>
              <MobileText>
                • <strong>Sucesso:</strong> Rolagem {">="} CD = poder ativado
              </MobileText>
              <MobileText>
                • <strong>Falha:</strong> Rolagem {"<"} CD = poder falha
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
                • <strong>Penalidade progressiva:</strong> +3 CD por poder
                adicional
              </MobileText>
              <MobileText>
                • <strong>Limite:</strong> Máximo +15 de penalidade
              </MobileText>
            </WarningBox>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-8"
            >
              "O poder não vem de graça. Cada ato de grandeza exige seu tributo
              em sangue e dor. Mas para os desesperados, o preço sempre vale a
              pena."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default PowerActionsPage;
