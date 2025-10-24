import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import MobileSection from "../../../components/MobileSection";
import MobileText from "../../../components/MobileText";
import HeaderH2 from "../../../components/HeaderH2";
import GenericTable from "../../../components/GenericTable";
import WarningBox from "../../../components/WarningBox";
import QuickNavigation from "../../../components/QuickNavigation";

export default function GreenskinLoresPage() {
  const navigate = useNavigate();

  const navigationSections = [
    { id: "intro", title: "Magia Pele-Verde - O Poder do WAAAGH!", level: 0 },
    { id: "poder-cabras", title: "O Poder dos CABRAS!", level: 0 },
    { id: "tradicoes", title: "Tradições Peles-Verdes", level: 0 },
    { id: "big-waaagh", title: "Tradição do Grande WAAAGH!", level: 1 },
  ];

  const damageData = [
    { failedBy: "1-4", damage: "1" },
    { failedBy: "5-9", damage: "2" },
    { failedBy: "10-19", damage: "3" },
    { failedBy: "20+", damage: "5" },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Magia Pele-Verde - O Poder do WAAAGH!</PageTitle>
            </div>

            <MobileText className="mb-4">
              Xamãs Peles-Verdes não escrevem suas magias em grimórios. Em vez
              disso, Xamãs consomem vastas quantidades de cogumelos alucinógenos
              que induzem visões surreais de seus melhores amigos para sempre:
              os deuses Peles-Verdes, Gork e Mork. Através destas visões, os
              Xamãs adquirem o conhecimento que precisam para conjurar suas
              magias. Este relacionamento próximo com seus deuses é sagrado e
              zelosamente guardado: Xamãs vão 'conversar' tão frequentemente
              quanto possível com Gork e Mork, e amaldiçoarão aqueles que
              atrapalham.
            </MobileText>

            <MobileText className="mb-4">
              Consequentemente, interagir com Xamãs é estranho: se não estão sob
              influência alucinógena, estão confusos por anos de tais visões.
              São frequentemente desconfiados dos feitos de não-Xamãs
              brutamontes e ciumentos de seus pares. De fato, muitas vezes uma
              simples vanglória de um vínculo mais forte com Gork e Mork mandou
              Xamãs rivais, e suas tribos, para a garganta uns dos outros.
              Waaagh! e devastação seguem.
            </MobileText>
            <div
              id="poder-cabras"
              className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 mb-6"
            >
              <HeaderH2 className="text-green-300 mb-4">
                O Poder dos CABRAS!
              </HeaderH2>

              <MobileText className="mb-4">
                Magias Orcs, embora extremamente poderosas, têm classes de
                dificuldade muito altas. Elas parecem impossíveis de conjurar à
                primeira vista, mas a mecânica única de suas magias é o que as
                torna poderosas:
              </MobileText>

              <div className="bg-black/30 border border-green-500/40 rounded p-4 mb-4">
                <MobileText className="mb-2">
                  • Para cada <strong>goblin ou orc a até 15cm</strong> de um
                  Xamã Orc, ele ganha um <strong>+1</strong> em sua rolagem de
                  conjuração
                </MobileText>
                <MobileText className="mb-2">
                  • Um <strong>Warboz</strong> ou figura com o aprimoramento{" "}
                  <strong>Big Un'</strong> fornece <strong>+2</strong> na
                  rolagem de conjuração do xamã devido à energia extra que
                  fornecem
                </MobileText>
                <MobileText className="mb-2">
                  • Sempre que o Orc Warboz usa o poder{" "}
                  <strong>WAAAAAGH!</strong>, estes bônus na rolagem de
                  conjuração são <strong>DOBRADOS</strong>
                </MobileText>
                <MobileText>
                  • Quando um xamã <strong>falha</strong> ao conjurar uma magia,{" "}
                  <strong>
                    tanto o xamã QUANTO cada figura que forneceu um bônus de
                    conjuração
                  </strong>{" "}
                  sofrem dano de acordo com a tabela abaixo
                </MobileText>
              </div>

              <GenericTable data={damageData} scrollable={false} />

              <WarningBox type="error" title="FALHA CRÍTICA">
                Se um Ork rolar <strong>1</strong> em uma Rolagem de Conjuração,
                cada figura que sofreu o dano por falhar ao conjurar também
                ganha uma <strong>Ficha de Atordoamento</strong> e sofre{" "}
                <strong>3 pontos de dano extra</strong>, conforme as energias
                turbulentas de puro poder memético derretem seus cérebros. Este
                efeito é <strong>ignorado</strong> no turno em que o Orc Chefaum
                usa a habilidade WAAAAAAAGH!
              </WarningBox>
            </div>

            <div id="tradicoes">
              <HeaderH2>Tradições Peles-Verdes</HeaderH2>
            </div>

            <div id="big-waaagh" className="mt-6 flex justify-center">
              <button
                onClick={() => navigate("/magic/greenskin/big-waaagh")}
                className="w-full px-4 py-3 rounded-md transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500/30 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white active:scale-[0.99]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Tradição do Grande WAAAGH!
              </button>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
