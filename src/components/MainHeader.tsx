import React from "react";

interface MainHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({ children, className = "" }) => {
  return (
    <h1
      className={`text-white text-5xl font-bold text-center mb-8 ${className}`}
      style={{
        fontFamily: "Cinzel, serif",
        textTransform: "none",
        letterSpacing: "0.1em",
        fontWeight: "900",
        lineHeight: "1.1",
      }}
    >
      <span
        className="text-6xl inline-block mr-2"
        style={{ fontFamily: "Cinzel, serif" }}
      >
        {typeof children === "string" ? children.charAt(0) : ""}
      </span>
      {typeof children === "string" ? children.slice(1) : children}
    </h1>
  );
};

export default MainHeader;
