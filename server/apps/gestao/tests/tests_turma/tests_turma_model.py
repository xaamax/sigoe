import pytest
from apps.sme.models import Turma, Dre, Ue

pytestmark = pytest.mark.django_db


def test_criar_turma():
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

    turma = Turma.objects.create(
        codigo_turma="T01",
        nome="1º Ano A",
        serie_ano=1,
        ano_letivo=2025,
        ue=ue
    )

    assert turma.codigo_turma == "T01"
    assert turma.nome == "1º Ano A"
    assert turma.serie_ano == 1
    assert turma.ano_letivo == 2025
    assert turma.ue == ue


def test_meta_turma():
    assert Turma._meta.db_table == "turmas"
    assert Turma._meta.verbose_name == "Turma"
    assert Turma._meta.verbose_name_plural == "Turmas"
