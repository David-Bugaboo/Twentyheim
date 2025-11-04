import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { migrateStaticDataToFirestore } from "../../hooks/useJsonData";
import { toast } from "react-toastify";
import HeaderH1 from "../../components/HeaderH1";
import MobileSection from "../../components/MobileSection";

// Mesma lista de arquivos do AdminPage
export const ALL_FILES = [
  // Warbands
  {
    id: "wood-elves-of-athel-loren",
    path: "warbands/wood-elves-of-athel-loren/data/wood-eves-of-athel-loren.data.json",
    name: "Elfos Silvanos de Athel Loren",
    import: () => import("../warbands/wood-elves-of-athel-loren/data/wood-eves-of-athel-loren.data.json"),
  },
  {
    id: "skaven",
    path: "warbands/skaven/data/skaven.data.json",
    name: "Skaven",
    import: () => import("../warbands/skaven/data/skaven.data.json"),
  },
  {
    id: "sisters-of-sigmar",
    path: "warbands/sisters-of-sigmar/data/sisters-of-sigmar.data.json",
    name: "Irmãs de Sigmar",
    import: () => import("../warbands/sisters-of-sigmar/data/sisters-of-sigmar.data.json"),
  },
  {
    id: "beastman-raiders",
    path: "warbands/beastman-raiders/beastmen-raiders.data.json",
    name: "Saqueadores Homem-Fera",
    import: () => import("../warbands/beastman-raiders/beastmen-raiders.data.json"),
  },
  {
    id: "dwarf-treasure-hunters",
    path: "warbands/dwarf-treasure-hunters/data/dwarf-treasure-hunters.data.json",
    name: "Caçadores de Tesouro Anões",
    import: () => import("../warbands/dwarf-treasure-hunters/data/dwarf-treasure-hunters.data.json"),
  },
  {
    id: "cult-of-the-possessed",
    path: "warbands/cult-of-the-possessed/data/cult-of-the-possessed-page.json",
    name: "Culto dos Possuídos",
    import: () => import("../warbands/cult-of-the-possessed/data/cult-of-the-possessed-page.json"),
  },
  {
    id: "cult-mutations",
    path: "warbands/cult-of-the-possessed/data/mutations.data.json",
    name: "Mutações do Culto dos Possuídos",
    import: () => import("../warbands/cult-of-the-possessed/data/mutations.data.json"),
  },
  {
    id: "vampire-courts",
    path: "warbands/vampire-courts/data/vampire-courts.data.json",
    name: "Cortes Vampíricas",
    import: () => import("../warbands/vampire-courts/data/vampire-courts.data.json"),
  },
  {
    id: "witch-hunters",
    path: "warbands/witch-hunters/data/witch-hunters.data.json",
    name: "Caçadores de Bruxas",
    import: () => import("../warbands/witch-hunters/data/witch-hunters.data.json"),
  },
  {
    id: "lizardmen",
    path: "warbands/lizardmen/data/lizardmen.data.json",
    name: "Homens-Lagarto",
    import: () => import("../warbands/lizardmen/data/lizardmen.data.json"),
  },
  {
    id: "lizardmen-sacred-marks",
    path: "warbands/lizardmen/data/sacred-marks.data.json",
    name: "Marcas Sagradas dos Homens-Lagarto",
    import: () => import("../warbands/lizardmen/data/sacred-marks.data.json"),
  },
  {
    id: "mercenaries",
    path: "warbands/mercenaries/data/mercenaries.data.json",
    name: "Mercenários",
    import: () => import("../warbands/mercenaries/data/mercenaries.data.json"),
  },
  {
    id: "orc-mob",
    path: "warbands/orc-mob/data/orc-mob.data.json",
    name: "Horda Orc",
    import: () => import("../warbands/orc-mob/data/orc-mob.data.json"),
  },
  {
    id: "goblins",
    path: "warbands/goblins/data/goblins.data.json",
    name: "Goblins",
    import: () => import("../warbands/goblins/data/goblins.data.json"),
  },
  {
    id: "sons-of-hashut",
    path: "warbands/sons-of-hashut/data/sons-of-hashut.data.json",
    name: "Filhos de Hashut",
    import: () => import("../warbands/sons-of-hashut/data/sons-of-hashut.data.json"),
  },
  {
    id: "carnival-of-chaos",
    path: "warbands/carnival-of-chaos/data/carnival-of-chaos.data.json",
    name: "Circo do Caos",
    import: () => import("../warbands/carnival-of-chaos/data/carnival-of-chaos.data.json"),
  },
  {
    id: "carnival-blessings",
    path: "warbands/carnival-of-chaos/data/blessings-of-nurgle.json",
    name: "Bênçãos de Nurgle",
    import: () => import("../warbands/carnival-of-chaos/data/blessings-of-nurgle.json"),
  },
  {
    id: "dark-elf-corsairs",
    path: "warbands/dark-elf-corsairs/data/dark-elf-corsairs.data.json",
    name: "Corsários Druchii",
    import: () => import("../warbands/dark-elf-corsairs/data/dark-elf-corsairs.data.json"),
  },
  // Equipment
  {
    id: "armas-corpo-a-corpo",
    path: "weapons and equipments/data/armas-corpo-a-corpo-refactor.json",
    name: "Armas Corpo a Corpo",
    import: () => import("../weapons and equipments/data/armas-corpo-a-corpo-refactor.json"),
  },
  {
    id: "armas-a-distancia",
    path: "weapons and equipments/data/armas-a-distancia-refactor.json",
    name: "Armas a Distância",
    import: () => import("../weapons and equipments/data/armas-a-distancia-refactor.json"),
  },
  {
    id: "armas-de-fogo",
    path: "weapons and equipments/data/armas-de-fogo-refactor.json",
    name: "Armas de Fogo",
    import: () => import("../weapons and equipments/data/armas-de-fogo-refactor.json"),
  },
  {
    id: "armaduras-e-escudos",
    path: "weapons and equipments/data/armaduras-e-escudos-refactor.json",
    name: "Armaduras e Escudos",
    import: () => import("../weapons and equipments/data/armaduras-e-escudos-refactor.json"),
  },
  {
    id: "acessorios",
    path: "weapons and equipments/data/acessorios-refactor.json",
    name: "Acessórios",
    import: () => import("../weapons and equipments/data/acessorios-refactor.json"),
  },
  {
    id: "remedios-e-venenos",
    path: "weapons and equipments/data/remedios-e-venenos.json",
    name: "Remédios e Venenos",
    import: () => import("../weapons and equipments/data/remedios-e-venenos.json"),
  },
  {
    id: "modificadores-de-arma",
    path: "weapons and equipments/data/modificadores-de-arma-refactor.json",
    name: "Modificadores de Arma",
    import: () => import("../weapons and equipments/data/modificadores-de-arma-refactor.json"),
  },
  {
    id: "modificadores-de-arma-a-distancia",
    path: "weapons and equipments/data/modificadores-de-arma-a-distancia-refactor.json",
    name: "Modificadores de Arma a Distância",
    import: () => import("../weapons and equipments/data/modificadores-de-arma-a-distancia-refactor.json"),
  },
  {
    id: "modificadores-de-armas-de-fogo",
    path: "weapons and equipments/data/modificadores-de-armas-de-fogo-refactor.json",
    name: "Modificadores de Armas de Fogo",
    import: () => import("../weapons and equipments/data/modificadores-de-armas-de-fogo-refactor.json"),
  },
  // Spells
  {
    id: "lore-of-horned-rat",
    path: "spells/data/lore-of-horned-rat.json",
    name: "Tradição do Rato Chifrudo",
    import: () => import("../spells/data/lore-of-horned-rat.json"),
  },
  {
    id: "lore-of-necromancy",
    path: "spells/data/lore-of-necromancy.json",
    name: "Tradição da Necromancia",
    import: () => import("../spells/data/lore-of-necromancy.json"),
  },
  {
    id: "druchii-magic",
    path: "spells/data/druchii-magic.json",
    name: "Magia Druchii",
    import: () => import("../spells/data/druchii-magic.json"),
  },
  {
    id: "magic-of-the-old-ones",
    path: "spells/data/magic-of-the-old-ones.json",
    name: "Magia dos Antigos",
    import: () => import("../spells/data/magic-of-the-old-ones.json"),
  },
  {
    id: "magic-of-the-goblins",
    path: "spells/data/magic-of-the-goblins.json",
    name: "Magia dos Goblins",
    import: () => import("../spells/data/magic-of-the-goblins.json"),
  },
  {
    id: "magic-of-the-waaaaagh",
    path: "spells/data/magic-of-the-waaaaagh.json",
    name: "Magia da WAAAAAAAGH!",
    import: () => import("../spells/data/magic-of-the-waaaaagh.json"),
  },
  {
    id: "prayers-of-sigmar",
    path: "spells/data/prayers-of-sigmar.json",
    name: "Orações de Sigmar",
    import: () => import("../spells/data/prayers-of-sigmar.json"),
  },
  {
    id: "prayers-of-ulric",
    path: "spells/data/prayers-of-ulric.json",
    name: "Orações de Ulric",
    import: () => import("../spells/data/prayers-of-ulric.json"),
  },
  {
    id: "rituals-of-chaos",
    path: "spells/data/rituals-of-chaos.json",
    name: "Rituais do Caos",
    import: () => import("../spells/data/rituals-of-chaos.json"),
  },
  {
    id: "rituals-of-hashut",
    path: "spells/data/rituals-of-hashut.json",
    name: "Rituais de Hashut",
    import: () => import("../spells/data/rituals-of-hashut.json"),
  },
  {
    id: "lesser-magic",
    path: "spells/data/lesser-magic.json",
    name: "Magia Inferior",
    import: () => import("../spells/data/lesser-magic.json"),
  },
  {
    id: "rituals-of-nurgle",
    path: "spells/data/rituals-of-nurgle.json",
    name: "Rituais de Nurgle",
    import: () => import("../spells/data/rituals-of-nurgle.json"),
  },
  {
    id: "dark-god-invocations",
    path: "spells/data/dark-god-invocations.json",
    name: "Magias dos Deuses do Caos",
    import: () => import("../spells/data/dark-god-invocations.json"),
  },
  // Skills
  {
    id: "combate",
    path: "skills/data/combate.skills.json",
    name: "Habilidades de Combate",
    import: () => import("../skills/data/combate.skills.json"),
  },
  {
    id: "atirador",
    path: "skills/data/atirador.skills.json",
    name: "Habilidades de Atirador",
    import: () => import("../skills/data/atirador.skills.json"),
  },
  {
    id: "academica",
    path: "skills/data/academica.skills.json",
    name: "Habilidades Acadêmicas",
    import: () => import("../skills/data/academica.skills.json"),
  },
  {
    id: "forca",
    path: "skills/data/forca.skills.json",
    name: "Habilidades de Força",
    import: () => import("../skills/data/forca.skills.json"),
  },
  {
    id: "velocidade",
    path: "skills/data/velocidade.skills.json",
    name: "Habilidades de Velocidade",
    import: () => import("../skills/data/velocidade.skills.json"),
  },
  {
    id: "irmas-de-sigmar",
    path: "skills/data/irmas-de-sigmar.skills.json",
    name: "Habilidades das Irmãs de Sigmar",
    import: () => import("../skills/data/irmas-de-sigmar.skills.json"),
  },
  {
    id: "skaven-do-cla-enshin",
    path: "skills/data/skaven-do-cla-enshin.skills.json",
    name: "Habilidades Skaven do Clã Enshin",
    import: () => import("../skills/data/skaven-do-cla-enshin.skills.json"),
  },
  {
    id: "saqueadores-homem-fera",
    path: "skills/data/saqueadores-homem-fera.skills.json",
    name: "Habilidades dos Saqueadores Homem-Fera",
    import: () => import("../skills/data/saqueadores-homem-fera.skills.json"),
  },
  {
    id: "cacadores-de-tesouro-anoes",
    path: "skills/data/cacadores-de-tesouro-anoes.skills.json",
    name: "Habilidades dos Caçadores de Tesouro Anões",
    import: () => import("../skills/data/cacadores-de-tesouro-anoes.skills.json"),
  },
  {
    id: "mata-trolls-anao",
    path: "skills/data/mata-trolls-anao.skills.json",
    name: "Habilidades dos Mata-Trolls Anão",
    import: () => import("../skills/data/mata-trolls-anao.skills.json"),
  },
  {
    id: "habilidades-von-carstein",
    path: "skills/data/habilidades-von-carstein.skills.json",
    name: "Habilidades Von Carstein",
    import: () => import("../skills/data/habilidades-von-carstein.skills.json"),
  },
  {
    id: "habilidades-de-dragao-carmesim",
    path: "skills/data/habilidades-de-dragao-carmesim.skills.json",
    name: "Habilidades de Dragão Carmesim",
    import: () => import("../skills/data/habilidades-de-dragao-carmesim.skills.json"),
  },
  {
    id: "habilidades-dos-necrarcas",
    path: "skills/data/habilidades-dos-necrarcas.skills.json",
    name: "Habilidades dos Necrarcas",
    import: () => import("../skills/data/habilidades-dos-necrarcas.skills.json"),
  },
  {
    id: "habilidades-de-lahmia",
    path: "skills/data/habilidades-de-lahmia.skills.json",
    name: "Habilidades de Lahmia",
    import: () => import("../skills/data/habilidades-de-lahmia.skills.json"),
  },
  {
    id: "habilidades-de-strigoi",
    path: "skills/data/habilidades-de-strigoi.skills.json",
    name: "Habilidades de Strigoi",
    import: () => import("../skills/data/habilidades-de-strigoi.skills.json"),
  },
  {
    id: "corsarios-druchii",
    path: "skills/data/corsarios-druchii.skills.json",
    name: "Habilidades dos Corsários Druchii",
    import: () => import("../skills/data/corsarios-druchii.skills.json"),
  },
  {
    id: "habilidades-de-geckos",
    path: "skills/data/habilidades-de-geckos.skills.json",
    name: "Habilidades de Geckos",
    import: () => import("../skills/data/habilidades-de-geckos.skills.json"),
  },
  {
    id: "habilidades-de-saurio",
    path: "skills/data/habilidades-de-saurio.skills.json",
    name: "Habilidades de Sáurio",
    import: () => import("../skills/data/habilidades-de-saurio.skills.json"),
  },
  {
    id: "hordas-orc",
    path: "skills/data/hordas-orc.skills.json",
    name: "Habilidades das Hordas Orc",
    import: () => import("../skills/data/hordas-orc.skills.json"),
  },
  {
    id: "filhos-de-hashut",
    path: "skills/data/filhos-de-hashut.skills.json",
    name: "Habilidades dos Filhos de Hashut",
    import: () => import("../skills/data/filhos-de-hashut.skills.json"),
  },
  {
    id: "patrulheiro-elfo",
    path: "skills/data/patrulheiro-elfico.skills.json",
    name: "Habilidades do Patrulheiro Elfo",
    import: () => import("../skills/data/patrulheiro-elfico.skills.json"),
  },
  // Campaign
  {
    id: "hired-swords",
    path: "campanha/data/hired-swords.data.json",
    name: "Mercenários",
    import: () => import("../campanha/data/hired-swords.data.json"),
  },
  {
    id: "lendas",
    path: "campanha/data/lendas.data.json",
    name: "Lendas",
    import: () => import("../campanha/data/lendas.data.json"),
  },
  {
    id: "daemons",
    path: "campanha/data/daemons.data.json",
    name: "Demônios",
    import: () => import("../campanha/data/daemons.data.json"),
  },
  // Rules
  {
    id: "game-terms",
    path: "rules/data/game-terms.json",
    name: "Termos do Jogo",
    import: () => import("../rules/data/game-terms.json"),
  },
  {
    id: "happenings-datasheets",
    path: "rules/data/happenins-datasheets.data.json",
    name: "Folhas de Eventos",
    import: () => import("../rules/data/happenins-datasheets.data.json"),
  },
];

