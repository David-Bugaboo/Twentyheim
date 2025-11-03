import { useCallback } from "react";
import { generateUUID } from "../pages/warband-builder/utils/createFigureFromBase";
import type { Skill } from "../pages/warband-builder/types/skills.type";

/**
 * Hook para gerenciar operações com skills
 */
export function useSkills() {
  /**
   * Cria uma nova skill a partir de um base
   */
  const createSkill = useCallback((baseSkill: any): Skill => {
    return {
      id: generateUUID(),
      base_skill_id: baseSkill.id || baseSkill.base_skill_id || "",
    };
  }, []);

  /**
   * Cria múltiplas skills de uma vez
   */
  const createMultipleSkills = useCallback((baseSkills: any[]): Skill[] => {
    return baseSkills.map((base) => createSkill(base));
  }, [createSkill]);

  return {
    createSkill,
    createMultipleSkills,
  };
}

