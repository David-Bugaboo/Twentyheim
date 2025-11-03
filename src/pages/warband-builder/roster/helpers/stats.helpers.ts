/**
 * Helpers para cálculos de atributos e stats
 */

import type { AttributeBreakdown, RosterUnitStats } from "../../../../components/RosterUnitCard";
import type { UnitStats } from "../../../../components/UnitCard";

/**
 * Extrai número de uma string (ex: "+1" -> 1, "10" -> 10)
 */
export function extractNumber(value: number | string | undefined): number {
  if (typeof value === "number") return value;
  if (value === undefined || value === null) return 0;
  const str = String(value).trim();
  const match = str.match(/([+-]?\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Cria breakdown de atributos a partir de baseStats
 */
export function createBreakdown(
  baseStats: UnitStats,
  statKey: string
): AttributeBreakdown {
  const base = extractNumber(
    (baseStats as any)[statKey] ??
      (baseStats as any)[statKey === "move" ? "movimento" : ""] ??
      (baseStats as any)[statKey === "fight" ? "ímpeto" : ""] ??
      (baseStats as any)[statKey === "shoot" ? "precisão" : ""] ??
      0
  );

  return {
    base,
    advancement: 0,
    injury: 0,
    misc: 0,
  };
}

/**
 * Cria RosterUnitStats completo a partir de baseStats
 */
export function createRosterStats(baseStats: UnitStats): RosterUnitStats {

  const stats: RosterUnitStats = {
    move: createBreakdown(baseStats, "move"),
    fight: createBreakdown(baseStats, "fight"),
    shoot: createBreakdown(baseStats, "shoot"),
    armour: createBreakdown(baseStats, "armour"),
    vontade: createBreakdown(baseStats, "Vontade"),
    health: createBreakdown(baseStats, "health"),
  };

  // Adiciona strength se existir
  if (
    baseStats.strength !== undefined ||
    (baseStats as any).força !== undefined ||
    (baseStats as any).For !== undefined
  ) {
    stats.strength = createBreakdown(
      baseStats,
      "strength"
    );
  }

  return stats;
}

