import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import GameText from "./GameText";
// import EquipmentTooltip from "./EquipmentTooltip";
import SkillPicker from "./SkillPicker";
import SkillCard from "./SkillCard";
import SpellPicker from "./SpellPicker";
import LoreSpellCard from "./LoreSpellCard";
import SpecialAbilitiesPicker, {
  type SpecialAbilityInstance,
} from "./SpecialAbilitiesPicker";
import AdvancementsPicker from "./AdvancementsPicker";
import InjuriesPicker from "./InjuriesPicker";
import EquipmentManager from "./EquipmentManager";
import { type UnitStats, type UnitAbility } from "./UnitCard";
import { type Figure } from "../pages/warband-builder/types/figure.type";
import SpecialAbilitiesCard from "./SpecialAbilitiesCard";
import ExperienceTrackerHero from "./ExperienceTrackerHero";
import ExperienceTrackerSoldier from "./ExperienceTrackerSoldier";

export interface AttributeBreakdown {
  base: number;
  advancement: number;
  injury: number;
  misc: number;
}

export interface RosterUnitStats {
  move: AttributeBreakdown;
  fight: AttributeBreakdown;
  shoot: AttributeBreakdown;
  armour: AttributeBreakdown;
  vontade: AttributeBreakdown;
  health: AttributeBreakdown;
  strength?: AttributeBreakdown;
}

interface RosterUnitCardProps {
  id: string;
  name: string;
  role?: string;
  quantity?: string;
  baseStats: UnitStats; // Stats originais da ficha (ou derivados do Figure)
  rosterStats?: RosterUnitStats; // Breakdown calculado
  lore?: string;
  availability?: string | string[];
  qualidade?: string;
  spellAffinity?: {
    aligned0?: string[];
    aligned2?: string[];
  };
  abilities: UnitAbility[];
  figure?: Figure; // Nova estrutura fonte da unidade
  equipment?: {
    "hand-to-hand"?: Array<{ name: string; cost: string }>;
    ranged?: Array<{ name: string; cost: string }>;
    armor?: Array<{ name: string; cost: string }>;
    miscellaneous?: Array<{ name: string; cost: string }>;
    modifiers?: Array<{ name: string; cost: string }>;
  };
  equippedItems?: {
    elmo?: string;
    escudo?: string;
    armadura?: string;
    "arma-corpo-a-corpo-1"?: string;
    "arma-corpo-a-corpo-2"?: string;
    "arma-distancia-1"?: string;
    "arma-distancia-2"?: string;
    "adaga-gratis"?: string;
    acessorios?: string[];
  };
  onStatMiscChange: (attribute: keyof RosterUnitStats, value: number) => void;
  onAddEquipment?: (itemName: string, slot: string) => void;
  onRemoveEquipment?: (slot: string, itemName?: string) => void;
  // Cofre do Bando (stash)
  stashItems?: Array<{ name: string; cost?: string }>;
  onEquipFromStash?: (slot: string, itemName: string) => void;
  onUnequipToStash?: (slot: string, itemName?: string) => void;
  // Skills da figura
  availableSkills?: string[];
  selectedSkills?: Array<{
    id?: string;
    name: string;
    description: string;
    type?: string;
  }>;
  onAddSkill?: (skill: {
    name: string;
    description: string;
    type?: string;
  }) => void;
  onRemoveSkill?: (skillId: string) => void;
  // Adicionar tradição e lista de habilidades
  onAddTradition?: (traditionName: string) => void;
  onAddSkillCategory?: (category: string) => void;
  // Magias da figura
  selectedSpells?: Array<{
    id?: string;
    name: string;
    castingNumber: number;
    keywords: string[];
    effect: string;
  }>;
  onAddSpell?: (spell: {
    name: string;
    castingNumber: number;
    keywords: string[];
    effect: string;
  }) => void;
  onRemoveSpell?: (spellId: string) => void;
  onChangeSpellCastingNumber?: (spellId: string, newCN: number) => void;
  // Especiais
  onAddSpecialAbility?: (a: SpecialAbilityInstance) => void;
  onRemoveSpecialAbility?: (
    category: "nurgleBlessing" | "mutation" | "sacredMark",
    id: string
  ) => void;
  // XP da figura
  onChangeFigureXp?: (xp: number) => void;
  // Nome narrativo
  onChangeNarrativeName?: (name: string) => void;
  // Avanços
  selectedAdvancements?: string[];
  onAddAdvancement?: (adv: string) => void;
  onRemoveAdvancement?: (adv: string, index?: number) => void;
  // Ferimentos
  selectedInjuries?: string[];
  onAddInjury?: (injury: string) => void;
  onRemoveInjury?: (injury: string, index?: number) => void;
  // Equipamento escolhido para a unidade (lista única)
  onEquipFromStashFlat?: (itemName: string) => void;
  onUnequipToStashFlat?: (itemName: string) => void;
  maxSlots?: number;
  // Novo: editar modificadores direto do Figure
  onChangeFigureStatModifier?: (
    stat: keyof Figure["baseStats"],
    category: "injury" | "advancement" | "misc",
    value: number
  ) => void;
  onToggleInactive?: () => void;
  onPromoteHeroToLeader?: () => void;
  // Adicionar Special Rule
  onAddSpecialRule?: (specialRule: {
    name: string;
    description: string;
  }) => void;
  // Remover Special Rule
  onRemoveSpecialRule?: (specialRuleName: string) => void;
}

