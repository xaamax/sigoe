from apps.sme.api.serializers import UeSerializer
from apps.sme.models import Dre, Ue


def test_ue_serializer_output():
    dre = Dre(
        codigo_dre="DRE01",
        nome="DRE Sul",
        abreviacao="SUL"
    )

    ue = Ue(
        codigo_ue="UE001",
        nome="Escola Municipal Alpha",
        dre=dre
    )

    serializer = UeSerializer(ue)
    data = serializer.data

    assert data == {
        "codigo_ue": "UE001",
        "nome": "Escola Municipal Alpha",
        "dre": "DRE01"
    }
