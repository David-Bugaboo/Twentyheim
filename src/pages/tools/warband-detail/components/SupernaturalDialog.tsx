import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Spinner } from "./CommonComponents";

type SupernaturalAbilityEntry = {
  slug: string;
  name: string;
  description?: string | null;
  cost?: string | number | null;
};

type SupernaturalDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  loading: boolean;
  error: string | null;
  abilities: SupernaturalAbilityEntry[];
};

export const SupernaturalDialog: React.FC<SupernaturalDialogProps> = ({
  open,
  onClose,
  title,
  loading,
  error,
  abilities,
}) => {
  const formatCost = (value?: string | number | null): string | null => {
    if (value === null || value === undefined || value === "") return null;
    if (typeof value === "number") return `${value}g`;
    const normalized = String(value).trim();
    if (!normalized) return null;
    return /[a-zA-Z]/.test(normalized) ? normalized : `${normalized}g`;
  };

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
            <Spinner label="Carregando opções..." />
          </div>
        ) : (
          <div className="space-y-3">
            {error ? (
              <div className="text-xs text-red-300">{error}</div>
            ) : null}

            {!error && abilities.length === 0 ? (
              <div className="text-xs text-gray-400">
                Nenhuma opção cadastrada para esta categoria.
              </div>
            ) : null}

            {abilities.map(ability => (
              <div
                key={ability.slug}
                className="rounded border border-green-800/40 bg-[#101010] p-3 text-sm"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-green-200">
                      {ability.name}
                    </h3>
                    <span className="text-xs uppercase text-green-400">
                      {ability.slug}
                    </span>
                  </div>
                  {formatCost(ability.cost) ? (
                    <div className="text-xs text-gray-300">
                      Custo: {formatCost(ability.cost)}
                    </div>
                  ) : null}
                  {ability.description ? (
                    <div className="text-xs text-gray-300 whitespace-pre-wrap">
                      {ability.description}
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500">
                      Nenhuma descrição cadastrada.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};


