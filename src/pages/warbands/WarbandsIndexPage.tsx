import React from "react";
import { useNavigate } from "react-router-dom";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";

import HeaderH2 from "../../components/HeaderH2";
import HeaderH3 from "../../components/HeaderH3";
import QuickNavigation from "../../components/QuickNavigation";

import PageTitle from "../../components/PageTitle";

const WarbandsIndexPage: React.FC = () => {
  const navigate = useNavigate();

  const warbands = [
    {
      id: "beastman-raiders",
      name: "Saqueadores Homem-Fera",
      path: "/warbands/beastman-raiders",
      description:
        "Tribos selvagens de criaturas bestiais que emergem das florestas sombrias para aterrorizar os assentamentos humanos.",
      faction: "Caos",
      playstyle: "Combate corpo a corpo agressivo",
    },
    {
      id: "cult-of-the-possessed",
      name: "Culto dos Possuídos",
      path: "/warbands/cult-of-the-possessed",
      description:
        "Seguidores corrompidos do Caos que abraçaram a mutação e a possessão demoníaca em busca de poder.",
      faction: "Caos",
      playstyle: "Magia e mutações",
    },
    {
      id: "dark-elf-corsairs",
      name: "Corsários Druchii",
      path: "/warbands/dark-elf-corsairs",
      description:
        "Piratas élficos sombrios que navegam pelos mares em busca de escravos e tesouros.",
      faction: "Elfos Sombrios",
      playstyle: "Velocidade e precisão",
    },
    {
      id: "dwarf-treasure-hunters",
      name: "Caçadores de Tesouro Anões",
      path: "/warbands/dwarf-treasure-hunters",
      description:
        "Anões determinados em busca de riquezas perdidas e artefatos ancestrais nas ruínas de Mordheim.",
      faction: "Anões",
      playstyle: "Resistência e equipamentos",
    },
    {
      id: "lizardmen",
      name: "Reptilianos",
      path: "/warbands/lizardmen",
      description:
        "Criaturas reptilianas antigas que emergem das selvas para reivindicar relíquias perdidos.",
      faction: "Saúrios",
      playstyle: "Magia primitiva e força",
    },
    {
      id: "mercenaries",
      name: "Mercenários",
      path: "/warbands/mercenaries",
      description:
        "Guerreiros profissionais de diversas origens que vendem suas habilidades ao melhor pagador.",
      faction: "Humano",
      playstyle: "Versatilidade e adaptabilidade",
    },
    {
      id: "orc-mob",
      name: "Horda Orc",
      path: "/warbands/orc-mob",
      description:
        "Bando desorganizado de Orcs e Goblins unidos pela promessa de saque e violência.",
      faction: "Pele-Verde",
      playstyle: "Números e brutalidade",
    },
    {
      id: "sisters-of-sigmar",
      name: "Irmãs de Sigmar",
      path: "/warbands/sisters-of-sigmar",
      description:
        "Guerreiras devotas de Sigmar que caçam os corrompidos e hereges nas ruínas da cidade amaldiçoada.",
      faction: "Império",
      playstyle: "Fé e determinação",
    },
    {
      id: "skaven",
      name: "Skaven do Clã Enshin",
      path: "/warbands/skaven",
      description:
        "Ratos-humanos assassinos especializados em infiltração e eliminação de alvos específicos.",
      faction: "Skaven",
      playstyle: "Furtividade e venenos",
    },
    {
      id: "sons-of-hashut",
      name: "Filhos de Hashut",
      path: "/warbands/sons-of-hashut",
      description:
        "Anões do Caos que forjaram alianças com daemônios em busca de poder e conhecimento proibido.",
      faction: "Anões do Caos",
      playstyle: "Magia sombria e tecnologia",
    },
    {
      id: "vampire-courts",
      name: "Cortes Vampíricas",
      path: "/warbands/vampire-courts",
      description:
        "Nobres imortais que governam através do medo e da sedução, buscando expandir seus domínios.",
      faction: "Mortos-Vivos",
      playstyle: "Magia necromântica e charme",
    },
    {
      id: "witch-hunters",
      name: "Caçadores de Bruxas",
      path: "/warbands/witch-hunters",
      description:
        "Inquisidores fanáticos dedicados a purgar a corrupção e a heresia de Mordheim.",
      faction: "Império",
      playstyle: "Purificação e justiça",
    },
  ];

  // Ordenar bandos alfabeticamente
  const sortedWarbands = [...warbands].sort((a, b) =>
    a.name.localeCompare(b.name, "pt-BR")
  );

  const navigationSections = [
    { id: "intro", title: "Bandos de Mordheim", level: 0 },
    { id: "bandos", title: "Todos os Bandos", level: 0 },
    ...sortedWarbands.map((warband, index) => ({
      id: `warband-${index}`,
      title: warband.name,
      level: 1,
    })),
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <QuickNavigation sections={navigationSections} />
          <PageTitle>Facções de Mordheim</PageTitle>
          <MobileSection>
            <div id="intro">
              <MobileText>
                Mordheim atrai bandos de todas as raças e origens, cada um com
                seus próprios objetivos, métodos e filosofias. Desde tribos
                selvagens de Homens-Fera até cortes vampíricas sofisticadas,
                cada facção oferece uma experiência única de jogo, com unidades
                especializadas, equipamentos exclusivos e habilidades que
                refletem sua natureza e origem.
              </MobileText>

              <MobileText>
                Escolha sua facção com sabedoria, pois sua decisão moldará não
                apenas suas táticas de combate, mas também sua jornada através
                das ruínas sombrias de Mordheim.
              </MobileText>
            </div>

            <div id="bandos">
              <HeaderH2>Todas as Facções</HeaderH2>
              <MobileText>
                Explore todos os Facções disponíveis em 20heim, cada um com sua
                própria história, unidades e equipamentos únicos.
              </MobileText>

              <div className="space-y-4 mt-6">
                {sortedWarbands.map((warband, index) => (
                  <div
                    key={warband.id}
                    id={`warband-${index}`}
                    className="bg-green-900/20 border border-green-500/40 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <HeaderH3 className="text-green-300 mb-1">
                          {warband.name}
                        </HeaderH3>
                        <div className="text-sm text-green-400 mb-2">
                          {warband.faction} • {warband.playstyle}
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(warband.path)}
                        className="bg-green-800/30 border border-green-600/50 hover:bg-green-700/40 hover:border-green-500/70 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-bold"
                      >
                        Explorar
                      </button>
                    </div>
                    <MobileText className="text-gray-300">
                      {warband.description}
                    </MobileText>
                  </div>
                ))}
              </div>
            </div>
          </MobileSection>
        </div>
      </div>
    </div>
  );
};

export default WarbandsIndexPage;
