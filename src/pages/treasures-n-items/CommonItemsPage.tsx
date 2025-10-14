import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import WarbandIndex from "../../components/WarbandIndex";
import EquipmentItemCard from "../../components/EquipmentItemCard";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  QuoteBox,
  QuoteAttribution,
} from "../../components/PageComponents";
import { commonItemsData } from "./data/commonItemsData";

function CommonItemsPage() {
  const navigate = useNavigate();

  const sections = commonItemsData.map((category) => ({
    id: category.id,
    label: category.label,
  }));

  return (
    <PageContainer>
      <WarbandIndex sections={sections} />
      <Header title="Common Items" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "A warrior is only as good as their tools. A sharp blade, a sturdy
            shield, well-fitted armor — these are the companions that won't
            abandon you when the blood starts flowing."
            <QuoteAttribution>— Gunther, Veteran Mercenary</QuoteAttribution>
          </QuoteBox>

          <ParchmentText>
            Basic equipment is the backbone of any warband in Wyrdgrave. While
            magical items and relics may be rare and powerful, it is the common
            weapons and armor that keep warriors alive day to day. This arsenal
            is available for purchase in virtually any market in the cursed
            city, and most of it is replaced or bought for free. The following items represent 
            common equipment available in Mordheim black market stalls.
          </ParchmentText>

          {/* RENDER ALL CATEGORIES */}
          {commonItemsData.map((category) => (
            <Box
              key={category.id}
              id={category.id}
              sx={{ scrollMarginTop: "100px" }}
            >
              <ParchmentText
                sx={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  mt: 5,
                  mb: 3,
                  textAlign: "center",
                  color: "#d4af37",
                  fontFamily: '"Cinzel", serif',
                }}
              >
                {category.icon} {category.label}
              </ParchmentText>

              {category.items.map((item) => (
                <EquipmentItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  properties={item.properties}
                  description={item.description}
                />
              ))}
            </Box>
          ))}
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "600px", width: "100%" }}>
          <StyledNavigationButton
            onClick={() => navigate("/treasures")}
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "rgba(20, 18, 14, 0.6)",
              "&:hover": {
                backgroundColor: "rgba(28, 24, 18, 0.8)",
              },
            }}
          >
            Back to Treasures & Items
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default CommonItemsPage;
