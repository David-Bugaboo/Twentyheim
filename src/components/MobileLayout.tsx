import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileFooter from "./MobileFooter";

interface MobileLayoutProps {
  title: string;
  backButtonPath?: string;
  tableOfContents?: Array<{
    id: string;
    label: string;
    type: string;
  }>;
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({
  title,
  backButtonPath,
  tableOfContents = [],
  children,
}) => {
  const navigate = useNavigate();
  const [showTOC, setShowTOC] = useState(false);

  const handleBackClick = () => {
    if (backButtonPath) {
      navigate(backButtonPath);
    } else {
      navigate(-1);
    }
  };

  const toggleTOC = () => {
    setShowTOC(!showTOC);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#181111] dark justify-between group/design-root overflow-x-hidden">
      <div>
        {/* Table of Contents */}
        {showTOC && tableOfContents.length > 0 ? (
          <>
            <h2
              className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Table of Contents
            </h2>
            {tableOfContents.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-[#181111] px-4 min-h-14 justify-between cursor-pointer hover:bg-[#2a1f1f] transition-colors"
                onClick={() => {
                  const element = document.getElementById(item.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    setShowTOC(false); // Fecha o TOC após clicar
                  }
                }}
              >
                <p className="text-white text-base font-normal leading-normal flex-1 truncate">
                  {item.label}
                </p>
                <div className="shrink-0">
                  <div className="text-white flex size-7 items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          /* Content */
          <div className="px-4 py-4">{children}</div>
        )}
      </div>

      {/* Footer Navigation */}
      <MobileFooter onToggleTOC={toggleTOC} />
    </div>
  );
};

export default MobileLayout;
