import { CustomColumnDef } from '@/types/table-types'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { OcorrenciaDTO } from '@/core/dto/ocorrencia-dto'
import dayjs from 'dayjs'

interface ActionButtons {
  delete: (params: OcorrenciaDTO) => void
}

export const columns = (
  actionButtons: ActionButtons
): CustomColumnDef<OcorrenciaDTO>[] => [
  {
    accessorFn: (row) => row.data_ocorrencia,
    accessorKey: 'data_ocorrencia',
    meta: { title: 'Data da ocorrência', className: 'w-fit text-nowrap' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Data da ocorrência' />
    ),
    cell: ({ row }) => (
      <div>{dayjs(row.getValue('data_ocorrencia')).format('DD/MM/YYYY')}</div>
    ),
  },
  {
    accessorKey: 'tipo',
    meta: { title: 'Tipo', className: 'w-fit text-nowrap' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tipo' />
    ),
    cell: ({ row }) => <div>{row.getValue('tipo')}</div>,
  },
  {
    accessorKey: 'ue',
    meta: { title: 'UE', className: 'w-fit text-nowrap' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='UE' />
    ),
    cell: ({ row }) => <div>{row.getValue('ue')}</div>,
  },
  {
    accessorKey: 'aluno',
    meta: { title: 'Aluno', className: 'w-fit text-nowrap' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Aluno' />
    ),
    cell: ({ row }) => <div>{row.getValue('aluno')}</div>,
  },
  {
    accessorFn: (row) => row.situacao,
    accessorKey: 'situacao',
    meta: { title: 'Situação', className: 'w-fit text-nowrap' },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Situação' />
    ),
    cell: ({ row }) => <div>{row.getValue('situacao')}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions row={row} actionButtons={actionButtons} />
    ),
  },
]
