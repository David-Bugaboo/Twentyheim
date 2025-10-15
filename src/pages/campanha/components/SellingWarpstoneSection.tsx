import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

function SellingWarpstoneSection() {
  return (
    <CollapsibleSection
      id="vendendo-pedra-bruxa"
      title="5. Vendendo Pedra-Bruxa"
    >
      <MobileText className="mb-4">
        Os fragmentos de Pedra-bruxa coletados durante as batalhas podem ser
        vendidos por ouro. Quanto maior o fragmento, mais valioso ele é, mas
        também mais perigoso de carregar.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Tabela de Venda de Pedra-Bruxa
        </MobileText>

        <div className="bg-[#382929] p-3 rounded mb-4">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="bg-[#8b7355] text-[#d4af37] font-bold">
                <th className="p-2 text-left">Tamanho do Fragmento</th>
                <th className="p-2 text-left">Valor em Ouro</th>
                <th className="p-2 text-left">Riscos</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#382929]">
                <td className="p-2">Pequeno</td>
                <td className="p-2">10-20</td>
                <td className="p-2">Baixo</td>
              </tr>
              <tr className="border-b border-[#382929]">
                <td className="p-2">Médio</td>
                <td className="p-2">30-50</td>
                <td className="p-2">Médio</td>
              </tr>
              <tr className="border-b border-[#382929]">
                <td className="p-2">Grande</td>
                <td className="p-2">60-100</td>
                <td className="p-2">Alto</td>
              </tr>
              <tr>
                <td className="p-2">Enorme</td>
                <td className="p-2">150-300</td>
                <td className="p-2">Extremo</td>
              </tr>
            </tbody>
          </table>
        </div>

        <MobileText className="mb-3">
          <strong>Riscos da Venda:</strong> Vender Pedra-bruxa não é simples.
          Fragmentos maiores atraem atenção indesejada e podem causar problemas
          para o bando.
        </MobileText>

        <MobileText>
          <strong>Mercados:</strong> Diferentes mercados oferecem preços
          diferentes. Mercados legais pagam menos, mas são mais seguros.
          Mercados negros pagam mais, mas são mais perigosos.
        </MobileText>
      </div>
    </CollapsibleSection>
  );
}

export default SellingWarpstoneSection;
