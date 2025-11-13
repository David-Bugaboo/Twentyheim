import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { ExtraSpellLoreToWarbandSoldier } from "../../../../types/extra-spell-lore-to-warband-soldier.entity";
import type { SpellToWarbandSoldier } from "../../../../types/spell-to-warband-soldier.entity";
import { fetchSpellLoreBySlug } from "../../../../services/queries.service";
import { addSpellToSoldier, removeSpellFromSoldier } from "../../../../services/soldiers.service";
import {
  extractSpellLoreSlugs,
  extractExtraSpellLoreSlugs,
} from "../utils/helpers";
import type { SoldierSpellOption } from "../types";

type UseSpellsManagementProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  soldierExtraSpellLores: ExtraSpellLoreToWarbandSoldier[];
  relations: { spells: SpellToWarbandSoldier[] };
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const useSpellsManagement = ({
  selectedSoldier,
  selectedBaseFigure,
  soldierExtraSpellLores,
  relations,
  warbandId,
  onReload,
}: UseSpellsManagementProps) => {
  const [expanded, setExpanded] = useState(true);
  const [availableOptions, setAvailableOptions] = useState<SoldierSpellOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlugToAdd, setSelectedSlugToAdd] = useState("");
  const [actionState, setActionState] = useState<
    | { type: "add"; targetId: string | null }
    | { type: "remove"; targetId: string }
    | null
  >(null);

  useEffect(() => {
    if (!selectedSoldier || !selectedBaseFigure) {
      setAvailableOptions([]);
      setSelectedSlugToAdd("");
      setError(null);
      setLoading(false);
      return;
    }

    const baseFigureSpellLoreSlugs = extractSpellLoreSlugs(selectedBaseFigure);
    const extraSpellLoreSlugs = extractExtraSpellLoreSlugs(soldierExtraSpellLores);
    const combinedSpellLoreSlugs = Array.from(
      new Set([...baseFigureSpellLoreSlugs, ...extraSpellLoreSlugs])
    ).filter(slug => slug.length > 0);

    if (combinedSpellLoreSlugs.length === 0) {
      setAvailableOptions([]);
      setSelectedSlugToAdd("");
      setError(null);
      setLoading(false);
      return;
    }

    let abort = false;
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const lores = await Promise.all(
          combinedSpellLoreSlugs.map(async slug => {
            if (!slug) return null;
            try {
              const data = await fetchSpellLoreBySlug(slug, controller.signal);
              return {
                slug,
                name: data.name ?? slug,
                description: data.description ?? null,
                spells: data.spells ?? [],
              };
            } catch (error) {
              console.error(error);
              return {
                slug,
                name: slug,
                description: null,
                spells: [],
              };
            }
          })
        );

        if (abort) {
          return;
        }

        const existingSpellSlugs = new Set(
          (relations.spells ?? []).map(spell => spell.spellSlug ?? "")
        );

        const flattened: SoldierSpellOption[] = lores
          .filter(
            (
              lore
            ): lore is {
              slug: string;
              name: string;
              description: string | null;
              spells: Array<{
                slug?: string;
                name?: string;
                description?: string | null;
                difficultyClass?: number | null;
                keywords?: string[] | null;
              }>;
            } => lore !== null
          )
          .flatMap(lore =>
            lore.spells
              .map(spell => {
                const slug = spell.slug ?? "";
                if (!slug) {
                  return null;
                }

                return {
                  slug,
                  name: spell.name ?? slug,
                  description: spell.description ?? null,
                  difficultyClass: spell.difficultyClass ?? null,
                  keywords: spell.keywords ?? null,
                  loreSlug: lore.slug,
                  loreName: lore.name,
                } as SoldierSpellOption;
              })
              .filter(
                (option): option is SoldierSpellOption =>
                  option !== null && !existingSpellSlugs.has(option.slug)
              )
          );

        setAvailableOptions(flattened);
        setSelectedSlugToAdd(prev =>
          prev && flattened.some(option => option.slug === prev)
            ? prev
            : (flattened[0]?.slug ?? "")
        );

        if (flattened.length === 0) {
          setError("Nenhuma magia disponível para adicionar no momento.");
        }
      } catch (error) {
        if (abort) {
          return;
        }
        console.error(error);
        setAvailableOptions([]);
        setSelectedSlugToAdd("");
        setError("Não foi possível carregar as magias disponíveis.");
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      abort = true;
      controller.abort();
    };
  }, [
    relations.spells,
    selectedBaseFigure,
    selectedSoldier,
    soldierExtraSpellLores,
  ]);

  const handleAdd = useCallback(async () => {
    if (!selectedSoldier) {
      toast.error("Selecione uma figura antes de adicionar magias.");
      return;
    }

    if (!warbandId) {
      toast.error("Identificador do bando não encontrado.");
      return;
    }

    if (!selectedSlugToAdd) {
      toast.error("Escolha uma magia disponível antes de adicionar.");
      return;
    }

    setActionState({ type: "add", targetId: selectedSlugToAdd });

    try {
      await addSpellToSoldier(selectedSoldier.id, selectedSlugToAdd);
      const addedSpell = availableOptions.find(
        option => option.slug === selectedSlugToAdd
      );
      toast.success(
        addedSpell
          ? `Magia "${addedSpell.name}" adicionada à figura.`
          : "Magia adicionada à figura."
      );
      await onReload();
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível adicionar a magia.");
    } finally {
      setActionState(null);
    }
  }, [
    addSpellToSoldier,
    availableOptions,
    onReload,
    selectedSlugToAdd,
    selectedSoldier,
    warbandId,
  ]);

  const handleRemove = useCallback(
    async (spellRecordId: string, spellName: string) => {
      if (!selectedSoldier) {
        toast.error("Selecione uma figura antes de remover magias.");
        return;
      }

      if (!warbandId) {
        toast.error("Identificador do bando não encontrado.");
        return;
      }

      setActionState({ type: "remove", targetId: spellRecordId });

      try {
        await removeSpellFromSoldier(selectedSoldier.id, spellRecordId);
        toast.success(`Magia "${spellName}" removida da figura.`);
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível remover a magia.");
      } finally {
        setActionState(null);
      }
    },
    [onReload, removeSpellFromSoldier, selectedSoldier, warbandId]
  );

  return {
    expanded,
    setExpanded,
    availableOptions,
    loading,
    error,
    selectedSlugToAdd,
    setSelectedSlugToAdd,
    actionState,
    handleAdd,
    handleRemove,
  };
};

