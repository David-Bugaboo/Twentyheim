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

const giftResults = [
  {
    roll: "1",
    result:
      "**Corpo de Obsidiana.** A carne da figura se transforma em obsidiana preta. Ela ganha +2 Armadura, mas seu Vigor é reduzido pela metade, arredondando para cima.",
  },
  {
    roll: "2",
    result:
      "**Alma Sombria.** Esta figura tem sua alma substituída por um daemônio menor e ganha o traço Daemônio mas mantém quaisquer espaços de itens que possuía anteriormente.",
  },
  {
    roll: "3",
    result:
      "**Pele de Pergaminho.** Esta figura sangra profusamente dos menores ferimentos. Ela conta como Ferida sempre que estiver abaixo do Vigor completo.",
  },
  {
    roll: "4",
    result:
      "**Definhar.** Esta figura teve a maior parte de sua carne deteriorada como se tivesse envelhecido em um minuto. A figura sofre um -2 Vigor permanente.",
  },
  {
    roll: "5",
    result:
      "**Destino Ominoso.** Sempre que esta figura rolar na Tabela de Sobrevivência, ela deve rolar dois dados e pegar o resultado menor.",
  },
  {
    roll: "6",
    result:
      "**Aparência Cadavérica.** Esta figura ganha o traço Morto-Vivo, mas mantém quaisquer espaços de itens que possui atualmente.",
  },
  {
    roll: "7",
    result:
      "**Carne de Cera.** A carne desta figura se transforma em cera de vela pútrida. Esta figura recebe um -1 Armadura permanente.",
  },
  {
    roll: "8",
    result:
      "**Ossos de Obsidiana.** O esqueleto da figura se transforma em obsidiana vítrea. Sempre que esta figura rolar 'Gravemente Ferido' na Tabela de Sobrevivência, ela sofre um -1 Vigor permanente.",
  },
  {
    roll: "9",
    result:
      "**Alergia.** Esta figura é alérgica ao sangue de outras criaturas. Se ela danificar outra figura em combate corpo a corpo, ela é envenenada.",
  },
  {
    roll: "10",
    result:
      "**Alma Destrancada.** Se esta figura rolar um '1' natural em qualquer rolagem durante o jogo, ela é possuída por um Daemônio e conta como uma criatura descontrolada. Isto dura pelo resto do turno no qual o '1' foi rolado e todo o próximo turno. Depois disso, a insanidade passa, e a possessão termina e a figura retorna à sua aliança normal.",
  },
  {
    roll: "11",
    result:
      "**Pernas Inchadas.** Esta figura sofre dano dobrado de quedas.",
  },
  {
    roll: "12",
    result:
      "**Visão Atormentada.** Esta figura sofre -1 em todas as Rolagens de Vontade para resistir ou superar magias.",
  },
  {
    roll: "13",
    result:
      "**Alma Volátil.** Esta figura é permanentemente possuída por um Daemônio de Khorne ansioso pela matança. Se o jogador controlador rolar um '1' natural em uma Rolagem de Iniciativa, o demônio ruge de raiva, e todas as figuras a até 5cm, incluindo o conjurador, imediatamente sofrem um ataque de tiro mágico +1.",
  },
  {
    roll: "14",
    result:
      "**Nervos Estilhaçados.** Se esta figura sofrer 5 ou mais pontos de dano de uma única fonte, ela sofre -1 Ímpeto e -1 Dano pelo resto do jogo. Esta penalidade só pode ser sofrida uma vez por jogo.",
  },
  {
    roll: "15",
    result:
      "**Arauto de Nurgle.** Esta figura se transforma em meio-humano, meio-mosca. Ela sofre -1 Agilidade, -1 Ímpeto, -1 Armadura e -2 Vigor, mas se torna imune a dano de queda.",
  },
  {
    roll: "16",
    result:
      "**Dádiva de Nurgle.** Esta figura se torna extremamente gorda. Ela sofre -2 Agilidade mas ganha +1 Vigor.",
  },
  {
    roll: "17",
    result:
      '**Pele de Vidro.** A figura não tem pigmento na pele, então sua pele é completamente branca, e seus olhos são rosa. Esta figura tem uma linha de visão máxima de 45cm.',
  },
  {
    roll: "18",
    result:
      "**Órgãos Externos.** Os pulmões desta figura estão do lado de fora, aumentando a probabilidade de um golpe causar dano crítico. Se seu oponente rolar um '19' natural em combate corpo a corpo ou em um ataque de Tiro, trate isto como um '20', causando um acerto crítico.",
  },
  {
    roll: "19",
    result:
      "**Sangue Ralo.** Esta figura tem reações violentas ao veneno. Sempre que sofrer dano de um ataque envenenado, ela imediatamente sofre 3 pontos de dano adicionais.",
  },
  {
    roll: "20",
    result:
      "**Horror Sem Face.** O rosto desta figura é completamente liso e desprovido de características, ainda assim todos os seus sentidos permanecem intactos. Ela sofre -3 Vontade. Apenas figuras a até 3cm dela podem ativar durante as Fases de Herói ou Campeão.",
  },
];

export default function TzeentchGiftsTable() {
  return (
    <>
      <PowerListTitle sx={{ color: "#9333ea", mt: 3, mb: 2 }}>
        Dádivas de Tzeentch
      </PowerListTitle>

      <ParchmentText sx={{ mb: 3 }}>
        Pior que estes efeitos é o fato de que o poder descontrolado do caos
        distorce a carne de seu usuário. Quando a Maldição de Tzeentch é
        desencadeada, role também na tabela de Dádivas de Tzeentch abaixo:
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
                backgroundColor: "rgba(147, 51, 234, 0.3)",
                borderBottom: "2px solid #9333ea",
              }}
            >
              <TableCell
                align="center"
                sx={{
                  color: "#9333ea",
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
                  color: "#9333ea",
                  fontWeight: 700,
                  fontSize: "1rem",
                  fontFamily: '"Cinzel", serif',
                }}
              >
                Efeito
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {giftResults.map((row, index) => (
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
                    color: "#9333ea",
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

