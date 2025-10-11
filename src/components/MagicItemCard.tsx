import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";
import GameText from "./GameText";

interface MagicItemCardProps {
  id?: string;
  name: string;
  type: string;
  price: string;
  effect: string;
}

const Card = styled(Box)(({ theme }) => ({
  marginBottom: "1.5rem",
  padding: "1.5rem",
  background: `
    linear-gradient(180deg, rgba(28, 24, 18, 0.9) 0%, rgba(20, 18, 14, 0.9) 100%)
  `,
  border: "2px solid #8B4513",
  borderRadius: "4px",
  boxShadow: `
    0 4px 8px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(212, 175, 55, 0.1)
  `,
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: "#d4af37",
    boxShadow: `
      0 6px 12px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(212, 175, 55, 0.2)
    `,
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "1.25rem",
    padding: "1.25rem 1rem",
  },
}));

const ItemName = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#DAA520",
  marginBottom: "0.5rem",
  letterSpacing: "0.03em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.15rem",
    marginBottom: "0.4rem",
  },
}));

const ItemType = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "0.9rem",
  fontStyle: "italic",
  color: "#c4a870",
  marginBottom: "0.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
  },
}));

const ItemPrice = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "0.95rem",
  fontStyle: "italic",
  color: "#d4c5a0",
  marginBottom: "1rem",
  "& strong": {
    color: "#d4af37",
    fontWeight: 700,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
    marginBottom: "0.8rem",
  },
}));

const ItemText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1rem",
  lineHeight: 1.7,
  color: "#d4c4a8",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.95rem",
    lineHeight: 1.6,
  },
}));

const MagicItemCard = forwardRef<HTMLDivElement, MagicItemCardProps>(
  ({ id, name, type, price, effect }, ref) => {
    return (
      <Card id={id} ref={ref}>
        <ItemName>{name}</ItemName>
        <ItemType>{type}</ItemType>
        <ItemPrice>
          <strong>Price:</strong> {price}
        </ItemPrice>
        <GameText component={ItemText}>{effect}</GameText>
      </Card>
    );
  }
);

MagicItemCard.displayName = "MagicItemCard";

export default MagicItemCard;

