import React from "react";

type CollapsibleSectionProps = {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
};

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  expanded,
  onToggle,
  children,
  className = "",
}) => (
  <div className={`rounded border border-green-800/40 bg-[#101010] p-3 ${className}`}>
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between text-left text-green-200"
    >
      <span className="text-sm font-semibold uppercase tracking-wide">
        {title}
      </span>
      <span className="text-xl leading-none">{expanded ? "−" : "+"}</span>
    </button>

    {expanded ? <div className="mt-3 space-y-3">{children}</div> : null}
  </div>
);

