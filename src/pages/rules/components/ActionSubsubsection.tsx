import React from "react";
import { Box, Typography } from "@mui/material";
import MobileText from "../../../components/MobileText";

interface ActionSubsubsectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ActionSubsubsection: React.FC<ActionSubsubsectionProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <Box className={`mb-6 ${className}`}>
      {/* Título simples */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Cinzel, serif",
          fontWeight: 500,
          color: "#2c5530",
          fontSize: "1.1rem",
          mb: 2,
        }}
      >
        {title}
      </Typography>
      
      {/* Conteúdo com indentação mínima */}
      <Box sx={{ pl: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default ActionSubsubsection;