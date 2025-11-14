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
  onOpenSkillsDialog?: (figureName: string, slug: string) => void;
  onOpenSpellsDialog?: (figureName: string, slug: string) => void;
  onOpenStartingSkill?: (figureName: string, slug: string) => void;
  onOpenStartingSpell?: (figureName: string, slug: string) => void;
  onOpenStartingEquipment?: (figureName: string, slug: string) => void;
};

export const AvailableFiguresSidebar: React.FC<AvailableFiguresSidebarProps> = ({
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
  onOpenSkillsDialog,
  onOpenSpellsDialog,
  onOpenStartingSkill,
  onOpenStartingSpell,
  onOpenStartingEquipment,
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
        onOpenSkillsDialog={onOpenSkillsDialog}
        onOpenSpellsDialog={onOpenSpellsDialog}
        onOpenStartingSkill={onOpenStartingSkill}
        onOpenStartingSpell={onOpenStartingSpell}
        onOpenStartingEquipment={onOpenStartingEquipment}
      />
    </Sidebar>
  );
};

