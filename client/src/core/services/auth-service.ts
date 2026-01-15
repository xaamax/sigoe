import type { AxiosResponse } from "axios";
import api from "./api";

export const URL_REFRESH_TOKEN = "/v1/authentication/refresh-token/";

interface AuthDTO {
  username: string;
  password: string;
}

export interface AuthResponseDTO {
  access: string;
  refresh: string;
  tokenExpiresIn: string;
}

const login = (payload: AuthDTO): Promise<AxiosResponse<AuthResponseDTO>> =>
  api.post("/v1/authentication/", { ...payload });

const refreshToken = (token: string): Promise<AxiosResponse> =>
  api.post(URL_REFRESH_TOKEN, { token });

export default {
  refreshToken,
  login,
};
