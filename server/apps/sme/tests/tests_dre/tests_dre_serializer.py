from apps.sme.api.serializers.dre_sme_serializer import DreSerializer
from apps.sme.models.dre import Dre


def test_dre_serializer_output():
    dre = Dre(
        codigo_dre="DRE01",
        nome="DRE Sul",
        abreviacao="SUL"
    )

    serializer = DreSerializer(dre)
    data = serializer.data

    assert data == {
        "codigo_dre": "DRE01",
        "nome": "DRE Sul",
        "abreviacao": "SUL"
    }
