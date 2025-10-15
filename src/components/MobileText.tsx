import React from "react";

interface MobileTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "body" | "heading" | "quote" | "small";
  style?: React.CSSProperties;
}

const MobileText: React.FC<MobileTextProps> = ({
  children,
  className = "",
  variant = "body",
  style = {},
}) => {
  const baseClasses = "text-white";

  const variantClasses = {
    body: "text-base font-normal leading-normal",
    heading: "text-lg font-bold leading-tight tracking-[-0.015em]",
    quote: "text-base font-normal leading-normal italic text-[#b89d9d]",
    small: "text-sm font-normal leading-normal text-[#b89d9d]",
  };

  const getFontFamily = () => {
    if (variant === "heading") {
      return "Cinzel, serif";
    }
    return undefined;
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ fontFamily: getFontFamily() }}
    >
      {children}
    </div>
  );
};

export default MobileText;
