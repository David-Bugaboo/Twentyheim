import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import HeaderH1 from "../../components/HeaderH1";
import MobileSection from "../../components/MobileSection";

/**
 * Adiciona o campo updatedAt ao conteúdo JSON antes de salvar
 * - Se for array: transforma em { data: array, updatedAt: string }
 * - Se for objeto: adiciona updatedAt diretamente
 */
function addUpdatedAtToContent(content: any): any {
  const updatedAt = new Date().toISOString();

  if (Array.isArray(content)) {
    return {
      data: content,
      updatedAt,
    };
  } else if (content && typeof content === "object") {
    return {
      ...content,
      updatedAt,
    };
  }

  // Para outros tipos (string, number, etc), mantém como está
  return content;
}

/**
 * Remove o campo updatedAt do conteúdo antes de usar
 * Para manter compatibilidade com código que espera o formato original
 */
function removeUpdatedAtFromContent(content: any): any {
  if (!content || typeof content !== "object") {
    return content;
  }

  // Se tiver estrutura { data: [...], updatedAt: ... }, retorna apenas o array
  if (
    "data" in content &&
    Array.isArray(content.data) &&
    "updatedAt" in content
  ) {
    return content.data;
  }

  // Se for objeto com updatedAt, remove a propriedade
  if ("updatedAt" in content) {
    const { updatedAt, ...rest } = content;
    return rest;
  }

  return content;
}

// Função helper para salvar no IndexedDB
async function saveToIndexedDB(id: string, content: any): Promise<void> {
  try {
    const DB_NAME = "twentyheim-cache";
    const DB_VERSION = 2; // Mesma versão para garantir compatibilidade entre stores
    const STORE_NAME = "json-data";

    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = event => {
        const db = (event.target as IDBOpenDBRequest).result;
        const oldVersion = event.oldVersion;

        // Se está migrando da versão 1, preserva stores existentes e cria novas
        if (oldVersion < 2) {
          // Cria store json-data se não existir
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: "id" });
          }
          // Cria store local-warbands se não existir
          if (!db.objectStoreNames.contains("local-warbands")) {
            db.createObjectStore("local-warbands", { keyPath: "id" });
          }
        } else {
          // Para futuras versões, apenas cria se não existir
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: "id" });
          }
        }
      };
    });

    // Adiciona updatedAt ao conteúdo antes de salvar
    const contentWithUpdatedAt = addUpdatedAtToContent(content);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({
        id,
        content: contentWithUpdatedAt,
        updatedAt: new Date().toISOString(),
        source: "firestore",
      });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Erro ao salvar no IndexedDB:", error);
  }
}

