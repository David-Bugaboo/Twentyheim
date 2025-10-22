import React from "react";

interface HeaderH4Props {
  children: React.ReactNode;
  className?: string;
}

const HeaderH4: React.FC<HeaderH4Props> = ({ children, className = "" }) => {
  return (
    <h4
      className={`text-white text-base font-medium text-left mb-1 ${className}`}
      style={{
        fontFamily: "Cinzel, serif",
        textTransform: "none",
        letterSpacing: "0.05em",
        fontWeight: "500",
        lineHeight: "1.4",
      }}
    >
      {children}
    </h4>
  );
};

export default HeaderH4;
