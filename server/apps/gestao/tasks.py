import requests
from celery import shared_task
from django.db import transaction

from .models import Aluno


@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=5, retry_kwargs={"max_retries": 3})
def completar_endereco_por_cep(self, aluno_id):
    try:
        aluno = Aluno.objects.get(id=aluno_id)
    except Aluno.DoesNotExist:
        return

    if not aluno.cep:
        return

    cep = aluno.cep.replace("-", "").strip()

    response = requests.get(
        f"https://viacep.com.br/ws/{cep}/json/",
        timeout=5
    )

    if response.status_code != 200:
        return

    data = response.json()

    # ViaCEP retorna erro assim:
    if data.get("erro"):
        return

    with transaction.atomic():
        aluno.logradouro = data.get("logradouro")
        aluno.bairro = data.get("bairro")
        aluno.cidade = data.get("localidade")
        aluno.estado = data.get("uf")
        aluno.save(update_fields=[
            "logradouro",
            "bairro",
            "cidade",
            "estado"
        ])
