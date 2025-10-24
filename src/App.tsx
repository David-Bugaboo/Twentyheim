import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import useScrollToTop from "./hooks/useScrollToTop";

import "./App.css";
import { TOCProvider } from "./context/table-of-contents.context";
import RulesIntroPage from "./pages/rules/intro/RulesIntroPage";
import FiguresAndAttributesPage from "./pages/rules/FiguresAndAttributesPage";
import NegativeConditionsPage from "./pages/rules/NegativeConditionsPage";
import AreaOfEffectPage from "./pages/rules/AreaOfEffectPage";
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
import GameSetupPage from "./pages/rules/GameSetupPage";
import MagicRulesPage from "./pages/rules/MagicRulesPage";
import WarbandCreationPage from "./pages/rules/WarbandCreationPage";
import ExperienceRollPage from "./pages/campanha/ExperienceRollPage";
import SurvivalTestPage from "./pages/campanha/SurvivalTestPage";
import RewardsPage from "./pages/campanha/RewardsPage";
import ExplorationPage from "./pages/campanha/ExplorationPage";
import ExplorationEventsPage from "./pages/campanha/ExplorationEventsPage";
import WyrdstoneSellingPage from "./pages/campanha/WyrdstoneSellingPage";
import SkillsIndexPage from "./pages/skills/SkillsIndexPage";
import CombatSkillsPage from "./pages/skills/CombatSkillsPage";
import RangedSkillsPage from "./pages/skills/RangedSkillsPage";
import AcademicSkillsPage from "./pages/skills/AcademicSkillsPage";
import StrengthSkillsPage from "./pages/skills/StrengthSkillsPage";
import AgilitySkillsPage from "./pages/skills/AgilitySkillsPage";
import SistersOfSigmarSkillsPage from "./pages/skills/SistersOfSigmarSkillsPage";
import SkavenEnshinSkillsPage from "./pages/skills/SkavenEnshinSkillsPage";
import BeastmenRaidersSkillsPage from "./pages/skills/BeastmenRaidersSkillsPage";
import DwarfTreasureHuntersSkillsPage from "./pages/skills/DwarfTreasureHuntersSkillsPage";
import DwarfTrollSlayersSkillsPage from "./pages/skills/DwarfTrollSlayersSkillsPage";
import EngineeringSkillsPage from "./pages/skills/EngineeringSkillsPage";
import VonCarsteinSkillsPage from "./pages/skills/VonCarsteinSkillsPage";
import CrimsonDragonSkillsPage from "./pages/skills/CrimsonDragonSkillsPage";
import StrigoiSkillsPage from "./pages/skills/StrigoiSkillsPage";
import DarkElfCorsairsSkillsPage from "./pages/skills/DarkElfCorsairsSkillsPage";
import GeckoSkillsPage from "./pages/skills/GeckoSkillsPage";
import SaurusSkillsPage from "./pages/skills/SaurusSkillsPage";
import OrcHordesSkillsPage from "./pages/skills/OrcHordesSkillsPage";
import SonsOfHashutSkillsPage from "./pages/skills/SonsOfHashutSkillsPage";
import WeaponsAndEquipmentsPage from "./pages/weapons and equipments/WeaponsAndEquipmentsPage";
import MeleeWeaponsPage from "./pages/weapons and equipments/MeleeWeaponsPage";
import ArmorAndShieldsPage from "./pages/weapons and equipments/ArmorAndShieldsPage";
import RangedWeaponsPage from "./pages/weapons and equipments/RangedWeaponsPage";
import FirearmsPage from "./pages/weapons and equipments/FirearmsPage";
import ModifiersPage from "./pages/weapons and equipments/ModifiersPage";
import RemediesAndPoisonsPage from "./pages/weapons and equipments/RemediesAndPoisonsPage";
import AccessoriesPage from "./pages/weapons and equipments/AccessoriesPage";
import WarbandsIndexPage from "./pages/warbands/WarbandsIndexPage";
import HomemFerasRaidersPage from "./pages/warbands/beastman-raiders/BeastmenRaidersPage";
import CultOfThePossessedPage from "./pages/warbands/cult-of-the-possessed/CultOfThePossessedPage";
import DarkElfCorsairsPage from "./pages/warbands/dark-elf-corsairs/DarkElfCorsairsPage";
import DwarfTreasureHuntersPage from "./pages/warbands/dwarf-treasure-hunters/DwarfTreasureHuntersPage";
import LizardmenPage from "./pages/warbands/lizardmen/LizardmenPage";
import MercenariesPage from "./pages/warbands/mercenaries/MercenariesPage";
import OrcMobPage from "./pages/warbands/orc-mob/OrcMobPage";
import SistersOfSigmarPage from "./pages/warbands/sisters-of-sigmar/SistersOfSigmarPage";
import SkavenPage from "./pages/warbands/skaven/SkavenPage";
import SonsOfHashutPage from "./pages/warbands/sons-of-hashut/SonsOfHashutPage";
import VampireCourtsPage from "./pages/warbands/vampire-courts/VampireCourtsPage";
import WitchHuntersPage from "./pages/warbands/witch-hunters/WitchHuntersPage";
import LahmiaSkillsPage from "./pages/skills/LahmiaSkillsPage";
import AttributeTestsPage from "./pages/rules/AttributeTestsPage";
import CampaignPage from "./pages/campanha/CampaignPage";
import ArcaneLoresPage from "./pages/spells/lores/ArcaneLoresPage";
import LoreOfFirePage from "./pages/spells/LoreOfFirePage";
import LoreOfBeastsPage from "./pages/spells/LoreOfBeastsPage";
import LoreOfDeathPage from "./pages/spells/LoreOfDeathPage";
import LoreOfHeavensPage from "./pages/spells/LoreOfHeavensPage";
import LoreOfLifePage from "./pages/spells/LoreOfLifePage";
import LoreOfLightPage from "./pages/spells/LoreOfLightPage";
import LoreOfMetalPage from "./pages/spells/LoreOfMetalPage";
import LoreOfShadowsPage from "./pages/spells/LoreOfShadowsPage";
import DarkLoresPage from "./pages/spells/lores/DarkLoresPage";
import LoreOfHashutPage from "./pages/spells/LoreOfHashutPage";
import LoreOfChaosPage from "./pages/spells/LoreOfChaosPage";
import LoreOfTheHornedRatPage from "./pages/spells/LoreOfTheHornedRatPage";
import LoreOfNecromancyPage from "./pages/spells/LoreOfNecromancyPage";
import DivineLoresPage from "./pages/spells/lores/DivineLoresPage";
import PrayersOfSigmarPage from "./pages/spells/PrayersOfSigmarPage";
import PrayersOfUlricPage from "./pages/spells/PrayersOfUlricPage";
import GreenskinLoresPage from "./pages/spells/lores/GreenskinLoresPage";
import LoreOfTheBigWaaaghPage from "./pages/spells/LoreOfTheBigWaaaghPage";

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
          <AppContent />
        </Router>
      </ThemeProvider>
    </TOCProvider>
  );
}

