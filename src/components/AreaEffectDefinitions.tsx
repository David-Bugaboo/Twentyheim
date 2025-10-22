import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeywordChip from "./KeywordChip";
import KeywordContainer from "./KeywordContainer";

const DefinitionsContainer = styled(Box)(({ theme }) => ({
  padding: "2rem",
  backgroundColor: "rgba(20, 18, 14, 0.9)",
  border: "1px solid rgba(139, 115, 85, 0.3)",
  borderRadius: "8px",
  margin: "1rem 0",
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
  },
}));

const DefinitionsTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "1.5rem",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

const DefinitionSection = styled(Box)({
  marginBottom: "1.5rem",
  "&:last-child": {
    marginBottom: 0,
  },
});

const SectionHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "0.75rem",
  flexWrap: "wrap",
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1rem",
  fontWeight: 600,
  color: "#d4af37",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const DefinitionText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1rem",
  lineHeight: 1.6,
  color: "#d4c4a8",
  marginLeft: "0.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.95rem",
    lineHeight: 1.5,
  },
}));

const SizeList = styled(Box)({
  marginTop: "0.5rem",
  marginLeft: "1rem",
});

const SizeItem = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "0.95rem",
  lineHeight: 1.5,
  color: "#d4c4a8",
  marginBottom: "0.25rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

const StrongText = styled("strong")({
  color: "#d4af37",
  fontWeight: 600,
});

function AreaEffectDefinitions() {
  const definitions = [
    {
      keywords: ["Explosão (Pequena)", "Explosão (Média)", "Explosão (Grande)"],
      title: "Explosão",
      description: "Explosões são efeitos instantâneos: A área de efeito é posicionada, as figuras afetadas e então a área de efeito desaparece. Elas são Áreas de Efeito circulares com os seguintes diâmetros:",
      sizes: [
        "Pequena: 6cm de Diâmetro",
        "Média: 12cm de Diâmetro", 
        "Grande: 18cm de Diâmetro"
      ]
    },
    {
      keywords: ["Zona (Pequena)", "Zona (Média)", "Zona (Grande)"],
      title: "Zona",
      description: "Zonas são Áreas de Efeito permanentes, que ficam no tabuleiro até a magia ser cancelada. A Área de Efeito é um quadrado com os lados dos seguintes tamanhos:",
      sizes: [
        "Pequena: 6cm de lado",
        "Média: 12cm de lado",
        "Grande: 18cm de lado"
      ]
    },
    {
      keywords: ["Cone (Pequeno)", "Cone (Médio)", "Cone (Grande)"],
      title: "Cone",
      description: "Cones são efeitos instantâneos: A área de efeito é posicionada, as figuras afetadas e então a área de efeito desaparece. Áreas de efeito de cone não tem alcance e devem sempre ser posicionadas com a ponta menor do cone adjacente a qualquer ponto da base de uma criatura.",
      sizes: []
    },
    {
      keywords: ["Muro"],
      title: "Muro",
      description: "Muros são Áreas de Efeito permanentes, permanecendo no tabuleiro até a magia ser cancelada. A área de efeito tem 14cm de comprimento, 8cm de altura e 2.5cm de largura, e é tratada como uma peça de terreno para todos os efeitos.",
      sizes: []
    },
    {
      keywords: ["Pilar (Pequeno)", "Pilar (Médio)", "Pilar (Grande)"],
      title: "Pilar",
      description: "Pilares são efeitos permanentes, permanecendo do campo de batalha até a magia ser cancelada. Pilares são cilindros com 8cm de altura em todas as variações, mas os seguintes diâmetros:",
      sizes: [
        "Pequena: 6cm de Diâmetro",
        "Média: 12cm de Diâmetro",
        "Grande: 18cm de Diâmetro"
      ]
    },
    {
      keywords: ["Armadilha (Pequena)", "Armadilha (Média)", "Armadilha (Grande)"],
      title: "Armadilhas",
      description: "Armadilhas são efeitos permanentes, permanecendo do campo de batalha até a magia ser cancelada. Armadilhas são círculos com os seguintes diâmetros:",
      sizes: [
        "Pequena: 3cm de Diâmetro",
        "Média: 6cm de Diâmetro",
        "Grande: 9cm de Diâmetro"
      ]
    }
  ];

  return (
    <DefinitionsContainer>
      <DefinitionsTitle>Definições de Áreas de Efeito</DefinitionsTitle>
      
      {definitions.map((definition, index) => (
        <DefinitionSection key={index}>
          <SectionHeader>
            <KeywordContainer keywords={definition.keywords} />
            <SectionTitle>{definition.title}</SectionTitle>
          </SectionHeader>
          
          <DefinitionText>
            {definition.description}
          </DefinitionText>
          
          {definition.sizes.length > 0 && (
            <SizeList>
              {definition.sizes.map((size, sizeIndex) => (
                <SizeItem key={sizeIndex}>
                  <StrongText>{size.split(':')[0]}:</StrongText> {size.split(':')[1]}
                </SizeItem>
              ))}
            </SizeList>
          )}
        </DefinitionSection>
      ))}
    </DefinitionsContainer>
  );
}

export default AreaEffectDefinitions;
