import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import type { Warband } from "../../types/warband.entity";
import type { Faction } from "../../types/faction.entity";
import type { WarbandSoldier } from "../../types/warband-soldier.entity";
import type { BaseFigure } from "../../types/base-figure.entity";
import {
  getRoleType,
  normalizeString,
  formatDate,
  extractSkillListSlugs,
  extractSpellLoreSlugs,
  extractExtraSkillListSlugs,
  extractExtraSpellLoreSlugs,
} from "../tools/warband-detail/utils/helpers";
import { SoldierListSectionReadOnly } from "./components/SoldierListSectionReadOnly";
import { SoldierDetailSectionReadOnly } from "./components/SoldierDetailSectionReadOnly";
import { fetchSharedLinkById } from "../../services/warbands.service";
import { Spinner } from "../tools/warband-detail/components/CommonComponents";
import { toast } from "react-toastify";
import { Sidebar } from "../tools/warband-detail/components/Sidebar";
import { EquipmentDialog } from "../tools/warband-detail/components/EquipmentDialog";
import { SkillsDialog } from "../tools/warband-detail/components/SkillsDialog";
import { SpellsDialog } from "../tools/warband-detail/components/SpellsDialog";
import { AvailableSupernaturalDialog } from "../tools/warband-detail/components/AvailableSupernaturalDialog";
import {
  fetchSkillListBySlug,
  fetchSpellLoreBySlug,
} from "../../services/queries.service";
import type { EquipmentSummary } from "../tools/warband-detail/types";
import type {
  SkillListDialogEntry,
  SpellLoreDialogEntry,
} from "../tools/warband-detail/types";
import type { ExtraSkillListToWarbandSoldier } from "../../types/extra-skill-list-to-warband-soldier.entity";
import type { ExtraSpellLoreToWarbandSoldier } from "../../types/extra-spell-lore-to-warband-soldier.entity";

