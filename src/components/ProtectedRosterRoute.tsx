import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getLocalWarband } from "../pages/warband-builder/roster/helpers/indexedDb.helpers";

function ProtectedRosterRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { currentUser, loading } = useAuth();
  const params = new URLSearchParams(location.search);
  const isLocal = params.get("local") === "true";
  const userId = params.get("userId") || "";
  const warbandId = params.get("id") || "";

  const [checkingLocal, setCheckingLocal] = useState<boolean>(false);
  const [localIsUserSource, setLocalIsUserSource] = useState<boolean>(false);

  // Se a rota foi marcada como local, verificamos a fonte real no IndexedDB
  useEffect(() => {
    if (!isLocal || !warbandId) {
      setLocalIsUserSource(false);
      setCheckingLocal(false);
      return;
    }
    let cancelled = false;
    setCheckingLocal(true);
    getLocalWarband(warbandId)
      .then(data => {
        if (cancelled) return;
        setLocalIsUserSource(data?.source === "user");
        setCheckingLocal(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLocalIsUserSource(false);
        setCheckingLocal(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isLocal, warbandId]);

  if (loading) {
    // Retorna um loading state ao invés de null para evitar problemas de hooks
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 rounded-full border-4 border-green-500/40 border-t-green-400 animate-spin" />
      </div>
    );
  }

  // Enquanto checamos a fonte real do bando local, mostra loading simples
  if (!currentUser && isLocal && checkingLocal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 rounded-full border-4 border-green-500/40 border-t-green-400 animate-spin" />
      </div>
    );
  }

  // Libera acesso quando for estritamente local (source != 'user') ou não houver userId
  if (!currentUser && ((isLocal && !localIsUserSource) || !userId)) {
    return <>{children}</>;
  }

  if (!currentUser) {
    // Não autenticado: redireciona para a página do Gestor de Bando (que abre o modal)
    return (
      <Navigate
        to="/warband-builder"
        replace
        state={{ from: location.pathname, requireLogin: true }}
      />
    );
  }

  return <>{children}</>;
}

export default ProtectedRosterRoute;

