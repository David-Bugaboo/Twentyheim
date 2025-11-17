import React from "react";
import { Sidebar } from "./Sidebar";
import { VaultSection } from "./VaultSection";
import type { EquipmentToVault } from "../../../../types/equipment-to-vault.entity";

type VaultSidebarProps = {
  open: boolean;
  onClose: () => void;
  vaultItems: EquipmentToVault[];
  onOpenVaultModal: () => void;
  onVaultUpdate: (item: EquipmentToVault, options: { sell?: boolean; destroy?: boolean }) => void;
  vaultItemAction: {
    itemId: string;
    type: "buy" | "sell" | "undo" | "destroy";
  } | null;
};

export const VaultSidebar: React.FC<VaultSidebarProps> = ({
  open,
  onClose,
  vaultItems,
  onOpenVaultModal,
  onVaultUpdate,
  vaultItemAction,
}) => {
  return (
    <Sidebar open={open} onClose={onClose} title="Cofre do Bando">
      <VaultSection
        vaultItems={vaultItems}
        onOpenVaultModal={onOpenVaultModal}
        onVaultUpdate={onVaultUpdate}
        vaultItemAction={vaultItemAction}
      />
    </Sidebar>
  );
};

