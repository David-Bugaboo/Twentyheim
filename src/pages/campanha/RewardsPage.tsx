import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import CornerDecoration from "../../components/CornerDecoration";

function RewardsPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <CornerDecoration />
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Gastando Coroas</PageTitle>

            <MobileText>
              Se você enviou um héroi ou campeão para vender seus fragmentos de
              pedra-bruxa, ou um deles conseguiu um bom saque explorando as
              ruínas, esse é o momento de gastar suas coroas.
            </MobileText>

            <HeaderH1>Rearmar-se</HeaderH1>
            <MobileText>
              Quaisquer número de items comuns podem ser comprados pelos seus
              custos normais. Se o jogador não tiver uma <strong>Base</strong>,
              não tem onde armazenar items que não possam ser carregados por
              algum membro do bando.
            </MobileText>

            <HeaderH1>Comprar Itens Mágicos</HeaderH1>
            <MobileText>
              Se o jogador tiver enviado seu héroi, campeão ou ambos para
              procurar itens mágicos no mercado negro, ele pode comprar os items
              rolados nesse evento de exploração, com os descontos descritos nas
              regras do evento. Se o jogador não tiver uma <strong>Base</strong>
              , não tem onde armazenar items que não possam ser carregados por
              algum membro do bando.
            </MobileText>

            <HeaderH1>Repor Héroi</HeaderH1>
            <MobileText>
              Se o Héroi do bando morreu durante a fase de ferimentos, ele é
              reposto gratuitamente. As figuras que encabeçam sua facção não
              estão interessadas no fim do seu bando e mandam uma nova figura
              para liderar esse bando de renegados. O Héroi chega no mesmo nível
              do héroi anterior, e o jogador deve rolar os avanços para cada
              nível além do primeiro, e escolher poderes magias e afins, e então
              gastar coroas para equipá-lo.
            </MobileText>

            <HeaderH1>Repor Campeão</HeaderH1>
            <MobileText>
              Se o campeão do bando morreu durante a fase de ferimentos, você
              pode contratar um novo campeão por 100gc. Contudo, ele chega no
              bando com o nível do Héroi - 20, para um minimo de zero. Role
              avanços para cada nivel além do primeiro, e escolha poderes ou
              magias, e então gastar coroas para equipá-lo.
            </MobileText>

            <HeaderH1>Contratar Soldados</HeaderH1>
            <MobileText>
              O jogador pode contratar novos soldados, pelo custo em coroas
              indicado em sua ficha, respeitando os limites de cada tipo de
              soldado e o limite de figuras no bando. Depois, deve gastar coroas
              para equipá-los como normal. Novos soldados sempre começam no
              nível 1.
            </MobileText>

            <HeaderH1>Expansões para a base</HeaderH1>
            <MobileText>
              Caso o bando tenha uma base, o jogador pode gastar coroas para
              comprar expansões para sua base. Note que os efeitos de uma
              expansão só podem ser usados na sequencia pós-jogo seguinte.
              Construção demora, mais ainda quando Skavens apunhalam seus
              pedreiros a cada uma hora.
            </MobileText>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}

export default RewardsPage;
