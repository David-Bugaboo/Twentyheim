import {
  parseSpecialRules,
  formatEquipmentCost,
  formatEquipmentStat,
} from "../pages/tools/warband-detail/utils/helpers";
import type {
  EquipmentDetailQueryResponse,
  EquipmentQueryResponse,
} from "../services/queries.service";
import GameText from "./GameText";

interface EquipmentDetailCardProps {
  equipment: EquipmentDetailQueryResponse | EquipmentQueryResponse;
  loading?: boolean;
  error?: string | null;
  showAvailability?: boolean;
  showExclusions?: boolean;
}

export default function EquipmentDetailCard({
  equipment,
  loading = false,
  error = null,
  showAvailability = false,
  showExclusions = false,
}: EquipmentDetailCardProps) {
  if (loading) {
    return <div className="text-gray-300">Carregando...</div>;
  }

  if (error) {
    return <div className="text-red-300">{error}</div>;
  }

  if (!equipment) {
    return null;
  }

  const specialRules = parseSpecialRules(equipment.specialRules ?? []);

  // Helper para obter a raridade
  const getRarity = () => {
    const rarity =
      (equipment as EquipmentQueryResponse).rarity ??
      (equipment as EquipmentDetailQueryResponse).rarity;
    return rarity === 1 ? "Comum" : rarity;
  };

  return (
    <div className="space-y-3 rounded border border-green-800/40 bg-[#0c0f0d] p-4 text-sm text-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-green-200">
          {equipment.name}
        </h3>
        <span className="text-xs uppercase text-green-400">
          {equipment.category ?? "Sem categoria"}
        </span>
      </div>
      <div className="space-y-2 text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <span>Custo:</span>
          <span>{formatEquipmentCost(equipment.cost ?? "N/A")}</span>
        </div>
        {((equipment as EquipmentQueryResponse).rarity !== null &&
          (equipment as EquipmentQueryResponse).rarity !== undefined) ||
        ((equipment as EquipmentDetailQueryResponse).rarity !== null &&
          (equipment as EquipmentDetailQueryResponse).rarity !== undefined) ? (
          <div className="flex items-center gap-2">
            <span>Raridade:</span>
            <span className="text-yellow-400">{getRarity()}</span>
          </div>
        ) : null}
        {equipment.damageBonus !== null &&
          equipment.damageBonus !== undefined && (
            <div className="flex items-center gap-2">
              <span>Dano:</span>
              <span>{formatEquipmentStat(equipment.damageBonus)}</span>
            </div>
          )}
        {(equipment.armourBonus !== null &&
          equipment.armourBonus !== undefined &&
          equipment.armourBonus !== 0 &&
          String(equipment.armourBonus) !== "0") ||
        ((equipment as EquipmentDetailQueryResponse).armorBonus !== null &&
          (equipment as EquipmentDetailQueryResponse).armorBonus !==
            undefined &&
          (equipment as EquipmentDetailQueryResponse).armorBonus !== 0 &&
          String((equipment as EquipmentDetailQueryResponse).armorBonus) !==
            "0") ? (
          <div className="flex items-center gap-2">
            <span>Armadura:</span>
            <span>
              {formatEquipmentStat(
                equipment.armourBonus ??
                  (equipment as EquipmentDetailQueryResponse).armorBonus ??
                  0
              )}
            </span>
          </div>
        ) : null}
        {equipment.range !== null &&
          equipment.range !== undefined &&
          equipment.range !== 0 &&
          String(equipment.range) !== "0" && (
            <div className="flex items-center gap-2">
              <span>Alcance:</span>
              <span>{formatEquipmentStat(equipment.range)}</span>
            </div>
          )}
        {equipment.movementPenalty !== null &&
          equipment.movementPenalty !== undefined &&
          equipment.movementPenalty !== 0 &&
          String(equipment.movementPenalty) !== "0" && (
            <div className="flex items-center gap-2">
              <span>Penalidade de Movimento:</span>
              <span className="text-red-400">
                {formatEquipmentStat(equipment.movementPenalty)}
              </span>
            </div>
          )}
      </div>

      {equipment.description && (
        <div className="space-y-1 rounded border border-green-800/30 bg-[#111815] p-3 text-xs text-green-100">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
            Descrição
          </p>
          {Array.isArray(equipment.description) ? (
            equipment.description.map((line, index) => (
              <p key={`desc-${index}`}>{line}</p>
            ))
          ) : (
            <p>{equipment.description}</p>
          )}
        </div>
      )}

      {showAvailability &&
        (equipment as EquipmentQueryResponse).avaiability &&
        (equipment as EquipmentQueryResponse).avaiability!.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wide text-green-300">
              Disponibilidade
            </p>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-green-100">
              {(equipment as EquipmentQueryResponse).avaiability!.map(
                (entry, index) => (
                  <span
                    key={`av-${index}`}
                    className="rounded border border-green-700/50 bg-green-900/20 px-2 py-1"
                  >
                    {entry}
                  </span>
                )
              )}
            </div>
          </div>
        )}

      {showExclusions &&
        (equipment as EquipmentQueryResponse).exclusions &&
        (equipment as EquipmentQueryResponse).exclusions!.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wide text-red-300">
              Restrições
            </p>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-red-200">
              {(equipment as EquipmentQueryResponse).exclusions!.map(
                (entry, index) => (
                  <span
                    key={`ex-${index}`}
                    className="rounded border border-red-700/50 bg-red-900/20 px-2 py-1"
                  >
                    {entry}
                  </span>
                )
              )}
            </div>
          </div>
        )}

      {specialRules.length > 0 && (
        <div className="space-y-2 rounded border border-green-800/30 bg-[#101711] p-3 text-xs text-green-100">
          <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
            Palavras-Chave
          </p>
          {specialRules.map((entry, index) => (
            <div
              key={`rule-${index}`}
              className="rounded bg-green-900/20 px-3 py-2 text-[11px]"
            >
              <span className="block font-semibold text-green-200">
                {entry.label}
              </span>
              <span className="mt-1 block whitespace-pre-wrap text-green-100">
                <GameText>{entry.value}</GameText>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
