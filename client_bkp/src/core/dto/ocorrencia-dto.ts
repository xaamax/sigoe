export interface OcorrenciaRegistroDTO {
  id: number;
  data_ocorrencia: Date;
  ue: string;
  dre: string;
  descricao: string;
  tipo: string;
  aluno: string;
  responsavel: string;
  situacao: string;
}

export interface OcorrenciaDTO {
  id: number;
  data_ocorrencia: Date | string;
  descricao: string;
  tipo: number;
  situacao: number;
  matricula: number;
}

export interface SalvarOcorrenciaDTO {
  id?: number;
  data_ocorrencia: Date | string;
  descricao: string;
  tipo: number;
  situacao: number;
  matricula: number;
}