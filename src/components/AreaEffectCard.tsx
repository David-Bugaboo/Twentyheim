import React from "react";

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

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case "explosion":
      return {
        container:
          "bg-gradient-to-br from-orange-900/80 to-red-900/80 border border-orange-500/40",
        title: "text-orange-300",
        description: "text-orange-100",
        sizeLabel: "text-orange-300",
        sizeValue: "text-orange-100",
      };
    case "zone":
      return {
        container:
          "bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border border-purple-500/40",
        title: "text-purple-300",
        description: "text-purple-100",
        sizeLabel: "text-purple-300",
        sizeValue: "text-purple-100",
      };
    case "cone":
      return {
        container:
          "bg-gradient-to-br from-amber-900/80 to-orange-900/80 border border-amber-500/40",
        title: "text-amber-300",
        description: "text-amber-100",
        sizeLabel: "text-amber-300",
        sizeValue: "text-amber-100",
      };
    case "wall":
      return {
        container:
          "bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-500/40",
        title: "text-gray-300",
        description: "text-gray-100",
        sizeLabel: "text-gray-300",
        sizeValue: "text-gray-100",
      };
    case "pillar":
      return {
        container:
          "bg-gradient-to-br from-yellow-900/80 to-orange-900/80 border border-yellow-500/40",
        title: "text-yellow-300",
        description: "text-yellow-100",
        sizeLabel: "text-yellow-300",
        sizeValue: "text-yellow-100",
      };
    case "trap":
      return {
        container:
          "bg-gradient-to-br from-indigo-900/80 to-purple-900/80 border border-indigo-500/40",
        title: "text-indigo-300",
        description: "text-indigo-100",
        sizeLabel: "text-indigo-300",
        sizeValue: "text-indigo-100",
      };
    default:
      return {
        container:
          "bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-500/40",
        title: "text-gray-300",
        description: "text-gray-100",
        sizeLabel: "text-gray-300",
        sizeValue: "text-gray-100",
      };
  }
};

function AreaEffectCard({
  title,
  description,
  sizes,
  dimensions,
  variant,
}: AreaEffectCardProps) {
  const styles = getVariantStyles(variant);

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
