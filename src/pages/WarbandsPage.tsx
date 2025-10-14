import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  QuoteBox,
  QuoteAttribution,
} from "../components/PageComponents";

function WarbandsPage() {
  const navigate = useNavigate();

  const warbands = [
    { name: "Mercenários", slug: "mercenaries" },
    { name: "Cortes Vampíricas", slug: "vampire-courts" },
    { name: "Skaven do Clã Eshin", slug: "skaven-clan-eshin" },
    { name: "Caçadores de Bruxas", slug: "witch-hunters" },
    { name: "Culto dos Possuídos", slug: "cult-possessed" },
    { name: "Irmãs de Sigmar", slug: "sisters-sigmar" },
    { name: "Horda Orc", slug: "orc-mob" },
    { name: "Caçadores de Tesouro Anões", slug: "dwarf-treasure-hunters" },
    { name: "Homens-Lagarto", slug: "lizardmen" },
    { name: "Elfos  de Athel Loren", slug: "wood-elves" },
    { name: "Guarda Marítima de Ulthuan", slug: "sea-guard" },
    { name: "Noivas de Khaine", slug: "brides-of-khaine" },
    { name: "Filhos de Hashut", slug: "sons-of-hashut" },
    { name: "Saqueadores Beastmen", slug: "beastmen-raiders" },
  ];

  return (
    <PageContainer>
      <Header title="Bandos de Mordheim" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "O Conde de Middenland oferece tanto ouro! O Conde de Reikland
            oferece ainda mais! O Grão-Teogonista oferece a bênção de Sigmar —
            embora eu prefira seu ouro! Todo poder no Império quer Pedra-bruxa
            e fará qualquer coisa para consegui-la... qualquer coisa exceto vir
            aqui e pegá-la eles mesmos! Então — bebam rapazes, pois amanhã
            faremos o trabalho sujo deles e depois... os faremos pagar!"
            <QuoteAttribution>
              — Fernando Pavaroti, Capitão Mercenário
            </QuoteAttribution>
          </QuoteBox>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "700px", width: "100%" }}>
          {warbands.map((warband) => (
            <StyledNavigationButton
              key={warband.slug}
              onClick={() => navigate(`/warband/${warband.slug}`)}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            >
              {warband.name}
            </StyledNavigationButton>
          ))}

          <Box
            sx={{
              mt: 4,
              borderTop: "1px solid rgba(139, 115, 85, 0.3)",
              pt: 3,
            }}
          >
            <StyledNavigationButton
              onClick={() => navigate("/")}
              variant="outlined"
              fullWidth
              sx={{
                backgroundColor: "rgba(20, 18, 14, 0.6)",
                "&:hover": {
                  backgroundColor: "rgba(28, 24, 18, 0.8)",
                },
              }}
            >
              Voltar à Página Principal
            </StyledNavigationButton>
          </Box>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default WarbandsPage;
