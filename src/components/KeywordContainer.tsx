import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeywordChip from "./KeywordChip";

interface KeywordContainerProps {
  keywords: string[];
}

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "0.25rem",
  [theme.breakpoints.down("sm")]: {
    gap: "0.4rem",
  },
}));

function KeywordContainer({ keywords }: KeywordContainerProps) {
  return (
    <Container>
      {keywords.map((keyword, index) => (
        <KeywordChip key={index} keyword={keyword} />
      ))}
    </Container>
  );
}

export default KeywordContainer;
