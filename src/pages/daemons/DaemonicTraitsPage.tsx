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
      <Header title="Atributos Daemônicos" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 4 }}>
            Cada daemônio é uma manifestação única do Caos, portando traços
            físicos e metafísicos que refletem a natureza de seu deus patrono.
            Esses atributos daemônicos tornam cada entidade invocada
            imprevisível e perigosa. Quando um daemônio é invocado, ele pode
            possuir um ou mais desses traços, determinados aleatoriamente pelo
            Mestre do Jogo ou escolhidos para se adequar à narrativa.
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
              A Marca do Caos
            </PowerListTitle>

            <ParchmentText>
              Esses traços representam as bênçãos (ou maldições) dos Deuses do
              Caos sobre seus servos. Um daemônio portando múltiplos traços se
              torna exponencialmente mais perigoso, combinando habilidades de
              formas que podem devastar bandos despreparados.
            </ParchmentText>
          </Box>

          <PowerListTitle>Atributos Daemônicos</PowerListTitle>

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
