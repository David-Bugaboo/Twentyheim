import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface GenericTableProps {
  data: Array<Record<string, any>>;
  sx?: any;
  scrollable?: boolean;
}

export default function GenericTable({
  data,
  sx = {},
  scrollable = false,
}: GenericTableProps) {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return null;
  }
  // Extrair todas as chaves únicas dos objetos para criar as colunas, excluindo url e ref
  const allKeys = Array.from(
    new Set(data.flatMap((item) => Object.keys(item)))
  ).filter((key) => key !== "url" && key !== "ref");

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "#1a1a1a",
        border: "1px solid #10B981",
        borderRadius: "8px",
        mb: 3,
        width: "100%", // Sempre ocupa todo o container
        // Scroll baseado na prop scrollable
        overflowX: scrollable ? "auto" : "visible",
        ...sx,
      }}
    >
      <Table
        sx={{
          width: "100%", // Sempre ocupa 100% do container
          tableLayout: "auto", // Permite distribuição automática das colunas
          // Largura mínima baseada na prop scrollable
          minWidth: scrollable ? "650px" : "100%",
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "rgba(16, 185, 129, 0.2)", // Green background with transparency
              borderBottom: "1px solid #10B981",
            }}
          >
            {allKeys.map((key) => (
              <TableCell
                key={key}
                align="center"
                sx={{
                  color: "#ffffff", // White header text
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  borderRight: "1px solid #10B981", // Green border
                  width: key === "roll" || key === "D20" ? "100px" : "auto",
                  py: 2,
                  // Largura mínima baseada na prop scrollable
                  minWidth: scrollable
                    ? key === "roll" || key === "D20"
                      ? "100px"
                      : "150px"
                    : key === "roll" || key === "D20"
                    ? "100px"
                    : "auto",
                }}
              >
                {key === "roll"
                  ? "Roll"
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            // Determinar se a linha tem url ou ref
            const hasUrl = row.url;
            const hasRef = row.ref;
            const isClickable = hasUrl || hasRef;

            return (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: "transparent",
                  borderBottom: "1px solid #10B981",
                  "&:hover": {
                    backgroundColor: isClickable
                      ? "rgba(16, 185, 129, 0.1) !important"
                      : "rgba(16, 185, 129, 0.05) !important",
                  },
                  cursor: isClickable ? "pointer" : "default",
                  transition: "all 0.2s",
                }}
                onClick={() => {
                  if (hasUrl) {
                    navigate(row.url);
                  } else if (hasRef) {
                    console.log("ref da coluna >>>>", row.ref);
                    row.ref.current?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {allKeys.map((key) => (
                  <TableCell
                    key={key}
                    align={key === "roll" || key === "D20" ? "center" : "left"}
                    sx={{
                      color:
                        key === "roll" || key === "D20" ? "#d4af37" : "#e0e0e0",
                      fontWeight: key === "roll" || key === "D20" ? 700 : 500,
                      fontSize: "0.9rem",
                      borderRight: "1px solid #10B981",
                      textDecoration: isClickable ? "underline" : "none",
                      py: 2,
                      // Largura mínima baseada na prop scrollable
                      minWidth: scrollable
                        ? key === "roll" || key === "D20"
                          ? "100px"
                          : "150px"
                        : key === "roll" || key === "D20"
                        ? "100px"
                        : "auto",
                    }}
                  >
                    {row[key] || "—"}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
