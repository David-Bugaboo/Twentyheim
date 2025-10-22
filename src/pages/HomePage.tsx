import MobileLayout from "../components/MobileLayout";
import MobileNavigationButtons from "../components/MobileNavigationButtons";
import MobileSection from "../components/MobileSection";
import MobileHeroHeader from "../components/MobileHeroHeader";
import QuoteSection from "../components/QuoteSection";
import headerImage from "../assets/header-art/9ab44e412b8d6632b6c515fa8a0ace15c80d3185.png";

function HomePage() {
  const navigationButtons = [
    { label: "Regras", path: "/rules" },
    { label: "Campanha", path: "/campaign" },
    { label: "Equipamentos e Items Mágicos", path: "/items" },
  ];

  return (
    <>
      <MobileHeroHeader
        imageUrl={headerImage}
        title="A Cidade dos Condenados"
      />
      <MobileLayout title="">
        <br />

        <div className="pb-20">
          <MobileSection>
            {/* Quote */}
            <QuoteSection
              quote="Entrar nos portões vigiados por gárgulas daquele lugar é atravessar os próprios portões da morte!"
              author="Últimas Palavras de um Aventureiro Desconhecido"
              className="mb-6"
            />

            {/* Navigation Buttons */}
            <MobileNavigationButtons buttons={navigationButtons} />

            {/* Coming Soon Label */}
          </MobileSection>
        </div>
      </MobileLayout>
    </>
  );
}

export default HomePage;
