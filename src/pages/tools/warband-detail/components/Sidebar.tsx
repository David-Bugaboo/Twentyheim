import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="sidebar-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: { xs: "100%", sm: "90%", md: "85%", lg: "80%" },
          maxWidth: { xs: "100%", lg: "600px" },
          height: "100%",
          backgroundColor: "#1a1a1a",
          borderLeft: { xs: "none", sm: "1px solid #333" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: { xs: 1.5, sm: 2 },
            borderBottom: "1px solid #333",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#8fbc8f",
              fontFamily: '"Cinzel", serif',
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            padding: { xs: 1.5, sm: 2 },
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#2a2a2a",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#8fbc8f",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#7fb87f",
              },
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

