import React, { useState, useEffect } from "react";

interface UnitStats {
  move: number | string;
  fight: string;
  shoot: string;
  armour: number | string;
  will: string;
  health: number;
  cost: string;
  lore?: string;
  skills?: string[];
  equipment?: {
    "hand-to-hand"?: Array<{ name: string; cost: string }>;
    ranged?: Array<{ name: string; cost: string }>;
    armor?: Array<{ name: string; cost: string }>;
    acessories?: Array<{ name: string; cost: string }>;
    modifiers?: Array<{ name: string; cost: string }>;
  };
}

interface UnitAbility {
  name: string;
  description?: string;
  weapons?: string[];
  armor?: string[];
  special?: string[];
  spellAffinity?: string;
}

interface UnitCardProps {
  id?: string;
  name: string;
  role?: string;
  quantity?: string;
  stats: UnitStats;
  spellAffinity?: {
    aligned0?: string[];
    aligned2?: string[];
  };
  abilities: UnitAbility[];
}

const UnitCard: React.FC<UnitCardProps> = ({
  id,
  name,
  role,
  quantity,
  stats,
  spellAffinity,
  abilities,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    setIsExpanded(!isMobile); // Colapsado no mobile, aberto no desktop
  }, [isMobile]);

  return (
    <div
      id={id}
      className="bg-[#1a1a1a] text-white mb-4 border border-gray-700 rounded-lg overflow-hidden"
    >
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left hover:bg-[#2a2a2a] transition-colors duration-200 flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <h3
            className="text-2xl font-bold"
            style={{
              fontFamily: '"Cinzel", serif',
              color: "#8fbc8f",
            }}
          >
            {name}
          </h3>
          {role && (
            <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">
              {role}
            </span>
          )}
          {quantity && (
            <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">
              {quantity}
            </span>
          )}
        </div>
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-6 pt-6 pb-6 border-t border-gray-600">
          {/* Stats Table */}
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
              ATRIBUTOS
            </h4>
            <div className="grid grid-cols-2 gap-4 bg-[#2a2a2a] p-4 rounded">
              <div className="flex justify-between">
                <span className="text-gray-300">Movimento:</span>
                <span className="font-bold">{stats.move}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Ímpeto:</span>
                <span className="font-bold">{stats.fight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Precisão:</span>
                <span className="font-bold">{stats.shoot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Armadura:</span>
                <span className="font-bold">{stats.armour}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Vontade:</span>
                <span className="font-bold">{stats.will}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Vigor:</span>
                <span className="font-bold">{stats.health}</span>
              </div>
              <div className="flex justify-between col-span-2">
                <span className="text-gray-300">Custo:</span>
                <span className="font-bold" style={{ color: "#8fbc8f" }}>
                  {stats.cost}
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          {stats.skills && stats.skills.length > 0 && (
            <div className="mb-6">
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                HABILIDADES DISPONÍVEIS
              </h4>
              <div className="flex flex-wrap gap-2">
                {stats.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Spell Affinities */}
          {spellAffinity && (
            <div className="mb-6">
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                TRADIÇÕES MÁGICAS
              </h4>
              <div className="bg-[#2a2a2a] p-4 rounded">
                {spellAffinity.aligned0 &&
                  spellAffinity.aligned0.length > 0 && (
                    <div className="mb-4">
                      <h5
                        className="font-bold mb-2"
                        style={{ color: "#8fbc8f" }}
                      >
                        Tradições Primárias (CD +0)
                      </h5>
                      <div className="space-y-1">
                        {spellAffinity.aligned0.map((tradition, index) => (
                          <div key={index} className="text-gray-300">
                            {tradition}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {spellAffinity.aligned2 &&
                  spellAffinity.aligned2.length > 0 && (
                    <div>
                      <h5
                        className="font-bold mb-2"
                        style={{ color: "#8fbc8f" }}
                      >
                        Tradições Secundárias (CD +4)
                      </h5>
                      <div className="space-y-1">
                        {spellAffinity.aligned2.map((tradition, index) => (
                          <div key={index} className="text-gray-300">
                            {tradition}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Equipment Table */}
          {stats.equipment &&
            (() => {
              const { equipment } = stats;
              const hasEquipment = Object.values(equipment).some(
                (arr) => arr && arr.length > 0
              );

              if (!hasEquipment) return null;

              return (
                <div className="mb-6">
                  <h4
                    className="text-lg font-bold mb-3"
                    style={{ color: "#8fbc8f" }}
                  >
                    EQUIPAMENTOS DISPONÍVEIS
                  </h4>
                  <div className="bg-[#2a2a2a] p-4 rounded">
                    {equipment["hand-to-hand"] &&
                      equipment["hand-to-hand"].length > 0 && (
                        <div className="mb-4">
                          <h5
                            className="font-bold mb-2"
                            style={{ color: "#8fbc8f" }}
                          >
                            Armas Corpo a Corpo
                          </h5>
                          <div className="space-y-1">
                            {equipment["hand-to-hand"].map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="text-gray-300">
                                  {item.name}
                                </span>
                                <span className="text-gray-400">
                                  {item.cost}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {equipment.ranged && equipment.ranged.length > 0 && (
                      <div className="mb-4">
                        <h5
                          className="font-bold mb-2"
                          style={{ color: "#8fbc8f" }}
                        >
                          Armas a Distância
                        </h5>
                        <div className="space-y-1">
                          {equipment.ranged.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-300">{item.name}</span>
                              <span className="text-gray-400">{item.cost}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {equipment.armor && equipment.armor.length > 0 && (
                      <div className="mb-4">
                        <h5
                          className="font-bold mb-2"
                          style={{ color: "#8fbc8f" }}
                        >
                          Armaduras
                        </h5>
                        <div className="space-y-1">
                          {equipment.armor.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-300">{item.name}</span>
                              <span className="text-gray-400">{item.cost}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {equipment.acessories &&
                      equipment.acessories.length > 0 && (
                        <div className="mb-4">
                          <h5
                            className="font-bold mb-2"
                            style={{ color: "#8fbc8f" }}
                          >
                            Acessórios
                          </h5>
                          <div className="space-y-1">
                            {equipment.acessories.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="text-gray-300">
                                  {item.name}
                                </span>
                                <span className="text-gray-400">
                                  {item.cost}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {equipment.modifiers && equipment.modifiers.length > 0 && (
                      <div>
                        <h5
                          className="font-bold mb-2"
                          style={{ color: "#8fbc8f" }}
                        >
                          Modificadores
                        </h5>
                        <div className="space-y-1">
                          {equipment.modifiers.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-300">{item.name}</span>
                              <span className="text-gray-400">{item.cost}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

          {/* Abilities */}
          {abilities && abilities.length > 0 && (
            <div className="mb-6">
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                HABILIDADES ESPECIAIS
              </h4>
              <div className="bg-[#2a2a2a] p-4 rounded space-y-3">
                {abilities.map((ability, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-600 pb-3 last:border-b-0"
                  >
                    <h5 className="font-bold mb-1" style={{ color: "#8fbc8f" }}>
                      {ability.name}
                    </h5>
                    {ability.description && (
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {ability.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lore */}
          {stats.lore && (
            <div>
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                HISTÓRIA
              </h4>
              <p className="text-gray-300 leading-relaxed italic">
                {stats.lore}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UnitCard;
