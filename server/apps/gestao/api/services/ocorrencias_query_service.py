from apps.gestao.models import Ocorrencia


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
