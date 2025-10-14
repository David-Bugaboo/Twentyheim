import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { magicItems } from "./data/magic-items.data";
import GameText from "../../components/GameText";

const ItemCard = styled(Box)(({ theme }) => ({
  marginTop: "1.5rem",
  padding: "1.5rem",
  background: `
    linear-gradient(180deg, rgba(28, 24, 18, 0.9) 0%, rgba(20, 18, 14, 0.9) 100%)
  `,
  border: "1px solid rgba(212, 175, 55, 0.4)",
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

const ItemName = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "0.5rem",
  textAlign: "center",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.15rem",
  },
}));

const ItemCategory = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "#c4a870",
  marginBottom: "1rem",
  textAlign: "center",
  letterSpacing: "0.03em",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const ItemDescription = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.05rem",
  lineHeight: 1.6,
  color: "#d4c4a8",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
}));

export default function MagicItemsPage() {
  return (
    <PageContainer>
      <Header title="Magic Items" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            In the depths of Wyrdgrave, among the ruins of lost civilizations,
            lie artifacts of unimaginable power. Rings that defy gravity, staffs
            that channel arcane power, amulets that repel spells - each magic
            item is a relic of past ages, imbued with enchantments that
            transcend time.
          </ParchmentText>

          <ParchmentText>
            These items are not mere tools - they are fragments of legends,
            pieces of history crystallized in metal, stone and bone. A wizard
            who wields a Staff of Power carries the legacy of long-dead
            arcanists. A warrior wearing Gloves of Strength feels the echo of
            ancient champions flowing through their strikes.
          </ParchmentText>
        </ContentContainer>
      </ContentSection>

      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Magic Items</PowerListTitle>
          {magicItems.map((item, index) => (
            <ItemCard key={index}>
              <ItemName>{item.name}</ItemName>
              {item.category && <ItemCategory>{item.category}</ItemCategory>}
              <GameText component={ItemDescription}>
                {item.description}
              </GameText>
            </ItemCard>
          ))}
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
}
