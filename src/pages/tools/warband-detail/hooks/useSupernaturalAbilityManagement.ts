import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { SuperNaturalAbilityToWarbandSoldier } from "../../../../types/super-natural-ability-to-warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { SkillToWarbandSoldier } from "../../../../types/skill-to-warband-soldier.entity";
import {
  addSupernaturalAbilityToSoldier,
  removeSupernaturalAbilityFromSoldier,
} from "../../../../services/soldiers.service";
import { fetchSupernaturalAbilities } from "../../../../services/queries.service";

type UseSupernaturalAbilityManagementProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  relations: {
    skills: SkillToWarbandSoldier[];
    supernatural: SuperNaturalAbilityToWarbandSoldier[];
  };
  category: "Mutação" | "Marca Sagrada" | "Benção de Nurgle";
  canGetFlag: "canGetMutations" | "canGetSacredMarks" | "canGetBlessings";
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const useSupernaturalAbilityManagement = ({
  selectedSoldier,
  selectedBaseFigure,
  relations,
  category,
  canGetFlag,
  warbandId,
  onReload,
}: UseSupernaturalAbilityManagementProps) => {
  const [expanded, setExpanded] = useState(true);
  const [allAbilities, setAllAbilities] = useState<
    Array<{
      slug: string;
      name: string;
      description?: string | null;
      cost?: string | number | null;
    }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlugToAdd, setSelectedSlugToAdd] = useState("");
  const [actionState, setActionState] = useState<
    | { type: "add"; targetId: string | null }
    | { type: "remove"; targetId: string }
    | null
  >(null);

  const hasAccess = useMemo(() => {
    if (canGetFlag === "canGetMutations") {
      // Mutações: canGetMutations OU tem skill linhagem-corrompida
      const hasCanGetMutations = selectedBaseFigure?.canGetMutations ?? false;
      const hasCorruptedLineage = relations.skills.some(
        skill => skill.skillSlug === "linhagem-corrompida"
      );
      return hasCanGetMutations || hasCorruptedLineage;
    }
    return selectedBaseFigure?.[canGetFlag] ?? false;
  }, [selectedBaseFigure, canGetFlag, relations.skills]);

  const filteredSupernatural = useMemo(() => {
    return relations.supernatural.filter(ability => {
      const abilityCategory = ability.superNaturalAbility?.category;
      return abilityCategory === category;
    });
  }, [relations.supernatural, category]);

  useEffect(() => {
    if (!selectedSoldier || !hasAccess) {
      setAllAbilities([]);
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
        const allAbilities = await fetchSupernaturalAbilities(
          controller.signal
        );
        const abilities = allAbilities.filter(
          ability => ability.category === category
        );

        if (abort) {
          return;
        }

        const all = abilities.map(ability => ({
          slug: ability.slug,
          name: ability.name ?? ability.slug,
          description: ability.description ?? null,
          cost: ability.cost ?? null,
        }));

        setAllAbilities(all);
        setSelectedSlugToAdd(prev =>
          prev && all.some(ability => ability.slug === prev)
            ? prev
            : (all[0]?.slug ?? "")
        );
      } catch (error) {
        if (abort) {
          return;
        }
        console.error(error);
        setAllAbilities([]);
        setError(
          `Não foi possível carregar ${category.toLowerCase()} disponíveis.`
        );
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
  }, [selectedSoldier, hasAccess, category]);

  const handleAdd = useCallback(async () => {
    if (!selectedSoldier) {
      toast.error(
        `Selecione uma figura antes de adicionar ${category.toLowerCase()}.`
      );
      return;
    }

    if (!warbandId) {
      toast.error("Identificador do bando não encontrado.");
      return;
    }

    if (!selectedSlugToAdd) {
      toast.error(
        `Escolha uma ${category.toLowerCase()} disponível antes de adicionar.`
      );
      return;
    }

    setActionState({ type: "add", targetId: selectedSlugToAdd });

    try {
      await addSupernaturalAbilityToSoldier(
        selectedSoldier.id,
        selectedSlugToAdd
      );
      const addedAbility = allAbilities.find(
        ability => ability.slug === selectedSlugToAdd
      );
      toast.success(
        addedAbility
          ? `${category} "${addedAbility.name}" adicionada à figura.`
          : `${category} adicionada à figura.`
      );
      await onReload();
    } catch (error) {
      console.error(error);
      toast.error(`Não foi possível adicionar a ${category.toLowerCase()}.`);
    } finally {
      setActionState(null);
    }
  }, [
    allAbilities,
    onReload,
    selectedSoldier,
    warbandId,
    selectedSlugToAdd,
    category,
  ]);

  const handleRemove = useCallback(
    async (abilityRecordId: string, abilityName: string) => {
      if (!selectedSoldier) {
        toast.error(
          `Selecione uma figura antes de remover ${category.toLowerCase()}.`
        );
        return;
      }

      if (!warbandId) {
        toast.error("Identificador do bando não encontrado.");
        return;
      }

      setActionState({ type: "remove", targetId: abilityRecordId });

      try {
        await removeSupernaturalAbilityFromSoldier(
          selectedSoldier.id,
          abilityRecordId
        );
        toast.success(`${category} "${abilityName}" removida da figura.`);
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error(`Não foi possível remover a ${category.toLowerCase()}.`);
      } finally {
        setActionState(null);
      }
    },
    [onReload, selectedSoldier, warbandId, category]
  );

  return {
    expanded,
    setExpanded,
    loading,
    error,
    selectedSlugToAdd,
    setSelectedSlugToAdd,
    actionState,
    handleAdd,
    handleRemove,
    allAbilities,
    filteredSupernatural,
    hasAccess,
  };
};
