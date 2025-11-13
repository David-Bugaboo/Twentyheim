import React from "react";
import { CollapsibleSection } from "./CollapsibleSection";
import { SurvivalRollDialog } from "./SurvivalRollDialog";
import { DiceD20Icon } from "./DiceD20Icon";
import { useSurvivalRollManagement } from "../hooks/useSurvivalRollManagement";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import { getRoleType } from "../utils/helpers";

type SurvivalRollSectionProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  factionSlug: string | null;
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const SurvivalRollSection: React.FC<SurvivalRollSectionProps> = ({
  selectedSoldier,
  selectedBaseFigure,
  factionSlug,
  warbandId,
  onReload,
}) => {
  const {
    expanded,
    setExpanded,
    handleRoll,
    rollDialogOpen,
    rollResult,
    rolling,
    handleReroll,
    handleCloseDialog,
    handleKill,
    killing,
  } = useSurvivalRollManagement({
    selectedSoldier,
    warbandId,
    onReload,
  });

  // Só mostra para mercenários e soldados (não hérois, líderes ou lendas)
  const roleType = React.useMemo(() => {
    if (!selectedBaseFigure) {
      const effectiveRole = selectedSoldier?.effectiveRole;
      if (effectiveRole) {
        return getRoleType(String(effectiveRole));
      }
      return "soldier" as const;
    }
    return getRoleType(selectedBaseFigure.role);
  }, [selectedBaseFigure, selectedSoldier]);

  const isMercenary = React.useMemo(() => {
    if (!factionSlug) return false;
    const normalized = factionSlug.toLowerCase();
    return normalized.includes("mercenario") || normalized.includes("mercenary");
  }, [factionSlug]);

  const isMercenaryOrSoldier = React.useMemo(() => {
    return isMercenary || roleType === "soldier";
  }, [isMercenary, roleType]);

  if (!isMercenaryOrSoldier) {
    return null;
  }

  return (
    <>
      <CollapsibleSection
        title="Rolagem de Sobrevivência"
        expanded={expanded}
        onToggle={() => setExpanded(prev => !prev)}
      >
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleRoll}
            disabled={!selectedSoldier}
            className="inline-flex items-center justify-center gap-2 rounded border border-red-600/60 bg-red-900/20 px-4 py-2 text-sm font-semibold text-red-200 transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <DiceD20Icon size={20} className="text-red-200" />
            <span>Rolar Sobrevivência</span>
          </button>

          <p className="text-[11px] text-gray-400">
            Em um resultado de 1-6, o soldado morre e todos os seus equipamentos
            são perdidos. Em qualquer outra rolagem ele está bem e pode ser usado
            no próximo jogo.
          </p>
        </div>
      </CollapsibleSection>

      <SurvivalRollDialog
        open={rollDialogOpen}
        onClose={handleCloseDialog}
        rollResult={rollResult}
        onKill={handleKill}
        onReroll={handleReroll}
        killing={killing}
        rolling={rolling}
      />
    </>
  );
};

