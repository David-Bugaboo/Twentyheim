import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Fab,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from "@mui/icons-material/Menu";

const BackButton = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: "2rem",
  left: "2rem",
  backgroundColor: "rgba(20, 18, 14, 0.9)",
  color: "#d4af37",
  border: "1px solid rgba(139, 115, 85, 0.4)",
  zIndex: 1000,
  "&:hover": {
    backgroundColor: "rgba(28, 24, 18, 0.95)",
    borderColor: "rgba(212, 175, 55, 0.6)",
  },
  [theme.breakpoints.down("sm")]: {
    bottom: "1rem",
    left: "1rem",
    width: "48px",
    height: "48px",
    minHeight: "48px",
  },
}));

const IndexButton = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  backgroundColor: "rgba(20, 18, 14, 0.9)",
  color: "#d4af37",
  border: "1px solid rgba(139, 115, 85, 0.4)",
  zIndex: 1000,
  "&:hover": {
    backgroundColor: "rgba(28, 24, 18, 0.95)",
    borderColor: "rgba(212, 175, 55, 0.6)",
  },
  [theme.breakpoints.down("sm")]: {
    bottom: "1rem",
    right: "1rem",
    width: "48px",
    height: "48px",
    minHeight: "48px",
  },
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  width: 320,
  backgroundColor: "#0a0a0a",
  height: "100%",
  padding: "1rem",
  [theme.breakpoints.down("sm")]: {
    width: 280,
    padding: "0.75rem",
  },
}));

const DrawerTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "1rem",
  textAlign: "center",
  letterSpacing: "0.08em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1rem",
  fontWeight: 600,
  color: "#c4a870",
  marginTop: "1rem",
  marginBottom: "0.5rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));

function GlobalNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleBack = () => {
    // If on a warband page, go to warbands list
    if (location.pathname.startsWith("/warband/")) {
      navigate("/warbands");
    } else {
      // Otherwise go to home
      navigate("/");
    }
  };

  const mainPages = [
    { name: "Home", path: "/" },
    { name: "Warbands", path: "/warbands" },
    { name: "Hired Swords", path: "/hired-swords" },
    { name: "Dramatis Personae", path: "/dramatis-personae" },
    { name: "New Rules", path: "/rules" },
    { name: "New Equipment", path: "/equipment" },
    { name: "Exploring Mordheim", path: "/exploration" },
  ];

  const warbands = [
    { name: "Mercenaries", path: "/warband/mercenaries" },
    { name: "Vampire Courts", path: "/warband/vampire-courts" },
    { name: "Skaven of Clan Eshin", path: "/warband/skaven-clan-eshin" },
    { name: "Witch Hunters", path: "/warband/witch-hunters" },
    { name: "Cult of the Possessed", path: "/warband/cult-possessed" },
    { name: "Sisters of Sigmar", path: "/warband/sisters-sigmar" },
    { name: "Orc Mob", path: "/warband/orc-mob" },
    { name: "Dwarf Treasure Hunters", path: "/warband/dwarf-treasure-hunters" },
    { name: "Lizardmen", path: "/warband/lizardmen" },
  ];

  return (
    <>
      <BackButton onClick={handleBack} size="medium">
        <ArrowBackIcon />
      </BackButton>

      <IndexButton onClick={() => setDrawerOpen(true)} size="medium">
        <MenuIcon />
      </IndexButton>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#0a0a0a",
            borderLeft: "2px solid rgba(139, 115, 85, 0.4)",
          },
        }}
      >
        <DrawerContent>
          <DrawerTitle>Index</DrawerTitle>

          <SectionTitle>Main Pages</SectionTitle>
          <List>
            {mainPages.map((page) => (
              <ListItem key={page.path} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(page.path);
                    setDrawerOpen(false);
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(212, 175, 55, 0.1)",
                    },
                  }}
                >
                  <ListItemText
                    primary={page.name}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontFamily: '"Crimson Text", serif',
                        color: "#e0e0e0",
                        fontSize: "1.1rem",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2, borderColor: "rgba(139, 115, 85, 0.3)" }} />

          <SectionTitle>Warbands</SectionTitle>
          <List>
            {warbands.map((warband) => (
              <ListItem key={warband.path} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(warband.path);
                    setDrawerOpen(false);
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(212, 175, 55, 0.1)",
                    },
                  }}
                >
                  <ListItemText
                    primary={warband.name}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontFamily: '"Crimson Text", serif',
                        color: "#e0e0e0",
                        fontSize: "1rem",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default GlobalNav;
