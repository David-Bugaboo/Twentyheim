import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useAuth } from "../../context/AuthContext";
import {
  addItemToVault,
  updateVaultItem,
  updateWarband,
  createSharedLink,
  updateSharedLink,
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
  fetchModifiers,
  fetchSkillBySlug,
  fetchSpellBySlug,
  fetchEquipmentBySlug,
  type ModifierQueryResponse,
} from "../../services/queries.service";
import ErrorBoundary from "../../components/ErrorBoundary";
import { Spinner } from "./warband-detail/components/CommonComponents";
import { useWarbandData } from "./warband-detail/hooks/useWarbandData";
import { useSoldierManagement } from "./warband-detail/hooks/useSoldierManagement";
import { SoldierListSection } from "./warband-detail/components/SoldierListSection";
import { EquipmentDialog } from "./warband-detail/components/EquipmentDialog";
import { SkillsDialog } from "./warband-detail/components/SkillsDialog";
import { SpellsDialog } from "./warband-detail/components/SpellsDialog";
import { VaultModal } from "./warband-detail/components/VaultModal";
import { SupernaturalDialog } from "./warband-detail/components/SupernaturalDialog";
import { AvailableSupernaturalDialog } from "./warband-detail/components/AvailableSupernaturalDialog";
import { VaultSidebar } from "./warband-detail/components/VaultSidebar";
import { AvailableFiguresSidebar } from "./warband-detail/components/AvailableFiguresSidebar";
import { SoldierDetailSidebar } from "./warband-detail/components/SoldierDetailSidebar";
import type {
  EquipmentSummary,
  FigureSummary,
  EquipmentCatalogFilter,
  SkillListDialogEntry,
  SpellLoreDialogEntry,
} from "./warband-detail/types";
import {
  getRoleType,
  formatDate,
  normalizeString,
} from "./warband-detail/utils/helpers";
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
import { exportWarbandToPDF } from "./warband-detail/utils/pdfExport";

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
  const navigate = useNavigate();

  const {
    warband,
    faction,
    loading,
    selectedSoldierId,
    setSelectedSoldierId,
    loadWarband,
  } = useWarbandData({ warbandId });

  useEffect(() => {
    const handleRuntimeError = (event: ErrorEvent) => {
      console.error("[WarbandDetail] runtime error", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack ?? null,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("[WarbandDetail] unhandled rejection", {
        reason: event.reason,
      });
    };

    window.addEventListener("error", handleRuntimeError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    return () => {
      window.removeEventListener("error", handleRuntimeError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  useEffect(() => {
    if (!loading && warband) {
      if (!currentUser || warband.userId !== currentUser.id) {
        toast.error("Você não tem acesso a esse bando.");
        navigate("/tools/warband-manager", { replace: true });
      }
    }
  }, [loading, warband, currentUser, navigate]);

  const resetAndReloadWarband = useCallback(
    async (options?: { nextSelectedSoldierId?: string | null }) => {
      if (!warbandId) return;
      const targetId =
        options && "nextSelectedSoldierId" in options
          ? options.nextSelectedSoldierId
          : selectedSoldierId;
      setReloadingWarband(true);
      setSelectedSoldierId(null);
      try {
        await loadWarband(warbandId);
        if (targetId) {
          setSelectedSoldierId(targetId);
        }
      } finally {
        setReloadingWarband(false);
      }
    },
    [warbandId, loadWarband, selectedSoldierId, setSelectedSoldierId]
  );

  const {
    addingFigureSlug,
    soldierAction,
    handleAddFigure,
    handleFireSoldier,
    handleKillSoldier,
    handleUndoSoldier,
    handleToggleSoldierActive,
  } = useSoldierManagement({
    warbandId: warbandId ?? null,
    onReload: resetAndReloadWarband,
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
  const [selectedModifierSlug, setSelectedModifierSlug] = useState<string>("");
  const [catalogFilter, setCatalogFilter] =
    useState<EquipmentCatalogFilter>("all");
  const [modifiers, setModifiers] = useState<ModifierQueryResponse[]>([]);
  const [modifiersLoading, setModifiersLoading] = useState(false);
  const [vaultActionLoading, setVaultActionLoading] = useState<
    "buy" | "loot" | null
  >(null);
  const [vaultItemAction, setVaultItemAction] = useState<{
    itemId: string;
    type: "buy" | "sell" | "undo" | "destroy";
  } | null>(null);
  const [expandedAvailableFigures, setExpandedAvailableFigures] = useState<
    Record<string, boolean>
  >({});
  const [promotionRequest, setPromotionRequest] = useState<{
    soldierId: string;
    type: "hero" | "leader";
  } | null>(null);
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
  const [editingWarband, setEditingWarband] = useState(false);
  const [warbandNameDraft, setWarbandNameDraft] = useState("");
  const [warbandCrownsDraft, setWarbandCrownsDraft] = useState("");
  const [warbandWyrdstoneDraft, setWarbandWyrdstoneDraft] = useState("");
  const [savingWarband, setSavingWarband] = useState(false);
  const [vaultSidebarOpen, setVaultSidebarOpen] = useState(false);
  const [availableFiguresSidebarOpen, setAvailableFiguresSidebarOpen] =
    useState(false);
  const [soldierDetailSidebarOpen, setSoldierDetailSidebarOpen] =
    useState(false);
  const [availableMutationsDialogOpen, setAvailableMutationsDialogOpen] =
    useState(false);
  const [
    availableMutationsDialogFigureName,
    setAvailableMutationsDialogFigureName,
  ] = useState("");
  const [availableBlessingsDialogOpen, setAvailableBlessingsDialogOpen] =
    useState(false);
  const [
    availableBlessingsDialogFigureName,
    setAvailableBlessingsDialogFigureName,
  ] = useState("");
  const [shareLinkDialogOpen, setShareLinkDialogOpen] = useState(false);
  const [shareLinkLoading, setShareLinkLoading] = useState(false);
  const [shareLinkUrl, setShareLinkUrl] = useState<string | null>(null);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [reloadingWarband, setReloadingWarband] = useState(false);

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

  const vaultItems = useMemo<EquipmentToVault[]>(
    () => warband?.vault ?? [],
    [warband]
  );

  const soldiers = useMemo<WarbandSoldier[]>(
    () => warband?.warbandSoldiers ?? [],
    [warband]
  );

  const activeSoldiers = useMemo(
    () => soldiers.filter(soldier => soldier.active !== false),
    [soldiers]
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

  const selectedCatalogItem = useMemo(() => {
    if (!selectedCatalogSlug) return null;
    return (
      equipmentCatalog.find(item => item.slug === selectedCatalogSlug) ?? null
    );
  }, [equipmentCatalog, selectedCatalogSlug]);

  const MEC_MODIFIER_KEYWORDS = useMemo(
    () => [
      "modificador de arma corpo a corpo",
      "modificadores de arma corpo a corpo",
    ],
    []
  );
  const ARMOR_MODIFIER_KEYWORDS = useMemo(
    () => ["modificador de armadura", "modificadores de armadura"],
    []
  );

  const modifierCategory = useMemo<"melee" | "armor" | null>(() => {
    if (!selectedCatalogItem) return null;
    const normalizedCategory = normalizeString(
      selectedCatalogItem.category ?? ""
    );
    if (normalizedCategory.includes("arma corpo a corpo")) {
      return "melee";
    }
    if (
      normalizedCategory.includes("armadura") ||
      normalizedCategory.includes("escudo") ||
      normalizedCategory.includes("elmo")
    ) {
      return "armor";
    }
    return null;
  }, [selectedCatalogItem]);

  useEffect(() => {
    if (!modifierCategory && selectedModifierSlug) {
      setSelectedModifierSlug("");
      return;
    }
    if (modifierCategory && selectedModifierSlug) {
      const categoryFilters =
        modifierCategory === "melee"
          ? MEC_MODIFIER_KEYWORDS
          : ARMOR_MODIFIER_KEYWORDS;
      const isValid = modifiers.some(mod => {
        const normalizedCategory = normalizeString(mod.category ?? "");
        return (
          categoryFilters.some(keyword =>
            normalizedCategory.includes(keyword)
          ) && mod.slug === selectedModifierSlug
        );
      });
      if (!isValid) {
        setSelectedModifierSlug("");
      }
    }
  }, [
    modifierCategory,
    modifiers,
    selectedModifierSlug,
    MEC_MODIFIER_KEYWORDS,
    ARMOR_MODIFIER_KEYWORDS,
  ]);

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

  const mercenaryFigures = useMemo<BaseFigure[]>(
    () => warband?.mercenaries ?? [],
    [warband?.mercenaries]
  );

  const legendFigures = useMemo<BaseFigure[]>(
    () => warband?.legends ?? [],
    [warband?.legends]
  );

  const availableFigureGroups = useMemo(() => {
    const groups: Array<{ title: string; items: FigureSummary[] }> = [
      ...baseFigureGroups.map(group => ({
        title: group.title,
        items: group.items,
      })),
    ];

    if (mercenaryFigures.length > 0) {
      const sortedMercenaries = [...mercenaryFigures].sort((a, b) =>
        (a.name ?? "").localeCompare(b.name ?? "")
      );
      groups.push({
        title: "Mercenários Disponíveis",
        items: sortedMercenaries as unknown as FigureSummary[],
      });
    }

    if (legendFigures.length > 0) {
      const sortedLegends = [...legendFigures].sort((a, b) =>
        (a.name ?? "").localeCompare(b.name ?? "")
      );
      groups.push({
        title: "Lendas Disponíveis",
        items: sortedLegends as unknown as FigureSummary[],
      });
    }

    return groups;
  }, [baseFigureGroups, mercenaryFigures, legendFigures]);

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
      soldier: 2,
      mercenary: 3,
      legend: 4,
    } as const;

    const enriched = soldiers.map(soldier => {
      const baseFigureRelation = soldier.baseFigure?.[0];
      const baseFigure = baseFigureRelation?.baseFigure ?? null;
      const role =
        (soldier.effectiveRole ? String(soldier.effectiveRole) : null) ??
        baseFigure?.role ??
        null;
      const roleType = getRoleType(role);
      const normalizedRole = normalizeString(role ?? "");
      const isMercenary = normalizedRole.includes("mercen");

      // Se for mercenário, usar tipo "mercenary" ao invés de "soldier"
      const finalRoleType = isMercenary ? "mercenary" : roleType;

      return {
        soldier,
        baseFigure,
        role,
        roleType: finalRoleType,
      };
    });

    const sorted = [...enriched].sort((a, b) => {
      const aOrder = orderMap[a.roleType as keyof typeof orderMap] ?? 999;
      const bOrder = orderMap[b.roleType as keyof typeof orderMap] ?? 999;
      return aOrder - bOrder;
    });

    const groups = {
      leader: [] as typeof enriched,
      hero: [] as typeof enriched,
      soldier: [] as typeof enriched,
      mercenary: [] as typeof enriched,
      legend: [] as typeof enriched,
    };

    sorted.forEach(entry => {
      if (entry.roleType === "mercenary") {
        groups.mercenary.push(entry);
      } else if (entry.roleType === "leader") {
        groups.leader.push(entry);
      } else if (entry.roleType === "hero") {
        groups.hero.push(entry);
      } else if (entry.roleType === "soldier") {
        groups.soldier.push(entry);
      } else if (entry.roleType === "legend") {
        groups.legend.push(entry);
      }
    });

    return [
      { title: "Líder", items: groups.leader },
      { title: "Heróis", items: groups.hero },
      { title: "Soldados", items: groups.soldier },
      { title: "Mercenários", items: groups.mercenary },
      { title: "Lendas", items: groups.legend },
    ].filter(group => group.items.length > 0);
  }, [soldiers]);

  const parseNumericValue = (value: unknown): number => {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string") {
      const parsed = Number(value.replace(",", "."));
      return Number.isFinite(parsed) ? parsed : 0;
    }
    return 0;
  };

  const warbandRating = useMemo(() => {
    const memberCount = activeSoldiers.length;
    const totalQualityAndXp = activeSoldiers.reduce((acc, soldier) => {
      const baseQuality = parseNumericValue(
        soldier.baseFigure?.[0]?.baseFigure?.quality
      );
      const experienceValue = parseNumericValue(soldier.experience);
      return acc + baseQuality + experienceValue;
    }, 0);
    return memberCount * 5 + totalQualityAndXp;
  }, [activeSoldiers]);

  const hasLeader = useMemo(
    () =>
      soldierGroups.some(group =>
        group.items.some(item => item.roleType === "leader")
      ),
    [soldierGroups]
  );
  const warbandCrowns = warband?.crowns ?? null;

  // Contar quantas figuras de cada slug existem no bando
  const figureCountsBySlug = useMemo(() => {
    const counts = new Map<string, number>();
    soldiers.forEach(soldier => {
      const slug = soldier.baseFigure?.[0]?.baseFigure?.slug;
      if (slug) {
        counts.set(slug, (counts.get(slug) || 0) + 1);
      }
    });
    return counts;
  }, [soldiers]);

  const handleToggleAvailableFigure = useCallback((figureId: string) => {
    setExpandedAvailableFigures(prev => ({
      ...prev,
      [figureId]: !prev[figureId],
    }));
  }, []);

  useEffect(() => {
    if (!warband || editingWarband) return;
    setWarbandNameDraft(warband.name ?? "");
    setWarbandCrownsDraft(String(warband.crowns ?? 0));
    setWarbandWyrdstoneDraft(String(warband.wyrdstone ?? 0));
  }, [warband, editingWarband]);

  const handleOpenEquipmentDialog = useCallback(
    (figureName: string, items: EquipmentSummary[] | unknown[]) => {
    setEquipmentDialogTitle(figureName);
    setEquipmentDialogItems(items as EquipmentSummary[]);
    setEquipmentDialogOpen(true);
    },
    []
  );

  const handleCloseEquipmentDialog = () => {
    setEquipmentDialogOpen(false);
    setEquipmentDialogItems([]);
  };

  const handleOpenVaultModal = () => {
    setVaultModalOpen(true);
    if (!modifiers.length && !modifiersLoading) {
      setModifiersLoading(true);
      fetchModifiers()
        .then(response => {
          setModifiers(response);
        })
        .catch(error => {
          console.error(error);
          toast.error("Não foi possível carregar os modificadores.");
        })
        .finally(() => {
          setModifiersLoading(false);
        });
    }
  };

  const handleCloseVaultModal = () => {
    setVaultModalOpen(false);
    setSelectedCatalogSlug("");
    setSelectedModifierSlug("");
    setVaultActionLoading(null);
  };

  const handleVaultAdd = async (loot: boolean, discount?: number) => {
    if (!warbandId || !selectedCatalogSlug) {
      toast.error("Selecione um equipamento válido antes de continuar.");
      return;
    }

    const selectedItem = selectedCatalogItem;
    if (!selectedItem) {
      toast.error("Equipamento selecionado não encontrado.");
      return;
    }

    const applicableModifierSlug =
      modifierCategory && selectedModifierSlug
        ? selectedModifierSlug
        : undefined;
    const modifierName = applicableModifierSlug
      ? (modifiers.find(mod => mod.slug === applicableModifierSlug)?.name ??
        null)
      : null;

    try {
      setVaultActionLoading(loot ? "loot" : "buy");
      await addItemToVault(
        warbandId,
        {
          equipmentSlug: selectedCatalogSlug,
          modifierSlug: applicableModifierSlug,
        },
        { loot, discount }
      );
      toast.success(
        loot
          ? `Loot registrado para "${selectedItem.name}".`
          : modifierName
            ? `Equipamento "${selectedItem.name}" com "${modifierName}" adicionado ao cofre.`
            : `Equipamento "${selectedItem.name}" comprado para o cofre.`
      );
      await resetAndReloadWarband();
      // Modal permanece aberto com as mesmas opções selecionadas - só fecha se o usuário clicar em Cancelar ou no X
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

  

  const handleVaultUpdate = async (
    item: EquipmentToVault,
    options: { sell?: boolean; destroy?: boolean }
  ) => {
    if (!warbandId) return;
    try {
      const actionType = options.destroy
        ? "destroy"
        : options.sell
          ? "sell"
          : "undo";
      setVaultItemAction({
        itemId: item.id,
        type: actionType as "buy" | "sell" | "undo" | "destroy",
      });
      await updateVaultItem(warbandId, item.id, options);
      toast.success(
        options.destroy
          ? `Item "${
              item.equipment?.name ?? item.equipmentSlug
            }" destruído.`
          : options.sell
            ? `Venda do item "${
                item.equipment?.name ?? item.equipmentSlug
              }" registrada.`
            : `Compra desfeita para "${
                item.equipment?.name ?? item.equipmentSlug
              }".`
      );
      await resetAndReloadWarband();
    } catch (error) {
      console.error(error);
      toast.error(
        options.destroy
          ? "Não foi possível destruir o item."
          : options.sell
            ? "Não foi possível registrar a venda do item."
            : "Não foi possível desfazer a compra do item."
      );
    } finally {
      setVaultItemAction(null);
    }
  };

  const handleSelectSoldier = (soldierId: string) => {
    setSelectedSoldierId(soldierId);
    setSoldierDetailSidebarOpen(true);
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

  // Função removida - não está sendo usada
  // const _handleOpenSkillBadge = useCallback(...)

  const handleOpenStartingSkill = useCallback(
    async (figureName: string, skillSlug: string) => {
      const targetSlug = skillSlug?.trim();
      if (!targetSlug) return;

      setSkillsDialogTitle(`Habilidade inicial — ${figureName}`);
      setSkillsDialogError(null);
      setSkillsDialogLists([]);
      setSkillsDialogOpen(true);
      setSkillsDialogLoading(true);

      try {
        const data = await fetchSkillBySlug(targetSlug);
        const entry: SkillListDialogEntry = {
          slug: targetSlug,
          name: data?.name ?? targetSlug,
          description: data?.description ?? data?.effect ?? null,
          skills: [
            {
              slug: data?.slug ?? targetSlug,
              name: data?.name ?? targetSlug,
              description: data?.description ?? data?.effect ?? null,
            },
          ],
        };
        setSkillsDialogLists([entry]);
        setSkillsDialogSelectedSlug(entry.slug);
      } catch (error) {
        console.error(error);
        setSkillsDialogLists([]);
        setSkillsDialogSelectedSlug("");
        setSkillsDialogError("Não foi possível carregar a habilidade inicial.");
      } finally {
        setSkillsDialogLoading(false);
      }
    },
    []
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

  // Função removida - não está sendo usada
  // const _handleOpenSpellBadge = useCallback(...)

  const handleOpenStartingSpell = useCallback(
    async (figureName: string, spellSlug: string) => {
      const targetSlug = spellSlug?.trim();
      if (!targetSlug) return;

      setSpellsDialogTitle(`Magia inicial — ${figureName}`);
      setSpellsDialogError(null);
      setSpellsDialogLores([]);
      setSpellsDialogOpen(true);
      setSpellsDialogLoading(true);

      try {
        const data = await fetchSpellBySlug(targetSlug);
        const difficulty =
          typeof data?.difficultyClass === "number"
            ? data.difficultyClass
            : typeof data?.difficulty === "number"
              ? data.difficulty
              : null;
        const keywords =
          Array.isArray(data?.keywords) && data.keywords.length > 0
            ? data.keywords
            : typeof data?.keywords === "string"
              ? [data.keywords]
              : [];
        const entry: SpellLoreDialogEntry = {
          slug: targetSlug,
          name: data?.name ?? targetSlug,
          description: data?.description ?? null,
          spells: [
            {
              slug: data?.slug ?? targetSlug,
              name: data?.name ?? targetSlug,
              description: data?.description ?? null,
              difficultyClass: difficulty,
              keywords,
            },
          ],
        };
        setSpellsDialogLores([entry]);
        setSpellsDialogSelectedSlug(entry.slug);
      } catch (error) {
        console.error(error);
        setSpellsDialogLores([]);
        setSpellsDialogSelectedSlug("");
        setSpellsDialogError("Não foi possível carregar a magia inicial.");
      } finally {
        setSpellsDialogLoading(false);
      }
    },
    []
  );

  const handleCloseSpellsDialog = () => {
    setSpellsDialogOpen(false);
    setSpellsDialogLores([]);
    setSpellsDialogError(null);
    setSpellsDialogSelectedSlug("");
  };

  const handleOpenStartingEquipment = useCallback(
    async (figureName: string, equipmentSlug: string) => {
      const targetSlug = equipmentSlug?.trim();
      if (!targetSlug) return;

      try {
        const data = await fetchEquipmentBySlug(targetSlug);
        const descriptionValue =
          Array.isArray(data?.description) && data.description.length > 0
            ? data.description
            : (data?.description ?? data?.effect ?? null);
        const specialRules = Array.isArray(data?.specialRules)
          ? data.specialRules.map(rule => {
              if (typeof rule === "string") {
                return { label: "Regra Especial", value: rule };
              }
              const record = rule ?? {};
              return {
                label:
                  (record.label as string | undefined) ??
                  (record.name as string | undefined) ??
                  (record.title as string | undefined) ??
                  "Regra Especial",
                value:
                  (record.value as string | undefined) ??
                  (record.description as string | undefined) ??
                  "",
              };
            })
          : undefined;
        const armourBonus =
          typeof data?.armourBonus === "number"
            ? data.armourBonus
            : typeof data?.armorBonus === "number"
              ? data.armorBonus
              : undefined;
        const damageBonus =
          typeof data?.damageBonus === "number"
            ? data.damageBonus
            : typeof data?.damage === "number"
              ? data.damage
              : undefined;
        const entry: EquipmentSummary = {
          name: data?.name ?? data?.slug ?? targetSlug,
          category: data?.category ?? data?.type ?? undefined,
          cost: data?.cost ?? null,
          description: descriptionValue ?? undefined,
          specialRules,
          armourBonus: armourBonus ?? null,
          damageBonus: damageBonus ?? null,
        };
        handleOpenEquipmentDialog(`${figureName} — Equipamento inicial`, [
          entry,
        ]);
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível carregar o equipamento inicial.");
      }
    },
    [handleOpenEquipmentDialog]
  );

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

      fetchSupernaturalAbilities(controller.signal)
        .then(allAbilities => {
          if (controller.signal.aborted) return;
          const filtered = allAbilities.filter(
            ability => ability.category === category
          );
          const mapped = filtered.map(ability => ({
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

  const handleOpenMutationsDialog = useCallback((figureName: string) => {
    setAvailableMutationsDialogFigureName(figureName);
    setAvailableMutationsDialogOpen(true);
  }, []);

  const handleCloseMutationsDialog = useCallback(() => {
    setAvailableMutationsDialogOpen(false);
    setAvailableMutationsDialogFigureName("");
  }, []);

  const handleOpenBlessingsDialog = useCallback((figureName: string) => {
    setAvailableBlessingsDialogFigureName(figureName);
    setAvailableBlessingsDialogOpen(true);
  }, []);

  const handleCloseBlessingsDialog = useCallback(() => {
    setAvailableBlessingsDialogOpen(false);
    setAvailableBlessingsDialogFigureName("");
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
        await resetAndReloadWarband({ nextSelectedSoldierId: soldierId });
    } catch (error) {
      console.error(error);
        toast.error("Não foi possível promover a figura a Herói.");
    } finally {
        setPromoteHeroLoading(false);
      }
    },
    [warbandId, resetAndReloadWarband]
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
        await resetAndReloadWarband({ nextSelectedSoldierId: soldierId });
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível promover a figura a Líder.");
      } finally {
        setPromoteLeaderLoading(false);
      }
    },
    [warbandId, resetAndReloadWarband]
  );

  const handleRequestPromoteHeroFromList = useCallback(
    (soldierId: string) => {
      setSelectedSoldierId(soldierId);
      setPromotionRequest({ soldierId, type: "hero" });
    },
    [setSelectedSoldierId]
  );

  const handleRequestPromoteLeaderFromList = useCallback(
    (soldierId: string) => {
      setSelectedSoldierId(soldierId);
      setPromotionRequest({ soldierId, type: "leader" });
    },
    [setSelectedSoldierId]
  );

  const handleClearPromotionRequest = useCallback(() => {
    setPromotionRequest(null);
  }, []);

  const handleStartEditWarband = () => {
    setEditingWarband(true);
  };

  const handleCancelEditWarband = () => {
    if (warband) {
      setWarbandNameDraft(warband.name ?? "");
      setWarbandCrownsDraft(String(warband.crowns ?? 0));
      setWarbandWyrdstoneDraft(String(warband.wyrdstone ?? 0));
    }
    setEditingWarband(false);
  };

  const parseNumericDraft = (draft: string): number | null => {
    const trimmed = draft.trim();
    if (!trimmed) return 0;
    const normalized = Number(trimmed.replace(",", "."));
    return Number.isFinite(normalized) ? normalized : null;
  };

  const handleSaveWarbandDetails = async () => {
    if (!warbandId || !warband) return;
    const nextName = warbandNameDraft.trim();
    const crownsValue = parseNumericDraft(warbandCrownsDraft);
    const wyrdstoneValue = parseNumericDraft(warbandWyrdstoneDraft);

    if (crownsValue === null || crownsValue < 0) {
      toast.error("Informe um valor válido para coroas.");
      return;
    }
    if (wyrdstoneValue === null || wyrdstoneValue < 0) {
      toast.error("Informe um valor válido para pedra-bruxa.");
      return;
    }

    const payload: {
      name?: string;
      crowns?: number;
      wyrdstone?: number;
    } = {};

    if (nextName && nextName !== warband.name) {
      payload.name = nextName;
    }
    if (crownsValue !== warband.crowns) {
      payload.crowns = crownsValue;
    }
    if (wyrdstoneValue !== warband.wyrdstone) {
      payload.wyrdstone = wyrdstoneValue;
    }

    if (Object.keys(payload).length === 0) {
      toast.info("Nenhuma alteração para salvar.");
      setEditingWarband(false);
      return;
    }

    try {
      setSavingWarband(true);
      await updateWarband(warbandId, payload);
      toast.success("Dados do bando atualizados.");
      await resetAndReloadWarband({ nextSelectedSoldierId: selectedSoldierId });
      setEditingWarband(false);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível atualizar o bando.");
    } finally {
      setSavingWarband(false);
    }
  };

  const handleExportToPDF = useCallback(async () => {
    if (!warband || !faction) {
      toast.error("Dados do bando não disponíveis para exportação.");
      return;
    }

    setExportingPDF(true);
    try {
      const soldiersData = soldiers.map(soldier => {
        const baseFigureRelation = soldier.baseFigure?.[0];
        const baseFigure = baseFigureRelation?.baseFigure ?? null;
        const relations = getSoldierRelations(soldier);

        return {
          soldier,
          baseFigure,
          relations: {
            equipment: relations.equipment,
            skills: relations.skills,
            spells: relations.spells,
            advancements: relations.advancements,
            injuries: relations.injuries,
            supernatural: relations.supernatural,
          },
        };
      });

      await exportWarbandToPDF(
        warband,
        faction,
        soldiersData as unknown as Parameters<typeof exportWarbandToPDF>[2]
      );
      toast.success("PDF exportado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível exportar o PDF.");
    } finally {
      setExportingPDF(false);
    }
  }, [warband, faction, soldiers]);

  const handleCreateOrUpdateShareLink = useCallback(async () => {
    if (!warbandId || !warband) return;

    try {
      setShareLinkLoading(true);

      // Verificar se o bando tem sharedLinks
      const warbandRecord = warband as unknown as Record<string, unknown>;
      const sharedLinks = warbandRecord.sharedLinks as
        | Array<{ id: string }>
        | null
        | undefined;
      const hasSharedLinks =
        Array.isArray(sharedLinks) && sharedLinks.length > 0;

      let linkId: string;

      if (hasSharedLinks && sharedLinks[0]?.id) {
        // Atualizar link existente
        linkId = sharedLinks[0].id;
        await updateSharedLink(warbandId, linkId);
      } else {
        // Criar novo link
        const response = await createSharedLink(warbandId);
        linkId = response.id;
      }

      // Recarregar o bando para ter os sharedLinks atualizados
      await resetAndReloadWarband({ nextSelectedSoldierId: selectedSoldierId });

      // Gerar URL do link
      const baseUrl = window.location.origin;
      const shareUrl = `${baseUrl}/warbands/share/${linkId}`;
      setShareLinkUrl(shareUrl);
      setShareLinkDialogOpen(true);

      toast.success("Link de compartilhamento gerado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error(
        "Não foi possível criar/atualizar o link de compartilhamento."
      );
    } finally {
      setShareLinkLoading(false);
    }
  }, [warbandId, warband, resetAndReloadWarband, selectedSoldierId]);

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
      {loading || savingWarband || reloadingWarband ? (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Spinner
            label={
              savingWarband
                ? "Salvando dados do bando..."
                : reloadingWarband
                  ? "Atualizando dados..."
                  : "Carregando dados..."
            }
          />
        </div>
      ) : null}
      <div className="py-4 sm:py-6 overflow-y-auto xl:flex xl:flex-1 xl:flex-col xl:overflow-hidden">
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:flex xl:h-full xl:flex-1 xl:flex-col xl:overflow-hidden xl:px-24 2xl:px-32">
          <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-2 flex-1">
              {editingWarband ? (
                <input
                  value={warbandNameDraft}
                  onChange={event => setWarbandNameDraft(event.target.value)}
                  className="w-full rounded border border-green-600/70 bg-[#101510] px-3 py-2 text-xl sm:text-2xl md:text-3xl font-semibold text-green-200 outline-none transition focus:border-green-400 focus:ring-1 focus:ring-green-500"
                  placeholder="Nome do bando"
                  maxLength={80}
                />
              ) : (
                <PageTitle className="text-center md:text-left">
                  {warband.name}
                </PageTitle>
              )}
              <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                <span className="rounded bg-green-900/30 px-3 py-1 font-semibold text-green-200">
                  {faction?.name ??
                    warband.faction?.name ??
                    warband.factionSlug}
                </span>
                <span>
                  <strong>Jogador:</strong> {warbandOwnerName}
                </span>
                {editingWarband ? (
                  <label className="flex items-center gap-2">
                    <strong>Coroas:</strong>
                    <input
                      type="number"
                      min={0}
                      value={warbandCrownsDraft}
                      onChange={event =>
                        setWarbandCrownsDraft(event.target.value)
                      }
                      className="w-24 rounded border border-green-700 bg-[#0f1010] px-2 py-1 text-sm text-green-100 outline-none transition focus:border-green-400"
                    />
                  </label>
                ) : (
                <span>
                  <strong>Coroas:</strong> {crowns}
                </span>
                )}
                {editingWarband ? (
                  <label className="flex items-center gap-2">
                    <strong>Pedra-bruxa:</strong>
                    <input
                      type="number"
                      min={0}
                      value={warbandWyrdstoneDraft}
                      onChange={event =>
                        setWarbandWyrdstoneDraft(event.target.value)
                      }
                      className="w-24 rounded border border-green-700 bg-[#0f1010] px-2 py-1 text-sm text-green-100 outline-none transition focus:border-green-400"
                    />
                  </label>
                ) : (
                <span>
                  <strong>Pedra-bruxa:</strong> {wyrdstone}
                  </span>
                )}
                <span>
                  <strong>Qualidade do bando:</strong> {warbandRating}
                </span>
                <span>
                  <strong>Criado em:</strong> {formatDate(warband.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2">
              {editingWarband ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancelEditWarband}
                    disabled={savingWarband}
                    className="inline-flex items-center justify-center rounded border border-gray-500/60 bg-transparent px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-gray-200 transition hover:border-gray-300 hover:bg-gray-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveWarbandDetails}
                    disabled={savingWarband}
                    className="inline-flex items-center justify-center rounded border border-green-500/70 bg-green-900/30 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {savingWarband ? "Salvando..." : "Salvar"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleStartEditWarband}
                    className="inline-flex items-center justify-center rounded border border-green-500/70 bg-green-900/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
                  >
                    Editar bando
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateOrUpdateShareLink}
                    disabled={shareLinkLoading}
                    className="inline-flex items-center justify-center gap-2 rounded border border-blue-500/70 bg-blue-900/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-blue-200 transition hover:border-blue-400 hover:bg-blue-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <ShareIcon fontSize="small" />
                    {shareLinkLoading
                      ? "Gerando..."
                      : "Criar link de compartilhamento"}
                  </button>
                  <button
                    type="button"
                    onClick={handleExportToPDF}
                    disabled={exportingPDF}
                    className="inline-flex items-center justify-center gap-2 rounded border border-red-500/70 bg-red-900/20 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-red-200 transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <PictureAsPdfIcon fontSize="small" />
                    {exportingPDF ? "Exportando..." : "Exportar para PDF"}
                  </button>
                </>
              )}
            <Link
              to="/tools/warband-manager"
                className="inline-flex items-center justify-center rounded border border-green-500 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-green-200 transition hover:bg-green-700/20 whitespace-nowrap"
            >
                ← Voltar
            </Link>
              </div>
            </div>

          <div className="xl:flex-1 xl:min-h-0 xl:overflow-hidden">
            {/* Soldiers list */}
            <div className="xl:flex xl:h-full xl:min-h-0 xl:flex-col">
              <div className="space-y-4 xl:flex-1 xl:min-h-0 xl:overflow-y-auto xl:pr-2">
                <SoldierListSection
                  soldierGroups={
                    soldierGroups as Array<{
                      title: string;
                      items: Array<{
                        soldier: WarbandSoldier;
                        baseFigure: BaseFigure | null;
                        role: string | null;
                        roleType:
                          | "leader"
                          | "hero"
                          | "legend"
                          | "soldier"
                          | "mercenary";
                      }>;
                    }>
                  }
                  selectedSoldierId={selectedSoldierId}
                  onSelectSoldier={handleSelectSoldier}
                  onFireSoldier={handleFireSoldier}
                  onKillSoldier={handleKillSoldier}
                  onUndoSoldier={handleUndoSoldier}
                  onToggleSoldierActive={handleToggleSoldierActive}
                  onOpenEquipmentDialog={handleOpenEquipmentDialog}
                  onOpenSkillsDialog={handleOpenSkillsDialog}
                  onOpenSpellsDialog={handleOpenSpellsDialog}
                  onRequestPromoteHero={handleRequestPromoteHeroFromList}
                  onRequestPromoteLeader={handleRequestPromoteLeaderFromList}
                  hasLeader={hasLeader}
                  onOpenSupernaturalDialog={handleOpenSupernaturalDialog}
                  soldierAction={soldierAction}
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

      <AvailableSupernaturalDialog
        open={availableMutationsDialogOpen}
        onClose={handleCloseMutationsDialog}
        category="Mutação"
        figureName={availableMutationsDialogFigureName}
      />

      <AvailableSupernaturalDialog
        open={availableBlessingsDialogOpen}
        onClose={handleCloseBlessingsDialog}
        category="Benção de Nurgle"
        figureName={availableBlessingsDialogFigureName}
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
        modifiers={modifiers}
        modifiersLoading={modifiersLoading}
        selectedModifierSlug={selectedModifierSlug}
        onSelectModifier={setSelectedModifierSlug}
        modifierCategory={modifierCategory}
        onBuy={(discount) => handleVaultAdd(false, discount)}
        onLoot={() => handleVaultAdd(true)}
        actionLoading={vaultActionLoading}
        warband={warband}
      />

      {/* Floating Buttons */}
      <button
        onClick={() => setVaultSidebarOpen(true)}
        className="fixed bottom-4 left-4 z-40 bg-green-800 text-white p-4 sm:p-5 md:p-6 rounded-full shadow-lg hover:bg-green-700 transition-colors touch-manipulation flex items-center justify-center overflow-hidden opacity-70 md:opacity-100"
        aria-label="Abrir cofre"
      >
        <svg
          className="w-6 h-6 md:w-[59px] md:h-[59px]"
          viewBox="0 0 512 512"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M250,371.255l-3.368,20.676h18.74l-3.368-20.676c3.219-2.012,5.365-5.58,5.365-9.648
		c0-6.277-5.089-11.37-11.366-11.37c-6.28,0-11.373,5.093-11.373,11.37C244.63,365.676,246.778,369.243,250,371.255z"
          />
          <polygon points="236.109,255.575 263.65,278.358 276.288,274.239 237.481,240.435" />
          <polygon points="307.585,261.307 320.099,276.324 325.948,267.976 316.764,257.965" />
          <polygon points="295.9,287.17 293.393,299.688 325.112,288.841 314.261,280.494" />
          <polygon points="179.892,288.013 197.419,273.818 179.892,267.976" />
          <polygon points="218.702,285.5 214.321,294.893 240.61,294.893 237.481,285.5" />
          <path
            d="M211.665,189.98c2.01-9.408,6.056-19.746,11.973-25.667c5.918-5.914,16.252-9.961,25.653-11.98
		c-9.401-2.005-19.736-6.052-25.657-11.973c-5.914-5.914-9.964-16.251-11.973-25.652c-2.012,9.401-6.059,19.739-11.98,25.66
		c-5.914,5.914-16.252,9.961-25.652,11.973c9.404,2.012,19.739,6.058,25.656,11.973C205.599,170.234,209.653,180.572,211.665,189.98z"
          />
          <path
            d="M334.291,206.37c1.206-5.652,3.64-11.864,7.192-15.424c3.557-3.552,9.76-5.986,15.413-7.199
		c-5.652-1.206-11.856-3.64-15.413-7.192c-3.556-3.553-5.986-9.764-7.196-15.416c-1.206,5.652-3.643,11.864-7.195,15.416
		c-3.557,3.56-9.768,5.986-15.42,7.199c5.652,1.206,11.864,3.64,15.42,7.2C330.644,194.505,333.081,200.717,334.291,206.37z"
          />
          <path
            d="M412.568,213.874l27.483-132.426l-22.383-44.76C406.429,14.203,383.443,0,358.306,0H153.702
		c-25.144,0-48.123,14.203-59.366,36.688l-22.383,44.76l27.483,132.426L42.562,317.727V512h426.875V317.727L412.568,213.874z
		 M412.684,265.034c-4.242,0.908-8.906,2.732-11.572,5.405c-2.674,2.666-4.497,7.33-5.406,11.573
		c-0.908-4.243-2.739-8.906-5.405-11.573c-2.673-2.674-7.338-4.497-11.573-5.405c4.235-0.908,8.9-2.738,11.573-5.405
		c2.666-2.674,4.49-7.338,5.405-11.573c0.901,4.235,2.732,8.9,5.406,11.573C403.777,262.296,408.441,264.126,412.684,265.034z
		 M121.794,302.354l15.024-12.83l9.386-14.436h22.532l3.756-12.823l22.532-16.04l30.041,3.204l3.756-16.034l39.431-8.028
		l28.162,24.062l18.78-6.415l24.407,22.456l20.658,9.619l29.314,27.265h-25.602l-13.2-13.716l-2.369,13.716H121.794z
		 M301.504,333.252v74.132H210.5v-74.132H301.504z M114.518,246.341c5.18-1.104,10.876-3.342,14.138-6.596
		c3.258-3.262,5.489-8.95,6.596-14.138c1.108,5.18,3.339,10.876,6.597,14.138c3.262,3.254,8.958,5.485,14.141,6.596
		c-5.183,1.105-10.879,3.342-14.137,6.596c-3.258,3.262-5.489,8.958-6.601,14.138c-1.108-5.18-3.338-10.876-6.596-14.138
		C125.397,249.683,119.702,247.446,114.518,246.341z M117.849,48.444c6.786-13.572,20.669-22.159,35.852-22.159h204.604
		c15.176,0,29.06,8.587,35.845,22.159l12.714,25.413h-98.292V37.372H203.431v36.485h-98.292L117.849,48.444z M293.553,52.395v21.461
		h-75.099V52.395H293.553z M410.875,92.636l-24.156,116.421H125.285L101.122,92.636H410.875z M68.851,330.477H195.48v40.691H68.851
		V330.477z M443.146,485.708H68.851v-34.421h374.296V485.708z M443.146,436.262H68.851v-50.077H195.48V422.4h121.045v-7.505v-28.71
		h126.622V436.262z M443.146,371.168H316.524v-40.691h126.622V371.168z"
          />
        </svg>
      </button>

      <button
        onClick={() => setAvailableFiguresSidebarOpen(true)}
        className="fixed bottom-4 right-4 z-40 bg-green-800 text-white p-4 sm:p-5 md:p-6 rounded-full shadow-lg hover:bg-green-700 transition-colors touch-manipulation flex items-center justify-center overflow-hidden opacity-70 md:opacity-100"
        aria-label="Abrir figuras disponíveis"
      >
        <svg
          className="w-6 h-6 md:w-[59px] md:h-[59px]"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.4975978,11.9954815 C20.535164,11.9954815 22.9975978,14.4579154 22.9975978,17.4954815 C22.9975978,20.5330477 20.535164,22.9954815 17.4975978,22.9954815 C14.4600317,22.9954815 11.9975978,20.5330477 11.9975978,17.4954815 C11.9975978,14.4579154 14.4600317,11.9954815 17.4975978,11.9954815 Z M17.4975978,13.9947164 L17.4077222,14.0027721 C17.2036292,14.0398161 17.0426975,14.2007478 17.0056535,14.4048408 L16.9975978,14.4947164 L16.9972476,16.9947164 L14.4952476,16.9954815 L14.405372,17.0035372 C14.2012789,17.0405812 14.0403473,17.2015129 14.0033033,17.4056059 L13.9952476,17.4954815 L14.0033033,17.5853572 C14.0403473,17.7894502 14.2012789,17.9503819 14.405372,17.9874259 L14.4952476,17.9954815 L16.9982476,17.9947164 L16.9987055,20.4989663 L17.0067612,20.5888419 C17.0438051,20.7929349 17.2047368,20.9538666 17.4088299,20.9909106 L17.4987055,20.9989663 L17.5885811,20.9909106 C17.7926742,20.9538666 17.9536059,20.7929349 17.9906498,20.5888419 L17.9987055,20.4989663 L17.9982476,17.9947164 L20.5021633,17.9954815 L20.592039,17.9874259 C20.796132,17.9503819 20.9570637,17.7894502 20.9941077,17.5853572 L21.0021633,17.4954815 L20.9941077,17.4056059 C20.9570637,17.2015129 20.796132,17.0405812 20.592039,17.0035372 L20.5021633,16.9954815 L17.9972476,16.9947164 L17.9975978,14.4947164 L17.9895422,14.4048408 C17.9524982,14.2007478 17.7915665,14.0398161 17.5874735,14.0027721 L17.4975978,13.9947164 Z M12.0195479,13.9952752 C11.7228185,14.4587122 11.4832871,14.9622912 11.3109126,15.4960531 L9.24759785,15.4954815 C9.10952666,15.4954815 8.99759785,15.6074104 8.99759785,15.7454815 L8.99759785,16.7454815 C8.99759785,17.7226081 9.60955472,18.290249 11.0667146,18.4543897 C11.1470663,18.9903056 11.2917524,19.5050238 11.4934969,19.990045 C8.93965371,19.8528143 7.49759785,18.7685888 7.49759785,16.7454815 L7.49759785,15.7454815 C7.49759785,14.7789832 8.28109954,13.9954815 9.24759785,13.9954815 L12.0195479,13.9952752 Z M8.12359343,8.99556665 C8.04134309,9.31516095 7.99759785,9.65021263 7.99759785,9.99548155 C7.99759785,10.1645873 8.00809165,10.3312421 8.02846808,10.4948252 L3.74759785,10.4954815 C3.60952666,10.4954815 3.49759785,10.6074104 3.49759785,10.7454815 L3.49759785,11.7454815 C3.49759785,12.9216524 4.38426375,13.5045185 6.56438835,13.5045185 C7.02629033,13.5045185 7.42735867,13.4789378 7.77194277,13.4271326 C7.20677007,13.7851837 6.78305576,14.3444351 6.59881789,15.0036485 L6.56438835,15.0045185 C3.65545895,15.0045185 1.99759785,13.9146932 1.99759785,11.7454815 L1.99759785,10.7454815 C1.99759785,9.82730815 2.70470812,9.07428921 3.60407064,9.00128275 L3.74759785,8.99548155 L8.12359343,8.99556665 Z M11.9975978,6.99548155 C13.6544521,6.99548155 14.9975978,8.3386273 14.9975978,9.99548155 C14.9975978,11.6523358 13.6544521,12.9954815 11.9975978,12.9954815 C10.3407436,12.9954815 8.99759785,11.6523358 8.99759785,9.99548155 C8.99759785,8.3386273 10.3407436,6.99548155 11.9975978,6.99548155 Z M20.2475978,8.99548155 C21.2140962,8.99548155 21.9975978,9.77898324 21.9975978,10.7454815 L21.9965355,11.7075533 C22.0161882,12.0763967 21.9863219,12.4145452 21.9090926,12.7218712 C21.4863415,12.3309685 21.0126613,11.9962622 20.4986714,11.7282519 L20.4975978,10.7454815 C20.4975978,10.6074104 20.385669,10.4954815 20.2475978,10.4954815 L15.9667491,10.4946942 C15.9871099,10.3311497 15.9975978,10.1645404 15.9975978,9.99548155 C15.9975978,9.65021263 15.9538526,9.31516095 15.8716023,8.99556665 L20.2475978,8.99548155 Z M11.9975978,8.49548155 C11.1691707,8.49548155 10.4975978,9.16705443 10.4975978,9.99548155 C10.4975978,10.8239087 11.1691707,11.4954815 11.9975978,11.4954815 C12.826025,11.4954815 13.4975978,10.8239087 13.4975978,9.99548155 C13.4975978,9.16705443 12.826025,8.49548155 11.9975978,8.49548155 Z M6.49759785,1.99548155 C8.1544521,1.99548155 9.49759785,3.3386273 9.49759785,4.99548155 C9.49759785,6.6523358 8.1544521,7.99548155 6.49759785,7.99548155 C4.8407436,7.99548155 3.49759785,6.6523358 3.49759785,4.99548155 C3.49759785,3.3386273 4.8407436,1.99548155 6.49759785,1.99548155 Z M17.4975978,1.99548155 C19.1544521,1.99548155 20.4975978,3.3386273 20.4975978,4.99548155 C20.4975978,6.6523358 19.1544521,7.99548155 17.4975978,7.99548155 C15.8407436,7.99548155 14.4975978,6.6523358 14.4975978,4.99548155 C14.4975978,3.3386273 15.8407436,1.99548155 17.4975978,1.99548155 Z M6.49759785,3.49548155 C5.66917072,3.49548155 4.99759785,4.16705443 4.99759785,4.99548155 C4.99759785,5.82390867 5.66917072,6.49548155 6.49759785,6.49548155 C7.32602497,6.49548155 7.99759785,5.82390867 7.99759785,4.99548155 C7.99759785,4.16705443 7.32602497,3.49548155 6.49759785,3.49548155 Z M17.4975978,3.49548155 C16.6691707,3.49548155 15.9975978,4.16705443 15.9975978,4.99548155 C15.9975978,5.82390867 16.6691707,6.49548155 17.4975978,6.49548155 C18.326025,6.49548155 18.9975978,5.82390867 18.9975978,4.99548155 C18.9975978,4.16705443 18.326025,3.49548155 17.4975978,3.49548155 Z" />
        </svg>
      </button>

      {/* Sidebars */}
      <VaultSidebar
        open={vaultSidebarOpen}
        onClose={() => setVaultSidebarOpen(false)}
        vaultItems={vaultItems}
        onOpenVaultModal={handleOpenVaultModal}
        onVaultUpdate={handleVaultUpdate}
        vaultItemAction={vaultItemAction}
      />

      <AvailableFiguresSidebar
        open={availableFiguresSidebarOpen}
        onClose={() => setAvailableFiguresSidebarOpen(false)}
        baseFigureGroups={availableFigureGroups}
        expandedAvailableFigures={expandedAvailableFigures}
        onToggleFigure={handleToggleAvailableFigure}
        onAddFigure={handleAddFigure}
        onOpenEquipmentDialog={handleOpenEquipmentDialog}
        addingFigureSlug={addingFigureSlug}
        warbandId={warbandId ?? null}
        hasLeader={hasLeader}
        warbandCrowns={warbandCrowns}
        figureCountsBySlug={figureCountsBySlug}
        onOpenSkillsDialog={handleOpenSkillsDialog}
        onOpenSpellsDialog={handleOpenSpellsDialog}
        onOpenStartingSkill={handleOpenStartingSkill}
        onOpenStartingSpell={handleOpenStartingSpell}
        onOpenStartingEquipment={handleOpenStartingEquipment}
        onOpenMutationsDialog={handleOpenMutationsDialog}
        onOpenBlessingsDialog={handleOpenBlessingsDialog}
      />

      <SoldierDetailSidebar
        open={soldierDetailSidebarOpen}
        onClose={() => {
          setSoldierDetailSidebarOpen(false);
          setSelectedSoldierId(null);
        }}
        selectedSoldier={selectedSoldier}
        selectedBaseFigure={selectedBaseFigure}
        factionSlug={warband.factionSlug ?? faction?.slug ?? null}
        relations={relations}
        equipableVaultItems={equipableVaultItems}
        soldierExtraSkillLists={soldierExtraSkillLists}
        soldierExtraSpellLores={soldierExtraSpellLores}
        warbandId={warbandId ?? null}
        onReload={() => resetAndReloadWarband()}
        heroSkillOptions={heroSkillOptions}
        onPromoteHero={handlePromoteHero}
        onPromoteLeader={handlePromoteLeader}
        promoteHeroLoading={promoteHeroLoading}
        promoteLeaderLoading={promoteLeaderLoading}
        hasLeaderInWarband={hasLeader}
        promotionRequest={promotionRequest}
        onClearPromotionRequest={handleClearPromotionRequest}
      />

      {/* Dialog de compartilhamento */}
      <Dialog
        open={shareLinkDialogOpen}
        onClose={() => setShareLinkDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#111",
            border: "1px solid rgba(134, 239, 172, 0.3)",
          },
        }}
      >
        <DialogContent
          dividers
          sx={{
            borderColor: "rgba(134, 239, 172, 0.2)",
            color: "#e4e4e7",
            position: "relative",
            paddingTop: 3,
          }}
        >
          <IconButton
            size="small"
            onClick={() => setShareLinkDialogOpen(false)}
            sx={{
              color: "#86efac",
              position: "absolute",
              top: 2,
              right: 8,
              zIndex: 1,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <h2 className="text-lg font-semibold text-green-200 mb-4">
            Link de Compartilhamento
          </h2>
          {shareLinkUrl ? (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-green-300 mb-2">
                  Link para compartilhar:
                </label>
                <div className="flex gap-2">
                  <TextField
                    fullWidth
                    value={shareLinkUrl}
                    InputProps={{ readOnly: true }}
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#0a0a0a",
                        color: "#e4e4e7",
                        "& fieldset": {
                          borderColor: "rgba(134, 239, 172, 0.3)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(134, 239, 172, 0.5)",
                        },
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigator.clipboard.writeText(shareLinkUrl);
                      toast.success(
                        "Link copiado para a área de transferência!"
                      );
                    }}
                    sx={{
                      borderColor: "rgba(134, 239, 172, 0.5)",
                      color: "#86efac",
                      "&:hover": {
                        borderColor: "rgba(134, 239, 172, 0.8)",
                        backgroundColor: "rgba(134, 239, 172, 0.1)",
                      },
                    }}
                  >
                    Copiar
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Compartilhe este link para permitir que outras pessoas
                visualizem seu bando (somente leitura).
              </p>
            </div>
          ) : (
            <div className="text-xs text-gray-400">Gerando link...</div>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            borderColor: "rgba(134, 239, 172, 0.2)",
            padding: 2,
          }}
        >
          <Button
            onClick={() => setShareLinkDialogOpen(false)}
            sx={{
              color: "#86efac",
            }}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
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
