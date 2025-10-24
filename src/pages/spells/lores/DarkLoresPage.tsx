import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import MobileText from "../../../components/MobileText";
import MobileSection from "../../../components/MobileSection";
import HeaderH2 from "../../../components/HeaderH2";
import GenericTable from "../../../components/GenericTable";
import TzeentchCurseTable from "../../../components/TzeentchCurseTable";
import TzeentchGiftsTable from "../../../components/TzeentchGiftsTable";
import QuickNavigation from "../../../components/QuickNavigation";

export default function DarkLoresPage() {
  const navigate = useNavigate();

  const lores = [
    { name: "Tradição do Caos", path: "/magic/dark-lores/chaos", icon: "" },
    {
      name: "Tradição da Necromancia",
      path: "/magic/dark-lores/necromancy",
      icon: "",
    },
    {
      name: "Tradição do Rato Chifrudo",
      path: "/magic/dark-lores/horned-rat",
      icon: "",
    },
    {
      name: "Tradição de Hashut",
      path: "/magic/dark-lores/hashut",
      icon: "",
    },
  ];

  const navigationSections = [
    { id: "intro", title: "Tradições Sombrias - As Artes Proibidas", level: 0 },
    { id: "preco-poder", title: "O Preço do Poder Sombrio", level: 0 },
    { id: "tradicoes-sombrias", title: "Tradições Sombrias", level: 0 },
    ...lores.map((lore, index) => ({
      id: `lore-${index}`,
      title: lore.name,
      level: 1,
    })),
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <MobileSection>
            <div id="intro">
              <PageTitle>Tradições Sombrias - As Artes Proibidas</PageTitle>
            </div>

            <MobileText
              variant="quote"
              className="text-center italic text-lg leading-relaxed mb-6 p-4 bg-green-900/20 border border-green-500/40 rounded-lg text-white"
            >
              "O Poder Corrompido de Dhar"
            </MobileText>

            <MobileText className="mb-4">
              Enquanto a maioria da Magia Arcana é alimentada por um dos Ventos
              da Magia, existem dois tipos de magia que manipulam todos os oito
              ventos de uma só vez. Alta magia, ou Qhaysh, é a magia em sua
              forma mais pura e não diluída. É tão difícil de dominar que apenas
              os Altos Elfos de Ulthuan têm a habilidade de usá-la regularmente.
              Magia sombria, ou Dhar, é a magia em sua forma mais básica e
              corrupta. Se Qhaysh é as oito cores em harmonia, Dhar é as oito
              cores em discordância.
            </MobileText>

            <MobileText className="mb-4">
              É a magia da destruição, dominação e poluição. As Tradições
              Sombrias de magia são baseadas na manipulação de Dhar. Elas são o
              domínio de homens malignos e desesperados, aqueles dispostos a
              arriscar suas vidas e almas por poder. Existem dois tipos
              principais de Tradições Sombrias: magia do Caos e Necromancia.
            </MobileText>

            <div
              id="preco-poder"
              className="bg-green-900/20 border border-green-500/40 rounded-lg p-4 mb-6"
            >
              <HeaderH2 className="text-green-300 mb-4">
                O Preço do Poder Sombrio
              </HeaderH2>

              <MobileText className="mb-4">
                Devido à sua natureza profana e instável, estas magias são mais
                difíceis de conjurar, mesmo que sejam um pouco mais poderosas
                que o normal.{" "}
                <strong>
                  Sempre que uma criatura tenta conjurar uma magia de tradição
                  sombria, com sucesso ou não, ela sofre 1 de dano.
                </strong>{" "}
                Se ela falhar ao conjurar uma magia destas tradições, ela sofre
                mais dano além daquele 1 de dano de acordo com a tabela abaixo:
              </MobileText>

              <GenericTable
                data={[
                  { "Falhou por": "1-4", "Dano Sofrido": "2" },
                  { "Falhou por": "5-9", "Dano Sofrido": "3" },
                  { "Falhou por": "10-19", "Dano Sofrido": "4" },
                  { "Falhou por": "20+", "Dano Sofrido": "7" },
                ]}
                scrollable={false}
              />

              <TzeentchCurseTable />

              <TzeentchGiftsTable />
            </div>
            <div id="tradicoes-sombrias">
              <HeaderH2>Tradições Sombrias</HeaderH2>
            </div>
            <MobileText className="mb-4">
              As tradições sombrias representam o lado mais perigoso e corrupto
              da magia. Aqueles que as praticam arriscam suas almas por poder
              incomparável.
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
