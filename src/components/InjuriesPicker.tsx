import  { useMemo, useState } from "react";

export type InjuryOption = string;

interface InjuriesPickerProps {
  options?: InjuryOption[];
  selected?: InjuryOption[];
  onAdd: (injury: InjuryOption) => void;
}

const DEFAULT_OPTIONS: InjuryOption[] = [
  "Ferimento na Perna",
  "Ombro Deslocado",
  "Antebraço Esmagado",
  "Insanidade(Estupidez)",
  "Insanidade(Fúria)",
  "Perna Deslocada",
  "Fratura Exposta na Perna",
  "Costelas Quebradas",
  "Cego de Um Olho",
  "Ferimento Infectado",
  "Trauma",
  "Mão Esmigalhada",
  "Ferimento Profundo",
];

function InjuriesPicker({ options, selected, onAdd }: InjuriesPickerProps) {
  const [choice, setChoice] = useState<string>("");

  const opts = useMemo(() => {
    const src = options && options.length ? options : DEFAULT_OPTIONS;
    const chosen = new Set(selected || []);
    return src.filter((o) => !chosen.has(o));
  }, [options, selected]);

  return (
    <div className="mt-4 bg-[#2a2a2a] p-4 rounded">
      <h5 className="font-bold mb-2" style={{ color: "#8fbc8f" }}>
        FERIMENTOS
      </h5>
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <select
          className="bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white"
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
        >
          <option value="">Escolher ferimento…</option>
          {opts.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>

        <button
          className="px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
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

export default InjuriesPicker;
