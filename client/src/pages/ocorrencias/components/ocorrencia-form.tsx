import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
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
import { useEffect, useState } from "react";
import { ocorrenciaDtoToForm } from "../schema/ocorrencia-form.adapter";
import { useNavigate } from "react-router-dom";
import { SituacoesOcorrencia } from "@/core/enums/ocorrencia-enum";
import dayjs from "dayjs";

interface FormProps {
  defaultValues?: OcorrenciaDTO;
}

type SubmitAction = "save" | "save_add_other";

export const OcorrenciaForm = ({ defaultValues }: FormProps) => {
  const form = useForm<OcorrenciaFormValues>({
    resolver: zodResolver(ocorrenciaSchema),
    shouldUnregister: false,
    defaultValues: {
      situacao: SituacoesOcorrencia.AguardandoAnalise,
      data_ocorrencia: dayjs().format('YYYY-MM-DD')
    }
  });

  const [submitAction, setSubmitAction] = useState<SubmitAction>("save");

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

        if (submitAction === "save_add_other") {
          form.reset({
            dre: "",
            ue: "",
            data_ocorrencia: dayjs().format("YYYY-MM-DD"),
            situacao: undefined,
            tipo: undefined,
            descricao: "",
            turma: undefined,
            matricula: undefined,
          });
          return;
        }
        navigate("/ocorrencias/consultar");
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
          <SelectInputDres form={form} withAsterisk={true} />
          <SelectInputUes form={form} withAsterisk={true} />
          <SelectInputTurmas form={form} withAsterisk={true} />
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
          {defaultValues?.id && (
            <SelectInput
              type="number"
              label="Situação"
              placeholder="Selecione a situação"
              name="situacao"
              data={SITUACAO_OCORRENCIA_OPTIONS}
              withAsterisk
              form={form}
            />
          )}
        </Grid>
        <TextareaInput
          label="Descrição"
          placeholder="Descreva as informações da ocorrência"
          name="descricao"
          withAsterisk
          rows={5}
          form={form}
        />
        <div className="flex justify-end gap-2">
          {!defaultValues?.id && (
            <Button
              type="submit"
              variant="outline_primary"
              disabled={!form.formState.isValid}
              onClick={() => setSubmitAction("save_add_other")}
            >
              Salvar e incluir outro
            </Button>
          )}
          <Button
            type="submit"
            disabled={!form.formState.isValid}
            onClick={() => setSubmitAction("save")}
          >
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
};
