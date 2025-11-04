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
import SacredMarksPicker from "./SacredMarksPicker";
import MutationsPicker from "./MutationsPicker";
import BlessingsOfNurglePicker from "./BlessingsOfNurglePicker";
import type { SpecialAbilityInstance } from "./SpecialAbilitiesPicker";
import AdvancementsPicker from "./AdvancementsPicker";
import InjuriesPicker from "./InjuriesPicker";
import EquipmentManager from "./EquipmentManager";
import {
  type UnitStats,
  type UnitAbility,
  type NaturalAttack,
} from "./UnitCard";
import type { figure } from "../pages/warband-builder/types/figure.type";
import SpecialAbilitiesCard from "./SpecialAbilitiesCard";
import ExperienceTrackerHero from "./ExperienceTrackerHero";
import ExperienceTrackerSoldier from "./ExperienceTrackerSoldier";
import { useResolvedFigure } from "../hooks/useWarbandData";
import { useMultipleBaseData } from "../hooks/useBaseData";
import { useJsonData } from "../hooks/useJsonData";
import { getStaticImport } from "../data/jsonFileMap";
import {
  hasTrainedBody,
  hasBattleWizard,
  hasArcaneLearning,
  hasTepokMark,
  calculateMutationModifiers,
  calculateSacredMarkModifiers,
  calculateNurgleBlessingModifiers,
  calculateAdvancementModifiers,
  calculateInjuryModifiers,
  calculateSkillModifiers,
} from "../pages/warband-builder/roster/helpers/warbandCalculations.helpers";

