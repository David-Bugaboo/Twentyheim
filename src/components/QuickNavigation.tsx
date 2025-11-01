import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface QuickNavigationProps {
  sections: Array<{
    id: string;
    title: string;
    level: number;
    children?: Array<{
      id: string;
      title: string;
      level: number;
    }>;
  }>;
}

const QuickNavigation: React.FC<QuickNavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  // Process sections: use existing children if defined, otherwise auto-group
  const groupedSections = React.useMemo(() => {
    // Early return if no sections
    if (!sections || sections.length === 0) {
      return [];
    }

    // Check if any section already has children defined
    const hasPredefinedChildren = sections.some(
      (section) => section.children && section.children.length > 0
    );

    if (hasPredefinedChildren) {
      // Use existing structure with children
      return sections.map((section) => ({
        id: section.id,
        title: section.title,
        level: section.level,
        children: section.children || undefined,
      }));
    }

    // Auto-group sections: group level 1 items under the previous level 0 item
    const result: Array<{
      id: string;
      title: string;
      level: number;
      children?: Array<{
        id: string;
        title: string;
        level: number;
      }>;
    }> = [];

    let currentParent: (typeof result)[0] | null = null;

    for (const section of sections) {
      if (section.level === 0) {
        // Level 0 items become parent items
        const newParent = {
          id: section.id,
          title: section.title,
          level: section.level,
          children: [] as Array<{ id: string; title: string; level: number }>,
        };
        result.push(newParent);
        currentParent = newParent;
      } else if (section.level === 1 && currentParent) {
        // Level 1 items become children of the current parent
        currentParent.children!.push({
          id: section.id,
          title: section.title,
          level: section.level,
        });
      } else {
        // Other levels or no parent - add as regular item
        result.push({
          id: section.id,
          title: section.title,
          level: section.level,
        });
      }
    }

    // Clean up empty children arrays
    result.forEach((section) => {
      if (section.children && section.children.length === 0) {
        delete section.children;
      }
    });

    return result;
  }, [sections]);

  useEffect(() => {
    if (!sections || sections.length === 0) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowBackToTop(scrollTop > 300);

      // Find active section based on scroll position
      const sectionElements = sections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean);

      let current = "";
      for (const element of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = element.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementTop = element.offsetTop;
      const headerHeight = 100; // Altura aproximada do header
      const offset = elementTop - headerHeight;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
    setIsIndexOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Floating Book Button */}
      <button
        onClick={() => setIsIndexOpen(!isIndexOpen)}
        className="fixed bottom-6 right-6 z-40 bg-green-800 text-white p-4 md:p-8 rounded-full shadow-lg hover:bg-green-700 transition-colors"
      >
        <svg
          className="w-6 h-6 md:w-12 md:h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </button>

      {/* Floating Index Window */}
      <Modal
        open={isIndexOpen}
        onClose={() => setIsIndexOpen(false)}
        aria-labelledby="index-modal"
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
              Índice
            </Typography>
            <IconButton
              onClick={() => setIsIndexOpen(false)}
              sx={{ color: "white" }}
            >
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
            {groupedSections.map((section, index) => {
              const hasChildren =
                section.children && section.children.length > 0;
              const isExpanded = expandedSections.has(section.id);

              return (
                <React.Fragment key={section.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if (hasChildren) {
                          toggleSection(section.id);
                        } else {
                          scrollToSection(section.id);
                        }
                      }}
                      sx={{
                        color:
                          activeSection === section.id ? "#8fbc8f" : "white",
                        backgroundColor:
                          activeSection === section.id
                            ? "rgba(143, 188, 143, 0.1)"
                            : "transparent",
                        "&:hover": {
                          backgroundColor: "rgba(143, 188, 143, 0.1)",
                        },
                        padding: "12px 24px",
                        paddingLeft: `${24 + section.level * 16}px`,
                      }}
                    >
                      <ListItemText
                        primary={section.title}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontFamily: '"Crimson Text", serif',
                            fontWeight:
                              activeSection === section.id ? "bold" : "normal",
                            fontSize: section.level === 0 ? "16px" : "14px",
                          },
                        }}
                      />
                      {hasChildren && (
                        <IconButton size="small" sx={{ color: "white", ml: 1 }}>
                          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      )}
                    </ListItemButton>
                  </ListItem>

                  {hasChildren && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {section.children!.map((child) => (
                          <ListItem key={child.id} disablePadding>
                            <ListItemButton
                              onClick={() => scrollToSection(child.id)}
                              sx={{
                                color:
                                  activeSection === child.id
                                    ? "#8fbc8f"
                                    : "white",
                                backgroundColor:
                                  activeSection === child.id
                                    ? "rgba(143, 188, 143, 0.1)"
                                    : "transparent",
                                "&:hover": {
                                  backgroundColor: "rgba(143, 188, 143, 0.1)",
                                },
                                padding: "8px 24px",
                                paddingLeft: `${40 + child.level * 16}px`,
                              }}
                            >
                              <ListItemText
                                primary={child.title}
                                sx={{
                                  "& .MuiListItemText-primary": {
                                    fontFamily: '"Crimson Text", serif',
                                    fontWeight:
                                      activeSection === child.id
                                        ? "bold"
                                        : "normal",
                                    fontSize: "14px",
                                  },
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}

                  {index < sections.length - 1 && (
                    <Divider sx={{ backgroundColor: "#333" }} />
                  )}
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </Modal>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 bg-green-800 text-white p-3 md:p-8 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <svg
            className="w-6 h-6 md:w-12 md:h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default QuickNavigation;
