import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CloseIcon from "@mui/icons-material/Close";

const IndexContainer = styled(Box)<{ open: boolean }>(({ open, theme }) => ({
  position: "fixed",
  right: open ? 0 : "-280px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "280px",
  maxHeight: "80vh",
  backgroundColor: "rgba(20, 18, 14, 0.95)",
  border: "2px solid rgba(139, 115, 85, 0.4)",
  borderRight: "none",
  borderRadius: "8px 0 0 8px",
  padding: "1rem",
  zIndex: 999,
  transition: "right 0.3s ease-in-out",
  overflowY: "auto",
  boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.5)",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(0, 0, 0, 0.3)",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(139, 115, 85, 0.5)",
    borderRadius: "4px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "240px",
    right: open ? 0 : "-240px",
    maxHeight: "70vh",
    padding: "0.75rem",
  },
}));

const ToggleButton = styled(IconButton)<{ open: boolean }>(
  ({ open, theme }) => ({
    position: "fixed",
    right: open ? "280px" : "0",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(20, 18, 14, 0.95)",
    color: "#d4af37",
    border: "2px solid rgba(139, 115, 85, 0.4)",
    borderRight: open ? "2px solid rgba(139, 115, 85, 0.4)" : "none",
    borderRadius: open ? "8px 0 0 8px" : "8px 0 0 8px",
    zIndex: 1000,
    padding: "12px 8px",
    transition: "right 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(28, 24, 18, 0.95)",
      borderColor: "rgba(212, 175, 55, 0.6)",
    },
    [theme.breakpoints.down("sm")]: {
      right: open ? "240px" : "0",
      padding: "10px 6px",
    },
  })
);

const IndexTitle = styled(Box)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#d4af37",
  marginBottom: "1rem",
  textAlign: "center",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    marginBottom: "0.75rem",
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: "0.9rem",
  fontWeight: 600,
  color: "#c4a870",
  marginTop: "1rem",
  marginBottom: "0.5rem",
  marginLeft: "0.5rem",
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
    marginTop: "0.75rem",
  },
}));

export interface WarbandSection {
  id: string;
  label: string;
  type?: string;
}

interface WarbandIndexProps {
  sections: WarbandSection[];
}

function WarbandIndex({ sections }: WarbandIndexProps) {
  const [open, setOpen] = useState(false);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  // Group sections by type while preserving original array order
  const groupedSectionsArray: Array<{ type: string; items: WarbandSection[] }> =
    [];
  const seenTypes = new Set<string>();

  sections.forEach((section) => {
    const type = section.type || "default";

    if (!seenTypes.has(type)) {
      seenTypes.add(type);
      groupedSectionsArray.push({
        type,
        items: sections.filter((s) => (s.type || "default") === type),
      });
    }
  });

  // Create dynamic type labels
  const getTypeLabel = (type: string): string => {
    if (type === "default") return "";
    return type.charAt(0).toUpperCase() + type.slice(1) + "s";
  };

  return (
    <>
      <ToggleButton open={open} onClick={() => setOpen(!open)} size="small">
        {open ? <CloseIcon /> : <MenuBookIcon />}
      </ToggleButton>

      <IndexContainer open={open}>
        <IndexTitle>Index</IndexTitle>
        {groupedSectionsArray.map((group, idx) => {
          const typeLabel = getTypeLabel(group.type);
          return (
            <Box key={group.type}>
              {typeLabel && <SectionHeader>{typeLabel}</SectionHeader>}
              {idx > 0 && group.type !== "default" && (
                <Divider
                  sx={{ my: 1, borderColor: "rgba(139, 115, 85, 0.2)" }}
                />
              )}
              <List>
                {group.items.map((section) => (
                  <ListItem key={section.id} disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigate(section.id)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(212, 175, 55, 0.1)",
                        },
                      }}
                    >
                      <ListItemText
                        primary={section.label}
                        sx={{
                          "& .MuiListItemText-primary": {
                            fontFamily: '"Crimson Text", serif',
                            color: "#e0e0e0",
                            fontSize: "0.95rem",
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          );
        })}
      </IndexContainer>
    </>
  );
}

export default WarbandIndex;
