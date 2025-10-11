import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ParchmentText,
  ContentContainer,
} from "../components/PageComponents";

export default function RelicsPage() {
  const navigate = useNavigate();

  const relicCategories = [
    {
      name: "🎲 d100 Relic Table",
      path: "/relics/table-d100",
      description:
        "Roll once, choose your fate — all 127 relics in one d100 table with dual options per result.",
      special: true,
    },
    {
      name: "Magic Rings",
      path: "/relics/rings",
      description:
        "Ancient rings of power, from simple enchantments to artifacts of terrible might.",
    },
    {
      name: "Tomes & Books",
      path: "/relics/books",
      description:
        "Ancient tomes, books of forbidden lore, and manuals of dark knowledge.",
    },
    {
      name: "Magical Accessories",
      path: "/relics/accessories",
      description:
        "Boots, gloves, amulets, talismans, gems, shields, and trinkets of arcane power.",
    },
    {
      name: "Utility Items & Oddities",
      path: "/relics/utility",
      description:
        "Horns, whistles, bags, traps, consumables, and practical magical tools.",
    },
    {
      name: "Universal Treasures",
      path: "/relics/universal",
      description:
        "The complete collection — every relic cataloged and categorized.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Relics of Mordheim" />
      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              mb: 4,
              fontSize: "1.2rem",
              fontStyle: "italic",
            }}
          >
            "Every blade pulled from the rubble carries the taint of wyrdstone.
            Every ring whispers with the voices of the dead. In Wyrdgrave, power
            is survival — and survival demands sacrifice."
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            When the comet struck Mordheim, the City of the Damned was the jewel
            of the Empire — a metropolis of merchants, nobles, and ambitious
            wizards. Their treasuries held wonders from across the Old World:
            Dwarfen runework, Elven enchantments, forbidden tomes from Araby,
            and artifacts blessed by Sigmar himself.
            <br />
            <br />
            Now those vaults lie shattered, their contents scattered throughout
            the ruins like pearls in mud. Every warband that ventures into the
            cursed city seeks these relics — for in Wyrdgrave, a warrior without
            a magic blade is merely prey, and a wizard without enchanted tools
            is soon a corpse.
            <br />
            <br />
            Choose your treasure type below to explore the cursed artifacts that
            await in the darkness...
          </ParchmentText>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
              },
              gap: 3,
              mt: 4,
            }}
          >
            {relicCategories.map((category) => (
              <Box
                key={category.path}
                onClick={() => navigate(category.path)}
                sx={{
                  p: 3,
                  background: category.special
                    ? `linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(139, 69, 19, 0.3) 100%)`
                    : `linear-gradient(135deg, rgba(28, 24, 18, 0.95) 0%, rgba(20, 18, 14, 0.95) 100%)`,
                  border: category.special
                    ? "3px solid #d4af37"
                    : "2px solid rgba(212, 175, 55, 0.3)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  gridColumn: category.special ? "1 / -1" : "auto",
                  "&:hover": {
                    borderColor: "#d4af37",
                    transform: "translateY(-4px)",
                    boxShadow: category.special
                      ? "0 12px 24px rgba(212, 175, 55, 0.4)"
                      : "0 8px 16px rgba(212, 175, 55, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "#d4af37",
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  {category.name}
                </Box>
                <ParchmentText
                  sx={{
                    fontSize: "0.95rem",
                    textAlign: "center",
                    fontStyle: "italic",
                  }}
                >
                  {category.description}
                </ParchmentText>
              </Box>
            ))}
          </Box>
        </ContentContainer>
      </ContentSection>
      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/")}
        >
          Voltar ao Início
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
