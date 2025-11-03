import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import MobileSection from "../../../components/MobileSection";
import MobileText from "../../../components/MobileText";
import AuthModal from "../../../components/AuthModal";
import { useAuth } from "../../../context/AuthContext";
import CreateWarbandModal from "../../../components/CreateWarbandModal";
import { db } from "../../../firebase.ts";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import {
  saveLocalWarband as saveLocalWarbandHelper,
  getAllLocalWarbands,
  deleteLocalWarband as deleteLocalWarbandHelper,
  openWarbandDB,
  LOCAL_WARBANDS_STORE,
} from "../roster/helpers/indexedDb.helpers";

type SavedWarband = {
  id: string;
  name: string;
  faction: string;
  initialCrowns: number;
  createdAt?: any;
  updatedAt?: string; // ISO string
  firestoreUpdatedAt?: string; // ISO string (para comparação)
  source?: "local" | "user"; // Indica se é local ou do usuário
  userId?: string | null;
};

// Função para sincronizar um bando específico
async function syncWarband(
  warband: SavedWarband,
  userId: string
): Promise<{ success: boolean; message: string }> {
  console.log("[Sync] Iniciando sincronização:", {
    warbandId: warband.id,
    userId,
  });

  try {
    const db = await openWarbandDB();

    // Busca dados do IndexedDB
    const localData = await new Promise<any>((resolve, reject) => {
      const transaction = db.transaction([LOCAL_WARBANDS_STORE], "readonly");
      const store = transaction.objectStore(LOCAL_WARBANDS_STORE);
      const request = store.get(warband.id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    console.log("[Sync] Dados locais encontrados:", {
      exists: !!localData,
      source: localData?.source,
      hasUpdatedAt: !!localData?.updatedAt,
    });

    if (!localData) {
      console.error("[Sync] Bando não encontrado localmente");
      return { success: false, message: "Bando não encontrado localmente" };
    }

    // Busca dados do Firestore (se existir)
    const { getDoc } = await import("firebase/firestore");
    const { doc } = await import("firebase/firestore");
    const { db: firestoreDb } = await import("../../../firebase");
    const firestoreRef = doc(
      firestoreDb,
      "users",
      userId,
      "warbands",
      warband.id
    );
    const firestoreSnap = await getDoc(firestoreRef);

    const localUpdatedAt = localData.updatedAt
      ? new Date(localData.updatedAt).getTime()
      : 0;
    const firestoreUpdatedAt = localData.firestoreUpdatedAt
      ? new Date(localData.firestoreUpdatedAt).getTime()
      : 0;

    // Determina qual versão é mais recente
    const localIsNewer = localUpdatedAt > firestoreUpdatedAt;
    const firestoreExists = firestoreSnap.exists();

    console.log("[Sync] Status da sincronização:", {
      firestoreExists,
      localIsNewer,
      localUpdatedAt,
      firestoreUpdatedAt: localData.firestoreUpdatedAt,
      source: localData.source,
    });

    if (localIsNewer) {
      // Local é mais recente: envia para Firestore
      const { setDoc } = await import("firebase/firestore");
      await setDoc(firestoreRef, {
        name: localData.name,
        faction: localData.faction,
        initialCrowns: localData.initialCrowns || 0,
        notes: localData.notes || "",
        gold: localData.gold || "0",
        wyrdstone: localData.wyrdstone || "0",
        vault: localData.vault || [],
        figures: localData.figures || [],
        updatedAt: new Date(),
      });

      // Atualiza firestoreUpdatedAt no IndexedDB mantendo source original
      // Bandos locais continuam como "local", bandos de usuário continuam como "user"
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([LOCAL_WARBANDS_STORE], "readwrite");
        const store = transaction.objectStore(LOCAL_WARBANDS_STORE);
        const existingRequest = store.get(warband.id);
        existingRequest.onsuccess = () => {
          const existing = existingRequest.result || {};
          store.put({
            ...existing,
            firestoreUpdatedAt: new Date().toISOString(),
            // Mantém o source original: se era "local", continua "local"
            // Se era "user", continua "user"
          });
          resolve();
        };
        existingRequest.onerror = () => reject(existingRequest.error);
      });

      return {
        success: true,
        message: "Sincronizado: alterações locais enviadas para nuvem",
      };
    } else if (firestoreExists && firestoreUpdatedAt > localUpdatedAt) {
      // Firestore é mais recente: baixa para IndexedDB
      const firestoreData = firestoreSnap.data();
      await saveLocalWarbandHelper(
        warband.id,
        {
          name: firestoreData.name || "",
          faction: firestoreData.faction || "",
          initialCrowns: firestoreData.initialCrowns || 0,
          createdAt: firestoreData.createdAt,
        },
        "user"
      );

      // Atualiza os dados completos no IndexedDB
      const fsUpdatedAt =
        firestoreData.updatedAt?.toDate?.()?.toISOString() ||
        new Date().toISOString();
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([LOCAL_WARBANDS_STORE], "readwrite");
        const store = transaction.objectStore(LOCAL_WARBANDS_STORE);
        const existingRequest = store.get(warband.id);
        existingRequest.onsuccess = () => {
          const existing = existingRequest.result || {};
          store.put({
            ...existing,
            name: firestoreData.name || existing.name,
            faction: firestoreData.faction || existing.faction,
            notes: firestoreData.notes || existing.notes,
            gold: firestoreData.gold || existing.gold,
            wyrdstone: firestoreData.wyrdstone || existing.wyrdstone,
            vault: firestoreData.vault || existing.vault,
            figures: firestoreData.figures || existing.figures,
            updateLog: Array.isArray(firestoreData.updateLog)
              ? firestoreData.updateLog
              : existing.updateLog || [],
            firestoreUpdatedAt: fsUpdatedAt,
            source: "user",
          });
          resolve();
        };
        existingRequest.onerror = () => reject(existingRequest.error);
      });

      return {
        success: true,
        message: "Sincronizado: alterações da nuvem baixadas localmente",
      };
    } else if (
      !firestoreExists &&
      (localData.source === "local" || !localData.source)
    ) {
      // Bando só existe localmente: envia para Firestore
      // IMPORTANTE: mantém source como "local" no IndexedDB, mas envia para nuvem
      // Em outros dispositivos, será baixado com source "user"
      const { setDoc } = await import("firebase/firestore");

      console.log(
        "[Sync] Bando local sem source ou source='local' - enviando para Firestore"
      );
      console.log("[Sync] Enviando bando local para Firestore:", {
        warbandId: warband.id,
        userId,
        path: `users/${userId}/warbands/${warband.id}`,
        source: localData.source || "undefined (tratado como local)",
        data: {
          name: localData.name,
          faction: localData.faction,
          hasFigures: !!localData.figures?.length,
          figuresCount: localData.figures?.length || 0,
        },
      });

      try {
        await setDoc(firestoreRef, {
          name: localData.name,
          faction: localData.faction,
          initialCrowns: localData.initialCrowns || 0,
          notes: localData.notes || "",
          gold: localData.gold || "0",
          wyrdstone: localData.wyrdstone || "0",
          vault: localData.vault || [],
          figures: localData.figures || [],
          createdAt: localData.createdAt
            ? new Date(localData.createdAt)
            : new Date(),
          updatedAt: new Date(),
        });

        console.log("[Sync] Bando salvo no Firestore com sucesso");
      } catch (firestoreError: any) {
        console.error("[Sync] Erro ao salvar no Firestore:", firestoreError);
        throw firestoreError; // Re-lança para ser capturado pelo catch externo
      }

      // Atualiza no IndexedDB mantendo source como "local"
      // O bando continua local neste dispositivo, mas está disponível na nuvem
      await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction([LOCAL_WARBANDS_STORE], "readwrite");
        const store = transaction.objectStore(LOCAL_WARBANDS_STORE);
        const existingRequest = store.get(warband.id);
        existingRequest.onsuccess = () => {
          const existing = existingRequest.result || {};
          store.put({
            ...existing,
            firestoreUpdatedAt: new Date().toISOString(),
            // Mantém source como "local" - não muda para "user"
            source: "local",
          });
          resolve();
        };
        existingRequest.onerror = () => reject(existingRequest.error);
      });

      return {
        success: true,
        message:
          "Bando enviado para nuvem (mantido como local neste dispositivo)",
      };
    } else {
      return { success: true, message: "Já sincronizado" };
    }
  } catch (error: any) {
    console.error("[Sync] Erro ao sincronizar bando:", error);
    console.error("[Sync] Detalhes do erro:", {
      code: error?.code,
      message: error?.message,
      stack: error?.stack,
    });
    return {
      success: false,
      message:
        error?.message ||
        `Erro ao sincronizar: ${error?.code || "Erro desconhecido"}`,
    };
  }
}

