from drf_spectacular.utils import OpenApiParameter
from drf_spectacular.types import OpenApiTypes

OCORRENCIAS_DASHBOARD_PARAMETROS = [
    OpenApiParameter(
        name="ano_letivo",
        type=OpenApiTypes.INT,
        location=OpenApiParameter.QUERY,
        required=True,
        description="Ano letivo das ocorrências"
    ),
    OpenApiParameter(
        name="codigo_dre",
        type=OpenApiTypes.STR,
        location=OpenApiParameter.QUERY,
        required=False,
        description="Código da DRE"
    ),
    OpenApiParameter(
        name="codigo_ue",
        type=OpenApiTypes.STR,
        location=OpenApiParameter.QUERY,
        required=False,
        description="Código da UE"
    ),
]
