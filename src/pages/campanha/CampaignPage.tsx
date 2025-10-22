import MobileLayout from "../../components/MobileLayout";
import MobileHeroHeader from "../../components/MobileHeroHeader";
import headerImage from "../../assets/header-art/6f9bb4964d8e7fb18c5f39ef34af39fe.png";

import MobileText from "../../components/MobileText";
import PostGameIntroSection from "./components/PostGameIntroSection";
import InjuriesAndDeathSection from "./components/InjuriesAndDeathSection";
import MagicAndPowersSection from "./components/MagicAndPowersSection";
import ExplorationSection from "./components/ExplorationSection";
import ExperienceAndLevelSection from "./components/ExperienceAndLevelSection";
import SellingWyrdstoneSection from "./components/SellingWyrdstoneSection";
import SpendingTreasureSection from "./components/SpendingTreasureSection";


function CampaignPage() {
  

 
  return (
    <MobileLayout title="A Campanha" backButtonPath="/">
      <MobileHeroHeader imageUrl={headerImage} title="A Campanha" />
      <br />
      <div className="space-y-6">
        <div className="bg-[#2a1f1f] p-6 rounded-lg border border-[#382929] mb-6">
          <MobileText
            variant="quote"
            className="text-center text-lg leading-relaxed"
          >
            "Uma batalha é sobrevivência. Uma campanha é destino. Em Mordheim,
            cada jogo não é apenas luta — é história sendo escrita em sangue,
            ouro e Pedra-bruxa. Seu bando evolui, enfraquece, cresce ou morre.
            Esta é a verdadeira natureza de Mordheim: não uma única batalha, mas
            uma guerra sem fim contra a ruína, o tempo, e a própria maldição da
            cidade."
          </MobileText>
        </div>

        <MobileText className="mb-6">
          Mordheim não é travada em uma única tarde de sangue. É uma série de
          batalhas, cada uma deixando cicatrizes, cada uma forjando lendas ou
          criando cadáveres. Uma campanha é a crônica do seu bando — de seus
          primeiros passos hesitantes nas ruínas até sua glória eventual... ou
          extinção inevitável.
          

        </MobileText>
        <PostGameIntroSection />
        <InjuriesAndDeathSection />
        <MagicAndPowersSection />
        <ExplorationSection />
        <ExperienceAndLevelSection />
        <SellingWyrdstoneSection />
        <SpendingTreasureSection />
      </div>
    </MobileLayout>
  );
}

export default CampaignPage;
