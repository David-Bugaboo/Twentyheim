import React from "react";
import type { AdvancementToWarbandSoldier } from "../../../../types/advancement-to-warband-soldier.entity";
import { CollapsibleSection } from "./CollapsibleSection";
import { AdvancementRollDialog } from "./AdvancementRollDialog";
import { DiceD20Icon } from "./DiceD20Icon";
import { useAdvancementsManagement } from "../hooks/useAdvancementsManagement";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";

type AdvancementsSectionProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  relations: { advancements: AdvancementToWarbandSoldier[] };
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const AdvancementsSection: React.FC<AdvancementsSectionProps> = ({
  selectedSoldier,
  selectedBaseFigure,
  relations,
  warbandId,
  onReload,
}) => {
  const {
    expanded,
    setExpanded,
    loading,
    error,
    actionState,
    handleRoll,
    handleRemove,
    rollDialogOpen,
    rollResult,
    rolling,
    handleSelectOption,
    handleReroll,
    handleCloseDialog,
  } = useAdvancementsManagement({
    selectedSoldier,
    selectedBaseFigure,
    warbandId,
    onReload,
  });

  return (
    <>
      <CollapsibleSection
        title="Avanços"
        expanded={expanded}
        onToggle={() => setExpanded(prev => !prev)}
      >
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleRoll}
            disabled={loading || !selectedSoldier}
            className="inline-flex items-center justify-center gap-2 rounded border border-green-600/60 bg-green-900/20 px-4 py-2 text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <DiceD20Icon size={20} className="text-green-200" />
            <span>Rolar Avanço</span>
          </button>

          {loading ? (
            <p className="text-[11px] text-gray-400">
              Carregando avanços disponíveis...
            </p>
          ) : null}

          {error ? (
            <p className="text-[11px] text-red-300">{error}</p>
          ) : null}
        </div>

        {relations.advancements.length === 0 ? (
          <p className="mt-3 text-[11px] text-gray-500">
            Nenhum avanço registrado.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {relations.advancements.map(advancement => {
              const advancementName =
                advancement.advancement?.name ??
                advancement.advancementSlug ??
                "Avanço";
              const advancementDescription =
                advancement.advancement?.description ?? null;
              const removing =
                actionState?.type === "remove" &&
                actionState.targetId === advancement.id;

              return (
                <li
                  key={advancement.id}
                  className="rounded border border-green-800/40 bg-[#101010] p-3"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold text-green-200">
                        {advancementName}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        Slug: {advancement.advancementSlug ?? "—"}
                      </div>
                      {advancementDescription ? (
                        <div className="mt-1 text-[11px] text-gray-400">
                          {advancementDescription}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(advancement.id, advancementName)
                        }
                        disabled={removing}
                        className="inline-flex items-center justify-center rounded border border-red-600/60 bg-red-900/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-red-200 transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {removing ? "Removendo..." : "Remover"}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CollapsibleSection>

      <AdvancementRollDialog
        open={rollDialogOpen}
        onClose={handleCloseDialog}
        rollResult={rollResult}
        onSelectOption={handleSelectOption}
        onReroll={handleReroll}
        selecting={actionState?.type === "add" || false}
        rolling={rolling}
      />
    </>
  );
};
