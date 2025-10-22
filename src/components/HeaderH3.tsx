import React from "react";

interface HeaderH3Props {
  children: React.ReactNode;
  className?: string;
}

const HeaderH3: React.FC<HeaderH3Props> = ({ children, className = "" }) => {
  return (
    <h3
      className={`text-white text-lg font-semibold text-left mb-2 ${className}`}
      style={{
        fontFamily: "Cinzel, serif",
        textTransform: "none",
        letterSpacing: "0.05em",
        fontWeight: "600",
        lineHeight: "1.4",
      }}
    >
      {children}
    </h3>
  );
};

export default HeaderH3;
