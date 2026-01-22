import pytest
from apps.gestao.models.aluno import Aluno

pytestmark = pytest.mark.django_db


def test_criar_aluno():
    aluno = Aluno.objects.create(
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

    assert aluno.nome == "João Silva"
    assert aluno.cpf == "12345678900"
    assert aluno.cep == "01000-000"
    assert aluno.responsavel == "Maria Silva"


def test_endereco_property():
    aluno = Aluno.objects.create(
        nome="Ana Souza",
        cpf="98765432100",
        cep="02000-000",
        logradouro="Av. Brasil",
        numero=456,
        bairro="Jardins",
        cidade="São Paulo",
        estado="SP",
        responsavel="Carlos Souza",
        telefone_responsavel="11888888888"
    )

    assert aluno.endereco == (
        "Av. Brasil, 456 - Jardins - São Paulo/SP - 02000-000 "
    )


def test_meta_aluno():
    assert Aluno._meta.verbose_name == "Aluno"
    assert Aluno._meta.verbose_name_plural == "Alunos"
