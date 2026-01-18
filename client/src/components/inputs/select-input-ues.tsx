import { useGetAllUesByDre } from "@/core/apis/queries/sme";
import SelectInput from "./select-input";

type Props = {
  form?: any;
};

export function SelectInputUes({ form }: Props) {
  const dre = form.watch("dre");

  const { data, isLoading } = useGetAllUesByDre(dre);

  if (!data?.length && isLoading) return null;

  return (
    <SelectInput
      isLoading={isLoading}
      label="UE"
      placeholder="Selecione a UE"
      name="ue"
      withAsterisk
      data={data || []}
      form={form}
    />
  );
}
