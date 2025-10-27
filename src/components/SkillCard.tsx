import GameText from "./GameText";

interface SkillCardProps {
  name: string;
  description: string;
}

function SkillCard({ name, description }: SkillCardProps) {
  return (
    <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <h4 className="text-emerald-300 font-bold text-lg">{name}</h4>
      </div>

      <div>
        <div className="text-emerald-400 font-bold text-sm mb-1">Efeito:</div>
        <GameText component="div" className="text-white text-sm">
          {description}
        </GameText>
      </div>
    </div>
  );
}

export default SkillCard;
