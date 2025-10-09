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
    { name: "Mercenaries", slug: "mercenaries" },
    { name: "Vampire Courts", slug: "vampire-courts" },
    { name: "Skaven of Clan Eshin", slug: "skaven-clan-eshin" },
    { name: "Witch Hunters", slug: "witch-hunters" },
    { name: "Cult of the Possessed", slug: "cult-possessed" },
    { name: "Sisters of Sigmar", slug: "sisters-sigmar" },
    { name: "Orc Mob", slug: "orc-mob" },
    { name: "Dwarf Treasure Hunters", slug: "dwarf-treasure-hunters" },
    { name: "Lizardmen", slug: "lizardmen" },
    { name: "Wood Elves of Athel Loren", slug: "wood-elves" },
    { name: "Sea Guard of Ulthuan", slug: "sea-guard" },
    { name: "Brides of Khaine", slug: "brides-of-khaine" },
    { name: "Sons of Hashut", slug: "sons-of-hashut" },
    { name: "Beastmen Raiders", slug: "beastmen-raiders" },
  ];

  return (
    <PageContainer>
      <Header title="Warbands of Mordheim" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "The Count of Middenland offers this much gold! The Count of
            Reikland offers that much more! The Grand Theogonist offers the
            blessing of Sigmar — though I’d sooner have his gold! Every power in
            the Empire wants wyrdstone and will do anything to get it...
            anything except come here and take it for themselves! So — drink up
            my lads for tomorrow we do their dirty work for ’em and then...
            we’ll make ’em pay!"
            <QuoteAttribution>
              — Fernando Pavaroti, Mercenary Captain
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
              Return to Main Page
            </StyledNavigationButton>
          </Box>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default WarbandsPage;
