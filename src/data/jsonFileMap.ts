/**
 * Mapeamento centralizado de fileIds para imports estáticos
 * Usado para facilitar a migração para useJsonData
 */

export const JSON_FILE_MAP = {
  // Warbands
  "wood-elves-of-athel-loren": () =>
    import("../pages/warbands/wood-elves-of-athel-loren/data/wood-eves-of-athel-loren.data.json"),
  skaven: () =>
    import("../pages/warbands/skaven/data/skaven.data.json"),
  "sisters-of-sigmar": () =>
    import("../pages/warbands/sisters-of-sigmar/data/sisters-of-sigmar.data.json"),
  "beastman-raiders": () =>
    import("../pages/warbands/beastman-raiders/beastmen-raiders.data.json"),
  "dwarf-treasure-hunters": () =>
    import("../pages/warbands/dwarf-treasure-hunters/data/dwarf-treasure-hunters.data.json"),
  "cult-of-the-possessed": () =>
    import("../pages/warbands/cult-of-the-possessed/data/cult-of-the-possessed-page.json"),
  "cult-mutations": () =>
    import("../pages/warbands/cult-of-the-possessed/data/mutations.data.json"),
  "vampire-courts": () =>
    import("../pages/warbands/vampire-courts/data/vampire-courts.data.json"),
  "witch-hunters": () =>
    import("../pages/warbands/witch-hunters/data/witch-hunters.data.json"),
  lizardmen: () =>
    import("../pages/warbands/lizardmen/data/lizardmen.data.json"),
  "lizardmen-sacred-marks": () =>
    import("../pages/warbands/lizardmen/data/sacred-marks.data.json"),
  "orc-mob": () =>
    import("../pages/warbands/orc-mob/data/orc-mob.data.json"),
  goblins: () =>
    import("../pages/warbands/goblins/data/goblins.data.json"),
  "sons-of-hashut": () =>
    import("../pages/warbands/sons-of-hashut/data/sons-of-hashut.data.json"),
  mercenaries: () =>
    import("../pages/warbands/mercenaries/data/mercenaries.data.json"),
  "carnival-of-chaos": () =>
    import("../pages/warbands/carnival-of-chaos/data/carnival-of-chaos.data.json"),
  "carnival-blessings": () =>
    import("../pages/warbands/carnival-of-chaos/data/blessings-of-nurgle.json"),
  "dark-elf-corsairs": () =>
    import("../pages/warbands/dark-elf-corsairs/data/dark-elf-corsairs.data.json"),

  // Equipment
  "armas-corpo-a-corpo": () =>
    import("../pages/weapons and equipments/data/armas-corpo-a-corpo-refactor.json"),
  "armas-a-distancia": () =>
    import("../pages/weapons and equipments/data/armas-a-distancia-refactor.json"),
  "armas-de-fogo": () =>
    import("../pages/weapons and equipments/data/armas-de-fogo-refactor.json"),
  "armaduras-e-escudos": () =>
    import("../pages/weapons and equipments/data/armaduras-e-escudos-refactor.json"),
  acessorios: () =>
    import("../pages/weapons and equipments/data/acessorios-refactor.json"),
  "remedios-e-venenos": () =>
    import("../pages/weapons and equipments/data/remedios-e-venenos.json"),
  "modificadores-de-arma": () =>
    import("../pages/weapons and equipments/data/modificadores-de-arma-refactor.json"),
  "modificadores-de-arma-a-distancia": () =>
    import("../pages/weapons and equipments/data/modificadores-de-arma-a-distancia-refactor.json"),
  "modificadores-de-armas-de-fogo": () =>
    import("../pages/weapons and equipments/data/modificadores-de-armas-de-fogo-refactor.json"),

  // Spells
  "lore-of-horned-rat": () =>
    import("../pages/spells/data/lore-of-horned-rat.json"),
  "lore-of-necromancy": () =>
    import("../pages/spells/data/lore-of-necromancy.json"),
  "druchii-magic": () =>
    import("../pages/spells/data/druchii-magic.json"),
  "magic-of-the-old-ones": () =>
    import("../pages/spells/data/magic-of-the-old-ones.json"),
  "magic-of-the-goblins": () =>
    import("../pages/spells/data/magic-of-the-goblins.json"),
  "magic-of-the-waaaaagh": () =>
    import("../pages/spells/data/magic-of-the-waaaaagh.json"),
  "prayers-of-sigmar": () =>
    import("../pages/spells/data/prayers-of-sigmar.json"),
  "prayers-of-ulric": () =>
    import("../pages/spells/data/prayers-of-ulric.json"),
  "rituals-of-chaos": () =>
    import("../pages/spells/data/rituals-of-chaos.json"),
  "rituals-of-hashut": () =>
    import("../pages/spells/data/rituals-of-hashut.json"),
  "lesser-magic": () =>
    import("../pages/spells/data/lesser-magic.json"),
  "rituals-of-nurgle": () =>
    import("../pages/spells/data/rituals-of-nurgle.json"),
  "dark-god-invocations": () =>
    import("../pages/spells/data/dark-god-invocations.json"),
  "gifts-of-tzeench": () =>
    import("../pages/spells/data/gifts-of-tzeench.json"),

  // Skills
  combate: () =>
    import("../pages/skills/data/combate.skills.json"),
  atirador: () =>
    import("../pages/skills/data/atirador.skills.json"),
  academica: () =>
    import("../pages/skills/data/academica.skills.json"),
  forca: () =>
    import("../pages/skills/data/forca.skills.json"),
  velocidade: () =>
    import("../pages/skills/data/velocidade.skills.json"),
  "irmas-de-sigmar": () =>
    import("../pages/skills/data/irmas-de-sigmar.skills.json"),
  "skaven-do-cla-enshin": () =>
    import("../pages/skills/data/skaven-do-cla-enshin.skills.json"),
  "saqueadores-homem-fera": () =>
    import("../pages/skills/data/saqueadores-homem-fera.skills.json"),
  "cacadores-de-tesouro-anoes": () =>
    import("../pages/skills/data/cacadores-de-tesouro-anoes.skills.json"),
  "mata-trolls-anao": () =>
    import("../pages/skills/data/mata-trolls-anao.skills.json"),
  "habilidades-von-carstein": () =>
    import("../pages/skills/data/habilidades-von-carstein.skills.json"),
  "habilidades-de-dragao-carmesim": () =>
    import("../pages/skills/data/habilidades-de-dragao-carmesim.skills.json"),
  "habilidades-dos-necrarcas": () =>
    import("../pages/skills/data/habilidades-dos-necrarcas.skills.json"),
  "habilidades-de-lahmia": () =>
    import("../pages/skills/data/habilidades-de-lahmia.skills.json"),
  "habilidades-de-strigoi": () =>
    import("../pages/skills/data/habilidades-de-strigoi.skills.json"),
  "corsarios-druchii": () =>
    import("../pages/skills/data/corsarios-druchii.skills.json"),
  "habilidades-de-geckos": () =>
    import("../pages/skills/data/habilidades-de-geckos.skills.json"),
  "habilidades-de-saurio": () =>
    import("../pages/skills/data/habilidades-de-saurio.skills.json"),
  "hordas-orc": () =>
    import("../pages/skills/data/hordas-orc.skills.json"),
  "filhos-de-hashut": () =>
    import("../pages/skills/data/filhos-de-hashut.skills.json"),
  "patrulheiro-elfo": () =>
    import("../pages/skills/data/patrulheiro-elfico.skills.json"),

  // Campaign
  "hired-swords": () =>
    import("../pages/campanha/data/hired-swords.data.json"),
  lendas: () =>
    import("../pages/campanha/data/lendas.data.json"),
  daemons: () =>
    import("../pages/campanha/data/daemons.data.json"),

  // Rules
  "game-terms": () =>
    import("../pages/rules/data/game-terms.json"),
  "happenings-datasheets": () =>
    import("../pages/rules/data/happenins-datasheets.data.json"),
} as const;

/**
 * Helper para obter o import estático pelo fileId
 */
export function getStaticImport(fileId: string) {
  const importer = (JSON_FILE_MAP as any)[fileId];
  if (!importer) {
    throw new Error(`FileId não encontrado no mapeamento: ${fileId}`);
  }
  return importer;
}

