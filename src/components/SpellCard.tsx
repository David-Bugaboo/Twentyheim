import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import GameText from "./GameText";

interface SpellCardProps {
  id?: string;
  name: string;
  school: string;
  castingNumber: number;
  range: string;
  effect: string;
}

const Card = styled(Box)(({ theme }) => ({
  marginTop: "1.5rem",
  padding: "1.5rem",
  background: `
    linear-gradient(180deg, rgba(28, 24, 18, 0.9) 0%, rgba(20, 18, 14, 0.9) 100%)
  `,
  border: "1px solid rgba(139, 115, 85, 0.4)",
  borderRadius: "3px",
  boxShadow: `
    0 2px 6px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(212, 175, 55, 0.1)
  `,
  [theme.breakpoints.down("sm")]: {
    marginTop: "1rem",
    padding: "1.25rem 1rem",
  },
}));

const SpellName = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "0.5rem",
  textAlign: "center",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.15rem",
    marginBottom: "0.4rem",
  },
}));

const SpellMetaContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  marginBottom: "1.25rem",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "1rem",
    gap: "0.6rem",
  },
}));

const SpellMetaRow = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.25rem",
});

const SpellMetaLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "#d4af37",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
}));

const SpellMetaValue = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#c4a870",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const SpellText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.05rem",
  lineHeight: 1.6,
  color: "#d4c4a8",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
}));

function SpellCard({
  id,
  name,
  school,
  castingNumber,
  range,
  effect,
}: SpellCardProps) {
  return (
    <Card id={id}>
      <SpellName>{name}</SpellName>
      <SpellMetaContainer>
        <SpellMetaRow>
          <SpellMetaLabel>TRADIÇÃO</SpellMetaLabel>
          <SpellMetaValue>{school}</SpellMetaValue>
        </SpellMetaRow>
        <SpellMetaRow>
          <SpellMetaLabel>CLASSE DE DIFICULDADE</SpellMetaLabel>
          <SpellMetaValue>{castingNumber}</SpellMetaValue>
        </SpellMetaRow>
        <SpellMetaRow>
          <SpellMetaLabel>ALVOS</SpellMetaLabel>
          <SpellMetaValue>{range}</SpellMetaValue>
        </SpellMetaRow>
      </SpellMetaContainer>
      <GameText component={SpellText}>{effect}</GameText>
    </Card>
  );
}

export default SpellCard;
