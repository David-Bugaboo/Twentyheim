import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
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
import { pactSacrifices, pactBoons } from "../spells/data/pacts.data";

export default function DaemonicPactsPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header title="Pactos Daemônicos" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 3 }}>
            O caminho mais perigoso que um conjurador pode trilhar é o Pacto
            Daemônico — um contrato vinculante com uma entidade da Imaterium. Em
            troca de poder, o conjurador oferece algo precioso: sangue, almas,
            Pedra-bruxa, ou até fragmentos de sua própria essência mágica. Estes
            pactos não são feitos levianamente, pois o preço do fracasso é a
            danação.
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Um pacto consiste de duas partes: o <strong>Sacrifício</strong>, que
            deve ser realizado antes de cada jogo, e a <strong>Bênção</strong>,
            o poder concedido pelo daemônio em troca. Se um conjurador falhar em
            fornecer o sacrifício necessário, o pacto é quebrado, e o daemônio
            está livre para reivindicar a alma do conjurador.
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
              ⚠️ O Preço do Poder
            </PowerListTitle>

            <ParchmentText>
              Quebrar um pacto tem consequências terríveis. Se um Ritualista não
              pode ou não realiza o Sacrifício necessário antes de um jogo, o
              pacto é imediatamente quebrado. O daemônio não está mais vinculado,
              e o Ritualista perde todos os benefícios da Bênção. Além disso, no
              início do próximo jogo, um Daemônio Maior do deus equivalente ao
              pacto aparece na mesa como uma criatura descontrolada, buscando
              vingança contra seu antigo servo.
            </ParchmentText>
          </Box>

          <PowerListTitle>Sacrifícios do Pacto</PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Estes são os preços exigidos pelos daemônios em troca de seu poder.
            Cada sacrifício deve ser realizado antes de cada jogo para manter o
            pacto:
          </ParchmentText>

          {pactSacrifices.map((sacrifice, index) => (
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
                  color: "#ff6b6b",
                  fontFamily: '"Cinzel", serif',
                  mb: 1,
                }}
              >
                {sacrifice.name}
              </ParchmentText>

              <ParchmentText sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                {sacrifice.description}
              </ParchmentText>
            </Box>
          ))}

          <PowerListTitle sx={{ mt: 5 }}>Bênçãos do Pacto</PowerListTitle>

          <ParchmentText sx={{ mb: 3 }}>
            Em troca de seus sacrifícios, Ritualistas ganham benefícios
            poderosos de seus patronos daemônicos. Cada bênção reflete a
            natureza do Deus do Caos que empodera o daemônio:
          </ParchmentText>

          {pactBoons.map((boon, index) => (
            <Box
              key={index}
              sx={{
                mb: 3,
                p: 2.5,
                backgroundColor: "rgba(28, 24, 18, 0.6)",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                borderRadius: "6px",
              }}
            >
              <ParchmentText
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#d4af37",
                  fontFamily: '"Cinzel", serif',
                  mb: 1,
                }}
              >
                {boon.name}
              </ParchmentText>

              <ParchmentText sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                {boon.description}
              </ParchmentText>
            </Box>
          ))}

          <Box
            sx={{
              p: 3,
              mt: 5,
              backgroundColor: "rgba(75, 0, 130, 0.1)",
              border: "2px solid rgba(75, 0, 130, 0.3)",
              borderRadius: "6px",
            }}
          >
            <PowerListTitle sx={{ mt: 0, color: "#a78bfa" }}>
              Os Quatro Poderes
            </PowerListTitle>
            <ParchmentText>
              Cada pacto está ligado a um dos Deuses do Caos:
              <br />
              <br />• <strong>Nurgle</strong> - O Deus da Praga concede
              resiliência e resistência
              <br />• <strong>Tzeentch</strong> - O Mudador de Caminhos oferece
              transformação e mutação
              <br />• <strong>Slaanesh</strong> - O Príncipe das Trevas fornece
              fortuna e excesso
              <br />• <strong>Khorne</strong> - O Deus do Sangue empodera com
              proeza marcial
              <br />• <strong>Caos Indiviso</strong> - Extraindo dos quatro, o
              mais versátil mas imprevisível
            </ParchmentText>
          </Box>
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
