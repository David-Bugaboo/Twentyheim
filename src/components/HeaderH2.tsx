import React from "react";

interface HeaderH2Props {
  children: React.ReactNode;
  className?: string;
}

const HeaderH2: React.FC<HeaderH2Props> = ({ children, className = "" }) => {
  return (
    <h2
      className={`text-green-300 text-xl font-bold text-left mb-2 ${className}`}
      style={{
        fontFamily: "Cinzel, serif",
        textTransform: "none",
        letterSpacing: "0.05em",
        fontWeight: "600",
        lineHeight: "1.3",
      }}
    >
      {children}
    </h2>
  );
};

export default HeaderH2;
