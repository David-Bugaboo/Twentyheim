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

// REMOVIDO: funções de sincronização não utilizadas

// Tipo para status de sincronização
// REMOVIDO: SyncStatus e checkSyncStatus não utilizados

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
  // Sem badge de sincronização
  // sincronização manual desativada
  const [promoting, setPromoting] = useState<string | null>(null);
  // display de usuário não utilizado

  // Facções disponíveis no jogo (slug + rótulo)
  const factionOptions = useMemo(
    () => [
      { slug: "mercenaries-reikland", label: "Mercenários [Reikland]" },
      { slug: "mercenaries-middenheim", label: "Mercenários [Middenheim]" },
      { slug: "mercenaries-marienburg", label: "Mercenários [Marienburg]" },
      { slug: "mercenaries-ostermark", label: "Mercenários [Ostermark]" },
      { slug: "sisters-of-sigmar", label: "Irmãs de Sigmar" },
      { slug: "skaven", label: "Skaven" },
      { slug: "beastman-raiders", label: "Saqueadores Homem-Fera" },
      { slug: "dwarf-treasure-hunters", label: "Caçadores de Tesouro Anões" },
      { slug: "lizardmen", label: "Reptilianos" },
      { slug: "orc-mob", label: "Horda Orc" },
      { slug: "goblins", label: "Goblins" },
      { slug: "sons-of-hashut", label: "Filhos de Hashut" },
      { slug: "vampire-courts-von-carstein", label: "Cortes Vampíricas [Von Carstein]" },
      { slug: "vampire-courts-blood-dragon", label: "Cortes Vampíricas [Dragão Carmesim]" },
      { slug: "vampire-courts-necrarch", label: "Cortes Vampíricas [Necrarca]" },
      { slug: "vampire-courts-lahmia", label: "Cortes Vampíricas [Lâmia]" },
      { slug: "vampire-courts-strigoi", label: "Cortes Vampíricas [Strigoi]" },
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
      const local = await getAllLocalWarbands();
      setLocalWarbands(local as SavedWarband[]);
    };
    loadLocalWarbands();
  }, []);

  // Recarrega bandos quando volta para esta página (via React Router)
  useEffect(() => {
    // Só recarrega se a rota atual é a página de seleção de bandos
    if (location.pathname === "/warband-builder") {
      const loadLocalWarbands = async () => {
        const local = await getAllLocalWarbands();
        setLocalWarbands(local as SavedWarband[]);
      };
      loadLocalWarbands();
    }
  }, [location.pathname]);

  // Recarrega bandos locais quando volta da página de roster (para atualizar updatedAt)
  useEffect(() => {
    const handleFocus = () => {
      const loadLocalWarbands = async () => {
        const local = await getAllLocalWarbands();
        setLocalWarbands(local as SavedWarband[]);
      };
      loadLocalWarbands();
    };

    // Também recarrega quando a página fica visível (usando Visibility API)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const loadLocalWarbands = async () => {
          const local = await getAllLocalWarbands();
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

  // Sincronização automática desativada

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

      // Não cacheamos mais bandos do usuário no IndexedDB
      // Sem mapeamento de updateLog para badge
    });
    return () => off();
  }, [currentUser, loading]);

  // sincronização em massa desativada

  // Função para sincronizar um bando específico
  // sincronização individual desativada

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

      navigate(url);
    } else {
      // Bando do usuário: precisa de userId, mas permite abrir se tiver login
      if (!currentUser) {
        // Tenta abrir como local se o bando também existir localmente
        const fallbackUrl = `/warband-builder/roster?faction=${encodeURIComponent(
          wb.faction
        )}&id=${wb.id}&local=true`;
        navigate(fallbackUrl);
        return;
      }
      const userUrl = `/warband-builder/roster?faction=${encodeURIComponent(
        wb.faction
      )}&id=${wb.id}&userId=${currentUser.uid}`;

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
                  // NÃO cacheamos mais bandos do usuário no IndexedDB
                  const merged = userWarbands;
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
                              {/* Sem badge de sincronização (Firestore-only) */}
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
