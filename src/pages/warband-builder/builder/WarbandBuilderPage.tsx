import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import MobileSection from "../../../components/MobileSection";
import MobileText from "../../../components/MobileText";
import AuthModal from "../../../components/AuthModal";
import { useAuth } from "../../../context/AuthContext";
import CreateWarbandModal from "../../../components/CreateWarbandModal";
import { db } from "../../../firebase.ts";
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

type SavedWarband = {
  id: string;
  name: string;
  faction: string;
  initialCrowns: number;
  createdAt?: any;
};

// Persistência local substituída por Firestore

function WarbandBuilderPage() {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();
  const [list, setList] = useState<SavedWarband[]>([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
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
    factionOptions.forEach((f) => m.set(f.slug, f.label));
    return m;
  }, [factionOptions]);

  // Observa coleção de bandos por usuário - só carrega depois que o usuário estiver populado
  useEffect(() => {
    // Se ainda está carregando a autenticação, não faz nada
    if (loading) {
      return;
    }

    // Se não tem usuário após o loading terminar, abre modal de login
    if (!currentUser) {
      setAuthOpen(true);
      setList([]);
      return;
    }

    // Tem usuário: carrega os bandos
    setAuthOpen(false);
    const col = collection(db, "users", currentUser.uid, "warbands");
    const q = query(col, orderBy("createdAt", "desc"));
    const off = onSnapshot(q, (snap) => {
      const items: SavedWarband[] = snap.docs.map((d) => ({
        id: d.id,
        name: d.get("name") || "",
        faction: d.get("faction") || "",
        initialCrowns: d.get("initialCrowns") ?? 0,
        createdAt: d.get("createdAt"),
      }));
      setList(items);
    });
    return () => off();
  }, [currentUser, loading]);

  // Removido: persistência local foi substituída por Firestore

  const handleCreateWarband = async (data: {
    name: string;
    faction: string;
    initialCrowns: number;
  }) => {
    if (!currentUser) throw new Error("É necessário estar logado.");
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
  };

  // Removido: exclusão local substituída por Firestore

  const goToWarband = (wb: SavedWarband) => {
    if (!currentUser) return;
    navigate(
      `/warband-builder/roster?faction=${encodeURIComponent(wb.faction)}&id=${
        wb.id
      }&userId=${currentUser.uid}`
    );
  };

  const handleDeleteWarband = async (id: string) => {
    if (!currentUser) return;
    const ok = window.confirm(
      "Excluir este bando? Esta ação não pode ser desfeita."
    );
    if (!ok) return;
    await deleteDoc(doc(db, "users", currentUser.uid, "warbands", id));
  };

  // Mostra loading enquanto authContext está carregando
  if (loading) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 max-w-3xl mx-auto">
            <MobileSection>
              <div className="text-center py-12">
                <PageTitle>Carregando usuário…</PageTitle>
                <div className="flex items-center justify-center py-12">
                  <div className="h-10 w-10 rounded-full border-4 border-green-500/40 border-t-green-400 animate-spin" />
                </div>
              </div>
            </MobileSection>
          </div>
        </div>
      </div>
    );
  }

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
              <PageTitle>Bandos de {userDisplayName || "Usuário"}</PageTitle>
              {list.length === 0 ? (
                <MobileText>Sem bandos criados.</MobileText>
              ) : null}
            </div>
            {list.length > 0 ? (
              <div className="mt-4 space-y-2">
                {list.map((wb) => (
                  <div
                    key={wb.id}
                    className="flex items-center justify-between bg-[#1f1f1f] border border-gray-700 rounded px-4 py-3"
                  >
                    <div>
                      <div className="text-white font-semibold">{wb.name}</div>
                      <div className="text-xs text-gray-400">
                        Facção:{" "}
                        {factionLabelBySlug.get(wb.faction) || wb.faction} •
                        Coroas iniciais: {wb.initialCrowns}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => goToWarband(wb)}
                        className="px-3 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white text-sm"
                      >
                        Abrir
                      </button>
                      <button
                        onClick={() => handleDeleteWarband(wb.id)}
                        className="px-3 py-1 rounded bg-red-700 hover:bg-red-600 text-white text-sm"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-6 flex justify-center">
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
            onCreate={handleCreateWarband}
            factions={factionOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default WarbandBuilderPage;
