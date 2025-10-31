import React, { useMemo, useState } from "react";

import blessingsOfNurgle from "../pages/warbands/carnival-of-chaos/data/blessings-of-nurgle.json";
import mutationsData from "../pages/warbands/cult-of-the-possessed/data/mutations.data.json";
import sacredMarksData from "../pages/warbands/lizardmen/data/sacred-marks.data.json";

type SpecialCategory = "nurgleBlessing" | "mutation" | "sacredMark";

export interface SpecialAbilityInstance {
  id: string;
  category: SpecialCategory;
  name: string;
  description?: string;
  cost?: string;
}

interface SpecialAbilitiesPickerProps {
  onAdd: (ability: SpecialAbilityInstance) => void;
}

const SpecialAbilitiesPicker: React.FC<SpecialAbilitiesPickerProps> = ({
  onAdd,
}) => {
  const [cat, setCat] = useState<SpecialCategory | "">("");
  const [sel, setSel] = useState<string>("");

  const options = useMemo(() => {
    const map = new Map<
      SpecialCategory,
      Array<{ key: string; label: string; desc?: string; cost?: string }>
    >();
    map.set(
      "nurgleBlessing",
      (blessingsOfNurgle as any[]).map((b) => ({
        key: String(b.name),
        label: String(b.name),
        desc: String(b.description || ""),
        cost: String(b.cost || ""),
      }))
    );
    map.set(
      "mutation",
      (mutationsData as any[]).map((m) => ({
        key: String(m.name),
        label: String(m.name),
        desc: String(m.description || ""),
        cost: String(m.cost || ""),
      }))
    );
    map.set(
      "sacredMark",
      (sacredMarksData as any[]).map((s) => ({
        key: String(s.name),
        label: String(s.name),
        desc: String(s.description || ""),
        cost: String(s.cost || ""),
      }))
    );
    return map;
  }, []);

  const handleAdd = () => {
    if (!cat || !sel) return;
    const list = options.get(cat) || [];
    const found = list.find((x) => x.key === sel);
    const instance: SpecialAbilityInstance = {
      id: crypto.randomUUID(),
      category: cat,
      name: sel,
      description: found?.desc,
      cost: found?.cost,
    };
    onAdd(instance);
    setSel("");
  };

  return (
    <div className="mb-6">
      <div className="bg-[#2a2a2a] p-4 rounded">
        <div className="flex flex-col md:flex-row gap-3">
          <select
            className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1"
            value={cat}
            onChange={(e) => {
              setCat(e.target.value as SpecialCategory | "");
              setSel("");
            }}
          >
            <option value="">Selecionar categoria…</option>
            <option value="nurgleBlessing">Bênçãos de Nurgle</option>
            <option value="mutation">Mutações</option>
            <option value="sacredMark">Marcas Sagradas</option>
          </select>
          <select
            className="bg-[#161616] border border-gray-600 rounded px-3 py-2 text-white flex-1"
            value={sel}
            onChange={(e) => setSel(e.target.value)}
            disabled={!cat}
          >
            <option value="">Selecionar habilidade…</option>
            {cat &&
              (options.get(cat) || []).map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
          </select>
          <button
            className="px-3 py-2 rounded bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!cat || !sel}
            onClick={handleAdd}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialAbilitiesPicker;
