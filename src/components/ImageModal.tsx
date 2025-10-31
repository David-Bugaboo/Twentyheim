import React, { useEffect } from "react";

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

function ImageModal({ src, alt, isOpen, onClose }: ImageModalProps) {
  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevenir scroll do body quando modal está aberto
      document.body.style.overflow = "hidden";
      // Prevenir zoom em mobile quando toca duas vezes
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        );
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      // Restaurar viewport
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0"
        );
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Fecha apenas se clicar no backdrop, não na imagem ou botão
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={handleBackdropClick}
      style={{ touchAction: "manipulation" }}
    >
      {/* Botão de fechar */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-2 right-2 md:top-4 md:right-4 z-[60] text-white hover:text-green-300 active:text-green-300 transition-colors bg-black/70 hover:bg-black/90 active:bg-black/90 rounded-full p-2 md:p-2.5"
        style={{
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
          minWidth: "44px",
          minHeight: "44px",
        }}
        aria-label="Fechar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Imagem */}
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg select-none"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        style={{
          touchAction: "manipulation",
          WebkitUserSelect: "none",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
        draggable={false}
      />
    </div>
  );
}

export default ImageModal;
