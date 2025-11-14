import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../components/PageTitle";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import ErrorBoundary from "../../components/ErrorBoundary";
import AuthModal, { type AuthMode } from "../../components/AuthModal";
import {
  deleteWarband,
  fetchFactions,
  createWarband,
  type FactionSummary,
} from "../../services/warbands.service";

const WarbandManagerPage: React.FC = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const warbands = useMemo(
    () => currentUser?.warbands ?? [],
    [currentUser]
  );
  const isLoading = loading && !currentUser;
  const hasWarbands = warbands.length > 0;
  const [displayWarbands, setDisplayWarbands] = useState(warbands);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [factions, setFactions] = useState<FactionSummary[]>([]);
  const [factionsLoading, setFactionsLoading] = useState(false);
  const [factionError, setFactionError] = useState<string | null>(null);
  const [selectedFaction, setSelectedFaction] = useState<string>("");
  const [warbandName, setWarbandName] = useState("");
  const [crownsValue, setCrownsValue] = useState("");
  const [wyrdstoneValue, setWyrdstoneValue] = useState("");
  const [creating, setCreating] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>("login");

  useEffect(() => {
    setDisplayWarbands(warbands);
  }, [warbands]);

  const requiresAuth = !loading && !currentUser;

  useEffect(() => {
    if (!requiresAuth) {
      setAuthModalMode("login");
    }
  }, [requiresAuth]);

  const handleOpenCreate = useCallback(() => {
    setCreateOpen(true);
    if (factions.length === 0 && !factionsLoading) {
      setFactionsLoading(true);
      fetchFactions()
        .then(response => {
          setFactions(response);
          if (response.length > 0) {
            setSelectedFaction(response[0].slug);
          }
        })
        .catch(error => {
          console.error(error);
          setFactionError("Não foi possível carregar as facções.");
        })
        .finally(() => setFactionsLoading(false));
    }
  }, [factions.length, factionsLoading]);

  const handleCloseCreate = useCallback(() => {
    if (creating) return;
    setCreateOpen(false);
    setFactionError(null);
    setFactionsLoading(false);
    setWarbandName("");
    setCrownsValue("");
    setWyrdstoneValue("");
  }, [creating]);

  const handleDeleteWarband = useCallback(
    async (warbandId: string) => {
      if (deletingId) return;
      setDeletingId(warbandId);
      try {
        await deleteWarband(warbandId);
        toast.success("Bando removido com sucesso.");
        setDisplayWarbands(prev =>
          prev.filter(warband => warband.id !== warbandId)
        );
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível remover o bando.");
      } finally {
        setDeletingId(prev => (prev === warbandId ? null : prev));
      }
    },
    [deletingId]
  );

  const parsedCrowns = useMemo(() => {
    const trimmed = crownsValue.trim();
    if (!trimmed) return undefined;
    const parsed = Number(trimmed.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : undefined;
  }, [crownsValue]);

  const parsedWyrdstone = useMemo(() => {
    const trimmed = wyrdstoneValue.trim();
    if (!trimmed) return undefined;
    const parsed = Number(trimmed.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : undefined;
  }, [wyrdstoneValue]);

  const creationDisabled = useMemo(() => {
    if (!warbandName.trim() || !selectedFaction) return true;
    if (creating) return true;
    if (crownsValue.trim().length > 0 && parsedCrowns === undefined) return true;
    if (wyrdstoneValue.trim().length > 0 && parsedWyrdstone === undefined) {
      return true;
    }
    return false;
  }, [
    warbandName,
    selectedFaction,
    creating,
    crownsValue,
    parsedCrowns,
    wyrdstoneValue,
    parsedWyrdstone,
  ]);

  const handleCreateWarband = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (creationDisabled) return;
      try {
        setCreating(true);
        const payload = {
          name: warbandName.trim(),
          crowns: parsedCrowns,
          wyrdstone: parsedWyrdstone,
        };
        const created = await createWarband(selectedFaction, payload);
        toast.success("Bando criado com sucesso.");
        setDisplayWarbands(prev => [
          ...prev,
          created ?? {
            id: crypto.randomUUID(),
            name: payload.name,
            crowns: payload.crowns ?? 0,
            wyrdstone: payload.wyrdstone ?? 0,
            factionSlug: selectedFaction,
            faction: factions.find(f => f.slug === selectedFaction),
            createdAt: new Date().toISOString(),
          },
        ]);
        handleCloseCreate();
      } catch (error) {
        console.error(error);
        toast.error("Não foi possível criar o bando.");
      } finally {
        setCreating(false);
      }
    },
    [
      creationDisabled,
      parsedCrowns,
      parsedWyrdstone,
      selectedFaction,
      factions,
      handleCloseCreate,
      warbandName,
    ]
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#121212] dark group/design-root">
      <div className="py-4">
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
          <MobileSection>
            <PageTitle>Meus Bandos</PageTitle>
            <MobileText>
              Gerencie seus bandos cadastrados, acompanhe coroas e pedra-bruxa,
              e acesse detalhes rapidamente.
            </MobileText>
          </MobileSection>

          <MobileSection className="mt-4">
            {isLoading ? (
              <MobileText>Carregando bandos...</MobileText>
            ) : !currentUser ? (
              <MobileText>
                Faça login para visualizar e gerenciar seus bandos.
              </MobileText>
            ) : displayWarbands.length === 0 ? (
              <MobileText>
                Você ainda não possui bandos cadastrados. Use o Gestor de Bando
                para criar o primeiro!
              </MobileText>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mt-4">
                {displayWarbands.map((warband) => (
                  <div
                    key={warband.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/tools/warband-manager/${warband.id}`)}
                    onKeyDown={event => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        navigate(`/tools/warband-manager/${warband.id}`);
                      }
                    }}
                    className="group/card rounded-lg border border-green-700/60 bg-[#1a1a1a] p-4 shadow-lg transition hover:border-green-400/70 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500/60"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-green-200 font-[Cinzel]">
                          {warband.name}
                        </h3>
                        <div className="mt-1 text-xs uppercase text-green-400 bg-green-900/20 px-2 py-1 rounded">
                          {warband.faction?.name ?? warband.factionSlug}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={event => {
                          event.stopPropagation();
                          handleDeleteWarband(warband.id);
                        }}
                        disabled={deletingId === warband.id}
                        className="inline-flex items-center gap-1 rounded border border-red-600/60 bg-red-900/20 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-red-200 transition hover:border-red-400 hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <DeleteOutlineIcon fontSize="inherit" />
                        {deletingId === warband.id ? "Removendo..." : "Remover"}
                      </button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span className="font-semibold text-green-300">
                          Coroas
                        </span>
                        <span>{warband.crowns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-green-300">
                          Pedra-bruxa
                        </span>
                        <span>{warband.wyrdstone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-green-300">
                          Criado em
                        </span>
                        <span>
                          {new Date(warband.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </MobileSection>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center justify-center rounded border border-green-600/60 bg-green-900/20 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-400 hover:bg-green-900/40"
            >
              Criar novo bando
            </button>
          </div>
        </div>
      </div>

      {createOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-lg rounded-lg border border-green-700/60 bg-[#101010] p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-green-200">
                Criar Bando
              </h2>
              <button
                type="button"
                onClick={handleCloseCreate}
                disabled={creating}
                className="rounded border border-gray-600/60 bg-gray-900/20 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-200 transition hover:border-gray-400 hover:bg-gray-900/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Fechar
              </button>
            </div>
            <form className="space-y-3" onSubmit={handleCreateWarband}>
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-green-300">
                  Facção
                </label>
                <select
                  value={selectedFaction}
                  onChange={event => setSelectedFaction(event.target.value)}
                  disabled={factionsLoading || factions.length === 0 || creating}
                  className="w-full rounded border border-green-700 bg-[#0c0f0d] px-3 py-2 text-sm text-gray-200 outline-none transition focus:border-green-400"
                >
                  {factions.length === 0 ? (
                    <option value="">
                      {factionsLoading
                        ? "Carregando..."
                        : "Nenhuma facção disponível"}
                    </option>
                  ) : null}
                  {factions.map(faction => (
                    <option key={faction.slug} value={faction.slug}>
                      {faction.name}
                    </option>
                  ))}
                </select>
                {factionError ? (
                  <p className="text-xs text-red-300">{factionError}</p>
                ) : null}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-green-300">
                  Nome do bando
                </label>
                <input
                  type="text"
                  value={warbandName}
                  onChange={event => setWarbandName(event.target.value)}
                  placeholder="Digite o nome do bando"
                  className="w-full rounded border border-green-700 bg-[#0c0f0d] px-3 py-2 text-sm text-gray-200 outline-none transition focus:border-green-400"
                  disabled={creating}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-green-300">
                    Coroas
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={crownsValue}
                    onChange={event => setCrownsValue(event.target.value)}
                    placeholder="Opcional"
                    className="w-full rounded border border-green-700 bg-[#0c0f0d] px-3 py-2 text-sm text-gray-200 outline-none transition focus:border-green-400"
                    disabled={creating}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wide text-green-300">
                    Pedra-bruxa
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={wyrdstoneValue}
                    onChange={event => setWyrdstoneValue(event.target.value)}
                    placeholder="Opcional"
                    className="w-full rounded border border-green-700 bg-[#0c0f0d] px-3 py-2 text-sm text-gray-200 outline-none transition focus:border-green-400"
                    disabled={creating}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleCloseCreate}
                  disabled={creating}
                  className="rounded border border-gray-600/60 bg-gray-900/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-200 transition hover:border-gray-400 hover:bg-gray-900/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creationDisabled}
                  className="rounded border border-green-600/60 bg-green-900/30 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-green-200 transition hover:border-green-400 hover:bg-green-900/50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {creating ? "Criando..." : "Criar bando"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <AuthModal
        open={requiresAuth}
        mode={authModalMode}
        onClose={() => {
          // Modal permanece aberto até que o usuário faça login
        }}
        onSwitchMode={mode => setAuthModalMode(mode)}
        forceMode={requiresAuth}
        onBack={() => navigate("/")}
      />
    </div>
  );
};

export default function WarbandManagerPageWithBoundary() {
  return (
    <ErrorBoundary>
      <WarbandManagerPage />
    </ErrorBoundary>
  );
}