function AppContent() {
  useScrollToTop();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<RulesIntroPage />} />
        <Route path="/rules" element={<RulesIntroPage />} />
        <Route path="/rules" element={<RulesIntroPage />} />
        <Route path="/rules/area-of-effect" element={<AreaOfEffectPage />} />
        <Route
          path="/rules/figures-and-attributes"
          element={<FiguresAndAttributesPage />}
        />
        <Route
          path="/rules/negative-conditions"
          element={<NegativeConditionsPage />}
        />
        <Route path="/rules/equipment-rules" element={<EquipmentRulesPage />} />
        <Route path="/rules/combat-system" element={<CombatSystemPage />} />
        <Route
          path="/rules/movement-actions"
          element={<MovementActionsPage />}
        />
        <Route path="/rules/combat-actions" element={<CombatActionsPage />} />
        <Route path="/rules/ranged-actions" element={<RangedActionsPage />} />
        <Route
          path="/rules/spellcasting-actions"
          element={<SpellcastingActionsPage />}
        />
        <Route path="/rules/skill-actions" element={<PowerActionsPage />} />
        <Route path="/rules/other-actions" element={<OtherActionsPage />} />
        <Route
          path="/rules/wyrdstone-actions"
          element={<WyrdstoneActionsPage />}
        />
        <Route path="/rules/game-end" element={<GameEndPage />} />
        <Route path="/rules/game-setup" element={<GameSetupPage />} />
        <Route path="/rules/attribute-tests" element={<AttributeTestsPage />} />
        <Route
          path="/rules/warband-creation"
          element={<WarbandCreationPage />}
        />
        <Route path="/campaign" element={<CampaignPage />} />

        <Route
          path="/campaign/experience-roll"
          element={<ExperienceRollPage />}
        />
        <Route path="/campaign/survival-test" element={<SurvivalTestPage />} />
        <Route path="/campaign/rewards" element={<RewardsPage />} />

        <Route path="/campaign/activities" element={<ExplorationPage />} />
        <Route
          path="/campaign/exploration-events"
          element={<ExplorationEventsPage />}
        />

        <Route
          path="/campaign/wyrdstone-selling"
          element={<WyrdstoneSellingPage />}
        />
        <Route path="/campaign/skills-index" element={<SkillsIndexPage />} />
        <Route path="/skills" element={<SkillsIndexPage />} />
        <Route path="/skills/combat" element={<CombatSkillsPage />} />
        <Route path="/skills/ranged" element={<RangedSkillsPage />} />
        <Route path="/skills/academic" element={<AcademicSkillsPage />} />
        <Route path="/skills/strength" element={<StrengthSkillsPage />} />
        <Route path="/skills/agility" element={<AgilitySkillsPage />} />
        <Route
          path="/skills/sisters-of-sigmar"
          element={<SistersOfSigmarSkillsPage />}
        />
        <Route
          path="/skills/skaven-enshin"
          element={<SkavenEnshinSkillsPage />}
        />
        <Route
          path="/skills/beastmen-raiders"
          element={<BeastmenRaidersSkillsPage />}
        />
        <Route
          path="/skills/dwarf-treasure-hunters"
          element={<DwarfTreasureHuntersSkillsPage />}
        />
        <Route
          path="/skills/dwarf-troll-slayers"
          element={<DwarfTrollSlayersSkillsPage />}
        />
        <Route path="/skills/engineering" element={<EngineeringSkillsPage />} />
        <Route
          path="/skills/von-carstein"
          element={<VonCarsteinSkillsPage />}
        />
        <Route
          path="/skills/crimson-dragon"
          element={<CrimsonDragonSkillsPage />}
        />
        <Route path="/skills/lahmia" element={<LahmiaSkillsPage />} />
        <Route path="/skills/strigoi" element={<StrigoiSkillsPage />} />
        <Route
          path="/skills/dark-elf-corsairs"
          element={<DarkElfCorsairsSkillsPage />}
        />
        <Route path="/skills/geckos" element={<GeckoSkillsPage />} />
        <Route path="/skills/saurus" element={<SaurusSkillsPage />} />
        <Route path="/skills/orc-hordes" element={<OrcHordesSkillsPage />} />
        <Route
          path="/skills/sons-of-hashut"
          element={<SonsOfHashutSkillsPage />}
        />
        <Route path="/skills/skink" element={<GeckoSkillsPage />} />
        <Route path="/skills/saurian" element={<SaurusSkillsPage />} />
        <Route path="/equipment" element={<WeaponsAndEquipmentsPage />} />
        <Route path="/equipment/melee-weapons" element={<MeleeWeaponsPage />} />
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
        <Route path="/equipment/accessories" element={<AccessoriesPage />} />
        <Route path="/magic" element={<MagicRulesPage />} />
        <Route path="/magic/arcane-lores" element={<ArcaneLoresPage />} />
        <Route path="/magic/arcane-lores/fire" element={<LoreOfFirePage />} />
        <Route
          path="/magic/arcane-lores/beasts"
          element={<LoreOfBeastsPage />}
        />
        <Route path="/magic/arcane-lores/death" element={<LoreOfDeathPage />} />
        <Route
          path="/magic/arcane-lores/heavens"
          element={<LoreOfHeavensPage />}
        />
        <Route path="/magic/arcane-lores/life" element={<LoreOfLifePage />} />
        <Route path="/magic/arcane-lores/light" element={<LoreOfLightPage />} />
        <Route path="/magic/arcane-lores/metal" element={<LoreOfMetalPage />} />
        <Route
          path="/magic/arcane-lores/shadows"
          element={<LoreOfShadowsPage />}
        />
        <Route path="/magic/dark-lores" element={<DarkLoresPage />} />
        <Route path="/magic/dark-lores/hashut" element={<LoreOfHashutPage />} />
        <Route path="/magic/dark-lores/chaos" element={<LoreOfChaosPage />} />
        <Route
          path="/magic/dark-lores/horned-rat"
          element={<LoreOfTheHornedRatPage />}
        />
        <Route
          path="/magic/dark-lores/necromancy"
          element={<LoreOfNecromancyPage />}
        />
        <Route path="/magic/prayers" element={<DivineLoresPage />} />
        <Route path="/magic/prayers/sigmar" element={<PrayersOfSigmarPage />} />
        <Route path="/magic/prayers/ulric" element={<PrayersOfUlricPage />} />
        <Route path="/magic/greenskin-lores" element={<GreenskinLoresPage />} />
        <Route
          path="/magic/greenskin/big-waaagh"
          element={<LoreOfTheBigWaaaghPage />}
        />
        <Route path="/warbands" element={<WarbandsIndexPage />} />
        <Route
          path="/warbands/beastman-raiders"
          element={<HomemFerasRaidersPage />}
        />
        <Route
          path="/warbands/cult-of-the-possessed"
          element={<CultOfThePossessedPage />}
        />
        <Route
          path="/warbands/dark-elf-corsairs"
          element={<DarkElfCorsairsPage />}
        />
        <Route
          path="/warbands/dwarf-treasure-hunters"
          element={<DwarfTreasureHuntersPage />}
        />
        <Route path="/warbands/lizardmen" element={<LizardmenPage />} />
        <Route path="/warbands/mercenaries" element={<MercenariesPage />} />
        <Route path="/warbands/orc-mob" element={<OrcMobPage />} />
        <Route
          path="/warbands/sisters-of-sigmar"
          element={<SistersOfSigmarPage />}
        />
        <Route path="/warbands/skaven" element={<SkavenPage />} />
        <Route path="/warbands/sons-of-hashut" element={<SonsOfHashutPage />} />
        <Route
          path="/warbands/vampire-courts"
          element={<VampireCourtsPage />}
        />
        <Route path="/warbands/witch-hunters" element={<WitchHuntersPage />} />
      </Routes>
    </>
  );
}

export default App;
