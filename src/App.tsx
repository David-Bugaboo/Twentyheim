import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import "./App.css";
import { TOCProvider } from "./context/table-of-contents.context";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";
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
import MagicRulesPage from "./pages/rules/MagicRulesPage";
import WarbandCreationPage from "./pages/rules/WarbandCreationPage";
import ExperienceRollPage from "./pages/campanha/ExperienceRollPage";
import SurvivalTestPage from "./pages/campanha/SurvivalTestPage";
import RewardsPage from "./pages/campanha/RewardsPage";
import ExplorationPage from "./pages/campanha/ExplorationPage";
import ExplorationEventsPage from "./pages/campanha/ExplorationEventsPage";
import WyrdstoneSellingPage from "./pages/campanha/WyrdstoneSellingPage";
import SkillsIndexPage from "./pages/skills/SkillsIndexPage";
import WeaponsAndEquipmentsPage from "./pages/weapons and equipments/WeaponsAndEquipmentsPage";
import MeleeWeaponsPage from "./pages/weapons and equipments/MeleeWeaponsPage";
import ArmorAndShieldsPage from "./pages/weapons and equipments/ArmorAndShieldsPage";
import RangedWeaponsPage from "./pages/weapons and equipments/RangedWeaponsPage";
import FirearmsPage from "./pages/weapons and equipments/FirearmsPage";
import ModifiersPage from "./pages/weapons and equipments/ModifiersPage";
import RemediesAndPoisonsPage from "./pages/weapons and equipments/RemediesAndPoisonsPage";
import AccessoriesPage from "./pages/weapons and equipments/AccessoriesPage";
import WarbandsIndexPage from "./pages/warbands/WarbandsIndexPage";


import AttributeTestsPage from "./pages/rules/AttributeTestsPage";
import CampaignPage from "./pages/campanha/CampaignPage";
import ArcaneLoresPage from "./pages/spells/lores/ArcaneLoresPage";
import HappeningsPage from "./pages/rules/Happenings";
import ReactionsPage from "./pages/rules/ReactionsPage";
import ChargeActionsPage from "./pages/rules/ChargeActionsPage";
import FightActionsPage from "./pages/rules/FightActionsPage";

import ScenariosPage from "./pages/scenarios/ScenariosPage";

