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
} from "../pages/weapons and equipments/data/commonItemsData";

interface GameTerm {
  term: string;
  description: string;
}

// Função para criar mapeamento de equipamentos dos dados comuns
const createEquipmentMap = () => {
  const equipmentMap = new Map<string, EquipmentItem>();

  commonItemsData.forEach((category) => {
    category.items.forEach((item) => {
      equipmentMap.set(item.name, item);
    });
  });

  return equipmentMap;
};

const equipmentMap = createEquipmentMap();

const gameTerms: GameTerm[] = [
  {
    term: "Marcador de Sangramento",
    description:
      "Uma criatura com um Marcador de Sangramento sofre 2 de dano sempre que se move ou sofre dano. Poções de cura ou magias/poderes de cura podem remover Marcadores de Sangramento.",
  },
  {
    term: "Marcador de Atordoamento",
    description:
      "Uma figura com um Marcador de Atordoamento deve gastar uma ação para remover o Marcador de Atordoamento. Ela então age normalmente com quaisquer ação restantes. Uma criatura nunca pode ter mais que dois marcadores de atordoamento por vez.",
  },
  {
    term: "Marcador de Chamas",
    description:
      "Uma criatura com um Marcador de Chamas  sofre 3 de dano elemental no início de cada uma de suas ativações até gastar uma ação para apagar o fogo.",
  },
  {
    term: "Marcador de Reverberação",
    description:
      "Uma criatura com um marcador de eco sofre 1 de dano extra sempre que sofre dano para cada marcador de eco que possui.",
  },
  {
    term: "Marcador de Sabedoria",
    description:
      "Pode ser descartado para rerrolar uma Rolagem de Combate, Rolagem de Tiro ou teste de Atributo. A figura deve aceitar o resultado da rerrolagem. Nenhuma figura pode ter mais de um marcador de sabedoria por vez.",
  },
  {
    term: "Marcador de Ódio",
    description:
      "Pode ser gasto para rerrolar qualquer rolagem de Luta ou Ataque a Distância que a figura faça. Nenhuma figura pode ter mais de um marcador de ódio por vez.",
  },
  {
    term: "Mente de Ferro",
    description: "Esta criatura é Imune a Qualquer Efeito Psicológico.",
  },
  {
    term: "Grande",
    description:
      "Esta criatura enorme é mais fácil de mirar com ataques a distância. Ela sofre do modificador Alvo Grande (-2) ao se defender contra ataques a distância.",
  },
  {
    term: "Forte",
    description: "Esta criatura causa +2 de dano.",
  },
  {
    term: "Aterrorizante",
    description:
      "Inimigos devem passar em um teste de Vontade CD 12 para declarar carga contra com esta criatura. Falha não custa a ação mas impede a tentativa até a próxima ativação.",
  },
  {
    term: "Morto-Vivo",
    description:
      "Esta criatura é imune a veneno e nunca conta como ferida. Criaturas mortas-vivas podem pegar e carregar marcadores de tesouro mas não têm espaços de itens.",
  },
  {
    term: "Animal",
    description:
      "Uma criatura natural com inteligência menor que humana. Mesmo se se tornarem membros de um bando, animais não podem pegar marcadores de tesouro e não têm espaços de itens. Animais não ganham experiência.",
  },
  {
    term: "Anfíbio",
    description:
      "Esta criatura é perfeitamente feliz em terra ou na água. Ela automaticamente passa em todas as Rolagens de Natação, trata água como normal ao invés de terreno acidentado, e não sofre penalidades de Luta por estar na água.",
  },
  {
    term: "Voador",
    description:
      "Esta criatura ignora todas as penalidades de terreno e movimento ao se mover. Além disso, nunca sofre dano de queda. Criaturas voadoras automaticamente passam em todas as Rolagens de Natação.",
  },
  {
    term: "Levitar",
    description:
      "Ignore quaisquer penalidades de movimento por terreno acidentado e escalar.",
  },
  {
    term: "Recompensa",
    description:
      "Há uma recompensa de (X) aguardando o bando que matar esta criatura",
  },
  {
    term: "Visão Verdadeira",
    description:
      "Ignore qualquer efeito psicológico e invisibilidade ao determinar as ações desta criatura. Além disso, se esta figura estiver em combate com um membro de um bando gerado pela magia Ilusão, essa figura é imediatamente removida da mesa.",
  },
  {
    term: "Veneno",
    description:
      "Ataques desta criatura são venenosos e envenenam a figura alvo.",
  },
  {
    term: "Regeneração",
    description: "A figura recupera 2 de vida no início de sua ativação .",
  },
  {
    term: "Agarrar",
    description:
      "Figuras em combate com esta criatura só podem empurrar a si mesmas ou seu oponente se causarem dano. Simplesmente vencer o combate não é suficiente.",
  },
  {
    term: "Dreno de Energia",
    description:
      "Esta criatura causa dano dobrado em combate. mortos-vivos e construtos são imunes a este dano extra e só sofrem a quantidade padrão.",
  },
  {
    term: "Toque Vampírico",
    description:
      "Esta figura ganha 2 de vida sempre que causa pelo menos 1 de dano. Esse efeito não é desencadeado em mortos-vivos e construtos.",
  },
  {
    term: "Caçador de Matilha",
    description:
      "Sempre que um caçador de matilha é ativado, todos os outros caçadores de matilha em contato com ele devem ser ativados e movidos como um. Role aleatoriamente para ver qual criatura é o 'líder da matilha' e determine as ações da matilha usando essa figura.",
  },

  {
    term: "Resistência Elemental (X)",
    description:
      "Sempre que esta criatura sofre dano elementar, aumente sua armadura em (X) para determinar o dano daquele ataque.",
  },
  {
    term: "Toque Ardente",
    description: "Ataques desta figura causam 2 de dano extra elemental.",
  },
  {
    term: "Chifres",
    description:
      "Se esta criatura se move para combate e gasta uma ação para lutar como parte da mesma ativação, ela recebe +2 de Luta apenas para aquele ataque.",
  },
  {
    term: "Construto",
    description:
      "Esta criatura é imune a veneno e nunca conta como ferida. Construtos podem pegar e carregar marcadores de tesouro mas não têm espaços de itens. Embora construtos nunca possam carregar itens, alguns itens podem ser permanentemente enxertados neles – se disponível, esta opção será notada na descrição do item.",
  },
  {
    term: "Daemônio",
    description:
      "Todos os ataques feitos por esta criatura contam como ataques mágicos. Esta criatura é imune a veneno. Daemônios podem pegar e carregar marcadores de tesouro mas não têm espaços de itens.",
  },
  {
    term: "Vulnerabilidade Elemental",
    description:
      "Esta criatura é vulnerável a dano elementar. Ao sofrer dano elementar, reduza sua armadura em (X) para determinar o dano.",
  },
  {
    term: "Selvagem",
    description:
      "Os ataques desta criatura contam como usando uma Arma de Duas Mãos, causando dano aumentado com golpes brutais.",
  },
  {
    term: "Cobertura Pesada",
    description:
      "Ataques a distância contra figuras em Cobertura Pesada sofrem -4 em suas rolagens de Tiro.",
  },
  {
    term: "Cobertura Leve",
    description:
      "Ataques a distância contra figuras em Cobertura Leve sofrem -2 em suas rolagens de Tiro.",
  },
  {
    term: "Imunidade Parcial a Dano Normal",
    description:
      "Sempre que esta figura sofre dano de um ataque não-mágico o dano é reduzido pela metade, arredondando para baixo.",
  },
  {
    term: "Vulnerabilidade Sagrada",
    description:
      "Esta criatura sofre -1 em todas as Rolagens de Vontade ao rolar para resistir a magias de Tradições Divinas.",
  },
  {
    term: "Duas Cabeças",
    description:
      "Uma figura lutando contra uma criatura de duas cabeças sempre conta como tendo uma figura de apoio a menos do que realmente tem (mínimo de 0).",
  },
  {
    term: "Vulnerabilidade Elemental",
    description:
      "Esta criatura é vulnerável a dano elementar. Ao sofrer dano elementar, reduza sua armadura em (X) para determinar o dano.",
  },
  {
    term: "Duas Mãos",
    description:
      "Uma arma com essa característica ocupa dois espaços de items, e não pode ser usada junto de nenhuma outra arma ou escudos: seu peso exige toda a concentração e força do personagem.",
  },
  {
    term: "Penetração de Armadura (X)",
    description:
      "Essa arma trata a armadura de inimigos que atinge como (X) pontos menor.",
  },
  {
    term: "Leve",
    description:
      "A primeira arma com essa característica carregada por uma figura não consome um espaço de item. Pode ser usada na mão secundária para ganhar +1 de Ímpeto em lutas.",
  },
  {
    term: "Versátil",
    description:
      "Uma arma com essa característica pode ser usado com uma ou duas mãos. Se usada com duas mãos, causa +1 de dano. Mesmo se usada com uma mão, não pode se beneficiar de uma arma leve na mão secundária, apenas de escudos.",
  },
  {
    term: "Par",
    description:
      "Armas com essa característica devem sempre ser usadas em pares, ocupando ambas as mãos, mas provendo o bônus de +1 Ímpeto de lutar com duas armas se for leve. A figura equipada nunca pode desequipar apenas uma arma de par, e se perder a arma perde ambas.",
  },
  {
    term: "Venenosa",
    description:
      "Uma arma com essa característica envenena o alvo em um ataque bem-sucedido, mesmo se não causar dano.",
  },
  {
    term: "Concussiva(X)",
    description:
      "Uma arma com essa característica dá ao alvo de qualquer ataque bem-sucedido que cause mais que (X) de dano um marcador de Atordoamento.",
  },
  {
    term: "Abençoada (X)",
    description:
      "Essa arma ignora (X) pontos de armadura do alvo, se esta tiver as caracteristicas Morto-vivo ou Daemônio.",
  },
  {
    term: "Desbalanceada",
    description:
      "Uma arma com essa característica nunca pode ser usada com uma arma leve na mão secundária, apenas escudos.",
  },
  {
    term: "Defensiva",
    description:
      "Inimigos causam -1 de dano no portador de uma arma com essa característica.",
  },
  {
    term: "Cruel",
    description:
      "Uma arma com essa característica conta como tendo causado um ataque crítico em uma rolagem natural de 19 ou 20. Essa característica só é aplicada se esta for a arma da mão principal.",
  },
  {
    term: "Chicote(X)",
    description:
      "Uma arma com essa característica pode ser usada para fazer ataques à distância, até uma distância máxima de (X)cm, usando seu atributo Ímpeto. Adicionalmente, uma vez por turno, se um modelo se mover dentro de (X)cm do portador dessa arma, ele pode fazer um ataque à distância +0 contra aquele alvo, usando quaisquer modificadores de dano e ímpeto que a arma possa vir a ter nesse ataque. Usar um em cada mão não permite usar essa reação duas vezes por turno.",
  },
  {
    term: "Giros Brutais",
    description:
      "Uma figura equipada com uma funda pode gastar uma ação, que pode substituir a ação de Agilidade para girar sua funda com mais força. Aumente o alcance do próximo ataque a distancia em 6cm.",
  },
  {
    term: "Arma de Tecido",
    description:
      "Embora não possa ser usada para ganhar +1 de impeto em lutas, uma figura carregando uma arma na mão principal e uma funda na mão secundária ainda pode pode pegar Fragmentos de Pedra-Bruxa, mas não pode usar a funda para atirar enquanto estiver carregando o fragmento..",
  },
  {
    term: "Hibrida",
    description:
      "Pode ser usada como arma corpo a corpo ou a distância, recebendo -1 de dano se for usada como arma a distância.",
  },
  {
    term: "Corda de Alta Tensão",
    description:
      "Devido a alta tensão necessária para disparar uma flecha, um usuário de arco longo precisa de todo folego. Figuras inimigas ganhamn +1 de bonus adicional para sua rolagem de impeto contra tiros feitos pelo portador desse arco caso ele tenha movido antes de atirar.",
  },
  {
    term: "Recarga",
    description:
      "Essa arma requer o uso de uma ação para recarregá-la e poder atirar novamente. Contudo, essa ação pode substituir a ação de Agilidade.",
  },
  {
    term: "Pistola",
    description:
      "Uma arma com essa característica é leve e prática, podendo ser usada com apenas uma mão. Ela conta como uma adaga em combate corpo a corpo, inclusive para Lutar com Duas Armas.",
  },
  {
    term: "Capacidade (X)",
    description:
      "Uma arma com essa característica pode disparar (X) vezes  antes de precisar recarregar. Cada flecha ou bala deve ser recarregada individualmente com uma ação de recarga.",
  },
  {
    term: "Engenharia Complexa",
    description:
      "Uma arma com essa característica trava em casos específicos. Quando o portador rola um 1 natural em um ataque, a arma trava, e só pode ser usada novamente gastando uma ação, que pode substituir a ação de Agilidade.",
  },
  {
    term: "Coice Violento",
    description:
      "A explosão da pólvora faz a arma ter um recuo violento ao atirar. Ataques à distância com armas com essa característica são feitos a -1.",
  },
  {
    term: "Falha de Ignição (X-Y)",
    description: `Quando o portador de uma arma com essa característica faz uma rolagem natural entre e incluindo os numeros (X) e (Y) na rolagem de ataque a distancia, a arma tem uma falha na ignição. Role outro d20 para saber o resultado:\n
      1-5: A Arma apenas engasga. Deve gastar uma ação, que pode substituir a ação de Agilidade, para consertar.
      6-10: A arma falha de maneira espetacular. Não pode mais ser usada durante aquele jogo apenas.
      11-15: A polvora explode na arma, danificando o atirador. Ele sofre um ataque a distancia +1. A Arma é perdida para sempre.
      16-20: A polvora explode espetacularmente e reage com o chifre de pólvora do atirador, danificando o atirador. O atirador e todas as criaturas a até 8cm dele sofrem um ataque a distancia +1. A Arma e o chifre de pólvora estão perdidos para sempre.
      `,
  },
  {
    term: "Trovejante(X-Y)",
    description:
      "Ao rolar naturalmente qualquer número dentre incluindo, (X) e (Y) na rolagem de dado, um encontro aleatório é imediatamente rolado na borda do mapa mais próxima da figura que atirou.",
  },
  {
    term: "Pistola do Duelista",
    description:
      "Uma arma com essa característica é leve e precisa, podendo ser usada com apenas uma mão. Ela conta como uma espada em combate corpo a corpo, inclusive para Lutar com Duas Armas.",
  },
  {
    term: "Construção Robusta",
    description:
      "Essa arma pode ser usada em combate corpo a corpo como uma arma de duas mãos, mas sem o bonus de +2 de dano que é comum a elas.",
  },
  {
    term: "Tripé",
    description:
      "Uma figura só pode atirar com essa arma se esta estiver montada em um tripé. Montar o tripé gasta uma ação que pode substituir a ação de Agilidade. Desmontar não custa ações, mas deverá montar se quiser atirar de novo.",
  },
  {
    term: "Tiro de Dispersão",
    description:
      "Quando o portador dessa arma atira contra um alvo, ele pode atirar em todos os alvos a até 3cm do alvo inicial. Role uma rolagem diferente para cada alvo, e considere o ponto de origem para terreno interposto e cobertura o alvo inicial. Rolagens além da primeira não causam Falha na Ignição.",
  },
];

