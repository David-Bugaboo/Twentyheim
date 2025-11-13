import React from "react";
import { Tooltip } from "@mui/material";
import { Chip } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { SectionCard, StatRow } from "./CommonComponents";
import MobileText from "../../../../components/MobileText";
import type { FigureSummary } from "../types";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import { FIGURE_STATS } from "../types";
import {
  parseSpecialRules,
  getSkillListLabel,
  getSpellLoreLabel,
} from "../utils/helpers";
import { extractEquipment } from "../utils/equipment-helpers";
import { getSupernaturalAccess } from "../utils/supernatural-helpers";
import GameText from "../../../../components/GameText";

type AvailableFiguresSectionProps = {
  baseFigureGroups: Array<{
    title: string;
    items: FigureSummary[];
  }>;
  expandedAvailableFigures: Record<string, boolean>;
  onToggleFigure: (figureId: string) => void;
  onAddFigure: (figureSlug: string, figureName: string) => void;
  onOpenEquipmentDialog: (figureName: string, items: unknown[]) => void;
  onOpenMercenaryModal?: () => void;
  hasAvailableMercenaries?: boolean;
  onOpenLegendModal?: () => void;
  hasAvailableLegends?: boolean;
  addingFigureSlug: string | null;
  warbandId: string | null;
};

