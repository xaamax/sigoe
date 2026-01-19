from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)
from .views import AuthenticationView

urlpatterns = [
    path('authentication/', AuthenticationView.as_view(), name='token_obtain_pair'),
    path('authentication/refresh_token/', TokenRefreshView.as_view(), name='token_refresh'),
    path('authentication/verify_token/', TokenVerifyView.as_view(), name='token_verify'),
]
