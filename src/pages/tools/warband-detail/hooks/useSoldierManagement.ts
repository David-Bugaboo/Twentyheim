import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import {
  addFigureToWarband,
  fireWarbandSoldier,
} from "../../../../services/warbands.service";
import { killSoldier, undoSoldier } from "../../../../services/soldiers.service";

type UseSoldierManagementProps = {
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const useSoldierManagement = ({
  warbandId,
  onReload,
}: UseSoldierManagementProps) => {
  const [addingFigureSlug, setAddingFigureSlug] = useState<string | null>(null);
  const [soldierAction, setSoldierAction] = useState<{
    type: "fire" | "kill" | "undo";
    soldierId: string;
  } | null>(null);

  const handleAddFigure = useCallback(
    async (figureSlug: string, figureName: string) => {
      if (!warbandId) return;
      try {
        setAddingFigureSlug(figureSlug);
        await addFigureToWarband(warbandId, figureSlug);
        toast.success(`Figura "${figureName}" adicionada ao bando.`);
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível adicionar a figura ao bando.");
      } finally {
        setAddingFigureSlug(null);
      }
    },
    [warbandId, onReload]
  );

  const handleFireSoldier = useCallback(
    async (warbandSoldierId: string) => {
      if (!warbandId) return;
      try {
        setSoldierAction({ type: "fire", soldierId: warbandSoldierId });
        await fireWarbandSoldier(warbandId, warbandSoldierId);
        toast.success("Figura dispensada do bando.");
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível dispensar a figura.");
      } finally {
        setSoldierAction(null);
      }
    },
    [warbandId, onReload]
  );

  const handleKillSoldier = useCallback(
    async (soldierId: string) => {
      try {
        setSoldierAction({ type: "kill", soldierId });
        await killSoldier(soldierId);
        toast.success("Figura marcada como morta.");
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível marcar a figura como morta.");
      } finally {
        setSoldierAction(null);
      }
    },
    [onReload]
  );

  const handleUndoSoldier = useCallback(
    async (soldierId: string) => {
      try {
        setSoldierAction({ type: "undo", soldierId });
        await undoSoldier(soldierId);
        toast.success("A última ação da figura foi desfeita.");
        await onReload();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível desfazer a ação.");
      } finally {
        setSoldierAction(null);
      }
    },
    [onReload]
  );

  return {
    addingFigureSlug,
    soldierAction,
    handleAddFigure,
    handleFireSoldier,
    handleKillSoldier,
    handleUndoSoldier,
  };
};

