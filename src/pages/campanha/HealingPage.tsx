import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import CornerDecoration from "../../components/CornerDecoration";

function HealingPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Cura de Ferimentos</PageTitle>

            <MobileText>
              Após os testes de sobrevivência, as figuras feridas podem ser curadas através de vários métodos. A cura é essencial para manter seu bando em condições de combate.
            </MobileText>

            <HeaderH1>Tipos de Ferimentos</HeaderH1>

            <HeaderH2>Ferimentos Temporários</HeaderH2>
            <MobileText>
              Figuras que sobreviveram aos testes de sobrevivência mas ainda estão feridas. Estes ferimentos podem ser curados facilmente.
            </MobileText>

            <HeaderH2>Lesões Permanentes</HeaderH2>
            <MobileText>
              Figuras que falharam nos testes de sobrevivência e sofreram lesões permanentes. Estas requerem cura especializada.
            </MobileText>

            <HeaderH1>Métodos de Cura</HeaderH1>

            <HeaderH2>Cura Natural</HeaderH2>
            <MobileText>
              • <strong>Custo:</strong> Gratuito
              <br />• <strong>Efeito:</strong> Cura 1 ponto de vida por dia de descanso
              <br />• <strong>Limitação:</strong> Não cura lesões permanentes
              <br />• <strong>Tempo:</strong> 1-3 dias dependendo da gravidade
            </MobileText>

            <HeaderH2>Sacerdotes</HeaderH2>
            <MobileText>
              • <strong>Custo:</strong> 5-20 coroas por figura
              <br />• <strong>Efeito:</strong> Cura completa de ferimentos temporários
              <br />• <strong>Limitação:</strong> Requer teste de Vontade (CD 15)
              <br />• <strong>Disponibilidade:</strong> Apenas em cidades grandes
            </MobileText>

            <HeaderH2>Poções de Cura</HeaderH2>
            <MobileText>
              • <strong>Custo:</strong> 10-50 coroas por poção
              <br />• <strong>Efeito:</strong> Cura 1-3 pontos de vida
              <br />• <strong>Vantagem:</strong> Pode ser usada em combate
              <br />• <strong>Disponibilidade:</strong> Mercado negro
            </MobileText>

            <HeaderH2>Magia de Cura</HeaderH2>
            <MobileText>
              • <strong>Custo:</strong> Varia (componentes + mana)
              <br />• <strong>Efeito:</strong> Cura instantânea e completa
              <br />• <strong>Limitação:</strong> Requer conjurador habilidoso
              <br />• <strong>Disponibilidade:</strong> Apenas para bandos com magos
            </MobileText>

            <HeaderH1>Cura de Lesões Permanentes</HeaderH1>

            <HeaderH2>Ferimentos Leves</HeaderH2>
            <MobileText>
              • <strong>Custo:</strong> 25 coroas
              <br />• <strong>Método:</strong> Sacerdote ou poção especial
              <br />• <strong>Sucesso:</strong> 75% de chance de cura completa
              <br />• <strong>Falha:</strong> Lesão permanece, mas pode tentar novamente
            </MobileText>

            <HeaderH2>Ferimentos Moderados/Graves</HeaderH2>
            <MobileText>
              • <strong>Custo:</strong> 50-100 coroas
              <br />• <strong>Método:</strong> Cura mágica avançada
              <br />• <strong>Sucesso:</strong> 50% de chance de cura completa
              <br />• <strong>Falha:</strong> Lesão permanece, custo adicional para nova tentativa
            </MobileText>

            <HeaderH2>Ferimentos Críticos</HeaderH2>
            <MobileText>
              • <strong>Custo:</strong> 150-300 coroas
              <br />• <strong>Método:</strong> Cura divina ou magia poderosa
              <br />• <strong>Sucesso:</strong> 25% de chance de cura completa
              <br />• <strong>Falha:</strong> Lesão permanece, figura pode ficar incapacitada
            </MobileText>

            <HeaderH1>Estratégias de Cura</HeaderH1>

            <HeaderH2>Priorização</HeaderH2>
            <MobileText>
              • <strong>Heróis e Campeões:</strong> Prioridade máxima
              <br />• <strong>Soldados Experientes:</strong> Alta prioridade
              <br />• <strong>Recrutas:</strong> Baixa prioridade
              <br />• <strong>Mercenários:</strong> Considerar custo vs benefício
            </MobileText>

            <HeaderH2>Gestão de Recursos</HeaderH2>
            <MobileText>
              • <strong>Orçamento:</strong> Reserve 20-30% do orçamento para cura
              <br />• <strong>Poções:</strong> Mantenha estoque de emergência
              <br />• <strong>Sacerdotes:</strong> Estabeleça contatos regulares
              <br />• <strong>Magia:</strong> Treine conjuradores em magias de cura
            </MobileText>

            <HeaderH1>Consequências de Não Curar</HeaderH1>
            <MobileText>
              • Figuras feridas têm penalidades em combate
              <br />• Lesões permanentes afetam eficácia a longo prazo
              <br />• Moral do bando pode ser afetada
              <br />• Figuras podem desertar se não curadas
              <br />• Bando pode ficar incapacitado para futuras batalhas
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default HealingPage;
