import { useGetAllTurmasByUe } from "@/core/apis/queries/gestao";
import SelectInput from "./select-input";

type Props = {
  form?: any;
};

export function SelectInputTurmas({ form }: Props) {
  const ue = form.watch("ue");

  const { data, isLoading } = useGetAllTurmasByUe(ue);

  if (!data?.length && isLoading) return null;

  return (
    <SelectInput
      type="number"
      isLoading={isLoading}
      label="Turma"
      placeholder="Selecione a turma"
      name="turma"
      withAsterisk
      data={data || []}
      form={form}
    />
  );
}
