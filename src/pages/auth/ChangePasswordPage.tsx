import  { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChangePasswordModal from "../../components/ChangePasswordModal";

function ChangePasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Extrair access_token da URL
    // Pode estar no hash (#access_token=...) ou nos query params (?access_token=...)
    const hash = location.hash;
    const search = location.search;
    
    let token: string | null = null;

    // Tentar extrair do hash primeiro
    if (hash) {
      const hashParams = new URLSearchParams(hash.substring(1)); // Remove o #
      token = hashParams.get("access_token");
    }

    // Se não encontrou no hash, tentar nos query params
    if (!token && search) {
      const searchParams = new URLSearchParams(search);
      token = searchParams.get("access_token");
    }

    if (token) {
      setAccessToken(token);
      setModalOpen(true);
    } else {
      // Se não houver token, redirecionar ou mostrar erro
      navigate("/");
    }
  }, [location, navigate]);

  const handleSuccess = () => {
    // Após sucesso, o modal já salvou o token no localStorage
    // Recarregar a página para que o AuthContext recarregue os dados do usuário
    // Isso garante que o contexto seja populado com os dados do /me
    window.location.href = "/tools/warband-manager";
  };

  const handleClose = () => {
    // Se o usuário fechar sem alterar a senha, redirecionar
    navigate("/");
  };

  if (!accessToken) {
    return (
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
        <div className="py-4">
          <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48">
            <div className="text-white text-center py-8">
              <h1 className="text-2xl font-semibold mb-4">Token não encontrado</h1>
              <p>O link de recuperação de senha é inválido ou expirou.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] dark group/design-root overflow-x-hidden">
      <ChangePasswordModal
        open={modalOpen}
        accessToken={accessToken}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default ChangePasswordPage;

