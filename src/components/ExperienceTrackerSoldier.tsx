import React from "react";

interface Props {
  xp: number;
  onChange: (xp: number) => void;
}

const SOLDIER_TOTAL = 14;
const SOLDIER_HIGHLIGHTED: number[] = [2, 5, 9, 14];
const soldierHighlightedSet = new Set(SOLDIER_HIGHLIGHTED);

const ExperienceTrackerSoldier: React.FC<Props> = ({ xp, onChange }) => {
  const clamp = (v: number) => Math.max(0, Math.min(SOLDIER_TOTAL, v | 0));
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
          max={SOLDIER_TOTAL}
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
        {Array.from({ length: SOLDIER_TOTAL }).map((_, i) => {
          const idx = i + 1;
          const checked = xp >= idx;
          const isSpecial = soldierHighlightedSet.has(idx);
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

export default ExperienceTrackerSoldier;


