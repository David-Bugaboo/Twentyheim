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
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";
import UndoIcon from "@mui/icons-material/Undo";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import MobileText from "../../../../components/MobileText";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { ExtraSkillListToWarbandSoldier } from "../../../../types/extra-skill-list-to-warband-soldier.entity";
import type { ExtraSpellLoreToWarbandSoldier } from "../../../../types/extra-spell-lore-to-warband-soldier.entity";
import { extractEquipment } from "../utils/equipment-helpers";
import { getSupernaturalAccess } from "../utils/supernatural-helpers";
import {
  formatCrownsValue,
  extractSkillListSlugs,
  extractSpellLoreSlugs,
} from "../utils/helpers";

type SupernaturalDialogCategory = "Mutação" | "Benção de Nurgle";

type SoldierListSectionProps = {
  soldierGroups: Array<{
    title: string;
    items: Array<{
      soldier: WarbandSoldier;
      baseFigure: BaseFigure | null;
      role: string | null;
      roleType: "leader" | "hero" | "legend" | "soldier" | "mercenary";
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
  onRequestPromoteHero: (soldierId: string) => void;
  onRequestPromoteLeader: (soldierId: string) => void;
  hasLeader: boolean;
  onOpenSupernaturalDialog: (options: {
    soldierId: string;
    category: SupernaturalDialogCategory;
    figureName: string;
  }) => void;
  soldierAction: {
    type: "fire" | "kill" | "undo" | "toggleActive";
    soldierId: string;
  } | null;
  onToggleSoldierActive: (
    soldierId: string,
    figureName: string,
    isCurrentlyInactive: boolean
  ) => void;
};

type SoldierCardProps = {
  soldier: WarbandSoldier;
  baseFigure: BaseFigure | null;
  label: string;
  isActive: boolean;
  actionInProgress: "fire" | "kill" | "undo" | "toggleActive" | null;
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
  onRequestPromoteHero: (soldierId: string) => void;
  onRequestPromoteLeader: (soldierId: string) => void;
  roleType: "leader" | "hero" | "legend" | "soldier" | "mercenary";
  hasLeader: boolean;
  onOpenSupernaturalDialog: (options: {
    soldierId: string;
    category: SupernaturalDialogCategory;
    figureName: string;
  }) => void;
  onToggleSoldierActive: (
    soldierId: string,
    figureName: string,
    isCurrentlyInactive: boolean
  ) => void;
  toggleActionInProgress: boolean;
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
  onRequestPromoteHero,
  onRequestPromoteLeader,
  roleType,
  hasLeader,
  onOpenSupernaturalDialog,
  onToggleSoldierActive,
  toggleActionInProgress,
}) => {
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const actionsMenuOpen = Boolean(actionsAnchorEl);
  const isToggleInProgress =
    actionInProgress === "toggleActive" || toggleActionInProgress;
  const actionsDisabled =
    actionInProgress !== null && actionInProgress !== "toggleActive";
  const figureName = baseFigure?.name ?? label;
  const isInactive = soldier.active === false;

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
    event.preventDefault();
    if (isInactive || isToggleInProgress) return;
    onOpenSupernaturalDialog({
      soldierId: soldier.id,
      category,
      figureName,
    });
  };

  const fireLabel =
    actionInProgress === "fire" ? "Dispensando..." : "Dispensar";
  const killLabel = actionInProgress === "kill" ? "Marcando..." : "Matar";
  const undoLabel = actionInProgress === "undo" ? "Desfazendo..." : "Desfazer";
  const toggleLabel = isToggleInProgress
    ? soldier.active === false
      ? "Ativando..."
      : "Desativando..."
    : soldier.active === false
      ? "Ativar figura"
      : "Desativar figura";

  const soldierNoXp = Boolean(
    (soldier as unknown as { noXp?: boolean })?.noXp ??
      (baseFigure as unknown as { noXp?: boolean } | null)?.noXp ??
      false
  );

  const showPromoteHero =
    !soldierNoXp &&
    roleType === "soldier" &&
    typeof onRequestPromoteHero === "function";
  const showPromoteLeader =
    !soldierNoXp &&
    roleType === "hero" &&
    !hasLeader &&
    typeof onRequestPromoteLeader === "function";

  let cardClasses = isActive
    ? "border-green-500 bg-green-900/30 text-green-100"
    : "border-green-800/40 bg-[#111111] text-gray-200 hover:border-green-500/60";

  if (isInactive) {
    cardClasses = "border-gray-700 bg-[#1b1b1b] text-gray-400 opacity-70";
  }

  return (
    <div
      className={`rounded border px-3 py-3 text-sm transition ${cardClasses}`}
    >
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={handleSelectSoldier}
          className={`flex-1 text-left ${
            isInactive || isToggleInProgress
              ? "pointer-events-none cursor-not-allowed"
              : ""
          }`}
          disabled={isInactive || isToggleInProgress}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              {label}
              {baseFigure
                ? (() => {
                    const min = (
                      baseFigure as unknown as Record<string, unknown>
                    ).min;
                    const max = (
                      baseFigure as unknown as Record<string, unknown>
                    ).max;
                    const minNum =
                      typeof min === "number"
                        ? min
                        : typeof min === "string"
                          ? Number(min)
                          : null;
                    const maxNum =
                      typeof max === "number"
                        ? max
                        : typeof max === "string"
                          ? Number(max)
                          : null;

                    if (minNum === null && maxNum === null) return null;

                    let displayText = "";
                    if (minNum !== null && maxNum !== null) {
                      if (minNum === maxNum) {
                        displayText = String(minNum);
                      } else if (maxNum === 999) {
                        displayText = `${minNum ?? 0}-∞`;
                      } else {
                        displayText = `${minNum}-${maxNum}`;
                      }
                    } else if (minNum !== null) {
                      displayText = String(minNum);
                    } else if (maxNum !== null) {
                      displayText = maxNum === 999 ? "∞" : String(maxNum);
                    }

                    return displayText ? (
                      <span className="ml-2 text-xs font-normal text-gray-400">
                        ({displayText})
                      </span>
                    ) : null;
                  })()
                : null}
            </span>
            <span className={`text-xs ${soldierNoXp ? "text-red-400 font-semibold" : "text-gray-400"}`}>
              {soldierNoXp ? "SEM XP" : `XP: ${soldier.experience ?? 0}`}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
              {baseFigure ? (
                <>
                  <span>{baseFigure.role}</span>
                  {" · "}
                  <span>{formatCrownsValue(baseFigure.cost)}</span>
                  {baseFigure?.upkeep != null &&
                  Number(baseFigure.upkeep) !== 0 ? (
                    <span className="text-amber-200">
                      Manutenção: {formatCrownsValue(baseFigure.upkeep)}
                    </span>
                  ) : null}
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
            {isInactive ? (
              <span className="text-xs uppercase tracking-wide text-amber-300">
                Desativado
              </span>
            ) : null}
          </div>
        </button>

        <IconButton
          size="small"
          onClick={handleOpenActionsMenu}
          aria-label="Ações da figura"
          aria-haspopup="true"
          color="inherit"
          disabled={isToggleInProgress}
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
              onToggleSoldierActive(soldier.id, figureName, isInactive);
            }}
            disabled={isToggleInProgress}
          >
            <ListItemIcon>
              <PowerSettingsNewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={toggleLabel} />
          </MenuItem>
          {showPromoteHero ? (
            <MenuItem
              onClick={event => {
                event.stopPropagation();
                handleCloseActionsMenu();
                onSelectSoldier(soldier.id);
                onRequestPromoteHero?.(soldier.id);
              }}
              disabled={actionsDisabled || isInactive}
            >
              <ListItemIcon>
                <MilitaryTechOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Promover a Herói" />
            </MenuItem>
          ) : null}
          {showPromoteLeader ? (
            <MenuItem
              onClick={event => {
                event.stopPropagation();
                handleCloseActionsMenu();
                onSelectSoldier(soldier.id);
                onRequestPromoteLeader?.(soldier.id);
              }}
              disabled={actionsDisabled || isInactive}
            >
              <ListItemIcon>
                <WorkspacePremiumOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Promover a Líder" />
            </MenuItem>
          ) : null}
          <MenuItem
            onClick={event => {
              event.stopPropagation();
              handleCloseActionsMenu();
              onFireSoldier(soldier.id);
            }}
            disabled={actionsDisabled || isInactive}
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
            disabled={actionsDisabled || isInactive}
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
            disabled={actionsDisabled || isInactive}
          >
            <ListItemIcon>
              <UndoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={undoLabel} />
          </MenuItem>
        </Menu>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {baseFigure && extractEquipment(baseFigure).length > 0 ? (
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              onOpenEquipmentDialog(figureName, extractEquipment(baseFigure));
            }}
            disabled={isInactive || isToggleInProgress}
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-green-600/60 bg-green-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Equipamentos disponíveis
          </button>
        ) : null}

        {baseFigure && extractSkillListSlugs(baseFigure).length > 0 ? (
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              onOpenSkillsDialog(
                figureName,
                baseFigure,
                soldier.extraSkillsLists ?? soldier.extraSkillLists ?? null
              );
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-purple-600/60 bg-purple-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-purple-200 transition hover:border-purple-400 hover:bg-purple-900/40"
          >
            Habilidades disponíveis
          </button>
        ) : null}

        {baseFigure && extractSpellLoreSlugs(baseFigure).length > 0 ? (
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              onOpenSpellsDialog(
                figureName,
                baseFigure,
                soldier.extraSpellsLores ?? soldier.extraSpellLores ?? null
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
            onClick={event => handleSupernaturalButtonClick(event, "Mutação")}
            disabled={isInactive || isToggleInProgress}
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-amber-600/60 bg-amber-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-amber-200 transition hover:border-amber-400 hover:bg-amber-900/40 disabled:cursor-not-allowed disabled:opacity-60"
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
            disabled={isInactive || isToggleInProgress}
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-lime-600/60 bg-lime-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-lime-200 transition hover:border-lime-400 hover:bg-lime-900/40 disabled:cursor-not-allowed disabled:opacity-60"
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
  onRequestPromoteHero,
  onRequestPromoteLeader,
  hasLeader,
  onOpenSupernaturalDialog,
  onToggleSoldierActive,
  soldierAction,
}) => {
  return (
    <div>
      <h3
        className="mb-4 text-lg font-semibold text-green-200"
        style={{
          fontFamily: "Cinzel Decorative, serif",
        }}
      >
        Figuras do Bando
      </h3>
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
                {group.items.map(({ soldier, baseFigure, roleType }) => {
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
                      onRequestPromoteHero={onRequestPromoteHero}
                      onRequestPromoteLeader={onRequestPromoteLeader}
                      roleType={roleType}
                      hasLeader={hasLeader}
                      onOpenSupernaturalDialog={onOpenSupernaturalDialog}
                      onToggleSoldierActive={onToggleSoldierActive}
                      toggleActionInProgress={
                        actionInProgress === "toggleActive"
                      }
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
