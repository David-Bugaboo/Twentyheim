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
      <Header title="Poções e Elixires" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            Nas sombras de Wyrdgrave, alquimistas destemidos e aprendizes
            desesperados destilam essências arcanas em frascos de vidro negro.
            Cada poção é uma promessa em líquido - poder momentâneo, cura
            milagrosa, ou morte súbita. Os mais sábios aprendem a distinguir o
            brilho de um elixir da vida do veneno que queima como fogo infernal.
          </ParchmentText>

          <ParchmentText>
            Estas misturas não são simples remédios de herbalista. São
            fragmentos líquidos de magia, destilações de poder bruto capturado
            em âmbar e cristal. Um frasco pode transformar um covarde em herói
            por minutos preciosos. Outro pode preservar a vida mesmo após a
            morte reivindicar seu tributo. Mas todo poder tem seu preço, e os
            alquimistas de Wyrdgrave pagam em cicatrizes e sanidade.
          </ParchmentText>
        </ContentContainer>
      </ContentSection>

      {/* LESSER POTIONS */}
      <ContentSection>
        <ContentContainer>
          <PowerListTitle>Lesser Potions</PowerListTitle>
          <ParchmentText>
            Poções menores são relativamente comuns nas ruínas de Wyrdgrave,
            encontradas em laboratórios abandonados, mercados negros e nos
            cintos de aventureiros mortos. Qualquer alquimista competente pode
            prepará-las com os ingredientes corretos.
          </ParchmentText>

          {lesserPotions.map((potion, index) => (
            <PotionCard key={index}>
              <PotionName>{potion.name}</PotionName>

              <PotionMeta>
                <MetaItem>
                  <strong>Compra:</strong> {potion.purchasePrice}
                </MetaItem>
                <MetaItem>
                  <strong>Venda:</strong> {potion.salePrice}
                </MetaItem>
                {potion.ingredientCost && (
                  <MetaItem>
                    <strong>Ingredientes:</strong> {potion.ingredientCost}
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
            Poções maiores são obras-primas da alquimia arcana - raras,
            poderosas e perigosas. Algumas são tão valiosas que não podem ser
            compradas com ouro comum. Outras são tão instáveis que apenas os
            mais desesperados ou loucos ousam usá-las. Cada uma representa
            semanas de trabalho e ingredientes que poucos podem obter.
          </ParchmentText>

          {greaterPotions.map((potion, index) => (
            <PotionCard key={index}>
              <PotionName>{potion.name}</PotionName>

              <PotionMeta>
                <MetaItem>
                  <strong>Compra:</strong> {potion.purchasePrice}
                </MetaItem>
                <MetaItem>
                  <strong>Venda:</strong> {potion.salePrice}
                </MetaItem>
                {potion.ingredientCost && (
                  <MetaItem>
                    <strong>Ingredientes:</strong> {potion.ingredientCost}
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
            <strong>Nota do Mestre:</strong> Poções marcadas com "—" no preço de
            compra nunca podem ser compradas em mercados comuns - apenas
            encontradas, roubadas, ou fabricadas com grande custo e risco. O
            Elixir of Life, em particular, é lenda mesmo entre alquimistas
            mestres, e apenas um tolo desesperado venderia tal tesouro.
          </ParchmentText>
        </ContentContainer>
      </ContentSection>
    </PageContainer>
  );
}
