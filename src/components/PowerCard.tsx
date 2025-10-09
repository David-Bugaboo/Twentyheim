import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import GameText from "./GameText";

interface PowerCardProps {
  name: string;
  when: string;
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

const PowerName = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "1rem",
  textAlign: "center",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.15rem",
    marginBottom: "0.75rem",
  },
}));

const PowerSection = styled(Box)({
  marginBottom: "0.8rem",
  "&:last-child": {
    marginBottom: 0,
  },
});

const PowerLabel = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "0.9rem",
  fontWeight: 700,
  color: "#c4a870",
  marginBottom: "0.3rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
  },
}));

const PowerText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.05rem",
  lineHeight: 1.6,
  color: "#d4c4a8",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
}));

function PowerCard({ name, when, effect }: PowerCardProps) {
  return (
    <Card>
      <PowerName>{name}</PowerName>
      <PowerSection>
        <PowerLabel>When:</PowerLabel>
        <GameText component={PowerText}>{when}</GameText>
      </PowerSection>
      <PowerSection>
        <PowerLabel>Effect:</PowerLabel>
        <GameText component={PowerText}>{effect}</GameText>
      </PowerSection>
    </Card>
  );
}

export default PowerCard;

