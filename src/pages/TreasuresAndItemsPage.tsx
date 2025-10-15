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

export default function TreasuresAndItemsPage() {
  const navigate = useNavigate();

  const itemCategories = [
    {
      name: "Itens Comuns",
      path: "/common-items",
      description:
        "Lâminas manchadas de sangue, escudos amassados, armaduras que salvaram vidas. O equipamento básico que mantém guerreiros vivos - ou os enterra quando falha.",
    },
    {
      name: "Arsenal Mágico",
      path: "/magic-arsenal",
      description:
        "Armas que cortam fantasmas, armaduras que deflectem balas. Equipamento encantado forjado antes da queda - ou corrompido depois dela.",
    },
    {
      name: "Poções e Elixires",
      path: "/potions",
      description:
        "Líquidos que curam feridas mortais. Venenos que matam sem som. Elixires que transformam covardes em heróis por minutos preciosos.",
    },
    {
      name: "Relíquias",
      path: "/magic-items",
      description:
        "Anéis que dobram o destino. Amuletos que repelem maldições. Fragmentos de eras passadas cujo verdadeiro custo só é descoberto tarde demais.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Tesouros e Itens de Mordheim" />
      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              mb: 4,
              fontSize: "1.3rem",
              fontStyle: "italic",
              color: "#d4af37",
            }}
          >
            O Arsenal Completo da Cidade Amaldiçoada
          </ParchmentText>

          <ParchmentText sx={{ mb: 4, fontSize: "1.1rem", lineHeight: 1.8 }}>
            Quando o cometa de cauda dupla rasgou o céu e esmagou Mordheim em 1999 IC, não destruiu apenas prédios - destruiu vidas, esperanças, e a própria ordem das coisas. Cofres de nobres explodiram em chuva de ouro. Arsenais militares viraram crateras fumegantes. Torres de magos colapsaram como castelos de cartas, espalhando séculos de conhecimento arcano pelas ruas ensanguentadas.
            <br />
            <br />
            O que sobrou? Tudo e nada. Cada rua esconde fortuna suficiente para comprar um ducado - ou morte horrível nas mãos de mortos-vivos, mutantes, ou pior. Nas ruínas, espadas mágicas jazem ao lado de cadáveres apodrecidos. Poções milagrosas pingam de prateleiras rachadas. Armaduras encantadas protegem esqueletos que nunca saberão que vestem tesouros.
            <br />
            <br />
            Este é o catálogo do que resta. Armas que mataram reis. Armaduras que sobreviveram guerras. Poções que curam ou matam com igual eficiência. Tudo está aqui, esperando nas sombras. Basta ter coragem - ou desespero - suficiente para procurar.
          </ParchmentText>

          {/* ITEM CATEGORIES */}
          <ParchmentText
            sx={{
              fontSize: "2rem",
              fontWeight: 700,
              mb: 1,
              textAlign: "center",
              color: "#d4af37",
              fontFamily: '"Cinzel", serif',
            }}
          >
            Categorias de Itens
          </ParchmentText>

          <ParchmentText
            sx={{
              textAlign: "center",
              fontSize: "1rem",
              mb: 4,
              fontStyle: "italic",
              color: "#c4a870",
            }}
          >
            Escolha uma categoria para explorar
          </ParchmentText>

          <Box sx={{ maxWidth: "700px", margin: "0 auto", mb: 5 }}>
            {itemCategories.map((category, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <StyledNavigationButton
                  onClick={() => navigate(category.path)}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 1.5 }}
                >
                  {category.name}
                </StyledNavigationButton>
                <ParchmentText 
                  sx={{ 
                    fontSize: "0.95rem", 
                    lineHeight: 1.6, 
                    color: "#c4a870",
                    textAlign: "center",
                    fontStyle: "italic",
                    px: 2,
                  }}
                >
                  {category.description}
                </ParchmentText>
              </Box>
            ))}
          </Box>

          {/* FLAVOR QUOTE */}
          <ParchmentText
            sx={{
              mt: 4,
              p: 3,
              border: "2px solid rgba(139, 115, 85, 0.4)",
              borderRadius: "4px",
              backgroundColor: "rgba(28, 24, 18, 0.4)",
              fontStyle: "italic",
              textAlign: "center",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "#c4a870",
            }}
          >
            "Vi um homem encontrar espada que brilhava com luz própria. Matou cinco mutantes com ela antes que a lâmina bebesse seu sangue também. Vi mulher beber poção que prometia força - seus músculos incharam até os ossos quebrarem. Vi criança achar anel de ouro puro, vendê-lo por fortuna, e ser assassinada na mesma noite.
            <br />
            <br />
            Nas ruínas, cada tesouro tem dentes. Mas os desesperados não têm escolha senão enfiar a mão na boca da fera."
            <br />
            <br />
            — Erasmus, o Colecionador, sobrevivente de dezessete expedições
          </ParchmentText>
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
