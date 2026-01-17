import { ApiResult, get } from "./api";
import { URL_SME_DRES, URL_SME_UES } from "@/core/constants/urls";

export interface DreDTO {
    codigo_dre: string;
    nome: string;
}

export interface UeDTO {
    codigo_ue: string;
    nome: string;
}

export const getDres = (): Promise<ApiResult<DreDTO[]>> =>
  get(URL_SME_DRES);

export const getUesPorDre = (codigo_dre: string): Promise<ApiResult<UeDTO[]>> =>
  get(`${URL_SME_UES}por-dre/${codigo_dre}/`);