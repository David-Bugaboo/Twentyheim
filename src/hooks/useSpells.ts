import { useCallback } from "react";
import { generateUUID } from "../pages/warband-builder/utils/createFigureFromBase";
import type { Spell } from "../pages/warband-builder/types/spells.type";

/**
 * Hook para gerenciar operações com spells
 */
export function useSpells() {
  /**
   * Cria uma nova spell a partir de um base
   */
  const createSpell = useCallback(
    (baseSpell: any, castingNumberModifier: number = 0): Spell => {
      return {
        id: generateUUID(),
        base_spell_id: baseSpell.id || baseSpell.base_spell_id || "",
        casting_number_modifier: castingNumberModifier,
      };
    },
    []
  );

  /**
   * Cria múltiplas spells de uma vez
   */
  const createMultipleSpells = useCallback(
    (baseSpells: Array<{ base: any; modifier?: number }>): Spell[] => {
      return baseSpells.map(({ base, modifier = 0 }) => createSpell(base, modifier));
    },
    [createSpell]
  );

  /**
   * Atualiza o modificador de casting number de uma spell
   */
  const updateCastingNumberModifier = useCallback(
    (spell: Spell, modifier: number): Spell => {
      return {
        ...spell,
        casting_number_modifier: modifier,
      };
    },
    []
  );

  return {
    createSpell,
    createMultipleSpells,
    updateCastingNumberModifier,
  };
}

