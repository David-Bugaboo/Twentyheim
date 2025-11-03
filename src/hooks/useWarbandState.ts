import { useState, useCallback } from "react";
import type { figure } from "../pages/warband-builder/types/figure.type";
import type { Equipment } from "../pages/warband-builder/types/equipment.type";
import type { Warband } from "../pages/warband-builder/types/warband.type";

/**
 * Hook para gerenciar o estado de um warband
 */
export function useWarbandState(initialWarband?: Partial<Warband>) {
  const [warband, setWarband] = useState<Warband>({
    id: initialWarband?.id || "",
    uid: initialWarband?.uid || "",
    crowns: initialWarband?.crowns || 0,
    name: initialWarband?.name || "",
    base_warband_id: initialWarband?.base_warband_id || 0,
    vault: initialWarband?.vault || [],
    figures: initialWarband?.figures || [],
  });

  /**
   * Adiciona uma figura ao warband
   */
  const addFigure = useCallback((newFigure: figure) => {
    setWarband((prev) => ({
      ...prev,
      figures: [...prev.figures, newFigure],
    }));
  }, []);

  /**
   * Remove uma figura do warband
   */
  const removeFigure = useCallback((figureId: string) => {
    setWarband((prev) => ({
      ...prev,
      figures: prev.figures.filter((f) => f.id !== figureId),
    }));
  }, []);

  /**
   * Atualiza uma figura no warband
   */
  const updateFigure = useCallback((figureId: string, updatedFigure: Partial<figure>) => {
    setWarband((prev) => ({
      ...prev,
      figures: prev.figures.map((f) =>
        f.id === figureId ? { ...f, ...updatedFigure } : f
      ),
    }));
  }, []);

  /**
   * Adiciona um equipamento ao vault
   */
  const addEquipmentToVault = useCallback((equipment: Equipment) => {
    setWarband((prev) => ({
      ...prev,
      vault: [...prev.vault, equipment],
    }));
  }, []);

  /**
   * Remove um equipamento do vault
   */
  const removeEquipmentFromVault = useCallback((equipmentId: string) => {
    setWarband((prev) => ({
      ...prev,
      vault: prev.vault.filter((e) => e.id !== equipmentId),
    }));
  }, []);

  /**
   * Atualiza informações do warband
   */
  const updateWarband = useCallback((updates: Partial<Warband>) => {
    setWarband((prev) => ({ ...prev, ...updates }));
  }, []);

  /**
   * Atualiza coroas do warband
   */
  const updateCrowns = useCallback((newCrowns: number) => {
    setWarband((prev) => ({ ...prev, crowns: newCrowns }));
  }, []);

  /**
   * Adiciona coroas ao warband
   */
  const addCrowns = useCallback((amount: number) => {
    setWarband((prev) => ({ ...prev, crowns: (prev.crowns || 0) + amount }));
  }, []);

  /**
   * Remove coroas do warband (com validação)
   */
  const removeCrowns = useCallback((amount: number): boolean => {
    setWarband((prev) => {
      const currentCrowns = prev.crowns || 0;
      if (currentCrowns < amount) {
        return prev; // Não remove se não tiver suficiente
      }
      return { ...prev, crowns: currentCrowns - amount };
    });
    return true;
  }, []);

  return {
    warband,
    setWarband,
    addFigure,
    removeFigure,
    updateFigure,
    addEquipmentToVault,
    removeEquipmentFromVault,
    updateWarband,
    updateCrowns,
    addCrowns,
    removeCrowns,
  };
}

