import React from "react";
import { useNavigate } from "react-router-dom";
import GameText from "./GameText";
import EquipmentTooltip from "./EquipmentTooltip";

export interface UnitStats {
  move: number | string;
  fight: string;
  shoot: string;
  armour: number | string;
  Vontade: string;
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

export interface UnitAbility {
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
  equipment?: {
    "hand-to-hand"?: Array<{ name: string; cost: string }>;
    ranged?: Array<{ name: string; cost: string }>;
    armor?: Array<{ name: string; cost: string }>;
    miscellaneous?: Array<{ name: string; cost: string }>;
    modifiers?: Array<{ name: string; cost: string }>;
  };
}

const UnitCard: React.FC<UnitCardProps> = ({
  id,
  name,
  role,
  quantity,
  stats,
  spellAffinity,
  abilities,
  equipment,
}) => {
  const navigate = useNavigate();

  // Função para mapear tipos de habilidades para suas rotas com algoritmo de comparação
  const getSkillRoute = (skillType: string): string => {
    const normalizeString = (str: string): string => {
      return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, "") // Remove pontuação
        .replace(/\s+/g, " "); // Normaliza espaços
    };

    const normalizedInput = normalizeString(skillType);

    // Lista de habilidades com suas rotas
    const skillMappings = [
      // Habilidades Básicas
      { name: "Combate", route: "/skills/combat" },
      { name: "Atirador", route: "/skills/ranged" },
      { name: "Acadêmica", route: "/skills/academic" },
      { name: "Força", route: "/skills/strength" },
      { name: "Velocidade", route: "/skills/agility" },
      { name: "Agilidade", route: "/skills/agility" },

      // Habilidades Específicas
      { name: "Irmãs de Sigmar", route: "/skills/sisters-of-sigmar" },
      { name: "Skaven do Clã Enshin", route: "/skills/skaven-enshin" },
      { name: "Saqueadores Homem-Fera", route: "/skills/beastmen-raiders" },
      {
        name: "Caçadores de Tesouro Anões",
        route: "/skills/dwarf-treasure-hunters",
      },
      { name: "Mata-Trolls Anão", route: "/skills/dwarf-troll-slayers" },
      { name: "Engenharia da Montanha", route: "/skills/engineering" },
      { name: "Habilidades Von Carstein", route: "/skills/von-carstein" },
      {
        name: "Habilidades de Dragão Carmesim",
        route: "/skills/crimson-dragon",
      },
      { name: "Habilidades de Lahmia", route: "/skills/lahmia" },
      { name: "Habilidades de Strigoi", route: "/skills/strigoi" },
      { name: "Corsários Druchii", route: "/skills/dark-elf-corsairs" },
      { name: "Habilidades de Geckos", route: "/skills/geckos" },
      { name: "Habilidades de Saúrios", route: "/skills/saurus" },
      { name: "Hordas Orc", route: "/skills/orc-hordes" },
      { name: "Filhos de Hashut", route: "/skills/sons-of-hashut" },
    ];

    // Primeiro, tenta correspondência exata
    for (const mapping of skillMappings) {
      if (normalizeString(mapping.name) === normalizedInput) {
        return mapping.route;
      }
    }

    // Se não encontrar correspondência exata, tenta correspondência parcial
    for (const mapping of skillMappings) {
      const normalizedMapping = normalizeString(mapping.name);

      // Verifica se o input contém palavras-chave da habilidade
      const inputWords = normalizedInput.split(" ");
      const mappingWords = normalizedMapping.split(" ");

      // Se pelo menos 2 palavras coincidem
      const matchingWords = inputWords.filter((word) =>
        mappingWords.some(
          (mappingWord) =>
            mappingWord.includes(word) || word.includes(mappingWord)
        )
      );

      if (matchingWords.length >= 2) {
        return mapping.route;
      }

      // Verifica palavras-chave específicas
      if (
        normalizedInput.includes("combate") &&
        mapping.name.includes("Combate")
      )
        return mapping.route;
      if (
        normalizedInput.includes("atirador") &&
        mapping.name.includes("Atirador")
      )
        return mapping.route;
      if (
        normalizedInput.includes("Acadêmica") &&
        mapping.name.includes("Acadêmica")
      )
        return mapping.route;
      if (normalizedInput.includes("força") && mapping.name.includes("Força"))
        return mapping.route;
      if (
        normalizedInput.includes("velocidade") &&
        mapping.name.includes("Velocidade")
      )
        return mapping.route;
      if (
        normalizedInput.includes("agilidade") &&
        mapping.name.includes("Agilidade")
      )
        return mapping.route;
      if (normalizedInput.includes("sigmar") && mapping.name.includes("Sigmar"))
        return mapping.route;
      if (normalizedInput.includes("skaven") && mapping.name.includes("Skaven"))
        return mapping.route;
      if (normalizedInput.includes("homem") && mapping.name.includes("Homem"))
        return mapping.route;
      if (normalizedInput.includes("anões") && mapping.name.includes("Anões"))
        return mapping.route;
      if (normalizedInput.includes("troll") && mapping.name.includes("Troll"))
        return mapping.route;
      if (
        normalizedInput.includes("engenharia") &&
        mapping.name.includes("Engenharia")
      )
        return mapping.route;
      if (
        normalizedInput.includes("carstein") &&
        mapping.name.includes("Carstein")
      )
        return mapping.route;
      if (normalizedInput.includes("dragão") && mapping.name.includes("Dragão"))
        return mapping.route;
      if (normalizedInput.includes("lahmia") && mapping.name.includes("Lahmia"))
        return mapping.route;
      if (
        normalizedInput.includes("strigoi") &&
        mapping.name.includes("Strigoi")
      )
        return mapping.route;
      if (
        normalizedInput.includes("druchii") &&
        mapping.name.includes("Druchii")
      )
        return mapping.route;
      if (normalizedInput.includes("geckos") && mapping.name.includes("Geckos"))
        return mapping.route;
      if (
        normalizedInput.includes("saúrios") &&
        mapping.name.includes("Saúrios")
      )
        return mapping.route;
      if (normalizedInput.includes("orc") && mapping.name.includes("Orc"))
        return mapping.route;
      if (normalizedInput.includes("hashut") && mapping.name.includes("Hashut"))
        return mapping.route;
    }

    return "/skills";
  };

