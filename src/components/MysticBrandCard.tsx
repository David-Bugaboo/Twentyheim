import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import GameText from "./GameText";

interface MysticBrandCardProps {
  name: string;
  effect: string;
  type: "Totemic" | "Ancestral";
}

const Card = styled(Box)(({ theme }) => ({
  marginTop: "1.5rem",
  padding: "1.5rem",
  background: `
    linear-gradient(180deg, rgba(28, 18, 24, 0.9) 0%, rgba(20, 14, 18, 0.9) 100%)
  `,
  border: "1px solid rgba(185, 99, 135, 0.4)",
  borderRadius: "3px",
  boxShadow: `
    0 2px 6px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(185, 99, 135, 0.1)
  `,
  [theme.breakpoints.down("sm")]: {
    marginTop: "1rem",
    padding: "1.25rem 1rem",
  },
}));

const BrandName = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#b96387",
  marginBottom: "0.5rem",
  textAlign: "center",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.15rem",
    marginBottom: "0.4rem",
  },
}));

const BrandType = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#c4a870",
  marginBottom: "1rem",
  textAlign: "center",
  letterSpacing: "0.03em",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.75rem",
  },
}));

const BrandText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.05rem",
  lineHeight: 1.6,
  color: "#d4c4a8",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
}));

function MysticBrandCard({ name, effect, type }: MysticBrandCardProps) {
  return (
    <Card>
      <BrandName>{name}</BrandName>
      <BrandType>{type} Mark</BrandType>
      <GameText component={BrandText}>{effect}</GameText>
    </Card>
  );
}

export default MysticBrandCard;

