import React, { useState } from "react";
import {
  Tooltip,
  ClickAwayListener,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Base de dados de armas e armaduras com propriedades detalhadas
interface WeaponData {
  name: string;
  type: "Melee" | "Ranged" | "Armor" | "Shield" | "Special";
  damage: string;
  range?: string;
  hands: number;
  slots: number;
  special: string[];
  description: string;
  cost?: string;
  properties?: string[]; // Propriedades simplificadas para exibição
}

const weaponDatabase: WeaponData[] = [
  {
    name: "Adaga",
    type: "Melee",
    damage: "-1",
    hands: 1,
    slots: 1,
    special: ["Lutar com Duas Mãos", "Mão secundária"],
    properties: ["Corpo a Corpo", "Dano -1", "Leve"],
    description:
      "Uma lâmina pequena. Causa -1 de dano. Pode ser usada na mão secundária com uma arma de mão ou equivalente para +1 de Luta.",
  },
  {
    name: "Machado",
    type: "Melee",
    damage: "0",
    hands: 1,
    slots: 1,
    special: [],
    properties: ["Corpo a Corpo", "Dano 0"],
    description:
      "O machado é a arma tradicional dos lenhadores do Império, e também é usado como arma nas áreas rurais mais pobres.",
  },
  {
    name: "Espada",
    type: "Melee",
    damage: "0",
    hands: 1,
    slots: 1,
    special: ["Defensiva"],
    properties: ["Corpo a Corpo", "Dano 0", "Defensiva"],
    description:
      "A espada é frequentemente chamada de 'rei das armas'. A espada mais comum disponível, a espada larga do Império.",
  },
  {
    name: "Arma de Duas Mãos",
    type: "Melee",
    damage: "+2",
    hands: 2,
    slots: 2,
    special: ["Não pode usar escudo", "Não pode mão secundária"],
    properties: ["Corpo a Corpo", "Dano +2", "Duas Mãos"],
    description:
      "Uma arma grande que requer ambas as mãos. Causa +2 de dano. Não pode ser usada com escudo ou na mão secundária.",
  },
  {
    name: "Cajado",
    type: "Melee",
    damage: "-1",
    hands: 1,
    slots: 1,
    special: ["Reduz dano inimigo em 1"],
    properties: ["Corpo a Corpo", "Dano -1", "Defensiva"],
    description:
      "Um bastão de madeira favorecido por conjuradores e viajantes. Causa -1 de dano, mas o dano de combate corpo a corpo inimigo é reduzido em 1.",
  },
  {
    name: "Arma de Concussão",
    type: "Melee",
    damage: "0",
    hands: 1,
    slots: 1,
    special: ["Concussiva (6)", "Desbalanceada"],
    properties: ["Corpo a Corpo", "Dano 0", "Concussiva (6)", "Desbalanceada"],
    description:
      "Instrumentos brutais e esmagadores variam de maças de ferro cru a martelos anões elaboradamente forjados.",
  },
  {
    name: "Arma de Haste",
    type: "Melee",
    damage: "0",
    hands: 1,
    slots: 1,
    special: ["Versátil", "Desbalanceada"],
    properties: ["Corpo a Corpo", "Dano 0", "Versátil", "Desbalanceada"],
    description:
      "O pão com manteiga do soldado imperial. Incluem lanças, alabardas, piques e afins.",
  },
  {
    name: "Funda",
    type: "Ranged",
    damage: "-2",
    range: "20cm",
    hands: 1,
    slots: 1,
    special: [
      "Mão secundária",
      "Sem sobrecarga com Pedra-Bruxa",
      "Giros Brutais",
    ],
    properties: [
      "A Distância",
      "Alcance 20cm",
      "Dano -2",
      "Leve",
      "Giros Brutais",
    ],
    description:
      "Uma arma a distância simples com alcance de 20cm. Causa -2 de dano. Pode ser usada na mão secundária.",
  },
  {
    name: "Arma Arremessável",
    type: "Ranged",
    damage: "0",
    range: "25cm",
    hands: 1,
    slots: 1,
    special: ["Uso único", "Substituída após jogo"],
    properties: ["Híbrida", "Alcance 25cm", "Dano 0"],
    description:
      "Armas arremessáveis são ferramentas simples mas versáteis usadas por guerreiros que valorizam a adaptabilidade.",
  },
  {
    name: "Arco",
    type: "Ranged",
    damage: "0",
    range: "60cm",
    hands: 2,
    slots: 1,
    special: ["Requer aljava"],
    properties: [
      "A Distância",
      "Alcance 60cm",
      "Dano 0",
      "Duas Mãos",
      "Requer Aljava",
    ],
    description:
      "Uma arma a distância com alcance de 60cm. Requer ambas as mãos.",
  },
  {
    name: "Besta",
    type: "Ranged",
    damage: "+2",
    range: "60cm",
    hands: 2,
    slots: 1,
    special: ["Ação para carregar", "Requer aljava"],
    properties: [
      "A Distância",
      "Alcance 60cm",
      "Dano +2",
      "Duas Mãos",
      "Recarga",
      "Requer Aljava",
    ],
    description:
      "Bestas requerem uma ação para carregar e uma ação para disparar. Têm um modificador de dano +2.",
  },
  {
    name: "Besta de Mão",
    type: "Ranged",
    damage: "+1",
    range: "30cm",
    hands: 1,
    slots: 1,
    special: [
      "Ação para carregar",
      "Conta como adaga em combate",
      "Lutar com Duas Mãos",
    ],
    properties: [
      "A Distância",
      "Alcance 30cm",
      "Dano +1",
      "Recarga",
      "Conta como Adaga",
    ],
    description:
      "Bestas de Mão podem ser usadas e carregadas com apenas uma mão. Contam como adagas em combate corpo a corpo.",
  },
  {
    name: "Pistola",
    type: "Ranged",
    damage: "+2",
    range: "25cm",
    hands: 1,
    slots: 1,
    special: [
      "Ignora 2 Armadura",
      "Ação para recarregar",
      "Conta como adaga em combate",
      "Lutar com Duas Mãos",
    ],
    properties: [
      "A Distância",
      "Alcance 25cm",
      "Dano +2",
      "Ignora 2 Armadura",
      "Recarga",
      "Conta como Adaga",
    ],
    description:
      "Uma arma de fogo de uma mão com alcance de 25cm. Causa +2 de dano e ignora 2 pontos de armadura.",
  },
  {
    name: "Arcabuz",
    type: "Ranged",
    damage: "+2",
    range: "60cm",
    hands: 2,
    slots: 1,
    special: [
      "Ignora 2 Armadura",
      "Apenas um por modelo",
      "Não pode usar escudo",
      "Conta como arma de duas mãos em combate",
    ],
    properties: [
      "A Distância",
      "Alcance 60cm",
      "Dano +2",
      "Ignora 2 Armadura",
      "Duas Mãos",
      "Apenas um por modelo",
    ],
    description:
      "Esta arma de fogo maior, de duas mãos, é a variedade mais comum de arma de pólvora negra.",
  },
  {
    name: "Bacamarte",
    type: "Ranged",
    damage: "Variável",
    range: "35cm",
    hands: 2,
    slots: 1,
    special: [
      "Dispersão",
      "Ataque em área",
      "Não conta para lutar com duas armas",
    ],
    properties: ["A Distância", "Alcance 35cm", "Dispersão", "Duas Mãos"],
    description:
      "Uma arma de duas mãos que dispara uma dispersão de pelotas ao invés de uma única bala.",
  },
  {
    name: "Armadura Leve",
    type: "Armor",
    damage: "N/A",
    hands: 0,
    slots: 1,
    special: ["+1 Armadura", "Sem penalidade de movimento"],
    properties: ["Armadura", "+1 Armadura", "Sem penalidade"],
    description:
      "Armadura de couro ou cota de malha leve. Fornece +1 de armadura. Não interfere com movimento.",
  },
  {
    name: "Armadura Pesada",
    type: "Armor",
    damage: "N/A",
    hands: 0,
    slots: 1,
    special: ["+2 Armadura", "-1 Movimento"],
    properties: ["Armadura", "+2 Armadura", "-1 Movimento"],
    description:
      "Armadura de placas ou armadura completa. Fornece +2 de armadura. Tem uma penalidade de -1 ao movimento.",
  },
  {
    name: "Escudo",
    type: "Shield",
    damage: "N/A",
    hands: 1,
    slots: 1,
    special: ["+1 Armadura", "Apenas com armas de uma mão"],
    properties: ["Escudo", "+1 Armadura", "Uma mão"],
    description:
      "Um item defensivo que fornece +1 de armadura. Pode ser usado com armas de uma mão.",
  },
];

// Componentes estilizados
const StyledTooltipTerm = styled("span")({
  textDecoration: "underline dotted",
  textDecorationColor: "#d4af37",
  textDecorationThickness: "1px",
  cursor: "pointer",
  color: "#d4af37",
  "&:hover": {
    color: "#f4d03f",
  },
});

const MiniCard = styled(Box)({
  maxWidth: "320px",
  padding: "12px",
  backgroundColor: "rgba(28, 24, 18, 0.98)",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.7)",
  fontFamily: '"Crimson Text", serif',
});

