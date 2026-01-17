import { AlunoDTO } from "@/core/dto/matricula-dto";
import { ApiResult, get } from "./api";
import { URL_GESTAO_TURMAS, URL_GESTAO_MATRICULAS } from "@/core/constants/urls";

export interface TurmaDTO {
    id: number;
    codigo_turma: string;
    nome: string;
}

export const getTurmasPorUe = (codigo_ue: string): Promise<ApiResult<TurmaDTO[]>> =>
  get(`${URL_GESTAO_TURMAS}por-ue/${codigo_ue}/`);

export const getMatriculasPorTurma = (turma_id: number): Promise<ApiResult<AlunoDTO[]>> =>
  get(`${URL_GESTAO_MATRICULAS}por-turma/${turma_id}/`);