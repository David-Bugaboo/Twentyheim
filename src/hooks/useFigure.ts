import { useCallback } from "react";
import { createFigureFromBase } from "../pages/warband-builder/utils/createFigureFromBase";
import type { figure } from "../pages/warband-builder/types/figure.type";

/**
 * Hook para gerenciar operações com figuras
 */
export function useFigure() {
  /**
   * Cria uma nova figura a partir de um base
   */
  const createFigure = useCallback((baseFigure: any, initialData?: Partial<figure>): figure => {
    return createFigureFromBase(baseFigure, initialData);
  }, []);

  /**
   * Adiciona um equipamento a uma figura (retorna o ID do equipamento)
   */
  const addEquipmentToFigure = useCallback((figure: figure, equipmentId: string): figure => {
    return {
      ...figure,
      equipment: [...(figure.equipment || []), equipmentId],
    };
  }, []);

  /**
   * Remove um equipamento de uma figura
   */
  const removeEquipmentFromFigure = useCallback((figure: figure, equipmentId: string): figure => {
    return {
      ...figure,
      equipment: (figure.equipment || []).filter((id) => id !== equipmentId),
    };
  }, []);

  /**
   * Adiciona uma skill a uma figura
   */
  const addSkillToFigure = useCallback((figure: figure, skillId: string): figure => {
    return {
      ...figure,
      availableSkills: [...(figure.availableSkills || []), skillId],
    };
  }, []);

  /**
   * Remove uma skill de uma figura
   */
  const removeSkillFromFigure = useCallback((figure: figure, skillId: string): figure => {
    return {
      ...figure,
      availableSkills: (figure.availableSkills || []).filter((id) => id !== skillId),
    };
  }, []);

  /**
   * Adiciona uma spell a uma figura
   */
  const addSpellToFigure = useCallback((figure: figure, spellId: string): figure => {
    return {
      ...figure,
      availableSpells: [...(figure.availableSpells || []), spellId],
    };
  }, []);

  /**
   * Remove uma spell de uma figura
   */
  const removeSpellFromFigure = useCallback((figure: figure, spellId: string): figure => {
    return {
      ...figure,
      availableSpells: (figure.availableSpells || []).filter((id) => id !== spellId),
    };
  }, []);

  /**
   * Adiciona uma mutação a uma figura
   */
  const addMutationToFigure = useCallback((figure: figure, mutationId: string): figure => {
    return {
      ...figure,
      mutations: [...(figure.mutations || []), mutationId],
    };
  }, []);

  /**
   * Remove uma mutação de uma figura
   */
  const removeMutationFromFigure = useCallback((figure: figure, mutationId: string): figure => {
    return {
      ...figure,
      mutations: (figure.mutations || []).filter((id) => id !== mutationId),
    };
  }, []);

  /**
   * Adiciona XP a uma figura
   */
  const addXPToFigure = useCallback((figure: figure, xp: number): figure => {
    return {
      ...figure,
      xp: (figure.xp || 0) + xp,
    };
  }, []);

  /**
   * Atualiza modificadores de atributos
   */
  const updateModifiers = useCallback(
    (
      figure: figure,
      type: "injuries" | "advancements" | "misc" | "equipment",
      modifiers: Partial<figure["injuriesModifiers"]>
    ): figure => {
      const modifierKey = `${type}Modifiers` as const;
      return {
        ...figure,
        [modifierKey]: {
          ...figure[modifierKey],
          ...modifiers,
        },
      };
    },
    []
  );

  return {
    createFigure,
    addEquipmentToFigure,
    removeEquipmentFromFigure,
    addSkillToFigure,
    removeSkillFromFigure,
    addSpellToFigure,
    removeSpellFromFigure,
    addMutationToFigure,
    removeMutationFromFigure,
    addXPToFigure,
    updateModifiers,
  };
}

