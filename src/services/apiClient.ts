import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const DEFAULT_BASE_URL = "https://backend.fortalhammer.com.br";

const baseURL = import.meta.env?.VITE_API_BASE_URL ?? DEFAULT_BASE_URL;

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuthToken(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
}

export async function request<T>(config: AxiosRequestConfig) {
  const response = await apiClient.request<T>(config);
  return response.data;
}
