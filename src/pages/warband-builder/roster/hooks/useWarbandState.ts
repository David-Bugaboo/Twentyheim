/**
 * Hook para gerenciar o estado do warband (carregar, salvar, atualizar)
 */

import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../../../firebase.ts";
import { useAuth } from "../../../../context/AuthContext";
import {
  getLocalWarband,
  saveLocalWarband,
  openWarbandDB,
  LOCAL_WARBANDS_STORE,
} from "../helpers/indexedDb.helpers";

export interface Warband {
  name: string;
  faction?: string;
  notes?: string;
  gold?: string;
  wyrdstone?: string;
  vault?: any[];
  figures?: any[];
}

export function useWarbandState() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fixedFaction = params.get("faction") || "";
  const warbandId = params.get("id") || "";
  const userId = params.get("userId") || "";
  const isLocal = params.get("local") === "true";
  const { currentUser, loading } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [warbandSource, setWarbandSource] = useState<"local" | "user">("local");
  const [hasNewerVersionInFirestore, setHasNewerVersionInFirestore] =
    useState<boolean>(false);
  const [warband, setWarband] = useState<Warband>({
    name: "",
    faction: fixedFaction || "",
    notes: "",
    gold: "500",
    wyrdstone: "0",
    vault: [],
    figures: [],
  });

  const hasLoadedRef = useRef<boolean>(false);
  const warbandRef = useRef(warband);
  const warbandSourceRef = useRef(warbandSource);

  // Proteções de rota desativadas
  // const isAuthorized = isLocal || !userId || (currentUser && currentUser.uid === userId);

  // Atualiza refs quando mudam
  useEffect(() => {
    warbandRef.current = warband;
  }, [warband]);

  useEffect(() => {
    warbandSourceRef.current = warbandSource;
  }, [warbandSource]);

  // Proteções de rota desativadas
  // useEffect(() => {
  //   if (loading || isLocal) return;
  //   if (!currentUser || !isAuthorized) {
  //     if (warbandId) {
  //       navigate(
  //         `/warband-builder/roster?faction=${encodeURIComponent(fixedFaction)}&id=${warbandId}&local=true`,
  //         { replace: true }
  //       );
  //     } else {
  //       navigate("/warband-builder");
  //     }
  //   }
  // }, [loading, currentUser, isAuthorized, navigate, isLocal, warbandId, fixedFaction]);

  // Carrega warband do Firestore ou IndexedDB
  useEffect(() => {
    if (loading || !warbandId) return;

    const shouldLoadLocal = isLocal || !userId; // Sem userId, trata como local puro
    console.log("[useWarbandState] Params:", {
      isLocal,
      userId,
      warbandId,
      fixedFaction,
      shouldLoadLocal,
    });
    // Se é local (ou sem userId), carrega do IndexedDB
    if (shouldLoadLocal) {
      setIsLoading(true);
      console.log("[useWarbandState] Tentando carregar do IndexedDB…", {
        warbandId,
      });
      // Pequeno helper de re-tentativa para casos de navegação logo após salvamento
      const tryLoadLocal = async (attempt: number): Promise<any | null> => {
        const result = await getLocalWarband(warbandId);
        if (result || attempt >= 2) return result; // até 3 tentativas (0,1,2)
        await new Promise(r => setTimeout(r, 150)); // pequeno atraso
        return tryLoadLocal(attempt + 1);
      };

      tryLoadLocal(0)
        .then(async data => {
          if (!data) {
            console.warn(
              "[useWarbandState][local] Bando não encontrado no IndexedDB:",
              { warbandId }
            );
            setNotFound(true);
            setIsLoading(false);
            return;
          }

          setWarbandSource(data.source || "local");
          console.log("[useWarbandState] Carregado local:", {
            id: warbandId,
            source: data.source,
            name: data.name,
          });

          // Proteções de rota desativadas - permite carregar bandos "user" mesmo sem login
          setWarband({
            name: data.name ?? "",
            faction: data.faction ?? fixedFaction,
            notes: data.notes ?? "",
            gold: data.gold ?? "500",
            wyrdstone: data.wyrdstone ?? "0",
            vault: Array.isArray(data.vault) ? data.vault : [],
            figures: Array.isArray(data.figures) ? data.figures : [],
          });

          // Se o bando local tem userId, verifica se há versão mais recente no Firestore
          if (userId && currentUser && currentUser.uid === userId) {
            try {
              const firestoreRef = doc(
                db,
                "users",
                userId,
                "warbands",
                warbandId
              );
              const firestoreSnap = await getDoc(firestoreRef);

              if (firestoreSnap.exists()) {
                const firestoreData = firestoreSnap.data();
                const firestoreUpdatedAt = firestoreData?.updatedAt
                  ? typeof firestoreData.updatedAt === "string"
                    ? new Date(firestoreData.updatedAt).getTime()
                    : firestoreData.updatedAt?.toDate?.()?.getTime() || 0
                  : 0;

                const localUpdatedAt = data.updatedAt
                  ? new Date(data.updatedAt).getTime()
                  : 0;

                const firestoreIsNewer = firestoreUpdatedAt > localUpdatedAt;
                setHasNewerVersionInFirestore(firestoreIsNewer);
              }
            } catch (e) {
              console.warn("Erro ao verificar versão no Firestore:", e);
            }
          }

          setIsLoading(false);
          setHasUnsavedChanges(false);
        })
        .catch(error => {
          console.error(
            "[useWarbandState][local] Erro ao carregar bando local:",
            error
          );
          setNotFound(true);
          setIsLoading(false);
        });
      return;
    }

    // Se não é local, carrega do Firestore
    // Proteções de rota desativadas - removida checagem de isAuthorized

    console.log("[useWarbandState] Tentando carregar do Firestore…", {
      warbandId,
      userId,
    });
    setIsLoading(true);
    const ref = doc(db, "users", userId, "warbands", warbandId);
    const unsub = onSnapshot(ref, async snap => {
      if (!snap.exists()) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      const data: any = snap.data() || {};
      const source = data;

      if (!hasLoadedRef.current) {
        // NO LOAD: APENAS LEITURA! Não faz escrita no banco durante o load
        // Primeiro tenta carregar do IndexedDB (cache local)
        try {
          const localData = await getLocalWarband(warbandId);

          // Compara usando firestoreUpdatedAt do IndexedDB (última sincronização conhecida)
          // vs updatedAt do Firestore (versão atual na nuvem)
          let firestoreDate: Date | null = null;
          let lastKnownFirestoreDate: Date | null = null;

          // Converte updatedAt do Firestore para Date
          if (data?.updatedAt) {
            if (typeof data.updatedAt === "string") {
              firestoreDate = new Date(data.updatedAt);
            } else if (
              data.updatedAt?.toDate &&
              typeof data.updatedAt.toDate === "function"
            ) {
              firestoreDate = data.updatedAt.toDate();
            } else if (data.updatedAt?.seconds) {
              // Timestamp do Firestore em formato {seconds, nanoseconds}
              firestoreDate = new Date(data.updatedAt.seconds * 1000);
            }
          }

          // Usa firestoreUpdatedAt do IndexedDB (última versão sincronizada conhecida)
          // em vez de updatedAt do IndexedDB (que sempre é atualizado)
          if (localData?.firestoreUpdatedAt) {
            lastKnownFirestoreDate = new Date(localData.firestoreUpdatedAt);
          }

          // Compara: Firestore atual vs última sincronização conhecida
          let firestoreIsNewer = false;
          if (firestoreDate && lastKnownFirestoreDate) {
            firestoreIsNewer =
              firestoreDate.getTime() > lastKnownFirestoreDate.getTime();
          } else if (firestoreDate && !lastKnownFirestoreDate) {
            // Se tem Firestore mas nunca sincronizamos, considera que pode ser mais recente
            // Só marca como mais recente se realmente for diferente
            // Mas se acabamos de salvar (updatedAt do IndexedDB é muito recente), considera sincronizado
            if (localData?.updatedAt) {
              const localUpdatedAt = new Date(localData.updatedAt).getTime();
              const firestoreUpdatedAt = firestoreDate.getTime();
              // Se a diferença for menor que 5 segundos, considera sincronizado
              const diffMs = Math.abs(localUpdatedAt - firestoreUpdatedAt);
              firestoreIsNewer =
                diffMs > 5000 && firestoreUpdatedAt > localUpdatedAt;
            } else {
              firestoreIsNewer = true;
            }
          }

          console.log("[useWarbandState] Comparação de datas updatedAt:", {
            firestoreUpdatedAt: firestoreDate
              ? firestoreDate.toISOString()
              : "n/a",
            lastKnownFirestoreUpdatedAt: lastKnownFirestoreDate
              ? lastKnownFirestoreDate.toISOString()
              : "n/a",
            localUpdatedAt: localData?.updatedAt || "n/a",
            firestoreTimestamp: firestoreDate ? firestoreDate.getTime() : 0,
            lastKnownFirestoreTimestamp: lastKnownFirestoreDate
              ? lastKnownFirestoreDate.getTime()
              : 0,
            firestoreIsNewer,
            differenceMs:
              firestoreDate && lastKnownFirestoreDate
                ? firestoreDate.getTime() - lastKnownFirestoreDate.getTime()
                : 0,
          });

          setHasNewerVersionInFirestore(firestoreIsNewer);

          if (firestoreIsNewer) {
            console.log(
              "[useWarbandState] ⚠️ Firestore é mais recente que IndexedDB!"
            );
          } else {
            console.log(
              "[useWarbandState] ✅ IndexedDB está atualizado ou é igual ao Firestore"
            );
          }

          if (localData) {
            // Usa dados do IndexedDB se existirem
            setWarbandSource(localData.source || "user");
            setWarband({
              name: localData.name ?? "",
              faction: localData.faction ?? fixedFaction,
              notes: localData.notes ?? "",
              gold: localData.gold ?? "500",
              wyrdstone: localData.wyrdstone ?? "0",
              vault: Array.isArray(localData.vault) ? localData.vault : [],
              figures: Array.isArray(localData.figures)
                ? localData.figures
                : [],
            });
          } else {
            // Se não existe local, usa dados do Firestore (mas não salva ainda)
            setWarbandSource("user");
            setWarband({
              name: source.name ?? "",
              faction: source.faction ?? fixedFaction,
              notes: source.notes ?? "",
              gold: source.gold ?? "500",
              wyrdstone: source.wyrdstone ?? "0",
              vault: Array.isArray(source.vault) ? source.vault : [],
              figures: Array.isArray(source.figures) ? source.figures : [],
            });
          }
        } catch (e) {
          console.warn("Erro ao ler do IndexedDB durante load:", e);
          // Fallback: usa dados do Firestore
          setWarbandSource("user");
          setWarband({
            name: source.name ?? "",
            faction: source.faction ?? fixedFaction,
            notes: source.notes ?? "",
            gold: source.gold ?? "500",
            wyrdstone: source.wyrdstone ?? "0",
            vault: Array.isArray(source.vault) ? source.vault : [],
            figures: Array.isArray(source.figures) ? source.figures : [],
          });
          setHasNewerVersionInFirestore(false);
        }

        hasLoadedRef.current = true;
        setHasUnsavedChanges(false);
        setIsLoading(false);
      } else {
        // Após o carregamento inicial, continua verificando se há versão mais recente no Firestore
        try {
          const localData = await getLocalWarband(warbandId);
          if (localData) {
            // Compara usando firestoreUpdatedAt do IndexedDB vs updatedAt do Firestore
            let firestoreDate: Date | null = null;
            let lastKnownFirestoreDate: Date | null = null;

            // Converte updatedAt do Firestore para Date
            if (data?.updatedAt) {
              if (typeof data.updatedAt === "string") {
                firestoreDate = new Date(data.updatedAt);
              } else if (
                data.updatedAt?.toDate &&
                typeof data.updatedAt.toDate === "function"
              ) {
                firestoreDate = data.updatedAt.toDate();
              } else if (data.updatedAt?.seconds) {
                firestoreDate = new Date(data.updatedAt.seconds * 1000);
              }
            }

            // Usa firestoreUpdatedAt do IndexedDB (última versão sincronizada conhecida)
            if (localData.firestoreUpdatedAt) {
              lastKnownFirestoreDate = new Date(localData.firestoreUpdatedAt);
            }

            // Compara: Firestore atual vs última sincronização conhecida
            let firestoreIsNewer = false;
            if (firestoreDate && lastKnownFirestoreDate) {
              firestoreIsNewer =
                firestoreDate.getTime() > lastKnownFirestoreDate.getTime();
            } else if (firestoreDate && !lastKnownFirestoreDate) {
              // Se tem Firestore mas nunca sincronizamos, verifica com margem de erro
              if (localData?.updatedAt) {
                const localUpdatedAt = new Date(localData.updatedAt).getTime();
                const firestoreUpdatedAt = firestoreDate.getTime();
                const diffMs = Math.abs(localUpdatedAt - firestoreUpdatedAt);
                firestoreIsNewer =
                  diffMs > 5000 && firestoreUpdatedAt > localUpdatedAt;
              } else {
                firestoreIsNewer = true;
              }
            }

            console.log("[useWarbandState] Verificação contínua:", {
              firestoreUpdatedAt: firestoreDate
                ? firestoreDate.toISOString()
                : "n/a",
              lastKnownFirestoreUpdatedAt: lastKnownFirestoreDate
                ? lastKnownFirestoreDate.toISOString()
                : "n/a",
              localUpdatedAt: localData?.updatedAt || "n/a",
              firestoreTimestamp: firestoreDate ? firestoreDate.getTime() : 0,
              lastKnownFirestoreTimestamp: lastKnownFirestoreDate
                ? lastKnownFirestoreDate.getTime()
                : 0,
              firestoreIsNewer,
              differenceMs:
                firestoreDate && lastKnownFirestoreDate
                  ? firestoreDate.getTime() - lastKnownFirestoreDate.getTime()
                  : 0,
            });

            setHasNewerVersionInFirestore(firestoreIsNewer);

            if (firestoreIsNewer) {
              console.log(
                "[useWarbandState] ⚠️ Firestore é mais recente (verificação contínua)!"
              );
            }
          }
        } catch (e) {
          console.warn("Erro ao verificar versão mais recente:", e);
        }
      }
    });

    return () => unsub();
  }, [warbandId, userId, loading, isLocal, fixedFaction, currentUser]);

  // Função para atualizar do Firestore
  const updateFromFirestore = async () => {
    if (!userId || !warbandId || isLocal) return;

    try {
      setIsLoading(true);
      const firestoreRef = doc(db, "users", userId, "warbands", warbandId);
      const firestoreSnap = await getDoc(firestoreRef);

      if (!firestoreSnap.exists()) {
        toast.error("Bando não encontrado no Firestore");
        setIsLoading(false);
        return;
      }

      const firestoreData = firestoreSnap.data();
      const fsUpdatedAt = firestoreData.updatedAt
        ? typeof firestoreData.updatedAt === "string"
          ? firestoreData.updatedAt
          : firestoreData.updatedAt?.toDate?.()?.toISOString() ||
            new Date().toISOString()
        : new Date().toISOString();

      // Atualiza o warband com dados do Firestore
      setWarband({
        name: firestoreData.name ?? "",
        faction: firestoreData.faction ?? fixedFaction,
        notes: firestoreData.notes ?? "",
        gold: firestoreData.gold ?? "500",
        wyrdstone: firestoreData.wyrdstone ?? "0",
        vault: Array.isArray(firestoreData.vault) ? firestoreData.vault : [],
        figures: Array.isArray(firestoreData.figures)
          ? firestoreData.figures
          : [],
      });

      // Salva no IndexedDB e Firestore (isso atualiza o updatedAt do IndexedDB e Firestore)
      await saveLocalWarband(
        warbandId,
        {
          name: firestoreData.name ?? "",
          faction: firestoreData.faction ?? "",
          notes: firestoreData.notes ?? "",
          gold: firestoreData.gold ?? "500",
          wyrdstone: firestoreData.wyrdstone ?? "0",
          vault: Array.isArray(firestoreData.vault) ? firestoreData.vault : [],
          figures: Array.isArray(firestoreData.figures)
            ? firestoreData.figures
            : [],
        },
        warbandSource,
        userId
      );

      // Atualiza firestoreUpdatedAt no IndexedDB para indicar que está sincronizado
      const dbInstance = await openWarbandDB();
      await new Promise<void>((resolve, reject) => {
        const transaction = dbInstance.transaction(
          [LOCAL_WARBANDS_STORE],
          "readwrite"
        );
        const store = transaction.objectStore(LOCAL_WARBANDS_STORE);
        const getRequest = store.get(warbandId);

        getRequest.onsuccess = () => {
          const existing = getRequest.result || {};
          store.put({
            ...existing,
            firestoreUpdatedAt: fsUpdatedAt,
          });
          resolve();
        };
        getRequest.onerror = () => reject(getRequest.error);
      });

      setHasNewerVersionInFirestore(false);
      setHasUnsavedChanges(false);
      toast.success("Bando atualizado do Firestore!");
      setIsLoading(false);
    } catch (error: any) {
      console.error("Erro ao atualizar do Firestore:", error);
      toast.error("Erro ao atualizar do Firestore. Tente novamente.");
      setIsLoading(false);
    }
  };

  return {
    warband,
    setWarband,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    isLoading,
    notFound,
    warbandId,
    warbandSource,
    warbandSourceRef,
    warbandRef,
    fixedFaction,
    isLocal,
    hasNewerVersionInFirestore,
    updateFromFirestore,
    userId: currentUser?.uid || userId || null, // Retorna userId se disponível
  };
}
