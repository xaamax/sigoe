import { getOcorrenciaDetalhes, getOcorrencias } from "@/core/apis/services/ocorrencia-service";
import { useQuery } from "@tanstack/react-query";
import { ocorrenciaKeys } from "./keys";

export function useGetAllOcorrencias(filters = {}) {
  return useQuery({
    queryKey: ocorrenciaKeys.list(filters),
    queryFn: () => getOcorrencias(),
  });
}

export function useGetOcorrenciaPorId(id: number) {
  return useQuery({
    queryKey: ocorrenciaKeys.detail(id!),
    queryFn: () => getOcorrenciaDetalhes(id!),
    enabled: !!id,
  });
}
