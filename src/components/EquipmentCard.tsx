import React from "react";
import MobileText from "./MobileText";
import GameText from "./GameText";

interface EquipmentCardProps {
  name: string | null;
  type: string | null;
  damageModifier: string | null;
  maxRange?: string | null;
  exclusive?: string | null;
  specialProperties?: string[] | null;
  cost: string | null;
  spaces: string | null;
  description?: string[] | null;
  strength?: string | null;
  armorBonus?: string | null;
  movePenalty?: string | null;
  requirements?: string | null;
  rarity?: number | null;
  availability?: string[] | null;
  effect?: string | null;
  specialRules?: Array<{
    label: string;
    value: string;
  }> | null;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  name,
  type,
  damageModifier,
  maxRange,
  exclusive,
  cost,
  spaces,
  description = [],
  strength,
  armorBonus,
  movePenalty,
  requirements,
  rarity,
  availability,
  effect,
  specialRules = [],
}) => {
  return (
    <div className="bg-[#1a1a1a] text-white mb-4 border border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="w-full p-6">
        <h3
          className="text-2xl font-bold"
          style={{
            fontFamily: '"Cinzel", serif',
            color: "#8fbc8f",
          }}
        >
          {name}
        </h3>
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-6 border-t border-gray-600">
        {description && description.length > 0 && (
          <div className="mb-4">
            {description?.map((paragraph, index) => (
              <MobileText
                key={index}
                className="italic text-gray-300 mb-2 leading-relaxed"
              >
                {paragraph}
              </MobileText>
            ))}
          </div>
        )}

        {/* General Information */}
        <div className="mb-4">
          <div className="mb-2">
            <span className="font-bold">Custo: </span>
            <span style={{ color: "#8fbc8f" }}>{cost}</span>
          </div>
          {rarity && (
            <div className="mb-2">
              <span className="font-bold">Raridade: </span>
              <span style={{ color: "#ffa500" }}>
                {rarity === 1 ? "Comum" : rarity}
              </span>
            </div>
          )}
          <div className="mb-2">
            <span className="font-bold">Disponibilidade: </span>
            <span>
              {availability ? availability.join(", ") : exclusive || "Comum"}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-bold">Espaços de Equipamento: </span>
            <span>{spaces}</span>
          </div>
        </div>

        {/* Description */}

        {/* Statistics */}
        <div className="mb-4">
          {maxRange && (
            <div className="mb-2">
              <span className="font-bold">Alcance: </span>
              <span>{maxRange || "Corpo a Corpo"}</span>
            </div>
          )}
          {damageModifier && (
            <div className="mb-2">
              <span className="font-bold">Modificador de Dano: </span>
              <span>{damageModifier}</span>
            </div>
          )}
          {armorBonus && (
            <div className="mb-2">
              <span className="font-bold">Bônus de Armadura: </span>
              <span style={{ color: "#8fbc8f" }}>{armorBonus}</span>
            </div>
          )}
          {movePenalty && (
            <div className="mb-2">
              <span className="font-bold">Penalidade de Movimento: </span>
              <span style={{ color: "#ff6b6b" }}>{movePenalty}</span>
            </div>
          )}
          {strength && (
            <div className="mb-2">
              <span className="font-bold">Requisito de Força: </span>
              <span>{strength}</span>
            </div>
          )}
          {requirements && (
            <div className="mb-2">
              <span className="font-bold">Requisitos: </span>
              <span style={{ color: "#ffa500" }}>{requirements}</span>
            </div>
          )}
          {effect && (
            <div className="mb-2">
              <span className="font-bold">Efeito: </span>
              <span style={{ color: "#ffa500" }}>{effect}</span>
            </div>
          )}
          {type && (
            <div className="mb-2">
              <span className="font-bold">Tipo: </span>
              <span style={{ color: "#8fbc8f" }}>{type}</span>
            </div>
          )}
        </div>

        {/* Special Rules */}
        {specialRules && specialRules.length > 0 && (
          <div>
            <h4 className="font-bold text-lg mb-1">REGRAS ESPECIAIS</h4>
            {specialRules?.map((rule, index) => (
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
  );
};

export default EquipmentCard;
