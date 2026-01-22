import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from apps.sme.models import Dre, Ue


@pytest.mark.django_db
def test_listar_ues_com_admin():
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

    Ue.objects.create(
        codigo_ue="UE001",
        nome="Escola Alpha",
        dre=dre
    )

    response = client.get("/api/v1/sme/ues/")

    assert response.status_code == 200
    assert response.data[0]["codigo_ue"] == "UE001"


@pytest.mark.django_db
def test_listar_ues_sem_autenticacao():
    client = APIClient()
    response = client.get("/api/v1/sme/ues/")
    assert response.status_code == 403


@pytest.mark.django_db
def test_listar_ues_por_dre():
    client = APIClient()

    admin = User.objects.create_superuser(
        username="admin",
        password="admin123",
        email="admin@test.com"
    )
    client.force_authenticate(user=admin)

    dre1 = Dre.objects.create(
        codigo_dre="DRE01",
        nome="DRE Sul",
        abreviacao="SUL"
    )

    dre2 = Dre.objects.create(
        codigo_dre="DRE02",
        nome="DRE Norte",
        abreviacao="NTE"
    )

    ue1 = Ue.objects.create(
        codigo_ue="UE001",
        nome="Escola Alpha",
        dre=dre1
    )

    Ue.objects.create(
        codigo_ue="UE002",
        nome="Escola Beta",
        dre=dre2
    )

    response = client.get(f"/api/v1/sme/ues/por-dre/{dre1.codigo_dre}/")

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["codigo_ue"] == ue1.codigo_ue
