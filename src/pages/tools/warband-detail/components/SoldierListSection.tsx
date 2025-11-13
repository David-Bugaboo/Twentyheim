import React from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { Chip } from "@mui/material";
import { SectionCard } from "./CommonComponents";
import MobileText from "../../../../components/MobileText";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { ExtraSkillListToWarbandSoldier } from "../../../../types/extra-skill-list-to-warband-soldier.entity";
import type { ExtraSpellLoreToWarbandSoldier } from "../../../../types/extra-spell-lore-to-warband-soldier.entity";
import { extractEquipment } from "../utils/equipment-helpers";
import { getSupernaturalAccess } from "../utils/supernatural-helpers";

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
  soldierAction: {
    type: "fire" | "kill" | "undo";
    soldierId: string;
  } | null;
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
                    <div
                      key={soldier.id}
                      className={`rounded border px-3 py-3 text-sm transition ${
                        isActive
                          ? "border-green-500 bg-green-900/30 text-green-100"
                          : "border-green-800/40 bg-[#111111] text-gray-200 hover:border-green-500/60"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectSoldier(soldier.id)}
                        className="w-full text-left"
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
                              {supernaturalAccess.mutations && (
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
                              )}
                              {supernaturalAccess.sacredMarks && (
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
                              )}
                              {supernaturalAccess.blessings && (
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
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                      <div className="mt-3 flex flex-col gap-2 md:flex-row">
                        <button
                          type="button"
                          onClick={event => {
                            event.stopPropagation();
                            onFireSoldier(soldier.id);
                          }}
                          disabled={actionInProgress !== null}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded border border-yellow-600/60 bg-yellow-900/20 px-3 py-2 text-xs font-semibold text-yellow-200 transition hover:border-yellow-400 hover:bg-yellow-900/30 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <span className="text-yellow-300">✦</span>
                          {actionInProgress === "fire"
                            ? "Dispensando..."
                            : "Dispensar"}
                        </button>
                        <button
                          type="button"
                          onClick={event => {
                            event.stopPropagation();
                            onKillSoldier(soldier.id);
                          }}
                          disabled={actionInProgress !== null}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded border border-red-600/60 bg-red-900/20 px-3 py-2 text-xs font-semibold text-red-200 transition hover:border-red-400 hover:bg-red-900/30 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <span className="text-red-300">☠</span>
                          {actionInProgress === "kill"
                            ? "Marcando..."
                            : "Matar"}
                        </button>
                        <button
                          type="button"
                          onClick={event => {
                            event.stopPropagation();
                            onUndoSoldier(soldier.id);
                          }}
                          disabled={actionInProgress !== null}
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded border border-blue-600/60 bg-blue-900/20 px-3 py-2 text-xs font-semibold text-blue-200 transition hover:border-blue-400 hover:bg-blue-900/30 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <span className="text-blue-300">↺</span>
                          {actionInProgress === "undo"
                            ? "Desfazendo..."
                            : "Desfazer"}
                        </button>
                      </div>
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                        {baseFigure ? (
                          <button
                            type="button"
                            onClick={event => {
                              event.stopPropagation();
                              onSelectSoldier(soldier.id);
                              onOpenEquipmentDialog(
                                baseFigure.name ?? label,
                                extractEquipment(baseFigure)
                              );
                            }}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded border border-green-600/60 bg-green-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
                          >
                            <Inventory2OutlinedIcon
                              fontSize="small"
                              sx={{ fontSize: "16px" }}
                            />
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
                                baseFigure.name ?? label,
                                baseFigure,
                                soldier.extraSkillsLists ??
                                  soldier.extraSkillLists ??
                                  null
                              );
                            }}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded border border-purple-600/60 bg-purple-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-purple-200 transition hover:border-purple-400 hover:bg-purple-900/40"
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
                                baseFigure.name ?? label,
                                baseFigure,
                                soldier.extraSpellsLores ??
                                  soldier.extraSpellLores ??
                                  null
                              );
                            }}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded border border-blue-600/60 bg-blue-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-blue-200 transition hover:border-blue-400 hover:bg-blue-900/40"
                          >
                            Magias disponíveis
                          </button>
                        ) : null}
                      </div>
                    </div>
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
