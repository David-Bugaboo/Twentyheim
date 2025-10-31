import React from "react";
import HeaderH2 from "../components/HeaderH2";
import MobileSection from "../components/MobileSection";
import MobileText from "../components/MobileText";
import HeaderH1 from "../components/HeaderH1";

const ChangelogPage: React.FC = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <HeaderH1>Changelog</HeaderH1>
            <HeaderH2>v1.0.0</HeaderH2>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                <MobileText>Site lançado</MobileText>
              </li>
            </ul>
          </MobileSection>
        </div>
      </div>
    </div>
  );
};

export default ChangelogPage;
