/**
 * Helpers para operações com equipamentos
 */

/**
 * Verifica se um nome é de escudo
 */
export function isShieldName(name: string): boolean {
  const n = name.toLowerCase();
  return (
    n.includes("escudo") ||
    n.includes("shield") ||
    n.includes("bróquel") ||
    n.includes("broquel") ||
    n.includes("pavise") ||
    n.includes("paves")
  );
}

/**
 * Verifica se um nome é de elmo
 */
export function isHelmetName(name: string): boolean {
  const n = name.toLowerCase();
  return n.includes("elmo") || n.includes("helmet") || n.includes("capacete");
}

/**
 * Resolve um item pelo nome nos catálogos e retorna um objeto Equipment completo
 */
export function resolveEquipmentByName(
  name: string,
  catalogs: {
    meleeDb: any[];
    rangedDb: any[];
    firearmsDb: any[];
    armorDb: any[];
    accessoriesDb: any[];
    remediesPoisonsDb: any[];
  }
): any | null {
  const normalize = (s: any) =>
    String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}+/gu, "")
      .trim();
  const target = normalize(name);
  
  const catalogList: { list: any[]; type: string }[] = [
    { list: catalogs.meleeDb || [], type: "Melee" },
    { list: catalogs.rangedDb || [], type: "Ranged" },
    { list: catalogs.firearmsDb || [], type: "Ranged" },
    { list: catalogs.armorDb || [], type: "Armor" },
    { list: catalogs.accessoriesDb || [], type: "Misc" },
    { list: catalogs.remediesPoisonsDb || [], type: "Misc" },
  ];

  let found: any | null = null;
  let typeStr = "";

  for (const { list, type } of catalogList) {
    const f = list.find((x: any) => normalize(x?.name) === target);
    if (f) {
      found = f;
      typeStr = type;
      break;
    }
  }

  if (!found) return null;

  const toNumber = (v: any): number | undefined => {
    if (typeof v === "number") return v;
    const p = parseInt(String(v), 10);
    return Number.isFinite(p) ? p : undefined;
  };

  const toRules = (arr: any): { label: string; value: string }[] => {
    if (!Array.isArray(arr)) return [];
    return arr
      .map((r) => {
        if (r && typeof r === "object" && (r.label || r.value))
          return {
            label: String(r.label || r.name || ""),
            value: String(r.value || r.effect || ""),
          };
        return null;
      })
      .filter(Boolean) as any[];
  };

  const eq: any = {
    id: crypto.randomUUID(),
    name: String(found.name),
    type: String(typeStr || found.type || "Item"),
    damageModifier: toNumber(found.damageModifier),
    purchaseCost: String(found.purchaseCost || found.sellCost || found.cost || "-"),
    armorBonus: toNumber(found.armorBonus) || 0,
    movePenalty: toNumber(found.movePenalty),
    slots:
      toNumber(found.slots) ||
      toNumber(found.spaces) ||
      toNumber(found.equipmentSpaces) ||
      1,
    requirements: found.requirements ?? null,
    specialRules: toRules(found.specialRules),
    modifier: {
      name: String(found.strength ? "Força" : found.modifier?.name || ""),
      effect: String(found.effect || found.modifier?.effect || ""),
    },
  };

  if (found.maxRange) {
    (eq as any).maxRange = found.maxRange;
  }

  (eq as any).templateId = found.id || null;

  return eq;
}

/**
 * Calcula custo final de um item considerando modificadores
 */
export function calculateItemCost(
  baseCost: string,
  modifier?: { name: string; effect?: string },
  modifierCatalogs?: {
    meleeMods: any[];
    rangedMods: any[];
    firearmsMods: any[];
  }
): number {
  const baseCostMatch = String(baseCost || "0").match(/(\d+(?:\.\d+)?)/);
  const baseCostNum = baseCostMatch ? parseFloat(baseCostMatch[1]) : 0;

  if (!modifier || !modifier.name) return baseCostNum;

  if (!modifierCatalogs) return baseCostNum;

  const modNameLc = String(modifier.name).toLowerCase();
  const allMods: any[] = [
    ...(modifierCatalogs.meleeMods || []),
    ...(modifierCatalogs.rangedMods || []),
    ...(modifierCatalogs.firearmsMods || []),
  ];
  const mod =
    allMods.find((m) => String(m.name).toLowerCase() === modNameLc) ||
    (modifier as any);

  const exprRaw = String(mod.purchaseCost || "");
  const expr = exprRaw.toLowerCase().replace(/\s+/g, "");
  let multiplier = 1;
  let addend = 0;
  let fixedCost: number | null = null;

  const mult = expr.match(/base\*(\d+(?:\.\d+)?)/);
  const add = expr.match(/base\+(\d+(?:\.\d+)?)/);
  if (mult) {
    multiplier = parseFloat(mult[1]);
  } else if (add) {
    addend = parseFloat(add[1]);
  } else if (!expr && typeof (mod as any).purchaseCost === "number") {
    fixedCost = Number((mod as any).purchaseCost);
  }

  if (fixedCost != null) {
    return fixedCost;
  } else {
    return baseCostNum * multiplier + addend;
  }
}

