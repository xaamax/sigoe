import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from apps.sme.models import Dre, Ue
from apps.gestao.models import Turma

pytestmark = pytest.mark.django_db


def test_listar_turmas_com_admin():
    client = APIClient()

    admin = User.objects.create_superuser(
        username="admin",
        password="admin123",
        email="admin@test.com"
    )
    client.force_authenticate(user=admin)

    dre = Dre.objects.create(
        codigo_dre="DRE01",
        nome="DRE Sul",
        abreviacao="SUL"
    )

    ue = Ue.objects.create(
        codigo_ue="UE01",
        nome="Escola Alpha",
        dre=dre
    )

    Turma.objects.create(
        codigo_turma="T01",
        nome="1º Ano A",
        serie_ano=1,
        ano_letivo=2025,
        ue=ue
    )

    response = client.get("/api/v1/sme/turmas/")

    assert response.status_code == 200
    assert response.data[0]["codigo_turma"] == "T01"


def test_listar_turmas_sem_autenticacao():
    client = APIClient()
    response = client.get("/api/v1/sme/turmas/")
    assert response.status_code == 403
