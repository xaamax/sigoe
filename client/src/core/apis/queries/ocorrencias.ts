import { getOcorrencias } from "@/core/apis/services/ocorrencia-service";
import { useQuery } from "@tanstack/react-query";
import { ocorrenciaKeys } from "./keys";

export function useGetAllOcorrencias(
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ocorrenciaKeys.filters({}),
    queryFn: () => getOcorrencias(),
    enabled,
  });
}
