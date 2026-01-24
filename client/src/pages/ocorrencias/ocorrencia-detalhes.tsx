import PageTitle from "@/components/commons/page-title";
import { Content } from "@/layouts/content";
import { useParams } from "react-router-dom";
import { OcorrenciaForm } from "./components/ocorrencia-form";
import { useGetOcorrenciaPorId } from "@/core/apis/queries/ocorrencias-query";

export function OcorrrenciaDetalhes() {
  const { id } = useParams();
  const { data } = useGetOcorrenciaPorId(Number(id));

  return (
    <Content>
      <PageTitle
        title={`${id ? "Editar" : "Incluir"} ocorrência`}
        desc="Informações referentes ao registro de ocorrência."
      />
      <OcorrenciaForm defaultValues={data?.data || undefined} />
    </Content>
  );
}
