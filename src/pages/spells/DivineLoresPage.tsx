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

export default function DivineLoresPage() {
  const navigate = useNavigate();

  // Helper function to convert simple markdown to HTML
  const processMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  };

  const lores = [
    { name: "Orações de Hashut", path: "/magic/divine/hashut", icon: "" },
    { name: "Orações de Sigmar", path: "/magic/divine/sigmar", icon: "" },
    { name: "Orações de Ulric", path: "/magic/divine/ulric", icon: "" },
  ];

  return (
    <PageContainer>
      <Header title="Tradições Divinas - Orações dos Deuses" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 3 }}>
            Sacerdotes recebem seu poder através de Devoção e Oração. Como tal,
            suas magias são dadas a eles pelos próprios deuses, e filtradas
            através de seu poder divino, tornam-se muito mais seguras. Assim,
            Sacerdotes não sofrem dano por falhar ao conjurar magias, e rolam na
            tabela <strong>Ira dos Deuses</strong> em vez da tabela{" "}
            <strong>Maldição de Tzeentch</strong> ao rolar{" "}
            <strong>1 em uma rolagem de conjuração</strong>.
            <br />
            Além disso, como encantamentos complexos não são necessários para
            conjurar estas magias, Sacerdotes podem conjurar enquanto usam
            qualquer tipo de armadura ou escudos. Para compensar estas
            vantagens, eles têm uma seleção limitada de magias e seus feitiços
            são mais difíceis de conjurar do que magias de escopo similar.
          </ParchmentText>

          <Box
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "rgba(212, 175, 55, 0.1)",
              border: "2px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "8px",
            }}
          >
            <PowerListTitle sx={{ color: "#d4af37", mt: 0 }}>
              Dano Sagrado ou Profano
            </PowerListTitle>

            <ParchmentText>
              Orações que causam dano geralmente causam dano{" "}
              <strong>sagrado</strong> ou <strong>profano</strong>. Os dois
              tipos de dano funcionam da mesma forma, separados apenas por
              razões temáticas. Dano sagrado pode danificar tudo que dano mágico
              pode, mas não é afetado por traços que reduzem ou negam dano
              mágico.
            </ParchmentText>
          </Box>

          <Box
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "rgba(139, 69, 19, 0.15)",
              border: "2px solid rgba(139, 69, 19, 0.4)",
              borderRadius: "8px",
            }}
          >
            <PowerListTitle sx={{ color: "#cd853f", mt: 0 }}>
              Ira dos Deuses
            </PowerListTitle>

            <ParchmentText sx={{ mb: 3 }}>
              Quando um Sacerdote rola um <strong>1</strong> em uma Rolagem de
              Conjuração, os deuses estão descontentes. Role na tabela Ira dos
              Deuses abaixo para determinar a consequência de seu desagrado:
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
                      backgroundColor: "rgba(139, 69, 19, 0.3)",
                      borderBottom: "2px solid #cd853f",
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        color: "#cd853f",
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
                        color: "#cd853f",
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
                  {[
                    {
                      roll: "1-3",
                      result:
                        "**Visão Sobrenatural:** O Deus do conjurador escolhe este momento para conceder-lhe uma visão simbólica mas confusa. O conjurador ganha uma ficha de Atordoamento.",
                    },
                    {
                      roll: "4-7",
                      result:
                        "**Prove Sua Devoção:** Algumas orações a mais são necessárias para terminar de conjurar a magia. A ativação do conjurador termina imediatamente, e a magia será ativada durante o início da próxima ativação do conjurador, sem outras ações necessárias.",
                    },
                    {
                      roll: "8-10",
                      result:
                        "**Sua Impertinencia me Irrita!:** O conjurador não pode conjurar a magia que tentou conjurar pelo resto do jogo.",
                    },
                    {
                      roll: "11-14",
                      result:
                        "**Sua Causa é Indigna:** O conjurador tem -2 em rolagens de conjuração pelo resto do jogo.",
                    },
                    {
                      roll: "15-16",
                      result:
                        "**Penitencia Cruel:** O conjurador tem -2 Vontade pelo resto do jogo.",
                    },
                    {
                      roll: "17-18",
                      result:
                        "**Seu Pecado é Imperdoável!:** O conjurador sofre 3 pontos de dano sagrado e ganha uma ficha de Atordoamento.",
                    },
                    {
                      roll: "19-20",
                      result:
                        "**Interferência Daemônica:** A oração do conjurador é respondida mas não por seu Deus. Role na tabela **Maldição de Tzeentch**.",
                    },
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
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "700px", width: "100%" }}>
          <PowerListTitle>Orações Divinas</PowerListTitle>

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
