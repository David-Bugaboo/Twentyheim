import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DiceD20Icon } from "./DiceD20Icon";
import type { InjuryRollResult } from "../utils/injury-roll";

type InjuryRollDialogProps = {
  open: boolean;
  onClose: () => void;
  rollResult: InjuryRollResult | null;
  onSelectOption: (slug: string) => Promise<void>;
  onKill: () => Promise<void>;
  onReroll: () => void;
  selecting: boolean;
  killing: boolean;
  rolling: boolean;
};

export const InjuryRollDialog: React.FC<InjuryRollDialogProps> = ({
  open,
  onClose,
  rollResult,
  onSelectOption,
  onKill,
  onReroll,
  selecting,
  killing,
  rolling,
}) => {
  const isDeath = rollResult?.result.type === "death";
  const canAddInjury =
    rollResult?.result.type === "injury" && rollResult.result.injurySlug;
  const hasSubRollInjury =
    rollResult?.subRoll && rollResult.subRoll.injurySlug;

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
        Resultado do Ferimento
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
                  Rolagem Principal
                </div>
                <div className="text-3xl font-bold text-red-200">
                  {rollResult.roll}
                </div>
              </div>
            </div>

            <div className="rounded border border-red-800/40 bg-[#101010] p-4">
              <div className="text-sm font-semibold text-red-200 mb-2">
                {rollResult.result.name}
              </div>
              <div className="text-xs text-gray-400 whitespace-pre-line">
                {rollResult.result.description}
              </div>
            </div>

            {rollResult.subRoll ? (
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 rounded border border-red-800/40 bg-[#101010] p-4">
                  <DiceD20Icon size={32} className="text-red-200" />
                  <div className="text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-wide">
                      Sub-Rolagem
                    </div>
                    <div className="text-2xl font-bold text-red-200">
                      {rollResult.subRoll.roll}
                    </div>
                  </div>
                </div>

                <div className="rounded border border-red-800/40 bg-[#101010] p-4">
                  <div className="text-sm font-semibold text-red-200 mb-2">
                    {rollResult.subRoll.name}
                  </div>
                  <div className="text-xs text-gray-400 whitespace-pre-line">
                    {rollResult.subRoll.description}
                  </div>
                </div>
              </div>
            ) : null}

            {canAddInjury ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-300 text-center">
                  Adicionar este ferimento à figura?
                </p>
                <button
                  type="button"
                  onClick={() =>
                    void onSelectOption(rollResult.result.injurySlug!)
                  }
                  disabled={selecting}
                  className="w-full rounded border border-red-600/60 bg-red-900/20 p-4 text-left transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-red-200">
                        Adicionar Ferimento
                      </div>
                    </div>
                    {selecting ? (
                      <div className="text-xs text-gray-500">Adicionando...</div>
                    ) : null}
                  </div>
                </button>
              </div>
            ) : hasSubRollInjury ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-300 text-center">
                  Adicionar este ferimento à figura?
                </p>
                <button
                  type="button"
                  onClick={() =>
                    void onSelectOption(rollResult.subRoll!.injurySlug!)
                  }
                  disabled={selecting}
                  className="w-full rounded border border-red-600/60 bg-red-900/20 p-4 text-left transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-red-200">
                        Adicionar Ferimento
                      </div>
                    </div>
                    {selecting ? (
                      <div className="text-xs text-gray-500">Adicionando...</div>
                    ) : null}
                  </div>
                </button>
              </div>
            ) : null}

            {isDeath ? (
              <div className="space-y-3">
                <p className="text-sm text-red-300 text-center font-semibold">
                  A figura está morta!
                </p>
                <button
                  type="button"
                  onClick={() => void onKill()}
                  disabled={killing}
                  className="w-full rounded border border-red-600/60 bg-red-900/20 p-4 text-left transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-red-200">
                        Matar Figura
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Remove a figura do bando permanentemente
                      </div>
                    </div>
                    {killing ? (
                      <div className="text-xs text-gray-500">Matando...</div>
                    ) : null}
                  </div>
                </button>
              </div>
            ) : null}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onReroll}
                disabled={selecting || killing}
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

