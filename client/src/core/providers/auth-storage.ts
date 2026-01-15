import type { AuthResponseDTO } from "../services/auth-service";

type AuthData = {
  token: string;
  expiresIn: string;
};

const AUTH_KEY = "@app:auth";

export const getAuth = (): AuthData | null => {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
};

export const setAuth = (auth: AuthResponseDTO) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};
