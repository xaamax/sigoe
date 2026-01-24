import dayjs from "dayjs";
import { z } from "zod";

export const ocorrenciaSchema = z.object({
  data_ocorrencia: z
    .union([z.date(), z.string()])
    .refine((value) => dayjs(value, "YYYY-MM-DD", true).isValid(), {
      message: "(*) Data inválida",
    }),
  dre: z.string({ required_error: "(*) Campo obrigatório" }),
  ue: z.string({ required_error: "(*) Campo obrigatório" }),
  tipo: z.coerce.number({ required_error: "(*) Campo obrigatório" }),
  situacao: z.coerce.number({ required_error: "(*) Campo obrigatório" }),
  descricao: z
    .string()
    .min(1, {
      message: "(*) Campo obrigatório",
    })
    .min(3, {
      message: "(*) Mínimo 3 caracteres",
    }),
  turma: z.coerce.number({ required_error: "(*) Campo obrigatório" }),
  matricula: z.coerce.number({ required_error: "(*) Campo obrigatório" }),
});
export type OcorrenciaFormValues = z.infer<typeof ocorrenciaSchema>;

export const ocorrenciaListSchema = z.array(ocorrenciaSchema);
