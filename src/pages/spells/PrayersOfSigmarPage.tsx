import PageTitle from "../../components/PageTitle";
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH2 from "../../components/HeaderH2";
import GenericTable from "../../components/GenericTable";
import WarningBox from "../../components/WarningBox";
import QuickNavigation from "../../components/QuickNavigation";
import LoreSpellCard from "../../components/LoreSpellCard";
import prayersOfSigmarData from "./data/prayers-of-sigmar.json";

export default function PrayersOfSigmarPage() {
  const navigationSections = [
    { id: "intro", title: "Orações de Sigmar - O Deus Guerreiro", level: 0 },
    {
      id: "caracteristicas",
      title: "Características das Orações de Sigmar",
      level: 0,
    },
    { id: "dano-sagrado", title: "Dano Sagrado ou Profano", level: 0 },
    { id: "ira-deuses", title: "Ira dos Deuses", level: 0 },
    { id: "oracoes", title: "Orações de Sigmar", level: 0 },
    ...prayersOfSigmarData.map((prayer, index) => ({
      id: `prayer-${index}`,
      title: prayer.name,
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
        "Sua Impertinencia me Irrita!: O conjurador não pode conjurar a magia que tentou conjurar pelo resto do jogo.",
    },
    {
      roll: "11-14",
      result:
        "Sua Causa é Indigna: O conjurador tem -2 em rolagens de conjuração pelo resto do jogo.",
    },
    {
      roll: "15-16",
      result:
        "Penitencia Cruel: O conjurador tem -2 Vontade pelo resto do jogo.",
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
              <PageTitle>Orações de Sigmar - O Deus-Guerreiro</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "Pela Força e pela Fé!"
            </MobileText>

            <MobileText className="mb-4">
              As Orações de Sigmar são as magias divinas do Deus-Guerreiro,
              canalizadas através de seus sacerdotes devotos. Sigmar é o
              protetor da humanidade, o deus da guerra justa e da retidão. Suas
              orações focam em proteção, cura, e destruição dos inimigos da
              humanidade, especialmente daemônios e criaturas do Caos.
            </MobileText>

            <div id="caracteristicas">
              <HeaderH2>Características das Orações de Sigmar</HeaderH2>
            </div>
            <MobileText className="mb-4">
              Os Sacerdotes de Sigmar são conhecidos por sua devoção à
              humanidade e sua capacidade de canalizar o poder divino do
              Deus-Guerreiro. Eles canalizam o poder de Sigmar através de
              orações e uma fé inabalável na justiça divina. Suas orações
              frequentemente envolvem proteção, cura, e destruição dos inimigos
              da humanidade.
            </MobileText>

            <div id="dano-sagrado">
              <WarningBox type="info" title="Dano Sagrado ou Profano">
                Orações que causam dano geralmente causam dano{" "}
                <strong>sagrado</strong>. Dano sagrado ignora imunidade e
                resistência a dano normal, mágico e elemental.
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

            <div id="oracoes">
              <HeaderH2>Orações de Sigmar</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As orações de Sigmar são conhecidas por sua natureza protetora e
              destrutiva. Elas canalizam o poder divino do Deus-Guerreiro para
              criar efeitos de proteção, cura, e destruição dos inimigos da
              humanidade.
            </MobileText>

            <div className="space-y-6">
              {prayersOfSigmarData.map((prayer, index) => (
                <div key={index} id={`prayer-${index}`}>
                  <LoreSpellCard
                    name={prayer.name}
                    castingNumber={prayer.castingNumber}
                    keywords={prayer.keywords}
                    effect={prayer.effect}
                  />
                </div>
              ))}
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
}
