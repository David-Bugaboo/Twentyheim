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
import UnitCard from "../../components/UnitCard";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

// Helper component for random attribute table
const RandomAttributeTable = ({
  attributes,
}: {
  attributes: Array<{ roll: string; attribute: string }>;
}) => (
  <Box sx={{ mt: 2 }}>
    <ParchmentText
      sx={{
        fontSize: "0.95rem",
        fontWeight: 600,
        color: "#cd853f",
        mb: 1.5,
        fontFamily: '"Cinzel", serif',
      }}
    >
      Atributo Demoníaco Aleatório (role d20 quando animado)
    </ParchmentText>
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "rgba(28, 24, 18, 0.9)",
        border: "2px solid rgba(139, 69, 19, 0.3)",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "rgba(139, 69, 19, 0.2)",
              borderBottom: "2px solid #cd853f",
            }}
          >
            <TableCell
              align="center"
              sx={{
                color: "#cd853f",
                fontWeight: 700,
                fontSize: "0.9rem",
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
                fontSize: "0.9rem",
                fontFamily: '"Cinzel", serif',
              }}
            >
              Atributo Demoníaco
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attributes.map((row, index) => (
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
                  fontSize: "0.9rem",
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
                {row.attribute}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default function ConstructStatblocksPage() {
  const navigate = useNavigate();

  const kharadronConstructs = [
    {
      name: "Drone Girocóptero",
      stats: {
        move: 6,
        fight: "+0",
        shoot: "+0",
        armour: 10,
        will: "+2",
        health: 8,
        cost: "—",
      },
      abilities: [
        {
          name: "Drone Anão",
          description:
            "Esta figura tem a característica Construto. Ela também conta como se estivesse equipada com uma besta de mão. O drone pode ser afetado por quaisquer efeitos que alvejam armas.",
        },
      ],
    },
    {
      name: "Bode de Gromril",
      stats: {
        move: 5,
        fight: "+2",
        shoot: "+0",
        armour: 12,
        will: "+2",
        health: 12,
        cost: "—",
      },
      abilities: [
        {
          name: "Defensor Anão",
          description:
            "Esta figura tem a característica Construto. Esta figura tem a característica Chifrudo.",
        },
      ],
    },
    {
      name: "Guardião de Kharadron",
      stats: {
        move: 4,
        fight: "+4",
        shoot: "+0",
        armour: 13,
        will: "+2",
        health: 14,
        cost: "—",
      },
      abilities: [
        {
          name: "Equipamento",
          description: "Machado Anão, Escudo, Armadura de Gromril",
        },
        {
          name: "Defensor Anão",
          description:
            "Esta figura tem a característica Construto. Ela também tem as características Grande e Forte. O Defensor Kharadron pode ser afetado por quaisquer efeitos que alvejam armas, armadura e escudos.",
        },
      ],
    },
  ];

  const hashutConstructs = [
    {
      name: "Cão da Fundição",
      stats: {
        move: 6,
        fight: "+2",
        shoot: "+0",
        armour: 10,
        will: "+0",
        health: 12,
        cost: "—",
      },
      abilities: [
        {
          name: "Cão de Guarda de Naggaroth",
          description:
            "Esta figura tem as características Construto e Daemônio. Ela não pode pegar tesouro.",
        },
      ],
    },
    {
      name: "Barghest Laminado",
      stats: {
        move: 7,
        fight: "+3",
        shoot: "+0",
        armour: 12,
        will: "+0",
        health: 16,
        cost: "—",
      },
      abilities: [
        {
          name: "Besta Laminada de Naggaroth",
          description:
            "Esta figura tem as características Construto e Demônio. Sempre que uma figura se move para combate com este Construto, ela imediatamente sofre 2 de dano.",
        },
      ],
    },
    {
      name: "Touro Daemoníaco de Bronze",
      stats: {
        move: 4,
        fight: "+4",
        shoot: "+0",
        armour: 13,
        will: "+0",
        health: 20,
        cost: "—",
      },
      abilities: [
        {
          name: "Demônio Mecânico",
          description:
            "Esta figura tem as características Construto, Demônio, Grande e Canhão Elemental. Sempre que esta figura for colocada ou animada, role um d20. Ela ganha um atributo demoníaco aleatório dependendo da rolagem.",
        },
      ],
      randomAttributes: [
        { roll: "1-2", attribute: "Voraz" },
        { roll: "3-4", attribute: "Explosão de Sangue" },
        { roll: "5-6", attribute: "Chifres Perfurantes" },
        { roll: "7-8", attribute: "Forma Enlouquecedora" },
        { roll: "9-10", attribute: "Garras Infernais" },
        { roll: "11-12", attribute: "Parasita Espiritual" },
        { roll: "13-14", attribute: "Orquestra de Sussurros" },
        { roll: "15-16", attribute: "Pele de Aço Negro" },
        { roll: "17-18", attribute: "Tempestade de Crânios" },
        { roll: "19-20", attribute: "Magicida" },
      ],
    },
  ];

  return (
    <PageContainer>
      <Header title="Fichas de Constructos" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 4 }}>
            Constructos são seres animados de metal e magia, fabricados por
            artífices habilidosos e trazidos à vida através de poder arcano.
            Cada tradição de criação de constructos produz criações únicas com
            suas próprias forças e propósitos.
          </ParchmentText>

          <PowerListTitle>Constructos Kharadron</PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            As maravilhas mecânicas dos engenheiros Anões — precisas, confiáveis
            e construídas para durar. Estes constructos combinam excelência de
            engenharia anã com encantamentos sutis.
          </ParchmentText>

          {kharadronConstructs.map((construct, index) => (
            <UnitCard
              key={index}
              name={construct.name}
              stats={construct.stats}
              abilities={construct.abilities}
            />
          ))}

          <PowerListTitle sx={{ mt: 5 }}>
            Constructos de Hashut (Filhos de Hashut)
          </PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Criações sombrias dos Anões do Caos, misturando latão, essência
            demoníaca e magias proibidas. Estes constructos são tanto demônio
            quanto máquina, reflexos distorcidos da vontade do Pai das Trevas.
          </ParchmentText>

          {hashutConstructs.map((construct: any, index: number) => (
            <Box key={index}>
              <UnitCard
                name={construct.name}
                stats={construct.stats}
                abilities={construct.abilities}
              />
              {construct.randomAttributes && (
                <RandomAttributeTable attributes={construct.randomAttributes} />
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
            <PowerListTitle sx={{ mt: 0 }}>Criando Constructos</PowerListTitle>
            <ParchmentText>
              Constructos são tipicamente criados através de magias específicas
              ou habilidades de bando. Caçadores de Tesouro Anões podem
              construir Constructos Kharadron através das habilidades de seu
              Engenheiro, enquanto Filhos de Hashut usam a oração{" "}
              <strong>Forja Demoníaca</strong> para animar suas criações
              sombrias. O custo mostrado é "—" porque constructos não são
              tipicamente comprados, mas criados através de meios mágicos.
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
