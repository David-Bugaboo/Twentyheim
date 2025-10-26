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
              Habilidades são efeitos especiais que são aplicados a uma figura, permitindo que ela execute feitos ainda maiores em combate. Habilidades são ganhas a medida que a figura evolui, fazendo parte do seu crescimento durante uma campanha.
            </MobileText>
            <HeaderH1>A anatomia de uma habilidade</HeaderH1>
            <HeaderH2>Nome</HeaderH2>
            <MobileText>
              O nome da habilidade, único e marcante para que seja evocativo dos
              seus efeitos.
            </MobileText>
            <HeaderH2>Gatilho</HeaderH2>
            <HeaderH2>Descrição</HeaderH2>
            <MobileText>
              A descrição da habilidade e seus efeitos mais específicos, como o que é melhorado no personagem.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default PowersPage;
