/**
 * Helpers para operações com facções
 */

/**
 * Mapeia chaves de facção para rótulos
 */
export function getFactionLabel(factionKey: string): string {
  const map: Record<string, string> = {
    "sisters-of-sigmar": "Irmãs de Sigmar",
    skaven: "Skaven",
    "beastman-raiders": "Saqueadores Homem-Fera",
    "dwarf-treasure-hunters": "Caçadores de Tesouro Anões",
    "cult-of-the-possessed": "Culto dos Possuídos",
    "vampire-courts": "Cortes Vampíricas",
    "witch-hunters": "Caçadores de Bruxas",
    lizardmen: "Reptilianos",
    "orc-mob": "Horda Orc",
    goblins: "Goblins",
    "sons-of-hashut": "Filhos de Hashut",
    mercenaries: "Mercenários",
    "carnival-of-chaos": "Circo do Caos",
    "dark-elf-corsairs": "Corsários Druchii",
    "wood-elves-of-athel-loren": "Elfos Silvanos de Athel Loren",
  };
  return map[factionKey] || factionKey;
}

/**
 * Verifica se uma unidade é elegível para uma facção
 */
export function isEligibleForFaction(unit: any, factionLabel: string): boolean {
  const av = unit?.availability;
  const ex = unit?.exclusions;
  const hasAll =
    Array.isArray(av) &&
    av.some((x: any) => String(x).toLowerCase() === "todos");
  const hasFaction =
    Array.isArray(av) && av.some((x: any) => String(x) === factionLabel);
  const excluded =
    Array.isArray(ex) && ex.some((x: any) => String(x) === factionLabel);
  return (hasFaction || hasAll) && !excluded;
}

/**
 * Normaliza lista de dados (pode ser array ou objeto com data)
 */
export function normalizeList(data: any): any[] {
  return Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
}

