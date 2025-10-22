import React, { forwardRef } from "react";

interface CollapsibleSectionProps {
  id?: string;
  title: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
  titleVariant?: "h1" | "h2" | "h3" | "h4";
}

const CollapsibleSection = forwardRef<HTMLElement, CollapsibleSectionProps>(
  (
    {
      id,
      title,
      children,
      className = "",
      defaultExpanded = true,
      titleVariant = "h2",
    },
    ref
  ) => {
    return (
      <section ref={ref} id={id} className={`mb-8 ${className}`}>
        {/* Título com linha decorativa */}
        <div className="relative mb-6">
          {typeof title === "string" ? (
            <h2
              className="text-white text-2xl font-bold text-left mb-3"
              style={{
                fontFamily: "Cinzel, serif",
                textTransform: "none",
                letterSpacing: "0.05em",
                fontWeight: "700",
                lineHeight: "1.2",
              }}
            >
              <span
                className="text-3xl inline-block mr-1"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                {title.charAt(0)}
              </span>
              {title.slice(1)}
            </h2>
          ) : (
            <div className="text-left mb-3">{title}</div>
          )}

          {/* Linha decorativa */}
          <div className="flex items-center justify-start">
            <div className="w-full h-px bg-gray-400"></div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="space-y-4">{children}</div>
      </section>
    );
  }
);

CollapsibleSection.displayName = "CollapsibleSection";

export default CollapsibleSection;
