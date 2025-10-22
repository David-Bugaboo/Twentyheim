import { useEffect, useState } from "react";

// Importar as imagens do footer
import dwarfFooter from "../assets/footer/dwarf-footer.png";
import sigmarSisterFooter from "../assets/footer/sigmar-sister-footer.png";

const CornerDecoration = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    // Array com as imagens disponíveis
    const images = [dwarfFooter, sigmarSisterFooter];

    // Selecionar uma imagem aleatória
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  }, []);

  if (!selectedImage) return null;

  return (
    <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 pointer-events-none z-0 opacity-40">
      <img
        src={selectedImage}
        alt="Decoração de canto"
        className="w-full h-full object-contain object-bottom-right"
      />
    </div>
  );
};

export default CornerDecoration;
