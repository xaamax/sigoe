from gestao.models import Ocorrencia


def get_ocorrencias_filtradas(
    ano_letivo,
    codigo_dre=None,
    codigo_ue=None
):
    qs = Ocorrencia.objects.filter(
        matricula__turma__ano_letivo=ano_letivo
    )

    if codigo_dre:
        qs = qs.filter(matricula__turma__ue__dre__codigo_dre=codigo_dre)

    if codigo_ue:
        qs = qs.filter(matricula__turma__ue__codigo_ue=codigo_ue)

    return qs
