import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    faction: string;
    initialCrowns: number;
  }, saveLocation?: "local" | "user") => Promise<void> | void;
  factions: { slug: string; label: string }[];
  allowLocationChoice?: boolean;
  hasUser?: boolean;
};

function CreateWarbandModal({ 
  open, 
  onClose, 
  onCreate, 
  factions,
  allowLocationChoice = false,
  hasUser = false,
}: Props) {
  const [name, setName] = useState("");
  const [faction, setFaction] = useState("");
  const [initialCrowns, setInitialCrowns] = useState<number>(500);
  const [saveLocation, setSaveLocation] = useState<"local" | "user">(
    hasUser ? "user" : "local"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setName("");
    setFaction("");
    setInitialCrowns(500);
    setSaveLocation(hasUser ? "user" : "local");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !faction.trim()) return;
    try {
      setLoading(true);
      setError(null);
      await onCreate(
        {
        name: name.trim(),
        faction: faction.trim(),
        initialCrowns: Number.isFinite(initialCrowns) ? initialCrowns : 0,
        },
        allowLocationChoice ? saveLocation : undefined
      );
      reset();
      onClose();
    } catch (e: any) {
      setError(e?.message || "Falha ao criar bando.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70">
      <div className="w-full max-w-lg rounded-lg border border-gray-700 bg-[#1f1f1f] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Criar Bando</h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => {
              onClose();
              reset();
            }}
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm text-gray-300">Nome do Bando</span>
            <input
              className="bg-[#121212] border border-gray-600 rounded px-3 py-2 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Circo do Caos"
              required
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-sm text-gray-300">Facção</span>
            <select
              className="bg-[#121212] border border-gray-600 rounded px-3 py-2 text-white"
              value={faction}
              onChange={(e) => setFaction(e.target.value)}
              required
            >
              <option value="">Selecionar facção…</option>
              {factions
                .slice()
                .sort((a, b) => a.label.localeCompare(b.label, "pt-BR"))
                .map((f) => (
                  <option key={f.slug} value={f.slug}>
                    {f.label}
                  </option>
                ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-gray-300">Coroas iniciais</span>
            <input
              type="number"
              className="bg-[#121212] border border-gray-600 rounded px-3 py-2 text-white"
              value={initialCrowns}
              onChange={(e) => setInitialCrowns(Number(e.target.value))}
              min={0}
            />
          </label>

          {allowLocationChoice && hasUser ? (
            <label className="flex flex-col gap-2 md:col-span-2">
              <span className="text-sm text-gray-300">Onde salvar?</span>
              <select
                className="bg-[#121212] border border-gray-600 rounded px-3 py-2 text-white"
                value={saveLocation}
                onChange={(e) => setSaveLocation(e.target.value as "local" | "user")}
              >
                <option value="local">📱 Local (navegador)</option>
                <option value="user">☁️ Nuvem (sincronizado)</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">
                {saveLocation === "local"
                  ? "Salvo apenas neste navegador. Não precisa de login."
                  : "Salvo na nuvem. Sincronizado entre dispositivos."}
              </p>
            </label>
          ) : null}

          {error ? (
            <div className="md:col-span-2 rounded border border-red-700 bg-red-950/50 p-2 text-sm text-red-300">
              {error}
            </div>
          ) : null}

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
              className="px-4 py-2 rounded border border-gray-600 text-gray-200 hover:bg-gray-700/40"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim() || !faction.trim()}
              className="px-4 py-2 rounded bg-green-700 hover:bg-green-600 text-white disabled:opacity-60"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateWarbandModal;
