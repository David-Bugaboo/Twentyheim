import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFactionBySlug } from "../../services/warbands.service";
import {
  fetchSpellLoreBySlug,
  fetchSkillListBySlug,
  fetchSupernaturalAbilities,
} from "../../services/queries.service";
import type { Faction } from "../../types/faction.entity";
import type {
  SpellLoreQueryResponse,
  SkillListQueryResponse,
  SupernaturalAbilityQueryResponse,
} from "../../services/queries.service";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import PageTitle from "../../components/PageTitle";
import { AvailableFiguresSection } from "../tools/warband-detail/components/AvailableFiguresSection";
import { CollapsibleSection } from "../tools/warband-detail/components/CollapsibleSection";
import {
  getRoleType,
  extractSkillListSlugs,
  extractSpellLoreSlugs,
} from "../tools/warband-detail/utils/helpers";
import type { FigureSummary } from "../tools/warband-detail/types";
import HeaderH1 from "../../components/HeaderH1";
import QuickNavigation from "../../components/QuickNavigation";
import GameText from "../../components/GameText";
import { EquipmentDialog } from "../tools/warband-detail/components/EquipmentDialog";
import { SkillsDialog } from "../tools/warband-detail/components/SkillsDialog";
import { SpellsDialog } from "../tools/warband-detail/components/SpellsDialog";
import { AvailableSupernaturalDialog } from "../tools/warband-detail/components/AvailableSupernaturalDialog";
import MagicTermTooltip from "../../components/MagicTermTooltip";
import type {
  SkillListDialogEntry,
  SpellLoreDialogEntry,
  EquipmentSummary,
} from "../tools/warband-detail/types";

