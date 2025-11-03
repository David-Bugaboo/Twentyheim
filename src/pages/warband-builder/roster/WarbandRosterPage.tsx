import { useEffect, useMemo, useRef, useState } from "react";
import { getLocalWarband } from "./helpers/indexedDb.helpers";
import PageTitle from "../../../components/PageTitle";
import MobileSection from "../../../components/MobileSection";
import MobileText from "../../../components/MobileText";
import EquipmentCard from "../../../components/EquipmentCard";
import HeaderH1 from "../../../components/HeaderH1";
import WarbandStash, { type StashItem } from "../../../components/WarbandStash";
import RosterUnitCard, {
  type RosterUnitStats,
} from "../../../components/RosterUnitCard";
import { type UnitStats } from "../../../components/UnitCard";
import QuickNavigation from "../../../components/QuickNavigation";

import { db } from "../../../firebase.ts";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import type { EditableUnit } from "./types/editableUnit.type";
import WarbandNotFoundPage from "./WarbandNotFoundPage";
import { toast } from "react-toastify";
import { stripUndefinedDeep } from "./helpers/firestore.helpers";
import {
  figuresToEditableUnits,
  createRosterStats,
} from "./helpers/unitTransformations.helpers";
import { calculateWarbandRating } from "./helpers/warbandCalculations.helpers";
import {
  getFactionLabel,
  normalizeList,
  isEligibleForFaction,
} from "./helpers/faction.helpers";
import { isHelmetName, isShieldName } from "./helpers/equipment.helpers";

// Custom hooks
import { useWarbandData } from "./hooks/useWarbandData";
import { useWarbandState } from "./hooks/useWarbandState";
import { useWarbandOperations } from "./hooks/useWarbandOperations";
import { useEquipmentManagement } from "./hooks/useEquipmentManagement";
import { useUnitManagement } from "./hooks/useUnitManagement";
import { useAutoSave } from "./hooks/useAutoSave";

// Nota: createRosterStats foi movido para helpers/unitTransformations.helpers.ts

