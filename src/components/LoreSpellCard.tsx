
import HeaderH3 from "./HeaderH3";
import GameText from "./GameText";

interface LoreSpellCardProps {
  name: string;
  castingNumber: number;
  keywords: string[];
  effect: string;
}

function LoreSpellCard({ name, castingNumber, keywords, effect }: LoreSpellCardProps) {
  return (
    <div className="bg-green-900/20 border border-green-500/40 rounded-lg p-4">
      <HeaderH3 className="text-green-300 mb-2">
        {name}
      </HeaderH3>
      <div className="mb-3">
        <div className="text-green-400 font-bold text-sm mb-1">
          Número de Conjuração: {castingNumber}
        </div>
      </div>
      <div className="mb-3">
        <div className="text-green-400 font-bold text-sm mb-1">
          Palavras-chave:
        </div>
        <div className="text-white text-sm">
          {keywords.join(", ")}
        </div>
      </div>
      <div>
        <div className="text-green-400 font-bold text-sm mb-1">
          Efeito:
        </div>
        <GameText component="div" className="text-white text-sm">{effect}</GameText>
      </div>
    </div>
  );
}

export default LoreSpellCard;
