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
          accentStrip: "#10B981", // green-500
          background: "rgba(6, 78, 59, 0.2)", // green-900/20
          border: "rgba(16, 185, 129, 0.4)", // green-500/40
          icon: "⚠",
          titleText: "#10B981", // green-500
          bodyText: "#D1FAE5", // green-100
        };
      case "info":
        return {
          accentStrip: "#10B981", // green-500
          background: "rgba(6, 78, 59, 0.2)", // green-900/20
          border: "rgba(16, 185, 129, 0.4)", // green-500/40
          icon: "ℹ",
          titleText: "#10B981", // green-500
          bodyText: "#D1FAE5", // green-100
        };
      case "error":
        return {
          accentStrip: "#10B981", // green-500
          background: "rgba(6, 78, 59, 0.2)", // green-900/20
          border: "rgba(16, 185, 129, 0.4)", // green-500/40
          icon: "❌",
          titleText: "#10B981", // green-500
          bodyText: "#D1FAE5", // green-100
        };
      case "success":
        return {
          accentStrip: "#10B981", // green-500
          background: "rgba(6, 78, 59, 0.2)", // green-900/20
          border: "rgba(16, 185, 129, 0.4)", // green-500/40
          icon: "✅",
          titleText: "#10B981", // green-500
          bodyText: "#D1FAE5", // green-100
        };
      default:
        return {
          accentStrip: "#10B981", // green-500
          background: "rgba(6, 78, 59, 0.2)", // green-900/20
          border: "rgba(16, 185, 129, 0.4)", // green-500/40
          icon: "⚠",
          titleText: "#10B981", // green-500
          bodyText: "#D1FAE5", // green-100
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`
        flex rounded-lg mb-4 overflow-hidden border
        bg-green-900/20 border-green-500/40
        ${className}
      `}
    >
      {/* Left Accent Strip */}
      <div className="w-2 flex-shrink-0 bg-green-500" />

      {/* Main Infobox Content */}
      <div className="flex-1 p-4">
        <div className="flex items-start">
          {/* Warning Icon */}
          <div className="flex-shrink-0 mr-3 mt-0.5 text-xl font-bold text-green-500">
            {colors.icon}
          </div>

          {/* Title and Content */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2 uppercase tracking-wide text-green-500">
              {title}
            </h3>
            <div className="text-sm leading-relaxed text-green-100">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningBox;
