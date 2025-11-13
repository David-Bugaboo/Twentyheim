import React, { useState } from "react";
import { Modal, styled } from "@mui/material";
import EquipmentCard from "./EquipmentCard";

// Importar todos os dados de equipamentos
import acessoriosData from "../pages/weapons and equipments/data/acessorios-refactor.json";
import armadurasData from "../pages/weapons and equipments/data/armaduras-e-escudos-refactor.json";
import armasDistanciaData from "../pages/weapons and equipments/data/armas-a-distancia-refactor.json";
import armasCorpoData from "../pages/weapons and equipments/data/armas-corpo-a-corpo-refactor.json";
import armasFogoData from "../pages/weapons and equipments/data/armas-de-fogo-refactor.json";
import modificadoresDistanciaData from "../pages/weapons and equipments/data/modificadores-de-arma-a-distancia-refactor.json";
import modificadoresData from "../pages/weapons and equipments/data/modificadores-de-arma-refactor.json";
import modificadoresFogoData from "../pages/weapons and equipments/data/modificadores-de-armas-de-fogo-refactor.json";
import remediosData from "../pages/weapons and equipments/data/remedios-e-venenos.json";

interface EquipmentTooltipProps {
  itemName: string;
  children: React.ReactNode;
}

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
});

const ModalContainer = styled("div")({
  width: "90%",
  maxWidth: "600px",
  maxHeight: "80vh",
  overflow: "auto",
});

const EquipmentTooltip: React.FC<EquipmentTooltipProps> = ({
  itemName,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Buscar o item em todos os arquivos JSON
  const findEquipmentItem = (name: string): any | null => {
    const allData = [
      ...acessoriosData,
      ...armadurasData,
      ...armasDistanciaData,
      ...armasCorpoData,
      ...armasFogoData,
      ...modificadoresDistanciaData,
      ...modificadoresData,
      ...modificadoresFogoData,
      ...remediosData,
    ];

    for (const item of allData) {
      if (
        item.name &&
        item.name.trim().toLowerCase() === name.trim().toLowerCase()
      ) {
        return item;
      }
    }
    return null;
  };

  const equipmentItem = findEquipmentItem(itemName);

  if (!equipmentItem) {
    // Se não encontrar o item, renderiza sem tooltip
    return <>{children}</>;
  }

  return (
    <>
      <span
        className="cursor-pointer hover:text-green-400 transition-colors"
        onClick={() => setModalOpen(true)}
      >
        {children}
      </span>

      <StyledModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="equipment-modal"
      >
        <ModalContainer>
          <EquipmentCard
            name={equipmentItem.name}
            type={equipmentItem.type}
            damageModifier={equipmentItem.damageModifier}
            maxRange={equipmentItem.maxRange}
            exclusive={equipmentItem.exclusive}
            cost={equipmentItem.purchaseCost}
            strength={equipmentItem.strength}
            armorBonus={equipmentItem.armorBonus}
            movePenalty={equipmentItem.movePenalty}
            requirements={equipmentItem.requirements}
            rarity={equipmentItem.rarity}
            availability={equipmentItem.availability}
            effect={equipmentItem.effect}
            specialRules={equipmentItem.specialRules}
          />
        </ModalContainer>
      </StyledModal>
    </>
  );
};

export default EquipmentTooltip;
