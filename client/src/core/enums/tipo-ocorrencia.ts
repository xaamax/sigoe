export const TipoOcorrencia = {
  Comportamento: 1,
  Saude: 2,
  Convicência: 3,
  Acidente: 4,
} as const;

export type TipoOcorrencia =
  (typeof TipoOcorrencia)[keyof typeof TipoOcorrencia];