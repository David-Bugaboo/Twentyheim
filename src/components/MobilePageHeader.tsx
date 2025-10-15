import React from "react";

interface MobilePageHeaderProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  className?: string;
}

const MobilePageHeader: React.FC<MobilePageHeaderProps> = ({
  imageSrc,
  imageAlt,
  title,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Header Image */}
      <div className="w-full">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto object-cover"
          style={{ maxHeight: "250px" }}
        />
      </div>

      {/* Title */}
      <div className="bg-[#181111] px-4 py-3">
        <h1
          className="text-white text-xl font-bold leading-tight tracking-[-0.015em] text-center"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

export default MobilePageHeader;