export const AvailableFiguresSection: React.FC<AvailableFiguresSectionProps> = ({
  baseFigureGroups,
  expandedAvailableFigures,
  onToggleFigure,
  onAddFigure,
  onOpenEquipmentDialog,
  onOpenMercenaryModal,
  hasAvailableMercenaries,
  onOpenLegendModal,
  hasAvailableLegends,
  addingFigureSlug,
  warbandId,
}) => {
  return (
    <SectionCard title="Figuras Disponíveis">
      {baseFigureGroups.length === 0 ? (
        <MobileText className="text-sm text-gray-400">
          Nenhuma figura encontrada para esta facção.
        </MobileText>
      ) : (
        <div className="space-y-4">
          {baseFigureGroups.map(group => (
            <div key={group.title} className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-green-300">
                {group.title}
              </h4>
              <div className="space-y-3">
                {group.items.map(figure => {
                  const isExpanded =
                    expandedAvailableFigures[figure.id] ?? false;
                  const baseFigure = figure as BaseFigure | null;
                  const supernaturalAccess = getSupernaturalAccess(
                    baseFigure,
                    []
                  );
                  const naturalAttacks = Array.isArray(
                    baseFigure?.naturalAttacks
                  )
                    ? baseFigure?.naturalAttacks ?? []
                    : [];
                  return (
                    <div
                      key={figure.id}
                      className="rounded border border-green-800/40 bg-[#101010] p-3 text-sm text-gray-200"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="font-semibold text-green-200">
                            {figure.name}
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="text-xs text-gray-400">
                              <span className="uppercase text-green-400">
                                {figure.role}
                              </span>
                              {" · "}
                              <span>{figure.cost}g</span>
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
                        </div>
                        <button
                          type="button"
                          onClick={() => onToggleFigure(figure.id)}
                          className="rounded border border-green-700/40 bg-green-900/20 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-500/60 hover:bg-green-900/40"
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? "Recolher" : "Expandir"}
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onAddFigure(figure.slug, figure.name)}
                        disabled={
                          addingFigureSlug === figure.slug || !warbandId
                        }
                        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded border border-green-500/60 bg-green-900/20 px-3 py-2 text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {addingFigureSlug === figure.slug
                          ? "Adicionando..."
                          : "Adicionar ao bando"}
                      </button>

                      {isExpanded ? (
                        <div className="mt-3 space-y-3 text-xs text-gray-400">
                          <div className="grid grid-cols-2 gap-2">
                            {FIGURE_STATS.map(stat => {
                              const rawValue = (
                                figure as Record<string, unknown>
                              )[stat.key];
                              const displayValue =
                                rawValue === undefined || rawValue === null
                                  ? "-"
                                  : String(rawValue);
                              return (
                                <StatRow
                                  key={`${figure.id}-${stat.key}`}
                                  label={stat.label}
                                  value={displayValue}
                                />
                              );
                            })}
                          </div>

                          {figure.specialRules ? (
                            <div className="rounded border border-green-800/30 bg-[#0f1a14] p-3 text-green-100">
                              <p className="mb-2 font-semibold uppercase tracking-wide text-green-300">
                                Regras Especiais
                              </p>
                              <div className="space-y-2">
                                {parseSpecialRules(figure.specialRules).map(
                                  (entry, index) => (
                                    <div
                                      key={`${figure.id}-rule-${index}`}
                                      className="rounded bg-green-900/20 px-3 py-2 text-[11px] text-green-100"
                                    >
                                      <span className="block font-semibold text-green-200">
                                        {entry.label}
                                      </span>
                                      <span className="mt-1 block whitespace-pre-wrap text-green-100">
                                        {entry.value}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          ) : null}

                          {naturalAttacks.length > 0 ? (
                            <div className="rounded border border-amber-800/30 bg-[#181207] p-3 text-amber-100">
                              <p className="mb-2 font-semibold uppercase tracking-wide text-amber-300">
                                Ataques Naturais
                              </p>
                              <div className="space-y-3">
                                {naturalAttacks.map((attack, index) => (
                                  <div
                                    key={`${figure.id}-natural-${index}`}
                                    className="rounded border border-amber-700/30 bg-[#1f1406] px-3 py-2 text-xs text-amber-100"
                                  >
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                      <span className="font-semibold text-amber-200">
                                        {attack.name}
                                      </span>
                                      <span className="text-[11px] uppercase text-amber-300">
                                        {attack.type}
                                      </span>
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-amber-200">
                                      <span>
                                        <strong>Dano:</strong>{" "}
                                        {attack.damage ?? "-"}
                                      </span>
                                      {attack.range ? (
                                        <span>
                                          <strong>Alcance:</strong>{" "}
                                          {attack.range}
                                        </span>
                                      ) : null}
                                    </div>
                                    {Array.isArray(attack.specialRules) &&
                                    attack.specialRules.length > 0 ? (
                                      <div className="mt-2 space-y-1">
                                        {attack.specialRules.map(
                                          (rule, ruleIndex) => (
                                            <div
                                              key={`${figure.id}-natural-${index}-rule-${ruleIndex}`}
                                              className="text-[11px] text-amber-100"
                                            >
                                              <span className="font-semibold text-amber-200">
                                                {rule.label || rule.title}:
                                              </span>{" "}
                                              {rule.value ? (
                                                <GameText
                                                  component="span"
                                                  className="text-amber-100"
                                                >
                                                  {rule.value}
                                                </GameText>
                                              ) : null}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ) : null}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded border border-green-800/30 bg-[#0f1310] p-2">
                              <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-green-300">
                                Listas de Habilidade
                              </h4>
                              {figure.skillLists &&
                              figure.skillLists.length > 0 ? (
                                <ul className="space-y-1 text-[11px] text-green-100">
                                  {figure.skillLists.map((skillList, index) => (
                                    <li
                                      key={
                                        skillList.id ??
                                        `${figure.id}-skill-${index}`
                                      }
                                      className="rounded bg-green-900/20 px-2 py-1"
                                    >
                                      {getSkillListLabel(skillList)}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-[11px] text-gray-500">
                                  Sem listas de habilidade.
                                </p>
                              )}
                            </div>
                            <div className="rounded border border-blue-800/30 bg-[#0f1013] p-2">
                              <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-blue-300">
                                Tradições Mágicas
                              </h4>
                              {figure.spellLores &&
                              figure.spellLores.length > 0 ? (
                                <ul className="space-y-1 text-[11px] text-blue-100">
                                  {figure.spellLores.map((spellLore, index) => (
                                    <li
                                      key={
                                        spellLore.id ??
                                        `${figure.id}-spell-${index}`
                                      }
                                      className="rounded bg-blue-900/20 px-2 py-1"
                                    >
                                      {getSpellLoreLabel(spellLore)}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-[11px] text-gray-500">
                                  Sem tradições mágicas.
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <Tooltip title="Ver equipamentos disponíveis da figura">
                              <span className="block">
                                <button
                                  type="button"
                                  onClick={() =>
                                    onOpenEquipmentDialog(
                                      figure.name,
                                      extractEquipment(figure)
                                    )
                                  }
                                  className="flex w-full items-center justify-center gap-2 rounded border border-green-600/60 bg-green-900/20 px-3 py-2 text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
                                >
                                  <Inventory2OutlinedIcon
                                    fontSize="small"
                                    sx={{ fontSize: "18px" }}
                                  />
                                  <span>Equipamentos disponíveis</span>
                                </button>
                              </span>
                            </Tooltip>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      {hasAvailableMercenaries && onOpenMercenaryModal ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={onOpenMercenaryModal}
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-green-500/60 bg-green-900/20 px-4 py-2 text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
          >
            <PersonAddIcon fontSize="small" sx={{ fontSize: "18px" }} />
            Contratar Mercenário
          </button>
        </div>
      ) : null}
      {hasAvailableLegends && onOpenLegendModal ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={onOpenLegendModal}
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-green-500/60 bg-green-900/20 px-4 py-2 text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
          >
            <PersonAddIcon fontSize="small" sx={{ fontSize: "18px" }} />
            Contratar Lenda
          </button>
        </div>
      ) : null}
    </SectionCard>
  );
};

