import {
  Typography,
  Tooltip,
  styled,
  ClickAwayListener,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { type ReactNode, useState } from "react";
import WeaponTooltipCard from "./WeaponTooltipCard";
import {
  commonItemsData,
  type EquipmentItem,
  type EquipmentCategory,
} from "../pages/weapons and equipments/data/commonItemsData";
import gameTermsData from "../pages/spells/data/magic-terms.json";

interface GameTerm {
  term: string;
  description: string;
}

// Função para criar mapeamento de equipamentos dos dados comuns
const createEquipmentMap = () => {
  const equipmentMap = new Map<string, EquipmentItem>();

  commonItemsData.forEach((category: EquipmentCategory) => {
    category.items.forEach((item: EquipmentItem) => {
      equipmentMap.set(item.name, item);
    });
  });

  return equipmentMap;
};

const equipmentMap = createEquipmentMap();

const gameTerms: GameTerm[] = gameTermsData;

const StyledTooltipTerm = styled("span")({
  textDecoration: "underline dotted",
  textDecorationColor: "#90EE90",
  textDecorationThickness: "1px",
  textUnderlineOffset: "2px",
  cursor: "pointer",
  userSelect: "none",
  "&:hover": {
    color: "#90EE90",
  },
  "&:active": {
    color: "#98FB98",
  },
});

// Component for equipment table
interface EquipmentTableProps {
  equipmentList: string[];
}

function EquipmentTable({ equipmentList }: EquipmentTableProps) {
  // Organiza os equipamentos em colunas (2 colunas)
  const columns = 2;
  const rows = Math.ceil(equipmentList.length / columns);

  const equipmentRows = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      const index = i * columns + j;
      if (index < equipmentList.length) {
        row.push(equipmentList[index]);
      } else {
        row.push(null);
      }
    }
    equipmentRows.push(row);
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        margin: "8px 0",
        backgroundColor: "rgba(28, 24, 18, 0.05)",
        border: "1px solid rgba(212, 175, 55, 0.3)",
        borderRadius: "8px",
      }}
    >
      <Table size="small">
        <TableBody>
          {equipmentRows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((equipment, colIndex) => (
                <TableCell
                  key={colIndex}
                  sx={{
                    border: "none",
                    padding: "8px 16px",
                    textAlign: "left",
                    width: "50%",
                  }}
                >
                  {equipment ? (
                    <EquipmentTooltip equipmentName={equipment}>
                      {equipment}
                    </EquipmentTooltip>
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Component for equipment tooltips
interface EquipmentTooltipProps {
  equipmentName: string;
  children: React.ReactNode;
}

function EquipmentTooltip({ equipmentName, children }: EquipmentTooltipProps) {
  const [open, setOpen] = useState(false);
  const equipment = equipmentMap.get(equipmentName);

  if (!equipment) {
    return <span>{children}</span>;
  }

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipToggle = () => {
    setOpen(!open);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <span>
        <Tooltip
          title={
            <div style={{ maxWidth: "400px" }}>
              <div
                style={{
                  marginBottom: "8px",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                {equipment.name}
              </div>
              {equipment.properties && equipment.properties.length > 0 && (
                <div style={{ marginBottom: "8px" }}>
                  {equipment.properties.map(
                    (prop: { label: string; value: string }, index: number) => (
                      <div
                        key={index}
                        style={{ marginBottom: "4px", fontSize: "0.9rem" }}
                      >
                        <strong>{prop.label}:</strong> {prop.value}
                      </div>
                    )
                  )}
                </div>
              )}
              <div style={{ fontSize: "0.9rem", lineHeight: "1.3" }}>
                {equipment.description}
              </div>
            </div>
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
              backgroundColor: "rgba(34, 139, 34, 0.95)",
              border: "1px solid rgba(144, 238, 144, 0.8)",
              fontSize: "1.2rem",
              maxWidth: "600px",
              padding: "1.5rem 2rem",
              fontFamily: '"Crimson Text", serif',
              color: "white",
            },
            "& .MuiTooltip-arrow": {
              color: "rgba(34, 139, 34, 0.95)",
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

// Component for individual tooltip terms with mobile support
interface TooltipTermProps {
  term: string;
  description: string;
  termKey: string;
}

function TooltipTerm({ term, description, termKey }: TooltipTermProps) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipToggle = () => {
    setOpen(!open);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <span>
        <Tooltip
          key={termKey}
          title={description}
          arrow
          placement="top"
          open={open}
          onClose={handleTooltipClose}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          sx={{
            "& .MuiTooltip-tooltip": {
              backgroundColor: "rgba(34, 139, 34, 0.95)",
              border: "1px solid rgba(144, 238, 144, 0.8)",
              fontSize: "1.2rem",
              maxWidth: "600px",
              padding: "1.5rem 2rem",
              fontFamily: '"Crimson Text", serif',
              color: "white",
              zIndex: 9999,
            },
            "& .MuiTooltip-arrow": {
              color: "rgba(28, 24, 18, 0.95)",
            },
          }}
        >
          <StyledTooltipTerm
            onClick={handleTooltipToggle}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {term}
          </StyledTooltipTerm>
        </Tooltip>
      </span>
    </ClickAwayListener>
  );
}

interface GameTextProps {
  children: string;
  component?: React.ElementType;
  [key: string]: any;
}

// Helper function to escape regex special characters
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Função para processar texto de equipamento disponível e adicionar tooltips
function processEquipmentText(text: string): ReactNode[] {
  // Verifica se o texto contém "Equipamento Disponível" ou similar
  if (!text.toLowerCase().includes("equipamento")) {
    return [text];
  }

  // Encontra a parte do texto que contém a lista de equipamentos
  const equipmentMatch = text.match(/(Equipamento Disponível[^.]*)/i);
  if (!equipmentMatch) {
    return [text];
  }

  const equipmentPart = equipmentMatch[1];
  const matchIndex = equipmentMatch.index || 0;
  const beforeEquipment = text.substring(0, matchIndex);
  const afterEquipment = text.substring(matchIndex + equipmentPart.length);

  // Divide a lista de equipamentos por vírgula e espaço
  const equipmentList = equipmentPart
    .replace(/^Equipamento Disponível[:\s]*/i, "") // Remove o prefixo
    .split(/[,\s]+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  // Retorna o texto com a tabela de equipamentos
  return [
    beforeEquipment,
    <div key="equipment-section" style={{ margin: "12px 0" }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "bold",
          marginBottom: "8px",
          color: "#d4af37",
        }}
      >
        Equipamento Disponível:
      </Typography>
      <EquipmentTable equipmentList={equipmentList} />
    </div>,
    afterEquipment,
  ];
}

function MagicKeywordsText({
  children,
  component = Typography,
  ...props
}: GameTextProps) {
  const Component = component;

  const processText = (text: string): ReactNode[] => {
    // Primeiro, processa equipamentos se o texto contém "Equipamento Disponível"
    if (text.toLowerCase().includes("equipamento")) {
      return processEquipmentText(text);
    }

    const elements: ReactNode[] = [];
    let remainingText = text;
    let keyCounter = 0;

    // Lista de armas que devem usar o tooltip especial
    const weaponTerms = [
      "Adaga",
      "Machado",
      "Espada",
      "Arma de Duas Mãos",
      "Cajado",
      "Martelo",
      "Alabarda",
      "Funda",
      "Arma Arremessável",
      "Arco",
      "Besta",
      "Besta de Mão",
      "Pistola",
      "Arcabuz",
      "Bacamarte",
      "Armadura Leve",
      "Armadura Pesada",
      "Escudo",
    ];

    // Lista de termos especiais que devem ser detectados separadamente
    const specialTerms = ["Área de Efeito"];

    const sortedTerms = [...gameTerms].sort(
      (a, b) => b.term.length - a.term.length
    );

    while (remainingText.length > 0) {
      let foundMatch = false;
      let earliestMatch: {
        index: number;
        term: string;
        description: string;
        matchedText: string;
      } | null = null;

      // First, check for "Área de Efeito" - simplified detection
      const areaOfEffectPattern = /Área de Efeito/gi;
      const areaOfEffectMatch = remainingText.match(areaOfEffectPattern);

      if (areaOfEffectMatch && areaOfEffectMatch.index !== undefined) {
        // Find the description for "Área de Efeito"
        const areaOfEffectData = gameTerms.find(
          (t) => t.term === "Área de Efeito"
        );
        if (areaOfEffectData) {
          earliestMatch = {
            index: areaOfEffectMatch.index,
            term: "Área de Efeito",
            description: areaOfEffectData.description,
            matchedText: areaOfEffectMatch[0],
          };
        }
      }

      // Then check for other special terms
      if (!earliestMatch) {
        for (const specialTerm of specialTerms) {
          const escapedTerm = escapeRegex(specialTerm);
          const regex = new RegExp(`\\b${escapedTerm}\\b`, "i");
          const match = remainingText.match(regex);

          if (match && match.index !== undefined) {
            // Find the description for this special term
            const termData = gameTerms.find((t) => t.term === specialTerm);
            if (termData) {
              // Check if this match would be the earliest one
              if (!earliestMatch || match.index < earliestMatch.index) {
                earliestMatch = {
                  index: match.index,
                  term: specialTerm,
                  description: termData.description,
                  matchedText: match[0],
                };
              }
            }
          }
        }
      }

      // Special handling for "Área de Efeito (X)" patterns
      const areaOfEffectWithParenthesesPattern =
        /Área de Efeito\s*\(([^)]+)\)/gi;
      const areaOfEffectWithParenthesesMatch = remainingText.match(
        areaOfEffectWithParenthesesPattern
      );

      if (
        areaOfEffectWithParenthesesMatch &&
        areaOfEffectWithParenthesesMatch.index !== undefined
      ) {
        const matchIndex = areaOfEffectWithParenthesesMatch.index;
        const fullMatch = areaOfEffectWithParenthesesMatch[0];
        const innerTerm = areaOfEffectWithParenthesesMatch[1]; // The X part

        // Check if this match would be the earliest one
        if (!earliestMatch || matchIndex < earliestMatch.index) {
          // Find the description for the inner term (X)
          const innerTermData = gameTerms.find((t) => t.term === innerTerm);
          if (innerTermData) {
            earliestMatch = {
              index: matchIndex,
              term: innerTerm,
              description: innerTermData.description,
              matchedText: fullMatch,
            };
          }
        }
      }

      // Then check regular terms
      for (const { term, description } of sortedTerms) {
        // Skip if this term is already in special terms
        if (specialTerms.includes(term)) {
          continue;
        }

        // For terms with parentheses, try multiple matching strategies
        const hasParentheses = term.includes("(");
        let match: RegExpMatchArray | null = null;

        if (hasParentheses) {
          // Extract base term without parentheses
          const baseTerm = term.replace(/\([^)]*\)/g, "").trim();
          const escapedTerm = escapeRegex(baseTerm);

          // Try exact match first (for terms like "Ódio(X)")
          const exactRegex = new RegExp(escapeRegex(term), "i");
          match = remainingText.match(exactRegex);

          // If no exact match, try base term match
          if (!match) {
            const baseRegex = new RegExp(`${escapedTerm}s?`, "i");
            match = remainingText.match(baseRegex);
          }
        } else {
          // For terms without parentheses, use word boundaries
          const escapedTerm = escapeRegex(term);
          const regex = new RegExp(`\\b${escapedTerm}s?\\b`, "i");
          match = remainingText.match(regex);
        }

        if (match && match.index !== undefined) {
          // Check if this match would be the earliest one
          if (!earliestMatch || match.index < earliestMatch.index) {
            earliestMatch = {
              index: match.index,
              term,
              description,
              matchedText: match[0],
            };
          }
        }
      }

      // If we found a match, process it
      if (earliestMatch) {
        // Add text before the match
        if (earliestMatch.index > 0) {
          elements.push(remainingText.substring(0, earliestMatch.index));
        }

        // Add the matched term with tooltip
        // Check if it's a weapon term to use special tooltip
        if (weaponTerms.includes(earliestMatch.term)) {
          elements.push(
            <WeaponTooltipCard
              key={`weapon-tooltip-${keyCounter++}`}
              weaponName={earliestMatch.term}
            >
              {earliestMatch.matchedText}
            </WeaponTooltipCard>
          );
        } else {
          elements.push(
            <TooltipTerm
              key={`tooltip-${keyCounter++}`}
              term={earliestMatch.matchedText}
              description={earliestMatch.description}
              termKey={`tooltip-${keyCounter}`}
            />
          );
        }

        // Update remaining text
        remainingText = remainingText.substring(
          earliestMatch.index + earliestMatch.matchedText.length
        );
        foundMatch = true;
      }

      // If no match found, add the rest of the text and break
      if (!foundMatch) {
        elements.push(remainingText);
        break;
      }
    }

    return elements;
  };

  return <Component {...props}>{processText(children)}</Component>;
}

// Advanced weapon data with detailed stats
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
}

const weaponDatabase: WeaponData[] = [
  {
    name: "Arma de Mão",
    type: "Melee",
    damage: "0",
    hands: 1,
    slots: 1,
    special: ["Pode ser empunhada com duas mãos"],
    description:
      "Uma arma corpo a corpo padrão (espada, machado, maça, etc.). Sem modificadores especiais. Pode ser empunhada com duas mãos com uma adaga ou outra arma de mão para +1 de Luta.",
  },
  {
    name: "Adaga",
    type: "Melee",
    damage: "-1",
    hands: 1,
    slots: 1,
    special: ["Lutar com Duas Mãos", "Mão secundária"],
    description:
      "Uma lâmina pequena. Causa -1 de dano. Pode ser usada na mão secundária com uma arma de mão ou equivalente para +1 de Luta.",
  },
  {
    name: "Arma de Duas Mãos",
    type: "Melee",
    damage: "+2",
    hands: 2,
    slots: 2,
    special: ["Não pode usar escudo", "Não pode mão secundária"],
    description:
      "Uma arma grande (espada grande, alabarda, etc.) que requer ambas as mãos. Causa +2 de dano. Não pode ser usada com escudo ou na mão secundária. Ocupa dois espaços de itens.",
  },
  {
    name: "Cajado",
    type: "Melee",
    damage: "-1",
    hands: 1,
    slots: 1,
    special: ["Reduz dano inimigo em 1"],
    description:
      "Um bastão de madeira favorecido por conjuradores e viajantes. Causa -1 de dano, mas o dano de combate corpo a corpo inimigo é reduzido em 1.",
  },
  {
    name: "Arco",
    type: "Ranged",
    damage: "0",
    range: "60cm",
    hands: 2,
    slots: 1,
    special: ["Requer aljava"],
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
    description:
      "Bestas requerem uma ação para carregar e uma ação para disparar. Se uma figura desejar, pode substituir sua ação de movimento por uma ação de 'recarregar'. Bestas têm um modificador de dano +2. Bestas também têm um alcance máximo de 60cm. Assume-se que todas as bestas começam o jogo carregadas e prontas para disparar. Para usar uma besta, uma figura deve também estar carregando uma aljava (que ocupa outro espaço de item) ou algum tipo de munição mágica.",
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
    description:
      "Bestas de Mão requerem uma ação para carregar e uma ação para disparar. Se uma figura desejar, pode substituir sua ação de movimento por uma ação de 'recarregar'. No entanto, podem ser usadas e carregadas com apenas uma mão. Bestas têm um modificador de dano +1 e um alcance máximo de 30cm. Além disso, Bestas de Mão contam como adagas em combate corpo a corpo, incluindo para Lutar com Duas Mãos. Assume-se que todas as bestas de mão começam o jogo carregadas e prontas para disparar.",
  },
  {
    name: "Lança de Arremesso",
    type: "Ranged",
    damage: "+1 (tiro) / -1 (combate)",
    range: "25cm",
    hands: 1,
    slots: 1,
    special: ["Uso único", "Substituída após jogo"],
    description:
      "Lanças de Arremesso são tratadas como armas de mão quando usadas em combate corpo a corpo. Elas também podem ser arremessadas até 25cm. Uma lança arremessada é tratada como um ataque a distância padrão e segue todas as regras para arcos e bestas. Qualquer magia ou efeito especial que cause penalidade a ataques de arco e besta também afetará ataques com lanças arremessadas.",
  },
  {
    name: "Funda",
    type: "Ranged",
    damage: "-2",
    range: "15cm",
    hands: 1,
    slots: 1,
    special: ["Mão secundária", "Sem sobrecarga com Pedra-Bruxa"],
    description:
      "Uma arma a distância simples com alcance de 15cm. Causa -2 de dano. Pode ser usada na mão secundária, e não causa sobrecarga ao carregar Fragmentos de Pedra-Bruxa.",
  },
  {
    name: "Armadura Leve",
    type: "Armor",
    damage: "N/A",
    hands: 0,
    slots: 1,
    special: ["+1 Armadura", "Sem penalidade de movimento"],
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
    description:
      "Um item defensivo que fornece +1 de armadura. Pode ser usado com armas de uma mão.",
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
    description:
      "Esta arma de fogo maior, de duas mãos, é a variedade mais comum de arma de pólvora negra. Causa +2 de dano e ignora 2 pontos de armadura de figuras alvo. Arcabuzes têm um alcance efetivo máximo de 60cm. Um modelo pode carregar apenas um arcabuz e nunca pode carregar um escudo. Um arcabuz pode ser usado em combate corpo a corpo. Conta como uma arma de duas mãos, mas não recebe o bônus usual de +2 de dano.",
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
    description:
      "Uma arma de fogo de uma mão com alcance de 25cm. Causa +2 de dano e ignora 2 pontos de armadura de figuras alvo. Conta como uma adaga em combate corpo a corpo, incluindo para Lutar com Duas Mãos. Requer uma ação para recarregar.",
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
    description:
      "Geralmente ficando entre uma pistola e um arcabuz em tamanho, um bacamarte é uma arma de duas mãos que dispara uma dispersão de pelotas ao invés de uma única bala. Tem um alcance efetivo máximo de 35cm. Ao disparar um bacamarte, escolha sua figura alvo, e então faça um ataque a distância contra esse alvo e toda outra figura a 2,5cm dele. Role contra seu alvo inicial primeiro. Se esta rolagem for uma falha, não role contra as outras figuras. Rolagens de 1 ao rolar contra alvos adicionais não contam como falhas. Um bacamarte pode ser usado em combate corpo a corpo da mesma forma que uma pistola, exceto que não conta para lutar com duas armas.",
  },
];

// Advanced weapon tooltip component
interface WeaponTooltipProps {
  weaponName: string;
  children: React.ReactNode;
}

function WeaponTooltip({ weaponName, children }: WeaponTooltipProps) {
  const [open, setOpen] = useState(false);
  const weapon = weaponDatabase.find((w) => w.name === weaponName);

  if (!weapon) {
    return <span>{children}</span>;
  }

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipToggle = () => {
    setOpen(!open);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <span>
        <Tooltip
          title={
            <div style={{ maxWidth: "400px" }}>
              <div
                style={{
                  marginBottom: "8px",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                {weapon.name}
              </div>
              <div
                style={{
                  marginBottom: "8px",
                  fontSize: "0.9rem",
                  opacity: 0.8,
                }}
              >
                {weapon.type} • {weapon.hands} mão{weapon.hands > 1 ? "s" : ""}{" "}
                • {weapon.slots} espaço{weapon.slots > 1 ? "s" : ""}
              </div>
              {weapon.damage !== "N/A" && (
                <div style={{ marginBottom: "4px" }}>
                  <strong>Dano:</strong> {weapon.damage}
                </div>
              )}
              {weapon.range && (
                <div style={{ marginBottom: "4px" }}>
                  <strong>Alcance:</strong> {weapon.range}
                </div>
              )}
              {weapon.special.length > 0 && (
                <div style={{ marginBottom: "8px" }}>
                  <strong>Especial:</strong>
                  <ul style={{ margin: "4px 0", paddingLeft: "16px" }}>
                    {weapon.special.map((spec, index) => (
                      <li key={index} style={{ fontSize: "0.85rem" }}>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div style={{ fontSize: "0.9rem", lineHeight: "1.3" }}>
                {weapon.description}
              </div>
            </div>
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
              backgroundColor: "rgba(34, 139, 34, 0.95)",
              border: "1px solid rgba(144, 238, 144, 0.8)",
              fontSize: "1.2rem",
              maxWidth: "600px",
              padding: "1.5rem 2rem",
              fontFamily: '"Crimson Text", serif',
              color: "white",
            },
            "& .MuiTooltip-arrow": {
              color: "rgba(34, 139, 34, 0.95)",
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

export { WeaponTooltip, weaponDatabase };
export default MagicKeywordsText;
