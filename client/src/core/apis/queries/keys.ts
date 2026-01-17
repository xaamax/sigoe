export const ocorrenciaKeys = {
  all: ["ocorrencia"] as const,
  detail: (id: string) => [...ocorrenciaKeys.all, id] as const,
  filters: (filters: Record<string, string | number>) => [...ocorrenciaKeys.all, ...Object.values(filters)] as const,
};