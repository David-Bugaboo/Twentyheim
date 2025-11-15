import React, { useState, useCallback } from "react";
import MobileText from "../../../../components/MobileText";
import GameText from "../../../../components/GameText";
import { Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import type { EquipmentToVault } from "../../../../types/equipment-to-vault.entity";
import { fetchEquipmentBySlug, type EquipmentDetailQueryResponse } from "../../../../services/queries.service";
import { formatCrownsValue } from "../utils/helpers";

type VaultSectionProps = {
  vaultItems: EquipmentToVault[];
  onOpenVaultModal: () => void;
  onVaultRebuy: (item: EquipmentToVault) => void;
  onVaultUpdate: (item: EquipmentToVault, options: { sell: boolean }) => void;
  vaultItemAction: {
    itemId: string;
    type: "buy" | "sell" | "undo";
  } | null;
};

type ExpandedItemState = {
  itemId: string;
  loading: boolean;
  data: EquipmentDetailQueryResponse | null;
  error: string | null;
};

export const VaultSection: React.FC<VaultSectionProps> = ({
  vaultItems,
  onOpenVaultModal,
  onVaultRebuy,
  onVaultUpdate,
  vaultItemAction,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [equipmentDetails, setEquipmentDetails] = useState<Map<string, ExpandedItemState>>(new Map());

  const toggleExpand = useCallback(async (item: EquipmentToVault) => {
    const itemId = item.id;
    
    setExpandedItems(prev => {
      const isExpanded = prev.has(itemId);
      
      if (isExpanded) {
        // Recolher
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      } else {
        // Expandir
        const next = new Set(prev).add(itemId);
        
        // Buscar detalhes do equipamento se ainda não foram buscados
        setEquipmentDetails(prevDetails => {
          if (prevDetails.has(itemId)) {
            return prevDetails; // Já temos os dados
          }
          
          const slug = item.equipmentSlug;
          if (!slug) return prevDetails;

          const nextDetails = new Map(prevDetails);
          nextDetails.set(itemId, { itemId, loading: true, data: null, error: null });
          
          // Buscar dados de forma assíncrona
          fetchEquipmentBySlug(slug)
            .then(data => {
              setEquipmentDetails(prev => {
                const next = new Map(prev);
                next.set(itemId, { itemId, loading: false, data, error: null });
                return next;
              });
            })
            .catch(error => {
              console.error(error);
              setEquipmentDetails(prev => {
                const next = new Map(prev);
                next.set(itemId, {
                  itemId,
                  loading: false,
                  data: null,
                  error: "Não foi possível carregar os detalhes do equipamento.",
                });
                return next;
              });
            });
          
          return nextDetails;
        });
        
        return next;
      }
    });
  }, []);

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={onOpenVaultModal}
          className="inline-flex items-center justify-center rounded border border-green-600/60 bg-green-900/20 px-3 py-2 text-xs font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
        >
          Adicionar item ao cofre
        </button>
      </div>
      {vaultItems.length === 0 ? (
        <MobileText className="text-sm text-gray-400">
          Nenhum item no cofre.
        </MobileText>
      ) : (
        <div className="max-h-[40vh] space-y-3 overflow-y-auto pr-2 text-sm xl:max-h-none xl:overflow-visible xl:pr-0">
          {vaultItems.map(item => {
            const isExpanded = expandedItems.has(item.id);
            const detailState = equipmentDetails.get(item.id);
            const detail = detailState?.data;
            const isLoading = detailState?.loading ?? false;
            const error = detailState?.error;

            return (
            <div
              key={item.id}
              className={`rounded border p-3 text-gray-200 transition ${
                item.modifier
                  ? "border-cyan-500/60 bg-cyan-950/30 shadow-[0_0_12px_rgba(8,145,178,0.35)]"
                  : "border-green-800/40 bg-[#101010]"
              }`}
            >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-green-200">
                  {item.equipment?.name ?? item.equipmentSlug}
                </span>
                {item.customPrice ? (
                        <span className="text-xs text-green-400 ml-2">
                    {item.customPrice}g
                  </span>
                ) : null}
              </div>
              <div className="mt-1 text-xs text-gray-400">
                <div>
                  Categoria: {item.equipment?.category ?? "Desconhecida"}
                </div>
              </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleExpand(item)}
                    className="ml-2 flex-shrink-0 rounded border border-green-600/60 bg-green-900/20 p-1 text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
                    aria-label={isExpanded ? "Recolher" : "Expandir"}
                  >
                    {isExpanded ? (
                      <ExpandLessIcon fontSize="small" />
                    ) : (
                      <ExpandMoreIcon fontSize="small" />
                    )}
                  </button>
                </div>

              {item.modifier ? (
                <div className="mt-2 space-y-1 rounded border border-cyan-600/50 bg-cyan-900/25 p-2 text-xs text-cyan-100">
                  <div className="font-semibold text-cyan-200">
                    Modificador: {item.modifier.name}
                  </div>
                  {item.modifier.effect ? (
                    <div className="text-cyan-100/90">
                      {item.modifier.effect}
                    </div>
                  ) : null}
                </div>
              ) : null}

                {/* Card expandido com informações completas */}
                {isExpanded && (
                  <div className="mt-3 rounded border border-green-800/40 bg-[#161616] p-3">
                    {isLoading ? (
                      <div className="text-center py-4 text-xs text-gray-400">
                        Carregando detalhes...
                      </div>
                    ) : error ? (
                      <div className="text-center py-4 text-xs text-red-300">
                        {error}
                      </div>
                    ) : detail ? (
                      <div className="space-y-3">
                        {/* Header com chips */}
                        <div className="flex flex-wrap items-center gap-2">
                          {detail.category ? (
                            <Chip
                              size="small"
                              label={detail.category}
                              sx={{
                                backgroundColor: "rgba(34, 197, 94, 0.2)",
                                color: "#bbf7d0",
                                fontSize: "10px",
                                height: "20px",
                              }}
                            />
                          ) : null}
                          {detail.cost != null ? (
                            <Chip
                              size="small"
                              label={formatCrownsValue(detail.cost)}
                              sx={{
                                backgroundColor: "rgba(74, 222, 128, 0.2)",
                                color: "#bbf7d0",
                                fontSize: "10px",
                                height: "20px",
                              }}
                            />
                          ) : null}
                          {detail.armourBonus != null || detail.armorBonus != null ? (
                            <Chip
                              size="small"
                              label={`Armadura +${detail.armourBonus ?? detail.armorBonus}`}
                              sx={{
                                backgroundColor: "rgba(34, 211, 238, 0.2)",
                                color: "#bae6fd",
                                fontSize: "10px",
                                height: "20px",
                              }}
                            />
                          ) : null}
                          {detail.damageBonus != null ? (
                            <Chip
                              size="small"
                              label={`Dano +${detail.damageBonus}`}
                              sx={{
                                backgroundColor: "rgba(59, 130, 246, 0.2)",
                                color: "#bfdbfe",
                                fontSize: "10px",
                                height: "20px",
                              }}
                            />
                          ) : null}
                          {detail.type ? (
                            <Chip
                              size="small"
                              label={detail.type}
                              sx={{
                                backgroundColor: "rgba(147, 51, 234, 0.2)",
                                color: "#c4b5fd",
                                fontSize: "10px",
                                height: "20px",
                              }}
                            />
                          ) : null}
                        </div>

                        {/* Descrição */}
                        {detail.description ? (
                          <div className="text-xs text-gray-300">
                            {Array.isArray(detail.description) ? (
                              <ul className="list-disc space-y-1 pl-5">
                                {detail.description.map((line, idx) => (
                                  <li key={`desc-${idx}`}>{line}</li>
                                ))}
                              </ul>
                            ) : (
                              <p>{detail.description}</p>
                            )}
                          </div>
                        ) : null}

                        {/* Efeito */}
                        {detail.effect ? (
                          <div className="rounded border border-amber-800/30 bg-[#181207] p-2 text-xs text-amber-100">
                            <div className="font-semibold text-amber-200 mb-1">
                              Efeito:
                            </div>
                            <GameText component="div" className="text-amber-100">
                              {detail.effect}
                            </GameText>
                          </div>
                        ) : null}

                        {/* Regras Especiais */}
                        {detail.specialRules && detail.specialRules.length > 0 ? (
                          <div className="rounded border border-green-800/30 bg-[#102015] p-2 text-[11px] text-green-100">
                            <p className="mb-1 font-semibold uppercase tracking-wide text-green-300">
                              Regras Especiais
                            </p>
                            <ul className="space-y-1">
                              {detail.specialRules.map((rule, idx) => {
                                if (typeof rule === "string") {
                                  return (
                                    <li key={`rule-${idx}`}>
                                      <span className="font-semibold text-green-200">
                                        Regra Especial:
                                      </span>{" "}
                                      <GameText component="span">{rule}</GameText>
                                    </li>
                                  );
                                }
                                const ruleObj = rule as {
                                  label?: string;
                                  name?: string;
                                  title?: string;
                                  value?: string;
                                  description?: string;
                                };
                                const label =
                                  ruleObj.label ??
                                  ruleObj.name ??
                                  ruleObj.title ??
                                  "Regra";
                                const value =
                                  ruleObj.value ?? ruleObj.description ?? "";
                                return (
                                  <li key={`rule-${idx}`}>
                                    <span className="font-semibold text-green-200">
                                      {label}:
                                    </span>{" "}
                                    <GameText component="span">{value}</GameText>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                )}

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onVaultRebuy(item)}
                  disabled={
                    vaultItemAction?.itemId === item.id &&
                    vaultItemAction.type === "buy"
                  }
                  className="inline-flex items-center justify-center gap-2 rounded border border-green-600/60 bg-green-900/20 px-2 py-1 text-xs font-semibold text-green-200 transition hover:border-green-400 hover:bg-green-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {vaultItemAction?.itemId === item.id &&
                  vaultItemAction.type === "buy"
                    ? "Comprando..."
                    : "Comprar novamente"}
                </button>
                <button
                  type="button"
                  onClick={() => onVaultUpdate(item, { sell: true })}
                  disabled={
                    vaultItemAction?.itemId === item.id &&
                    vaultItemAction.type === "sell"
                  }
                  className="inline-flex items-center justify-center gap-2 rounded border border-yellow-600/60 bg-yellow-900/20 px-2 py-1 text-xs font-semibold text-yellow-200 transition hover:border-yellow-400 hover:bg-yellow-900/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {vaultItemAction?.itemId === item.id &&
                  vaultItemAction.type === "sell"
                    ? "Vendendo..."
                    : "Vender"}
                </button>
                <button
                  type="button"
                  onClick={() => onVaultUpdate(item, { sell: false })}
                  disabled={
                    vaultItemAction?.itemId === item.id &&
                    vaultItemAction.type === "undo"
                  }
                  className="inline-flex items-center justify-center gap-2 rounded border border-blue-600/60 bg-blue-900/20 px-2 py-1 text-xs font-semibold text-blue-200 transition hover:border-blue-400 hover:bg-blue-900/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {vaultItemAction?.itemId === item.id &&
                  vaultItemAction.type === "undo"
                    ? "Desfazendo..."
                    : "Desfazer venda"}
                </button>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

