import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

// Hero Section Component
export const HeroSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== "backgroundImage",
})<{ backgroundImage?: string }>(({ backgroundImage, theme }) => ({
  position: "relative",
  minHeight: "45vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center 30%",
    backgroundRepeat: "no-repeat",
    filter: "blur(3px)",
    transform: "scale(1.1)",
    imageRendering: "-webkit-optimize-contrast",
    WebkitBackfaceVisibility: "hidden",
    MozBackfaceVisibility: "hidden",
    WebkitTransform: "translateZ(0) scale(1.1)",
    MozTransform: "translateZ(0) scale(1.1)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "30vh",
  },
}));

// Hero Content Component
export const HeroContent = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  textAlign: "center",
  padding: "2rem",
  [theme.breakpoints.down("sm")]: {
    padding: "1rem",
  },
}));

// Styled Title Component
export const PageTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "4rem",
  fontWeight: 700,
  color: "#d4af37",
  textShadow:
    "2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(212, 175, 55, 0.3)",
  marginBottom: "2rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

// Content Section Component
export const ContentSection = styled(Box)(({ theme }) => ({
  backgroundColor: "#0a0a0a",
  borderTop: "2px solid #2a2a2a",
  borderBottom: "2px solid #2a2a2a",
  padding: "4rem 2rem",
  display: "flex",
  justifyContent: "center",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(139, 115, 85, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(139, 115, 85, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(139, 115, 85, 0.02) 0%, transparent 40%)
    `,
    pointerEvents: "none",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "2rem 1rem",
  },
}));

// Parchment Text Component
export const ParchmentText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.25rem",
  lineHeight: 1.8,
  color: "#d4c4a8",
  textAlign: "justify",
  textIndent: "0",
  width: "100%",
  margin: "0",
  padding: "2.5rem 3rem",
  position: "relative",
  background: `
    linear-gradient(180deg, rgba(28, 24, 18, 0.95) 0%, rgba(20, 18, 14, 0.95) 100%)
  `,
  border: "1px solid rgba(139, 115, 85, 0.3)",
  borderRadius: "2px",
  boxShadow: `
    0 2px 8px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(212, 175, 55, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3)
  `,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(139, 115, 85, 0.015) 2px,
        rgba(139, 115, 85, 0.015) 4px
      )
    `,
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "10px",
    left: "10px",
    right: "10px",
    bottom: "10px",
    border: "1px solid rgba(139, 115, 85, 0.15)",
    borderRadius: "1px",
    pointerEvents: "none",
  },
  "& .first-letter": {
    fontSize: "3.5rem",
    fontWeight: 700,
    float: "left",
    lineHeight: 0.8,
    marginRight: "0.75rem",
    marginTop: "0.1rem",
    color: "#d4af37",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
    lineHeight: 1.7,
    padding: "1.5rem 1.5rem",
    "& .first-letter": {
      fontSize: "2.5rem",
    },
  },
}));

// Navigation Section Component
export const NavigationSection = styled(Box)(({ theme }) => ({
  backgroundColor: "#121212",
  padding: "6rem 2rem",
  backgroundImage: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
  display: "flex",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "3rem 1rem",
  },
}));

// Styled Button Component
export const StyledNavigationButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.1rem",
  fontWeight: 600,
  padding: "1.5rem 3rem",
  backgroundColor: "rgba(28, 24, 18, 0.8)",
  color: "#d4af37",
  border: "2px solid rgba(139, 115, 85, 0.4)",
  borderRadius: "0",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  boxShadow:
    "inset 0 1px 0 rgba(212, 175, 55, 0.1), 0 2px 4px rgba(0, 0, 0, 0.3)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent)",
    transition: "left 0.5s ease",
  },
  "&:hover": {
    backgroundColor: "rgba(38, 32, 24, 0.9)",
    borderColor: "#d4af37",
    boxShadow: `
      inset 0 1px 0 rgba(212, 175, 55, 0.2),
      0 0 20px rgba(212, 175, 55, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.4)
    `,
    "&::before": {
      left: "100%",
    },
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1rem 2rem",
    fontSize: "1rem",
  },
}));

// Quote Box Component
export const QuoteBox = styled(Box)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.1rem",
  fontStyle: "italic",
  color: "#d4af37",
  textAlign: "center",
  padding: "2rem 3rem",
  borderTop: "1px solid rgba(139, 115, 85, 0.3)",
  borderBottom: "1px solid rgba(139, 115, 85, 0.3)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: "1.5rem 1.5rem",
  },
}));

// Quote Attribution Component
export const QuoteAttribution = styled("span")(({ theme }) => ({
  display: "block",
  fontSize: "0.9rem",
  color: "#c4a870",
  marginTop: "0.5rem",
  fontStyle: "normal",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.85rem",
  },
}));

// Page Container Component
export const PageContainer = styled(Box)({
  minHeight: "100vh",
  backgroundColor: "#0a0a0a",
});

// Content Container Component (for limiting width)
export const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: "900px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    gap: "1rem",
  },
}));

// Power List Title Component
export const PowerListTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "2.2rem",
  fontWeight: 700,
  color: "#d4af37",
  marginTop: "3rem",
  marginBottom: "1.5rem",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.8rem",
    marginTop: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
    marginTop: "2rem",
    marginBottom: "1rem",
    letterSpacing: "0.05em",
  },
}));
