import React from "react";
import MobileText from "../../../components/MobileText";
import type { WarbandSoldier } from "../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../types/base-figure.entity";
import { extractEquipment } from "../../tools/warband-detail/utils/equipment-helpers";
import { getSupernaturalAccess } from "../../tools/warband-detail/utils/supernatural-helpers";
import { formatCrownsValue, extractSkillListSlugs, extractSpellLoreSlugs, getSkillListLabel, getSpellLoreLabel } from "../../tools/warband-detail/utils/helpers";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";

type SoldierListSectionReadOnlyProps = {
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
  onOpenEquipmentDialog: (figureName: string, items: unknown[]) => void;
  onOpenSkillsDialog: (
    figureName: string,
    figureData: unknown,
    extraLists?: unknown[] | null
  ) => void;
  onOpenSpellsDialog: (
    figureName: string,
    figureData: unknown,
    extraLores?: unknown[] | null
  ) => void;
  onOpenMutationsDialog: (figureName: string) => void;
  onOpenBlessingsDialog: (figureName: string) => void;
};

type SoldierCardReadOnlyProps = {
  soldier: WarbandSoldier;
  baseFigure: BaseFigure | null;
  label: string;
  isActive: boolean;
  supernaturalAccess: ReturnType<typeof getSupernaturalAccess>;
  onSelectSoldier: (soldierId: string) => void;
  onOpenEquipmentDialog: (figureName: string, items: unknown[]) => void;
  onOpenSkillsDialog: (
    figureName: string,
    figureData: unknown,
    extraLists?: unknown[] | null
  ) => void;
  onOpenSpellsDialog: (
    figureName: string,
    figureData: unknown,
    extraLores?: unknown[] | null
  ) => void;
  onOpenMutationsDialog: (figureName: string) => void;
  onOpenBlessingsDialog: (figureName: string) => void;
};

