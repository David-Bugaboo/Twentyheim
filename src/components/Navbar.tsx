import React, { useState, useEffect } from "react";
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
  Collapse,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import logoImage from "../assets/20heim.png";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(
    null
  );

  const navItems = [
    { label: "Início", path: "/" },
    {
      label: "Regras",
      path: "/rules",
      children: [
        { label: "Figuras e Atributos", path: "/rules/figures-and-attributes" },
        { label: "Testes de Atributos", path: "/rules/attribute-tests" },
        { label: "Criação de Bando", path: "/rules/warband-creation" },
        { label: "Regras de Equipamentos", path: "/rules/equipment-rules" },
        { label: "Preparação do Jogo", path: "/rules/game-setup" },
        { label: "Sistema de Combate", path: "/rules/combat-system" },
        { label: "Fim do Jogo", path: "/rules/game-end" },
        { label: "Acontecimentos", path: "/rules/happenings" },
      ],
    },
    {
      label: "Facções",
      path: "/warbands",
      children: [
        { label: "Todos as Facções", path: "/warbands" },
        { label: "Mercenários", path: "/warbands/mercenaries" },
        { label: "Irmãs de Sigmar", path: "/warbands/sisters-of-sigmar" },
        { label: "Skaven", path: "/warbands/skaven" },
        {
          label: "Saqueadores Homem-Besta",
          path: "/warbands/beastman-raiders",
        },
        {
          label: "Caçadores de Tesouro Anões",
          path: "/warbands/dwarf-treasure-hunters",
        },
        { label: "Mata-Trolls Anão", path: "/warbands/dwarf-troll-slayers" },
        {
          label: "Culto dos Possuídos",
          path: "/warbands/cult-of-the-possessed",
        },
        { label: "Cortes Vampíricas", path: "/warbands/vampire-courts" },
        { label: "Caçadores de Bruxas", path: "/warbands/witch-hunters" },
        { label: "Reptilianos", path: "/warbands/lizardmen" },
        { label: "Horda Orc", path: "/warbands/orc-mob" },
        { label: "Filhos de Hashut", path: "/warbands/sons-of-hashut" },
      ],
    },
    {
      label: "Combate",
      path: "/rules/combat-system",
      children: [
        { label: "Sistema de Combate", path: "/rules/combat-system" },
        { label: "Ações de Movimento", path: "/rules/movement-actions" },
        { label: "Ações de Combate", path: "/rules/combat-actions" },
        { label: "Ações de Ataque a Distância", path: "/rules/ranged-actions" },
        { label: "Ações de Conjuração", path: "/rules/spellcasting-actions" },
        { label: "Ações de Habilidade", path: "/rules/skill-actions" },
        { label: "Ações de Pedra-bruxa", path: "/rules/wyrdstone-actions" },
        { label: "Outras Ações", path: "/rules/other-actions" },
        { label: "Áreas de Efeito", path: "/rules/area-of-effect" },
        { label: "Dano e Condições", path: "/rules/negative-conditions" },
      ],
    },
    {
      label: "Magias",
      path: "/magic",
      children: [
        { label: "Regras de Magia", path: "/magic" },
        {
          label: "Tradições Arcanas",
          path: "/magic/arcane-lores",
        },
        {
          label: "Tradições Sombrias",
          path: "/magic/dark-lores",
        },
        {
          label: "Tradições Divinas",
          path: "/magic/prayers",
        },
        {
          label: "Tradições Orc",
          path: "/magic/greenskin-lores",
        },
        { label: "Áreas de Efeito", path: "/rules/area-of-effect" },
      ],
    },

    {
      label: "Habilidades",
      path: "/skills",
      children: [
        { label: "Habilidades", path: "/skills" },
        { label: "Combate", path: "/skills/combat" },
        { label: "Atirador", path: "/skills/ranged" },
        { label: "Acadêmica", path: "/skills/academic" },
        { label: "Força", path: "/skills/strength" },
        { label: "Agilidade", path: "/skills/agility" },
        { label: "Irmãs de Sigmar", path: "/skills/sisters-of-sigmar" },
        { label: "Skaven do Clã Enshin", path: "/skills/skaven-enshin" },
        { label: "Saqueadores Homem-Besta", path: "/skills/beastmen-raiders" },
        {
          label: "Caçadores de Tesouro Anões",
          path: "/skills/dwarf-treasure-hunters",
        },
        { label: "Mata-Trolls Anão", path: "/skills/dwarf-troll-slayers" },
        { label: "Engenharia da Montanha", path: "/skills/engineering" },
        { label: "Habilidades Von Carstein", path: "/skills/von-carstein" },
        {
          label: "Habilidades de Dragão Carmesim",
          path: "/skills/crimson-dragon",
        },
        { label: "Habilidades de Lahmia", path: "/skills/lahmia" },
        { label: "Habilidades de Strigoi", path: "/skills/strigoi" },
        { label: "Corsários Druchii", path: "/skills/dark-elf-corsairs" },
        { label: "Habilidades de Geckos", path: "/skills/skink" },
        { label: "Habilidades de Saúrios", path: "/skills/saurus" },
        { label: "Hordas Orc", path: "/skills/orc-hordes" },
        { label: "Filhos de Hashut", path: "/skills/sons-of-hashut" },
        { label: "Áreas de Efeito", path: "/rules/area-of-effect" },
      ],
    },
    {
      label: "Itens",
      path: "/equipment",
      children: [
        { label: "Regras de Equipamentos", path: "/equipment" },
        { label: "Armas Corpo a Corpo", path: "/equipment/melee-weapons" },
        { label: "Armas a Distância", path: "/equipment/ranged-weapons" },
        { label: "Armas de Fogo", path: "/equipment/firearms" },
        { label: "Armaduras e Escudos", path: "/equipment/armor-and-shields" },
        { label: "Acessórios", path: "/equipment/accessories" },
        {
          label: "Modificadores",
          path: "/equipment/modifiers",
        },
        {
          label: "Remédios e Venenos",
          path: "/equipment/remedies-and-poisons",
        },
      ],
    },
    {
      label: "Campanha",
      path: "/campaign",
      children: [
        { label: "Fase de Campanha", path: "/campaign" },
        { label: "Sobrevivência de Heróis", path: "/campaign/survival-test" },
        { label: "Experiência", path: "/campaign/experience-roll" },
        { label: "Atividades", path: "/campaign/activities" },
        {
          label: "Eventos de Exploração",
          path: "/campaign/exploration-events",
        },
        { label: "Venda de Pedra-bruxa", path: "/campaign/wyrdstone-selling" },
        { label: "Gastando Coroas", path: "/campaign/rewards" },
      ],
    },
  ];

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedCategories([]);
  };

  const handleToggleCategory = (categoryLabel: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryLabel)
        ? prev.filter((cat) => cat !== categoryLabel)
        : [...prev, categoryLabel]
    );
  };

  const isCategoryExpanded = (categoryLabel: string) => {
    return expandedCategories.includes(categoryLabel);
  };

  const handleDesktopDropdownToggle = (categoryLabel: string) => {
    setDesktopDropdownOpen((prev) =>
      prev === categoryLabel ? null : categoryLabel
    );
  };

  const handleDesktopDropdownClose = () => {
    setDesktopDropdownOpen(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-dropdown-container]")) {
        setDesktopDropdownOpen(null);
      }
    };

    if (desktopDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [desktopDropdownOpen]);

  return (
    <AppBar
      className="bg-[#121212] border-l border-green-500/40"
      position="sticky"
    >
      <Toolbar sx={{ minHeight: "70px" }}>
        {/* Logo and Navigation Container */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, flex: 1 }}>
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
          <Box
            data-dropdown-container
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              position: "relative",
            }}
          >
            {navItems.map((item) => (
              <Box key={item.path} sx={{ position: "relative" }}>
                {item.children ? (
                  // Category with dropdown
                  <>
                    <Button
                      onClick={() => handleDesktopDropdownToggle(item.label)}
                      sx={{
                        color: "white",
                        fontFamily: '"Crimson Text", serif',
                        fontWeight: "normal",
                        textTransform: "none",
                        fontSize: "1rem",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        backgroundColor:
                          desktopDropdownOpen === item.label
                            ? "rgba(16, 185, 129, 0.2)"
                            : "transparent",
                        border:
                          desktopDropdownOpen === item.label
                            ? "1px solid rgba(16, 185, 129, 0.4)"
                            : "1px solid transparent",
                        "&:hover": {
                          backgroundColor: "rgba(16, 185, 129, 0.1)",
                          border: "1px solid rgba(16, 185, 129, 0.6)",
                          color: "white",
                        },
                      }}
                    >
                      {item.label}
                      {desktopDropdownOpen === item.label ? (
                        <ExpandLessIcon sx={{ ml: 1, fontSize: "1rem" }} />
                      ) : (
                        <ExpandMoreIcon sx={{ ml: 1, fontSize: "1rem" }} />
                      )}
                    </Button>

                    {/* Dropdown Menu */}
                    {desktopDropdownOpen === item.label && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          width: "280px",
                          backgroundColor: "#121212",
                          border: "1px solid rgba(16, 185, 129, 0.4)",
                          borderRadius: "6px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                          zIndex: 1000,
                          maxHeight: "400px",
                          overflow: "auto",
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(16, 185, 129, 0.6)",
                            borderRadius: "3px",
                            "&:hover": {
                              backgroundColor: "rgba(16, 185, 129, 0.8)",
                            },
                          },
                        }}
                      >
                        {item.children.map((child) => (
                          <Button
                            key={child.path}
                            component={Link}
                            to={child.path}
                            onClick={handleDesktopDropdownClose}
                            sx={{
                              width: "100%",
                              color: "white",
                              fontFamily: '"Crimson Text", serif',
                              fontWeight: "normal",
                              textTransform: "none",
                              fontSize: "0.9rem",
                              padding: "12px 16px",
                              borderRadius: 0,
                              backgroundColor:
                                location.pathname === child.path
                                  ? "rgba(16, 185, 129, 0.2)"
                                  : "transparent",
                              border: "none",
                              justifyContent: "flex-start",
                              "&:hover": {
                                backgroundColor: "rgba(16, 185, 129, 0.1)",
                                color: "white",
                              },
                            }}
                          >
                            {child.label}
                          </Button>
                        ))}
                      </Box>
                    )}
                  </>
                ) : (
                  // Simple item without children
                  <Button
                    component={Link}
                    to={item.path}
                    sx={{
                      color: "white",
                      fontFamily: '"Crimson Text", serif',
                      fontWeight: "normal",
                      textTransform: "none",
                      fontSize: "1rem",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      backgroundColor:
                        location.pathname === item.path
                          ? "rgba(16, 185, 129, 0.2)"
                          : "transparent",
                      border:
                        location.pathname === item.path
                          ? "1px solid rgba(16, 185, 129, 0.4)"
                          : "1px solid transparent",
                      "&:hover": {
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        border: "1px solid rgba(16, 185, 129, 0.6)",
                        color: "white",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Mobile Menu Button - Hamburger Icon */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton
            onClick={() => setIsMobileMenuOpen(true)}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(16, 185, 129, 0.1)",
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
            <IconButton onClick={handleCloseMobileMenu} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Navigation Items */}
          <List
            sx={{
              flex: 1,
              padding: 0,
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
            {navItems.map((item, index) => (
              <React.Fragment key={item.path}>
                <ListItem disablePadding>
                  {item.children ? (
                    // Category with children
                    <Box sx={{ width: "100%" }}>
                      <ListItemButton
                        onClick={() => handleToggleCategory(item.label)}
                        sx={{
                          color: "white",
                          backgroundColor: "transparent",
                          border: "none",
                          borderRadius: 0,
                          margin: 0,
                          "&:hover": {
                            backgroundColor: "rgba(143, 188, 143, 0.1)",
                          },
                          padding: "12px 16px",
                        }}
                      >
                        <ListItemText
                          primary={item.label}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontFamily: '"Crimson Text", serif',
                              fontWeight: "normal",
                            },
                          }}
                        />
                        {isCategoryExpanded(item.label) ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </ListItemButton>

                      <Collapse
                        in={isCategoryExpanded(item.label)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.children.map((child) => (
                            <ListItem key={child.path} disablePadding>
                              <ListItemButton
                                component={Link}
                                to={child.path}
                                onClick={handleCloseMobileMenu}
                                sx={{
                                  color: "white",
                                  backgroundColor:
                                    location.pathname === child.path
                                      ? "rgba(143, 188, 143, 0.2)"
                                      : "transparent",
                                  border: "none",
                                  borderRadius: 0,
                                  margin: 0,
                                  paddingLeft: "32px",
                                  "&:hover": {
                                    backgroundColor: "rgba(143, 188, 143, 0.1)",
                                  },
                                  padding: "8px 16px",
                                }}
                              >
                                <ListItemText
                                  primary={child.label}
                                  sx={{
                                    "& .MuiListItemText-primary": {
                                      fontFamily: '"Crimson Text", serif',
                                      fontWeight: "normal",
                                      fontSize: "0.9rem",
                                    },
                                  }}
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </Box>
                  ) : (
                    // Simple item without children
                    <ListItemButton
                      component={Link}
                      to={item.path}
                      onClick={handleCloseMobileMenu}
                      sx={{
                        color: "white",
                        backgroundColor:
                          location.pathname === item.path
                            ? "rgba(143, 188, 143, 0.2)"
                            : "transparent",
                        border: "none",
                        borderRadius: 0,
                        margin: 0,
                        "&:hover": {
                          backgroundColor: "rgba(143, 188, 143, 0.1)",
                        },
                        padding: "12px 16px",
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontFamily: '"Crimson Text", serif',
                            fontWeight: "normal",
                          },
                        }}
                      />
                    </ListItemButton>
                  )}
                </ListItem>
                {index < navItems.length - 1 && (
                  <Divider
                    sx={{
                      backgroundColor: "#333",
                      opacity: 0.6,
                    }}
                  />
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
