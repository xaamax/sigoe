from rest_framework.permissions import DjangoModelPermissions, IsAdminUser
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from apps.gestao.api.params import OCORRENCIAS_DASHBOARD_PARAMETROS
from apps.gestao.api.filters import OcorrenciaFilterClass
from apps.gestao.models import Ocorrencia
from apps.gestao.api.serializers import (
    OcorrenciaSerializer,
    OcorrenciaListaSerializer,
    OcorrenciaDetalhesSerializer,
    OcorrenciaDashboardSerializer
)

from apps.gestao.api.services.ocorrencia_gestao_service import OcorrenciasDashboardService

class OcorrenciaViewSet(viewsets.ModelViewSet):
    queryset = Ocorrencia.objects.all()
    rql_filter_class = OcorrenciaFilterClass
    permission_classes = [DjangoModelPermissions]

    def perform_create(self, serializer):
        serializer.save(responsavel=self.request.user)

    def get_serializer_class(self):
        if self.action == 'list':
            return OcorrenciaListaSerializer
        if self.action == 'retrieve':
            return OcorrenciaDetalhesSerializer
        return OcorrenciaSerializer

    @extend_schema(
        summary="Dashboard de Ocorrências Escolares",
        description="""
        Retorna indicadores agregados de ocorrências escolares,
        com filtros institucionais por ano letivo, DRE e UE.
        """,
        parameters=OCORRENCIAS_DASHBOARD_PARAMETROS,
        responses={200: OcorrenciaDashboardSerializer}
    )
    @action(detail=False, methods=["get"], url_path="dashboard")
    def dashboard(self, request):
        ano_letivo = request.query_params.get("ano_letivo")
        codigo_dre = request.query_params.get("codigo_dre")
        codigo_ue = request.query_params.get("codigo_ue")

        if not ano_letivo:
            raise ValidationError({
                "ano_letivo": "Informe o ano letivo"
            })

        data = OcorrenciasDashboardService.executar(
            ano_letivo=ano_letivo,
            codigo_dre=codigo_dre,
            codigo_ue=codigo_ue
        )

        serializer = OcorrenciaDashboardSerializer(data)
        return Response(serializer.data)
