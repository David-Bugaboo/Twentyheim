import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import CornerDecoration from "../../components/CornerDecoration";

function MaintenancePage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Manutenção do Bando</PageTitle>

            <MobileText>
              Manter um bando funcionando requer recursos contínuos. Esta fase envolve pagar custos de manutenção, gerenciar recursos e garantir que seu bando esteja pronto para a próxima batalha.
            </MobileText>

            <HeaderH1>Custos de Manutenção</HeaderH1>

            <HeaderH2>Membros do Bando</HeaderH2>
            <MobileText>
              • <strong>Heróis:</strong> 10 coroas por jogo
              <br />• <strong>Campeões:</strong> 5 coroas por jogo
              <br />• <strong>Soldados:</strong> 2 coroas por jogo
              <br />• <strong>Recrutas:</strong> 1 coroa por jogo
            </MobileText>

            <HeaderH2>Mercenários</HeaderH2>
            <MobileText>
              • <strong>Básicos:</strong> 5-10 coroas por jogo
              <br />• <strong>Especializados:</strong> 10-20 coroas por jogo
              <br />• <strong>Épicos:</strong> 20+ coroas por jogo
              <br />• <strong>Dramatis Personae:</strong> 25+ coroas por jogo
            </MobileText>

            <HeaderH2>Equipamentos</HeaderH2>
            <MobileText>
              • <strong>Armas Básicas:</strong> 1 coroa por jogo
              <br />• <strong>Armas de Qualidade:</strong> 2 coroas por jogo
              <br />• <strong>Armas Mágicas:</strong> 5 coroas por jogo
              <br />• <strong>Armaduras:</strong> 2-5 coroas por jogo
            </MobileText>

            <HeaderH1>Gestão de Recursos</HeaderH1>

            <HeaderH2>Orçamento Recomendado</HeaderH2>
            <MobileText>
              • <strong>Manutenção:</strong> 40-50% do orçamento total
              <br />• <strong>Equipamentos:</strong> 20-30% do orçamento total
              <br />• <strong>Mercenários:</strong> 20-30% do orçamento total
              <br />• <strong>Reserva:</strong> 10-20% do orçamento total
            </MobileText>

            <HeaderH2>Priorização de Gastos</HeaderH2>
            <MobileText>
              • <strong>Crítico:</strong> Manutenção de membros essenciais
              <br />• <strong>Importante:</strong> Manutenção de mercenários
              <br />• <strong>Desejável:</strong> Novos equipamentos
              <br />• <strong>Luxo:</strong> Melhorias opcionais
            </MobileText>

            <HeaderH1>Consequências de Não Pagar</HeaderH1>

            <HeaderH2>Membros do Bando</HeaderH2>
            <MobileText>
              • <strong>Primeira Falha:</strong> -1 Vontade por 1 jogo
              <br />• <strong>Segunda Falha:</strong> -2 Vontade por 2 jogos
              <br />• <strong>Terceira Falha:</strong> Membro pode desertar
            </MobileText>

            <HeaderH2>Mercenários</HeaderH2>
            <MobileText>
              • <strong>Falha no Pagamento:</strong> Mercenário deixa o bando imediatamente
              <br />• <strong>Reputação:</strong> Outros mercenários podem recusar contratos
              <br />• <strong>Custos Futuros:</strong> Preços podem aumentar para futuras contratações
            </MobileText>

            <HeaderH2>Equipamentos</HeaderH2>
            <MobileText>
              • <strong>Falha na Manutenção:</strong> Equipamento pode quebrar
              <br />• <strong>Degradação:</strong> -1 em características do equipamento
              <br />• <strong>Perda Total:</strong> Equipamento pode ser perdido permanentemente
            </MobileText>

            <HeaderH1>Estratégias de Manutenção</HeaderH1>

            <HeaderH2>Otimização de Custos</HeaderH2>
            <MobileText>
              • <strong>Negociação:</strong> Tente reduzir custos de manutenção
              <br />• <strong>Compra em Lote:</strong> Descontos para manutenção de múltiplos itens
              <br />• <strong>Contratos de Longo Prazo:</strong> Descontos para compromissos de longo prazo
            </MobileText>

            <HeaderH2>Gestão de Inventário</HeaderH2>
            <MobileText>
              • <strong>Venda de Itens:</strong> Venda equipamentos não utilizados
              <br />• <strong>Troca:</strong> Troque equipamentos por outros mais úteis
              <br />• <strong>Armazenamento:</strong> Mantenha estoque de equipamentos de reserva
            </MobileText>

            <HeaderH1>Melhorias do Bando</HeaderH1>

            <HeaderH2>Instalações</HeaderH2>
            <MobileText>
              • <strong>Quartel:</strong> Reduz custos de manutenção em 10%
              <br />• <strong>Arsenal:</strong> Reduz custos de equipamentos em 15%
              <br />• <strong>Hospital:</strong> Reduz custos de cura em 20%
              <br />• <strong>Academia:</strong> Reduz custos de treinamento em 25%
            </MobileText>

            <HeaderH2>Contatos</HeaderH2>
            <MobileText>
              • <strong>Fornecedores:</strong> Descontos em equipamentos
              <br />• <strong>Médicos:</strong> Descontos em cura
              <br />• <strong>Mercenários:</strong> Descontos em contratação
              <br />• <strong>Informantes:</strong> Informações sobre oportunidades
            </MobileText>

            <HeaderH1>Exemplo de Manutenção</HeaderH1>
            <MobileText className="italic text-[#c4a870]">
              O bando "Garras de Ferro" tem 1 Herói (10 coroas), 2 Campeões (10 coroas), 4 Soldados (8 coroas), 1 Mercenário (15 coroas) e equipamentos (5 coroas). Total de manutenção: 48 coroas por jogo. Eles têm 200 coroas disponíveis, então podem pagar a manutenção e ainda sobrar 152 coroas para outros gastos.
            </MobileText>

            <HeaderH1>Dicas Importantes</HeaderH1>
            <MobileText>
              • <strong>Planejamento:</strong> Sempre reserve fundos para manutenção
              <br />• <strong>Priorização:</strong> Pague manutenção antes de outros gastos
              <br />• <strong>Eficiência:</strong> Otimize custos sem comprometer eficácia
              <br />• <strong>Reserva:</strong> Mantenha sempre uma reserva de emergência
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default MaintenancePage;
