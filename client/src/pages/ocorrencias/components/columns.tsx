import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableRowActions } from "./row-actions";
import { OcorrenciaRegistroDTO } from "@/core/dto/ocorrencia-dto";
import { ColumnDef, Row } from "@tanstack/react-table";
import dayjs from "dayjs";

export const columns = (
  _?: (index: number) => void,
  toogleRefreshTable?: () => void,
): ColumnDef<OcorrenciaRegistroDTO>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(Boolean(value))
        }
        aria-label="Selecionar todos"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
        aria-label="Selecionar linha"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "data_ocorrencia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data da ocorrência" />
    ),
    cell: ({ row }) => (
      <div>
        {dayjs(row.getValue<string>("data_ocorrencia")).format("DD/MM/YYYY")}
      </div>
    ),
  },

  {
    accessorKey: "tipo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => <div>{row.getValue("tipo")}</div>,
    filterFn: (row: Row<OcorrenciaRegistroDTO>, id, value: string[]) =>
      value.includes(row.getValue(id)),
  },

  {
    accessorKey: "dre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DRE" />
    ),
    cell: ({ row }) => <div>{row.getValue("dre")}</div>,
    filterFn: (row: Row<OcorrenciaRegistroDTO>, id, value: string[]) =>
      value.includes(row.getValue(id)),
  },

  {
    accessorKey: "ue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UE" />
    ),
    cell: ({ row }) => <div>{row.getValue("ue")}</div>,
    filterFn: (row: Row<OcorrenciaRegistroDTO>, id, value: string[]) =>
      value.includes(row.getValue(id)),
  },

  {
    accessorKey: "aluno",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aluno" />
    ),
    cell: ({ row }) => <div>{row.getValue("aluno")}</div>,
    filterFn: (row: Row<OcorrenciaRegistroDTO>, id, value: string[]) =>
      value.includes(row.getValue(id)),
  },

  {
    accessorKey: "situacao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Situação" />
    ),
    cell: ({ row }) => <div>{row.getValue("situacao")}</div>,
    filterFn: (row: Row<OcorrenciaRegistroDTO>, id, value: string[]) =>
      value.includes(row.getValue(id)),
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row.original}
        {...{ toogleRefreshTable }}
      />
    ),
  },
];
