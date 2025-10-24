
import MobileText from "../../components/MobileText";
import MobileSection from "../../components/MobileSection";
import HeaderH1 from "../../components/HeaderH1";
import HeaderH2 from "../../components/HeaderH2";
import MobileNavigationButtons from "../../components/MobileNavigationButtons";
import QuickNavigation from "../../components/QuickNavigation";

function SkillsIndexPage() {
  // Botões de navegação para cada tipo de habilidade
  const skillTypeButtons = [
    { label: "Habilidades de Combate", path: "/skills/combat" },
    { label: "Habilidades de Atirador", path: "/skills/ranged" },
    { label: "Habilidades Acadêmicas", path: "/skills/academic" },
    { label: "Habilidades de Força", path: "/skills/strength" },
    { label: "Habilidades de Agilidade", path: "/skills/agility" },
    { label: "Irmãs de Sigmar", path: "/skills/sisters-of-sigmar" },
    { label: "Skaven do Clã Enshin", path: "/skills/skaven-enshin" },
    { label: "Saqueadores Homem-Fera", path: "/skills/beastmen-raiders" },
    {
      label: "Caçadores de Tesouro Anões",
      path: "/skills/dwarf-treasure-hunters",
    },
    { label: "Mata-Trolls Anão", path: "/skills/dwarf-troll-slayers" },
    { label: "Engenharia da Montanha", path: "/skills/engineering" },
    { label: "Habilidades Von Carstein", path: "/skills/von-carstein" },
    { label: "Habilidades de Dragão Carmesim", path: "/skills/crimson-dragon" },
    { label: "Habilidades de Lahmia", path: "/skills/lahmia" },
    { label: "Habilidades de Strigoi", path: "/skills/strigoi" },
    { label: "Corsários Druchii", path: "/skills/dark-elf-corsairs" },
    { label: "Habilidades de Geckos", path: "/skills/geckos" },
    { label: "Habilidades de Saúrios", path: "/skills/saurus" },
    { label: "Hordas Orc", path: "/skills/orc-hordes" },
    { label: "Filhos de Hashut", path: "/skills/sons-of-hashut" },
  ];

  const navigationSections = [
    { id: "intro", title: "Índice de Habilidades", level: 0 },
    { id: "como-funcionam", title: "Como Funcionam as Habilidades", level: 0 },
    { id: "tipos-habilidades", title: "Tipos de Habilidades", level: 0 },
    ...skillTypeButtons.map((button, index) => ({
      id: `skill-type-${index}`,
      title: button.label,
      level: 1,
    })),
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <div className="space-y-6">
            <div id="intro">
              <HeaderH1>Índice de Habilidades</HeaderH1>
            </div>
            <MobileSection>
              <div id="como-funcionam">
                <HeaderH2>Como Funcionam as Habilidades</HeaderH2>
              </div>
              <MobileText>
                <strong>Nome:</strong> Nome da habilidade, evocativa a seus
                efeitos.
                <br />
                <br />
                <strong>Gatilho:</strong> A condição que deve ser atendida para
                a habilidade ser ativada.
                <br />
                <br />
                <strong>Efeito:</strong> O que acontece quando a habilidade é
                ativada.
                <br />
                <br />
                <strong>Tipos:</strong> Cada tipo de habilidade é adequado para
                diferentes estilos de herói e situações de combate.
              </MobileText>
            </MobileSection>

            <MobileText>
              As habilidades são divididas em diferentes categorias baseadas em
              suas especializações. Cada tipo de habilidade oferece vantagens
              únicas para diferentes estilos de jogo.
            </MobileText>

            <MobileSection>
              <div id="tipos-habilidades">
                <HeaderH2>Tipos de Habilidades</HeaderH2>
              </div>
              <MobileText className="mb-4">
                Selecione um tipo de habilidade para ver as opções disponíveis:
              </MobileText>
              <div className="space-y-2">
                {skillTypeButtons.map((button, index) => (
                  <div key={index} id={`skill-type-${index}`}>
                    <MobileNavigationButtons buttons={[button]} />
                  </div>
                ))}
              </div>
            </MobileSection>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsIndexPage;