  // Função para mapear tradições mágicas para suas rotas com algoritmo de comparação
  const getLoreRoute = (traditionName: string): string => {
    const normalizeString = (str: string): string => {
      return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, "") // Remove pontuação
        .replace(/\s+/g, " "); // Normaliza espaços
    };

    const normalizedInput = normalizeString(traditionName);

    // Lista de tradições com suas rotas
    const loreMappings = [
      // Tradições Arcanas
      { name: "Lore of Fire", route: "/magic/lore-of-fire" },
      { name: "Lore of Beasts", route: "/magic/lore-of-beasts" },
      { name: "Lore of Death", route: "/magic/lore-of-death" },
      { name: "Lore of Heavens", route: "/magic/lore-of-heavens" },
      { name: "Lore of Life", route: "/magic/lore-of-life" },
      { name: "Lore of Light", route: "/magic/lore-of-light" },
      { name: "Lore of Metal", route: "/magic/lore-of-metal" },
      { name: "Lore of Shadows", route: "/magic/lore-of-shadows" },

      // Tradições Sombrias
      { name: "Lore of Hashut", route: "/magic/lore-of-hashut" },
      { name: "Lore of Chaos", route: "/magic/lore-of-chaos" },
      { name: "Lore of the Horned Rat", route: "/magic/lore-of-horned-rat" },
      { name: "Lore of Necromancy", route: "/magic/lore-of-necromancy" },

      // Tradições Divinas
      { name: "Prayers of Sigmar", route: "/magic/prayers-of-sigmar" },
      { name: "Prayers of Ulric", route: "/magic/prayers-of-ulric" },

      // Tradições Orc
      { name: "Lore of the Big Waaagh", route: "/magic/lore-of-big-waaagh" },
    ];

    // Primeiro, tenta correspondência exata
    for (const mapping of loreMappings) {
      if (normalizeString(mapping.name) === normalizedInput) {
        return mapping.route;
      }
    }

