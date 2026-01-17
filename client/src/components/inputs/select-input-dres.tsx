import { useGetAllDres } from "@/core/apis/queries/sme";
import SelectInput from "./select-input";

type Props = {
  form?: any;
};

export function SelectInputDres({ form }: Props) {
  const { data, isLoading } = useGetAllDres();

  return (
    <SelectInput
      isLoading={isLoading}
      label="DRE"
      placeholder="Selecione a DRE"
      name="dre"
      withAsterisk
      data={data || []}
      form={form}
    />
  );
}
