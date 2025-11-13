import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Spinner } from "./CommonComponents";
import type { SpellLoreDialogEntry } from "../types";

type SpellsDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  loading: boolean;
  error: string | null;
  lores: SpellLoreDialogEntry[];
  selectedSlug: string;
  onSelectSlug: (slug: string) => void;
};

export const SpellsDialog: React.FC<SpellsDialogProps> = ({
  open,
  onClose,
  title,
  loading,
  error,
  lores,
  selectedSlug,
  onSelectSlug,
}) => {
  const selectedLore = lores.find(entry => entry.slug === selectedSlug) ?? lores[0] ?? null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#111",
          border: "1px solid rgba(134, 239, 172, 0.3)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#86efac",
          fontFamily: '"Cinzel", serif',
        }}
      >
        {title}
        <IconButton
          size="small"
          onClick={onClose}
          sx={{ color: "#86efac" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ borderColor: "rgba(134, 239, 172, 0.2)", color: "#e4e4e7" }}
      >
        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner label="Carregando magias..." />
          </div>
        ) : (
          <div className="space-y-4">
            {error ? (
              <div className="text-xs text-red-300">{error}</div>
            ) : null}
            {lores.length === 0 ? (
              <div className="text-xs text-gray-400">
                Nenhuma magia registrada.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {lores.map(entry => {
                    const isActive = entry.slug === selectedSlug;
                    return (
                      <button
                        key={entry.slug}
                        type="button"
                        onClick={() => onSelectSlug(entry.slug)}
                        className={`inline-flex items-center justify-center rounded border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition ${
                          isActive
                            ? "border-green-500 bg-green-900/30 text-green-200"
                            : "border-green-800/60 bg-[#0b0e0c] text-green-300 hover:border-green-500 hover:bg-green-900/20"
                        }`}
                      >
                        {entry.name}
                      </button>
                    );
                  })}
                </div>

                {selectedLore ? (
                  <div className="space-y-2">
                    <div className="rounded border border-green-800/40 bg-[#101010] p-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-lg font-semibold text-green-200">
                            {selectedLore.name}
                          </h3>
                          <span className="text-xs uppercase text-green-400">
                            {selectedLore.slug}
                          </span>
                        </div>
                        <div className="text-xs text-gray-300">
                          {selectedLore.description}
                        </div>
                        <div className="space-y-1">
                          {selectedLore.spells.length === 0 ? (
                            <div className="rounded border border-green-800/30 bg-[#101010] p-2 text-[11px] text-gray-300">
                              Nenhuma magia cadastrada nesta lista.
                            </div>
                          ) : (
                            selectedLore.spells.map(spell => (
                              <div
                                key={
                                  spell.slug ??
                                  `${selectedLore.slug}-${spell.name}`
                                }
                                className="rounded border border-green-800/40 bg-[#101010] p-2"
                              >
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h4 className="text-md font-semibold text-green-200">
                                      {spell.name}
                                    </h4>
                                    <span className="text-xs uppercase text-green-400">
                                      {spell.slug}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-300">
                                    {spell.description}
                                  </div>
                                  {typeof spell.difficultyClass === "number" ? (
                                    <div className="text-[11px] text-blue-300">
                                      Dificuldade: {spell.difficultyClass}
                                    </div>
                                  ) : null}
                                  {Array.isArray(spell.keywords) &&
                                  spell.keywords.length > 0 ? (
                                    <div className="text-[11px] text-blue-200">
                                      Palavras-chave: {spell.keywords.join(", ")}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded border border-green-800/30 bg-[#101010] p-2 text-[11px] text-gray-300">
                    Selecione uma tradição para visualizar suas magias.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

