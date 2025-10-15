import MobileLayout from "../components/MobileLayout";
import MobileNavigationButtons from "../components/MobileNavigationButtons";
import MobileText from "../components/MobileText";
import MobileSection from "../components/MobileSection";
import MobileHeroHeader from "../components/MobileHeroHeader";
import headerImage from "../assets/header-art/9ab44e412b8d6632b6c515fa8a0ace15c80d3185.png";

function HomePage() {
  const navigationButtons = [
    { label: "Regras", path: "/rules" },
    { label: "Campanhas", path: "/campaign" },
    
  ];

  return (
    <MobileLayout title="">
      <MobileHeroHeader
        imageUrl={headerImage}
        title="A Cidade dos Condenados"
      />
      <br/>

      <div className="pb-20">
        <MobileSection>
          {/* Quote */}
          <div className="bg-[#2a1f1f] p-6 rounded-lg border border-[#382929] mb-6">
            <MobileText
              variant="quote"
              className="text-center text-lg leading-relaxed"
            >
              "Entrar nos portões vigiados por gárgulas daquele lugar é
              atravessar os próprios portões da morte!"
            </MobileText>
            <MobileText
              variant="small"
              className="text-center mt-3 text-[#8b7355]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              — Últimas Palavras de um Aventureiro Desconhecido
            </MobileText>
          </div>

          {/* Navigation Buttons */}
          <MobileNavigationButtons buttons={navigationButtons} />

          {/* Coming Soon Label */}
          <div className="mt-8 text-center">
            <MobileText
              variant="small"
              className="italic text-[#8b7355]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Em Breve
            </MobileText>
          </div>
        </MobileSection>
      </div>
    </MobileLayout>
  );
}

export default HomePage;
