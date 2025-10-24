import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import HeaderH2 from "../../../components/HeaderH2";
import GenericTable from "../../../components/GenericTable";
import WarningBox from "../../../components/WarningBox";
import QuickNavigation from "../../../components/QuickNavigation";

export default function DivineLoresPage() {
  const navigate = useNavigate();

  const lores = [
    { name: "Orações de Sigmar", path: "/magic/prayers/sigmar", icon: "" },
    { name: "Orações de Ulric", path: "/magic/prayers/ulric", icon: "" },
  ];

  const navigationSections = [
    { id: "intro", title: "Tradições Divinas - Orações dos Deuses", level: 0 },
    { id: "dano-sagrado", title: "Dano Sagrado ou Profano", level: 0 },
    { id: "ira-deuses", title: "Ira dos Deuses", level: 0 },
    { id: "oracoes-divinas", title: "Orações Divinas", level: 0 },
    ...lores.map((lore, index) => ({
      id: `lore-${index}`,
      title: lore.name,
      level: 1,
    })),
  ];

  const wrathOfGodsData = [
    {
      roll: "1-3",
      result:
        "Visão Sobrenatural: O Deus do conjurador escolhe este momento para conceder-lhe uma visão simbólica mas confusa. O conjurador ganha uma ficha de Atordoamento.",
    },
    {
      roll: "4-7",
      result:
        "Prove Sua Devoção: Algumas orações a mais são necessárias para terminar de conjurar a magia. A ativação do conjurador termina imediatamente, e a magia será ativada durante o início da próxima ativação do conjurador, sem outras ações necessárias.",
    },
    {
      roll: "8-10",
      result:
        "Sua Impertinência me Irrita!: O conjurador não pode conjurar a magia que tentou conjurar pelo resto do jogo.",
    },
    {
      roll: "11-14",
      result:
        "Sua Causa é Indigna: O conjurador tem -2 em rolagens de conjuração pelo resto do jogo.",
    },
    {
      roll: "15-16",
      result:
        "Penitência Cruel: O conjurador tem -2 Vontade pelo resto do jogo.",
    },
    {
      roll: "17-18",
      result:
        "Seu Pecado é Imperdoável!: O conjurador sofre 3 pontos de dano sagrado e ganha uma ficha de Atordoamento.",
    },
    {
      roll: "19-20",
      result:
        "Interferência Daemônica: A oração do conjurador é respondida mas não por seu Deus. Role na tabela Maldição de Tzeentch.",
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Tradições Divinas - Orações dos Deuses</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "O Poder Divino dos Deuses"
            </MobileText>

            <MobileText className="mb-4">
              Sacerdotes recebem seu poder através de Devoção e Oração. Como
              tal, suas magias são dadas a eles pelos próprios deuses, e
              filtradas através de seu poder divino, tornam-se muito mais
              seguras. Assim, Sacerdotes não sofrem dano por falhar ao conjurar
              magias, e rolam na tabela <strong>Ira dos Deuses</strong> em vez
              da tabela <strong>Maldição de Tzeentch</strong> ao rolar{" "}
              <strong>1 em uma rolagem de conjuração</strong>.
            </MobileText>

            <MobileText className="mb-4">
              Além disso, como encantamentos complexos não são necessários para
              conjurar estas magias, Sacerdotes podem conjurar enquanto usam
              qualquer tipo de armadura ou escudos, mas tomam uma penalidade de
              -4 quando fazendo-o, e só podem conjurar magia de sua tradição
              principal, sem tradições associadas como outros conjuradores.
            </MobileText>

            <div id="dano-sagrado">
              <WarningBox type="info" title="Dano Sagrado">
                Orações que causam dano geralmente causam dano{" "}
                <strong>sagrado</strong>. Dano sagrado ignora imunidade a todos
                os danos e efeitos anti-magia contra Daemônios e Mortos-Vivos.
                Contra outras figuras é dano mágico normal.
              </WarningBox>
            </div>

            <div
              id="ira-deuses"
              className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 mb-6"
            >
              <HeaderH2 className="text-green-300 mb-4">
                Ira dos Deuses
              </HeaderH2>

              <MobileText className="mb-4">
                Quando um Sacerdote rola um <strong>1</strong> em uma Rolagem de
                Conjuração, os deuses estão descontentes. Role na tabela Ira dos
                Deuses abaixo para determinar a consequência de seu desagrado:
              </MobileText>

              <GenericTable data={wrathOfGodsData} scrollable={false} />
            </div>
            <div id="oracoes-divinas">
              <HeaderH2>Orações Divinas</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As orações divinas representam o poder direto dos deuses,
              canalizado através de seus sacerdotes devotos. Cada tradição
              divina possui suas próprias características e poderes únicos.
            </MobileText>

            <div className="space-y-4 mb-6">
              {lores.map((lore, index) => (
                <div key={lore.path} id={`lore-${index}`}>
                  <button
                    onClick={() => navigate(lore.path)}
                    className="w-full px-4 py-3 rounded-md transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500/30 bg-green-900/20 border border-green-500/40 hover:bg-green-800/30 hover:border-green-400/60 text-white active:scale-[0.99]"
                    style={{ fontFamily: "Cinzel, serif" }}
                  >
                    {lore.icon} {lore.name}
                  </button>
                </div>
              ))}
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
