import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import CornerDecoration from "../../components/CornerDecoration";

function RitualsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Rituais</PageTitle>

            <MobileText>
              Magias com a tag RITUAL e poderes com a palavra-chave OFÍCIO tem
              efeitos que se estendem para além das batalhas. Estes efeitos são
              aplicados durante a sequência pós-jogo, podendo afetar a
              recuperação, o crescimento, ou o destino do bando. Conjure a magia
              ou ative o poder como normal, sem consequencias para a falha, mas
              sem poder forçar para melhorar a rolagem. Uma figura pode tentar
              ativar cada magia ou poder com as palavras-chave adequadas uma vez
              apenas.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default RitualsPage;
