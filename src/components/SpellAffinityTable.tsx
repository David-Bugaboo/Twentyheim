import { Box, Typography, styled } from "@mui/material";

interface SpellAffinity {
  aligned0?: string[]; // Escola principal - sem penalidade
  aligned2?: string[]; // +2 penalty
  neutral4?: string[]; // +4 penalty
  opposed6?: string[]; // +6 penalty
  anathema?: string[]; // Não pode aprender
}

interface SpellAffinityTableProps {
  affinity: SpellAffinity;
}

const TableContainer = styled(Box)({
  marginTop: "1rem",
  marginBottom: "1rem",
  border: "1px solid rgba(212, 175, 55, 0.3)",
  borderRadius: "4px",
  overflow: "hidden",
});

const TableRow = styled(Box)({
  display: "flex",
  borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
  "&:last-child": {
    borderBottom: "none",
  },
});

const TableCell = styled(Box)<{ header?: boolean }>(({ header }) => ({
  padding: "0.75rem 1rem",
  backgroundColor: header
    ? "rgba(212, 175, 55, 0.15)"
    : "rgba(28, 24, 18, 0.3)",
  color: header ? "#d4af37" : "#e8dcc4",
  fontWeight: header ? 600 : 400,
  fontSize: header ? "0.95rem" : "0.9rem",
  fontFamily: '"Crimson Text", serif',
  flex: header ? "0 0 25%" : "1",
  borderRight: "1px solid rgba(212, 175, 55, 0.2)",
  "&:last-child": {
    borderRight: "none",
  },
}));

function SpellAffinityTable({ affinity }: SpellAffinityTableProps) {
  return (
    <TableContainer>
      <Typography
        variant="h6"
        sx={{
          color: "#d4af37",
          fontFamily: '"Crimson Text", serif',
          fontSize: "1.1rem",
          fontWeight: 600,
          padding: "0.75rem 1rem",
          backgroundColor: "rgba(212, 175, 55, 0.1)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
        }}
      >
        Spell Affinity
      </Typography>

      {affinity.aligned0 && affinity.aligned0.length > 0 && (
        <TableRow>
          <TableCell header>Primary School (+0)</TableCell>
          <TableCell>{affinity.aligned0.join(", ")}</TableCell>
        </TableRow>
      )}

      {affinity.aligned2 && affinity.aligned2.length > 0 && (
        <TableRow>
          <TableCell header>Aligned (+2)</TableCell>
          <TableCell>{affinity.aligned2.join(", ")}</TableCell>
        </TableRow>
      )}

      {affinity.neutral4 && affinity.neutral4.length > 0 && (
        <TableRow>
          <TableCell header>Neutral (+4)</TableCell>
          <TableCell>{affinity.neutral4.join(", ")}</TableCell>
        </TableRow>
      )}

      {affinity.opposed6 && affinity.opposed6.length > 0 && (
        <TableRow>
          <TableCell header>Opposed (+6)</TableCell>
          <TableCell>{affinity.opposed6.join(", ")}</TableCell>
        </TableRow>
      )}

      {affinity.anathema && affinity.anathema.length > 0 && (
        <TableRow>
          <TableCell header>Anathema</TableCell>
          <TableCell sx={{ color: "#c44" }}>
            {affinity.anathema.join(", ")}
          </TableCell>
        </TableRow>
      )}
    </TableContainer>
  );
}

export default SpellAffinityTable;
export type { SpellAffinity };
