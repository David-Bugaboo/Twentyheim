import { createContext, useContext, useEffect, useState } from "react";
import {
  type AuthUser,
  type LoginCredentials,
  type RegisterPayload,
  fetchCurrentUser,
  login as loginRequest,
  register as registerRequest,
} from "../services/auth.service";
import { setAuthToken } from "../services/apiClient";
import axios from "axios";

interface AuthContextType {
  currentUser: AuthUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  logout: () => void;
  warbands: AuthUser["warbands"];
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  login: async () => {
    throw new Error("AuthProvider not mounted");
  },
  register: async () => {
    throw new Error("AuthProvider not mounted");
  },
  logout: () => {
    throw new Error("AuthProvider not mounted");
  },
  warbands: [],
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [warbands, setWarbands] = useState<AuthUser["warbands"]>([]);

  const clearSession = () => {
    localStorage.removeItem("twentyheim_token");
    setAuthToken(null);
    setCurrentUser(null);
    setWarbands([]);
  };

  useEffect(() => {
    const init = async () => {
      // Verificar se há token na URL (autenticação via callback)
      const hash = window.location.hash;
      const urlParams = new URLSearchParams(hash.substring(1));
      const accessToken = urlParams.get("access_token");
      
      let tokenToUse: string | null = null;

      if (accessToken) {
        // Token encontrado na URL - usar ele
        tokenToUse = accessToken;
        // Salvar o token
        localStorage.setItem("twentyheim_token", accessToken);
        
        // Limpar os parâmetros da URL
        const hashWithoutPrefix = hash.startsWith("#") ? hash.substring(1) : hash;
        const params = new URLSearchParams(hashWithoutPrefix);
        params.delete("access_token");
        params.delete("expires_at");
        params.delete("expires_in");
        params.delete("refresh_token");
        params.delete("token_type");
        params.delete("type");
        
        const remainingParams = params.toString();
        
        // Atualizar a URL sem recarregar a página
        if (remainingParams) {
          window.history.replaceState(null, "", `#${remainingParams}`);
        } else {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      } else {
        // Tentar usar token armazenado
        tokenToUse = localStorage.getItem("twentyheim_token");
      }

      if (!tokenToUse) {
        setLoading(false);
        return;
      }

      try {
        setAuthToken(tokenToUse);
        // Sempre fazer requisição /me para validar o token e popular dados do usuário
        const user = await fetchCurrentUser();
        setCurrentUser(user);
        setWarbands(user.warbands ?? []);
      } catch (error) {
        console.error("Failed to recover session", error);
        
        // Se for erro 401, significa token inválido - limpar tudo
        const isUnauthorized = axios.isAxiosError(error) && error.response?.status === 401;
        if (isUnauthorized) {
          clearSession();
        } else {
          // Para outros erros, também limpar a sessão por segurança
          clearSession();
        }
      } finally {
        setLoading(false);
      }
    };

    void init();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await loginRequest(credentials);
    localStorage.setItem("twentyheim_token", response.token);
    setAuthToken(response.token);
    setCurrentUser(response.data);
    setWarbands(response.data.warbands ?? []);
    return response.data;
  };

  const register = async (payload: RegisterPayload) => {
    const user = await registerRequest(payload);
    return user;
  };

  const logout = () => {
    clearSession();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        login,
        register,
        logout,
        warbands,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
