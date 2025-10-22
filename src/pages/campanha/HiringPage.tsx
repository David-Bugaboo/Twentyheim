import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import CornerDecoration from "../../components/CornerDecoration";

function HiringPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Contratação de Mercenários</PageTitle>

            <MobileText>
              Mercenários são guerreiros profissionais que podem ser contratados para fortalecer seu bando. Eles trazem habilidades especializadas, mas exigem pagamento contínuo e podem não ser tão leais quanto membros regulares do bando.
            </MobileText>

            <HeaderH1>Como Encontrar Mercenários</HeaderH1>

            <HeaderH2>Exploração</HeaderH2>
            <MobileText>
              • <strong>Eventos de Exploração:</strong> Mercenários podem ser encontrados durante a exploração
              <br />• <strong>Rolagem de Encontro:</strong> 15% de chance por evento de exploração
              <br />• <strong>Localização:</strong> Depende do tipo de área explorada
            </MobileText>

            <HeaderH2>Contatos</HeaderH2>
            <MobileText>
              • <strong>Contatos Locais:</strong> Estabeleça relacionamentos com vendedores
              <br />• <strong>Reputação:</strong> Bandos com boa reputação atraem melhores mercenários
              <br />• <strong>Referências:</strong> Mercenários satisfeitos podem indicar outros
            </MobileText>

            <HeaderH1>Tipos de Mercenários</HeaderH1>

            <HeaderH2>Mercenários Básicos</HeaderH2>
            <MobileText>
              • <strong>Custo:</strong> 50-100 coroas
              <br />• <strong>Manutenção:</strong> 5-10 coroas por jogo
              <br />• <strong>Habilidades:</strong> Básicas, mas confiáveis
              <br />• <strong>Lealdade:</strong> Média
            </MobileText>

            <HeaderH2>Mercenários Especializados</HeaderH2>
            <MobileText>
              • <strong>Custo:</strong> 100-200 coroas
              <br />• <strong>Manutenção:</strong> 10-20 coroas por jogo
              <br />• <strong>Habilidades:</strong> Especializadas e valiosas
              <br />• <strong>Lealdade:</strong> Boa
            </MobileText>

            <HeaderH2>Mercenários Épicos</HeaderH2>
            <MobileText>
              • <strong>Custo:</strong> 200+ coroas
              <br />• <strong>Manutenção:</strong> 20+ coroas por jogo
              <br />• <strong>Habilidades:</strong> Excepcionais e únicas
              <br />• <strong>Lealdade:</strong> Excelente
            </MobileText>

            <HeaderH1>Processo de Contratação</HeaderH1>

            <HeaderH2>Negociação</HeaderH2>
            <MobileText>
              • <strong>Teste de Carisma:</strong> CD 15 para negociar preço
              <br />• <strong>Sucesso:</strong> -10% no custo de contratação
              <br />• <strong>Falha:</strong> Preço normal
              <br />• <strong>Crítico (20):</strong> -20% no custo de contratação
            </MobileText>

            <HeaderH2>Contrato</HeaderH2>
            <MobileText>
              • <strong>Duração:</strong> Até ser dispensado ou morrer
              <br />• <strong>Pagamento:</strong> Imediato + manutenção contínua
              <br />• <strong>Condições:</strong> Pode incluir cláusulas especiais
              <br />• <strong>Rescisão:</strong> Qualquer parte pode terminar o contrato
            </MobileText>

            <HeaderH1>Manutenção de Mercenários</HeaderH1>

            <HeaderH2>Custos de Manutenção</HeaderH2>
            <MobileText>
              • <strong>Frequência:</strong> Entre cada jogo
              <br />• <strong>Valor:</strong> 10-20% do custo de contratação
              <br />• <strong>Pagamento:</strong> Deve ser pago antes do próximo jogo
              <br />• <strong>Falha no Pagamento:</strong> Mercenário deixa o bando
            </MobileText>

            <HeaderH2>Alternativas de Pagamento</HeaderH2>
            <MobileText>
              • <strong>Itens Mágicos:</strong> Alguns mercenários aceitam itens como pagamento
              <br />• <strong>Pedra-Bruxa:</strong> Valor variável, mas aceita por muitos
              <br />• <strong>Serviços:</strong> Alguns podem aceitar favores como pagamento
            </MobileText>

            <HeaderH1>Vantagens dos Mercenários</HeaderH1>

            <HeaderH2>Habilidades Especializadas</HeaderH2>
            <MobileText>
              • <strong>Combate:</strong> Especialistas em diferentes tipos de combate
              <br />• <strong>Suporte:</strong> Habilidades de cura, liderança ou reconhecimento
              <br />• <strong>Magia:</strong> Conjuradores com magias específicas
              <br />• <strong>Especialização:</strong> Habilidades únicas não disponíveis para membros regulares
            </MobileText>

            <HeaderH2>Experiência Imediata</HeaderH2>
            <MobileText>
              • <strong>Pronto para Combate:</strong> Não precisam de treinamento
              <br />• <strong>Habilidades Completas:</strong> Já têm todas as habilidades de seu tipo
              <br />• <strong>Equipamentos:</strong> Geralmente vêm com equipamentos adequados
            </MobileText>

            <HeaderH1>Desvantagens dos Mercenários</HeaderH1>

            <HeaderH2>Custos Altos</HeaderH2>
            <MobileText>
              • <strong>Pagamento Contínuo:</strong> Manutenção deve ser paga regularmente
              <br />• <strong>Custo Inicial:</strong> Preço de contratação pode ser alto
              <br />• <strong>Sem Crescimento:</strong> Não ganham experiência ou evoluem
            </MobileText>

            <HeaderH2>Lealdade Limitada</HeaderH2>
            <MobileText>
              • <strong>Motivação Financeira:</strong> Lutam por dinheiro, não por lealdade
              <br />• <strong>Abandono:</strong> Podem deixar o bando se não pagos
              <br />• <strong>Conflitos:</strong> Podem ter problemas com membros regulares do bando
            </MobileText>

            <HeaderH1>Estratégias de Contratação</HeaderH1>

            <HeaderH2>Planejamento</HeaderH2>
            <MobileText>
              • <strong>Orçamento:</strong> Reserve 20-30% do orçamento para mercenários
              <br />• <strong>Necessidades:</strong> Contrate baseado nas necessidades do bando
              <br />• <strong>Longo Prazo:</strong> Considere os custos de manutenção
            </MobileText>

            <HeaderH2>Seleção</HeaderH2>
            <MobileText>
              • <strong>Habilidades:</strong> Escolha mercenários que complementem o bando
              <br />• <strong>Personalidade:</strong> Considere como se encaixam no bando
              <br />• <strong>Custo-Benefício:</strong> Avalie se o custo vale as habilidades
            </MobileText>

            <HeaderH1>Exemplo de Contratação</HeaderH1>
            <MobileText className="italic text-[#c4a870]">
              O bando "Garras de Ferro" encontra um mercenário especializado em combate corpo a corpo. O custo é 150 coro，as com manutenção de 15 coroas por jogo. Eles negociam com sucesso, reduzindo o custo para 135 coroas. O mercenário se junta ao bando e imediatamente fortalece sua capacidade de combate.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default HiringPage;
