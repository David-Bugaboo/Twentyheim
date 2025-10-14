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

export default function ArcaneLoresPage() {
  const navigate = useNavigate();

  const lores = [
    { name: "Aqshy - Tradição do Fogo", path: "/magic/arcane/fire", icon: "" },
    {
      name: "Azyr - Tradição dos Céus",
      path: "/magic/arcane/heavens",
      icon: "",
    },
    {
      name: "Chamon - Tradição do Metal",
      path: "/magic/arcane/metal",
      icon: "",
    },
    { name: "Ghyran - Tradição da Vida", path: "/magic/arcane/life", icon: "" },
    { name: "Hysh - Tradição da Luz", path: "/magic/arcane/light", icon: "" },
    {
      name: "Ulgu - Tradição das Sombras",
      path: "/magic/arcane/shadows",
      icon: "",
    },
    {
      name: "Shyish - Tradição da Morte",
      path: "/magic/arcane/death",
      icon: "",
    },
    {
      name: "Ghur - Tradição das Bestas",
      path: "/magic/arcane/beasts",
      icon: "",
    },
  ];

  return (
    <PageContainer>
      <Header title="Tradições Arcanas - Os Oito Ventos da Magia" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 3 }}>
            Assim como o emblema do Caos tem oito flechas, a magia também tem
            oito ventos. Eles sopram pelo mundo, carregando a energia do Caos
            com eles. Enquanto a magia bruta é unificada dentro do Reino do
            Caos, quando ela vem para este mundo, refrata-se em oito "cores",
            conhecidas coletivamente como os Ventos da Magia. Conjuradores
            ganham seu poder ao se conectar a esses Ventos da Magia. Alguns
            fazem isso juntando-se a uma Ordem dedicada ao estudo de uma cor da
            magia. Outros fazem isso através de oração, sorte ou instinto. Como
            estão brincando com a essência do próprio Caos, sejam quais forem
            seus métodos, todos os conjuradores arriscam suas vidas e até suas
            almas quando praticam magia.
          </ParchmentText>

          <Box
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "rgba(139, 0, 0, 0.15)",
              border: "2px solid rgba(139, 0, 0, 0.4)",
              borderRadius: "8px",
            }}
          >
            <PowerListTitle sx={{ color: "#ff6b6b", mt: 0 }}>
              Perigos dos Ventos
            </PowerListTitle>

            <ParchmentText sx={{ mb: 3 }}>
              Representando os perigos de canalizar o Caos bruto, sempre que um
              Conjurador falha ao conjurar uma magia de uma tradição arcana, ele
              sofre dano de acordo com a tabela abaixo:
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
                      backgroundColor: "rgba(212, 175, 55, 0.2)",
                      borderBottom: "2px solid #d4af37",
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        color: "#d4af37",
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
                        color: "#d4af37",
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
                    { failedBy: "1-4", damage: "Nenhum" },
                    { failedBy: "5-9", damage: "1" },
                    { failedBy: "10-19", damage: "2" },
                    { failedBy: "20+", damage: "5" },
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
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "700px", width: "100%" }}>
          <PowerListTitle>Os Oito Ventos</PowerListTitle>

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
