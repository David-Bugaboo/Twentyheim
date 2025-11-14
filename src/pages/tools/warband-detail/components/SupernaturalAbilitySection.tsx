import React from "react";
import type { SuperNaturalAbilityToWarbandSoldier } from "../../../../types/super-natural-ability-to-warband-soldier.entity";
import type { SkillToWarbandSoldier } from "../../../../types/skill-to-warband-soldier.entity";
import { CollapsibleSection } from "./CollapsibleSection";
import { useSupernaturalAbilityManagement } from "../hooks/useSupernaturalAbilityManagement";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import { formatCrownsValue } from "../utils/helpers";

type SupernaturalAbilitySectionProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  relations: {
    skills: SkillToWarbandSoldier[];
    supernatural: SuperNaturalAbilityToWarbandSoldier[];
  };
  category: "Mutação" | "Marca Sagrada" | "Benção de Nurgle";
  canGetFlag: "canGetMutations" | "canGetSacredMarks" | "canGetBlessings";
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const SupernaturalAbilitySection: React.FC<SupernaturalAbilitySectionProps> = ({
  selectedSoldier,
  selectedBaseFigure,
  relations,
  category,
  canGetFlag,
  warbandId,
  onReload,
}) => {
  const {
    expanded,
    setExpanded,
    loading,
    error,
    selectedSlugToAdd,
    setSelectedSlugToAdd,
    actionState,
    handleAdd,
    handleRemove,
    allAbilities,
    filteredSupernatural,
    hasAccess,
  } = useSupernaturalAbilityManagement({
    selectedSoldier,
    selectedBaseFigure,
    relations,
    category,
    canGetFlag,
    warbandId,
    onReload,
  });

  const formatCost = (value?: string | number | null): string | null => {
    if (value === null || value === undefined || value === "") {
      return null;
    }
    const formatted = formatCrownsValue(value);
    return formatted === "-" ? null : formatted;
  };

  if (!hasAccess) {
    return null;
  }

  return (
    <CollapsibleSection
      title={category}
      expanded={expanded}
      onToggle={() => setExpanded(prev => !prev)}
    >
      <div className="flex flex-col gap-2 md:flex-row">
        <select
          value={selectedSlugToAdd}
          onChange={event => setSelectedSlugToAdd(event.target.value)}
          disabled={loading || allAbilities.length === 0}
          className="w-full rounded border border-green-700 bg-[#0c0f0d] px-3 py-2 text-sm text-gray-200 outline-none transition focus:border-green-400 md:max-w-xs"
        >
          <option value="">-- Escolha uma {category.toLowerCase()} --</option>
          {allAbilities.map(ability => {
            const formattedCost = formatCost(ability.cost);
            return (
              <option key={ability.slug} value={ability.slug}>
                {formattedCost
                  ? `${ability.name} — ${formattedCost}`
                  : ability.name}
              </option>
            );
          })}
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
          Carregando {category.toLowerCase()} disponíveis...
        </p>
      ) : null}

      {error ? (
        <p className="text-[11px] text-red-300">{error}</p>
      ) : null}

      {!loading && error == null && allAbilities.length === 0 ? (
        <p className="text-[11px] text-gray-500">
          Nenhuma {category.toLowerCase()} disponível para adicionar.
        </p>
      ) : null}

      {filteredSupernatural.length === 0 ? (
        <p className="mt-3 text-[11px] text-gray-500">
          Nenhuma {category.toLowerCase()} registrada.
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {filteredSupernatural.map(ability => {
            const abilityName =
              ability.superNaturalAbility?.name ??
              ability.superNaturalAbilitySlug ??
              category;
            const abilityDescription =
              ability.superNaturalAbility?.description ?? null;
            const abilityCost = ability.superNaturalAbility?.cost ?? null;
            const formattedAbilityCost = formatCost(abilityCost);
            const removing =
              actionState?.type === "remove" &&
              actionState.targetId === ability.id;

            return (
              <li
                key={ability.id}
                className="rounded border border-green-800/40 bg-[#101010] p-3"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="text-sm font-semibold text-green-200">
                      {abilityName}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Slug: {ability.superNaturalAbilitySlug ?? "—"}
                    </div>
                    {formattedAbilityCost ? (
                      <div className="text-[11px] text-gray-400">
                        Custo: {formattedAbilityCost}
                      </div>
                    ) : null}
                    {abilityDescription ? (
                      <div className="mt-1 text-[11px] text-gray-400">
                        {abilityDescription}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-2 border-t border-green-900/40 pt-3">
                    <button
                      type="button"
                      onClick={() => handleRemove(ability.id, abilityName)}
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
    </CollapsibleSection>
  );
};

