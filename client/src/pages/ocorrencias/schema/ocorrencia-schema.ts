import dayjs from 'dayjs'
import { z } from 'zod'

export const ocorrenciaSchema = z.object({
    data_ocorrencia: z.union([z.date(), z.string()])
        .refine((value) => dayjs(value, "YYYY-MM-DDTHH:mm", true).isValid(), {
            message: "(*) Data inválida",
        }),
    tipo: z.number({ required_error: '(*) Campo obrigatório' }),
    situacao: z.number({ required_error: '(*) Campo obrigatório' }),
    descricao: z
        .string()
        .min(1, {
            message: '(*) Campo obrigatório',
        })
        .min(3, {
            message: '(*) Mínimo 3 caracteres',
        }),
    matricula: z.number({ required_error: '(*) Campo obrigatório' }),
})
export type OcorrenciaFormValues = z.infer<typeof ocorrenciaSchema>

export const ocorrenciaListSchema = z.array(ocorrenciaSchema)