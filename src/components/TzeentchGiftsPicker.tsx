import React, { useMemo, useState } from "react";

export interface TzeentchGiftInstance {
  id: string;
  category: "tzeentchGift";
  name: string;
  description?: string;
  baseId?: string; // ID base do JSON (ex: "corpo-de-obsidiana")
}

interface TzeentchGiftsPickerProps {
  selected?: string[]; // IDs já selecionados (baseId)
  onAdd: (gift: TzeentchGiftInstance) => void;
}

// Dados embutidos (estilo Injuries): id, name, description
export const TZEENTCH_GIFTS: Array<{
  id: string;
  name: string;
  description: string;
}> = [
  {
    id: "corpo-de-obsidiana",
    name: "Corpo de Obsidiana",
    description:
      "A carne da figura se transforma em obsidiana preta. Ela ganha +2 Armadura, mas seu Vigor é reduzido pela metade, arredondando para cima.",
  },
  {
    id: "alma-sombria",
    name: "Alma Sombria",
    description:
      "Esta figura tem sua alma substituída por um daemônio menor e ganha o traço Daemônio mas mantém quaisquer espaços de itens que possuía anteriormente.",
  },
  {
    id: "pele-de-pergaminho",
    name: "Pele de Pergaminho",
    description:
      "Esta figura sangra profusamente dos menores ferimentos. Ela só pode tomar uma ação por ativação sempre que estiver abaixo da Vida completo.",
  },
  {
    id: "definhar",
    name: "Definhar",
    description:
      "Esta figura teve a maior parte de sua carne deteriorada como se tivesse envelhecido em um minuto. A figura sofre um -2 Vida permanente.",
  },
  {
    id: "destino-ominoso",
    name: "Destino Ominoso",
    description:
      "Sempre que esta figura rolar na Tabela de Sobrevivência, ela deve rolar dois dados e pegar o resultado menor.",
  },
  {
    id: "aparencia-cadaverica",
    name: "Aparência Cadavérica",
    description:
      "Esta figura ganha a característica Morto-Vivo, mas mantém quaisquer espaços de itens que possui atualmente.",
  },
  {
    id: "carne-de-cera",
    name: "Carne de Cera",
    description:
      "A carne desta figura se transforma em cera de vela pútrida. Esta figura recebe um -1 Armadura permanente.",
  },
  {
    id: "ossos-de-obsidiana",
    name: "Ossos de Obsidiana",
    description:
      "O esqueleto da figura se transforma em obsidiana vítrea. A armadura base da armadura se torna 8.",
  },
  {
    id: "alergia",
    name: "Alergia",
    description:
      "Esta figura é alérgica ao sangue de outras figuras. Se ela causar dano a outra figura em combate, ela é envenenada.",
  },
  {
    id: "alma-destrancada",
    name: "Alma Destrancada",
    description:
      "Se esta figura rolar um '1' natural em qualquer rolagem durante o jogo, ela é possuída por um Daemônio e conta como uma figura descontrolada. Isto dura pelo resto do turno no qual o '1' foi rolado e todo o próximo turno. Depois disso, a insanidade passa, e a possessão termina e a figura retorna à sua aliança normal.",
  },
  {
    id: "pernas-inchadas",
    name: "Pernas Inchadas",
    description: "Esta figura sofre dano dobrado de quedas.",
  },
  {
    id: "visao-atormentada",
    name: "Visão Atormentada",
    description:
      "Esta figura sofre -1 em todas as Rolagens de Vontade para resistir ou superar magias.",
  },
  {
    id: "alma-volatil",
    name: "Alma Volátil",
    description:
      "Esta figura é permanentemente possuída por um Daemônio de Khorne ansioso pela matança. Se o jogador controlador rolar um '1' natural em uma Rolagem de Iniciativa, o daemônio ruge de raiva, e todas as figuras a até 5cm, incluindo o conjurador, imediatamente sofrem um ataque de tiro mágico +1.",
  },
  {
    id: "nervos-estilhacados",
    name: "Nervos Estilhaçados",
    description:
      "Se esta figura sofrer 5 ou mais pontos de dano de uma única fonte, ela sofre -1 Ímpeto e -1 Dano pelo resto do jogo. Esta penalidade só pode ser sofrida uma vez por jogo.",
  },
  {
    id: "arauto-de-nurgle",
    name: "Arauto de Nurgle",
    description:
      "Esta figura se transforma em meio-humano, meio-mosca. Ela sofre -1 Movimento, -1 Ímpeto, -1 Armadura e -2 Vida, mas se torna imune a dano de queda.",
  },
  {
    id: "dadiva-de-nurgle",
    name: "Dádiva de Nurgle",
    description:
      "Esta figura se torna extremamente gorda. Ela sofre -2 Movimento mas ganha +2 Vida.",
  },
  {
    id: "albino",
    name: "Albino",
    description:
      "A figura não tem pigmento na pele, então sua pele é completamente branca, e seus olhos são rosa. Esta figura tem uma linha de visão máxima de 30cm.",
  },
  {
    id: "orgaos-externos",
    name: "Órgãos Externos",
    description:
      "Os pulmões desta figura estão do lado de fora, aumentando a probabilidade de um golpe causar dano crítico. Se seu oponente rolar um '19' natural em combate corpo a corpo ou em um ataque de Tiro, trate isto como um '20', causando um acerto crítico.",
  },
  {
    id: "sangue-ralo",
    name: "Sangue Ralo",
    description:
      "Esta figura tem reações violentas ao veneno. Sempre que sofrer dano de um ataque envenenado, ela imediatamente sofre 3 pontos de dano adicionais.",
  },
  {
    id: "horror-sem-face",
    name: "Horror Sem Face",
    description:
      "O rosto desta figura é completamente liso e desprovido de características, ainda assim todos os seus sentidos permanecem intactos. Ela sofre -3 Vontade. Apenas figuras a até 3cm dela podem ativar durante as Fases de Herói ou Campeão.",
  },
];

const TzeentchGiftsPicker: React.FC<TzeentchGiftsPickerProps> = ({
  selected = [],
  onAdd,
}) => {
  const [sel, setSel] = useState<string>("");

  const options = useMemo(() => {
    const selectedSet = new Set(selected);
    return TZEENTCH_GIFTS.filter(g => g.id && !selectedSet.has(g.id));
  }, [selected]);

  const handleAdd = () => {
    if (!sel) return;
    const found = options.find(g => g.id === sel);
    if (!found) return;
    const instance: TzeentchGiftInstance = {
      id:
        (typeof crypto !== "undefined" && (crypto as any)?.randomUUID
          ? (crypto as any).randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`),
      category: "tzeentchGift",
      name: String(found.name || ""),
      description: String(found.description || ""),
      baseId: String(found.id || ""),
    };
    onAdd(instance);
    setSel("");
  };

  return (
    <div className="mt-4 bg-[#2a2a2a] p-4 rounded">
      <h5 className="font-bold mb-2" style={{ color: "#8fbc8f" }}>
        DÁDIVAS DE TZEENTCH
      </h5>
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <select
          className="bg-[#1a1a1a] border border-gray-600 rounded px-2 py-1 text-white flex-1"
          value={sel}
          onChange={e => setSel(e.target.value)}
        >
          <option value="">Escolher dádiva…</option>
          {options.length > 0 ? (
            options.map((g: any) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Nenhuma dádiva disponível
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

export default TzeentchGiftsPicker;
