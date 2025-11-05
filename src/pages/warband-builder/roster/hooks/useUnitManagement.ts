/**
 * Hook para gerenciar unidades (skills, spells, injuries, advancements, etc)
 */

import React from "react";
import {
  calculateAdvancementModifiers,
  calculateInjuryModifiers,
  getInjurySpecialRules,
  calculateSkillModifiers,
  getSpecialAbilitySpecialRules,
} from "../helpers/warbandCalculations.helpers";
import {
  createSkillFromBase,
  createSpellFromBase,
  createMutationFromBase,
  createSacredMarkFromBase,
  createNurgleBlessingFromBase,
} from "../../utils/createFigureFromBase";
import type { Skill } from "../../types/skills.type";
import type { Spell } from "../../types/spells.type";
import { toast } from "react-toastify";
// Importa dados via hook centralizado (Firebase -> IndexedDB -> Static)
import { useJsonData } from "../../../../hooks/useJsonData";
import { getStaticImport } from "../../../../data/jsonFileMap";

interface UseUnitManagementParams {
  updateWarbandFigure: (
    figureId: string,
    updater: (figure: any) => any
  ) => void;
  setHasUnsavedChanges: (value: boolean) => void;
  onRefundCrowns?: (amount: number) => void; // Função opcional para devolver coroas
}

