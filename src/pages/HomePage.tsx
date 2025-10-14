import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  QuoteBox,
  QuoteAttribution,
  PageContainer,
  ContentContainer,
} from "../components/PageComponents";

function HomePage() {
  const navigate = useNavigate();

  const navigationButtons = [
    { label: "Bandos", path: "/warbands" },
    { label: "Guerreiros Profissionais", path: "/hired-swords" },
    { label: "Dramatis Personae", path: "/dramatis-personae" },
    { label: "Tesouros e Itens", path: "/treasures" },
    { label: "Magia", path: "/magic" },
    { label: "Demônios", path: "/daemons" },
    { label: "Construtos", path: "/constructs" },
    { label: "Base e Melhorias", path: "/base" },
    { label: "Explorando Mordheim", path: "/exploration" },
  ];

  return (
    <PageContainer>
      <Header title="A Cidade dos Condenados" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "Entrar nos portões vigiados por gárgulas daquele lugar é atravessar
            os próprios portões da morte!"
            <QuoteAttribution>
              — Últimas Palavras de um Aventureiro Desconhecido
            </QuoteAttribution>
          </QuoteBox>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          {navigationButtons.map((button) => (
            <StyledNavigationButton
              key={button.path}
              onClick={() => navigate(button.path)}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            >
              {button.label}
            </StyledNavigationButton>
          ))}

          <Typography
            sx={{
              fontFamily: '"Cinzel", serif',
              fontSize: "0.9rem",
              color: "#8b7355",
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "0.5rem",
              letterSpacing: "0.08em",
              fontStyle: "italic",
            }}
          >
            Em Breve
          </Typography>

          <StyledNavigationButton
            variant="outlined"
            fullWidth
            disabled
            sx={{
              mb: 2,
              opacity: 0.5,
              cursor: "not-allowed",
              "&.Mui-disabled": {
                borderColor: "rgba(139, 115, 85, 0.3)",
                color: "rgba(212, 175, 55, 0.5)",
              },
            }}
          >
            Gerenciador de Bandos
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default HomePage;
