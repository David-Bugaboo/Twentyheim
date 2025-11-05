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
export function calculateAdvancementModifiers(advancements: any[]): {
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
export function calculateInjuryModifiers(injuries: any[]): {
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
    } else if (
      nameLower.includes("costelas") ||
      nameLower.includes("costela")
    ) {
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

/**
 * Calcula modificadores de habilidades (skills) a partir do array de skills
 */
export function calculateSkillModifiers(skills: any[]): {
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

  if (!Array.isArray(skills)) return modifiers;

  for (const skill of skills) {
    const skillBaseId = skill?.base_skill_id || skill?.id || "";
    const name = String(skill?.name || "").toLowerCase();

    // Halterofilista: +1 em força
    // Verifica pelo base_skill_id (que é o ID do arquivo JSON) ou pelo nome
    if (skillBaseId === "halterofilista" || name.includes("halterofilista")) {
      modifiers.strength += 1;
    }

    // Lutar com a cauda: +1 ímpeto
    if (
      name.includes("lutar com a cauda") ||
      name.includes("lutar com cauda")
    ) {
      modifiers.fight += 1;
    }

    // Arte da morte silenciosa: O bônus de ímpeto de arma "Par" é tratado no RosterUnitCard
    // (não é um modificador direto, mas modifica o bônus de duas armas)

    // Pelo Emaranhado: +1 de armadura
    if (
      skillBaseId === "pelo-emaranhado" ||
      name.includes("pelo emaranhado") ||
      name.includes("pelo-emaranhado")
    ) {
      modifiers.armour += 1;
    }

    
    if (
      skillBaseId === "furia-carmesim" ||
      name.includes("fúria carmesim") ||
      name.includes("furia carmesim")
    ) {
      modifiers.fight += 1;
    }

    // Monstruosidade Massiva: +4 de vida
    if (name.includes("monstruosidade massiva")) {
      modifiers.health += 4;
    }

    // Cascudo: +1 de armadura
    if (name.includes("cascudo")) {
      modifiers.armour += 1;
    }

    // Escamas impenetráveis: +1 de armadura e +2 de vida
    if (
      name.includes("escamas impenetráveis") ||
      name.includes("escamas impenetraveis")
    ) {
      modifiers.armour += 1;
      modifiers.health += 2;
    }
  }

  return modifiers;
}

/**
 * Calcula modificadores de mutações a partir do array de mutations
 * @param mutations Array de referências de mutações (com base_mutation_id)
 * @param mutationBases Map de dados base resolvidos (key: base_mutation_id, value: dados completos)
 */
export function calculateMutationModifiers(
  mutations: any[],
  mutationBases: Record<string, any>
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

  if (!Array.isArray(mutations)) return modifiers;

  for (const mutation of mutations) {
    const baseId = mutation?.base_mutation_id || mutation?.id || "";
    const baseData = mutationBases[baseId];

    if (!baseData) continue; // Se não encontrar dados base, pula

    const name = String(baseData.name || "").toLowerCase();
    const baseIdLower = baseId.toLowerCase();

    // Cascos Fendidos: +2 de Movimento
    if (
      name.includes("cascos fendidos") ||
      name.includes("cascos-fendidos") ||
      baseIdLower === "cascos-fendidos"
    ) {
      modifiers.move += 2;
    }

    // Terceiro Braço: +1 de Ímpeto
    if (
      name.includes("terceiro braço") ||
      name.includes("terceiro braco") ||
      baseIdLower === "terceiro-braco"
    ) {
      modifiers.fight += 1;
    }
  }

  return modifiers;
}

/**
 * Verifica se uma figura tem a mutação Garra Colossal
 */
export function hasGiantClawMutation(mutations: any[]): boolean {
  if (!Array.isArray(mutations)) return false;

  return mutations.some((mutation: any) => {
    const mutationBaseId = mutation?.base_mutation_id || mutation?.id || "";
    return mutationBaseId === "garra-colossal";
  });
}

/**
 * Verifica se uma figura tem a mutação Cauda de escorpião
 */
export function hasScorpionTailMutation(mutations: any[]): boolean {
  if (!Array.isArray(mutations)) return false;

  return mutations.some((mutation: any) => {
    const mutationBaseId = mutation?.base_mutation_id || mutation?.id || "";
    return (
      mutationBaseId === "cauda-de-escorpiao" ||
      mutationBaseId === "cauda-de-escorpião"
    );
  });
}

/**
 * Verifica se uma figura tem a mutação Tentáculo
 */
export function hasTentacleMutation(mutations: any[]): boolean {
  if (!Array.isArray(mutations)) return false;

  return mutations.some((mutation: any) => {
    const mutationBaseId = mutation?.base_mutation_id || mutation?.id || "";
    return mutationBaseId === "tentaculo" || mutationBaseId === "tentáculo";
  });
}

/**
 * Calcula modificadores de marcas sagradas a partir do array de sacredMarks
 * @param sacredMarks Array de referências de marcas sagradas (com base_sacred_mark_id)
 * @param sacredMarkBases Map de dados base resolvidos (key: base_sacred_mark_id, value: dados completos)
 */
export function calculateSacredMarkModifiers(
  sacredMarks: any[],
  sacredMarkBases: Record<string, any>
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

  if (!Array.isArray(sacredMarks)) return modifiers;

  // Marca de Tepok: Trata a armadura base como 14
  // Isso é tratado separadamente em getCombinedStats, não como modificador
  // Outras marcas podem adicionar modificadores aqui no futuro
  // for (const mark of sacredMarks) {
  //   const baseId = mark?.base_sacred_mark_id || mark?.id || "";
  //   const baseData = sacredMarkBases[baseId];
  //   if (!baseData) continue;
  //   // ... lógica de modificadores
  // }

  // Parâmetro reservado para uso futuro quando outras marcas precisarem de modificadores
  void sacredMarkBases;

  return modifiers;
}

/**
 * Verifica se uma figura tem a marca sagrada de Tepok
 */
export function hasTepokMark(sacredMarks: any[]): boolean {
  if (!Array.isArray(sacredMarks)) return false;

  return sacredMarks.some((mark: any) => {
    const markBaseId = mark?.base_sacred_mark_id || mark?.id || "";
    return markBaseId === "marca-de-tepok" || markBaseId === "mark-of-tepok";
  });
}

/**
 * Verifica se uma figura tem a marca sagrada de Sotek
 */
export function hasSotekMark(sacredMarks: any[]): boolean {
  if (!Array.isArray(sacredMarks)) return false;

  return sacredMarks.some((mark: any) => {
    const markBaseId = mark?.base_sacred_mark_id || mark?.id || "";
    return markBaseId === "marca-de-sotek" || markBaseId === "mark-of-sotek";
  });
}

/**
 * Verifica se uma figura tem a habilidade Aprendizado Arcano
 */
export function hasArcaneLearning(skills: any[]): boolean {
  if (!Array.isArray(skills)) return false;

  return skills.some((skill: any) => {
    const skillBaseId = skill?.base_skill_id || skill?.id || "";
    return (
      skillBaseId === "aprendizado-arcano" || skillBaseId === "arcane-learning"
    );
  });
}

/**
 * Verifica se uma figura tem a habilidade Corpo Treinado
 */
export function hasTrainedBody(skills: any[]): boolean {
  if (!Array.isArray(skills)) return false;

  return skills.some((skill: any) => {
    const skillBaseId = skill?.base_skill_id || skill?.id || "";
    return skillBaseId === "corpo-treinado" || skillBaseId === "trained-body";
  });
}

/**
 * Verifica se uma figura tem a habilidade Mago de Batalha
 */
export function hasBattleWizard(skills: any[]): boolean {
  if (!Array.isArray(skills)) return false;

  return skills.some((skill: any) => {
    const skillBaseId = skill?.base_skill_id || skill?.id || "";
    return skillBaseId === "mago-de-batalha" || skillBaseId === "battle-wizard";
  });
}

/**
 * Verifica se uma figura tem a specialRule Conjurador
 */
export function hasConjurador(abilities: any[]): boolean {
  if (!Array.isArray(abilities)) return false;

  return abilities.some((ability: any) => {
    const name = String(ability?.name || "").toLowerCase();
    return name === "conjurador" || name.includes("conjurador");
  });
}

/**
 * Verifica se uma figura tem a habilidade Mestre do Arsenal
 */
export function hasArsenalMaster(skills: any[]): boolean {
  if (!Array.isArray(skills)) return false;

  return skills.some((skill: any) => {
    const skillBaseId = skill?.base_skill_id || skill?.id || "";
    const name = String(skill?.name || "").toLowerCase();
    return (
      skillBaseId === "mestre-do-arsenal" ||
      skillBaseId === "arsenal-master" ||
      name.includes("mestre do arsenal") ||
      name.includes("arsenal master")
    );
  });
}

/**
 * Verifica se uma figura tem a habilidade Mestre Atirador
 */
export function hasMarksmanMaster(skills: any[]): boolean {
  if (!Array.isArray(skills)) return false;

  return skills.some((skill: any) => {
    const skillBaseId = skill?.base_skill_id || skill?.id || "";
    const name = String(skill?.name || "").toLowerCase();
    return (
      skillBaseId === "mestre-atirador" ||
      skillBaseId === "marksman-master" ||
      name.includes("mestre atirador") ||
      name.includes("marksman master")
    );
  });
}

/**
 * Calcula modificadores de bênçãos de Nurgle a partir do array de nurgleBlessings
 * @param nurgleBlessings Array de referências de bênçãos (com base_nurgle_blessing_id)
 * @param blessingBases Map de dados base resolvidos (key: base_nurgle_blessing_id, value: dados completos)
 */
export function calculateNurgleBlessingModifiers(
  nurgleBlessings: any[],
  blessingBases: Record<string, any>
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

  if (!Array.isArray(nurgleBlessings)) return modifiers;

  for (const blessing of nurgleBlessings) {
    const blessingBaseId =
      blessing?.base_nurgle_blessing_id || blessing?.id || "";

    const baseData = blessingBases[blessingBaseId];

    if (!baseData) continue; // Se não encontrar dados base, pula

    const name = String(baseData.name || "").toLowerCase();

    // Obesidade Mórbida: +1 de armadura, +2 de vida e -2 de movimento
    if (
      blessingBaseId === "obesidade-morbida" ||
      blessingBaseId === "obesidade-mórbida" ||
      name.includes("obesidade mórbida") ||
      name.includes("obesidade morbida") ||
      name.includes("morbid obesity")
    ) {
      modifiers.armour += 1;
      modifiers.health += 2;
      modifiers.move -= 2;
    }
  }

  return modifiers;
}

/**
 * Calcula modificadores a partir de regras especiais extras (strings livres)
 * Usado para dádivas/bençãos especiais adicionadas em extraSpecialRules
 */
export function calculateExtraSpecialRulesModifiers(
  extraSpecialRules: string[]
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

  if (!Array.isArray(extraSpecialRules) || extraSpecialRules.length === 0) {
    return modifiers;
  }

  for (const rule of extraSpecialRules) {
    const name = String(rule || "").toLowerCase();
    // Fúria Carmesim: +1 Ímpeto (caso venha como regra especial/ habilidade)
    if (name.includes("fúria carmesim") || name.includes("furia carmesim")) {
      modifiers.fight += 1;
    }

    // Carne de cera: -1 Armadura
    if (name.includes("carne de cera") || name.includes("carne-de-cera")) {
      modifiers.armour -= 1;
    }

    // Definhar: -2 Vida
    if (name.includes("definhar")) {
      modifiers.health -= 2;
    }

    // Arauto de Nurgle: -1 Movimento, -1 Ímpeto, -1 Armadura e -2 Vida
    if (name.includes("arauto de nurgle")) {
      modifiers.move -= 1;
      modifiers.fight -= 1;
      modifiers.armour -= 1;
      modifiers.health -= 2;
    }

    // Dádiva de Nurgle: -2 Movimento, +2 Vida
    if (
      name.includes("dádiva de nurgle") ||
      name.includes("dadiva de nurgle")
    ) {
      modifiers.move -= 2;
      modifiers.health += 2;
    }

    // Horror sem face: -2 Vontade
    if (name.includes("horror sem face")) {
      modifiers.Vontade -= 2;
    }
  }

  return modifiers;
}

/**
 * Verifica se uma figura tem a bênção de Nurgle Torrente de Sujeira
 */
export function hasFilthTorrentBlessing(nurgleBlessings: any[]): boolean {
  if (!Array.isArray(nurgleBlessings)) return false;

  return nurgleBlessings.some((blessing: any) => {
    const blessingBaseId =
      blessing?.base_nurgle_blessing_id || blessing?.id || "";
    return (
      blessingBaseId === "torrente-de-sujeira" ||
      blessingBaseId === "filth-torrent"
    );
  });
}

/**
 * Retorna regras especiais associadas a uma habilidade/mutação/marca/bênção
 * Detecta pelo ID base, não pelo nome
 */
export function getSpecialAbilitySpecialRules(
  abilityBaseId: string,
  category: "skill" | "mutation" | "sacredMark" | "nurgleBlessing"
): string[] {
  const rules: string[] = [];

  // Detecta regras por ID base
  // Parâmetros reservados para uso futuro quando regras especiais forem implementadas
  void abilityBaseId;
  void category;

  if (category === "skill") {
    // Exemplo: if (abilityBaseId === "alguma-habilidade-id") {
    //   rules.push("Regra Especial");
    // }
  } else if (category === "mutation") {
    // Exemplo: if (abilityBaseId === "alguma-mutacao-id") {
    //   rules.push("Regra Especial");
    // }
  } else if (category === "sacredMark") {
    // Exemplo: if (abilityBaseId === "alguma-marca-id") {
    //   rules.push("Regra Especial");
    // }
  } else if (category === "nurgleBlessing") {
    // Exemplo: if (abilityBaseId === "alguma-benção-id") {
    //   rules.push("Regra Especial");
    // }
  }

  return rules;
}
