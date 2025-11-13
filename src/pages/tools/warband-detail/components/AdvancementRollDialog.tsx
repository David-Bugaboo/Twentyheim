import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DiceD20Icon } from "./DiceD20Icon";
import type { AdvancementRollResult } from "../utils/advancement-roll";

type AdvancementRollDialogProps = {
  open: boolean;
  onClose: () => void;
  rollResult: AdvancementRollResult | null;
  onSelectOption: (slug: string) => Promise<void>;
  onReroll: () => void;
  selecting: boolean;
  rolling: boolean;
};

export const AdvancementRollDialog: React.FC<AdvancementRollDialogProps> = ({
  open,
  onClose,
  rollResult,
  onSelectOption,
  onReroll,
  selecting,
  rolling,
}) => {
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
        Resultado do Avanço
        <IconButton size="small" onClick={onClose} sx={{ color: "#86efac" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ borderColor: "rgba(134, 239, 172, 0.2)", color: "#e4e4e7" }}
      >
        {rolling ? (
          <div className="flex flex-col items-center justify-center py-8">
            <DiceD20Icon size={96} className="text-green-200 mb-4 animate-spin" />
            <p className="text-sm text-gray-400">Rolando dado...</p>
          </div>
        ) : rollResult ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 rounded border border-green-800/40 bg-[#101010] p-4">
              <DiceD20Icon size={48} className="text-green-200" />
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                  Rolagem
                </div>
                <div className="text-3xl font-bold text-green-200">
                  {rollResult.roll}
                </div>
              </div>
            </div>

            {rollResult.options.length === 0 ? (
              <div className="rounded border border-yellow-800/40 bg-yellow-900/10 p-4 text-center text-sm text-yellow-200">
                Nenhuma opção disponível para este resultado.
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-300 text-center">
                  Escolha uma das opções abaixo:
                </p>
                {rollResult.options.map((option, index) => (
                  <button
                    key={`${option.slug}-${index}`}
                    type="button"
                    onClick={() => void onSelectOption(option.slug)}
                    disabled={selecting}
                    className="w-full rounded border border-green-800/40 bg-[#101010] p-4 text-left transition hover:border-green-500 hover:bg-green-900/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-green-200">
                          {option.name}
                        </div>
                        {option.description ? (
                          <div className="mt-1 text-xs text-gray-400">
                            {option.description}
                          </div>
                        ) : null}
                      </div>
                      {selecting ? (
                        <div className="text-xs text-gray-500">Adicionando...</div>
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onReroll}
                disabled={selecting}
                className="inline-flex items-center justify-center rounded border border-blue-600/60 bg-blue-900/20 px-4 py-2 text-xs font-semibold text-blue-200 transition hover:border-blue-400 hover:bg-blue-900/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Re-rolar
              </button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

