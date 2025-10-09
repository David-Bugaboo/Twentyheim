import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(Box)(({ theme }) => ({
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
  [theme.breakpoints.down("sm")]: {
    marginTop: "1.5rem",
    padding: "1.5rem 1rem",
  },
}));

const EquipmentName = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.8rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "1rem",
  textAlign: "center",
  letterSpacing: "0.08em",
  textShadow: "1px 1px 4px rgba(0, 0, 0, 0.8)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.4rem",
    marginBottom: "0.75rem",
  },
}));

const EquipmentDescription = styled(Typography)(({ theme }) => ({
  fontFamily: '"Crimson Text", serif',
  fontSize: "1.1rem",
  lineHeight: 1.7,
  color: "#d4c4a8",
  marginBottom: "0.8rem",
  "&:last-child": {
    marginBottom: 0,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    lineHeight: 1.6,
  },
}));

interface Property {
  label: string;
  value: string;
}

interface EquipmentCardProps {
  name: string;
  properties?: Property[];
  description: string;
  notes?: string;
}

function EquipmentCard({ name, properties, description, notes }: EquipmentCardProps) {
  return (
    <Card>
      <EquipmentName>{name}</EquipmentName>
      
      {properties && properties.map((prop, index) => (
        <EquipmentDescription key={index}>
          <span style={{ color: "#c4a870", fontWeight: 600 }}>{prop.label}:</span> {prop.value}
        </EquipmentDescription>
      ))}
      
      <EquipmentDescription sx={{ marginTop: properties ? "1rem" : 0 }}>
        {description}
      </EquipmentDescription>

      {notes && (
        <EquipmentDescription sx={{ marginTop: "1rem", fontStyle: "italic", color: "#b8a890" }}>
          {notes}
        </EquipmentDescription>
      )}
    </Card>
  );
}

export default EquipmentCard;

