import React from "react";
import { Dialog, DialogContent, IconButton, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import type { EquipmentSummary } from "../types";
import { formatCrownsValue } from "../utils/helpers";
import GameText from "../../../../components/GameText";

type EquipmentDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  items: EquipmentSummary[];
};

export const EquipmentDialog: React.FC<EquipmentDialogProps> = ({
  open,
  onClose,
  title: _title,
  items,
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
      <DialogContent
        dividers
        sx={{
          borderColor: "rgba(134, 239, 172, 0.2)",
          color: "#e4e4e7",
          position: "relative",
          paddingTop: 3,
        }}
      >
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            color: "#86efac",
            position: "absolute",
            top: 2,
            right: 8,
            zIndex: 1,
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        {items.length === 0 ? (
          <p className="text-sm text-gray-400">
            Esta figura não possui equipamentos associados.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="rounded border border-green-800/40 bg-[#161616] p-3 text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-green-200">
                    {item.name}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {item.category ? (
                      <Chip
                        size="small"
                        label={item.category}
                        sx={{
                          backgroundColor: "rgba(34, 197, 94, 0.2)",
                          color: "#bbf7d0",
                        }}
                      />
                    ) : null}
                    {item.cost != null ? (
                      <Chip
                        size="small"
                        label={formatCrownsValue(item.cost)}
                        sx={{
                          backgroundColor: "rgba(74, 222, 128, 0.2)",
                          color: "#bbf7d0",
                        }}
                      />
                    ) : null}
                    {item.armourBonus != null ? (
                      <Chip
                        size="small"
                        label={`Armadura ${item.armourBonus >= 0 ? "+" : ""}${item.armourBonus}`}
                        sx={{
                          backgroundColor: "rgba(34, 211, 238, 0.2)",
                          color: "#bae6fd",
                        }}
                      />
                    ) : null}
                    {item.damageBonus != null ? (
                      <Chip
                        size="small"
                        label={`Dano ${item.damageBonus >= 0 ? "+" : ""}${item.damageBonus}`}
                        sx={{
                          backgroundColor: "rgba(59, 130, 246, 0.2)",
                          color: "#bfdbfe",
                        }}
                      />
                    ) : null}
                  </div>
                </div>
                {item.description ? (
                  <div className="mt-2 text-xs text-gray-300">
                    {Array.isArray(item.description) ? (
                      <ul className="list-disc space-y-1 pl-5">
                        {item.description.map((line, idx) => (
                          <li key={`${item.name}-desc-${idx}`}>{line}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{item.description}</p>
                    )}
                  </div>
                ) : null}
                {item.specialRules && item.specialRules.length > 0 ? (
                  <div className="mt-2 rounded border border-green-800/30 bg-[#102015] p-2 text-[11px] text-green-100">
                    <p className="mb-1 font-semibold uppercase tracking-wide text-green-300">
                      Regras Especiais
                    </p>
                    <ul className="space-y-1">
                      {item.specialRules.map((rule, idx) => (
                        <li key={`${item.name}-special-${idx}`}>
                          <span className="font-semibold text-green-200">
                            {rule.label ?? "Regra"}:
                          </span>{" "}
                          <span>
                            <GameText>{rule.value ?? "-"}</GameText>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
