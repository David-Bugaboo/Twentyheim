import React from "react";
import { useNavigate } from "react-router-dom";

interface NavigationButton {
  label: string;
  path: string;
  disabled?: boolean;
}

interface MobileNavigationButtonsProps {
  buttons: NavigationButton[];
  className?: string;
}

const MobileNavigationButtons: React.FC<MobileNavigationButtonsProps> = ({
  buttons,
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <div className={`space-y-3 ${className}`}>
      {buttons.map((button) => (
        <button
          key={button.path}
          onClick={() => !button.disabled && navigate(button.path)}
          disabled={button.disabled}
          className={`
            w-full px-4 py-3 rounded-md transition-all duration-150 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500/30
            ${
              button.disabled
                ? "bg-gray-600/20 border border-gray-500/40 text-gray-400 opacity-50 cursor-not-allowed"
                : "bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white active:scale-[0.99]"
            }
          `}
          style={{ fontFamily: "Cinzel, serif" }}
        >
          <span className="text-sm tracking-wide">{button.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileNavigationButtons;
