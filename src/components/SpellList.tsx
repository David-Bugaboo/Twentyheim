import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import SpellCard from "./SpellCard";
import { PowerListTitle } from "./PageComponents";

interface Spell {
  name: string;
  castingNumber: number;
  range: string;
  effect: string;
}

interface SpellListProps {
  spells: Spell[];
  school: string;
  showTitle?: boolean;
}

const ListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    gap: "1rem",
  },
}));

function SpellList({ spells, school, showTitle = true }: SpellListProps) {
  return (
    <ListContainer>
      {showTitle && <PowerListTitle>{school}</PowerListTitle>}
      {spells.map((spell, index) => (
        <SpellCard
          key={index}
          id={spell.name.toLowerCase().replace(/\s+/g, "-")}
          name={spell.name}
          school={school}
          castingNumber={spell.castingNumber}
          range={spell.range}
          effect={spell.effect}
        />
      ))}
    </ListContainer>
  );
}

export default SpellList;
