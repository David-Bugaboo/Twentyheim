import { useCallback } from "react";
import { generateUUID } from "../pages/warband-builder/utils/createFigureFromBase";
import type { Mutation } from "../pages/warband-builder/types/mutation.type";

/**
 * Hook para gerenciar operações com mutações
 */
export function useMutations() {
  /**
   * Cria uma nova mutação a partir de um base
   */
  const createMutation = useCallback((baseMutation: any): Mutation => {
    return {
      id: generateUUID(),
      base_mutation_id: baseMutation.id || baseMutation.base_mutation_id || "",
    };
  }, []);

  /**
   * Cria múltiplas mutações de uma vez
   */
  const createMultipleMutations = useCallback((baseMutations: any[]): Mutation[] => {
    return baseMutations.map((base) => createMutation(base));
  }, [createMutation]);

  return {
    createMutation,
    createMultipleMutations,
  };
}

