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
          width: "80%",
          height: "100%",
          backgroundColor: "#1a1a1a",
          borderLeft: "1px solid #333",
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
            padding: 2,
            borderBottom: "1px solid #333",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#8fbc8f",
              fontFamily: '"Cinzel", serif',
              fontWeight: "bold",
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
            padding: 2,
            overflow: "auto",
            maxHeight: "calc(100vh - 80px)",
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

