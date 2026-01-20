from apps.sme.api.serializers.turma_serializer import TurmaSerializer
from apps.gestao.models.turma import Turma
from apps.sme.models import Dre, Ue


def test_turma_serializer_output():
    dre = Dre(
        codigo_dre="DRE01",
        nome="DRE Sul",
        abreviacao="SUL"
    )

    ue = Ue(
        codigo_ue="UE01",
        nome="Escola Alpha",
        dre=dre
    )

    turma = Turma(
        codigo_turma="T01",
        nome="1º Ano A",
        serie_ano=1,
        ano_letivo=2025,
        ue=ue
    )

    serializer = TurmaSerializer(turma)
    data = serializer.data

    assert data == {
        "id": None,
        "codigo_turma": "T01",
        "nome": "1º Ano A",
        "serie_ano": 1,
        "ano_letivo": 2025,
        "ue": "UE01"
    }
