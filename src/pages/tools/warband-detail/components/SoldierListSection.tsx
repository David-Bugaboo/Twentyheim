import React, { useState } from "react";
import {
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import UndoIcon from "@mui/icons-material/Undo";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import MobileText from "../../../../components/MobileText";
import { SectionCard } from "./CommonComponents";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { ExtraSkillListToWarbandSoldier } from "../../../../types/extra-skill-list-to-warband-soldier.entity";
import type { ExtraSpellLoreToWarbandSoldier } from "../../../../types/extra-spell-lore-to-warband-soldier.entity";
import { extractEquipment } from "../utils/equipment-helpers";
import { getSupernaturalAccess } from "../utils/supernatural-helpers";

type SupernaturalDialogCategory = "Mutação" | "Benção de Nurgle";

type SoldierListSectionProps = {
  soldierGroups: Array<{
    title: string;
    items: Array<{
      soldier: WarbandSoldier;
      baseFigure: BaseFigure | null;
      role: string | null;
      roleType: "leader" | "hero" | "legend" | "soldier";
    }>;
  }>;
  selectedSoldierId: string | null;
  onSelectSoldier: (soldierId: string) => void;
  onFireSoldier: (soldierId: string) => void;
  onKillSoldier: (soldierId: string) => void;
  onUndoSoldier: (soldierId: string) => void;
  onOpenEquipmentDialog: (figureName: string, items: unknown[]) => void;
  onOpenSkillsDialog: (
    figureName: string,
    figureData: unknown,
    extraLists?: ExtraSkillListToWarbandSoldier[] | null
  ) => void;
  onOpenSpellsDialog: (
    figureName: string,
    figureData: unknown,
    extraLores?: ExtraSpellLoreToWarbandSoldier[] | null
  ) => void;
  onPromoteHero: (soldierId: string) => void;
  onPromoteLeader: (soldierId: string) => void;
  canPromoteToHero: (roleType: ReturnType<typeof getRoleType>) => boolean;
  canPromoteToLeader: (roleType: ReturnType<typeof getRoleType>) => boolean;
  onOpenSupernaturalDialog: (options: {
    soldierId: string;
    category: SupernaturalDialogCategory;
    figureName: string;
  }) => void;
  soldierAction: {
    type: "fire" | "kill" | "undo";
    soldierId: string;
  } | null;
};

type SoldierCardProps = {
  soldier: WarbandSoldier;
  baseFigure: BaseFigure | null;
  label: string;
  isActive: boolean;
  actionInProgress: "fire" | "kill" | "undo" | null;
  supernaturalAccess: ReturnType<typeof getSupernaturalAccess>;
  onSelectSoldier: (soldierId: string) => void;
  onFireSoldier: (soldierId: string) => void;
  onKillSoldier: (soldierId: string) => void;
  onUndoSoldier: (soldierId: string) => void;
  onOpenEquipmentDialog: (figureName: string, items: unknown[]) => void;
  onOpenSkillsDialog: (
    figureName: string,
    figureData: unknown,
    extraLists?: ExtraSkillListToWarbandSoldier[] | null
  ) => void;
  onOpenSpellsDialog: (
    figureName: string,
    figureData: unknown,
    extraLores?: ExtraSpellLoreToWarbandSoldier[] | null
  ) => void;
  onOpenSupernaturalDialog: (options: {
    soldierId: string;
    category: SupernaturalDialogCategory;
    figureName: string;
  }) => void;
};

const SoldierCard: React.FC<SoldierCardProps> = ({
  soldier,
  baseFigure,
  label,
  isActive,
  actionInProgress,
  supernaturalAccess,
  onSelectSoldier,
  onFireSoldier,
  onKillSoldier,
  onUndoSoldier,
  onOpenEquipmentDialog,
  onOpenSkillsDialog,
  onOpenSpellsDialog,
  onOpenSupernaturalDialog,
}) => {
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const actionsMenuOpen = Boolean(actionsAnchorEl);
  const actionsDisabled = actionInProgress !== null;
  const figureName = baseFigure?.name ?? label;

  const handleOpenActionsMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setActionsAnchorEl(event.currentTarget);
  };

  const handleCloseActionsMenu = () => {
    setActionsAnchorEl(null);
  };

  const handleSelectSoldier = () => {
    onSelectSoldier(soldier.id);
  };

  const handleSupernaturalButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    category: SupernaturalDialogCategory
  ) => {
    event.stopPropagation();
    onSelectSoldier(soldier.id);
    onOpenSupernaturalDialog({
      soldierId: soldier.id,
      category,
      figureName,
    });
  };

  const fireLabel =
    actionInProgress === "fire" ? "Dispensando..." : "Dispensar";
  const killLabel =
    actionInProgress === "kill" ? "Marcando..." : "Matar";
  const undoLabel =
    actionInProgress === "undo" ? "Desfazendo..." : "Desfazer";

  const cardClasses = isActive
    ? "border-green-500 bg-green-900/30 text-green-100"
    : "border-green-800/40 bg-[#111111] text-gray-200 hover:border-green-500/60";

  return (
    <div className={`rounded border px-3 py-3 text-sm transition ${cardClasses}`}>
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={handleSelectSoldier}
          className="flex-1 text-left"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">{label}</span>
            <span className="text-xs text-gray-400">
              XP: {soldier.experience ?? 0}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="text-xs text-gray-400">
              {baseFigure ? (
                <>
                  <span>{baseFigure.role}</span>
                  {" · "}
                  <span>{baseFigure.cost}g</span>
                </>
              ) : (
                <span>Base desconhecida</span>
              )}
            </div>
            {(supernaturalAccess.mutations ||
              supernaturalAccess.sacredMarks ||
              supernaturalAccess.blessings) && (
              <div className="flex gap-1">
                {supernaturalAccess.mutations ? (
                  <Chip
                    size="small"
                    label="Mutação"
                    sx={{
                      backgroundColor: "rgba(147, 51, 234, 0.2)",
                      borderColor: "rgba(147, 51, 234, 0.4)",
                      color: "rgba(196, 181, 253, 1)",
                      fontSize: "10px",
                      height: "20px",
                    }}
                    variant="outlined"
                  />
                ) : null}
                {supernaturalAccess.sacredMarks ? (
                  <Chip
                    size="small"
                    label="Marca Sagrada"
                    sx={{
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                      borderColor: "rgba(59, 130, 246, 0.4)",
                      color: "rgba(147, 197, 253, 1)",
                      fontSize: "10px",
                      height: "20px",
                    }}
                    variant="outlined"
                  />
                ) : null}
                {supernaturalAccess.blessings ? (
                  <Chip
                    size="small"
                    label="Benção de Nurgle"
                    sx={{
                      backgroundColor: "rgba(34, 197, 94, 0.2)",
                      borderColor: "rgba(34, 197, 94, 0.4)",
                      color: "rgba(134, 239, 172, 1)",
                      fontSize: "10px",
                      height: "20px",
                    }}
                    variant="outlined"
                  />
                ) : null}
              </div>
            )}
          </div>
        </button>

        <IconButton
          size="small"
          onClick={handleOpenActionsMenu}
          aria-label="Ações da figura"
          aria-haspopup="true"
          color="inherit"
        >
          <SettingsOutlinedIcon fontSize="small" />
        </IconButton>

        <Menu
          anchorEl={actionsAnchorEl}
          open={actionsMenuOpen}
          onClose={handleCloseActionsMenu}
          onClick={event => event.stopPropagation()}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem
            onClick={event => {
              event.stopPropagation();
              handleCloseActionsMenu();
              onFireSoldier(soldier.id);
            }}
            disabled={actionsDisabled}
          >
            <ListItemIcon>
              <PersonOffIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={fireLabel} />
          </MenuItem>
          <MenuItem
            onClick={event => {
              event.stopPropagation();
              handleCloseActionsMenu();
              onKillSoldier(soldier.id);
            }}
            disabled={actionsDisabled}
          >
            <ListItemIcon>
              <DangerousOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={killLabel} />
          </MenuItem>
          <MenuItem
            onClick={event => {
              event.stopPropagation();
              handleCloseActionsMenu();
              onUndoSoldier(soldier.id);
            }}
            disabled={actionsDisabled}
          >
            <ListItemIcon>
              <UndoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={undoLabel} />
          </MenuItem>
        </Menu>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {baseFigure ? (
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              onSelectSoldier(soldier.id);
              onOpenEquipmentDialog(
                figureName,
                extractEquipment(baseFigure)
              );
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-green-600/60 bg-green-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
          >
            <Inventory2OutlinedIcon fontSize="small" sx={{ fontSize: "16px" }} />
            Equipamentos disponíveis
          </button>
        ) : null}

        {baseFigure ? (
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              onSelectSoldier(soldier.id);
              onOpenSkillsDialog(
                figureName,
                baseFigure,
                soldier.extraSkillsLists ??
                  soldier.extraSkillLists ??
                  null
              );
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-purple-600/60 bg-purple-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-purple-200 transition hover:border-purple-400 hover:bg-purple-900/40"
          >
            Habilidades disponíveis
          </button>
        ) : null}

        {baseFigure ? (
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              onSelectSoldier(soldier.id);
              onOpenSpellsDialog(
                figureName,
                baseFigure,
                soldier.extraSpellsLores ??
                  soldier.extraSpellLores ??
                  null
              );
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-blue-600/60 bg-blue-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-blue-200 transition hover:border-blue-400 hover:bg-blue-900/40"
          >
            Magias disponíveis
          </button>
        ) : null}

        {supernaturalAccess.mutations ? (
          <button
            type="button"
            onClick={event =>
              handleSupernaturalButtonClick(event, "Mutação")
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-amber-600/60 bg-amber-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-amber-200 transition hover:border-amber-400 hover:bg-amber-900/40"
          >
            <BiotechOutlinedIcon fontSize="small" sx={{ fontSize: "16px" }} />
            Mutações disponíveis
          </button>
        ) : null}

        {supernaturalAccess.blessings ? (
          <button
            type="button"
            onClick={event =>
              handleSupernaturalButtonClick(event, "Benção de Nurgle")
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-lime-600/60 bg-lime-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-lime-200 transition hover:border-lime-400 hover:bg-lime-900/40"
          >
            <CoronavirusIcon fontSize="small" sx={{ fontSize: "16px" }} />
            Bençãos de Nurgle
          </button>
        ) : null}
      </div>
    </div>
  );
};

export const SoldierListSection: React.FC<SoldierListSectionProps> = ({
  soldierGroups,
  selectedSoldierId,
  onSelectSoldier,
  onFireSoldier,
  onKillSoldier,
  onUndoSoldier,
  onOpenEquipmentDialog,
  onOpenSkillsDialog,
  onOpenSpellsDialog,
  onOpenSupernaturalDialog,
  soldierAction,
}) => {
  return (
    <SectionCard title="Figuras do Bando">
      {soldierGroups.length === 0 ? (
        <MobileText className="text-sm text-gray-400">
          Nenhuma figura adicionada ao bando.
        </MobileText>
      ) : (
        <div className="space-y-4">
          {soldierGroups.map(group => (
            <div key={group.title} className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-green-300">
                {group.title}
              </h4>
              <div className="space-y-3">
                {group.items.map(({ soldier, baseFigure }) => {
                  const label = soldier.campaignName
                    ? `${soldier.campaignName} (${baseFigure?.name ?? "Sem base"})`
                    : (baseFigure?.name ?? "Figura sem nome");
                  const isActive = soldier.id === selectedSoldierId;
                  const actionInProgress =
                    soldierAction?.soldierId === soldier.id
                      ? soldierAction.type
                      : null;
                  const supernaturalAccess = getSupernaturalAccess(
                    baseFigure,
                    soldier.skills ?? []
                  );

                  return (
                    <SoldierCard
                      key={soldier.id}
                      soldier={soldier}
                      baseFigure={baseFigure}
                      label={label}
                      isActive={isActive}
                      actionInProgress={actionInProgress}
                      supernaturalAccess={supernaturalAccess}
                      onSelectSoldier={onSelectSoldier}
                      onFireSoldier={onFireSoldier}
                      onKillSoldier={onKillSoldier}
                      onUndoSoldier={onUndoSoldier}
                      onOpenEquipmentDialog={onOpenEquipmentDialog}
                      onOpenSkillsDialog={onOpenSkillsDialog}
                      onOpenSpellsDialog={onOpenSpellsDialog}
                      onOpenSupernaturalDialog={onOpenSupernaturalDialog}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
};

