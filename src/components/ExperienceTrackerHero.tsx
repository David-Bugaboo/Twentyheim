import React from "react";

interface Props {
  xp: number;
  onChange: (xp: number) => void;
}

const HERO_TOTAL = 90;
const HERO_HIGHLIGHTED: number[] = [
  2, 4, 6, 8, 11, 14, 17, 20, 24, 28, 32, 36, 41, 46, 51, 57, 63, 69, 76, 83,
  90,
];
const heroHighlightedSet = new Set(HERO_HIGHLIGHTED);

const ExperienceTrackerHero: React.FC<Props> = ({ xp, onChange }) => {
  const clamp = (v: number) => Math.max(0, Math.min(HERO_TOTAL, v | 0));
  const dec = () => onChange(clamp(xp - 1));
  const inc = () => onChange(clamp(xp + 1));

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold mb-3" style={{ color: "#8fbc8f" }}>
        EXPERIÊNCIA
      </h4>
      <div className="flex items-center gap-3 mb-3">
        <button
          type="button"
          className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs"
          onClick={dec}
        >
          -
        </button>
        <input
          type="number"
          className="w-20 bg-[#1f1f1f] border border-gray-600 rounded px-2 py-1 text-white text-center"
          value={xp}
          onChange={(e) => onChange(clamp(parseInt(e.target.value) || 0))}
          min={0}
          max={HERO_TOTAL}
        />
        <button
          type="button"
          className="px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-white text-xs"
          onClick={inc}
        >
          +
        </button>
      </div>
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: HERO_TOTAL }).map((_, i) => {
          const idx = i + 1;
          const checked = xp >= idx;
          const isSpecial = heroHighlightedSet.has(idx);
          const border = isSpecial
            ? checked
              ? "border-green-400"
              : "border-green-500"
            : checked
            ? "border-white"
            : "border-gray-400";
        const bg = checked ? (isSpecial ? "bg-green-300" : "bg-white") : "";
          return (
            <div
              key={idx}
              className={`w-4 h-4 border ${border} ${bg}`}
              style={{ boxShadow: checked ? "0 0 0 1px #000 inset" : undefined }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceTrackerHero;