export interface AttributeBreakdown {
  base: number;
  advancement: number;
  injury: number;
  misc: number;
  equipment?: number;
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
  figure?: figure; // Nova estrutura obrigatória
  factionId?: string; // ID da facção para buscar dados na coleção correta
  factionFallbackData?: any; // Dados estáticos da facção para fallback
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
    casting_number_modifier?: number; // Modifier para edição
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
  // Coroas do warband
  availableCrowns?: number; // Coroas disponíveis
  onSpendCrowns?: (amount: number) => boolean; // Função para debitar coroas
  // XP da figura
  onChangeFigureXp?: (xp: number) => void;
  // Nome narrativo
  onChangeNarrativeName?: (name: string) => void;
  // Notas da figura
  onChangeNotes?: (notes: string) => void;
  // Avanços
  selectedAdvancements?: string[];
  onAddAdvancement?: (adv: string) => void;
  onRemoveAdvancement?: (adv: string, index?: number) => void;
  // Ferimentos
  selectedInjuries?: string[];
  onAddInjury?: (injury: string) => void;
  onRemoveInjury?: (injury: string, index?: number) => void;
  // Equipamento escolhido para a unidade (lista única) - usa IDs
  onEquipFromStashFlat?: (itemId: string) => void;
  onUnequipToStashFlat?: (itemId: string) => void;
  onEquipToSecondaryHand?: (itemId: string) => void;
  onUnequipFromSecondaryHand?: (itemId: string) => void;
  onEquipToPrimaryHand?: (itemId: string, asTwoHanded?: boolean) => void;
  onUnequipFromPrimaryHand?: (itemId: string) => void;
  onEquipAsArmor?: (itemId: string) => void;
  onUnequipFromArmor?: (itemId: string) => void;
  onEquipAsPair?: (itemId: string) => void;
  maxSlots?: number;
  // Novo: editar modificadores direto do Figure
  onChangeFigureStatModifier?: (
    stat: keyof UnitStats,
    category: "injury" | "advancement" | "misc" | "equipment",
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
  // Comprar equipamento pelo ID (adiciona ao stash e equipa automaticamente na figura)
  onPurchaseEquipment?: (
    unitId: string,
    itemId: string,
    cost: string,
    itemName: string,
    modifierId?: string
  ) => void;
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
  factionId,
  factionFallbackData,
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
  onChangeNotes,
  availableCrowns = Infinity, // Por padrão, permite sem limite
  onSpendCrowns,
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
  onEquipToSecondaryHand,
  onUnequipFromSecondaryHand,
  onEquipToPrimaryHand,
  onUnequipFromPrimaryHand,
  onEquipAsArmor,
  onUnequipFromArmor,
  onEquipAsPair,
  maxSlots,
  onChangeFigureStatModifier,
  onAddSpecialRule,
  onRemoveSpecialRule: _onRemoveSpecialRule,
  onPurchaseEquipment,
}) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showPurchasables, setShowPurchasables] = useState<boolean>(false);

  // Helper: rota da tradição para a página de magia
  const getLoreRoute = useCallback((traditionName: string): string => {
    const normalizeString = (str: string): string =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ");
    const normalizedInput = normalizeString(traditionName);
    const loreMappings = [
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
      { name: "Orações de Sigmar", route: "/magic/prayers-of-sigmar" },
      { name: "Orações de Ulric", route: "/magic/prayers-of-ulric" },
      { name: "Prayers of Sigmar", route: "/magic/prayers-of-sigmar" },
      { name: "Prayers of Ulric", route: "/magic/prayers-of-ulric" },
      { name: "Magia de Waaaaagh!", route: "/magic/magic-of-the-waaaaagh" },
      { name: "Magia da WAAAAAAAGH!", route: "/magic/magic-of-the-waaaaagh" },
      { name: "Magia dos Goblins", route: "/magic/magic-of-the-goblins" },
      { name: "Lore of the Big Waaagh", route: "/magic/magic-of-the-waaaaagh" },
      { name: "Magia Druchii", route: "/magic/druchii-magic" },
      { name: "Magia dos Antigos", route: "/magic/magic-of-the-old-ones" },
      { name: "Magia dos Anciões", route: "/magic/magic-of-the-old-ones" },
      { name: "Magic of the Old Ones", route: "/magic/magic-of-the-old-ones" },
      { name: "Magia Inferior", route: "/magic/lesser-magic" },
      { name: "Lesser Magic", route: "/magic/lesser-magic" },
    ];
    for (const m of loreMappings) {
      if (normalizeString(m.name) === normalizedInput) return m.route;
    }
    if (normalizedInput.includes("caos") || normalizedInput.includes("chaos"))
      return "/magic/rituals-of-chaos";
    if (normalizedInput.includes("hashut")) return "/magic/rituals-of-hashut";
    if (
      normalizedInput.includes("rato") ||
      normalizedInput.includes("chifrudo") ||
      normalizedInput.includes("horned") ||
      normalizedInput.includes("rat")
    )
      return "/magic/lore-of-horned-rat";
    if (
      normalizedInput.includes("necromancia") ||
      normalizedInput.includes("necromancy")
    )
      return "/magic/lore-of-necromancy";
    if (
      normalizedInput.includes("sigmar") &&
      (normalizedInput.includes("oracoes") ||
        normalizedInput.includes("prayers"))
    )
      return "/magic/prayers-of-sigmar";
    if (
      normalizedInput.includes("ulric") &&
      (normalizedInput.includes("oracoes") ||
        normalizedInput.includes("prayers"))
    )
      return "/magic/prayers-of-ulric";
    if (
      normalizedInput.includes("waaaagh") ||
      normalizedInput.includes("waaagh")
    )
      return "/magic/magic-of-the-waaaaagh";
    if (normalizedInput.includes("goblin"))
      return "/magic/magic-of-the-goblins";
    if (normalizedInput.includes("druchii")) return "/magic/druchii-magic";
    if (
      normalizedInput.includes("anci") ||
      normalizedInput.includes("antigo") ||
      normalizedInput.includes("old ones")
    )
      return "/magic/magic-of-the-old-ones";
    if (
      normalizedInput.includes("inferior") ||
      (normalizedInput.includes("lesser") && normalizedInput.includes("magic"))
    )
      return "/magic/lesser-magic";
    return "/magic";
  }, []);

  const handleLoreClick = useCallback(
    (tradition: string) => {
      const route = getLoreRoute(tradition);
      navigate(route);
    },
    [getLoreRoute, navigate]
  );

  // Busca dados base usando hooks com facção e fallback
  const resolvedData = useResolvedFigure(
    figure,
    factionId,
    factionFallbackData
  );

  // Busca dados base de equipamentos (via equiped[].base_equipment_id), skills, spells e mutações
  const equipmentBaseIds = Array.isArray((figure as any)?.equiped)
    ? ((figure as any).equiped as any[])
        .map(e => e?.base_equipment_id)
        .filter(Boolean)
    : [];
  const modifierBaseIds = Array.isArray((figure as any)?.equiped)
    ? ((figure as any).equiped as any[])
        .map(e => e?.base_modifier_id)
        .filter(Boolean)
    : [];
  const skillBaseIds = figure?.availableSkills || [];
  const spellBaseIds = figure?.availableSpells || [];
  // Mutações e marcas sagradas são carregadas via useJsonData (admin-data/cult-mutations e admin-data/lizardmen-sacred-marks)
  // Não precisamos extrair os IDs aqui, pois já carregamos todos os dados de uma vez

  const equipmentBases = useMultipleBaseData(
    "base-equipment",
    equipmentBaseIds,
    equipmentBaseIds.length > 0
  );
  const modifierBases = useMultipleBaseData(
    "base-modifiers",
    modifierBaseIds,
    modifierBaseIds.length > 0
  );

  // Carrega catálogos estáticos para fallback
  const { data: meleeDb } = useJsonData({
    fileId: "armas-corpo-a-corpo",
    staticImport: () => getStaticImport("armas-corpo-a-corpo")(),
  });
  const { data: rangedDb } = useJsonData({
    fileId: "armas-a-distancia",
    staticImport: () => getStaticImport("armas-a-distancia")(),
  });
  const { data: firearmsDb } = useJsonData({
    fileId: "armas-de-fogo",
    staticImport: () => getStaticImport("armas-de-fogo")(),
  });
  const { data: armorDb } = useJsonData({
    fileId: "armaduras-e-escudos",
    staticImport: () => getStaticImport("armaduras-e-escudos")(),
  });
  const { data: accessoriesDb } = useJsonData({
    fileId: "acessorios",
    staticImport: () => getStaticImport("acessorios")(),
  });
  const { data: remediesPoisonsDb } = useJsonData({
    fileId: "remedios-e-venenos",
    staticImport: () => getStaticImport("remedios-e-venenos")(),
  });
  const { data: meleeMods } = useJsonData({
    fileId: "modificadores-de-arma",
    staticImport: () => getStaticImport("modificadores-de-arma")(),
  });
  const { data: rangedMods } = useJsonData({
    fileId: "modificadores-de-arma-a-distancia",
    staticImport: () => getStaticImport("modificadores-de-arma-a-distancia")(),
  });
  const { data: firearmsMods } = useJsonData({
    fileId: "modificadores-de-armas-de-fogo",
    staticImport: () => getStaticImport("modificadores-de-armas-de-fogo")(),
  });

  // Carrega o arquivo completo de bênçãos de Nurgle do Firestore/IndexedDB (NUNCA local)
  const {
    data: allBlessingsOfNurgle,
    loading: blessingsLoading,
    error: blessingsError,
  } = useJsonData({
    fileId: "carnival-blessings",
  });

  // Loga sucesso ou falha no carregamento das bênçãos de Nurgle
  React.useEffect(() => {
    if (!blessingsLoading) {
      if (blessingsError) {
      } else if (allBlessingsOfNurgle) {
        // Bênçãos carregadas com sucesso
      } else {
      }
    }
  }, [blessingsLoading, blessingsError, allBlessingsOfNurgle]);

  // Cria um mapa de todas as bênçãos (key = blessing.id, value = blessing object)
  const allBlessingsMap = React.useMemo(() => {
    const map: Record<string, any> = {};
    if (allBlessingsOfNurgle && Array.isArray(allBlessingsOfNurgle)) {
      (allBlessingsOfNurgle as any[]).forEach((blessing: any) => {
        if (blessing?.id) {
          map[blessing.id] = blessing;
        }
      });
    }
    return map;
  }, [allBlessingsOfNurgle]);

  const skillBases = useMultipleBaseData(
    "base-skills",
    skillBaseIds,
    skillBaseIds.length > 0
  );
  const spellBases = useMultipleBaseData(
    "base-spells",
    spellBaseIds,
    spellBaseIds.length > 0
  );
  // Mutações estão em admin-data/cult-mutations (documento na coleção admin-data)
  const { data: allMutationsData } = useJsonData({
    fileId: "cult-mutations",
  });

  // Marca Sagradas estão em admin-data/lizardmen-sacred-marks (documento na coleção admin-data)
  const { data: allSacredMarksData } = useJsonData({
    fileId: "lizardmen-sacred-marks",
  });

  // Cria mapas de mutações e marcas sagradas
  const allMutationsMap = React.useMemo(() => {
    const map: Record<string, any> = {};
    if (allMutationsData && Array.isArray(allMutationsData)) {
      (allMutationsData as any[]).forEach(m => {
        if (m.id) map[m.id] = m;
      });
    }
    return map;
  }, [allMutationsData]);

  const allSacredMarksMap = React.useMemo(() => {
    const map: Record<string, any> = {};
    if (allSacredMarksData && Array.isArray(allSacredMarksData)) {
      (allSacredMarksData as any[]).forEach(m => {
        if (m.id) map[m.id] = m;
      });
    }
    return map;
  }, [allSacredMarksData]);

  // Cria objetos compatíveis com a estrutura esperada
  const mutationBases = React.useMemo(
    () => ({
      data: allMutationsMap,
      loading: false,
    }),
    [allMutationsMap]
  );

  const sacredMarkBases = React.useMemo(
    () => ({
      data: allSacredMarksMap,
      loading: false,
    }),
    [allSacredMarksMap]
  );

  // As bênçãos de Nurgle estão em admin-data/carnival-blessings (documento na coleção admin-data)
  // Usa apenas o allBlessingsMap que já foi carregado do Firestore/IndexedDB via useJsonData
  const blessingBaseMap = React.useMemo(() => {
    return allBlessingsMap;
  }, [allBlessingsMap]);

  // Dados resolvidos do Firestore
  const resolvedFigureBase = resolvedData.figureBase;
  const actualBaseStats = useMemo(() => {
    const stats = resolvedFigureBase?.baseStats || baseStats;
    // Normaliza força/For para strength, sempre define strength (pelo menos 0)
    const normalizedStats = { ...stats };
    if (stats) {
      normalizedStats.strength =
        stats.strength ?? (stats as any).força ?? (stats as any).For ?? 0;
    }

    // Marca de Tepok: Se tiver a marca, substitui armadura base por 14
    const sacredMarks = (figure?.sacredMarks || []) as any[];
    if (hasTepokMark(sacredMarks)) {
      normalizedStats.armour = 14;
    }

    return normalizedStats;
  }, [resolvedFigureBase, baseStats, figure?.sacredMarks]);

  const actualName = useMemo(() => {
    if (resolvedFigureBase?.name) {
      return resolvedFigureBase.name;
    }
    return name;
  }, [resolvedFigureBase, name]);

  const actualRole = useMemo(() => {
    if (resolvedFigureBase?.role) {
      return resolvedFigureBase.role;
    }
    return role;
  }, [resolvedFigureBase, role]);

  const actualLore = useMemo(() => {
    if (resolvedFigureBase?.lore) {
      return resolvedFigureBase.lore;
    }
    return lore;
  }, [resolvedFigureBase, lore]);

  const actualAbilities = useMemo(() => {
    if (resolvedFigureBase?.abilities) {
      return resolvedFigureBase.abilities.map((a: any) => ({
        name: a.name || a,
        description: a.description || "",
      }));
    }
    return abilities;
  }, [resolvedFigureBase, abilities]);

  const actualAvailableSkills = useMemo(() => {
    // Tenta buscar skills de várias fontes: availableSkills, stats.skills, ou baseStats.skills
    const rawSkills =
      resolvedFigureBase?.availableSkills ||
      resolvedFigureBase?.stats?.skills ||
      resolvedFigureBase?.baseStats?.skills ||
      figure?.availableSkills ||
      availableSkills ||
      [];

    // Normaliza nomes de habilidades individuais para categorias
    // Mapeamento: nome individual -> categoria
    const skillNameToCategory: Record<string, string> = {
      Acadêmico: "Acadêmica",
      Agilidade: "Agilidade",
      "Habilidades de Gecko": "Habilidades de Geckos",
      "Habilidade de Gecko": "Habilidades de Geckos",
      Combate: "Combate",
      Atirador: "Atirador",
      Força: "Força",
      Velocidade: "Velocidade",
    };

    // Converte nomes individuais para categorias se necessário
    const baseSkills = rawSkills.map((skill: string) => {
      return skillNameToCategory[skill] || skill;
    });

    // Verifica se tem Corpo Treinado - adiciona "Força" à lista
    const figureSkills = ((figure as any)?.skills || []) as any[];

    // Resolve skills: pode ser array de referências (com base_skill_id) ou IDs diretos
    const resolvedSkills = figureSkills
      .map((skill: any) => {
        // Se já é um objeto com base_skill_id, busca os dados base
        if (skill?.base_skill_id) {
          return skillBases.data?.[skill.base_skill_id] || skill;
        }
        // Se é um ID direto, busca os dados base
        if (typeof skill === "string") {
          return skillBases.data?.[skill];
        }
        // Se já é objeto completo, retorna como está
        return skill;
      })
      .filter(Boolean);

    const hasTrainedBodySkill = hasTrainedBody(resolvedSkills);

    // Adiciona "Força" se tiver Corpo Treinado e ainda não estiver na lista
    if (hasTrainedBodySkill && !baseSkills.includes("Força")) {
      return [...baseSkills, "Força"];
    }

    return baseSkills;
  }, [resolvedFigureBase, figure, availableSkills, skillBases.data]);

  const actualAvailableSpells = useMemo(() => {
    if (resolvedFigureBase?.availableSpells) {
      return resolvedFigureBase.availableSpells;
    }
    return figure?.availableSpells || [];
  }, [resolvedFigureBase, figure]);

  // Afinidades/Tradições: prioriza o objeto base resolvido
  const actualSpellAffinity = useMemo(() => {
    // Busca spellAffinity de várias fontes
    const baseAffinity = resolvedFigureBase?.spellAffinity || spellAffinity;
    const baseAligned0 = baseAffinity?.aligned0 || [];

    // Verifica se tem Mago de Batalha - adiciona "Magia Inferior" ao aligned0
    const figureSkills = ((figure as any)?.skills || []) as any[];

    // Resolve skills: pode ser array de referências (com base_skill_id) ou IDs diretos
    const resolvedSkills = figureSkills
      .map((skill: any) => {
        // Se já é um objeto com base_skill_id, busca os dados base
        if (skill?.base_skill_id) {
          return skillBases.data?.[skill.base_skill_id] || skill;
        }
        // Se é um ID direto, busca os dados base
        if (typeof skill === "string") {
          return skillBases.data?.[skill];
        }
        // Se já é objeto completo, retorna como está
        return skill;
      })
      .filter(Boolean);

    const hasBattleWizardSkill = hasBattleWizard(resolvedSkills);
    const hasArcaneLearningSkill = hasArcaneLearning(resolvedSkills);

    // Adiciona "Magia Inferior" se tiver Mago de Batalha ou Aprendizado Arcano e ainda não estiver na lista
    let aligned0 = [...baseAligned0];
    if (
      (hasBattleWizardSkill || hasArcaneLearningSkill) &&
      !aligned0.includes("Magia Inferior")
    ) {
      aligned0 = [...aligned0, "Magia Inferior"];
    }

    // Adiciona "Magias dos Deuses do Caos" se tiver "Rituais do Caos" e ainda não estiver na lista
    if (
      baseAligned0.includes("Rituais do Caos") &&
      !aligned0.includes("Magias dos Deuses do Caos")
    ) {
      aligned0 = [...aligned0, "Magias dos Deuses do Caos"];
    }

    return {
      aligned0,
      aligned2: baseAffinity?.aligned2 || [],
    };
  }, [resolvedFigureBase, spellAffinity, figure, skillBases.data]);

  const isLoadingBaseData =
    resolvedData.loading ||
    equipmentBases.loading ||
    skillBases.loading ||
    spellBases.loading ||
    mutationBases.loading ||
    sacredMarkBases.loading;

  // Retorna os IDs das habilidades já selecionadas para filtrar nos pickers
  const selectedSacredMarksNames = useMemo(() => {
    if (!figure?.sacredMarks || !Array.isArray(figure.sacredMarks)) return [];
    // Retorna os IDs das marcas que estão realmente selecionadas na figura
    return figure.sacredMarks
      .map((markRef: any) => {
        const markBaseId =
          markRef?.base_sacred_mark_id || markRef?.id || markRef;
        return markBaseId;
      })
      .filter(Boolean);
  }, [figure?.sacredMarks]);

  const selectedMutationsNames = useMemo(() => {
    if (!figure?.mutations || !Array.isArray(figure.mutations)) return [];
    // Retorna os IDs das mutações que estão realmente selecionadas na figura
    return figure.mutations
      .map((mutationRef: any) => {
        const mutationBaseId =
          mutationRef?.base_mutation_id || mutationRef?.id || mutationRef;
        return mutationBaseId;
      })
      .filter(Boolean);
  }, [figure?.mutations]);

  const selectedBlessingsNames = useMemo(() => {
    if (
      !figure?.nurgleBlessings ||
      !blessingBaseMap ||
      !Array.isArray(figure.nurgleBlessings)
    )
      return [];

    // Retorna os IDs das bênçãos que estão realmente selecionadas na figura
    return figure.nurgleBlessings
      .map((blessingRef: any) => {
        const blessingBaseId =
          blessingRef?.base_nurgle_blessing_id ||
          blessingRef?.id ||
          blessingRef;
        return blessingBaseId;
      })
      .filter(Boolean);
  }, [figure?.nurgleBlessings, blessingBaseMap]);

  // Verifica se a figura pode ter marcas sagradas
  // Apenas Heróis de Reptilianos têm acesso
  const canHaveSacredMarks = useMemo(() => {
    // Verifica se é Herói ou Líder (Líder também é um tipo de herói)
    const roleLower = (actualRole || "").toLowerCase();
    const isHero =
      roleLower.includes("herói") ||
      roleLower.includes("heroi") ||
      roleLower.includes("hero") ||
      roleLower.includes("líder") ||
      roleLower.includes("lider");

    if (!isHero) {
      return false;
    }

    // Verifica se a facção é Reptilianos
    const factionIdLower = (factionId || "").toLowerCase();
    const isLizardmen =
      factionIdLower === "lizardmen" ||
      factionIdLower === "reptilianos" ||
      factionIdLower.includes("reptiliano") ||
      factionIdLower.includes("lizardmen");

    return isLizardmen;
  }, [actualRole, factionId]);

  // Verifica se a figura pode ter bênçãos de Nurgle
  // Apenas Apodrecido do Circo do Caos tem acesso
  const canHaveBlessingsOfNurgle = useMemo(() => {
    // Verifica baseFigureId ou nome da figura base
    const baseFigureId = figure?.baseFigureId || "";
    const baseFigureName = resolvedFigureBase?.name || actualName || "";
    const baseFigureIdLower = baseFigureId.toLowerCase();
    const baseFigureNameLower = baseFigureName.toLowerCase();

    // Verifica se é Apodrecido
    const isApodrecido =
      baseFigureIdLower === "apodrecidos" ||
      baseFigureIdLower === "apodrecido" ||
      baseFigureNameLower.includes("apodrecido");

    if (!isApodrecido) {
      return false;
    }

    // Verifica se a facção é Circo do Caos
    const factionIdLower = (factionId || "").toLowerCase();
    const isCarnivalOfChaos =
      factionIdLower === "carnival-of-chaos" ||
      factionIdLower === "circo-do-caos" ||
      factionIdLower.includes("circo") ||
      factionIdLower.includes("carnival");

    return isCarnivalOfChaos;
  }, [figure?.baseFigureId, resolvedFigureBase?.name, actualName, factionId]);

  // Verifica se a figura pode ter mutações
  // Mutante e Possuído sempre têm acesso
  // Heróis de Saqueadores Homem-Fera precisam da habilidade "Linhagem Corrompida"
  const canHaveMutations = useMemo(() => {
    // Verifica baseFigureId ou nome da figura base
    const baseFigureId = figure?.baseFigureId || "";
    const baseFigureName = resolvedFigureBase?.name || actualName || "";
    const baseFigureIdLower = baseFigureId.toLowerCase();
    const baseFigureNameLower = baseFigureName.toLowerCase();

    // Mutante e Possuído sempre têm acesso a mutações
    const isMutante =
      baseFigureIdLower === "mutante" ||
      baseFigureNameLower.includes("mutante");
    const isPossuido =
      baseFigureIdLower === "possuido" ||
      baseFigureIdLower === "possuído" ||
      baseFigureNameLower.includes("possuído") ||
      baseFigureNameLower.includes("possuido");

    if (isMutante || isPossuido) {
      return true;
    }

    // Para Heróis ou Líderes de Saqueadores Homem-Fera, verifica se tem a habilidade Linhagem Corrompida
    const isHeroOrLeader =
      actualRole &&
      (actualRole.toLowerCase().includes("herói") ||
        actualRole.toLowerCase().includes("heroi") ||
        actualRole.toLowerCase().includes("hero") ||
        actualRole.toLowerCase().includes("líder") ||
        actualRole.toLowerCase().includes("lider") ||
        actualRole.toLowerCase().includes("leader"));

    if (!isHeroOrLeader) {
      return false;
    }

    // Verifica se a facção é Saqueadores Homem-Fera
    const factionIdLower = (factionId || "").toLowerCase();
    const isBeastmenRaiders =
      factionIdLower === "beastman-raiders" ||
      factionIdLower === "beastmen-raiders" ||
      factionIdLower === "saqueadores-homem-fera" ||
      factionIdLower.includes("homem-fera") ||
      factionIdLower.includes("beastman");

    if (!isBeastmenRaiders) {
      return false;
    }

    // Verifica se tem a habilidade Linhagem Corrompida nas skills aprendidas
    if (!figure?.skills || !Array.isArray(figure.skills)) {
      return false;
    }

    const learnedSkills = figure.skills;
    const hasLinhagemCorrompida = learnedSkills.some((skill: any) => {
      const skillBaseId = skill?.base_skill_id || skill?.id || "";
      return skillBaseId.toLowerCase() === "linhagem-corrompida";
    });

    return hasLinhagemCorrompida;
  }, [
    figure?.baseFigureId,
    resolvedFigureBase?.name,
    actualName,
    actualRole,
    figure?.skills,
    factionId,
  ]);

  // Converte equiped em objetos resolvidos (base + modifier) usando dados resolvidos
  const equippedItemsArray = useMemo(() => {
    const raw = (figure as any)?.equiped as any[] | undefined;
    // NÃO retorna vazio aqui - mesmo sem equipamentos, precisamos adicionar armas virtuais
    const rawArray = Array.isArray(raw) ? raw : [];

    // Combina todos os catálogos de equipamentos estáticos para fallback
    const allEquipmentCatalogs: any[] = [
      ...(Array.isArray(meleeDb) ? meleeDb : []),
      ...(Array.isArray(rangedDb) ? rangedDb : []),
      ...(Array.isArray(firearmsDb) ? firearmsDb : []),
      ...(Array.isArray(armorDb) ? armorDb : []),
      ...(Array.isArray(accessoriesDb) ? accessoriesDb : []),
      ...(Array.isArray(remediesPoisonsDb) ? remediesPoisonsDb : []),
    ];

    // Combina todos os catálogos de modificadores estáticos para fallback
    const allModifierCatalogs: any[] = [
      ...(Array.isArray(meleeMods) ? meleeMods : []),
      ...(Array.isArray(rangedMods) ? rangedMods : []),
      ...(Array.isArray(firearmsMods) ? firearmsMods : []),
    ];

    // Mapeia todos os itens, tentando resolver base e modifier
    const resolvedItems = rawArray.map(item => {
      let base = item?.base_equipment_id
        ? equipmentBases.data[item.base_equipment_id]
        : undefined;

      // Fallback: busca nos catálogos estáticos se não encontrou no Firestore
      if (!base && item?.base_equipment_id && !equipmentBases.loading) {
        base = allEquipmentCatalogs.find(
          (e: any) =>
            e.id === item.base_equipment_id ||
            e.templateId === item.base_equipment_id
        );
        if (base) {
          // Equipamento encontrado em catálogo estático (fallback)
        }
      }

      let mod = item?.base_modifier_id
        ? modifierBases.data[item.base_modifier_id]
        : undefined;

      // Fallback: busca nos catálogos estáticos se não encontrou no Firestore
      if (!mod && item?.base_modifier_id && !modifierBases.loading) {
        mod = allModifierCatalogs.find(
          (m: any) => m.id === item.base_modifier_id
        );
        if (mod) {
          // Modificador encontrado em catálogo estático (fallback)
        }
      }

      // Mantém o item mesmo sem base - será exibido como "Carregando..." se necessário
      // IMPORTANTE: preserva todos os flags do item original (equippedAsArmor, secondaryHand, etc.)
      return {
        ...item,
        base,
        modifier: mod,
        // Garante que os flags são preservados
        equippedAsArmor: item?.equippedAsArmor,
        mainHandWeapon: item?.mainHandWeapon,
        offHandWeapon: item?.offHandWeapon,
        twoHandedWeapon: item?.twoHandedWeapon,
        countAsLight: item?.countAsLight, // Preserva countAsLight para casos especiais como Bertha
      };
    });

    return resolvedItems;
    // Removido o filtro - deixa os itens aparecerem mesmo sem base resolvida
    // O EquipmentManager vai lidar com a renderização apropriada
  }, [
    figure,
    equipmentBases.data,
    equipmentBases.loading,
    modifierBases.data,
    modifierBases.loading,
    mutationBases.data,
    mutationBases.loading,
    blessingBaseMap,
    sacredMarkBases.data,
    sacredMarkBases.loading,
    meleeDb,
    rangedDb,
    firearmsDb,
    armorDb,
    accessoriesDb,
    remediesPoisonsDb,
    meleeMods,
    rangedMods,
    firearmsMods,
  ]);

  // Busca equipamentos disponíveis para compra pelo ID
  const purchasableEquipment = useMemo(() => {
    const equipmentList: Array<{
      id: string;
      name: string;
      cost: string;
      category: string;
      availableModifiers?: Array<{
        id: string;
        name: string;
        multiplier: number;
        modifiedCost: string;
      }>;
    }> = [];

    // Busca equipamentos do resolvedFigureBase
    const figureEquipment =
      resolvedFigureBase?.equipment ||
      resolvedFigureBase?.baseStats?.equipment ||
      equipment;

    if (!figureEquipment) return equipmentList;

    // Busca modifiers disponíveis
    const modifiers = (figureEquipment as any)?.modifiers || [];

    // Mapeia tipo de modifier para categoria de equipamento
    const modifierTypeToCategory: Record<string, string> = {
      "Modificador Corpo a Corpo": "hand-to-hand",
      "Modificador A Distância": "ranged",
      "Modificador Armadura": "armor",
    };

    // Processa cada categoria
    const categories = [
      { key: "hand-to-hand", label: "Corpo a Corpo" },
      { key: "ranged", label: "A Distância" },
      { key: "armor", label: "Armaduras" },
      { key: "miscellaneous", label: "Acessórios" },
    ];

    categories.forEach(({ key, label }) => {
      const items = (figureEquipment as any)?.[key];
      if (Array.isArray(items)) {
        items.forEach((item: any) => {
          if (item?.id && item?.name && item?.cost) {
            // Verifica modifiers aplicáveis a esta categoria
            const availableModifiers: Array<{
              id: string;
              name: string;
              multiplier: number;
              modifiedCost: string;
            }> = [];

            modifiers.forEach((modifier: any) => {
              const modifierType = modifier?.type || "";
              const modifierCategory = modifierTypeToCategory[modifierType];

              if (modifierCategory === key && modifier?.multiplier) {
                // Busca o ID do modifier nos catálogos se não tiver id
                let modifierId = modifier.id;
                if (!modifierId && modifier.name) {
                  // Busca pelo nome nos catálogos de modifiers
                  const allMods: any[] = [
                    ...(Array.isArray(meleeMods) ? meleeMods : []),
                    ...(Array.isArray(rangedMods) ? rangedMods : []),
                    ...(Array.isArray(firearmsMods) ? firearmsMods : []),
                  ];
                  const foundMod = allMods.find(
                    (m: any) =>
                      String(m?.name || "")
                        .toLowerCase()
                        .trim() ===
                      String(modifier.name || "")
                        .toLowerCase()
                        .trim()
                  );
                  if (foundMod?.id) {
                    modifierId = foundMod.id;
                  }
                }

                // Calcula o custo com o multiplicador
                const parseCost = (v: any): number => {
                  const s = v == null ? "" : String(v);
                  // Pega todos os números e usa o maior (para casos como "primeira grátis/2 coroas")
                  const matches = s.match(/(\d+(?:\.\d+)?)/g);
                  if (!matches || matches.length === 0) return 0;
                  const numbers = matches.map(n => parseFloat(n));
                  return Math.max(...numbers);
                };

                const baseCost = parseCost(item.cost);
                const modifiedCost = baseCost * (modifier.multiplier || 1);
                const costString = `${modifiedCost} coroas`;

                // Só adiciona se tiver ID válido
                if (modifierId) {
                  availableModifiers.push({
                    id: modifierId,
                    name: modifier.name,
                    multiplier: modifier.multiplier,
                    modifiedCost: costString,
                  });
                }
              }
            });

            // Adiciona o item com modifiers disponíveis (se houver)
            equipmentList.push({
              id: item.id,
              name: item.name,
              cost: item.cost,
              category: label,
              availableModifiers:
                availableModifiers.length > 0 ? availableModifiers : undefined,
            });
          }
        });
      }
    });

    return equipmentList;
  }, [
    resolvedFigureBase?.equipment,
    resolvedFigureBase?.baseStats?.equipment,
    equipment,
    meleeMods,
    rangedMods,
    firearmsMods,
  ]);

  // Calcula ataques naturais: vêm do resolvedFigureBase E de mutações/bênçãos/marcas sagradas
  const naturalAttacks = useMemo(() => {
    const attacks: NaturalAttack[] = [];

    // Carrega ataques naturais da figura base
    const baseAttacks = resolvedFigureBase?.naturalAttacks || [];
    if (Array.isArray(baseAttacks)) {
      attacks.push(...baseAttacks);
    }

    // Pega as referências de mutações, bênçãos e marcas sagradas
    const mutations = ((figure as any)?.mutations || []) as any[];
    const nurgleBlessings = ((figure as any)?.nurgleBlessings || []) as any[];
    const sacredMarks = ((figure as any)?.sacredMarks || []) as any[];

    // Helper para verificar se uma mutação existe pelo ID base
    const hasMutationById = (mutationId: string): boolean => {
      return mutations.some((mutationRef: any) => {
        const mutationBaseId =
          mutationRef?.base_mutation_id || mutationRef?.id || mutationRef;
        return mutationBaseId === mutationId;
      });
    };

    // Helper para verificar se uma bênção existe pelo ID base
    const hasBlessingById = (blessingId: string): boolean => {
      return nurgleBlessings.some((blessingRef: any) => {
        const blessingBaseId =
          blessingRef?.base_nurgle_blessing_id ||
          blessingRef?.id ||
          blessingRef;
        return blessingBaseId === blessingId;
      });
    };

    // Helper para verificar se uma marca sagrada existe pelo ID base
    const hasSacredMarkById = (markId: string): boolean => {
      return sacredMarks.some((markRef: any) => {
        const markBaseId =
          markRef?.base_sacred_mark_id || markRef?.id || markRef;
        return markBaseId === markId;
      });
    };

    // Garra Colossal: adiciona ataque natural "Garra Colossal" com dano +2
    if (hasMutationById("garra-colossal")) {
      attacks.push({
        name: "Garra Colossal",
        damage: "+2",
        type: "Ataque Corpo a Corpo",
      });
    }

    // Cauda de escorpião: adiciona ataque natural "Cauda de Escorpião" com dano 0 e propriedade Tóxica
    if (hasMutationById("cauda-de-escorpiao")) {
      attacks.push({
        name: "Cauda de Escorpião",
        damage: "0",
        type: "Ataque Corpo a Corpo",
        specialRules: [
          {
            label: "Tóxica",
            value: "Uma arma com essa característica causa dano Venenoso.",
          },
        ],
      });
    }

    // Torrente de Sujeira: adiciona ataque natural a distância "Torrente de Sujeira" com 15cm de alcance e propriedade Tóxica
    if (hasBlessingById("torrente-de-sujeira")) {
      attacks.push({
        name: "Torrente de Sujeira",
        damage: "0",
        type: "Ataque a Distância",
        range: "15cm",
        specialRules: [
          {
            label: "Tóxica",
            value: "Uma arma com essa característica causa dano Venenoso.",
          },
        ],
      });
    }

    // Marca de Chotec: adiciona ataque natural "Mandíbulas Poderosas" com dano +2
    if (hasSacredMarkById("marca-de-chotec")) {
      attacks.push({
        name: "Mandíbulas Poderosas",
        damage: "+2",
        type: "Ataque Corpo a Corpo",
      });
    }

    // Marca de Sotek: adiciona ataque natural "Mordida Venenosa" com dano -1 e propriedade Tóxica
    if (hasSacredMarkById("marca-de-sotek")) {
      attacks.push({
        name: "Mordida Venenosa",
        damage: "-1",
        type: "Ataque Corpo a Corpo",
        specialRules: [
          {
            label: "Tóxica",
            value: "Uma arma com essa característica causa dano Venenoso.",
          },
        ],
      });
    }

    // Arte da Morte Silenciosa: adiciona ataque natural "Arte do Punho Mortal" com dano 0 e propriedade Letal
    const figureSkills = ((figure as any)?.skills || []) as any[];
    const hasSilentDeathSkill = figureSkills.some((skill: any) => {
      const skillBaseId = skill?.base_skill_id || skill?.id || "";
      const name = String(skill?.name || "").toLowerCase();
      return (
        skillBaseId === "arte-da-morte-silenciosa" ||
        name.includes("arte da morte silenciosa")
      );
    });

    if (hasSilentDeathSkill) {
      attacks.push({
        name: "Arte do Punho Mortal",
        damage: "0",
        type: "Ataque Corpo a Corpo",
        specialRules: [
          {
            label: "Letal",
            value: "Causa um dano crítico em uma rolagem natural de 19 a 20.",
          },
        ],
      });
    }

    return attacks;
  }, [
    resolvedFigureBase?.naturalAttacks,
    figure?.mutations,
    figure?.nurgleBlessings,
    figure?.sacredMarks,
    figure?.skills, // Adiciona skills como dependência
  ]);

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

  // Estado para modal de ataque natural
  const [selectedNaturalAttack, setSelectedNaturalAttack] =
    useState<NaturalAttack | null>(null);

  // Função para parsear valores numéricos de strings
  const parseNumeric = (v: any): number => {
    if (typeof v === "number") return v;
    const s = v == null ? "" : String(v);
    const m = s.match(/-?\d+/);
    return m ? parseInt(m[0], 10) : 0;
  };

  // Calcula modificadores de equipamentos (armorBonus, movePenalty, etc) - separado para evitar hooks aninhados
  const equipmentModifiers = useMemo(() => {
    // Usa equippedItemsArray que já tem o base resolvido (mesmo padrão do EquipmentManager)
    const allEquipped = equippedItemsArray || [];
    const modifiers = {
      move: 0,
      fight: 0,
      shoot: 0,
      armour: 0,
      Vontade: 0,
      strength: 0,
      health: 0,
    };

    for (const item of allEquipped) {
      // Usa o base já resolvido (mesmo padrão do EquipmentManager)
      const base = (item as any)?.base;
      if (!base) continue;

      // Armor bonus
      const armorBonus = parseNumeric(base.armorBonus || base.armourBonus || 0);
      modifiers.armour += armorBonus;

      const movePenalty = parseNumeric(
        base.movePenalty || base.penalidadeMovimento || 0
      );
      modifiers.move += movePenalty; // movePenalty já é negativo no JSON
    }

    // Removido: bônus de +1 ímpeto por lutar com Garra Colossal + arma na primária

    return modifiers;
  }, [
    equippedItemsArray,
    figure?.mutations,
    figure?.equiped, // Inclui diretamente para garantir atualização
    equipmentBases.data,
    equipmentBases.loading, // Inclui loading para recalcular quando dados carregarem
    // Serializa as chaves do equipmentBases.data para detectar mudanças no conteúdo
    Object.keys(equipmentBases.data || {}).join(","),
  ]);

  // Calcular modificadores - TODOS os modificadores são calculados apenas no render
  const calculatedModifiers = useMemo(() => {
    // Calcula modificadores de advancements e injuries diretamente dos arrays
    const advancements = (figure?.advancements || []) as any[];
    const injuries = (figure?.injuries || []) as any[];
    // Skills aprendidas (array de objetos com id + base_skill_id)
    const skills = (figure?.skills || []) as any[];
    const mutations = (figure?.mutations || []) as any[];
    const sacredMarks = (figure?.sacredMarks || []) as any[];
    const nurgleBlessings = (figure?.nurgleBlessings || []) as any[];

    const advancementModifiers = calculateAdvancementModifiers(advancements);
    const injuryModifiers = calculateInjuryModifiers(injuries);
    const skillsModifiers = calculateSkillModifiers(skills);
    const mutationsModifiers = calculateMutationModifiers(
      mutations,
      mutationBases.data
    );
    const sacredMarksModifiers = calculateSacredMarkModifiers(
      sacredMarks,
      sacredMarkBases.data
    );
    const nurgleBlessingsModifiers = calculateNurgleBlessingModifiers(
      nurgleBlessings,
      blessingBaseMap
    );

    // Misc modifiers vêm do campo miscModifiers (ainda existe para edição manual)
    const miscModifiers = (figure?.miscModifiers as any) || {
      move: 0,
      fight: 0,
      shoot: 0,
      armour: 0,
      Vontade: 0,
      strength: 0,
      health: 0,
    };

    return {
      advancement: advancementModifiers,
      injury: injuryModifiers,
      skills: skillsModifiers,
      equipment: equipmentModifiers,
      misc: miscModifiers,
      mutations: mutationsModifiers,
      sacredMarks: sacredMarksModifiers,
      nurgleBlessings: nurgleBlessingsModifiers,
    };
  }, [
    figure?.advancements,
    figure?.injuries,
    figure?.skills,
    figure?.mutations,
    figure?.sacredMarks,
    figure?.nurgleBlessings,
    figure?.miscModifiers,
    mutationBases.data,
    sacredMarkBases.data,
    blessingBaseMap,
    equipmentModifiers, // Usa o useMemo calculado acima
  ]);

  const getTotal = (
    breakdown: AttributeBreakdown,
    statKey: string = ""
  ): number => {
    const baseTotal =
      breakdown.base +
      breakdown.advancement +
      breakdown.injury +
      breakdown.misc;

    // Para Ímpeto, calcula bônus de lutar com duas armas (arma leve/pistola na secundária + arma na primária)
    if (statKey === "fight") {
      let twoWeaponsBonus = 0;

      // Verifica se tem a skill "Arte da morte silenciosa" (precisa verificar independente de ter equipamentos)
      const figureSkills = ((figure as any)?.skills || []) as any[];
      const hasSilentDeathSkill = figureSkills.some((skill: any) => {
        const skillBaseId = skill?.base_skill_id || skill?.id || "";
        const name = String(skill?.name || "").toLowerCase();
        return (
          skillBaseId === "arte-da-morte-silenciosa" ||
          name.includes("arte da morte silenciosa")
        );
      });

      // Verifica se NÃO tem NADA equipado nas mãos (nem primária, nem secundária, nem duas mãos)
      const hasNothingEquippedInHands = !equippedItemsArray.some(
        (equip: any) =>
          equip?.mainHandWeapon ||
          equip?.offHandWeapon ||
          equip?.twoHandedWeapon
      );

      // Se tem a skill "Arte da Morte Silenciosa" E NÃO tem NADA equipado nas mãos, ganha +1 Ímpeto
      if (hasSilentDeathSkill && hasNothingEquippedInHands) {
        twoWeaponsBonus = 1;
      } else if (equippedItemsArray.length > 0) {
        // Palavras-chave para identificar armas leves/pistolas (escalável)
        const lightWeaponKeywords = ["Leve", "Pistola"];

        // Verifica se tem arma na mão primária
        const primaryWeapon = equippedItemsArray.find((equip: any) =>
          Boolean(equip?.mainHandWeapon || equip?.twoHandedWeapon)
        );

        // Verifica se tem arma leve/pistola na mão secundária
        // Também verifica o campo countAsLight: true (para casos especiais como Bertha)
        const secondaryLightWeapon = equippedItemsArray.find((equip: any) => {
          if (!Boolean(equip?.offHandWeapon)) return false;

          // Verifica primeiro o campo countAsLight
          if (equip?.countAsLight === true) return true;

          const equipBase = equip?.base;
          const specialRules = equipBase?.specialRules || [];
          const rulesText = JSON.stringify(specialRules).toLowerCase();

          return lightWeaponKeywords.some(keyword =>
            rulesText.includes(keyword.toLowerCase())
          );
        });

        // Caso padrão: Se tem arma na primária E arma leve/pistola na secundária, ganha +1 Ímpeto
        if (primaryWeapon && secondaryLightWeapon) {
          twoWeaponsBonus = 1;
        }
      }

      return baseTotal + twoWeaponsBonus;
    }

    // Para armadura, calcula bônus de equipamentos dinamicamente
    if (statKey === "armour") {
      let equipmentArmorBonus = 0;

      if (equippedItemsArray.length > 0) {
        for (const equip of equippedItemsArray) {
          const equipBase = equip?.base;
          const cat = String(
            equipBase?.type ||
              equipBase?.category ||
              equip?.type ||
              equip?.category ||
              ""
          ).toLowerCase();
          const isShield =
            cat === "escudo" ||
            equipBase?.type === "Escudo" ||
            equip?.type === "Escudo";
          const isArmor =
            cat === "armadura" ||
            equipBase?.type === "Armadura" ||
            equip?.type === "Armadura";
          // Verifica os flags diretamente do item original (equip) que vem de figure.equiped
          const isEquippedAsArmor = Boolean((equip as any)?.equippedAsArmor);
          const isInSecondaryHand = Boolean((equip as any)?.offHandWeapon);

          // SÓ adiciona bônus de armaduras que estão equipadas (com flag equippedAsArmor: true)
          if (isArmor && isEquippedAsArmor) {
            const bonus = parseNumeric(
              equipBase?.armorBonus ||
                equipBase?.armourBonus ||
                equipBase?.armadura ||
                equipBase?.bonusArmadura ||
                equip?.armorBonus ||
                equip?.armourBonus ||
                equip?.armadura ||
                equip?.bonusArmadura ||
                0
            );
            equipmentArmorBonus += bonus;
          }
          // SÓ adiciona bônus de escudos que estão na mão secundária (com flag secondaryHand: true)
          else if (isShield && isInSecondaryHand) {
            const bonus = parseNumeric(
              equipBase?.armorBonus ||
                equipBase?.armourBonus ||
                equipBase?.armadura ||
                equipBase?.bonusArmadura ||
                equip?.armorBonus ||
                equip?.armourBonus ||
                equip?.armadura ||
                equip?.bonusArmadura ||
                0
            );
            equipmentArmorBonus += bonus;
          }
          // Para outros equipamentos (elmos, etc.) que NÃO são armaduras ou escudos, adiciona sempre
          else if (!isArmor && !isShield) {
            const bonus = parseNumeric(
              equipBase?.armorBonus ||
                equipBase?.armourBonus ||
                equipBase?.armadura ||
                equipBase?.bonusArmadura ||
                equip?.armorBonus ||
                equip?.armourBonus ||
                equip?.armadura ||
                equip?.bonusArmadura ||
                0
            );
            if (bonus !== 0) {
              equipmentArmorBonus += bonus;
            }
          }
        }
      }

      const finalTotal = baseTotal + equipmentArmorBonus;
      // Limita a 17
      return Math.min(finalTotal, 17);
    }

    // Para movimento, calcula penalidade de equipamentos dinamicamente
    if (statKey === "move") {
      let equipmentMovementPenalty = 0;

      if (equippedItemsArray.length > 0) {
        for (const equip of equippedItemsArray) {
          const equipBase = equip?.base;
          const cat = String(
            equipBase?.type ||
              equipBase?.category ||
              equip?.type ||
              equip?.category ||
              ""
          ).toLowerCase();
          const isShield =
            cat === "escudo" ||
            equipBase?.type === "Escudo" ||
            equip?.type === "Escudo";
          const isArmor =
            cat === "armadura" ||
            equipBase?.type === "Armadura" ||
            equip?.type === "Armadura";
          // Verifica os flags diretamente do item original (equip) que vem de figure.equiped
          const isEquippedAsArmor = Boolean((equip as any)?.equippedAsArmor);
          const isInSecondaryHand = Boolean((equip as any)?.offHandWeapon);

          // SÓ adiciona penalidade de armaduras que estão equipadas (com flag equippedAsArmor: true)
          if (isArmor && isEquippedAsArmor) {
            const penalty = parseNumeric(
              equipBase?.movePenalty || equip?.movePenalty || 0
            );
            equipmentMovementPenalty += penalty;
          }
          // SÓ adiciona penalidade de escudos que estão na mão secundária (com flag secondaryHand: true)
          else if (isShield && isInSecondaryHand) {
            const penalty = parseNumeric(
              equipBase?.movePenalty || equip?.movePenalty || 0
            );
            equipmentMovementPenalty += penalty;
          }
          // Para outros equipamentos que NÃO são armaduras ou escudos, adiciona sempre
          else if (!isArmor && !isShield) {
            const penalty = parseNumeric(
              equipBase?.movePenalty || equip?.movePenalty || 0
            );
            if (penalty !== 0) {
              equipmentMovementPenalty += penalty;
            }
          }
        }
      }

      // Verifica se a figura tem a regra especial "Devagar e Sempre" ou "Crueldade Paciente"
      const specialRules =
        resolvedFigureBase?.specialRules || figure?.extraSpecialRules || [];
      const hasIgnoreMovementPenalty = specialRules.some(
        (rule: any) =>
          rule?.name === "Devagar e Sempre" ||
          rule?.name === "Crueldade Paciente"
      );

      // Apenas aplica penalidade se não tiver a regra especial
      if (!hasIgnoreMovementPenalty) {
        const finalTotal = baseTotal + equipmentMovementPenalty;
        // Garante que não fique negativo
        return Math.max(finalTotal, 0);
      }
    }

    return baseTotal;
  };

  // Calcular opções de avanços baseadas no role da figura
  const advancementOptions = useMemo(() => {
    const roleStr = (actualRole || "").toString().toLowerCase();
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
  }, [actualRole]);

  // Função para escolher opção no modal
  const chooseOption = useCallback(
    (option: string) => {
      if (onAddAdvancement) {
        onAddAdvancement(option);
      }

      // Remove o roll atual da fila
      setPendingRolls(prevRolls => {
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
      const roleStr = (actualRole || "").toString().toLowerCase();
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
          entry => d20Roll >= entry.roll[0] && d20Roll <= entry.roll[1]
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
        setPendingRolls(prevRolls => [...prevRolls, ...newRolls]);
        setRolledOptions(newRolls[0]);
        setRollModalOpen(true);
      }
    },
    [actualRole]
  );

  // Função para rolar sobrevivência
  const rollSurvival = useCallback(() => {
    const roleStr = (actualRole || "").toString().toLowerCase();
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
      const result = heroSurvivalTable.find(entry => entry.roll === d20Roll);
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
  }, [actualRole, onAddInjury, onAddSpecialRule]);

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
      const matchingWords = inputWords.filter(word =>
        mappingWords.some(
          mappingWord =>
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
    const raw = (actualBaseStats?.cost ?? baseStats?.cost) as
      | string
      | number
      | undefined;
    if (raw === undefined || raw === null) return "";
    const str = String(raw).trim();
    if (str === "-" || str === "—") return "";
    return str;
  })();

  const figStatOrder: Array<keyof UnitStats> = [
    "move",
    "fight",
    "shoot",
    "armour",
    "Vontade",
    "health",
    "strength",
  ];

  // Helper para verificar se um valor é "-" (dash)
  const isDashValue = (v: any): boolean => {
    if (v === "-" || v === "—") return true;
    const str = String(v || "").trim();
    return str === "-" || str === "—";
  };

  const toFigureBreakdown = (
    stat: keyof UnitStats
  ): AttributeBreakdown | string => {
    // Para strength, verifica também força e For
    let baseValue: any;
    if (stat === "strength") {
      baseValue =
        (actualBaseStats as any)?.strength ??
        (actualBaseStats as any)?.força ??
        (actualBaseStats as any)?.For ??
        0;
    } else {
      baseValue = (actualBaseStats as any)?.[stat];
    }

    // Marca de Tepok: Se for armour e tiver a marca, substitui base por 14
    if (stat === "armour") {
      const sacredMarks = (figure?.sacredMarks || []) as any[];
      if (hasTepokMark(sacredMarks)) {
        baseValue = 14;
      }
    }

    // Se o valor base for "-", retorna "-" sem calcular
    if (isDashValue(baseValue)) {
      return "-";
    }

    // Converte base para número
    const b = Number(baseValue || 0);

    // Usa os modificadores calculados dinamicamente
    const adv =
      calculatedModifiers.advancement[
        stat as keyof typeof calculatedModifiers.advancement
      ] || 0;
    const inj =
      calculatedModifiers.injury[
        stat as keyof typeof calculatedModifiers.injury
      ] || 0;
    const misc = Number(
      calculatedModifiers.misc[stat as keyof typeof calculatedModifiers.misc] ||
        0
    );

    // Inclui modificadores de skills, mutations, sacredMarks, nurgleBlessings e equipment no misc
    // (para aparecer como bônus no breakdown)
    const skillsMod = Number(
      calculatedModifiers.skills[
        stat as keyof typeof calculatedModifiers.skills
      ] || 0
    );
    const mutationsMod = Number(
      calculatedModifiers.mutations[
        stat as keyof typeof calculatedModifiers.mutations
      ] || 0
    );
    const sacredMarksMod = Number(
      calculatedModifiers.sacredMarks[
        stat as keyof typeof calculatedModifiers.sacredMarks
      ] || 0
    );
    const nurgleBlessingsMod = Number(
      calculatedModifiers.nurgleBlessings[
        stat as keyof typeof calculatedModifiers.nurgleBlessings
      ] || 0
    );
    const equipmentMod = Number(
      calculatedModifiers.equipment[
        stat as keyof typeof calculatedModifiers.equipment
      ] || 0
    );

    // Soma todos os modificadores extras no misc para exibição
    const totalMisc =
      misc +
      skillsMod +
      mutationsMod +
      sacredMarksMod +
      nurgleBlessingsMod +
      equipmentMod;

    // Equipment será calculado dinamicamente na renderização, não aqui
    return { base: b, advancement: adv, injury: inj, misc: totalMisc };
  };

  const isInactive = false; // Nova estrutura não tem campo inactive

  // Estado para modal de edição de atributos
  const [editingStat, setEditingStat] = useState<keyof UnitStats | null>(null);
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

  const openEditModal = (stat: keyof UnitStats) => {
    const breakdown = toFigureBreakdown(stat);
    // Se for "-", não permite edição (não abre modal)
    if (breakdown === "-") {
      return;
    }
    const b = breakdown as AttributeBreakdown;
    // Pega o misc atual do figure (modificadores manuais)
    const currentMisc = Number(
      calculatedModifiers.misc[stat as keyof typeof calculatedModifiers.misc] ||
        0
    );
    setTempModifiers({
      advancement: b.advancement || 0,
      injury: b.injury || 0,
      misc: currentMisc, // Usa o misc atual do figure
    });
    setEditingStat(stat);
  };

  const closeEditModal = () => {
    if (editingStat && onChangeFigureStatModifier) {
      // Salva apenas o misc (modificador manual), pois os outros são calculados automaticamente
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
          <div className="flex flex-col items-center gap-2 flex-1 mt-4">
            <h3
              className="text-2xl font-bold text-center"
              style={{ fontFamily: '"Cinzel", serif', color: "#8fbc8f" }}
            >
              {/* Lendas não têm narrative name - sempre mostra só o name */}
              {(() => {
                const displayName = actualName;
                const displayRole = actualRole || role;
                const displayNarrativeName = figure?.campaignName;

                if (displayRole === "Lenda") {
                  return displayName;
                }
                if (displayNarrativeName) {
                  return `${displayNarrativeName}, ${displayName}`;
                }
                return displayName;
              })()}
            </h3>
            {/* Badge com a role da figura */}
            {actualRole && (
              <span className="bg-gray-700 text-white px-3 py-1 rounded text-sm font-semibold">
                {actualRole}
              </span>
            )}
          </div>
          <button
            className="text-white text-2xl transition-transform"
            style={{
              transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)",
            }}
          >
            ▼
          </button>
        </div>
        {(role === "Herói" ||
          role === "Líder" ||
          quantity ||
          costDisplay ||
          baseStats.upkeep ||
          actualBaseStats?.upkeep) && (
          <div className="flex justify-center items-center gap-3 mt-3 flex-wrap px-2">
            {role && (role === "Herói" || role === "Líder") && (
              <span className="bg-gray-600 text-white px-2 py-1 rounded text-sm">
                {role}
              </span>
            )}
            {quantity && quantity !== "0" && String(quantity).trim() !== "" && (
              <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">
                {quantity}
              </span>
            )}
            {costDisplay && (
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                {costDisplay}
              </span>
            )}
            {(actualBaseStats?.upkeep || baseStats.upkeep) && (
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                Manutenção: {actualBaseStats?.upkeep || baseStats.upkeep}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Conteúdo colapsável */}
      {!isCollapsed && (
        <div className="px-6 pb-6">
          {/* Indicador de carregamento quando buscando dados base */}
          {isLoadingBaseData && (
            <div className="mb-4 p-4 bg-blue-900/20 border border-blue-500/40 rounded text-center">
              <p className="text-blue-300">Carregando dados da figura...</p>
            </div>
          )}
          {/* Campo de nome narrativo */}
          {(() => {
            const displayRole = actualRole || role;
            const displayNarrativeName = figure?.campaignName || "";

            if (displayRole === "Lenda") return null;

            return (
              <div className="mt-3 flex justify-center">
                <input
                  type="text"
                  placeholder="Nome narrativo"
                  className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-1 text-white text-sm w-full max-w-sm text-center"
                  value={displayNarrativeName}
                  onChange={e =>
                    onChangeNarrativeName &&
                    onChangeNarrativeName(e.target.value)
                  }
                />
              </div>
            );
          })()}

          {/* Campo de notas */}
          {(() => {
            const displayRole = actualRole || role;
            const displayNotes = figure?.notes || "";

            if (displayRole === "Lenda") return null;

            return (
              <div className="mt-3 flex justify-center">
                <textarea
                  placeholder="Notas..."
                  className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white text-sm w-full max-w-sm resize-y min-h-[80px]"
                  value={displayNotes}
                  onChange={e => onChangeNotes && onChangeNotes(e.target.value)}
                  rows={3}
                />
              </div>
            );
          })()}

          {/* Avanços (Lendas não ganham avanços) */}
          {(() => {
            const displayRole = actualRole || role;
            const roleStr = (displayRole || "").toString().toLowerCase();
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
                          onChange={e =>
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
                          onAdd={a => onAddAdvancement && onAddAdvancement(a)}
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
            const roleStr = (actualRole || role || "").toString().toLowerCase();
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
            const roleStr = (actualRole || role || "").toString().toLowerCase();
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
                      onAdd={i => onAddInjury && onAddInjury(i)}
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
            {(actualLore || actualBaseStats?.lore) && (
              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed italic">
                  {actualLore || actualBaseStats?.lore}
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
              const displayRole = actualRole || role;
              const roleStr = (displayRole || "").toString().toLowerCase();
              const figureXp = figure?.xp ?? 0;

              if (roleStr.includes("lenda") || (figure as any)?.noXP)
                return null;
              return (
                <div className="mb-6">
                  {(() => {
                    const isHero =
                      roleStr.includes("líder") ||
                      roleStr.includes("lider") ||
                      roleStr.includes("her");
                    return isHero ? (
                      <ExperienceTrackerHero
                        xp={figureXp}
                        onChange={v => onChangeFigureXp && onChangeFigureXp(v)}
                      />
                    ) : (
                      <ExperienceTrackerSoldier
                        xp={figureXp}
                        onChange={v => onChangeFigureXp && onChangeFigureXp(v)}
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
                {figStatOrder.map(skey => {
                  const breakdown = toFigureBreakdown(skey);

                  // Se o breakdown for "-", renderiza como "-" sem permitir edição
                  if (breakdown === "-") {
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
                            (Base: -)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">-</span>
                        </div>
                      </div>
                    );
                  }

                  // Se não for "-", calcula normalmente
                  const b = breakdown as AttributeBreakdown;
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
            {(() => {
              const displayRole = actualRole || role;
              return (
                displayRole !== "Soldado" &&
                (displayRole !== "Lenda" ||
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
                      {(() => {
                        const displaySkills =
                          actualBaseStats?.skills || baseStats.skills || [];
                        return displaySkills.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {displaySkills.map((skill: any, index: number) => (
                              <button
                                key={index}
                                onClick={() => handleSkillClick(skill)}
                                className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors duration-200 cursor-pointer"
                              >
                                {skill}
                              </button>
                            ))}
                          </div>
                        ) : null;
                      })()}
                      {/* SkillPicker só aparece se não for Lenda */}
                      {(() => {
                        const displayRole = actualRole || role;
                        if (displayRole === "Lenda" || !onAddSkill) return null;

                        const allowedSkillsList =
                          actualAvailableSkills.length > 0
                            ? actualAvailableSkills
                            : actualBaseStats?.skills || [];

                        return (
                          <SkillPicker
                            allowedSkills={allowedSkillsList as string[]}
                            selectedSkills={selectedSkills || []}
                            onAdd={s => onAddSkill && onAddSkill(s)}
                          />
                        );
                      })()}

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
                )
              );
            })()}

            {/* Magias - Oculto para Soldados; Para Lendas, só mostra se tiver spells; Só mostra se tiver spellAffinity */}
            {(() => {
              const displayRole = actualRole || role;
              // Verifica se tem spellAffinity com pelo menos uma tradição
              const hasSpellAffinity =
                (actualSpellAffinity?.aligned0 &&
                  actualSpellAffinity.aligned0.length > 0) ||
                (actualSpellAffinity?.aligned2 &&
                  actualSpellAffinity.aligned2.length > 0) ||
                (spellAffinity?.aligned0 &&
                  spellAffinity.aligned0.length > 0) ||
                (spellAffinity?.aligned2 && spellAffinity.aligned2.length > 0);

              return (
                displayRole !== "Soldado" &&
                (hasSpellAffinity ||
                  (selectedSpells && selectedSpells.length > 0)) &&
                (displayRole !== "Lenda" ||
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
                      {actualAvailableSpells &&
                      actualAvailableSpells.length > 0 ? (
                        <div className="mb-3">
                          <div className="text-sm text-gray-300 mb-1">
                            Escolas Disponíveis
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {actualAvailableSpells.map(
                              (t: any, idx: number) => (
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
                          (actualSpellAffinity &&
                            actualSpellAffinity.aligned0) ||
                          [];
                        const a2 =
                          (actualSpellAffinity &&
                            actualSpellAffinity.aligned2) ||
                          [];
                        if ((a0 && a0.length) || (a2 && a2.length)) {
                          return (
                            <div className="mb-3">
                              <div className="text-sm text-gray-300 mb-1">
                                Afinidades do Usuário
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {a0.map((t: string, idx: number) => (
                                  <button
                                    key={`a0-${idx}`}
                                    onClick={() => handleLoreClick(t)}
                                    className="inline-flex items-center bg-[#1a1a1a] border border-green-600/60 text-green-300 text-xs rounded px-2 py-1 hover:bg-green-900/30"
                                    title="Abrir tradição (Primária)"
                                  >
                                    {t}
                                  </button>
                                ))}
                                {a2.map((t: string, idx: number) => (
                                  <button
                                    key={`a2-${idx}`}
                                    onClick={() => handleLoreClick(t)}
                                    className="inline-flex items-center bg-[#1a1a1a] border border-yellow-600/60 text-yellow-300 text-xs rounded px-2 py-1 hover:bg-yellow-900/30"
                                    title="Abrir tradição (Secundária)"
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })()}
                      {/* SpellPicker só aparece se não for Lenda e tiver spellAffinity */}
                      {(() => {
                        const displayRole = actualRole || role;
                        if (displayRole === "Lenda" || !onAddSpell) return null;
                        // Só mostra se tiver spellAffinity com pelo menos uma tradição
                        const hasSpellAffinity =
                          (actualSpellAffinity?.aligned0 &&
                            actualSpellAffinity.aligned0.length > 0) ||
                          (actualSpellAffinity?.aligned2 &&
                            actualSpellAffinity.aligned2.length > 0) ||
                          (spellAffinity?.aligned0 &&
                            spellAffinity.aligned0.length > 0) ||
                          (spellAffinity?.aligned2 &&
                            spellAffinity.aligned2.length > 0);
                        if (!hasSpellAffinity) return null;
                        return (
                          <SpellPicker
                            aligned0={actualSpellAffinity?.aligned0}
                            aligned2={actualSpellAffinity?.aligned2}
                            selectedSpells={selectedSpells || []}
                            onAdd={spell => onAddSpell(spell)}
                          />
                        );
                      })()}
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
                                  name={spell.name || ""}
                                  castingNumber={spell.castingNumber ?? 0}
                                  keywords={
                                    Array.isArray(spell.keywords)
                                      ? spell.keywords
                                      : []
                                  }
                                  effect={spell.effect || ""}
                                  footer={
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                      <div className="flex items-center gap-2">
                                        <label className="text-xs text-gray-400 whitespace-nowrap">
                                          Modificador:
                                        </label>
                                        <input
                                          type="number"
                                          className="w-full sm:w-16 bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1.5 text-white text-center text-xs sm:text-sm"
                                          value={
                                            spell.casting_number_modifier !==
                                            undefined
                                              ? spell.casting_number_modifier
                                              : 0
                                          }
                                          onChange={e => {
                                            if (onChangeSpellCastingNumber) {
                                              // O valor editado é o modifier (sempre subtraído)
                                              const modifierValue =
                                                parseInt(e.target.value) || 0;
                                              onChangeSpellCastingNumber(
                                                spell.id || String(index),
                                                modifierValue
                                              );
                                            }
                                          }}
                                          title="Modificador de CD (sempre subtraído do CD base)"
                                        />
                                      </div>
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
                )
              );
            })()}

            {/* Habilidades Especiais - Oculto para Soldados e Lendas */}
            {(() => {
              const displayRole = actualRole || role;
              return (
                displayRole !== "Soldado" &&
                displayRole !== "Lenda" &&
                (canHaveSacredMarks ||
                  canHaveMutations ||
                  canHaveBlessingsOfNurgle ||
                  Boolean(
                    (figure as any)?.nurgleBlessings?.length ||
                      (figure as any)?.mutations?.length ||
                      (figure as any)?.sacredMarks?.length
                  )) && (
                  <div className="mb-6">
                    <h4
                      className="text-lg font-bold mb-3"
                      style={{ color: "#8fbc8f" }}
                    >
                      HABILIDADES ESPECIAIS
                    </h4>
                    <div className="bg-[#2a2a2a] p-4 rounded">
                      {onAddSpecialAbility && (
                        <div className="space-y-4">
                          {canHaveSacredMarks && (
                            <SacredMarksPicker
                              selected={selectedSacredMarksNames}
                              availableCrowns={availableCrowns}
                              onSpendCrowns={onSpendCrowns}
                              onAdd={mark =>
                                onAddSpecialAbility({
                                  id: mark.id,
                                  category: mark.category,
                                  name: mark.name,
                                  description: mark.description,
                                  cost: mark.cost,
                                  baseId: mark.baseId, // ID base para criar base_sacred_mark_id
                                })
                              }
                            />
                          )}
                          {canHaveMutations && (
                            <MutationsPicker
                              selected={selectedMutationsNames}
                              availableCrowns={availableCrowns}
                              onSpendCrowns={onSpendCrowns}
                              onAdd={mutation =>
                                onAddSpecialAbility({
                                  id: mutation.id,
                                  category: mutation.category,
                                  name: mutation.name,
                                  description: mutation.description,
                                  cost: mutation.cost,
                                  baseId: mutation.baseId, // ID base para criar base_mutation_id
                                })
                              }
                            />
                          )}
                          {canHaveBlessingsOfNurgle && (
                            <BlessingsOfNurglePicker
                              selected={selectedBlessingsNames}
                              availableCrowns={availableCrowns}
                              onSpendCrowns={onSpendCrowns}
                              onAdd={blessing =>
                                onAddSpecialAbility({
                                  id: blessing.id,
                                  category: blessing.category,
                                  name: blessing.name,
                                  description: blessing.description,
                                  cost: blessing.cost,
                                  baseId: blessing.baseId, // ID base para criar base_nurgle_blessing_id
                                })
                              }
                            />
                          )}
                        </div>
                      )}
                      {figure && (
                        <div className="mt-2">
                          <div className="space-y-4">
                            {(
                              [
                                {
                                  key: "nurgleBlessings",
                                  label: "Bênçãos de Nurgle",
                                  category: "nurgleBlessing" as const,
                                  baseMap: blessingBaseMap,
                                  baseIdKey: "base_nurgle_blessing_id",
                                },
                                {
                                  key: "mutations",
                                  label: "Mutações",
                                  category: "mutation" as const,
                                  baseMap: mutationBases.data,
                                  baseIdKey: "base_mutation_id",
                                },
                                {
                                  key: "sacredMarks",
                                  label: "Marcas Sagradas",
                                  category: "sacredMark" as const,
                                  baseMap: sacredMarkBases.data,
                                  baseIdKey: "base_sacred_mark_id",
                                },
                              ] as const
                            ).map(
                              ({
                                key,
                                label,
                                category,
                                baseMap,
                                baseIdKey,
                              }) => {
                                const list = (figure as any)[key] || [];
                                if (!list.length || !baseMap) return null;

                                // Resolve as referências para dados completos
                                const resolvedItems = list
                                  .map((ref: any) => {
                                    const baseId =
                                      ref?.[baseIdKey] || ref?.id || ref;
                                    const resolved = baseMap[baseId];
                                    if (!resolved) return null;
                                    return {
                                      ...resolved,
                                      refId: ref.id, // Mantém o ID da referência para remover
                                    };
                                  })
                                  .filter(Boolean);

                                if (!resolvedItems.length) return null;

                                return (
                                  <div key={key}>
                                    <div className="text-sm text-gray-300 mb-2">
                                      {label}
                                    </div>
                                    <div className="space-y-3">
                                      {resolvedItems.map((item: any) => (
                                        <SpecialAbilitiesCard
                                          key={item.refId || item.id}
                                          name={item.name}
                                          cost={item.cost}
                                          description={item.description}
                                          footer={
                                            onRemoveSpecialAbility &&
                                            item.refId ? (
                                              <button
                                                onClick={() =>
                                                  onRemoveSpecialAbility(
                                                    category,
                                                    item.refId
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
                )
              );
            })()}

            {/* Seção de Equipamento - Oculto se equipmentSlots === 0 */}
            {(maxSlots ?? 5) > 0 && (
              <>
                {resolvedFigureBase?.availableEquipment &&
                  resolvedFigureBase.availableEquipment.length > 0 && (
                    <div className="mb-6">
                      <h4
                        className="text-lg font-bold mb-3"
                        style={{ color: "#8fbc8f" }}
                      >
                        EQUIPAMENTOS DISPONÍVEIS
                      </h4>
                      <div className="bg-[#2a2a2a] p-4 rounded">
                        <div className="flex flex-wrap gap-2">
                          {resolvedFigureBase.availableEquipment.map(
                            (name: any, idx: number) => (
                              <span
                                key={`${name}-${idx}`}
                                className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-gray-600 text-white text-xs rounded px-2 py-1"
                              >
                                {name}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                {/* Tabela de Compra de Equipamentos */}
                {purchasableEquipment.length > 0 && onPurchaseEquipment && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4
                        className="text-lg font-bold"
                        style={{ color: "#8fbc8f" }}
                      >
                        COMPRAR EQUIPAMENTOS
                      </h4>
                      <button
                        onClick={() => setShowPurchasables(v => !v)}
                        className="px-2 py-1 sm:px-3 bg-gray-700 hover:bg-gray-600 text-white text-[10px] sm:text-xs rounded transition-colors"
                      >
                        {showPurchasables ? "Esconder" : "Mostrar"}
                      </button>
                    </div>
                    {showPurchasables && (
                      <div className="bg-[#2a2a2a] p-4 rounded">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="border-b border-gray-600">
                                <th className="pb-2 text-sm font-semibold text-gray-300">
                                  Categoria
                                </th>
                                <th className="pb-2 text-sm font-semibold text-gray-300">
                                  Nome
                                </th>
                                <th className="pb-2 text-sm font-semibold text-gray-300">
                                  Custo
                                </th>
                                <th className="pb-2 text-sm font-semibold text-gray-300 text-right">
                                  Ação
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {purchasableEquipment.map((item, index) => (
                                <tr
                                  key={`${item.id}-${index}`}
                                  className="border-b border-gray-700 last:border-b-0"
                                >
                                  <td className="py-2 text-sm text-gray-300">
                                    {item.category}
                                  </td>
                                  <td className="py-2 text-sm text-white font-medium">
                                    {item.name}
                                  </td>
                                  <td className="py-2 text-sm text-gray-300">
                                    {item.cost}
                                  </td>
                                  <td className="py-2 text-right">
                                    <div className="flex flex-wrap gap-2 justify-end">
                                      <button
                                        onClick={() =>
                                          onPurchaseEquipment &&
                                          onPurchaseEquipment(
                                            id,
                                            item.id,
                                            item.cost,
                                            item.name
                                          )
                                        }
                                        className="px-2 py-1 sm:px-3 bg-green-600 hover:bg-green-700 text-white text-[10px] sm:text-xs rounded transition-colors"
                                      >
                                        Comprar
                                      </button>
                                      {item.availableModifiers &&
                                        item.availableModifiers.map(
                                          modifier => (
                                            <button
                                              key={modifier.id}
                                              onClick={() => {
                                                console.log(
                                                  "[RosterUnitCard][Purchase] modifierId:",
                                                  modifier.id,
                                                  "modifierName:",
                                                  modifier.name,
                                                  "itemId:",
                                                  item.id,
                                                  "unitId:",
                                                  id
                                                );
                                                onPurchaseEquipment &&
                                                  onPurchaseEquipment(
                                                    id,
                                                    item.id,
                                                    modifier.modifiedCost,
                                                    `${item.name} (${modifier.name})`,
                                                    modifier.id
                                                  );
                                              }}
                                              className="px-2 py-1 sm:px-3 bg-blue-600 hover:bg-blue-700 text-white text-[10px] sm:text-xs rounded transition-colors"
                                            >
                                              Comprar ({modifier.name}
                                              {modifier.multiplier
                                                ? ` x${modifier.multiplier}`
                                                : ""}
                                              )
                                            </button>
                                          )
                                        )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <EquipmentManager
                  unitId={id}
                  unitName={name}
                  equipment={equipment}
                  abilities={actualAbilities}
                  equippedItems={equippedItemsArray}
                  stashItems={stashItems as any}
                  onEquipFromStashFlat={(_uid, itemId) =>
                    onEquipFromStashFlat && onEquipFromStashFlat(itemId)
                  }
                  onUnequipToStashFlat={(_uid, itemId) =>
                    onUnequipToStashFlat && onUnequipToStashFlat(itemId)
                  }
                  onEquipToSecondaryHand={(_uid, itemId) =>
                    onEquipToSecondaryHand && onEquipToSecondaryHand(itemId)
                  }
                  onUnequipFromSecondaryHand={(_uid, itemId) =>
                    onUnequipFromSecondaryHand &&
                    onUnequipFromSecondaryHand(itemId)
                  }
                  onEquipToPrimaryHand={(_uid, itemId, asTwoHanded) =>
                    onEquipToPrimaryHand &&
                    onEquipToPrimaryHand(itemId, asTwoHanded)
                  }
                  onUnequipFromPrimaryHand={(_uid, itemId) =>
                    onUnequipFromPrimaryHand && onUnequipFromPrimaryHand(itemId)
                  }
                  onEquipAsArmor={(_uid, itemId) =>
                    onEquipAsArmor && onEquipAsArmor(itemId)
                  }
                  onUnequipFromArmor={(_uid, itemId) =>
                    onUnequipFromArmor && onUnequipFromArmor(itemId)
                  }
                  onEquipAsPair={(_uid, itemId) =>
                    onEquipAsPair && onEquipAsPair(itemId)
                  }
                  maxSlots={maxSlots}
                  availableEquipmentNames={
                    (resolvedFigureBase?.availableEquipment as string[]) || []
                  }
                  availableEquipment={
                    resolvedFigureBase?.equipment ||
                    resolvedFigureBase?.baseStats?.equipment
                  }
                  equipmentLocked={Boolean((figure as any)?.equipmentLocked)}
                  figureSkills={((figure as any)?.skills || []) as any}
                  figureMutations={(() => {
                    const mutations = ((figure as any)?.mutations ||
                      []) as any[];
                    return mutations
                      .map((mutationRef: any) => {
                        const mutationBaseId =
                          mutationRef?.base_mutation_id ||
                          mutationRef?.id ||
                          "";
                        const baseData = mutationBases.data[mutationBaseId];
                        return {
                          id: mutationBaseId,
                          base_mutation_id: mutationBaseId,
                          name: baseData?.name,
                        };
                      })
                      .filter(Boolean);
                  })()}
                  figureSacredMarks={(() => {
                    const marks = ((figure as any)?.sacredMarks || []) as any[];
                    return marks
                      .map((markRef: any) => {
                        const baseId =
                          markRef?.base_sacred_mark_id ||
                          markRef?.base_id ||
                          markRef?.id;
                        const baseData = sacredMarkBases.data?.[baseId];
                        return {
                          id: baseId,
                          base_sacred_mark_id: baseId,
                          base_id: baseId,
                          name: baseData?.name,
                        };
                      })
                      .filter(Boolean);
                  })()}
                />
              </>
            )}

            {/* Ataques Naturais */}
            {naturalAttacks && naturalAttacks.length > 0 && (
              <div className="mb-6">
                <h4
                  className="text-lg font-bold mb-3"
                  style={{ color: "#8fbc8f" }}
                >
                  ATAQUES NATURAIS
                </h4>
                <div className="bg-[#2a2a2a] p-4 rounded space-y-2">
                  {naturalAttacks.map((attack, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedNaturalAttack(attack)}
                      className="w-full text-left p-3 rounded bg-[#1a1a1a] border border-gray-700 hover:bg-[#252525] hover:border-green-600 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold" style={{ color: "#8fbc8f" }}>
                          {attack.name}
                        </h5>
                        <span className="text-sm text-gray-400">
                          {attack.type} - Dano: {attack.damage}
                        </span>
                      </div>
                      {attack.specialRules &&
                        attack.specialRules.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {attack.specialRules.map((rule, ruleIndex) => (
                              <span
                                key={ruleIndex}
                                className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                              >
                                {rule.label || rule.title}
                              </span>
                            ))}
                          </div>
                        )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Abilities / Regras Especiais */}
            {(actualAbilities && actualAbilities.length > 0) ||
            (Array.isArray((figure as any)?.specialRules) &&
              (figure as any).specialRules.length > 0) ||
            (Array.isArray(figure?.extraSpecialRules) &&
              figure.extraSpecialRules.length > 0) ? (
              <div className="mb-6">
                <h4
                  className="text-lg font-bold mb-3"
                  style={{ color: "#8fbc8f" }}
                >
                  Regras Especiais
                </h4>
                <div className="bg-[#2a2a2a] p-4 rounded space-y-3">
                  {/* Habilidades base da figura */}
                  {actualAbilities &&
                    actualAbilities.length > 0 &&
                    actualAbilities.map((ability: any, index: number) => (
                      <div
                        key={`ability-${index}`}
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
                    ))}

                  {/* Regras especiais adicionais do bando (specialRules) */}
                  {Array.isArray((figure as any)?.specialRules) &&
                    (figure as any).specialRules.length > 0 &&
                    ((figure as any).specialRules as any[]).map(
                      (r: any, idx: number) => (
                        <div
                          key={`special-rule-${idx}`}
                          className="border-b border-gray-600 pb-3 last:border-b-0"
                        >
                          <h5
                            className="font-bold mb-1"
                            style={{ color: "#8fbc8f" }}
                          >
                            {r?.name || r}
                          </h5>
                          {r?.description && (
                            <GameText
                              component="p"
                              className="text-gray-300 text-sm leading-relaxed"
                            >
                              {r?.description}
                            </GameText>
                          )}
                        </div>
                      )
                    )}

                  {/* Regras extras de ferimentos/avanços (extraSpecialRules) */}
                  {Array.isArray(figure?.extraSpecialRules) &&
                    figure.extraSpecialRules.length > 0 &&
                    figure.extraSpecialRules.map(
                      (rule: string, idx: number) => {
                        // Busca descrições conhecidas para as regras
                        const ruleDescriptions: Record<string, string> = {
                          Retardado:
                            "A figura ganha a característica Estupidez",
                          "Louco Espumante":
                            "A figura ganha a característica Fúria",
                          Caleijado: "A figura é Imune a Aterrorizante",
                          Deformado:
                            "A figura ganha a característica Aterrorizante, mas tem -3 para buscar no mercado negro",
                          Rancor: "Ódio contra um tipo específico de figura",
                        };

                        const description =
                          ruleDescriptions[rule] ||
                          (rule.startsWith("Rancor")
                            ? "Ódio contra um tipo específico de figura"
                            : "");

                        return (
                          <div
                            key={`extra-rule-${idx}`}
                            className="border-b border-gray-600 pb-3 last:border-b-0"
                          >
                            <h5
                              className="font-bold mb-1"
                              style={{ color: "#8fbc8f" }}
                            >
                              {rule}
                            </h5>
                            {description && (
                              <GameText
                                component="p"
                                className="text-gray-300 text-sm leading-relaxed"
                              >
                                {description}
                              </GameText>
                            )}
                          </div>
                        );
                      }
                    )}
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
            onClick={e => e.stopPropagation()}
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

            {/* Breakdown de modificadores */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">
                Modificadores Calculados
              </h4>

              {(() => {
                const breakdown = toFigureBreakdown(editingStat);
                if (breakdown === "-") return null;

                // Extrai cada tipo de modificador separadamente
                const advMod =
                  calculatedModifiers.advancement[
                    editingStat as keyof typeof calculatedModifiers.advancement
                  ] || 0;
                const injMod =
                  calculatedModifiers.injury[
                    editingStat as keyof typeof calculatedModifiers.injury
                  ] || 0;
                const skillsMod =
                  calculatedModifiers.skills[
                    editingStat as keyof typeof calculatedModifiers.skills
                  ] || 0;
                const mutationsMod =
                  calculatedModifiers.mutations[
                    editingStat as keyof typeof calculatedModifiers.mutations
                  ] || 0;
                const sacredMarksMod =
                  calculatedModifiers.sacredMarks[
                    editingStat as keyof typeof calculatedModifiers.sacredMarks
                  ] || 0;
                const nurgleBlessingsMod =
                  calculatedModifiers.nurgleBlessings[
                    editingStat as keyof typeof calculatedModifiers.nurgleBlessings
                  ] || 0;
                const equipmentMod =
                  calculatedModifiers.equipment[
                    editingStat as keyof typeof calculatedModifiers.equipment
                  ] || 0;

                // Calcula bônus de "Lutar com duas armas" separadamente para exibir no modal
                let twoWeaponsBonus = 0;
                if (editingStat === "fight") {
                  const allEquipped = equippedItemsArray || [];

                  // Verifica se tem a skill "Arte da morte silenciosa" (precisa verificar independente de ter equipamentos)
                  const figureSkills = ((figure as any)?.skills || []) as any[];
                  const hasSilentDeathSkill = figureSkills.some(
                    (skill: any) => {
                      const skillBaseId =
                        skill?.base_skill_id || skill?.id || "";
                      const name = String(skill?.name || "").toLowerCase();
                      return (
                        skillBaseId === "arte-da-morte-silenciosa" ||
                        name.includes("arte da morte silenciosa")
                      );
                    }
                  );

                  // Verifica se NÃO tem NADA equipado nas mãos (nem primária, nem secundária, nem duas mãos)
                  const hasNothingEquippedInHands = !allEquipped.some(
                    (equip: any) =>
                      equip?.mainHandWeapon ||
                      equip?.offHandWeapon ||
                      equip?.twoHandedWeapon
                  );

                  // Se tem a skill "Arte da Morte Silenciosa" E NÃO tem NADA equipado nas mãos, ganha +1 Ímpeto
                  if (hasSilentDeathSkill && hasNothingEquippedInHands) {
                    twoWeaponsBonus = 1;
                  } else if (allEquipped.length > 0) {
                    // Palavras-chave para identificar armas leves/pistolas (escalável)
                    const lightWeaponKeywords = ["Leve", "Pistola"];

                    // Verifica se tem arma na mão primária
                    const primaryWeapon = allEquipped.find((equip: any) =>
                      Boolean(equip?.mainHandWeapon || equip?.twoHandedWeapon)
                    );

                    // Verifica se tem arma leve/pistola na mão secundária
                    // Também verifica o campo countAsLight: true (para casos especiais como Bertha)
                    const secondaryLightWeapon = allEquipped.find(
                      (equip: any) => {
                        if (!Boolean(equip?.offHandWeapon)) return false;

                        // Verifica primeiro o campo countAsLight
                        if (equip?.countAsLight === true) return true;

                        const equipBase = equip?.base;
                        const specialRules = equipBase?.specialRules || [];
                        const rulesText =
                          JSON.stringify(specialRules).toLowerCase();

                        return lightWeaponKeywords.some(keyword =>
                          rulesText.includes(keyword.toLowerCase())
                        );
                      }
                    );

                    // Caso padrão: Se tem arma na primária E arma leve/pistola na secundária, ganha +1 Ímpeto
                    if (primaryWeapon && secondaryLightWeapon) {
                      twoWeaponsBonus = 1;
                    }
                  }
                }

                // Helper para renderizar um modificador
                const ModifierRow = ({
                  label,
                  value,
                }: {
                  label: string;
                  value: number;
                }) => {
                  if (value === 0) return null;
                  const isPositive = value > 0;
                  const color = isPositive ? "#4ade80" : "#f87171"; // verde-400 : vermelho-400

                  return (
                    <div className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                      <span className="text-sm text-gray-300">{label}</span>
                      <span className="text-sm font-semibold" style={{ color }}>
                        {isPositive ? `+${value}` : `${value}`}
                      </span>
                    </div>
                  );
                };

                return (
                  <div className="bg-[#1a1a1a] rounded-lg p-4 space-y-1">
                    <ModifierRow label="Avanços" value={advMod} />
                    <ModifierRow label="Ferimentos" value={injMod} />
                    <ModifierRow label="Habilidades" value={skillsMod} />
                    <ModifierRow label="Mutações" value={mutationsMod} />
                    <ModifierRow
                      label="Marcas Sagradas"
                      value={sacredMarksMod}
                    />
                    <ModifierRow
                      label="Bênçãos de Nurgle"
                      value={nurgleBlessingsMod}
                    />
                    <ModifierRow label="Equipamentos" value={equipmentMod} />
                    {twoWeaponsBonus > 0 && (
                      <ModifierRow
                        label="Lutar com duas armas"
                        value={twoWeaponsBonus}
                      />
                    )}

                    {/* Se não houver modificadores, mostra mensagem */}
                    {advMod === 0 &&
                      injMod === 0 &&
                      skillsMod === 0 &&
                      mutationsMod === 0 &&
                      sacredMarksMod === 0 &&
                      nurgleBlessingsMod === 0 &&
                      equipmentMod === 0 &&
                      twoWeaponsBonus === 0 && (
                        <div className="text-xs text-gray-500 text-center py-2">
                          Nenhum modificador calculado
                        </div>
                      )}
                  </div>
                );
              })()}
            </div>

            {/* Campo Misc editável */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Modificador Manual (Misc)
              </label>
              <input
                type="number"
                className="w-full bg-[#1a1a1a] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-green-500"
                value={tempModifiers.misc}
                onChange={e =>
                  setTempModifiers({
                    ...tempModifiers,
                    misc: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="0"
              />
              <p className="text-xs text-gray-400 mt-1">
                Adicione modificadores manuais aqui
              </p>
            </div>

            {/* Resumo do total */}
            <div className="pt-4 border-t border-gray-600">
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300">
                    Valor Base:
                  </span>
                  <span className="text-sm font-bold text-gray-200">
                    {(() => {
                      const breakdown = toFigureBreakdown(editingStat);
                      if (breakdown === "-") return "-";
                      const b = breakdown as AttributeBreakdown;
                      return b.base;
                    })()}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-300">
                    Total de Modificadores:
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#8fbc8f" }}
                  >
                    {(() => {
                      const breakdown = toFigureBreakdown(editingStat);
                      if (breakdown === "-") return "-";

                      // Calcula bônus de "Lutar com duas armas" para o total
                      let twoWeaponsBonusForTotal = 0;
                      if (editingStat === "fight") {
                        const allEquipped = equippedItemsArray || [];

                        // Verifica se tem a skill "Arte da morte silenciosa" (precisa verificar independente de ter equipamentos)
                        const figureSkills = ((figure as any)?.skills ||
                          []) as any[];
                        const hasSilentDeathSkill = figureSkills.some(
                          (skill: any) => {
                            const skillBaseId =
                              skill?.base_skill_id || skill?.id || "";
                            const name = String(
                              skill?.name || ""
                            ).toLowerCase();
                            return (
                              skillBaseId === "arte-da-morte-silenciosa" ||
                              name.includes("arte da morte silenciosa")
                            );
                          }
                        );

                        // Verifica se NÃO tem NADA equipado nas mãos (nem primária, nem secundária, nem duas mãos)
                        const hasNothingEquippedInHands = !allEquipped.some(
                          (equip: any) =>
                            equip?.mainHandWeapon ||
                            equip?.offHandWeapon ||
                            equip?.twoHandedWeapon
                        );

                        // Se tem a skill "Arte da Morte Silenciosa" E NÃO tem NADA equipado nas mãos, ganha +1 Ímpeto
                        if (hasSilentDeathSkill && hasNothingEquippedInHands) {
                          twoWeaponsBonusForTotal = 1;
                        } else if (allEquipped.length > 0) {
                          const lightWeaponKeywords = ["Leve", "Pistola"];
                          const primaryWeapon = allEquipped.find((equip: any) =>
                            Boolean(
                              equip?.mainHandWeapon || equip?.twoHandedWeapon
                            )
                          );
                          const secondaryLightWeapon = allEquipped.find(
                            (equip: any) => {
                              if (!Boolean(equip?.offHandWeapon)) return false;
                              if (equip?.countAsLight === true) return true;
                              const equipBase = equip?.base;
                              const specialRules =
                                equipBase?.specialRules || [];
                              const rulesText =
                                JSON.stringify(specialRules).toLowerCase();
                              return lightWeaponKeywords.some(keyword =>
                                rulesText.includes(keyword.toLowerCase())
                              );
                            }
                          );
                          if (primaryWeapon && secondaryLightWeapon) {
                            twoWeaponsBonusForTotal = 1;
                          }
                        }
                      }

                      // Soma TODOS os modificadores calculados + misc manual
                      const advMod =
                        calculatedModifiers.advancement[
                          editingStat as keyof typeof calculatedModifiers.advancement
                        ] || 0;
                      const injMod =
                        calculatedModifiers.injury[
                          editingStat as keyof typeof calculatedModifiers.injury
                        ] || 0;
                      const skillsMod =
                        calculatedModifiers.skills[
                          editingStat as keyof typeof calculatedModifiers.skills
                        ] || 0;
                      const mutationsMod =
                        calculatedModifiers.mutations[
                          editingStat as keyof typeof calculatedModifiers.mutations
                        ] || 0;
                      const sacredMarksMod =
                        calculatedModifiers.sacredMarks[
                          editingStat as keyof typeof calculatedModifiers.sacredMarks
                        ] || 0;
                      const nurgleBlessingsMod =
                        calculatedModifiers.nurgleBlessings[
                          editingStat as keyof typeof calculatedModifiers.nurgleBlessings
                        ] || 0;
                      const equipmentMod =
                        calculatedModifiers.equipment[
                          editingStat as keyof typeof calculatedModifiers.equipment
                        ] || 0;

                      const totalMods =
                        advMod +
                        injMod +
                        skillsMod +
                        mutationsMod +
                        sacredMarksMod +
                        nurgleBlessingsMod +
                        equipmentMod +
                        twoWeaponsBonusForTotal + // Bônus de lutar com duas armas
                        tempModifiers.misc; // Usa misc do estado temporário
                      return totalMods > 0 ? `+${totalMods}` : `${totalMods}`;
                    })()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <span className="text-base font-bold text-gray-200">
                    Total Final:
                  </span>
                  <span
                    className="text-xl font-bold"
                    style={{ color: "#8fbc8f" }}
                  >
                    {(() => {
                      const breakdown = toFigureBreakdown(editingStat);
                      // Se for "-", mostra "-"
                      if (breakdown === "-") {
                        return "-";
                      }
                      const b = breakdown as AttributeBreakdown;

                      // Soma TODOS os modificadores calculados + misc manual
                      const advMod =
                        calculatedModifiers.advancement[
                          editingStat as keyof typeof calculatedModifiers.advancement
                        ] || 0;
                      const injMod =
                        calculatedModifiers.injury[
                          editingStat as keyof typeof calculatedModifiers.injury
                        ] || 0;
                      const skillsMod =
                        calculatedModifiers.skills[
                          editingStat as keyof typeof calculatedModifiers.skills
                        ] || 0;
                      const mutationsMod =
                        calculatedModifiers.mutations[
                          editingStat as keyof typeof calculatedModifiers.mutations
                        ] || 0;
                      const sacredMarksMod =
                        calculatedModifiers.sacredMarks[
                          editingStat as keyof typeof calculatedModifiers.sacredMarks
                        ] || 0;
                      const nurgleBlessingsMod =
                        calculatedModifiers.nurgleBlessings[
                          editingStat as keyof typeof calculatedModifiers.nurgleBlessings
                        ] || 0;
                      const equipmentMod =
                        calculatedModifiers.equipment[
                          editingStat as keyof typeof calculatedModifiers.equipment
                        ] || 0;

                      // Calcula bônus de "Lutar com duas armas" para o total final
                      let twoWeaponsBonusForTotal = 0;
                      if (editingStat === "fight") {
                        const allEquipped = equippedItemsArray || [];

                        // Verifica se tem a skill "Arte da morte silenciosa" (precisa verificar independente de ter equipamentos)
                        const figureSkills = ((figure as any)?.skills ||
                          []) as any[];
                        const hasSilentDeathSkill = figureSkills.some(
                          (skill: any) => {
                            const skillBaseId =
                              skill?.base_skill_id || skill?.id || "";
                            const name = String(
                              skill?.name || ""
                            ).toLowerCase();
                            return (
                              skillBaseId === "arte-da-morte-silenciosa" ||
                              name.includes("arte da morte silenciosa")
                            );
                          }
                        );

                        // Verifica se NÃO tem NADA equipado nas mãos (nem primária, nem secundária, nem duas mãos)
                        const hasNothingEquippedInHands = !allEquipped.some(
                          (equip: any) =>
                            equip?.mainHandWeapon ||
                            equip?.offHandWeapon ||
                            equip?.twoHandedWeapon
                        );

                        // Se tem a skill "Arte da Morte Silenciosa" E NÃO tem NADA equipado nas mãos, ganha +1 Ímpeto
                        if (hasSilentDeathSkill && hasNothingEquippedInHands) {
                          twoWeaponsBonusForTotal = 1;
                        } else if (allEquipped.length > 0) {
                          const lightWeaponKeywords = ["Leve", "Pistola"];
                          const primaryWeapon = allEquipped.find((equip: any) =>
                            Boolean(
                              equip?.mainHandWeapon || equip?.twoHandedWeapon
                            )
                          );
                          const secondaryLightWeapon = allEquipped.find(
                            (equip: any) => {
                              if (!Boolean(equip?.offHandWeapon)) return false;
                              if (equip?.countAsLight === true) return true;
                              const equipBase = equip?.base;
                              const specialRules =
                                equipBase?.specialRules || [];
                              const rulesText =
                                JSON.stringify(specialRules).toLowerCase();
                              return lightWeaponKeywords.some(keyword =>
                                rulesText.includes(keyword.toLowerCase())
                              );
                            }
                          );
                          if (primaryWeapon && secondaryLightWeapon) {
                            twoWeaponsBonusForTotal = 1;
                          }
                        }
                      }

                      let total =
                        b.base +
                        advMod +
                        injMod +
                        skillsMod +
                        mutationsMod +
                        sacredMarksMod +
                        nurgleBlessingsMod +
                        equipmentMod +
                        twoWeaponsBonusForTotal + // Bônus de lutar com duas armas
                        tempModifiers.misc; // Usa misc do estado temporário

                      // Para armadura, adiciona bônus de equipamentos
                      if (
                        editingStat === "armour" &&
                        equippedItemsArray.length > 0
                      ) {
                        let equipmentArmorBonus = 0;
                        for (const equip of equippedItemsArray) {
                          equipmentArmorBonus += parseNumeric(
                            equip?.armorBonus
                          );
                        }
                        total += equipmentArmorBonus;
                        // Limita a 17
                        total = Math.min(total, 17);
                      }

                      // Para movimento, subtrai penalidade de equipamentos
                      if (
                        editingStat === "move" &&
                        equippedItemsArray.length > 0
                      ) {
                        // Verifica se a figura tem a regra especial "Devagar e Sempre" ou "Crueldade Paciente"
                        const specialRules =
                          resolvedFigureBase?.specialRules ||
                          figure?.extraSpecialRules ||
                          [];
                        const hasIgnoreMovementPenalty = specialRules.some(
                          (rule: any) =>
                            rule?.name === "Devagar e Sempre" ||
                            rule?.name === "Crueldade Paciente"
                        );

                        // Apenas aplica penalidade se não tiver a regra especial
                        if (!hasIgnoreMovementPenalty) {
                          let equipmentMovementPenalty = 0;
                          for (const equip of equippedItemsArray) {
                            equipmentMovementPenalty += parseNumeric(
                              equip?.movePenalty
                            );
                          }
                          total += equipmentMovementPenalty;
                        }
                        // Garante que não fique negativo
                        total = Math.max(total, 0);
                      }

                      const showPlus =
                        editingStat === "fight" ||
                        editingStat === "shoot" ||
                        editingStat === "Vontade";
                      return showPlus && total >= 0 ? `+${total}` : `${total}`;
                    })()}
                  </span>
                </div>
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

      {/* Modal de Ataque Natural */}
      {selectedNaturalAttack && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelectedNaturalAttack(null)}
        >
          <div
            className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-6 max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold" style={{ color: "#8fbc8f" }}>
                {selectedNaturalAttack.name}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedNaturalAttack(null)}
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
                <label className="block text-sm font-semibold text-gray-300 mb-1">
                  Tipo
                </label>
                <p className="text-white">{selectedNaturalAttack.type}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">
                  Dano
                </label>
                <p className="text-white">{selectedNaturalAttack.damage}</p>
              </div>

              {selectedNaturalAttack.range && (
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1">
                    Alcance
                  </label>
                  <p className="text-white">{selectedNaturalAttack.range}</p>
                </div>
              )}

              {selectedNaturalAttack.specialRules &&
                selectedNaturalAttack.specialRules.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Regras Especiais
                    </label>
                    <div className="space-y-2">
                      {selectedNaturalAttack.specialRules.map(
                        (rule, ruleIndex) => (
                          <div
                            key={ruleIndex}
                            className="bg-[#1a1a1a] p-3 rounded border border-gray-700"
                          >
                            <h5
                              className="font-bold mb-1"
                              style={{ color: "#8fbc8f" }}
                            >
                              {rule.label || rule.title}
                            </h5>
                            {rule.value && (
                              <GameText
                                component="p"
                                className="text-gray-300 text-sm leading-relaxed"
                              >
                                {rule.value}
                              </GameText>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              <button
                type="button"
                onClick={() => setSelectedNaturalAttack(null)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Fechar
              </button>
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