// Lista de todos os arquivos JSON organizados por categoria
const JSON_FILES = {
  warbands: [
    {
      id: "wood-elves-of-athel-loren",
      path: "warbands/wood-elves-of-athel-loren/data/wood-eves-of-athel-loren.data.json",
      name: "Elfos Silvanos de Athel Loren",
      import: () =>
        import(
          "../warbands/wood-elves-of-athel-loren/data/wood-eves-of-athel-loren.data.json"
        ),
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
      import: () =>
        import(
          "../warbands/sisters-of-sigmar/data/sisters-of-sigmar.data.json"
        ),
    },
    {
      id: "beastman-raiders",
      path: "warbands/beastman-raiders/beastmen-raiders.data.json",
      name: "Saqueadores Homem-Fera",
      import: () =>
        import("../warbands/beastman-raiders/beastmen-raiders.data.json"),
    },
    {
      id: "dwarf-treasure-hunters",
      path: "warbands/dwarf-treasure-hunters/data/dwarf-treasure-hunters.data.json",
      name: "Caçadores de Tesouro Anões",
      import: () =>
        import(
          "../warbands/dwarf-treasure-hunters/data/dwarf-treasure-hunters.data.json"
        ),
    },
    {
      id: "cult-of-the-possessed",
      path: "warbands/cult-of-the-possessed/data/cult-of-the-possessed-page.json",
      name: "Culto dos Possuídos",
      import: () =>
        import(
          "../warbands/cult-of-the-possessed/data/cult-of-the-possessed-page.json"
        ),
    },
    {
      id: "cult-mutations",
      path: "warbands/cult-of-the-possessed/data/mutations.data.json",
      name: "Mutações do Culto dos Possuídos",
      import: () =>
        import("../warbands/cult-of-the-possessed/data/mutations.data.json"),
    },
    {
      id: "vampire-courts",
      path: "warbands/vampire-courts/data/vampire-courts.data.json",
      name: "Cortes Vampíricas",
      import: () =>
        import("../warbands/vampire-courts/data/vampire-courts.data.json"),
    },
    {
      id: "witch-hunters",
      path: "warbands/witch-hunters/data/witch-hunters.data.json",
      name: "Caçadores de Bruxas",
      import: () =>
        import("../warbands/witch-hunters/data/witch-hunters.data.json"),
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
      import: () =>
        import("../warbands/mercenaries/data/mercenaries.data.json"),
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
      import: () =>
        import("../warbands/sons-of-hashut/data/sons-of-hashut.data.json"),
    },
    {
      id: "carnival-of-chaos",
      path: "warbands/carnival-of-chaos/data/carnival-of-chaos.data.json",
      name: "Circo do Caos",
      import: () =>
        import(
          "../warbands/carnival-of-chaos/data/carnival-of-chaos.data.json"
        ),
    },
    {
      id: "carnival-blessings",
      path: "warbands/carnival-of-chaos/data/blessings-of-nurgle.json",
      name: "Bênçãos de Nurgle",
      import: () =>
        import("../warbands/carnival-of-chaos/data/blessings-of-nurgle.json"),
    },
    {
      id: "dark-elf-corsairs",
      path: "warbands/dark-elf-corsairs/data/dark-elf-corsairs.data.json",
      name: "Corsários Druchii",
      import: () =>
        import(
          "../warbands/dark-elf-corsairs/data/dark-elf-corsairs.data.json"
        ),
    },
  ],
  equipment: [
    {
      id: "armas-corpo-a-corpo",
      path: "weapons and equipments/data/armas-corpo-a-corpo-refactor.json",
      name: "Armas Corpo a Corpo",
      import: () =>
        import(
          "../weapons and equipments/data/armas-corpo-a-corpo-refactor.json"
        ),
    },
    {
      id: "armas-a-distancia",
      path: "weapons and equipments/data/armas-a-distancia-refactor.json",
      name: "Armas a Distância",
      import: () =>
        import(
          "../weapons and equipments/data/armas-a-distancia-refactor.json"
        ),
    },
    {
      id: "armas-de-fogo",
      path: "weapons and equipments/data/armas-de-fogo-refactor.json",
      name: "Armas de Fogo",
      import: () =>
        import("../weapons and equipments/data/armas-de-fogo-refactor.json"),
    },
    {
      id: "armaduras-e-escudos",
      path: "weapons and equipments/data/armaduras-e-escudos-refactor.json",
      name: "Armaduras e Escudos",
      import: () =>
        import(
          "../weapons and equipments/data/armaduras-e-escudos-refactor.json"
        ),
    },
    {
      id: "acessorios",
      path: "weapons and equipments/data/acessorios-refactor.json",
      name: "Acessórios",
      import: () =>
        import("../weapons and equipments/data/acessorios-refactor.json"),
    },
    {
      id: "remedios-e-venenos",
      path: "weapons and equipments/data/remedios-e-venenos.json",
      name: "Remédios e Venenos",
      import: () =>
        import("../weapons and equipments/data/remedios-e-venenos.json"),
    },
    {
      id: "modificadores-de-arma",
      path: "weapons and equipments/data/modificadores-de-arma-refactor.json",
      name: "Modificadores de Arma",
      import: () =>
        import(
          "../weapons and equipments/data/modificadores-de-arma-refactor.json"
        ),
    },
    {
      id: "modificadores-de-arma-a-distancia",
      path: "weapons and equipments/data/modificadores-de-arma-a-distancia-refactor.json",
      name: "Modificadores de Arma a Distância",
      import: () =>
        import(
          "../weapons and equipments/data/modificadores-de-arma-a-distancia-refactor.json"
        ),
    },
    {
      id: "modificadores-de-armas-de-fogo",
      path: "weapons and equipments/data/modificadores-de-armas-de-fogo-refactor.json",
      name: "Modificadores de Armas de Fogo",
      import: () =>
        import(
          "../weapons and equipments/data/modificadores-de-armas-de-fogo-refactor.json"
        ),
    },
  ],
  spells: [
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
  ],
  skills: [
    {
      id: "combate",
      path: "skills/data/combate.skills.json",
      name: "Combate",
      import: () => import("../skills/data/combate.skills.json"),
    },
    {
      id: "atirador",
      path: "skills/data/atirador.skills.json",
      name: "Atirador",
      import: () => import("../skills/data/atirador.skills.json"),
    },
    {
      id: "academica",
      path: "skills/data/academica.skills.json",
      name: "Acadêmica",
      import: () => import("../skills/data/academica.skills.json"),
    },
    {
      id: "forca",
      path: "skills/data/forca.skills.json",
      name: "Força",
      import: () => import("../skills/data/forca.skills.json"),
    },
    {
      id: "velocidade",
      path: "skills/data/velocidade.skills.json",
      name: "Velocidade",
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
      import: () =>
        import("../skills/data/cacadores-de-tesouro-anoes.skills.json"),
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
      import: () =>
        import("../skills/data/habilidades-von-carstein.skills.json"),
    },
    {
      id: "habilidades-de-dragao-carmesim",
      path: "skills/data/habilidades-de-dragao-carmesim.skills.json",
      name: "Habilidades de Dragão Carmesim",
      import: () =>
        import("../skills/data/habilidades-de-dragao-carmesim.skills.json"),
    },
    {
      id: "habilidades-dos-necrarcas",
      path: "skills/data/habilidades-dos-necrarcas.skills.json",
      name: "Habilidades dos Necrarcas",
      import: () =>
        import("../skills/data/habilidades-dos-necrarcas.skills.json"),
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
  ],
  campaign: [
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
  ],
  rules: [
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
  ],
};

// Lista de emails/admin permitidos (case-insensitive)
const ADMIN_EMAILS = [
  "david.faco@gmail.com",
  "davidfaco@gmail.com",
  "davidfaco.ufc@gmail.com",
  // Adicione outros emails admin aqui se necessário
];

function AdminPage() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [jsonContent, setJsonContent] = useState<string>("");
  const [loadingFile, setLoadingFile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories] = useState(Object.keys(JSON_FILES));

  const isAdmin = () => {
    if (!currentUser) return false;
    const userEmail = currentUser.email?.toLowerCase().trim();
    const userName = currentUser.displayName?.toLowerCase().trim();

    // Verifica email
    if (
      userEmail &&
      ADMIN_EMAILS.some(admin => admin.toLowerCase() === userEmail)
    ) {
      return true;
    }

    // Verifica se o nome contém "david" e "faco"
    if (userName && userName.includes("david") && userName.includes("faco")) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        toast.error("Você precisa estar logado para acessar esta página.");
        navigate("/");
        return;
      }

      if (!isAdmin()) {
        toast.error(
          `Acesso negado. Email logado: ${currentUser.email || "N/A"}. Se você é o David Facó, verifique o email ou entre em contato com o desenvolvedor.`
        );
        navigate("/");
      }
    }
  }, [currentUser, loading, navigate]);

  const loadFile = async (fileId: string, category: string) => {
    setLoadingFile(true);
    try {
      // Primeiro tenta carregar do Firestore
      const docRef = doc(db, "admin-data", fileId);
      const docSnap = await getDoc(docRef);

      let data: any;
      if (docSnap.exists() && docSnap.data().content) {
        // Usa versão do Firestore, removendo updatedAt para edição
        data = removeUpdatedAtFromContent(docSnap.data().content);
        toast.info("Carregado do Firestore (versão editada)");
      } else {
        // Usa versão estática do arquivo
        const fileConfig = (JSON_FILES as any)[category].find(
          (f: any) => f.id === fileId
        );
        if (!fileConfig) {
          throw new Error("Arquivo não encontrado");
        }
        const module = await fileConfig.import();
        data = module.default;
        toast.info("Carregado do arquivo estático");
      }

      setJsonContent(JSON.stringify(data, null, 2));
      setSelectedFile(`${category}/${fileId}`);
    } catch (error) {
      console.error("Erro ao carregar arquivo:", error);
      toast.error("Erro ao carregar arquivo");
    } finally {
      setLoadingFile(false);
    }
  };

  const saveFile = async () => {
    if (!selectedFile) return;

    setSaving(true);
    try {
      const [category, fileId] = selectedFile.split("/");
      const fileConfig = (JSON_FILES as any)[category].find(
        (f: any) => f.id === fileId
      );

      if (!fileConfig) {
        throw new Error("Arquivo não encontrado");
      }

      // Valida JSON
      const parsed = JSON.parse(jsonContent);

      // Adiciona updatedAt ao conteúdo antes de salvar
      const contentWithUpdatedAt = addUpdatedAtToContent(parsed);

      // Salva no Firestore
      const docRef = doc(db, "admin-data", fileId);
      await setDoc(docRef, {
        path: fileConfig.path,
        name: fileConfig.name,
        content: contentWithUpdatedAt,
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser?.email || "unknown",
      });

      // Também salva no IndexedDB como cache
      await saveToIndexedDB(fileId, parsed);

      toast.success("Arquivo salvo com sucesso no Firestore e IndexedDB!");
    } catch (error: any) {
      console.error("Erro ao salvar:", error);
      if (error.message.includes("JSON")) {
        toast.error("JSON inválido. Verifique a sintaxe.");
      } else {
        toast.error("Erro ao salvar arquivo");
      }
    } finally {
      setSaving(false);
    }
  };

  const resetFile = async () => {
    if (!selectedFile) return;
    const [category, fileId] = selectedFile.split("/");
    await loadFile(fileId, category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white p-4">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  if (!currentUser || !isAdmin()) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Acesso negado</h2>
          <p className="text-gray-300">
            Email logado: {currentUser?.email || "N/A"}
          </p>
          <p className="text-gray-300">
            Nome: {currentUser?.displayName || "N/A"}
          </p>
          <p className="text-gray-400 mt-4">
            Se você é o David Facó e deveria ter acesso, verifique se o email
            está correto ou entre em contato.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4">
      <HeaderH1>Painel Administrativo</HeaderH1>
      <MobileSection>
        <div className="mb-4">
          <p className="text-gray-300 mb-4">
            Bem-vindo, {currentUser.email}. Aqui você pode editar todos os dados
            JSON da aplicação.
          </p>
          <Link
            to="/admin/migrate"
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded mb-4"
          >
            Migrar Dados para Firestore
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Lista de arquivos */}
          <div className="bg-[#2a2a2a] rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Arquivos JSON</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {categories.map(category => (
                <div key={category} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 capitalize">
                    {category}
                  </h3>
                  <div className="space-y-1">
                    {(JSON_FILES as any)[category].map((file: any) => (
                      <button
                        key={file.id}
                        onClick={() => loadFile(file.id, category)}
                        className={`w-full text-left px-3 py-2 rounded ${
                          selectedFile === `${category}/${file.id}`
                            ? "bg-[#8b7355] text-white"
                            : "bg-[#1a1a1a] hover:bg-[#333] text-gray-300"
                        }`}
                      >
                        {file.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="bg-[#2a2a2a] rounded-lg p-4 flex flex-col">
            <h2 className="text-xl font-bold mb-4">
              {selectedFile
                ? (JSON_FILES as any)[selectedFile.split("/")[0]].find(
                    (f: any) => f.id === selectedFile.split("/")[1]
                  )?.name || "Editor"
                : "Selecione um arquivo"}
            </h2>

            {selectedFile && (
              <>
                <textarea
                  value={jsonContent}
                  onChange={e => setJsonContent(e.target.value)}
                  className="flex-1 w-full bg-[#1a1a1a] text-white p-4 rounded font-mono text-sm resize-none"
                  style={{ minHeight: "500px" }}
                  disabled={loadingFile}
                />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={saveFile}
                    disabled={saving || loadingFile}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
                  >
                    {saving ? "Salvando..." : "Salvar no Firestore"}
                  </button>
                  <button
                    onClick={resetFile}
                    disabled={loadingFile}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded disabled:opacity-50"
                  >
                    Recarregar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </MobileSection>
    </div>
  );
}

export default AdminPage;
