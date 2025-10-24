import React, { useState } from "react";

interface RulesTableOfContentsProps {
  tableOfContents: Array<{
    id: string;
    label: string;
    type: string;
    ref?: React.RefObject<HTMLDivElement | null>;
  }>;
  onItemClick: (item: any) => void;
}

const RulesTableOfContents: React.FC<RulesTableOfContentsProps> = ({
  tableOfContents,
  onItemClick,
}) => {
  const [showMobileTOC, setShowMobileTOC] = useState(false);

  const handleTOCItemClick = (item: any) => {
    onItemClick(item);
    setShowMobileTOC(false);
  };

  return (
    <>
      {/* Desktop Table of Contents - sempre visível à direita */}
      <div className="hidden md:block fixed right-0 top-0 h-full w-80 z-40">
        <div className="h-full bg-[#121212] border-l border-green-500/40 overflow-y-auto">
          <div className="p-6">
            <h2
              className="text-green-300 text-xl font-bold leading-tight tracking-[-0.015em] mb-6"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Índice
            </h2>
            <div className="space-y-3">
              {tableOfContents.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-green-900/10 px-4 py-3 rounded-lg cursor-pointer hover:bg-green-800/20 transition-colors"
                  onClick={() => handleTOCItemClick(item)}
                >
                  <p className="text-white text-base font-normal leading-normal flex-1">
                    {item.label}
                  </p>
                  <div className="shrink-0">
                    <div className="text-green-300 flex size-6 items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Table of Contents - botão para mostrar */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowMobileTOC(!showMobileTOC)}
          className="bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-bold shadow-lg"
        >
          Índice
        </button>
      </div>

      {/* Mobile Table of Contents - overlay */}
      {showMobileTOC && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#121212] overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2
                className="text-green-300 text-xl font-bold leading-tight tracking-[-0.015em]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Índice
              </h2>
              <button
                onClick={() => setShowMobileTOC(false)}
                className="text-white hover:text-green-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {tableOfContents.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-green-900/20 px-4 py-3 rounded-lg cursor-pointer hover:bg-green-800/30 transition-colors"
                  onClick={() => handleTOCItemClick(item)}
                >
                  <p className="text-white text-base font-normal leading-normal flex-1 truncate">
                    {item.label}
                  </p>
                  <div className="shrink-0">
                    <div className="text-green-300 flex size-6 items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RulesTableOfContents;
