import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import {
  addItemToVault,
  updateVaultItem,
} from "../../services/warbands.service";
import type { EquipmentToVault } from "../../types/equipment-to-vault.entity";
import type { WarbandSoldier } from "../../types/warband-soldier.entity";
import type { EquipmentToWarbandSoldier } from "../../types/equipment-to-warband-soldier.entity";
import type { SkillToWarbandSoldier } from "../../types/skill-to-warband-soldier.entity";
import type { SpellToWarbandSoldier } from "../../types/spell-to-warband-soldier.entity";
import type { InjuryToWarbandSoldier } from "../../types/injury-to-warband-soldier.entity";
import type { SuperNaturalAbilityToWarbandSoldier } from "../../types/super-natural-ability-to-warband-soldier.entity";
import type { ExtraSkillListToWarbandSoldier } from "../../types/extra-skill-list-to-warband-soldier.entity";
import type { ExtraSpellLoreToWarbandSoldier } from "../../types/extra-spell-lore-to-warband-soldier.entity";
import type { AdvancementToWarbandSoldier } from "../../types/advancement-to-warband-soldier.entity";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import PageTitle from "../../components/PageTitle";
import type { BaseFigure } from "../../types/base-figure.entity";
import {
  fetchEquipmentCatalog,
  type EquipmentCatalogItem,
} from "../../services/equipment.service";
import {
  fetchSkillListBySlug,
  fetchSpellLoreBySlug,
  fetchSupernaturalAbilities,
} from "../../services/queries.service";
import ErrorBoundary from "../../components/ErrorBoundary";
import { Spinner } from "./warband-detail/components/CommonComponents";
import { useWarbandData } from "./warband-detail/hooks/useWarbandData";
import { useSoldierManagement } from "./warband-detail/hooks/useSoldierManagement";
import { AvailableFiguresSection } from "./warband-detail/components/AvailableFiguresSection";
import { VaultSection } from "./warband-detail/components/VaultSection";
import { SoldierListSection } from "./warband-detail/components/SoldierListSection";
import { SoldierDetailSection } from "./warband-detail/components/SoldierDetailSection";
import { EquipmentDialog } from "./warband-detail/components/EquipmentDialog";
import { SkillsDialog } from "./warband-detail/components/SkillsDialog";
import { SpellsDialog } from "./warband-detail/components/SpellsDialog";
import { VaultModal } from "./warband-detail/components/VaultModal";
import { MercenaryModal } from "./warband-detail/components/MercenaryModal";
import { LegendModal } from "./warband-detail/components/LegendModal";
import { SupernaturalDialog } from "./warband-detail/components/SupernaturalDialog";
import type {
  EquipmentSummary,
  FigureSummary,
  EquipmentCatalogFilter,
  SkillListDialogEntry,
  SpellLoreDialogEntry,
} from "./warband-detail/types";
import { getRoleType, formatDate } from "./warband-detail/utils/helpers";
import {
  extractSkillListSlugs,
  extractExtraSkillListSlugs,
  extractSpellLoreSlugs,
  extractExtraSpellLoreSlugs,
} from "./warband-detail/utils/helpers";
import {
  promoteSoldierToHero,
  promoteSoldierToLeader,
} from "../../services/soldiers.service";

type SoldierRelations = {
  equipment: EquipmentToWarbandSoldier[];
  skills: SkillToWarbandSoldier[];
  spells: SpellToWarbandSoldier[];
  advancements: AdvancementToWarbandSoldier[];
  injuries: InjuryToWarbandSoldier[];
  supernatural: SuperNaturalAbilityToWarbandSoldier[];
};

const getSoldierRelations = (
  soldier?: WarbandSoldier | null
): SoldierRelations => ({
  equipment: soldier?.equipment ?? [],
  skills: soldier?.skills ?? [],
  spells: soldier?.spells ?? [],
  advancements: soldier?.advancements ?? [],
  injuries: soldier?.injuries ?? [],
  supernatural: soldier?.supernaturalAbilities ?? [],
});

