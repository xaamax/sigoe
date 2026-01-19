from django.db.models import Count

from .models import Ocorrencia
from .choices import TipoOcorrencia


class ConsultarOcorrenciasService:

    @staticmethod
    def executar(
        *,
        ano_letivo: int,
        codigo_dre: str | None = None,
        codigo_ue: str | None = None
    ):
        qs = Ocorrencia.objects.filter(
            matricula__turma__ano_letivo=ano_letivo
        )

        if codigo_dre:
            qs = qs.filter(
                matricula__turma__ue__dre__codigo_dre=codigo_dre
            )

        if codigo_ue:
            qs = qs.filter(
                matricula__turma__ue__codigo_ue=codigo_ue
            )

        return qs


def montar_dashboard_ocorrencias(
    ano_letivo,
    codigo_dre=None,
    codigo_ue=None
):
    ocorrencias = ConsultarOcorrenciasService(
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
