from rest_framework.permissions import DjangoModelPermissions, IsAdminUser
from rest_framework import viewsets

from .filters import DreFilterClass, UeFilterClass
from .models import Dre, Ue
from .serializers import DreSerializer, UeSerializer


class DreViewSet(viewsets.ModelViewSet):
    queryset = Dre.objects.all()
    rql_filter_class = DreFilterClass
    serializer_class = DreSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]


class UeViewSet(viewsets.ModelViewSet):
    queryset = Ue.objects.all()
    rql_filter_class = UeFilterClass
    serializer_class = UeSerializer
    permission_classes = [DjangoModelPermissions, IsAdminUser]
