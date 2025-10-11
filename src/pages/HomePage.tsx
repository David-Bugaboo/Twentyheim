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
    { label: "Warbands", path: "/warbands" },
    { label: "Hired Swords", path: "/hired-swords" },
    { label: "Dramatis Personae", path: "/dramatis-personae" },
    { label: "Treasures & Items", path: "/treasures" },
    { label: "Spells", path: "/spells" },
    { label: "Base & Upgrades", path: "/base" },
    { label: "New Rules", path: "/rules" },
    { label: "New Equipment", path: "/equipment" },
    { label: "Exploring Mordheim", path: "/exploration" },
  ];

  return (
    <PageContainer>
      <Header title="The City of the Damned" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "To enter the gargoyle-guarded gates of that place is to pass
            through the very gates of death!"
            <QuoteAttribution>
              — Last Words of an Unknown Adventurer
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
            Coming Soon
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
            Warband Manager
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default HomePage;
