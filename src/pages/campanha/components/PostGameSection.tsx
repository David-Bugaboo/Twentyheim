import CollapsibleSection from "../../../components/CollapsibleSection";
import MobileText from "../../../components/MobileText";
import PostGameIntroSection from "./PostGameIntroSection";
import InjuriesAndDeathSection from "./InjuriesAndDeathSection";
import MagicAndPowersSection from "./MagicAndPowersSection";
import ExplorationSection from "./ExplorationSection";
import ExperienceAndLevelSection from "./ExperienceAndLevelSection";
import SellingWarpstoneSection from "./SellingWarpstoneSection";
import SpendingTreasureSection from "./SpendingTreasureSection";

function PostGameSection() {
  return (
    <CollapsibleSection id="a-campanha" title="⚜️ A Campanha ⚜️">
      <div className="bg-[#2a1f1f] p-6 rounded-lg border border-[#382929] mb-6">
        <MobileText
          variant="quote"
          className="text-center text-lg leading-relaxed"
        >
          "Uma batalha é sobrevivência. Uma campanha é destino. Em Mordheim,
          cada jogo não é apenas luta — é história sendo escrita em sangue, ouro
          e Pedra-bruxa. Seu bando evolui, enfraquece, cresce ou morre. Esta é a
          verdadeira natureza de Mordheim: não uma única batalha, mas uma guerra
          sem fim contra a ruína, o tempo, e a própria maldição da cidade."
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
      <SellingWarpstoneSection />
      <SpendingTreasureSection />
    </CollapsibleSection>
  );
}

export default PostGameSection;
