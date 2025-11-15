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
import type { SkillListDialogEntry } from "../types";
import GameText from "../../../../components/GameText";

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
  title: _title,
  loading,
  error,
  lists,
  selectedSlug,
  onSelectSlug,
}) => {
  const selectedList =
    lists.find(entry => entry.slug === selectedSlug) ?? lists[0] ?? null;

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
            <Spinner label="Carregando habilidades..." />
          </div>
        ) : (
          <div className="space-y-4">
            {error ? <div className="text-xs text-red-300">{error}</div> : null}
            {lists.length === 0 ? (
              <div className="text-xs text-gray-400">
                Nenhuma habilidade registrada.
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
                    Selecionar Lista de Habilidades
                  </InputLabel>
                  <Select
                    value={selectedSlug || ""}
                    onChange={event =>
                      onSelectSlug(event.target.value as string)
                    }
                    label="Selecionar Lista de Habilidades"
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
                    {lists.map(entry => (
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

                {selectedList ? (
                  <div className="space-y-2">
                    <div className="rounded border border-green-800/40 bg-[#101010] p-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-lg font-semibold text-green-200">
                            {selectedList.name}
                          </h3>
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
                                  </div>
                                  <div className="text-xs text-gray-300">
                                    <GameText component="div">
                                      {skill.description || "-"}
                                    </GameText>
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
