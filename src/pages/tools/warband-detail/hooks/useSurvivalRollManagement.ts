import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import { killSoldier } from "../../../../services/soldiers.service";
import { rollSurvival, type SurvivalRollResult } from "../utils/survival-roll";

type UseSurvivalRollManagementProps = {
  selectedSoldier: WarbandSoldier | null;
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const useSurvivalRollManagement = ({
  selectedSoldier,
  warbandId,
  onReload,
}: UseSurvivalRollManagementProps) => {
  const [expanded, setExpanded] = useState(true);
  const [rollDialogOpen, setRollDialogOpen] = useState(false);
  const [rollResult, setRollResult] = useState<SurvivalRollResult | null>(null);
  const [rolling, setRolling] = useState(false);
  const [killing, setKilling] = useState(false);

  const handleRoll = useCallback(() => {
    if (!selectedSoldier) {
      toast.error("Selecione uma figura antes de rolar sobrevivência.");
      return;
    }

    setRolling(true);
    setRollDialogOpen(true);

    // Simula um pequeno delay para a animação do dado
    setTimeout(() => {
      const result = rollSurvival();
      setRollResult(result);
      setRolling(false);
    }, 500);
  }, [selectedSoldier]);

  const handleReroll = useCallback(() => {
    setRolling(true);
    setRollResult(null);

    setTimeout(() => {
      const result = rollSurvival();
      setRollResult(result);
      setRolling(false);
    }, 500);
  }, []);

  const handleKill = useCallback(
    async () => {
      if (!selectedSoldier) {
        toast.error("Selecione uma figura antes de matá-la.");
        return;
      }

      if (!warbandId) {
        toast.error("Identificador do bando não encontrado.");
        return;
      }

      setKilling(true);

      try {
        await killSoldier(selectedSoldier.id);
        toast.success("Soldado morto removido do bando.");
        setRollDialogOpen(false);
        setRollResult(null);
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível matar o soldado.");
      } finally {
        setKilling(false);
      }
    },
    [onReload, selectedSoldier, warbandId]
  );

  const handleCloseDialog = useCallback(() => {
    if (!rolling && !killing) {
      setRollDialogOpen(false);
      setRollResult(null);
    }
  }, [rolling, killing]);

  return {
    expanded,
    setExpanded,
    handleRoll,
    rollDialogOpen,
    rollResult,
    rolling,
    handleReroll,
    handleCloseDialog,
    handleKill,
    killing,
  };
};

