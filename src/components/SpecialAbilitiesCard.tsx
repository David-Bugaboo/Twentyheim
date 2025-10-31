import HeaderH3 from "./HeaderH3";
import GameText from "./GameText";

interface LoreSpellCardProps {
  name: string;
  cost: number;
  description: string;
  colorScheme?: "green" | "purple" | "blue" | "red";
  footer?: React.ReactNode;
}

function SpecialAbilitiesCard({
  name,
  cost,
  description,
  colorScheme = "green",
  footer,
}: LoreSpellCardProps) {
  const colorClasses = {
    green: {
      bg: "bg-green-900/20",
      border: "border-green-500/40",
      title: "text-green-300",
      accent: "text-green-400",
    },
    purple: {
      bg: "bg-purple-900/20",
      border: "border-purple-500/40",
      title: "text-purple-300",
      accent: "text-purple-400",
    },
    blue: {
      bg: "bg-blue-900/20",
      border: "border-blue-500/40",
      title: "text-blue-300",
      accent: "text-blue-400",
    },
    red: {
      bg: "bg-red-900/20",
      border: "border-red-500/40",
      title: "text-red-300",
      accent: "text-red-400",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div
      className={`${colors.bg} ${colors.border} border rounded-lg p-4`}
    >
      <HeaderH3 className={`${colors.title} mb-2`}>{name}</HeaderH3>
      <div className="mb-3">
        <div className={`${colors.accent} font-bold text-sm mb-1`}>
          Custo: {cost}
        </div>
      </div>
      <div>
        <div className={`${colors.accent} font-bold text-sm mb-1`}>Efeito:</div>
        <GameText component="div" className="text-white text-sm">
          {description}
        </GameText>
      </div>
      {footer && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
}

export default SpecialAbilitiesCard;