// Lista de emails/admin permitidos (case-insensitive)
const ADMIN_EMAILS = [
  "david.faco@gmail.com",
  "davidfaco@gmail.com",
  "davidfaco.ufc@gmail.com",
];

const isAdmin = (user: any) => {
  if (!user) return false;
  const userEmail = user.email?.toLowerCase().trim();
  const userName = user.displayName?.toLowerCase().trim();
  
  if (userEmail && ADMIN_EMAILS.some(admin => admin.toLowerCase() === userEmail)) {
    return true;
  }
  
  if (userName && userName.includes("david") && userName.includes("faco")) {
    return true;
  }
  
  return false;
};

function MigrateDataPage() {
  const { currentUser } = useAuth();
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, currentName: "" });
  const [forceUpdate, setForceUpdate] = useState(false);

  if (!currentUser || !isAdmin(currentUser)) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white p-4">
        <div className="text-center">Acesso negado</div>
      </div>
    );
  }

  const handleMigrate = async () => {
    setMigrating(true);
    setProgress({ current: 0, total: ALL_FILES.length, currentName: "" });

    try {
      const results = await migrateStaticDataToFirestore(
        ALL_FILES,
        (current, total, name) => {
          setProgress({ current, total, currentName: name });
        },
        forceUpdate
      );

      const successCount = results.filter((r) => r.success).length;
      const failCount = results.filter((r) => !r.success).length;
      const skippedCount = results.filter((r) => (r as any).skipped).length;
      const updatedCount = results.filter((r) => (r as any).updated).length;
      const newCount = successCount - skippedCount - updatedCount;

      // Log detalhado dos resultados
      const failed = results.filter((r) => !r.success);
      if (failed.length > 0) {
        console.error("❌ Arquivos que falharam na migração:", failed);
        failed.forEach((f) => {
          console.error(`  - ${f.id}: ${(f as any).error || "Erro desconhecido"}`);
        });
      }

      const message = forceUpdate
        ? `Migração concluída! ${successCount} sucessos (${newCount} novos, ${updatedCount} atualizados, ${skippedCount} ignorados), ${failCount} falhas.`
        : `Migração concluída! ${successCount} sucessos (${newCount} novos, ${skippedCount} já existiam), ${failCount} falhas.`;
      toast.success(message);
    } catch (error) {
      console.error("Erro na migração:", error);
      toast.error("Erro durante a migração");
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4">
      <HeaderH1>Migrar Dados para Firestore</HeaderH1>
      <MobileSection>
        <div className="mb-4">
          <p className="text-gray-300 mb-4">
            Esta página migra todos os arquivos JSON estáticos para o Firestore e IndexedDB.
            Isso permite gerenciar os dados via painel admin e funciona offline.
          </p>

          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              id="forceUpdate"
              checked={forceUpdate}
              onChange={(e) => setForceUpdate(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="forceUpdate" className="text-gray-300 cursor-pointer">
              Forçar atualização (sobrescreve arquivos existentes)
            </label>
          </div>

          {migrating && (
            <div className="bg-[#2a2a2a] rounded-lg p-4 mb-4">
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>
                    {progress.current} / {progress.total}
                  </span>
                  <span>{Math.round((progress.current / progress.total) * 100)}%</span>
                </div>
                <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(progress.current / progress.total) * 100}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                Migrando: {progress.currentName}
              </p>
            </div>
          )}

          <button
            onClick={handleMigrate}
            disabled={migrating}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {migrating ? "Migrando..." : "Iniciar Migração"}
          </button>
        </div>
      </MobileSection>
    </div>
  );
}

export default MigrateDataPage;

