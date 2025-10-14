import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  potionsData,
  lesserPotionTable,
  greaterPotionTable,
} from "./data/potions.data";
import GameText from "../../components/GameText";

const PotionCard = styled(Box)(({ theme }) => ({
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
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: "#d4af37",
    boxShadow: `
      0 4px 8px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(212, 175, 55, 0.2)
    `,
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "1rem",
    padding: "1.25rem 1rem",
  },
}));

const PotionName = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "0.5rem",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.15rem",
  },
}));

const PotionMeta = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
  marginBottom: "1rem",
  paddingBottom: "0.75rem",
  borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
  [theme.breakpoints.down("sm")]: {
    gap: "0.75rem",
    fontSize: "0.9rem",
  },
}));

const MetaItem = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "0.95rem",
  color: "#c4a870",
  "& strong": {
    color: "#d4af37",
    fontWeight: 700,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const PotionUsage = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "0.95rem",
  fontStyle: "italic",
  color: "#9d8f7a",
  marginBottom: "0.75rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const PotionDescription = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.05rem",
  lineHeight: 1.6,
  color: "#d4c4a8",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: "1.5rem",
  background: "rgba(28, 24, 18, 0.6)",
  border: "1px solid rgba(212, 175, 55, 0.3)",
  [theme.breakpoints.down("sm")]: {
    marginTop: "1rem",
  },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  "& .MuiTableCell-root": {
    fontFamily: '"Crimson Text", serif',
    color: "#d4c4a8",
    borderColor: "rgba(212, 175, 55, 0.2)",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
      padding: "0.75rem 0.5rem",
    },
  },
  "& .MuiTableCell-head": {
    fontFamily: '"Cinzel", serif',
    fontWeight: 700,
    color: "#d4af37",
    backgroundColor: "rgba(20, 18, 14, 0.8)",
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
  },
}));

const TableTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#d4af37",
  marginTop: "2rem",
  marginBottom: "1rem",
  textAlign: "center",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
    marginTop: "1.5rem",
  },
}));

export default function PotionsPage() {
  const lesserPotions = potionsData.filter((p) => p.category === "Lesser");
  const greaterPotions = potionsData.filter((p) => p.category === "Greater");

  return (
    <PageContainer>
      <Header title="Potions and Elixirs" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            In the shadows of Wyrdgrave, fearless alchemists and desperate
            apprentices distill arcane essences in flasks of black glass. Each
            potion is a promise in liquid form - momentary power, miraculous
            healing, or sudden death. The wisest learn to distinguish the gleam
            of a life elixir from the poison that burns like infernal fire.
          </ParchmentText>

          <ParchmentText>
            These mixtures are not simple herbal remedies. They are liquid
            fragments of magic, distillations of raw power captured in amber and
            crystal. One flask can transform a coward into a hero for precious
            minutes. Another can preserve life even after death claims its
            tribute. But all power has its price, and the alchemists of
            Wyrdgrave pay in scars and sanity.
          </ParchmentText>
        </ContentContainer>
      </ContentSection>

      {/* LESSER POTIONS */}
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Lesser Potions</PowerListTitle>
          <ParchmentText>
            Lesser potions are relatively common in the ruins of Wyrdgrave,
            found in abandoned laboratories, black markets and on the belts of
            dead adventurers. Any competent alchemist can prepare them with the
            right ingredients.
          </ParchmentText>

          {lesserPotions.map((potion, index) => (
            <PotionCard key={index}>
              <PotionName>{potion.name}</PotionName>

              <PotionMeta>
                <MetaItem>
                  <strong>Purchase:</strong> {potion.purchasePrice}
                </MetaItem>
                <MetaItem>
                  <strong>Sale:</strong> {potion.salePrice}
                </MetaItem>
                {potion.ingredientCost && (
                  <MetaItem>
                    <strong>Ingredients:</strong> {potion.ingredientCost}
                  </MetaItem>
                )}
              </PotionMeta>

              <PotionUsage>⚗️ {potion.usage}</PotionUsage>

              <GameText component={PotionDescription}>
                {potion.description}
              </GameText>
            </PotionCard>
          ))}

          {/* Lesser Potion Table */}
          <TableTitle>Lesser Potion Table (d20)</TableTitle>
          <StyledTableContainer>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell width="20%">Die Roll</TableCell>
                  <TableCell>Potion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lesserPotionTable.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.roll}</TableCell>
                    <TableCell>{entry.potion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          </StyledTableContainer>
        </ContentContainer>
      </ContentSection>

      {/* GREATER POTIONS */}
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Greater Potions</PowerListTitle>
          <ParchmentText>
            Greater potions are masterpieces of arcane alchemy - rare, powerful
            and dangerous. Some are so valuable they cannot be bought with
            common gold. Others are so unstable that only the most desperate or
            mad dare use them. Each one represents weeks of work and ingredients
            that few can obtain.
          </ParchmentText>

          {greaterPotions.map((potion, index) => (
            <PotionCard key={index}>
              <PotionName>{potion.name}</PotionName>

              <PotionMeta>
                <MetaItem>
                  <strong>Purchase:</strong> {potion.purchasePrice}
                </MetaItem>
                <MetaItem>
                  <strong>Sale:</strong> {potion.salePrice}
                </MetaItem>
                {potion.ingredientCost && (
                  <MetaItem>
                    <strong>Ingredients:</strong> {potion.ingredientCost}
                  </MetaItem>
                )}
              </PotionMeta>

              <PotionUsage>⚗️ {potion.usage}</PotionUsage>

              <GameText component={PotionDescription}>
                {potion.description}
              </GameText>
            </PotionCard>
          ))}

          {/* Greater Potion Table */}
          <TableTitle>Greater Potion Table (d20)</TableTitle>
          <StyledTableContainer>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell width="20%">Die Roll</TableCell>
                  <TableCell>Potion</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {greaterPotionTable.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.roll}</TableCell>
                    <TableCell>{entry.potion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          </StyledTableContainer>
        </ContentContainer>
      </ContentSection>

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            <strong>Game Master's Note:</strong> Potions marked with "—" in the
            purchase price can never be bought in common markets - only found,
            stolen, or crafted at great cost and risk. The Elixir of Life, in
            particular, is legend even among master alchemists, and only a
            desperate fool would sell such a treasure.
          </ParchmentText>
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
}
