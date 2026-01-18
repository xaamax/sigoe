import { OcorrenciaDTO } from "@/core/dto/ocorrencia-dto";
import { OcorrenciaFormValues } from "./ocorrencia-schema";
import dayjs from "dayjs";

export function ocorrenciaDtoToForm(
  dto: OcorrenciaDTO
): OcorrenciaFormValues {
  return {
    ...dto,
    data_ocorrencia: dto.data_ocorrencia
      ? dayjs(dto.data_ocorrencia).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
  };
}
