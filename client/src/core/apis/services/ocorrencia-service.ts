import { get, post, put, type ApiResult } from "./api";
import { URL_GESTAO_OCORRENCIAS } from "../../constants/urls";
import type { SalvarOcorrenciaDTO, OcorrenciaRegistroDTO } from "../../dto/ocorrencia-dto";


export const getOcorrencias = (): Promise<ApiResult<OcorrenciaRegistroDTO[]>> =>
  get(URL_GESTAO_OCORRENCIAS);


export const submitOcorrencia = async (payload: SalvarOcorrenciaDTO) => {
  const url = payload.id ? `${URL_GESTAO_OCORRENCIAS}${payload.id}/` : URL_GESTAO_OCORRENCIAS
  return !payload.id
    ? post<SalvarOcorrenciaDTO>(url, payload)
    : put<SalvarOcorrenciaDTO>(url, payload)
}
