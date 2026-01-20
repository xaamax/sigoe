import pytest
from apps.sme.models.ue import Ue
from apps.sme.models.dre import Dre


@pytest.mark.django_db
def test_criar_ue():
    dre = Dre.objects.create(
        codigo_dre="DRE01",
        nome="DRE Sul",
        abreviacao="SUL"
    )

    ue = Ue.objects.create(
        codigo_ue="UE001",
        nome="Escola Municipal Alpha",
        dre=dre
    )

    assert ue.codigo_ue == "UE001"
    assert ue.nome == "Escola Municipal Alpha"
    assert ue.dre == dre


@pytest.mark.django_db
def test_str_ue():
    dre = Dre.objects.create(
        codigo_dre="DRE02",
        nome="DRE Norte",
        abreviacao="NTE"
    )

    ue = Ue.objects.create(
        codigo_ue="UE002",
        nome="Escola Beta",
        dre=dre
    )

    assert str(ue) == "Escola Beta"
