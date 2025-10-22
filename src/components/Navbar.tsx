import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logoImage from "../assets/20heim.png";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Regras", path: "/rules" },
    { label: "Bandos", path: "/warbands" },
    { label: "Magia", path: "/magic" },
    { label: "Daemônios", path: "/daemons" },
    { label: "Construções", path: "/constructs" },
    { label: "Itens", path: "/items" },
    { label: "Campanha", path: "/campaign" },
    { label: "Base", path: "/base" },
  ];

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#2a2a2a",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: "70px" }}>
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Box
            component="img"
            src={logoImage}
            alt="20heim"
            sx={{
              height: "40px",
              width: "auto",
              filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))",
              transition: "opacity 0.3s ease",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          />
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? "#d4af37" : "#e0e0e0",
                fontFamily: '"Crimson Text", serif',
                fontWeight: location.pathname === item.path ? "bold" : "normal",
                textTransform: "none",
                fontSize: "1rem",
                padding: "8px 16px",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "rgba(212, 175, 55, 0.1)",
                  color: "#d4af37",
                },
                borderBottom:
                  location.pathname === item.path
                    ? "2px solid #d4af37"
                    : "none",
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu Button - Hamburger Icon */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            onClick={() => setIsMobileMenuOpen(true)}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Menu Modal */}
      <Modal
        open={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        aria-labelledby="mobile-menu-modal"
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
              Menu
            </Typography>
            <IconButton
              onClick={handleCloseMobileMenu}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Navigation Items */}
          <List sx={{ flex: 1, padding: 0 }}>
            {navItems.map((item, index) => (
              <React.Fragment key={item.path}>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={handleCloseMobileMenu}
                    sx={{
                      color: location.pathname === item.path ? "#8fbc8f" : "white",
                      backgroundColor: location.pathname === item.path ? "rgba(143, 188, 143, 0.1)" : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(143, 188, 143, 0.1)",
                      },
                      padding: "16px 24px",
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontFamily: '"Crimson Text", serif',
                          fontWeight: location.pathname === item.path ? "bold" : "normal",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                {index < navItems.length - 1 && (
                  <Divider sx={{ backgroundColor: "#333" }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Navbar;
