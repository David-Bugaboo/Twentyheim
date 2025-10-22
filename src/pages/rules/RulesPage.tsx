import MobileLayout from "../../components/MobileLayout";

import WarbandCreationSection from "./components/WarbandCreationSection";
import CombatSystemSection from "./components/CombatSystemSection";
import ActionsSection from "./components/ActionsSection";
import { useTOC } from "../../context/table-of-contents.context";
import { useEffect, useState } from "react";
import RulesIntroSection from "./components/RulesIntroSection";

function RulesPage() {
  const { toc } = useTOC();
  const [tableOfContents] = useState(
    toc.find((item: any) => item.path === "/rules")?.sections || []
  );

  useEffect(() => {}, [tableOfContents]);
  return (
    <MobileLayout title="As Regras da Ruína" backButtonPath="/">
      <br />
      <div className="space-y-6">
        <span
          ref={
            tableOfContents.find((item: any) => item.id === "introducao")?.ref
          }
        />
        <RulesIntroSection />
        <span
          ref={
            tableOfContents.find((item: any) => item.id === "criacao-de-bando")
              ?.ref
          }
        />
        <WarbandCreationSection />
        <CombatSystemSection />
        <span
          ref={
            tableOfContents.find(
              (item: any) => item.id === "sistema-de-combate"
            )?.ref
          }
        />
        <ActionsSection />
        <span
          ref={tableOfContents.find((item: any) => item.id === "acoes")?.ref}
        />
      </div>
    </MobileLayout>
  );
}

export default RulesPage;
