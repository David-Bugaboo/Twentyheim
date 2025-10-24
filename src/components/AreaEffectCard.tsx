

interface AreaEffectCardProps {
  title: string;
  description: string;
  sizes?: Array<{
    name: string;
    value: string;
  }>;
  dimensions?: string;
  variant: "explosion" | "zone" | "cone" | "wall" | "pillar" | "trap";
}

const getVariantStyles = () => {
  // Todos os cards usam a mesma identidade visual preta e verde
  return {
    container:
      "bg-gradient-to-br from-black/90 to-gray-900/90 border border-green-500/40",
    title: "text-green-300",
    description: "text-green-100",
    sizeLabel: "text-green-300",
    sizeValue: "text-green-100",
  };
};

function AreaEffectCard({
  title,
  description,
  sizes,
  dimensions,

}: AreaEffectCardProps) {
  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} rounded-lg p-4 mb-4`}>
      <div className="flex items-center gap-3 mb-3">
        <h4 className={`${styles.title} font-bold text-lg`}>{title}</h4>
      </div>

      <p className={`${styles.description} mb-3`}>{description}</p>

      {sizes && sizes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {sizes.map((size, index) => (
            <div key={index} className="bg-black/30 rounded p-2 text-center">
              <div className={`${styles.sizeLabel} font-bold`}>{size.name}</div>
              <div className={`${styles.sizeValue} text-sm`}>{size.value}</div>
            </div>
          ))}
        </div>
      )}

      {dimensions && (
        <div className="bg-black/30 rounded p-3 text-center">
          <div className={`${styles.sizeLabel} font-bold mb-1`}>Dimensões</div>
          <div className={`${styles.sizeValue} text-sm`}>{dimensions}</div>
        </div>
      )}
    </div>
  );
}

export default AreaEffectCard;
