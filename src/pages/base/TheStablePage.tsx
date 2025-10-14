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
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
  NavigationSection,
  StyledNavigationButton,
} from "../../components/PageComponents";

export default function TheStablePage() {
  const navigate = useNavigate();

  const whoaBoyTable = [
    {
      roll: "1-14",
      result: "**Tudo Certo!:** Sem efeito. Continue o turno normalmente.",
    },
    {
      roll: "15-18",
      result:
        "**Cambaleando:** O cavaleiro sofre 1 ponto de dano e ganha um Marcador de Atordoamento.",
    },
    {
      roll: "19",
      result:
        "**Queda Violenta:** O cavaleiro sofre 3 pontos de dano e perde todos os bônus e regras por estar montado. Após o jogo terminar, role na tabela de Sobrevivência de Soldados para a montaria.",
    },
    {
      roll: "20+",
      result:
        "**Montaria Caída:** O cavaleiro é reduzido a 0 de vida. Role na tabela de Sobrevivência de Soldados para a montaria também.",
    },
  ];

  const mounts = [
    {
      name: "Cavalo",
      warbands:
        "Mercenários, Altos Elfos, Caçadores de Bruxas, Irmãs de Sigmar",
      stats: { M: "+2", F: "+1", S: "-2", A: "+0", W: "+0", H: "+0" },
      special: null,
    },
    {
      name: "Corcel Possuído",
      warbands: "Culto dos Possuídos",
      stats: { M: "+2", F: "+1", S: "-2", A: "+0", W: "0", H: "+0" },
      special:
        "**Corcel Demoníaco** - O Corcel Possuído não conta como animal, mas sim como daemônio, e rolará na tabela Opa Garoto! se for alvo de uma magia Purgar os Ímpios ou Exorcismo com modificador +7.",
    },
    {
      name: "Cabra Montanhesa de Kharadron",
      warbands: "Caçadores de Tesouro Anões",
      stats: { M: "+1", F: "0", S: "-2", A: "0", W: "0", H: "+0" },
      special:
        "**Investida Agressiva** - A montaria e o cavaleiro ganham a característica Chifrudo.",
    },
    {
      name: "Cervo Asrai",
      warbands: "Elfos Silvanos de Athel Loren",
      stats: { M: "+2", F: "0", S: "0", A: "1", W: "0", H: "+0" },
      special: null,
    },
    {
      name: "Bode Daemoniaco de Bronze",
      warbands: "Filhos de Hashut",
      stats: { M: "0", F: "1", S: "0", A: "1", W: "0", H: "+2" },
      special:
        "**Sopro da Fundição** - Uma vez por jogo, esta figura pode gastar uma ação para cuspir fogo. Faça um ataque a distância elemental +5 contra as três figuras mais próximas, desde que estejam a até 15 cm.",
    },
    {
      name: "Squigassauro",
      warbands: "Horda Orc",
      stats: { M: "ESPECIAL", F: "1", S: "0", A: "0", W: "0", H: "0" },
      special:
        "**Saltador** - O cavaleiro do Squigassauro move 1d20 dividido por 2 (arredondado para baixo) ao invés de uma distância de Movimento fixa. O cavaleiro nunca pode escolher usar outra ação para se mover novamente.",
    },
    {
      name: "Raptor de Sangue Frio",
      warbands: "Homens-Lagarto, Noivas de Khaine",
      stats: { M: "+3", F: "0", S: "-2", A: "0", W: "0", H: "0" },
      special: null,
    },
    {
      name: "Besta Roedora",
      warbands: "Skaven do Clã Eshin",
      stats: { M: "+2", F: "0", S: "-2", A: "0", W: "0", H: "0" },
      special:
        "**Besta Rastejante** - Esta besta corre rente ao chão. O cavaleiro pode pegar tesouro usando uma única ação normalmente.",
    },
  ];

  // Helper function to convert markdown to HTML
  const processMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  };

  return (
    <PageContainer>
      <Header title="The Stable - Mounts & Riding Rules" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 4 }}>
            To acquire a mount, a warband must first purchase the{" "}
            <strong>Stable base resource</strong>. A mount then costs{" "}
            <strong>200gc</strong>. Such is the burden a mount places on
            resources, a warband may only ever have{" "}
            <strong>one mount at a time</strong>.
          </ParchmentText>

          <PowerListTitle>Fielding Mounted Models</PowerListTitle>

          <ParchmentText sx={{ mb: 4 }}>
            To bring a mount to a scenario, simply add it to a model's items,
            taking up one slot. Any model may ride a mount, with the exception
            of <strong>Animals, Undead, Demons and Constructs</strong>. The
            mount and the rider count as a single model and may never be
            separated. The mount give bonuses and penalties to the rider's stats
            according to each kind of mount. A rider may not dismount once it
            start the game mounted, except by rolling the{" "}
            <strong>Heavy Landing</strong> result on the "Whoa, Boy!" table.
          </ParchmentText>

          <Box
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "rgba(139, 69, 19, 0.1)",
              border: "2px solid rgba(139, 69, 19, 0.3)",
              borderRadius: "6px",
            }}
          >
            <PowerListTitle sx={{ mt: 0 }}>
              ⚠️ Regras de Combate Montado
            </PowerListTitle>

            <ParchmentText sx={{ mb: 2 }}>
              <strong>• Terreno Acidentado:</strong> Toda vez que a ação de
              movimento de um modelo for afetada por uma área de Terreno
              Acidentado, role um dado e consulte a tabela "Opa Garoto!".
            </ParchmentText>

            <ParchmentText sx={{ mb: 2 }}>
              <strong>• Pular:</strong> Cavalos podem pular normalmente mas, ao
              aterrissar, devem rolar na Tabela Opa Garoto! com modificador +4.
            </ParchmentText>

            <ParchmentText sx={{ mb: 2 }}>
              <strong>• Escalar:</strong> Diferente de outros Soldados, um
              Soldado montado nunca pode escalar uma estrutura.
            </ParchmentText>

            <ParchmentText sx={{ mb: 2 }}>
              <strong>• Carregar Tesouro:</strong> Um Soldado montado pode pegar
              e carregar tesouro normalmente, mas deve gastar uma ativação
              inteira para fazê-lo. Uma figura Montada não sofre penalidade de
              movimento por carregar tesouro.
            </ParchmentText>

            <ParchmentText>
              <strong>• Tamanho:</strong> O cavaleiro e sua montaria contam como
              um único alvo, e são considerados um <strong>Alvo Grande</strong>.
              Use uma base de 40mm+ para representar o par.
            </ParchmentText>
          </Box>

          <PowerListTitle>Tabela Opa Garoto!</PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Quando uma figura montada atravessa terreno acidentado, aterrissa de
            um salto, ou é afetada por certas magias, role nesta tabela para ver
            se o cavaleiro mantém o controle:
          </ParchmentText>

          <TableContainer
            component={Paper}
            sx={{
              mb: 5,
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
                      width: "120px",
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
                {whoaBoyTable.map((row, index) => (
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

          <Box
            sx={{
              p: 2,
              mb: 4,
              backgroundColor: "rgba(212, 175, 55, 0.05)",
              border: "2px solid rgba(139, 115, 85, 0.3)",
              borderRadius: "6px",
            }}
          >
            <ParchmentText sx={{ fontSize: "0.95rem", fontStyle: "italic" }}>
              <strong>Interações de Magia:</strong> Um conjurador pode conjurar{" "}
              <strong>Sedução do Caos</strong> ou <strong>Voz do Mestre</strong>{" "}
              em uma figura montada. Se bem-sucedido, role usando a rolagem de
              Vontade do Cavaleiro. Se a rolagem de Vontade falhar, role na
              tabela Opa Garoto! com modificador <strong>+7</strong>.
            </ParchmentText>
          </Box>

          <PowerListTitle>Montarias Disponíveis</PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Cada bando tem acesso a diferentes tipos de montarias, refletindo
            sua cultura e recursos. Todas as montarias custam{" "}
            <strong>200 coroas</strong> e modificam os atributos do cavaleiro
            conforme mostrado abaixo.
          </ParchmentText>

          {mounts.map((mount, index) => (
            <Box
              key={index}
              sx={{
                mb: 4,
                p: 3,
                backgroundColor: "rgba(28, 24, 18, 0.6)",
                border: "2px solid #8B4513",
                borderRadius: "6px",
              }}
            >
              <ParchmentText
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#d4af37",
                  fontFamily: '"Cinzel", serif',
                  mb: 1,
                }}
              >
                {mount.name}
              </ParchmentText>

              <ParchmentText
                sx={{
                  fontSize: "0.9rem",
                  color: "#c4a870",
                  fontStyle: "italic",
                  mb: 2,
                }}
              >
                Disponível para: {mount.warbands}
              </ParchmentText>

              <TableContainer
                component={Paper}
                sx={{
                  mb: mount.special ? 2 : 0,
                  backgroundColor: "rgba(20, 18, 14, 0.8)",
                  border: "1px solid #8B4513",
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "rgba(212, 175, 55, 0.15)",
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4af37",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          fontFamily: '"Cinzel", serif',
                        }}
                      >
                        Agilidade
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4af37",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          fontFamily: '"Cinzel", serif',
                        }}
                      >
                        Ímpeto
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4af37",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          fontFamily: '"Cinzel", serif',
                        }}
                      >
                        Precisão
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4af37",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          fontFamily: '"Cinzel", serif',
                        }}
                      >
                        Armadura
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4af37",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          fontFamily: '"Cinzel", serif',
                        }}
                      >
                        Vontade
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4af37",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          fontFamily: '"Cinzel", serif',
                        }}
                      >
                        Vigor
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4c5a0",
                          fontSize: "0.9rem",
                          fontFamily: '"Crimson Text", serif',
                          fontWeight: 600,
                        }}
                      >
                        {mount.stats.M}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4c5a0",
                          fontSize: "0.9rem",
                          fontFamily: '"Crimson Text", serif',
                          fontWeight: 600,
                        }}
                      >
                        {mount.stats.F}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4c5a0",
                          fontSize: "0.9rem",
                          fontFamily: '"Crimson Text", serif',
                          fontWeight: 600,
                        }}
                      >
                        {mount.stats.S}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4c5a0",
                          fontSize: "0.9rem",
                          fontFamily: '"Crimson Text", serif',
                          fontWeight: 600,
                        }}
                      >
                        {mount.stats.A}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4c5a0",
                          fontSize: "0.9rem",
                          fontFamily: '"Crimson Text", serif',
                          fontWeight: 600,
                        }}
                      >
                        {mount.stats.W}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "#d4c5a0",
                          fontSize: "0.9rem",
                          fontFamily: '"Crimson Text", serif',
                          fontWeight: 600,
                        }}
                      >
                        {mount.stats.H}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {mount.special && (
                <ParchmentText
                  sx={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    p: 2,
                    backgroundColor: "rgba(212, 175, 55, 0.05)",
                    borderRadius: "4px",
                  }}
                >
                  <Box
                    dangerouslySetInnerHTML={{
                      __html: processMarkdown(mount.special),
                    }}
                  />
                </ParchmentText>
              )}
            </Box>
          ))}

          <Box
            sx={{
              p: 3,
              mt: 4,
              backgroundColor: "rgba(212, 175, 55, 0.05)",
              border: "2px solid rgba(139, 115, 85, 0.3)",
              borderRadius: "6px",
            }}
          >
            <PowerListTitle sx={{ mt: 0 }}>
              Modificadores de Atributos
            </PowerListTitle>
            <ParchmentText>
              Estes bônus e penalidades são aplicados aos{" "}
              <strong>atributos do cavaleiro</strong> enquanto montado. Por
              exemplo, um Cavalo dá +2 Agilidade, +1 Ímpeto e -2 Precisão a quem
              o cavalgar.
            </ParchmentText>
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/base")}
        >
          Voltar ao Gerenciamento de Base
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
