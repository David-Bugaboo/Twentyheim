import React, { useState, useEffect, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
  Menu,
  MenuItem,
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
import { useAuth } from "../context/AuthContext";
import AuthModal, { type AuthMode } from "./AuthModal";
import {
  fetchFactions,
  type FactionSummary,
} from "../services/warbands.service";
import {
  fetchSpellLores,
  fetchSkillLists,
  type SpellLoreQueryResponse,
  type SkillListQueryResponse,
} from "../services/queries.service";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(
    null
  );
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const { currentUser, loading: authLoading, logout } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>("login");
  const [factions, setFactions] = useState<FactionSummary[]>([]);
  const [spellLores, setSpellLores] = useState<SpellLoreQueryResponse[]>([]);
  const [skillLists, setSkillLists] = useState<SkillListQueryResponse[]>([]);
  const [loadingNavData, setLoadingNavData] = useState(true);

  const shouldShowAdmin = currentUser?.role === "ADMIN";

  // Buscar dados dinâmicos
  useEffect(() => {
    let abort = false;
    const controller = new AbortController();

    const loadNavData = async () => {
      setLoadingNavData(true);
      try {
        const [factionsData, spellLoresData, skillListsData] =
          await Promise.all([
            fetchFactions(controller.signal),
            fetchSpellLores(controller.signal),
            fetchSkillLists(controller.signal),
          ]);
        if (!abort) {
          setFactions(factionsData);
          setSpellLores(spellLoresData);
          setSkillLists(skillListsData);
        }
      } catch (err) {
        if (!abort) {
          console.error("Erro ao carregar dados da navbar:", err);
        }
      } finally {
        if (!abort) {
          setLoadingNavData(false);
        }
      }
    };

    void loadNavData();

    return () => {
      abort = true;
      controller.abort();
    };
  }, []);

  const navItems = useMemo(
    () => [
      { label: "Início", path: "/" },
      {
        label: "Regras",
        path: "/rules",
        children: [
          {
            label: "Figuras e Atributos",
            path: "/rules/figures-and-attributes",
          },
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
        children: loadingNavData
          ? [{ label: "Carregando...", path: "/warbands" }]
          : factions.map(faction => ({
              label: faction.name,
              path: `/warbands/${faction.slug}`,
            })),
      },
      {
        label: "Combate",
        path: "/rules/combat-system",
        children: [
          { label: "Sistema de Combate", path: "/rules/combat-system" },
          { label: "Ações de Movimento", path: "/rules/movement-actions" },
          { label: "Reações", path: "/rules/reactions" },
          { label: "Ações de Combate", path: "/rules/combat-actions" },
          {
            label: "Ações de Ataque a Distância",
            path: "/rules/ranged-actions",
          },
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
        children: loadingNavData
          ? [{ label: "Carregando...", path: "/magic" }]
          : [
              { label: "Regras de Magia", path: "/magic" },
              { label: "Áreas de Efeito", path: "/rules/area-of-effect" },
              ...spellLores.map(lore => ({
                label: lore.name,
                path: `/magic/spell-lore/${lore.slug}`,
              })),
            ],
      },
      {
        label: "Habilidades",
        path: "/skills",
        children: loadingNavData
          ? [{ label: "Carregando...", path: "/skills" }]
          : [
              { label: "Habilidades", path: "/skills" },
              ...skillLists.map(list => ({
                label: list.name,
                path: `/skills?list=${list.slug}`,
              })),
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
          {
            label: "Armaduras e Escudos",
            path: "/equipment/armor-and-shields",
          },
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
          {
            label: "Venda de Pedra-bruxa",
            path: "/campaign/wyrdstone-selling",
          },
          { label: "Gastando Coroas", path: "/campaign/rewards" },
          { label: "Mercenários", path: "/campaign/mercenaries" },
          { label: "Lendas", path: "/campaign/legends" },
          
        ],
      },
      {
        label: "Cenários",
        path: "/scenarios",
        children: [
          { label: "Todos os Cenários", path: "/scenarios" },
          { label: "Defender o Tesouro", path: "/scenarios/defend-the-find" },
          { label: "Escaramuça", path: "/scenarios/skirmish" },
          { label: "Caça à Pedra-Bruxa", path: "/scenarios/wyrdstone-hunt" },
          { label: "Romper Linhas", path: "/scenarios/breakthrough" },
          { label: "Briga de Rua", path: "/scenarios/street-fight" },
          { label: "Encontro Casual", path: "/scenarios/chance-encounter" },
          { label: "Tesouro Escondido", path: "/scenarios/hidden-treasure" },
          { label: "Ocupar", path: "/scenarios/occupy" },
          { label: "Ataque Surpresa", path: "/scenarios/surprise-attack" },
          { label: "Mansão do Bruxo", path: "/scenarios/wizard-mansion" },
          { label: "Caça ao Tesouro", path: "/scenarios/treasure-hunt" },
          { label: "Briga de Rua", path: "/scenarios/street-brawl" },
          { label: "O Roubo", path: "/scenarios/heist" },
          { label: "O Lago", path: "/scenarios/the-pool" },
          { label: "O Herdeiro Perdido", path: "/scenarios/lost-prince" },
        ],
      },
      {
        label: "Ferramentas",
        path: "/tools",
        children: (() => {
          const tools = [
            { label: "Gerenciador de Bandos", path: "/tools/warband-manager" },
            { label: "Changelog", path: "/changelog" },
          ];
          // Adiciona Admin apenas para admins
          if (shouldShowAdmin) {
            tools.push({ label: "Admin", path: "/admin" });
          }
          return tools;
        })(),
      },
    ],
    [shouldShowAdmin, loadingNavData, factions, spellLores, skillLists]
  );

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setExpandedCategories([]);
  };

  const handleToggleCategory = (categoryLabel: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryLabel)
        ? prev.filter(cat => cat !== categoryLabel)
        : [...prev, categoryLabel]
    );
  };

  const isCategoryExpanded = (categoryLabel: string) => {
    return expandedCategories.includes(categoryLabel);
  };

  const handleDesktopDropdownToggle = (categoryLabel: string) => {
    setDesktopDropdownOpen(prev =>
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

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };
  const handleCloseUserMenu = () => setUserMenuAnchor(null);

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
  };

  const handleOpenAuthModal = (mode: AuthMode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setAuthModalOpen(false);
  };

  const getInitials = (displayName?: string | null, email?: string | null) => {
    const source =
      (displayName && displayName.trim()) || (email || "").split("@")[0];
    if (!source) return "?";
    const parts = source.split(/\s|\.|_/).filter(Boolean);
    const first = parts[0]?.[0]?.toUpperCase() || "";
    const last =
      parts.length > 1 ? parts[parts.length - 1][0]?.toUpperCase() : "";
    return first + last || first || "?";
  };

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
            {navItems.map(item => (
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
                        {item.children.map(child => (
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
                                location.pathname === child.path.split("?")[0]
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

        {/* Auth controls (desktop and mobile) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {currentUser ? (
            <>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  border: "1px solid rgba(16, 185, 129, 0.5)",
                  borderRadius: "50%",
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    color: "#a7f3d0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: '"Cinzel", serif',
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                  aria-label="perfil"
                >
                  {getInitials(currentUser.name, currentUser.email)}
                </Box>
              </IconButton>
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem disabled>
                  {currentUser.email || currentUser.name}
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/tools/warband-manager"
                  onClick={handleCloseUserMenu}
                >
                  Meus Bandos
                </MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              onClick={() => handleOpenAuthModal("login")}
              disabled={authLoading}
              sx={{
                color: "white",
                textTransform: "none",
                border: "1px solid rgba(16, 185, 129, 0.5)",
                borderRadius: "20px",
                padding: "6px 12px",
                "&:hover": { backgroundColor: "rgba(16, 185, 129, 0.1)" },
              }}
            >
              Entrar
            </Button>
          )}
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
          <Box
            sx={{
              padding: 2,
              borderBottom: "1px solid #333",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {currentUser ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ color: "#8fbc8f", fontFamily: '"Crimson Text", serif' }}
                >
                  Olá, {currentUser.name}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleCloseMobileMenu();
                    logout();
                  }}
                  sx={{
                    borderColor: "rgba(16, 185, 129, 0.5)",
                    color: "white",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "rgba(16, 185, 129, 0.1)" },
                  }}
                >
                  Sair
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  handleCloseMobileMenu();
                  handleOpenAuthModal("login");
                }}
                disabled={authLoading}
                sx={{
                  border: "1px solid rgba(16, 185, 129, 0.5)",
                  color: "white",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "rgba(16, 185, 129, 0.1)" },
                }}
              >
                Entrar
              </Button>
            )}
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
                          {item.children.map(child => (
                            <ListItem key={child.path} disablePadding>
                              <ListItemButton
                                component={Link}
                                to={child.path}
                                onClick={handleCloseMobileMenu}
                                sx={{
                                  color: "white",
                                  backgroundColor:
                                    location.pathname ===
                                    child.path.split("?")[0]
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
      <AuthModal
        open={authModalOpen}
        mode={authModalMode}
        onClose={handleCloseAuthModal}
        onSwitchMode={mode => setAuthModalMode(mode)}
      />
    </AppBar>
  );
};

export default Navbar;
