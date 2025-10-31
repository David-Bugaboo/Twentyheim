import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import QuickNavigation from "../../components/QuickNavigation";
import WarningBox from "../../components/WarningBox";

function FightActionsPage() {
  const navigationSections = [
    { id: "intro", title: "Ações de Luta", level: 0 },
    { id: "acao-de-luta", title: "Ação de Luta", level: 0 },
    { id: "rolagem-luta", title: "A Rolagem de Luta", level: 1 },
    { id: "causando-dano", title: "Causando Dano", level: 1 },
    { id: "tipos-dano", title: "Tipos Especiais de Dano", level: 1 },
    { id: "apos-luta", title: "Após a Luta", level: 1 },
    { id: "vantagem-numeros", title: "Cair em Cima!", level: 0 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Ação de Luta</PageTitle>
            </div>

            <MobileText>
              Uma figura que completou uma carga ou pode fazer uma{" "}
              <strong>Ação de Luta</strong> como parte da carga, podendo
              batalhar contra o alvo da sua carga. Uma figura também pode usar
              uma ação de luta como uma de suas ações contra qualquer figura que
              esteja em combate, ou como parte da reação de Interceptar.
            </MobileText>

            <div id="rolagem-luta">
              <HeaderH2>O Teste de Luta</HeaderH2>
            </div>

            <MobileText>
              A figura que está usando sua ação de luta rola um teste contestado
              de <strong>Ímpeto</strong>, contra o alvo da sua ação de luta.
              Ambas as figuras adicionam quaisquer modificadores de armas,
              marcadores, habilidades e magias.
            </MobileText>

            <MobileText>
              A figura que vencer esse teste contestado{" "}
              <strong>VENCE A LUTA</strong> e <strong>acerta o ataque</strong>,
              causando dano a outra figura. Simples. Brutal. Definitivo.
            </MobileText>

            <MobileText>
              <strong>Em caso de empate:</strong> Ambas as figuras acertam o
              ataque e causam dano uma à outra. Ninguém sai ileso.
            </MobileText>

            <WarningBox title="LUTAR COM DUAS MÃOS" type="info">
              <MobileText>
                Uma figura que esteja usando uma arma com a característica leve
                na sua mão secundária, e uma arma corpo a corpo de uma mão na
                principal, ganha <strong>+1 de Ímpeto</strong> ao lutar, mas
                para de se beneficiar desse bônus se estiver segurando
                fragmentos de Pedra-Bruxa: sua mão secundária está ocupada
                carregando parte do Cometa!.
              </MobileText>
            </WarningBox>

            <div id="causando-dano">
              <HeaderH2>Causando Dano</HeaderH2>
            </div>

            <MobileText>
              Para causar dano, subtraia o <strong>Teste de Luta</strong> da
              figura que venceu a luta, some a quaisquer modificadores de dano
              ganhos de armas, magias, habilidades e itens mágicos, e então some
              o atributo força da criatura.{" "}
              <strong>subtraia esse valor da Armadura</strong> da figura que
              perdeu a luta. Ela recebe esse valor de dano, e subtrai dos seus
              pontos de vigor. Se o resultado for zero ou negativo, nenhum dano
              é causado — o ataque apenas resvalou no seu alvo, sem maiores
              efeitos.
            </MobileText>

            <div id="tipos-dano">
              <div className="mt-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg">
                <HeaderH2 className="text-green-300 mb-2">
                  Tipos Especiais de Dano e Condições
                </HeaderH2>
                <MobileText className="text-green-100 mb-4">
                  Para conferir tipos especiais de dano, danos críticos e
                  condições negativas causadas por ataques, consulte a página
                  dedicada.
                </MobileText>
                <a
                  href="/rules/negative-conditions"
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Ver Dano e Condições Negativas
                </a>
              </div>
            </div>

            <div id="apos-luta">
              <HeaderH2>Após a Luta</HeaderH2>
            </div>

            <MobileText>
              Ao final do combate, a figura que ganhou escolhe:{" "}
              <strong>continuar em combate</strong> (mantendo as bases tocando),{" "}
              <strong>
                empurrar a figura perdedora 3 cm diretamente para trás em linha
                reta
              </strong>
              ,ou <strong>sair de combate</strong>, movendo-se até 3cm em
              qualquer direção, inclusive se reposicionando em combate. Tenha em
              mente que qualquer um desses movimentos pode ser alvo de uma
              reação de Interceptar normalmente, mas não podem ser usados para
              fazer uma figura mover para fora da mesa.
            </MobileText>

            <div id="vantagem-numeros">
              <HeaderH1>Cair em Cima! — A Vantagem dos Números</HeaderH1>
            </div>

            <MobileText>
              Em Mordheim, honra é um luxo. Lutar limpo é coisa de tolos. Quando
              uma figura está em combate com{" "}
              <strong>mais de uma figura inimiga</strong>, ou tem{" "}
              <strong>figuras aliadas no mesmo combate</strong>, bônus são
              aplicados. Porque lâminas nunca são demais.
            </MobileText>

            <HeaderH3 className="mb-3 text-white">
              Figuras de Suporte (+2)
            </HeaderH3>

            <MobileText>
              Cada figura aliada que também esteja em combate com a figura alvo
              e não esteja em combate com outra figura concede{" "}
              <strong>+2</strong>. Este bônus é cumulativo, então três figuras
              de suporte elegíveis concedem +6 de modificador.
            </MobileText>

            <HeaderH3 className="mb-3 text-white">
              Cancelamento de Bônus
            </HeaderH3>

            <MobileText>
              Note que apenas uma figura por combate pode receber modificador de
              figuras de suporte. Se ambas as figuras são elegíveis para +2,
              eles se cancelam e ambas lutam com +0. Similarmente, se uma é
              elegível para +4 e a outra para +2, a primeira luta com +2 e a
              segunda com +0.
            </MobileText>

            <HeaderH3 className="mb-3 text-white">Limite Máximo</HeaderH3>

            <MobileText>
              Uma figura nunca pode ganhar mais de <strong>+6</strong> de
              figuras de suporte. Mesmo cercada por vinte aliados, apenas três
              podem efetivamente ajudar no combate — muito mais que isso e todos
              só atrapalham uns aos outros.
            </MobileText>

            <WarningBox title="Resumo das Ações de Luta" type="info">
              <MobileText>
                • <strong>Ação de Luta:</strong> Teste contestado de Ímpeto
                (d20) + modificadores
              </MobileText>
              <MobileText>
                • <strong>Ganhar a Luta:</strong> Figura vencedora acerta um
                ataque
              </MobileText>
              <MobileText>
                • <strong>Empate:</strong> Ambas causam dano
              </MobileText>
              <MobileText>
                • <strong>Causar Dano:</strong> Rolagem de Ímpeto +
                modificadores - Armadura do alvo
              </MobileText>
              <MobileText>
                • <strong>Dano Crítico:</strong> 20 natural = +5 de dano extra
              </MobileText>
              <MobileText>
                • <strong>Após a Luta:</strong> Continuar, empurrar 3cm, ou sair
                3cm
              </MobileText>
              <MobileText>
                • <strong>Figuras de Suporte:</strong> +2 por aliado (máximo +6)
              </MobileText>
              <MobileText>
                • <strong>Lutar com Duas Mãos:</strong> +1 de Ímpeto
              </MobileText>
            </WarningBox>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default FightActionsPage;
