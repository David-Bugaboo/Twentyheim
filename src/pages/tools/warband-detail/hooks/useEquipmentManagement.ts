import { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import {
  equipSoldierEquipment,
  equipSoldierFromVault,
  returnEquipmentToVault,
  unequipSoldierEquipment,
} from "../../../../services/soldiers.service";
import type { EquipmentToWarbandSoldier } from "../../../../types/equipment-to-warband-soldier.entity";
import type { EquipmentToVault } from "../../../../types/equipment-to-vault.entity";
import type { EquipmentSlot } from "../types";
import { EQUIPMENT_SLOT_LABELS } from "../types";
import { normalizeString, hasSpecialRuleLabel } from "../utils/helpers";

type UseEquipmentManagementProps = {
  selectedSoldier: { id: string } | null;
  relations: { equipment: EquipmentToWarbandSoldier[] };
  equipableVaultItems: EquipmentToVault[];
  warbandId: string | null;
  onReload: () => Promise<void>;
};

export const useEquipmentManagement = ({
  selectedSoldier,
  relations,
  equipableVaultItems,
  warbandId,
  onReload,
}: UseEquipmentManagementProps) => {
  const [selectedVaultEquipmentId, setSelectedVaultEquipmentId] = useState("");
  const [equipFromVaultLoading, setEquipFromVaultLoading] = useState(false);
  const [returningEquipmentId, setReturningEquipmentId] = useState("");
  const [equipmentSlotAction, setEquipmentSlotAction] = useState<{
    equipmentId: string;
    slot?: EquipmentSlot;
    type: "equip" | "unequip";
  } | null>(null);
  const [equippedExpanded, setEquippedExpanded] = useState(true);
  const [inventoryExpanded, setInventoryExpanded] = useState(true);

  const equipmentState = useMemo(() => {
    const normalize = (value?: string | null) =>
      value ? normalizeString(value) : "";

    const isShieldItem = (entry?: EquipmentToWarbandSoldier | null) => {
      if (!entry) return false;
      const category = normalize(
        entry.equipment?.category as string | undefined
      );
      const name = normalize(
        (entry.equipment?.name as string | undefined) ??
          (entry.equipmentSlug as string | undefined) ??
          ""
      );
      return category.includes("escudo") || name.includes("escudo");
    };

    const hasRule = (entry: EquipmentToWarbandSoldier | null, label: string) =>
      Boolean(
        entry && hasSpecialRuleLabel(entry.equipment?.specialRules, label)
      );

    const mainHand =
      relations.equipment.find(item => item.mainHandEquiped) ?? null;
    const offHand =
      relations.equipment.find(item => item.offHandEquiped) ?? null;
    const twoHanded =
      relations.equipment.find(item => item.twoHandedEquiped) ?? null;

    return {
      mainHand,
      offHand,
      twoHanded,
      offHandIsShield: isShieldItem(offHand),
      offHandHasNonShield: Boolean(offHand && !isShieldItem(offHand)),
      hasUnbalancedMainHand: hasRule(mainHand, "desbalanceada"),
      hasUnbalancedTwoHand: hasRule(twoHanded, "desbalanceada"),
    };
  }, [relations.equipment]);

  const unequippedEquipment = useMemo(
    () =>
      relations.equipment.filter(
        item =>
          !item.mainHandEquiped &&
          !item.offHandEquiped &&
          !item.twoHandedEquiped &&
          !item.armorEquiped &&
          !item.helmetEquiped
      ),
    [relations.equipment]
  );

  const handleEquipFromVault = useCallback(async () => {
    if (!selectedSoldier) {
      toast.error("Selecione uma figura antes de equipar um item do cofre.");
      return;
    }

    if (!selectedVaultEquipmentId) {
      toast.error("Escolha um item do cofre para equipar.");
      return;
    }

    const vaultItem = equipableVaultItems.find(
      item => item.id === selectedVaultEquipmentId
    );

    try {
      setEquipFromVaultLoading(true);
      await equipSoldierFromVault(selectedSoldier.id, selectedVaultEquipmentId);

      const itemName =
        vaultItem?.equipment?.name ??
        vaultItem?.equipmentSlug ??
        "Item do cofre";

      toast.success(`"${itemName}" equipado com sucesso.`);
      setSelectedVaultEquipmentId("");

      if (warbandId) {
        await onReload();
      }
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const responseData = error.response?.data as
          | { message?: string | string[]; error?: string | string[] }
          | undefined;
        const backendMessage =
          responseData?.message ?? responseData?.error ?? error.message ?? null;
        const formattedMessage = Array.isArray(backendMessage)
          ? backendMessage.join(" ")
          : backendMessage;
        toast.error(
          formattedMessage ||
            "Não foi possível equipar o item a partir do cofre."
        );
      } else {
        toast.error("Não foi possível equipar o item a partir do cofre.");
      }
    } finally {
      setEquipFromVaultLoading(false);
    }
  }, [
    equipSoldierFromVault,
    equipableVaultItems,
    onReload,
    selectedSoldier,
    selectedVaultEquipmentId,
    warbandId,
  ]);

  const handleReturnEquipmentToVault = useCallback(
    async (equipmentId: string) => {
      if (!selectedSoldier) {
        toast.error("Selecione uma figura antes de remover um item.");
        return;
      }

      const equipmentRecord = relations.equipment.find(
        equipment => equipment.id === equipmentId
      );

      if (!equipmentRecord) {
        toast.error("Equipamento não encontrado para esta figura.");
        return;
      }

      const equipmentName =
        equipmentRecord.equipment?.name ?? equipmentRecord.equipmentSlug ?? "";

      if (!warbandId) {
        toast.error("Identificador do bando não encontrado.");
        return;
      }

      try {
        setReturningEquipmentId(equipmentId);
        await returnEquipmentToVault(selectedSoldier.id, equipmentId);
        toast.success(
          equipmentName
            ? `"${equipmentName}" devolvido ao cofre.`
            : "Equipamento devolvido ao cofre."
        );
        await onReload();
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
          const responseData = error.response?.data as
            | { message?: string | string[]; error?: string | string[] }
            | undefined;
          const backendMessage =
            responseData?.message ??
            responseData?.error ??
            error.message ??
            null;
          const formattedMessage = Array.isArray(backendMessage)
            ? backendMessage.join(" ")
            : backendMessage;
          toast.error(
            formattedMessage || "Não foi possível devolver o item ao cofre."
          );
        } else {
          toast.error("Não foi possível devolver o item ao cofre.");
        }
      } finally {
        setReturningEquipmentId("");
      }
    },
    [
      onReload,
      relations.equipment,
      returnEquipmentToVault,
      selectedSoldier,
      warbandId,
    ]
  );

  const handleEquipEquipmentSlot = useCallback(
    async (equipmentId: string, slot: EquipmentSlot) => {
      const equipmentRecord = relations.equipment.find(
        equipment => equipment.id === equipmentId
      );

      if (!equipmentRecord) {
        toast.error("Equipamento não encontrado para esta figura.");
        return;
      }

      try {
        setEquipmentSlotAction({ equipmentId, slot, type: "equip" });
        await equipSoldierEquipment(equipmentId, slot);
        const equipmentName =
          equipmentRecord.equipment?.name ??
          equipmentRecord.equipmentSlug ??
          "";
        toast.success(
          equipmentName
            ? `"${equipmentName}" equipado na ${EQUIPMENT_SLOT_LABELS[slot]}.`
            : `Equipamento equipado na ${EQUIPMENT_SLOT_LABELS[slot]}.`
        );
        if (warbandId) {
          await onReload();
        }
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
          const responseData = error.response?.data as
            | { message?: string | string[]; error?: string | string[] }
            | undefined;
          const backendMessage =
            responseData?.message ??
            responseData?.error ??
            error.message ??
            null;
          const formattedMessage = Array.isArray(backendMessage)
            ? backendMessage.join(" ")
            : backendMessage;
          toast.error(
            formattedMessage ||
              "Não foi possível equipar o item no slot escolhido."
          );
        } else {
          toast.error("Não foi possível equipar o item no slot escolhido.");
        }
      } finally {
        setEquipmentSlotAction(null);
      }
    },
    [equipSoldierEquipment, onReload, relations.equipment, warbandId]
  );

  const handleUnequipEquipmentSlot = useCallback(
    async (equipmentId: string) => {
      const equipmentRecord = relations.equipment.find(
        equipment => equipment.id === equipmentId
      );

      if (!equipmentRecord) {
        toast.error("Equipamento não encontrado para esta figura.");
        return;
      }

      try {
        await unequipSoldierEquipment(equipmentId);
        const equipmentName =
          equipmentRecord.equipment?.name ??
          equipmentRecord.equipmentSlug ??
          "";
        toast.success(
          equipmentName
            ? `"${equipmentName}" foi desequipado.`
            : "Equipamento desequipado."
        );
        if (warbandId) {
          await onReload();
        }
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
          const responseData = error.response?.data as
            | { message?: string | string[]; error?: string | string[] }
            | undefined;
          const backendMessage =
            responseData?.message ??
            responseData?.error ??
            error.message ??
            null;
          const formattedMessage = Array.isArray(backendMessage)
            ? backendMessage.join(" ")
            : backendMessage;
          toast.error(
            formattedMessage ||
              "Não foi possível desequipar o item desta figura."
          );
        } else {
          toast.error("Não foi possível desequipar o item desta figura.");
        }
      }
    },
    [onReload, relations.equipment, unequipSoldierEquipment, warbandId]
  );

  return {
    selectedVaultEquipmentId,
    setSelectedVaultEquipmentId,
    equipFromVaultLoading,
    returningEquipmentId,
    equipmentSlotAction,
    equippedExpanded,
    setEquippedExpanded,
    inventoryExpanded,
    setInventoryExpanded,
    equipmentState,
    unequippedEquipment,
    handleEquipFromVault,
    handleReturnEquipmentToVault,
    handleEquipEquipmentSlot,
    handleUnequipEquipmentSlot,
  };
};

