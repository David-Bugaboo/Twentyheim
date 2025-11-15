import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Spinner } from "./CommonComponents";
import { formatCrownsValue } from "../utils/helpers";
import { fetchSupernaturalAbilities } from "../../../../services/queries.service";
import type { SupernaturalAbilityQueryResponse } from "../../../../services/queries.service";

type AvailableSupernaturalDialogProps = {
  open: boolean;
  onClose: () => void;
  category: "Mutação" | "Benção de Nurgle";
  figureName: string;
};

export const AvailableSupernaturalDialog: React.FC<AvailableSupernaturalDialogProps> = ({
  open,
  onClose,
  category,
  figureName,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abilities, setAbilities] = useState<SupernaturalAbilityQueryResponse[]>([]);

  useEffect(() => {
    if (!open) {
      setAbilities([]);
      setError(null);
      return;
    }

    let abort = false;
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const allAbilities = await fetchSupernaturalAbilities(controller.signal);
        const filtered = allAbilities.filter(
          ability => ability.category === category
        );

        if (abort) {
          return;
        }

        setAbilities(filtered);
      } catch (err) {
        if (abort) {
          return;
        }
        console.error(err);
        setError(`Não foi possível carregar ${category.toLowerCase()} disponíveis.`);
      } finally {
        if (!abort) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      abort = true;
      controller.abort();
    };
  }, [open, category]);

  const formatCost = (value?: string | number | null): string | null => {
    if (value === null || value === undefined || value === "") return null;
    const formatted = formatCrownsValue(value);
    return formatted === "-" ? null : formatted;
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
        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner label="Carregando opções..." />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-sm text-gray-300">
              <span className="font-semibold text-green-200">{figureName}</span>
              {" — "}
              <span>{category} disponíveis</span>
            </div>
            {error ? (
              <div className="text-xs text-red-300">{error}</div>
            ) : null}

            {!error && abilities.length === 0 ? (
              <div className="text-xs text-gray-400">
                Nenhuma {category.toLowerCase()} cadastrada.
              </div>
            ) : null}

            {abilities.map(ability => {
              const formattedCost = formatCost(ability.cost);
              return (
                <div
                  key={ability.slug}
                  className="rounded border border-green-800/40 bg-[#101010] p-3 text-sm"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-semibold text-green-200">
                        {ability.name}
                      </h3>
                    </div>
                    {formattedCost ? (
                      <div className="text-xs text-gray-300">
                        Custo: {formattedCost}
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
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

