/**
 * Hook para gerenciar equipamentos (equipar, desequipar, comprar, vender)
 */

import { useMemo } from "react";
import { toast } from "react-toastify";
import { calculateItemCost, isShieldName, isHelmetName } from "../helpers/equipment.helpers";
import { resolveEquipmentByName } from "../helpers/equipment.helpers";
import { createEquipmentFromBase } from "../../utils/createFigureFromBase";
import { stripUndefinedDeep } from "../helpers/firestore.helpers";
import type { StashItem } from "../../../../components/WarbandStash";
import type { Warband } from "./useWarbandState";

interface UseEquipmentManagementParams {
  warband: Warband;
  updateWarbandFigure: (figureId: string, updater: (figure: any) => any) => void;
  updateWarbandVault: (updater: (vault: any[]) => any[]) => void;
  updateWarbandProperty: (
    property: "name" | "faction" | "notes" | "gold" | "wyrdstone",
    value: string
  ) => void;
  setHasUnsavedChanges: (value: boolean) => void;
  equipmentCatalogs: {
    meleeDb: any[];
    rangedDb: any[];
    firearmsDb: any[];
    armorDb: any[];
    accessoriesDb: any[];
    remediesPoisonsDb: any[];
  };
  modifierCatalogs: {
    meleeMods: any[];
    rangedMods: any[];
    firearmsMods: any[];
  };
}

export function useEquipmentManagement({
  warband,
  updateWarbandFigure,
  updateWarbandVault,
  updateWarbandProperty,
  setHasUnsavedChanges,
  equipmentCatalogs,
  modifierCatalogs,
}: UseEquipmentManagementParams) {
  // Adiciona item ao cofre (vault)
  const handlePurchaseItem = (item: StashItem, isPurchase: boolean = false) => {
    setHasUnsavedChanges(true);

    const finalCost = calculateItemCost(
      item.cost,
      item.modifier,
      modifierCatalogs
    );

    if (isPurchase) {
      const currentGoldMatch = String(warband.gold || "0").match(/(\d+)/);
      const currentGold = currentGoldMatch
        ? parseInt(currentGoldMatch[1], 10)
        : 0;

      if (currentGold < finalCost) {
        toast.error(
          `Você não tem coroas suficientes! (Necessário: ${finalCost}, Disponível: ${currentGold})`
        );
        return;
      }

      toast.success(`Item comprado! ${finalCost} coroas descontadas.`);
    } else {
      toast.success("Item adicionado ao cofre (loot).");
    }

    const baseEquipment = resolveEquipmentByName(item.name, equipmentCatalogs);
    if (!baseEquipment) return;

    let baseModifier: any = undefined;
    if (item.modifier && item.modifier.name) {
      const modNameLc = String(item.modifier.name).toLowerCase();
      const allMods: any[] = [
        ...(modifierCatalogs.meleeMods || []),
        ...(modifierCatalogs.rangedMods || []),
        ...(modifierCatalogs.firearmsMods || []),
      ];
      baseModifier =
        allMods.find((m) => String(m.name).toLowerCase() === modNameLc) ||
        undefined;
    }

    const newEquipment = createEquipmentFromBase(baseEquipment, baseModifier);
    const cleaned = stripUndefinedDeep(newEquipment);

    if (isPurchase) {
      const currentGoldMatch = String(warband.gold || "0").match(/(\d+)/);
      const currentGold = currentGoldMatch
        ? parseInt(currentGoldMatch[1], 10)
        : 0;
      const finalGold = Math.max(0, currentGold - finalCost);
      updateWarbandProperty("gold", String(finalGold));
    }

    updateWarbandVault((vault) => [...vault, cleaned]);
  };

  // Equipa item do cofre
  const handleEquipFromStashFlat = (unitId: string, itemName: string) => {
    setHasUnsavedChanges(true);
    const idx = (warband.vault || []).findIndex(
      (i: any) => i.name === itemName
    );
    if (idx === -1) return;

    const equipmentObj =
      (warband.vault || [])[idx] ||
      resolveEquipmentByName(itemName, equipmentCatalogs);

    // Validação: verifica se já existe armadura ou escudo equipado
    const isShield = isShieldName(itemName);
    const isHelmet = isHelmetName(itemName);
    const isArmor =
      equipmentObj?.type === "armor" ||
      equipmentObj?.category === "armor" ||
      false;
    const isArmorItem = isArmor && !isShield && !isHelmet;

    if (isShield || isArmorItem) {
      const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
      if (figure) {
        const hasConflictingEquipment = (figure?.equiped || []).some(
          (eq: any) => {
            const eqName = String(eq?.name || "");
            if (isShield) {
              return isShieldName(eqName);
            } else if (isArmorItem) {
              const cat = String(eq?.type || eq?.category || "").toLowerCase();
              return (
                cat === "armor" &&
                !isShieldName(eqName) &&
                !isHelmetName(eqName)
              );
            }
            return false;
          }
        );

        if (hasConflictingEquipment) {
          const itemType = isShield ? "escudo" : "armadura";
          toast.error(
            `A figura já possui um ${itemType} equipado. Você só pode ter 1 ${itemType} por vez.`
          );
          return;
        }
      }
    }

    // Atualiza a figure diretamente
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      equiped: [...((fig.equiped || []) as any[]), equipmentObj],
    }));

    // Remove do vault
    updateWarbandVault((vault) => vault.filter((_, i) => i !== idx));
  };

  // Desequipa item para o cofre
  const handleUnequipToStashFlat = (unitId: string, itemName: string) => {
    setHasUnsavedChanges(true);
    const figure = (warband.figures || []).find((f: any) => f?.id === unitId);
    if (!figure) return;

    const equippedList: any[] = (figure?.equiped || []) as any[];
    const removedEquipment = equippedList.find(
      (e: any) =>
        String(e?.name || "").toLowerCase() === itemName.toLowerCase()
    );

    // Remove da figure
    updateWarbandFigure(unitId, (fig: any) => ({
      ...fig,
      equiped: equippedList.filter((e: any) =>
        removedEquipment?.id
          ? e.id !== removedEquipment.id
          : String(e.name).toLowerCase() !== itemName.toLowerCase()
      ),
    }));

    // Adiciona ao vault se encontrou o equipamento
    if (removedEquipment) {
      updateWarbandVault((vault) => [...vault, removedEquipment]);
    }
  };

  return {
    handlePurchaseItem,
    handleEquipFromStashFlat,
    handleUnequipToStashFlat,
  };
}

