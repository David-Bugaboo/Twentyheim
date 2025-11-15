import React, { useMemo } from "react";
import type { SkillToWarbandSoldier } from "../../../../types/skill-to-warband-soldier.entity";
import { CollapsibleSection } from "./CollapsibleSection";
import { useSkillsManagement } from "../hooks/useSkillsManagement";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { ExtraSkillListToWarbandSoldier } from "../../../../types/extra-skill-list-to-warband-soldier.entity";

type SkillsSectionProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  soldierExtraSkillLists: ExtraSkillListToWarbandSoldier[];
  relations: { skills: SkillToWarbandSoldier[] };
  warbandId: string | null;
  onReload: () => Promise<void>;
  skillAdvancementLimit: number;
  currentSkillCount: number;
  isLegend?: boolean;
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  selectedSoldier,
  selectedBaseFigure,
  soldierExtraSkillLists,
  relations,
  warbandId,
  onReload,
  skillAdvancementLimit: _skillAdvancementLimit,
  currentSkillCount: _currentSkillCount,
  isLegend = false,
}) => {
  const {
    expanded,
    setExpanded,
    availableOptions,
    loading,
    error,
    selectedSlugToAdd,
    setSelectedSlugToAdd,
    actionState,
    handleAdd,
    handleRemove,
  } = useSkillsManagement({
    selectedSoldier,
    selectedBaseFigure,
    soldierExtraSkillLists,
    relations,
    warbandId,
    onReload,
  });

  const hasContent = useMemo(() => {
    return relations.skills.length > 0 || availableOptions.length > 0;
  }, [relations.skills, availableOptions]);

  if (!hasContent && !loading) {
    return null;
  }

  return (
    <CollapsibleSection
      title="Habilidades"
      expanded={expanded}
      onToggle={() => setExpanded(prev => !prev)}
    >
      <div className="flex flex-col gap-2 md:flex-row">
        <select
          value={selectedSlugToAdd}
          onChange={event => setSelectedSlugToAdd(event.target.value)}
          disabled={loading || availableOptions.length === 0}
          className="w-full rounded border border-green-700 bg-[#0c0f0d] px-3 py-2 text-sm text-gray-200 outline-none transition focus:border-green-400 md:max-w-xs"
        >
          <option value="">-- Escolha uma habilidade --</option>
          {availableOptions.map(option => (
            <option key={option.slug} value={option.slug}>
              {option.name}
              {option.listName ? ` — ${option.listName}` : ""}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAdd}
          disabled={
            !selectedSlugToAdd || loading || actionState?.type === "add"
          }
          className="inline-flex items-center justify-center rounded border border-green-600/60 bg-green-900/20 px-3 py-2 text-sm font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {actionState?.type === "add" ? "Adicionando..." : "Adicionar"}
        </button>
      </div>

      {loading ? (
        <p className="text-[11px] text-gray-400">
          Carregando habilidades disponíveis...
        </p>
      ) : null}

      {error ? <p className="text-[11px] text-red-300">{error}</p> : null}

      {!loading && error == null && availableOptions.length === 0 ? (
        <p className="text-[11px] text-gray-500">
          Nenhuma habilidade disponível para adicionar.
        </p>
      ) : null}

      {relations.skills.length === 0 ? (
        <p className="text-[11px] text-gray-500">
          Nenhuma habilidade registrada.
        </p>
      ) : (
        <ul className="space-y-2">
          {relations.skills.map(skill => {
            const skillName =
              skill.skill?.name ?? skill.skillSlug ?? "Habilidade";
            const skillDescription = skill.skill?.description ?? null;
            const removing =
              actionState?.type === "remove" &&
              actionState.targetId === skill.id;

            return (
              <li
                key={skill.id}
                className="rounded border border-green-800/40 bg-[#101010] p-3"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="text-sm font-semibold text-green-200">
                      {skillName}
                    </div>
                    {skillDescription ? (
                      <div className="mt-1 text-[11px] text-gray-400">
                        {skillDescription}
                      </div>
                    ) : null}
                  </div>
                  {!isLegend ? (
                    <div className="flex flex-col gap-2 border-t border-green-900/40 pt-3">
                      <button
                        type="button"
                        onClick={() => handleRemove(skill.id, skillName)}
                        disabled={removing}
                        className="inline-flex w-full items-center justify-center rounded border border-red-600/60 bg-red-900/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-red-200 transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {removing ? "Removendo..." : "Remover"}
                      </button>
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </CollapsibleSection>
  );
};
