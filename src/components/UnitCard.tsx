import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import GameText from "./GameText";
import SpellAffinityTable, { type SpellAffinity } from "./SpellAffinityTable";
import { spellAffinities } from "../data/spellAffinities";

interface UnitStats {
  move: number | string;
  fight: string;
  shoot: string;
  armour: number | string;
  will: string;
  health: number;
  cost: string;
}

interface UnitAbility {
  name: string;
  description: string;
  spellAffinity?: string;
}

interface UnitCardProps {
  name: string;
  role?: string; // Hero, Champion, Specialist, etc.
  stats: UnitStats;
  abilities: UnitAbility[];
  spellAffinity?: SpellAffinity;
}

const Card = styled(Box)(({ theme }) => ({
  marginTop: "2rem",
  padding: "2rem",
  background: `
    linear-gradient(180deg, rgba(28, 24, 18, 0.95) 0%, rgba(20, 18, 14, 0.95) 100%)
  `,
  border: "2px solid rgba(139, 115, 85, 0.4)",
  borderRadius: "4px",
  boxShadow: `
    0 4px 12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(212, 175, 55, 0.15)
  `,
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem 1rem",
    marginTop: "1.5rem",
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.8rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "1rem",
  textAlign: "center",
  letterSpacing: "0.08em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
    marginBottom: "0.75rem",
  },
}));

const StatRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.5rem",
  marginBottom: "1.5rem",
  padding: "1rem",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  border: "1px solid rgba(139, 115, 85, 0.3)",
  borderRadius: "2px",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "0.75rem",
    padding: "0.75rem 0.5rem",
    fontSize: "0.9rem",
  },
}));

const StatItem = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.3rem",
});

const StatLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "0.75rem",
  fontWeight: 600,
  color: "#d4af37",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.65rem",
  },
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#e0e0e0",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
  },
}));

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

const AbilityTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "0.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
  },
}));

const AbilityText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.1rem",
  lineHeight: 1.6,
  color: "#d4c4a8",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
}));

function UnitCard({
  name,
  role,
  stats,
  abilities,
  spellAffinity,
}: UnitCardProps) {
  const displayName = role ? `${name} (${role})` : name;

  return (
    <Card>
      <CardTitle>{displayName}</CardTitle>
      <StatRow>
        <StatItem>
          <StatLabel>Move</StatLabel>
          <StatValue>{stats.move}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Fight</StatLabel>
          <StatValue>{stats.fight}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Shoot</StatLabel>
          <StatValue>{stats.shoot}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>armour</StatLabel>
          <StatValue>{stats.armour}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Will</StatLabel>
          <StatValue>{stats.will}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Health</StatLabel>
          <StatValue>{stats.health}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Cost</StatLabel>
          <StatValue>{stats.cost}</StatValue>
        </StatItem>
      </StatRow>

      {spellAffinity && (
        <Box sx={{ mt: 2 }}>
          <SpellAffinityTable affinity={spellAffinity} />
        </Box>
      )}

      <AbilitySection>
        {abilities.map((ability, index) => (
          <AbilityItem key={index}>
            <AbilityTitle>{ability.name}</AbilityTitle>
            <GameText component={AbilityText}>{ability.description}</GameText>
            {ability.spellAffinity &&
              spellAffinities[ability.spellAffinity] && (
                <SpellAffinityTable
                  affinity={spellAffinities[ability.spellAffinity]}
                />
              )}
          </AbilityItem>
        ))}
      </AbilitySection>
    </Card>
  );
}

export default UnitCard;
