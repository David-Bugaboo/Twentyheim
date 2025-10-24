import React from "react";

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, className = "" }) => {
  return (
    <h1
      className={`text-green-300 text-3xl md:text-5xl font-bold text-center mb-8 ${className}`}
      style={{
        fontFamily: "Cinzel, serif",
        textTransform: "none",
        letterSpacing: "0.1em",
        fontWeight: "900",
        lineHeight: "1.1",
      }}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
