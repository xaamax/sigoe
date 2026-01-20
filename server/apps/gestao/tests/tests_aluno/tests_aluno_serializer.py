from apps.gestao.api.serializers import AlunoSerializer
from apps.gestao.models.aluno import Aluno


def test_aluno_serializer_output():
    aluno = Aluno(
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

    serializer = AlunoSerializer(aluno)
    data = serializer.data

    assert data["nome"] == "João Silva"
    assert data["cpf"] == "12345678900"
    assert data["cep"] == "01000-000"
    assert data["responsavel"] == "Maria Silva"
    assert data["telefone_responsavel"] == "11999999999"
