import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { SkillToWarbandSoldier } from "../../../../types/skill-to-warband-soldier.entity";

export type SupernaturalAccess = {
  mutations: boolean;
  sacredMarks: boolean;
  blessings: boolean;
};

/**
 * Verifica se uma figura tem acesso a mutações, marcas sagradas ou bençãos
 */
export const getSupernaturalAccess = (
  baseFigure: BaseFigure | null,
  skills: SkillToWarbandSoldier[] = []
): SupernaturalAccess => {
  if (!baseFigure) {
    return {
      mutations: false,
      sacredMarks: false,
      blessings: false,
    };
  }

  const hasCorruptedLineage = skills.some(
    skill => skill.skillSlug === "linhagem-corrompida"
  );

  return {
    mutations: baseFigure.canGetMutations || hasCorruptedLineage,
    sacredMarks: baseFigure.canGetSacredMarks,
    blessings: baseFigure.canGetBlessings,
  };
};

