import React, { useState, useCallback } from "react";
import MobileText from "../../../components/MobileText";
import GameText from "../../../components/GameText";
import { Chip } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import type { EquipmentToVault } from "../../../types/equipment-to-vault.entity";
import { fetchEquipmentBySlug, type EquipmentDetailQueryResponse } from "../../../services/queries.service";
import { formatCrownsValue } from "../../tools/warband-detail/utils/helpers";

type VaultSectionReadOnlyProps = {
  vaultItems: EquipmentToVault[];
};

type ExpandedItemState = {
  itemId: string;
  loading: boolean;
  data: EquipmentDetailQueryResponse | null;
  error: string | null;
};

export const VaultSectionReadOnly: React.FC<VaultSectionReadOnlyProps> = ({
  vaultItems,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [equipmentDetails, setEquipmentDetails] = useState<Map<string, ExpandedItemState>>(new Map());

  const toggleExpand = useCallback(async (item: EquipmentToVault) => {
    const itemId = item.id;
    
    setExpandedItems(prev => {
      const isExpanded = prev.has(itemId);
      
      if (isExpanded) {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      } else {
        const next = new Set(prev).add(itemId);
        
        setEquipmentDetails(prevDetails => {
          if (prevDetails.has(itemId)) {
            return prevDetails;
          }
          
          const slug = item.equipmentSlug;
          if (!slug) return prevDetails;

          const nextDetails = new Map(prevDetails);
          nextDetails.set(itemId, { itemId, loading: true, data: null, error: null });
          
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
                    className="ml-2 flex-shrink-0 text-green-400 hover:text-green-300"
                  >
                    {isExpanded ? (
                      <ExpandLessIcon fontSize="small" />
                    ) : (
                      <ExpandMoreIcon fontSize="small" />
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-3 space-y-2 border-t border-green-900/40 pt-3">
                    {isLoading ? (
                      <div className="text-xs text-gray-400">Carregando...</div>
                    ) : error ? (
                      <div className="text-xs text-red-300">{error}</div>
                    ) : detail ? (
                      <>
                        {detail.category && (
                          <div className="flex items-center gap-2">
                            <Chip
                              size="small"
                              label={detail.category}
                              sx={{
                                backgroundColor: "rgba(34, 197, 94, 0.15)",
                                borderColor: "rgba(34, 197, 94, 0.4)",
                                color: "rgba(134, 239, 172, 1)",
                                fontSize: "10px",
                                height: "20px",
                              }}
                              variant="outlined"
                            />
                          </div>
                        )}
                        {detail.cost && (
                          <div className="text-xs text-gray-300">
                            <strong>Custo:</strong> {formatCrownsValue(detail.cost)}
                          </div>
                        )}
                        {(detail.armourBonus || detail.damageBonus) && (
                          <div className="flex gap-2 text-xs text-gray-300">
                            {detail.armourBonus && (
                              <span>
                                <strong>Bônus Armadura:</strong> +{detail.armourBonus}
                              </span>
                            )}
                            {detail.damageBonus && (
                              <span>
                                <strong>Bônus Dano:</strong> +{detail.damageBonus}
                              </span>
                            )}
                          </div>
                        )}
                        {detail.description && (
                          <div className="text-xs text-gray-300">
                            <GameText component="div" className="whitespace-pre-wrap">
                              {Array.isArray(detail.description) ? detail.description.join("\n") : String(detail.description)}
                            </GameText>
                          </div>
                        )}
                        {detail.effect && (
                          <div className="text-xs text-gray-300">
                            <strong>Efeito:</strong>{" "}
                            <GameText component="span">{detail.effect}</GameText>
                          </div>
                        )}
                        {detail.specialRules && Array.isArray(detail.specialRules) && detail.specialRules.length > 0 && (
                          <div className="space-y-1">
                            <div className="text-xs font-semibold text-green-300">
                              Regras Especiais:
                            </div>
                            {detail.specialRules.map((rule, index) => {
                              if (typeof rule === "string") {
                                return (
                                  <div key={index} className="text-xs text-gray-300">
                                    <strong>Regra Especial:</strong>{" "}
                                    <GameText component="span">{rule}</GameText>
                                  </div>
                                );
                              }
                              const ruleObj = rule as { label?: string; value?: string; name?: string; title?: string; description?: string };
                              return (
                                <div key={index} className="text-xs text-gray-300">
                                  <strong>{ruleObj.label || ruleObj.name || ruleObj.title || "Regra Especial"}:</strong>{" "}
                                  <GameText component="span">{ruleObj.value || ruleObj.description || ""}</GameText>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

