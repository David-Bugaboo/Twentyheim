import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import WarningBox from "../../components/WarningBox";
import GenericTable from "../../components/GenericTable";
import HeaderH3 from "../../components/HeaderH3";
import CornerDecoration from "../../components/CornerDecoration";

function RangedActionsPage() {
  const modifiersData = [
    {
      Modifier: "Terreno Interposto",
      Value: "+1",
      Description:
        "Cada peça de terreno entre o atirador e o alvo. Cumulativo.",
    },
    {
      Modifier: "Cobertura Leve",
      Value: "+2",
      Description:
        "Alvo em contato com cobertura que obscurece até metade do corpo.",
    },
    {
      Modifier: "Cobertura Pesada",
      Value: "+4",
      Description:
        "Alvo em contato com cobertura que obscurece quase todo o corpo.",
    },
    {
      Modifier: "Tiro Apressado",
      Value: "+1",
      Description: "Atirador se moveu anteriormente durante esta ativação.",
    },
    {
      Modifier: "Alvo Grande",
      Value: "-2",
      Description: "Alvo com característica Grande (mais fácil de acertar).",
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Ações de Ataque à Distância</PageTitle>

            <MobileText>
              A covardia tem seu lugar — especialmente quando esse lugar é fora
              do alcance do inimigo. A figura que usa a ação de tiro seleciona
              uma de suas <strong>armas à distância</strong>, e então seleciona
              uma figura dentro do <strong>alcance daquela arma</strong> que ela
              consiga enxergar.
            </MobileText>

            <HeaderH1>A Ação de Tiro</HeaderH1>

            <HeaderH2>Declaração de Alvo do Ataque a Distância</HeaderH2>
            <MobileText>
              A figura que quer usar uma ação de ataque a distância deve
              escolher uma figura que consiga traçar linha de visão e que esteja
              dentro do alcance da sua arma ou habilidade. Se a figura estiver
              em combate, ou não existir uma figura que ela enxerga e esteja
              dentro do alcance, a ação de ataque a distância não pode ser
              declarada.
            </MobileText>
            <MobileText>
              A figura atiradora rola <strong>Precisão (d20)</strong>,
              adicionando quaisquer modificadores advindos de feitiços, poderes,
              itens ou traits. A figura alvo então rola{" "}
              <strong>Ímpeto (d20)</strong>, adicionando quaisquer modificadores
              relevantes — incluindo os da tabela de defesa contra tiro abaixo.
            </MobileText>

            <HeaderH3>Tabela de Modificadores de Defesa Contra Tiro</HeaderH3>
            <GenericTable data={modifiersData} scrollable={false} />
            <MobileText className="mt-4 text-sm text-[#999]">
              <strong>Nota:</strong> Se o alvo está em contato com terreno, ele
              conta como cobertura ao invés de terreno intermediário. Outras
              figuras contam como terreno intermediário.
            </MobileText>
            <MobileText>
              Se a rolagem de Precisão for <strong>maior</strong> que a de
              Ímpeto do alvo, o atacante causa dano seguindo as mesmas regras do
              combate corpo a corpo. Em caso de <strong>empate</strong> ou caso
              a rolagem de Ímpeto seja maior,{" "}
              <strong>nenhum dano é causado</strong> — a flecha erra, o virote
              desvia, a bala se perde nas sombras.
            </MobileText>

            <WarningBox
              title="Resumo das Ações de Ataque à Distância"
              type="info"
            >
              <MobileText>
                • <strong>Seleção de Alvo:</strong> Figura dentro do alcance da
                arma e linha de visão
              </MobileText>
              <MobileText>
                • <strong>Rolagem de Tiro:</strong> Precisão (d20) +
                modificadores
              </MobileText>
              <MobileText>
                • <strong>Rolagem de Defesa:</strong> Ímpeto (d20) +
                modificadores de cobertura
              </MobileText>
              <MobileText>
                • <strong>Sucesso:</strong> Rolagem de Tiro {">"} Rolagem de
                Defesa = causa dano
              </MobileText>
              <MobileText>
                • <strong>Falha:</strong> Rolagem de Tiro ≤ Rolagem de Defesa =
                nenhum dano
              </MobileText>
              <MobileText>
                • <strong>Cálculo de Dano:</strong> Rolagem de Tiro +
                modificadores de arma - Armadura do alvo
              </MobileText>
              <MobileText>
                • <strong>Modificadores:</strong> Terreno intermediário,
                cobertura, tiro apressado, alvo grande
              </MobileText>
            </WarningBox>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mt-8"
            >
              "A distância é sua melhor amiga em Mordheim. Mantenha-a próxima, e
              seus inimigos distantes."
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default RangedActionsPage;
