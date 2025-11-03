/**
 * Hook para operações do warband (adicionar/remover figuras, atualizar propriedades)
 */

import { useRef } from "react";
import { toast } from "react-toastify";
import { createFigureFromBase, createEquipmentFromBase } from "../../utils/createFigureFromBase";
import { resolveEquipmentByName } from "../helpers/equipment.helpers";
import { extractNumber } from "../helpers/stats.helpers";
import type { Warband } from "./useWarbandState";

interface UseWarbandOperationsParams {
  warband: Warband;
  setWarband: React.Dispatch<React.SetStateAction<Warband>>;
  setHasUnsavedChanges: (value: boolean) => void;
  equipmentCatalogs: {
    meleeDb: any[];
    rangedDb: any[];
    firearmsDb: any[];
    armorDb: any[];
    accessoriesDb: any[];
    remediesPoisonsDb: any[];
  };
}

export function useWarbandOperations({
  warband,
  setWarband,
  setHasUnsavedChanges,
  equipmentCatalogs,
}: UseWarbandOperationsParams) {
  const editQueueRef = useRef<Promise<void>>(Promise.resolve());

  // Atualiza uma propriedade simples do warband
  const updateWarbandProperty = (
    property: "name" | "faction" | "notes" | "gold" | "wyrdstone",
    value: string
  ) => {
    editQueueRef.current = editQueueRef.current.then(async () => {
      setWarband((prev) => ({
        ...prev,
        [property]: value,
      }));
      setHasUnsavedChanges(true);
    });
  };

  // Atualiza uma figure específica por ID
  const updateWarbandFigure = (
    figureId: string,
    updater: (figure: any) => any
  ) => {
    editQueueRef.current = editQueueRef.current.then(async () => {
      setWarband((prev) => {
        const figures = (prev.figures || []).map((fig: any) => {
          if (fig?.id === figureId) {
            return updater(fig);
          }
          return fig;
        });
        return { ...prev, figures };
      });
      setHasUnsavedChanges(true);
    });
  };

  // Adiciona uma nova figure ao warband
  const addWarbandFigure = (figure: any) => {
    editQueueRef.current = editQueueRef.current.then(async () => {
      setWarband((prev) => ({
        ...prev,
        figures: [...(prev.figures || []), figure],
      }));
      setHasUnsavedChanges(true);
    });
  };

  // Remove uma figure por ID
  const removeWarbandFigure = (figureId: string) => {
    editQueueRef.current = editQueueRef.current.then(async () => {
      setWarband((prev) => ({
        ...prev,
        figures: (prev.figures || []).filter((fig: any) => fig?.id !== figureId),
      }));
      setHasUnsavedChanges(true);
    });
  };

  // Atualiza o vault
  const updateWarbandVault = (updater: (vault: any[]) => any[]) => {
    editQueueRef.current = editQueueRef.current.then(async () => {
      setWarband((prev) => ({
        ...prev,
        vault: updater(prev.vault || []),
      }));
      setHasUnsavedChanges(true);
    });
  };

  // Adiciona figura a partir de base
  const addFigureFromBase = (base: any, shouldChargeCost: boolean = true) => {
    if (!base) return;
    setHasUnsavedChanges(true);
    const id = crypto.randomUUID();

    // Obtém o custo ANTES de criar a figura
    let unitCost = 0;
    if (shouldChargeCost) {
      const costSource =
        base?.stats?.cost || base?.baseStats?.cost || base?.cost || "0";
      const costMatch = String(costSource).match(/(\d+)/);
      unitCost = costMatch ? parseInt(costMatch[1], 10) : 0;

      if (unitCost > 0) {
        const currentGoldMatch = String(warband.gold || "0").match(/(\d+)/);
        const currentGold = currentGoldMatch
          ? parseInt(currentGoldMatch[1], 10)
          : 0;

        if (currentGold < unitCost) {
          toast.error(
            `Você não tem coroas suficientes! (Necessário: ${unitCost}, Disponível: ${currentGold})`
          );
          return;
        }

        const newGold = Math.max(0, currentGold - unitCost);
        updateWarbandProperty("gold", String(newGold));
        toast.success(`Modelo adicionado! ${unitCost} coroas descontadas.`);
      }
    }

    const fig = createFigureFromBase(base);

    // Se for mercenário/lenda com itens fixos, resolve e equipa
    const mercItemsRaw: any[] = (() => {
      if (Array.isArray(base?.stats?.mercEquipment))
        return base.stats.mercEquipment as any[];
      if (Array.isArray(base?.stats?.mercItems))
        return base.stats.mercItems as any[];
      if (typeof base?.stats?.mercEquipment === "string")
        return [base.stats.mercEquipment];
      if (typeof base?.stats?.mercItems === "string")
        return [base.stats.mercItems];
      return [];
    })();
    const splitter = /,|\||\/|\be\b|\bou\b/gi;
    const mercItems: string[] = (mercItemsRaw || [])
      .flatMap((x) => String(x).split(splitter))
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    let equippedFromMerc: any[] = [];
    if (mercItems.length > 0) {
      equippedFromMerc = mercItems
        .map((n) => resolveEquipmentByName(String(n), equipmentCatalogs))
        .filter(Boolean) as any[];
      (fig as any).equiped = equippedFromMerc;
      (fig as any).equipmentLocked = true;
    }

    // Sempre adiciona adaga grátis no formato novo
    const hasDagger = (fig as any).equiped?.some((e: any) =>
      String(e.name || "").toLowerCase().includes("adaga")
    );
    if (!hasDagger) {
      const daggerBase = resolveEquipmentByName("Adaga", equipmentCatalogs);
      if (daggerBase) {
        // Cria no formato novo usando createEquipmentFromBase
        const dagger = createEquipmentFromBase(daggerBase);
        (dagger as any).slots = 0;
        (fig as any).equiped = [dagger, ...((fig as any).equiped || [])];
      }
    }

    // Obtém o custo da figura base para armazenar
    const figureCost =
      base?.stats?.cost || base?.baseStats?.cost || base?.cost || "-";

    // Adiciona a figure diretamente ao warband
    addWarbandFigure(fig);
  };

  // Remove unidade (com devolução de ouro e equipamentos)
  const removeUnit = (id: string) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === id);
    if (!figure) return;

    const role = (figure?.role || "").toString().toLowerCase();
    const isMercenaryOrLegend =
      role.includes("merc") || role.includes("lenda");

    let nextVault = [...(warband.vault || [])];

    if (!isMercenaryOrLegend) {
      const figEquip: any[] = (figure?.equiped || []) as any[];
      const equipmentToReturn = figEquip.filter((eq: any) => {
        const name = String(eq?.name || "").toLowerCase();
        const slots = eq?.slots;
        const isFreeDagger =
          name.includes("adaga") &&
          (slots === 0 ||
            slots === "0" ||
            slots === null ||
            slots === undefined);
        return !isFreeDagger;
      });
      nextVault = [...nextVault, ...equipmentToReturn];
    }

    // Calcula e devolve ouro
    let refund = 0;
    const costValue = figure?.baseStats?.cost || "0";
    const costMatch = String(costValue).match(/(\d+)/);
    refund = costMatch ? parseInt(costMatch[1], 10) : 0;

    const currentGoldMatch = String(warband.gold || "0").match(/(\d+)/);
    const currentGold = currentGoldMatch ? parseInt(currentGoldMatch[1], 10) : 0;
    const newGold = currentGold + refund;

    if (refund > 0) {
      toast.success(`Figura removida! ${refund} coroas devolvidas ao cofre.`);
    } else {
      toast.success("Figura removida!");
    }

    setWarband((prev) => ({
      ...prev,
      vault: nextVault,
      figures: (prev.figures || []).filter((f: any) => f?.id !== id),
      gold: String(newGold),
    }));
  };

  return {
    updateWarbandProperty,
    updateWarbandFigure,
    addWarbandFigure,
    removeWarbandFigure,
    updateWarbandVault,
    addFigureFromBase,
    removeUnit,
  };
}

