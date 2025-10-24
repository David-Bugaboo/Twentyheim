
import AreaEffectCard from "./AreaEffectCard";

function AreaEffectCards() {
  const areaEffects = [
    {
      title: "Explosão",
      description:
        "Explosões são efeitos instantâneos: A área de efeito é posicionada, as figuras afetadas e então a área de efeito desaparece. Elas são Áreas de Efeito circulares.",
      sizes: [
        { name: "Pequena", value: "6cm de Diâmetro" },
        { name: "Média", value: "12cm de Diâmetro" },
        { name: "Grande", value: "18cm de Diâmetro" },
      ],
      variant: "explosion" as const,
    },
    {
      title: "Zona",
      description:
        "Zonas são Áreas de Efeito permanentes, que ficam no tabuleiro até o efeito ser cancelado. A Área de Efeito é um quadrado.",
      sizes: [
        { name: "Pequena", value: "6cm de lado" },
        { name: "Média", value: "12cm de lado" },
        { name: "Grande", value: "18cm de lado" },
      ],
      variant: "zone" as const,
    },
    {
      title: "Cone",
      description:
        "Cones são efeitos instantâneos: A área de efeito é posicionada, as figuras afetadas e então a área de efeito desaparece. Áreas de efeito de cone não tem alcance e devem sempre ser posicionadas com a ponta menor do cone adjacente a qualquer ponto da base de uma criatura.",
      variant: "cone" as const,
    },
    {
      title: "Muro",
      description:
        "Muros são Áreas de Efeito permanentes, permanecendo no tabuleiro até o efeito ser cancelado. A área de efeito é tratada como uma peça de terreno para todos os efeitos.",
      dimensions: "14cm comprimento × 8cm altura × 2.5cm largura",
      variant: "wall" as const,
    },
    {
      title: "Pilar",
      description:
        "Pilares são efeitos permanentes, permanecendo do campo de batalha até o efeito ser cancelado. Pilares são cilindros com 8cm de altura em todas as variações.",
      sizes: [
        { name: "Pequena", value: "6cm de Diâmetro" },
        { name: "Média", value: "12cm de Diâmetro" },
        { name: "Grande", value: "18cm de Diâmetro" },
      ],
      variant: "pillar" as const,
    },
    {
      title: "Armadilhas",
      description:
        "Armadilhas são efeitos permanentes, permanecendo do campo de batalha até o efeito ser cancelado. Armadilhas são círculos de 3cm de diâmetro.",
      variant: "trap" as const,
    },
  ];

  return (
    <div>
      {areaEffects.map((areaEffect, index) => (
        <AreaEffectCard
          key={index}
          title={areaEffect.title}
          description={areaEffect.description}
          sizes={areaEffect.sizes}
          dimensions={areaEffect.dimensions}
          variant={areaEffect.variant}
        />
      ))}
    </div>
  );
}

export default AreaEffectCards;
