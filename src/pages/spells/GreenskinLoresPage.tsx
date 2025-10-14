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

export default function GreenskinLoresPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header title="Magia Pele-Verde - O Poder do WAAAGH!" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 3 }}>
            Xamãs Peles-Verdes não escrevem suas magias em grimórios. Em vez
            disso, Xamãs consomem vastas quantidades de cogumelos alucinógenos
            que induzem visões surreais de seus melhores amigos para sempre: os
            deuses Peles-Verdes, Gork e Mork. Através destas visões, os Xamãs
            adquirem o conhecimento que precisam para conjurar suas magias. Este
            relacionamento próximo com seus deuses é sagrado e zelosamente
            guardado: Xamãs vão 'conversar' tão frequentemente quanto possível
            com Gork e Mork, e amaldiçoarão aqueles que atrapalham.
            <br />
            Consequentemente, interagir com Xamãs é estranho: se não estão sob
            influência alucinógena, estão confusos por anos de tais visões. São
            frequentemente desconfiados dos feitos de não-Xamãs brutamontes e
            ciumentos de seus pares. De fato, muitas vezes uma simples vanglória
            de um vínculo mais forte com Gork e Mork mandou Xamãs rivais, e suas
            tribos, para a garganta uns dos outros. Waaagh! e devastação seguem.
          </ParchmentText>
          <Box
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "rgba(34, 139, 34, 0.15)",
              border: "2px solid rgba(34, 139, 34, 0.4)",
              borderRadius: "8px",
            }}
          >
            <PowerListTitle sx={{ color: "#6b8e23", mt: 0 }}>
              O Poder dos CAMARADAS!
            </PowerListTitle>

            <ParchmentText sx={{ mb: 2 }}>
              Magias Orcs, embora extremamente poderosas, têm classes de
              dificuldade muito altas. Elas parecem impossíveis de conjurar à
              primeira vista, mas a mecânica única de suas magias é o que as
              torna poderosas:
            </ParchmentText>

            <ParchmentText
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "4px",
              }}
            >
              • Para cada <strong>goblin ou orc a até 15cm</strong> de um Xamã
              Orc, ele ganha um <strong>+1</strong> em sua rolagem de conjuração
              <br />• Um <strong>Warboz</strong> ou figura com o aprimoramento{" "}
              <strong>Big Un'</strong> fornece <strong>+2</strong> na rolagem de
              conjuração do xamã devido à energia extra que fornecem
              <br />• Sempre que o Orc Warboz usa o poder{" "}
              <strong>WAAAAAGH!</strong>, estes bônus na rolagem de conjuração
              são <strong>DOBRADOS</strong>
              <br />• Quando um xamã <strong>falha</strong> ao conjurar uma
              magia,{" "}
              <strong>
                tanto o xamã QUANTO cada figura que forneceu um bônus de
                conjuração
              </strong>{" "}
              sofrem dano de acordo com a tabela abaixo
            </ParchmentText>

            <TableContainer
              component={Paper}
              sx={{
                mb: 3,
                backgroundColor: "rgba(28, 24, 18, 0.9)",
                border: "2px solid #8B4513",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "rgba(34, 139, 34, 0.3)",
                      borderBottom: "2px solid #6b8e23",
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        color: "#6b8e23",
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
                        color: "#6b8e23",
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
                    { failedBy: "1-4", damage: "1" },
                    { failedBy: "5-9", damage: "2" },
                    { failedBy: "10-19", damage: "3" },
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

            <ParchmentText
              sx={{
                p: 2,
                backgroundColor: "rgba(139, 0, 0, 0.2)",
                border: "2px solid rgba(139, 0, 0, 0.4)",
                borderRadius: "4px",
                color: "#ff6b6b",
                fontWeight: 600,
              }}
            >
              <strong>FALHA CRÍTICA:</strong> Se um Ork rolar <strong>1</strong>{" "}
              em uma Rolagem de Conjuração, cada figura que sofreu o dano por
              falhar ao conjurar também ganha uma{" "}
              <strong>Ficha de Atordoamento</strong> e sofre{" "}
              <strong>3 pontos de dano extra</strong>, conforme as energias
              turbulentas de puro poder memético derretem seus cérebros. Este
              efeito é <strong>ignorado</strong> no turno em que o Orc Warboz
              usa o poder WAAAAGH!
            </ParchmentText>
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "700px", width: "100%" }}>
          <PowerListTitle>Tradições Peles-Verdes</PowerListTitle>

          <StyledNavigationButton
            onClick={() => navigate("/magic/greenskin/big-waaagh")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2, py: 2.5, fontSize: "1.1rem" }}
          >
            Tradição do Grande WAAAGH!
          </StyledNavigationButton>

          <StyledNavigationButton
            variant="contained"
            onClick={() => navigate("/magic")}
            sx={{ mt: 3 }}
          >
            Voltar para Magia
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}
