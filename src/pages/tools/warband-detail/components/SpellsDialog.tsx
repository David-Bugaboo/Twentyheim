import React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Spinner } from "./CommonComponents";
import type { SpellLoreDialogEntry } from "../types";
import MagicTermTooltip from "../../../../components/MagicTermTooltip";
import GameText from "../../../../components/GameText";

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
  title: _title,
  loading,
  error,
  lores,
  selectedSlug,
  onSelectSlug,
}) => {
  const selectedLore =
    lores.find(entry => entry.slug === selectedSlug) ?? lores[0] ?? null;

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
            <Spinner label="Carregando magias..." />
          </div>
        ) : (
          <div className="space-y-4">
            {error ? <div className="text-xs text-red-300">{error}</div> : null}
            {lores.length === 0 ? (
              <div className="text-xs text-gray-400">
                Nenhuma magia registrada.
              </div>
            ) : (
              <div className="space-y-3">
                <FormControl fullWidth size="small">
                  <InputLabel
                    sx={{
                      color: "#86efac",
                      "&.Mui-focused": {
                        color: "#86efac",
                      },
                    }}
                  >
                    Selecionar Tradição Mágica
                  </InputLabel>
                  <Select
                    value={selectedSlug || ""}
                    onChange={event =>
                      onSelectSlug(event.target.value as string)
                    }
                    label="Selecionar Tradição Mágica"
                    sx={{
                      color: "#86efac",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(134, 239, 172, 0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(134, 239, 172, 0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#86efac",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#86efac",
                      },
                      backgroundColor: "#0b0e0c",
                    }}
                  >
                    {lores.map(entry => (
                      <MenuItem
                        key={entry.slug}
                        value={entry.slug}
                        sx={{
                          color: "#86efac",
                          backgroundColor: "#0b0e0c",
                          "&:hover": {
                            backgroundColor: "rgba(134, 239, 172, 0.1)",
                          },
                          "&.Mui-selected": {
                            backgroundColor: "rgba(134, 239, 172, 0.2)",
                            "&:hover": {
                              backgroundColor: "rgba(134, 239, 172, 0.3)",
                            },
                          },
                        }}
                      >
                        {entry.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {selectedLore ? (
                  <div className="space-y-2">
                    <div className="rounded border border-green-800/40 bg-[#101010] p-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-lg font-semibold text-green-200">
                            {selectedLore.name}
                          </h3>
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
                                  </div>
                                  <div className="text-xs text-gray-300">
                                    <GameText component="div">
                                      {spell.description || "-"}
                                    </GameText>
                                  </div>
                                  {typeof spell.difficultyClass === "number" ? (
                                    <div className="text-[11px] text-blue-300">
                                      Dificuldade: {spell.difficultyClass}
                                    </div>
                                  ) : null}
                                  {Array.isArray(spell.keywords) &&
                                  spell.keywords.length > 0 ? (
                                    <div className="text-[11px] text-blue-200 flex flex-wrap items-center gap-1">
                                      <span>Palavras-chave:</span>
                                      {spell.keywords.map(
                                        (keyword, index, arr) => (
                                          <span
                                            key={index}
                                            className="inline-flex items-center"
                                          >
                                            <MagicTermTooltip component="span">
                                              {keyword.trim()}
                                            </MagicTermTooltip>
                                            {index < arr.length - 1 && (
                                              <span>,</span>
                                            )}
                                          </span>
                                        )
                                      )}
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
