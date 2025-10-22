import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";

import "./App.css";
import { TOCProvider } from "./context/table-of-contents.context";

import RulesIntroPage from "./pages/rules/intro/RulesIntroPage";
import FiguresAndAttributesPage from "./pages/rules/FiguresAndAttributesPage";
import EquipmentRulesPage from "./pages/rules/EquipmentRulesPage";
import CombatSystemPage from "./pages/rules/CombatSystemPage";
import MovementActionsPage from "./pages/rules/MovementActionsPage";
import CombatActionsPage from "./pages/rules/CombatActionsPage";
import RangedActionsPage from "./pages/rules/RangedActionsPage";
import SpellcastingActionsPage from "./pages/rules/SpellcastingActionsPage";
import PowerActionsPage from "./pages/rules/PowerActionsPage";
import OtherActionsPage from "./pages/rules/OtherActionsPage";
import WyrdstoneActionsPage from "./pages/rules/WyrdstoneActionsPage";
import GameEndPage from "./pages/rules/GameEndPage";
import PostGamePage from "./pages/rules/PostGamePage";
import GameSetupPage from "./pages/rules/GameSetupPage";
import MagicRulesPage from "./pages/rules/MagicRulesPage";
import HomePage from "./pages/HomePage";
import RulesPage from "./pages/RulesPage";
import WarbandCreationPage from "./pages/rules/WarbandCreationPage";

// Post-Game Sequence Pages
import PostGameSequencePage from "./pages/campanha/PostGameSequencePage";
import ExperienceRollPage from "./pages/campanha/ExperienceRollPage";
import SurvivalTestPage from "./pages/campanha/SurvivalTestPage";
import HealingPage from "./pages/campanha/HealingPage";
import RewardsPage from "./pages/campanha/RewardsPage";
import BlackMarketPage from "./pages/campanha/BlackMarketPage";
import AdvancementsPage from "./pages/campanha/AdvancementsPage";
import HiringPage from "./pages/campanha/HiringPage";
import MaintenancePage from "./pages/campanha/MaintenancePage";
import ExplorationPage from "./pages/campanha/ExplorationPage";
import UpdateStatsPage from "./pages/campanha/UpdateStatsPage";
import RitualsPage from "./pages/campanha/RitualsPage";
import WyrdstoneSellingPage from "./pages/campanha/WyrdstoneSellingPage";
import PowersPage from "./pages/campanha/SkillsPage";
import WeaponsAndEquipmentsPage from "./pages/weapons and equipments/WeaponsAndEquipmentsPage";
import MeleeWeaponsPage from "./pages/weapons and equipments/MeleeWeaponsPage";
import ArmorAndShieldsPage from "./pages/weapons and equipments/ArmorAndShieldsPage";
import RangedWeaponsPage from "./pages/weapons and equipments/RangedWeaponsPage";
import FirearmsPage from "./pages/weapons and equipments/FirearmsPage";
import ModifiersPage from "./pages/weapons and equipments/ModifiersPage";
import RemediesAndPoisonsPage from "./pages/weapons and equipments/RemediesAndPoisonsPage";
import AccessoriesPage from "./pages/weapons and equipments/AccessoriesPage";
import HomemFerasRaidersPage from "./pages/warbands/beastman-raiders/BeastmenRaidersPage";
import CultOfThePossessedPage from "./pages/warbands/cult-of-the-possessed/CultOfThePossessedPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#8b7355",
    },
    background: {
      default: "#1a1a1a",
      paper: "#2a2a2a",
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#c4c4c4",
    },
  },
  typography: {
    fontFamily: '"Crimson Text", serif',
    h1: {
      fontFamily: '"Cinzel", serif',
    },
    h2: {
      fontFamily: '"Cinzel", serif',
    },
    h3: {
      fontFamily: '"Cinzel", serif',
    },
    h4: {
      fontFamily: '"Cinzel", serif',
    },
    h5: {
      fontFamily: '"Cinzel", serif',
    },
    h6: {
      fontFamily: '"Cinzel", serif',
    },
  },
});

