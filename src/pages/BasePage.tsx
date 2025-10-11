import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/Header";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../components/PageComponents";

export default function BasePage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header title="Base de Operações" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            Entre as batalhas nas ruínas amaldiçoadas de Wyrdgrave, cada warband
            estabelece uma base de operações - um refúgio temporário onde
            feridos são tratados, equipamentos são reparados, e planos são
            traçados. Estas bases variam desde tavernas abandonadas até
            fortalezas em ruínas, cada uma oferecendo diferentes vantagens
            táticas.
          </ParchmentText>

          <ParchmentText>
            Com o tempo e recursos, uma warband pode melhorar sua base,
            construindo oficinas, bibliotecas arcanas, templos profanos, ou até
            mesmo estábulos para criaturas de guerra. Cada upgrade representa o
            crescimento e especialização da warband, transformando um simples
            acampamento em uma verdadeira fortaleza de poder.
          </ParchmentText>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "700px", width: "100%" }}>
          <PowerListTitle>Base & Upgrades</PowerListTitle>

          <StyledNavigationButton
            onClick={() => navigate("/base/bases")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Bases
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/base/upgrades")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Base Upgrades
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/base/stable")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            The Stable
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}
