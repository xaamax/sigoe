import { useGetAllDres } from "@/core/apis/queries/sme";
import SelectInput from "@/components/inputs/select-input";

interface Props {
  label?: string;
  placeholder?: string;
  description?: string;
  withAsterisk?: boolean;
  name: string;
  form?: any;
  isLoading?: boolean;
  className?: string;
}

export function DreSelect(props: Props) {
  const { data, isLoading } = useGetAllDres();

  return <SelectInput data={data || []} label={props.label || "Diretoria Regional de Educação (DRE)"} placeholder={props.placeholder || "Selecione a DRE"} isLoading={isLoading} {...props} />;
}