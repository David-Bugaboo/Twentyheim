import React from "react";
import { Sidebar } from "./Sidebar";
import { AvailableFiguresSection } from "./AvailableFiguresSection";
import type { FigureSummary } from "../types";

type AvailableFiguresSidebarProps = {
  open: boolean;
  onClose: () => void;
  baseFigureGroups: Array<{
    title: string;
    items: FigureSummary[];
  }>;
  expandedAvailableFigures: Record<string, boolean>;
  onToggleFigure: (figureId: string) => void;
  onAddFigure: (figureSlug: string, figureName: string) => void;
  onOpenEquipmentDialog: (figureName: string, items: unknown[]) => void;
  addingFigureSlug: string | null;
  warbandId: string | null;
  hasLeader: boolean;
  warbandCrowns: number | null;
  figureCountsBySlug: Map<string, number>;
  onOpenSkillsDialog?: (figureName: string, slug: string) => void;
  onOpenSpellsDialog?: (figureName: string, slug: string) => void;
  onOpenStartingSkill?: (figureName: string, slug: string) => void;
  onOpenStartingSpell?: (figureName: string, slug: string) => void;
  onOpenStartingEquipment?: (figureName: string, slug: string) => void;
  onOpenMutationsDialog?: (figureName: string) => void;
  onOpenBlessingsDialog?: (figureName: string) => void;
};

export const AvailableFiguresSidebar: React.FC<
  AvailableFiguresSidebarProps
> = ({
  open,
  onClose,
  baseFigureGroups,
  expandedAvailableFigures,
  onToggleFigure,
  onAddFigure,
  onOpenEquipmentDialog,
  addingFigureSlug,
  warbandId,
  hasLeader,
  warbandCrowns,
  figureCountsBySlug,
  onOpenSkillsDialog,
  onOpenSpellsDialog,
  onOpenStartingSkill,
  onOpenStartingSpell,
  onOpenStartingEquipment,
  onOpenMutationsDialog,
  onOpenBlessingsDialog,
}) => {
  return (
    <Sidebar open={open} onClose={onClose} title="Figuras Disponíveis">
      <AvailableFiguresSection
        baseFigureGroups={baseFigureGroups}
        expandedAvailableFigures={expandedAvailableFigures}
        onToggleFigure={onToggleFigure}
        onAddFigure={onAddFigure}
        onOpenEquipmentDialog={onOpenEquipmentDialog}
        addingFigureSlug={addingFigureSlug}
        warbandId={warbandId}
        hasLeader={hasLeader}
        warbandCrowns={warbandCrowns}
        figureCountsBySlug={figureCountsBySlug}
        onOpenSkillsDialog={
          onOpenSkillsDialog
            ? (figureName: string, figureData: unknown) => {
                // Converter figureData para slug se necessário
                const slug =
                  typeof figureData === "string"
                    ? figureData
                    : ((figureData as { slug?: string })?.slug ?? "");
                if (slug) {
                  onOpenSkillsDialog(figureName, slug);
                }
              }
            : (undefined as
                | ((figureName: string, figureData: unknown) => void)
                | undefined)
        }
        onOpenSpellsDialog={
          onOpenSpellsDialog
            ? (figureName: string, figureData: unknown) => {
                // Converter figureData para slug se necessário
                const slug =
                  typeof figureData === "string"
                    ? figureData
                    : ((figureData as { slug?: string })?.slug ?? "");
                if (slug) {
                  onOpenSpellsDialog(figureName, slug);
                }
              }
            : (undefined as
                | ((figureName: string, figureData: unknown) => void)
                | undefined)
        }
        onOpenStartingSkill={onOpenStartingSkill}
        onOpenStartingSpell={onOpenStartingSpell}
        onOpenStartingEquipment={onOpenStartingEquipment}
        onOpenMutationsDialog={onOpenMutationsDialog}
        onOpenBlessingsDialog={onOpenBlessingsDialog}
      />
    </Sidebar>
  );
};