const WarbandDetailPage: React.FC = () => {
  const { warbandId } = useParams<{ warbandId: string }>();
  const { currentUser } = useAuth();

  const {
    warband,
    faction,
    loading,
    selectedSoldierId,
    setSelectedSoldierId,
    loadWarband,
  } = useWarbandData({ warbandId });

  const {
    addingFigureSlug,
    soldierAction,
    handleAddFigure,
    handleFireSoldier,
    handleKillSoldier,
    handleUndoSoldier,
  } = useSoldierManagement({
    warbandId: warbandId ?? null,
    onReload: () => loadWarband(warbandId!),
  });

  const [equipmentDialogOpen, setEquipmentDialogOpen] = useState(false);
  const [equipmentDialogItems, setEquipmentDialogItems] = useState<
    EquipmentSummary[]
  >([]);
  const [equipmentDialogTitle, setEquipmentDialogTitle] = useState<string>("");
  const [vaultModalOpen, setVaultModalOpen] = useState(false);
  const [equipmentCatalog, setEquipmentCatalog] = useState<
    EquipmentCatalogItem[]
  >([]);
  const [equipmentCatalogLoading, setEquipmentCatalogLoading] = useState(false);
  const [selectedCatalogSlug, setSelectedCatalogSlug] = useState<string>("");
  const [catalogFilter, setCatalogFilter] =
    useState<EquipmentCatalogFilter>("all");
  const [vaultActionLoading, setVaultActionLoading] = useState<
    "buy" | "loot" | null
  >(null);
  const [vaultItemAction, setVaultItemAction] = useState<{
    itemId: string;
    type: "buy" | "sell" | "undo";
  } | null>(null);
  const [expandedAvailableFigures, setExpandedAvailableFigures] = useState<
    Record<string, boolean>
  >({});
  const [skillsDialogOpen, setSkillsDialogOpen] = useState(false);
  const [skillsDialogTitle, setSkillsDialogTitle] = useState("");
  const [skillsDialogLoading, setSkillsDialogLoading] = useState(false);
  const [skillsDialogError, setSkillsDialogError] = useState<string | null>(
    null
  );
  const [skillsDialogLists, setSkillsDialogLists] = useState<
    SkillListDialogEntry[]
  >([]);
  const [skillsDialogSelectedSlug, setSkillsDialogSelectedSlug] = useState("");
  const [spellsDialogOpen, setSpellsDialogOpen] = useState(false);
  const [spellsDialogTitle, setSpellsDialogTitle] = useState("");
  const [spellsDialogLoading, setSpellsDialogLoading] = useState(false);
  const [spellsDialogError, setSpellsDialogError] = useState<string | null>(
    null
  );
  const [spellsDialogLores, setSpellsDialogLores] = useState<
    SpellLoreDialogEntry[]
  >([]);
  const [spellsDialogSelectedSlug, setSpellsDialogSelectedSlug] = useState("");
  const [mercenaryModalOpen, setMercenaryModalOpen] = useState(false);
  const [selectedMercenarySlug, setSelectedMercenarySlug] = useState("");
  const [mercenaryHireLoading, setMercenaryHireLoading] = useState(false);
  const [legendModalOpen, setLegendModalOpen] = useState(false);
  const [selectedLegendSlug, setSelectedLegendSlug] = useState("");
  const [legendHireLoading, setLegendHireLoading] = useState(false);
  const [supernaturalDialogOpen, setSupernaturalDialogOpen] = useState(false);
  const [supernaturalDialogTitle, setSupernaturalDialogTitle] = useState("");
  const [supernaturalDialogLoading, setSupernaturalDialogLoading] =
    useState(false);
  const [supernaturalDialogError, setSupernaturalDialogError] = useState<
    string | null
  >(null);
  const [supernaturalDialogAbilities, setSupernaturalDialogAbilities] =
    useState<
      Array<{
        slug: string;
        name: string;
        description?: string | null;
        cost?: string | number | null;
      }>
    >([]);
  const supernaturalDialogControllerRef = useRef<AbortController | null>(null);
  const [promoteHeroLoading, setPromoteHeroLoading] = useState(false);
  const [promoteLeaderLoading, setPromoteLeaderLoading] = useState(false);

  useEffect(() => {
    if (!vaultModalOpen) return;
    let abort = false;
    const controller = new AbortController();
    const loadCatalog = async () => {
      setEquipmentCatalogLoading(true);
      try {
        const catalog = await fetchEquipmentCatalog(controller.signal);
        if (!abort) {
          setEquipmentCatalog(catalog);
        }
      } catch (error) {
        if (!abort) {
          console.error(error);
          toast.error("Não foi possível carregar os equipamentos.");
        }
      } finally {
        if (!abort) {
          setEquipmentCatalogLoading(false);
        }
      }
    };
    void loadCatalog();
    return () => {
      abort = true;
      controller.abort();
    };
  }, [vaultModalOpen]);

  // Verificar se há mercenários disponíveis (já filtrados pelo backend)
  const hasAvailableMercenaries = useMemo(
    () => (warband?.mercenaries?.length ?? 0) > 0,
    [warband?.mercenaries]
  );

  // Verificar se há lendas disponíveis (já filtradas pelo backend)
  const hasAvailableLegends = useMemo(
    () => (warband?.legends?.length ?? 0) > 0,
    [warband?.legends]
  );

  // Atualizar selectedSlug quando o modal abrir
  useEffect(() => {
    if (
      mercenaryModalOpen &&
      warband?.mercenaries &&
      warband.mercenaries.length > 0
    ) {
      if (!warband.mercenaries.find(m => m.slug === selectedMercenarySlug)) {
        setSelectedMercenarySlug(warband.mercenaries[0].slug);
      }
    }
  }, [mercenaryModalOpen, warband?.mercenaries, selectedMercenarySlug]);

  useEffect(() => {
    if (legendModalOpen && warband?.legends && warband.legends.length > 0) {
      if (!warband.legends.find(l => l.slug === selectedLegendSlug)) {
        setSelectedLegendSlug(warband.legends[0].slug);
      }
    }
  }, [legendModalOpen, warband?.legends, selectedLegendSlug]);

  const vaultItems = useMemo<EquipmentToVault[]>(
    () => warband?.vault ?? [],
    [warband]
  );

  const soldiers = useMemo<WarbandSoldier[]>(
    () => warband?.warbandSoldiers ?? [],
    [warband]
  );

  const baseFigures = useMemo<FigureSummary[]>(
    () => faction?.figures ?? [],
    [faction]
  );

  const selectedSoldier = useMemo(
    () => soldiers.find(soldier => soldier.id === selectedSoldierId) ?? null,
    [soldiers, selectedSoldierId]
  );

  const selectedBaseFigure = useMemo<BaseFigure | null>(() => {
    const relation = selectedSoldier?.baseFigure?.[0];
    return relation?.baseFigure ?? null;
  }, [selectedSoldier]);

  const soldierExtraSkillLists = useMemo(
    () =>
      selectedSoldier?.extraSkillsLists ??
      selectedSoldier?.extraSkillLists ??
      [],
    [selectedSoldier]
  );

  const soldierExtraSpellLores = useMemo(
    () =>
      selectedSoldier?.extraSpellsLores ??
      selectedSoldier?.extraSpellLores ??
      [],
    [selectedSoldier]
  );

  const relations = useMemo(
    () => getSoldierRelations(selectedSoldier),
    [selectedSoldier]
  );

  const equipableVaultItems = useMemo(
    () => vaultItems.filter(item => Boolean(item.id)),
    [vaultItems]
  );

  const baseFigureGroups = useMemo(() => {
    const orderMap = {
      leader: 0,
      hero: 1,
      legend: 1.5,
      soldier: 2,
    } as const;

    const grouped = {
      leader: [] as FigureSummary[],
      hero: [] as FigureSummary[],
      legend: [] as FigureSummary[],
      soldier: [] as FigureSummary[],
    };

    baseFigures.forEach(figure => {
      const roleType = getRoleType(figure.role);
      grouped[roleType].push(figure);
    });

    const result = [
      { title: "Líder", items: grouped.leader },
      { title: "Heróis", items: grouped.hero },
      { title: "Lendas", items: grouped.legend },
      { title: "Soldados", items: grouped.soldier },
    ]
      .map(group => ({
        ...group,
        items: [...group.items].sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .filter(group => group.items.length > 0)
      .sort(
        (a, b) =>
          orderMap[getRoleType(a.items[0]?.role)] -
          orderMap[getRoleType(b.items[0]?.role)]
      );

    return result;
  }, [baseFigures]);

  const heroSkillOptions = useMemo(() => {
    const optionMap = new Map<string, string>();

    const extractOption = (entry: unknown) => {
      if (!entry) {
        return;
      }
      if (typeof entry === "string") {
        const slug = entry.trim();
        if (slug.length > 0 && !optionMap.has(slug)) {
          optionMap.set(slug, slug);
        }
        return;
      }
      if (typeof entry === "object") {
        const record = entry as Record<string, unknown>;
        const nested = record.skillList as Record<string, unknown> | undefined;
        const slug =
          (record.skillListSlug as string | undefined) ??
          (record.slug as string | undefined) ??
          (nested?.slug as string | undefined);
        const name =
          (record.name as string | undefined) ??
          (nested?.name as string | undefined) ??
          slug ??
          "";
        if (slug && slug.trim().length > 0) {
          optionMap.set(slug, name && name.trim().length > 0 ? name : slug);
        }
        return;
      }
    };

    baseFigures.forEach(figure => {
      const skillLists = figure.skillLists;
      if (Array.isArray(skillLists)) {
        skillLists.forEach(entry => extractOption(entry));
      }
    });

    return Array.from(optionMap.entries())
      .map(([slug, name]) => ({ slug, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [baseFigures]);

  const soldierGroups = useMemo(() => {
    const orderMap = {
      leader: 0,
      hero: 1,
      legend: 1.5,
      soldier: 2,
    } as const;

    const enriched = soldiers.map(soldier => {
      const baseFigureRelation = soldier.baseFigure?.[0];
      const baseFigure = baseFigureRelation?.baseFigure ?? null;
      const role =
        baseFigure?.role ??
        (soldier.effectiveRole ? String(soldier.effectiveRole) : null);
      return {
        soldier,
        baseFigure,
        role,
        roleType: getRoleType(role),
      };
    });

    const sorted = [...enriched].sort(
      (a, b) => orderMap[a.roleType] - orderMap[b.roleType]
    );

    const groups = {
      leader: [] as typeof enriched,
      hero: [] as typeof enriched,
      legend: [] as typeof enriched,
      soldier: [] as typeof enriched,
    };

    sorted.forEach(entry => {
      groups[entry.roleType].push(entry);
    });

    return [
      { title: "Líder", items: groups.leader },
      { title: "Heróis", items: groups.hero },
      { title: "Lendas", items: groups.legend },
      { title: "Soldados", items: groups.soldier },
    ].filter(group => group.items.length > 0);
  }, [soldiers]);

  const handleToggleAvailableFigure = useCallback((figureId: string) => {
    setExpandedAvailableFigures(prev => ({
      ...prev,
      [figureId]: !prev[figureId],
    }));
  }, []);

  const handleOpenEquipmentDialog = (
    figureName: string,
    items: EquipmentSummary[] | unknown[]
  ) => {
    setEquipmentDialogTitle(figureName);
    setEquipmentDialogItems(items as EquipmentSummary[]);
    setEquipmentDialogOpen(true);
  };

  const handleCloseEquipmentDialog = () => {
    setEquipmentDialogOpen(false);
    setEquipmentDialogItems([]);
  };

  const handleOpenVaultModal = () => {
    setVaultModalOpen(true);
  };

  const handleCloseVaultModal = () => {
    setVaultModalOpen(false);
    setSelectedCatalogSlug("");
    setVaultActionLoading(null);
  };

  const handleVaultAdd = async (loot: boolean) => {
    if (!warbandId || !selectedCatalogSlug) {
      toast.error("Selecione um equipamento válido antes de continuar.");
      return;
    }

    const selectedItem = equipmentCatalog.find(
      item => item.slug === selectedCatalogSlug
    );
    if (!selectedItem) {
      toast.error("Equipamento selecionado não encontrado.");
      return;
    }

    try {
      setVaultActionLoading(loot ? "loot" : "buy");
      await addItemToVault(
        warbandId,
        { equipmentSlug: selectedCatalogSlug },
        { loot }
      );
      toast.success(
        loot
          ? `Loot registrado para "${selectedItem.name}".`
          : `Equipamento "${selectedItem.name}" comprado para o cofre.`
      );
      await loadWarband(warbandId);
      setSelectedCatalogSlug("");
      setVaultModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(
        loot
          ? "Não foi possível registrar o loot no cofre."
          : "Não foi possível comprar o equipamento para o cofre."
      );
    } finally {
      setVaultActionLoading(null);
    }
  };

  const handleVaultRebuy = async (item: EquipmentToVault) => {
    if (!warbandId) return;

    const equipmentSlug = item.equipment?.slug ?? item.equipmentSlug ?? "";

    if (!equipmentSlug) {
      toast.error(
        "Não foi possível identificar o equipamento para comprar novamente."
      );
      return;
    }

    try {
      setVaultItemAction({ itemId: item.id, type: "buy" });
      await addItemToVault(warbandId, { equipmentSlug }, { loot: false });
      toast.success(
        `Equipamento "${
          item.equipment?.name ?? equipmentSlug
        }" comprado novamente.`
      );
      await loadWarband(warbandId);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível comprar o equipamento novamente.");
    } finally {
      setVaultItemAction(null);
    }
  };

  const handleVaultUpdate = async (
    item: EquipmentToVault,
    options: { sell: boolean }
  ) => {
    if (!warbandId) return;
    try {
      setVaultItemAction({
        itemId: item.id,
        type: options.sell ? "sell" : "undo",
      });
      await updateVaultItem(warbandId, item.id, {
        sell: options.sell,
      });
      toast.success(
        options.sell
          ? `Venda do item "${
              item.equipment?.name ?? item.equipmentSlug
            }" registrada.`
          : `Venda desfeita para "${
              item.equipment?.name ?? item.equipmentSlug
            }".`
      );
      await loadWarband(warbandId);
    } catch (error) {
      console.error(error);
      toast.error(
        options.sell
          ? "Não foi possível registrar a venda do item."
          : "Não foi possível desfazer a venda do item."
      );
    } finally {
      setVaultItemAction(null);
    }
  };

  const handleSelectSoldier = (soldierId: string) => {
    setSelectedSoldierId(soldierId);
  };

  const handleOpenSkillsDialog = useCallback(
    async (
      figureName: string,
      figureData: unknown,
      extraLists?: ExtraSkillListToWarbandSoldier[] | null
    ) => {
      const baseSlugs = extractSkillListSlugs(figureData);
      const extraSlugs = extractExtraSkillListSlugs(extraLists);
      const soldierSlugs = extractExtraSkillListSlugs(soldierExtraSkillLists);
      const combinedSlugs = Array.from(
        new Set([...baseSlugs, ...extraSlugs, ...soldierSlugs])
      ).filter(slug => slug.length > 0);

      if (combinedSlugs.length === 0) {
        toast.info("Esta figura não possui listas de habilidades disponíveis.");
        return;
      }

      setSkillsDialogTitle(`Habilidades disponíveis — ${figureName}`);
      setSkillsDialogError(null);
      setSkillsDialogLists([]);
      setSkillsDialogOpen(true);
      setSkillsDialogLoading(true);

      try {
        const entries = await Promise.all(
          combinedSlugs.map(async slug => {
            if (!slug) {
              return null;
            }
            try {
              const data = await fetchSkillListBySlug(slug);
              const entry: SkillListDialogEntry = {
                slug,
                name: data.name ?? slug,
                description: data.description ?? null,
                skills:
                  data.skills?.map(skill => ({
                    slug: skill.slug,
                    name: skill.name ?? skill.slug ?? "Habilidade",
                    description: skill.description ?? null,
                  })) ?? [],
              };
              return entry;
            } catch (error) {
              console.error(error);
              const fallback: SkillListDialogEntry = {
                slug,
                name: slug,
                description: null,
                skills: [],
              };
              return fallback;
            }
          })
        );

        const sanitized = entries.filter(
          (entry): entry is SkillListDialogEntry => entry !== null
        );

        setSkillsDialogLists(sanitized);
        setSkillsDialogSelectedSlug(sanitized[0]?.slug ?? "");
        if (sanitized.length === 0) {
          setSkillsDialogError(
            "Não foi possível carregar as habilidades desta figura."
          );
        }
      } catch (error) {
        console.error(error);
        setSkillsDialogLists([]);
        setSkillsDialogError(
          "Não foi possível carregar as habilidades desta figura."
        );
      } finally {
        setSkillsDialogLoading(false);
      }
    },
    [soldierExtraSkillLists]
  );

  const handleCloseSkillsDialog = () => {
    setSkillsDialogOpen(false);
    setSkillsDialogLists([]);
    setSkillsDialogError(null);
    setSkillsDialogSelectedSlug("");
  };

  const handleOpenSpellsDialog = useCallback(
    async (
      figureName: string,
      figureData: unknown,
      extraLores?: ExtraSpellLoreToWarbandSoldier[] | null
    ) => {
      const baseSlugs = extractSpellLoreSlugs(figureData);
      const extraSlugs = extractExtraSpellLoreSlugs(extraLores);
      const combinedSlugs = Array.from(
        new Set([
          ...baseSlugs,
          ...extraSlugs,
          ...extractExtraSpellLoreSlugs(soldierExtraSpellLores),
        ])
      ).filter(slug => slug.length > 0);

      if (combinedSlugs.length === 0) {
        toast.info("Esta figura não possui tradições mágicas disponíveis.");
        return;
      }

      setSpellsDialogTitle(`Magias disponíveis — ${figureName}`);
      setSpellsDialogError(null);
      setSpellsDialogLores([]);
      setSpellsDialogOpen(true);
      setSpellsDialogLoading(true);

      try {
        const entries = await Promise.all(
          combinedSlugs.map(async slug => {
            if (!slug) {
              return null;
            }
            try {
              const data = await fetchSpellLoreBySlug(slug);
              const entry: SpellLoreDialogEntry = {
                slug,
                name: data.name ?? slug,
                description: data.description ?? null,
                spells:
                  data.spells?.map(spell => ({
                    slug: spell.slug,
                    name: spell.name ?? spell.slug ?? "Magia",
                    description: spell.description ?? null,
                    difficultyClass: spell.difficultyClass ?? null,
                    keywords: spell.keywords ?? null,
                  })) ?? [],
              };
              return entry;
            } catch (error) {
              console.error(error);
              const fallback: SpellLoreDialogEntry = {
                slug,
                name: slug,
                description: null,
                spells: [],
              };
              return fallback;
            }
          })
        );

        const sanitized = entries.filter(
          (entry): entry is SpellLoreDialogEntry => entry !== null
        );

        setSpellsDialogLores(sanitized);
        setSpellsDialogSelectedSlug(sanitized[0]?.slug ?? "");
        if (sanitized.length === 0) {
          setSpellsDialogError(
            "Não foi possível carregar as magias desta figura."
          );
        }
      } catch (error) {
        console.error(error);
        setSpellsDialogLores([]);
        setSpellsDialogError(
          "Não foi possível carregar as magias desta figura."
        );
      } finally {
        setSpellsDialogLoading(false);
      }
    },
    [soldierExtraSpellLores]
  );

  const handleCloseSpellsDialog = () => {
    setSpellsDialogOpen(false);
    setSpellsDialogLores([]);
    setSpellsDialogError(null);
    setSpellsDialogSelectedSlug("");
  };

  const handleOpenSupernaturalDialog = useCallback(
    ({
      soldierId,
      category,
      figureName,
    }: {
      soldierId: string;
      category: "Mutação" | "Benção de Nurgle";
      figureName: string;
    }) => {
      setSelectedSoldierId(soldierId);
      setSupernaturalDialogTitle(`${category} disponíveis — ${figureName}`);
      setSupernaturalDialogOpen(true);
      setSupernaturalDialogLoading(true);
      setSupernaturalDialogError(null);
      setSupernaturalDialogAbilities([]);

      if (supernaturalDialogControllerRef.current) {
        supernaturalDialogControllerRef.current.abort();
      }

      const controller = new AbortController();
      supernaturalDialogControllerRef.current = controller;

      fetchSupernaturalAbilities(category, controller.signal)
        .then(abilities => {
          if (controller.signal.aborted) return;
          const mapped = abilities.map(ability => ({
            slug: ability.slug,
            name: ability.name ?? ability.slug,
            description: ability.description ?? null,
            cost: ability.cost ?? null,
          }));
          setSupernaturalDialogAbilities(mapped);
        })
        .catch(error => {
          if (controller.signal.aborted) {
            return;
          }
          console.error(error);
          setSupernaturalDialogError(
            `Não foi possível carregar ${category.toLowerCase()} disponíveis.`
          );
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setSupernaturalDialogLoading(false);
          }
        });
    },
    [setSelectedSoldierId]
  );

  const handleCloseSupernaturalDialog = useCallback(() => {
    if (supernaturalDialogControllerRef.current) {
      supernaturalDialogControllerRef.current.abort();
      supernaturalDialogControllerRef.current = null;
    }
    setSupernaturalDialogOpen(false);
    setSupernaturalDialogLoading(false);
    setSupernaturalDialogError(null);
    setSupernaturalDialogAbilities([]);
  }, []);

  const handlePromoteHero = useCallback(
    async (soldierId: string, skillsListSlugs: string[]) => {
      if (!warbandId) {
        toast.error("Identificador do bando não encontrado.");
        return;
      }
      if (skillsListSlugs.length !== 2) {
        toast.error(
          "Selecione duas listas de habilidades para promover o herói."
        );
        return;
      }
      setPromoteHeroLoading(true);
      try {
        await promoteSoldierToHero(soldierId, skillsListSlugs);
        toast.success("Figura promovida a Herói com sucesso!");
        await loadWarband(warbandId);
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível promover a figura a Herói.");
      } finally {
        setPromoteHeroLoading(false);
      }
    },
    [warbandId, loadWarband]
  );

  const handlePromoteLeader = useCallback(
    async (soldierId: string) => {
      if (!warbandId) {
        toast.error("Identificador do bando não encontrado.");
        return;
      }
      setPromoteLeaderLoading(true);
      try {
        await promoteSoldierToLeader(soldierId);
        toast.success("Figura promovida a Líder com sucesso!");
        await loadWarband(warbandId);
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível promover a figura a Líder.");
      } finally {
        setPromoteLeaderLoading(false);
      }
    },
    [warbandId, loadWarband]
  );

  const handleOpenMercenaryModal = () => {
    setMercenaryModalOpen(true);
  };

  const handleCloseMercenaryModal = () => {
    setMercenaryModalOpen(false);
    setSelectedMercenarySlug("");
  };

  const handleHireMercenary = useCallback(async () => {
    if (!selectedMercenarySlug || !warbandId || !warband?.mercenaries) return;
    const selectedMercenary = warband.mercenaries.find(
      m => m.slug === selectedMercenarySlug
    );
    const mercenaryName = selectedMercenary?.name ?? selectedMercenarySlug;
    try {
      setMercenaryHireLoading(true);
      await handleAddFigure(selectedMercenarySlug, mercenaryName);
      handleCloseMercenaryModal();
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível contratar o mercenário.");
    } finally {
      setMercenaryHireLoading(false);
    }
  }, [selectedMercenarySlug, warbandId, handleAddFigure, warband?.mercenaries]);

  const handleOpenLegendModal = () => {
    setLegendModalOpen(true);
  };

  const handleCloseLegendModal = () => {
    setLegendModalOpen(false);
    setSelectedLegendSlug("");
  };

  const handleHireLegend = useCallback(async () => {
    if (!selectedLegendSlug || !warbandId || !warband?.legends) return;
    const selectedLegend = warband.legends.find(
      l => l.slug === selectedLegendSlug
    );
    const legendName = selectedLegend?.name ?? selectedLegendSlug;
    try {
      setLegendHireLoading(true);
      await handleAddFigure(selectedLegendSlug, legendName);
      handleCloseLegendModal();
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível contratar a lenda.");
    } finally {
      setLegendHireLoading(false);
    }
  }, [selectedLegendSlug, warbandId, handleAddFigure, warband?.legends]);

  if (loading && !warband) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-[#121212] dark group/design-root">
        <div className="flex flex-1 items-center justify-center px-4 py-20">
          <Spinner label="Carregando dados do bando..." />
        </div>
      </div>
    );
  }

  if (!warband) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-[#121212] dark group/design-root">
        <div className="py-6">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <MobileSection>
              <PageTitle>Bando não encontrado</PageTitle>
              <MobileText>
                Não foi possível localizar este bando. Verifique se ele existe
                ou se você possui acesso.
              </MobileText>
              <Link
                to="/tools/warband-manager"
                className="mt-4 inline-flex rounded border border-green-500 px-4 py-2 text-sm font-semibold text-green-200 hover:bg-green-700/20"
              >
                Voltar ao Gerenciador
              </Link>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  const crowns = warband.crowns ?? 0;
  const wyrdstone = warband.wyrdstone ?? 0;
  const warbandOwnerName = warband.user?.name ?? currentUser?.name ?? "-";

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#121212] dark group/design-root">
      {loading ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Spinner label="Atualizando dados..." />
        </div>
      ) : null}
      <div className="py-6 overflow-y-auto xl:flex xl:flex-1 xl:flex-col xl:overflow-hidden">
        <div className="px-4 md:px-8 lg:px-16 xl:flex xl:h-full xl:flex-1 xl:flex-col xl:overflow-hidden xl:px-24 2xl:px-32">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <PageTitle>{warband.name}</PageTitle>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-300">
                <span className="rounded bg-green-900/30 px-3 py-1 font-semibold text-green-200">
                  {faction?.name ??
                    warband.faction?.name ??
                    warband.factionSlug}
                </span>
                <span>
                  <strong>Jogador:</strong> {warbandOwnerName}
                </span>
                <span>
                  <strong>Coroas:</strong> {crowns}
                </span>
                <span>
                  <strong>Pedra-bruxa:</strong> {wyrdstone}
                </span>
                <span>
                  <strong>Criado em:</strong> {formatDate(warband.createdAt)}
                </span>
              </div>
            </div>
            <Link
              to="/tools/warband-manager"
              className="inline-flex items-center justify-center rounded border border-green-500 px-4 py-2 text-sm font-semibold text-green-200 transition hover:bg-green-700/20"
            >
              ← Voltar para Meus Bandos
            </Link>
          </div>

          <div className="grid gap-6 xl:flex-1 xl:min-h-0 xl:grid-cols-[360px_minmax(320px,1fr)_360px] xl:items-stretch xl:overflow-hidden">
            {/* Column 1: Faction figures + Vault */}
            <div className="xl:flex xl:h-full xl:min-h-0 xl:flex-col">
              <div className="space-y-6 xl:flex-1 xl:min-h-0 xl:overflow-y-auto xl:pr-3">
                <AvailableFiguresSection
                  baseFigureGroups={baseFigureGroups}
                  expandedAvailableFigures={expandedAvailableFigures}
                  onToggleFigure={handleToggleAvailableFigure}
                  onAddFigure={handleAddFigure}
                  onOpenEquipmentDialog={handleOpenEquipmentDialog}
                  onOpenMercenaryModal={handleOpenMercenaryModal}
                  hasAvailableMercenaries={hasAvailableMercenaries}
                  onOpenLegendModal={handleOpenLegendModal}
                  hasAvailableLegends={hasAvailableLegends}
                  addingFigureSlug={addingFigureSlug}
                  warbandId={warbandId ?? null}
                />

                <VaultSection
                  vaultItems={vaultItems}
                  onOpenVaultModal={handleOpenVaultModal}
                  onVaultRebuy={handleVaultRebuy}
                  onVaultUpdate={handleVaultUpdate}
                  vaultItemAction={vaultItemAction}
                />
              </div>
            </div>

            {/* Column 2: Soldiers list */}
            <div className="xl:flex xl:h-full xl:min-h-0 xl:flex-col">
              <div className="space-y-4 xl:flex-1 xl:min-h-0 xl:overflow-y-auto xl:pr-2">
                <SoldierListSection
                  soldierGroups={soldierGroups}
                  selectedSoldierId={selectedSoldierId}
                  onSelectSoldier={handleSelectSoldier}
                  onFireSoldier={handleFireSoldier}
                  onKillSoldier={handleKillSoldier}
                  onUndoSoldier={handleUndoSoldier}
                  onOpenEquipmentDialog={handleOpenEquipmentDialog}
                  onOpenSkillsDialog={handleOpenSkillsDialog}
                  onOpenSpellsDialog={handleOpenSpellsDialog}
                  onOpenSupernaturalDialog={handleOpenSupernaturalDialog}
                  soldierAction={soldierAction}
                />
              </div>
            </div>

            {/* Column 3: Soldier detail */}
            <div className="xl:flex xl:h-full xl:min-h-0 xl:flex-col">
              <div className="space-y-4 xl:flex-1 xl:min-h-0 xl:overflow-y-auto xl:pr-2">
                <SoldierDetailSection
                  selectedSoldier={selectedSoldier}
                  selectedBaseFigure={selectedBaseFigure}
                  factionSlug={warband.factionSlug ?? faction?.slug ?? null}
                  relations={relations}
                  equipableVaultItems={equipableVaultItems}
                  soldierExtraSkillLists={soldierExtraSkillLists}
                  soldierExtraSpellLores={soldierExtraSpellLores}
                  warbandId={warbandId ?? null}
                  onReload={() => loadWarband(warbandId!)}
                  heroSkillOptions={heroSkillOptions}
                  onPromoteHero={handlePromoteHero}
                  onPromoteLeader={handlePromoteLeader}
                  promoteHeroLoading={promoteHeroLoading}
                  promoteLeaderLoading={promoteLeaderLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <EquipmentDialog
        open={equipmentDialogOpen}
        onClose={handleCloseEquipmentDialog}
        title={equipmentDialogTitle}
        items={equipmentDialogItems}
      />

      <SkillsDialog
        open={skillsDialogOpen}
        onClose={handleCloseSkillsDialog}
        title={skillsDialogTitle}
        loading={skillsDialogLoading}
        error={skillsDialogError}
        lists={skillsDialogLists}
        selectedSlug={skillsDialogSelectedSlug}
        onSelectSlug={setSkillsDialogSelectedSlug}
      />

      <SpellsDialog
        open={spellsDialogOpen}
        onClose={handleCloseSpellsDialog}
        title={spellsDialogTitle}
        loading={spellsDialogLoading}
        error={spellsDialogError}
        lores={spellsDialogLores}
        selectedSlug={spellsDialogSelectedSlug}
        onSelectSlug={setSpellsDialogSelectedSlug}
      />

      <SupernaturalDialog
        open={supernaturalDialogOpen}
        onClose={handleCloseSupernaturalDialog}
        title={supernaturalDialogTitle}
        loading={supernaturalDialogLoading}
        error={supernaturalDialogError}
        abilities={supernaturalDialogAbilities}
      />

      <MercenaryModal
        open={mercenaryModalOpen}
        onClose={handleCloseMercenaryModal}
        loading={false}
        mercenaries={warband.mercenaries ?? []}
        selectedSlug={selectedMercenarySlug}
        onSelectSlug={setSelectedMercenarySlug}
        onHire={handleHireMercenary}
        actionLoading={mercenaryHireLoading}
        warband={warband}
      />

      <LegendModal
        open={legendModalOpen}
        onClose={handleCloseLegendModal}
        loading={false}
        legends={warband.legends ?? []}
        selectedSlug={selectedLegendSlug}
        onSelectSlug={setSelectedLegendSlug}
        onHire={handleHireLegend}
        actionLoading={legendHireLoading}
        warband={warband}
      />

      <VaultModal
        open={vaultModalOpen}
        onClose={handleCloseVaultModal}
        loading={equipmentCatalogLoading}
        equipmentCatalog={equipmentCatalog}
        catalogFilter={catalogFilter}
        onFilterChange={setCatalogFilter}
        selectedSlug={selectedCatalogSlug}
        onSelectSlug={setSelectedCatalogSlug}
        onBuy={() => handleVaultAdd(false)}
        onLoot={() => handleVaultAdd(true)}
        actionLoading={vaultActionLoading}
        warband={warband}
      />
    </div>
  );
};

export default function WarbandDetailPageWithBoundary() {
  return (
    <ErrorBoundary>
      <WarbandDetailPage />
    </ErrorBoundary>
  );
}
