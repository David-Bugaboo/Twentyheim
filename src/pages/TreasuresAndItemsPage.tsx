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
import Header from "../components/Header";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ParchmentText,
  ContentContainer,
} from "../components/PageComponents";

export default function TreasuresAndItemsPage() {
  const navigate = useNavigate();

  const treasureTable = [
    { roll: "1", result: "50gc", link: null },
    { roll: "2", result: "d20 × 10gc", link: null },
    { roll: "3", result: "d20 × 20gc", link: null },
    { roll: "4", result: "20gc, Potions (3)", link: "/potions" },
    { roll: "5", result: "40gc, Potions (2)", link: "/potions" },
    { roll: "6", result: "20gc, Scroll (1)", link: null },
    { roll: "7", result: "40gc, Scrolls (2)", link: null },
    { roll: "8", result: "Magic Weapon/Armour", link: "/magic-arsenal" },
    { roll: "9", result: "20gc, Magic Weapon/Armour", link: "/magic-arsenal" },
    { roll: "10", result: "40gc, Magic Weapon/Armour", link: "/magic-arsenal" },
    { roll: "11", result: "Relic", link: "/relics" },
    { roll: "12", result: "20gc, Relic", link: "/relics" },
    { roll: "13", result: "40gc, Relic", link: "/relics" },
    { roll: "14", result: "Grimoire", link: "/relics/books" },
    { roll: "15", result: "20gc, Grimoire", link: "/relics/books" },
    { roll: "16", result: "40gc, Grimoire", link: "/relics/books" },
    { roll: "17", result: "60gc, Grimoire", link: "/relics/books" },
    { roll: "18", result: "80gc, Grimoire", link: "/relics/books" },
    { roll: "19", result: "100gc, Grimoire", link: "/relics/books" },
    { roll: "20", result: "120gc, Grimoire", link: "/relics/books" },
  ];

  const itemCategories = [
    {
      name: "Common Items",
      path: "/common-items",
      icon: "⚔️",
      description:
        "Basic Equipment — Common weapons and armor available in any market: swords, bows, crossbows, shields, armor, and more.",
    },
    {
      name: "Magic Arsenal",
      path: "/magic-arsenal",
      icon: "⚔️🛡️",
      description:
        "Weapons & Armor — 61 pieces of enchanted equipment including swords, daggers, bows, throwing spears, combat staffs, shields, helmets, cloaks, and body armor.",
    },
    {
      name: "Potions & Elixirs",
      path: "/potions",
      icon: "🧪",
      description:
        "Alchemical Concoctions — 23 potions from healing draughts to transformation serums.",
    },
    {
      name: "Magic Items",
      path: "/magic-items",
      icon: "✨",
      description:
        "Enchanted Artifacts — Amulets, rings, gloves, boots, staffs, wands, and other magical items. Each one a relic of power from ages past.",
    },
    {
      name: "Construct Modifications",
      path: "/construct-modifications",
      icon: "⚙️",
      description:
        "Golem Enhancements — 36 modifications to customize your magical constructs.",
    },
  ];

  return (
    <PageContainer>
      <Header title="Treasures & Items of Wyrdgrave" />
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
            The Loot System — Finding Fortune in the Ruins
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            When the twin-tailed comet fell on Mordheim in 1999 IC, it shattered
            more than buildings. Every treasure vault in the city burst open.
            Every armory exploded. Every wizard's tower collapsed, scattering
            magical artifacts across the ruins. Now fortune-seekers from across
            the Old World brave the cursed streets, hunting for wyrdstone shards
            and the treasures they unlock.
            <br />
            <br />
            This is the complete guide to Wyrdgrave's loot system — how treasure
            is found, what can be discovered, and where to find the catalogs of
            every magical item in the damned city.
          </ParchmentText>

          {/* WYRDSTONE & TREASURE ROLLS */}
          <Box
            sx={{
              mb: 5,
              p: 4,
              border: "4px double #d4af37",
              borderRadius: "8px",
              backgroundColor: "rgba(212, 175, 55, 0.12)",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.8rem",
                fontWeight: 700,
                mb: 3,
                textAlign: "center",
                color: "#d4af37",
                fontFamily: '"Cinzel", serif',
              }}
            >
              💎 Wyrdstone & Treasure Rolls
            </ParchmentText>

            <ParchmentText sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.8 }}>
              <strong>For each Wyrdstone Shard</strong> recovered by a player
              during a scenario, that player gains the right to roll{" "}
              <strong>1 time</strong> on the Treasure Table below.
              <br />
              <br />
              <strong>Central Wyrdstone Shard Bonus:</strong> If the player
              recovered the <em>central wyrdstone shard</em> (the largest and
              most valuable shard on the table), they have the option to{" "}
              <strong>re-roll their first roll</strong> on the Treasure Table,
              but must accept the result of the second roll. This decision must
              be made after the first roll, but before any rolls are made on any
              sub-table.
            </ParchmentText>

            {/* TREASURE TABLE */}
            <Box sx={{ mt: 4 }}>
              <ParchmentText
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  textAlign: "center",
                  color: "#d4af37",
                  mb: 3,
                }}
              >
                📜 Treasure Table (d20)
              </ParchmentText>

              <TableContainer
                component={Paper}
                sx={{
                  backgroundColor: "rgba(28, 24, 18, 0.9)",
                  border: "3px solid #8B4513",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
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
                          width: "120px",
                        }}
                      >
                        Die Roll
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#d4af37",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          fontFamily: '"Cinzel", serif',
                        }}
                      >
                        Treasure
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {treasureTable.map((row, index) => (
                      <TableRow
                        key={index}
                        onClick={
                          row.link ? () => navigate(row.link) : undefined
                        }
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
                            cursor: row.link ? "pointer" : "default",
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
                            color: row.link ? "#d4af37" : "#d4c5a0",
                            fontSize: "0.95rem",
                            fontFamily: '"Crimson Text", serif',
                            fontWeight: row.link ? 600 : 400,
                            textDecoration: row.link ? "underline" : "none",
                            "&:hover": {
                              color: row.link ? "#DAA520" : "#d4c5a0",
                            },
                          }}
                        >
                          {row.result}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          {/* BLACK MARKET ROLLS */}
          <Box
            sx={{
              mb: 5,
              p: 4,
              border: "3px solid #d4af37",
              borderRadius: "8px",
              backgroundColor: "rgba(212, 175, 55, 0.08)",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.6rem",
                fontWeight: 700,
                mb: 3,
                textAlign: "center",
                color: "#d4af37",
                fontFamily: '"Cinzel", serif',
              }}
            >
              🏪 Black Market Rolls
            </ParchmentText>

            <ParchmentText sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
              In addition to treasure found during scenarios, each player may
              make <strong>4 Black Market Rolls</strong> on the Treasure Table
              after each game. These represent contacts, merchants, and black
              market dealers offering items for sale.
              <br />
              <br />
              <strong>Black Market Rules:</strong>
              <br />
              • Roll 4 times on the Treasure Table
              <br />• <strong>Ignore all Gold Crown (gc) results</strong> —
              re-roll any result that is purely gold
              <br />• Items discovered through Black Market Rolls can be{" "}
              <strong>purchased</strong> for their listed purchase price
              <br />
              • Black Market items are offered for sale but not automatically
              acquired
              <br />
              • Players choose which Black Market items to purchase based on
              their available gold
              <br />
              <br />
              <em>
                This represents the shadowy merchants, relic traders, and fence
                operations that thrive in Wyrdgrave's underground economy.
              </em>
            </ParchmentText>
          </Box>

          {/* ITEM CATEGORIES */}
          <Box
            sx={{
              mb: 5,
              p: 4,
              border: "4px double #d4af37",
              borderRadius: "8px",
              backgroundColor: "rgba(212, 175, 55, 0.15)",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.8rem",
                fontWeight: 700,
                mb: 3,
                textAlign: "center",
                color: "#d4af37",
                fontFamily: '"Cinzel", serif',
              }}
            >
              📚 Item Categories — The Complete Hoard
            </ParchmentText>

            <ParchmentText
              sx={{
                textAlign: "center",
                fontSize: "1.1rem",
                mb: 4,
                fontStyle: "italic",
              }}
            >
              Every magical item, relic, and treasure in Wyrdgrave is cataloged
              below. Click any category to browse its contents.
            </ParchmentText>

            {itemCategories.map((category, index) => (
              <Box
                key={index}
                onClick={() => navigate(category.path)}
                sx={{
                  mb: 3,
                  p: 3,
                  border: "2px solid #8B4513",
                  borderRadius: "6px",
                  backgroundColor: "rgba(28, 24, 18, 0.6)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(212, 175, 55, 0.15)",
                    borderColor: "#d4af37",
                    transform: "translateX(8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <ParchmentText
                    sx={{
                      fontSize: "2rem",
                      mr: 2,
                    }}
                  >
                    {category.icon}
                  </ParchmentText>
                  <ParchmentText
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "#DAA520",
                      fontFamily: '"Cinzel", serif',
                    }}
                  >
                    {category.name}
                  </ParchmentText>
                </Box>
                <ParchmentText sx={{ fontSize: "1rem", lineHeight: 1.7 }}>
                  {category.description}
                </ParchmentText>
              </Box>
            ))}
          </Box>

          {/* TREASURE SUB-TABLES */}
          <Box
            sx={{
              mb: 5,
              p: 4,
              border: "3px solid #8B4513",
              borderRadius: "8px",
              backgroundColor: "rgba(139, 69, 19, 0.1)",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.4rem",
                fontWeight: 600,
                mb: 3,
                color: "#d4af37",
              }}
            >
              📖 Understanding the Treasure Table
            </ParchmentText>

            <ParchmentText sx={{ lineHeight: 1.8, mb: 3 }}>
              <strong>Gold Crown Results (1-3):</strong> Pure gold. No further
              rolls needed.
              <br />
              <br />
              <strong>Potions (4-5):</strong> Roll on the{" "}
              <span
                onClick={() => navigate("/potions")}
                style={{
                  color: "#d4af37",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Potions & Elixirs
              </span>{" "}
              table to determine which potions are found.
              <br />
              <br />
              <strong>Scrolls (6-7):</strong> Spell scrolls containing random
              spells. Roll on the Random Spell Table to determine contents.
              <br />
              <br />
              <strong>Magic Weapon/Armour (8-10):</strong> Roll on the{" "}
              <span
                onClick={() => navigate("/magic-arsenal")}
                style={{
                  color: "#d4af37",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Magic Arsenal
              </span>{" "}
              table to determine the specific weapon or armor piece found.
              <br />
              <br />
              <strong>Relic (11-13):</strong> Roll on the{" "}
              <span
                onClick={() => navigate("/relics")}
                style={{
                  color: "#d4af37",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Relics
              </span>{" "}
              tables to determine which magical accessory, ring, or utility item
              is discovered.
              <br />
              <br />
              <strong>Grimoire (14-20):</strong> Spell grimoires that allow
              wizards to learn new spells. Roll on the Random Spell Table to
              determine the spell contained within the grimoire. Higher rolls
              include bonus gold.
            </ParchmentText>
          </Box>

          {/* FLAVOR QUOTE */}
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
            "Every wyrdstone shard is a key. Not to a door, but to fortune
            itself. I've seen a single shard unlock a chest containing enough
            gold to retire. I've seen another reveal a sword that could cut
            through demons. And I've seen a third lead a fool to a cursed
            grimoire that drove him mad. In Wyrdgrave, every treasure is a
            gamble. But the desperate have no choice but to roll the dice."
            <br />
            <br />— Erasmus the Collector, Master of the Black Market
          </ParchmentText>

          {/* ADDITIONAL NOTES */}
          <Box
            sx={{
              mt: 5,
              p: 4,
              border: "2px solid #8B4513",
              borderRadius: "6px",
              backgroundColor: "rgba(28, 24, 18, 0.3)",
            }}
          >
            <ParchmentText
              sx={{
                fontSize: "1.2rem",
                fontWeight: 600,
                mb: 2,
                color: "#d4af37",
              }}
            >
              ⚠️ Important Notes
            </ParchmentText>
            <ParchmentText sx={{ lineHeight: 1.8 }}>
              <strong>Warband-Specific Treasures:</strong> Some warbands have
              access to exclusive treasure tables with faction-themed items.
              Check your warband's page for details.
              <br />
              <br />
              <strong>Item Compatibility:</strong> Not all items can be used by
              all figures. Pay attention to restrictions like "Spellcaster
              only", "Wizard only", "Priest only", etc.
              <br />
              <br />
              <strong>Purchase vs Found:</strong> Items marked "Cannot Buy" must
              be discovered through treasure rolls or special scenarios. They
              cannot be purchased even if appearing on Black Market Rolls.
              <br />
              <br />
              <strong>Selling Items:</strong> All items have a sale price
              (listed as "Purchase Price / Sale Price"). Items can be sold
              between games to raise funds.
            </ParchmentText>
          </Box>
        </ContentContainer>
      </ContentSection>
      <NavigationSection>
        <StyledNavigationButton
          variant="contained"
          onClick={() => navigate("/")}
        >
          Back to Home
        </StyledNavigationButton>
      </NavigationSection>
    </PageContainer>
  );
}
