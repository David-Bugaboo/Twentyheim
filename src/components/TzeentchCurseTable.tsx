import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ParchmentText, PowerListTitle } from "./PageComponents";

// Helper function to convert simple markdown to HTML
const processMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
};

const curseResults = [
  {
    roll: "1-2",
    result:
      "**Olhos de Bruxa:** As pupilas do Conjurador ficam vermelho vivo, e são extremamente sensíveis à luz. Sua linha de visão é reduzida para um máximo de 30cm e você tem -3 Vontade contra magias da **Tradição da Luz** ou **Orações de Sigmar.**",
  },
  {
    roll: "3-4",
    result: "**Loucura:** O conjurador sofre -4 em rolagens de conjuração.",
  },
  {
    roll: "5-6",
    result:
      '**Magia Selvagem:** Toda figura a até 30cm sofre um ataque mágico +0.',
  },
  {
    roll: "7-8",
    result:
      "**Visão Herética:** Um Príncipe Daemônico mostra ao conjurador uma visão do reino do caos. Sua Vontade é reduzida para -3 pelo resto deste jogo.",
  },
  {
    roll: "9-10",
    result:
      "**Possessão Daemônica:** O conjurador é possuído por uma entidade Daemônica. O Conjurador age como uma criatura descontrolada pelo resto do jogo.",
  },
  {
    roll: "11-12",
    result:
      "**O Olho Definhante:** O conjurador sofre 5 de dano e perde 5 de vigor máximo até o fim do jogo.",
  },
  {
    roll: "13-14",
    result:
      "**Voz Fragmentada:** O conjurador não pode conjurar magias pelo resto do jogo.",
  },
  {
    roll: "15-16",
    result:
      "**Familiar Covarde:** Um Diabrete é colocado em combate com o Conjurador.",
  },
  {
    roll: "17-18",
    result: "**Ataque Aetérico:** O conjurador sofre um ataque mágico +12.",
  },
  {
    roll: "19-20",
    result:
      "**Incursão Daemônica:** Um daemônio maior é colocado em combate com o conjurador. Este Daemônio ganha o traço Imune a Controle.",
  },
];

export default function TzeentchCurseTable() {
  return (
    <>
      <PowerListTitle sx={{ color: "#ff6b6b", mt: 3, mb: 2 }}>
        A Maldição de Tzeentch
      </PowerListTitle>

      <ParchmentText sx={{ mb: 3 }}>
        Além disso, rolar um <strong>1</strong> em uma Rolagem de Conjuração
        de uma magia destas tradições desencadeia a{" "}
        <strong>Maldição de Tzeentch</strong>. O conjurador deve rolar na
        tabela abaixo para determinar o resultado catastrófico de sua falha.
      </ParchmentText>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(28, 24, 18, 0.9)",
          border: "2px solid #8B4513",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "rgba(139, 0, 0, 0.3)",
                borderBottom: "2px solid #ff6b6b",
              }}
            >
              <TableCell
                align="center"
                sx={{
                  color: "#ff6b6b",
                  fontWeight: 700,
                  fontSize: "1rem",
                  fontFamily: '"Cinzel", serif',
                  width: "100px",
                }}
              >
                Rolagem
              </TableCell>
              <TableCell
                sx={{
                  color: "#ff6b6b",
                  fontWeight: 700,
                  fontSize: "1rem",
                  fontFamily: '"Cinzel", serif',
                }}
              >
                Resultado
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {curseResults.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "rgba(28, 24, 18, 0.5)",
                  },
                  "&:nth-of-type(even)": {
                    backgroundColor: "rgba(28, 24, 18, 0.7)",
                  },
                }}
              >
                <TableCell
                  align="center"
                  sx={{
                    color: "#DAA520",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    fontFamily: '"Cinzel", serif',
                    verticalAlign: "top",
                    pt: 2,
                  }}
                >
                  {row.roll}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c5a0",
                    fontSize: "0.95rem",
                    fontFamily: '"Crimson Text", serif',
                    lineHeight: 1.6,
                  }}
                >
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: processMarkdown(row.result),
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

