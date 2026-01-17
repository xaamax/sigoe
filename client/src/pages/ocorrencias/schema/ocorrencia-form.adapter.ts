import { OcorrenciaDTO } from "@/core/dto/ocorrencia-dto";
import { OcorrenciaFormValues } from "./ocorrencia-schema";
import dayjs from "dayjs";

export function ocorrenciaDtoToForm(
  dto: OcorrenciaDTO
): OcorrenciaFormValues {
  return {
    dre: dto.dre ?? "",
    ue: dto.ue ?? "",
    turma: dto.turma ?? undefined,
    matricula: dto.matricula ?? undefined,
    tipo: dto.tipo ?? undefined,
    situacao: dto.situacao ?? undefined,
    descricao: dto.descricao ?? "",
    data_ocorrencia: dto.data_ocorrencia
      ? dayjs(dto.data_ocorrencia).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
  };
}
