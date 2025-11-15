import React, { useMemo } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DiceD20Icon } from "./DiceD20Icon";
import type { AdvancementRollResult } from "../utils/advancement-roll";
import type { BaseFigure } from "../../../../types/base-figure.entity";
import type { AdvancementToWarbandSoldier } from "../../../../types/advancement-to-warband-soldier.entity";

type AdvancementRollDialogProps = {
  open: boolean;
  onClose: () => void;
  rollResult: AdvancementRollResult | null;
  onSelectOption: (slug: string) => Promise<void>;
  onReroll: () => void;
  selecting: boolean;
  rolling: boolean;
  selectedBaseFigure: BaseFigure | null;
  currentAdvancements: AdvancementToWarbandSoldier[];
};

// Função para extrair modificadores de atributo de um slug de avanço
const getAdvancementModifiers = (slug: string): Partial<Record<string, number>> => {
  const normalized = slug.toLowerCase();
  const modifiers: Partial<Record<string, number>> = {};

  // Padrões de slugs: "1-forca", "1-impeto", "2-movimento", "1-vontade", "1-armadura", "2-vida", "1-precisao"
  // Formato: número-atributo ou atributo-número
  const patterns = [
    { key: "strength", keywords: ["força", "forca"], default: 1 },
    { key: "fight", keywords: ["ímpeto", "impeto"], default: 1 },
    { key: "movement", keywords: ["movimento"], default: 2 },
    { key: "will", keywords: ["vontade"], default: 1 },
    { key: "armour", keywords: ["armadura"], default: 1 },
    { key: "health", keywords: ["vida"], default: 2 },
    { key: "shoot", keywords: ["precisão", "precisao"], default: 1 },
  ];

  patterns.forEach(({ key, keywords, default: defaultValue }) => {
    for (const keyword of keywords) {
      // Padrão: número-keyword (ex: "1-forca", "2-movimento")
      const pattern1 = new RegExp(`(\\d+)[-_]?${keyword.replace(/[áàâã]/g, "[áàâã]")}`);
      const match1 = normalized.match(pattern1);
      if (match1) {
        const value = parseInt(match1[1], 10);
        if (!isNaN(value)) {
          modifiers[key] = value;
          return;
        }
      }

      // Padrão: keyword-número (ex: "forca-1")
      const pattern2 = new RegExp(`${keyword.replace(/[áàâã]/g, "[áàâã]")}[-_]?(\\d+)`);
      const match2 = normalized.match(pattern2);
      if (match2) {
        const value = parseInt(match2[1], 10);
        if (!isNaN(value)) {
          modifiers[key] = value;
          return;
        }
      }

      // Se contém a palavra-chave mas não tem número, usa o padrão
      if (normalized.includes(keyword) && !(key in modifiers)) {
        modifiers[key] = defaultValue;
      }
    }
  });

  return modifiers;
};

// Função para calcular modificadores totais de avanços já aplicados
const calculateCurrentAdvancementModifiers = (
  advancements: AdvancementToWarbandSoldier[]
): Partial<Record<string, number>> => {
  const totals: Partial<Record<string, number>> = {
    movement: 0,
    fight: 0,
    shoot: 0,
    armour: 0,
    strength: 0,
    will: 0,
    health: 0,
  };

  advancements.forEach(adv => {
    const slug = adv.advancementSlug ?? adv.advancement?.slug ?? "";
    if (!slug) return;
    const mods = getAdvancementModifiers(slug);
    Object.entries(mods).forEach(([key, value]) => {
      if (key in totals && typeof value === "number") {
        totals[key as keyof typeof totals] = (totals[key as keyof typeof totals] ?? 0) + value;
      }
    });
  });

  return totals;
};

export const AdvancementRollDialog: React.FC<AdvancementRollDialogProps> = ({
  open,
  onClose,
  rollResult,
  onSelectOption,
  onReroll,
  selecting,
  rolling,
  selectedBaseFigure,
  currentAdvancements,
}) => {
  // Calcular modificadores atuais de avanços
  const currentModifiers = useMemo(
    () => calculateCurrentAdvancementModifiers(currentAdvancements),
    [currentAdvancements]
  );

  // Função para verificar se um avanço excederia o limite racial
  const isAdvancementDisabled = useMemo(() => {
    if (!selectedBaseFigure || !rollResult) {
      return new Map<string, boolean>();
    }

    const raceLimits = (selectedBaseFigure as any).raceLimits as
      | Record<string, number>
      | null
      | undefined;

    if (!raceLimits) {
      return new Map<string, boolean>();
    }

    const disabledMap = new Map<string, boolean>();

    rollResult.options.forEach(option => {
      const newModifiers = getAdvancementModifiers(option.slug);
      let isDisabled = false;

      // Verificar cada atributo que o avanço modifica
      Object.entries(newModifiers).forEach(([attrKey, modifierValue]) => {
        if (typeof modifierValue !== "number") return;

        // Mapear chaves de atributo para os nomes usados em raceLimits
        const limitKey = attrKey === "movement" ? "movement" :
                         attrKey === "fight" ? "fight" :
                         attrKey === "shoot" ? "shoot" :
                         attrKey === "armour" ? "armour" :
                         attrKey === "strength" ? "strength" :
                         attrKey === "will" ? "will" :
                         attrKey === "health" ? "health" : null;

        if (!limitKey || !(limitKey in raceLimits)) return;

        const baseValue = selectedBaseFigure[limitKey as keyof BaseFigure] as number;
        const currentModifier = currentModifiers[attrKey] ?? 0;
        const newTotal = baseValue + currentModifier + modifierValue;
        const limit = raceLimits[limitKey];

        if (newTotal > limit) {
          isDisabled = true;
        }
      });

      disabledMap.set(option.slug, isDisabled);
    });

    return disabledMap;
  }, [selectedBaseFigure, rollResult, currentModifiers]);

  const isOptionDisabled = (slug: string): boolean => {
    return isAdvancementDisabled.get(slug) ?? false;
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
                {rollResult.options.map((option, index) => {
                  const disabled = selecting || isOptionDisabled(option.slug);
                  return (
                    <button
                      key={`${option.slug}-${index}`}
                      type="button"
                      onClick={() => void onSelectOption(option.slug)}
                      disabled={disabled}
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
                          {isOptionDisabled(option.slug) && !selecting ? (
                            <div className="mt-1 text-xs text-yellow-400">
                              Limite racial atingido
                            </div>
                          ) : null}
                        </div>
                        {selecting ? (
                          <div className="text-xs text-gray-500">Adicionando...</div>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
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

