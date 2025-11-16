import React from "react";

interface HeaderH1Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const HeaderH1: React.FC<HeaderH1Props> = ({
  children,
  className = "",
  id,
}) => {
  const isCentered = className.includes("text-center");
  
  return (
    <div className={`mb-6 ${className}`}>
      <h1
        id={id}
        className={`text-green-300 text-2xl font-bold mb-3 ${isCentered ? "text-center" : "text-left"}`}
        style={{
          fontFamily: "Cinzel, serif",
          textTransform: "none",
          letterSpacing: "0.05em",
          fontWeight: "700",
          lineHeight: "1.2",
        }}
      >
        <span
          className={`text-3xl inline-block ${isCentered ? "" : "mr-1"}`}
          style={{ fontFamily: "Cinzel, serif" }}
        >
          {children}
        </span>
      </h1>

      {/* Linha decorativa completa */}
      <div className="w-full h-px bg-green-500/40 mt-3"></div>
    </div>
  );
};

export default HeaderH1;
