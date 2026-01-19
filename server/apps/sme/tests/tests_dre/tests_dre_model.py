import pytest
from apps.sme.models.dre import Dre


@pytest.mark.django_db
def test_criar_dre():
    dre = Dre.objects.create(
        codigo_dre="DRE01",
        nome="DRE Sul",
        abreviacao="SUL"
    )

    assert dre.codigo_dre == "DRE01"
    assert dre.nome == "DRE Sul"
    assert dre.abreviacao == "SUL"


@pytest.mark.django_db
def test_str_dre():
    dre = Dre.objects.create(
        codigo_dre="DRE02",
        nome="DRE Norte",
        abreviacao="NTE"
    )

    assert str(dre) == "DRE Norte"