    // Se não encontrar correspondência exata, tenta correspondência parcial
    for (const mapping of loreMappings) {
      const normalizedMapping = normalizeString(mapping.name);

      // Verifica se o input contém palavras-chave da tradição
      const inputWords = normalizedInput.split(" ");
      const mappingWords = normalizedMapping.split(" ");

      // Se pelo menos 2 palavras coincidem
      const matchingWords = inputWords.filter((word) =>
        mappingWords.some(
          (mappingWord) =>
            mappingWord.includes(word) || word.includes(mappingWord)
        )
      );

      if (matchingWords.length >= 2) {
        return mapping.route;
      }

      // Verifica se contém palavras-chave específicas
      if (normalizedInput.includes("fire") && mapping.name.includes("Fire"))
        return mapping.route;
      if (normalizedInput.includes("beasts") && mapping.name.includes("Beasts"))
        return mapping.route;
      if (normalizedInput.includes("death") && mapping.name.includes("Death"))
        return mapping.route;
      if (
        normalizedInput.includes("heavens") &&
        mapping.name.includes("Heavens")
      )
        return mapping.route;
      if (normalizedInput.includes("life") && mapping.name.includes("Life"))
        return mapping.route;
      if (normalizedInput.includes("light") && mapping.name.includes("Light"))
        return mapping.route;
      if (normalizedInput.includes("metal") && mapping.name.includes("Metal"))
        return mapping.route;
      if (
        normalizedInput.includes("shadows") &&
        mapping.name.includes("Shadows")
      )
        return mapping.route;
      if (normalizedInput.includes("hashut") && mapping.name.includes("Hashut"))
        return mapping.route;
      if (normalizedInput.includes("chaos") && mapping.name.includes("Chaos"))
        return mapping.route;
      if (normalizedInput.includes("horned") && mapping.name.includes("Horned"))
        return mapping.route;
      if (
        normalizedInput.includes("necromancy") &&
        mapping.name.includes("Necromancy")
      )
        return mapping.route;
      if (normalizedInput.includes("sigmar") && mapping.name.includes("Sigmar"))
        return mapping.route;
      if (normalizedInput.includes("ulric") && mapping.name.includes("Ulric"))
        return mapping.route;
      if (normalizedInput.includes("waaagh") && mapping.name.includes("Waaagh"))
        return mapping.route;
    }

