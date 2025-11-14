import React from "react";
import { SectionCard } from "./CommonComponents";
import MobileText from "../../../../components/MobileText";
import type { EquipmentToVault } from "../../../../types/equipment-to-vault.entity";
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

export const VaultSection: React.FC<VaultSectionProps> = ({
  vaultItems,
  onOpenVaultModal,
  onVaultRebuy,
  onVaultUpdate,
  vaultItemAction,
}) => {
  return (
    <SectionCard title="Cofre do Bando">
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
          {vaultItems.map(item => (
            <div
              key={item.id}
              className={`rounded border p-3 text-gray-200 transition ${
                item.modifier
                  ? "border-cyan-500/60 bg-cyan-950/30 shadow-[0_0_12px_rgba(8,145,178,0.35)]"
                  : "border-green-800/40 bg-[#101010]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-green-200">
                  {item.equipment?.name ?? item.equipmentSlug}
                </span>
                {item.customPrice ? (
                  <span className="text-xs text-green-400">
                    {item.customPrice}g
                  </span>
                ) : null}
              </div>
              <div className="mt-1 text-xs text-gray-400">
                <div>
                  Categoria: {item.equipment?.category ?? "Desconhecida"}
                </div>
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
          ))}
        </div>
      )}
    </SectionCard>
  );
};

