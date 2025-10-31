import { useState } from "react";
import { loginWithGoogle } from "../firebase.ts";
import { type User } from "firebase/auth";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  user: User | null;
};

function AuthModal({ open, onClose, user }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => setError(null);

  // Se o usuário não estiver logado, não permite fechar o modal
  const canClose = user !== null;

  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      await loginWithGoogle();
      onClose();
    } catch (e: any) {
      setError(e?.message || "Falha ao autenticar com Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (canClose) {
      onClose();
      reset();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Só fecha se clicar no backdrop e o usuário estiver logado
    if (e.target === e.currentTarget && canClose) {
      handleClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md rounded-lg border border-gray-700 bg-[#1f1f1f] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Entrar</h2>
          {canClose ? (
            <button
              className="text-gray-400 hover:text-white"
              onClick={handleClose}
            >
              ✕
            </button>
          ) : (
            <span className="text-gray-600 text-sm">
              Faça login para continuar
            </span>
          )}
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          className="mb-4 w-full rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-500 disabled:opacity-60"
        >
          Entrar com Google
        </button>

        {error ? (
          <div className="mt-3 rounded border border-red-700 bg-red-950/50 p-2 text-sm text-red-300">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AuthModal;
