import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

function SpendingTreasureSection() {
  return (
    <CollapsibleSection id="gastar-tesouro" title="6. Gastar Tesouro">
      <MobileText className="mb-4">
        O ouro ganho através da venda de Pedra-bruxa e outros tesouros pode ser
        usado para melhorar o bando. Comprar equipamentos, contratar novos
        membros, ou investir em melhorias para o acampamento.
      </MobileText>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Opções de Gasto
        </MobileText>

        <MobileText className="mb-3 pl-4">
          • <strong>Equipamentos:</strong> Comprar armas, armaduras e itens
          mágicos
          <br />• <strong>Contratações:</strong> Recrutar novos soldados ou
          especialistas
          <br />• <strong>Treinamento:</strong> Melhorar as habilidades dos
          membros existentes
          <br />• <strong>Acampamento:</strong> Melhorar as instalações do bando
          <br />• <strong>Informação:</strong> Comprar informações sobre
          inimigos ou tesouros
        </MobileText>

        <MobileText>
          <strong>Orçamento:</strong> Cada bando tem um orçamento limitado.
          Escolha sabiamente onde investir seus recursos, pois cada coroa conta
          em Mordheim.
        </MobileText>
      </div>
    </CollapsibleSection>
  );
}

export default SpendingTreasureSection;
