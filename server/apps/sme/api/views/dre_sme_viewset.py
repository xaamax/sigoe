from rest_framework.permissions import DjangoModelPermissions, IsAdminUser
from rest_framework import viewsets

from apps.sme.api.filters import DreFilterClass
from apps.sme.api.serializers import DreSerializer
from apps.sme.models import Dre


class DreViewSet(viewsets.ModelViewSet):
    queryset = Dre.objects.all()
    rql_filter_class = DreFilterClass
    serializer_class = DreSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]
