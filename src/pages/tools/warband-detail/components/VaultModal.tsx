import React, { useMemo } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Spinner, StatRow } from "./CommonComponents";
import type { EquipmentCatalogItem } from "../../../../services/equipment.service";
import type { EquipmentCatalogFilter} from "../types";
import { EQUIPMENT_CATALOG_FILTERS } from "../types";
import {
  formatEquipmentCost,
  formatEquipmentStat,
  parseSpecialRules,
  normalizeString,
} from "../utils/helpers";
import { checkEquipmentAvailability } from "../utils/equipment-helpers";
import type { Warband } from "../../../../types/warband.entity";

type VaultModalProps = {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  equipmentCatalog: EquipmentCatalogItem[];
  catalogFilter: EquipmentCatalogFilter;
  onFilterChange: (filter: EquipmentCatalogFilter) => void;
  selectedSlug: string;
  onSelectSlug: (slug: string) => void;
  onBuy: () => void;
  onLoot: () => void;
  actionLoading: "buy" | "loot" | null;
  warband: Warband | null;
};

export const VaultModal: React.FC<VaultModalProps> = ({
  open,
  onClose,
  loading,
  equipmentCatalog,
  catalogFilter,
  onFilterChange,
  selectedSlug,
  onSelectSlug,
  onBuy,
  onLoot,
  actionLoading,
  warband,
}) => {
  const filteredEquipmentCatalog = useMemo(() => {
    if (catalogFilter === "all") {
      return equipmentCatalog;
    }

    return equipmentCatalog.filter(item => {
      const category = item.category ? normalizeString(item.category) : "";
      const name = item.name ? normalizeString(item.name) : "";

      switch (catalogFilter) {
        case "melee":
          return category.includes("arma corpo a corpo");
        case "ranged":
          return (
            category.includes("arma a distancia") ||
            category.includes("arma à distância")
          );
        case "firearm":
          return name.includes("arma de fogo") || category.includes("arma de fogo");
        case "armor":
          return (
            category.includes("armadura") ||
            category.includes("escudo") ||
            category.includes("elmo")
          );
        case "other":
          return (
            !category.includes("arma") &&
            !category.includes("armadura") &&
            !category.includes("escudo") &&
            !category.includes("elmo")
          );
        default:
          return true;
      }
    });
  }, [equipmentCatalog, catalogFilter]);

  const selectedEquipmentCatalogItem = useMemo(
    () =>
      selectedSlug
        ? filteredEquipmentCatalog.find(item => item.slug === selectedSlug) ??
          null
        : null,
    [filteredEquipmentCatalog, selectedSlug]
  );

  const selectedEquipmentAvailability = useMemo(
    () =>
      selectedEquipmentCatalogItem
        ? checkEquipmentAvailability(selectedEquipmentCatalogItem, warband)
        : null,
    [selectedEquipmentCatalogItem, warband]
  );

  const selectedEquipmentRules = useMemo(
    () =>
      selectedEquipmentCatalogItem
        ? parseSpecialRules(selectedEquipmentCatalogItem.specialRules)
        : [],
    [selectedEquipmentCatalogItem]
  );

  const canBuyFromVault =
    Boolean(selectedEquipmentCatalogItem) &&
    Boolean(selectedEquipmentAvailability?.available);
  const canLootToVault = Boolean(selectedEquipmentCatalogItem);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#101010",
          border: "1px solid rgba(16, 185, 129, 0.35)",
          color: "#e5e7eb",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#d1fae5",
          fontFamily: '"Cinzel", serif',
          fontSize: "1.1rem",
        }}
      >
        Selecionar equipamento para o cofre
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "#9ca3af" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: "rgba(16,185,129,0.25)" }}>
        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner label="Carregando equipamentos..." />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-green-300">
                Filtrar por tipo
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {EQUIPMENT_CATALOG_FILTERS.map(option => {
                  const isActive = catalogFilter === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => onFilterChange(option.key)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center justify-center rounded border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition ${
                        isActive
                          ? "border-green-500 bg-green-900/30 text-green-200"
                          : "border-green-800/60 bg-[#0b0e0c] text-green-300 hover:border-green-500 hover:bg-green-900/20"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="equipment-selector"
                className="text-xs uppercase tracking-wide text-green-300"
              >
                Selecione um equipamento
              </label>
              <select
                id="equipment-selector"
                value={selectedSlug}
                onChange={event => onSelectSlug(event.target.value)}
                disabled={filteredEquipmentCatalog.length === 0}
                className="mt-2 w-full rounded border border-green-700 bg-[#0f1010] px-3 py-2 text-sm text-gray-200 outline-none transition focus:border-green-400"
              >
                <option value="" className="text-gray-400">
                  -- Escolha um item --
                </option>
                {filteredEquipmentCatalog.map(item => {
                  const availability = checkEquipmentAvailability(item, warband);
                  const formattedCost = formatEquipmentCost(item.cost);
                  return (
                    <option
                      key={item.id ?? item.slug}
                      value={item.slug}
                      style={{
                        color: availability.available ? "#e5e7eb" : "#f87171",
                      }}
                    >
                      {item.name}
                      {formattedCost && formattedCost !== "-"
                        ? ` — ${formattedCost}`
                        : ""}
                      {!availability.available ? " (indisponível)" : ""}
                    </option>
                  );
                })}
              </select>
              {filteredEquipmentCatalog.length === 0 ? (
                <p className="mt-2 text-xs text-yellow-300">
                  Nenhum equipamento encontrado para este filtro.
                </p>
              ) : null}
            </div>

            {selectedEquipmentCatalogItem ? (
              <div className="space-y-3 rounded border border-green-800/40 bg-[#0c0f0d] p-4 text-sm text-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-green-200">
                    {selectedEquipmentCatalogItem.name}
                  </h3>
                  <span className="text-xs uppercase text-green-400">
                    {selectedEquipmentCatalogItem.category ?? "Sem categoria"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                  <StatRow
                    label="Custo"
                    value={formatEquipmentCost(selectedEquipmentCatalogItem.cost)}
                  />
                  <StatRow
                    label="Dano"
                    value={formatEquipmentStat(
                      selectedEquipmentCatalogItem.damageBonus
                    )}
                  />
                  <StatRow
                    label="Armadura"
                    value={formatEquipmentStat(
                      selectedEquipmentCatalogItem.armourBonus
                    )}
                  />
                  <StatRow
                    label="Alcance"
                    value={formatEquipmentStat(selectedEquipmentCatalogItem.range)}
                  />
                </div>

                {selectedEquipmentAvailability ? (
                  <div
                    className={`rounded border px-3 py-2 text-xs ${
                      selectedEquipmentAvailability.available
                        ? "border-green-700/40 bg-green-900/10 text-green-200"
                        : "border-red-700/40 bg-red-900/10 text-red-200"
                    }`}
                  >
                    {selectedEquipmentAvailability.available ? (
                      <span>Disponível para este bando.</span>
                    ) : (
                      <span>{selectedEquipmentAvailability.reason}</span>
                    )}
                  </div>
                ) : null}

                {selectedEquipmentCatalogItem.avaiability &&
                selectedEquipmentCatalogItem.avaiability.length > 0 ? (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-green-300">
                      Disponibilidade
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-green-100">
                      {selectedEquipmentCatalogItem.avaiability.map(entry => (
                        <span
                          key={`${selectedEquipmentCatalogItem.slug}-av-${entry}`}
                          className="rounded border border-green-700/50 bg-green-900/20 px-2 py-1"
                        >
                          {entry}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {selectedEquipmentCatalogItem.exclusions &&
                selectedEquipmentCatalogItem.exclusions.length > 0 ? (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-red-300">
                      Restrições
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-red-200">
                      {selectedEquipmentCatalogItem.exclusions.map(entry => (
                        <span
                          key={`${selectedEquipmentCatalogItem.slug}-ex-${entry}`}
                          className="rounded border border-red-700/50 bg-red-900/20 px-2 py-1"
                        >
                          {entry}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {selectedEquipmentCatalogItem.description ? (
                  <div className="space-y-1 rounded border border-green-800/30 bg-[#111815] p-3 text-xs text-green-100">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
                      Descrição
                    </p>
                    {Array.isArray(selectedEquipmentCatalogItem.description) ? (
                      selectedEquipmentCatalogItem.description.map(
                        (line, index) => (
                          <p
                            key={`${selectedEquipmentCatalogItem.slug}-desc-${index}`}
                          >
                            {line}
                          </p>
                        )
                      )
                    ) : (
                      <p>{selectedEquipmentCatalogItem.description}</p>
                    )}
                  </div>
                ) : null}

                {selectedEquipmentRules.length > 0 ? (
                  <div className="space-y-2 rounded border border-green-800/30 bg-[#101711] p-3 text-xs text-green-100">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
                      Regras Especiais
                    </p>
                    {selectedEquipmentRules.map((entry, index) => (
                      <div
                        key={`${selectedEquipmentCatalogItem.slug}-rule-${index}`}
                        className="rounded bg-green-900/20 px-3 py-2 text-[11px]"
                      >
                        <span className="block font-semibold text-green-200">
                          {entry.label}
                        </span>
                        <span className="mt-1 block whitespace-pre-wrap text-green-100">
                          {entry.value}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded border border-gray-600/60 bg-[#1a1a1a] px-4 py-2 text-xs font-semibold text-gray-300 transition hover:border-gray-400 hover:bg-[#232323]"
              >
                Cancelar
              </button>
              <div className="flex flex-col items-stretch gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={onBuy}
                  disabled={!canBuyFromVault || actionLoading !== null}
                  className="inline-flex items-center justify-center rounded border border-green-600/60 bg-green-900/20 px-4 py-2 text-xs font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {actionLoading === "buy" ? "Comprando..." : "Comprar"}
                </button>
                <button
                  type="button"
                  onClick={onLoot}
                  disabled={!canLootToVault || actionLoading !== null}
                  className="inline-flex items-center justify-center rounded border border-purple-600/60 bg-purple-900/20 px-4 py-2 text-xs font-semibold text-purple-200 transition hover:border-purple-400 hover:bg-purple-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {actionLoading === "loot" ? "Registrando loot..." : "Loot"}
                </button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

