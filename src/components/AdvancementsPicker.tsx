import React, { useMemo, useState } from "react";

export type AdvancementOption = string;

interface AdvancementsPickerProps {
  options?: AdvancementOption[];
  selected?: AdvancementOption[];
  onAdd: (advancement: AdvancementOption) => void;
}

const DEFAULT_OPTIONS: AdvancementOption[] = [
  "Nova Habilidade",
  "Nova Magia",
  "+1 Ímpeto",
  "+1 Precisão",
  "+1 Armadura",
  "+2 Vigor",
  "+2 Movimento",
  "+1 Vontade",
  "+1 Força",
  "O Moleque Tem Talento!",
];

function AdvancementsPicker({
  options,
  selected,
  onAdd,
}: AdvancementsPickerProps) {
  const [choice, setChoice] = useState<string>("");

  const opts = useMemo(() => {
    // Permite escolher o mesmo avanço várias vezes; não filtra pelo selecionado
    return (options && options.length ? options : DEFAULT_OPTIONS).slice();
  }, [options]);

  return (
    <div className="mt-4 bg-[#2a2a2a] p-4 rounded">
      <h5 className="font-bold mb-2" style={{ color: "#8fbc8f" }}>
        AVANÇOS
      </h5>
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <select
          className="bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white"
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
        >
          <option value="">Escolher avanço…</option>
          {opts.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <button
          className="px-3 py-1 rounded bg-green-700 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!choice}
          onClick={() => {
            if (!choice) return;
            onAdd(choice);
            setChoice("");
          }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

export default AdvancementsPicker;
