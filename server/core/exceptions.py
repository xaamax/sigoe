from django.conf import settings
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status as drf_status
from rest_framework.exceptions import ValidationError
import traceback


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:

        if isinstance(exc, ValidationError):
            first_error = _extract_first_error_message(response.data)

            return Response(
                {
                    "success": False,
                    "error": first_error,
                    # "errors": response.data,
                    "status": response.status_code,
                },
                status=response.status_code,
            )

        return Response(
            {
                "success": False,
                "error": response.data.get(
                    "detail", "Erro ao processar a requisição."
                ),
                "status": response.status_code,
            },
            status=response.status_code,
        )

    if settings.DEBUG:
        return Response(
            {
                "success": False,
                "error": str(exc),
                "exception": exc.__class__.__name__,
                "traceback": traceback.format_exc(),
                "status": drf_status.HTTP_500_INTERNAL_SERVER_ERROR,
            },
            status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    # PRODUÇÃO (seguro)
    return Response(
        {
            "success": False,
            "error": "Erro interno do servidor.",
            "status": drf_status.HTTP_500_INTERNAL_SERVER_ERROR,
        },
        status=drf_status.HTTP_500_INTERNAL_SERVER_ERROR,
    )


def _extract_first_error_message(errors: dict) -> str:
    if not isinstance(errors, dict):
        return "Erro de validação."

    for _, messages in errors.items():
        if isinstance(messages, list) and messages:
            return messages[0]
        if isinstance(messages, str):
            return messages

    return "Erro de validação."
