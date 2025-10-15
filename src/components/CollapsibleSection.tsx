import React, { useState } from "react";
import MobileText from "./MobileText";

interface CollapsibleSectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  children,
  className = "",
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id={id} className={`mb-6 ${className}`}>
      <div className="relative">
        <button
          onClick={toggleExpanded}
          className="w-full flex items-center justify-between py-3 hover:bg-[#2a1f1f] hover:bg-opacity-30 rounded transition-colors group"
        >
          <h2
            className="text-white text-xl font-bold leading-tight tracking-[-0.015em] text-left flex-1"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            {title}
          </h2>
          <div className="text-white flex items-center ml-4 opacity-70 group-hover:opacity-100 transition-opacity">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="currentColor"
              viewBox="0 0 256 256"
              className={`transform transition-transform duration-200 ${
                isExpanded ? "rotate-180" : "rotate-0"
              }`}
            >
              <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          </div>
        </button>
        <hr className="border-[#382929] mt-2" />
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {children}
        </div>
      )}
    </section>
  );
};

export default CollapsibleSection;