    return "/magic";
  };

  const handleSkillClick = (skillType: string) => {
    const route = getSkillRoute(skillType);
    navigate(route);
  };

  const handleLoreClick = (traditionName: string) => {
    const route = getLoreRoute(traditionName);
    navigate(route);
  };

  return (
    <div
      id={id}
      className="bg-[#1a1a1a] text-white mb-4 border border-gray-700 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="w-full p-6">
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
          {stats.cost && stats.cost !== "-" && (
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
              {stats.cost}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
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
              <span className="font-bold">{stats.Vontade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Vigor:</span>
              <span className="font-bold">{stats.health}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        {stats.skills && stats.skills.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
              HABILIDADES DISPONÍVEIS
            </h4>
            <div className="flex flex-wrap gap-2">
              {stats.skills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => handleSkillClick(skill)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors duration-200 cursor-pointer"
                  title={`Clique para ver habilidades de ${skill}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Spell Affinities */}
        {spellAffinity && (
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
              TRADIÇÕES MÁGICAS
            </h4>
            <div className="bg-[#2a2a2a] p-4 rounded">
              {spellAffinity.aligned0 && spellAffinity.aligned0.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-bold mb-2" style={{ color: "#8fbc8f" }}>
                    Tradições Primárias (CD +0)
                  </h5>
                  <div className="space-y-1">
                    {spellAffinity.aligned0.map((tradition, index) => (
                      <button
                        key={index}
                        onClick={() => handleLoreClick(tradition)}
                        className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-left w-full"
                        style={{
                          textDecoration: "underline",
                          textDecorationColor: "rgba(144, 238, 144, 0.6)",
                          textUnderlineOffset: "2px",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecorationColor = "#90EE90";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecorationColor =
                            "rgba(144, 238, 144, 0.6)";
                        }}
                        title={`Clique para ver ${tradition}`}
                      >
                        {tradition}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {spellAffinity.aligned2 && spellAffinity.aligned2.length > 0 && (
                <div>
                  <h5 className="font-bold mb-2" style={{ color: "#8fbc8f" }}>
                    Tradições Secundárias (CD +4)
                  </h5>
                  <div className="space-y-1">
                    {spellAffinity.aligned2.map((tradition, index) => (
                      <button
                        key={index}
                        onClick={() => handleLoreClick(tradition)}
                        className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer text-left w-full"
                        style={{
                          textDecoration: "underline",
                          textDecorationColor: "rgba(144, 238, 144, 0.6)",
                          textUnderlineOffset: "2px",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecorationColor = "#90EE90";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecorationColor =
                            "rgba(144, 238, 144, 0.6)";
                        }}
                        title={`Clique para ver ${tradition}`}
                      >
                        {tradition}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Equipment Table */}
        {equipment &&
          (() => {
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
                              <EquipmentTooltip itemName={item.name}>
                                <span
                                  className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer"
                                  style={{
                                    textDecoration: "underline",
                                    textDecorationColor:
                                      "rgba(144, 238, 144, 0.6)",
                                    textUnderlineOffset: "2px",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.textDecorationColor =
                                      "#90EE90";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.textDecorationColor =
                                      "rgba(144, 238, 144, 0.6)";
                                  }}
                                >
                                  {item.name}
                                </span>
                              </EquipmentTooltip>
                              <span className="text-gray-400">{item.cost}</span>
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
                            <EquipmentTooltip itemName={item.name}>
                              <span
                                className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer"
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor:
                                    "rgba(144, 238, 144, 0.6)",
                                  textUnderlineOffset: "2px",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.textDecorationColor =
                                    "#90EE90";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.textDecorationColor =
                                    "rgba(144, 238, 144, 0.6)";
                                }}
                              >
                                {item.name}
                              </span>
                            </EquipmentTooltip>
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
                            <EquipmentTooltip itemName={item.name}>
                              <span
                                className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer"
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor:
                                    "rgba(144, 238, 144, 0.6)",
                                  textUnderlineOffset: "2px",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.textDecorationColor =
                                    "#90EE90";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.textDecorationColor =
                                    "rgba(144, 238, 144, 0.6)";
                                }}
                              >
                                {item.name}
                              </span>
                            </EquipmentTooltip>
                            <span className="text-gray-400">{item.cost}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {equipment.miscellaneous &&
                    equipment.miscellaneous.length > 0 && (
                      <div className="mb-4">
                        <h5
                          className="font-bold mb-2"
                          style={{ color: "#8fbc8f" }}
                        >
                          Acessórios
                        </h5>
                        <div className="space-y-1">
                          {equipment.miscellaneous.map((item, index) => (
                            <div key={index} className="flex justify-between">
                              <EquipmentTooltip itemName={item.name}>
                                <span className="text-gray-300 hover:text-green-400 transition-colors">
                                  {item.name}
                                </span>
                              </EquipmentTooltip>
                              <span className="text-gray-400">{item.cost}</span>
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
                            <EquipmentTooltip itemName={item.name}>
                              <span
                                className="text-gray-300 hover:text-green-400 transition-colors cursor-pointer"
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor:
                                    "rgba(144, 238, 144, 0.6)",
                                  textUnderlineOffset: "2px",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.textDecorationColor =
                                    "#90EE90";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.textDecorationColor =
                                    "rgba(144, 238, 144, 0.6)";
                                }}
                              >
                                {item.name}
                              </span>
                            </EquipmentTooltip>
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
            <h4 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
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
                    <GameText
                      component="p"
                      className="text-gray-300 text-sm leading-relaxed"
                    >
                      {ability.description}
                    </GameText>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lore */}
        {stats.lore && (
          <div>
            <h4 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
              HISTÓRIA
            </h4>
            <p className="text-gray-300 leading-relaxed italic">{stats.lore}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitCard;
