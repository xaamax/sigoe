import type { AxiosResponse } from "axios";
import api from "./api";
import { closeAuth } from "@/core/hooks/use-auth-operations";

export const URL_REFRESH_TOKEN = "/v1/authentication/refresh-token/";

interface AuthDTO {
  username: string;
  password: string;
}

export interface AuthResponseDTO {
  access: string;
  refresh: string;
  expiresIn: string;
}

const login = (payload: AuthDTO): Promise<AxiosResponse<AuthResponseDTO>> =>
  api.post("/v1/authentication/", { ...payload })

const refreshToken = (token: string): Promise<AxiosResponse> =>
  api.post(URL_REFRESH_TOKEN, { token });

const logout = () => {
  closeAuth();
  window.location.href = "/login";
}

export default {
  refreshToken,
  login,
  logout,
};
