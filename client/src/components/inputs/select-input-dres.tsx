import { useGetAllDres } from "@/core/apis/queries/sme";
import SelectInput from "./select-input";

type Props = {
  form?: any;
  withAsterisk?: boolean
};

export function SelectInputDres({ form, withAsterisk }: Props) {
  const { data, isLoading } = useGetAllDres();

  return (
    <SelectInput
      isLoading={isLoading}
      label="Diretoria Regional de Educação (DRE)"
      placeholder="Selecione a DRE"
      name="dre"
      withAsterisk={withAsterisk}
      data={data || []}
      form={form}
    />
  );
}