const SharedWarbandPageNew: React.FC = () => {
  const { id: linkId } = useParams<{ id: string }>();
  const [selectedSoldierId, setSelectedSoldierId] = useState<string | null>(
    null
  );
  const [soldierDetailSidebarOpen, setSoldierDetailSidebarOpen] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [warbandData, setWarbandData] = useState<Warband | null>(null);
  const [, setError] = useState<string | null>(null);

  // Dialog states
  const [equipmentDialogOpen, setEquipmentDialogOpen] = useState(false);
  const [equipmentDialogTitle, setEquipmentDialogTitle] = useState("");
  const [equipmentDialogItems, setEquipmentDialogItems] = useState<
    EquipmentSummary[]
  >([]);

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

  // Buscar dados do link compartilhado
  useEffect(() => {
    if (!linkId) {
      setError("ID do link não fornecido.");
      setLoading(false);
      return;
    }

    let abort = false;
    const controller = new AbortController();

    const loadSharedWarband = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSharedLinkById(linkId, controller.signal);
        if (!abort) {
          const snapshot = data.bandSnapShot as Warband;
          setWarbandData(snapshot);
        }
      } catch (err) {
        if (!abort) {
          console.error(err);
          setError("Não foi possível carregar o bando compartilhado.");
          toast.error("Bando compartilhado não encontrado ou expirado.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadSharedWarband();

    return () => {
      abort = true;
      controller.abort();
    };
  }, [linkId]);

  const factionData = useMemo(() => {
    if (!warbandData?.faction) return null;
    return warbandData.faction as Faction;
  }, [warbandData]);

  const soldiers = useMemo(
    () => warbandData?.warbandSoldiers ?? [],
    [warbandData]
  );

  const activeSoldiers = useMemo(
    () => soldiers.filter(soldier => soldier.active !== false),
    [soldiers]
  );

  const selectedSoldier = useMemo(
    () => soldiers.find(soldier => soldier.id === selectedSoldierId) ?? null,
    [soldiers, selectedSoldierId]
  );

  const selectedBaseFigure = useMemo(() => {
    const relation = selectedSoldier?.baseFigure?.[0];
    return relation?.baseFigure ?? null;
  }, [selectedSoldier]);

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

  const handleSelectSoldier = (soldierId: string) => {
    setSelectedSoldierId(soldierId);
    setSoldierDetailSidebarOpen(true);
  };

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

  const handleOpenSkillsDialog = useCallback(
    async (
      figureName: string,
      figureData: unknown,
      extraLists?: ExtraSkillListToWarbandSoldier[] | null
    ) => {
      const baseSlugs = extractSkillListSlugs(figureData);
      const extraSlugs = extractExtraSkillListSlugs(extraLists);
      const combinedSlugs = Array.from(
        new Set([...baseSlugs, ...extraSlugs])
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
        new Set([...baseSlugs, ...extraSlugs])
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
    []
  );

  const handleCloseSpellsDialog = () => {
    setSpellsDialogOpen(false);
    setSpellsDialogLores([]);
    setSpellsDialogError(null);
    setSpellsDialogSelectedSlug("");
  };

  const handleOpenMutationsDialog = useCallback((figureName: string) => {
    setAvailableMutationsDialogFigureName(figureName);
    setAvailableMutationsDialogOpen(true);
  }, []);

  const handleCloseMutationsDialog = () => {
    setAvailableMutationsDialogOpen(false);
    setAvailableMutationsDialogFigureName("");
  };

  const handleOpenBlessingsDialog = useCallback((figureName: string) => {
    setAvailableBlessingsDialogFigureName(figureName);
    setAvailableBlessingsDialogOpen(true);
  }, []);

  const handleCloseBlessingsDialog = () => {
    setAvailableBlessingsDialogOpen(false);
    setAvailableBlessingsDialogFigureName("");
  };

  const relations = useMemo(() => {
    if (!selectedSoldier) return null;
    return {
      equipment: (selectedSoldier.equipment ?? []) as unknown[],
      skills: (selectedSoldier.skills ?? []) as unknown[],
      spells: (selectedSoldier.spells ?? []) as unknown[],
      advancements: (selectedSoldier.advancements ?? []) as unknown[],
      injuries: (selectedSoldier.injuries ?? []) as unknown[],
      supernatural: (selectedSoldier.supernaturalAbilities ?? []) as unknown[],
    };
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

  const crowns = warbandData?.crowns ?? 0;
  const wyrdstone = warbandData?.wyrdstone ?? 0;
  const warbandOwnerName = warbandData?.user?.name ?? "-";

  if (loading && !warbandData) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-[#121212] dark group/design-root">
        <div className="flex flex-1 items-center justify-center px-4 py-20">
          <Spinner label="Carregando dados do bando..." />
        </div>
      </div>
    );
  }

  if (!warbandData) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-[#121212] dark group/design-root">
        <div className="py-6">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <PageTitle>Bando não encontrado</PageTitle>
            <p className="mt-4 text-gray-400">
              Não foi possível localizar este bando. Verifique se o link está
              correto.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#121212] dark group/design-root">
      <div className="py-4 sm:py-6 overflow-y-auto xl:flex xl:flex-1 xl:flex-col xl:overflow-hidden">
        <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:flex xl:h-full xl:flex-1 xl:flex-col xl:overflow-hidden xl:px-24 2xl:px-32">
          <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-2 flex-1">
              <PageTitle className="text-center md:text-left">
                {warbandData.name}
              </PageTitle>
              <div className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                <span className="rounded bg-green-900/30 px-3 py-1 font-semibold text-green-200">
                  {factionData?.name ??
                    warbandData.faction?.name ??
                    warbandData.factionSlug}
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
                  <strong>Qualidade do bando:</strong> {warbandRating}
                </span>
                <span>
                  <strong>Criado em:</strong>{" "}
                  {formatDate(warbandData.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="xl:flex-1 xl:min-h-0 xl:overflow-hidden">
            {/* Soldiers list */}
            <div className="xl:flex xl:h-full xl:min-h-0 xl:flex-col">
              <div className="space-y-4 xl:flex-1 xl:min-h-0 xl:overflow-y-auto xl:pr-2">
                <SoldierListSectionReadOnly
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
                  onOpenEquipmentDialog={handleOpenEquipmentDialog}
                  onOpenSkillsDialog={
                    handleOpenSkillsDialog as (
                      figureName: string,
                      figureData: unknown,
                      extraLists?: unknown[] | null
                    ) => void
                  }
                  onOpenSpellsDialog={
                    handleOpenSpellsDialog as (
                      figureName: string,
                      figureData: unknown,
                      extraLores?: unknown[] | null
                    ) => void
                  }
                  onOpenMutationsDialog={handleOpenMutationsDialog}
                  onOpenBlessingsDialog={handleOpenBlessingsDialog}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebars removidas - não fazem sentido no contexto de compartilhamento */}

      <SoldierDetailSidebarReadOnly
        open={soldierDetailSidebarOpen}
        onClose={() => {
          setSoldierDetailSidebarOpen(false);
          setSelectedSoldierId(null);
        }}
        selectedSoldier={selectedSoldier}
        selectedBaseFigure={selectedBaseFigure}
        factionSlug={warbandData.factionSlug ?? factionData?.slug ?? null}
        warbandData={warbandData}
        factionData={factionData}
        relations={relations}
        soldierExtraSkillLists={soldierExtraSkillLists}
        soldierExtraSpellLores={soldierExtraSpellLores}
      />

      {/* Dialogs */}
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
    </div>
  );
};

// Componentes auxiliares read-only
const SoldierDetailSidebarReadOnly: React.FC<{
  open: boolean;
  onClose: () => void;
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  factionSlug: string | null;
  warbandData: Warband;
  factionData: Faction | null;
  relations: {
    equipment: unknown[];
    skills: unknown[];
    spells: unknown[];
    advancements: unknown[];
    injuries: unknown[];
    supernatural: unknown[];
  } | null;
  soldierExtraSkillLists: unknown[];
  soldierExtraSpellLores: unknown[];
}> = ({
  open,
  onClose,
  selectedSoldier,
  selectedBaseFigure,
  factionSlug,
  warbandData,
  factionData,
  relations,
  soldierExtraSkillLists,
  soldierExtraSpellLores,
}) => {
  const title = selectedSoldier?.campaignName?.trim()
    ? `Detalhes — ${selectedSoldier.campaignName.trim()}`
    : selectedBaseFigure?.name
      ? `Detalhes — ${selectedBaseFigure.name}`
      : "Detalhes da Figura";

  return (
    <Sidebar open={open} onClose={onClose} title={title}>
      <SoldierDetailSectionReadOnly
        selectedSoldier={selectedSoldier}
        selectedBaseFigure={selectedBaseFigure}
        factionSlug={factionSlug}
        warbandData={warbandData}
        factionData={factionData}
        relations={relations}
        soldierExtraSkillLists={soldierExtraSkillLists}
        soldierExtraSpellLores={soldierExtraSpellLores}
      />
    </Sidebar>
  );
};

export default SharedWarbandPageNew;
