import { Box } from "@mui/material";
import { HeroSection, HeroContent, PageTitle } from "./PageComponents";
import { useMemo } from "react";
import logoImage from "../assets/images/Wyrdgrave.png";

// Import all header images
import header1 from "../assets/header-art/21ef8615dda8ffc145957aff5273c244_upscayl_4x_high-fidelity-4x.png";
import header2 from "../assets/header-art/686bd98ff6df250e13213d124c975297_upscayl_3x_high-fidelity-4x.png";
import header3 from "../assets/header-art/6f9bb4964d8e7fb18c5f39ef34af39fe.png";
import header4 from "../assets/header-art/874ab363-3678-45ab-84a8-7ffd64527398.png";
import header5 from "../assets/header-art/9ab44e412b8d6632b6c515fa8a0ace15c80d3185.png";
import header6 from "../assets/header-art/ai-art-generation-v0-iqga0gdkll5c1.png";
import header7 from "../assets/header-art/c8f4beee-510a-4fa5-8efb-2a0a87762972.png";

import header9 from "../assets/header-art/f65e63aeb627cb03a85275b14c4c3e614259946b.png";
import header10 from "../assets/header-art/images_upscayl_5x_high-fidelity-4x.png";
import header11 from "../assets/header-art/Mordheim_City_of_the_Damned_Artwork_08_upscayl_5x_high-fidelity-4x.png";
import header12 from "../assets/header-art/Mordheim_City_of_the_Damned_Artwork_09.png";

const headerImages = [
  header1,
  header2,
  header3,
  header4,
  header5,
  header6,
  header7,
  header9,
  header10,
  header11,
  header12,
];

interface HeaderProps {
  title: string;
  subtitle?: string;
}

function Header({ title, subtitle }: HeaderProps) {
  // Always choose a random header image
  const randomHeaderImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * headerImages.length);
    return headerImages[randomIndex];
  }, []);

  return (
    <HeroSection backgroundImage={randomHeaderImage}>
      <HeroContent>
        <Box
          component="img"
          src={logoImage}
          alt="Wyrdgrave"
          sx={{
            maxWidth: "600px",
            width: "80%",
            height: "auto",
            marginBottom: "2rem",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            filter: `
              drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9))
              drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))
              drop-shadow(0 0 40px rgba(212, 175, 55, 0.2))
            `,
            imageRendering: "-webkit-optimize-contrast",
          }}
        />
        <PageTitle variant="h1">{title}</PageTitle>
        {subtitle && (
          <PageTitle
            variant="h4"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 400,
              marginTop: "1rem",
              opacity: 0.9,
            }}
          >
            {subtitle}
          </PageTitle>
        )}
      </HeroContent>
    </HeroSection>
  );
}

export default Header;
