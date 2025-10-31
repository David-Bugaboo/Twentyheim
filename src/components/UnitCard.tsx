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
  health: number | string;
  cost: string;
  lore?: string;
  skills?: string[];
  startingXp?: number;
  strength?: number | string;
  força?: number | string;
  For?: number | string;
  upkeep?: string;
  equipmentSlots?: number | string;
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
  lore?: string;
  availability?: string | string[];
  qualidade?: string;
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
  lore,
  availability,
  qualidade,
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
      { name: "Combate", route: "/skills/combate" },
      { name: "Atirador", route: "/skills/atirador" },
      { name: "Acadêmica", route: "/skills/academica" },
      { name: "Força", route: "/skills/forca" },
      { name: "Agilidade", route: "/skills/agilidade" },
      // Habilidades Específicas
      { name: "Irmãs de Sigmar", route: "/skills/irmas-de-sigmar" },
      { name: "Skaven do Clã Enshin", route: "/skills/skaven-do-cla-enshin" },
      {
        name: "Saqueadores Homem-Fera",
        route: "/skills/saqueadores-homem-fera",
      },
      {
        name: "Caçadores de Tesouro Anões",
        route: "/skills/cacadores-de-tesouro-anoes",
      },
      { name: "Mata-Trolls Anão", route: "/skills/mata-trolls-anoes" },
      {
        name: "Engenharia da Montanha",
        route: "/skills/engenharia-da-montanha",
      },
      {
        name: "Habilidades Von Carstein",
        route: "/skills/habilidades-von-carstein",
      },
      {
        name: "Habilidades de Dragão Carmesim",
        route: "/skills/habilidades-de-dragão-carmesim",
      },
      { name: "Habilidades de Lahmia", route: "/skills/habilidades-de-lahmia" },
      {
        name: "Habilidades de Strigoi",
        route: "/skills/habilidades-de-strigoi",
      },
      { name: "Corsários Druchii", route: "/skills/corsarios-druchii" },
      { name: "Habilidades de Geckos", route: "/skills/habilidades-de-geckos" },
      {
        name: "Habilidades de Saúrios",
        route: "/skills/habilidades-de-saurios",
      },
      { name: "Hordas Orc", route: "/skills/hordas-orc" },
      { name: "Filhos de Hashut", route: "/skills/filhos-de-hashut" },
      { name: "Patrulheiro Elfo", route: "/skills/patrulheiro-elfo" },
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

    // Lista de tradições com suas rotas (incluindo nomes em português e inglês)
    const loreMappings = [
      // Tradições Sombrias
      { name: "Rituais do Caos", route: "/magic/rituals-of-chaos" },
      { name: "Rituais de Nurgle", route: "/magic/rituals-of-nurgle" },
      { name: "Rituais de Hashut", route: "/magic/rituals-of-hashut" },
      { name: "Tradição do Rato Chifrudo", route: "/magic/lore-of-horned-rat" },
      { name: "Tradição da Necromancia", route: "/magic/lore-of-necromancy" },
      { name: "Tradição da Necromancy", route: "/magic/lore-of-necromancy" },
      { name: "Lore of Chaos", route: "/magic/rituals-of-chaos" },
      { name: "Lore of Hashut", route: "/magic/rituals-of-hashut" },
      { name: "Lore of the Horned Rat", route: "/magic/lore-of-horned-rat" },
      { name: "Lore of Necromancy", route: "/magic/lore-of-necromancy" },

      // Tradições Divinas
      { name: "Orações de Sigmar", route: "/magic/prayers-of-sigmar" },
      { name: "Orações de Ulric", route: "/magic/prayers-of-ulric" },
      { name: "Prayers of Sigmar", route: "/magic/prayers-of-sigmar" },
      { name: "Prayers of Ulric", route: "/magic/prayers-of-ulric" },

      // Tradições Greenskin
      { name: "Magia de Waaaaagh!", route: "/magic/magic-of-the-waaaaagh" },
      { name: "Magia da WAAAAAAAGH!", route: "/magic/magic-of-the-waaaaagh" },
      { name: "Magia dos Goblins", route: "/magic/magic-of-the-goblins" },
      { name: "Lore of the Big Waaagh", route: "/magic/magic-of-the-waaaaagh" },

      // Magia Druchii e dos Antigos
      { name: "Magia Druchii", route: "/magic/druchii-magic" },
      { name: "Magia dos Antigos", route: "/magic/magic-of-the-old-ones" },
      { name: "Magia dos Anciões", route: "/magic/magic-of-the-old-ones" },
      { name: "Magic of the Old Ones", route: "/magic/magic-of-the-old-ones" },

      // Magia Inferior
      { name: "Magia Inferior", route: "/magic/lesser-magic" },
      { name: "Lesser Magic", route: "/magic/lesser-magic" },
    ];

    // Primeiro, tenta correspondência exata
    for (const mapping of loreMappings) {
      if (normalizeString(mapping.name) === normalizedInput) {
        return mapping.route;
      }
    }

    // Se não encontrar correspondência exata, tenta correspondência parcial por palavras-chave
    if (normalizedInput.includes("caos") || normalizedInput.includes("chaos")) {
      return "/magic/rituals-of-chaos";
    }
    if (normalizedInput.includes("hashut")) {
      return "/magic/rituals-of-hashut";
    }
    if (
      normalizedInput.includes("rato") ||
      normalizedInput.includes("chifrudo") ||
      normalizedInput.includes("horned") ||
      normalizedInput.includes("rat")
    ) {
      return "/magic/lore-of-horned-rat";
    }
    if (
      normalizedInput.includes("necromancia") ||
      normalizedInput.includes("necromancy")
    ) {
      return "/magic/lore-of-necromancy";
    }
    if (
      normalizedInput.includes("sigmar") &&
      (normalizedInput.includes("oracoes") ||
        normalizedInput.includes("prayers"))
    ) {
      return "/magic/prayers-of-sigmar";
    }
    if (
      normalizedInput.includes("ulric") &&
      (normalizedInput.includes("oracoes") ||
        normalizedInput.includes("prayers"))
    ) {
      return "/magic/prayers-of-ulric";
    }
    if (
      normalizedInput.includes("waaaagh") ||
      normalizedInput.includes("waaagh")
    ) {
      return "/magic/magic-of-the-waaaaagh";
    }
    if (normalizedInput.includes("goblin")) {
      return "/magic/magic-of-the-goblins";
    }
    if (normalizedInput.includes("druchii")) {
      return "/magic/druchii-magic";
    }
    if (
      normalizedInput.includes("anci") ||
      normalizedInput.includes("antigo") ||
      normalizedInput.includes("old ones")
    ) {
      return "/magic/magic-of-the-old-ones";
    }
    if (
      normalizedInput.includes("inferior") ||
      (normalizedInput.includes("lesser") && normalizedInput.includes("magic"))
    ) {
      return "/magic/lesser-magic";
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

  // Normaliza custo para controle de renderização de badge
  const costDisplay = (() => {
    const raw = stats.cost as unknown as string | number | undefined;
    if (raw === undefined || raw === null) return "";
    const str = String(raw).trim();
    if (str === "-" || str === "—") return "";
    return str;
  })();

  return (
    <div
      id={id}
      className="bg-[#1a1a1a] text-white mb-4 border border-gray-700 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="w-full p-6">
        <h3
          className="text-2xl font-bold text-center"
          style={{
            fontFamily: '"Cinzel", serif',
            color: "#8fbc8f",
          }}
        >
          {name}
        </h3>
        {(role === "Herói" ||
          role === "Líder" ||
          quantity ||
          (stats.cost && stats.cost !== "-") ||
          stats.upkeep) && (
          <div className="flex justify-center items-center gap-3 mt-3 flex-wrap">
            {role && (role === "Herói" || role === "Líder") && (
              <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">
                {role}
              </span>
            )}
            {quantity && (
              <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">
                {quantity}
              </span>
            )}
            {costDisplay && (
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                {costDisplay}
              </span>
            )}
            {stats.upkeep && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                Manutenção: {stats.upkeep}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 pt-6 pb-6 border-t border-gray-600">
        {/* Lore - First, no header */}
        {(lore || stats.lore) && (
          <div className="mb-6">
            <p className="text-gray-300 leading-relaxed italic">
              {lore || stats.lore}
            </p>
          </div>
        )}

        {/* Availability and Qualidade - Simple format */}
        {(availability || qualidade) && (
          <div className="mb-6 space-y-2">
            {availability && (
              <p className="text-gray-300">
                <strong>Disponibilidade:</strong>{" "}
                {Array.isArray(availability)
                  ? availability.join(", ")
                  : availability}
              </p>
            )}
            {qualidade && qualidade !== "0" && Number(qualidade) !== 0 && (
              <p className="text-gray-300">
                <strong>Aumento de Qualidade:</strong> o(a) {name} adiciona{" "}
                {qualidade} pontos ao valor de qualidade do bando
              </p>
            )}
          </div>
        )}

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
              <span className="text-gray-300">Força:</span>
              <span className="font-bold">
                {stats.strength !== undefined
                  ? stats.strength
                  : stats.força !== undefined
                  ? stats.força
                  : stats.For !== undefined
                  ? stats.For
                  : 0}
              </span>
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
            <div className="flex justify-between">
              <span className="text-gray-300">Experiência Inicial:</span>
              <span className="font-bold">{stats.startingXp ?? 0}</span>
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
                {stats.equipmentSlots !== undefined &&
                  stats.equipmentSlots !== null && (
                    <p className="text-xs text-gray-400 mb-2">
                      Espaços de Equipamento: {stats.equipmentSlots}
                    </p>
                  )}
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
      </div>
    </div>
  );
};

export default UnitCard;
