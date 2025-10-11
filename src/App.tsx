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
import TreasuresAndItemsPage from "./pages/TreasuresAndItemsPage";
import SpellsPage from "./pages/SpellsPage";
import PotionsPage from "./pages/treasures-n-items/PotionsPage";
import MagicArsenalPage from "./pages/treasures-n-items/MagicArsenalPage";
import MagicItemsPage from "./pages/treasures-n-items/MagicItemsPage";
import ConstructModificationsPage from "./pages/ConstructModificationsPage";
import { DruidcraftLizardmenPage } from "./pages/spells/DruidcraftLizardmenPage";
import { DruidcraftAthelLorenPage } from "./pages/spells/DruidcraftAthelLorenPage";
import { MagicOfTheHornedRatPage } from "./pages/spells/MagicOfTheHornedRatPage";
import { LoreOfNecromancyPage } from "./pages/spells/LoreOfNecromancyPage";
import { MagicOfTheWhiteTowerPage } from "./pages/spells/MagicOfTheWhiteTowerPage";
import { MagicOfTheWaaghPage } from "./pages/spells/MagicOfTheWaaghPage";
import { MagicOfKhainePage } from "./pages/spells/MagicOfKhainePage";
import { PrayersOfUlricPage } from "./pages/spells/PrayersOfUlricPage";
import { PrayersOfSigmarPage } from "./pages/spells/PrayersOfSigmarPage";
import { PrayersOfHashutPage } from "./pages/spells/PrayersOfHashutPage";
import ChaosRitualsPage from "./pages/spells/ChaosRitualsPage";
import BasePage from "./pages/BasePage";
import BasesPage from "./pages/base/BasesPage";
import BaseUpgradesPage from "./pages/base/BaseUpgradesPage";
import TheStablePage from "./pages/base/TheStablePage";
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
          <Route path="/treasures" element={<TreasuresAndItemsPage />} />
          <Route path="/base" element={<BasePage />} />
          <Route path="/base/bases" element={<BasesPage />} />
          <Route path="/base/upgrades" element={<BaseUpgradesPage />} />
          <Route path="/base/stable" element={<TheStablePage />} />
          <Route path="/spells" element={<SpellsPage />} />
          <Route
            path="/spells/druidcraft-lizardmen"
            element={<DruidcraftLizardmenPage />}
          />
          <Route
            path="/spells/druidcraft-athel-loren"
            element={<DruidcraftAthelLorenPage />}
          />
          <Route
            path="/spells/magic-horned-rat"
            element={<MagicOfTheHornedRatPage />}
          />
          <Route
            path="/spells/lore-necromancy"
            element={<LoreOfNecromancyPage />}
          />
          <Route
            path="/spells/magic-white-tower"
            element={<MagicOfTheWhiteTowerPage />}
          />
          <Route path="/spells/magic-waagh" element={<MagicOfTheWaaghPage />} />
          <Route path="/spells/magic-khaine" element={<MagicOfKhainePage />} />
          <Route
            path="/spells/prayers-ulric"
            element={<PrayersOfUlricPage />}
          />
          <Route
            path="/spells/prayers-sigmar"
            element={<PrayersOfSigmarPage />}
          />
          <Route
            path="/spells/prayers-hashut"
            element={<PrayersOfHashutPage />}
          />
          <Route path="/spells/chaos-rituals" element={<ChaosRitualsPage />} />

          <Route path="/potions" element={<PotionsPage />} />
          <Route path="/magic-arsenal" element={<MagicArsenalPage />} />
          <Route path="/magic-items" element={<MagicItemsPage />} />
          <Route
            path="/construct-modifications"
            element={<ConstructModificationsPage />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
