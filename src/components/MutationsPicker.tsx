import React, { useMemo, useState } from "react";
import { useJsonData } from "../hooks/useJsonData";
import { toast } from "react-toastify";

export interface MutationInstance {
  id: string;
  category: "mutation";
  name: string;
  description?: string;
  cost?: string;
  baseId?: string; // ID base do JSON
}

interface MutationsPickerProps {
  selected?: string[]; // IDs já selecionados
  onAdd: (mutation: MutationInstance) => void;
  availableCrowns?: number; // Coroas disponíveis no warband
  onSpendCrowns?: (amount: number) => boolean; // Função para debitar coroas, retorna true se sucesso
}

const MutationsPicker: React.FC<MutationsPickerProps> = ({
  selected = [],
  onAdd,
  availableCrowns = Infinity, // Por padrão, permite sem limite
  onSpendCrowns,
}) => {
  const [sel, setSel] = useState<string>("");

  // Carrega mutações do Firestore (NUNCA local)
  const { data: mutationsData } = useJsonData({
    fileId: "cult-mutations",
  });

  const options = useMemo(() => {
    const selectedSet = new Set(selected);
    
    // Tenta diferentes estruturas de dados
    let mutationsArray: any[] = [];
    
    if (Array.isArray(mutationsData)) {
      mutationsArray = mutationsData;
    } else if ((mutationsData as any)?.data && Array.isArray((mutationsData as any).data)) {
      mutationsArray = (mutationsData as any).data;
    } else if ((mutationsData as any)?.content && Array.isArray((mutationsData as any).content)) {
      mutationsArray = (mutationsData as any).content;
    } else {
      return [];
    }
    
    // Filtra apenas os que não estão selecionados (usa ID diretamente)
    return mutationsArray.filter((m) => {
      const mutationId = m.id || "";
      return mutationId && !selectedSet.has(mutationId);
    });
  }, [selected, mutationsData]);

  // Helper para extrair número de coroas de uma string como "50 coroas"
  const extractCrowns = (costStr?: string): number => {
    if (!costStr) return 0;
    const match = String(costStr).match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const handleAdd = () => {
    if (!sel) return;
    // Encontra a mutação pelo ID (que é o value do select)
    const found = options.find((m) => m.id === sel);
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
        toast.success(`Mutação adicionada! ${cost} coroas descontadas.`);
      }

      const instance: MutationInstance = {
        id: crypto.randomUUID(),
        category: "mutation",
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
        MUTAÇÕES
      </h5>
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <select
          className="bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white flex-1"
          value={sel}
          onChange={(e) => setSel(e.target.value)}
        >
          <option value="">Escolher mutação…</option>
          {options.length > 0 ? (
            options.map((m) => {
              const cost = extractCrowns(m.cost);
              const canAfford = cost === 0 || availableCrowns >= cost;
              const costText = m.cost ? ` - ${m.cost}` : "";
              return (
                <option 
                  key={m.id} 
                  value={m.id}
                  disabled={!canAfford}
                  style={{ color: canAfford ? 'inherit' : '#888' }}
                >
                  {m.name}{costText}
                </option>
              );
            })
          ) : (
            <option value="" disabled>
              Nenhuma mutação disponível
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

export default MutationsPicker;
