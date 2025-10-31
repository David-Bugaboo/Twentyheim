import { useState } from "react";

interface CollapsibleImageProps {
  src: string;
  alt: string;
  imgClassName?: string;
  defaultCollapsed?: boolean;
}

function CollapsibleImage({ src, alt, imgClassName, defaultCollapsed = false }: CollapsibleImageProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="mt-8 mb-6">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full text-left mb-2 text-green-400 hover:text-green-300 transition-colors"
      >
        <span className="text-sm font-medium">
          {isCollapsed ? "▶ Mostrar Imagem" : "▼ Ocultar Imagem"}
        </span>
      </button>
      {!isCollapsed && (
        <img src={src} alt={alt} className={imgClassName} />
      )}
    </div>
  );
}

export default CollapsibleImage;


