import AreaEffectPowerCards from "../../components/AreaEffectPowerCards";
import CornerDecoration from "../../components/CornerDecoration";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import PageTitle from "../../components/PageTitle";

function PowersPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
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
            <HeaderH2>Nome</HeaderH2>O nome da habilidade, único e marcante para
            que seja evocativa dos seus efeitos.
            <HeaderH2>Palavras-Chave</HeaderH2>
            Assim como nas magias, poderes também tem palavras-chave que ajudam
            a entender como ele funciona, quem ou que área afeta e os momentos
            de ativá-los.
            <HeaderH2>Descrição</HeaderH2>A descrição da habilidade e seus
            efeitos mais específicos, como quanto de dado causa, o que faz com
            alvos que atinge e etcetera.
            <HeaderH1>LISTA DE PALAVRAS-CHAVE</HeaderH1>
            <HeaderH3>DESENCADEADO(GATILHO)</HeaderH3>
            Essa habilidade deve ser desencadeada pelo (GATILHO).
            <HeaderH3>NA ATIVAÇÃO</HeaderH3>
            Essa habilidad esó pode ser usada durante a ativação do usuário da
            habilidade, a qualquer momento dela.
            <HeaderH3>AÇÃO</HeaderH3>
            Essa habilidade exige o gasto de uma ação para ser utilizada.
            <HeaderH3>ÁREAS DE EFEITO (TIPO)</HeaderH3>
            <MobileText>
              Posicione o tipo de área de efeito em algum ponto no alcance da
              habilidade. Todas as figuras sob a área de efeito são afetadas
              pela habilidade. Na seção de <strong>Downloads</strong> você
              encontrará um arquivo PDF com todos os tipos de template para
              serem impressos e usados no jogo. Recomendo imprimi-los em papel
              comum e plastificá-los.
            </MobileText>
            <AreaEffectPowerCards />
            <HeaderH3>LINHA DE VISÃO</HeaderH3>
            <MobileText>
              Pode afetar qualquer figura para qual o conjurador pode traçar de
              visão.
            </MobileText>
            <HeaderH3>ALCANCE (X)</HeaderH3>
            <MobileText>
              A habilidade afete uma criatura a até (X)cm do ativador.
            </MobileText>
            <HeaderH3>PSICOLÓGICA</HeaderH3>
            <MobileText>
              Essa habilidade é um efeito que mexe com a mente da figura alvo.
              Palavra-chave relevante para interagir com efeitos de outras
              magias e habilidades.
            </MobileText>
            <HeaderH3>TOQUE</HeaderH3>O pode afetar o próprio ativador ou
            qualquer figura que ele esteja em contato de base.{" "}
            <HeaderH3>ILUSÃO</HeaderH3>
            Habilidades que manipulam a percepção das figuras inimigas.
            Palavra-chave relevante para interagir com efeito de outras magias e
            habilidades.
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default PowersPage;
