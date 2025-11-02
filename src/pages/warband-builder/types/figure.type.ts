import type { Advancement } from "./advancements.type";
import type { Equipment } from "./equipment.type";
import type { Injury } from "./injuries.type";
import type { Mutation } from "./mutation.type";
import type { NurgleBlessing } from "./nurgle-blessing.type";
import type { SacredMark } from "./sacred-marks.type";
import type { Skill } from "./skills.type";
import type { Spell } from "./spell.type";

// Importações de catálogos de skills e spells para busca por nome
import combateData from "../../skills/data/combate.skills.json";
import atiradorData from "../../skills/data/atirador.skills.json";
import academicaData from "../../skills/data/academica.skills.json";
import forcaData from "../../skills/data/forca.skills.json";
import velocidadeData from "../../skills/data/velocidade.skills.json";
import irmasDeSigmarData from "../../skills/data/irmas-de-sigmar.skills.json";
import skavenDoClaEnshinData from "../../skills/data/skaven-do-cla-enshin.skills.json";
import saqueadoresHomemFeraData from "../../skills/data/saqueadores-homem-fera.skills.json";
import cacadoresDeTesouroAnoesData from "../../skills/data/cacadores-de-tesouro-anoes.skills.json";
import mataTrollsAnaoData from "../../skills/data/mata-trolls-anao.skills.json";
import habilidadesVonCarsteinData from "../../skills/data/habilidades-von-carstein.skills.json";
import habilidadesDeDragaoCarmesimData from "../../skills/data/habilidades-de-dragao-carmesim.skills.json";
import habilidadesDeLahmiaData from "../../skills/data/habilidades-de-lahmia.skills.json";
import habilidadesDeStrigoiData from "../../skills/data/habilidades-de-strigoi.skills.json";
import corsariosDruchiiData from "../../skills/data/corsarios-druchii.skills.json";
import habilidadesDeGeckosData from "../../skills/data/habilidades-de-geckos.skills.json";
import habilidadesDeSaurioData from "../../skills/data/habilidades-de-saurio.skills.json";
import hordasOrcData from "../../skills/data/hordas-orc.skills.json";
import filhosDeHashutData from "../../skills/data/filhos-de-hashut.skills.json";
import habilidadesDosNecrarcasData from "../../skills/data/habilidades-dos-necrarcas.skills.json";
import patrulheiroElficoData from "../../skills/data/patrulheiro-elfico.skills.json";

import loreHornedRat from "../../spells/data/lore-of-horned-rat.json";
import loreNecromancy from "../../spells/data/lore-of-necromancy.json";
import druchiiMagic from "../../spells/data/druchii-magic.json";
import magicOldOnes from "../../spells/data/magic-of-the-old-ones.json";
import magicGoblins from "../../spells/data/magic-of-the-goblins.json";
import magicWaaaaagh from "../../spells/data/magic-of-the-waaaaagh.json";
import prayersSigmar from "../../spells/data/prayers-of-sigmar.json";
import prayersUlric from "../../spells/data/prayers-of-ulric.json";
import ritualsChaos from "../../spells/data/rituals-of-chaos.json";
import ritualsHashut from "../../spells/data/rituals-of-hashut.json";
import lesserMagic from "../../spells/data/lesser-magic.json";
import ritualsNurgle from "../../spells/data/rituals-of-nurgle.json";
import darkGodInvocations from "../../spells/data/dark-god-invocations.json";

// Agrega todos os catálogos de skills
const allSkillsCatalogs = [
  combateData,
  atiradorData,
  academicaData,
  forcaData,
  velocidadeData,
  irmasDeSigmarData,
  skavenDoClaEnshinData,
  saqueadoresHomemFeraData,
  cacadoresDeTesouroAnoesData,
  mataTrollsAnaoData,
  habilidadesVonCarsteinData,
  habilidadesDeDragaoCarmesimData,
  habilidadesDeLahmiaData,
  habilidadesDeStrigoiData,
  corsariosDruchiiData,
  habilidadesDeGeckosData,
  habilidadesDeSaurioData,
  hordasOrcData,
  filhosDeHashutData,
  habilidadesDosNecrarcasData,
  patrulheiroElficoData,
].flat() as any[];

// Agrega todos os catálogos de spells
const allSpellsCatalogs = [
  loreHornedRat,
  loreNecromancy,
  druchiiMagic,
  magicOldOnes,
  magicGoblins,
  magicWaaaaagh,
  prayersSigmar,
  prayersUlric,
  ritualsChaos,
  ritualsHashut,
  lesserMagic,
  ritualsNurgle,
  darkGodInvocations,
].flat() as any[];

// Função helper para buscar skill por nome
function resolveSkillByName(skillName: string): Skill | null {
  const normalized = skillName.trim().toLowerCase();
  const found = allSkillsCatalogs.find((s: any) => {
    const name = String(s?.name || "")
      .trim()
      .toLowerCase();
    return name === normalized;
  });
  if (found) {
    return {
      id: found.id || crypto.randomUUID(),
      name: found.name,
      description: found.description || "",
      type: found.type || "",
    } as Skill;
  }
  return null;
}