const SoldierCardReadOnly: React.FC<SoldierCardReadOnlyProps> = ({
  soldier,
  baseFigure,
  label,
  isActive,
  supernaturalAccess,
  onSelectSoldier,
  onOpenEquipmentDialog,
  onOpenSkillsDialog,
  onOpenSpellsDialog,
  onOpenMutationsDialog,
  onOpenBlessingsDialog,
}) => {
  const isInactive = soldier.active === false;
  const figureName = baseFigure?.name ?? "Figura sem nome";

  const cardClasses = isActive
    ? "border-green-500 bg-green-900/30 text-green-100"
    : "border-green-800/40 bg-[#111111] text-gray-200 hover:border-green-500/60";

  const inactiveCardClasses = isInactive
    ? "border-gray-700 bg-[#1b1b1b] text-gray-400 opacity-70"
    : "";

  return (
    <div
      className={`rounded border px-3 py-3 text-sm transition ${
        isInactive ? inactiveCardClasses : cardClasses
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={() => onSelectSoldier(soldier.id)}
          className={`flex-1 text-left ${
            isInactive ? "pointer-events-none cursor-not-allowed" : ""
          }`}
          disabled={isInactive}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              {label}
              {baseFigure ? (() => {
                const min = (baseFigure as unknown as Record<string, unknown>).min;
                const max = (baseFigure as unknown as Record<string, unknown>).max;
                const minNum = typeof min === "number" ? min : typeof min === "string" ? Number(min) : null;
                const maxNum = typeof max === "number" ? max : typeof max === "string" ? Number(max) : null;
                
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
              })() : null}
            </span>
            <span className="text-xs text-gray-400">
              XP: {soldier.experience ?? 0}
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
            {(() => {
              const skillLists = baseFigure?.skillLists ?? [];
              const spellLores = baseFigure?.spellLores ?? [];
              const hasSkillLists = Array.isArray(skillLists) && skillLists.length > 0;
              const hasSpellLores = Array.isArray(spellLores) && spellLores.length > 0;
              const hasSupernatural = supernaturalAccess.mutations ||
                supernaturalAccess.sacredMarks ||
                supernaturalAccess.blessings;
              
              if (!hasSkillLists && !hasSpellLores && !hasSupernatural) {
                return null;
              }
              
              return (
                <div className="flex flex-wrap gap-1">
                  {hasSkillLists && Array.isArray(skillLists) ? (
                    skillLists.map((entry, index) => {
                      const label = getSkillListLabel(entry);
                      return (
                        <span
                          key={`${soldier.id}-skill-list-${index}`}
                          className="rounded-full border border-purple-500/40 bg-purple-900/30 px-2 py-1 text-[10px] text-purple-200"
                          style={{
                            backgroundColor: "rgba(147, 51, 234, 0.2)",
                            borderColor: "rgba(147, 51, 234, 0.4)",
                            color: "rgba(196, 181, 253, 1)",
                          }}
                        >
                          {label}
                        </span>
                      );
                    })
                  ) : null}
                  {hasSpellLores && Array.isArray(spellLores) ? (
                    spellLores.map((entry, index) => {
                      const label = getSpellLoreLabel(entry);
                      return (
                        <span
                          key={`${soldier.id}-spell-lore-${index}`}
                          className="rounded-full border border-blue-500/40 bg-blue-900/30 px-2 py-1 text-[10px] text-blue-200"
                          style={{
                            backgroundColor: "rgba(59, 130, 246, 0.2)",
                            borderColor: "rgba(59, 130, 246, 0.4)",
                            color: "rgba(147, 197, 253, 1)",
                          }}
                        >
                          {label}
                        </span>
                      );
                    })
                  ) : null}
                  {supernaturalAccess.mutations ? (
                    <span
                      className="rounded-full border border-purple-500/40 bg-purple-900/30 px-2 py-1 text-[10px] text-purple-200"
                      style={{
                        backgroundColor: "rgba(147, 51, 234, 0.2)",
                        borderColor: "rgba(147, 51, 234, 0.4)",
                        color: "rgba(196, 181, 253, 1)",
                      }}
                    >
                      Mutação
                    </span>
                  ) : null}
                  {supernaturalAccess.sacredMarks ? (
                    <span
                      className="rounded-full border border-blue-500/40 bg-blue-900/30 px-2 py-1 text-[10px] text-blue-200"
                      style={{
                        backgroundColor: "rgba(59, 130, 246, 0.2)",
                        borderColor: "rgba(59, 130, 246, 0.4)",
                        color: "rgba(147, 197, 253, 1)",
                      }}
                    >
                      Marca Sagrada
                    </span>
                  ) : null}
                  {supernaturalAccess.blessings ? (
                    <span
                      className="rounded-full border border-lime-500/40 bg-lime-900/30 px-2 py-1 text-[10px] text-lime-200"
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0.2)",
                        borderColor: "rgba(34, 197, 94, 0.4)",
                        color: "rgba(134, 239, 172, 1)",
                      }}
                    >
                      Benção de Nurgle
                    </span>
                  ) : null}
                </div>
              );
            })()}
            {isInactive ? (
              <span className="text-xs uppercase tracking-wide text-amber-300">
                Desativado
              </span>
            ) : null}
          </div>
        </button>
      </div>

      {/* Botões de visualização (read-only) */}
      <div className="mt-3 flex flex-col gap-2">
        {baseFigure && extractEquipment(baseFigure).length > 0 ? (
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              onOpenEquipmentDialog(
                figureName,
                extractEquipment(baseFigure)
              );
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-green-600/60 bg-green-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
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

        {baseFigure && extractSpellLoreSlugs(baseFigure).length > 0 ? (
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
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
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              onOpenMutationsDialog(figureName);
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-amber-600/60 bg-amber-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-amber-200 transition hover:border-amber-400 hover:bg-amber-900/40"
          >
            <BiotechOutlinedIcon fontSize="small" sx={{ fontSize: "16px" }} />
            Mutações disponíveis
          </button>
        ) : null}

        {supernaturalAccess.blessings ? (
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              event.preventDefault();
              onOpenBlessingsDialog(figureName);
            }}
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

export const SoldierListSectionReadOnly: React.FC<SoldierListSectionReadOnlyProps> = ({
  soldierGroups,
  selectedSoldierId,
  onSelectSoldier,
  onOpenEquipmentDialog,
  onOpenSkillsDialog,
  onOpenSpellsDialog,
  onOpenMutationsDialog,
  onOpenBlessingsDialog,
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
                {group.items.map(({ soldier, baseFigure }) => {
                  const label = soldier.campaignName
                    ? `${soldier.campaignName} (${baseFigure?.name ?? "Sem base"})`
                    : (baseFigure?.name ?? "Figura sem nome");
                  const isActive = soldier.id === selectedSoldierId;
                  const supernaturalAccess = getSupernaturalAccess(
                    baseFigure,
                    soldier.skills ?? []
                  );

                  return (
                    <SoldierCardReadOnly
                      key={soldier.id}
                      soldier={soldier}
                      baseFigure={baseFigure}
                      label={label}
                      isActive={isActive}
                      supernaturalAccess={supernaturalAccess}
                      onSelectSoldier={onSelectSoldier}
                      onOpenEquipmentDialog={onOpenEquipmentDialog}
                      onOpenSkillsDialog={onOpenSkillsDialog}
                      onOpenSpellsDialog={onOpenSpellsDialog}
                      onOpenMutationsDialog={onOpenMutationsDialog}
                      onOpenBlessingsDialog={onOpenBlessingsDialog}
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

