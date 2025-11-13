import React, { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../components/PageTitle";
import MobileSection from "../../components/MobileSection";
import MobileText from "../../components/MobileText";
import { Link } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";

const WarbandManagerPage: React.FC = () => {
  const { currentUser, loading } = useAuth();
  const warbands = useMemo(
    () => currentUser?.warbands ?? [],
    [currentUser]
  );
  const isLoading = loading && !currentUser;
  const hasWarbands = warbands.length > 0;

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
            ) : !hasWarbands ? (
              <MobileText>
                Você ainda não possui bandos cadastrados. Use o Gestor de Bando
                para criar o primeiro!
              </MobileText>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mt-4">
                {warbands.map((warband) => (
                  <div
                    key={warband.id}
                    className="rounded-lg border border-green-700/60 bg-[#1a1a1a] p-4 shadow-lg transition hover:border-green-400/70 hover:shadow-xl"
                  >
                    <Link
                      to={`/tools/warband-manager/${warband.id}`}
                      className="block"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-green-200 font-[Cinzel]">
                          {warband.name}
                        </h3>
                        <div className="text-xs uppercase text-green-400 bg-green-900/20 px-2 py-1 rounded">
                          {warband.faction?.name ?? warband.factionSlug}
                        </div>
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
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </MobileSection>
        </div>
      </div>
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

