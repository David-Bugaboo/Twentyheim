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

export default function DaemonsPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header title="Daemônios da Imaterium" />

      <ContentSection>
        <ContentContainer>
          <QuoteBox>
            "Negociar com um daemônio é colocar sua alma na balança. O poder que
            eles oferecem é real, mas o preço é sempre maior do que você pensa.
            Eu vi magos se tornarem deuses... e eu os vi se tornarem cinzas."
            <QuoteAttribution>
              — Magister Aldric, antes de seu desaparecimento
            </QuoteAttribution>
          </QuoteBox>

          <ParchmentText sx={{ mb: 3 }}>
            Daemônios são entidades de Caos puro, manifestações dos Poderes da
            Ruína que habitam o Reino do Caos. Eles não são criaturas de carne e
            sangue, mas seres de energia mágica bruta que ganharam forma. Cada
            daemônio é um fragmento da consciência de seu deus patrono, servindo
            como arma e espião no reino mortal.
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            Invocar e vincular um daemônio é trilhar o caminho mais perigoso que
            um conjurador pode percorrer. No entanto, o poder que eles oferecem
            — a força para esmagar inimigos, o conhecimento das artes proibidas,
            a habilidade de remodelar a própria realidade — atrai os
            desesperados e ambiciosos como mariposas para uma chama. E como
            mariposas, muitos são consumidos.
          </ParchmentText>

          <Box
            sx={{
              p: 3,
              mb: 4,
              backgroundColor: "rgba(139, 0, 0, 0.15)",
              border: "2px solid rgba(139, 0, 0, 0.4)",
              borderRadius: "8px",
            }}
          >
            <PowerListTitle sx={{ color: "#ff6b6b", mt: 0 }}>
              A Natureza dos Daemônios
            </PowerListTitle>

            <ParchmentText>
              Todos os daemônios compartilham certas características:
              <br />
              <br />• <strong>Imune a Veneno:</strong> Daemônios não são
              criaturas vivas e não podem ser envenenados
              <br />• <strong>Ataques Mágicos:</strong> Todos os ataques
              daemônicos contam como ataques mágicos
              <br />• <strong>Sem Espaços de Itens:</strong> Daemônios não podem
              carregar itens, embora possam carregar fichas de tesouro
              <br />• <strong>Banível:</strong> Daemônios são vulneráveis a
              magias e orações que especificamente visam sua espécie
              <br />• <strong>Invocado:</strong> A maioria dos daemônios existe
              no reino mortal apenas temporariamente, vinculados pela vontade de
              seu invocador
            </ParchmentText>
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "700px", width: "100%" }}>
          <PowerListTitle>Compêndio Daemônico</PowerListTitle>

          <StyledNavigationButton
            onClick={() => navigate("/daemons/statblocks")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2, py: 2.5, fontSize: "1.1rem" }}
          >
            Fichas de Daemônios
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/daemons/traits")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2, py: 2.5, fontSize: "1.1rem" }}
          >
            Atributos Daemônicos
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/daemons/pacts")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2, py: 2.5, fontSize: "1.1rem" }}
          >
            Pactos Daemônicos
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
