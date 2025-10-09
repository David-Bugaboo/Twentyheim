import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import WarbandIndex from "../components/WarbandIndex";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  QuoteBox,
  QuoteAttribution,
} from "../components/PageComponents";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const EquipmentCard = styled(Box)({
  marginTop: "2rem",
  padding: "2rem",
  background: `
    linear-gradient(180deg, rgba(28, 24, 18, 0.95) 0%, rgba(20, 18, 14, 0.95) 100%)
  `,
  border: "2px solid rgba(139, 115, 85, 0.4)",
  borderRadius: "4px",
  boxShadow: `
    0 4px 12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(212, 175, 55, 0.15)
  `,
});

const EquipmentTitle = styled(Typography)({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.8rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "1rem",
  textAlign: "center",
  letterSpacing: "0.08em",
});

const EquipmentDescription = styled(Typography)({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.1rem",
  lineHeight: 1.7,
  color: "#d4c4a8",
  marginBottom: "0.8rem",
  "&:last-child": {
    marginBottom: 0,
  },
});

const PropertyLabel = styled("span")({
  color: "#c4a870",
  fontWeight: 600,
});

function EquipmentPage() {
  const navigate = useNavigate();

  const sections = [
    { id: "sling", label: "Sling" },
    { id: "crossbow-pistol", label: "Crossbow Pistol" },
    { id: "holy-water-vial", label: "Holy Water Vial" },
  ];

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="New Equipment" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "A sharp blade and sturdy armor can mean the difference between
            returning home with gold or being left for the rats. Choose your gear
            wisely, for Mordheim forgives nothing."
            <QuoteAttribution>
              — Dietrich the Blacksmith, Merchant Quarter
            </QuoteAttribution>
          </QuoteBox>

          <ParchmentText>
            The ruins of Mordheim hold countless treasures and forgotten
            weapons. Warbands who brave the cursed city may discover or purchase
            specialized equipment to aid them in their deadly ventures. The
            following items represent new tools of war available to those who
            seek them.
          </ParchmentText>

          <EquipmentCard id="sling">
            <EquipmentTitle>Sling</EquipmentTitle>
            <EquipmentDescription>
              <PropertyLabel>Type:</PropertyLabel> Ranged Weapon
            </EquipmentDescription>
            <EquipmentDescription>
              <PropertyLabel>Range:</PropertyLabel> 5"
            </EquipmentDescription>
            <EquipmentDescription>
              <PropertyLabel>Damage:</PropertyLabel> -2 damage modifier
            </EquipmentDescription>
            <EquipmentDescription>
              <PropertyLabel>Special Rules:</PropertyLabel>
              <br />
              • Can be used in the offhand while still picking up treasures
              <br />
              • Cannot shoot while carrying treasure
              <br />• Does not cause the wielder to become encumbered
              <br />
              <br />
              The sling is a simple but effective weapon, allowing warriors to
              maintain offensive capability while keeping their hands free for
              looting. Its lightweight nature makes it perfect for treasure
              hunters who need to stay mobile and ready to grab wyrdstone
              shards.
            </EquipmentDescription>
          </EquipmentCard>

          <EquipmentCard id="crossbow-pistol">
            <EquipmentTitle>Crossbow Pistol</EquipmentTitle>
            <EquipmentDescription>
              <PropertyLabel>Type:</PropertyLabel> Ranged Weapon (One-handed
              Crossbow)
            </EquipmentDescription>
            <EquipmentDescription>
              <PropertyLabel>Damage:</PropertyLabel> +1 damage (instead of +2
              for regular crossbow)
            </EquipmentDescription>
            <EquipmentDescription>
              <PropertyLabel>Special Rules:</PropertyLabel>
              <br />
              • Can be used in one hand
              <br />
              • Counts as a dagger when used in the offhand
              <br />
              <br />A compact crossbow designed for close-quarters combat and
              versatility. While it sacrifices some of the punch of a full-sized
              crossbow, the Crossbow Pistol can be wielded alongside a melee
              weapon, making it ideal for warriors who need to respond quickly
              to both ranged and close combat threats.
            </EquipmentDescription>
          </EquipmentCard>

          <EquipmentCard id="holy-water-vial">
            <EquipmentTitle>Holy Water Vial</EquipmentTitle>
            <EquipmentDescription>
              <PropertyLabel>Type:</PropertyLabel> Consumable / Throwable Weapon
            </EquipmentDescription>
            <EquipmentDescription>
              <PropertyLabel>Item Slots:</PropertyLabel> 1 slot per vial
            </EquipmentDescription>
            <EquipmentDescription>
              <PropertyLabel>Uses:</PropertyLabel>
              <br />
              <strong>1. As a Healing Potion:</strong>
              <br />
              Can be consumed to heal wounds, functioning exactly like a Potion
              of Healing.
              <br />
              <br />
              <strong>2. As a Thrown Weapon:</strong>
              <br />• <PropertyLabel>Range:</PropertyLabel> 3" (Shooting Attack)
              <br />• <PropertyLabel>
                Damage vs Demons/Undead:
              </PropertyLabel>{" "}
              Magical damage, treats target's armor as 8
              <br />• <PropertyLabel>
                Damage vs Other Creatures:
              </PropertyLabel>{" "}
              No effect
              <br />
              <br />
              Blessed by the priests of Sigmar, Holy Water is a powerful weapon
              against the forces of darkness. When thrown at demons or the
              undead, it burns them with purifying holy fire. Against mortal
              foes, however, it has no effect beyond getting them slightly wet.
              Many warriors carry these vials both as emergency healing and as a
              devastating weapon against supernatural threats.
            </EquipmentDescription>
          </EquipmentCard>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
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
      </NavigationSection>
    </PageContainer>
  );
}

export default EquipmentPage;
