import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface KeywordChipProps {
  keyword: string;
  variant?: "default" | "special" | "range" | "area" | "explosion" | "zone" | "cone" | "wall" | "pillar" | "trap";
}

const ChipContainer = styled(Box)<{ variant: string }>(({ theme, variant }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "special":
        return {
          background: `
            linear-gradient(135deg, rgba(139, 115, 85, 0.8) 0%, rgba(101, 84, 67, 0.8) 100%)
          `,
          border: "1px solid rgba(212, 175, 55, 0.4)",
          color: "#d4af37",
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        };
      case "range":
        return {
          background: `
            linear-gradient(135deg, rgba(70, 130, 180, 0.8) 0%, rgba(47, 79, 79, 0.8) 100%)
          `,
          border: "1px solid rgba(70, 130, 180, 0.5)",
          color: "#87ceeb",
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        };
      case "area":
        return {
          background: `
            linear-gradient(135deg, rgba(220, 20, 60, 0.8) 0%, rgba(139, 0, 0, 0.8) 100%)
          `,
          border: "1px solid rgba(220, 20, 60, 0.5)",
          color: "#ff6b6b",
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        };
      case "explosion":
        return {
          background: `
            linear-gradient(135deg, rgba(255, 69, 0, 0.8) 0%, rgba(178, 34, 34, 0.8) 100%)
          `,
          border: "1px solid rgba(255, 69, 0, 0.5)",
          color: "#ff8c69",
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        };
      case "zone":
        return {
          background: `
            linear-gradient(135deg, rgba(72, 61, 139, 0.8) 0%, rgba(47, 79, 79, 0.8) 100%)
          `,
          border: "1px solid rgba(72, 61, 139, 0.5)",
          color: "#9370db",
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        };
      case "cone":
        return {
          background: `
            linear-gradient(135deg, rgba(255, 140, 0, 0.8) 0%, rgba(205, 92, 92, 0.8) 100%)
          `,
          border: "1px solid rgba(255, 140, 0, 0.5)",
          color: "#ffa500",
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        };
      case "wall":
        return {
          background: `
            linear-gradient(135deg, rgba(105, 105, 105, 0.8) 0%, rgba(64, 64, 64, 0.8) 100%)
          `,
          border: "1px solid rgba(105, 105, 105, 0.5)",
          color: "#d3d3d3",
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        };
      case "pillar":
        return {
          background: `
            linear-gradient(135deg, rgba(139, 69, 19, 0.8) 0%, rgba(101, 67, 33, 0.8) 100%)
          `,
          border: "1px solid rgba(139, 69, 19, 0.5)",
          color: "#cd853f",
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        };
      case "trap":
        return {
          background: `
            linear-gradient(135deg, rgba(75, 0, 130, 0.8) 0%, rgba(25, 25, 112, 0.8) 100%)
          `,
          border: "1px solid rgba(75, 0, 130, 0.5)",
          color: "#8a2be2",
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        };
      default:
        return {
          background: `
            linear-gradient(135deg, rgba(47, 79, 79, 0.8) 0%, rgba(25, 25, 25, 0.8) 100%)
          `,
          border: "1px solid rgba(139, 115, 85, 0.3)",
          color: "#d4c4a8",
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        };
    }
  };

  const styles = getVariantStyles();

  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.25rem 0.75rem",
    borderRadius: "12px",
    fontFamily: '"Cinzel", serif',
    fontSize: "0.7rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    lineHeight: 1,
    ...styles,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.65rem",
      padding: "0.2rem 0.6rem",
    },
  };
});

function KeywordChip({ keyword, variant = "default" }: KeywordChipProps) {
  // Determinar o tipo de palavra-chave baseado no conteúdo
  const getKeywordType = (keyword: string): "default" | "special" | "range" | "area" | "explosion" | "zone" | "cone" | "wall" | "pillar" | "trap" => {
    const lowerKeyword = keyword.toLowerCase();
    
    if (lowerKeyword.includes("alcance") || lowerKeyword.includes("linha de visão") || lowerKeyword.includes("toque")) {
      return "range";
    }
    
    if (lowerKeyword.includes("explosão") || lowerKeyword.includes("explosao")) {
      return "explosion";
    }
    
    if (lowerKeyword.includes("zona")) {
      return "zone";
    }
    
    if (lowerKeyword.includes("cone")) {
      return "cone";
    }
    
    if (lowerKeyword.includes("muro")) {
      return "wall";
    }
    
    if (lowerKeyword.includes("pilar")) {
      return "pillar";
    }
    
    if (lowerKeyword.includes("armadilha")) {
      return "trap";
    }
    
    if (lowerKeyword.includes("área de efeito") || lowerKeyword.includes("area de efeito")) {
      return "area";
    }
    
    if (lowerKeyword.includes("ritual") || lowerKeyword.includes("reação") || lowerKeyword.includes("exorcismo") || lowerKeyword.includes("invocação")) {
      return "special";
    }
    
    return "default";
  };

  const chipVariant = variant === "default" ? getKeywordType(keyword) : variant;

  return (
    <ChipContainer variant={chipVariant}>
      {keyword}
    </ChipContainer>
  );
}

export default KeywordChip;
