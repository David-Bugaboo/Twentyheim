import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";

import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import PageTitle from "../../components/PageTitle";

function PowersPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Habilidades</PageTitle>
            <MobileText>
              Os poderes são habilidades especiais que as figuras podem aprender
              e usar durante o jogo. Cada poder tem um custo de ativação,
              efeitos específicos e pode ser usado uma vez por jogo, a menos que
              especificado de outra forma.
            </MobileText>
            <HeaderH1>A anatomia de uma habilidade</HeaderH1>
            <HeaderH2>Nome</HeaderH2>
            <MobileText>
              O nome da habilidade, único e marcante para que seja evocativo dos
              seus efeitos.
            </MobileText>
            <HeaderH2>Gatilho</HeaderH2>
            <MobileText>
              O gatilho que permite o uso da habilidade. Lembre-se de que no
              caso de múltiplas habilidades com o mesmo gatilho usadas ao mesmo
              tempo, o jogador que está ativando atualmente escolhe a ordem de
              resolução das habilidades.
            </MobileText>
            <HeaderH2>Descrição</HeaderH2>
            <MobileText>
              A descrição da habilidade e seus efeitos mais específicos, como
              quanto de dado causa, o que faz com alvos que atinge e etcétera.
              Pode ser uma descrição detalhada do efeito da habilidade.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default PowersPage;
