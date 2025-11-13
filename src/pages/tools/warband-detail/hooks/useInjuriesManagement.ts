import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { InjuryToWarbandSoldier } from "../../../../types/injury-to-warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import {
  addInjuryToSoldier,
  removeInjuryFromSoldier,
  killSoldier,
} from "../../../../services/soldiers.service";
import { fetchInjuries } from "../../../../services/queries.service";
import { getRoleType } from "../utils/helpers";
import { rollInjury, type InjuryRollResult } from "../utils/injury-roll";

type UseInjuriesManagementProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  relations: { injuries: InjuryToWarbandSoldier[] };
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const useInjuriesManagement = ({
  selectedSoldier,
  selectedBaseFigure,

  warbandId,
  onReload,
}: UseInjuriesManagementProps) => {
  const [expanded, setExpanded] = useState(true);
  const [allInjuries, setAllInjuries] = useState<
    Array<{ slug: string; name: string; description?: string | null }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rollDialogOpen, setRollDialogOpen] = useState(false);
  const [rollResult, setRollResult] = useState<InjuryRollResult | null>(null);
  const [rolling, setRolling] = useState(false);
  const [actionState, setActionState] = useState<
    | { type: "add"; targetId: string | null }
    | { type: "remove"; targetId: string }
    | { type: "kill" }
    | null
  >(null);

  const roleType = useMemo((): "leader" | "hero" | "legend" | "soldier" => {
    if (!selectedBaseFigure) {
      const effectiveRole = selectedSoldier?.effectiveRole;
      if (effectiveRole) {
        return getRoleType(String(effectiveRole));
      }
      return "soldier";
    }
    return getRoleType(selectedBaseFigure.role);
  }, [selectedBaseFigure, selectedSoldier]);

  const isHeroLeaderOrLegend = useMemo(() => {
    return (
      roleType === "leader" || roleType === "hero" || roleType === "legend"
    );
  }, [roleType]);

  useEffect(() => {
    if (!selectedSoldier) {
      setAllInjuries([]);
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
        const injuries = await fetchInjuries(controller.signal);

        if (abort) {
          return;
        }

        const all = injuries.map(inj => ({
          slug: inj.slug,
          name: inj.name ?? inj.slug,
          description: inj.description ?? null,
        }));

        setAllInjuries(all);
      } catch (error) {
        if (abort) {
          return;
        }
        console.error(error);
        setAllInjuries([]);
        setError("Não foi possível carregar os ferimentos disponíveis.");
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
      toast.error("Selecione uma figura antes de rolar ferimentos.");
      return;
    }

    setRolling(true);
    setRollDialogOpen(true);

    // Simula um pequeno delay para a animação do dado
    setTimeout(() => {
      const result = rollInjury();
      setRollResult(result);
      setRolling(false);
    }, 500);
  }, [selectedSoldier]);

  const handleReroll = useCallback(() => {
    setRolling(true);
    setRollResult(null);

    setTimeout(() => {
      const result = rollInjury();
      setRollResult(result);
      setRolling(false);
    }, 500);
  }, []);

  const handleSelectOption = useCallback(
    async (injurySlug: string) => {
      if (!selectedSoldier) {
        toast.error("Selecione uma figura antes de adicionar ferimentos.");
        return;
      }

      if (!warbandId) {
        toast.error("Identificador do bando não encontrado.");
        return;
      }

      setActionState({ type: "add", targetId: injurySlug });

      try {
        await addInjuryToSoldier(selectedSoldier.id, injurySlug);
        const addedInjury = allInjuries.find(inj => inj.slug === injurySlug);
        toast.success(
          addedInjury
            ? `Ferimento "${addedInjury.name}" adicionado à figura.`
            : "Ferimento adicionado à figura."
        );
        setRollDialogOpen(false);
        setRollResult(null);
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível adicionar o ferimento.");
      } finally {
        setActionState(null);
      }
    },
    [allInjuries, onReload, selectedSoldier, warbandId]
  );

  const handleRemove = useCallback(
    async (injuryRecordId: string, injuryName: string) => {
      if (!selectedSoldier) {
        toast.error("Selecione uma figura antes de remover ferimentos.");
        return;
      }

      if (!warbandId) {
        toast.error("Identificador do bando não encontrado.");
        return;
      }

      setActionState({ type: "remove", targetId: injuryRecordId });

      try {
        await removeInjuryFromSoldier(selectedSoldier.id, injuryRecordId);
        toast.success(`Ferimento "${injuryName}" removido da figura.`);
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível remover o ferimento.");
      } finally {
        setActionState(null);
      }
    },
    [onReload, selectedSoldier, warbandId]
  );

  const handleKill = useCallback(async () => {
    if (!selectedSoldier) {
      toast.error("Selecione uma figura antes de matá-la.");
      return;
    }

    if (!warbandId) {
      toast.error("Identificador do bando não encontrado.");
      return;
    }

    setActionState({ type: "kill" });

    try {
      await killSoldier(selectedSoldier.id);
      toast.success("Figura morta removida do bando.");
      setRollDialogOpen(false);
      setRollResult(null);
      await onReload();
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível matar a figura.");
    } finally {
      setActionState(null);
    }
  }, [onReload, selectedSoldier, warbandId]);

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
    handleKill,
    rollDialogOpen,
    rollResult,
    rolling,
    handleSelectOption,
    handleReroll,
    handleCloseDialog,
    isHeroLeaderOrLegend,
  };
};
