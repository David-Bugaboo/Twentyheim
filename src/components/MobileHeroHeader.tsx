import React from "react";

interface MobileHeroHeaderProps {
  imageUrl: string;
  title?: string;
  className?: string;
}

const MobileHeroHeader: React.FC<MobileHeroHeaderProps> = ({
  imageUrl,
  title,
  className = "",
}) => {
  return (
    <div className={`relative w-full mb-6 ${className}`}>
      <div
        className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#181111] min-h-80 rounded-lg"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {title ? (
          <div className="bg-[rgba(0,0,0,0.35)] backdrop-blur-[2px] px-4 py-3 rounded-b-lg">
            <h1
              className="text-white text-xl font-bold leading-tight tracking-[-0.015em] text-center"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              {title}
            </h1>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MobileHeroHeader;
