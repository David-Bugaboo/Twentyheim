import React, { useMemo, useState } from "react";
import { useJsonData } from "../hooks/useJsonData";
import { toast } from "react-toastify";

export interface BlessingOfNurgleInstance {
  id: string;
  category: "nurgleBlessing";
  name: string;
  description?: string;
  cost?: string;
  baseId?: string; // ID base do JSON (ex: "torrente-de-sujeira")
}

interface BlessingsOfNurglePickerProps {
  selected?: string[]; // IDs ou nomes já selecionados
  onAdd: (blessing: BlessingOfNurgleInstance) => void;
  availableCrowns?: number; // Coroas disponíveis no warband
  onSpendCrowns?: (amount: number) => boolean; // Função para debitar coroas, retorna true se sucesso
}

const BlessingsOfNurglePicker: React.FC<BlessingsOfNurglePickerProps> = ({
  selected = [],
  onAdd,
  availableCrowns = Infinity, // Por padrão, permite sem limite
  onSpendCrowns,
}) => {
  const [sel, setSel] = useState<string>("");

  // Carrega bênçãos de Nurgle do Firestore/IndexedDB (NUNCA local)
  const { data: blessingsOfNurgle } = useJsonData({
    fileId: "carnival-blessings",
  });

  const options = useMemo(() => {
    const selectedSet = new Set(selected);

    // Tenta diferentes estruturas de dados
    let blessingsArray: any[] = [];

    if (Array.isArray(blessingsOfNurgle)) {
      blessingsArray = blessingsOfNurgle;
    } else if (
      (blessingsOfNurgle as any)?.data &&
      Array.isArray((blessingsOfNurgle as any).data)
    ) {
      blessingsArray = (blessingsOfNurgle as any).data;
    } else if (
      (blessingsOfNurgle as any)?.content &&
      Array.isArray((blessingsOfNurgle as any).content)
    ) {
      blessingsArray = (blessingsOfNurgle as any).content;
    } else {
      return [];
    }

    // Filtra apenas os que não estão selecionados (usa ID diretamente)
    return blessingsArray.filter(b => {
      const blessingId = b.id || "";
      return blessingId && !selectedSet.has(blessingId);
    });
  }, [selected, blessingsOfNurgle]);

  // Helper para extrair número de coroas de uma string como "50 coroas"
  const extractCrowns = (costStr?: string): number => {
    if (!costStr) return 0;
    const match = String(costStr).match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const handleAdd = () => {
    if (!sel) return;
    // Encontra a bênção pelo ID (que é o value do select)
    const found = options.find(b => b.id === sel);
    if (found) {
      const cost = extractCrowns(found.cost);

      // Verifica se tem coroas suficientes
      if (cost > 0 && availableCrowns < cost) {
        toast.error(
          `Você não tem coroas suficientes! (Necessário: ${cost}, Disponível: ${availableCrowns})`
        );
        return;
      }

      // Debitar coroas se necessário
      if (cost > 0 && onSpendCrowns) {
        const success = onSpendCrowns(cost);
        if (!success) {
          toast.error(`Erro ao debitar coroas!`);
          return;
        }
        toast.success(
          `Bênção de Nurgle adicionada! ${cost} coroas descontadas.`
        );
      }

      const instance: BlessingOfNurgleInstance = {
        id: crypto.randomUUID(),
        category: "nurgleBlessing",
        name: found.name || "",
        description: found.description,
        cost: found.cost,
        baseId: found.id, // ID base vem diretamente do objeto
      };
      onAdd(instance);
      setSel("");
    }
  };

  return (
    <div className="mt-4 bg-[#2a2a2a] p-4 rounded">
      <h5 className="font-bold mb-2" style={{ color: "#8fbc8f" }}>
        BÊNÇÃOS DE NURGLE
      </h5>
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <select
          className="bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white flex-1"
          value={sel}
          onChange={e => setSel(e.target.value)}
        >
          <option value="">Escolher bênção de Nurgle…</option>
          {options.length > 0 ? (
            options.map(b => {
              const cost = extractCrowns(b.cost);
              const canAfford = cost === 0 || availableCrowns >= cost;
              const costText = b.cost ? ` - ${b.cost}` : "";
              return (
                <option
                  key={b.id}
                  value={b.id}
                  disabled={!canAfford}
                  style={{ color: canAfford ? "inherit" : "#888" }}
                >
                  {b.name}
                  {costText}
                </option>
              );
            })
          ) : (
            <option value="" disabled>
              Nenhuma bênção disponível
            </option>
          )}
        </select>
        <button
          className="px-3 py-1 rounded bg-green-700 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!sel}
          onClick={handleAdd}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default BlessingsOfNurglePicker;
