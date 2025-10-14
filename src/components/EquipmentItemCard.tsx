import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Property {
  label: string;
  value: string;
}

interface EquipmentItemCardProps {
  id?: string;
  name: string;
  properties: Property[];
  description: string;
}

const Card = styled(Box)({
  marginTop: "2rem",
  padding: "2rem",
  background: `
    linear-gradient(180deg, rgba(28, 24, 18, 0.95) 0%, rgba(20, 18, 14, 0.95) 100%)
  `,
  border: "2px solid rgba(139, 115, 85, 0.4)",
  borderRadius: "4px",
  boxShadow: `
    0 4px 12px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(212, 175, 55, 0.15)
  `,
});

const Title = styled(Typography)({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.8rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "1rem",
  textAlign: "center",
  letterSpacing: "0.08em",
});

const Description = styled(Typography)({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.1rem",
  lineHeight: 1.7,
  color: "#d4c4a8",
  marginBottom: "0.8rem",
  "&:last-child": {
    marginBottom: 0,
  },
});

const PropertyLabel = styled("span")({
  color: "#c4a870",
  fontWeight: 600,
});

function EquipmentItemCard({
  id,
  name,
  properties,
  description,
}: EquipmentItemCardProps) {
  return (
    <Card id={id}>
      <Title>{name}</Title>
      {properties.map((prop, index) => (
        <Description key={index}>
          <PropertyLabel>{prop.label}:</PropertyLabel> {prop.value}
        </Description>
      ))}
      <Description>
        <PropertyLabel>Description:</PropertyLabel>
        <br />
        <Box
          component="span"
          dangerouslySetInnerHTML={{
            __html: description
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n\n/g, "<br /><br />"),
          }}
        />
      </Description>
    </Card>
  );
}

export default EquipmentItemCard;

