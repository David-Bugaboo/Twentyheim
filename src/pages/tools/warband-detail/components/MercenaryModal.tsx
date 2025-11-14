import React, { useMemo, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Chip } from "@mui/material";
import { Spinner, StatRow } from "./CommonComponents";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { Warband } from "../../../../types/warband.entity";
import { FIGURE_STATS } from "../types";
import {
  parseSpecialRules,
  getSkillListLabel,
  getSpellLoreLabel,
  formatCrownsValue,
} from "../utils/helpers";

import { getSupernaturalAccess } from "../utils/supernatural-helpers";

type MercenaryModalProps = {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  mercenaries: BaseFigure[];
  selectedSlug: string;
  onSelectSlug: (slug: string) => void;
  onHire: () => void;
  actionLoading: boolean;
  warband: Warband | null;
};

export const MercenaryModal: React.FC<MercenaryModalProps> = ({
  open,
  onClose,
  loading,
  mercenaries,
  selectedSlug,
  onSelectSlug,
  onHire,
  actionLoading,
}) => {
  // Os mercenários já vêm filtrados do backend
  const availableMercenaries = mercenaries;

  // Atualiza o selectedSlug quando os mercenários disponíveis mudarem
  useEffect(() => {
    if (availableMercenaries.length > 0 && !availableMercenaries.find(m => m.slug === selectedSlug)) {
      onSelectSlug(availableMercenaries[0].slug);
    }
  }, [availableMercenaries, selectedSlug, onSelectSlug]);

  const selectedMercenary = useMemo(
    () =>
      selectedSlug
        ? availableMercenaries.find(m => m.slug === selectedSlug) ?? null
        : null,
    [availableMercenaries, selectedSlug]
  );

  const selectedMercenaryRules = useMemo(
    () =>
      selectedMercenary
        ? parseSpecialRules(selectedMercenary.specialRules)
        : [],
    [selectedMercenary]
  );

  const supernaturalAccess = useMemo(
    () =>
      selectedMercenary
        ? getSupernaturalAccess(selectedMercenary, [])
        : { mutations: false, sacredMarks: false, blessings: false },
    [selectedMercenary]
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#101010",
          border: "1px solid rgba(16, 185, 129, 0.35)",
          color: "#e5e7eb",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#d1fae5",
          fontFamily: '"Cinzel", serif',
          fontSize: "1.1rem",
        }}
      >
        Contratar Mercenário
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "#9ca3af" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: "rgba(16,185,129,0.25)" }}>
        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner label="Carregando mercenários..." />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="mercenary-selector"
                className="text-xs uppercase tracking-wide text-green-300"
              >
                Selecione um mercenário
              </label>
              <select
                id="mercenary-selector"
                value={selectedSlug}
                onChange={event => onSelectSlug(event.target.value)}
                disabled={availableMercenaries.length === 0}
                className="mt-2 w-full rounded border border-green-700 bg-[#0f1010] px-3 py-2 text-sm text-gray-200 outline-none transition focus:border-green-400"
              >
                <option value="" className="text-gray-400">
                  -- Escolha um mercenário --
                </option>
                {availableMercenaries.map(mercenary => (
                  <option key={mercenary.slug} value={mercenary.slug}>
                    {mercenary.name} — {formatCrownsValue(mercenary.cost)}
                    {mercenary.upkeep ? ` (${mercenary.upkeep})` : ""}
                  </option>
                ))}
              </select>
              {availableMercenaries.length === 0 ? (
                <p className="mt-2 text-xs text-yellow-300">
                  Nenhum mercenário disponível para este bando.
                </p>
              ) : null}
            </div>

            {selectedMercenary ? (
              <div className="space-y-3 rounded border border-green-800/40 bg-[#0c0f0d] p-4 text-sm text-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-green-200">
                    {selectedMercenary.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase text-green-400">
                      {selectedMercenary.role}
                    </span>
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

                {selectedMercenary.lore ? (
                  <div className="space-y-1 rounded border border-green-800/30 bg-[#111815] p-3 text-xs text-green-100">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
                      História
                    </p>
                    <p>{selectedMercenary.lore}</p>
                  </div>
                ) : null}

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                  <StatRow
                    label="Custo"
                    value={formatCrownsValue(selectedMercenary.cost)}
                  />
                  <StatRow
                    label="Manutenção"
                    value={selectedMercenary.upkeep ?? "-"}
                  />
                  {FIGURE_STATS.map(stat => {
                    const rawValue = (
                      selectedMercenary as unknown as Record<string, unknown>
                    )[stat.key];
                    const displayValue =
                      rawValue === undefined || rawValue === null
                        ? "-"
                        : String(rawValue);
                    return (
                      <StatRow
                        key={`${selectedMercenary.slug}-${stat.key}`}
                        label={stat.label}
                        value={displayValue}
                      />
                    );
                  })}
                </div>

                {selectedMercenary.avaiability &&
                selectedMercenary.avaiability.length > 0 ? (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-green-300">
                      Disponibilidade
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-green-100">
                      {selectedMercenary.avaiability.map(entry => (
                        <span
                          key={`${selectedMercenary.slug}-av-${entry}`}
                          className="rounded border border-green-700/50 bg-green-900/20 px-2 py-1"
                        >
                          {entry}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {selectedMercenary.exclusions &&
                selectedMercenary.exclusions.length > 0 ? (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-red-300">
                      Restrições
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-red-200">
                      {selectedMercenary.exclusions.map(entry => (
                        <span
                          key={`${selectedMercenary.slug}-ex-${entry}`}
                          className="rounded border border-red-700/50 bg-red-900/20 px-2 py-1"
                        >
                          {entry}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {selectedMercenaryRules.length > 0 ? (
                  <div className="space-y-2 rounded border border-green-800/30 bg-[#101711] p-3 text-xs text-green-100">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
                      Regras Especiais
                    </p>
                    {selectedMercenaryRules.map((entry, index) => (
                      <div
                        key={`${selectedMercenary.slug}-rule-${index}`}
                        className="rounded bg-green-900/20 px-3 py-2 text-[11px]"
                      >
                        <span className="block font-semibold text-green-200">
                          {entry.label}
                        </span>
                        <span className="mt-1 block whitespace-pre-wrap text-green-100">
                          {entry.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded border border-green-800/30 bg-[#0f1310] p-2">
                    <h4 className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-green-300">
                      Listas de Habilidade
                    </h4>
                    {selectedMercenary.skillLists &&
                    selectedMercenary.skillLists.length > 0 ? (
                      <ul className="space-y-1 text-[11px] text-green-100">
                        {selectedMercenary.skillLists.map((skillList, index) => (
                          <li
                            key={
                              skillList.id ??
                              `${selectedMercenary.slug}-skill-${index}`
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
                    {selectedMercenary.spellLores &&
                    selectedMercenary.spellLores.length > 0 ? (
                      <ul className="space-y-1 text-[11px] text-blue-100">
                        {selectedMercenary.spellLores.map((spellLore, index) => (
                          <li
                            key={
                              spellLore.id ??
                              `${selectedMercenary.slug}-spell-${index}`
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
              </div>
            ) : null}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded border border-gray-600/60 bg-[#1a1a1a] px-4 py-2 text-xs font-semibold text-gray-300 transition hover:border-gray-400 hover:bg-[#232323]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={onHire}
                disabled={!selectedMercenary || actionLoading}
                className="inline-flex items-center justify-center rounded border border-green-600/60 bg-green-900/20 px-4 py-2 text-xs font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {actionLoading ? "Contratando..." : "Contratar"}
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

