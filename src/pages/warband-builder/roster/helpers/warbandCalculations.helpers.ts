/**
 * Helpers para cálculos relacionados ao warband
 */

/**
 * Calcula o Warband Rating
 * Warband Rating = (nº membros * 5) + soma(xp + qualidade de cada figura)
 */
export function calculateWarbandRating(figures: any[]): number {
  const activeUnits = figures.filter((f: any) => !Boolean(f?.inactive));
  const members = activeUnits.length;
  const sum = activeUnits.reduce((acc, f: any) => {
    const xp = Number(f?.xp || 0);
    const quality = Number(f?.qualidade || 0);
    return acc + xp + quality;
  }, 0);
  return members * 5 + sum;
}

/**
 * Calcula modificadores de avanços a partir do array de advancements
 */
export function calculateAdvancementModifiers(
  advancements: any[]
): {
  move: number;
  fight: number;
  shoot: number;
  armour: number;
  Vontade: number;
  strength: number;
  health: number;
} {
  const modifiers = {
    move: 0,
    fight: 0,
    shoot: 0,
    armour: 0,
    Vontade: 0,
    strength: 0,
    health: 0,
  };

  if (!Array.isArray(advancements)) return modifiers;

  for (const adv of advancements) {
    const name = String(adv?.name || adv || "").toLowerCase();
    if (name.includes("ímpeto")) {
      modifiers.fight += 1;
    } else if (name.includes("precis")) {
      modifiers.shoot += 1;
    } else if (name.includes("armadura")) {
      modifiers.armour += 1;
    } else if (name.includes("vida")) {
      modifiers.health += 2;
    } else if (name.includes("movimento")) {
      modifiers.move += 2;
    } else if (name.includes("vontade")) {
      modifiers.Vontade += 1;
    } else if (name.includes("força")) {
      modifiers.strength += 1;
    }
  }

  return modifiers;
}

/**
 * Calcula modificadores de ferimentos a partir do array de injuries
 */
export function calculateInjuryModifiers(
  injuries: any[]
): {
  move: number;
  fight: number;
  shoot: number;
  armour: number;
  Vontade: number;
  strength: number;
  health: number;
} {
  const modifiers = {
    move: 0,
    fight: 0,
    shoot: 0,
    armour: 0,
    Vontade: 0,
    strength: 0,
    health: 0,
  };

  if (!Array.isArray(injuries)) return modifiers;

  for (const inj of injuries) {
    const name = String(inj?.name || inj || "").trim();
    const nameLower = name.toLowerCase();

    if (
      nameLower.includes("perna") &&
      (nameLower.includes("ferimento") ||
        nameLower.includes("deslocada") ||
        nameLower.includes("fratura"))
    ) {
      modifiers.move -= 2;
    } else if (nameLower.includes("costelas") || nameLower.includes("costela")) {
      modifiers.health -= 2;
    } else if (nameLower.includes("cego") || nameLower.includes("olho")) {
      modifiers.shoot -= 2;
    } else if (nameLower === "trauma") {
      modifiers.Vontade -= 1;
    } else if (
      nameLower.includes("mão") ||
      nameLower.includes("antebraço") ||
      nameLower.includes("esmigalhada") ||
      nameLower.includes("esmagado")
    ) {
      modifiers.fight -= 1;
    } else if (nameLower.includes("ombro") && nameLower.includes("deslocado")) {
      modifiers.fight -= 1;
    } else if (nameLower.includes("profundo")) {
      modifiers.health -= 1;
    } else if (nameLower.includes("infectado")) {
      modifiers.health -= 1;
    }
  }

  return modifiers;
}

/**
 * Retorna regras especiais associadas a um ferimento
 */
export function getInjurySpecialRules(injury: string): string[] {
  const injuryNameLower = injury.toLowerCase();
  const rules: string[] = [];

  if (
    injuryNameLower.includes("insanidade") &&
    injuryNameLower.includes("estupidez")
  ) {
    rules.push("Retardado");
  } else if (
    injuryNameLower.includes("insanidade") &&
    injuryNameLower.includes("fúria")
  ) {
    rules.push("Louco Espumante");
  } else if (injuryNameLower.includes("caleijado")) {
    rules.push("Caleijado");
  } else if (
    injuryNameLower.includes("deformado") ||
    injuryNameLower.includes("cicatrizes horríveis") ||
    injuryNameLower.includes("cicatrizes horriveis")
  ) {
    rules.push("Deformado");
  } else if (
    injuryNameLower.includes("rancor") ||
    injuryNameLower.includes("inimizade") ||
    injuryNameLower.includes("inimizade amarga")
  ) {
    if (injury.includes("Rancor")) {
      rules.push(injury.trim());
    } else if (injuryNameLower.includes("inimizade amarga")) {
      rules.push("Rancor");
    }
  }

  return rules;
}

