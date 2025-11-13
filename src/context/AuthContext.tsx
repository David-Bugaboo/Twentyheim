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
      const storedToken = localStorage.getItem("twentyheim_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        setAuthToken(storedToken);
        const user = await fetchCurrentUser();
        setCurrentUser(user);
        setWarbands(user.warbands ?? []);
      } catch (error) {
        console.error("Failed to recover session", error);
        clearSession();
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
