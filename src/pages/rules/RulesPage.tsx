import MobileHeroHeader from "../../components/MobileHeroHeader";
import MobileLayout from "../../components/MobileLayout";
import RulesIntroSection from "./components/RulesIntroSection";
import WarbandCreationSection from "./components/WarbandCreationSection";
import CombatSystemSection from "./components/CombatSystemSection";
import ActionsSection from "./components/ActionsSection";
import headerImage from "../../assets/header-art/ai-art-generation-v0-iqga0gdkll5c1.png";

function RulesPage() {
  const sections = [
    { id: "introducao", label: "Introdução", type: "Seção" },
    { id: "criacao-de-bando", label: "Criação de Bando", type: "Seção" },
    { id: "sistema-de-combate", label: "Sistema de Combate", type: "Seção" },
    { id: "acoes", label: "Ações", type: "Seção" },
    { id: "a-campanha", label: "A Campanha", type: "Seção" },
  ];

  return (
    <MobileLayout
      title="As Regras da Ruína"
      backButtonPath="/"
      tableOfContents={sections}
    >
      <MobileHeroHeader imageUrl={headerImage} title="As Regras do Jogo" />
      <br />
      <div className="space-y-6">
        <RulesIntroSection />
        <WarbandCreationSection />
        <CombatSystemSection />
        <ActionsSection />
      </div>
    </MobileLayout>
  );
}

export default RulesPage;
