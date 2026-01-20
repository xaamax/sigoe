import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from apps.gestao.models import Aluno

pytestmark = pytest.mark.django_db


def test_listar_alunos_com_admin():
    client = APIClient()

    admin = User.objects.create_superuser(
        username="admin",
        password="admin123",
        email="admin@test.com"
    )
    client.force_authenticate(user=admin)

    Aluno.objects.create(
        nome="João Silva",
        cpf="12345678900",
        cep="01000-000",
        logradouro="Rua A",
        numero=123,
        bairro="Centro",
        cidade="São Paulo",
        estado="SP",
        responsavel="Maria Silva",
        telefone_responsavel="11999999999"
    )

    response = client.get("/api/v1/gestao/alunos/")

    assert response.status_code == 200
    assert response.data[0]["nome"] == "João Silva"


def test_listar_alunos_sem_autenticacao():
    client = APIClient()
    response = client.get("/api/v1/gestao/alunos/")
    assert response.status_code == 403
