import React, { useMemo } from "react";
import type { AdvancementToWarbandSoldier } from "../../../../types/advancement-to-warband-soldier.entity";
import { CollapsibleSection } from "./CollapsibleSection";
import { AdvancementRollDialog } from "./AdvancementRollDialog";
import { DiceD20Icon } from "./DiceD20Icon";
import { useAdvancementsManagement } from "../hooks/useAdvancementsManagement";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import { updateSoldier } from "../../../../services/soldiers.service";
import { toast } from "react-toastify";

type AdvancementsSectionProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  relations: { advancements: AdvancementToWarbandSoldier[] };
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const AdvancementsSection: React.FC<AdvancementsSectionProps> = ({
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
    rollDialogOpen,
    rollResult,
    rolling,
    handleSelectOption,
    handleReroll,
    handleCloseDialog,
  } = useAdvancementsManagement({
    selectedSoldier,
    selectedBaseFigure,
    warbandId,
    onReload,
  });

  const parseXpValue = (value: unknown): number | null => {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) return null;
      const normalized = trimmed.replace(",", ".");
      const parsed = Number(normalized);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
      const parsedInt = parseInt(normalized, 10);
      if (!Number.isNaN(parsedInt)) {
        return parsedInt;
      }
    }
    return null;
  };

  const experienceValue =
    parseXpValue(selectedSoldier?.experience) ?? 0;
  const startingExperienceValue =
    parseXpValue(selectedBaseFigure?.startingXp ?? null);
  const [experiencePreview, setExperiencePreview] = React.useState(experienceValue);
  const [savingExperience, setSavingExperience] = React.useState(false);

  React.useEffect(() => {
    setExperiencePreview(experienceValue);
  }, [experienceValue]);

  

  const handleChangeExperience = React.useCallback((value: number) => {
    setExperiencePreview(Math.max(0, value));
  }, []);

  const handleSaveExperience = React.useCallback(async () => {
    if (!selectedSoldier?.id) return;
    try {
      setSavingExperience(true);
      await updateSoldier(selectedSoldier.id, {
        experience: experiencePreview,
      });
      toast.success("Experiência atualizada.");
      await onReload();
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível atualizar a experiência.");
      setExperiencePreview(experienceValue);
    } finally {
      setSavingExperience(false);
    }
  }, [experiencePreview, experienceValue, onReload, selectedSoldier?.id]);

  const trackerConfig = useMemo(() => {
    const effectiveRole =
      selectedSoldier?.effectiveRole ??
      selectedBaseFigure?.role ??
      "";
    const normalizedRole = String(effectiveRole).toLowerCase();
    const baseCount = (() => {
      if (normalizedRole.includes("líder") || normalizedRole.includes("lider")) {
        return 90;
      }
      if (normalizedRole.includes("herói") || normalizedRole.includes("heroi")) {
        return 90;
      }
      if (normalizedRole.includes("mercenario") || normalizedRole.includes("mercenário")) {
        return 14;
      }
      if (normalizedRole.includes("soldado")) {
        return 14;
      }
      return 30;
    })();
    const isLargeTrack =
      normalizedRole.includes("líder") ||
      normalizedRole.includes("lider") ||
      normalizedRole.includes("herói") ||
      normalizedRole.includes("heroi");
    const columns = isLargeTrack ? 15 : Math.min(baseCount, 14);
    const baseHighlightsLarge = new Set([
      2, 4, 6, 8, 11, 14, 17, 20, 24, 28, 32, 26, 41, 46, 51, 57, 63, 69, 76, 83,
      90,
    ]);
    const baseHighlightsSmall = new Set([2, 5, 9, 14]);
    const boxes = Array.from({ length: baseCount }, (_, index) => index + 1);
    const highlights = isLargeTrack ? baseHighlightsLarge : baseHighlightsSmall;
    return {
      base: baseCount,
      boxes,
      columns,
      highlights,
      maxValue: isLargeTrack ? 90 : baseCount,
    };
  }, [selectedSoldier?.effectiveRole, selectedBaseFigure?.role]);

  const advancementCount = relations.advancements.length;

  return (
    <>
      <CollapsibleSection
        title="Experiência & Avanços"
        expanded={expanded}
        onToggle={() => setExpanded(prev => !prev)}
      >
        <div className="space-y-4">
          <div className="rounded border border-green-800/40 bg-[#0d1610] p-3">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-green-300/80">
                  Experiência Atual
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleChangeExperience(experiencePreview - 1)}
                      disabled={
                        savingExperience ||
                        !selectedSoldier ||
                        experiencePreview <= 0
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-green-700 bg-[#0a120d] text-center text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      −
                    </button>
                    <span className="min-w-[3.5rem] text-center text-lg font-semibold text-green-100">
                      {experiencePreview}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleChangeExperience(experiencePreview + 1)}
                      disabled={
                        savingExperience ||
                        !selectedSoldier ||
                        experiencePreview >= trackerConfig.maxValue
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-green-700 bg-[#0a120d] text-center text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveExperience}
                      disabled={savingExperience || !selectedSoldier}
                      className="rounded border border-green-600/60 bg-green-900/30 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-400 hover:bg-green-900/50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {savingExperience ? "Salvando..." : "Salvar"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-gray-400">
                {startingExperienceValue != null ? (
                  <div>
                    XP Inicial:{" "}
                    <span className="font-semibold text-green-200">
                      {startingExperienceValue}
                    </span>
                  </div>
                ) : null}
                <div>
                  Avanços Registrados:{" "}
                  <span className="font-semibold text-green-200">
                    {advancementCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${trackerConfig.columns}, minmax(0, 1fr))`,
                }}
              >
                {trackerConfig.boxes.map(value => {
                  const filled = value <= experiencePreview;
                  const highlight = trackerConfig.highlights.has(value);
                  const baseClasses =
                    "h-4 w-4 rounded-sm border transition duration-150 ease-out";
                  if (filled) {
                    return (
                      <div
                        key={`xp-box-${value}`}
                        className={`${baseClasses} ${
                          highlight
                            ? "border-emerald-500 bg-emerald-500/70 shadow-[0_0_0_1px_rgba(34,197,94,0.35)]"
                            : "border-slate-400 bg-slate-200"
                        }`}
                      />
                    );
                  }
                  return (
                    <div
                      key={`xp-box-${value}`}
                      className={`${baseClasses} border-slate-700/60 bg-white/10`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleRoll}
              disabled={loading || !selectedSoldier}
              className="inline-flex items-center justify-center gap-2 rounded border border-green-600/60 bg-green-900/20 px-4 py-2 text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <DiceD20Icon size={20} className="text-green-200" />
              <span>Rolar Avanço</span>
            </button>

            {loading ? (
              <p className="text-[11px] text-gray-400">
                Carregando avanços disponíveis...
              </p>
            ) : null}

            {error ? (
              <p className="text-[11px] text-red-300">{error}</p>
            ) : null}
          </div>

          {relations.advancements.length === 0 ? (
            <p className="mt-3 text-[11px] text-gray-500">
              Nenhum avanço registrado.
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {relations.advancements.map(advancement => {
                const advancementName =
                  advancement.advancement?.name ??
                  advancement.advancementSlug ??
                  "Avanço";
                const advancementDescription =
                  advancement.advancement?.description ?? null;
                const removing =
                  actionState?.type === "remove" &&
                  actionState.targetId === advancement.id;

                return (
                  <li
                    key={advancement.id}
                    className="rounded border border-green-800/40 bg-[#101010] p-3"
                  >
                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="text-sm font-semibold text-green-200">
                          {advancementName}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Slug: {advancement.advancementSlug ?? "—"}
                        </div>
                        {advancementDescription ? (
                          <div className="mt-1 text-[11px] text-gray-400">
                            {advancementDescription}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-2 border-t border-green-900/40 pt-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleRemove(advancement.id, advancementName)
                          }
                          disabled={removing}
                          className="inline-flex w-full items-center justify-center rounded border border-red-600/60 bg-red-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-red-200 transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {removing ? "Removendo..." : "Remover"}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CollapsibleSection>

      <AdvancementRollDialog
        open={rollDialogOpen}
        onClose={handleCloseDialog}
        rollResult={rollResult}
        onSelectOption={handleSelectOption}
        onReroll={handleReroll}
        selecting={actionState?.type === "add" || false}
        rolling={rolling}
      />
    </>
  );
};
