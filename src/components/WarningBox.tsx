import React from "react";

interface WarningBoxProps {
  title: string;
  children: React.ReactNode;
  type?: "warning" | "info" | "error" | "success";
  className?: string;
}

const WarningBox: React.FC<WarningBoxProps> = ({
  title,
  children,
  type = "warning",
  className = "",
}) => {
  const getColors = () => {
    switch (type) {
      case "warning":
        return {
          accentStrip: "#F0C040",
          background: "#5C4B22",
          icon: "⚠",
          titleText: "#FFFFFF",
          bodyText: "#E0E0E0",
        };
      case "info":
        return {
          accentStrip: "#87CEEB",
          background: "#2E4A6B",
          icon: "ℹ",
          titleText: "#FFFFFF",
          bodyText: "#E0E0E0",
        };
      case "error":
        return {
          accentStrip: "#FF6B6B",
          background: "#8B0000",
          icon: "❌",
          titleText: "#FFFFFF",
          bodyText: "#E0E0E0",
        };
      case "success":
        return {
          accentStrip: "#90EE90",
          background: "#2E5A3E",
          icon: "✅",
          titleText: "#FFFFFF",
          bodyText: "#E0E0E0",
        };
      default:
        return {
          accentStrip: "#F0C040",
          background: "#5C4B22",
          icon: "⚠",
          titleText: "#FFFFFF",
          bodyText: "#E0E0E0",
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`
        flex rounded-lg mb-4 overflow-hidden
        ${className}
      `}
      style={{ backgroundColor: colors.background }}
    >
      {/* Left Accent Strip */}
      <div
        className="w-2 flex-shrink-0"
        style={{ backgroundColor: colors.accentStrip }}
      />

      {/* Main Infobox Content */}
      <div className="flex-1 p-4">
        <div className="flex items-start">
          {/* Warning Icon */}
          <div
            className="flex-shrink-0 mr-3 mt-0.5 text-xl font-bold"
            style={{ color: colors.titleText }}
          >
            {colors.icon}
          </div>

          {/* Title and Content */}
          <div className="flex-1">
            <h3
              className="font-bold text-lg mb-2 uppercase tracking-wide"
              style={{ color: colors.titleText }}
            >
              {title}
            </h3>
            <div
              className="text-sm leading-relaxed"
              style={{ color: colors.bodyText }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningBox;
