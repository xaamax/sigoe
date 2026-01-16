import { useCallback, useEffect, useState } from 'react'
import { Content } from '@/components/content'
import { ContentHeader } from '@/components/content-header'
import { OcorrenciaDTO } from '@/core/dto/ocorrencia-dto'
import { DataTable as OcorrenciasTable } from '@/components/data-table/data-table'
import { columns } from './components/ocorrencias-columns'
import ocorrenciaService from '@/core/services/ocorrencia-service'

export default function Ocorrrencias() {
  const [ocorrencias, setOcorrencias] = useState<OcorrenciaDTO[]>([])

  const loadOcorrencias = useCallback(async () => {
    await ocorrenciaService.getOcorrencias().then((response) => {
      if (response.success) setOcorrencias(response.data || [])
    })
  }, [])

  useEffect(() => {
    loadOcorrencias()
  }, [])

  return (
    <Content>
      <ContentHeader
        title='Ocorrências'
        subtitle='Gerenciamento de ocorrências registradas'
      />
      <OcorrenciasTable
        data={ocorrencias}
        columns={columns({ delete: () => {} })}
        facetedFilters={[
          { field: 'tipo', label: 'Tipo' },
          { field: 'situacao', label: 'Situação' },
          { field: 'ue', label: 'UE' },
        ]}
      />
    </Content>
  )
}
