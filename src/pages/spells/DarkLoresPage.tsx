import { useNavigate } from "react-router-dom";
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
import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";
import TzeentchCurseTable from "../../components/TzeentchCurseTable";
import TzeentchGiftsTable from "../../components/TzeentchGiftsTable";

export default function DarkLoresPage() {
  const navigate = useNavigate();

  const lores = [
    { name: "Tradição do Caos", path: "/magic/dark/chaos", icon: "" },
    {
      name: "Tradição da Necromancia",
      path: "/magic/dark/necromancy",
      icon: "",
    },
    {
      name: "Tradição do Rato Chifrudo",
      path: "/magic/dark/horned-rat",
      icon: "🐀",
    },
  ];

  return (
    <PageContainer>
      <Header title="Tradições Sombrias - As Artes Proibidas" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 3 }}>
            Enquanto a maioria da Magia Arcana é alimentada por um dos Ventos da
            Magia, existem dois tipos de magia que manipulam todos os oito
            ventos de uma só vez. Alta magia, ou Qhaysh, é a magia em sua forma
            mais pura e não diluída. É tão difícil de dominar que apenas os
            Altos Elfos de Ulthuan têm a habilidade de usá-la regularmente.
            Magia sombria, ou Dhar, é a magia em sua forma mais básica e
            corrupta. Se Qhaysh é as oito cores em harmonia, Dhar é as oito
            cores em discordância.
            <br />É a magia da destruição, dominação e poluição. As Tradições
            Sombrias de magia são baseadas na manipulação de Dhar. Elas são o
            domínio de homens malignos e desesperados, aqueles dispostos a
            arriscar suas vidas e almas por poder. Existem dois tipos principais
            de Tradições Sombrias: magia do Caos e Necromancia.
          </ParchmentText>

          <Box
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "rgba(75, 0, 130, 0.2)",
              border: "2px solid rgba(75, 0, 130, 0.5)",
              borderRadius: "8px",
            }}
          >
            <PowerListTitle sx={{ color: "#a78bfa", mt: 0 }}>
              O Preço do Poder Sombrio
            </PowerListTitle>

            <ParchmentText sx={{ mb: 3 }}>
              Devido à sua natureza profana e instável, estas magias são mais
              difíceis de conjurar, mesmo que sejam um pouco mais poderosas que
              o normal.{" "}
              <strong>
                Sempre que uma criatura tenta conjurar uma magia de tradição
                sombria, com sucesso ou não, ela sofre 1 de dano.
              </strong>{" "}
              Se ela falhar ao conjurar uma magia destas tradições, ela sofre
              mais dano além daquele 1 de dano de acordo com a tabela abaixo:
            </ParchmentText>

            <TableContainer
              component={Paper}
              sx={{
                mb: 4,
                backgroundColor: "rgba(28, 24, 18, 0.9)",
                border: "2px solid #8B4513",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "rgba(75, 0, 130, 0.3)",
                      borderBottom: "2px solid #a78bfa",
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        color: "#a78bfa",
                        fontWeight: 700,
                        fontSize: "1rem",
                        fontFamily: '"Cinzel", serif',
                      }}
                    >
                      Falhou por
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#a78bfa",
                        fontWeight: 700,
                        fontSize: "1rem",
                        fontFamily: '"Cinzel", serif',
                      }}
                    >
                      Dano Sofrido
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { failedBy: "1-4", damage: "2" },
                    { failedBy: "5-9", damage: "3" },
                    { failedBy: "10-19", damage: "4" },
                    { failedBy: "20+", damage: "7" },
                  ].map((row, index) => (
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
                          color: "#d4c5a0",
                          fontSize: "0.95rem",
                          fontFamily: '"Crimson Text", serif',
                        }}
                      >
                        {row.failedBy}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4c5a0",
                          fontSize: "0.95rem",
                          fontFamily: '"Crimson Text", serif',
                        }}
                      >
                        {row.damage}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TzeentchCurseTable />

            <TzeentchGiftsTable />
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "700px", width: "100%" }}>
          <PowerListTitle>Tradições Sombrias</PowerListTitle>

          {lores.map((lore) => (
            <StyledNavigationButton
              key={lore.path}
              onClick={() => navigate(lore.path)}
              variant="outlined"
              fullWidth
              sx={{ mb: 2, py: 2.5, fontSize: "1.1rem" }}
            >
              {lore.icon} {lore.name}
            </StyledNavigationButton>
          ))}

          <StyledNavigationButton
            variant="contained"
            onClick={() => navigate("/magic")}
            sx={{ mt: 3 }}
          >
            Voltar à Magia
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}
