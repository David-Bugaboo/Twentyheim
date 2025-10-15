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
            focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[#d4af37]/30
            ${
              button.disabled
                ? "bg-[#4a2b2b] text-[#e6d5d5] opacity-50 cursor-not-allowed"
                : "bg-[#7a1c1c] text-white hover:bg-[#922020] active:scale-[0.99]"
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