function App() {
  return (
    <TOCProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/rules/intro" element={<RulesIntroPage />} />
            <Route
              path="/rules/figures-and-attributes"
              element={<FiguresAndAttributesPage />}
            />
            <Route
              path="/rules/equipment-rules"
              element={<EquipmentRulesPage />}
            />
            <Route path="/rules/combat-system" element={<CombatSystemPage />} />
            <Route
              path="/rules/movement-actions"
              element={<MovementActionsPage />}
            />
            <Route
              path="/rules/combat-actions"
              element={<CombatActionsPage />}
            />
            <Route
              path="/rules/ranged-actions"
              element={<RangedActionsPage />}
            />
            <Route
              path="/rules/spellcasting-actions"
              element={<SpellcastingActionsPage />}
            />
            <Route path="/rules/power-actions" element={<PowerActionsPage />} />
            <Route path="/rules/other-actions" element={<OtherActionsPage />} />
            <Route
              path="/rules/wyrdstone-actions"
              element={<WyrdstoneActionsPage />}
            />
            <Route path="/rules/game-end" element={<GameEndPage />} />
            <Route path="/rules/game-setup" element={<GameSetupPage />} />
            <Route
              path="/rules/warband-creation"
              element={<WarbandCreationPage />}
            />
            <Route path="/rules/post-game" element={<PostGamePage />} />

            <Route path="campaign/powers" element={<PowersPage />} />

            <Route path="/campaign/post-game" element={<PostGamePage />} />
            <Route path="/campaign/hired-swords" element={<PostGamePage />} />

            {/* Post-Game Sequence Pages */}
            <Route path="/post-game" element={<PostGameSequencePage />} />
            <Route
              path="/post-game/experience-roll"
              element={<ExperienceRollPage />}
            />
            <Route
              path="/post-game/survival-test"
              element={<SurvivalTestPage />}
            />
            <Route path="/post-game/healing" element={<HealingPage />} />
            <Route path="/post-game/rewards" element={<RewardsPage />} />
            <Route
              path="/post-game/black-market"
              element={<BlackMarketPage />}
            />
            <Route
              path="/post-game/advancements"
              element={<AdvancementsPage />}
            />
            <Route path="/post-game/hiring" element={<HiringPage />} />
            <Route
              path="/post-game/maintenance"
              element={<MaintenancePage />}
            />
            <Route
              path="/post-game/exploration"
              element={<ExplorationPage />}
            />
            <Route
              path="/post-game/update-stats"
              element={<UpdateStatsPage />}
            />
            <Route path="/post-game/rituals" element={<RitualsPage />} />
            <Route
              path="/campaign/wyrdstone-selling"
              element={<WyrdstoneSellingPage />}
            />
            <Route
              path="/equipment/weapons-and-equipments"
              element={<WeaponsAndEquipmentsPage />}
            />
            <Route
              path="/equipment/melee-weapons"
              element={<MeleeWeaponsPage />}
            />
            <Route
              path="/equipment/armor-and-shields"
              element={<ArmorAndShieldsPage />}
            />
            <Route
              path="/equipment/ranged-weapons"
              element={<RangedWeaponsPage />}
            />
            <Route path="/equipment/firearms" element={<FirearmsPage />} />
            <Route path="/equipment/modifiers" element={<ModifiersPage />} />
            <Route
              path="/equipment/remedies-and-poisons"
              element={<RemediesAndPoisonsPage />}
            />
            <Route
              path="/equipment/accessories"
              element={<AccessoriesPage />}
            />
            <Route path="/magic/magic-rules" element={<MagicRulesPage />} />
            <Route
              path="/warbands/beastman-raiders"
              element={<HomemFerasRaidersPage />}
            />
            <Route
              path="/warbands/cult-of-the-possessed"
              element={<CultOfThePossessedPage />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </TOCProvider>
  );
}

export default App;
