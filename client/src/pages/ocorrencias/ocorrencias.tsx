import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./components/columns";
import PageTitle from "@/components/commons/page-title";
import { useGetAllOcorrencias } from "@/core/apis/queries/ocorrencias";

export function Ocorrrencias() {

  const { data } = useGetAllOcorrencias();

  return (
    <div className="w-full space-y-4">
      <PageTitle title="Ocorrências" desc="Gerencie os registros de ocorrências" />

      <DataTable
        data={data?.data || []}
        columns={columns}
        facetedFilters={[
          { field: 'tipo', label: 'Tipo' },
          { field: 'situacao', label: 'Situação' },
          { field: 'dre', label: 'DRE' },
          { field: 'ue', label: 'UE' },
        ]}
      />
    </div>
  );
}
