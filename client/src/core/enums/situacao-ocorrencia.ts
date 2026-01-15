export const SituacaoOcorrencia = {
  AguardandoAnalise: 1,
  AcaoPedagogicaRealizada: 2,
  Finalizada: 3,
} as const;

export type SituacaoOcorrencia =
  (typeof SituacaoOcorrencia)[keyof typeof SituacaoOcorrencia];