import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from apps.sme.models.dre import Dre


@pytest.mark.django_db
def test_listar_dres_com_admin():
    client = APIClient()

    admin = User.objects.create_superuser(
        username="admin",
        password="admin123",
        email="admin@test.com"
    )
    client.force_authenticate(user=admin)

    Dre.objects.create(
        codigo_dre="DRE01",
        nome="DRE Sul",
        abreviacao="SUL"
    )

    response = client.get("/api/v1/sme/dres/")

    assert response.status_code == 200
    assert response.data[0]["codigo_dre"] == "DRE01"


@pytest.mark.django_db
def test_listar_dres_sem_autenticacao():
    client = APIClient()
    response = client.get("/api/v1/sme/dres/")
    assert response.status_code == 403
