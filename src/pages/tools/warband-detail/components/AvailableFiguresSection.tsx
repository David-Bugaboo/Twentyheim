import React from "react";
import { Tooltip } from "@mui/material";
import { Chip } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { SectionCard, StatRow } from "./CommonComponents";
import MobileText from "../../../../components/MobileText";
import type { FigureSummary } from "../types";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import { FIGURE_STATS } from "../types";
import {
  parseSpecialRules,
  getSkillListLabel,
  getSpellLoreLabel,
  normalizeString,
  formatCrownsValue,
  getRoleType,
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

export const AvailableFiguresSection: React.FC<AvailableFiguresSectionProps> = ({
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
  const toTitleCase = (value: string) =>
    value
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, match => match.toUpperCase());

  const extractStartingEntries = (
    source: unknown,
    slugKeys: string[],
    labelKeys: string[]
  ): Array<{ slug: string; label: string }> => {
    if (!Array.isArray(source)) {
      return [];
    }
    return source
      .map((entry, index) => {
        if (!entry) return null;
        if (typeof entry === "string") {
          const slug = entry.trim();
          if (!slug) return null;
          return { slug, label: toTitleCase(slug) };
        }
        if (typeof entry === "object") {
          const record = entry as Record<string, unknown>;
          const slugValue = slugKeys
            .map(key => record[key])
            .find(
              value => typeof value === "string" && value.trim().length > 0
            );
          if (!slugValue || typeof slugValue !== "string") {
            return null;
          }
          const slug = slugValue.trim();
          if (!slug) return null;
          const labelValue = labelKeys
            .map(key => record[key])
            .find(
              value => typeof value === "string" && value.trim().length > 0
            ) as string | undefined;
          const label =
            labelValue?.trim().length ? labelValue.trim() : toTitleCase(slug);
          return { slug, label };
        }
        return null;
      })
      .filter(
        (entry): entry is { slug: string; label: string } => entry !== null
      );
  };

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
                  const normalizedRole = normalizeString(figure.role ?? "");
                  const roleType = getRoleType(figure.role);
                  const isLegend = roleType === "legend";
                  const isMercenary = normalizedRole.includes("mercen");
                  const record = figure as Record<string, unknown>;
                  const legendStartingSkills = isLegend
                    ? extractStartingEntries(
                        record["legendStartingSkills"] ??
                          record["startingSkills"] ??
                          [],
                        ["skillSlug", "slug", "startingSkillSlug"],
                        ["name", "skillName", "label", "title"]
                      )
                    : [];
                  const legendStartingSpells = isLegend
                    ? extractStartingEntries(
                        record["legendStartingSpells"] ??
                          record["startingSpells"] ??
                          [],
                        ["spellSlug", "slug", "startingSpellSlug"],
                        ["name", "spellName", "label", "title"]
                      )
                    : [];
                  const legendStartingEquipment = isLegend
                    ? extractStartingEntries(
                        record["legendStartingEquipment"] ??
                          record["startingEquipment"] ??
                          [],
                        ["equipmentSlug", "slug", "startingEquipmentSlug"],
                        ["name", "equipmentName", "label", "title"]
                      )
                    : [];
                  const mercenaryStartingEquipment = isMercenary
                    ? extractStartingEntries(
                        record["mercenaryStartingEquipment"] ??
                          record["startingEquipment"] ??
                          [],
                        ["equipmentSlug", "slug", "startingEquipmentSlug"],
                        ["name", "equipmentName", "label", "title"]
                      )
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
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                            <span className="uppercase text-green-400">
                              {figure.role}
                            </span>
                            {" · "}
                            <span>{formatCrownsValue(figure.cost)}</span>
                            {figure.upkeep != null &&
                            Number(figure.upkeep) !== 0 ? (
                              <span className="text-amber-200">
                                Manutenção: {formatCrownsValue(figure.upkeep)}
                              </span>
                            ) : null}
                            {figure.quality != null &&
                            Number(figure.quality) !== 0 ? (
                              <span className="ml-2 text-green-300">
                                Qualidade: {String(figure.quality)}
                              </span>
                            ) : null}
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

                      {(() => {
                        const normalizedRole = normalizeString(
                          figure.role ?? ""
                        );
                        const isLeaderFigure =
                          normalizedRole.includes("lider") ||
                          normalizedRole.includes("leader");
                        const rawCost = figure.cost as unknown;
                        const numericCost = (() => {
                          if (typeof rawCost === "number") return rawCost;
                          if (typeof rawCost === "string") {
                            const parsed = Number(
                              rawCost
                                .replace(/[^\d.,-]/g, "")
                                .replace(",", ".")
                            );
                            return Number.isFinite(parsed) ? parsed : null;
                          }
                          return null;
                        })();
                        const canAfford =
                          numericCost === null ||
                          numericCost < 0 ||
                          warbandCrowns === null ||
                          warbandCrowns >= numericCost;
                        let disabledReason: string | null = null;
                        if (hasLeader && isLeaderFigure) {
                          disabledReason =
                            "Já existe um líder neste bando.";
                        } else if (!canAfford) {
                          disabledReason =
                            "Coroas insuficientes para contratar esta figura.";
                        }
                        const isAdding = addingFigureSlug === figure.slug;
                        const buttonDisabled =
                          isAdding || !warbandId || Boolean(disabledReason);
                        const buttonElement = (
                          <button
                            type="button"
                            onClick={() =>
                              onAddFigure(figure.slug, figure.name)
                            }
                            disabled={buttonDisabled}
                            className="inline-flex w-full items-center justify-center gap-2 rounded border border-green-500/60 bg-green-900/20 px-3 py-2 text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {isAdding ? "Adicionando..." : "Adicionar ao bando"}
                          </button>
                        );

                        if (disabledReason && !isAdding) {
                          return (
                            <Tooltip title={disabledReason} placement="top" arrow>
                              <span className="mt-3 block">{buttonElement}</span>
                            </Tooltip>
                          );
                        }

                        return (
                          <div className="mt-3">{buttonElement}</div>
                        );
                      })()}

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

                          {(() => {
                            const skillLists = Array.isArray(figure.skillLists)
                              ? figure.skillLists
                              : [];
                            const spellLores = Array.isArray(figure.spellLores)
                              ? figure.spellLores
                              : [];
                            const showKnowledgeRow =
                              skillLists.length > 0 || spellLores.length > 0;

                            if (!showKnowledgeRow) {
                              return null;
                            }

                          return (
                            <div className="mt-3 space-y-2 text-[11px]">
                              {skillLists.length > 0 ? (
                                <div>
                                  <p className="mb-1 uppercase font-semibold tracking-wide text-green-300">
                                    Listas de Habilidade
                                  </p>
                                  <div className="flex flex-wrap items-center gap-2">
                                    {skillLists.map((skillList, index) => {
                                      const slug =
                                        (skillList as {
                                          slug?: string;
                                          skillListSlug?: string;
                                        })?.slug ??
                                        (skillList as {
                                          slug?: string;
                                          skillListSlug?: string;
                                        })?.skillListSlug ??
                                        null;
                                      const label = getSkillListLabel(skillList);
                                      return (
                                        <button
                                          key={
                                            skillList.id ??
                                            `${figure.id}-skill-${index}`
                                          }
                                          type="button"
                                          onClick={event => {
                                            event.stopPropagation();
                                            if (slug) {
                                              onOpenSkillsDialog?.(
                                                figure.name,
                                                slug
                                              );
                                            }
                                          }}
                                          className="rounded-full border border-green-500/40 bg-green-900/30 px-2 py-1 text-xs text-green-100 transition hover:border-green-400 hover:bg-green-900/50"
                                        >
                                          {label}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : null}
                              {spellLores.length > 0 ? (
                                <div>
                                  <p className="mb-1 uppercase font-semibold tracking-wide text-blue-300">
                                    Tradições Mágicas
                                  </p>
                                  <div className="flex flex-wrap items-center gap-2">
                                    {spellLores.map((spellLore, index) => {
                                      const slug =
                                        (spellLore as {
                                          slug?: string;
                                          spellLoreSlug?: string;
                                        })?.slug ??
                                        (spellLore as {
                                          slug?: string;
                                          spellLoreSlug?: string;
                                        })?.spellLoreSlug ??
                                        null;
                                      const label = getSpellLoreLabel(spellLore);
                                      return (
                                        <button
                                          key={
                                            spellLore.id ??
                                            `${figure.id}-spell-${index}`
                                          }
                                          type="button"
                                          onClick={event => {
                                            event.stopPropagation();
                                            if (slug) {
                                              onOpenSpellsDialog?.(
                                                figure.name,
                                                slug
                                              );
                                            }
                                          }}
                                          className="rounded-full border border-blue-600/40 bg-blue-900/30 px-2 py-1 text-xs text-blue-200 transition hover:border-blue-400 hover:bg-blue-900/50"
                                        >
                                          {label}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                                ) : null}
                              </div>
                            );
                          })()}

                          {isLegend && legendStartingSkills.length > 0 ? (
                            <div className="space-y-2 text-[11px]">
                              <p className="mb-1 uppercase font-semibold tracking-wide text-green-300">
                                Habilidades Iniciais (Lenda)
                              </p>
                              <div className="flex flex-wrap items-center gap-2">
                                {legendStartingSkills.map(entry => (
                                  <button
                                    key={`${figure.id}-legend-skill-${entry.slug}`}
                                    type="button"
                                    onClick={event => {
                                      event.stopPropagation();
                                      onOpenStartingSkill?.(
                                        figure.name,
                                        entry.slug
                                      );
                                    }}
                                    className="rounded-full border border-green-500/40 bg-green-900/30 px-2 py-1 text-xs text-green-100 transition hover:border-green-400 hover:bg-green-900/50"
                                  >
                                    {entry.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          {isLegend && legendStartingSpells.length > 0 ? (
                            <div className="space-y-2 text-[11px]">
                              <p className="mb-1 uppercase font-semibold tracking-wide text-blue-300">
                                Magias Iniciais (Lenda)
                              </p>
                              <div className="flex flex-wrap items-center gap-2">
                                {legendStartingSpells.map(entry => (
                                  <button
                                    key={`${figure.id}-legend-spell-${entry.slug}`}
                                    type="button"
                                    onClick={event => {
                                      event.stopPropagation();
                                      onOpenStartingSpell?.(
                                        figure.name,
                                        entry.slug
                                      );
                                    }}
                                    className="rounded-full border border-blue-600/40 bg-blue-900/30 px-2 py-1 text-xs text-blue-200 transition hover:border-blue-400 hover:bg-blue-900/50"
                                  >
                                    {entry.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          {isLegend && legendStartingEquipment.length > 0 ? (
                            <div className="space-y-2 text-[11px]">
                              <p className="mb-1 uppercase font-semibold tracking-wide text-amber-300">
                                Equipamentos Iniciais (Lenda)
                              </p>
                              <div className="flex flex-wrap items-center gap-2">
                                {legendStartingEquipment.map(entry => (
                                  <button
                                    key={`${figure.id}-legend-equipment-${entry.slug}`}
                                    type="button"
                                    onClick={event => {
                                      event.stopPropagation();
                                      onOpenStartingEquipment?.(
                                        figure.name,
                                        entry.slug
                                      );
                                    }}
                                    className="rounded-full border border-amber-600/40 bg-amber-900/30 px-2 py-1 text-xs text-amber-200 transition hover:border-amber-400 hover:bg-amber-900/50"
                                  >
                                    {entry.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : null}

                          {isMercenary && mercenaryStartingEquipment.length > 0 ? (
                            <div className="space-y-2 text-[11px]">
                              <p className="mb-1 uppercase font-semibold tracking-wide text-amber-300">
                                Equipamentos Iniciais (Mercenário)
                              </p>
                              <div className="flex flex-wrap items-center gap-2">
                                {mercenaryStartingEquipment.map(entry => (
                                  <button
                                    key={`${figure.id}-merc-equipment-${entry.slug}`}
                                    type="button"
                                    onClick={event => {
                                      event.stopPropagation();
                                      onOpenStartingEquipment?.(
                                        figure.name,
                                        entry.slug
                                      );
                                    }}
                                    className="rounded-full border border-amber-600/40 bg-amber-900/30 px-2 py-1 text-xs text-amber-200 transition hover:border-amber-400 hover:bg-amber-900/50"
                                  >
                                    {entry.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : null}

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
    </SectionCard>
  );
};

