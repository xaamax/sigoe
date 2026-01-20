import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_authentication_view_success():
    client = APIClient()

    User.objects.create_user(
        username="john",
        password="test123"
    )

    response = client.post(
        "/api/v1/authentication/authentication/",
        {
            "username": "john",
            "password": "test123"
        },
        format="json"
    )

    assert response.status_code == 200
    assert "access" in response.data
    assert "refresh" in response.data
    assert "expiresIn" in response.data
