/**
 * Helpers para construir objetos de unidades e bandos
 */

import type { EditableUnit } from "../types/editableUnit.type";
import type { figure } from "../../types/figure.type";

/**
 * Constrói um EditableUnit a partir de uma figure (para bandos locais)
 */
export function buildEditableUnitFromFigure(fig: any, _idx: number): EditableUnit {
  const id = String(fig?.id || crypto.randomUUID());
  const role = fig?.role;
  const correctedFigure = {
    ...fig,
    campaignName: role === "Lenda" ? "" : fig?.campaignName || "",
  };
  
  return {
    id,
    name: String(fig?.name || "Figura"),
    role: role,
    lore: "",
    abilities: [],
    figure: correctedFigure as figure,
    stats: {
      move: fig?.baseStats?.move ?? 10,
      fight: fig?.baseStats?.fight ?? 0,
      shoot: fig?.baseStats?.shoot ?? 0,
      armour: fig?.baseStats?.armour ?? 10,
      Vontade: fig?.baseStats?.Vontade ?? 0,
      health: fig?.baseStats?.health ?? 10,
      cost: fig?.baseStats?.cost ?? "-",
      startingXp: fig?.xp ?? 0,
      strength: fig?.baseStats?.strength ?? 0,
      skills: fig?.availableSkills || [],
      spells: fig?.availableSpells || [],
      equipmentSlots: fig?.equipmentSlots ?? 5,
    },
    chosenEquipment: [],
    chosenMagic: [],
    specialRules: (fig?.abilities || []).map((a: any) => a?.name).filter(Boolean),
  };
}

/**
 * Constrói um EditableUnit a partir de dados do Firestore
 */
export function buildEditableUnitFromFirestore(fig: any): EditableUnit {
  const id = String(fig?.id || crypto.randomUUID());
  const role = fig?.role;
  const correctedFigure = {
    ...fig,
    campaignName: role === "Lenda" ? "" : fig?.campaignName || "",
  };
  
  return {
    id,
    name: String(fig?.name || "Figura"),
    role: role,
    lore: "",
    abilities: [],
    figure: correctedFigure as figure,
    stats: {
      move: fig?.baseStats?.move ?? 10,
      fight: fig?.baseStats?.fight ?? 0,
      shoot: fig?.baseStats?.shoot ?? 0,
      armour: fig?.baseStats?.armour ?? 10,
      Vontade: fig?.baseStats?.Vontade ?? 0,
      health: fig?.baseStats?.health ?? 10,
      cost: fig?.baseStats?.cost ?? "-",
      startingXp: fig?.xp ?? 0,
      strength: fig?.baseStats?.strength ?? 0,
      skills: fig?.availableSkills || [],
      spells: fig?.availableSpells || [],
      equipmentSlots: fig?.equipmentSlots ?? 5,
    },
    chosenEquipment: [],
    chosenMagic: [],
    specialRules: [],
  };
}

