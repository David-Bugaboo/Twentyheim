import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";

const ExperienceAndLevelSection = () => {
  return (
    <CollapsibleSection id="experiencia-e-nivel" title="4. Experiência e Nível">
      <MobileText className="mb-4">
        Aqueles que sobrevivem aprendem. Aqueles que aprendem prosperam. Após
        cada jogo, heróis, campeões e soldados ganham experiência — o
        conhecimento duramente conquistado que separa veteranos de cadáveres.
        Cada cicatriz ensina. Cada vitória fortalece. Cada sobrevivência conta.
      </MobileText>

      {/* Experiência de Heróis */}
      <MobileText variant="heading" className="mt-6 mb-3">
        Experiência de Heróis
      </MobileText>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(28, 24, 18, 0.8)",
          border: "2px solid #8b7355",
          mb: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                  color: "#d4af37",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  borderBottom: "2px solid #8b7355",
                  textAlign: "center",
                  width: "20%",
                }}
              >
                XP
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                  color: "#d4af37",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  borderBottom: "2px solid #8b7355",
                }}
              >
                Por
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                +40
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Por cada jogo em que o herói sobrevive. Viver já é vitória.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                +60
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Se o herói ou seu bando captura o fragmento central de
                Pedra-bruxa. O maior prêmio para o maior risco.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                +40
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Para cada fragmento de Pedra-bruxa normal capturado pelo herói
                ou seu bando. Ganância recompensada.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                +5
                <br />
                +20
                <br />
                +10
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Para cada figura ou membro de bando inimigo que o herói
                pessoalmente retire do jogo.{" "}
                <strong>+20 XP se for herói inimigo</strong>,{" "}
                <strong>+10 XP se for campeão inimigo</strong>. Matar líderes
                vale mais que matar massa.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                +5
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Para cada tentativa falhada de conjurar um feitiço que resulte
                em dano ao herói. Até falhas ensinam.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "none",
                  textAlign: "center",
                }}
              >
                +10
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8", borderBottom: "none" }}>
                Para cada feitiço conjurado com sucesso pelo herói. Poder
                controlado é lição aprendida.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Experiência de Campeões */}
      <MobileText variant="heading" className="mt-6 mb-3">
        Experiência de Campeões
      </MobileText>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(28, 24, 18, 0.8)",
          border: "2px solid #8b7355",
          mb: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                  color: "#d4af37",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  borderBottom: "2px solid #8b7355",
                  textAlign: "center",
                  width: "20%",
                }}
              >
                XP
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                  color: "#d4af37",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  borderBottom: "2px solid #8b7355",
                }}
              >
                Por
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                +60
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Por sobreviver ao jogo. Campeões precisam trabalhar mais duro
                para provar seu valor.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                +5
                <br />
                +20
                <br />
                +10
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Para cada figura ou membro de bando inimigo que o campeão
                pessoalmente retire do jogo.{" "}
                <strong>+20 XP se for herói inimigo</strong>,{" "}
                <strong>+10 XP se for campeão inimigo</strong>. A mesma
                matemática sangrenta.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                +5
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Para cada tentativa falhada de conjurar um feitiço que resulte
                em dano ao campeão. Aprender através da dor.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "none",
                  textAlign: "center",
                }}
              >
                +10
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8", borderBottom: "none" }}>
                Para cada feitiço conjurado com sucesso pelo campeão. Menos que
                heróis ganham, mas ainda assim ganham.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Experiência de Soldados */}
      <MobileText variant="heading" className="mt-6 mb-3">
        Experiência de Soldados
      </MobileText>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(28, 24, 18, 0.8)",
          border: "2px solid #8b7355",
          mb: 4,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                  color: "#d4af37",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  borderBottom: "2px solid #8b7355",
                  textAlign: "center",
                  width: "20%",
                }}
              >
                XP
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                  color: "#d4af37",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  borderBottom: "2px solid #8b7355",
                }}
              >
                Por
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                +50
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Por sobreviver ao jogo. Para soldados, cada dia acima da terra é
                triunfo.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                +60
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Se esta figura capturou o fragmento central de Pedra-bruxa.
                Glória rara para os comuns.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                +40
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Para cada fragmento de Pedra-bruxa capturado por esta figura. A
                ganância tem suas recompensas.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4c4a8",
                  fontWeight: "bold",
                  borderBottom: "none",
                  textAlign: "center",
                }}
              >
                +5
                <br />
                +20
                <br />
                +10
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8", borderBottom: "none" }}>
                Para cada figura ou membro de bando inimigo que o soldado
                pessoalmente retire do jogo.{" "}
                <strong>+20 XP se for herói inimigo</strong>,{" "}
                <strong>+10 XP se for campeão inimigo</strong>. Mesmo soldados
                podem derrubar gigantes... às vezes.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText className="italic text-[#b89d9d]">
          "Experiência não é apenas números em papel. É o tremor na mão que sabe
          quando um golpe vem. É o instinto que te faz pular antes da lâmina
          cair. É a diferença entre novatos que morrem e veteranos que
          sobrevivem. Conte sua experiência. Acumule-a. Cada ponto foi pago em
          sangue — seu ou de outros."
        </MobileText>
      </div>

      {/* Subir de Nível */}
      <MobileText variant="heading" className="mt-6 mb-3">
        Subir de Nível — Forjado pela Ruína
      </MobileText>

      <MobileText className="mb-4">
        Ao alcançar <strong>100 de XP</strong>, uma figura pode subir de nível.
        Cem pontos de experiência duramente conquistados se transformam em poder
        tangível. A figura se torna mais forte, mais hábil, mais letal. Ou
        simplesmente aprende a não morrer tão facilmente. Ambos são valiosos.
      </MobileText>

      <MobileText className="mb-4">
        Ao subir de nível, a figura ganha <strong>um avanço</strong>. Uma
        melhoria permanente. Uma evolução comprada com sangue e sobrevivência.
        Escolha sabiamente — estas escolhas definem se você se tornará lenda ou
        apenas mais um nome esquecido. Mesmo que uma figura suba dois niveis em
        uma unica sequencia pós jogo, cada um dos avanços só pode ser escolhido
        uma vez. Um soldado nunca pode subir mais de 10 niveis.
      </MobileText>

      <MobileText variant="heading" className="mt-6 mb-3">
        Opções de Avanço
      </MobileText>

      <MobileText className="mb-3 pl-4">
        <strong>1. Aumentar um Atributo:</strong> Aumente um dos atributos da
        figura (+1 Movimento, +1 Ímpeto, +1 Precisão, +1 Armadura, +1 Vontade ou
        +2 Vigor) seguindo os limites raciais de cada raça na tabela abaixo.
        Mesmo que uma figura consiga fazer dois avanços de uma vez, ela só pode
        aumentar atributos uma vez. Mais forte. Mais rápido. Mais resistente.
      </MobileText>

      {/* Tabela de Limites Raciais */}
      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3">
          Limites Raciais de Atributos
        </MobileText>

        <MobileText className="mb-3">
          Cada raça tem seus limites naturais. Anões nunca serão rápidos. Elfos
          nunca serão robustos. Orcs nunca serão atiradores. A genética é
          destino, mesmo em Mordheim.
        </MobileText>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "rgba(28, 24, 18, 0.8)",
            border: "2px solid #8b7355",
            mb: 3,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "rgba(139, 115, 85, 0.5)",
                    color: "#d4af37",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    borderBottom: "2px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Raça
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "rgba(139, 115, 85, 0.5)",
                    color: "#d4af37",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    borderBottom: "2px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Movimento
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "rgba(139, 115, 85, 0.5)",
                    color: "#d4af37",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    borderBottom: "2px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Ímpeto
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "rgba(139, 115, 85, 0.5)",
                    color: "#d4af37",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    borderBottom: "2px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Precisão
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "rgba(139, 115, 85, 0.5)",
                    color: "#d4af37",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    borderBottom: "2px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Vigor
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "rgba(139, 115, 85, 0.5)",
                    color: "#d4af37",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    borderBottom: "2px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Vontade
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#d4af37",
                    fontWeight: "bold",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Humano
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  8
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +5
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +5
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  20
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +8
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#d4af37",
                    fontWeight: "bold",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Anão
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  4
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +6
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +3
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  26
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +10
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#d4af37",
                    fontWeight: "bold",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Elfo
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  10
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +6
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +6
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  18
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +12
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#d4af37",
                    fontWeight: "bold",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Orc
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  6
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +6
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +0
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  22
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +6
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#d4af37",
                    fontWeight: "bold",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Skaven
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  12
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +5
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +6
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  18
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +5
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#d4af37",
                    fontWeight: "bold",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Skink
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  9
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +5
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +6
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  24
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +6
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#d4af37",
                    fontWeight: "bold",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  Saurus
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  8
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +6
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +2
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  26
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "1px solid #8b7355",
                    textAlign: "center",
                  }}
                >
                  +6
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    color: "#d4af37",
                    fontWeight: "bold",
                    borderBottom: "none",
                    textAlign: "center",
                  }}
                >
                  Vampiro
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "none",
                    textAlign: "center",
                  }}
                >
                  8
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "none",
                    textAlign: "center",
                  }}
                >
                  +7
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "none",
                    textAlign: "center",
                  }}
                >
                  +7
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "none",
                    textAlign: "center",
                  }}
                >
                  30
                </TableCell>
                <TableCell
                  sx={{
                    color: "#d4c4a8",
                    borderBottom: "none",
                    textAlign: "center",
                  }}
                >
                  +12
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <MobileText className="italic text-[#b89d9d] text-sm">
          Note: Vampiros superam limites mortais. Skaven correm como ratos.
          Anões são lentos como pedras. Cada raça carrega suas bênçãos e
          maldições na própria carne.
        </MobileText>
      </div>

      <MobileText className="mb-3 pl-4">
        <strong>2. Melhorar um Poder:</strong> Diminua a CD de um poder
        conhecido em 1 (mínimo CD 2). Não pode reduzir a CD de um poder que
        aprender nessa sequencia pós jogo. Torna o impossível mais fácil. A
        prática aperfeiçoa, até em Mordheim.
      </MobileText>

      <MobileText className="mb-3 pl-4">
        <strong>3. Melhorar uma Magia:</strong> Diminua a CD de uma magia
        conhecida em 1 (mínimo CD 5). Não pode reduzir a CD de uma magia que
        aprender nessa sequencia pós jogo. Palavras que antes queimavam agora
        fluem mais suaves.
      </MobileText>

      <MobileText className="mb-3 pl-4">
        <strong>4. Aprender um Poder:</strong> Aprenda um novo poder da lista
        associada para sua figura. Novos truques para velhos cães de guerra.
        Esse poder começa com CD 6. Uma figura só pode aprender um poder a cada
        5 niveis.
      </MobileText>

      <MobileText className="mb-3 pl-4">
        <strong>5. Aprender uma Magia:</strong> Aprenda uma nova magia de uma
        tradição disponível para sua figura. Mais ferramentas no arsenal arcano.
        Uma figura só pode aprender uma magia a cada 5 niveis.
      </MobileText>

      <MobileText className="mb-4 pl-4">
        <strong>6. Aprender um Truque de Combate:</strong>{" "}
        <em>(Apenas soldados acima de nível 5)</em> Aprenda uma habilidade
        especial de combate da tabela abaixo. Quando soldados comuns vivem tempo
        suficiente, eles param de ser comuns. Um Truque de Combate só pode ser
        aprendido a cada 5 níveis, começando com nível 5, para um máximo de 2
        truques de combate no nível 10.
      </MobileText>

      {/* Tabela de Truques de Combate */}
      <MobileText variant="heading" className="mt-6 mb-3">
        Tabela de Truques de Combate
      </MobileText>

      <MobileText className="mb-3">
        Veteranos desenvolvem truques — pequenas técnicas que separam os vivos
        dos mortos. Cada truque pode ser usado{" "}
        <strong>apenas uma vez por batalha</strong>. Escolha o momento certo.
        Não há segunda chance.
      </MobileText>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: "rgba(28, 24, 18, 0.8)",
          border: "2px solid #8b7355",
          mb: 3,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                  color: "#d4af37",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  borderBottom: "2px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Truque
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                  color: "#d4af37",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  borderBottom: "2px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Efeito
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "rgba(139, 115, 85, 0.5)",
                  color: "#d4af37",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  borderBottom: "2px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Quando Declarar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4af37",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Ataque Furioso
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                +3 Ímpeto para um ataque
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Antes das rolagens serem feitas
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4af37",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Ripostar
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                +1 Ímpeto para um ataque
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Após as rolagens serem feitas
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4af37",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Golpe de Misericórdia
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                +2 Dano para qualquer ataque corpo a corpo que causou ao menos 1
                ponto de dano
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Após o dano ser calculado
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4af37",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Mão Firme
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                +3 Precisão para um ataque
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Antes das rolagens serem feitas
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4af37",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Olhos de Águia
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                +1 Precisão para um ataque
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Após as rolagens serem feitas
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4af37",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Firmar
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                +3 Armadura para um ataque
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Antes das rolagens serem feitas
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4af37",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Esquivar
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                +1 Armadura para um ataque
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Após as rolagens serem feitas
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4af37",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Nervos de Aço
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                +4 Vontade para uma rolagem de Vontade
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Antes da rolagem ser feita
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4af37",
                  fontWeight: "bold",
                  borderBottom: "1px solid #8b7355",
                  textAlign: "center",
                }}
              >
                Coração de Ferro
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                +2 Vontade para uma rolagem de Vontade
              </TableCell>
              <TableCell
                sx={{ color: "#d4c4a8", borderBottom: "1px solid #8b7355" }}
              >
                Após a rolagem ser feita
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  color: "#d4af37",
                  fontWeight: "bold",
                  borderBottom: "none",
                  textAlign: "center",
                }}
              >
                Corrida Frenética
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8", borderBottom: "none" }}>
                +2 Movimento pelo resto do turno
              </TableCell>
              <TableCell sx={{ color: "#d4c4a8", borderBottom: "none" }}>
                Na ativação
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <MobileText className="mb-6 italic text-[#b89d9d] text-sm">
        "Truques não fazem o guerreiro. Mas veteranos sem truques raramente se
        tornam veteranos mais velhos. Em Mordheim, cada pequena vantagem é a
        diferença entre um túmulo e uma taverna."
      </MobileText>

      {/* Exemplo de Progressão */}
      <div className="bg-[#2a1f1f] p-4 rounded-lg border border-[#382929] mb-6">
        <MobileText variant="heading" className="mb-3 text-[#d4af37]">
          Exemplo: A Ascensão de Gottfried
        </MobileText>

        <MobileText className="italic text-[#b89d9d] mb-3">
          Gottfried, o campeão, acumulou 100 XP após três jogos sangrentos.
          Sobrevivências (180 XP), duas mortes de soldados inimigos (10 XP), e
          uma morte de campeão inimigo (10 XP). Mais que suficiente. Ele subiu
          para nível 2.
        </MobileText>

        <MobileText className="italic text-[#b89d9d] mb-3">
          Klaus, seu capitão, estudou as opções. Aumentar Ímpeto? Aprender novo
          poder? No fim, escolheu <strong>Melhorar um Poder</strong> — "Muralha
          de Escudos" que tinha CD 3 agora ficaria mais fácil... não, esperem. A
          CD já estava no mínimo. Klaus mudou de ideia.
        </MobileText>

        <MobileText className="italic text-[#b89d9d]">
          <strong>Aumentar Ímpeto</strong>, decidiu finalmente. De +2 para +3.
          Gottfried sorriu, testando o peso de sua Zweihander. Parecia mais leve
          agora. Ou talvez ele estivesse mais forte. Em Mordheim, a diferença
          importa pouco. O resultado é o que conta.
        </MobileText>
      </div>
    </CollapsibleSection>
  );
};

export default ExperienceAndLevelSection;