const CardHeader = styled(Box)({
  marginBottom: "8px",
  paddingBottom: "6px",
  borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
});

const WeaponName = styled(Typography)({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "#d4af37",
  margin: 0,
});

const WeaponType = styled(Typography)({
  fontFamily: '"Cinzel", serif',
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#8b7355",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

const StatsRow = styled(Box)({
  display: "flex",
  gap: "8px",
  marginBottom: "8px",
  flexWrap: "wrap",
});

const StatChip = styled(Chip)({
  height: "20px",
  fontSize: "0.7rem",
  fontFamily: '"Crimson Text", serif',
  backgroundColor: "rgba(212, 175, 55, 0.15)",
  color: "#d4af37",
  border: "1px solid rgba(212, 175, 55, 0.3)",
  "& .MuiChip-label": {
    padding: "0 6px",
  },
});

const PropertiesContainer = styled(Box)({
  marginTop: "8px",
});

// Componente principal
import { type EquipmentItem } from "../pages/weapons and equipments/data/commonItemsData";

interface UnifiedWeaponData {
  name: string;
  type: string;
  damage: string;
  range?: string;
  hands: number;
  slots: number;
  special: string[];
  properties: string[];
  description: string;
}

interface WeaponTooltipCardProps {
  item?: EquipmentItem;
  weaponName?: string; // Para compatibilidade com uso antigo
  children: React.ReactNode;
}

function WeaponTooltipCard({
  item,
  weaponName,
  children,
}: WeaponTooltipCardProps) {
  const [open, setOpen] = useState(false);

  // Se temos um item completo, usamos ele; senão, buscamos pelo nome
  const weaponData = item || weaponDatabase.find((w) => w.name === weaponName);

  if (!weaponData) {
    return <span>{children}</span>;
  }

  // Converter para formato unificado
  const weapon: UnifiedWeaponData = item
    ? {
        name: item.name,
        type:
          item.properties.find((p) => p.label === "Tipo")?.value || "Especial",
        damage:
          item.properties.find((p) => p.label === "Modificador de Dano")
            ?.value || "N/A",
        range: item.properties.find((p) => p.label === "Alcance")?.value,
        hands: 1, // Default para EquipmentItem
        slots: 1, // Default para EquipmentItem
        special: item.properties
          .filter(
            (p) =>
              p.label !== "Tipo" &&
              p.label !== "Modificador de Dano" &&
              p.label !== "Alcance" &&
              p.label !== "Alcance Máximo" &&
              p.label !== "Requer" &&
              p.label !== "Bônus de Armadura" &&
              p.label !== "Penalidade de Agilidade" &&
              !p.label.toLowerCase().includes("compra") &&
              !p.label.toLowerCase().includes("venda") &&
              p.label !== "Descrição" &&
              p.label !== "Effect" &&
              p.label !== "Bonus"
          )
          .map((p) => p.label), // Usar apenas o label, não o value
        properties: item.weaponProperties || [],
        description: item.description,
      }
    : {
        name: (weaponData as any).name,
        type: (weaponData as any).type,
        damage: (weaponData as any).damage,
        range: (weaponData as any).range,
        hands: (weaponData as any).hands,
        slots: (weaponData as any).slots,
        special: (weaponData as any).special,
        properties: (weaponData as any).properties || [],
        description: (weaponData as any).description,
      };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipToggle = () => {
    setOpen(!open);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Melee":
        return "#8b7355";
      case "Ranged":
        return "#8b7355";
      case "Armor":
        return "#8b7355";
      case "Shield":
        return "#8b7355";
      default:
        return "#8b7355";
    }
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <span>
        <Tooltip
          title={
            <MiniCard>
              <CardHeader>
                <WeaponName>{weapon.name}</WeaponName>
                <WeaponType
                  style={{
                    color: getTypeColor(weapon.type),
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  {weapon.type}
                </WeaponType>
              </CardHeader>

              {(weapon.damage !== "N/A" ||
                (item &&
                  item.properties.find((p) => p.label === "Alcance Máximo")) ||
                (item && item.properties.find((p) => p.label === "Requer")) ||
                (item &&
                  item.properties.find(
                    (p) => p.label === "Bônus de Armadura"
                  )) ||
                (item &&
                  item.properties.find(
                    (p) => p.label === "Penalidade de Agilidade"
                  ))) && (
                <StatsRow>
                  {weapon.damage !== "N/A" && (
                    <StatChip label={`Dano ${weapon.damage}`} size="small" />
                  )}
                  {item &&
                    item.properties.find(
                      (p) => p.label === "Alcance Máximo"
                    ) && (
                      <StatChip
                        label={`Alcance ${
                          item.properties.find(
                            (p) => p.label === "Alcance Máximo"
                          )?.value
                        }`}
                        size="small"
                      />
                    )}
                  {item &&
                    item.properties.find((p) => p.label === "Requer") && (
                      <StatChip
                        label={`Requer ${
                          item.properties.find((p) => p.label === "Requer")
                            ?.value
                        }`}
                        size="small"
                      />
                    )}
                  {item &&
                    item.properties.find(
                      (p) => p.label === "Bônus de Armadura"
                    ) && (
                      <StatChip
                        label={`Armadura ${
                          item.properties.find(
                            (p) => p.label === "Bônus de Armadura"
                          )?.value
                        }`}
                        size="small"
                      />
                    )}
                  {item &&
                    item.properties.find(
                      (p) => p.label === "Penalidade de Agilidade"
                    ) && (
                      <StatChip
                        label={
                          item.properties.find(
                            (p) => p.label === "Penalidade de Agilidade"
                          )?.value
                        }
                        size="small"
                      />
                    )}
                </StatsRow>
              )}

              {weapon.special && weapon.special.length > 0 && (
                <PropertiesContainer>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color: "#d4af37",
                      fontSize: "0.85rem",
                    }}
                  >
                    {weapon.special.join(", ")}
                  </Typography>
                </PropertiesContainer>
              )}

              {item && (
                <>
                  {item.properties.find((p) => p.label === "Effect") && (
                    <PropertiesContainer>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#d4c4a8",
                          fontSize: "0.85rem",
                          fontStyle: "italic",
                        }}
                      >
                        {
                          item.properties.find((p) => p.label === "Effect")
                            ?.value
                        }
                      </Typography>
                    </PropertiesContainer>
                  )}
                  {item.properties.find((p) => p.label === "Bonus") && (
                    <PropertiesContainer>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#d4c4a8",
                          fontSize: "0.85rem",
                          fontStyle: "italic",
                        }}
                      >
                        {
                          item.properties.find((p) => p.label === "Bonus")
                            ?.value
                        }
                      </Typography>
                    </PropertiesContainer>
                  )}
                </>
              )}
            </MiniCard>
          }
          arrow
          placement="top"
          open={open}
          onClose={handleTooltipClose}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          sx={{
            "& .MuiTooltip-tooltip": {
              backgroundColor: "transparent",
              padding: 0,
              maxWidth: "none",
            },
            "& .MuiTooltip-arrow": {
              color: "rgba(28, 24, 18, 0.98)",
            },
          }}
        >
          <StyledTooltipTerm
            onClick={handleTooltipToggle}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {children}
          </StyledTooltipTerm>
        </Tooltip>
      </span>
    </ClickAwayListener>
  );
}

export { WeaponTooltipCard, weaponDatabase };
export default WeaponTooltipCard;