function WarbandRosterPage() {
  // Carrega todos os dados usando hook centralizado
  const warbandData = useWarbandData();
  const {
    data: { factions, modifiers },
    dataSources,
  } = warbandData;

  // Desestrutura dados para compatibilidade com código existente
  const {
    sisters: sistersData,
    skaven: skavenData,
    beastmen: beastmenData,
    dwarfs: dwarfTreasureHuntersData,
    cult: cultPossessedData,
    vampires: vampireCourtsData,
    witchHunters: witchHuntersData,
    lizardmen: lizardmenData,
    orcs: orcMobData,
    goblins: goblinsData,
    hashut: sonsOfHashutData,
    mercenaries: mercenariesData,
    carnival: carnivalChaosData,
    darkElves: darkElfCorsairsData,
    hiredSwords,
    legends: legendsData,
  } = factions;

  const { currentUser } = useAuth();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Gerencia estado do warband (carregar, salvar, atualizar)
  const {
    warband,
    setWarband,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    isLoading,
    notFound,
    warbandId,
    warbandSource,
    fixedFaction,
    isLocal,
    hasNewerVersionInFirestore,
    updateFromFirestore,
    userId,
  } = useWarbandState();

  // Estado para armazenar a data da última atualização
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);

  // Converte figures para EditableUnits quando necessário para renderização
  const editableUnits = useMemo(() => {
    return figuresToEditableUnits(warband.figures || []);
  }, [warband.figures]);

  // Catálogos de equipamentos e modificadores
  const equipmentCatalogs = useMemo(
    () => ({
      meleeDb: dataSources.meleeDb || [],
      rangedDb: dataSources.rangedDb || [],
      firearmsDb: dataSources.firearmsDb || [],
      armorDb: dataSources.armorDb || [],
      accessoriesDb: dataSources.accessoriesDb || [],
      remediesPoisonsDb: dataSources.remediesPoisonsDb || [],
    }),
    [dataSources]
  );

  const modifierCatalogs = useMemo(
    () => ({
      meleeMods: modifiers.melee || [],
      rangedMods: modifiers.ranged || [],
      firearmsMods: modifiers.firearms || [],
    }),
    [modifiers]
  );

  // Hook de operações do warband (usa fila internamente)
  const {
    updateWarbandProperty,
    updateWarbandFigure,
    removeWarbandFigure,
    updateWarbandVault,
    addFigureFromBase,
    removeUnit,
  } = useWarbandOperations({
    warband,
    setWarband,
    setHasUnsavedChanges,
    equipmentCatalogs,
  });

  // Hook de gerenciamento de equipamentos
  const {
    handlePurchaseItem,
    handleEquipFromStashFlat,
    handleUnequipToStashFlat,
  } = useEquipmentManagement({
    warband,
    updateWarbandFigure,
    updateWarbandVault,
    updateWarbandProperty,
    setHasUnsavedChanges,
    equipmentCatalogs,
    modifierCatalogs,
  });

  // Hook de gerenciamento de unidades
  const unitManagement = useUnitManagement({
    updateWarbandFigure,
    setHasUnsavedChanges,
  });

  // Auto-save com debounce - salva no IndexedDB e Firestore (se logado)
  useAutoSave({
    hasUnsavedChanges,
    warbandId,
    warband,
    warbandSource,
    setHasUnsavedChanges,
    setIsSaving,
    userId: !isLocal && userId ? userId : null, // Passa userId apenas se não for local e tiver userId
  });

  // Busca e atualiza a data da última atualização
  useEffect(() => {
    if (!warbandId) return;

    const fetchLastUpdated = async () => {
      try {
        const localData = await getLocalWarband(warbandId);
        if (localData?.updatedAt) {
          const date = new Date(localData.updatedAt);
          // Formata em português: "DD/MM/YYYY HH:mm"
          const formatted = date.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          setLastUpdatedAt(formatted);
        }
      } catch (error) {
        console.warn("Erro ao buscar data de atualização:", error);
      }
    };

    fetchLastUpdated();

    // Atualiza a cada 5 segundos para mostrar a data mais recente
    const interval = setInterval(fetchLastUpdated, 5000);
    return () => clearInterval(interval);
  }, [
    warbandId,
    warband.figures,
    warband.vault,
    warband.name,
    warband.notes,
    warband.gold,
    warband.wyrdstone,
  ]);

  // Modal de seleção de equipamentos
  const [equipmentModal, setEquipmentModal] = useState<{
    open: boolean;
    unitId?: string;
    targetSubsection?: string;
  }>({ open: false, unitId: undefined });
  const [equipmentCategory, setEquipmentCategory] = useState<string>("");
  const [selectedEquipmentName, setSelectedEquipmentName] =
    useState<string>("");
  const EQUIP_TYPES: string[] = [
    "Arma Corpo a Corpo",
    "Arma a Distância",
    "Arma de Fogo",
    "Armadura",
    "Acessórios",
  ];

  // Warband Rating = (nº membros * 5) + soma(xp + qualidade de cada figura)
  const warbandRating = useMemo(() => {
    return calculateWarbandRating(warband.figures || []);
  }, [warband.figures]);

  // ==== Mercenários e Lendas (dropdowns globais) ====
  const allFactionDatas: any[] = useMemo(
    () => [
      sistersData || [],
      skavenData || [],
      beastmenData || [],
      dwarfTreasureHuntersData || [],
      cultPossessedData || [],
      vampireCourtsData || [],
      witchHuntersData || [],
      lizardmenData || [],
      orcMobData || [],
      goblinsData || [],
      sonsOfHashutData || [],
      mercenariesData || [],
      carnivalChaosData || [],
      darkElfCorsairsData || [],
    ],
    [
      sistersData,
      skavenData,
      beastmenData,
      dwarfTreasureHuntersData,
      cultPossessedData,
      vampireCourtsData,
      witchHuntersData,
      lizardmenData,
      orcMobData,
      goblinsData,
      sonsOfHashutData,
      mercenariesData,
      carnivalChaosData,
      darkElfCorsairsData,
    ]
  );

  const factionLabelAlt = useMemo(() => {
    return getFactionLabel(warband.faction || fixedFaction);
  }, [warband.faction, fixedFaction]);

  const extraPools = useMemo(
    () => [(hiredSwords || []) as any, (legendsData || []) as any],
    [hiredSwords, legendsData]
  );
  const flattenAllUnits = useMemo(
    () =>
      [
        ...allFactionDatas.flatMap(d => normalizeList(d)),
        ...extraPools.flatMap(d => normalizeList(d)),
      ].filter(Boolean),
    [allFactionDatas, extraPools]
  );

  const globalMercenaries = useMemo(
    () =>
      flattenAllUnits
        .filter(u =>
          String(u?.role || "")
            .toLowerCase()
            .includes("merc")
        )
        .filter(u => isEligibleForFaction(u, factionLabelAlt))
        .sort((a, b) => String(a.name).localeCompare(String(b.name), "pt-BR")),
    [flattenAllUnits, factionLabelAlt]
  );
  const globalLegends = useMemo(
    () =>
      flattenAllUnits
        .filter(u =>
          String(u?.role || "")
            .toLowerCase()
            .includes("lenda")
        )
        .filter(u => isEligibleForFaction(u, factionLabelAlt))
        .sort((a, b) => String(a.name).localeCompare(String(b.name), "pt-BR")),
    [flattenAllUnits, factionLabelAlt]
  );

  const [selectedFactionUnitId, setSelectedFactionUnitId] =
    useState<string>("");
  const [selectedMercId, setSelectedMercId] = useState<string>("");
  const [selectedLegendId, setSelectedLegendId] = useState<string>("");

  // Hooks para menu dropdown de unidades
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const menuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleToggleInactive = (unitId: string) => {
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      inactive: !Boolean(fig.inactive),
    }));
  };

  // Fecha menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const shouldClose = Object.values(menuRefs.current).every(
        ref => ref && !ref.contains(target)
      );
      if (shouldClose) {
        setOpenMenus(new Set());
      }
    };

    if (openMenus.size > 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenus]);

  // Objeto com catálogos para usar nas funções helpers
  // Nota: Não buscamos equipamentos do Firestore porque eles estão nos arquivos JSON
  // (armas-corpo-a-corpo, armas-de-fogo, etc.) que já estão carregados via useJsonData
  // O resolvedVault faz fallback para esses dados estáticos

  // Converte vault para formato StashItem usando dados resolvidos
  const resolvedVault = useMemo(() => {
    const vault = (warband.vault || []) as any[];

    return vault
      .map((equipment: any) => {
        // Se é formato antigo (tem name diretamente), retorna como está
        if (equipment.name && !equipment.base_equipment_id) {
          return {
            id: equipment.id || crypto.randomUUID(),
            name: equipment.name,
            category: equipment.type || equipment.category || "",
            cost: String(equipment.purchaseCost || equipment.sellCost || "-"),
            data: equipment,
            modifier: equipment.modifier
              ? {
                  name: equipment.modifier.name,
                  effect: equipment.modifier.effect,
                }
              : undefined,
          } as StashItem;
        }

        // Novo formato: resolve usando base_id dos dados estáticos
        if (equipment.base_equipment_id) {
          const allEquipment: any[] = [
            ...(equipmentCatalogs.meleeDb || []),
            ...(equipmentCatalogs.rangedDb || []),
            ...(equipmentCatalogs.firearmsDb || []),
            ...(equipmentCatalogs.armorDb || []),
            ...(equipmentCatalogs.accessoriesDb || []),
            ...(equipmentCatalogs.remediesPoisonsDb || []),
          ];

          const baseEquipment = allEquipment.find(
            (e: any) => e.id === equipment.base_equipment_id
          );

          if (!baseEquipment) {
            console.warn(
              `[ResolvedVault] Equipamento ${equipment.base_equipment_id} não encontrado nos dados estáticos`
            );
            return null;
          }

          // Resolve modificador (se houver)
          let baseModifier: any = undefined;
          if (equipment.base_modifier_id) {
            const allMods: any[] = [
              ...(modifierCatalogs.meleeMods || []),
              ...(modifierCatalogs.rangedMods || []),
              ...(modifierCatalogs.firearmsMods || []),
            ];
            baseModifier = allMods.find(
              (m: any) => m.id === equipment.base_modifier_id
            );
          }

          // Monta objeto completo para o StashItem
          const stashItem: StashItem = {
            id: equipment.id,
            name: baseEquipment.name || "",
            category: baseEquipment.type || "",
            cost: String(baseEquipment.purchaseCost || "-"),
            data: {
              ...baseEquipment,
              modifier: baseModifier,
            },
            modifier: baseModifier
              ? { name: baseModifier.name, effect: baseModifier.effect || "" }
              : undefined,
          };

          return stashItem;
        }

        return null;
      })
      .filter(Boolean) as StashItem[];
  }, [warband.vault, equipmentCatalogs, modifierCatalogs]);

  // Usa handlers do hook de gerenciamento de unidades (já usa fila internamente)
  const handleAddSkillToUnit = unitManagement.handleAddSkillToUnit;
  const handleRemoveSkillFromUnit = unitManagement.handleRemoveSkillFromUnit;
  const handleAddSpellToUnit = unitManagement.handleAddSpellToUnit;
  const handleRemoveSpellFromUnit = unitManagement.handleRemoveSpellFromUnit;
  const handleUpdateSpellCastingNumber =
    unitManagement.handleUpdateSpellCastingNumber;
  const handleUpdateFigureXp = unitManagement.handleUpdateFigureXp;
  const handleUpdateNarrativeName = unitManagement.handleUpdateNarrativeName;
  const handleAddSpecialAbilityToUnit =
    unitManagement.handleAddSpecialAbilityToUnit;
  const handleRemoveSpecialAbilityFromUnit =
    unitManagement.handleRemoveSpecialAbilityFromUnit;
  const handleAddSpecialRuleToUnit = unitManagement.handleAddSpecialRuleToUnit;
  const handleRemoveSpecialRuleFromUnit =
    unitManagement.handleRemoveSpecialRuleFromUnit;
  const handleAddAdvancementToUnit = unitManagement.handleAddAdvancementToUnit;
  const handleRemoveAdvancementFromUnit =
    unitManagement.handleRemoveAdvancementFromUnit;
  const handleAddInjuryToUnit = unitManagement.handleAddInjuryToUnit;
  const handleRemoveInjuryFromUnit = unitManagement.handleRemoveInjuryFromUnit;
  const handleFigureStatModifierChange =
    unitManagement.handleFigureStatModifierChange;

  // Adiciona uma tradição (em aligned0) à unidade
  const handleAddTraditionToUnit = (unitId: string, traditionName: string) => {
    const unit = editableUnits.find(u => u.id === unitId);
    if (!unit) return;
    const current = unit.spellAffinity?.aligned0 || [];
    if (current.includes(traditionName)) return;
    const figure = unit.figure as any;
    if (!figure) return;

    updateWarbandFigure(unitId, (fig: any) => {
      // Nota: spellAffinity não está diretamente na figure, mas pode estar no EditableUnit
      // Por enquanto, apenas atualiza a figure
      return fig;
    });
  };

  // Adiciona uma lista de habilidades ao stats.skills da unidade
  const handleAddSkillCategoryToUnit = (unitId: string, category: string) => {
    const value = category.trim();
    if (!value) return;
    const unit = editableUnits.find(u => u.id === unitId);
    if (!unit) return;

    updateWarbandFigure(unitId, (fig: any) => {
      const availableSkills = Array.isArray(fig?.availableSkills)
        ? [...fig.availableSkills]
        : [];
      if (availableSkills.includes(value)) return fig;
      return {
        ...fig,
        availableSkills: [...availableSkills, value],
      };
    });
  };

  const getGlobalItemsByType = (type: string, unit?: EditableUnit) => {
    if (type === "Arma Corpo a Corpo") {
      return (equipmentCatalogs.meleeDb || [])
        .filter((w: any) => String(w.type || "").includes("Corpo"))
        .map((w: any) => ({ name: w.name, cost: w.cost || "-" }));
    }
    if (type === "Arma a Distância") {
      return (equipmentCatalogs.rangedDb || [])
        .filter((w: any) => String(w.type || "").includes("Distância"))
        .map((w: any) => ({ name: w.name, cost: w.cost || "-" }));
    }
    if (type === "Arma de Fogo") {
      return (equipmentCatalogs.firearmsDb || []).map((w: any) => ({
        name: w.name,
        cost: w.purchaseCost || w.sellCost || "-",
      }));
    }
    if (unit) {
      const eq: any = unit.equipment || {};
      if (type === "Armadura") {
        return (eq.armor || eq.armour || []).map((i: any) => ({
          name: i.name,
          cost: i.cost,
        }));
      }
      if (type === "Acessórios") {
        const misc = eq.miscellaneous || eq.accessories || eq.acessories || [];
        return misc.map((i: any) => ({ name: i.name, cost: i.cost }));
      }
    }
    return [];
  };

  const killUnit = (id: string) => {
    // Remove a figura e descarta os equipamentos
    removeWarbandFigure(id);
  };

  const promoteUnitToHero = (id: string) => {
    updateWarbandFigure(id, (fig: any) => ({
      ...fig,
      role: "Herói",
    }));
  };

  const promoteHeroToLeader = (id: string) => {
    updateWarbandFigure(id, (fig: any) => {
      if (!fig) return fig;

      const leaderSkill = {
        id: "líder",
        name: "Líder",
        description:
          "Essa figura pode ativar até 3 outras figuras a 8cm de distância dela. As figuras agem imediatamente após essa figura em qualquer ordem.",
        type: "Especial",
      };

      const hasLeaderSkill =
        (fig.skills || []).some(
          (s: any) => s?.name === "Líder" || s?.id === "líder"
        ) || false;

      const updatedSkills = hasLeaderSkill
        ? fig.skills || []
        : [...(fig.skills || []), leaderSkill];

      const leaderSpecialRule = {
        name: "Líder",
        description:
          "Essa figura pode ativar até 3 outras figuras a 8cm de distância dela. As figuras agem imediatamente após essa figura em qualquer ordem.",
      };

      const hasLeaderInSpecialRules =
        (fig.specialRules || []).some((r: any) => r?.name === "Líder") || false;

      const updatedSpecialRules = hasLeaderInSpecialRules
        ? fig.specialRules || []
        : [...(fig.specialRules || []), leaderSpecialRule];

      return {
        ...fig,
        role: "Líder",
        skills: updatedSkills,
        specialRules: updatedSpecialRules,
      };
    });
  };

  const exportJson = () => {
    const exportData = {
      name: warband.name,
      faction: warband.faction,
      notes: warband.notes,
      gold: warband.gold,
      wyrdstone: warband.wyrdstone,
      vault: warband.vault,
      units: editableUnits,
    };
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportData, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `${warband.name || "bando"}.json`;
    a.click();
  };

  const importFromFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed.units && Array.isArray(parsed.units)) {
          // Converte units de volta para figures
          const figures = parsed.units
            .map((u: EditableUnit) => u.figure)
            .filter(Boolean);
          setWarband({
            name: parsed.name || "",
            faction: parsed.faction,
            notes: parsed.notes || "",
            gold: parsed.gold || "500",
            wyrdstone: parsed.wyrdstone || "0",
            vault: parsed.vault || [],
            figures: figures,
          });
        } else {
          // Formato antigo - assume que já são figures
          setWarband({
            name: parsed.name || "",
            faction: parsed.faction,
            notes: parsed.notes || "",
            gold: parsed.gold || "500",
            wyrdstone: parsed.wyrdstone || "0",
            vault: parsed.vault || [],
            figures: parsed.figures || [],
          });
        }
      } catch {}
    };
    reader.readAsText(file);
  };

  // Filtros disponíveis para futuras seções (não usados no layout atual)

  const addEquipmentToUnit = (unit: EditableUnit, itemName: string) => {
    // Se o item está no vault, apenas equipa
    const vaultItem = resolvedVault.find((v: StashItem) => v.name === itemName);
    if (vaultItem) {
      handleEquipFromStashFlat(unit.id, itemName);
      return;
    }

    // Se não está no vault, precisa comprar primeiro
    // Busca o item nos catálogos para criar um StashItem válido
    const allEquipment: any[] = [
      ...(equipmentCatalogs.meleeDb || []),
      ...(equipmentCatalogs.rangedDb || []),
      ...(equipmentCatalogs.firearmsDb || []),
      ...(equipmentCatalogs.armorDb || []),
      ...(equipmentCatalogs.accessoriesDb || []),
      ...(equipmentCatalogs.remediesPoisonsDb || []),
    ];

    const baseEquipment = allEquipment.find(
      (e: any) => String(e.name || "").toLowerCase() === itemName.toLowerCase()
    );

    if (!baseEquipment) {
      toast.error(`Item "${itemName}" não encontrado nos catálogos.`);
      return;
    }

    // Cria StashItem mínimo para compra
    const purchaseItem: StashItem = {
      name: baseEquipment.name || itemName,
      category: baseEquipment.type || "",
      cost: String(baseEquipment.purchaseCost || baseEquipment.cost || "0"),
      data: baseEquipment,
    };

    // Compra o item
    handlePurchaseItem(purchaseItem, true);

    // Depois equipa (com delay para garantir que foi adicionado ao vault)
    setTimeout(() => {
      handleEquipFromStashFlat(unit.id, itemName);
    }, 100);
  };

  // Handlers para RosterUnitCard
  const handleStatMiscChange = (
    unitId: string,
    attribute: keyof RosterUnitStats,
    value: number
  ) => {
    const unit = editableUnits.find(u => u.id === unitId);
    if (!unit) return;
    // Nota: statBreakdown está em EditableUnit mas não na figure diretamente
    // Por enquanto, usamos handleFigureStatModifierChange do hook
    handleFigureStatModifierChange(unitId, attribute as string, "misc", value);
  };

  // Mapa facções e seleção
  const allFactions = useMemo(
    () => [
      {
        key: "mercenaries",
        label: "Mercenários",
        data: (mercenariesData || []) as any[],
      },
      {
        key: "sisters-of-sigmar",
        label: "Irmãs de Sigmar",
        data: (sistersData || []) as any[],
      },
      { key: "skaven", label: "Skaven", data: (skavenData || []) as any[] },
      {
        key: "beastman-raiders",
        label: "Saqueadores Homem-Fera",
        data: (beastmenData || []) as any[],
      },
      {
        key: "dwarf-treasure-hunters",
        label: "Caçadores de Tesouro Anões",
        data: (dwarfTreasureHuntersData || []) as any[],
      },
      {
        key: "cult-of-the-possessed",
        label: "Culto dos Possuídos",
        data: (cultPossessedData || []) as any[],
      },
      {
        key: "vampire-courts",
        label: "Cortes Vampíricas",
        data: (vampireCourtsData || []) as any[],
      },
      {
        key: "witch-hunters",
        label: "Caçadores de Bruxas",
        data: (witchHuntersData || []) as any[],
      },
      {
        key: "lizardmen",
        label: "Reptilianos",
        data: (lizardmenData || []) as any[],
      },
      { key: "orc-mob", label: "Horda Orc", data: orcMobData as any[] },
      { key: "goblins", label: "Goblins", data: goblinsData as any[] },
      {
        key: "sons-of-hashut",
        label: "Filhos de Hashut",
        data: sonsOfHashutData as any[],
      },
      {
        key: "carnival-of-chaos",
        label: "Circo do Caos",
        data: carnivalChaosData as any[],
      },
      {
        key: "dark-elf-corsairs",
        label: "Corsários Druchii",
        data: darkElfCorsairsData as any[],
      },
    ],
    [
      mercenariesData,
      sistersData,
      skavenData,
      beastmenData,
      dwarfTreasureHuntersData,
      cultPossessedData,
      vampireCourtsData,
      witchHuntersData,
      lizardmenData,
      orcMobData,
      goblinsData,
      sonsOfHashutData,
      carnivalChaosData,
      darkElfCorsairsData,
    ]
  );

  const selectedFaction = useMemo(
    () => allFactions.find(f => f.key === (warband.faction || "")),
    [allFactions, warband.faction]
  );

  // Rótulo extenso da facção na ficha
  const factionLabel = useMemo(() => {
    const found = allFactions.find(f => f.key === (warband.faction || ""));
    return found?.label || warband.faction || "";
  }, [allFactions, warband.faction]);

  // Elemento do modal de adicionar equipamento (evita IIFE dentro do JSX)
  const equipmentModalEl = (() => {
    if (!equipmentModal.open || !equipmentModal.unitId) return null;
    const unit = editableUnits.find(x => x.id === equipmentModal.unitId);
    if (!unit) return null;
    const eq = (unit.equipment || {}) as any;
    const eqNormalized: any = { ...eq };
    if (eq.acessories && !eq.miscellaneous)
      eqNormalized.miscellaneous = eq.acessories;
    if (eq.accessories && !eq.miscellaneous)
      eqNormalized.miscellaneous = eq.accessories;

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] border border-gray-700 rounded w-full max-w-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-white font-semibold">
              Adicionar Equipamento
            </div>
            <button
              className="text-gray-300 hover:text-white"
              onClick={() =>
                setEquipmentModal({
                  open: false,
                  unitId: undefined,
                  targetSubsection: undefined,
                })
              }
            >
              Fechar
            </button>
          </div>
          <div className="mb-3">
            <label className="text-xs text-gray-400 block mb-1">Tipo</label>
            {(() => {
              const slot = (
                equipmentModal.targetSubsection || ""
              ).toLowerCase();
              const isMelee = slot.startsWith("arma-corpo-a-corpo");
              const isRanged = slot.startsWith("arma-distancia");
              const isAcc = slot === "acessorios";
              const isArmorSlot =
                slot === "armadura" || slot === "elmo" || slot === "escudo";
              if (isMelee || isRanged || isAcc || isArmorSlot) {
                return (
                  <input
                    className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white w-full opacity-70"
                    value={
                      isMelee
                        ? "Arma Corpo a Corpo"
                        : isRanged
                          ? "Arma a Distância / Fogo"
                          : isAcc
                            ? "Acessórios / Remédios e Venenos"
                            : "Armadura"
                    }
                    readOnly
                  />
                );
              }
              return (
                <select
                  className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white w-full"
                  value={equipmentCategory || EQUIP_TYPES[0]}
                  onChange={e => {
                    setEquipmentCategory(e.target.value);
                    setSelectedEquipmentName("");
                  }}
                >
                  {EQUIP_TYPES.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              );
            })()}
          </div>
          <div className="mb-3">
            <label className="text-xs text-gray-400 block mb-1">Item</label>
            {(() => {
              const slot = (
                equipmentModal.targetSubsection || ""
              ).toLowerCase();
              let items: Array<{ name: string; cost?: string }> = [];
              if (slot.startsWith("arma-corpo-a-corpo")) {
                items = getGlobalItemsByType("Arma Corpo a Corpo", unit) as any;
              } else if (slot === "adaga-gratis") {
                items = (
                  getGlobalItemsByType("Arma Corpo a Corpo", unit) as any[]
                ).filter(
                  i =>
                    String(i.name).toLowerCase().includes("adaga") ||
                    String(i.name).toLowerCase().includes("dagger")
                );
              } else if (slot.startsWith("arma-distancia")) {
                const r = getGlobalItemsByType("Arma a Distância", unit) as any;
                const f = getGlobalItemsByType("Arma de Fogo", unit) as any;
                items = [...r, ...f];
              } else if (slot === "acessorios") {
                const a = getGlobalItemsByType("Acessórios", unit) as any;
                const rv = getGlobalItemsByType(
                  "Remédios e Venenos",
                  unit
                ) as any;
                items = [...a, ...rv];
              } else if (
                slot === "elmo" ||
                slot === "armadura" ||
                slot === "escudo"
              ) {
                const armorItems = getGlobalItemsByType(
                  "Armadura",
                  unit
                ) as any[];
                if (slot === "elmo") {
                  items = armorItems.filter(i => isHelmetName(i.name));
                } else if (slot === "escudo") {
                  items = armorItems.filter(i => isShieldName(i.name));
                } else {
                  items = armorItems.filter(
                    i => !isShieldName(i.name) && !isHelmetName(i.name)
                  );
                }
              } else {
                items = getGlobalItemsByType(
                  equipmentCategory || EQUIP_TYPES[0],
                  unit
                ) as any;
              }
              return (
                <select
                  className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white w-full"
                  value={selectedEquipmentName}
                  onChange={e => setSelectedEquipmentName(e.target.value)}
                  disabled={items.length === 0}
                >
                  <option value="">Selecionar item…</option>
                  {items.map(item => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              );
            })()}
          </div>
          <div className="border border-gray-700 rounded p-3 mb-3 bg-[#171717]">
            {(() => {
              const type = equipmentCategory || EQUIP_TYPES[0];
              const list = getGlobalItemsByType(type, unit) as Array<{
                name: string;
                cost?: string;
              }>;
              const selected = list.find(i => i.name === selectedEquipmentName);
              if (!selected) {
                return (
                  <div className="text-xs text-gray-400 text-center">
                    Selecione um item para visualizar
                  </div>
                );
              }

              let data: any = null;
              if (type === "Arma de Fogo") {
                data = (equipmentCatalogs.firearmsDb || []).find(
                  (w: any) => w.name === selected.name
                );
              } else if (type === "Arma Corpo a Corpo") {
                data = (equipmentCatalogs.meleeDb || []).find(
                  (w: any) => w.name === selected.name
                );
              } else if (type === "Arma a Distância") {
                data = (equipmentCatalogs.rangedDb || []).find(
                  (w: any) => w.name === selected.name
                );
              }

              if (!data) {
                return (
                  <div className="flex items-center justify-between">
                    <div className="text-gray-200">
                      <div className="text-sm font-semibold">
                        {selected.name}
                      </div>
                      {selected.cost && (
                        <div className="text-xs text-gray-400">
                          {selected.cost}
                        </div>
                      )}
                    </div>
                    <button
                      className="px-3 py-1 rounded bg-blue-900/40 border border-blue-500/40 text-white text-xs hover:bg-blue-900/60 disabled:opacity-50"
                      disabled={!selectedEquipmentName}
                      onClick={() => {
                        if (selectedEquipmentName) {
                          addEquipmentToUnit(unit, selectedEquipmentName);
                          setEquipmentModal({ open: false, unitId: undefined });
                        }
                      }}
                    >
                      Confirmar
                    </button>
                  </div>
                );
              }

              const cardProps = {
                name: data.name || selected.name,
                type: data.type || type,
                damageModifier: data.damageModifier || null,
                maxRange:
                  data.maxRange ||
                  (typeof data.maxRange === "number"
                    ? String(data.maxRange)
                    : null),
                exclusive: data.exclusive || null,
                cost: data.purchaseCost || data.cost || null,
                spaces: data.slots || null,
                strength: data.strength || null,
                armorBonus: data.armorBonus || null,
                movePenalty: data.movePenalty || null,
                requirements: data.requirements || null,
                rarity: data.rarity ?? null,
                availability: data.availability || null,
                effect: data.effect || null,
                specialRules: data.specialRules || null,
              } as any;

              return (
                <div>
                  <EquipmentCard {...cardProps} />
                  <div className="flex justify-end">
                    <button
                      className="px-3 py-1 rounded bg-blue-900/40 border border-blue-500/40 text-white text-xs hover:bg-blue-900/60 disabled:opacity-50"
                      disabled={!selectedEquipmentName}
                      onClick={() => {
                        if (selectedEquipmentName) {
                          addEquipmentToUnit(unit, selectedEquipmentName);
                          setEquipmentModal({ open: false, unitId: undefined });
                        }
                      }}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    );
  })();

  // Mostra loading enquanto authContext está carregando (exceto para bandos locais)
  const { loading: authLoading } = useAuth();
  if (authLoading && !isLocal) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Carregando usuário…</PageTitle>
              <div className="flex items-center justify-center py-12">
                <div className="h-10 w-10 rounded-full border-4 border-green-500/40 border-t-green-400 animate-spin" />
              </div>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Carregando bando…</PageTitle>
              <div className="flex items-center justify-center py-12">
                <div className="h-10 w-10 rounded-full border-4 border-green-500/40 border-t-green-400 animate-spin" />
              </div>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return <WarbandNotFoundPage />;
  }

  // Seções estáticas de navegação
  const navigationSections = [
    { id: "informacoes-bando", title: "Informações do Bando", level: 0 },
    { id: "estoque-bando", title: "Estoque do Bando", level: 0 },
    { id: "figuras-ativas", title: "Figuras", level: 0 },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <QuickNavigation sections={navigationSections} />
      {/* Aviso quando há versão mais recente no Firestore */}
      {hasNewerVersionInFirestore && !isLocal && (
        <div className="w-full bg-yellow-900/30 border-b border-yellow-600/50 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">⚠️</span>
              <div>
                <div className="text-white font-semibold">
                  Versão mais recente disponível no Firestore
                </div>
                <div className="text-yellow-300 text-sm">
                  Há uma versão mais atual na nuvem. Deseja atualizar?
                </div>
              </div>
            </div>
            <button
              onClick={updateFromFirestore}
              disabled={isLoading}
              className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-600/50 disabled:cursor-not-allowed text-white font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              {isLoading ? "Atualizando..." : "Atualizar"}
            </button>
          </div>
        </div>
      )}
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <div id="informacoes-bando">
              <PageTitle>Ficha do Bando</PageTitle>
            </div>

            {/* Exportar PDF (printer-friendly) */}
            {(() => {
              const handleExportPdf = () => {
                try {
                  const safe = (v: any): string =>
                    v === null || v === undefined ? "" : String(v);

                  const parseNumeric = (v: any): number => {
                    if (typeof v === "number") return v;
                    const s = v == null ? "" : String(v);
                    const m = s.match(/-?\d+/);
                    return m ? parseInt(m[0], 10) : 0;
                  };

                  const resolveModifier = (e: any): any => {
                    if (!e?.modifier || !e?.modifier?.name) return null;
                    const modNameLc = String(e.modifier.name).toLowerCase();
                    const allMods: any[] = [
                      ...(modifierCatalogs.meleeMods || []),
                      ...(modifierCatalogs.rangedMods || []),
                      ...(modifierCatalogs.firearmsMods || []),
                    ];
                    return (
                      allMods.find(
                        m => String(m.name).toLowerCase() === modNameLc
                      ) || e.modifier
                    );
                  };

                  const buildEquipmentName = (e: any): string => {
                    const baseName = safe(e?.name);
                    if (e?.modifier?.name) {
                      return `${baseName} (${safe(e.modifier.name)})`;
                    }
                    return baseName;
                  };

                  const buildEquipmentCards = (equiped: any[]): string => {
                    if (!equiped || equiped.length === 0) return "";
                    const cardsHtml = equiped
                      .map((e: any) => {
                        const mod = resolveModifier(e);
                        const equipName = buildEquipmentName(e);
                        const rules = Array.isArray(e?.specialRules)
                          ? e.specialRules
                              .map((r: any) => {
                                if (r?.label && r?.value)
                                  return `<div><strong>${safe(
                                    r.label
                                  )}:</strong> ${safe(r.value)}</div>`;
                                if (r?.term && r?.description)
                                  return `<div><strong>${safe(
                                    r.term
                                  )}:</strong> ${safe(r.description)}</div>`;
                                return "";
                              })
                              .join("")
                          : "";
                        const modEffect =
                          mod?.effect || e?.modifier?.effect || "";
                        const allRules = modEffect
                          ? rules +
                            `<div><strong>Modificador:</strong> ${safe(
                              modEffect
                            )}</div>`
                          : rules;

                        return `
                          <div class="equip-card">
                            <div class="equip-title">${equipName}</div>
                            <div class="equip-grid">
                              <div><strong>Tipo:</strong> ${safe(e?.type)}</div>
                              <div><strong>Custo:</strong> ${safe(
                                e?.purchaseCost || e?.cost
                              )}</div>
                              <div><strong>Espaços:</strong> ${safe(
                                e?.slots || e?.spaces
                              )}</div>
                              ${
                                e?.damageModifier != null
                                  ? `<div><strong>Mod. Dano:</strong> ${safe(
                                      e?.damageModifier
                                    )}</div>`
                                  : ""
                              }
                              ${
                                e?.armorBonus != null
                                  ? `<div><strong>Bônus Armadura:</strong> ${safe(
                                      e?.armorBonus
                                    )}</div>`
                                  : ""
                              }
                              ${
                                e?.movePenalty != null
                                  ? `<div><strong>Penal. Movimento:</strong> ${safe(
                                      e?.movePenalty
                                    )}</div>`
                                  : ""
                              }
                            </div>
                            ${
                              e?.effect
                                ? `<div><strong>Efeito:</strong> ${safe(
                                    e?.effect
                                  )}</div>`
                                : ""
                            }
                            ${allRules}
                          </div>
                        `;
                      })
                      .join("");
                    return `
                      <div class="equipment-section">
                        <div class="section-title">Cards de Equipamentos</div>
                        <div class="equip-grid-page">${cardsHtml}</div>
                      </div>
                    `;
                  };

                  const buildUnitHtml = (u: any): string => {
                    const fig = u?.figure || {};
                    const stats = u?.stats || {};
                    const skills = (fig.skills || [])
                      .map((s: any) => s?.name || s)
                      .filter(Boolean);
                    const spells = (fig.spells || [])
                      .map((s: any) => s?.name || s)
                      .filter(Boolean);
                    const injuries = (fig.injuries || [])
                      .map((i: any) => i?.name || i)
                      .filter(Boolean);
                    const advancements = (fig.advancements || [])
                      .map((a: any) => a?.name || a)
                      .filter(Boolean);
                    const equiped = (fig.equiped || [])
                      .map((e: any) => e?.name || e)
                      .filter(Boolean);
                    const equipedFull = (fig.equiped || []) as any[];

                    // Extrai special rules antes para poder usar no cálculo de movimento
                    const specialRules = Array.isArray(u?.abilities)
                      ? (u.abilities as any[])
                          .map((r: any) => ({
                            name: r?.name || "",
                            description: r?.description || "",
                          }))
                          .filter(r => r.name)
                      : Array.isArray((fig as any).specialRules)
                        ? ((fig as any).specialRules as any[])
                            .map((r: any) => ({
                              name: r?.name || "",
                              description: r?.description || "",
                            }))
                            .filter(r => r.name)
                        : [];

                    // Calcula armadura total incluindo bônus de equipamentos
                    let armourTotal = stats?.armour || 0;
                    let moveTotal = stats?.move || 0;
                    if (equipedFull && equipedFull.length > 0) {
                      let equipmentArmorBonus = 0;
                      let equipmentMovementPenalty = 0;

                      // Verifica se a figura tem a regra especial "Devagar e Sempre" ou "Crueldade Paciente"
                      const hasIgnoreMovementPenalty = specialRules.some(
                        (rule: any) =>
                          rule?.name === "Devagar e Sempre" ||
                          rule?.name === "Crueldade Paciente"
                      );

                      for (const equip of equipedFull) {
                        equipmentArmorBonus += parseNumeric(equip.armorBonus);
                        // Apenas aplica penalidade se não tiver a regra especial
                        if (!hasIgnoreMovementPenalty) {
                          equipmentMovementPenalty += parseNumeric(
                            equip.movePenalty
                          );
                        }
                      }
                      armourTotal = Math.min(
                        armourTotal + equipmentArmorBonus,
                        17
                      );
                      moveTotal = Math.max(
                        moveTotal + equipmentMovementPenalty,
                        0
                      );
                    }
                    const finalStats = {
                      ...stats,
                      armour: armourTotal,
                      move: moveTotal,
                    };

                    const specialAbilities = [
                      ...(Array.isArray(fig.nurgleBlessings)
                        ? fig.nurgleBlessings
                        : []),
                      ...(Array.isArray(fig.mutations) ? fig.mutations : []),
                      ...(Array.isArray(fig.sacredMarks)
                        ? fig.sacredMarks
                        : []),
                    ]
                      .map((a: any) => a?.name || a)
                      .filter(Boolean);

                    return `
                      <div class="card">
                        <div class="card-header">
                          <div>
                            <div class="title">${
                              safe(fig?.narrativeName)
                                ? safe(fig?.narrativeName) + ", "
                                : ""
                            }${safe(u?.name)}</div>
                            <div class="subtitle">${safe(
                              u?.role || fig?.role || ""
                            )} ${safe(u?.quantity || "")}</div>
                          </div>
                          <div class="right-info">
                            <div><strong>Facção:</strong> ${safe(
                              warband.faction || ""
                            )}</div>
                            <div><strong>Custo:</strong> ${safe(
                              finalStats?.cost
                            )}</div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <div class="section-title">Atributos</div>
                            <table class="table">
                              <tr><td>Movimento</td><td>${safe(
                                finalStats?.move
                              )}</td></tr>
                              <tr><td>Ímpeto</td><td>${safe(
                                finalStats?.fight
                              )}</td></tr>
                              <tr><td>Precisão</td><td>${safe(
                                finalStats?.shoot
                              )}</td></tr>
                              <tr><td>Armadura</td><td>${safe(
                                finalStats?.armour
                              )}</td></tr>
                              <tr><td>Vontade</td><td>${safe(
                                finalStats?.Vontade
                              )}</td></tr>
                              <tr><td>Vigor</td><td>${safe(
                                finalStats?.health
                              )}</td></tr>
                              ${
                                finalStats?.strength !== undefined
                                  ? `<tr><td>Força</td><td>${safe(
                                      finalStats?.strength
                                    )}</td></tr>`
                                  : ""
                              }
                            </table>
                          </div>
                          <div class="col">
                            <div class="section-title">Equipamentos</div>
                            <ul class="list">${
                              equiped
                                .map((n: string) => `<li>${n}</li>`)
                                .join("") || "<li>-</li>"
                            }</ul>
                            <div class="section-title">Habilidades</div>
                            <ul class="list">${
                              skills
                                .map((n: string) => `<li>${n}</li>`)
                                .join("") || "<li>-</li>"
                            }</ul>
                            <div class="section-title">Habilidades Especiais</div>
                            <ul class="list">${
                              specialAbilities
                                .map((n: string) => `<li>${n}</li>`)
                                .join("") || "<li>-</li>"
                            }</ul>
                          </div>
                          <div class="col">
                            <div class="section-title">Magias</div>
                            <ul class="list">${
                              spells
                                .map((n: string) => `<li>${n}</li>`)
                                .join("") || "<li>-</li>"
                            }</ul>
                            <div class="section-title">Ferimentos</div>
                            <ul class="list">${
                              injuries
                                .map((n: string) => `<li>${n}</li>`)
                                .join("") || "<li>-</li>"
                            }</ul>
                          </div>
                        </div>
                        ${
                          advancements && advancements.length
                            ? `
                        <div class="section-title">Avanços</div>
                        <ul class="list">${advancements
                          .map((n: string) => `<li>${n}</li>`)
                          .join("")}</ul>
                        `
                            : ""
                        }
                        ${
                          specialRules.length
                            ? `
                        <div class="section-title">Regras Especiais</div>
                        <div class="rules-block">
                          ${specialRules
                            .map(
                              r =>
                                `<div class="rule-item"><strong>${safe(
                                  r.name
                                )}:</strong> ${safe(r.description)}</div>`
                            )
                            .join("")}
                        </div>`
                            : ""
                        }
                      </div>
                      ${buildEquipmentCards(equipedFull)}
                    `;
                  };

                  const buildAllDetailPages = (): string => {
                    const blocks: string[] = [];
                    editableUnits.forEach((u: any) => {
                      const fig = u?.figure || {};
                      const unitName = safe(u?.name);
                      const unitRole = safe(u?.role || fig?.role || "");

                      // Habilidades
                      const skills = (fig.skills || []).map((s: any) => ({
                        name: s?.name || s,
                        description: s?.description || "",
                      }));
                      const skillsHtml = skills.length
                        ? skills
                            .map(
                              (k: any) => `
                              <div class="equip-card">
                                <div class="equip-title">${safe(k.name)}</div>
                                <div>${safe(k.description)}</div>
                              </div>`
                            )
                            .join("")
                        : '<div class="muted">Sem habilidades</div>';

                      // Magias
                      const spells = (fig.spells || []).map((s: any) => ({
                        name: s?.name || s,
                        effect: s?.effect || "",
                        cn: s?.castingNumber || s?.cn || "",
                        keywords: Array.isArray(s?.keywords) ? s.keywords : [],
                      }));
                      const spellsHtml = spells.length
                        ? spells
                            .map(
                              (sp: any) => `
                              <div class="equip-card">
                                <div class="equip-title">${safe(sp.name)}</div>
                                <div><strong>CD:</strong> ${safe(
                                  String(sp.cn)
                                )}</div>
                                ${
                                  Array.isArray(sp.keywords) &&
                                  sp.keywords.length
                                    ? `<div><strong>Palavras-chave:</strong> ${sp.keywords
                                        .map((x: any) => safe(x))
                                        .join(", ")}</div>`
                                    : ""
                                }
                                <div>${safe(sp.effect)}</div>
                              </div>`
                            )
                            .join("")
                        : '<div class="muted">Sem magias</div>';

                      // Habilidades Especiais
                      const specialAbilities = [
                        ...(Array.isArray(fig.nurgleBlessings)
                          ? fig.nurgleBlessings
                          : []),
                        ...(Array.isArray(fig.mutations) ? fig.mutations : []),
                        ...(Array.isArray(fig.sacredMarks)
                          ? fig.sacredMarks
                          : []),
                      ].map((a: any) => ({
                        name: a?.name || a,
                        description: a?.description || "",
                      }));
                      const specHtml = specialAbilities.length
                        ? specialAbilities
                            .map(
                              a => `
                              <div class="equip-card">
                                <div class="equip-title">${safe(a.name)}</div>
                                <div>${safe(a.description)}</div>
                              </div>`
                            )
                            .join("")
                        : '<div class="muted">Sem habilidades especiais</div>';

                      blocks.push(`
                        <div class="page-break"></div>
                        <div class="card">
                          <div class="card-header">
                            <div class="title">Cartas de ${unitName}</div>
                            <div class="subtitle">${unitRole}</div>
                          </div>
                          <div class="section-title">Habilidades</div>
                          <div class="equip-grid-page">${skillsHtml}</div>
                          <div class="section-title">Magias</div>
                          <div class="equip-grid-page">${spellsHtml}</div>
                          <div class="section-title">Habilidades Especiais</div>
                          <div class="equip-grid-page">${specHtml}</div>
                        </div>
                      `);
                    });
                    return blocks.join("");
                  };

                  // Todos os cards de figura juntos primeiro
                  const unitsHtml = editableUnits
                    .map((u: any) => buildUnitHtml(u))
                    .join("");

                  // Depois todos os detalhes agrupados
                  const detailPagesHtml = buildAllDetailPages();

                  const html = `<!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <title>${safe(warband.name || "Bando")}</title>
                        <style>
                          @media print {
                            .page-break { page-break-before: always; }
                          }
                          body { background: #ffffff; color: #000; font-family: Arial, Helvetica, sans-serif; margin: 20px; }
                          .header { margin-bottom: 16px; }
                          .header .h1 { font-size: 22px; font-weight: 700; }
                          .muted { color: #333; }
                          .card { border: 1px solid #000; padding: 12px; margin-bottom: 16px; background: #fff; }
                          .card-header { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #000; padding-bottom: 6px; margin-bottom: 8px; }
                          .title { font-size: 18px; font-weight: 700; }
                          .subtitle { font-size: 12px; }
                          .row { display: flex; gap: 12px; }
                          .col { flex: 1; }
                          .section-title { font-weight: 700; margin: 8px 0 4px; border-bottom: 1px solid #000; }
                          .section-separator { page-break-before: always; margin: 20px 0; }
                          .section-header { font-size: 20px; font-weight: 700; text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; }
                          .equipment-section { margin-top: 12px; }
                          .table { width: 100%; border-collapse: collapse; }
                          .table td { border-bottom: 1px solid #000; padding: 2px 4px; font-size: 12px; }
                          .list { margin: 0; padding-left: 16px; font-size: 12px; }
                          .rules-block { margin-top: 8px; font-size: 12px; }
                          .rule-item { margin-bottom: 4px; }
                          .equip-grid-page { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 8px; }
                          .equip-card { border: 1px solid #000; padding: 8px; background: #fff; }
                          .equip-title { font-weight: 700; margin-bottom: 4px; }
                          .equip-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 4px; font-size: 12px; }
                        </style>
                      </head>
                      <body>
                        <div class="header">
                          <div class="h1">${safe(warband.name || "Bando")}</div>
                          <div><strong>Facção:</strong> ${safe(
                            warband.faction || ""
                          )} &nbsp; | &nbsp; <strong>Warband Rating:</strong> ${safe(
                            String(warbandRating)
                          )}</div>
                          <div><strong>Coroas:</strong> ${safe(
                            warband.gold || "0"
                          )} &nbsp; | &nbsp; <strong>Pedra-Bruxa:</strong> ${safe(
                            warband.wyrdstone || "0"
                          )}</div>
                        </div>
                        ${unitsHtml}
                        <div class="page-break"></div>
                        <div class="section-separator">
                          <h2 class="section-header">Cartas Detalhadas de Habilidades e Magias</h2>
                        </div>
                        ${detailPagesHtml}
                        <script>
                          window.onload = function() {
                            setTimeout(function(){ window.print(); }, 100);
                          };
                        </script>
                      </body>
                    </html>`;

                  const w = window.open("", "_blank");
                  if (!w) return;
                  w.document.open();
                  w.document.write(html);
                  w.document.close();
                } catch (e) {
                  // eslint-disable-next-line no-console
                  console.error(e);
                }
              };

              const handleShare = async () => {
                try {
                  // Cria snapshot do warband
                  const payloadRaw: any = {
                    name: warband.name,
                    faction: warband.faction,
                    notes: warband.notes ?? "",
                    gold: warband.gold ?? "0",
                    wyrdstone: warband.wyrdstone ?? "0",
                    vault: (warband.vault || []).map((e: any) =>
                      stripUndefinedDeep(e)
                    ),
                    figures: (warband.figures || []).map((f: any) =>
                      stripUndefinedDeep(f)
                    ),
                    ownerName:
                      currentUser?.displayName ||
                      currentUser?.email ||
                      "Usuário",
                    createdAt: new Date(),
                  };
                  const payload = stripUndefinedDeep(payloadRaw);

                  const col = collection(db, "warband-snapshots");
                  const docRef = await addDoc(col, payload);

                  const shareUrl = `${window.location.origin}/share/warband/${docRef.id}`;

                  // Copia para clipboard
                  await navigator.clipboard.writeText(shareUrl);

                  toast.success("Link copiado para a área de transferência!");
                } catch (e) {
                  console.error("Erro ao compartilhar bando:", e);
                  toast.error("Erro ao compartilhar bando. Tente novamente.");
                }
              };

              return (
                <div className="mt-4 mb-4 flex gap-3">
                  <button
                    onClick={handleExportPdf}
                    className="px-4 py-2 rounded bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white transition-colors duration-200 font-semibold"
                  >
                    📄 Exportar PDF (Printer-friendly)
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 rounded bg-blue-900/20 border border-blue-500/40 hover:bg-blue-800/30 hover:border-blue-400/60 text-white transition-colors duration-200 font-semibold"
                  >
                    🔗 Compartilhar Bando
                  </button>
                </div>
              );
            })()}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-300">Nome do Bando</span>
                <input
                  className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white"
                  value={warband.name}
                  onChange={e => {
                    updateWarbandProperty("name", e.target.value);
                  }}
                  placeholder="Ex.: Circo do Caos"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-300">Facção</span>
                <div className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white opacity-90 select-none">
                  {factionLabel}
                </div>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-gray-300">Coroas</span>
                  <input
                    className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white"
                    value={warband.gold || "0"}
                    onChange={e => {
                      updateWarbandProperty("gold", e.target.value);
                    }}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm text-gray-300">Pedra-Bruxa</span>
                  <input
                    className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white"
                    value={warband.wyrdstone || "0"}
                    onChange={e => {
                      updateWarbandProperty("wyrdstone", e.target.value);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2">
                <span className="text-sm text-gray-300">Warband Rating:</span>
                <span
                  className="text-lg font-bold"
                  style={{ color: "#8fbc8f" }}
                >
                  {warbandRating}
                </span>
              </div>
              {lastUpdatedAt && (
                <div className="inline-flex items-center gap-2 bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2">
                  <span className="text-sm text-gray-300">
                    Última atualização:
                  </span>
                  <span className="text-sm text-gray-400">{lastUpdatedAt}</span>
                </div>
              )}
            </div>

            <label className="flex flex-col gap-2 mt-4">
              <span className="text-sm text-gray-300">Anotações</span>
              <textarea
                className="bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2 text-white min-h-[100px]"
                value={warband.notes || ""}
                onChange={e => {
                  updateWarbandProperty("notes", e.target.value);
                }}
                placeholder="Notas gerais do bando, progresso da campanha etc."
              />
            </label>

            <div className="mt-6 border-t border-gray-700 pt-6">
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                Adicionar Figura do Bando
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <select
                  className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1 w-full sm:w-auto"
                  value={selectedFactionUnitId}
                  onChange={e => setSelectedFactionUnitId(e.target.value)}
                >
                  <option value="">Selecionar figura do bando...</option>
                  {selectedFaction?.data?.map((u: any) => (
                    <option key={u.id} value={u.id}>
                      {u.name} - {u.role || "Soldado"} - {u.stats.cost}
                    </option>
                  ))}
                </select>
                <button
                  className="px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto whitespace-nowrap"
                  disabled={!selectedFactionUnitId}
                  onClick={() => {
                    const base = selectedFaction?.data?.find(
                      (u: any) => u.id === selectedFactionUnitId
                    );
                    addFigureFromBase(base);
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* Adicionar Mercenários */}
            <div className="mt-6 border-t border-gray-700 pt-6">
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                Adicionar Mercenário
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <select
                  className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1 w-full sm:w-auto"
                  value={selectedMercId}
                  onChange={e => setSelectedMercId(e.target.value)}
                >
                  <option value="">Selecionar mercenário...</option>
                  {globalMercenaries.map((u: any) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <button
                  className="px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto whitespace-nowrap"
                  disabled={!selectedMercId}
                  onClick={() => {
                    const base = globalMercenaries.find(
                      (u: any) => u.id === selectedMercId
                    );
                    addFigureFromBase(base);
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* Adicionar Lendas */}
            <div className="mt-6 border-t border-gray-700 pt-6">
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "#8fbc8f" }}
              >
                Adicionar Lenda
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <select
                  className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1 w-full sm:w-auto"
                  value={selectedLegendId}
                  onChange={e => setSelectedLegendId(e.target.value)}
                >
                  <option value="">Selecionar lenda...</option>
                  {globalLegends.map((u: any) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <button
                  className="px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto whitespace-nowrap"
                  disabled={!selectedLegendId}
                  onClick={() => {
                    const base = globalLegends.find(
                      (u: any) => u.id === selectedLegendId
                    );
                    addFigureFromBase(base);
                  }}
                >
                  Adicionar
                </button>
              </div>
            </div>

            {/* Cofre do Bando (unificado com vault) */}
            <div id="estoque-bando">
              <WarbandStash
                stash={resolvedVault}
                gold={warband.gold || "0"}
                onPurchase={handlePurchaseItem}
                onSell={index => {
                  const vaultItem = resolvedVault[index];
                  const vault = (warband.vault || []) as any[];
                  const equipment = vault[index];
                  if (!equipment || !vaultItem) return;

                  // Calcula custo usando dados resolvidos
                  const baseCostStr = String(vaultItem.cost || "0");
                  const baseCostMatch = baseCostStr.match(/(\d+(?:\.\d+)?)/);
                  const baseCost = baseCostMatch
                    ? parseFloat(baseCostMatch[1])
                    : 0;

                  const modifier = vaultItem.data?.modifier;
                  const modifierFixedCost = vaultItem.data?.modifierFixedCost;

                  let originalCost = baseCost;
                  if (modifierFixedCost != null) {
                    originalCost = modifierFixedCost;
                  } else if (modifier?.purchaseCost) {
                    // Resolve expressão do modificador
                    const expr = String(modifier.purchaseCost)
                      .toLowerCase()
                      .replace(/\s+/g, "");
                    const mult = expr.match(/base\*(\d+(?:\.\d+)?)/);
                    const add = expr.match(/base\+(\d+(?:\.\d+)?)/);
                    if (mult) {
                      originalCost = baseCost * parseFloat(mult[1]);
                    } else if (add) {
                      originalCost = baseCost + parseFloat(add[1]);
                    }
                  }

                  // Vende por metade do custo original
                  const sellPrice = Math.floor(originalCost / 2);

                  // Adiciona ouro ao cofre
                  const currentGoldMatch = String(warband.gold || "0").match(
                    /(\d+)/
                  );
                  const currentGold = currentGoldMatch
                    ? parseInt(currentGoldMatch[1], 10)
                    : 0;
                  const newGold = currentGold + sellPrice;

                  // Remove item do cofre e atualiza ouro usando hooks (fila interna)
                  updateWarbandVault(v =>
                    v.filter((e: any) => e.id !== equipment.id)
                  );
                  updateWarbandProperty("gold", String(newGold));

                  toast.success(
                    `Item vendido! ${sellPrice} coroas adicionadas ao cofre.`
                  );
                }}
                onUndo={index => {
                  const vaultItem = resolvedVault[index];
                  const vault = (warband.vault || []) as any[];
                  const equipment = vault[index];
                  if (!equipment || !vaultItem) return;

                  // Calcula custo usando dados resolvidos
                  const baseCostStr = String(vaultItem.cost || "0");
                  const baseCostMatch = baseCostStr.match(/(\d+(?:\.\d+)?)/);
                  const baseCost = baseCostMatch
                    ? parseFloat(baseCostMatch[1])
                    : 0;

                  const modifier = vaultItem.data?.modifier;
                  const modifierFixedCost = vaultItem.data?.modifierFixedCost;

                  let originalCost = baseCost;
                  if (modifierFixedCost != null) {
                    originalCost = modifierFixedCost;
                  } else if (modifier?.purchaseCost) {
                    // Resolve expressão do modificador
                    const expr = String(modifier.purchaseCost)
                      .toLowerCase()
                      .replace(/\s+/g, "");
                    const mult = expr.match(/base\*(\d+(?:\.\d+)?)/);
                    const add = expr.match(/base\+(\d+(?:\.\d+)?)/);
                    if (mult) {
                      originalCost = baseCost * parseFloat(mult[1]);
                    } else if (add) {
                      originalCost = baseCost + parseFloat(add[1]);
                    }
                  }

                  // Desfazer devolve o valor INTEGRAL do item
                  const refundAmount = Math.floor(originalCost);

                  // Adiciona ouro ao cofre
                  const currentGoldMatch = String(warband.gold || "0").match(
                    /(\d+)/
                  );
                  const currentGold = currentGoldMatch
                    ? parseInt(currentGoldMatch[1], 10)
                    : 0;
                  const newGold = currentGold + refundAmount;

                  // Remove item do cofre e atualiza ouro usando hooks (fila interna)
                  updateWarbandVault(v =>
                    v.filter((e: any) => e.id !== equipment.id)
                  );
                  updateWarbandProperty("gold", String(newGold));

                  toast.success(
                    `Item desfeito! ${refundAmount} coroas adicionadas ao cofre.`
                  );
                }}
                onRemoveVaultItemById={id => {
                  updateWarbandVault(v => v.filter((e: any) => e.id !== id));
                }}
                factionKey={warband.faction || ""}
                factionLabel={factionLabel}
              />
            </div>

            <div className="flex gap-3 mt-4 flex-wrap">
              <label className="px-4 py-2 rounded bg-blue-900/40 border border-blue-500/40 text-white hover:bg-blue-900/60 cursor-pointer">
                Importar JSON
                <input
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) importFromFile(file);
                  }}
                />
              </label>
              <button
                onClick={exportJson}
                className="px-4 py-2 rounded bg-gray-700 border border-gray-500 text-white hover:bg-gray-600"
              >
                Exportar JSON
              </button>
              <button
                onClick={() => {
                  setWarband({
                    name: "",
                    faction: fixedFaction || "",
                    notes: "",
                    gold: "500",
                    wyrdstone: "0",
                    vault: [],
                    figures: [],
                  });
                  setHasUnsavedChanges(true);
                }}
                className="px-4 py-2 rounded bg-red-900/40 border border-red-500/40 text-white hover:bg-red-900/60"
              >
                Limpar
              </button>
            </div>

            <div id="figuras-ativas" className="mt-8">
              <HeaderH1>Figuras</HeaderH1>
              <div className="mt-2 inline-flex items-center gap-2 bg-[#1f1f1f] border border-gray-600 rounded px-3 py-2">
                <span className="text-sm text-gray-300">Warband Rating:</span>
                <span
                  className="text-lg font-bold"
                  style={{ color: "#8fbc8f" }}
                >
                  {warbandRating}
                </span>
              </div>
              <MobileText className="text-sm text-gray-400 mb-3">
                Gerencie suas figuras do bando usando os cards abaixo.
              </MobileText>

              {(() => {
                // Função para ordenar unidades na ordem: Líder, Lendas, Heróis, Mercenários, Soldados
                const getRoleOrder = (
                  role: string | undefined,
                  name: string | undefined
                ): number => {
                  const roleLower = (role || "").toString().toLowerCase();
                  const nameLower = (name || "").toString().toLowerCase();

                  // 1. Líder
                  if (roleLower === "líder" || roleLower === "lider") return 1;

                  // 2. Lendas
                  if (roleLower === "lenda" || roleLower.includes("lenda")) {
                    return 2;
                  }

                  // 3. Heróis
                  if (
                    roleLower === "héroi" ||
                    roleLower === "heroi" ||
                    roleLower === "herói" ||
                    roleLower.includes("héroi") ||
                    roleLower.includes("heroi")
                  ) {
                    return 3;
                  }

                  // 4. Mercenários (verifica role e nome)
                  if (
                    roleLower.includes("mercen") ||
                    roleLower.includes("mercenário") ||
                    nameLower.includes("mercen")
                  ) {
                    return 4;
                  }

                  // 5. Soldados (padrão)
                  if (
                    roleLower === "soldado" ||
                    roleLower === "" ||
                    !roleLower
                  ) {
                    return 5;
                  }

                  // 6. Outros roles vão para o final
                  return 6;
                };

                const sortUnits = (units: EditableUnit[]) => {
                  return [...units].sort((a, b) => {
                    const roleA = a.role || (a as any)?.figure?.role || "";
                    const roleB = b.role || (b as any)?.figure?.role || "";
                    const nameA = a.name || "";
                    const nameB = b.name || "";

                    const orderA = getRoleOrder(roleA, nameA);
                    const orderB = getRoleOrder(roleB, nameB);

                    // Se a ordem for diferente, ordena pela ordem
                    if (orderA !== orderB) {
                      return orderA - orderB;
                    }

                    // Se ambas são Heróis (order 3), ordena por starting XP (decrescente - maior primeiro)
                    if (orderA === 3 && orderB === 3) {
                      const startingXpA =
                        a.stats?.startingXp ??
                        (a as any)?.figure?.xp ??
                        (a as any)?.figure?.baseStats?.startingXp ??
                        0;
                      const startingXpB =
                        b.stats?.startingXp ??
                        (b as any)?.figure?.xp ??
                        (b as any)?.figure?.baseStats?.startingXp ??
                        0;

                      // Ordena por XP decrescente (maior primeiro)
                      if (startingXpB !== startingXpA) {
                        return startingXpB - startingXpA;
                      }
                    }

                    // Para outras categorias ou se o XP for igual, ordena por nome
                    return nameA.localeCompare(nameB, "pt-BR");
                  });
                };

                const active = sortUnits(
                  editableUnits.filter(
                    (u: any) => !Boolean(u?.figure?.inactive)
                  )
                );
                const inactive = sortUnits(
                  editableUnits.filter((u: any) => Boolean(u?.figure?.inactive))
                );

                const renderList = (list: EditableUnit[]) => (
                  <div className="space-y-6">
                    {list.map(u => {
                      // equippedItems não é mais usado - mantido apenas para compatibilidade
                      const equipped = u.equippedItems || {
                        acessorios: [],
                      };
                      // Combina u.stats com figure.baseStats para criar baseStats completo
                      const figure = u.figure as any;
                      const combinedStats = {
                        ...(figure?.baseStats || {}),
                        ...u.stats,
                      } as UnitStats;
                      const rosterStats = createRosterStats(
                        combinedStats,
                        u.statBreakdown
                      );

                      const isMenuOpen = openMenus.has(u.id);
                      const toggleMenu = () => {
                        const newSet = new Set(openMenus);
                        if (isMenuOpen) {
                          newSet.delete(u.id);
                        } else {
                          newSet.add(u.id);
                        }
                        setOpenMenus(newSet);
                      };

                      return (
                        <div
                          key={u.id}
                          id={
                            !Boolean((u as any)?.figure?.inactive)
                              ? `figura-ativa-${u.id}`
                              : `figura-inativa-${u.id}`
                          }
                          className="relative"
                        >
                          <div className="absolute top-2 right-2 z-10">
                            <div
                              className="relative"
                              ref={el => {
                                menuRefs.current[u.id] = el;
                              }}
                            >
                              <button
                                onClick={toggleMenu}
                                className="px-3 py-1 rounded bg-gray-700 border border-gray-500 text-white hover:bg-gray-600 text-xs flex items-center gap-1"
                                title="Menu de ações"
                              >
                                <span>⚙</span>
                                <span>Ações</span>
                              </button>
                              {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] border border-gray-600 rounded shadow-lg z-50">
                                  <div className="py-1">
                                    {(() => {
                                      const roleValue =
                                        u.role ||
                                        (u as any)?.figure?.role ||
                                        "";
                                      const roleStr = roleValue
                                        .toString()
                                        .toLowerCase();
                                      const nameStr = (u.name || "")
                                        .toString()
                                        .toLowerCase();
                                      const isMerc =
                                        roleStr.includes("mercen") ||
                                        nameStr.includes("mercen");
                                      const isSoldier = roleStr === "soldado";
                                      const isPromotable =
                                        (!roleStr || isSoldier) && !isMerc;
                                      // Verifica se é Herói de múltiplas formas
                                      const isHero =
                                        roleValue === "Héroi" ||
                                        roleValue === "Herói" ||
                                        roleStr === "héroi" ||
                                        roleStr === "heroi" ||
                                        roleStr.includes("héroi") ||
                                        roleStr.includes("heroi");
                                      return (
                                        <>
                                          {isPromotable ? (
                                            <button
                                              onClick={() => {
                                                promoteUnitToHero(u.id);
                                                toggleMenu();
                                              }}
                                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                            >
                                              <span>⭐</span>
                                              <span>Promover a Herói</span>
                                            </button>
                                          ) : null}
                                          {isHero ? (
                                            <button
                                              onClick={() => {
                                                promoteHeroToLeader(u.id);
                                                toggleMenu();
                                              }}
                                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                            >
                                              <span>👑</span>
                                              <span>Promover a Líder</span>
                                            </button>
                                          ) : null}
                                        </>
                                      );
                                    })()}
                                    <button
                                      onClick={() => {
                                        handleToggleInactive(u.id);
                                        toggleMenu();
                                      }}
                                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                    >
                                      <span>
                                        {Boolean((u as any)?.figure?.inactive)
                                          ? "✓"
                                          : "✗"}
                                      </span>
                                      <span>
                                        {Boolean((u as any)?.figure?.inactive)
                                          ? "Ativar"
                                          : "Inativar"}
                                      </span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        removeUnit(u.id);
                                        toggleMenu();
                                      }}
                                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center gap-2"
                                    >
                                      <span>↩️</span>
                                      <span>Desfazer</span>
                                    </button>
                                    <button
                                      onClick={() => {
                                        killUnit(u.id);
                                        toggleMenu();
                                      }}
                                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 flex items-center gap-2"
                                    >
                                      <span>💀</span>
                                      <span>Matar</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <RosterUnitCard
                            id={u.id}
                            name={u.name}
                            role={u.role}
                            quantity={u.quantity}
                            baseStats={combinedStats}
                            rosterStats={rosterStats}
                            lore={u.lore}
                            availability={u.availability}
                            qualidade={u.qualidade}
                            figure={u.figure as any}
                            factionId={warband.faction || fixedFaction}
                            factionFallbackData={(() => {
                              // Busca dados da facção nos dados carregados
                              const factionKey =
                                warband.faction || fixedFaction;
                              if (!factionKey) return undefined;

                              const factionDataMap: Record<string, any> = {
                                "sisters-of-sigmar": sistersData,
                                skaven: skavenData,
                                "beastman-raiders": beastmenData,
                                "dwarf-treasure-hunters":
                                  dwarfTreasureHuntersData,
                                "cult-of-the-possessed": cultPossessedData,
                                "vampire-courts": vampireCourtsData,
                                "witch-hunters": witchHuntersData,
                                lizardmen: lizardmenData,
                                "orc-mob": orcMobData,
                                goblins: goblinsData,
                                "sons-of-hashut": sonsOfHashutData,
                                mercenaries: mercenariesData,
                                "carnival-of-chaos": carnivalChaosData,
                                "dark-elf-corsairs": darkElfCorsairsData,
                              };

                              return factionDataMap[factionKey];
                            })()}
                            spellAffinity={u.spellAffinity}
                            abilities={u.abilities || []}
                            equipment={u.equipment}
                            equippedItems={equipped}
                            onPromoteHeroToLeader={
                              u.role === "Herói" ||
                              (u as any)?.figure?.role === "Herói"
                                ? () => promoteHeroToLeader(u.id)
                                : undefined
                            }
                            stashItems={
                              (warband.vault || []).map((e: any) => ({
                                name: e.name,
                                category: String(e.type || e.category || ""),
                                data: e,
                              })) as any
                            }
                            maxSlots={
                              Number(
                                (u.stats as any)?.equipmentSlots ??
                                  (u.stats as any)?.equipmentSpaces ??
                                  5
                              ) || 5
                            }
                            availableSkills={(u.stats.skills || []) as string[]}
                            selectedSkills={(u.figure as any)?.skills || []}
                            selectedAdvancements={
                              ((u.figure as any)?.advancements || []).map(
                                (a: any) => (typeof a === "string" ? a : a.name)
                              ) as string[]
                            }
                            onAddSkillCategory={cat =>
                              handleAddSkillCategoryToUnit(u.id, cat)
                            }
                            selectedSpells={(u.figure as any)?.spells || []}
                            onAddTradition={t =>
                              handleAddTraditionToUnit(u.id, t)
                            }
                            onAddSkill={skill =>
                              handleAddSkillToUnit(u.id, skill)
                            }
                            selectedInjuries={
                              ((u.figure as any)?.injuries || []).map(
                                (i: any) => (typeof i === "string" ? i : i.name)
                              ) as string[]
                            }
                            onAddInjury={i => handleAddInjuryToUnit(u.id, i)}
                            onRemoveInjury={(injuryName, idx) =>
                              handleRemoveInjuryFromUnit(u.id, injuryName, idx)
                            }
                            onRemoveSkill={skill =>
                              handleRemoveSkillFromUnit(u.id, skill)
                            }
                            onAddSpell={spell =>
                              handleAddSpellToUnit(u.id, spell)
                            }
                            onRemoveSpell={spellId =>
                              handleRemoveSpellFromUnit(u.id, spellId)
                            }
                            onChangeSpellCastingNumber={(spellId, newCN) =>
                              handleUpdateSpellCastingNumber(
                                u.id,
                                spellId,
                                newCN
                              )
                            }
                            onChangeNarrativeName={nv =>
                              handleUpdateNarrativeName(u.id, nv)
                            }
                            onChangeFigureXp={xp =>
                              handleUpdateFigureXp(u.id, xp)
                            }
                            onAddSpecialAbility={a =>
                              handleAddSpecialAbilityToUnit(u.id, a as any)
                            }
                            onRemoveSpecialAbility={(category, id) =>
                              handleRemoveSpecialAbilityFromUnit(
                                u.id,
                                category as any,
                                id
                              )
                            }
                            onStatMiscChange={(attribute, value) =>
                              handleStatMiscChange(u.id, attribute, value)
                            }
                            onEquipFromStashFlat={item =>
                              handleEquipFromStashFlat(u.id, item)
                            }
                            onUnequipToStashFlat={item =>
                              handleUnequipToStashFlat(u.id, item)
                            }
                            onAddAdvancement={a =>
                              handleAddAdvancementToUnit(u.id, a)
                            }
                            onRemoveAdvancement={(a, idx) =>
                              handleRemoveAdvancementFromUnit(u.id, a, idx)
                            }
                            onChangeFigureStatModifier={(
                              stat,
                              category,
                              value
                            ) =>
                              handleFigureStatModifierChange(
                                u.id,
                                stat as any,
                                category,
                                value
                              )
                            }
                            onToggleInactive={() => handleToggleInactive(u.id)}
                            onAddSpecialRule={specialRule =>
                              handleAddSpecialRuleToUnit(u.id, specialRule)
                            }
                            onRemoveSpecialRule={specialRuleName =>
                              handleRemoveSpecialRuleFromUnit(
                                u.id,
                                specialRuleName
                              )
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                );

                return (
                  <>
                    {active.length > 0 && renderList(active)}
                    {inactive.length > 0 && (
                      <div id="figuras-inativas" className="mt-10">
                        <HeaderH1>Inativos</HeaderH1>
                        {renderList(inactive)}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </MobileSection>
        </div>
      </div>
      {equipmentModalEl}

      {/* Banner de aviso durante salvamento */}
      {isSaving && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-600 text-white px-4 py-2 text-center text-sm md:text-base shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin">
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <span>
              Salvando alterações... Não feche ou recarregue a página.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default WarbandRosterPage;
