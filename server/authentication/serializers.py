from django.utils.timezone import now
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class AuthenticationSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        super().validate(attrs)
        user = self.user

        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        expires_in = now() + access_token.lifetime

        return {
            "access": str(access_token),
            "refresh": str(refresh),
            "expiresIn": expires_in.strftime("%Y-%m-%dT%H:%M:%SZ"),
        }