// Tipo para status de sincronização
type SyncStatus = "local-only" | "local-newer" | "firestore-newer" | "synced";

// Função assíncrona para verificar status de sincronização consultando Firestore
async function checkSyncStatus(
  warband: SavedWarband,
  userId: string | null,
  localData?: any // Dados completos do IndexedDB (se disponível)
): Promise<SyncStatus> {
  console.log("[checkSyncStatus] Iniciando verificação:", {
    warbandId: warband.id,
    userId,
    hasLocalData: !!localData,
    localDataUpdatedAt: localData?.updatedAt,
    warbandUpdatedAt: warband.updatedAt,
  });

  // Se não tem usuário, sempre retorna local-only
  if (!userId) {
    console.log("[checkSyncStatus] Sem usuário, retornando local-only");
    return "local-only";
  }

  try {
    // Busca no Firestore se existe bando com mesmo UUID
    const { getDoc } = await import("firebase/firestore");
    const { doc } = await import("firebase/firestore");
    const firestoreRef = doc(db, "users", userId, "warbands", warband.id);
    const firestoreSnap = await getDoc(firestoreRef);

    // Se não existe no Firestore e é local, retorna local-only
    if (!firestoreSnap.exists()) {
      console.log(
        "[checkSyncStatus] Não existe no Firestore, retornando local-only"
      );
      return warband.source === "local" || !warband.source
        ? "local-only"
        : "synced";
    }

    // Existe no Firestore: compara updatedAt
    const firestoreData = firestoreSnap.data();

    // Para bandos locais, usa dados do IndexedDB se disponível
    const localUpdatedAt = localData?.updatedAt
      ? new Date(localData.updatedAt).getTime()
      : warband.updatedAt
        ? new Date(warband.updatedAt).getTime()
        : 0;

    // Comparação primária por updateLog (número de entradas)
    const localLogLen = Array.isArray(localData?.updateLog)
      ? localData.updateLog.length
      : 0;
    const firestoreLogLen = Array.isArray(firestoreData?.updateLog)
      ? firestoreData.updateLog.length
      : 0;

    if (localLogLen > firestoreLogLen) {
      console.log(
        "[checkSyncStatus] local.updateLog maior que firestore.updateLog"
      );
      return "local-newer";
    } else if (firestoreLogLen > localLogLen) {
      console.log(
        "[checkSyncStatus] firestore.updateLog maior que local.updateLog"
      );
      return "firestore-newer";
    }

    // Se logs empatam, cai no desempate por updatedAt
    let firestoreUpdatedAt = 0;
    if (firestoreData?.updatedAt) {
      if (typeof firestoreData.updatedAt === "string") {
        firestoreUpdatedAt = new Date(firestoreData.updatedAt).getTime();
      } else if (
        firestoreData.updatedAt?.toDate &&
        typeof firestoreData.updatedAt.toDate === "function"
      ) {
        firestoreUpdatedAt = firestoreData.updatedAt.toDate().getTime();
      } else if (firestoreData.updatedAt?.seconds) {
        // Timestamp do Firestore em formato {seconds, nanoseconds}
        firestoreUpdatedAt = new Date(
          firestoreData.updatedAt.seconds * 1000
        ).getTime();
      } else {
        // Tenta converter diretamente como Date
        try {
          firestoreUpdatedAt = new Date(firestoreData.updatedAt).getTime();
        } catch (e) {
          console.warn("[checkSyncStatus] Erro ao converter updatedAt:", e);
        }
      }
    }

    console.log("[checkSyncStatus] Comparando timestamps:", {
      localUpdatedAt: localUpdatedAt
        ? new Date(localUpdatedAt).toISOString()
        : "N/A",
      firestoreUpdatedAt: firestoreUpdatedAt
        ? new Date(firestoreUpdatedAt).toISOString()
        : "N/A",
      localIsNewer: localUpdatedAt > firestoreUpdatedAt,
      firestoreIsNewer: firestoreUpdatedAt > localUpdatedAt,
    });

    if (localUpdatedAt > firestoreUpdatedAt) {
      console.log(
        "[checkSyncStatus] Local é mais recente, retornando local-newer"
      );
      return "local-newer";
    } else if (firestoreUpdatedAt > localUpdatedAt) {
      console.log(
        "[checkSyncStatus] Firestore é mais recente, retornando firestore-newer"
      );
      return "firestore-newer";
    } else {
      console.log("[checkSyncStatus] Sincronizado, retornando synced");
      return "synced";
    }
  } catch (error) {
    console.error("[checkSyncStatus] Erro ao verificar status:", error);
    // Em caso de erro, retorna status baseado no source
    const fallbackStatus =
      warband.source === "local" || !warband.source ? "local-only" : "synced";
    console.log("[checkSyncStatus] Retornando fallback:", fallbackStatus);
    return fallbackStatus;
  }
}