const RosterUnitCard: React.FC<RosterUnitCardProps> = ({
  id,
  name,
  role,
  quantity,
  baseStats,
  rosterStats: _rosterStats,
  lore,
  availability,
  qualidade,
  spellAffinity,
  abilities,
  figure,
  equipment,
  // equippedItems não é mais usado na UI
  // onStatMiscChange,
  // onRemoveEquipment não usado na UI nova
  availableSkills,
  selectedSkills,
  onAddSkill,
  onRemoveSkill,
  selectedSpells,
  onAddSpell,
  onRemoveSpell,
  onChangeSpellCastingNumber,
  onAddSpecialAbility,
  onRemoveSpecialAbility,
  onChangeFigureXp,
  onChangeNarrativeName,
  // onAddTradition,
  // onAddSkillCategory,
  stashItems,
  selectedAdvancements,
  onAddAdvancement,
  onRemoveAdvancement,
  selectedInjuries,
  onAddInjury,
  onRemoveInjury,
  onEquipFromStashFlat,
  onUnequipToStashFlat,
  maxSlots,
  onChangeFigureStatModifier,
  onAddSpecialRule,
  onRemoveSpecialRule: _onRemoveSpecialRule,
}) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isAdvancementsCollapsed, setIsAdvancementsCollapsed] = useState(true);
  const [isInjuriesCollapsed, setIsInjuriesCollapsed] = useState(true);

  // Estados para o rolador de avanços
  const [rollModalOpen, setRollModalOpen] = useState(false);
  const [rolledOptions, setRolledOptions] = useState<string[] | null>(null);
  const [pendingRolls, setPendingRolls] = useState<Array<string[]>>([]);
  const [rollCount, setRollCount] = useState<number>(1);

  // Estados para o rolador de sobrevivência
  const [survivalModalOpen, setSurvivalModalOpen] = useState(false);
  const [survivalResult, setSurvivalResult] = useState<string | null>(null);

  const getTotal = (
    breakdown: AttributeBreakdown,
    statKey: string = ""
  ): number => {
    const baseTotal =
      breakdown.base +
      breakdown.advancement +
      breakdown.injury +
      breakdown.misc;

    // Para armadura, adiciona bônus de equipamentos
    if (
      statKey === "armour" &&
      figure?.equiped &&
      Array.isArray(figure.equiped)
    ) {
      let equipmentArmorBonus = 0;
      for (const equip of figure.equiped) {
        const armorBonus = equip.armorBonus;
        if (typeof armorBonus === "number") {
          equipmentArmorBonus += armorBonus;
        }
      }
      const finalTotal = baseTotal + equipmentArmorBonus;
      // Limita a 17
      return Math.min(finalTotal, 17);
    }

    return baseTotal;
  };

  // Calcular opções de avanços baseadas no role da figura
  const advancementOptions = useMemo(() => {
    const roleStr = (figure?.role || "").toString().toLowerCase();
    const isHeroLike =
      roleStr.includes("líder") ||
      roleStr.includes("lider") ||
      roleStr.includes("her") ||
      roleStr.includes("merc") ||
      roleStr.includes("lenda");

    const statIncreases = [
      "+1 Ímpeto",
      "+1 Precisão",
      "+1 Armadura",
      "+2 Vida",
      "+2 Movimento",
      "+1 Vontade",
      "+1 Força",
    ];

    return isHeroLike
      ? ["Nova Habilidade", "Nova Magia", "Fortalecer Magia", ...statIncreases]
      : ["O Moleque Tem Talento!", ...statIncreases];
  }, [figure?.role]);

  // Função para escolher opção no modal
  const chooseOption = useCallback(
    (option: string) => {
      if (onAddAdvancement) {
        onAddAdvancement(option);
      }

      // Remove o roll atual da fila
      setPendingRolls((prevRolls) => {
        if (prevRolls.length > 0) {
          const remainingRolls = prevRolls.slice(1);

          if (remainingRolls.length > 0) {
            // Mostra próximo da fila
            setRolledOptions(remainingRolls[0]);
          } else {
            // Fecha modal se não houver mais
            setRollModalOpen(false);
            setRolledOptions(null);
          }

          return remainingRolls;
        } else {
          // Fecha modal se não houver fila
          setRollModalOpen(false);
          setRolledOptions(null);
          return [];
        }
      });
    },
    [onAddAdvancement]
  );

  // Função para rolar avanço
  const rollAdvancement = useCallback(
    (count: number = 1) => {
      const roleStr = (figure?.role || "").toString().toLowerCase();
      const isHeroLike =
        roleStr.includes("líder") ||
        roleStr.includes("lider") ||
        roleStr.includes("her") ||
        roleStr.includes("merc") ||
        roleStr.includes("lenda");

      // Tabela de avanço para Heróis e Campeões
      const heroAdvancementTable = [
        {
          roll: [1, 4],
          options: ["Nova Habilidade", "Nova Magia", "Fortalecer Magia"],
        },
        { roll: [5, 8], options: ["+1 Força", "+1 Ímpeto"] },
        { roll: [9, 12], options: ["+1 Precisão", "+2 Movimento"] },
        { roll: [13, 16], options: ["+1 Armadura", "+2 Vida"] },
        { roll: [17, 20], options: ["+2 Vida", "+1 Vontade"] },
      ];

      // Tabela de avanço para Soldados
      const soldierAdvancementTable = [
        { roll: [1, 4], options: ["+1 Força", "+1 Ímpeto"] },
        { roll: [5, 8], options: ["+1 Precisão", "+2 Movimento"] },
        { roll: [9, 12], options: ["+1 Armadura", "+2 Vida"] },
        { roll: [13, 16], options: ["+2 Vida", "+1 Vontade"] },
        { roll: [17, 20], options: ["O Moleque Tem Talento!"] },
      ];

      const table = isHeroLike ? heroAdvancementTable : soldierAdvancementTable;

      const newRolls: string[][] = [];
      for (let i = 0; i < count; i++) {
        // Rola 1d20
        const d20Roll = Math.floor(Math.random() * 20) + 1;

        // Encontra o resultado na tabela
        const result = table.find(
          (entry) => d20Roll >= entry.roll[0] && d20Roll <= entry.roll[1]
        );

        if (result) {
          // Retorna todas as opções disponíveis
          newRolls.push(result.options);
        }
      }

      if (newRolls.length === 1) {
        // Se for apenas 1 roll, mostra modal imediatamente
        setRolledOptions(newRolls[0]);
        setRollModalOpen(true);
      } else {
        // Se forem múltiplos, adiciona na fila
        setPendingRolls((prevRolls) => [...prevRolls, ...newRolls]);
        setRolledOptions(newRolls[0]);
        setRollModalOpen(true);
      }
    },
    [figure?.role]
  );

  // Função para rolar sobrevivência
  const rollSurvival = useCallback(() => {
    const roleStr = (figure?.role || "").toString().toLowerCase();
    const isHeroLike =
      roleStr.includes("líder") ||
      roleStr.includes("lider") ||
      roleStr.includes("her") ||
      roleStr.includes("lenda");

    // Tabela de sobrevivência para Heróis
    const heroSurvivalTable: Array<{
      roll: number;
      result: string;
      injury?: string;
      needsSubRoll?: boolean;
      specialRule?: { name: string; description: string };
    }> = [
      { roll: 1, result: "Morto" },
      { roll: 2, result: "Múltiplos Ferimentos" },
      { roll: 3, result: "Ferimento na Perna", injury: "Ferimento na Perna" },
      {
        roll: 4,
        result: "Ferimento no Braço",
        needsSubRoll: true,
      },
      { roll: 5, result: "Insanidade", needsSubRoll: true },
      { roll: 6, result: "Perna Esmagada", needsSubRoll: true },
      { roll: 7, result: "Costelas Quebradas", injury: "Costelas Quebradas" },
      {
        roll: 8,
        result: "Cego de Um Olho",
        injury: "Cego de Um Olho",
      },
      { roll: 9, result: "Ferimento Infectado", injury: "Ferimento Infectado" },
      { roll: 10, result: "Trauma", injury: "Trauma" },
      {
        roll: 11,
        result: "Mão Esmigalhada",
        injury: "Mão Esmigalhada",
      },
      { roll: 12, result: "Ferimento Profundo", injury: "Ferimento Profundo" },
      { roll: 13, result: "Roubado" },
      { roll: 14, result: "Recuperação Completa" },
      {
        roll: 15,
        result: "Inimizade Amarga",
        needsSubRoll: true,
      },
      { roll: 16, result: "Capturado" },
      {
        roll: 17,
        result: "Caleijado",
        specialRule: {
          name: "Caleijado",
          description: "A figura é Imune a Aterrorizante.",
        },
      },
      {
        roll: 18,
        result: "Cicatrizes Horríveis",
        specialRule: {
          name: "Deformado",
          description:
            "A figura ganha a característica Aterrorizante, mas tem -3 para buscar no mercado negro.",
        },
      },
      { roll: 19, result: "Vendido as Arenas Clandestinas" },
      { roll: 20, result: "Supreendentemente Sobrevive" },
    ];

    // Para Soldados, rola simples
    const d20Roll = Math.floor(Math.random() * 20) + 1;

    if (isHeroLike) {
      // Heróis usam a tabela completa
      const result = heroSurvivalTable.find((entry) => entry.roll === d20Roll);
      if (result) {
        let finalResult = `${d20Roll} - ${result.result}`;
        let appliedInjury = result.injury;

        // Se precisa de sub-rolagem
        if (result.needsSubRoll) {
          const subRoll = Math.floor(Math.random() * 20) + 1;
          if (d20Roll === 4) {
            // Ferimento no Braço
            if (subRoll <= 5) {
              finalResult += ` (${subRoll}: Antebraço Esmagado - Braço Amputado)`;
              appliedInjury = "Antebraço Esmagado";
            } else {
              finalResult += ` (${subRoll}: Ombro Deslocado - Perde próximo jogo)`;
              appliedInjury = "Ombro Deslocado";
            }
          } else if (d20Roll === 5) {
            // Insanidade
            if (subRoll <= 5) {
              finalResult += ` (${subRoll}: Insanidade(Estupidez) - Ganha Estupidez)`;
              appliedInjury = "Insanidade(Estupidez)";
              result.specialRule = {
                name: "Retardado",
                description: "A figura ganha a característica Estupidez",
              };
            } else {
              finalResult += ` (${subRoll}: Insanidade(Fúria) - Ganha Fúria)`;
              appliedInjury = "Insanidade(Fúria)";
              result.specialRule = {
                name: "Louco Espumante",
                description: "A figura ganha a característica Fúria",
              };
            }
          } else if (d20Roll === 6) {
            // Perna Esmagada
            if (subRoll <= 5) {
              finalResult += ` (${subRoll}: Fratura Exposta na Perna - Não pode disparar/escalar)`;
              appliedInjury = "Fratura Exposta na Perna";
            } else {
              finalResult += ` (${subRoll}: Perna Deslocada - Perde próximo jogo)`;
              appliedInjury = "Perna Deslocada";
            }
          } else if (d20Roll === 15) {
            // Inimizade Amarga
            let rancorName = "";
            let rancorDesc = "";
            if (subRoll <= 10) {
              rancorName = "Rancor (Indivíduo)";
              rancorDesc =
                "Ódio contra o indivíduo que reduziu a figura a 0 de vida";
            } else if (subRoll <= 15) {
              rancorName = "Rancor (Líder)";
              rancorDesc =
                "Ódio contra o líder do bando que reduziu a figura a 0 de vida";
            } else if (subRoll <= 19) {
              rancorName = "Rancor (Bando)";
              rancorDesc =
                "Ódio contra todas as figuras do bando que reduziu a figura a 0 de vida";
            } else {
              rancorName = "Rancor (Tipo)";
              rancorDesc = "Ódio contra todos os bandos daquele mesmo tipo";
            }
            finalResult += ` (${subRoll}: ${rancorName})`;
            result.specialRule = {
              name: rancorName,
              description: rancorDesc,
            };
          }
        }

        // Aplica a ferida se houver
        if (appliedInjury && onAddInjury) {
          onAddInjury(appliedInjury);
        }

        // Aplica a special rule se houver (Caleijado, Cicatrizes Horríveis, ou Inimizade Amarga)
        if (result.specialRule && onAddSpecialRule) {
          onAddSpecialRule({
            name: result.specialRule.name,
            description: result.specialRule.description,
          });
        }

        setSurvivalResult(finalResult);
        setSurvivalModalOpen(true);
      }
    } else {
      // Soldados: 1-6 = morto, 7-20 = vivo
      if (d20Roll <= 6) {
        setSurvivalResult(`${d20Roll} - Morto`);
        setSurvivalModalOpen(true);
      } else {
        setSurvivalResult(`${d20Roll} - Vivo e Bem`);
        setSurvivalModalOpen(true);
      }
    }
  }, [figure?.role, onAddInjury, onAddSpecialRule]);

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

  const handleSkillClick = (skillType: string) => {
    const route = getSkillRoute(skillType);
    navigate(route);
  };

  // sem navegação de magia aqui

  const costDisplay = (() => {
    const raw = (baseStats?.cost ?? figure?.baseStats?.cost) as
      | string
      | number
      | undefined;
    if (raw === undefined || raw === null) return "";
    const str = String(raw).trim();
    if (str === "-" || str === "—") return "";
    return str;
  })();

  const figStatOrder: Array<keyof Figure["baseStats"]> = [
    "move",
    "fight",
    "shoot",
    "armour",
    "Vontade",
    "health",
    "strength",
  ];

  const toFigureBreakdown = (
    stat: keyof Figure["baseStats"]
  ): AttributeBreakdown => {
    const b = Number((figure?.baseStats as any)?.[stat] || 0);
    const adv = Number(
      (figure?.advancementsStatsModifiers as any)?.[stat] || 0
    );
    const inj = Number((figure?.injuryStatsModifiers as any)?.[stat] || 0);
    const misc = Number((figure?.miscStatsModifiers as any)?.[stat] || 0);
    return { base: b, advancement: adv, injury: inj, misc };
  };

  const isInactive = Boolean((figure as any)?.inactive);

  // Estado para modal de edição de atributos
  const [editingStat, setEditingStat] = useState<
    keyof Figure["baseStats"] | null
  >(null);
  const [tempModifiers, setTempModifiers] = useState<{
    advancement: number;
    injury: number;
    misc: number;
  }>({ advancement: 0, injury: 0, misc: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const openEditModal = (stat: keyof Figure["baseStats"]) => {
    const b = toFigureBreakdown(stat);
    setTempModifiers({
      advancement: b.advancement,
      injury: b.injury,
      misc: b.misc,
    });
    setEditingStat(stat);
  };

  const closeEditModal = () => {
    if (editingStat && onChangeFigureStatModifier) {
      onChangeFigureStatModifier(
        editingStat,
        "advancement",
        tempModifiers.advancement
      );
      onChangeFigureStatModifier(editingStat, "injury", tempModifiers.injury);
      onChangeFigureStatModifier(editingStat, "misc", tempModifiers.misc);
    }
    setEditingStat(null);
  };

  return (
    <div
      id={id}
      className={
        "mb-4 border border-gray-700 rounded-lg overflow-hidden bg-[#1a1a1a] text-white " +
        (isInactive ? " opacity-60 grayscale" : "")
      }
    >
      {/* Header */}
      <div className="w-full p-6 pt-8">
        <div
          className="flex items-center justify-between cursor-pointer hover:bg-[#252525] transition-colors p-2 rounded"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <h3
            className="text-2xl font-bold text-center mt-4 flex-1"
            style={{ fontFamily: '"Cinzel", serif', color: "#8fbc8f" }}
          >
            {/* Lendas não têm narrative name - sempre mostra só o name */}
            {figure?.role === "Lenda"
              ? name
              : figure?.narrativeName
              ? `${figure.narrativeName}, ${name}`
              : name}
          </h3>
          <button
            className="text-white text-2xl transition-transform"
            style={{
              transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)",
            }}
          >
            ▼
          </button>
        </div>
      </div>

      {/* Conteúdo colapsável */}
      {!isCollapsed && (
        <div className="px-6 pb-6">
          {/* Campo de nome narrativo */}
          {figure?.role !== "Lenda" && (
            <div className="mt-3 flex justify-center">
              <input
                type="text"
                placeholder="Nome narrativo"
                className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-1 text-white text-sm w-full max-w-sm text-center"
                value={figure?.narrativeName || ""}
                onChange={(e) =>
                  onChangeNarrativeName && onChangeNarrativeName(e.target.value)
                }
              />
            </div>
          )}
          {(role === "Herói" ||
            role === "Líder" ||
            quantity ||
            costDisplay ||
            baseStats.upkeep) && (
            <div className="flex justify-center items-center gap-3 mt-3 flex-wrap">
              {role && (role === "Herói" || role === "Líder") && (
                <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">
                  {role}
                </span>
              )}
              {quantity &&
                quantity !== "0" &&
                String(quantity).trim() !== "" && (
                  <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">
                    {quantity}
                  </span>
                )}
              {costDisplay && (
                <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                  {costDisplay}
                </span>
              )}
              {baseStats.upkeep && (
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                  Manutenção: {baseStats.upkeep}
                </span>
              )}
            </div>
          )}

          {/* Avanços (Lendas não ganham avanços) */}
          {(() => {
            const roleStr = (figure?.role || "").toString().toLowerCase();
            if (roleStr.includes("lenda") || (figure as any)?.noXP) return null;
            return (
              <div className="mb-6">
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-[#252525] transition-colors p-2 rounded"
                  onClick={() =>
                    setIsAdvancementsCollapsed(!isAdvancementsCollapsed)
                  }
                >
                  <h4
                    className="text-lg font-bold"
                    style={{ color: "#8fbc8f" }}
                  >
                    AVANÇOS
                  </h4>
                  <button
                    className="text-white text-lg transition-transform"
                    style={{
                      transform: isAdvancementsCollapsed
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                    }}
                  >
                    ▼
                  </button>
                </div>
                {!isAdvancementsCollapsed && (
                  <>
                    <div className="mt-4 bg-[#2a2a2a] p-4 rounded">
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={rollCount}
                          onChange={(e) =>
                            setRollCount(
                              Math.max(
                                1,
                                Math.min(10, parseInt(e.target.value) || 1)
                              )
                            )
                          }
                          className="w-16 bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white text-center text-sm"
                        />
                        <button
                          onClick={() => rollAdvancement(rollCount)}
                          className="flex items-center gap-2 px-4 py-2 rounded bg-[#1a4a1a] hover:bg-[#2a5a2a] border border-green-600 text-white text-sm font-semibold transition-colors"
                        >
                          <svg className="w-5 h-5" viewBox="-16 0 512 512">
                            <path
                              fill="currentColor"
                              d="M106.75 215.06L1.2 370.95c-3.08 5 .1 11.5 5.93 12.14l208.26 22.07-108.64-190.1zM7.41 315.43L82.7 193.08 6.06 147.1c-2.67-1.6-6.06.32-6.06 3.43v162.81c0 4.03 5.29 5.53 7.41 2.09zM18.25 423.6l194.4 87.66c5.3 2.45 11.35-1.43 11.35-7.26v-65.67l-203.55-22.3c-4.45-.5-6.23 5.59-2.2 7.57zm81.22-257.78L179.4 22.88c4.34-7.06-3.59-15.25-10.78-11.14L17.81 110.35c-2.47 1.62-2.39 5.26.13 6.78l81.53 48.69zM240 176h109.21L253.63 7.62C250.5 2.54 245.25 0 240 0s-10.5 2.54-13.63 7.62L130.79 176H240zm233.94-28.9l-76.64 45.99 75.29 122.35c2.11 3.44 7.41 1.94 7.41-2.1V150.53c0-3.11-3.39-5.03-6.06-3.43zm-93.41 18.72l81.53-48.7c2.53-1.52 2.6-5.16.13-6.78l-150.81-98.6c-7.19-4.11-15.12 4.08-10.78 11.14l79.93 142.94zm79.02 250.21L256 438.32v65.67c0 5.84 6.05 9.71 11.35 7.26l194.4-87.66c4.03-1.97 2.25-8.06-2.2-7.56zm-86.3-200.97l-108.63 190.1 208.26-22.07c5.83-.65 9.01-7.14 5.93-12.14L373.25 215.06zM240 208H139.57L240 383.75 340.43 208H240z"
                            />
                          </svg>
                          Rolar Avanços
                        </button>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <AdvancementsPicker
                          options={advancementOptions}
                          selected={selectedAdvancements || []}
                          onAdd={(a) => onAddAdvancement && onAddAdvancement(a)}
                        />
                      </div>
                    </div>
                    {selectedAdvancements &&
                      selectedAdvancements.length > 0 && (
                        <div className="mt-3 space-y-3">
                          {selectedAdvancements.map((a, idx) => {
                            const advDesc: Record<string, string> = {
                              "Nova Habilidade":
                                "Aprenda uma nova habilidade dentre as listas de habilidades da figura. Adicione a habilidade na ficha da figura.",
                              "Nova Magia":
                                "Esse avanço pode ser ganho no lugar de 'Aprender nova Habilidade' para figuras capazes de conjurar magias ou orações. Adicione uma nova magia da tradição indicada na ficha da figura ou da tradição Magia Menor.",
                              "Fortalecer Magia":
                                "Esse avanço pode ser ganho no lugar de 'Aprender nova Habilidade' para figuras capazes de conjurar magias ou orações. Escolha uma magia que a figura sabe. Aquela magia tem sua Classe de Dificuldade diminuída em 1.",
                              "+1 Ímpeto":
                                "Aumente seu atributo de Ímpeto em +1. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                              "+1 Precisão":
                                "Aumente seu atributo de Precisão em +1. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                              "+1 Armadura":
                                "Aumente seu atributo de Armadura em +1. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                              "+2 Vida":
                                "Aumente seu atributo de Vida em +2. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                              "+2 Movimento":
                                "Aumente seu atributo de Movimento em +2. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                              "+1 Vontade":
                                "Aumente seu atributo de Vontade em +1. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                              "+1 Força":
                                "Aumente seu atributo de Força em +1. Note que cada raça tem limites de aumento de atributo que devem ser respeitados.",
                              "O Moleque Tem Talento!":
                                "O soldado se torna um herói! Ele continua usando sua mesma ficha e continua sendo o que era antes (um Barba Curta continua sendo um Barba Curta) e mantém seu nível, mas agora pode fazer todas as atividades que um herói pode e ganha experiência e sobe de nível como herói. Escolha duas listas de habilidades entre as que heróis do bando têm acesso e ganhe acesso a elas.",
                            };
                            const desc = advDesc[a] || "";
                            return (
                              <div
                                key={`${a}-${idx}`}
                                className="relative bg-[#2a2a2a] rounded p-3 border border-gray-700"
                              >
                                <div className="text-white font-semibold">
                                  {a}
                                </div>
                                {desc && (
                                  <div className="text-sm text-gray-300 mt-1">
                                    {desc}
                                  </div>
                                )}
                                {onRemoveAdvancement && (
                                  <button
                                    onClick={() => onRemoveAdvancement(a, idx)}
                                    className="absolute top-2 right-2 px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
                                  >
                                    Remover
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </>
                )}
              </div>
            );
          })()}

          {/* Teste de Sobrevivência para Soldados e Mercenários */}
          {(() => {
            const roleStr = (figure?.role || "").toString().toLowerCase();
            const isSoldierOrMercenary =
              roleStr.includes("soldado") || roleStr.includes("merc");
            if (!isSoldierOrMercenary) return null;
            return (
              <div className="mb-6">
                <h4
                  className="text-lg font-bold mb-3"
                  style={{ color: "#8fbc8f" }}
                >
                  TESTE DE SOBREVIVÊNCIA
                </h4>
                <div className="mt-4 bg-[#2a2a2a] p-4 rounded">
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => rollSurvival()}
                      className="flex items-center gap-2 px-4 py-2 rounded bg-[#4a1a1a] hover:bg-[#5a2a2a] border border-red-600 text-white text-sm font-semibold transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="-16 0 512 512">
                        <path
                          fill="currentColor"
                          d="M106.75 215.06L1.2 370.95c-3.08 5 .1 11.5 5.93 12.14l208.26 22.07-108.64-190.1zM7.41 315.43L82.7 193.08 6.06 147.1c-2.67-1.6-6.06.32-6.06 3.43v162.81c0 4.03 5.29 5.53 7.41 2.09zM18.25 423.6l194.4 87.66c5.3 2.45 11.35-1.43 11.35-7.26v-65.67l-203.55-22.3c-4.45-.5-6.23 5.59-2.2 7.57zm81.22-257.78L179.4 22.88c4.34-7.06-3.59-15.25-10.78-11.14L17.81 110.35c-2.47 1.62-2.39 5.26.13 6.78l81.53 48.69zM240 176h109.21L253.63 7.62C250.5 2.54 245.25 0 240 0s-10.5 2.54-13.63 7.62L130.79 176H240zm233.94-28.9l-76.64 45.99 75.29 122.35c2.11 3.44 7.41 1.94 7.41-2.1V150.53c0-3.11-3.39-5.03-6.06-3.43zm-93.41 18.72l81.53-48.7c2.53-1.52 2.6-5.16.13-6.78l-150.81-98.6c-7.19-4.11-15.12 4.08-10.78 11.14l79.93 142.94zm79.02 250.21L256 438.32v65.67c0 5.84 6.05 9.71 11.35 7.26l194.4-87.66c4.03-1.97 2.25-8.06-2.2-7.56zm-86.3-200.97l-108.63 190.1 208.26-22.07c5.83-.65 9.01-7.14 5.93-12.14L373.25 215.06zM240 208H139.57L240 383.75 340.43 208H240z"
                        />
                      </svg>
                      Rolar Sobrevivência
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Ferimentos (somente Heróis / Líderes / Lendas) */}
          {(() => {
            const roleStr = (figure?.role || "").toString().toLowerCase();
            const showInjuries =
              roleStr.includes("líder") ||
              roleStr.includes("lider") ||
              roleStr.includes("her") ||
              roleStr.includes("lenda");
            if (!showInjuries) return null;
            return (
              <div className="mb-6">
                <div
                  className="flex items-center justify-between cursor-pointer hover:bg-[#252525] transition-colors p-2 rounded"
                  onClick={() => setIsInjuriesCollapsed(!isInjuriesCollapsed)}
                >
                  <h4
                    className="text-lg font-bold"
                    style={{ color: "#8fbc8f" }}
                  >
                    FERIMENTOS
                  </h4>
                  <button
                    className="text-white text-lg transition-transform"
                    style={{
                      transform: isInjuriesCollapsed
                        ? "rotate(0deg)"
                        : "rotate(180deg)",
                    }}
                  >
                    ▼
                  </button>
                </div>
                {!isInjuriesCollapsed && (
                  <>
                    <div className="mt-4 bg-[#2a2a2a] p-4 rounded">
                      <div className="flex items-center gap-2 mb-3">
                        <button
                          onClick={() => rollSurvival()}
                          className="flex items-center gap-2 px-4 py-2 rounded bg-[#4a1a1a] hover:bg-[#5a2a2a] border border-red-600 text-white text-sm font-semibold transition-colors"
                        >
                          <svg className="w-5 h-5" viewBox="-16 0 512 512">
                            <path
                              fill="currentColor"
                              d="M106.75 215.06L1.2 370.95c-3.08 5 .1 11.5 5.93 12.14l208.26 22.07-108.64-190.1zM7.41 315.43L82.7 193.08 6.06 147.1c-2.67-1.6-6.06.32-6.06 3.43v162.81c0 4.03 5.29 5.53 7.41 2.09zM18.25 423.6l194.4 87.66c5.3 2.45 11.35-1.43 11.35-7.26v-65.67l-203.55-22.3c-4.45-.5-6.23 5.59-2.2 7.57zm81.22-257.78L179.4 22.88c4.34-7.06-3.59-15.25-10.78-11.14L17.81 110.35c-2.47 1.62-2.39 5.26.13 6.78l81.53 48.69zM240 176h109.21L253.63 7.62C250.5 2.54 245.25 0 240 0s-10.5 2.54-13.63 7.62L130.79 176H240zm233.94-28.9l-76.64 45.99 75.29 122.35c2.11 3.44 7.41 1.94 7.41-2.1V150.53c0-3.11-3.39-5.03-6.06-3.43zm-93.41 18.72l81.53-48.7c2.53-1.52 2.6-5.16.13-6.78l-150.81-98.6c-7.19-4.11-15.12 4.08-10.78 11.14l79.93 142.94zm79.02 250.21L256 438.32v65.67c0 5.84 6.05 9.71 11.35 7.26l194.4-87.66c4.03-1.97 2.25-8.06-2.2-7.56zm-86.3-200.97l-108.63 190.1 208.26-22.07c5.83-.65 9.01-7.14 5.93-12.14L373.25 215.06zM240 208H139.57L240 383.75 340.43 208H240z"
                            />
                          </svg>
                          Rolar Sobrevivência
                        </button>
                      </div>
                    </div>
                    <InjuriesPicker
                      selected={selectedInjuries || []}
                      onAdd={(i) => onAddInjury && onAddInjury(i)}
                    />
                    {selectedInjuries && selectedInjuries.length > 0 && (
                      <div className="mt-3 space-y-3">
                        {selectedInjuries.map((injuryName, idx) => {
                          const descMap: Record<string, string> = {
                            // Correspondências com o InjuriesPicker
                            "Ferimento na Perna":
                              "A perna da figura está quebrada. Ele sofre uma penalidade de -2 em seu atributo de Movimento a partir de agora.",
                            "Ombro Deslocado":
                              "A figura não joga o próximo jogo enquanto se recupera.",
                            "Antebraço Esmagado":
                              "O braço da figura foi amputado. A figura só poderá usar uma única arma sem a característica Duas Mãos a partir de agora.",
                            "Insanidade(Estupidez)":
                              "A figura ganha a característica Estupidez, e não é substituída como Líder do bando pelo herói com mais experiência.",
                            "Insanidade(Fúria)":
                              "A figura ganha a característica Fúria em combate.",
                            "Perna Deslocada":
                              "A figura não pode participar do próximo jogo enquanto se recupera.",
                            "Fratura Exposta na Perna":
                              "A figura não pode mais tomar ações de disparada ou escalar.",
                            "Costelas Quebradas":
                              "A figura sofreu um ferimento grave no peito. Sua vida máxima é reduzida permanentemente em -2.",
                            "Cego de Um Olho":
                              "A figura sobrevive, mas perde a visão em um olho. Um personagem que perde um olho tem sua Precisão reduzida em -2. Se a figura for posteriormente cegada no olho bom restante, ele deve se aposentar do bando.",
                            "Ferimento Infectado":
                              "A figura sobrevive, mas sua ferida o impedirá de lutar se você rolar 1-5 em um dado no início de qualquer batalha. Role no início de cada batalha a partir de agora.",
                            Trauma:
                              "O sistema nervoso da figura foi danificado. Sua Vontade é reduzida em -1.",
                            "Mão Esmigalhada":
                              "A mão da figura está gravemente ferida. Seu Ímpeto é reduzido permanentemente em -1.",
                            "Ferimento Profundo":
                              "A figura sofreu um ferimento sério e deve perder os próximos 2 jogos enquanto se recupera. Ele não pode fazer nada enquanto se recupera, incluindo atividades.",
                          };
                          let desc = descMap[injuryName] || "";
                          if (!desc) {
                            const paren = injuryName.match(/\(([^)]+)\)/);
                            if (paren && paren[1]) desc = paren[1];
                          }
                          return (
                            <div
                              key={`${injuryName}-${idx}`}
                              className="relative bg-[#2a2a2a] rounded p-3 border border-gray-700"
                            >
                              <div className="text-white font-semibold">
                                {injuryName}
                              </div>
                              {desc && (
                                <div className="text-sm text-gray-300 mt-1">
                                  {desc}
                                </div>
                              )}
                              {onRemoveInjury && (
                                <button
                                  onClick={() =>
                                    onRemoveInjury(injuryName, idx)
                                  }
                                  className="absolute top-2 right-2 px-2 py-1 rounded bg-green-700 hover:bg-green-600 text-white text-xs"
                                >
                                  Curar
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })()}

          {/* Content */}
          <div className="pt-6 pb-6 border-t border-gray-600 mt-4">
            {/* Lore */}
            {(lore || baseStats.lore) && (
              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed italic">
                  {lore || baseStats.lore}
                </p>
              </div>
            )}

            {/* Availability and Qualidade */}
            {(availability ||
              (qualidade && qualidade !== "0" && Number(qualidade) !== 0)) && (
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
                    <strong>Qualidade:</strong> {qualidade}
                  </p>
                )}
              </div>
            )}

            {/* Experiência (Lendas não ganham XP) */}
            {(() => {
              const role = (figure?.role || "").toString().toLowerCase();
              if (role.includes("lenda") || (figure as any)?.noXP) return null;
              return (
                <div className="mb-6">
                  {(() => {
                    const role = (figure?.role || "").toString().toLowerCase();
                    const isHero =
                      role.includes("líder") ||
                      role.includes("lider") ||
                      role.includes("her");
                    return isHero ? (
                      <ExperienceTrackerHero
                        xp={figure?.xp ?? 0}
                        onChange={(v) =>
                          onChangeFigureXp && onChangeFigureXp(v)
                        }
                      />
                    ) : (
                      <ExperienceTrackerSoldier
                        xp={figure?.xp ?? 0}
                        onChange={(v) =>
                          onChangeFigureXp && onChangeFigureXp(v)
                        }
                      />
                    );
                  })()}
                </div>
              );
            })()}

            {/* Stats com Figure - layout simplificado com modal */}
            <div className="mb-6">
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                ATRIBUTOS E MODIFICADORES
              </h4>
              <div className="bg-[#2a2a2a] p-4 rounded space-y-2">
                {figStatOrder.map((skey) => {
                  if (
                    skey === "strength" &&
                    figure?.baseStats?.strength === undefined
                  )
                    return null;
                  const b = toFigureBreakdown(skey);
                  const total = getTotal(b, skey);
                  const label =
                    skey === "move"
                      ? "Movimento"
                      : skey === "fight"
                      ? "Ímpeto"
                      : skey === "shoot"
                      ? "Precisão"
                      : skey === "armour"
                      ? "Armadura"
                      : skey === "Vontade"
                      ? "Vontade"
                      : skey === "health"
                      ? "Vida"
                      : "Força";
                  const showPlus =
                    skey === "fight" || skey === "shoot" || skey === "Vontade";
                  return (
                    <div
                      key={String(skey)}
                      className="flex items-center justify-between py-2 border-b border-gray-600 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300 font-semibold">
                          {label}
                        </span>
                        <span className="text-xs text-gray-400">
                          (Base: {b.base})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          {showPlus && total >= 0 ? `+${total}` : `${total}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => openEditModal(skey)}
                          className="text-gray-400 hover:text-green-300 transition-colors flex items-center justify-center font-bold text-lg"
                          title="Editar modificadores"
                        >
                          ±
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Habilidades - Oculto para Soldados; Para Lendas, só mostra se tiver skills */}
            {figure?.role !== "Soldado" &&
              (figure?.role !== "Lenda" ||
                (selectedSkills && selectedSkills.length > 0)) && (
                <div className="mb-6">
                  <h4
                    className="text-lg font-bold mb-3"
                    style={{ color: "#8fbc8f" }}
                  >
                    HABILIDADES DISPONÍVEIS
                  </h4>
                  {/* Removido: botões para adicionar lista de habilidades (acesso total via picker) */}
                  <div className="bg-[#2a2a2a] p-4 rounded">
                    {baseStats.skills && baseStats.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {baseStats.skills.map((skill, index) => (
                          <button
                            key={index}
                            onClick={() => handleSkillClick(skill)}
                            className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors duration-200 cursor-pointer"
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    )}
                    {/* SkillPicker só aparece se não for Lenda */}
                    {figure?.role !== "Lenda" && onAddSkill && (
                      <SkillPicker
                        allowedSkills={
                          (availableSkills && availableSkills.length
                            ? availableSkills
                            : baseStats.skills && baseStats.skills.length
                            ? (baseStats.skills as string[])
                            : (figure?.avaiableSkills as string[]) ||
                              []) as string[]
                        }
                        selectedSkills={selectedSkills || []}
                        onAdd={(s) => onAddSkill && onAddSkill(s)}
                      />
                    )}

                    {/* Exibe as habilidades selecionadas como SkillCards */}
                    {selectedSkills && selectedSkills.length > 0 && (
                      <div className="mt-4">
                        <h5
                          className="font-bold mb-3"
                          style={{ color: "#8fbc8f" }}
                        >
                          HABILIDADES SELECIONADAS
                        </h5>
                        <div className="space-y-3">
                          {selectedSkills.map((skill, index) => (
                            <div key={skill.id || index}>
                              <SkillCard
                                name={skill.name}
                                description={skill.description}
                                footer={
                                  onRemoveSkill && skill.id ? (
                                    <button
                                      onClick={() => onRemoveSkill(skill.id!)}
                                      className="w-full sm:w-auto px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm whitespace-nowrap"
                                    >
                                      Remover
                                    </button>
                                  ) : undefined
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            {/* Magias - Oculto para Soldados; Para Lendas, só mostra se tiver spells */}
            {figure?.role !== "Soldado" &&
              (figure?.role !== "Lenda" ||
                (selectedSpells && selectedSpells.length > 0)) && (
                <div className="mb-6">
                  <h4
                    className="text-lg font-bold mb-3"
                    style={{ color: "#8fbc8f" }}
                  >
                    TRADIÇÕES MÁGICAS
                  </h4>
                  <div className="bg-[#2a2a2a] p-4 rounded">
                    {/* Removido: botão para adicionar tradição (acesso total via picker) */}
                    {Array.isArray((figure as any)?.avaiableSpells) &&
                    (figure as any).avaiableSpells.length > 0 ? (
                      <div className="mb-3">
                        <div className="text-sm text-gray-300 mb-1">
                          Escolas Disponíveis
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {((figure as any).avaiableSpells as string[]).map(
                            (t, idx) => (
                              <span
                                key={`as-${idx}`}
                                className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
                              >
                                {t}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    ) : null}
                    {(() => {
                      const a0 =
                        (spellAffinity && spellAffinity.aligned0) || [];
                      const a2 =
                        (spellAffinity && spellAffinity.aligned2) || [];
                      if ((a0 && a0.length) || (a2 && a2.length)) {
                        return (
                          <div className="mb-3">
                            <div className="text-sm text-gray-300 mb-1">
                              Afinidades do Usuário
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {a0.map((t, idx) => (
                                <span
                                  key={`a0-${idx}`}
                                  className="inline-flex items-center bg-[#1a1a1a] border border-green-600/60 text-green-300 text-xs rounded px-2 py-1"
                                  title="Afinidade Primária"
                                >
                                  {t}
                                </span>
                              ))}
                              {a2.map((t, idx) => (
                                <span
                                  key={`a2-${idx}`}
                                  className="inline-flex items-center bg-[#1a1a1a] border border-yellow-600/60 text-yellow-300 text-xs rounded px-2 py-1"
                                  title="Afinidade Secundária"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                    {/* SpellPicker só aparece se não for Lenda */}
                    {figure?.role !== "Lenda" && onAddSpell && (
                      <SpellPicker
                        aligned0={
                          spellAffinity ? spellAffinity.aligned0 : undefined
                        }
                        aligned2={
                          spellAffinity ? spellAffinity.aligned2 : undefined
                        }
                        selectedSpells={selectedSpells || []}
                        onAdd={(spell) => onAddSpell(spell)}
                      />
                    )}
                    {selectedSpells && selectedSpells.length > 0 && (
                      <div className="mt-4">
                        <h5
                          className="font-bold mb-3"
                          style={{ color: "#8fbc8f" }}
                        >
                          MAGIAS SELECIONADAS
                        </h5>
                        <div className="space-y-3">
                          {selectedSpells.map((spell, index) => (
                            <div key={spell.id || index}>
                              <LoreSpellCard
                                name={spell.name}
                                castingNumber={spell.castingNumber}
                                keywords={spell.keywords}
                                effect={spell.effect}
                                footer={
                                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                    <input
                                      type="number"
                                      className="w-full sm:w-16 bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1.5 text-white text-center text-xs sm:text-sm"
                                      value={spell.castingNumber}
                                      onChange={(e) =>
                                        onChangeSpellCastingNumber &&
                                        onChangeSpellCastingNumber(
                                          spell.id || String(index),
                                          parseInt(e.target.value) || 0
                                        )
                                      }
                                      title="CD da magia"
                                    />
                                    {onRemoveSpell && (
                                      <button
                                        onClick={() =>
                                          onRemoveSpell(
                                            spell.id || String(index)
                                          )
                                        }
                                        className="w-full sm:w-auto px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm whitespace-nowrap"
                                      >
                                        Remover
                                      </button>
                                    )}
                                  </div>
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            {/* Habilidades Especiais - Oculto para Soldados e Lendas */}
            {figure?.role !== "Soldado" && figure?.role !== "Lenda" && (
              <div className="mb-6">
                <h4
                  className="text-lg font-bold mb-3"
                  style={{ color: "#8fbc8f" }}
                >
                  HABILIDADES ESPECIAIS
                </h4>
                <div className="bg-[#2a2a2a] p-4 rounded">
                  {onAddSpecialAbility && (
                    <SpecialAbilitiesPicker onAdd={onAddSpecialAbility} />
                  )}
                  {figure && (
                    <div className="mt-2">
                      <div className="space-y-4">
                        {["nurgleBlessings", "mutations", "sacredMarks"].map(
                          (k) => {
                            const list = (figure as any)[k] || [];
                            const labelMap: any = {
                              nurgleBlessings: "Bênçãos de Nurgle",
                              mutations: "Mutações",
                              sacredMarks: "Marcas Sagradas",
                            };
                            const catMap: any = {
                              nurgleBlessings: "nurgleBlessing",
                              mutations: "mutation",
                              sacredMarks: "sacredMark",
                            };
                            if (!list.length) return null;
                            return (
                              <div key={k}>
                                <div className="text-sm text-gray-300 mb-2">
                                  {labelMap[k]}
                                </div>
                                <div className="space-y-3">
                                  {list.map((it: any) => (
                                    <SpecialAbilitiesCard
                                      key={it.id || it.name}
                                      name={it.name}
                                      cost={it.cost}
                                      description={it.description}
                                      footer={
                                        onRemoveSpecialAbility && it.id ? (
                                          <button
                                            onClick={() =>
                                              onRemoveSpecialAbility(
                                                catMap[k],
                                                it.id
                                              )
                                            }
                                            className="w-full sm:w-auto px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm whitespace-nowrap"
                                          >
                                            Remover
                                          </button>
                                        ) : undefined
                                      }
                                    />
                                  ))}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Seção de Equipamento - Oculto se equipmentSlots === 0 */}
            {(figure?.equipmentSlots ?? maxSlots ?? 5) > 0 && (
              <>
                {figure?.avaiableEquipment &&
                  figure.avaiableEquipment.length > 0 && (
                    <div className="mb-6">
                      <h4
                        className="text-lg font-bold mb-3"
                        style={{ color: "#8fbc8f" }}
                      >
                        EQUIPAMENTOS DISPONÍVEIS
                      </h4>
                      <div className="bg-[#2a2a2a] p-4 rounded">
                        <div className="flex flex-wrap gap-2">
                          {figure.avaiableEquipment.map((name, idx) => (
                            <span
                              key={`${name}-${idx}`}
                              className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-gray-600 text-white text-xs rounded px-2 py-1"
                            >
                              {name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                <EquipmentManager
                  unitId={id}
                  unitName={name}
                  equipment={equipment}
                  abilities={abilities}
                  equippedItems={
                    Array.isArray(figure?.equiped)
                      ? (figure.equiped as any[])
                      : []
                  }
                  stashItems={stashItems as any}
                  onEquipFromStashFlat={(_uid, item) =>
                    onEquipFromStashFlat && onEquipFromStashFlat(item)
                  }
                  onUnequipToStashFlat={(_uid, item) =>
                    onUnequipToStashFlat && onUnequipToStashFlat(item)
                  }
                  maxSlots={maxSlots}
                  availableEquipmentNames={
                    (figure?.avaiableEquipment as string[]) || []
                  }
                  equipmentLocked={Boolean((figure as any)?.equipmentLocked)}
                  figureSkills={(figure?.skills || []) as any}
                />
              </>
            )}

            {/* Abilities / Regras Especiais */}
            {(abilities && abilities.length > 0) ||
            (Array.isArray((figure as any)?.specialRules) &&
              (figure as any).specialRules.length > 0) ? (
              <div className="mb-6">
                <h4
                  className="text-lg font-bold mb-3"
                  style={{ color: "#8fbc8f" }}
                >
                  Regras Especiais
                </h4>
                <div className="bg-[#2a2a2a] p-4 rounded space-y-3">
                  {abilities && abilities.length > 0
                    ? abilities.map((ability, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-600 pb-3 last:border-b-0"
                        >
                          <h5
                            className="font-bold mb-1"
                            style={{ color: "#8fbc8f" }}
                          >
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
                      ))
                    : ((figure as any).specialRules as any[]).map((r, idx) => (
                        <div
                          key={idx}
                          className="border-b border-gray-600 pb-3 last:border-b-0"
                        >
                          <h5
                            className="font-bold mb-1"
                            style={{ color: "#8fbc8f" }}
                          >
                            {r?.name}
                          </h5>
                          {r?.description && (
                            <GameText
                              component="p"
                              className="text-gray-300 text-sm leading-relaxed"
                            >
                              {r.description}
                            </GameText>
                          )}
                        </div>
                      ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Modal de edição de modificadores de atributo */}
      {editingStat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closeEditModal}
        >
          <div
            className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold" style={{ color: "#8fbc8f" }}>
                Editar Modificadores -{" "}
                {(() => {
                  const label =
                    editingStat === "move"
                      ? "Movimento"
                      : editingStat === "fight"
                      ? "Ímpeto"
                      : editingStat === "shoot"
                      ? "Precisão"
                      : editingStat === "armour"
                      ? "Armadura"
                      : editingStat === "Vontade"
                      ? "Vontade"
                      : editingStat === "health"
                      ? "Vida"
                      : "Força";
                  return label;
                })()}
              </h3>
              <button
                type="button"
                onClick={closeEditModal}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Avanço
                </label>
                <input
                  type="number"
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-3 py-2 text-white"
                  value={tempModifiers.advancement}
                  onChange={(e) =>
                    setTempModifiers({
                      ...tempModifiers,
                      advancement: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Ferida
                </label>
                <input
                  type="number"
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-3 py-2 text-white"
                  value={tempModifiers.injury}
                  onChange={(e) =>
                    setTempModifiers({
                      ...tempModifiers,
                      injury: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Misc
                </label>
                <input
                  type="number"
                  className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-3 py-2 text-white"
                  value={tempModifiers.misc}
                  onChange={(e) =>
                    setTempModifiers({
                      ...tempModifiers,
                      misc: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="pt-4 border-t border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">Total:</span>
                  <span className="text-lg font-bold">
                    {(() => {
                      const b = toFigureBreakdown(editingStat);
                      let total =
                        b.base +
                        tempModifiers.advancement +
                        tempModifiers.injury +
                        tempModifiers.misc;

                      // Para armadura, adiciona bônus de equipamentos
                      if (
                        editingStat === "armour" &&
                        figure?.equiped &&
                        Array.isArray(figure.equiped)
                      ) {
                        let equipmentArmorBonus = 0;
                        for (const equip of figure.equiped) {
                          const armorBonus = equip.armorBonus;
                          if (typeof armorBonus === "number") {
                            equipmentArmorBonus += armorBonus;
                          }
                        }
                        total += equipmentArmorBonus;
                        // Limita a 17
                        total = Math.min(total, 17);
                      }

                      const showPlus =
                        editingStat === "fight" ||
                        editingStat === "shoot" ||
                        editingStat === "Vontade";
                      return showPlus && total >= 0 ? `+${total}` : `${total}`;
                    })()}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Rolagem de Avanços */}
      {rollModalOpen && rolledOptions && Array.isArray(rolledOptions) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1f1f1f] border border-gray-600 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4" style={{ color: "#8fbc8f" }}>
              Escolha um Avanço
            </h3>
            {pendingRolls.length > 0 && (
              <div className="mb-3 px-3 py-2 bg-blue-900/20 border border-blue-500/40 rounded text-sm text-blue-300">
                Restam {pendingRolls.length} avanços na fila
              </div>
            )}
            <div className="space-y-3">
              {rolledOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => chooseOption(option)}
                  className="w-full p-4 rounded bg-[#2a2a2a] border border-gray-700 hover:bg-[#353535] hover:border-green-600 transition-colors text-left"
                >
                  <div className="text-white font-semibold text-lg">
                    {option}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    Clique para escolher
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Rolagem de Sobrevivência */}
      {survivalModalOpen && survivalResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1f1f1f] border border-red-600 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-red-500">
              Teste de Sobrevivência
            </h3>
            <div className="mb-4 px-3 py-2 bg-red-900/20 border border-red-500/40 rounded text-sm text-red-300">
              {survivalResult}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSurvivalModalOpen(false);
                  setSurvivalResult(null);
                }}
                className="flex-1 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RosterUnitCard;
