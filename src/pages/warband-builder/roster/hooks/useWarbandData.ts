/**
 * Hook para carregar todos os dados JSON necessários para o gestor de bandos
 */

import { useJsonData } from "../../../../hooks/useJsonData";
import { getStaticImport } from "../../../../data/jsonFileMap";

/**
 * Hook que carrega todos os dados de facções, equipamentos e outros necessários
 */
export function useWarbandData() {
  // Facções
  const sistersData = useJsonData({
    fileId: "sisters-of-sigmar",
    staticImport: () => getStaticImport("sisters-of-sigmar")(),
  });
  const skavenData = useJsonData({
    fileId: "skaven",
    staticImport: () => getStaticImport("skaven")(),
  });
  const beastmenData = useJsonData({
    fileId: "beastman-raiders",
    staticImport: () => getStaticImport("beastman-raiders")(),
  });
  const dwarfTreasureHuntersData = useJsonData({
    fileId: "dwarf-treasure-hunters",
    staticImport: () => getStaticImport("dwarf-treasure-hunters")(),
  });
  const cultPossessedData = useJsonData({
    fileId: "cult-of-the-possessed",
    staticImport: () => getStaticImport("cult-of-the-possessed")(),
  });
  const vampireCourtsData = useJsonData({
    fileId: "vampire-courts",
    staticImport: () => getStaticImport("vampire-courts")(),
  });
  const witchHuntersData = useJsonData({
    fileId: "witch-hunters",
    staticImport: () => getStaticImport("witch-hunters")(),
  });
  const lizardmenData = useJsonData({
    fileId: "lizardmen",
    staticImport: () => getStaticImport("lizardmen")(),
  });
  const orcMobData = useJsonData({
    fileId: "orc-mob",
    staticImport: () => getStaticImport("orc-mob")(),
  });
  const goblinsData = useJsonData({
    fileId: "goblins",
    staticImport: () => getStaticImport("goblins")(),
  });
  const sonsOfHashutData = useJsonData({
    fileId: "sons-of-hashut",
    staticImport: () => getStaticImport("sons-of-hashut")(),
  });
  const mercenariesData = useJsonData({
    fileId: "mercenaries",
    staticImport: () => getStaticImport("mercenaries")(),
  });
  const carnivalChaosData = useJsonData({
    fileId: "carnival-of-chaos",
    staticImport: () => getStaticImport("carnival-of-chaos")(),
  });
  const darkElfCorsairsData = useJsonData({
    fileId: "dark-elf-corsairs",
    staticImport: () => getStaticImport("dark-elf-corsairs")(),
  });
  const hiredSwords = useJsonData({
    fileId: "hired-swords",
    staticImport: () => getStaticImport("hired-swords")(),
  });
  const legendsData = useJsonData({
    fileId: "lendas",
    staticImport: () => getStaticImport("lendas")(),
  });

  // Equipamentos
  const meleeDb = useJsonData({
    fileId: "armas-corpo-a-corpo",
    staticImport: () => getStaticImport("armas-corpo-a-corpo")(),
  });
  const rangedDb = useJsonData({
    fileId: "armas-a-distancia",
    staticImport: () => getStaticImport("armas-a-distancia")(),
  });
  const firearmsDb = useJsonData({
    fileId: "armas-de-fogo",
    staticImport: () => getStaticImport("armas-de-fogo")(),
  });
  const armorDb = useJsonData({
    fileId: "armaduras-e-escudos",
    staticImport: () => getStaticImport("armaduras-e-escudos")(),
  });
  const accessoriesDb = useJsonData({
    fileId: "acessorios",
    staticImport: () => getStaticImport("acessorios")(),
  });
  const remediesPoisonsDb = useJsonData({
    fileId: "remedios-e-venenos",
    staticImport: () => getStaticImport("remedios-e-venenos")(),
  });

  // Modificadores
  const meleeMods = useJsonData({
    fileId: "modificadores-de-arma",
    staticImport: () => getStaticImport("modificadores-de-arma")(),
  });
  const rangedMods = useJsonData({
    fileId: "modificadores-de-arma-a-distancia",
    staticImport: () => getStaticImport("modificadores-de-arma-a-distancia")(),
  });
  const firearmsMods = useJsonData({
    fileId: "modificadores-de-armas-de-fogo",
    staticImport: () => getStaticImport("modificadores-de-armas-de-fogo")(),
  });

  const allData = {
    factions: {
      sisters: sistersData.data,
      skaven: skavenData.data,
      beastmen: beastmenData.data,
      dwarfs: dwarfTreasureHuntersData.data,
      cult: cultPossessedData.data,
      vampires: vampireCourtsData.data,
      witchHunters: witchHuntersData.data,
      lizardmen: lizardmenData.data,
      orcs: orcMobData.data,
      goblins: goblinsData.data,
      hashut: sonsOfHashutData.data,
      mercenaries: mercenariesData.data,
      carnival: carnivalChaosData.data,
      darkElves: darkElfCorsairsData.data,
      hiredSwords: hiredSwords.data,
      legends: legendsData.data,
    },
    equipment: {
      melee: meleeDb.data,
      ranged: rangedDb.data,
      firearms: firearmsDb.data,
      armor: armorDb.data,
      accessories: accessoriesDb.data,
      remediesPoisons: remediesPoisonsDb.data,
    },
    modifiers: {
      melee: meleeMods.data,
      ranged: rangedMods.data,
      firearms: firearmsMods.data,
    },
  };

  const loading =
    sistersData.loading ||
    skavenData.loading ||
    beastmenData.loading ||
    dwarfTreasureHuntersData.loading ||
    cultPossessedData.loading ||
    vampireCourtsData.loading ||
    witchHuntersData.loading ||
    lizardmenData.loading ||
    orcMobData.loading ||
    goblinsData.loading ||
    sonsOfHashutData.loading ||
    mercenariesData.loading ||
    carnivalChaosData.loading ||
    darkElfCorsairsData.loading ||
    hiredSwords.loading ||
    legendsData.loading ||
    meleeDb.loading ||
    rangedDb.loading ||
    firearmsDb.loading ||
    armorDb.loading ||
    accessoriesDb.loading ||
    remediesPoisonsDb.loading ||
    meleeMods.loading ||
    rangedMods.loading ||
    firearmsMods.loading;

  return {
    data: allData,
    loading,
    dataSources: {
      meleeDb: meleeDb.data || [],
      rangedDb: rangedDb.data || [],
      firearmsDb: firearmsDb.data || [],
      armorDb: armorDb.data || [],
      accessoriesDb: accessoriesDb.data || [],
      remediesPoisonsDb: remediesPoisonsDb.data || [],
      meleeMods: meleeMods.data || [],
      rangedMods: rangedMods.data || [],
      firearmsMods: firearmsMods.data || [],
    },
  };
}

