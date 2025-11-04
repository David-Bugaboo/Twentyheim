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
   * NOTA: Esta função não é mais usada - equipamentos são gerenciados via equiped array
   */
  const addEquipmentToFigure = useCallback((figure: figure, _equipmentId: string): figure => {
    // Equipamentos são gerenciados via equiped array, não mais via equipment
    return figure;
  }, []);

  /**
   * Remove um equipamento de uma figura
   * NOTA: Esta função não é mais usada - equipamentos são gerenciados via equiped array
   */
  const removeEquipmentFromFigure = useCallback((figure: figure, _equipmentId: string): figure => {
    // Equipamentos são gerenciados via equiped array, não mais via equipment
    return figure;
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
   * NOTA: Mutações são objetos com base_mutation_id, não strings
   */
  const addMutationToFigure = useCallback((figure: figure, _mutationId: string): figure => {
    // Mutações são gerenciadas via mutations array com objetos Mutation
    // Esta função não implementa a lógica correta - deve ser usada via addSpecialAbility
    return figure;
  }, []);

  /**
   * Remove uma mutação de uma figura
   * NOTA: Mutações são objetos com base_mutation_id, não strings
   */
  const removeMutationFromFigure = useCallback((figure: figure, _mutationId: string): figure => {
    // Mutações são gerenciadas via mutations array com objetos Mutation
    // Esta função não implementa a lógica correta - deve ser usada via removeSpecialAbility
    return figure;
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
   * NOTA: Apenas miscModifiers existe no tipo figure
   */
  const updateModifiers = useCallback(
    (
      figure: figure,
      type: "injuries" | "advancements" | "misc" | "equipment",
      modifiers: Partial<figure["miscModifiers"]>
    ): figure => {
      if (type === "misc") {
        return {
          ...figure,
          miscModifiers: {
            ...(figure.miscModifiers || {
              move: 0,
              fight: 0,
              shoot: 0,
              armour: 0,
              Vontade: 0,
              strength: 0,
              health: 0,
            }),
            ...modifiers,
          },
        };
      }
      // Outros tipos de modificadores são calculados no render, não salvos
      return figure;
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

