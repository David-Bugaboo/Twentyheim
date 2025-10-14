import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import GameText from "./GameText";

interface DaemonStats {
  move: number | string;
  fight: string;
  shoot: string;
  armour: number | string;
  will: string;
  health: number;
  cost: string;
}

interface DaemonAbility {
  name: string;
  description: string;
}

interface DaemonCardProps {
  name: string;
  stats: DaemonStats;
  abilities: DaemonAbility[];
  chaosGod?: "khorne" | "nurgle" | "tzeentch" | "slaanesh";
}

// Color schemes for each Chaos God
const chaosColors = {
  khorne: {
    primary: "#8B0000", // Dark red
    secondary: "#DC143C", // Crimson
    accent: "#ff6b6b",
    gradient: "linear-gradient(180deg, rgba(139, 0, 0, 0.3) 0%, rgba(75, 0, 0, 0.3) 100%)",
    border: "rgba(220, 20, 60, 0.5)",
  },
  nurgle: {
    primary: "#2F4F2F", // Dark green
    secondary: "#6B8E23", // Olive
    accent: "#90EE90",
    gradient: "linear-gradient(180deg, rgba(47, 79, 47, 0.3) 0%, rgba(34, 60, 34, 0.3) 100%)",
    border: "rgba(107, 142, 35, 0.5)",
  },
  tzeentch: {
    primary: "#191970", // Midnight blue
    secondary: "#4169E1", // Royal blue
    accent: "#87CEEB",
    gradient: "linear-gradient(180deg, rgba(25, 25, 112, 0.3) 0%, rgba(15, 15, 70, 0.3) 100%)",
    border: "rgba(65, 105, 225, 0.5)",
  },
  slaanesh: {
    primary: "#4B0082", // Indigo
    secondary: "#9370DB", // Medium purple
    accent: "#DA70D6",
    gradient: "linear-gradient(180deg, rgba(75, 0, 130, 0.3) 0%, rgba(50, 0, 90, 0.3) 100%)",
    border: "rgba(147, 112, 219, 0.5)",
  },
  default: {
    primary: "#d4af37",
    secondary: "#c4a870",
    accent: "#DAA520",
    gradient: "linear-gradient(180deg, rgba(28, 24, 18, 0.95) 0%, rgba(20, 18, 14, 0.95) 100%)",
    border: "rgba(139, 115, 85, 0.4)",
  },
};

const Card = styled(Box, {
  shouldForwardProp: (prop) => prop !== "chaosGod",
})<{ chaosGod?: string }>(({ chaosGod }) => {
  const colors = chaosGod && chaosColors[chaosGod as keyof typeof chaosColors]
    ? chaosColors[chaosGod as keyof typeof chaosColors]
    : chaosColors.default;

  return {
    marginTop: "2rem",
    padding: "2rem",
    background: `
      ${colors.gradient},
      linear-gradient(180deg, rgba(28, 24, 18, 0.95) 0%, rgba(20, 18, 14, 0.95) 100%)
    `,
    border: `2px solid ${colors.border}`,
    borderRadius: "4px",
    boxShadow: `
      0 4px 12px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 ${colors.border}
    `,
  };
});

const CardTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "chaosGod",
})<{ chaosGod?: string }>(({ chaosGod }) => {
  const colors = chaosGod && chaosColors[chaosGod as keyof typeof chaosColors]
    ? chaosColors[chaosGod as keyof typeof chaosColors]
    : chaosColors.default;

  return {
    fontFamily: '"Cinzel", serif',
    fontSize: "1.8rem",
    fontWeight: 700,
    color: colors.accent,
    marginBottom: "1rem",
    textAlign: "center",
    letterSpacing: "0.08em",
  };
});

const StatRow = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.5rem",
  marginBottom: "1.5rem",
  padding: "1rem",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(139, 115, 85, 0.3)",
  borderRadius: "2px",
});

const StatItem = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.3rem",
});

const StatLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "chaosGod",
})<{ chaosGod?: string }>(({ chaosGod }) => {
  const colors = chaosGod && chaosColors[chaosGod as keyof typeof chaosColors]
    ? chaosColors[chaosGod as keyof typeof chaosColors]
    : chaosColors.default;

  return {
    fontFamily: '"Cinzel", serif',
    fontSize: "0.75rem",
    fontWeight: 600,
    color: colors.secondary,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };
});

const StatValue = styled(Typography)({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#e0e0e0",
});

const AbilitySection = styled(Box)({
  marginTop: "1.5rem",
  paddingTop: "1.5rem",
  borderTop: "1px solid rgba(139, 115, 85, 0.2)",
});

const AbilityItem = styled(Box)({
  marginBottom: "1rem",
  "&:last-child": {
    marginBottom: 0,
  },
});

const AbilityTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "chaosGod",
})<{ chaosGod?: string }>(({ chaosGod }) => {
  const colors = chaosGod && chaosColors[chaosGod as keyof typeof chaosColors]
    ? chaosColors[chaosGod as keyof typeof chaosColors]
    : chaosColors.default;

  return {
    fontFamily: '"Cinzel", serif',
    fontSize: "1.1rem",
    fontWeight: 700,
    color: colors.accent,
    marginBottom: "0.5rem",
  };
});

const AbilityText = styled(Typography)({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.1rem",
  lineHeight: 1.6,
  color: "#d4c4a8",
});

function DaemonCard({ name, stats, abilities, chaosGod }: DaemonCardProps) {
  return (
    <Card chaosGod={chaosGod}>
      <CardTitle chaosGod={chaosGod}>{name}</CardTitle>
      <StatRow>
        <StatItem>
          <StatLabel chaosGod={chaosGod}>Move</StatLabel>
          <StatValue>{stats.move}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel chaosGod={chaosGod}>Fight</StatLabel>
          <StatValue>{stats.fight}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel chaosGod={chaosGod}>Shoot</StatLabel>
          <StatValue>{stats.shoot}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel chaosGod={chaosGod}>armour</StatLabel>
          <StatValue>{stats.armour}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel chaosGod={chaosGod}>Will</StatLabel>
          <StatValue>{stats.will}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel chaosGod={chaosGod}>Health</StatLabel>
          <StatValue>{stats.health}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel chaosGod={chaosGod}>Cost</StatLabel>
          <StatValue>{stats.cost}</StatValue>
        </StatItem>
      </StatRow>

      <AbilitySection>
        {abilities.map((ability, index) => (
          <AbilityItem key={index}>
            <AbilityTitle chaosGod={chaosGod}>{ability.name}</AbilityTitle>
            <GameText component={AbilityText}>{ability.description}</GameText>
          </AbilityItem>
        ))}
      </AbilitySection>
    </Card>
  );
}

export default DaemonCard;

