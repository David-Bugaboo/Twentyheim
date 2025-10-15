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
      <Header title="Itens Comuns" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "Um guerreiro é tão bom quanto suas ferramentas. Uma lâmina afiada, um escudo resistente, armadura bem ajustada — estes são os companheiros que não vão te abandonar quando o sangue começar a fluir."
            <QuoteAttribution>— Gunther, Mercenário Veterano</QuoteAttribution>
          </QuoteBox>

          <ParchmentText>
            Equipamento básico é a espinha dorsal de qualquer warband em Mordheim. Enquanto itens mágicos e relíquias podem ser raros e poderosos, são as armas e armaduras comuns que mantêm guerreiros vivos dia após dia. Este arsenal está disponível para compra em praticamente qualquer mercado na cidade amaldiçoada, e a maior parte é substituída ou comprada gratuitamente. Os seguintes itens representam equipamento comum disponível nas barracas do mercado negro de Mordheim.
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
            Voltar para Tesouros e Itens
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}

export default CommonItemsPage;
