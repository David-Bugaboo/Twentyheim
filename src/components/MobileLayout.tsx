import React, { useState } from "react";
import TableOfContents from "./TableOfContents";

interface MobileLayoutProps {
  title: string;
  backButtonPath?: string;
  tableOfContents?: Array<{
    id: string;
    label: string;
    type: string;
    ref?: React.RefObject<null>;
  }>;
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  tableOfContents,
}) => {
  const [showTOC, setShowTOC] = useState(false);

  const handleTOCItemClick = (item: any) => {
    if (item.ref?.current) {
      item.ref.current.scrollIntoView({ behavior: "smooth" });
      setShowTOC(false);
    } else {
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setShowTOC(false);
      }
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#181111] dark group/design-root overflow-x-hidden">
      {/* Table of Contents - sobrepõe o conteúdo */}
      {showTOC && (
        <div className="absolute inset-0 z-50 bg-[#181111] overflow-y-auto">
          <TableOfContents
            tableOfContents={tableOfContents || []}
            onItemClick={handleTOCItemClick}
          />
        </div>
      )}

      {/* Content - sempre renderizado */}
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
