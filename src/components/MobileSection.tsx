import React from "react";

interface MobileSectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const MobileSection: React.FC<MobileSectionProps> = ({
  id,
  title,
  children,
  className = "",
}) => {
  return (
    <section id={id} className={`mb-6 ${className}`}>
      {title && (
        <h2
          className="text-white text-xl font-bold leading-tight tracking-[-0.015em] mb-4"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          {title}
        </h2>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
};

export default MobileSection;
