from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status as drf_status
from rest_framework.exceptions import ValidationError


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        return Response(
            {
                "success": False,
                "error": "Erro interno do servidor.",
                "status": drf_status.HTTP_500_INTERNAL_SERVER_ERROR,
            },
            status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    if isinstance(exc, ValidationError):
        return Response(
            {
                "success": False,
                "error": "Preencha os campos obrigatórios.",
                "status": response.status_code,
            },
            status=response.status_code,
        )

    return Response(
        {
            "success": False,
            "error": response.data.get("detail", "Erro ao processar a requisição."),
            "status": response.status_code,
        },
        status=response.status_code,
    )
