import React from "react";
import { Box, Typography, Divider } from "@mui/material";

interface ActionSubsectionProps {
  title: string;
  color?: string;
  children: React.ReactNode;
  className?: string;
}

const ActionSubsection: React.FC<ActionSubsectionProps> = ({
  title,
  color = "#2c5530",
  children,
  className = "",
}) => {
  return (
    <Box className={`mb-8 ${className}`}>
      {/* Título simples com linha */}
      <Box mb={3}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Cinzel, serif",
            fontWeight: 600,
            color: color,
            fontSize: "1.5rem",
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <Divider 
          sx={{ 
            borderColor: color,
            borderWidth: 1,
            width: "60px"
          }} 
        />
      </Box>
      
      {/* Conteúdo com espaçamento simples */}
      <Box sx={{ pl: 0 }}>
        {children}
      </Box>
    </Box>
  );
};

export default ActionSubsection;