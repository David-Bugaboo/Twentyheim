import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { ExtraSkillListToWarbandSoldier } from "../../../../types/extra-skill-list-to-warband-soldier.entity";
import type { SkillToWarbandSoldier } from "../../../../types/skill-to-warband-soldier.entity";
import { fetchSkillListBySlug } from "../../../../services/queries.service";
import { addSkillToSoldier, removeSkillFromSoldier } from "../../../../services/soldiers.service";
import {
  extractSkillListSlugs,
  extractExtraSkillListSlugs,
} from "../utils/helpers";
import type { SoldierSkillOption } from "../types";

type UseSkillsManagementProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  soldierExtraSkillLists: ExtraSkillListToWarbandSoldier[];
  relations: { skills: SkillToWarbandSoldier[] };
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const useSkillsManagement = ({
  selectedSoldier,
  selectedBaseFigure,
  soldierExtraSkillLists,
  relations,
  warbandId,
  onReload,
}: UseSkillsManagementProps) => {
  const [expanded, setExpanded] = useState(true);
  const [availableOptions, setAvailableOptions] = useState<SoldierSkillOption[]>([]);
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

    const baseFigureSkillSlugs = extractSkillListSlugs(selectedBaseFigure);
    const extraSkillSlugs = extractExtraSkillListSlugs(soldierExtraSkillLists);
    const combinedSkillSlugs = Array.from(
      new Set([...baseFigureSkillSlugs, ...extraSkillSlugs])
    ).filter(slug => slug.length > 0);

    if (combinedSkillSlugs.length === 0) {
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
        const lists = await Promise.all(
          combinedSkillSlugs.map(async slug => {
            if (!slug) return null;
            try {
              const data = await fetchSkillListBySlug(slug, controller.signal);
              return {
                slug,
                name: data.name ?? slug,
                description: data.description ?? null,
                skills: data.skills ?? [],
              };
            } catch (error) {
              console.error(error);
              return {
                slug,
                name: slug,
                description: null,
                skills: [],
              };
            }
          })
        );

        if (abort) {
          return;
        }

        const existingSkillSlugs = new Set(
          (relations.skills ?? []).map(skill => skill.skillSlug ?? "")
        );

        const flattened: SoldierSkillOption[] = lists
          .filter(
            (
              list
            ): list is {
              slug: string;
              name: string;
              description: string | null;
              skills: Array<{
                slug?: string;
                name?: string;
                description?: string | null;
              }>;
            } => list !== null
          )
          .flatMap(list =>
            list.skills
              .map(skill => {
                const slug = skill.slug ?? "";
                if (!slug) {
                  return null;
                }

                return {
                  slug,
                  name: skill.name ?? slug,
                  description: skill.description ?? null,
                  listSlug: list.slug,
                  listName: list.name,
                } as SoldierSkillOption;
              })
              .filter(
                (option): option is SoldierSkillOption =>
                  option !== null && !existingSkillSlugs.has(option.slug)
              )
          );

        setAvailableOptions(flattened);
        setSelectedSlugToAdd(prev =>
          prev && flattened.some(option => option.slug === prev)
            ? prev
            : (flattened[0]?.slug ?? "")
        );

        if (flattened.length === 0) {
          setError("Nenhuma habilidade disponível para adicionar no momento.");
        }
      } catch (error) {
        if (abort) {
          return;
        }
        console.error(error);
        setAvailableOptions([]);
        setSelectedSlugToAdd("");
        setError("Não foi possível carregar as habilidades disponíveis.");
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
    relations.skills,
    selectedBaseFigure,
    selectedSoldier,
    soldierExtraSkillLists,
  ]);

  const handleAdd = useCallback(async () => {
    if (!selectedSoldier) {
      toast.error("Selecione uma figura antes de adicionar habilidades.");
      return;
    }

    if (!warbandId) {
      toast.error("Identificador do bando não encontrado.");
      return;
    }

    if (!selectedSlugToAdd) {
      toast.error("Escolha uma habilidade disponível antes de adicionar.");
      return;
    }

    setActionState({ type: "add", targetId: selectedSlugToAdd });

    try {
      await addSkillToSoldier(selectedSoldier.id, selectedSlugToAdd);
      const addedSkill = availableOptions.find(
        option => option.slug === selectedSlugToAdd
      );
      toast.success(
        addedSkill
          ? `Habilidade "${addedSkill.name}" adicionada à figura.`
          : "Habilidade adicionada à figura."
      );
      await onReload();
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível adicionar a habilidade.");
    } finally {
      setActionState(null);
    }
  }, [
    addSkillToSoldier,
    availableOptions,
    onReload,
    selectedSlugToAdd,
    selectedSoldier,
    warbandId,
  ]);

  const handleRemove = useCallback(
    async (skillRecordId: string, skillName: string) => {
      if (!selectedSoldier) {
        toast.error("Selecione uma figura antes de remover habilidades.");
        return;
      }

      if (!warbandId) {
        toast.error("Identificador do bando não encontrado.");
        return;
      }

      setActionState({ type: "remove", targetId: skillRecordId });

      try {
        await removeSkillFromSoldier(selectedSoldier.id, skillRecordId);
        toast.success(`Habilidade "${skillName}" removida da figura.`);
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível remover a habilidade.");
      } finally {
        setActionState(null);
      }
    },
    [onReload, removeSkillFromSoldier, selectedSoldier, warbandId]
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

