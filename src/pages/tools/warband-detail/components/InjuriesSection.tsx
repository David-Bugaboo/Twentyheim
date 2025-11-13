import React from "react";
import type { InjuryToWarbandSoldier } from "../../../../types/injury-to-warband-soldier.entity";
import { CollapsibleSection } from "./CollapsibleSection";
import { InjuryRollDialog } from "./InjuryRollDialog";
import { DiceD20Icon } from "./DiceD20Icon";
import { useInjuriesManagement } from "../hooks/useInjuriesManagement";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";

type InjuriesSectionProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  relations: { injuries: InjuryToWarbandSoldier[] };
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const InjuriesSection: React.FC<InjuriesSectionProps> = ({
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
    handleKill,
    rollDialogOpen,
    rollResult,
    rolling,
    handleSelectOption,
    handleReroll,
    handleCloseDialog,
    isHeroLeaderOrLegend,
  } = useInjuriesManagement({
    selectedSoldier,
    selectedBaseFigure,
    relations,
    warbandId,
    onReload,
  });

  if (!isHeroLeaderOrLegend) {
    return null;
  }

  return (
    <>
      <CollapsibleSection
        title="Ferimentos"
        expanded={expanded}
        onToggle={() => setExpanded(prev => !prev)}
      >
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleRoll}
            disabled={loading || !selectedSoldier}
            className="inline-flex items-center justify-center gap-2 rounded border border-red-600/60 bg-red-900/20 px-4 py-2 text-sm font-semibold text-red-200 transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <DiceD20Icon size={20} className="text-red-200" />
            <span>Rolar Ferimento</span>
          </button>

          {loading ? (
            <p className="text-[11px] text-gray-400">
              Carregando ferimentos disponíveis...
            </p>
          ) : null}

          {error ? (
            <p className="text-[11px] text-red-300">{error}</p>
          ) : null}
        </div>

        {relations.injuries.length === 0 ? (
          <p className="mt-3 text-[11px] text-gray-500">
            Nenhum ferimento registrado.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {relations.injuries.map(injury => {
              const injuryName =
                injury.injury?.name ?? injury.injurySlug ?? "Ferimento";
              const injuryDescription = injury.injury?.description ?? null;
              const removing =
                actionState?.type === "remove" &&
                actionState.targetId === injury.id;

              return (
                <li
                  key={injury.id}
                  className="rounded border border-red-800/40 bg-[#101010] p-3"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold text-red-200">
                        {injuryName}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        Slug: {injury.injurySlug ?? "—"}
                      </div>
                      {injuryDescription ? (
                        <div className="mt-1 text-[11px] text-gray-400">
                          {injuryDescription}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleRemove(injury.id, injuryName)}
                        disabled={removing}
                        className="inline-flex items-center justify-center rounded border border-green-600/60 bg-green-900/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {removing ? "Curando..." : "Curar"}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CollapsibleSection>

      <InjuryRollDialog
        open={rollDialogOpen}
        onClose={handleCloseDialog}
        rollResult={rollResult}
        onSelectOption={handleSelectOption}
        onKill={handleKill}
        onReroll={handleReroll}
        selecting={actionState?.type === "add" || false}
        killing={actionState?.type === "kill" || false}
        rolling={rolling}
      />
    </>
  );
};

