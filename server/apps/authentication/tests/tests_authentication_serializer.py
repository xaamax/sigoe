import pytest
from apps.authentication.serializers import AuthenticationSerializer


@pytest.mark.django_db
def test_authentication_serializer_validate():
    serializer = AuthenticationSerializer(
        data={
            "username": "john",
            "password": "test123"
        }
    )

    assert serializer.is_valid(), serializer.errors

    data = serializer.validated_data

    assert "access" in data
    assert "refresh" in data
    assert "expiresIn" in data
