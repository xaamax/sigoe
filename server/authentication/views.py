from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import AuthenticationSerializer


class AuthenticationView(TokenObtainPairView):
    serializer_class = AuthenticationSerializer
