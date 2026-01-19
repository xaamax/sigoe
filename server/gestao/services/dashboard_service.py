from django.db.models import Count
from ..repositories.dashboard_repository import get_ocorrencias_filtradas
from ..choices import TipoOcorrencia


def montar_dashboard_ocorrencias(
    ano_letivo,
    codigo_dre=None,
    codigo_ue=None
):
    ocorrencias = get_ocorrencias_filtradas(
        ano_letivo, codigo_dre, codigo_ue
    )

    return {
        "totalOcorrencias": ocorrencias.count(),
        "AguardandoAnalise": ocorrencias.filter(situacao=1).count(),
        "Finalizadas": ocorrencias.filter(situacao=3).count(),

        "ocorrenciasPorTipo": [
            {TipoOcorrencia(item["tipo"]).label: item["total"]}
            for item in (
                ocorrencias.values("tipo")
                .annotate(total=Count("id"))
            )
        ],

        "ocorrenciasPorUe": [
            {item["matricula__turma__ue__nome"]: item["total"]}
            for item in (
                ocorrencias.values("matricula__turma__ue__nome")
                .annotate(total=Count("id"))
                .order_by("-total")[:10]
            )
        ],

        "ocorrenciasPorTurma": [
            {item["matricula__turma__nome"]: item["total"]}
            for item in (
                ocorrencias.values("matricula__turma__nome")
                .annotate(total=Count("id"))
                .order_by("-total")[:10]
            )
        ],

        "rangkingOcorrenciaDres": [
            {item["matricula__turma__ue__dre__nome"]: item["total"]}
            for item in (
                ocorrencias.values("matricula__turma__ue__dre__nome")
                .annotate(total=Count("id"))
                .order_by("-total")
            )
        ],

        "rangkingOcorrenciaUes": [
            {item["matricula__turma__ue__nome"]: item["total"]}
            for item in (
                ocorrencias.values("matricula__turma__ue__nome")
                .annotate(total=Count("id"))
                .order_by("-total")
            )
        ]
    }
