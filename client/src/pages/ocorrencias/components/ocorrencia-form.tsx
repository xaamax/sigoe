import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import dayjs from "dayjs";
import Grid from "@/layouts/grid";
import { ocorrenciaSchema } from "../schema/ocorrencia-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { OcorrenciaFormValues } from "../schema/ocorrencia-schema";
import { OcorrenciaDTO } from "@/core/dto/ocorrencia-dto";
import { Button } from "@/components/ui/button";
import { submitOcorrencia } from "@/core/apis/services/ocorrencia-service";
import SelectInput from "@/components/inputs/select-input";
import DateInput from "@/components/inputs/date-input";
import TextareaInput from "@/components/inputs/textarea-input";
import { SelectInputDres } from "@/components/inputs/select-input-dres";
import { SelectInputUes } from "@/components/inputs/select-input-ues";
import {
  SITUACAO_OCORRENCIA_OPTIONS,
  TIPO_OCORRENCIA_OPTIONS,
} from "@/core/constants/options";
import { SelectInputTurmas } from "@/components/inputs/select-input-turmas";
import { SelectInputMatriculas } from "@/components/inputs/select-input-matriculas";
import { toast } from "sonner";
import { useEffect } from "react";
import { ocorrenciaDtoToForm } from "../schema/ocorrencia-form.adapter";
import { useNavigate } from "react-router-dom";

interface FormProps {
  defaultValues?: OcorrenciaDTO;
}

export const OcorrenciaForm = ({ defaultValues }: FormProps) => {
  const form = useForm<OcorrenciaFormValues>({
    resolver: zodResolver(ocorrenciaSchema),
    defaultValues: defaultValues ?? {
      dre: "",
      ue: "",
      data_ocorrencia: dayjs().format("YYYY-MM-DD"),
      situacao: undefined as unknown as number,
      tipo: undefined as unknown as number,
      descricao: "",
      turma: undefined as unknown as number,
      matricula: undefined as unknown as number,
    },
  });

  const navigate = useNavigate();
  const { reset } = form;

  useEffect(() => {
    if (defaultValues) {
      reset(ocorrenciaDtoToForm(defaultValues));
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: OcorrenciaFormValues) => {
    const formData = {
      ...(defaultValues?.id ? { ...data, id: defaultValues.id } : data),
    };

    return await submitOcorrencia(formData).then((response) => {
      if (response.success) {
        toast.success("Ocorrência salva com sucesso!");
        navigate("/ocorrencias");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 px-12 pt-4"
      >
        <Grid cols="12 2 2 2">
          <SelectInputDres form={form} />
          <SelectInputUes form={form} />
          <SelectInputTurmas form={form} />
          <SelectInputMatriculas form={form} />
        </Grid>
        <Grid cols="12 2 3 3">
          <DateInput
            label="Data da ocorrência"
            placeholder="Data da ocorrência"
            name="data_ocorrencia"
            withAsterisk
            form={form}
          />
          <SelectInput
            type="number"
            label="Tipo"
            placeholder="Selecione o tipo"
            name="tipo"
            data={TIPO_OCORRENCIA_OPTIONS}
            withAsterisk
            form={form}
          />
          <SelectInput
            type="number"
            label="Situação"
            placeholder="Selecione a situação"
            name="situacao"
            data={SITUACAO_OCORRENCIA_OPTIONS}
            withAsterisk
            form={form}
          />
        </Grid>
        <TextareaInput
          label="Descrição"
          placeholder="Descreva as informações da ocorrência"
          name="descricao"
          withAsterisk
          rows={5}
          form={form}
        />
        <Button type="submit" disabled={!form.formState.isValid}>
          Salvar
        </Button>
      </form>
    </Form>
  );
};
