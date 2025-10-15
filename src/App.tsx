import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/HomePage";
import WarbandsPage from "./pages/WarbandsPage";
import RulesPage from "./pages/rules/RulesPage";
import CampaignPage from "./pages/campanha/CampaignPage";

import ExplorationPage from "./pages/ExplorationPage";
import HiredSwordsPage from "./pages/HiredSwordsPage";
import DramatisPersonaePage from "./pages/DramatisPersonaePage";
import TreasuresAndItemsPage from "./pages/TreasuresAndItemsPage";

import PotionsPage from "./pages/treasures-n-items/PotionsPage";
import MagicArsenalPage from "./pages/treasures-n-items/MagicArsenalPage";
import MagicItemsPage from "./pages/treasures-n-items/MagicItemsPage";
import CommonItemsPage from "./pages/treasures-n-items/CommonItemsPage";
import MagicPage from "./pages/spells/MagicPage";
import ArcaneLoresPage from "./pages/spells/ArcaneLoresPage";
import LoreOfFirePage from "./pages/spells/LoreOfFirePage";
import LoreOfHeavensPage from "./pages/spells/LoreOfHeavensPage";
import LoreOfMetalPage from "./pages/spells/LoreOfMetalPage";
import LoreOfLifePage from "./pages/spells/LoreOfLifePage";
import LoreOfLightPage from "./pages/spells/LoreOfLightPage";
import LoreOfShadowsPage from "./pages/spells/LoreOfShadowsPage";
import LoreOfDeathPage from "./pages/spells/LoreOfDeathPage";
import LoreOfBeastsPage from "./pages/spells/LoreOfBeastsPage";
import DarkLoresPage from "./pages/spells/DarkLoresPage";
import LoreOfChaosPage from "./pages/spells/LoreOfChaosPage";
import LoreOfNecromancyPage from "./pages/spells/LoreOfNecromancyPage";
import LoreOfTheHornedRatPage from "./pages/spells/LoreOfTheHornedRatPage";
import DivineLoresPage from "./pages/spells/DivineLoresPage";
import PrayersOfHashutPage from "./pages/spells/PrayersOfHashutPage";
import PrayersOfSigmarPage from "./pages/spells/PrayersOfSigmarPage";
import PrayersOfUlricPage from "./pages/spells/PrayersOfUlricPage";
import GreenskinLoresPage from "./pages/spells/GreenskinLoresPage";
import LoreOfTheBigWaaaghPage from "./pages/spells/LoreOfTheBigWaaaghPage";
import SpellScrollsPage from "./pages/spells/SpellScrollsPage";
import DaemonsPage from "./pages/daemons/DaemonsPage";
import DaemonStatblocksPage from "./pages/daemons/DaemonStatblocksPage";
import DaemonicTraitsPage from "./pages/daemons/DaemonicTraitsPage";
import DaemonicPactsPage from "./pages/daemons/DaemonicPactsPage";
import ConstructsPage from "./pages/constructs/ConstructsPage";
import ConstructStatblocksPage from "./pages/constructs/ConstructStatblocksPage";
import ConstructModsPage from "./pages/constructs/ConstructModsPage";
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

          <Route path="/exploration" element={<ExplorationPage />} />
          <Route path="/hired-swords" element={<HiredSwordsPage />} />
          <Route path="/dramatis-personae" element={<DramatisPersonaePage />} />
          <Route path="/treasures" element={<TreasuresAndItemsPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/campaign" element={<CampaignPage />} />
          <Route path="/base" element={<BasePage />} />
          <Route path="/base/bases" element={<BasesPage />} />
          <Route path="/base/upgrades" element={<BaseUpgradesPage />} />
          <Route path="/base/stable" element={<TheStablePage />} />

          <Route path="/magic" element={<MagicPage />} />
          <Route path="/magic/arcane-lores" element={<ArcaneLoresPage />} />
          <Route path="/magic/arcane/fire" element={<LoreOfFirePage />} />
          <Route path="/magic/arcane/heavens" element={<LoreOfHeavensPage />} />
          <Route path="/magic/arcane/metal" element={<LoreOfMetalPage />} />
          <Route path="/magic/arcane/life" element={<LoreOfLifePage />} />
          <Route path="/magic/arcane/light" element={<LoreOfLightPage />} />
          <Route path="/magic/arcane/shadows" element={<LoreOfShadowsPage />} />
          <Route path="/magic/arcane/death" element={<LoreOfDeathPage />} />
          <Route path="/magic/arcane/beasts" element={<LoreOfBeastsPage />} />
          <Route path="/magic/dark-lores" element={<DarkLoresPage />} />
          <Route path="/magic/dark/chaos" element={<LoreOfChaosPage />} />
          <Route
            path="/magic/dark/necromancy"
            element={<LoreOfNecromancyPage />}
          />
          <Route
            path="/magic/dark/horned-rat"
            element={<LoreOfTheHornedRatPage />}
          />
          <Route path="/magic/divine-lores" element={<DivineLoresPage />} />
          <Route
            path="/magic/divine/hashut"
            element={<PrayersOfHashutPage />}
          />
          <Route
            path="/magic/divine/sigmar"
            element={<PrayersOfSigmarPage />}
          />
          <Route path="/magic/divine/ulric" element={<PrayersOfUlricPage />} />
          <Route
            path="/magic/greenskin-lores"
            element={<GreenskinLoresPage />}
          />
          <Route
            path="/magic/greenskin/big-waaagh"
            element={<LoreOfTheBigWaaaghPage />}
          />
          <Route path="/magic/spell-scrolls" element={<SpellScrollsPage />} />

          <Route path="/daemons" element={<DaemonsPage />} />
          <Route
            path="/daemons/statblocks"
            element={<DaemonStatblocksPage />}
          />
          <Route path="/daemons/traits" element={<DaemonicTraitsPage />} />
          <Route path="/daemons/pacts" element={<DaemonicPactsPage />} />

          <Route path="/constructs" element={<ConstructsPage />} />
          <Route
            path="/constructs/statblocks"
            element={<ConstructStatblocksPage />}
          />
          <Route
            path="/constructs/modifications"
            element={<ConstructModsPage />}
          />

          <Route path="/potions" element={<PotionsPage />} />
          <Route path="/magic-arsenal" element={<MagicArsenalPage />} />
          <Route path="/magic-items" element={<MagicItemsPage />} />
          <Route path="/common-items" element={<CommonItemsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
