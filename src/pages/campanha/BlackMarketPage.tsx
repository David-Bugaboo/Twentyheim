import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import CornerDecoration from "../../components/CornerDecoration";

function BlackMarketPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Rolagens de Mercado Negro</PageTitle>

            <MobileText>
              O mercado negro é onde seu bando pode comprar e vender equipamentos, contratar mercenários e encontrar itens raros. É um lugar perigoso, mas essencial para o crescimento do seu bando.
            </MobileText>

            <HeaderH1>Como Funciona</HeaderH1>

            <HeaderH2>Disponibilidade</HeaderH2>
            <MobileText>
              • <strong>Sempre disponível:</strong> Após cada batalha
              <br />• <strong>Localização:</strong> Escondido em cada cidade
              <br />• <strong>Acesso:</strong> Requer conhecimento local ou contatos
              <br />• <strong>Segurança:</strong> Sempre há risco de ser descoberto
            </MobileText>

            <HeaderH2>Rolagens de Disponibilidade</HeaderH2>
            <MobileText>
              Role 2D6 para determinar quais itens estão disponíveis:
            </MobileText>

            <MobileText>
              <strong>2-3: Mercado Fechado</strong> - Nenhum item disponível
              <br /><strong>4-5: Mercado Limitado</strong> - Apenas itens básicos
              <br /><strong>6-8: Mercado Normal</strong> - Itens comuns disponíveis
              <br /><strong>9-10: Mercado Bom</strong> - Itens raros disponíveis
              <br /><strong>11-12: Mercado Excepcional</strong> - Itens muito raros disponíveis
            </MobileText>

            <HeaderH1>Comprando Equipamentos</HeaderH1>

            <HeaderH2>Armas</HeaderH2>
            <MobileText>
              • <strong>Armas Básicas:</strong> 5-15 coroas
              <br />• <strong>Armas de Qualidade:</strong> 15-30 coroas
              <br />• <strong>Armas Mágicas:</strong> 50-200 coroas
              <br />• <strong>Artefatos:</strong> 200+ coroas
            </MobileText>

            <HeaderH2>Armaduras</HeaderH2>
            <MobileText>
              • <strong>Armaduras Básicas:</strong> 10-25 coroas
              <br />• <strong>Armaduras de Qualidade:</strong> 25-50 coroas
              <br />• <strong>Armaduras Mágicas:</strong> 75-300 coroas
              <br />• <strong>Armaduras Épicas:</strong> 300+ coroas
            </MobileText>

            <HeaderH2>Itens Mágicos</HeaderH2>
            <MobileText>
              • <strong>Poções:</strong> 10-50 coroas
              <br />• <strong>Amuletos:</strong> 25-100 coroas
              <br />• <strong>Artefatos Menores:</strong> 100-500 coroas
              <br />• <strong>Artefatos Maiores:</strong> 500+ coroas
            </MobileText>

            <HeaderH1>Vendendo Itens</HeaderH1>

            <HeaderH2>Valor de Venda</HeaderH2>
            <MobileText>
              • <strong>Itens Básicos:</strong> 25-50% do valor original
              <br />• <strong>Itens de Qualidade:</strong> 50-75% do valor original
              <br />• <strong>Itens Mágicos:</strong> 75-100% do valor original
              <br />• <strong>Artefatos:</strong> 100%+ do valor original
            </MobileText>

            <HeaderH2>Rolagem de Venda</HeaderH2>
            <MobileText>
              Role 1D6 para determinar o preço oferecido:
            </MobileText>

            <MobileText>
              <strong>1-2: Preço Baixo</strong> - 25% do valor
              <br /><strong>3-4: Preço Justo</strong> - 50% do valor
              <br /><strong>5: Preço Bom</strong> - 75% do valor
              <br /><strong>6: Preço Excelente</strong> - 100% do valor
            </MobileText>

            <HeaderH1>Contratando Mercenários</HeaderH1>

            <HeaderH2>Disponibilidade</HeaderH2>
            <MobileText>
              • <strong>Mercenários Comuns:</strong> Sempre disponíveis
              <br />• <strong>Mercenários Especiais:</strong> Requer rolagem especial
              <br />• <strong>Mercenários Épicos:</strong> Muito raros
            </MobileText>

            <HeaderH2>Custos</HeaderH2>
            <MobileText>
              • <strong>Básicos:</strong> 50-100 coroas
              <br />• <strong>Especializados:</strong> 100-200 coroas
              <br />• <strong>Épicos:</strong> 200+ coroas
              <br />• <strong>Manutenção:</strong> 10-20% do custo por jogo
            </MobileText>

            <HeaderH1>Riscos do Mercado Negro</HeaderH1>

            <HeaderH2>Descoberta</HeaderH2>
            <MobileText>
              • <strong>Chance:</strong> 10% por visita
              <br />• <strong>Consequência:</strong> Multa ou prisão
              <br />• <strong>Prevenção:</strong> Contatos locais reduzem o risco
            </MobileText>

            <HeaderH2>Itens Falsos</HeaderH2>
            <MobileText>
              • <strong>Chance:</strong> 5% em itens mágicos
              <br />• <strong>Identificação:</strong> Requer teste de conhecimento
              <br />• <strong>Proteção:</strong> Comprar de vendedores confiáveis
            </MobileText>

            <HeaderH1>Estratégias</HeaderH1>

            <HeaderH2>Maximizando Compras</HeaderH2>
            <MobileText>
              • <strong>Negociação:</strong> Teste de Carisma pode reduzir preços
              <br />• <strong>Compra em Lote:</strong> Desconto para compras grandes
              <br />• <strong>Lealdade:</strong> Vendedores regulares oferecem melhores preços
            </MobileText>

            <HeaderH2>Minimizando Riscos</HeaderH2>
            <MobileText>
              • <strong>Contatos:</strong> Estabeleça relacionamentos com vendedores
              <br />• <strong>Informação:</strong> Conheça a reputação dos vendedores
              <br />• <strong>Segurança:</strong> Visite o mercado com guarda-costas
            </MobileText>

            <HeaderH1>Exemplo de Sessão</HeaderH1>
            <MobileText className="italic text-[#c4a870]">
              O bando "Garras de Ferro" visita o mercado negro. Rolam 2D6 e obtêm 9 (Mercado Bom). Estão disponíveis itens raros. Eles compram uma espada mágica por 150 coroas e vendem uma armadura antiga por 30 coroas (50% do valor original). Também contratam um mercenário especializado por 120 coroas com manutenção de 12 coroas por jogo.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default BlackMarketPage;
