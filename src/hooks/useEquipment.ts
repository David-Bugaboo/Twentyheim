import { useCallback } from "react";
import { createEquipmentFromBase } from "../pages/warband-builder/utils/createFigureFromBase";
import type { Equipment } from "../pages/warband-builder/types/equipment.type";

/**
 * Hook para gerenciar operações com equipamentos
 */
export function useEquipment() {
  /**
   * Cria um novo equipamento a partir de um base
   */
  const createEquipment = useCallback(
    (baseEquipment: any, baseModifier?: any): Equipment => {
      return createEquipmentFromBase(baseEquipment, baseModifier);
    },
    []
  );

  /**
   * Cria múltiplos equipamentos de uma vez
   */
  const createMultipleEquipment = useCallback(
    (equipments: Array<{ base: any; modifier?: any }>): Equipment[] => {
      return equipments.map(({ base, modifier }) => createEquipmentFromBase(base, modifier));
    },
    []
  );

  return {
    createEquipment,
    createMultipleEquipment,
  };
}

