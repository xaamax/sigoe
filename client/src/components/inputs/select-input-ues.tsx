import { useGetAllUesByDre } from "@/core/apis/queries/sme";
import SelectInput from "./select-input";

type Props = {
  form?: any;
  withAsterisk?: boolean
};

export function SelectInputUes({ form, withAsterisk }: Props) {
  const dre = form.watch("dre");

  const { data, isLoading } = useGetAllUesByDre(dre);

  if (!data?.length && isLoading) return null;

  return (
    <SelectInput
      isLoading={isLoading}
      label="Unidade Educacional (UE)"
      placeholder="Selecione a UE"
      name="ue"
      withAsterisk={withAsterisk}
      data={data || []}
      form={form}
    />
  );
}
