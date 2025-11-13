import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import {
  addAdvancementToSoldier,
  removeAdvancementFromSoldier,
} from "../../../../services/soldiers.service";
import { fetchAdvancements } from "../../../../services/queries.service";
import { getRoleType } from "../utils/helpers";
import {
  rollAdvancement,
  type AdvancementRollResult,
} from "../utils/advancement-roll";

type UseAdvancementsManagementProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const useAdvancementsManagement = ({
  selectedSoldier,
  selectedBaseFigure,
  warbandId,
  onReload,
}: UseAdvancementsManagementProps) => {
  const [expanded, setExpanded] = useState(true);
  const [allAdvancements, setAllAdvancements] = useState<
    Array<{ slug: string; name: string; description?: string | null }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rollDialogOpen, setRollDialogOpen] = useState(false);
  const [rollResult, setRollResult] = useState<AdvancementRollResult | null>(
    null
  );
  const [rolling, setRolling] = useState(false);
  const [actionState, setActionState] = useState<
    | { type: "add"; targetId: string | null }
    | { type: "remove"; targetId: string }
    | null
  >(null);

  const isMercenary = useMemo(() => {
    // Priorizar effectiveRole do soldado
    const effectiveRole = selectedSoldier?.effectiveRole;
    if (effectiveRole) {
      const roleUpper = String(effectiveRole).toUpperCase();
      return roleUpper === "MERCENARIO" || roleUpper.includes("MERCENARIO");
    }
    // Fallback para role da figura base
    if (selectedBaseFigure?.role) {
      const roleUpper = String(selectedBaseFigure.role).toUpperCase();
      return roleUpper === "MERCENARIO" || roleUpper.includes("MERCENARIO");
    }
    return false;
  }, [selectedBaseFigure, selectedSoldier]);

  const isLegend = useMemo(() => {
    // Priorizar effectiveRole do soldado
    const effectiveRole = selectedSoldier?.effectiveRole;
    if (effectiveRole) {
      const roleUpper = String(effectiveRole).toUpperCase();
      return (
        roleUpper === "LENDA" ||
        roleUpper === "LEGENDA" ||
        roleUpper.includes("LENDA")
      );
    }
    // Fallback para role da figura base
    if (selectedBaseFigure?.role) {
      const roleUpper = String(selectedBaseFigure.role).toUpperCase();
      return (
        roleUpper === "LENDA" ||
        roleUpper === "LEGENDA" ||
        roleUpper.includes("LENDA")
      );
    }
    return false;
  }, [selectedBaseFigure, selectedSoldier]);

  const roleType = useMemo(() => {
    // Priorizar effectiveRole do soldado
    const effectiveRole = selectedSoldier?.effectiveRole;
    if (effectiveRole) {
      return getRoleType(String(effectiveRole));
    }
    // Fallback para role da figura base
    if (selectedBaseFigure?.role) {
      return getRoleType(selectedBaseFigure.role);
    }
    return "soldier" as const;
  }, [selectedBaseFigure, selectedSoldier]);

  const usesHeroLeaderTable = useMemo(() => {
    return (
      isMercenary || isLegend || roleType === "leader" || roleType === "hero"
    );
  }, [isMercenary, isLegend, roleType]);

  useEffect(() => {
    if (!selectedSoldier) {
      setAllAdvancements([]);
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
        const advancements = await fetchAdvancements(controller.signal);

        if (abort) {
          return;
        }

        const all = advancements.map(adv => ({
          slug: adv.slug,
          name: adv.name ?? adv.slug,
          description: adv.description ?? null,
        }));

        setAllAdvancements(all);
      } catch (error) {
        if (abort) {
          return;
        }
        console.error(error);
        setAllAdvancements([]);
        setError("Não foi possível carregar os avanços disponíveis.");
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
  }, [selectedSoldier]);

  const handleRoll = useCallback(() => {
    if (!selectedSoldier) {
      toast.error("Selecione uma figura antes de rolar avanços.");
      return;
    }

    if (allAdvancements.length === 0) {
      toast.error("Avanços ainda não foram carregados.");
      return;
    }

    setRolling(true);
    setRollDialogOpen(true);

    // Simula um pequeno delay para a animação do dado
    setTimeout(() => {
      const result = rollAdvancement(usesHeroLeaderTable, allAdvancements);
      setRollResult(result);
      setRolling(false);
    }, 500);
  }, [allAdvancements, selectedSoldier, usesHeroLeaderTable]);

  const handleReroll = useCallback(() => {
    if (allAdvancements.length === 0) {
      toast.error("Avanços ainda não foram carregados.");
      return;
    }

    setRolling(true);
    setRollResult(null);

    setTimeout(() => {
      const result = rollAdvancement(usesHeroLeaderTable, allAdvancements);
      setRollResult(result);
      setRolling(false);
    }, 500);
  }, [allAdvancements, usesHeroLeaderTable]);

  const handleSelectOption = useCallback(
    async (slug: string) => {
      if (!selectedSoldier) {
        toast.error("Selecione uma figura antes de adicionar avanços.");
        return;
      }

      if (!warbandId) {
        toast.error("Identificador do bando não encontrado.");
        return;
      }

      setActionState({ type: "add", targetId: slug });

      try {
        await addAdvancementToSoldier(selectedSoldier.id, slug);
        const addedAdvancement = allAdvancements.find(adv => adv.slug === slug);
        toast.success(
          addedAdvancement
            ? `Avanço "${addedAdvancement.name}" adicionado à figura.`
            : "Avanço adicionado à figura."
        );
        setRollDialogOpen(false);
        setRollResult(null);
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível adicionar o avanço.");
      } finally {
        setActionState(null);
      }
    },
    [
      addAdvancementToSoldier,
      allAdvancements,
      onReload,
      selectedSoldier,
      warbandId,
    ]
  );

  const handleRemove = useCallback(
    async (advancementRecordId: string, advancementName: string) => {
      if (!selectedSoldier) {
        toast.error("Selecione uma figura antes de remover avanços.");
        return;
      }

      if (!warbandId) {
        toast.error("Identificador do bando não encontrado.");
        return;
      }

      setActionState({ type: "remove", targetId: advancementRecordId });

      try {
        await removeAdvancementFromSoldier(
          selectedSoldier.id,
          advancementRecordId
        );
        toast.success(`Avanço "${advancementName}" removido da figura.`);
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível remover o avanço.");
      } finally {
        setActionState(null);
      }
    },
    [onReload, removeAdvancementFromSoldier, selectedSoldier, warbandId]
  );

  const handleCloseDialog = useCallback(() => {
    if (!rolling && !actionState) {
      setRollDialogOpen(false);
      setRollResult(null);
    }
  }, [rolling, actionState]);

  return {
    expanded,
    setExpanded,
    loading,
    error,
    actionState,
    handleRoll,
    handleRemove,
    rollDialogOpen,
    rollResult,
    rolling,
    handleSelectOption,
    handleReroll,
    handleCloseDialog,
  };
};