const GenericWarbandPage: React.FC = () => {
  const { factionSlug } = useParams<{ factionSlug: string }>();
  const [faction, setFaction] = useState<Faction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedAvailableFigures, setExpandedAvailableFigures] = useState<
    Record<string, boolean>
  >({}); // Todas as figuras começam expandidas (true por padrão)
  const [loreExpanded, setLoreExpanded] = useState(false);
  const [spellLores, setSpellLores] = useState<
    Record<string, SpellLoreQueryResponse>
  >({});
  const [skillLists, setSkillLists] = useState<
    Record<string, SkillListQueryResponse>
  >({});
  const [mutations, setMutations] = useState<
    SupernaturalAbilityQueryResponse[]
  >([]);
  const [blessings, setBlessings] = useState<
    SupernaturalAbilityQueryResponse[]
  >([]);
  const [loadingSpellLores, setLoadingSpellLores] = useState(false);
  const [loadingSkillLists, setLoadingSkillLists] = useState(false);
  const [loadingMutations, setLoadingMutations] = useState(false);
  const [loadingBlessings, setLoadingBlessings] = useState(false);

  // Estados para dialogs
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
  const [mutationsDialogOpen, setMutationsDialogOpen] = useState(false);
  const [mutationsDialogFigureName, setMutationsDialogFigureName] =
    useState("");
  const [blessingsDialogOpen, setBlessingsDialogOpen] = useState(false);
  const [blessingsDialogFigureName, setBlessingsDialogFigureName] =
    useState("");

  const warbandInfo = useMemo(() => {
    if (!faction) return null;
    // Extrair dados do faction para compatibilidade com código existente
    const allSpellLores = new Set<string>();
    const allSkillLists = new Set<string>();

    faction.figures?.forEach(figure => {
      figure.spellLores?.forEach(lore => {
        if (lore.slug) allSpellLores.add(lore.slug);
      });
      figure.skillLists?.forEach(list => {
        if (list.slug) allSkillLists.add(list.slug);
      });
    });

    return {
      spellLores: Array.from(allSpellLores),
      skillLists: Array.from(allSkillLists),
      specialRules: [] as Array<string | { label: string; value?: string }>,
      showMutations: false,
      showBlessings: false,
      lore: null as string | null,
      bandStructure: null as string | null,
    };
  }, [faction]);

  useEffect(() => {
    if (!factionSlug) {
      setError("Slug da facção não fornecido");
      setLoading(false);
      return;
    }

    let abort = false;
    const controller = new AbortController();

    const loadFaction = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedFaction = await fetchFactionBySlug(
          factionSlug,
          controller.signal
        );
        if (!abort) {
          setFaction(fetchedFaction);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar facção:", err);
          setError("Não foi possível carregar a facção.");
        }
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void loadFaction();

    return () => {
      abort = true;
      controller.abort();
    };
  }, [factionSlug]);

  // Buscar spell lores
  useEffect(() => {
    if (!warbandInfo?.spellLores || warbandInfo.spellLores.length === 0) return;

    let abort = false;
    const controller = new AbortController();

    const loadSpellLores = async () => {
      setLoadingSpellLores(true);
      const results: Record<string, SpellLoreQueryResponse> = {};

      try {
        await Promise.all(
          warbandInfo.spellLores!.map(async (slug: string) => {
            try {
              const lore = await fetchSpellLoreBySlug(slug, controller.signal);
              if (!abort) {
                results[slug] = lore;
              }
            } catch (err) {
              console.error(`Erro ao carregar spell lore ${slug}:`, err);
            }
          })
        );
        if (!abort) {
          setSpellLores(results);
        }
      } finally {
        if (!abort) {
          setLoadingSpellLores(false);
        }
      }
    };

    void loadSpellLores();

    return () => {
      abort = true;
      controller.abort();
    };
  }, [warbandInfo?.spellLores]);

  // Buscar skill lists
  useEffect(() => {
    if (!warbandInfo?.skillLists || warbandInfo.skillLists.length === 0) return;

    let abort = false;
    const controller = new AbortController();

    const loadSkillLists = async () => {
      setLoadingSkillLists(true);
      const results: Record<string, SkillListQueryResponse> = {};

      try {
        await Promise.all(
          warbandInfo.skillLists!.map(async (slug: string) => {
            try {
              const list = await fetchSkillListBySlug(slug, controller.signal);
              if (!abort) {
                results[slug] = list;
              }
            } catch (err) {
              console.error(`Erro ao carregar skill list ${slug}:`, err);
            }
          })
        );
        if (!abort) {
          setSkillLists(results);
        }
      } finally {
        if (!abort) {
          setLoadingSkillLists(false);
        }
      }
    };

    void loadSkillLists();

    return () => {
      abort = true;
      controller.abort();
    };
  }, [warbandInfo?.skillLists]);

  // Buscar mutations
  useEffect(() => {
    if (!warbandInfo?.showMutations) return;

    let abort = false;
    const controller = new AbortController();

    const loadMutations = async () => {
      setLoadingMutations(true);
      try {
        const allAbilities = await fetchSupernaturalAbilities(
          controller.signal
        );
        const filtered = allAbilities.filter(
          ability => ability.category === "Mutação"
        );
        if (!abort) {
          setMutations(filtered);
        }
      } catch (err) {
        console.error("Erro ao carregar mutações:", err);
      } finally {
        if (!abort) {
          setLoadingMutations(false);
        }
      }
    };

    void loadMutations();

    return () => {
      abort = true;
      controller.abort();
    };
  }, [warbandInfo?.showMutations]);

  // Buscar blessings
  useEffect(() => {
    if (!warbandInfo?.showBlessings) return;

    let abort = false;
    const controller = new AbortController();

    const loadBlessings = async () => {
      setLoadingBlessings(true);
      try {
        const allAbilities = await fetchSupernaturalAbilities(
          controller.signal
        );
        const filtered = allAbilities.filter(
          ability => ability.category === "Benção de Nurgle"
        );
        if (!abort) {
          setBlessings(filtered);
        }
      } catch (err) {
        console.error("Erro ao carregar bênçãos:", err);
      } finally {
        if (!abort) {
          setLoadingBlessings(false);
        }
      }
    };

    void loadBlessings();

    return () => {
      abort = true;
      controller.abort();
    };
  }, [warbandInfo?.showBlessings]);

  const baseFigures = useMemo<FigureSummary[]>(
    () => faction?.figures ?? [],
    [faction]
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

  const handleToggleFigure = (figureId: string) => {
    setExpandedAvailableFigures(prev => ({
      ...prev,
      [figureId]: !prev[figureId],
    }));
  };

  const handleOpenEquipmentDialog = useCallback(
    (figureName: string, items: EquipmentSummary[]) => {
      setEquipmentDialogTitle(`Equipamentos disponíveis — ${figureName}`);
      setEquipmentDialogItems(items);
      setEquipmentDialogOpen(true);
    },
    []
  );

  const handleCloseEquipmentDialog = useCallback(() => {
    setEquipmentDialogOpen(false);
    setEquipmentDialogItems([]);
  }, []);

  const handleOpenSkillsDialog = useCallback(
    async (figureName: string, figureData: unknown) => {
      const baseSlugs = extractSkillListSlugs(figureData);
      if (baseSlugs.length === 0) return;

      setSkillsDialogTitle(`Habilidades disponíveis — ${figureName}`);
      setSkillsDialogError(null);
      setSkillsDialogLists([]);
      setSkillsDialogOpen(true);
      setSkillsDialogLoading(true);

      try {
        const entries = await Promise.all(
          baseSlugs.map(async slug => {
            if (!slug) return null;
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
              return null;
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
        setSkillsDialogError(
          "Não foi possível carregar as habilidades desta figura."
        );
      } finally {
        setSkillsDialogLoading(false);
      }
    },
    []
  );

  const handleCloseSkillsDialog = useCallback(() => {
    setSkillsDialogOpen(false);
    setSkillsDialogLists([]);
    setSkillsDialogError(null);
    setSkillsDialogSelectedSlug("");
  }, []);

  const handleOpenSpellsDialog = useCallback(
    async (figureName: string, figureData: unknown) => {
      const baseSlugs = extractSpellLoreSlugs(figureData);
      if (baseSlugs.length === 0) return;

      setSpellsDialogTitle(`Magias disponíveis — ${figureName}`);
      setSpellsDialogError(null);
      setSpellsDialogLores([]);
      setSpellsDialogOpen(true);
      setSpellsDialogLoading(true);

      try {
        const entries = await Promise.all(
          baseSlugs.map(async slug => {
            if (!slug) return null;
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
              return null;
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
        setSpellsDialogError(
          "Não foi possível carregar as magias desta figura."
        );
      } finally {
        setSpellsDialogLoading(false);
      }
    },
    []
  );

  const handleCloseSpellsDialog = useCallback(() => {
    setSpellsDialogOpen(false);
    setSpellsDialogLores([]);
    setSpellsDialogError(null);
    setSpellsDialogSelectedSlug("");
  }, []);

  const handleOpenMutationsDialog = useCallback((figureName: string) => {
    setMutationsDialogFigureName(figureName);
    setMutationsDialogOpen(true);
  }, []);

  const handleCloseMutationsDialog = useCallback(() => {
    setMutationsDialogOpen(false);
    setMutationsDialogFigureName("");
  }, []);

  const handleOpenBlessingsDialog = useCallback((figureName: string) => {
    setBlessingsDialogFigureName(figureName);
    setBlessingsDialogOpen(true);
  }, []);

  const handleCloseBlessingsDialog = useCallback(() => {
    setBlessingsDialogOpen(false);
    setBlessingsDialogFigureName("");
  }, []);

  const navigationSections = useMemo(() => {
    const baseSections: Array<{
      id: string;
      title: string;
      level: number;
      children?: Array<{ id: string; title: string; level: number }>;
    }> = [];

    // Adiciona seção de lore se existir
    if (warbandInfo?.lore) {
      baseSections.push({ id: "lore", title: "Lore", level: 0 });
    }

    // Adiciona seção de estrutura do bando se existir
    if (warbandInfo?.bandStructure) {
      baseSections.push({
        id: "estrutura-bando",
        title: "Estrutura do Bando",
        level: 0,
      });
    }

    // Adiciona seção de regras especiais se existir
    if (warbandInfo?.specialRules && warbandInfo.specialRules.length > 0) {
      baseSections.push({
        id: "regras-especiais",
        title: "Regras Especiais",
        level: 0,
        children: warbandInfo.specialRules.map(
          (
            rule: string | { label: string; value?: string },
            index: number
          ) => ({
            id: `regra-${index}`,
            title: typeof rule === "string" ? rule : rule.label,
            level: 1,
          })
        ),
      });
    }

    // Adiciona seções de spell lores
    if (warbandInfo?.spellLores && warbandInfo.spellLores.length > 0) {
      baseSections.push({
        id: "tradicoes-magicas",
        title: "Tradições Mágicas",
        level: 0,
        children: Object.values(spellLores).map(lore => ({
          id: `spell-lore-${lore.slug}`,
          title: lore.name,
          level: 1,
        })),
      });
    }

    // Adiciona seções de skill lists
    if (warbandInfo?.skillLists && warbandInfo.skillLists.length > 0) {
      baseSections.push({
        id: "listas-de-habilidades",
        title: "Listas de Habilidades",
        level: 0,
        children: Object.values(skillLists).map(list => ({
          id: `skill-list-${list.slug}`,
          title: list.name,
          level: 1,
        })),
      });
    }

    // Adiciona seção de mutações se existir
    if (warbandInfo?.showMutations && mutations.length > 0) {
      baseSections.push({
        id: "mutacoes",
        title: "Mutações",
        level: 0,
        children: mutations.map(mutation => ({
          id: `mutation-${mutation.slug}`,
          title: mutation.name,
          level: 1,
        })),
      });
    }

    // Adiciona seção de bênçãos se existir
    if (warbandInfo?.showBlessings && blessings.length > 0) {
      baseSections.push({
        id: "bencaos-de-nurgle",
        title: "Bençãos de Nurgle",
        level: 0,
        children: blessings.map(blessing => ({
          id: `blessing-${blessing.slug}`,
          title: blessing.name,
          level: 1,
        })),
      });
    }

    // Adiciona seção de figuras
    baseSections.push({ id: "figuras", title: "Figuras", level: 0 });

    // Helper para obter o ID da figura (mesma lógica do AvailableFiguresSection)
    const getFigureId = (figure: FigureSummary): string => {
      return (
        figure.id ||
        figure.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
      );
    };

    // Cria seções para cada grupo de figuras
    const figureSections: Array<{
      id: string;
      title: string;
      level: number;
      children?: Array<{ id: string; title: string; level: number }>;
    }> = [];

    baseFigureGroups.forEach(group => {
      const groupId = group.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");

      figureSections.push({
        id: groupId,
        title: group.title,
        level: 0,
        children: group.items.map(figure => ({
          id: getFigureId(figure),
          title: figure.name,
          level: 1,
        })),
      });
    });

    return [...baseSections, ...figureSections];
  }, [
    warbandInfo,
    baseFigureGroups,
    spellLores,
    skillLists,
    mutations,
    blessings,
  ]);

  if (loading) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <PageTitle>{faction?.name ?? "Carregando..."}</PageTitle>
            <MobileSection>
              <MobileText>Carregando figuras...</MobileText>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <PageTitle>{faction?.name ?? "Erro"}</PageTitle>
            <MobileSection>
              <MobileText className="text-red-400">{error}</MobileText>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} loading={loading} />
          <PageTitle>{faction?.name ?? "Bando"}</PageTitle>

          {/* Lore - Colapsável */}
          {warbandInfo?.lore && (
            <MobileSection id="lore">
              <CollapsibleSection
                title="Lore"
                expanded={loreExpanded}
                onToggle={() => setLoreExpanded(!loreExpanded)}
              >
                <div
                  className="prose prose-invert max-w-none text-gray-300"
                  dangerouslySetInnerHTML={{ __html: warbandInfo.lore }}
                />
              </CollapsibleSection>
            </MobileSection>
          )}

          {/* Estrutura do Bando - Não colapsável */}
          {warbandInfo?.bandStructure && (
            <MobileSection id="estrutura-bando">
              <HeaderH1>Estrutura do Bando</HeaderH1>
              <div
                className="prose prose-invert max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: warbandInfo.bandStructure }}
              />
            </MobileSection>
          )}

          {/* Regras Especiais */}
          {warbandInfo?.specialRules && warbandInfo.specialRules.length > 0 && (
            <MobileSection id="regras-especiais">
              <HeaderH1>Regras Especiais</HeaderH1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {warbandInfo.specialRules.map(
                  (
                    rule: string | { label: string; value?: string },
                    index: number
                  ) => {
                    const ruleData =
                      typeof rule === "string"
                        ? { label: rule, value: "" }
                        : rule;
                    return (
                      <div
                        key={index}
                        id={`regra-${index}`}
                        className="rounded border border-green-800/40 bg-[#101010] p-2"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-md font-semibold text-green-200">
                              {ruleData.label}
                            </h4>
                          </div>
                          {ruleData.value && (
                            <div className="text-xs text-gray-300">
                              <GameText component="div">
                                {ruleData.value}
                              </GameText>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </MobileSection>
          )}

          {/* Tradições Mágicas */}
          {warbandInfo?.spellLores && warbandInfo.spellLores.length > 0 && (
            <MobileSection id="tradicoes-magicas">
              <HeaderH1>Tradições Mágicas</HeaderH1>
              {loadingSpellLores ? (
                <MobileText>Carregando tradições mágicas...</MobileText>
              ) : (
                <div className="space-y-6">
                  {Object.values(spellLores).map(lore => (
                    <div key={lore.slug} id={`spell-lore-${lore.slug}`}>
                      <h3 className="mb-3 font-semibold text-blue-200 text-lg">
                        {lore.name}
                      </h3>
                      {lore.description && (
                        <div className="mb-4 text-blue-100">
                          <GameText>{lore.description}</GameText>
                        </div>
                      )}
                      {lore.spells && lore.spells.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-blue-300 text-sm uppercase tracking-wide mb-3">
                            Magias
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {lore.spells.map(spell => (
                              <div
                                key={spell.slug || spell.id}
                                className="rounded border border-blue-800/40 bg-[#101010] p-2"
                              >
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h4 className="text-md font-semibold text-blue-200">
                                      {spell.name}
                                    </h4>
                                  </div>
                                  <div className="text-xs text-gray-300">
                                    <GameText component="div">
                                      {spell.description ?? ""}
                                    </GameText>
                                  </div>
                                  {typeof spell.difficultyClass === "number" ? (
                                    <div className="text-[11px] text-blue-300">
                                      Dificuldade: {spell.difficultyClass}
                                    </div>
                                  ) : null}
                                  {Array.isArray(spell.keywords) &&
                                  spell.keywords.length > 0 ? (
                                    <div className="text-[11px] text-blue-200 flex flex-wrap items-center gap-1">
                                      <span>Palavras-chave:</span>
                                      {spell.keywords.map(
                                        (keyword, index, arr) => (
                                          <span
                                            key={index}
                                            className="inline-flex items-center"
                                          >
                                            <MagicTermTooltip component="span">
                                              {keyword.trim()}
                                            </MagicTermTooltip>
                                            {index < arr.length - 1 && (
                                              <span>,</span>
                                            )}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </MobileSection>
          )}

          {/* Listas de Habilidades */}
          {warbandInfo?.skillLists && warbandInfo.skillLists.length > 0 && (
            <MobileSection id="listas-de-habilidades">
              <HeaderH1>Listas de Habilidades</HeaderH1>
              {loadingSkillLists ? (
                <MobileText>Carregando listas de habilidades...</MobileText>
              ) : (
                <div className="space-y-6">
                  {Object.values(skillLists).map(list => (
                    <div key={list.slug} id={`skill-list-${list.slug}`}>
                      <h3 className="mb-3 font-semibold text-green-200 text-lg">
                        {list.name}
                      </h3>
                      {list.description && (
                        <div className="mb-4 text-green-100">
                          <GameText>{list.description}</GameText>
                        </div>
                      )}
                      {list.skills && list.skills.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-green-300 text-sm uppercase tracking-wide mb-3">
                            Habilidades
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {list.skills.map(skill => (
                              <div
                                key={skill.slug || skill.id}
                                className="rounded border border-green-800/40 bg-[#101010] p-2"
                              >
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h4 className="text-md font-semibold text-green-200">
                                      {skill.name}
                                    </h4>
                                  </div>
                                  <div className="text-xs text-gray-300">
                                    <GameText component="div">
                                      {skill.description ?? ""}
                                    </GameText>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </MobileSection>
          )}

          {/* Mutações */}
          {warbandInfo?.showMutations && (
            <MobileSection id="mutacoes">
              <HeaderH1>Mutações</HeaderH1>
              {loadingMutations ? (
                <MobileText>Carregando mutações...</MobileText>
              ) : mutations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mutations.map(mutation => (
                    <div
                      key={mutation.slug}
                      id={`mutation-${mutation.slug}`}
                      className="rounded border border-purple-800/40 bg-[#101010] p-2"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-md font-semibold text-purple-200">
                            {mutation.name}
                          </h4>
                        </div>
                        {mutation.cost && (
                          <div className="text-[11px] text-purple-300">
                            Custo: {mutation.cost}
                          </div>
                        )}
                        {mutation.description && (
                          <div className="text-xs text-gray-300">
                            <GameText component="div">
                              {mutation.description}
                            </GameText>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <MobileText>Nenhuma mutação encontrada.</MobileText>
              )}
            </MobileSection>
          )}

          {/* Bençãos de Nurgle */}
          {warbandInfo?.showBlessings && (
            <MobileSection id="bencaos-de-nurgle">
              <HeaderH1>Bençãos de Nurgle</HeaderH1>
              {loadingBlessings ? (
                <MobileText>Carregando bênçãos...</MobileText>
              ) : blessings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {blessings.map(blessing => (
                    <div
                      key={blessing.slug}
                      id={`blessing-${blessing.slug}`}
                      className="rounded border border-green-800/40 bg-[#101010] p-2"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-md font-semibold text-green-200">
                            {blessing.name}
                          </h4>
                        </div>
                        {blessing.cost && (
                          <div className="text-[11px] text-green-300">
                            Custo: {blessing.cost}
                          </div>
                        )}
                        {blessing.description && (
                          <div className="text-xs text-gray-300">
                            <GameText component="div">
                              {blessing.description}
                            </GameText>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <MobileText>Nenhuma bênção encontrada.</MobileText>
              )}
            </MobileSection>
          )}

          {/* Figuras */}
          <MobileSection id="figuras">
            <HeaderH1 id="figuras">Figuras</HeaderH1>
            <AvailableFiguresSection
              baseFigureGroups={baseFigureGroups}
              expandedAvailableFigures={expandedAvailableFigures}
              onToggleFigure={handleToggleFigure}
              onAddFigure={() => {}}
              onOpenEquipmentDialog={
                handleOpenEquipmentDialog as (
                  figureName: string,
                  items: unknown[]
                ) => void
              }
              addingFigureSlug={null}
              warbandId={null}
              hasLeader={false}
              warbandCrowns={null}
              figureCountsBySlug={new Map()}
              onOpenSkillsDialog={handleOpenSkillsDialog}
              onOpenSpellsDialog={handleOpenSpellsDialog}
              onOpenMutationsDialog={handleOpenMutationsDialog}
              onOpenBlessingsDialog={handleOpenBlessingsDialog}
            />
          </MobileSection>
        </div>
      </div>

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
        open={mutationsDialogOpen}
        onClose={handleCloseMutationsDialog}
        category="Mutação"
        figureName={mutationsDialogFigureName}
      />

      <AvailableSupernaturalDialog
        open={blessingsDialogOpen}
        onClose={handleCloseBlessingsDialog}
        category="Benção de Nurgle"
        figureName={blessingsDialogFigureName}
      />
    </div>
  );
};

export default GenericWarbandPage;
