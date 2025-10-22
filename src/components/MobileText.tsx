import React from "react";

interface MobileTextProps {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "body"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "heading"
    | "subheading"
    | "subheading2"
    | "subheading3"
    | "quote"
    | "small";
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
    h1: "text-4xl font-bold leading-tight tracking-[-0.02em] text-[#d4af37]",
    h2: "text-3xl font-bold leading-tight tracking-[-0.015em] text-[#d4af37]",
    h3: "text-2xl font-semibold leading-tight tracking-[-0.01em] text-[#d4af37]",
    h4: "text-xl font-semibold leading-tight tracking-[-0.005em] text-[#d4af37]",
    heading: "text-lg font-bold leading-tight tracking-[-0.015em]",
    subheading:
      "text-base font-semibold leading-tight tracking-[-0.01em] text-[#d4af37]",
    subheading2:
      "text-sm font-semibold leading-tight tracking-[-0.005em] text-[#d4af37]",
    subheading3:
      "text-xs font-semibold leading-tight tracking-[-0.005em] text-[#d4af37] uppercase",
    quote: "text-base font-normal leading-normal italic text-[#b89d9d]",
    small: "text-sm font-normal leading-normal text-[#b89d9d]",
  };

  const getFontFamily = () => {
    if (
      variant === "h1" ||
      variant === "h2" ||
      variant === "h3" ||
      variant === "h4" ||
      variant === "heading" ||
      variant === "subheading"
    ) {
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
