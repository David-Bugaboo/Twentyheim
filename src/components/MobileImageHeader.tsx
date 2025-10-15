import React from 'react';

interface MobileImageHeaderProps {
  src: string;
  alt: string;
  className?: string;
}

const MobileImageHeader: React.FC<MobileImageHeaderProps> = ({ 
  src, 
  alt, 
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover rounded-lg"
        style={{ maxHeight: '300px' }}
      />
    </div>
  );
};

export default MobileImageHeader;
