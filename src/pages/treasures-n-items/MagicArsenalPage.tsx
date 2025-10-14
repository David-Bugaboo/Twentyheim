import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Header from "../../components/Header";
import MagicItemCard from "../../components/MagicItemCard";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ParchmentText,
  ContentContainer,
} from "../../components/PageComponents";

import { generateArsenalTable } from "../../data/generateArsenalData";
import slugify from "slugify";
import { useScrollToHash } from "../../hooks/useScrollToHash";
import { arsenalData } from "./data/arsenalData";

export default function MagicArsenalPage() {
  useScrollToHash(); // Fix scroll to anchor
  const navigate = useNavigate();

  // Refs para os items
  const itemRefs = arsenalData.map((item) => {
    return {
      id: slugify(item.name, { lower: true, strict: true }),
      ref: useRef<HTMLDivElement>(null),
    };
  });

  const weaponCategories = [
    "Swords & Blades",
    "Daggers",
    "Hammers & Maces",
    "Staffs",
    "Bows & Crossbows",
    "Special Weapons",
  ];

  const armorCategories = [
    "Shields",
    "Helmets",
    "Cloaks & Capes",
    "Belts & Bracelets",
    "Armour & Robes",
  ];

  return (
    <PageContainer>
      <Header title="Magic Arsenal — Weapons & Armor" />
      <ContentSection>
        <ContentContainer>
          <ParchmentText
            sx={{
              textAlign: "center",
              mb: 4,
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "#d4af37",
            }}
          >
            Steel and Plate Touched by Magic — The Complete Arsenal
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            In the arsenals and armories of Old Mordheim, master smiths and
            battlemages worked together to create the finest implements of war
            the Empire had ever seen. Swords that could cleave through stone.
            Armor that turned aside arrows like rain. Boots that let warriors
            run up walls. Helms that granted vision beyond sight.
            <br />
            <br />
            When the comet fell on 1999 IC, these treasures were scattered,
            corrupted, and enhanced by wyrdstone's touch. Now they lie in the
            ruins — some still gleaming with their original glory, others
            twisted into something darker. Every blade demands blood. Every
            piece of armor carries a curse. But in Wyrdgrave, the desperate
            cannot afford to be choosy.
            <br />
            <br />
            <strong>Total Arsenal:</strong> 61 pieces of enchanted equipment (40
            weapons + 21 armor/wearables)
            <br />
            <strong>Price Format:</strong> Purchase Price / Sale Price
          </ParchmentText>

          {/* ARSENAL d100 TABLE */}
          <Box sx={{ mb: 6 }}>
            <ParchmentText
              sx={{
                fontSize: "1.6rem",
                fontWeight: 700,
                textAlign: "center",
                color: "#d4af37",
                mb: 3,
                fontFamily: '"Cinzel", serif',
              }}
            >
              ⚔️🛡️ d100 Random Magic Arsenal Table
            </ParchmentText>

            <TableContainer
              component={Paper}
              sx={{
                backgroundColor: "rgba(28, 24, 18, 0.9)",
                border: "3px solid #8B4513",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
                mb: 3,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "rgba(212, 175, 55, 0.2)",
                      borderBottom: "2px solid #d4af37",
                    }}
                  >
                    <TableCell
                      align="center"
                      sx={{
                        color: "#d4af37",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        fontFamily: '"Cinzel", serif',
                        borderRight: "1px solid #8B4513",
                        width: "100px",
                      }}
                    >
                      d100
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#d4af37",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        fontFamily: '"Cinzel", serif',
                      }}
                    >
                      Item Type
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {generateArsenalTable().map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "rgba(28, 24, 18, 0.5)",
                        },
                        "&:nth-of-type(even)": {
                          backgroundColor: "rgba(28, 24, 18, 0.7)",
                        },
                        "&:hover": {
                          backgroundColor:
                            "rgba(212, 175, 55, 0.15) !important",
                          cursor: "pointer",
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          color: "#DAA520",
                          fontWeight: 700,
                          fontSize: "1rem",
                          borderRight: "1px solid #8B4513",
                          fontFamily: '"Cinzel", serif',
                        }}
                      >
                        {row.roll}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#d4c5a0",
                          fontSize: "0.95rem",
                          fontFamily: '"Crimson Text", serif',
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          
                          
                            // Scroll para o item usando refs
                            itemRefs
                              .find(
                                (ref) =>
                                  ref.id ===
                                  slugify(row.item, {
                                    lower: true,
                                    strict: true,
                                  })
                              )
                              ?.ref?.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                          
                        }}
                      >
                        {row.item}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <ParchmentText
              sx={{
                textAlign: "center",
                fontStyle: "italic",
                color: "#d4af37",
                fontSize: "0.9rem",
              }}
            >
              Roll 1d100 to determine the type of magic item found, then consult
              the appropriate category below to select or randomize the specific
              item.
            </ParchmentText>
          </Box>

          {/* DIVIDER */}
          <Box
            sx={{
              height: "2px",
              background:
                "linear-gradient(to right, transparent, #d4af37, transparent)",
              mb: 5,
            }}
          />

          {/* WEAPONS SECTION */}
          <Box
            sx={{
              mb: 6,
              p: 4,
              border: "3px solid #d4af37",
              borderRadius: "8px",
              backgroundColor: "rgba(212, 175, 55, 0.08)",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "2rem",
                fontWeight: 700,
                mb: 3,
                textAlign: "center",
                color: "#d4af37",
                fontFamily: '"Cinzel", serif',
              }}
            >
              ⚔️ ARMAS MÁGICAS (40 items)
            </ParchmentText>

            {weaponCategories.map((category) => (
              <Box key={category} sx={{ mb: 5 }}>
                <Box
                  sx={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#d4af37",
                    mb: 3,
                    pb: 1,
                    borderBottom: "2px solid rgba(212, 175, 55, 0.3)",
                  }}
                >
                  {category}
                </Box>

                {arsenalData
                  .filter(
                    (item) =>
                      item.category === "Weapon" && item.category === category
                  )
                  .map((item, index) => (
                    <MagicItemCard
                      key={index}
                      id={slugify(item.name, { lower: true, strict: true })}
                      ref={
                        itemRefs.find(
                          (ref) =>
                            ref.id ===
                            slugify(item.name, { lower: true, strict: true })
                        )?.ref
                      }
                      name={item.name}
                      type={item.category}
                      price={item.purchasePrice}
                      effect={item.bonus}
                    />
                  ))}
              </Box>
            ))}
          </Box>

          {/* ARMOR SECTION */}
          <Box
            sx={{
              mb: 6,
              p: 4,
              border: "3px solid #d4af37",
              borderRadius: "8px",
              backgroundColor: "rgba(212, 175, 55, 0.08)",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "2rem",
                fontWeight: 700,
                mb: 3,
                textAlign: "center",
                color: "#d4af37",
                fontFamily: '"Cinzel", serif',
              }}
            >
              🛡️ ARMADURAS MÁGICAS (24 items)
            </ParchmentText>

            {armorCategories.map((category) => (
              <Box key={category} sx={{ mb: 5 }}>
                <Box
                  sx={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    color: "#d4af37",
                    mb: 3,
                    pb: 1,
                    borderBottom: "2px solid rgba(212, 175, 55, 0.3)",
                  }}
                >
                  {category}
                </Box>

                {arsenalData
                  .filter(
                    (item) =>
                      item.category === "Armor" && item.category === category
                  )
                  .map((item, index) => (
                    <MagicItemCard
                      key={index}
                      id={slugify(item.name, { lower: true, strict: true })}
                      ref={
                        itemRefs.find(
                          (ref) =>
                            ref.id ===
                            slugify(item.name, { lower: true, strict: true })
                        )?.ref
                      }
                      name={item.name}
                      type={item.category }
                      price={item.purchasePrice}
                      effect={item.bonus}
                    />
                  ))}
              </Box>
            ))}
          </Box>

          <ParchmentText
            sx={{
              mt: 6,
              p: 4,
              border: "3px solid #DAA520",
              borderRadius: "6px",
              backgroundColor: "rgba(212, 175, 55, 0.05)",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            "In the City of the Damned, your equipment is your life. A good
            sword can cleave through demons. Good armor can turn aside death
            itself. But remember — in Wyrdgrave, every magical item has a price.
            Some demand gold. Others demand blood. And some... demand your
            soul."
            <br />
            <br />— Marcus the Veteran, Commander of the Lost Legion
          </ParchmentText>
        </ContentContainer>
      </ContentSection>
      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/")}
        >
          Voltar ao Início
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
