from django.db.models import Count

from apps.gestao.choices import TipoOcorrencia
from apps.gestao.api.services.ocorrencias_query_service import (
    ConsultarOcorrenciasService
)


class OcorrenciasDashboardService:
    @staticmethod
    def executar(
        *,
        ano_letivo: int,
        codigo_dre: str | None = None,
        codigo_ue: str | None = None
    ):
        ocorrencias = ConsultarOcorrenciasService.executar(
            ano_letivo=ano_letivo,
            codigo_dre=codigo_dre,
            codigo_ue=codigo_ue
        )

        return {
            "totalOcorrencias": ocorrencias.count(),

            "AguardandoAnalise": ocorrencias.filter(situacao=1).count(),
            "Finalizadas": ocorrencias.filter(situacao=3).count(),

            "ocorrenciasPorTipo": [
                {TipoOcorrencia(item["tipo"]).label: item["total"]}
                for item in (
                    ocorrencias
                    .values("tipo")
                    .annotate(total=Count("id"))
                )
            ],

            "ocorrenciasPorUe": [
                {item["matricula__turma__ue__nome"]: item["total"]}
                for item in (
                    ocorrencias
                    .values("matricula__turma__ue__nome")
                    .annotate(total=Count("id"))
                    .order_by("-total")[:10]
                )
            ],

            "ocorrenciasPorTurma": [
                {item["matricula__turma__nome"]: item["total"]}
                for item in (
                    ocorrencias
                    .values("matricula__turma__nome")
                    .annotate(total=Count("id"))
                    .order_by("-total")[:10]
                )
            ],

            # "rankingOcorrenciaDres": [
            #     {item["matricula__turma__ue__dre__nome"]: item["total"]}
            #     for item in (
            #         ocorrencias
            #         .values("matricula__turma__ue__dre__nome")
            #         .annotate(total=Count("id"))
            #         .order_by("-total")
            #     )
            # ],

            # "rankingOcorrenciaUes": [
            #     {item["matricula__turma__ue__nome"]: item["total"]}
            #     for item in (
            #         ocorrencias
            #         .values("matricula__turma__ue__nome")
            #         .annotate(total=Count("id"))
            #         .order_by("-total")
            #     )
            # ],
        }