const StyledTooltipTerm = styled("span")({
  textDecoration: "underline dotted",
  textDecorationColor: "#d4af37",
  textDecorationThickness: "1px",
  textUnderlineOffset: "2px",
  cursor: "pointer",
  userSelect: "none",
  "&:hover": {
    color: "#d4af37",
  },
  "&:active": {
    color: "#c4a870",
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
                  {equipment.properties.map((prop, index) => (
                    <div
                      key={index}
                      style={{ marginBottom: "4px", fontSize: "0.9rem" }}
                    >
                      <strong>{prop.label}:</strong> {prop.value}
                    </div>
                  ))}
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
              backgroundColor: "rgba(28, 24, 18, 0.95)",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              fontSize: "1rem",
              maxWidth: "500px",
              padding: "1rem 1.25rem",
              fontFamily: '"Crimson Text", serif',
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
              backgroundColor: "rgba(28, 24, 18, 0.95)",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              fontSize: "1.05rem",
              maxWidth: "400px",
              padding: "1rem 1.25rem",
              fontFamily: '"Crimson Text", serif',
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

function GameText({
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
      "Arma de Concussão",
      "Arma de Haste",
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

      for (const { term, description } of sortedTerms) {
        const escapedTerm = escapeRegex(term);

        // Create regex that matches the term (case insensitive)
        // Allow optional 's' at the end for plurals
        // Match word boundaries and allow for punctuation after
        const regex = new RegExp(`\\b${escapedTerm}s?\\b`, "i");
        const match = remainingText.match(regex);

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
              backgroundColor: "rgba(28, 24, 18, 0.95)",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              fontSize: "1rem",
              maxWidth: "500px",
              padding: "1rem 1.25rem",
              fontFamily: '"Crimson Text", serif',
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
            {children}
          </StyledTooltipTerm>
        </Tooltip>
      </span>
    </ClickAwayListener>
  );
}

export { WeaponTooltip, weaponDatabase };
export default GameText;
