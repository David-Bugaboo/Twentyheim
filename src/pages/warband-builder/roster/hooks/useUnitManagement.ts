/**
 * Hook para gerenciar unidades (skills, spells, injuries, advancements, etc)
 */

import {
  calculateAdvancementModifiers,
  calculateInjuryModifiers,
  getInjurySpecialRules,
} from "../helpers/warbandCalculations.helpers";

interface UseUnitManagementParams {
  updateWarbandFigure: (figureId: string, updater: (figure: any) => any) => void;
  setHasUnsavedChanges: (value: boolean) => void;
}

export function useUnitManagement({
  updateWarbandFigure,
  setHasUnsavedChanges,
}: UseUnitManagementParams) {
  // Skills
  const handleAddSkillToUnit = (
    unitId: string,
    skill: { id?: string; name: string; description: string; type?: string }
  ) => {
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const existing = fig.skills || [];
      if (existing.some((s: any) => s.name === skill.name)) return fig;
      const newSkill = {
        name: skill.name,
        description: skill.description,
        id: skill.id || crypto.randomUUID(),
        type: skill.type,
      } as any;
      return {
        ...fig,
        skills: [...existing, newSkill],
      };
    });
  };

  const handleRemoveSkillFromUnit = (unitId: string, skillId: string) => {
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      skills: ((fig?.skills || []) as any[]).filter(
        (s: any) => s.id !== skillId
      ),
    }));
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
      const existing = fig.spells || [];
      if (existing.some((s: any) => s.name === spell.name)) return fig;
      const instance = { id: crypto.randomUUID(), ...spell } as any;
      return {
        ...fig,
        spells: [...existing, instance],
      };
    });
  };

  const handleRemoveSpellFromUnit = (unitId: string, spellId: string) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      spells: ((fig?.spells || []) as any[]).filter((s: any) => s.id !== spellId),
    }));
  };

  const handleUpdateSpellCastingNumber = (
    unitId: string,
    spellId: string,
    newCastingNumber: number
  ) => {
    setHasUnsavedChanges(true);
    updateWarbandFigure(unitId, (fig: any) => {
      if (!fig) return fig;
      const updated = (fig.spells || []).map((s: any) =>
        s.id === spellId ? { ...s, castingNumber: newCastingNumber } : s
      );
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

  // Special Abilities
  const handleAddSpecialAbilityToUnit = (
    unitId: string,
    ability: {
      id: string;
      category: "nurgleBlessing" | "mutation" | "sacredMark";
      name: string;
      description?: string;
      cost?: string;
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
      const nextList = [
        ...(((fig as any)[key] || []) as any[]),
        {
          id: ability.id,
          name: ability.name,
          description: ability.description,
          cost: ability.cost,
        },
      ];
      return { ...fig, [key]: nextList };
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
      const filtered = (((fig as any)[key] || []) as any[]).filter(
        (x: any) => x.id !== id
      );
      return { ...fig, [key]: filtered };
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
      const filtered = extraSpecialRules.filter((r: string) => r !== specialRuleName);
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

      rulesToAdd.forEach((rule) => {
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
      if (injury.toLowerCase().includes("rancor") || 
          injury.toLowerCase().includes("inimizade")) {
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
    category: "injury" | "advancement" | "misc",
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
          : "miscStatsModifiers";
      return {
        ...fig,
        [targetKey]: {
          ...fig[targetKey],
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

