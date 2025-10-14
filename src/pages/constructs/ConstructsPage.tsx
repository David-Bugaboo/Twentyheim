import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
  QuoteBox,
  QuoteAttribution,
} from "../../components/PageComponents";

export default function ConstructsPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header title="Constructos - Guerreiros Animados de Metal e Magia" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "A arte da criação de constructos é o ápice do artifício e da
            feitiçaria combinados. Dar vida ao metal sem vida, imbuir maquinaria
            com propósito — isso é tocar a própria essência da criação. Embora
            criemos servos, não vida verdadeira... ou assim nos dizemos."
            <QuoteAttribution>
              — Mestre Engenheiro Gottri Punho-de-Martelo
            </QuoteAttribution>
          </QuoteBox>

          <ParchmentText sx={{ mb: 3 }}>
            Constructos são seres animados fabricados de metal, pedra e energia
            mágica. Diferente de mortos-vivos ou demônios, constructos não são
            criaturas corrompidas ou invocadas — eles são construídos, peça por
            peça, por artífices habilidosos e então trazidos à vida através de
            magia poderosa. Cada constructo é uma criação única, uma fusão de
            proeza de engenharia e poder arcano.
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            As duas grandes tradições de criação de constructos vêm de fontes
            vastamente diferentes: os Anões de Kharadron, que constroem maravilhas
            mecânicas precisas alimentadas por engenharia e encantamentos menores,
            e os Filhos de Hashut, cujas criações sombrias misturam latão,
            essência demoníaca e magias proibidas em armas de guerra aterrorizantes.
          </ParchmentText>

          <Box
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "rgba(139, 115, 85, 0.15)",
              border: "2px solid rgba(139, 115, 85, 0.4)",
              borderRadius: "8px",
            }}
          >
            <PowerListTitle sx={{ color: "#c4a870", mt: 0 }}>
              ⚙️ A Natureza dos Constructos
            </PowerListTitle>

            <ParchmentText>
              Todos os constructos compartilham certas características:
              <br />
              <br />• <strong>Imune a Veneno:</strong> Constructos não são
              criaturas vivas e não podem ser envenenados
              <br />• <strong>Nunca Feridos:</strong> Constructos nunca contam
              como feridos, não importa seu Vigor atual
              <br />• <strong>Podem Carregar Tesouro:</strong> Diferente de
              animais ou da maioria dos mortos-vivos, constructos podem pegar e
              carregar fichas de tesouro
              <br />• <strong>Sem Espaços de Item:</strong> Constructos não têm
              espaços de item e não podem carregar itens (embora alguns possam ter
              equipamento enxertado)
              <br />• <strong>Modificáveis:</strong> Constructos podem ser
              modificados com melhorias especiais que alteram suas capacidades
            </ParchmentText>
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "700px", width: "100%" }}>
          <PowerListTitle>Compêndio de Constructos</PowerListTitle>

          <StyledNavigationButton
            onClick={() => navigate("/constructs/statblocks")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2, py: 2.5, fontSize: "1.1rem" }}
          >
            ⚙️ Fichas de Constructos
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/constructs/modifications")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2, py: 2.5, fontSize: "1.1rem" }}
          >
            🔧 Modificações de Constructos
          </StyledNavigationButton>

          <StyledNavigationButton
            variant="contained"
            onClick={() => navigate("/")}
            fullWidth
            sx={{ mt: 3 }}
          >
            Voltar ao Início
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}
