import React, { useMemo, useState } from "react";
// Importa todos os arquivos de magias previamente
import loreHornedRat from "../pages/spells/data/lore-of-horned-rat.json";
import loreNecromancy from "../pages/spells/data/lore-of-necromancy.json";
import druchiiMagic from "../pages/spells/data/druchii-magic.json";
import magicOldOnes from "../pages/spells/data/magic-of-the-old-ones.json";
import magicGoblins from "../pages/spells/data/magic-of-the-goblins.json";
import magicWaaaaagh from "../pages/spells/data/magic-of-the-waaaaagh.json";
import prayersSigmar from "../pages/spells/data/prayers-of-sigmar.json";
import prayersUlric from "../pages/spells/data/prayers-of-ulric.json";
import ritualsChaos from "../pages/spells/data/rituals-of-chaos.json";
import ritualsHashut from "../pages/spells/data/rituals-of-hashut.json";
import lesserMagic from "../pages/spells/data/lesser-magic.json";
import ritualsNurgle from "../pages/spells/data/rituals-of-nurgle.json";
import darkGodInvocations from "../pages/spells/data/dark-god-invocations.json";

// Objeto que mapeia nomes de tradições (como aparecem no spellAffinity) para os dados importados
const spellLoreMap: Record<string, any[]> = {
  "Rituais do Caos": ritualsChaos as any[],
  "Rituais de Nurgle": ritualsNurgle as any[],
  "Rituais de Hashut": ritualsHashut as any[],
  "Tradição do Rato Chifrudo": loreHornedRat as any[],
  "Tradição da Necromancia": loreNecromancy as any[],
  "Orações de Sigmar": prayersSigmar as any[],
  "Orações de Ulric": prayersUlric as any[],
  "Magia da WAAAAAAAGH!": magicWaaaaagh as any[],
  "Magia dos Goblins": magicGoblins as any[],
  "Magia Druchii": druchiiMagic as any[],
  "Magia dos Antigos": magicOldOnes as any[],
  "Magia Inferior": lesserMagic as any[],
  "Magias dos Deuses do Caos": darkGodInvocations as any[],
};

type SpellData = {
  name: string;
  castingNumber: number;
  keywords: string[];
  effect: string;
};

type SpellPickerProps = {
  aligned0?: string[]; // tradições primárias (CD +0)
  aligned2?: string[]; // tradições secundárias (CD +4)
  selectedSpells: SpellData[]; // magias já escolhidas para a figura
  onAdd: (spell: SpellData) => void;
};

const SpellPicker: React.FC<SpellPickerProps> = ({

  selectedSpells,
  onAdd,
}) => {
  const [tradition, setTradition] = useState<string>("");
  const [spell, setSpell] = useState<string>("");

  // Todas as tradições disponíveis (dropdown completo; alinhamentos ficam ilustrativos)
  const allowedTraditions = useMemo(() => {
    return Object.keys(spellLoreMap);
  }, []);

  const traditions = useMemo(() => {
    const list: Array<{ key: string; label: string; spells: SpellData[] }> = [];

    // Itera pelas tradições permitidas
    for (const traditionName of allowedTraditions) {
      // Busca os dados dessa tradição no mapa
      const traditionData = spellLoreMap[traditionName];

      if (!traditionData) {
        continue; // se não encontrar, pula
      }

      // Extrai os objetos completos das magias
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

      const spellsList = (Array.isArray(traditionData) ? traditionData : [])
        .map((item: any) => ({
          name: item?.name,
          castingNumber: item?.castingNumber || 0,
          keywords: normalizeKeywords(item?.keywords),
          effect: item?.effect || "",
        }))
        .filter(
          (s: SpellData) => s.name && typeof s.name === "string"
        ) as SpellData[];

      if (spellsList.length > 0) {
        list.push({
          key: traditionName,
          label: traditionName,
          spells: spellsList,
        });
      }
    }

    // ordena por label
    list.sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
    return list;
  }, [allowedTraditions]);

  const spellsForTradition = useMemo(() => {
    const found = traditions.find((t) => t.key === tradition);
    if (!found) return [];
    const selectedNames = new Set((selectedSpells || []).map((s) => s.name));
    return found.spells
      .filter((s) => !selectedNames.has(s.name))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, [traditions, tradition, selectedSpells]);

  return (
    <div className="mt-4 bg-[#2a2a2a] p-4 rounded">
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <select
          className="bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white"
          value={tradition}
          onChange={(e) => {
            setTradition(e.target.value);
            setSpell("");
          }}
        >
          <option value="">Escolher tradição…</option>
          {traditions.map((t) => (
            <option key={t.key} value={t.key}>
              {t.label}
            </option>
          ))}
        </select>

        <select
          className="bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white"
          value={spell}
          onChange={(e) => setSpell(e.target.value)}
          disabled={!tradition}
        >
          <option value="">Escolher magia…</option>
          {spellsForTradition.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name} (CD {s.castingNumber})
            </option>
          ))}
        </select>

        <button
          className="px-3 py-1 rounded bg-green-700 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!tradition || !spell}
          onClick={() => {
            if (!spell) return;
            const found = traditions.find((t) => t.key === tradition);
            if (found) {
              const spellData = found.spells.find((s) => s.name === spell);
              if (spellData) {
                onAdd(spellData);
                setSpell("");
              }
            }
          }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default SpellPicker;