export function useUnitManagement({
  updateWarbandFigure,
  setHasUnsavedChanges,
  onRefundCrowns, // Função opcional para devolver coroas ao remover
}: UseUnitManagementParams) {
  // Helper para logar modificações de figura (logs removidos para limpeza do console)
  const logFigureModification = React.useCallback(
    (
      _unitId: string,
      _action: string,
      _beforeState: any,
      _afterState: any,
      _details?: any
    ) => {
      // Logging removido para limpeza do console
    },
    []
  );
  // Carrega dados via hook centralizado (Firebase -> IndexedDB -> Static)
  const { data: mutationsData } = useJsonData({
    fileId: "cult-mutations",
    staticImport: () => getStaticImport("cult-mutations")(),
  });

  const { data: sacredMarksData } = useJsonData({
    fileId: "lizardmen-sacred-marks",
    staticImport: () => getStaticImport("lizardmen-sacred-marks")(),
  });

  const { data: blessingsOfNurgle } = useJsonData({
    fileId: "carnival-blessings",
    staticImport: () => getStaticImport("carnival-blessings")(),
  });

  // NOTA: Os dados de mutações, marcas sagradas e bênçãos são carregados acima
  // mas não são usados diretamente neste hook. Se necessário no futuro,
  // podem ser criados mapas para cálculos de modificadores.

  // Skills
  const handleAddSkillToUnit = (
    unitId: string,
    skill: { id?: string; name: string; description: string; type?: string }
  ) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;

      const beforeState = JSON.parse(JSON.stringify(fig));
      const existing = (fig.skills || []) as Skill[];
      // Verifica se já existe uma skill com o mesmo base_skill_id
      const baseSkillId = skill.id || "";
      if (
        existing.some((s: any) => {
          // Se já é uma referência, compara base_skill_id
          if (s.base_skill_id) return s.base_skill_id === baseSkillId;
          // Se ainda é objeto antigo (compatibilidade), compara id ou name
          return s.id === baseSkillId || s.name === skill.name;
        })
      )
        return fig;

      // Cria objeto de referência
      const baseSkill = { id: baseSkillId };
      const newSkill = createSkillFromBase(baseSkill);

      // Atualiza skills e recalcula modifiers
      const updatedSkills = [...existing, newSkill];
      const skillsModifiers = calculateSkillModifiers(updatedSkills);

      // Adiciona regras especiais se necessário (usando ID base)
      const extraSpecialRules = Array.isArray(fig.extraSpecialRules)
        ? [...fig.extraSpecialRules]
        : [];
      const rulesToAdd = getSpecialAbilitySpecialRules(baseSkillId, "skill");
      rulesToAdd.forEach(rule => {
        if (!extraSpecialRules.includes(rule)) {
          extraSpecialRules.push(rule);
        }
      });

      const updatedFig = {
        ...fig,
        skills: updatedSkills,
        skillsModifiers,
        extraSpecialRules,
      };

      logFigureModification(unitId, "addSkill", beforeState, updatedFig, {
        skill: skill.name,
      });

      return updatedFig;
    });
  };

  const handleRemoveSkillFromUnit = (unitId: string, skillId: string) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;

      const beforeState = JSON.parse(JSON.stringify(fig));
      const existing = (fig.skills || []) as Skill[];
      const skillToRemove = existing.find((s: any) => {
        if (s.base_skill_id) return s.id === skillId;
        return s.id === skillId;
      });

      const updatedSkills = existing.filter((s: any) => {
        // Se é referência, compara id
        if (s.base_skill_id) return s.id !== skillId;
        // Se é objeto antigo (compatibilidade), compara id
        return s.id !== skillId;
      });

      // Recalcula modifiers
      const skillsModifiers = calculateSkillModifiers(updatedSkills);

      // Remove regras especiais se necessário (usando ID base)
      const extraSpecialRules = Array.isArray(fig.extraSpecialRules)
        ? [...fig.extraSpecialRules]
        : [];
      if (skillToRemove) {
        const skillBaseId =
          skillToRemove.base_skill_id || skillToRemove.id || "";
        if (skillBaseId) {
          const rulesToRemove = getSpecialAbilitySpecialRules(
            skillBaseId,
            "skill"
          );
          const filteredRules = extraSpecialRules.filter(
            (r: string) => !rulesToRemove.includes(r)
          );
          const updatedFig = {
            ...fig,
            skills: updatedSkills,
            skillsModifiers,
            extraSpecialRules: filteredRules,
          };
          logFigureModification(
            unitId,
            "removeSkill",
            beforeState,
            updatedFig,
            { skillId }
          );
          return updatedFig;
        }
      }

      const updatedFig = {
        ...fig,
        skills: updatedSkills,
        skillsModifiers,
      };
      logFigureModification(unitId, "removeSkill", beforeState, updatedFig, {
        skillId,
      });
      return updatedFig;
    });
  };

  // Spells
  const handleAddSpellToUnit = (
    unitId: string,
    spell: {
      name: string;
      castingNumber: number;
      keywords: string[];
      effect: string;
    }
  ) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const existing = (fig.spells || []) as Spell[];

      // Busca o base_spell_id do objeto spell (vem do SkillPicker/SpellPicker)
      // O spell pode ter um id que é o base_spell_id, ou precisamos buscar pelo name
      // Por enquanto, vamos assumir que o spell vem com um campo id que é o base_spell_id
      const baseSpellId = (spell as any).id || "";

      // Verifica se já existe uma spell com o mesmo base_spell_id
      if (
        existing.some((s: any) => {
          // Se já é uma referência, compara base_spell_id
          if (s.base_spell_id) return s.base_spell_id === baseSpellId;
          // Se ainda é objeto antigo (compatibilidade), compara id ou name
          return s.id === baseSpellId || s.name === spell.name;
        })
      )
        return fig;

      // Cria objeto de referência (casting_number_modifier começa como 0)
      const baseSpell = { id: baseSpellId };
      const newSpell = createSpellFromBase(baseSpell, 0);

      return {
        ...fig,
        spells: [...existing, newSpell],
      };
    });
  };

  const handleRemoveSpellFromUnit = (unitId: string, spellId: string) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      spells: ((fig?.spells || []) as any[]).filter((s: any) => {
        // Se é referência, compara id
        if (s.base_spell_id) return s.id !== spellId;
        // Se é objeto antigo (compatibilidade), compara id
        return s.id !== spellId;
      }),
    }));
  };

  const handleUpdateSpellCastingNumber = (
    unitId: string,
    spellId: string,
    newModifier: number
  ) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const spells = (fig.spells || []) as Spell[];
      const updated = spells.map((s: any) => {
        // Se é referência, atualiza casting_number_modifier (sempre subtraído)
        if (s.base_spell_id) {
          return s.id === spellId
            ? { ...s, casting_number_modifier: newModifier }
            : s;
        }
        // Se é objeto antigo (compatibilidade), precisa calcular o modifier reverso
        // Mas como não temos o baseCastingNumber, vamos tentar manter compatibilidade
        // Por enquanto, vamos assumir que é um modifier direto
        return s.id === spellId ? { ...s, castingNumber: newModifier } : s;
      });
      return {
        ...fig,
        spells: updated,
      };
    });
  };

  // XP
  const handleUpdateFigureXp = (unitId: string, newXp: number) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const roleStr = (fig?.role || "").toString().toLowerCase();
      const isHero =
        roleStr.includes("líder") ||
        roleStr.includes("lider") ||
        roleStr.includes("her");
      const limit = isHero ? 90 : 30;
      const xpVal = Math.max(
        0,
        Math.min(limit, Number.isFinite(newXp) ? newXp : 0)
      );
      return { ...fig, xp: xpVal };
    });
  };

  // Nome narrativo (campaignName no formato novo)
  const handleUpdateNarrativeName = (unitId: string, newName: string) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      campaignName: newName,
    }));
  };

  // Notas da figura
  const handleUpdateFigureNotes = (unitId: string, notes: string) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      notes: notes,
    }));
  };

  // Special Abilities
  const handleAddSpecialAbilityToUnit = (
    unitId: string,
    ability: {
      id: string;
      category: "nurgleBlessing" | "mutation" | "sacredMark";
      name: string;
      description?: string;
      cost?: string;
      baseId?: string; // ID base do JSON
    }
  ) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const key =
        ability.category === "nurgleBlessing"
          ? "nurgleBlessings"
          : ability.category === "mutation"
            ? "mutations"
            : "sacredMarks";
      const existing = ((fig as any)[key] || []) as any[];

      // Cria objeto de referência usando apenas o ID base
      let newReference: any;
      const baseItem = { id: ability.baseId || "" };

      if (ability.category === "mutation") {
        newReference = createMutationFromBase(baseItem);
      } else if (ability.category === "sacredMark") {
        newReference = createSacredMarkFromBase(baseItem);
      } else {
        newReference = createNurgleBlessingFromBase(baseItem);
      }

      // Verifica se já existe uma referência com o mesmo base_id
      const baseIdKey =
        ability.category === "mutation"
          ? "base_mutation_id"
          : ability.category === "sacredMark"
            ? "base_sacred_mark_id"
            : "base_nurgle_blessing_id";

      if (existing.some((x: any) => x[baseIdKey] === newReference[baseIdKey])) {
        return fig; // Já existe, não adiciona novamente
      }

      const nextList = [...existing, newReference];

      // Determina categoria para regras especiais
      let categoryForRules:
        | "skill"
        | "mutation"
        | "sacredMark"
        | "nurgleBlessing";

      if (ability.category === "nurgleBlessing") {
        categoryForRules = "nurgleBlessing";
      } else if (ability.category === "mutation") {
        categoryForRules = "mutation";
      } else {
        categoryForRules = "sacredMark";
      }

      // Adiciona regras especiais se necessário (usando ID base)
      const extraSpecialRules = Array.isArray(fig.extraSpecialRules)
        ? [...fig.extraSpecialRules]
        : [];
      const abilityBaseId = ability.baseId || "";
      if (abilityBaseId) {
        const rulesToAdd = getSpecialAbilitySpecialRules(
          abilityBaseId,
          categoryForRules
        );
        rulesToAdd.forEach(rule => {
          if (!extraSpecialRules.includes(rule)) {
            extraSpecialRules.push(rule);
          }
        });
      }

      // Se a mutação adicionada for "Garra Colossal", remove flags de mão dos equipamentos
      let updatedEquiped = (fig.equiped || []) as any[];
      if (
        ability.category === "mutation" &&
        abilityBaseId.toLowerCase() === "garra-colossal"
      ) {
        // Remove flags de mão (mainHandWeapon, offHandWeapon, twoHandedWeapon)
        // mas mantém os equipamentos no inventário
        updatedEquiped = updatedEquiped.map((equip: any) => {
          const { mainHandWeapon, offHandWeapon, twoHandedWeapon, ...rest } =
            equip;
          return rest;
        });
      }

      return {
        ...fig,
        [key]: nextList,
        extraSpecialRules,
        equiped: updatedEquiped,
      };
    });
  };

  const handleRemoveSpecialAbilityFromUnit = (
    unitId: string,
    category: "nurgleBlessing" | "mutation" | "sacredMark",
    id: string
  ) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const key =
        category === "nurgleBlessing"
          ? "nurgleBlessings"
          : category === "mutation"
            ? "mutations"
            : "sacredMarks";
      const existing = ((fig as any)[key] || []) as any[];
      const abilityToRemove = existing.find((x: any) => x.id === id);
      const filtered = existing.filter((x: any) => x.id !== id);

      // Determina categoria para regras especiais
      let categoryForRules:
        | "skill"
        | "mutation"
        | "sacredMark"
        | "nurgleBlessing";

      if (category === "nurgleBlessing") {
        categoryForRules = "nurgleBlessing";
      } else if (category === "mutation") {
        categoryForRules = "mutation";
      } else {
        categoryForRules = "sacredMark";
      }

      // Remove regras especiais se necessário (usando ID base)
      const extraSpecialRules = Array.isArray(fig.extraSpecialRules)
        ? [...fig.extraSpecialRules]
        : [];
      if (abilityToRemove) {
        const baseIdKey =
          category === "mutation"
            ? "base_mutation_id"
            : category === "sacredMark"
              ? "base_sacred_mark_id"
              : "base_nurgle_blessing_id";
        const abilityBaseId =
          abilityToRemove[baseIdKey] || abilityToRemove.id || "";

        // Busca o custo para devolver coroas
        if (abilityBaseId && onRefundCrowns) {
          // Busca nos dados já carregados
          let abilityData: any = null;
          if (category === "mutation") {
            const mutationsArray = Array.isArray(mutationsData)
              ? mutationsData
              : (mutationsData as any)?.data || [];
            abilityData = mutationsArray.find(
              (m: any) => m.id === abilityBaseId
            );
          } else if (category === "sacredMark") {
            const marksArray = Array.isArray(sacredMarksData)
              ? sacredMarksData
              : (sacredMarksData as any)?.data || [];
            abilityData = marksArray.find((m: any) => m.id === abilityBaseId);
          } else if (category === "nurgleBlessing") {
            const blessingsArray = Array.isArray(blessingsOfNurgle)
              ? blessingsOfNurgle
              : (blessingsOfNurgle as any)?.data || [];
            abilityData = blessingsArray.find(
              (b: any) => b.id === abilityBaseId
            );
          }

          // Extrai e devolve coroas se encontrar o custo
          if (abilityData?.cost) {
            const costMatch = String(abilityData.cost).match(/(\d+)/);
            const cost = costMatch ? parseInt(costMatch[1], 10) : 0;
            if (cost > 0) {
              onRefundCrowns(cost);
              // Determina o tipo para a mensagem do toast
              const typeLabel =
                category === "mutation"
                  ? "Mutação"
                  : category === "sacredMark"
                    ? "Marca sagrada"
                    : "Bênção de Nurgle";
              toast.success(
                `${typeLabel} removida! ${cost} coroas devolvidas.`
              );
            }
          }
        }

        if (abilityBaseId) {
          const rulesToRemove = getSpecialAbilitySpecialRules(
            abilityBaseId,
            categoryForRules
          );
          const filteredRules = extraSpecialRules.filter(
            (r: string) => !rulesToRemove.includes(r)
          );
          return {
            ...fig,
            [key]: filtered,
            extraSpecialRules: filteredRules,
          };
        }
      }

      return {
        ...fig,
        [key]: filtered,
      };
    });
  };

  // Special Rules
  const handleAddSpecialRuleToUnit = (
    unitId: string,
    specialRule: { name: string; description: string }
  ) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const extraSpecialRules = Array.isArray(fig.extraSpecialRules)
        ? [...fig.extraSpecialRules]
        : [];
      const exists = extraSpecialRules.includes(specialRule.name);
      if (exists) return fig;
      return {
        ...fig,
        extraSpecialRules: [...extraSpecialRules, specialRule.name],
      };
    });
  };

  const handleRemoveSpecialRuleFromUnit = (
    unitId: string,
    specialRuleName: string
  ) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const extraSpecialRules = Array.isArray(fig.extraSpecialRules)
        ? [...fig.extraSpecialRules]
        : [];
      const filtered = extraSpecialRules.filter(
        (r: string) => r !== specialRuleName
      );
      return {
        ...fig,
        extraSpecialRules: filtered,
      };
    });
  };

  // Advancements
  const handleAddAdvancementToUnit = (unitId: string, adv: string) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const list = fig.advancements || [];
      const newAdvancement = {
        name: adv,
        effect: "",
      } as any;
      const updatedAdvancements = [...list, newAdvancement];

      const advancementModifiers =
        calculateAdvancementModifiers(updatedAdvancements);

      let updatedFigure = {
        ...fig,
        advancements: updatedAdvancements,
        advancementsModifiers: advancementModifiers,
      };

      const norm = adv.toLowerCase();
      if (norm.includes("moleque") && norm.includes("talento")) {
        const currentRole = String(fig?.role || "").toLowerCase();
        if (currentRole !== "líder" && currentRole !== "lider") {
          updatedFigure = {
            ...updatedFigure,
            role: "Herói" as any,
          };
        }
      }

      return updatedFigure;
    });
  };

  const handleRemoveAdvancementFromUnit = (
    unitId: string,
    adv: string,
    index?: number
  ) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const list = [...(fig.advancements || [])];
      const idx =
        index !== undefined
          ? index
          : list.findIndex((x: any) => x.name === adv || x === adv);
      if (idx >= 0) list.splice(idx, 1);

      const advancementModifiers = calculateAdvancementModifiers(list);

      return {
        ...fig,
        advancements: list,
        advancementsModifiers: advancementModifiers,
      };
    });
  };

  // Injuries
  const handleAddInjuryToUnit = (unitId: string, injury: string) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const list = fig.injuries || [];
      const newInjury = {
        name: injury,
        description: "",
      } as any;
      const updatedInjuries = [...list, newInjury];

      const injuryModifiers = calculateInjuryModifiers(updatedInjuries);

      let updatedFigure = {
        ...fig,
        injuries: updatedInjuries,
        injuriesModifiers: injuryModifiers,
      };

      // Adiciona extraSpecialRules associadas aos ferimentos
      const extraSpecialRulesWithInjury = Array.isArray(fig.extraSpecialRules)
        ? [...fig.extraSpecialRules]
        : [];
      const rulesToAdd = getInjurySpecialRules(injury);

      rulesToAdd.forEach(rule => {
        if (!extraSpecialRulesWithInjury.includes(rule)) {
          extraSpecialRulesWithInjury.push(rule);
        }
      });

      updatedFigure = {
        ...updatedFigure,
        extraSpecialRules: extraSpecialRulesWithInjury,
      };

      return updatedFigure;
    });
  };

  const handleRemoveInjuryFromUnit = (
    unitId: string,
    injury: string,
    index?: number
  ) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const list = [...(fig.injuries || [])];
      const idx =
        index !== undefined
          ? index
          : list.findIndex((x: any) => x.name === injury || x === injury);
      if (idx >= 0) list.splice(idx, 1);

      const injuryModifiers = calculateInjuryModifiers(list);

      let updatedFigure = {
        ...fig,
        injuries: list,
        injuriesModifiers: injuryModifiers,
      };

      // Remove extraSpecialRules associadas aos ferimentos
      const extraSpecialRules = Array.isArray(fig.extraSpecialRules)
        ? [...fig.extraSpecialRules]
        : [];
      const rulesToRemove = getInjurySpecialRules(injury);

      let filteredRules = extraSpecialRules;
      if (
        injury.toLowerCase().includes("rancor") ||
        injury.toLowerCase().includes("inimizade")
      ) {
        filteredRules = extraSpecialRules.filter(
          (r: string) => !r.startsWith("Rancor") && r !== "Rancor"
        );
      } else {
        filteredRules = extraSpecialRules.filter(
          (r: string) => !rulesToRemove.includes(r)
        );
      }

      updatedFigure = {
        ...updatedFigure,
        extraSpecialRules: filteredRules,
      };

      return updatedFigure;
    });
  };

  // Stat Modifiers
  const handleFigureStatModifierChange = (
    unitId: string,
    stat: string,
    category: "injury" | "advancement" | "misc" | "equipment",
    value: number
  ) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const targetKey =
        category === "injury"
          ? "injuryStatsModifiers"
          : category === "advancement"
            ? "advancementsStatsModifiers"
            : category === "equipment"
              ? "equipmentModifiers"
              : "miscStatsModifiers";
      const prev = (fig as any)[targetKey] || {};
      return {
        ...fig,
        [targetKey]: {
          ...prev,
          [stat]: value,
        },
      };
    });
  };

  return {
    handleAddSkillToUnit,
    handleRemoveSkillFromUnit,
    handleAddSpellToUnit,
    handleRemoveSpellFromUnit,
    handleUpdateSpellCastingNumber,
    handleUpdateFigureXp,
    handleUpdateNarrativeName,
    handleUpdateFigureNotes,
    handleAddSpecialAbilityToUnit,
    handleRemoveSpecialAbilityFromUnit,
    handleAddSpecialRuleToUnit,
    handleRemoveSpecialRuleFromUnit,
    handleAddAdvancementToUnit,
    handleRemoveAdvancementFromUnit,
    handleAddInjuryToUnit,
    handleRemoveInjuryFromUnit,
    handleFigureStatModifierChange,
  };
}