// Função saveLocalWarband movida para indexedDb.helpers.ts
// Reutiliza a função exportada do helper

// Função deleteLocalWarband movida para indexedDb.helpers.ts
// Reutiliza a função exportada do helper

function WarbandBuilderPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, loading } = useAuth();
  const [userWarbands, setUserWarbands] = useState<SavedWarband[]>([]);
  const [localWarbands, setLocalWarbands] = useState<SavedWarband[]>([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [remoteUpdateLogLens, setRemoteUpdateLogLens] = useState<
    Map<string, number>
  >(new Map());
  const [syncing, setSyncing] = useState<string | null>(null); // ID do bando sendo sincronizado
  const [syncStatuses, setSyncStatuses] = useState<Map<string, SyncStatus>>(
    new Map()
  ); // Status de sincronização por ID do bando
  const [promoting, setPromoting] = useState<string | null>(null);
  const userDisplayName = useMemo(
    () => currentUser?.displayName || currentUser?.email || "",
    [currentUser]
  );

  // Facções disponíveis no jogo (slug + rótulo)
  const factionOptions = useMemo(
    () => [
      { slug: "mercenaries", label: "Mercenários" },
      { slug: "sisters-of-sigmar", label: "Irmãs de Sigmar" },
      { slug: "skaven", label: "Skaven" },
      { slug: "beastman-raiders", label: "Saqueadores Homem-Fera" },
      { slug: "dwarf-treasure-hunters", label: "Caçadores de Tesouro Anões" },
      { slug: "lizardmen", label: "Reptilianos" },
      { slug: "orc-mob", label: "Horda Orc" },
      { slug: "goblins", label: "Goblins" },
      { slug: "sons-of-hashut", label: "Filhos de Hashut" },
      { slug: "vampire-courts", label: "Cortes Vampíricas" },
      { slug: "cult-of-the-possessed", label: "Culto dos Possuídos" },
      { slug: "carnival-of-chaos", label: "Circo do Caos" },
      { slug: "dark-elf-corsairs", label: "Corsários Druchii" },
    ],
    []
  );
  const factionLabelBySlug = useMemo(() => {
    const m = new Map<string, string>();
    factionOptions.forEach(f => m.set(f.slug, f.label));
    return m;
  }, [factionOptions]);

  // Carrega bandos locais do IndexedDB (sem precisar de login)
  useEffect(() => {
    const loadLocalWarbands = async () => {
      console.log("[WarbandBuilderPage] Carregando bandos locais...");
      const local = await getAllLocalWarbands();
      console.log(
        "[WarbandBuilderPage] Bandos locais carregados:",
        local.length
      );
      setLocalWarbands(local as SavedWarband[]);
    };
    loadLocalWarbands();
  }, []);

  // Recarrega bandos quando volta para esta página (via React Router)
  useEffect(() => {
    // Só recarrega se a rota atual é a página de seleção de bandos
    if (location.pathname === "/warband-builder") {
      console.log(
        "[WarbandBuilderPage] Detectou navegação para página de seleção, recarregando bandos..."
      );
      const loadLocalWarbands = async () => {
        const local = await getAllLocalWarbands();
        console.log(
          "[WarbandBuilderPage] Bandos recarregados após navegação:",
          local.length
        );
        setLocalWarbands(local as SavedWarband[]);
      };
      loadLocalWarbands();
    }
  }, [location.pathname]);

  // Recarrega bandos locais quando volta da página de roster (para atualizar updatedAt)
  useEffect(() => {
    const handleFocus = () => {
      console.log(
        "[WarbandBuilderPage] Página recebeu foco, recarregando bandos..."
      );
      const loadLocalWarbands = async () => {
        const local = await getAllLocalWarbands();
        console.log(
          "[WarbandBuilderPage] Bandos recarregados após foco:",
          local.length
        );
        setLocalWarbands(local as SavedWarband[]);
      };
      loadLocalWarbands();
    };

    // Também recarrega quando a página fica visível (usando Visibility API)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log(
          "[WarbandBuilderPage] Página ficou visível, recarregando bandos..."
        );
        const loadLocalWarbands = async () => {
          const local = await getAllLocalWarbands();
          console.log(
            "[WarbandBuilderPage] Bandos recarregados após visibilidade:",
            local.length
          );
          setLocalWarbands(local as SavedWarband[]);
        };
        loadLocalWarbands();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Verifica status de sincronização e sincroniza automaticamente quando IndexedDB é mais recente
  useEffect(() => {
    if (
      !currentUser ||
      (localWarbands.length === 0 && userWarbands.length === 0)
    ) {
      setSyncStatuses(new Map());
      return;
    }

    const checkStatuses = async () => {
      const statusMap = new Map<string, SyncStatus>();

      // Verifica status de bandos locais (busca dados completos do IndexedDB)
      for (const warband of localWarbands) {
        try {
          const db = await openWarbandDB();
          const localData = await new Promise<any>((resolve, reject) => {
            const transaction = db.transaction(
              [LOCAL_WARBANDS_STORE],
              "readonly"
            );
            const store = transaction.objectStore(LOCAL_WARBANDS_STORE);
            const request = store.get(warband.id);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
          });

          console.log("[checkSyncStatus] Verificando bando:", {
            id: warband.id,
            localDataUpdatedAt: localData?.updatedAt,
            localDataExists: !!localData,
            userId: currentUser.uid,
          });

          const status = await checkSyncStatus(
            warband,
            currentUser.uid,
            localData
          );

          console.log("[checkSyncStatus] Status determinado:", {
            id: warband.id,
            status,
          });

          statusMap.set(warband.id, status);

          // Sincronização automática: se IndexedDB é mais recente, envia para Firestore
          if (status === "local-newer" && localData) {
            console.log(
              "[checkSyncStatus] ⚡ IndexedDB mais recente - sincronizando automaticamente..."
            );
            try {
              const result = await syncWarband(warband, currentUser.uid);
              if (result.success) {
                console.log(
                  "[checkSyncStatus] ✅ Sincronização automática bem-sucedida"
                );
                // Atualiza status para synced
                statusMap.set(warband.id, "synced");
              } else {
                console.warn(
                  "[checkSyncStatus] ⚠️ Sincronização automática falhou:",
                  result.message
                );
              }
            } catch (syncError) {
              console.error(
                "[checkSyncStatus] ❌ Erro na sincronização automática:",
                syncError
              );
            }
          }
        } catch (error) {
          console.error("Erro ao buscar dados locais para", warband.id, error);
          statusMap.set(warband.id, "local-only");
        }
      }

      // Verifica status de bandos da nuvem
      for (const warband of userWarbands) {
        const status = await checkSyncStatus(warband, currentUser.uid);
        statusMap.set(warband.id, status);
        // Se Firestore tem mais updates, baixa automaticamente pro cache local
        if (status === "firestore-newer") {
          try {
            await syncWarband(warband, currentUser.uid);
          } catch (e) {
            console.warn(
              "[checkSyncStatus] Falha ao baixar atualizações do Firestore:",
              e
            );
          }
        }
      }

      setSyncStatuses(statusMap);
    };

    checkStatuses();
  }, [localWarbands, userWarbands, currentUser]);

  // Observa coleção de bandos por usuário no Firestore (só carrega se tiver login)
  useEffect(() => {
    // Se ainda está carregando a autenticação, não faz nada
    if (loading) {
      return;
    }

    // Se não tem usuário, não carrega bandos da nuvem
    if (!currentUser) {
      setUserWarbands([]);
      setAuthOpen(false); // Não força login, pode usar bandos locais
      return;
    }

    // Tem usuário: carrega os bandos da nuvem
    setAuthOpen(false);
    const col = collection(db, "users", currentUser.uid, "warbands");
    const q = query(col, orderBy("createdAt", "desc"));
    const off = onSnapshot(q, snap => {
      const items: SavedWarband[] = snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          name: data.name || "",
          faction: data.faction || "",
          initialCrowns: data.initialCrowns ?? 0,
          createdAt: data.createdAt,
          source: "user" as const,
          updatedAt: data.updatedAt?.toDate?.()?.toISOString(),
        };
      });
      setUserWarbands(items);

      // Cache offline (PWA): persiste snapshots do Firestore no IndexedDB
      // Atualiza/insere apenas se o registro não for um bando local explícito
      // Também registra o comprimento do updateLog por id para comparação visual
      const logsMap = new Map<string, number>();
      snap.docs.forEach(d => {
        const dd = d.data();
        const len = Array.isArray(dd.updateLog) ? dd.updateLog.length : 0;
        logsMap.set(d.id, len);
      });
      setRemoteUpdateLogLens(logsMap);
      (async () => {
        try {
          const dbi = await openWarbandDB();
          const tx = dbi.transaction([LOCAL_WARBANDS_STORE], "readwrite");
          const store = tx.objectStore(LOCAL_WARBANDS_STORE);

          for (const docSnap of snap.docs) {
            const data = docSnap.data();
            const id = docSnap.id;
            await new Promise<void>((resolve, reject) => {
              const getReq = store.get(id);
              getReq.onsuccess = () => {
                const existing = getReq.result || {};
                // Se for explicitamente local, não sobrescreve (evita conflito de IDs improvável)
                if (existing && existing.source === "local") {
                  return resolve();
                }
                // Converte updatedAt do Firestore para ISO string, se possível
                let fsUpdatedAt: string | undefined = undefined;
                const rawUpdated = data.updatedAt;
                if (typeof rawUpdated === "string") {
                  fsUpdatedAt = new Date(rawUpdated).toISOString();
                } else if (
                  rawUpdated?.toDate &&
                  typeof rawUpdated.toDate === "function"
                ) {
                  fsUpdatedAt = rawUpdated.toDate().toISOString();
                } else if (rawUpdated?.seconds) {
                  fsUpdatedAt = new Date(
                    rawUpdated.seconds * 1000
                  ).toISOString();
                }

                const record = {
                  ...existing,
                  id,
                  name: data.name || existing.name || "",
                  faction: data.faction || existing.faction || "",
                  notes: data.notes ?? existing.notes ?? "",
                  gold: data.gold ?? existing.gold ?? "0",
                  wyrdstone: data.wyrdstone ?? existing.wyrdstone ?? "0",
                  vault: Array.isArray(data.vault)
                    ? data.vault
                    : existing.vault || [],
                  figures: Array.isArray(data.figures)
                    ? data.figures
                    : existing.figures || [],
                  initialCrowns:
                    data.initialCrowns ?? existing.initialCrowns ?? 0,
                  createdAt:
                    existing.createdAt ||
                    data.createdAt ||
                    new Date().toISOString(),
                  updateLog: Array.isArray(data.updateLog)
                    ? data.updateLog
                    : existing.updateLog || [],
                  // updatedAt local igual ao do Firestore para não gerar falso "local-newer"
                  updatedAt:
                    fsUpdatedAt ||
                    existing.updatedAt ||
                    new Date().toISOString(),
                  source: "user" as const,
                  firestoreUpdatedAt:
                    fsUpdatedAt || existing.firestoreUpdatedAt,
                  userId: currentUser?.uid || existing.userId || null,
                };

                const putReq = store.put(record);
                putReq.onsuccess = () => resolve();
                putReq.onerror = () => reject(putReq.error);
              };
              getReq.onerror = () => reject(getReq.error);
            });
          }
        } catch (e) {
          console.warn(
            "[WarbandBuilderPage] Falha ao cachear bandos do usuário no IndexedDB:",
            e
          );
        }
      })();
    });
    return () => off();
  }, [currentUser, loading]);

  // Função para sincronizar todos os bandos que precisam sincronização
  const handleSyncAll = async () => {
    if (!currentUser) {
      setAuthOpen(true);
      return;
    }

    // Verifica quais bandos precisam sincronização (combina locais e da nuvem)
    const allWarbands = Array.from(
      new Map<string, SavedWarband>([
        ...localWarbands.map(wb => [wb.id, wb] as [string, SavedWarband]),
        ...userWarbands.map(wb => [wb.id, wb] as [string, SavedWarband]),
      ]).values()
    );

    const toSync: SavedWarband[] = [];
    for (const warband of allWarbands) {
      const status =
        syncStatuses.get(warband.id) ||
        (warband.source === "user" ? "synced" : "local-only");
      if (
        status === "local-newer" ||
        status === "firestore-newer" ||
        status === "local-only"
      ) {
        toSync.push(warband);
      }
    }

    if (toSync.length === 0) {
      toast.info("Todos os bandos já estão sincronizados!");
      return;
    }

    setSyncing("all");
    try {
      let successCount = 0;
      let failCount = 0;

      // Processa sincronização em fila para evitar atropelos
      let syncQueue = Promise.resolve();
      for (const warband of toSync) {
        syncQueue = syncQueue.then(async () => {
          const result = await syncWarband(warband, currentUser.uid);
          if (result.success) {
            successCount++;
          } else {
            failCount++;
          }
        });
      }
      await syncQueue;

      // Recarrega listas e status
      const local = await getAllLocalWarbands();
      setLocalWarbands(local as SavedWarband[]);

      if (failCount > 0) {
        toast.warning(`${successCount} sincronizado(s), ${failCount} erro(s)`);
      } else {
        toast.success(`${successCount} bando(s) sincronizado(s) com sucesso!`);
      }
    } catch (error: any) {
      console.error("Erro ao sincronizar:", error);
      toast.error("Erro ao sincronizar bandos");
    } finally {
      setSyncing(null);
    }
  };

  // Função para sincronizar um bando específico
  const handleSyncWarband = async (warband: SavedWarband) => {
    console.log("[Sync] handleSyncWarband chamado:", {
      warbandId: warband.id,
      hasUser: !!currentUser,
      userId: currentUser?.uid,
    });

    if (!currentUser) {
      console.warn("[Sync] Usuário não está logado");
      setAuthOpen(true);
      return;
    }

    setSyncing(warband.id);
    try {
      console.log("[Sync] Chamando syncWarband...");
      const result = await syncWarband(warband, currentUser.uid);
      console.log("[Sync] Resultado:", result);
      if (result.success) {
        toast.success(result.message);
        // Recarrega listas locais (status será atualizado automaticamente pelo useEffect)
        const local = await getAllLocalWarbands();
        setLocalWarbands(local as SavedWarband[]);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      console.error("Erro ao sincronizar:", error);
      toast.error("Erro ao sincronizar bando");
    } finally {
      setSyncing(null);
    }
  };

  // Removido: persistência local foi substituída por Firestore

  const handleCreateWarband = async (
    data: {
      name: string;
      faction: string;
      initialCrowns: number;
    },
    saveLocation: "local" | "user"
  ) => {
    if (saveLocation === "user") {
      // Salva na nuvem (precisa de login)
      if (!currentUser) {
        setAuthOpen(true);
        return;
      }
      const col = collection(db, "users", currentUser.uid, "warbands");
      const docRef = await addDoc(col, {
        name: data.name,
        faction: data.faction,
        initialCrowns: data.initialCrowns,
        createdAt: serverTimestamp(),
      });
      navigate(
        `/warband-builder/roster?faction=${encodeURIComponent(data.faction)}&id=${
          docRef.id
        }&userId=${currentUser.uid}`
      );
    } else {
      // Salva localmente (IndexedDB, sem login)
      // Usa apenas UUID, sem prefixo "local"
      const localId = crypto.randomUUID();
      await saveLocalWarbandHelper(
        localId,
        {
          name: data.name,
          faction: data.faction,
          initialCrowns: data.initialCrowns,
          createdAt: new Date().toISOString(),
        },
        "local"
      );
      // Recarrega bandos locais
      const local = await getAllLocalWarbands();
      setLocalWarbands(local as SavedWarband[]);
      navigate(
        `/warband-builder/roster?faction=${encodeURIComponent(data.faction)}&id=${localId}&local=true`
      );
    }
  };

  // Removido: exclusão local substituída por Firestore

  // Promove um bando local para bando do usuário logado
  const handlePromoteLocalToUser = async (wb: SavedWarband) => {
    if (!currentUser) {
      setAuthOpen(true);
      return;
    }
    try {
      setPromoting(wb.id);
      // Lê dados completos do IndexedDB
      const dbi = await openWarbandDB();
      const localData = await new Promise<any>((resolve, reject) => {
        const tx = dbi.transaction([LOCAL_WARBANDS_STORE], "readonly");
        const store = tx.objectStore(LOCAL_WARBANDS_STORE);
        const req = store.get(wb.id);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });

      if (!localData) {
        toast.error("Bando local não encontrado");
        setPromoting(null);
        return;
      }

      // Sobe para Firestore mantendo o mesmo ID
      const { setDoc } = await import("firebase/firestore");
      const ref = doc(db, "users", currentUser.uid, "warbands", wb.id);
      await setDoc(ref, {
        name: localData.name || "",
        faction: localData.faction || "",
        initialCrowns: localData.initialCrowns || 0,
        notes: localData.notes || "",
        gold: localData.gold || "0",
        wyrdstone: localData.wyrdstone || "0",
        vault: Array.isArray(localData.vault) ? localData.vault : [],
        figures: Array.isArray(localData.figures) ? localData.figures : [],
        updateLog: Array.isArray(localData.updateLog)
          ? localData.updateLog
          : [],
        createdAt: localData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Atualiza o cache local para source: 'user' (não some da lista imediatamente)
      try {
        const tx = dbi.transaction([LOCAL_WARBANDS_STORE], "readwrite");
        const store = tx.objectStore(LOCAL_WARBANDS_STORE);
        await new Promise<void>((resolve, reject) => {
          const getReq = store.get(wb.id);
          getReq.onsuccess = () => {
            const existing = getReq.result || {};
            const nowIso = new Date().toISOString();
            const putReq = store.put({
              ...existing,
              id: wb.id,
              name: localData.name || existing.name || "",
              faction: localData.faction || existing.faction || "",
              notes: localData.notes ?? existing.notes ?? "",
              gold: localData.gold ?? existing.gold ?? "0",
              wyrdstone: localData.wyrdstone ?? existing.wyrdstone ?? "0",
              vault: Array.isArray(localData.vault)
                ? localData.vault
                : existing.vault || [],
              figures: Array.isArray(localData.figures)
                ? localData.figures
                : existing.figures || [],
              initialCrowns:
                localData.initialCrowns ?? existing.initialCrowns ?? 0,
              createdAt: existing.createdAt || localData.createdAt || nowIso,
              updateLog: Array.isArray(localData.updateLog)
                ? localData.updateLog
                : existing.updateLog || [],
              updatedAt: nowIso,
              source: "user" as const,
              firestoreUpdatedAt: nowIso,
            });
            putReq.onsuccess = () => resolve();
            putReq.onerror = () => reject(putReq.error);
          };
          getReq.onerror = () => reject(getReq.error);
        });
      } catch (e) {
        console.warn(
          "[Promote] Falha ao atualizar cache local para 'user':",
          e
        );
      }

      // Recarrega listas locais; a lista do usuário será atualizada via onSnapshot
      const local = await getAllLocalWarbands();
      setLocalWarbands(local as SavedWarband[]);

      toast.success("Bando convertido para bando do usuário");

      // Navega para o roster já no contexto do usuário
      navigate(
        `/warband-builder/roster?faction=${encodeURIComponent(wb.faction)}&id=${wb.id}&userId=${currentUser.uid}`
      );
    } catch (e) {
      console.error("Erro ao promover bando local:", e);
      toast.error("Erro ao transformar em bando do usuário");
    } finally {
      setPromoting(null);
    }
  };

  const goToWarband = (wb: SavedWarband) => {
    if (wb.source === "local") {
      // Bando local: não precisa de userId
      const url = `/warband-builder/roster?faction=${encodeURIComponent(
        wb.faction
      )}&id=${wb.id}&local=true`;
      console.log("[goToWarband] Navegando (LOCAL):", { url, id: wb.id });
      navigate(url);
    } else {
      // Bando do usuário: precisa de userId, mas permite abrir se tiver login
      if (!currentUser) {
        // Tenta abrir como local se o bando também existir localmente
        const fallbackUrl = `/warband-builder/roster?faction=${encodeURIComponent(
          wb.faction
        )}&id=${wb.id}&local=true`;
        console.log("[goToWarband] Sem login, fallback LOCAL:", {
          url: fallbackUrl,
          id: wb.id,
        });
        navigate(fallbackUrl);
        return;
      }
      const userUrl = `/warband-builder/roster?faction=${encodeURIComponent(
        wb.faction
      )}&id=${wb.id}&userId=${currentUser.uid}`;
      console.log("[goToWarband] Navegando (USER):", {
        url: userUrl,
        id: wb.id,
        userId: currentUser.uid,
      });
      navigate(userUrl);
    }
  };

  const handleDeleteWarband = async (wb: SavedWarband) => {
    const ok = window.confirm(
      "Excluir este bando? Esta ação não pode ser desfeita."
    );
    if (!ok) return;

    if (wb.source === "local") {
      // Exclui do IndexedDB
      await deleteLocalWarbandHelper(wb.id);
      const local = await getAllLocalWarbands();
      setLocalWarbands(local as SavedWarband[]);
    } else {
      // Exclui do Firestore (só se tiver login)
      if (!currentUser) {
        // Tenta excluir do IndexedDB se existir localmente
        try {
          await deleteLocalWarbandHelper(wb.id);
          const local = await getAllLocalWarbands();
          setLocalWarbands(local as SavedWarband[]);
          toast.success("Bando excluído localmente");
        } catch (e) {
          toast.error("É necessário fazer login para excluir bandos da nuvem");
        }
        return;
      }
      await deleteDoc(doc(db, "users", currentUser.uid, "warbands", wb.id));
      // Também remove do cache local (IndexedDB), se existir
      try {
        await deleteLocalWarbandHelper(wb.id);
        const local = await getAllLocalWarbands();
        setLocalWarbands(local as SavedWarband[]);
      } catch (e) {
        // silencioso
      }
    }
  };

  // Não mostra loading bloqueante - permite usar bandos locais mesmo sem login

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 max-w-3xl mx-auto">
          <AuthModal
            open={authOpen}
            onClose={() => setAuthOpen(false)}
            user={currentUser}
          />
          <MobileSection>
            <div className="text-center">
              <PageTitle>Gestor de Bandos</PageTitle>
            </div>

            {/* Listas separadas: Locais sempre; Usuário apenas quando logado */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-white mb-2">
                📋 Bandos Locais
              </h2>
              {localWarbands.filter(w => (w.source || "local") === "local")
                .length === 0 && (
                <MobileText className="text-gray-500">
                  Nenhum bando criado. Crie um novo bando para começar.
                </MobileText>
              )}
              {localWarbands.filter(w => (w.source || "local") === "local")
                .length > 0 && (
                <div className="mt-2 space-y-2">
                  {localWarbands
                    .filter(w => (w.source || "local") === "local")
                    .sort((a, b) => {
                      // Ordena por nome
                      return (a.name || "").localeCompare(b.name || "");
                    })
                    .map((wb: SavedWarband) => {
                      return (
                        <div
                          key={wb.id}
                          className="flex flex-col bg-[#1f1f1f] border border-gray-700 rounded px-4 py-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="text-white font-semibold truncate">
                                  {wb.name || "Sem nome"}
                                </div>
                                <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300 whitespace-nowrap">
                                  [LOCAL]
                                </span>
                              </div>
                              <div className="text-xs text-gray-400 mt-1 truncate">
                                Facção:{" "}
                                {factionLabelBySlug.get(wb.faction) ||
                                  wb.faction}{" "}
                                • Coroas iniciais: {wb.initialCrowns}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
                            <button
                              onClick={() => goToWarband(wb)}
                              className="px-3 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white text-sm"
                            >
                              Abrir
                            </button>
                            <button
                              onClick={() => handlePromoteLocalToUser(wb)}
                              disabled={!currentUser || promoting === wb.id}
                              className="px-3 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white text-sm disabled:opacity-50"
                              title={
                                !currentUser
                                  ? "Faça login para transformar em bando do usuário"
                                  : "Transformar em bando do usuário"
                              }
                            >
                              {promoting === wb.id
                                ? "⏳ Transformando..."
                                : "Transformar em bando do usuário"}
                            </button>
                            <button
                              onClick={() => handleDeleteWarband(wb)}
                              className="px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-white text-sm"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {currentUser && (
              <div className="mt-10">
                <h2 className="text-lg font-semibold text-white mb-2">
                  ☁️ Bandos do Usuário
                </h2>
                {(() => {
                  // Mescla lista online com cache local (somente do usuário atual) e remove duplicados
                  const cachedUser = localWarbands.filter(
                    w => w.source === "user" && w.userId === currentUser?.uid
                  );
                  const mergedMap = new Map<string, SavedWarband>();
                  [...userWarbands, ...cachedUser].forEach(w =>
                    mergedMap.set(w.id, w)
                  );
                  const merged = Array.from(mergedMap.values());
                  if (merged.length === 0) {
                    return (
                      <MobileText className="text-gray-500">
                        Nenhum bando na nuvem.
                      </MobileText>
                    );
                  }
                  return (
                    <div className="mt-2 space-y-2">
                      {merged
                        .sort((a, b) =>
                          (a.name || "").localeCompare(b.name || "")
                        )
                        .map((wb: SavedWarband) => (
                          <div
                            key={wb.id}
                            className="flex flex-col bg-[#1f1f1f] border border-gray-700 rounded px-4 py-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <div className="text-white font-semibold truncate">
                                    {wb.name || "Sem nome"}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-400 mt-1 truncate">
                                  Facção:{" "}
                                  {factionLabelBySlug.get(wb.faction) ||
                                    wb.faction}{" "}
                                  • Coroas iniciais: {wb.initialCrowns}
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
                              {(() => {
                                const cached = localWarbands.find(
                                  w =>
                                    w.id === wb.id &&
                                    w.source === "user" &&
                                    w.userId === currentUser?.uid
                                ) as any;
                                const localLogLen = Array.isArray(
                                  cached?.updateLog
                                )
                                  ? cached.updateLog.length
                                  : undefined;
                                const remoteLogLen = remoteUpdateLogLens.get(
                                  wb.id
                                );
                                if (
                                  typeof localLogLen === "number" &&
                                  typeof remoteLogLen === "number" &&
                                  localLogLen === remoteLogLen &&
                                  remoteLogLen > 0
                                ) {
                                  return (
                                    <span
                                      className="px-2 py-0.5 rounded bg-green-700/70 text-green-100 text-xs cursor-default select-none"
                                      title="Sincronizado com a nuvem"
                                    >
                                      ✓ Sincronizado
                                    </span>
                                  );
                                }
                                return null;
                              })()}
                              <button
                                onClick={() => goToWarband(wb)}
                                className="px-3 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white text-sm"
                              >
                                Abrir
                              </button>
                              <button
                                onClick={() => handleDeleteWarband(wb)}
                                className="px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-white text-sm"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  );
                })()}
              </div>
            )}

            <div className="mt-6 flex justify-center gap-3 flex-wrap">
              <button
                onClick={() => setCreateOpen(true)}
                className="px-4 py-2 rounded bg-green-700 hover:bg-green-600 text-white"
              >
                Criar Bando
              </button>
            </div>
          </MobileSection>

          <CreateWarbandModal
            open={createOpen}
            onClose={() => setCreateOpen(false)}
            onCreate={(data, location) =>
              handleCreateWarband(
                data,
                location || (currentUser ? "user" : "local")
              )
            }
            factions={factionOptions}
            allowLocationChoice={!!currentUser}
            hasUser={!!currentUser}
          />
        </div>
      </div>
    </div>
  );
}

export default WarbandBuilderPage;
