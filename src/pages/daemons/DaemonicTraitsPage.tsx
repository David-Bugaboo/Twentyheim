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
import { daemonicAttributes } from "../spells/data/daemonic-attributes.data";

export default function DaemonicTraitsPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header title="Daemonic Traits" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 4 }}>
            Each daemon is a unique manifestation of Chaos, bearing physical and
            metaphysical traits that reflect the nature of its patron god. These
            daemonic attributes make each summoned entity unpredictable and
            dangerous. When a daemon is summoned, it may possess one or more of
            these traits, determined randomly by the Gamemaster or chosen to fit
            the narrative.
          </ParchmentText>

          <Box
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "rgba(75, 0, 130, 0.15)",
              border: "2px solid rgba(75, 0, 130, 0.4)",
              borderRadius: "8px",
            }}
          >
            <PowerListTitle sx={{ color: "#a78bfa", mt: 0 }}>
              The Mark of Chaos
            </PowerListTitle>

            <ParchmentText>
              These traits represent the blessings (or curses) of the Chaos Gods
              upon their servants. A daemon bearing multiple traits becomes
              exponentially more dangerous, combining abilities in ways that can
              devastate unprepared warbands.
            </ParchmentText>
          </Box>

          <PowerListTitle>Daemonic Attributes</PowerListTitle>

          {daemonicAttributes.map((attribute, index) => (
            <Box
              key={index}
              sx={{
                mb: 3,
                p: 2.5,
                backgroundColor: "rgba(28, 24, 18, 0.6)",
                border: "1px solid rgba(139, 115, 85, 0.4)",
                borderRadius: "6px",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(28, 24, 18, 0.8)",
                  borderColor: "rgba(212, 175, 55, 0.5)",
                },
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
                {attribute.name}
              </ParchmentText>

              <ParchmentText sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                {attribute.description}
              </ParchmentText>
            </Box>
          ))}

          <Box
            sx={{
              p: 3,
              mt: 4,
              backgroundColor: "rgba(139, 0, 0, 0.1)",
              border: "2px solid rgba(139, 0, 0, 0.3)",
              borderRadius: "6px",
            }}
          >
            <PowerListTitle sx={{ mt: 0, color: "#ff6b6b" }}>
              ⚠️ Gamemaster's Note
            </PowerListTitle>
            <ParchmentText>
              When determining a daemon's attributes, consider the narrative
              context. A daemon of Khorne might have <strong>Ravenous</strong>{" "}
              or <strong>Violence Conflagrator</strong>, while a daemon of
              Nurgle might possess <strong>Plaguebearer</strong> or{" "}
              <strong>Gifts of Nurgle</strong>. The combinations should reflect
              the daemon's patron and purpose.
            </ParchmentText>
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/daemons")}
        >
          Back to Daemons
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
