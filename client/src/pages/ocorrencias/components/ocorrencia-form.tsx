import { ocorrenciaSchema } from '../schema/ocorrencia-schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import ocorrenciaService from '@/core/apis/services/ocorrencia-service'
import { useEffect } from 'react'
import { OcorrenciaFormValues } from '../schema/ocorrencia-schema'
import { OcorrenciaDTO } from '@/core/dto/ocorrencia-dto'
import dayjs from 'dayjs'
import Grid from '@/layouts/grid'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TIPO_OCORRENCIA_OPTIONS } from '@/core/constants/options'
import { Popover, PopoverTrigger } from '@radix-ui/react-popover'
import { CalendarIcon } from 'lucide-react'
import { PopoverContent } from '@/components/ui/popover'
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button'

interface FormProps {
  defaultValues?: OcorrenciaDTO
}

export const OcorrenciaForm = ({ defaultValues }: FormProps) => {
  const form = useForm<OcorrenciaFormValues>({
    resolver: zodResolver(ocorrenciaSchema),
    defaultValues: defaultValues ?? {
      descricao: '',
      data_ocorrencia: dayjs().format('YYYY-MM-DD'),
      tipo: 0,
      situacao: undefined as unknown as number,
      matricula: 0,
    },
    mode: 'onChange',
  })

  const { reset } = form

  const onSubmit = async (data: OcorrenciaFormValues) => {
    const formData = {
      ...(defaultValues?.id ? { ...data, id: defaultValues.id } : data),
    }
    return await ocorrenciaService.submitOcorrencia(formData)
  }

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        data_ocorrencia: dayjs(defaultValues?.data_ocorrencia).format(
          'YYYY-MM-DD'
        ),
      })
    }
  }, [defaultValues, reset])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 px-12 pt-4'
      >
        <Grid cols="12 2 2 2">
          <FormField
            control={form.control}
            name='data_ocorrencia'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data da ocorrência:</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? dayjs(field.value).format('DD/MM/YYYY') : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='situacao'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Situação:</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="--- Selecione ---" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIPO_OCORRENCIA_OPTIONS.map((ocorrencia) => (
                        <SelectItem key={ocorrencia.value} value={ocorrencia.value}>
                          {ocorrencia.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Grid>
        <Button type='submit'>
          Salvar
        </Button>
      </form>
    </Form>
  )
}