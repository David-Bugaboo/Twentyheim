import React from "react";
import MobileText from "../../../components/MobileText";
import type { BaseFigure } from "../../../types/base-figure.entity";

type AvailableFiguresSectionReadOnlyProps = {
  baseFigureGroups: Array<{ title: string; items: BaseFigure[] }>;
};

export const AvailableFiguresSectionReadOnly: React.FC<AvailableFiguresSectionReadOnlyProps> = ({
  baseFigureGroups,
}) => {
  const allFigures = baseFigureGroups;

  if (allFigures.length === 0) {
    return (
      <MobileText className="text-sm text-gray-400">
        Nenhuma figura disponível.
      </MobileText>
    );
  }

  return (
    <div className="space-y-4">
      {allFigures.map(group => (
        <div key={group.title} className="space-y-2">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-green-300">
            {group.title}
          </h4>
          <div className="space-y-2">
            {group.items.map(figure => (
              <div
                key={figure.id ?? figure.slug}
                className="rounded border border-green-800/40 bg-[#101010] p-3 text-sm text-gray-200"
              >
                <div className="font-semibold text-green-200">
                  {figure.name ?? "Sem nome"}
                </div>
                {figure.role && (
                  <div className="mt-1 text-xs text-gray-400">
                    {figure.role}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

