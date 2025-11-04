/*
  Adiciona equipmentSlots nos JSONs das facções em src/pages/warbands/**/ data; /*.json

  Regras:
  - Padrão: 5
  - Criaturas grandes: 6 (nomes contendo: troll, ogro, minotauro, hydra/hidra, abominação)
  - Facções: skaven, dwarf, goblins → 4
  - Geckos (nome contém gecko) → 4
  - Animais, daemônios e mortos-vivos → 0
    (nome/role contém: animal, cão, lobo, cavalo; zumbi, esqueleto, múmia, carniçal; daemon/demon/daemônio)

  Uso:
  node helper-scripts/add-equipment-slots.cjs
*/

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const WARBANDS_DIR = path.join(ROOT, "src", "pages", "warbands");

function walkDir(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(full, out);
    else out.push(full);
  }
  return out;
}

function isWarbandDataJson(p) {
  if (!p.endsWith(".json")) return false;
  // somente warbands e data
  return (
    p.includes(path.join("warbands", path.sep)) &&
    p.includes(`${path.sep}data${path.sep}`)
  );
}

function decideSlots(unit, factionSlug) {
  const name = String(unit.name || "").toLowerCase();
  const role = String(unit.role || "").toLowerCase();
  const stats = unit.stats || {};
  const explicit =
    stats.equipmentSpaces ?? unit.equipmentSpaces ?? unit.equipmentSlots;
  if (typeof explicit === "number") return explicit;

  const looksAnimal =
    role.includes("animal") || /\b(cão|cao|lobo|cavalo)\b/.test(name);
  const looksDaemon = /(daemon|dem[oô]nio|daem[oô]nio)/.test(name);
  const looksUndead = /(zumbi|esqueleto|m[uú]mia|mumia|carni[cç]al)/.test(name);
  if (looksAnimal || looksDaemon || looksUndead) return 0;

  if (/gecko/.test(name)) return 4;

  if (
    /(skaven)/.test(factionSlug) ||
    /(dwarf)/.test(factionSlug) ||
    /(goblin)/.test(factionSlug)
  )
    return 4;

  const looksLarge =
    /(troll|ogro|minotauro|hydra|hidra|abomina[cç][aã]o|abominacao)/.test(name);
  if (looksLarge) return 6;

  return 5;
}

function readJson(file) {
  try {
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("Falha lendo JSON:", file, e.message);
    return null;
  }
}

function writeJson(file, data) {
  const content = JSON.stringify(data, null, 2) + "\n";
  fs.writeFileSync(file, content, "utf8");
}

function main() {
  const files = walkDir(WARBANDS_DIR).filter(isWarbandDataJson);
  let touched = 0;
  for (const file of files) {
    const factionSlug = file
      .split(path.sep)
      .slice(file.split(path.sep).indexOf("warbands") + 1)[0];
    const data = readJson(file);
    if (!data) continue;
    if (!Array.isArray(data)) continue; // alguns data podem não ser arrays; ignorar
    let changed = false;
    for (const unit of data) {
      const slots = decideSlots(unit, factionSlug);
      if (!unit.stats) unit.stats = {};
      if (unit.stats.equipmentSpaces !== slots) {
        unit.stats.equipmentSpaces = slots;
        changed = true;
      }
    }
    if (changed) {
      writeJson(file, data);

      touched++;
    }
  }
}

main();
