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

export default function ConstructModificationsPage() {
  const navigate = useNavigate();

  const modificationTable = [
    { roll: "1", modification: "Zoocida" },
    { roll: "2", modification: "Blindagem" },
    { roll: "3", modification: "Martelo Hidraulico" },
    { roll: "4", modification: "Lubrificador Vulcanico" },
    { roll: "5", modification: "Chifres de Aríete" },
    { roll: "6", modification: "Sobreplacas de Gromril" },
    { roll: "7", modification: "Broca de Diamante" },
    { roll: "8", modification: "Lança Fogo Dracônico" },
    { roll: "9", modification: "Amortecedores Hidraulicos" },
    { roll: "10", modification: "Propulsores Aethéricos" },
    { roll: "11", modification: "Mecanica Modular" },
    { roll: "12", modification: "Membros Extras" },
    { roll: "13", modification: "Juntas Omnidirecionais" },
    { roll: "14", modification: "Runas Anti-bruxo" },
    { roll: "15", modification: "Tanque Quimico" },
    { roll: "16", modification: "Campo de Força Rúnico" },
    { roll: "17", modification: "Runa da Automação" },
    { roll: "18-20", modification: "Warband Specific Upgrades (see below)" },
  ];

  const genericModifications = [
    {
      name: "Zoocida",
      cost: "100 coroas Compra / 75 coroas Venda",
      description:
        "Esta modificação inclui gravar runas de poder específicas no corpo do Construto para torná-lo especialmente mortal ao lutar contra animais. Sempre que este Construto estiver lutando contra um animal, ele ganha +1 Ímpeto e +1 Dano.",
    },
    {
      name: "Blindagem",
      cost: "100 coroas Compra / 90 coroas Venda",
      description:
        "Esta modificação dá armadura adicional ao Construto. O Construto recebe +1 Armadura.",
    },
    {
      name: "Martelo Hidráulico",
      cost: "125 coroas Compra / 100 coroas Venda",
      description:
        "Este martelo grande e encantado só pode ser adaptado a constructos Defensores Kharadron ou Demônios da Fundição. Um Construto que recebe esta modificação é tratado como portando uma arma mágica e recebe modificador +2 de dano.",
    },
    {
      name: "Lubrificante Vulcânico",
      cost: "125 coroas Compra / 100 coroas Venda",
      description:
        "Este é um barril de óleo borrachoso usado para aumentar a velocidade e eficiência dos constructos. Um Construto que recebe esta modificação ganha +1 Agilidade.",
    },
    {
      name: "Chifres de Aríete",
      cost: "150 coroas Compra / 100 coroas Venda",
      description:
        "Este Construto é equipado com grandes espinhos ou chifres enormes. Ele ganha a característica Chifres.",
    },
    {
      name: "Sobreplacas de Gromril",
      cost: "300 coroas Compra / 120 coroas Venda",
      description:
        "Este Construto é composto primariamente de placas de gromril. Por essa razão, é muito difícil danificá-lo com armas de projétil pequenas. Este Construto nunca pode sofrer mais que 3 pontos de dano de qualquer ataque de arma de mísseis ou armas de fogo, a menos que aquele ataque seja mágico. Neste caso, aumente o máximo pela adição total que a munição deu tanto a Precisão quanto a Dano. Por exemplo, uma flecha que concedeu +1 Precisão e +1 Dano poderia causar no máximo 5 pontos de dano.",
    },
    {
      name: "Broca de Diamante",
      cost: "300 coroas Compra / 150 coroas Venda",
      description:
        "O Construto é equipado com uma broca, ou outros meios de escavar rapidamente através do terreno. O Construto ganha a característica Escavador. Contudo, em qualquer ativação que ele use esta característica, ele sofre -1 Agilidade (até um mínimo de 1).",
    },
    {
      name: "Lança-Chamas Dracônico",
      cost: "150 coroas Compra / 100 coroas Venda",
      description:
        "Uma vez por jogo, este Construto pode fazer um ataque a distância mágico elemental +3 com alcance máximo de 20 cm. Isso segue todas as regras normais de ataque a distância.",
    },
    {
      name: "Amortecedores Hidraulicos",
      cost: "100 coroas Compra / 75 coroas Venda",
      description:
        "Este Construto foi modificado para minimizar o dano de qualquer queda. Trate toda distância caída por este Construto como metade da quantidade real para fins de determinar dano. Esta modificação não causa penalidade de modificação.",
    },
    {
      name: "Propulsor Aetérico",
      cost: "250 coroas Compra / 140 coroas Venda",
      description:
        "O Construto é equipado com asas, ou algum outro meio de voo limitado. O Construto ganha a característica Voador. Além da penalidade usual de modificação por receber esta modificação, este Construto não pode mais pegar ou carregar fichas de tesouro.",
    },
    {
      name: "Mecânica Modular",
      cost: "150 coroas Compra / 100 coroas Venda",
      description:
        "Este Construto é construído usando peças comuns que podem ser facilmente desconectadas e substituídas. Este Construto recebe +1 em todas as Rolagens de Sobrevivência. Um mago recebe +2 em todas as rolagens de conjuração de Animar Construto para trazer este Construto de volta dos mortos ou para curar um ferimento permanente.",
    },
    {
      name: "Múltiplos Membros",
      cost: "150 coroas Compra / 100 coroas Venda",
      description:
        "O Construto tem mais membros tornando mais difícil de ganhar superioridade numérica contra ele em uma luta. Figuras apoiando uma luta contra este Construto concedem apenas +1 de bônus de figura de suporte ao invés dos +2 normais.",
    },
    {
      name: "Juntas Omnidirecionais",
      cost: "150 coroas Compra / 100 coroas Venda",
      description:
        "Esta modificação aumenta a rapidez de um Construto tornando-o tanto mais difícil de acertar quanto mais mortal em combate. O Construto ganha +1 Ímpeto. Esta modificação não pode ser feita em um Defensor Kharadron ou Demônio da Fundição.",
    },
    {
      name: "Runa Anti-bruxo",
      cost: "100 coroas Compra / 60 coroas Venda",
      description:
        "O Construto recebe mais força de vontade independente do que é comum em constructos. Ele ganha +5 Vontade para resistir a quaisquer magias. Esta modificação pode ser feita sem penalidade de modificação.",
    },
    {
      name: "Tanque Químico",
      cost: "100 coroas Compra / 60 coroas Venda",
      description:
        "Este Construto pode carregar uma poção como se tivesse um espaço de item. Contudo, ele não pode usar esta poção. Ao invés disso, qualquer figura aliada a até 3 cm pode gastar uma ação para consumir esta poção, desde que nenhuma figura esteja em combate. Esta modificação não causa penalidade de modificação.",
    },
    {
      name: "Campo de Força Rúnico",
      cost: "100 coroas Compra / 60 coroas Venda",
      description:
        "O Construto ganha +2 Armadura e +2 Ímpeto sempre que fizer uma Rolagem de Combate contra um ataque a distância de arma de mísseis ou arma de fogo, incluindo mágicas. O Construto ainda está sujeito à regra de armadura máxima.",
    },
    {
      name: "Runa da Automação",
      cost: "150 coroas Compra / 100 coroas Venda",
      description:
        "Este Construto pode se reparar. Talvez seja composto de material que pode fluir e preencher áreas danificadas ou talvez carregue ferramentas para trabalhar em suas próprias partes quebradas. Qualquer que seja o mecanismo, cada vez que o Construto ativa, ele pode gastar uma ação (que pode substituir a ação de movimento) para reparar um ponto de dano, até seu Vigor inicial. Ele pode até fazer isso enquanto em combate.",
    },
  ];

  const dwarfModifications = [
    {
      name: "Turreta Mecanica",
      cost: "125 coroas Compra / 100 coroas Venda",
      description:
        "O atributo de Precisão do Construto é aumentado para +2 se for menor que isso, e seu atributo de Agilidade é reduzido em 2. O Construto ganha uma Besta e uma Aljava ou um Bacamarte e um Barril de Pólvora, à escolha do jogador. Estes itens devem ser adicionados às notas do Construto. Estes itens seguem todas as regras normais. Contudo, o Construto ainda não tem espaços de item, então não pode receber uma versão mágica de qualquer destes itens. Se esta modificação for feita em um Construto pequeno ou médio, aquele Construto agora conta como soldado especialista.",
    },
    {
      name: "Exorcista de Grimnir",
      cost: "100 coroas Compra / 60 coroas Venda",
      description:
        "Esta modificação inclui gravar runas de poder específicas no corpo do Construto para rasgar o dhar que vincula um demônio a este plano de existência. Sempre que este Construto estiver lutando contra um demônio, ele ganha +1 Ímpeto e +1 Dano.",
    },
    {
      name: "Runa de Controle Remoto",
      cost: "120 coroas Compra / 100 coroas Venda",
      description:
        "Este Construto pode ser ativado na fase do Campeão contanto que esteja a até 30 cm e em linha de visão (ao invés dos 8 cm normais) do Engenheiro. O Construto ainda conta como um dos três soldados que podem ser ativados nestas fases.",
    },
    {
      name: "Guardião de Mausoléu de Grimnir",
      cost: "100 coroas Compra / 60 coroas Venda",
      description:
        "Esta modificação inclui gravar runas de poder específicas no corpo do Construto, para rasgar o dhar animando os mortos-vivos. Sempre que este Construto estiver lutando contra um oponente morto-vivo, ele ganha +1 Ímpeto e +1 Dano.",
    },
    {
      name: "Propulsor de Girocóptero",
      cost: "300 coroas Compra / 200 coroas Venda",
      description:
        "Se este modelo tem a modificação Propulsor, ele pode carregar tesouro normalmente.",
    },
  ];

  const hashutModifications = [
    {
      name: "Núcleo Daemoníaco",
      cost: "200 coroas Compra / 100 coroas Venda",
      description:
        "Este Construto gera uma pequena quantidade de energia do caos excedente que pode ser explorada por um conjurador em seu bando. Essencialmente, o Construto tem 3 pontos de poder a cada jogo que podem ser explorados pelo Sacerdote-Artífice em seu bando, contanto que estejam a até 30 cm e em linha de visão, para empoderar uma Rolagem de Conjuração ou Rolagem de Vontade.",
    },
    {
      name: "Biomecânica",
      cost: "125 coroas Compra / 60 coroas Venda",
      description:
        "Este Construto contém quantidades significativas de material vivo, em seu design. Este Construto é afetado por magias de cura como se não fosse um Construto. Esta modificação pode ser feita sem penalidade de modificação. Adicionalmente, a aparência grotesca do Construto dá a ele a trait Medo.",
    },
    {
      name: "Tanque Alquímico",
      cost: "200 coroas Compra / 120 coroas Venda",
      description:
        "Este Construto é equipado com um reservatório de veneno que é injetado em uma vítima quando ele acerta um golpe corpo a corpo bem-sucedido. Os ataques do Construto são venenosos.",
    },
    {
      name: "Daemonincubadora Integrada",
      cost: "350 coroas Compra / 250 coroas Venda",
      description:
        "Sempre que este Construto ativa, role um d20. Em um 14+, gere um diabrete a 15 cm em uma direção aleatória. Se o diabrete for colocado fora do mapa, ele desaparece e a invocação é desperdiçada.",
    },
    {
      name: "Devorador de Caos",
      cost: "100 coroas Compra / 90 coroas Venda",
      description:
        "Estes constructos podem drenar energia mágica para reparar danos a seus corpos. Sempre que este Construto for alvo de uma magia conjurada com sucesso, ele recupera 2 pontos de Vigor perdido, independente do efeito da magia (embora magias que não tenham efeito contra constructos não ativem esta habilidade).",
    },
  ];

  return (
    <PageContainer>
      <Header title="Modificações de Constructos" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 3 }}>
            Embora constructos não tenham espaços de item, e portanto nunca
            possam carregar itens, eles podem ser <strong>modificados</strong>{" "}
            para mudar suas capacidades. Na maioria dos casos, isso melhorará um
            aspecto do Construto ao custo de algum outro aspecto. Um mago pode
            tentar modificar um Construto ou no momento de sua criação ou antes
            de qualquer jogo em que o Construto vai participar.
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            <strong>Importante:</strong> Nenhum Construto pode ter mais de uma
            modificação.
          </ParchmentText>

          <PowerListTitle>
            Tabela de Modificação de Constructos (d20)
          </PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Role nesta tabela para determinar aleatoriamente quais peças de
            modificação estão disponíveis, ou use-a como tabela de tesouro em
            cenários:
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
                      width: "100px",
                    }}
                  >
                    Rolagem d20
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#cd853f",
                      fontWeight: 700,
                      fontSize: "1rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    Modificação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modificationTable.map((row, index) => (
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
                      }}
                    >
                      {row.roll}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#d4c5a0",
                        fontSize: "0.95rem",
                        fontFamily: '"Crimson Text", serif',
                      }}
                    >
                      {row.modification}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
              Como Funcionam as Modificações
            </PowerListTitle>

            <ParchmentText sx={{ mb: 2 }}>
              <strong>Criando Novo Construto com Modificação:</strong>
              <br />
              Use Forja Demoniaca ou Obra Prima do Homem de Ferro com sucesso,
              com uma <strong>penalidade adicional de -2</strong> à Rolagem de
              Conjuração. Isso é cumulativo com penalidades de tamanho. Se
              bem-sucedido, o Construto é criado com a modificação e as peças
              são consumidas.
            </ParchmentText>

            <ParchmentText>
              <strong>Modificando Construto Existente:</strong>
              <br />
              Faça a Rolagem com <strong>-2</strong> apenas para a modificação
              (tamanho não é considerado). Se bem-sucedido, o Construto é
              modificado. Se falhar, o Construto não é modificado mas as peças
              permanecem no cofre para outra tentativa.
            </ParchmentText>
          </Box>

          <PowerListTitle>Modificações Genéricas</PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Estas modificações podem ser aplicadas a qualquer Construto,
            independentemente de seu criador:
          </ParchmentText>

          {genericModifications.map((mod, index) => (
            <Box
              key={index}
              sx={{
                mb: 3,
                p: 2.5,
                backgroundColor: "rgba(28, 24, 18, 0.6)",
                border: "1px solid rgba(139, 115, 85, 0.4)",
                borderRadius: "6px",
              }}
            >
              <ParchmentText
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#d4af37",
                  fontFamily: '"Cinzel", serif',
                  mb: 0.5,
                }}
              >
                {mod.name}
              </ParchmentText>

              <ParchmentText
                sx={{
                  fontSize: "0.9rem",
                  color: "#c4a870",
                  fontStyle: "italic",
                  mb: 1.5,
                }}
              >
                {mod.cost}
              </ParchmentText>

              <ParchmentText sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                {mod.description}
              </ParchmentText>
            </Box>
          ))}

          <PowerListTitle sx={{ mt: 5 }}>
            Modificações Específicas de Caçadores de Tesouro Anões
          </PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Estas modificações são exclusivas para Constructos Kharadron
            construídos por Caçadores de Tesouro Anões. Role um d6 para
            determinar qual modificação está disponível:
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
                    Rolagem d6
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#cd853f",
                      fontWeight: 700,
                      fontSize: "1rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    Modificação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(28, 24, 18, 0.5)",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#DAA520",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    1
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#d4c5a0",
                      fontSize: "0.95rem",
                      fontFamily: '"Crimson Text", serif',
                    }}
                  >
                    Construto de Torreta
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(28, 24, 18, 0.7)",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#DAA520",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    2
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#d4c5a0",
                      fontSize: "0.95rem",
                      fontFamily: '"Crimson Text", serif',
                    }}
                  >
                    Exorcista de Grimnir
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(28, 24, 18, 0.5)",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#DAA520",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    3
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#d4c5a0",
                      fontSize: "0.95rem",
                      fontFamily: '"Crimson Text", serif',
                    }}
                  >
                    Runa de Controle Remoto
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(28, 24, 18, 0.7)",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#DAA520",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    4
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#d4c5a0",
                      fontSize: "0.95rem",
                      fontFamily: '"Crimson Text", serif',
                    }}
                  >
                    Guardião de Mausoléu de Grimnir
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(28, 24, 18, 0.5)",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#DAA520",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    5-6
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#d4c5a0",
                      fontSize: "0.95rem",
                      fontFamily: '"Crimson Text", serif',
                    }}
                  >
                    Propulsor de Girocóptero
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {dwarfModifications.map((mod, index) => (
            <Box
              key={index}
              sx={{
                mb: 3,
                p: 2.5,
                backgroundColor: "rgba(28, 24, 18, 0.6)",
                border: "1px solid rgba(139, 115, 85, 0.4)",
                borderRadius: "6px",
              }}
            >
              <ParchmentText
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#d4af37",
                  fontFamily: '"Cinzel", serif',
                  mb: 0.5,
                }}
              >
                {mod.name}
              </ParchmentText>

              <ParchmentText
                sx={{
                  fontSize: "0.9rem",
                  color: "#c4a870",
                  fontStyle: "italic",
                  mb: 1.5,
                }}
              >
                {mod.cost}
              </ParchmentText>

              <ParchmentText sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                {mod.description}
              </ParchmentText>
            </Box>
          ))}

          <PowerListTitle sx={{ mt: 5 }}>
            Modificações Específicas dos Filhos de Hashut
          </PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Estas modificações sombrias são exclusivas para os constructos
            infundidos com demônios dos Filhos de Hashut. Role um d6 para
            determinar qual modificação está disponível:
          </ParchmentText>

          <TableContainer
            component={Paper}
            sx={{
              mb: 4,
              backgroundColor: "rgba(28, 24, 18, 0.9)",
              border: "2px solid #8B0000",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(139, 0, 0, 0.3)",
                    borderBottom: "2px solid #ff6b35",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#ff6b35",
                      fontWeight: 700,
                      fontSize: "1rem",
                      fontFamily: '"Cinzel", serif',
                      width: "100px",
                    }}
                  >
                    Rolagem d6
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#ff6b35",
                      fontWeight: 700,
                      fontSize: "1rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    Modificação
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(28, 24, 18, 0.5)",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#ff8c69",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    1
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#d4c5a0",
                      fontSize: "0.95rem",
                      fontFamily: '"Crimson Text", serif',
                    }}
                  >
                    Núcleo Demoníaco
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(28, 24, 18, 0.7)",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#ff8c69",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    2
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#d4c5a0",
                      fontSize: "0.95rem",
                      fontFamily: '"Crimson Text", serif',
                    }}
                  >
                    Artesania de Carne
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(28, 24, 18, 0.5)",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#ff8c69",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    3
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#d4c5a0",
                      fontSize: "0.95rem",
                      fontFamily: '"Crimson Text", serif',
                    }}
                  >
                    Tanque Alquímico
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(28, 24, 18, 0.7)",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#ff8c69",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    4
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#d4c5a0",
                      fontSize: "0.95rem",
                      fontFamily: '"Crimson Text", serif',
                    }}
                  >
                    Daemonincubadora Integrada
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(28, 24, 18, 0.5)",
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{
                      color: "#ff8c69",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    5-6
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#d4c5a0",
                      fontSize: "0.95rem",
                      fontFamily: '"Crimson Text", serif',
                    }}
                  >
                    Devorador de Caos
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {hashutModifications.map((mod, index) => (
            <Box
              key={index}
              sx={{
                mb: 3,
                p: 2.5,
                backgroundColor: "rgba(28, 24, 18, 0.6)",
                border: "1px solid rgba(139, 0, 0, 0.4)",
                borderRadius: "6px",
              }}
            >
              <ParchmentText
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#ff6b35",
                  fontFamily: '"Cinzel", serif',
                  mb: 0.5,
                }}
              >
                {mod.name}
              </ParchmentText>

              <ParchmentText
                sx={{
                  fontSize: "0.9rem",
                  color: "#c4a870",
                  fontStyle: "italic",
                  mb: 1.5,
                }}
              >
                {mod.cost}
              </ParchmentText>

              <ParchmentText sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                {mod.description}
              </ParchmentText>
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
              Adquirindo Modificações
            </PowerListTitle>
            <ParchmentText>
              Peças de modificação podem ser adquiridas através de:
              <br />
              <br />• <strong>Compra:</strong> Compre pelo preço de compra
              listado
              <br />• <strong>Rolagens de Tesouro:</strong> Alguns cenários
              permitem rolar na Tabela de Modificação de Constructos
              <br />• <strong>Mercado Negro:</strong> Troque rolagens de tesouro
              por rolagens na Tabela de Modificação
              <br />• <strong>Melhorias de Base:</strong> O Salão Mecânico Anão
              permite comprar modificações com 50% de desconto
            </ParchmentText>
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/constructs")}
        >
          Voltar aos Constructos
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
