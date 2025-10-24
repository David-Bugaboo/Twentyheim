import { useNavigate } from "react-router-dom";
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
import Header from "../../components/Header";
import {
  PageContainer,
  ContentSection,
  NavigationSection,
  StyledNavigationButton,
  ContentContainer,
  ParchmentText,
  PowerListTitle,
} from "../../components/PageComponents";

export default function SpellScrollsPage() {
  const navigate = useNavigate();

  // Tabela 2d20 - primeiro d20 (linhas) x segundo d20 (colunas)
  const spellScrollTable: { [key: string]: string } = {
    // Lore of Fire (Aqshy) - 1-12
    "1,1": "Blazing Sword",
    "1,2": "Burning Head",
    "1,3": "Cascading Fire Cloak",
    "1,4": "Cauterize",
    "1,5": "Fiery Blast",
    "1,6": "Fireball",
    "1,7": "Flame Cage",
    "1,8": "Flaming Skull",
    "1,9": "Forge of Flames",
    "1,10": "Lance of Fire",
    "1,11": "Ruin and Destruction",
    "1,12": "The Burning Head",

    // Lore of Heavens (Azyr) - 13-24
    "1,13": "Celestial Shield",
    "1,14": "Chain Lightning",
    "1,15": "Comet of Casandora",
    "1,16": "Forked Lightning",
    "1,17": "Heavenly Storm",
    "1,18": "Iceshard Blizzard",
    "1,19": "Lightning Bolt",
    "1,20": "Portent of Fate",
    "2,1": "Second Sign of Amul",
    "2,2": "Steed of Shadows",
    "2,3": "Thunderbolt",
    "2,4": "Urannon's Thunderbolt",

    // Lore of Metal (Chamon) - 25-36
    "2,5": "Commandment of Brass",
    "2,6": "Curse of Rust",
    "2,7": "Enchanted Blades",
    "2,8": "Final Transmutation",
    "2,9": "Gehenna's Golden Hounds",
    "2,10": "Glittering Robe",
    "2,11": "Law of Gold",
    "2,12": "Plague of Rust",
    "2,13": "Silver Shafts of Arha",
    "2,14": "Spirits of the Forge",
    "2,15": "Transmutation of Lead",
    "2,16": "Trial of Bronze",

    // Lore of Life (Ghyran) - 37-48
    "2,17": "Awakening of the Wood",
    "2,18": "Barkskin",
    "2,19": "Cure Poison",
    "2,20": "Dwellers Below",
    "3,1": "Earth Blood",
    "3,2": "Father of Thorns",
    "3,3": "Flesh to Stone",
    "3,4": "Regenerate",
    "3,5": "Shield of Thorns",
    "3,6": "Thorn Wall",
    "3,7": "Tree Singing",
    "3,8": "Verdant Growth",

    // Lore of Light (Hysh) - 49-60
    "3,9": "Banishment",
    "3,10": "Birona's Timewarp",
    "3,11": "Blinding Light",
    "3,12": "Cleansing Flare",
    "3,13": "Exorcism",
    "3,14": "Guardian Light",
    "3,15": "Light of Battle",
    "3,16": "Net of Amyntok",
    "3,17": "Pha's Illumination",
    "3,18": "Shem's Burning Gaze",
    "3,19": "Speed of Light",
    "3,20": "The Underworld Calls",

    // Lore of Shadows (Ulgu) - 61-72
    "4,1": "Crown of Taidron",
    "4,2": "Creeping Death",
    "4,3": "Enfeebling Foe",
    "4,4": "Melkoth's Mystifying Miasma",
    "4,5": "Mindrazor",
    "4,6": "Okkam's Mindrazor",
    "4,7": "Pit of Shades",
    "4,8": "Shadowstep",
    "4,9": "Steed of Shadows",
    "4,10": "The Penumbral Pendulum",
    "4,11": "The Withering",
    "4,12": "Throttle with Shadows",

    // Lore of Death (Shyish) - 73-84
    "4,13": "Aspect of the Dreadknight",
    "4,14": "Caress of Laniph",
    "4,15": "Doom and Darkness",
    "4,16": "Drain Life",
    "4,17": "Fate of Bjuna",
    "4,18": "Life Leeching",
    "4,19": "Purple Sun of Xereus",
    "4,20": "Soulblight",
    "5,1": "Spirit Leech",
    "5,2": "Steal Soul",
    "5,3": "The Grave Calls",
    "5,4": "Wind of Death",

    // Lore of Beasts (Ghur) - 85-96
    "5,5": "Amber Spear",
    "5,6": "Beast Cowers",
    "5,7": "Bestial Strength",
    "5,8": "Curse of Anraheir",
    "5,9": "Flock of Doom",
    "5,10": "Master of Beasts",
    "5,11": "Pelt of the Shadowgave",
    "5,12": "Savage Beast of Horros",
    "5,13": "The Hunter's Spear",
    "5,14": "Transformation of Kadon",
    "5,15": "Wild Form",
    "5,16": "Wyssan's Wildform",

    // Lore of Chaos - 97-108
    "5,17": "Black Fury",
    "5,18": "Blasphemous Rage",
    "5,19": "Chaos Spawn Transformation",
    "5,20": "Dark Hand of Destruction",
    "6,1": "Daemonic Possession",
    "6,2": "Eye of the Gods",
    "6,3": "Infernal Gateway",
    "6,4": "Lure of Chaos",
    "6,5": "Mark of Chaos",
    "6,6": "Stream of Corruption",
    "6,7": "Treason of Tzeentch",
    "6,8": "Word of Agony",

    // Lore of Necromancy - 109-120
    "6,9": "Animate Dead",
    "6,10": "Curse of Years",
    "6,11": "Dark Mist",
    "6,12": "Death's Messenger",
    "6,13": "Dread",
    "6,14": "Gaze of Nagash",
    "6,15": "Hand of Dust",
    "6,16": "Raise Dead",
    "6,17": "Soul Stealer",
    "6,18": "Summon Undead Horde",
    "6,19": "Vanhel's Danse Macabre",
    "6,20": "Wind of Undeath",

    // Lore of the Horned Rat - 121-132
    "7,1": "Bless with Filth",
    "7,2": "Cloud of Warpstone Dust",
    "7,3": "Death Frenzy",
    "7,4": "Plague",
    "7,5": "Scorch",
    "7,6": "Scurry Away",
    "7,7": "Skitterleap",
    "7,8": "Sorcerer's Curse",
    "7,9": "Summon Clan Rats",
    "7,10": "The Dreaded Thirteenth Spell",
    "7,11": "Warp Lightning",
    "7,12": "Wither",

    // Prayers of Hashut - 133-144
    "7,13": "Armour of Hashut",
    "7,14": "Ash Storm",
    "7,15": "Black Iron Curse",
    "7,16": "Breath of Hashut",
    "7,17": "Burning Body",
    "7,18": "Dark Subjugation",
    "7,19": "Flames of Azgorh",
    "7,20": "Glowing Skin",
    "8,1": "Hashut's Splendour",
    "8,2": "Molten Skin",
    "8,3": "Strike Down the Unworthy",
    "8,4": "Wall of Obsidian",

    // Prayers of Sigmar - 145-156
    "8,5": "Aegis of Sigmar",
    "8,6": "Avatar of Sigmar",
    "8,7": "Blessed Weapon",
    "8,8": "Hammer of Sigmar",
    "8,9": "Healing Hand",
    "8,10": "Holy Fervor",
    "8,11": "Martyr's Blessing",
    "8,12": "Shield of Faith",
    "8,13": "Sigmar's Judgment",
    "8,14": "Smite the Unholy",
    "8,15": "The Heart of Steel",
    "8,16": "Turn Undead",

    // Prayers of Ulric - 157-168
    "8,17": "Battle Howl",
    "8,18": "Chill Blast",
    "8,19": "Courage of the Wolf",
    "8,20": "Curse of the Unbeliever",
    "9,1": "Frostbite",
    "9,2": "Hoarfrost",
    "9,3": "Howl of the Winter Wolf",
    "9,4": "Ice Shard",
    "9,5": "Pelt of the Winter Wolf",
    "9,6": "The Coldest Winter",
    "9,7": "Ulric's Fury",
    "9,8": "Winter's Bite",

    // Lore of the Big WAAAGH! - 169-180
    "9,9": "'Eadbutt",
    "9,10": "Brain Bursta",
    "9,11": "Da Jump",
    "9,12": "Da Krunch",
    "9,13": "Fist of Gork",
    "9,14": "Foot of Gork",
    "9,15": "Gaze of Gork",
    "9,16": "Gork'll Fix It",
    "9,17": "Gork's Warpath",
    "9,18": "Mork Save Uz",
    "9,19": "The Hand of Gork",
    "9,20": "WAAAGH!",
  };

  const getSpellForRoll = (d1: number, d2: number): string => {
    const key = `${d1},${d2}`;
    return spellScrollTable[key] || "—";
  };

  return (
    <PageContainer>
      <Header title="Spell Scrolls & Grimoires" />

      <ContentSection>
        <ContentContainer>
          <ParchmentText sx={{ mb: 3 }}>
            This table allows you to randomly determine which spell scroll or
            grimoire is found as treasure. Roll 2d20 and cross-reference the
            results on the table below to determine which spell is discovered.
          </ParchmentText>

          <ParchmentText sx={{ mb: 4 }}>
            <strong>Spell Scroll:</strong> A single-use magical item containing
            one spell. Any spellcaster can attempt to cast from a scroll
            (requires a Vontade test).
            <br />
            <strong>Grimoire:</strong> A spellbook that allows a wizard to learn
            a new spell permanently. Requires time and study to master.
          </ParchmentText>

          <PowerListTitle>2d20 Spell Table</PowerListTitle>

          <ParchmentText
            sx={{ mb: 3, fontSize: "0.9rem", fontStyle: "italic" }}
          >
            Roll the first d20 for the row, then the second d20 for the column:
          </ParchmentText>

          <TableContainer
            component={Paper}
            sx={{
              mb: 5,
              backgroundColor: "rgba(28, 24, 18, 0.95)",
              border: "2px solid #8B4513",
              overflowX: "auto",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "rgba(139, 69, 19, 0.4)",
                    borderBottom: "2px solid #cd853f",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#cd853f",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      fontFamily: '"Cinzel", serif',
                      borderRight: "2px solid #8B4513",
                      position: "sticky",
                      left: 0,
                      backgroundColor: "rgba(139, 69, 19, 0.4)",
                      zIndex: 2,
                      minWidth: "50px",
                    }}
                  >
                    d20
                  </TableCell>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((col) => (
                    <TableCell
                      key={col}
                      align="center"
                      sx={{
                        color: "#cd853f",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        fontFamily: '"Cinzel", serif',
                        minWidth: "60px",
                        padding: "8px 4px",
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((row) => (
                  <TableRow
                    key={row}
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: "rgba(28, 24, 18, 0.6)",
                      },
                      "&:nth-of-type(even)": {
                        backgroundColor: "rgba(28, 24, 18, 0.8)",
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "#DAA520",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        fontFamily: '"Cinzel", serif',
                        borderRight: "2px solid #8B4513",
                        position: "sticky",
                        left: 0,
                        backgroundColor:
                          row % 2 === 1
                            ? "rgba(28, 24, 18, 0.6)"
                            : "rgba(28, 24, 18, 0.8)",
                        zIndex: 1,
                      }}
                    >
                      {row}
                    </TableCell>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((col) => {
                      const spell = getSpellForRoll(row, col);
                      return (
                        <TableCell
                          key={col}
                          sx={{
                            color: spell === "—" ? "#666" : "#d4c5a0",
                            fontSize: "0.75rem",
                            fontFamily: '"Crimson Text", serif',
                            padding: "8px 4px",
                            textAlign: "center",
                          }}
                        >
                          {spell}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              p: 3,
              backgroundColor: "rgba(139, 115, 85, 0.15)",
              border: "2px solid rgba(139, 115, 85, 0.4)",
              borderRadius: "8px",
            }}
          >
            <PowerListTitle sx={{ color: "#c4a870", mt: 0 }}>
              Using the Table
            </PowerListTitle>

            <ParchmentText>
              <strong>For Treasure:</strong> When a scenario or exploration
              result indicates finding a spell scroll or grimoire, roll 2d20 on
              this table to determine which spell is found.
              <br />
              <br />
              <strong>For Trade:</strong> Game Masters can use this table to
              randomly stock merchants and black market dealers with magical
              texts.
              <br />
              <br />
              <strong>Empty Results:</strong> If you roll a combination that
              shows "—", reroll or choose to find a common magic item instead.
            </ParchmentText>
          </Box>
        </ContentContainer>
      </ContentSection>

      <NavigationSection>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <StyledNavigationButton
            variant="outlined"
            onClick={() => navigate("/magic")}
          >
            Back to Magic
          </StyledNavigationButton>

          <StyledNavigationButton
            variant="contained"
            onClick={() => navigate("/")}
          >
            Back to Home
          </StyledNavigationButton>
        </Box>
      </NavigationSection>
    </PageContainer>
  );
}
