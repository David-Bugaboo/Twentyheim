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
import DaemonCard from "../../components/DaemonCard";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

// Helper component to render random attribute table
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
        color: "#a78bfa",
        mb: 1.5,
        fontFamily: '"Cinzel", serif',
      }}
    >
      Atributo Aleatório (role d6 ao invocar)
    </ParchmentText>
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: "rgba(28, 24, 18, 0.9)",
        border: "2px solid rgba(147, 51, 234, 0.3)",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "rgba(147, 51, 234, 0.2)",
              borderBottom: "2px solid #a78bfa",
            }}
          >
            <TableCell
              align="center"
              sx={{
                color: "#a78bfa",
                fontWeight: 700,
                fontSize: "0.9rem",
                fontFamily: '"Cinzel", serif',
                width: "80px",
              }}
            >
              Rolagem
            </TableCell>
            <TableCell
              sx={{
                color: "#a78bfa",
                fontWeight: 700,
                fontSize: "0.9rem",
                fontFamily: '"Cinzel", serif',
              }}
            >
              Atributo Daemônico
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

export default function DaemonStatblocksPage() {
  const navigate = useNavigate();

  const lesserDaemons = [
    {
      name: "Diabrete",
      stats: {
        move: 6,
        fight: "+1",
        shoot: "+0",
        armour: 10,
        will: "+4",
        health: 6,
        cost: "—",
      },
      abilities: [
        {
          name: "Daemônio Menor",
          description: "Esta figura possui o traço Daemônio.",
        },
      ],
    },
  ];

  const minorDaemons = [
    {
      name: "Enfermo",
      chaosGod: "nurgle" as const,
      stats: {
        move: 4,
        fight: "+3",
        shoot: "+0",
        armour: 11,
        will: "+4",
        health: 16,
        cost: "—",
      },
      abilities: [
        {
          name: "Andarilho da Enfermidade",
          description:
            "Esta figura possui o traço Daemônio e o atributo daemônico Andarilho da Varíola.",
        },
      ],
    },
    {
      name: "Daemonette",
      chaosGod: "slaanesh" as const,
      stats: {
        move: 8,
        fight: "+3",
        shoot: "+0",
        armour: 10,
        will: "+4",
        health: 10,
        cost: "—",
      },
      abilities: [
        {
          name: "Sedução Profana",
          description:
            "Esta figura possui o traço Daemônio e o atributo daemônico Forma Efêmera.",
        },
      ],
    },
    {
      name: "Tzaangor",
      chaosGod: "tzeentch" as const,
      stats: {
        move: 6,
        fight: "+0",
        shoot: "+2",
        armour: 10,
        will: "+4",
        health: 12,
        cost: "—",
      },
      abilities: [
        {
          name: "Andarilho do Disco de Tzeench",
          description:
            "Esta figura possui o traço Daemônio e o atributo daemônico Asas da Mutação.",
        },
        {
          name: "Fatebow",
          description:
            "Esse modelo pode como uma ação fazer um ataque a distância usando sua precisão, com alcance de 60cm. Uma criatura atingida por esse ataque deve rerolar sua próxima rolagem de dado e escolher o pior resultado.",
        },
      ],
    },
    {
      name: "Dessangrador",
      chaosGod: "khorne" as const,
      stats: {
        move: 6,
        fight: "+4",
        shoot: "+0",
        armour: 11,
        will: "+3",
        health: 10,
        cost: "—",
      },
      abilities: [
        {
          name: "Massacre Daemônico",
          description:
            "Esta figura possui o traço Daemônio e o Atributo Daemônico Voraz.",
        },
      ],
    },
  ];

  const majorDaemons = [
    {
      name: "O Grande Leproso",
      chaosGod: "nurgle" as const,
      stats: {
        move: 4,
        fight: "+5",
        shoot: "+0",
        armour: 12,
        will: "+6",
        health: 20,
        cost: "—",
      },
      abilities: [
        {
          name: "Arauto de Nurgle",
          description:
            "Esta figura possui os traços Daemônio, Forte, Grande e Visão Verdadeira. Ela possui o atributo daemônico Andarilho da Varíola. Quando este modelo é colocado na mesa ou invocado, role um d6. Ele ganha um Atributo Daemônico dependendo da rolagem.",
        },
      ],
      randomAttributes: [
        { roll: "1-2", attribute: "Portador do Apodrecimento" },
        { roll: "3-4", attribute: "Sangue Pestilento" },
        { roll: "5-6", attribute: "Dádivas de Nurgle" },
      ],
    },
    {
      name: "Senhor da Diástase",
      chaosGod: "tzeentch" as const,
      stats: {
        move: 6,
        fight: "+2",
        shoot: "+2",
        armour: 12,
        will: "+6",
        health: 15,
        cost: "—",
      },
      abilities: [
        {
          name: "Tecelão de Destinos de Tzeentch",
          description:
            "Esta figura possui os traços Daemônio, Grande, Forte e Visão Verdadeira e o atributo daemônico Grandes Asas da Mutação. Quando este modelo é colocado na mesa ou invocado, role um d20. Ele ganha um Atributo Daemônico dependendo da rolagem.",
        },
        {
          name: "Raio da Mudança",
          description:
            "Este modelo pode disparar um Raio da Mudança. Este é um Ataque de Tiro mágico feito usando o atributo de Precisão deste modelo. Se um modelo for reduzido a 0 vigor por este ataque, ele ganha uma Dádiva de Tzeentch (Verifique Tradições Sombrias para esta tabela).",
        },
      ],
      randomAttributes: [
        { roll: "1-7", attribute: "Grandes Asas da Mutação" },
        { roll: "7-16", attribute: "Tecelão de Destinos" },
        { roll: "16-20", attribute: "Forma Enlouquecedora" },
      ],
    },
    {
      name: "Guardião de Segredos",
      chaosGod: "slaanesh" as const,
      stats: {
        move: 8,
        fight: "+4",
        shoot: "+0",
        armour: 10,
        will: "+6",
        health: 15,
        cost: "—",
      },
      abilities: [
        {
          name: "Guardião do Palácio de Slaanesh",
          description:
            "Esta figura possui os traços Daemônio, Grande, Forte e Visão Verdadeira e possui o atributo daemônico Forma Efêmera. Quando este modelo é colocado na mesa ou invocado, role um d20. Ele ganha um Atributo Daemônico dependendo da rolagem.",
        },
      ],
      randomAttributes: [
        { roll: "1-7", attribute: "Dádiva da Celeridade" },
        { roll: "8-15", attribute: "Distorção da Realidade" },
        { roll: "16-20", attribute: "Orquestra de Sussurros" },
      ],
    },
    {
      name: "Devorador Sanguíneo",
      chaosGod: "khorne" as const,
      stats: {
        move: 6,
        fight: "+6",
        shoot: "+0",
        armour: 12,
        will: "+4",
        health: 15,
        cost: "—",
      },
      abilities: [
        {
          name: "Aniquilador de Khorne",
          description:
            "Esta figura possui os traços Daemônio, Grande, Forte e Visão Verdadeira e o atributo daemônico Voraz. Quando este modelo é colocado na mesa ou invocado, role um d20. Ele ganha um Atributo Daemônico dependendo da rolagem.",
        },
      ],
      randomAttributes: [
        { roll: "1-7", attribute: "Magicida" },
        { roll: "8-15", attribute: "Tempestade de Crânios" },
        { roll: "16-20", attribute: "Conflagrador de Violência" },
      ],
    },
  ];

  return (
    <PageContainer>
      <Header title="Fichas de Daemônios" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 4 }}>
            Daemônios vêm em muitas formas, desde o humilde diabretw até o
            imponente príncipe daemônio. Abaixo estão os perfis padrão para as
            entidades daemônicas mais comumente encontradas em Wyrdgrave. Cada
            daemônio possui traços únicos que os tornam oponentes formidáveis —
            ou aliados aterrorizantes, caso um conjurador seja tolo ou poderoso
            o suficiente para vinculá-los.
          </ParchmentText>

          <PowerListTitle>Daemônios Inferiores</PowerListTitle>

          {lesserDaemons.map((daemon, index) => (
            <DaemonCard
              key={index}
              name={daemon.name}
              stats={daemon.stats}
              abilities={daemon.abilities}
            />
          ))}

          <PowerListTitle sx={{ mt: 5 }}>Daemônios Menores</PowerListTitle>

          {minorDaemons.map((daemon: any, index: number) => (
            <DaemonCard
              key={index}
              name={daemon.name}
              stats={daemon.stats}
              abilities={daemon.abilities}
              chaosGod={daemon.chaosGod}
            />
          ))}

          <PowerListTitle sx={{ mt: 5 }}>
            Daemônios Maiores (Daemônios Superiores)
          </PowerListTitle>

          {majorDaemons.map((daemon: any, index: number) => (
            <Box key={index}>
              <DaemonCard
                name={daemon.name}
                stats={daemon.stats}
                abilities={daemon.abilities}
                chaosGod={daemon.chaosGod}
              />
              {daemon.randomAttributes && (
                <RandomAttributeTable attributes={daemon.randomAttributes} />
              )}
            </Box>
          ))}
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/daemons")}
        >
          Voltar aos Daemônios
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
