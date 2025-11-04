import React from "react";
import MobileText from "./MobileText";
import GameText from "./GameText";

interface NaturalAttackData {
  name: string;
  type: string;
  damageModifier: number | string;
  maxRange?: string;
  specialRules: Array<{
    label: string;
    value: string;
  }>;
  description?: string[];
}

interface NaturalAttackModalProps {
  isOpen: boolean;
  onClose: () => void;
  attackData: NaturalAttackData | null;
}

// Dados fixos para cada arma natural
const NATURAL_ATTACKS_DATA: Record<string, NaturalAttackData> = {
  "virtual-filth-torrent": {
    name: "Torrente de Sujeira",
    type: "Ataque a Distância",
    damageModifier: 0,
    maxRange: "15cm",
    specialRules: [
      {
        label: "Tóxica",
        value: "Uma arma com essa característica causa dano Venenoso.",
      },
    ],
  },
  "virtual-giant-claw": {
    name: "Garra",
    type: "Arma Corpo a Corpo",
    damageModifier: 2,
    specialRules: [],
  },
  "virtual-scorpion-tail": {
    name: "Cauda de escorpião",
    type: "Arma Corpo a Corpo",
    damageModifier: 0,
    specialRules: [
      {
        label: "Tóxica",
        value: "Uma arma com essa característica causa dano Venenoso.",
      },
    ],
  },
  "virtual-tentacle": {
    name: "Tentáculo",
    type: "Arma Corpo a Corpo",
    damageModifier: 0,
    specialRules: [
      {
        label: "Reativa(5)",
        value:
          "Esta arma pode ser usada como uma reação quando um inimigo se move dentro de 5cm.",
      },
    ],
  },
  "virtual-chotec-mark": {
    name: "Mandíbulas Poderosas",
    type: "Arma Corpo a Corpo",
    damageModifier: 2,
    specialRules: [],
    
  },
  "virtual-sotek-mark": {
    name: "Mordida Venenosa",
    type: "Arma Corpo a Corpo",
    damageModifier: -1,
    specialRules: [
      {
        label: "Tóxica",
        value: "Uma arma com essa característica causa dano Venenoso.",
      },
    ],
  },
};

const NaturalAttackModal: React.FC<NaturalAttackModalProps> = ({
  isOpen,
  onClose,
  attackData,
}) => {
  if (!isOpen || !attackData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-w-xl w-full relative">
        <button
          type="button"
          className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-9 h-9 border border-gray-600 hover:bg-gray-700 flex items-center justify-center"
          onClick={onClose}
          aria-label="Fechar"
        >
          ✕
        </button>
        <div className="bg-[#1a1a1a] text-white border border-gray-700 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="w-full p-6">
            <h3
              className="text-2xl font-bold"
              style={{
                fontFamily: '"Cinzel", serif',
                color: "#8fbc8f",
              }}
            >
              {attackData.name}
            </h3>
            <div className="mt-2">
              <span className="px-2 py-1 rounded bg-amber-600 text-white text-xs">
                Ataque Natural
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pt-6 pb-6 border-t border-gray-600">
            {Array.isArray(attackData.description) &&
              attackData.description.length > 0 && (
                <div className="mb-4">
                  {attackData.description.map((paragraph, index) => (
                    <MobileText
                      key={index}
                      className="italic text-gray-300 mb-2 leading-relaxed"
                    >
                      {paragraph}
                    </MobileText>
                  ))}
                </div>
              )}

            {/* Statistics */}
            <div className="mb-4">
              {attackData.maxRange != null && (
                <div className="mb-2">
                  <span className="font-bold">Alcance: </span>
                  <span>{attackData.maxRange}</span>
                </div>
              )}
              <div className="mb-2">
                <span className="font-bold">Modificador de Dano: </span>
                <span>{attackData.damageModifier}</span>
              </div>
              <div className="mb-2">
                <span className="font-bold">Tipo: </span>
                <span style={{ color: "#8fbc8f" }}>{attackData.type}</span>
              </div>
            </div>

            {/* Special Rules */}
            {Array.isArray(attackData.specialRules) &&
              attackData.specialRules.length > 0 && (
                <div>
                  <h4 className="font-bold text-lg mb-1">REGRAS ESPECIAIS</h4>
                  {attackData.specialRules.map((rule, index) => (
                    <div key={index} className="mb-2">
                      <span className="font-bold">{rule.label}: </span>
                      <GameText component="span" className="text-gray-300">
                        {rule.value}
                      </GameText>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Função auxiliar para obter dados da arma natural pelo ID
export const getNaturalAttackData = (
  attackId: string
): NaturalAttackData | null => {
  return NATURAL_ATTACKS_DATA[attackId] || null;
};

export default NaturalAttackModal;
