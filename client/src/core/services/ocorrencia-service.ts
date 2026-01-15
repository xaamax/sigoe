import { get, type ApiResult } from "./api";
import { URL_GESTAO_OCORRENCIAS } from "../constants/urls";
import type { OcorrenciaDTO } from "../dto/ocorrencia-dto";

const useOcorrenciaService = () => {
  const getOcorrencias = (): Promise<ApiResult<OcorrenciaDTO[]>> =>
    get(URL_GESTAO_OCORRENCIAS);

  return { getOcorrencias };
};

export default useOcorrenciaService;