import DefendTheFindPage from "./pages/scenarios/defend-the-find/DefendTheFindPage";
import SkirmishPage from "./pages/scenarios/skirmish/SkirmishPage";
import WyrdstoneHuntPage from "./pages/scenarios/wyrdstone-hunt/WyrdstoneHuntPage";
import BreakthroughPage from "./pages/scenarios/breakthrough/BreakthroughPage";
import StreetFightPage from "./pages/scenarios/street-fight/StreetFightPage";
import ChanceEncounterPage from "./pages/scenarios/chance-encounter/ChanceEncounterPage";
import HiddenTreasurePage from "./pages/scenarios/hidden-treasure/HiddenTreasurePage";
import OccupyPage from "./pages/scenarios/occupy/OccupyPage";
import SurpriseAttackPage from "./pages/scenarios/surprise-attack/SurpriseAttackPage";
import MonsterHuntPage from "./pages/scenarios/monster-hunt/MonsterHuntPage";
import WizardMansionPage from "./pages/scenarios/wizard-mansion/WizardMansionPage";
import TreasureHuntPage from "./pages/scenarios/treasure-hunt/TreasureHuntPage";
import StreetBrawlPage from "./pages/scenarios/street-brawl/StreetBrawlPage";
import HeistPage from "./pages/scenarios/heist/HeistPage";
import ThePoolPage from "./pages/scenarios/the-pool/ThePoolPage";
import LostPrincePage from "./pages/scenarios/lost-prince/LostPrincePage";
import LegendsPage from "./pages/campanha/LegendsPage";
import HiredSwordsPage from "./pages/campanha/MercenariesPage";
import DarkGodsInvocationPage from "./pages/campanha/DarkGodsInvocationPage";
import ChangelogPage from "./pages/ChangelogPage";
import WarbandManagerPage from "./pages/tools/WarbandManagerPage";
import WarbandDetailPage from "./pages/tools/WarbandDetailPage";

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
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState<any>(null);
  const [showInstallHint, setShowInstallHint] = useState<boolean>(false);

  useEffect(() => {
    const isStandalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || (window.navigator as any).standalone;
    const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const handler = (e: any) => {
      // Intercepta o prompt automático para mostrar nosso botão
      e.preventDefault();
      setDeferredInstallPrompt(e);
      // Mostra botão apenas se não estiver instalado e não for iOS (iOS usa Share > Add)
      setShowInstallHint(!isStandalone && !isIOS);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    try {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      const { outcome } = await deferredInstallPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallHint(false);
        setDeferredInstallPrompt(null);
      }
    } catch {}
  };
  return (
    <AuthProvider>
      <TOCProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {showInstallHint && (
            <div className="fixed bottom-4 right-4 z-50">
              <button
                onClick={handleInstallClick}
                className="px-3 py-2 rounded bg-green-700 hover:bg-green-600 text-white text-sm shadow-lg"
                title="Instalar o app"
              >
                Instalar app
              </button>
            </div>
          )}
          <Router>
            <AppContent />
          </Router>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            style={{
              fontFamily: '"Cinzel", serif',
            }}
          />
        </ThemeProvider>
      </TOCProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

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
        <Route path="/rules/charge-actions" element={<ChargeActionsPage />} />
        <Route path="/rules/fight-actions" element={<FightActionsPage />} />
        <Route path="/rules/ranged-actions" element={<RangedActionsPage />} />
        <Route path="/rules/happenings" element={<HappeningsPage />} />
        <Route
          path="/rules/spellcasting-actions"
          element={<SpellcastingActionsPage />}
        />
        <Route path="/rules/skill-actions" element={<PowerActionsPage />} />
        <Route path="/rules/other-actions" element={<OtherActionsPage />} />
        <Route path="/rules/reactions" element={<ReactionsPage />} />
        <Route
          path="/rules/wyrdstone-actions"
          element={<WyrdstoneActionsPage />}
        />

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
        <Route path="/scenarios" element={<ScenariosPage />} />
        <Route
          path="/scenarios/defend-the-find"
          element={<DefendTheFindPage />}
        />
        <Route path="/scenarios/skirmish" element={<SkirmishPage />} />
        <Route
          path="/scenarios/wyrdstone-hunt"
          element={<WyrdstoneHuntPage />}
        />
        <Route path="/scenarios/breakthrough" element={<BreakthroughPage />} />
        <Route path="/scenarios/street-fight" element={<StreetFightPage />} />
        <Route
          path="/scenarios/chance-encounter"
          element={<ChanceEncounterPage />}
        />
        <Route
          path="/scenarios/hidden-treasure"
          element={<HiddenTreasurePage />}
        />
        <Route path="/scenarios/occupy" element={<OccupyPage />} />
        <Route
          path="/scenarios/surprise-attack"
          element={<SurpriseAttackPage />}
        />
        <Route path="/scenarios/monster-hunt" element={<MonsterHuntPage />} />
        <Route
          path="/scenarios/wizard-mansion"
          element={<WizardMansionPage />}
        />
        <Route path="/scenarios/treasure-hunt" element={<TreasureHuntPage />} />
        <Route path="/scenarios/street-brawl" element={<StreetBrawlPage />} />
        <Route path="/scenarios/heist" element={<HeistPage />} />
        <Route path="/scenarios/the-pool" element={<ThePoolPage />} />
        <Route path="/scenarios/lost-prince" element={<LostPrincePage />} />
        <Route
          path="/campaign/wyrdstone-selling"
          element={<WyrdstoneSellingPage />}
        />
        <Route path="/campaign/mercenaries" element={<HiredSwordsPage />} />
        <Route path="/campaign/legends" element={<LegendsPage />} />
        <Route
          path="/campaign/dark-gods-invocation"
          element={<DarkGodsInvocationPage />}
        />
        <Route path="/campaign/skills-index" element={<SkillsIndexPage />} />
        <Route path="/skills" element={<SkillsIndexPage />} />
        
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
        
        <Route
          path="magic/magic-of-the-dark-gods"
          element={<DarkGodsInvocationPage />}
        />
        <Route path="/warbands" element={<WarbandsIndexPage />} />
        <Route
          path="/tools/warband-manager"
          element={<WarbandManagerPage />}
        />
        <Route
          path="/tools/warband-manager/:warbandId"
          element={<WarbandDetailPage />}
        />
        <Route path="/changelog" element={<ChangelogPage />} />
        
      </Routes>
    </>
  );
}

export default App;
