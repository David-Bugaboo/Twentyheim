import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRosterRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Retorna um loading state ao invés de null para evitar problemas de hooks
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 rounded-full border-4 border-green-500/40 border-t-green-400 animate-spin" />
      </div>
    );
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

