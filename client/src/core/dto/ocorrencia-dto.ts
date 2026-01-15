import type { SituacaoOcorrencia } from "../enums/situacao-ocorrencia";
import type { TipoOcorrencia } from "../enums/tipo-ocorrencia";

export interface OcorrenciaDTO {
  id: number;
  data_ocorrencia: Date;
  ue: string;
  dre: string;
  descricao: string;
  tipo: TipoOcorrencia;
  aluno: string;
  responsavel: string;
  situacao: SituacaoOcorrencia;
}