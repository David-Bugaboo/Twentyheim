import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/HomePage";
import WarbandsPage from "./pages/WarbandsPage";
import RulesPage from "./pages/RulesPage";
import EquipmentPage from "./pages/EquipmentPage";
import ExplorationPage from "./pages/ExplorationPage";
import HiredSwordsPage from "./pages/HiredSwordsPage";
import DramatisPersonaePage from "./pages/DramatisPersonaePage";

import MercenariesPage from "./pages/warbands/MercenariesPage";
import VampireCourtsPage from "./pages/warbands/VampireCourtsPage";
import SkavenPage from "./pages/warbands/SkavenPage";
import WitchHuntersPage from "./pages/warbands/WitchHuntersPage";
import CultOfThePossessedPage from "./pages/warbands/CultOfThePossessedPage";
import SistersOfSigmarPage from "./pages/warbands/SistersOfSigmarPage";
import OrcMobPage from "./pages/warbands/OrcMobPage";
import DwarfTreasureHuntersPage from "./pages/warbands/DwarfTreasureHuntersPage";
import LizardmenPage from "./pages/warbands/LizardmenPage";
import WoodElvesPage from "./pages/warbands/WoodElvesPage";
import SeaGuardPage from "./pages/warbands/SeaGuardPage";
import BridesOfKhainePage from "./pages/warbands/BridesOfKhainePage";
import SonsOfHashutPage from "./pages/warbands/SonsOfHashutPage";
import BeastmenRaidersPage from "./pages/warbands/BeastmenRaidersPage";

import GlobalNav from "./components/GlobalNav";
import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d4af37",
    },
    secondary: {
      main: "#8b7355",
    },
    background: {
      default: "#0a0a0a",
      paper: "#1a1a1a",
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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <GlobalNav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/warbands" element={<WarbandsPage />} />
          <Route path="/warband/mercenaries" element={<MercenariesPage />} />
          <Route
            path="/warband/vampire-courts"
            element={<VampireCourtsPage />}
          />
          <Route path="/warband/skaven-clan-eshin" element={<SkavenPage />} />
          <Route path="/warband/witch-hunters" element={<WitchHuntersPage />} />
          <Route
            path="/warband/cult-possessed"
            element={<CultOfThePossessedPage />}
          />
          <Route
            path="/warband/sisters-sigmar"
            element={<SistersOfSigmarPage />}
          />
          <Route path="/warband/orc-mob" element={<OrcMobPage />} />
          <Route
            path="/warband/dwarf-treasure-hunters"
            element={<DwarfTreasureHuntersPage />}
          />
          <Route path="/warband/lizardmen" element={<LizardmenPage />} />
          <Route path="/warband/wood-elves" element={<WoodElvesPage />} />
          <Route path="/warband/sea-guard" element={<SeaGuardPage />} />
          <Route
            path="/warband/brides-of-khaine"
            element={<BridesOfKhainePage />}
          />
          <Route
            path="/warband/sons-of-hashut"
            element={<SonsOfHashutPage />}
          />
          <Route
            path="/warband/beastmen-raiders"
            element={<BeastmenRaidersPage />}
          />

          <Route
            path="/warband/:warbandSlug"
            element={<div>Warband Detail Page</div>}
          />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/exploration" element={<ExplorationPage />} />
          <Route path="/hired-swords" element={<HiredSwordsPage />} />
          <Route path="/dramatis-personae" element={<DramatisPersonaePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