// Função helper para buscar spell por nome (busca em todos os catálogos)
function resolveSpellByName(spellName: string): Spell | null {
  // Remove prefixos como "Água " e normaliza
  const cleanName = spellName.replace(/^Água\s+/i, "").trim();
  const normalized = cleanName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Primeiro tenta busca exata
  let found = allSpellsCatalogs.find((s: any) => {
    const name = String(s?.name || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return name === normalized;
  });

  // Se não encontrar, tenta busca parcial (remove prefixos)
  if (!found) {
    found = allSpellsCatalogs.find((s: any) => {
      const name = String(s?.name || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return (
        name === normalized ||
        name.includes(normalized) ||
        normalized.includes(name)
      );
    });
  }
  if (found) {
    // Normaliza keywords
    const normalizeKeywords = (kw: any): string[] => {
      if (!Array.isArray(kw)) return [];
      const flat: string[] = [];
      for (const entry of kw) {
        if (Array.isArray(entry)) {
          for (const inner of entry)
            if (typeof inner === "string") flat.push(inner);
        } else if (typeof entry === "string") {
          flat.push(entry);
        }
      }
      return flat;
    };
    return {
      id: found.id || crypto.randomUUID(),
      name: found.name,
      castingNumber: Number(found.castingNumber ?? found.cd ?? 0),
      keywords: normalizeKeywords(found.keywords || []),
      effect: found.effect || found.description || "",
    } as Spell;
  }
  return null;
}

export interface Figure {
  id: string;
  narrativeName: string;
  name: string;
  role: "Herói" | "Líder" | "Soldado" | "Mercenário" | "Lenda";
  qualidade: number;
  noXP: boolean;
  inactive: boolean;
  xp: number;
  baseStats: {
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    Vontade: number;
    strength: number;
    health: number;
    cost: string;
    upkeep?: string;
  };
  injuryStatsModifiers: {
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    Vontade: number;
    strength: number;
    health: number;
  };
  advancementsStatsModifiers: {
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    Vontade: number;
    strength: number;
    health: number;
  };
  miscStatsModifiers: {
    move: number;
    fight: number;
    shoot: number;
    armour: number;
    Vontade: number;
    strength: number;
    health: number;
  };
  specialRules: Array<{
    name: string;
    description: string;
  }>;
  avaiableEquipment: string[];
  originalAvaiableEquipment?: string[]; // Lista original preservada para restaurar quando skills são removidas
  equipmentSlots: number;
  avaiableSkills: string[];
  magicTraditions: string[];
  avaiableSpells: string[];
  skills: Skill[];
  spells: Spell[];
  mutations: Mutation[];
  nurgleBlessings: NurgleBlessing[];
  sacredMarks: SacredMark[];
  advancements: Advancement[];
  injuries: Injury[];
  equiped: Equipment[];
}

// Constrói uma Figure a partir de um JSON base (datasheet) da unidade
export function buildFigureFromBase(base: any): Figure {
  const stats = base?.stats || {};
  // SEMPRE gera um UUID único - NUNCA usa base.id que é compartilhado entre unidades do mesmo tipo
  const id: string = crypto?.randomUUID?.() || String(Date.now());
  const name: string = base?.name || "Figura";
  const role = (base?.role || undefined) as Figure["role"] | undefined;
  // Lendas não têm narrative name (já são lendas); outras figuras começam com vazio
  const narrativeName: string =
    role === "Lenda"
      ? "" // Lendas não têm narrative name
      : base?.narrativeName || ""; // Outras figuras começam com narrative name vazio
  const qualidade: number = base.qualidade || 0;
  const noXP: boolean = base.noXP ?? base.NoXP ?? false;

  // XP inicial: 0 ou stats.startingXp
  const xp: number =
    Number(typeof stats.startingXp === "number" ? stats.startingXp : 0) || 0;

  // Base stats com coercions suaves e fallbacks comuns do projeto
  const toNum = (v: any, d = 0): number => {
    if (typeof v === "number") return v;
    if (typeof v === "string") {
      const m = v.match(/([+-]?\d+)/);
      return m ? parseInt(m[1], 10) : d;
    }
    return d;
  };

  const baseStats = {
    move: toNum(stats.move, 10),
    fight: toNum(stats.fight, 0),
    shoot: toNum(stats.shoot, 0),
    armour: toNum(stats.armour, 10),
    Vontade: toNum(stats.Vontade, 0),
    strength: toNum(stats.strength ?? stats.força ?? stats.For, 0),
    health: toNum(stats.health, 10),
    cost: String(stats.cost ?? "-"),
    upkeep: stats.upkeep ? String(stats.upkeep) : undefined,
  };

  // Modificadores começam zerados
  const zeroMods = {
    move: 0,
    fight: 0,
    shoot: 0,
    armour: 0,
    Vontade: 0,
    strength: 0,
    health: 0,
  };

  // Special rules: copia das abilities, se houver
  const specialRules: { name: string; description: string }[] = Array.isArray(
    base?.abilities
  )
    ? (base.abilities as any[])
        .filter(Boolean)
        .map((a) => ({ name: a?.name, description: a?.description }))
        .filter((x) => x.name)
    : [];

  // Equipamentos disponíveis: flatten dos grupos, somente nomes (sem custo)
  const equipmentGroups = base?.equipment || {};
  const avaiableEquipment: string[] = Object.keys(equipmentGroups).flatMap(
    (key) => {
      const arr = equipmentGroups[key];
      if (!Array.isArray(arr)) return [];
      return arr
        .filter(Boolean)
        .map((e: any) => e?.name)
        .filter((n: any) => typeof n === "string");
    }
  );

  // Espaços de equipamento (slots)
  const equipmentSlots: number = toNum(
    stats.equipmentSlots ?? stats.equipmentSpaces ?? base?.slots,
    5
  );

  // Habilidades disponíveis (categorias)
  const avaiableSkills: string[] = Array.isArray(stats?.skills)
    ? [...(stats.skills as any[]).filter((s) => typeof s === "string")]
    : Array.isArray(base?.skills)
    ? [...(base.skills as any[]).filter((s) => typeof s === "string")]
    : [];

  // Tradições mágicas
  const magicTraditions: string[] = (() => {
    const direct = Array.isArray(base?.magicTraditions)
      ? (base.magicTraditions as any[]).filter((t) => typeof t === "string")
      : [];
    const affinity = base?.spellAffinity?.aligned0;
    const fromAffinity = Array.isArray(affinity)
      ? (affinity as any[]).filter((t) => typeof t === "string")
      : [];
    return [...new Set([...(direct || []), ...(fromAffinity || [])])];
  })();

  // Escolas de magia disponíveis (somente as de aligned0 que são tradições, não magias individuais)
  // Para lendas, isso será filtrado depois para remover magias individuais
  const avaiableSpells: string[] = Array.isArray(base?.spellAffinity?.aligned0)
    ? (base.spellAffinity.aligned0 as any[]).filter(
        (t) => typeof t === "string"
      )
    : [];

  // Para Lendas: resolve legendSkills e legendSpells
  const resolvedSkills: Skill[] = [];
  const resolvedSpells: Spell[] = [];

  if (role === "Lenda") {
    // Busca legendSkills em stats
    const legendSkills = Array.isArray(stats?.legendSkills)
      ? stats.legendSkills
      : [];

    // Busca legendSpells em stats.legendSpells ou stats.legendsSpells (ambas as variações)
    let legendSpells: string[] = [];

    // Tenta primeiro legendSpells (sem 's')
    if (Array.isArray(stats?.legendSpells)) {
      legendSpells = stats.legendSpells;
    }
    // Tenta legendsSpells (com 's') - variação encontrada no JSON
    else if (Array.isArray(stats?.legendsSpells)) {
      legendSpells = stats.legendsSpells;
    }

    // Resolve skills
    for (const skillName of legendSkills) {
      if (typeof skillName === "string") {
        const skill = resolveSkillByName(skillName);
        if (skill) {
          resolvedSkills.push(skill);
        }
      }
    }

    // Resolve spells
    for (const spellName of legendSpells) {
      if (typeof spellName === "string") {
        const spell = resolveSpellByName(spellName);
        if (spell) {
          resolvedSpells.push(spell);
        } else {
          // Debug: log se não encontrar a magia
          // eslint-disable-next-line no-console
          console.warn(
            `[buildFigureFromBase] Spell não encontrada: "${spellName}"`
          );
        }
      }
    }

    // Debug: log das magias resolvidas
    if (resolvedSpells.length > 0) {
      // eslint-disable-next-line no-console
      console.log(
        `[buildFigureFromBase] Lenda "${name}": ${resolvedSpells.length} magias resolvidas:`,
        resolvedSpells.map((s) => s.name)
      );
    }
  }

  const figure: Figure = {
    id,
    narrativeName,
    qualidade,
    noXP,
    inactive: false,
    name,
    role: (role as any) ?? ("Soldado" as any),
    xp,
    baseStats,
    injuryStatsModifiers: { ...zeroMods },
    advancementsStatsModifiers: { ...zeroMods },
    miscStatsModifiers: { ...zeroMods },
    specialRules: [],
    avaiableEquipment,
    originalAvaiableEquipment: [...avaiableEquipment], // Preserva a lista original
    equipmentSlots,
    avaiableSkills,
    magicTraditions,
    // Para lendas: remove magias individuais de avaiableSpells (elas já estão em spells)
    avaiableSpells:
      role === "Lenda" && resolvedSpells.length > 0
        ? avaiableSpells.filter(
            (school) => !resolvedSpells.some((spell) => spell.name === school)
          )
        : avaiableSpells,
    skills: resolvedSkills, // Para lendas, já vem preenchido
    spells: resolvedSpells, // Para lendas, já vem preenchido
    mutations: [],
    nurgleBlessings: [],
    sacredMarks: [],
    advancements: [],
    injuries: [],
    equiped: [],
  } as Figure;

  // Atribui todas as special rules coletadas (pode ser vazio)
  (figure as any).specialRules = specialRules;

  return figure;
}
