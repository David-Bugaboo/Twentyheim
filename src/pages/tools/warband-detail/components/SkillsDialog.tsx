import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Spinner } from "./CommonComponents";
import type { SkillListDialogEntry } from "../types";

type SkillsDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  loading: boolean;
  error: string | null;
  lists: SkillListDialogEntry[];
  selectedSlug: string;
  onSelectSlug: (slug: string) => void;
};

export const SkillsDialog: React.FC<SkillsDialogProps> = ({
  open,
  onClose,
  title,
  loading,
  error,
  lists,
  selectedSlug,
  onSelectSlug,
}) => {
  const selectedList = lists.find(entry => entry.slug === selectedSlug) ?? lists[0] ?? null;

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
            <Spinner label="Carregando habilidades..." />
          </div>
        ) : (
          <div className="space-y-4">
            {error ? (
              <div className="text-xs text-red-300">{error}</div>
            ) : null}
            {lists.length === 0 ? (
              <div className="text-xs text-gray-400">
                Nenhuma habilidade registrada.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {lists.map(entry => {
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

                {selectedList ? (
                  <div className="space-y-2">
                    <div className="rounded border border-green-800/40 bg-[#101010] p-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-lg font-semibold text-green-200">
                            {selectedList.name}
                          </h3>
                          <span className="text-xs uppercase text-green-400">
                            {selectedList.slug}
                          </span>
                        </div>
                        <div className="text-xs text-gray-300">
                          {selectedList.description}
                        </div>
                        <div className="space-y-1">
                          {selectedList.skills.length === 0 ? (
                            <div className="rounded border border-green-800/30 bg-[#101010] p-2 text-[11px] text-gray-300">
                              Nenhuma habilidade cadastrada nesta lista.
                            </div>
                          ) : (
                            selectedList.skills.map(skill => (
                              <div
                                key={
                                  skill.slug ??
                                  `${selectedList.slug}-${skill.name}`
                                }
                                className="rounded border border-green-800/40 bg-[#101010] p-2"
                              >
                                <div className="flex flex-col gap-2">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h4 className="text-md font-semibold text-green-200">
                                      {skill.name}
                                    </h4>
                                    <span className="text-xs uppercase text-green-400">
                                      {skill.slug}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-300">
                                    {skill.description}
                                  </div>
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
                    Selecione uma lista para visualizar as habilidades.
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

