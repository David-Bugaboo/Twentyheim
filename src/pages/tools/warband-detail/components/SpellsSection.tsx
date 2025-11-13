import React, { useMemo } from "react";
import type { SpellToWarbandSoldier } from "../../../../types/spell-to-warband-soldier.entity";
import { CollapsibleSection } from "./CollapsibleSection";
import { useSpellsManagement } from "../hooks/useSpellsManagement";
import type { WarbandSoldier } from "../../../../types/warband-soldier.entity";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { ExtraSpellLoreToWarbandSoldier } from "../../../../types/extra-spell-lore-to-warband-soldier.entity";

type SpellsSectionProps = {
  selectedSoldier: WarbandSoldier | null;
  selectedBaseFigure: BaseFigure | null;
  soldierExtraSpellLores: ExtraSpellLoreToWarbandSoldier[];
  relations: { spells: SpellToWarbandSoldier[] };
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const SpellsSection: React.FC<SpellsSectionProps> = ({
  selectedSoldier,
  selectedBaseFigure,
  soldierExtraSpellLores,
  relations,
  warbandId,
  onReload,
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
  } = useSpellsManagement({
    selectedSoldier,
    selectedBaseFigure,
    soldierExtraSpellLores,
    relations,
    warbandId,
    onReload,
  });

  const hasContent = useMemo(() => {
    return relations.spells.length > 0 || availableOptions.length > 0;
  }, [relations.spells, availableOptions]);

  if (!hasContent && !loading) {
    return null;
  }

  return (
    <CollapsibleSection
      title="Magias"
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
          <option value="">-- Escolha uma magia --</option>
          {availableOptions.map(option => (
            <option key={option.slug} value={option.slug}>
              {option.name}
              {option.loreName ? ` — ${option.loreName}` : ""}
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
          {actionState?.type === "add" ? "Adicionando..." : "Adicionar magia"}
        </button>
      </div>

      {loading ? (
        <p className="text-[11px] text-gray-400">
          Carregando magias disponíveis...
        </p>
      ) : null}

      {error ? (
        <p className="text-[11px] text-red-300">{error}</p>
      ) : null}

      {!loading && error == null && availableOptions.length === 0 ? (
        <p className="text-[11px] text-gray-500">
          Nenhuma magia disponível para adicionar.
        </p>
      ) : null}

      {relations.spells.length === 0 ? (
        <p className="text-[11px] text-gray-500">
          Nenhuma magia registrada.
        </p>
      ) : (
        <ul className="space-y-2">
          {relations.spells.map(spell => {
            const spellName =
              spell.spell?.name ?? spell.spellSlug ?? "Magia";
            const spellDescription = spell.spell?.description ?? null;
            const difficultyClass = spell.spell?.difficultyClass ?? null;
            const keywords = spell.spell?.keywords ?? null;
            const removing =
              actionState?.type === "remove" &&
              actionState.targetId === spell.id;

            return (
              <li
                key={spell.id}
                className="rounded border border-green-800/40 bg-[#101010] p-3"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-green-200">
                      {spellName}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Slug: {spell.spellSlug ?? "—"}
                    </div>
                    {difficultyClass !== null ? (
                      <div className="text-[11px] text-gray-500">
                        CD: {difficultyClass}
                      </div>
                    ) : null}
                    {keywords && keywords.length > 0 ? (
                      <div className="text-[11px] text-gray-500">
                        Palavras-chave: {keywords.join(", ")}
                      </div>
                    ) : null}
                    {spellDescription ? (
                      <div className="mt-1 text-[11px] text-gray-400">
                        {spellDescription}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleRemove(spell.id, spellName)}
                      disabled={removing}
                      className="inline-flex items-center justify-center rounded border border-red-600/60 bg-red-900/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-red-200 transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
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

