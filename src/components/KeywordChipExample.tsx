import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeywordChip from "./KeywordChip";
import KeywordContainer from "./KeywordContainer";

const ExampleContainer = styled(Box)(({ theme }) => ({
  padding: "2rem",
  backgroundColor: "rgba(20, 18, 14, 0.9)",
  border: "1px solid rgba(139, 115, 85, 0.3)",
  borderRadius: "8px",
  margin: "1rem 0",
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
  },
}));

const ExampleTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "1rem",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
  },
}));

const ExampleSection = styled(Box)({
  marginBottom: "1.5rem",
  "&:last-child": {
    marginBottom: 0,
  },
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "0.9rem",
  fontWeight: 600,
  color: "#d4c4a8",
  marginBottom: "0.5rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
  },
}));

function KeywordChipExample() {
  const exampleKeywords = {
    range: ["Linha de Visão", "Alcance(30)", "Toque"],
    explosion: ["Explosão (Pequena)", "Explosão (Média)", "Explosão (Grande)"],
    zone: ["Zona (Pequena)", "Zona (Média)", "Zona (Grande)"],
    cone: ["Cone (Pequeno)", "Cone (Médio)", "Cone (Grande)"],
    wall: ["Muro"],
    pillar: ["Pilar (Pequeno)", "Pilar (Médio)", "Pilar (Grande)"],
    trap: ["Armadilha (Pequena)", "Armadilha (Média)", "Armadilha (Grande)"],
    area: [
      "Área de Efeito (Zona Pequena)",
      "Área de Efeito (Zona Média)",
      "Área de Efeito (Zona Grande)",
    ],
    special: [
      "Ritual",
      "Reação",
      "Exorcismo",
      "Invocação",
      "Míssil Mágico (+5)",
    ],
    default: ["Psicológico", "Conjurador Apenas", "Furtividade"],
  };

  return (
    <ExampleContainer>
      <ExampleTitle>Exemplo de Palavras-Chave das Magias</ExampleTitle>

      <ExampleSection>
        <SectionTitle>Alcance e Visão</SectionTitle>
        <KeywordContainer keywords={exampleKeywords.range} />
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Explosões</SectionTitle>
        <KeywordContainer keywords={exampleKeywords.explosion} />
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Zonas</SectionTitle>
        <KeywordContainer keywords={exampleKeywords.zone} />
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Cones</SectionTitle>
        <KeywordContainer keywords={exampleKeywords.cone} />
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Muros</SectionTitle>
        <KeywordContainer keywords={exampleKeywords.wall} />
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Pilares</SectionTitle>
        <KeywordContainer keywords={exampleKeywords.pillar} />
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Armadilhas</SectionTitle>
        <KeywordContainer keywords={exampleKeywords.trap} />
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Áreas de Efeito</SectionTitle>
        <KeywordContainer keywords={exampleKeywords.area} />
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Tipos Especiais</SectionTitle>
        <KeywordContainer keywords={exampleKeywords.special} />
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Características Gerais</SectionTitle>
        <KeywordContainer keywords={exampleKeywords.default} />
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Exemplo de Magia Completa</SectionTitle>
        <KeywordContainer
          keywords={["Linha de Visão", "Área de Efeito (Zona Média)", "Ritual"]}
        />
      </ExampleSection>
    </ExampleContainer>
  );
}

export default KeywordChipExample;
