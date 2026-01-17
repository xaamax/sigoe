import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./row-actions";
import { OcorrenciaRegistroDTO } from "@/core/dto/ocorrencia-dto";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const columns : ColumnDef<OcorrenciaRegistroDTO>[] = [
  {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "data_ocorrencia",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Data da ocorrência" />
    ),
    cell: ({ row }: any) => {
      return (
        <div>{dayjs(row.getValue("data_ocorrencia")).format("DD/MM/YYYY")}</div>
      );
    },
  },
  {
    accessorKey: "tipo",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }: any) => {
      return <div>{row.getValue("tipo")}</div>;
    },
    filterFn: (row: any, id: any, value: any) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dre",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="DRE" />
    ),
    cell: ({ row }: any) => {
      return <div>{row.getValue("dre")}</div>;
    },
    filterFn: (row: any, id: any, value: any) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "ue",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="UE" />
    ),
    cell: ({ row }: any) => {
      return <div>{row.getValue("ue")}</div>;
    },
    filterFn: (row: any, id: any, value: any) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "aluno",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Aluno" />
    ),
    cell: ({ row }: any) => {
      return <div>{row.getValue("aluno")}</div>;
    },
    filterFn: (row: any, id: any, value: any) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "situacao",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Situação" />
    ),
    cell: ({ row }: any) => {
      return <div>{row.getValue("situacao")}</div>;
    },
    filterFn: (row: any, id: any, value: any) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: ({ row }: any) => <DataTableRowActions row={row.original} />,
  },
];
