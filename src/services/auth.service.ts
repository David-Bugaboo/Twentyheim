import { apiClient, setAuthToken } from "./apiClient";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface WarbandSummary {
  id: string;
  name: string;
  crowns: number;
  wyrdstone: number;
  factionSlug: string;
  createdAt: string;
  userId: string;
  faction?: {
    id: string;
    slug: string;
    name: string;
    createdAt: string;
  };
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  warbands?: WarbandSummary[];
  [key: string]: unknown;
}

export interface LoginResponse {
  data: AuthUser;
  token: string;
}

export interface RegisterPayload extends LoginCredentials {
  name: string;
}

export async function login(credentials: LoginCredentials) {
  const response = await apiClient.post<LoginResponse>(
    "/auth/login",
    credentials
  );
  const body = response.data;
  setAuthToken(body.token);
  return body;
}

export async function register(payload: RegisterPayload) {
  const response = await apiClient.post<AuthUser>("/auth/register", payload);
  return response.data;
}

export async function fetchCurrentUser(signal?: AbortSignal) {
  const response = await apiClient.get<AuthUser>("/auth/me", {
    signal,
  });
  return response.data;
}
