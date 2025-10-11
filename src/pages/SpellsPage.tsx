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

export default function SpellsPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header title="Schools of Magic" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText>
            Em Wyrdgrave, as warbands desenvolveram suas próprias tradições
            mágicas únicas, combinando escolas clássicas de magia com suas
            crenças, culturas e conexões sobrenaturais. Estas escolas compostas
            representam séculos de estudo, prática e devoção, refinadas através
            de incontáveis batalhas nas ruínas amaldiçoadas.
          </ParchmentText>

          <ParchmentText>
            Cada tradição mágica reflete a essência de sua warband - desde os
            druidas anciãos que canalizam os espíritos da natureza, até os
            necromantes vampíricos que comandam os mortos, passando pelos
            sacerdotes devotos que invocam o poder de seus deuses. Estas não são
            apenas coleções de spells, mas filosofias completas sobre como a
            magia deve ser praticada e controlada.
          </ParchmentText>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box sx={{ maxWidth: "700px", width: "100%" }}>
          <PowerListTitle>Composite Magic Schools</PowerListTitle>

          <StyledNavigationButton
            onClick={() => navigate("/spells/druidcraft-lizardmen")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Druidcraft of the Lizardmen
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/spells/druidcraft-athel-loren")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Druidcraft of the Athel Loren
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/spells/magic-horned-rat")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Magic of the Horned Rat
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/spells/lore-necromancy")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Lore of Necromancy
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/spells/magic-white-tower")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Magic of the White Tower
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/spells/magic-waagh")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Magic of the Waagh!
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/spells/magic-khaine")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Magic of Khaine
          </StyledNavigationButton>

          <Box sx={{ mt: 4, mb: 2 }}>
            <PowerListTitle>Divine Magic - Prayers</PowerListTitle>
          </Box>

          <StyledNavigationButton
            onClick={() => navigate("/spells/prayers-ulric")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Prayers of Ulric
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/spells/prayers-sigmar")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Prayers of Sigmar
          </StyledNavigationButton>

          <StyledNavigationButton
            onClick={() => navigate("/spells/prayers-hashut")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Prayers of Hashut
          </StyledNavigationButton>

          <Box sx={{ mt: 4, mb: 2 }}>
            <PowerListTitle>Dark Magic - Forbidden Rituals</PowerListTitle>
          </Box>

          <StyledNavigationButton
            onClick={() => navigate("/spells/chaos-rituals")}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          >
            Chaos Rituals
          </StyledNavigationButton>

          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: "rgba(212, 175, 55, 0.05)",
              borderRadius: 2,
              border: "1px solid rgba(139, 115, 85, 0.3)",
            }}
          >
            <PowerListTitle sx={{ mt: 0 }}>
              Sobre as Escolas Compostas
            </PowerListTitle>
            <ParchmentText>
              As escolas compostas foram criadas para refletir a identidade
              única de cada warband. O Casting Number de cada spell foi ajustado
              baseado na afinidade da warband com aquele tipo de magia:
            </ParchmentText>
            <ParchmentText>
              <strong>• CN Original:</strong> Escolas alinhadas com a natureza
              da warband
              <br />
              <strong>• CN +2:</strong> Escolas compatíveis mas não primárias
              <br />
              <strong>• CN +4:</strong> Escolas neutras ou levemente opostas
              <br />
              <strong>• CN +6:</strong> Escolas fortemente opostas à filosofia
              da warband
            </ParchmentText>
          </Box>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}
