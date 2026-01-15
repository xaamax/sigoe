import { useEffect, useState } from "react";
import { useTable } from "@/components/table/table";
import { useNavigate } from "react-router-dom";
import Container from "@/components/container";
import ContentHeader from "@/components/content-header";
import FilterAdd from "@/components/filter-add/filter-add";
import Loading from "@/components/loading/loading";
import useOcorrenciaService from "@/core/services/ocorrencia-service";
import { OcorrenciaColumns } from "./components/ocorrencia-columns";
import type { OcorrenciaDTO } from "@/core/dto/ocorrencia-dto";
import { openNotificationConfirm } from "@/core/hooks/sweet-alert";

function Ocorrencias() {
  const navigate = useNavigate();
  const [ocorrencias, setOcorrencias] = useState<OcorrenciaDTO[]>();
  const isLoading = false;

  const tableProps = {
  fields: OcorrenciaColumns,
  actionButtons: {
    btnEdit: (id: number) => navigate(`/editar-ocorrencia/${id}`),
    btnDelete: () => {},
  },
};

  const { Table, handleFilterTable } = useTable(tableProps);

  const { getOcorrencias } = useOcorrenciaService();

  useEffect(() => {
    getOcorrencias().then((resp) => {
      if (resp.success && resp.data) {
        setOcorrencias(resp.data);
      }
    });
  }, []);

  // const removerOcorrencia = (ocorrencia: OcorrenciaDTO) => {
  //   openNotificationConfirm(
  //     "Tem certeza que deseja excluir essa ocorrência?",
  //     () =>
  //       deleteInspectionVisitImages(selectedImages.join("?"))
  //         .then(
  //           (response) =>
  //             response.success &&
  //             openNotificationSuccess("Sucesso", "Imagem removida.")
  //         )
  //         .finally(() => loadInspectionsVisits())
  //   );
  // };

  return (
    <div>
      {isLoading && <Loading />}
      <Container>
        <ContentHeader title="Ocorrências" />
        <FilterAdd
          onChange={(e) => handleFilterTable(e.target.value)}
          btnLink={{ title: "Incluir Ocorrência", path: "/incluir-ocorrencia" }}
        />
        <Table />
      </Container>
    </div>
  );
}

export default Ocorrencias;
