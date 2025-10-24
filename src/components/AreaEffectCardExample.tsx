
import AreaEffectCard from "./AreaEffectCard";

function AreaEffectCardExample() {
  return (
    <div className="space-y-4">
      <h3 className="text-white text-xl font-bold mb-4">
        Exemplo de Uso dos Cards de Área de Efeito
      </h3>

      {/* Exemplo de card individual */}
      <AreaEffectCard
        title="Explosão de Fogo"
        description="Uma explosão flamejante que causa dano instantâneo a todas as figuras na área."
        sizes={[
          { name: "Pequena", value: "6cm de Diâmetro" },
          { name: "Média", value: "12cm de Diâmetro" },
          { name: "Grande", value: "18cm de Diâmetro" },
        ]}
        variant="explosion"
      />

      {/* Exemplo de card com dimensões específicas */}
      <AreaEffectCard
        title="Barreira de Gelo"
        description="Um muro de gelo que bloqueia movimento e causa dano de frio."
        dimensions="14cm comprimento × 8cm altura × 2.5cm largura"
        variant="wall"
      />

      {/* Exemplo de card sem tamanhos */}
      <AreaEffectCard
        title="Sopro de Dragão"
        description="Um cone de fogo que se estende do conjurador."
        variant="cone"
      />
    </div>
  );
}

export default AreaEffectCardExample;
