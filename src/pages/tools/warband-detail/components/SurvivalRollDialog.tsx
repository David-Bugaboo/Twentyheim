import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DiceD20Icon } from "./DiceD20Icon";
import type { SurvivalRollResult } from "../utils/survival-roll";

type SurvivalRollDialogProps = {
  open: boolean;
  onClose: () => void;
  rollResult: SurvivalRollResult | null;
  onKill: () => Promise<void>;
  onReroll: () => void;
  killing: boolean;
  rolling: boolean;
};

export const SurvivalRollDialog: React.FC<SurvivalRollDialogProps> = ({
  open,
  onClose,
  rollResult,
  onKill,
  onReroll,
  killing,
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
          border: "1px solid rgba(239, 68, 68, 0.3)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#ef4444",
          fontFamily: '"Cinzel", serif',
        }}
      >
        Resultado da Rolagem de Sobrevivência
        <IconButton size="small" onClick={onClose} sx={{ color: "#ef4444" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ borderColor: "rgba(239, 68, 68, 0.2)", color: "#e4e4e7" }}
      >
        {rolling ? (
          <div className="flex flex-col items-center justify-center py-8">
            <DiceD20Icon size={96} className="text-red-200 mb-4 animate-spin" />
            <p className="text-sm text-gray-400">Rolando dado...</p>
          </div>
        ) : rollResult ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 rounded border border-red-800/40 bg-[#101010] p-4">
              <DiceD20Icon size={48} className="text-red-200" />
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wide">
                  Rolagem
                </div>
                <div className="text-3xl font-bold text-red-200">
                  {rollResult.roll}
                </div>
              </div>
            </div>

            {rollResult.isDead ? (
              <div className="space-y-3">
                <div className="rounded border border-red-800/40 bg-[#101010] p-4">
                  <div className="text-sm font-semibold text-red-200 mb-2">
                    O soldado morreu!
                  </div>
                  <div className="text-xs text-gray-400">
                    Em um resultado de 1-6, o soldado morre e todos os seus
                    equipamentos são perdidos.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => void onKill()}
                  disabled={killing}
                  className="w-full rounded border border-red-600/60 bg-red-900/20 p-4 text-left transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-red-200">
                        Matar Soldado
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Remove o soldado do bando permanentemente
                      </div>
                    </div>
                    {killing ? (
                      <div className="text-xs text-gray-500">Matando...</div>
                    ) : null}
                  </div>
                </button>
              </div>
            ) : (
              <div className="rounded border border-green-800/40 bg-[#101010] p-4">
                <div className="text-sm font-semibold text-green-200 mb-2">
                  O soldado está bem!
                </div>
                <div className="text-xs text-gray-400">
                  Em qualquer outra rolagem ele está bem e pode ser usado no
                  próximo jogo.
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onReroll}
                disabled={killing}
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

