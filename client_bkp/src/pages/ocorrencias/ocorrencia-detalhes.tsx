import { Content } from '@/components/content'
import { ContentHeader } from '@/components/content-header'
import { useParams } from 'react-router-dom'
import { OcorrenciaForm } from './components/ocorrencia-form';

export default function OcorrrenciaDetalhes() {
  const { id } = useParams();

  return (
    <Content>
      <ContentHeader
        title={`${id ? 'Editar' : 'Incluir'} ocorrência`}
      />
      <OcorrenciaForm />
    </Content>
  )
}
